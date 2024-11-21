"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { deleteMemo } from "./action";
import { useActionState } from "react";

export default function MemoItem({
  id,
  content,
}: {
  id: number;
  content: string;
}) {
  const pathname = usePathname();
  const initState = {};
  const [, d] = useActionState(deleteMemo, undefined);
  const deleteAction = (form: FormData) => {
    form.append('id', id.toString());
    d(form);
  }
  return (
    <div key={id}>
      {content}{" "}
      <Link href={`${pathname}?id=${id}`} replace>
        select
      </Link>
      <form action={deleteAction} className="inline">
        <button className="border-2 ms-2">Delete</button>
      </form>
    </div>
  );
}
