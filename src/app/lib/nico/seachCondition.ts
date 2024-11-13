"use server";

import { loginUser } from "@/auth";
import prisma from "../db";
import { deleteParamsSchema, searchParamsSchema } from "./schemas";
import { SearchFormState } from "./types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { deleteCondition } from "./query";

export async function saveConditionAction(
  prevState: SearchFormState,
  formData: FormData
): Promise<SearchFormState> {
  const validatedFields = searchParamsSchema.safeParse({
    q: formData.get("q"),
    limit: formData.get("limit"),
    minimumViews: formData.get("minimumViews"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      messages: "validation error",
    };
  }

  const user = await loginUser();
  const { q, limit, minimumViews } = validatedFields.data;
  await prisma.nicoSearchCondition.create({
    data: {
      q: q || "",
      limit: limit || 10,
      minimumViews,
      userId: user.id,
    },
  });

  revalidatePath("nico/search");
  redirect(`/nico/search?q=${q}&limit=${limit || ''}&minimumViews=${minimumViews || ''}`);
}

export async function deleteConditionAction(prevState: string | null, formData: FormData) {
  const parsed = deleteParamsSchema.safeParse(formData);
  if (!parsed.success || !parsed.data.id) {
    return 'Finish';
  }

  const user = await loginUser();
  await deleteCondition(parsed.data.id, user.id);
  return 'Complete';
}
