"use server";
import { clerkUserInfo } from "@/interfaces/travel";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function savePlan(user: clerkUserInfo, plan: any) {
  const travelPlanData = await getTravelPlan(user, plan);
  return saveTravelPlan(travelPlanData);
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

export async function saveTravelPlan(data: {
  username: string;
  email: string;
  requirements?: { description: string }[];
  foods?: { name: string; url: string }[];
  guides?: { name: string; contact: string; website: string }[];
  activities?: { order: number; description: string }[];
  destination: string;
  startDate: string;
  endDate: string;
}) {
  try {
    const user = await prisma.user.upsert({
      where: { email: data.email },
      update: {},
      create: {
        username: data.username,
        email: data.email,
      },
    });

    const travelPlan = await prisma.travelPlan.create({
      data: {
        userId: user.id,
        destination: data.destination,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        requirements: {
          create: data.requirements?.map((req) => ({
            description: req.description,
          })),
        },
        foods: {
          create: data.foods?.map((food) => ({
            name: food.name,
            url: food.url,
          })),
        },
        guides: {
          create: data.guides?.map((guide) => ({
            name: guide.name,
            contact: guide.contact,
            website: guide.website,
          })),
        },
        activities: {
          create: data.activities?.map((activity) => ({
            order: activity.order,
            description: activity.description,
          })),
        },
      },
    });

    console.log('Travel plan saved successfully:', travelPlan);
  } catch (error) {
    console.error('Error saving travel plan:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAllTravelPlansByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      travelPlans: {
        select: {
          destination: true,
          startDate: true,
          endDate: true,
          requirements: {
            select: {
              description: true
            }
          },
          foods: {
            select: {
              name: true,
              url: true
            }
          },
          guides: {
            select: {
              name: true,
              contact: true,
              website: true
            }
          },
          activities: {
            orderBy: { order: 'asc' },
            select: {
              order: true,
              description: true
            }
          }
        }
      }
    }
  });

  return user?.travelPlans ?? [];
}

