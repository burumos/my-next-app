"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const [form, setForm] = useState({
    q: "",
    limit: "",
    minimumViews: "",
  });

  const action = (formData: FormData) => {
    const urlSearchParams = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      urlSearchParams.append(key, value as string);
    }

    push(`${pathname}?${urlSearchParams.toString()}`);
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

  return (
    <form action={action}>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="inline-block w-24">word</label>
          <input
            className="inline-block border-2 w-auto"
            name="q"
            value={form.q}
            onChange={changeHandler.bind(null, "q")}
          />
        </div>
        <div>
          <label className="inline-block w-24">limit</label>
          <input
            className="inline-block border-2 w-auto"
            name="limit"
            type="number"
            value={form.limit}
            onChange={changeHandler.bind(null, "limit")}
          />
        </div>
        <div>
          <label className="inline-block w-24">min views</label>
          <input
            className="inline-block border-2 w-auto"
            name="minimumViews"
            type="number"
            value={form.minimumViews}
            onChange={changeHandler.bind(null, "minimumViews")}
          />
        </div>
        <button className="border-2">search</button>
      </div>
    </form>
  );
}
