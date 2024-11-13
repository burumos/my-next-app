"user server"

import { loginUser } from "@/auth";
import { deleteVideos, fetchLoginUserBulkVideos } from "./query";
import { video } from "./types";
import { search } from "./search";
import prisma from "../db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function fetchAction(): Promise<video[]> {
  const videoList = await fetchLoginUserBulkVideos();
  return videoList.map((video) : video => ({
    commentCounter: video.commentCounter,
    contentId: video.contentId,
    lengthSeconds: video.lengthSeconds,
    likeCounter: video.likeCounter,
    startTime: video.startTime.toISOString(),
    tags: video.tags,
    thumbnailUrl: video.thumbnailUrl,
    title: video.title,
    viewCounter: video.viewCounter,
    mylistCounter: video.mylistCounter,
  }));
}

const conditions = [
  {
    q: 'mtg -mtga -mtgアリーナ -MMD',
    limit: 5,
    minimumViews: 300,
  },
  {
    q: 'sims -MMD -MikuMikuDance',
    limit: 5,
    minimumViews: 100,
  },
  {
    q: 'cities:skylines',
    limit: 5,
    minimumViews: 500,
  },
  {
    q: 'ets2 -MMD -切り抜き',
    limit: 5,
    minimumViews: 100,
  }
];

export async function bulkAction() {

  const videos = (await Promise.all(conditions.map(search))).flat();
  const uniqueVideos = Array.from((new Map(videos.map(v => [v.contentId, v]))).values());

  const user = await loginUser()
  await deleteVideos(user.id);

  await prisma.nicoVideo.createMany({
    data: uniqueVideos.map(v => {
      return {
        userId: user.id,
        commentCounter: v.commentCounter,
        contentId: v.contentId,
        lengthSeconds: v.lengthSeconds,
        likeCounter: v.likeCounter,
        startTime: v.startTime,
        tags: v.tags,
        thumbnailUrl: v.thumbnailUrl,
        title: v.title,
        viewCounter: v.viewCounter,
        mylistCounter: v.mylistCounter,
      };
    }),
  });

  revalidatePath("nico/bulk");
  redirect("/nico/bulk");
}