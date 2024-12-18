"use server";

import { convertDatetimeString, convertVideoLength } from "@/app/lib/convert";
import { fetchAction } from "@/app/lib/nico/bulk";
import { searchParamsSchema } from "@/app/lib/nico/schemas";
import { search } from "@/app/lib/nico/search";
import { video } from "@/app/lib/nico/types";
import Image from "next/image";

export async function SearchList({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const parsed = await searchParamsSchema.safeParseAsync(await searchParams);
  if (parsed.error) {
    console.log("parse error", parsed.error.errors);
    return [];
  }

  const params = parsed.data;
  if (!params.q) return [];

  const list = await search({
    q: params.q,
    limit: params.limit || 10,
    minimumViews: params.minimumViews || undefined,
  });
  return <List list={list} />;
}

export async function BulkList() {
  const list = await fetchAction();
  return <List list={list} />;
}

export async function List({ list }: { list: video[] }) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {list.map((item) => (
        <Item key={item.contentId} item={item} />
      ))}
    </div>
  );
}

function Item({ item }: { item: video }) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-shrink-0 flex justify-center ">
        <a
          href={`https://nico.ms/${item.contentId}`}
          target="_blank"
          className="relative block w-full max-w-[300px]"
        >
          <Image
            alt={item.title}
            src={item.thumbnailUrl}
            width="130"
            height="100"
            className="block w-full min-w-[130px]"
          />
          <span className="absolute bottom-0 right-0 bg-white bg-opacity-70 text-black p-[2px]">
            {convertVideoLength(item.lengthSeconds)}
          </span>
        </a>
      </div>
      <div className="pl-1">
        <div>
          <a
            href={`https://nico.ms/${item.contentId}`}
            target="_blank"
            className="text-blue-400 visited:text-blue-800"
          >
            {item.title}
          </a>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center">
            <span className="material-symbols-outlined text-lg pr-1">
              visibility
            </span>
            {item.viewCounter}
          </span>
          <span className="inline-flex items-center">
            <span className="material-symbols-outlined text-xl pr-1">
              bookmark_add
            </span>
            {item.mylistCounter}
          </span>
          <span className="inline-flex items-center">
            <span className="material-symbols-outlined text-xl pr-1">
              favorite
            </span>
            {item.likeCounter}
          </span>
          <span className="inline-flex items-center">
            <span className="material-symbols-outlined text-xl pr-1">
              comment
            </span>
            {item.commentCounter}
          </span>
        </div>
        <div>投稿日: {convertDatetimeString(item.startTime)}</div>
        <div className="text-xs">TAG: {item.tags}</div>
      </div>
    </div>
  );
}
