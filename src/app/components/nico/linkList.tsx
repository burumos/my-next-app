import { fetchLoginUserCondition } from "@/app/lib/nico/query";
import { CondLink } from "./condLink";
import OverwriteCondForm from "./overwriteCondForm";

export async function SearchConditions() {
  const conditions = await fetchLoginUserCondition();
  return (
    <>
      {conditions.map((cond) => (
        <CondLink cond={cond} key={cond.id} />
      ))}
      <div className="mt-3">
        <OverwriteCondForm conditions={conditions} />
      </div>
    </>
  );
}
