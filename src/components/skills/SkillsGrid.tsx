import Link from "next/link";
import { ArrowRight, Code2, Cpu, Wrench } from "lucide-react";
import { EASE_OUT } from "@/components/Reveal";

export interface TechItem {
  name: string;
  category?: string;
  icon?: string;
}

interface Props {
  tech: TechItem[];
}

export function TechGrid({ tech }: Props) {
  return (
    <section className="px-8 py-14">
      <p className="text-sm font-mono text-neutral-500">// tech stack</p>
      <div className="mt-2 grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
            <Code2 className="w-5 h-5" />
            Skills
          </h2>
        </div>
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
            <Cpu className="w-5 h-5" />
            Frameworks
          </h2>
        </div>
        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
            <Wrench className="w-5 h-5" />
            Tools
          </h2>
        </div>
      </div>
    </section>
  );
}