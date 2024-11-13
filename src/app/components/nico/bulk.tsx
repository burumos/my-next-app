import { Suspense } from "react"
import { BulkList } from "./list"
import { bulkAction } from "@/app/lib/nico/bulk"

export default async function Bulk() {
  const action = async () => {
    "use server"
    await bulkAction();
  }
  return (
    <div className="p-2">
      <div className="flex justify-center m-5">
        <form action={action}>
          <button className="border-2 text-xl p-1">fetch</button>
        </form>
      </div>
      <Suspense fallback={<div>loading....</div>}>
        <BulkList />
      </Suspense>
    </div>
  )
}