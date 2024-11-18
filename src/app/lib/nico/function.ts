import { NicoSearchCondition } from "@prisma/client";

export function urlQuery(condition: NicoSearchCondition) {
  const searchParams = new URLSearchParams({
    q: condition.q,
    limit: condition.limit.toString(),
    minimumViews: condition.minimumViews?.toString() || "",
    id: condition.id.toString(),
  });

  return searchParams.toString();
}