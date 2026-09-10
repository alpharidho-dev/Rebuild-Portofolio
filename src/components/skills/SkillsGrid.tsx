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
    <div className="flex shrink-0 items-center gap-4 rounded-2xl border border-neutral-800 bg-[#121212] px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-600 hover:bg-[#161616]">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-neutral-700/70 bg-[#0d0d0d] text-neutral-200">
        <TechIcon name={item.name} className="h-6 w-6" />
      </span>
      <span className="block leading-tight">
        <span className="block whitespace-nowrap text-sm font-medium text-neutral-100">
          {item.name}
        </span>
        <span className="block text-[10px] text-neutral-500">
          {item.note}
        </span>
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
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] motion-reduce:overflow-visible motion-reduce:[mask-image:none]">
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
    /* 3 baris marquee tersebar merata mengisi tinggi section */
    <div className="flex flex-1 flex-col justify-evenly gap-8">
      <MarqueeRow items={rowSkills} />
      <MarqueeRow items={rowFrameworks} reverse />
      <MarqueeRow items={rowTools} />
    </div>
  );
}