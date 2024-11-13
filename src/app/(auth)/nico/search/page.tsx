import { SearchList } from "@/app/components/nico/list";
import Search from "@/app/components/nico/search";
import { Suspense } from "react";

export default function NicoSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="ms-3 mb-6 pe-3 max-h-[calc(100vh-70px)] overflow-auto">
      <div className="flex justify-center mb-4">
        <div className="max-w-[400px] w-full">
          <Search />
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
