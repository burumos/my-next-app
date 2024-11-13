import Sidebar from "@/app/components/nico/sidebar";

export default async function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full flex box-content">
      <div className="w-[200px] flex-shrink-0 px-2 border-r-2">
        <Sidebar />
      </div>
      <div className="w-[calc(100%-200px)]">
        {children}
      </div>
    </div>
  );
}
