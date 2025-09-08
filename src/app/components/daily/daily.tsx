"use client";

import React, { useState } from "react";
import DailyForm from "./dailyForm";
import useSWR, { mutate } from "swr";
import { DailyMemo as DailyMemoType } from "@prisma/client";
import dayjs from "dayjs";
import { useSearchParams, useRouter } from "next/navigation";

export default function DailyMemo() {
  const initText = useParamText();
  const [input, setInput] = useState(initText);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleDeleteMemo = async (id: number) => {
    if (!confirm("本当に削除しますか？")) return;

    await fetch("/api/daily", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    // リスト再取得
    mutate("/api/daily");

    if (editingId === id) {
      setEditingId(null);
      setInput("");
    }
  };

  const handleEditMemo = (id: number, text: string) => {
    setEditingId(id);
    setInput(text);
  };

  return (
    <main className="p-6 h-[calc(100vh-50px)] max-w-7xl mx-auto flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Daily Memo</h1>
      <div className="mb-4">
        <DailyForm
          input={input}
          setInput={setInput}
          editingId={editingId}
          setEditingId={setEditingId}
        />
      </div>
      <div
        className="border rounded flex-1"
        style={{
          overflowY: "auto",
        }}
      >
        <List
          handleEditMemo={handleEditMemo}
          handleDeleteMemo={handleDeleteMemo}
        />
      </div>
    </main>
  );
}

const useParamText = (): string => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // 初回マウント時のみクエリパラメータを消す
  React.useEffect(() => {
    const paramTest = searchParams.get("t");
    if (typeof paramTest === "string") {
      router.replace("/daily");
    }
  }, [searchParams, router]);

  const paramTest = searchParams.get("t");
  return typeof paramTest === "string" ? paramTest : "";
};

type ResponseType = {
  data: {
    dailyList: DailyMemoType[];
  };
};

function List({
  handleEditMemo,
  handleDeleteMemo,
}: {
  handleEditMemo: (id: number, text: string) => void;
  handleDeleteMemo: (id: number) => void;
}) {
  const fetcher = (url: string) =>
    fetch(url, { method: "GET" }).then((r) => r.json());
  const { data, error, isLoading } = useSWR<ResponseType, Error>(
    "/api/daily",
    fetcher
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || data.data.dailyList.length === 0) return <div>No data</div>;

  const memos = data.data.dailyList;
  const list = memos
    .slice()
    .sort((a, b) => b.id - a.id)
    .map((daily) => (
      <Item
        key={daily.id}
        daily={daily}
        handleEditMemo={handleEditMemo}
        handleDeleteMemo={handleDeleteMemo}
      />
    ));
  return <ul>{list}</ul>;
}

function Item({
  daily,
  handleEditMemo,
  handleDeleteMemo,
}: {
  daily: DailyMemoType;
  handleEditMemo: (id: number, text: string) => void;
  handleDeleteMemo: (id: number) => void;
}) {
  return (
    <li key={daily.id} className="border-b py-2 px-2">
      <div className="flex flex-col items-left gap-2 relative">
        <div className="text-sm text-gray-500">
          {toDateString(daily.createdAt)}
        </div>
        <div
          className="flex-1 whitespace-pre-wrap break-words"
          style={{ wordBreak: "break-word" }}
        >
          {linkify(daily.text)}
        </div>
        <div className="flex gap-2 justify-end absolute right-0 text-sm">
          <button
            onClick={() => handleEditMemo(daily.id, daily.text)}
            className="border text-blue-500 px-1 rounded"
          >
            編集
          </button>
          <button
            onClick={() => handleDeleteMemo(daily.id)}
            className="border  text-red-500 px-1 rounded"
          >
            削除
          </button>
        </div>
      </div>
    </li>
  );
}

// URLを<a>タグに変換する関数
function linkify(text: string): React.ReactNode {
  // URL検出用の正規表現
  const urlRegex = /(https?:\/\/[^\s<>"'`]+)/g;

  // 改行も維持しつつ、URLだけリンク化
  const parts = text.split(urlRegex);

  return parts.map((part, i) => {
    if (urlRegex.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-all"
        >
          {part}
        </a>
      );
    }
    // 改行を維持
    return part.split("\n").map((line, j, arr) =>
      j < arr.length - 1 ? (
        <React.Fragment key={`${i}-${j}`}>
          {line}
          <br />
        </React.Fragment>
      ) : (
        line
      )
    );
  });
}

function toDateString(date: Date): string {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}
