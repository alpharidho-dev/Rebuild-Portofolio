import { Code2, Cpu, Wrench } from "lucide-react";
import type { ComponentType } from "react";
import { skills } from "@/config/skills";
import { Reveal } from "@/components/Reveal";
import type { TechCategory } from "@/types/content";

/* ------------------------------------------------------------------ */
/* SkillsGrid — grid grup per kategori (Skills / Frameworks / Tools). */
/* Data dari config/skills.ts; gaya kartu nyambung sama StackSection  */
/* yang lama (chip kode 2 huruf + nama + note).                       */
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
              <Icon className="h-4 w-4 text-neutral-500" />
              {label}
              <span className="text-[10px] font-normal text-neutral-600">
                [{items.length}]
              </span>
            </h3>
            <div className="mt-4 flex flex-col gap-2">
              {items.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.04}>
                  <div className="flex items-center gap-3 rounded-lg border border-neutral-800 bg-[#121212] px-4 py-2.5 transition-colors duration-300 hover:border-neutral-600">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-neutral-700 text-[10px] text-neutral-400">
                      {s.code}
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