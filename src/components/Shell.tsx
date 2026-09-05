"use client";

import { usePathname } from "next/navigation";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar,  } from "@/components/Sidebar";
import { useActiveSection } from "@/hooks/useActiveSection";

const SECTION_IDS = ["home", "work", "tech", "lab", "about"] as const;

/**
 * Persistent app shell: floating navbar + sidebar on every route,
 * with the monochrome page canvas behind them.
 */
export function Shell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const fallback = pathname === "/about" ? "about" : "home";
  const active = useActiveSection(SECTION_IDS, fallback);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#050505] font-mono text-neutral-200">
        <Navbar />
        <Sidebar active={active} />
        {/* <MobileNav active={active} /> */}
        {children}
      </div>
    </MotionConfig>
  );
}
