import Link from "next/link";
import { Suspense } from "react";
import { SearchConditions } from "./linkList";

const staticLinks = [
  {
    path: "/nico/search",
    name: "search",
  },
  {
    path: "/nico/bulk",
    name: "bulk",
  },
];

export default function Sidebar() {
  return (
    <ul className="grid grid-rows-1 gap-3">
      {staticLinks.map(({ path, name }) => (
        <li key={path}>
          <Link href={path} className="text-blue-400">
            {name}
          </Link>
        </li>
      ))}
      <Suspense>
        <SearchConditions />
      </Suspense>
    </ul>
  );
}
