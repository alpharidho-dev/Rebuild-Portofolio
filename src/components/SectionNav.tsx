"use client";

import { homeSections } from "@/config/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

/**
 * Sub-nav homepage (PRD T8): chip sticky di bawah navbar, scroll-spy
 * via useActiveSection (+ bottom-of-page fix di dalam hook).
 * Hanya dirender kalau jumlah section >= 3.
 */
const SECTION_IDS = homeSections.map((s) => s.id);
const FALLBACK = SECTION_IDS[0] ?? "about";

export function SectionNav() {
  const active = useActiveSection(SECTION_IDS, FALLBACK);

  if (SECTION_IDS.length < 3) return null;

  return (
    <nav
      aria-label="Section navigation"
      className="sticky top-20 z-40 flex justify-center px-5 md:pl-[240px] md:pr-10"
    >
      <div className="flex max-w-full items-center gap-1.5 overflow-x-auto rounded-full border border-neutral-800/70 bg-neutral-900/90 p-1.5 backdrop-blur-md">
        {homeSections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={cn(
              "shrink-0 rounded-full px-4 py-1.5 text-xs transition-colors",
              active === s.id
                ? "bg-white font-semibold text-black"
                : "text-neutral-400 hover:text-white",
            )}
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}