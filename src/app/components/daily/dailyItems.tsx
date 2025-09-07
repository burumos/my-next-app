"use client";

import React, { useState } from "react";

type Memo = {
  id: number;
  text: string;
  date: Date;
};

const dummyMemos: Memo[] = [
  {
    id: 1,
    text: "初めてのメモ\n改行もできます。",
    date: new Date("2024-01-01T00:00:00Z"),
  },
  ...[...Array(20)].map((_, i) => ({
    id: i + 2,
    text: `サンプルメモ ${i + 1}`,
    date: new Date("2024-01-11T00:00:00Z"),
  })), // 10個のサンプルメモ
];

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

export default function DailyItems() {
  const [memos, setMemos] = useState<Memo[]>(dummyMemos);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleDeleteMemo = (id: number) => {
    if (!confirm("本当に削除しますか？")) return;
    setMemos(memos.filter((memo) => memo.id !== id));
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const handleEditMemo = (id: number) => {
    setEditingId(id);
  };

  return (
    <ul>
      {memos
        .slice()
        .sort((a, b) => b.id - a.id)
        .map((memo) => (
          <Item
            key={memo.id}
            memo={memo}
            handleEditMemo={handleEditMemo}
            handleDeleteMemo={handleDeleteMemo}
          />
        ))}
    </ul>
  );
}

function Item({
  memo,
  handleEditMemo,
  handleDeleteMemo,
}: {
  memo: Memo;
  handleEditMemo: (id: number) => void;
  handleDeleteMemo: (id: number) => void;
}) {
  return (
    <li key={memo.id} className="border-b py-2 px-2">
      <div className="text-sm text-gray-500">{memo.date.toLocaleString()}</div>
      <div className="flex flex-col items-left gap-2 mt-1">
        <div
          className="flex-1 whitespace-pre-wrap break-words"
          style={{ wordBreak: "break-word" }}
        >
          {linkify(memo.text)}
        </div>
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => handleEditMemo(memo.id)}
            className="bg-yellow-600 text-white px-2 py-1 rounded"
          >
            編集
          </button>
          <button
            onClick={() => handleDeleteMemo(memo.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            削除
          </button>
        </div>
      </div>
    </li>
  );
}
