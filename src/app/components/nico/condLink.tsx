"use client";

import { urlQuery } from "@/app/lib/nico/function";
import { deleteLoginUserCondition } from "@/app/lib/nico/query";
import { SearchCondition } from "@/app/lib/nico/types";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export function CondLink({ cond }: { cond: SearchCondition }) {
  const [shown, setShown] = useState(true);
  const clickHandle = async () => {
    if (!window.confirm("ok?")) return;
    await deleteLoginUserCondition(cond.id);
    toast("success delete!!");
    setShown(false);
  };

  if (!shown) return null;

  return (
    <div key={cond.id} className="flex items-center">
      <button
        type="button"
        className="border-2 px-1 me-1"
        onClick={clickHandle}
      >
        D
      </button>
      <Link href={`/nico/search?${urlQuery(cond)}`} className="inline-block">
        {cond.q}/{cond.limit}/{cond.minimumViews}
      </Link>
    </div>
  );
}
