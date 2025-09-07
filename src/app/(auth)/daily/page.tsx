import DailyMemo from "@/app/components/daily/daily";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "daily",
};

export default function DailyPage() {
  return <DailyMemo />;
}
