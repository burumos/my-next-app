import { SearchList } from "@/app/components/nico/list";
import Search from "@/app/components/nico/search";
import { Suspense } from "react";

export default function NicoSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div>
      <Search />
      <Suspense fallback={<div>Loading...</div>}>
        <SearchList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
