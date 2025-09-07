"use server";

import { dailyFormSchema } from "./schema";
import { saveDailyState } from "./types";
import { loginUser } from "@/auth";
import prisma from "../db";
import { DailyMemo } from "@prisma/client";

export async function saveDaily(text: string, id: number | null): Promise<saveDailyState> {
  const parsed = dailyFormSchema.safeParse({ id, text });

  if (!parsed.success) {
    console.error("saveDaily Error", parsed.error?.errors);
    return { message: "Fail save" } as saveDailyState;
  }

  const data = parsed.data;
  if (data.id) {
    updateDaily(data.id, data.text);
  } else {
    createDaily(data.text);
  }

  //   revalidatePath("/daily");
  return { message: "Complete", id: data.id } as saveDailyState;
}

export async function createDaily(text: string) {
  const user = await loginUser();
  await prisma.dailyMemo.create({
    data: {
      text,
      userId: user.id,
    },
  });
}

export async function updateDaily(id: number, text: string) {
  const user = await loginUser();
  return await prisma.dailyMemo.update({
    where: {
      user: user,
      id: id,
    },
    data: {
      text,
    },
  });
}

export async function fetchDailyList(
  userId?: number,
  orderBy: { key: string; direction: "asc" | "desc" } = {
    key: "id",
    direction: "desc",
  }
): Promise<DailyMemo[]> {
  if (!userId) {
    const user = await loginUser();
    userId = user.id;
  }

  return await prisma.dailyMemo.findMany({
    where: {
      userId,
    },
    orderBy: {
      [orderBy.key]: orderBy.direction,
    },
  });
}

export async function deleteDaily(id: number, userId: number) {
  console.log("deleteDaily", id, userId);
  return await prisma.dailyMemo.deleteMany({
    where: {
      id,
      userId,
    },
  });
}
