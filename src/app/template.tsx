import { auth, signOut } from "@/auth";
import Link from "next/link";

async function signOutAction() {
  "use server";
  await signOut({ redirect: true, redirectTo: "/login" });
}

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div>
      {session?.user && (
        <div className="max-w-[1500px] mx-auto px-3 flex flex-column justify-between">
          <Link href="/">
            <span className="material-symbols-outlined text-4xl">home</span>
          </Link>

          <form action={signOutAction}>
            <button>
              <span className="material-symbols-outlined text-4xl font-bold">
                logout
              </span>
            </button>
          </form>
        </div>
      )}
      {children}
    </div>
  );
}
