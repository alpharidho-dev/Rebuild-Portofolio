import { Code2, Cpu, Wrench } from "lucide-react";
import type { ComponentType } from "react";
import { skills } from "@/config/skills";
import { Reveal } from "@/components/Reveal";
import { TechIcon } from "@/components/TechIcon";
import type { TechCategory } from "@/types/content";

/* ------------------------------------------------------------------ */
/* SkillsGrid — grid grup per kategori (Skills / Frameworks / Tools). */
/* Tiap item kartu dengan logo brand asli via TechIcon.               */
/* ------------------------------------------------------------------ */

const CATEGORIES: {
  key: TechCategory;
  label: string;
  Icon: ComponentType<{ className?: string }>;
}[] = [
  { key: "skills", label: "Skills", Icon: Code2 },
  { key: "frameworks", label: "Frameworks", Icon: Cpu },
  { key: "tools", label: "Tools", Icon: Wrench },
];

export function SkillsGrid() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {CATEGORIES.map(({ key, label, Icon }) => {
        const items = skills.filter((s) => s.category === key);
        return (
          <div key={key}>
            <h3 className="flex items-center gap-2 text-sm font-bold text-white">
              <span className="flex h-6 w-6 items-center justify-center rounded-md border border-neutral-700/70 bg-[#0d0d0d] text-neutral-400">
                <Icon className="h-3.5 w-3.5" />
              </span>
              {label}
              <span className="text-[10px] font-normal text-neutral-600">
                [{items.length}]
              </span>
            </h3>
            <div className="mt-4 flex flex-col gap-2">
              {items.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.04}>
                  <div className="group flex items-center gap-3 rounded-lg border border-neutral-800 bg-[#121212] px-3.5 py-2.5 transition-all duration-300 hover:border-neutral-600 hover:bg-[#161616]">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-neutral-700/70 bg-[#0d0d0d] text-neutral-300 transition-colors duration-300 group-hover:text-white">
                      <TechIcon name={s.name} className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm text-neutral-200">
                        {s.name}
                      </span>
                      <span className="block text-[10px] text-neutral-500">
                        {s.note}
                      </span>
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}