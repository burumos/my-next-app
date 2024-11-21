import { Suspense } from "react";
import Form from "./form";
import MemoList from "./memo-list";
import { z } from "zod";
import { fetchMemo } from "./action";

export default async function TestPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await searchParams;
  return (
    <div className="w-full min-h-[500px] flex justify-center items-center flex-col">
      <div>testPage</div>
      <div>{new Date().toISOString()}</div>
      <Suspense key={id?.toString()} fallback="loading form">
        <EditForm id={id} />
      </Suspense>
      <Suspense fallback={"loading"}>
        <MemoList />
      </Suspense>
    </div>
  );
}

async function EditForm({ id }: { id: string | string[] | undefined }) {
  const parsed = z.coerce.number().safeParse(id);
  const memo = parsed.success && parsed.data >= 1 ? await fetchMemo(parsed.data) : null;
  return <Form id={memo?.id} content={memo?.content} />
}
