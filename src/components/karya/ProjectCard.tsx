"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { TechIcon } from "@/components/TechIcon";
import type { Project } from "@/types/content";

/**
 * Kartu proyek — dipakai di section Karya Terpilih (home) dan grid
 * /karya. Satu-satunya tempat gaya kartu proyek didefinisikan.
 */
export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <Reveal delay={(index % 3) * 0.08}>
      <Link href={`/karya/${project.slug}`} className="block h-full">
        <motion.article
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="group flex h-full flex-col rounded-xl border border-neutral-800 bg-[#121212] p-6 transition-colors duration-300 hover:border-neutral-600"
        >
          <div className="flex items-start justify-between">
            <span className="text-xs text-neutral-600">
              {String(index + 1).padStart(2, "0")}
            </span>
            <ArrowUpRight className="h-4 w-4 text-neutral-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
          </div>
          <h3 className="mt-4 text-sm font-semibold text-white">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">
            {project.tagline}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <span
                key={t}
                className="flex items-center gap-1.5 rounded border border-neutral-700/80 px-2 py-0.5 text-[10px] text-neutral-400"
              >
                <TechIcon name={t} className="h-3 w-3" />
                {t}
              </span>
            ))}
          </div>
        </motion.article>
      </Link>
    </Reveal>
  );
}