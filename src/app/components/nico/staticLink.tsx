"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function StaticLink({ path, name }: { path: string; name: string }) {
  const pathname = usePathname();
  if (pathname === path) return name;

  return (
    <Link href={path} className="text-blue-400">
      {name}
    </Link>
  );
}
