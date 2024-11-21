import Sidebar from "@/app/components/nico/sidebar";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1500px] w-full h-full mx-auto flex flex-col md:flex-row box-content">
      <div className="min-w-[200px] md:w-1/6 flex-shrink-0 pb-3 px-2 mb-3 md:pb-0 md:border-r-2 border-b-2 md:border-b-0">
        <Sidebar />
      </div>
      <div className="flex-grow w-full flex justify-center">
        {children}
      </div>
    </div>
  );
}
