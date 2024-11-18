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
    <div className="grid grid-rows-1 gap-3">
      {staticLinks.map(({ path, name }) => (
        <div key={path}>
          <StaticLink path={path} name={name} />
        </div>
      ))}
      <Suspense>
        <SearchConditions />
      </Suspense>
    </div>
  );
}

