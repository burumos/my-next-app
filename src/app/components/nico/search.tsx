"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const action = (formData: FormData) => {
    const urlSearchParams = new URLSearchParams();
    for (const [key, value] of formData.entries()) {
      urlSearchParams.append(key, value as string);
    }

    push(`${pathname}?${urlSearchParams.toString()}`);
  };

  return (
    <form action={action}>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="inline-block w-24">word</label>
          <input
            className="inline-block border-2 w-auto"
            name="q"
            defaultValue={searchParams.get("q") || ""}
          />
        </div>
        <div>
          <label className="inline-block w-24">limit</label>
          <input
            className="inline-block border-2 w-auto"
            name="limit"
            type="number"
            defaultValue={searchParams.get("limit") || "10"}
          />
        </div>
        <div>
          <label className="inline-block w-24">min views</label>
          <input
            className="inline-block border-2 w-auto"
            name="minimumViews"
            type="number"
            defaultValue={searchParams.get("minimumViews") || ""}
          />
        </div>
        <button className="border-2">search</button>
      </div>
    </form>
  );
}
