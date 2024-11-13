"use server";

import { User } from "@clerk/nextjs/server";

export async function getUserInfo(user: User) {
  const username = user.username != null ? user.username : user.id;
  const email = user.emailAddresses[0].emailAddress;

  // TODO check with different login method types
  return {
    username: username,
    email: email,
  }
}