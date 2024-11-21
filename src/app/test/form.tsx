"use client";

import { useActionState } from "react";
import { saveMemo } from "./action";
import { SavePrevStatus } from "./type";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function Form({id, content}:{id: number | undefined, content: string | undefined}) {
  const pathname = usePathname();
  const initState: SavePrevStatus = {inputs: {id: id?.toString() ||'',  content: content || '' }};
  const [state, action] = useActionState(saveMemo, initState);
  const formAction = (formData: FormData) => {
    const id = state?.inputs?.id;
    if (id) {
      formData.append('id', id);
    }
    action(formData);
  }
  return (
    <div className="w-full max-w-[500px] flex justify-center flex-col">
      {state?.inputs?.id && <div>Editing memo. <Link href={`${pathname}`} replace>Create?</Link></div>}
      <form action={formAction} className="">
        <textarea
          name="content"
          className="border-2 w-full text-black"
          defaultValue={state?.inputs?.content?.toString() || ""}
        />
        {state?.errors?.content?.map((message) => (
          <div key={message}>{message}</div>
        ))}
        <button className="border-2 block w-full">save</button>
        {state?.message && <div>{state.message}</div>}
      </form>
    </div>
  );
}
