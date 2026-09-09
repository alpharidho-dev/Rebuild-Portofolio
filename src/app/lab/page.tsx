import type { Metadata } from "next";
import { LabContent } from "@/components/lab/LabContent";

export const metadata: Metadata = {
  title: "Lab — Alpharidho",
  description:
    "Lab experiments: small, sharp tools and toys — binary rain, mono-ui, latency probes and more.",
};

export default function LabPage() {
  return <LabContent />;
}
