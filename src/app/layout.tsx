import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Shell } from "@/components/Shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alpharidho — Dev_Root · Senior Architect",
  description:
    "Monochrome developer portfolio of Alpharidho (Dev_Root). Selected projects, engineering stack, lab experiments and contact.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[#050505] font-mono text-neutral-200 antialiased">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
