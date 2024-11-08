"use server";

import { User } from "@clerk/nextjs/server";

export async function savePlan(user: User, plan: any) {
  // TODO connect to Neon DB and save plan
  console.log(user);
  console.log(plan)
  return "1";
}