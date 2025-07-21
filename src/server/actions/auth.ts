"use server";

import { redirect } from "next/navigation";
import { signOut } from "~/server/auth";

export async function handleSignOut() {
  await signOut();
  redirect("/");
}
