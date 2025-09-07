"use client";

import Link from "next/link";
import { useState } from "react";

type LinkItem = {
  url: string;
  label: string;
};

const links: LinkItem[] = [
  { url: "/nico/search", label: "/nico/search" },
  { url: "/nico/bulk", label: "/nico/bulk" },
  { url: "/daily", label: "daily" },
];

export default function HeaderAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-900"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="material-symbols-outlined text-2xl">menu</span>
      </button>
      {open && (
        <div className="absolute left-0 mt-2 bg-gray-800 border rounded shadow-lg z-10 min-w-[160px]">
          <ul>
            {links.map(({ url, label }) => (
              <li key={url}>
                <Link href={url} className="block px-4 py-2 hover:bg-gray-700" onClick={() => setOpen(false)}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
