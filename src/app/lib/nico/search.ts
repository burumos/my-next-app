import { video } from "./types";
import dayjs from "dayjs";
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

export function convertVideoLength(time: number): string {
  if (time <= 0) return "00:00";
  const minutes = time / 60;
  const seconds = time % 60;
  return (
    minutes.toFixed().padStart(2, "0") +
    ":" +
    seconds.toString().padStart(2, "0")
  );
}

export function convertDatetimeString(datetime: string): string {
  const date = dayjs(datetime);
  return date.format("YYYY/MM/DD HH:mm");
}
