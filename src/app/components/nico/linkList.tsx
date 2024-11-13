import { fetchLoginUserCondition } from "@/app/lib/nico/query";
import { CondLink } from "./condLink";

export async function SearchConditions() {
  const conditions = await fetchLoginUserCondition();
  return conditions.map((cond) => <CondLink cond={cond} key={cond.id} />);
}
