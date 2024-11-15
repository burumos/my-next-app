import { Suspense } from "react";
import { SearchConditions } from "./linkList";
import { StaticLink } from "./staticLink";

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
          <StaticLink path={path} name={name} />
        </li>
      ))}
      <Suspense>
        <SearchConditions />
      </Suspense>
    </ul>
  );
}

