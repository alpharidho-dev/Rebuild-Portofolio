import type { Metadata } from "next";
import { AboutContent } from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About — Alpharidho",
  description:
    "About Alpharidho: high-school developer & senior architect in the making. Code-first introduction, live system stats and a sliced photo collage.",
};

export default function AboutPage() {
  return <AboutContent />;
}
