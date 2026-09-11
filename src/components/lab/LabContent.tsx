"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { BinaryRain } from "@/components/BinaryRain";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ScrollStage } from "@/components/ScrollStage";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* data                                                                */
/* ------------------------------------------------------------------ */

type Status = "OSS" | "WIP" | "ARCHIVED";

interface Experiment {
  index: string;
  title: string;
  desc: string;
  status: Status;
  tags: string[];
  year: string;
  link: string;
}

const EXPERIMENTS: Experiment[] = [
  {
    index: "exp_01",
    title: "binary-rain.css",
    desc: "Deterministic matrix-style backdrop generator — zero JS, pure CSS. Seeded PRNG, no hydration mismatch.",
    status: "OSS",
    tags: ["CSS", "Zero-JS", "PRNG"],
    year: "2026",
    link: "https://github.com/alpharidho-dev",
  },
  {
    index: "exp_02",
    title: "prompt-atlas",
    desc: "Curated map of LLM prompting patterns for code-review workflows.",
    status: "WIP",
    tags: ["LLM", "DX", "Markdown"],
    year: "2026",
    link: "https://github.com/alpharidho-dev",
  },
  {
    index: "exp_03",
    title: "mono-ui",
    desc: "Monochrome component kit: terminal aesthetics, system fonts only.",
    status: "WIP",
    tags: ["React", "Tailwind", "a11y"],
    year: "2025",
    link: "https://github.com/alpharidho-dev",
  },
  {
    index: "exp_04",
    title: "latency-probe",
    desc: "CLI that draws p50/p99 latency histograms straight in the terminal.",
    status: "ARCHIVED",
    tags: ["Node.js", "CLI", "histogram"],
    year: "2025",
    link: "https://github.com/alpharidho-dev",
  },
];

const STATUS_META: Record<Status, { dot: string; badge: string; blink: boolean }> = {
  OSS: { dot: "bg-neutral-300", badge: "border-neutral-600 text-neutral-300", blink: false },
  WIP: { dot: "bg-cyan-400", badge: "border-cyan-400/50 text-cyan-300", blink: true },
  ARCHIVED: { dot: "bg-neutral-700", badge: "border-neutral-800 text-neutral-600", blink: false },
};

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

export function LabContent() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BinaryRain />
      <ScrollStage
        as="main"
        variant="page"
        className="relative z-10 px-5 pb-28 pt-47 md:pb-16 md:pl-[255px] md:pr-10"
      >
        <PageHeader index="03 · experiments" title="Lab" hint="[04]" />

        {/* terminal prompt line */}
        <Reveal delay={0.05}>
          <p className="mt-6 text-xs text-green-400">
            <span className="mr-2 opacity-70">$</span>
            ls ~/lab --status=all
            <span className="animate-blink ml-1">_</span>
          </p>
        </Reveal>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {EXPERIMENTS.map((exp, i) => {
            const meta = STATUS_META[exp.status];
            return (
              <Reveal key={exp.index} delay={(i % 2) * 0.08}>
                <motion.article
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className="group flex h-full flex-col rounded-xl border border-neutral-800 bg-[#121212] p-6 transition-colors duration-300 hover:border-neutral-600"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="relative flex h-1.5 w-1.5">
                        {meta.blink && (
                          <span
                            className={cn(
                              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
                              meta.dot,
                            )}
                          />
                        )}
                        <span
                          className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", meta.dot)}
                        />
                      </span>
                      <span
                        className={cn(
                          "rounded border px-2 py-0.5 text-[10px]",
                          meta.badge,
                        )}
                      >
                        {exp.status}
                      </span>
                    </span>
                    <span className="text-xs text-neutral-600">{exp.index}</span>
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-white transition-transform duration-300 group-hover:translate-x-1">
                    {exp.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                    {exp.desc}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded border border-neutral-700/80 px-2 py-0.5 text-[10px] text-neutral-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-neutral-800/70 pt-4 text-xs">
                    <span className="text-neutral-600">{exp.year}</span>
                    <Link
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-neutral-400 transition-colors hover:text-white"
                    >
                      view source
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}

          {/* reserved slot — biar grid genap dan terasa "hidup" */}
          <Reveal delay={0.08}>
            <div className="flex h-full min-h-40 flex-col items-start justify-center rounded-xl border border-dashed border-neutral-800 p-6 text-neutral-600">
              <p className="text-xs">slot_05</p>
              <p className="mt-2 text-sm">
                reserved for next experiment
                <span className="animate-blink ml-1">_</span>
              </p>
            </div>
          </Reveal>
        </div>

        {/* now experimenting — tty style footer card */}
        <Reveal delay={0.1}>
          <div className="mt-8 rounded-xl border border-neutral-800 bg-[#0d0d0d] p-5">
            <div className="flex items-center justify-between text-[10px] text-neutral-500">
              <span>now experimenting</span>
              <span>tty2</span>
            </div>
            <p className="mt-3 text-xs text-green-400">
              <span className="mr-2 opacity-70">&gt;</span>
              mono-ui: tuning focus-visible rings…
              <span className="animate-blink ml-1">_</span>
            </p>
          </div>
        </Reveal>
      </ScrollStage>
    </div>
  );
}
