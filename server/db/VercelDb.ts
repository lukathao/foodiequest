"use server";
import { PlanData, TravelPlanResponse, TravelPlanUpdateData } from "@/interfaces/prisma";
import { clerkUserInfo } from "@/interfaces/travel";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function savePlan(user: clerkUserInfo, plan: any) {
  console.log(await getTravelPlan(user, plan));
  // return saveTravelPlan(await getTravelPlan(user, plan));
}

export async function getTravelPlan(user: clerkUserInfo, plan: any) {
  const travelPlanData = {
    username: user.username,
    email: user.email,
    requirements: plan.requirements,
    foods: plan.food,
    guides: plan.guides,
    activities: plan.activities,
    destination: plan.destination,
    startDate: plan.startDate,
    endDate: plan.endDate,
  }
  return travelPlanData;
}

export async function saveTravelPlan(data: PlanData) {
  try {
    let user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          username: data.username,
          email: data.email,
        },
      });
    }

    const plan = await prisma.travelPlan.create({
      data: {
        userId: user.id,
        requirements: {
          create: data.requirements,
        },
        foods: {
          create: data.foods,
        },
        guides: {
          create: data.guides,
        },
        activities: {
          create: data.activities,
        },
        destination: data.destination,
        startDate: data.startDate,
        endDate: data.endDate,
      },
    });

    console.log('Travel plan and related data saved successfully:', plan);
    return plan;
  } catch (error) {
    console.error('Error saving travel plan data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}


export async function getTravelPlansByEmail(email: string) {
  try {
    const userWithTravelPlans = await prisma.user.findUnique({
      where: { email },
      include: {
        travelPlans: {
          include: {
            requirements: true,
            foods: true,
            guides: true,
            activities: true,
            destination: true,
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    if (!userWithTravelPlans) {
      console.log('User not found');
      return null;
    }

    const result: TravelPlanResponse = {
      username: userWithTravelPlans.username,
      email: userWithTravelPlans.email,
      travelPlans: userWithTravelPlans.travelPlans.map((plan: { requirements: any[]; foods: any[]; guides: any[]; activities: any[]; destination: string }) => ({
        requirements: plan.requirements.map((req: { description: any; }) => ({ description: req.description })),
        foods: plan.foods.map((food: { name: any; url: any; }) => ({ name: food.name, url: food.url })),
        guides: plan.guides.map((guide: { name: any; contact: any; website: any; }) => ({
          name: guide.name,
          contact: guide.contact,
          website: guide.website,
        })),
        activities: plan.activities.map((activity: { order: any; description: any; }) => ({
          order: activity.order,
          description: activity.description,
        })),
        destination: plan.destination,
      })),
    };

    return result;
  } catch (error) {
    console.error('Error retrieving travel plans:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function updateTravelPlan(data: TravelPlanUpdateData) {
  try {
    // Step 1: Check if the user and travel plan exist
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      include: { travelPlans: { where: { id: data.travelPlanId } } },
    });

    if (!user) {
      console.log('User not found');
      return null;
    }

    const travelPlan = user.travelPlans[0];
    if (!travelPlan) {
      console.log('Travel plan not found');
      return null;
    }

    await prisma.$transaction(async (prisma) => {
      if (data.requirements) {
        for (const req of data.requirements) {
          if (req.id) {
            await prisma.requirement.update({
              where: { id: req.id },
              data: { description: req.description },
            });
          } else {
            await prisma.requirement.create({
              data: { description: req.description, travelPlanId: travelPlan.id },
            });
          }
        }
      }

      if (data.foods) {
        for (const food of data.foods) {
          if (food.id) {
            await prisma.food.update({
              where: { id: food.id },
              data: { name: food.name, url: food.url },
            });
          } else {
            await prisma.food.create({
              data: { name: food.name, url: food.url, travelPlanId: travelPlan.id },
            });
          }
        }
      }

      if (data.guides) {
        for (const guide of data.guides) {
          if (guide.id) {
            await prisma.guide.update({
              where: { id: guide.id },
              data: { name: guide.name, contact: guide.contact, website: guide.website },
            });
          } else {
            await prisma.guide.create({
              data: {
                name: guide.name,
                contact: guide.contact,
                website: guide.website,
                travelPlanId: travelPlan.id,
              },
            });
          }
        }
      }

      if (data.activities) {
        for (const activity of data.activities) {
          if (activity.id) {
            await prisma.activity.update({
              where: { id: activity.id },
              data: { order: activity.order, description: activity.description },
            });
          } else {
            await prisma.activity.create({
              data: { order: activity.order, description: activity.description, travelPlanId: travelPlan.id },
            });
          }
        }
      }
    });

    console.log('Travel plan updated successfully');
    return { message: 'Travel plan updated successfully' };
  } catch (error) {
    console.error('Error updating travel plan:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}