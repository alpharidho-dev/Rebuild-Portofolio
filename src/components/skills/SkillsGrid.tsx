import { skills } from "@/config/skills";
import { TechIcon } from "@/components/TechIcon";
import { cn } from "@/lib/utils";
import type { TechItem } from "@/types/content";

/* ------------------------------------------------------------------ */
/* SkillsGrid — marquee 3 baris: skills, frameworks, tools.           */
/* Baris tengah jalan ke kanan, sisanya ke kiri. Pause saat hover,     */
/* reduced-motion → grid statis.                                       */
/* ------------------------------------------------------------------ */

function TechCard({ item }: { item: TechItem }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-xl border border-neutral-800 bg-[#121212] px-5 py-4 transition-colors duration-300 hover:border-neutral-600">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-700/70 bg-[#0d0d0d] text-neutral-200">
        <TechIcon name={item.name} className="h-5 w-5" />
      </span>
      <span className="block whitespace-nowrap text-sm text-neutral-200">
        {item.name}
      </span>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: TechItem[];
  reverse?: boolean;
}) {
  const cards = items.map((s) => <TechCard key={s.name} item={s} />);

  return (
    <div className="overflow-hidden motion-reduce:overflow-visible">
      {/* marquee: pause on hover; reduced-motion → wrap statis */}
      <div
        className={cn(
          "flex w-max gap-4 hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {cards}
        <div aria-hidden="true" className="flex gap-4 motion-reduce:hidden">
          {cards}
        </div>
      </div>
    </div>
  );
}

export function SkillsGrid() {
  const rowSkills = skills.filter((s) => s.category === "skills");
  const rowFrameworks = skills.filter((s) => s.category === "frameworks");
  const rowTools = skills.filter((s) => s.category === "tools");

  return (
    /* baris marquee mengisi sisa tinggi section biar penuh 1 layar */
    <div className="flex flex-1 flex-col justify-between gap-6">
      <MarqueeRow items={rowSkills} />
      <MarqueeRow items={rowFrameworks} reverse />
      <MarqueeRow items={rowTools} />
    </div>
  );
}