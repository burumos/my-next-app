"use server";

import { video } from "./types";
import { searchResponseSchema } from "./schemas";

export async function search({
  q,
  limit,
  minimumViews,
}: {
  q: string;
  limit: number | string;
  minimumViews?: number | string;
}): Promise<video[]> {
  const searchParams = new URLSearchParams([
    ["q", q],
    ["targets", "title,tags"],
    ["_context", "next-nk"],
    [
      "fields",
      "contentId,title,tags,viewCounter,likeCounter,lengthSeconds,thumbnailUrl,commentCounter,mylistCounter,startTime",
    ],
    ["_limit", limit.toString()],
    ["_sort", "-startTime"],
  ]);
  if (minimumViews) {
    searchParams.append("filters[viewCounter][gt]", minimumViews.toString());
  }

  const url = `https://snapshot.search.nicovideo.jp/api/v2/snapshot/video/contents/search?${searchParams.toString()}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`api fetch error: (statusText: ${response.statusText})`);
  }

  const json = await response.json();
  const parseResult = searchResponseSchema.safeParse(json);
  if (!parseResult.success) {
    throw new Error("api response schema error");
  }

  return parseResult.data.data;
}
