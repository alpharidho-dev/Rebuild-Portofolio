import type { Metadata } from "next";
import { StatisticsContent } from "@/components/statistics/StatisticsContent";
import { getGithubStats } from "@/lib/stats/github";
import { getMonkeytypeStats } from "@/lib/stats/monkeytype";

export const metadata: Metadata = {
  title: "Statistics — Alpharidho",
  description:
    "Live telemetry: MonkeyType typing stats and GitHub activity, rendered monochrome.",
};

// fetch server-side biar key nggak bocor ke browser; cache 1 jam
export const revalidate = 3600;

export default async function StatisticsPage() {
  const [monkeytype, github] = await Promise.all([
    getMonkeytypeStats(),
    getGithubStats(),
  ]);
  return <StatisticsContent monkeytype={monkeytype} github={github} />;
}
