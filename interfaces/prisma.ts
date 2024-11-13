export type Requirement = { description: string };
export type Food = { name: string; url: string };
export type Guide = { name: string; contact: string; website: string };
export type Activity = { order: number; description: string };

export interface TravelPlanData {
  destination: string;
  startDate: Date;
  endDate: Date;
  requirements: { description: string }[];
  foods: { name: string; url: string }[];
  guides: { name: string; contact: string; website: string }[];
  activities: { order: number; description: string }[];
}