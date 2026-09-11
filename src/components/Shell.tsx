"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

/**
 * Persistent app shell: floating navbar + sidebar on every route,
 * with the monochrome page canvas behind them.
 *
 * Scroll-spy (hooks/useActiveSection + daftar section id) belum dipasang —
 * dipakai bareng MobileNav saat versi mobile dibuat.
 */
export function Shell({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen bg-[#050505] font-mono text-neutral-200">
        <Navbar />
        <Sidebar />
        {children}
      </div>
    </MotionConfig>
  );
}
