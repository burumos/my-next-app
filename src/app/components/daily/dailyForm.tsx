"use client";

import { saveDaily } from "@/app/lib/daily/fetch";
import { useState } from "react";
import { mutate } from "swr";

export default function DailyForm({
  input,
  setInput,
  editingId,
  setEditingId,
}: {
  input: string;
  setInput: (input: string) => void;
  editingId: number | null;
  setEditingId: (id: number | null) => void;
}) {
  const [message, setMessage] = useState("");

  const formAction = async () => {
    const { message, id } = await saveDaily(input, editingId);
    setInput("");
    setMessage(message);
    setEditingId(null);
    mutate("/api/daily");
  };
  const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    setMessage("");
  };
  const handleCancelEdit = () => {
    setInput("");
    setMessage("");
    setEditingId(null);
  };

  return (
    <form action={formAction} className="flex flex-col items-end">
      <textarea
        value={input}
        onChange={handleChangeText}
        className="border rounded px-2 py-1 w-full resize-none"
        name="text"
        rows={3}
      />
      <div className="flex mt-2 align-items-center justify-between w-full">
        <p>{message}</p>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded"
          >
            {editingId !== null ? "保存" : "追加"}
          </button>
          {editingId !== null && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-gray-300 text-black px-4 py-1 rounded"
            >
              キャンセル
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
