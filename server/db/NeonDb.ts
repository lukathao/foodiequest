"use server";

import { clerkUserInfo } from "@/interfaces/travel";

export async function savePlan(user: clerkUserInfo, plan: any) {
  // TODO connect to Neon DB and save plan
  console.log(user);
  // console.log(plan)
  return "1";
}