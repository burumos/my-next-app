import Sidebar from "@/app/components/nico/sidebar";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1500px] w-full h-full mx-auto flex box-content">
      <div className="min-w-[200px] w-1/6 flex-shrink-0 px-2 border-r-2">
        <Sidebar />
      </div>
      <div className="flex-grow w-full flex justify-center">
        {children}
      </div>
    </div>
  );
}
