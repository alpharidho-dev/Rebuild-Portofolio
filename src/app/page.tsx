import type { Metadata } from "next";
import { Hero } from "@/components/Hero";

export const metadata: Metadata = {
  title: "Alpharidho — Dev_Root · Senior Architect",
  description:
    "Monochrome developer portfolio of Alpharidho. Home of the binary rain.",
};

export default function Home() {
  return <Hero />;
}
