export type Requirement = { description: string };
export type Food = { name: string; url: string };
export type Guide = { name: string; contact: string; website: string };
export type Activity = { order: number; description: string };

export interface PlanData {
  username: string;
  email: string;
  requirements: Requirement[];
  foods: Food[];
  guides: Guide[];
  activities: Activity[];
  destination: string;
  startDate: Date;
  endDate: Date;
}

export interface TravelPlanResponse {
  username: string;
  email: string;
  travelPlans: {
    requirements: { description: string }[];
    foods: { name: string; url: string }[];
    guides: { name: string; contact: string; website: string }[];
    activities: { order: number; description: string }[];
  }[];
  destination: string;
  startDate: Date;
  endDate: Date;
}

type RequirementUpdate = { id?: number; description: string };
type FoodUpdate = { id?: number; name: string; url: string };
type GuideUpdate = { id?: number; name: string; contact: string; website: string };
type ActivityUpdate = { id?: number; order: number; description: string };

export interface TravelPlanUpdateData {
  email: string;
  travelPlanId: number;
  requirements?: RequirementUpdate[];
  foods?: FoodUpdate[];
  guides?: GuideUpdate[];
  activities?: ActivityUpdate[];
}