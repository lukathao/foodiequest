import { savePlan } from "@/server/db/NeonDb";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export default async function POST(req: NextRequest) {
  const data = await req.json();
  const user = await currentUser();
  if (user) {
    try {
      const savedPlanId = await savePlan(user, data);
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