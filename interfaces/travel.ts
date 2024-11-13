export interface Requirement {
  description: string;
}

export interface Activity {
  order: number;
  description: string;
}

export interface Food {
  name: string;
  url: string | undefined;
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
  destination: string,
  startDate: string,
  endDate: string,
}

export interface clerkUserInfo {
  username: string;
  email: string;
}
