"use server";

import prisma from "@/app/lib/db";
import { loginUser } from "@/auth";

export async function deleteCondition(id: number, userId: number) {
  return await prisma.nicoSearchCondition.delete({
    where: {
      id: id,
      userId: userId,
    },
  });
}

export async function deleteLoginUserCondition(id: number) {
  const user = await loginUser();
  return await deleteCondition(id, user.id);
}

export async function fetchConditions(userId: number) {
  return await prisma.nicoSearchCondition.findMany({
    where: {
      userId,
    },
  });
}

export async function fetchLoginUserCondition() {
  const user = await loginUser();
  return await fetchConditions(user.id);
}

export async function deleteVideos(userId: number) {
  return await prisma.nicoVideo.deleteMany({
    where: {
      userId: userId,
    },
  });
}

export async function fetchLoginUserBulkVideos() {
  const user = await loginUser();
  return await prisma.nicoVideo.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      startTime: 'desc',
    }
  });
}
