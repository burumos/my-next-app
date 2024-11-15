import Bulk from "@/app/components/nico/bulk";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "nico bulk",
};

export default function NicoBulkPage() {
  return <Bulk />;
}
