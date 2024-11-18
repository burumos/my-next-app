"use server";

import { loginUser } from "@/auth";
import prisma from "../db";
import {
  deleteParamsSchema,
  searchParamsSchema,
  updateParamsSchema,
} from "./schemas";
import { SearchFormState, UpdateSearchConditionState } from "./types";
import { revalidatePath } from "next/cache";
import { deleteCondition, updateLoginUserCondition } from "./query";

export async function saveConditionAction(
  formData: FormData
): Promise<SearchFormState | undefined> {
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
}

export async function deleteConditionAction(
  prevState: string | null,
  formData: FormData
) {
  const parsed = deleteParamsSchema.safeParse(formData);
  if (!parsed.success || !parsed.data.id) {
    return "Finish";
  }

  const user = await loginUser();
  await deleteCondition(parsed.data.id, user.id);
  return "Complete";
}

export async function updateConditionAction(
  prevState: UpdateSearchConditionState | undefined,
  formData: FormData
) {
  const parsed = updateParamsSchema.safeParse({
    id: formData.get("id"),
    q: formData.get("q"),
    limit: formData.get("limit"),
    minimumViews: formData.get("minimumViews"),
  });
  const id = parsed.data?.id;
  if (!parsed.success || !id) {
    console.log(parsed.error?.errors);
    return { message: "Fail update", id } as UpdateSearchConditionState;
  }

  const data = parsed.data;
  await updateLoginUserCondition(id, data);

  revalidatePath("/nico/search");
}
