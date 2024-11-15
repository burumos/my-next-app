"use client";

import { saveConditionAction } from "@/app/lib/nico/searchCondition";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { SubmitButton } from "../button";

type formMode = "search" | "save";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const [mode, setMode] = useState<formMode>("search");
  const [form, setForm] = useState({
    q: "",
    limit: "",
    minimumViews: "",
  });

  const searchAction = (formData: FormData) => {
    const urlSearchParams = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      urlSearchParams.append(key, value as string);
    }

    push(`${pathname}?${urlSearchParams.toString()}`);
  };

  const formAction = (formData: FormData) => {
    if (mode === "save") {
      saveConditionAction(formData);
    } else {
      searchAction(formData);
    }
  };

  useEffect(() => {
    setForm({
      q: searchParams.get("q") || "",
      limit: searchParams.get("limit") || "10",
      minimumViews: searchParams.get("minimumViews") || "",
    });
  }, [searchParams]);

  const changeHandler = (
    name: string,
    element: ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [name]: element.target.value,
    });
  };

  const buttonHandler = (nextMode: formMode) => {
    setMode(nextMode);
  };

  return (
    <form action={formAction}>
      <div className="grid grid-cols-1 gap-4">
        <div className="flex items-center">
          <label className="inline-block w-24 flex-shrink-0">word</label>
          <input
            className="inline-block border-2 flex-grow p-1"
            name="q"
            value={form.q}
            onChange={changeHandler.bind(null, "q")}
            required
          />
        </div>
        <div className="flex items-center">
          <label className="inline-block w-24 flex-shrink-0">limit</label>
          <input
            className="inline-block border-2 w-auto flex-grow p-1"
            name="limit"
            type="number"
            value={form.limit}
            onChange={changeHandler.bind(null, "limit")}
            min="1"
          />
        </div>
        <div className="flex items-center">
          <label className="inline-block w-24 flex-shrink-0">min views</label>
          <input
            className="inline-block border-2 w-auto flex-grow p-1"
            name="minimumViews"
            type="number"
            value={form.minimumViews}
            onChange={changeHandler.bind(null, "minimumViews")}
            min="0"
            step="100"
          />
        </div>
        <div className="flex justify-between flex-row-reverse">
          <SubmitButton
            className="border-2 w-4/6"
            onClick={buttonHandler.bind(null, "search")}
          >
            search
          </SubmitButton>
          <SubmitButton
            className="border-2 w-1/6"
            onClick={buttonHandler.bind(null, "save")}
          >
            save
          </SubmitButton>
        </div>
      </div>
    </form>
  );
}
