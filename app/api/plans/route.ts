import { clerkUserInfo } from "@/interfaces/travel";
import { getUserInfo } from "@/server/actions/user";
import { savePlan } from "@/server/db/VercelDb";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const data = await req.json(); //this should be the user email
  // don't actually need this function, can directly do server action
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const user = await currentUser();

  if (user) {
    const clerkUserInfo = await getUserInfo(user);
    try {
      const savedPlanId = await savePlan(clerkUserInfo, data);
      return NextResponse.json({
        savedPlanId,
        status: 201,
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json({
        error: "Unable to save, internal error.",
        status: 500,
      });
    }
  } else {
    return NextResponse.json({
      error: "Unable to save, no authorized user",
      status: 401,
    });
  }
}