"use server";

import { AuthError } from "next-auth";
import { signIn } from "../../auth";
import prisma from "./db";
import { User } from "@prisma/client";

export async function fetchUser(loginId: string): Promise<User | null> {
  return await prisma.user.findUnique({
    where: {
      loginId,
    },
  });
}

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  formData.append('redirectTo', '/');
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
