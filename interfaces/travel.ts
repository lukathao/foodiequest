export interface Requirement {
  description: string;
}

export interface Activity {
  order: number;
  description: string;
}

export interface Food {
  name: string;
  imageUrl: string;
}

export interface TourGuide {
  name: string;
  contact: string;
  website: string;
}

export interface Plans {
  foods: Food[],
  guides: TourGuide[],
  activities: Activity[],
  requirements: Requirement[],
}