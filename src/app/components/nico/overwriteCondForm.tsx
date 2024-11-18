"use client";

import { NicoSearchCondition } from "@prisma/client";
import { SubmitButton } from "../button";
import { useSearchParams } from "next/navigation";
import { ChangeEventHandler, useActionState, useEffect, useState } from "react";
import { updateConditionAction } from "@/app/lib/nico/searchCondition";
import { UpdateSearchConditionState } from "@/app/lib/nico/types";

export default function OverwriteCondForm({
  conditions,
}: {
  conditions: NicoSearchCondition[];
}) {
  const searchParams = useSearchParams();
  const initState: UpdateSearchConditionState = {};
  const [state, updateAction] = useActionState(
    updateConditionAction,
    initState
  );
  const formAction = (formData: FormData) => {
    formData.append("q", searchParams.get("q") || "");
    formData.append("limit", searchParams.get("limit") || "");
    formData.append("minimumViews", searchParams.get("minimumViews") || "");
    updateAction(formData);
  };
  const [id, setId] = useState(searchParams.get('id')?.toString());
  useEffect(() => {
    setId(searchParams.get('id')?.toString());
  }, [searchParams]);
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => setId(e.target.value);

  if (!searchParams.get("q") || conditions.length === 0) return null;

  return (
    <form action={formAction}>
      <select
        name="id"
        className="w-full p-1 border-2"
        value={id}
        onChange={handleChange}
        required
      >
        <option value="">-----</option>
        {conditions.map((cond) => (
          <option key={cond.id} value={cond.id.toString()}>
            {cond.q}
          </option>
        ))}
      </select>
      <SubmitButton className="mt-3 border-2 p-1">overwrite</SubmitButton>
      {state?.message && <div className="text-red-400">{state.message}</div>}
    </form>
  );
}
