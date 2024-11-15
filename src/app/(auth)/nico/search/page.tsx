import { SearchList } from "@/app/components/nico/list";
import Search from "@/app/components/nico/search";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "nico search",
};

export default async function NicoSearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="ms-3 mb-6 pe-3 h-[calc(100vh-70px)] w-full overflow-auto">
      <div className="flex justify-center mb-9">
        <div className="max-w-[400px] w-full">
          <Search />
        </div>
      </div>
      <Suspense key={new Date().toISOString()} fallback={<div>Loading...</div>}>
        <SearchList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
