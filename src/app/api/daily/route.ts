import { deleteDaily, fetchDailyList } from "@/app/lib/daily/fetch";
import { dailyDeleteSchema } from "@/app/lib/daily/schema";
import { fetchLoginUser, withAuth } from "@/auth";

export async function GET() {
  const user = await fetchLoginUser();
  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  const dailyList = await fetchDailyList(user.id);

  return new Response(JSON.stringify({ data: { dailyList } }), { status: 200 });
}

export async function DELETE(request: Request) {
  return withAuth(async (user) => {
    const form = await request.json().catch(() => ({}));
    const parsed = dailyDeleteSchema.safeParse(form);
    if (!parsed.success) {
      return new Response("Bad Request", { status: 400 });
    }

    await deleteDaily(parsed.data.id, user.id);
    // return new Response("Deleted", { status: 200 });
    return makeJsonResponse({ message: "Deleted" });
  });
}

function makeJsonResponse<T>(data: T, status = 200) {
  return new Response(JSON.stringify({ data }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
