"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import type { ComponentType } from "react";
import { Reveal } from "@/components/Reveal";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/icons";

/* ------------------------------------------------------------------ */
/* shared bits                                                         */
/* ------------------------------------------------------------------ */

function SectionHeader({
  index,
  title,
  hint,
}: {
  index: string;
  title: string;
  hint: string;
}) {
  return (
    <Reveal>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-neutral-500">{`// ${index}`}</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
            {title}
          </h2>
        </div>
        <span className="text-xs text-neutral-600">{hint}</span>
      </div>
    </Reveal>
  );
}

const SECTION_WRAP = "relative px-6 py-24 md:px-12";

/* ------------------------------------------------------------------ */
/* projects                                                            */
/* ------------------------------------------------------------------ */

const PROJECTS = [
  {
    index: "01",
    title: "CLI Dashboard",
    desc: "Terminal-native dashboard streaming CPU, memory and deploy metrics over websockets — renders entirely in the shell.",
    tags: ["Node.js", "Ink", "WebSocket"],
  },
  {
    index: "02",
    title: "Realtime Collab Editor",
    desc: "CRDT-based markdown editor with presence cursors and offline sync. Conflict-free merges across flaky connections.",
    tags: ["Next.js", "Yjs", "Postgres"],
  },
  {
    index: "03",
    title: "Edge Auth Gateway",
    desc: "Zero-trust auth layer running at the edge: JWT verification, rate limiting and session revocation in <10ms.",
    tags: ["TypeScript", "Edge", "JWT"],
  },
  {
    index: "04",
    title: "Schema Migrator",
    desc: "Declarative database migration tool with dry-run diffs, lock-aware execution and automatic rollback plans.",
    tags: ["PostgreSQL", "CLI", "DX"],
  },
  {
    index: "05",
    title: "Telemetry Pipeline",
    desc: "High-throughput event ingestion: 40k events/s through a Redis buffer into columnar storage with p99 dashboards.",
    tags: ["Redis", "Kafka", "ClickHouse"],
  },
  {
    index: "06",
    title: "Monorepo Forge",
    desc: "Opinionated Turborepo starter: strict TS, changesets, preview deploys and CI caching wired out of the box.",
    tags: ["Turborepo", "CI/CD", "DX"],
  },
];

export function ProjectsSection() {
  return (
    <section id="work" className={SECTION_WRAP}>
      <SectionHeader index="01 · selected work" title="Projects" hint="[06]" />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.index} delay={(i % 3) * 0.08}>
            <motion.article
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group h-full rounded-xl border border-neutral-800 bg-[#121212] p-6 transition-colors duration-300 hover:border-neutral-600"
            >
              <div className="flex items-start justify-between">
                <span className="text-xs text-neutral-600">{p.index}</span>
                <ArrowUpRight className="h-4 w-4 text-neutral-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                {p.desc}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-neutral-700/80 px-2 py-0.5 text-[10px] text-neutral-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* stack                                                               */
/* ------------------------------------------------------------------ */

const STACK = [
  { code: "NX", name: "Next.js", note: "framework" },
  { code: "RE", name: "React", note: "ui" },
  { code: "TS", name: "TypeScript", note: "language" },
  { code: "TW", name: "Tailwind CSS", note: "styling" },
  { code: "NO", name: "Node.js", note: "runtime" },
  { code: "PG", name: "PostgreSQL", note: "database" },
  { code: "DK", name: "Docker", note: "containers" },
  { code: "GQ", name: "GraphQL", note: "api" },
  { code: "RD", name: "Redis", note: "cache" },
  { code: "AW", name: "AWS", note: "cloud" },
  { code: "GT", name: "Git", note: "vcs" },
  { code: "VT", name: "Vitest", note: "testing" },
];

export function StackSection() {
  return (
    <section id="tech" className={SECTION_WRAP}>
      <SectionHeader index="02 · daily drivers" title="Stack" hint="[12]" />
      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {STACK.map((s, i) => (
          <Reveal key={s.code} delay={(i % 4) * 0.06}>
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="flex items-center gap-3 rounded-lg border border-neutral-800 bg-[#121212] px-4 py-3 transition-colors duration-300 hover:border-neutral-600"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded border border-neutral-700 text-[10px] text-neutral-400">
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
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* lab                                                                 */
/* ------------------------------------------------------------------ */

const LAB = [
  {
    title: "binary-rain.css",
    desc: "Deterministic matrix-style backdrop generator — zero JS, pure CSS.",
    status: "OSS",
  },
  {
    title: "prompt-atlas",
    desc: "Curated map of LLM prompting patterns for code-review workflows.",
    status: "WIP",
  },
  {
    title: "mono-ui",
    desc: "Monochrome component kit: terminal aesthetics, system fonts only.",
    status: "WIP",
  },
  {
    title: "latency-probe",
    desc: "CLI that draws p50/p99 latency histograms straight in the terminal.",
    status: "ARCHIVED",
  },
];

const STATUS_STYLE: Record<string, string> = {
  OSS: "border-neutral-500 text-neutral-300",
  WIP: "border-neutral-700 text-neutral-400",
  ARCHIVED: "border-neutral-800 text-neutral-600",
};

export function LabSection() {
  return (
    <section id="lab" className={SECTION_WRAP}>
      <SectionHeader index="03 · experiments" title="Lab" hint="[04]" />
      <div className="mt-8">
        {LAB.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06}>
            <div className="group flex items-center justify-between gap-6 border-b border-neutral-800/70 py-5">
              <div className="min-w-0">
                <p className="text-sm text-white transition-transform duration-300 group-hover:translate-x-1">
                  {item.title}
                </p>
                <p className="mt-1 truncate text-xs text-neutral-500">
                  {item.desc}
                </p>
              </div>
              <span
                className={`shrink-0 rounded border px-2 py-0.5 text-[10px] ${STATUS_STYLE[item.status]}`}
              >
                {item.status}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* contact / about                                                     */
/* ------------------------------------------------------------------ */

const SOCIALS: {
  label: string;
  href: string;
  Icon: ComponentType<{ className?: string }>;
}[] = [
  { label: "GitHub", href: "https://github.com", Icon: GithubIcon },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedinIcon },
  { label: "Twitter", href: "https://twitter.com", Icon: TwitterIcon },
];

export function ContactSection() {
  return (
    <section id="about" className={SECTION_WRAP}>
      <SectionHeader index="04 · say hello" title="Contact" hint="[open]" />
      <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <Reveal delay={0.05}>
          <p className="text-sm leading-relaxed text-neutral-400">
            I&apos;m Alpharidho — a senior architect who has spent the last
            decade turning ambiguous business problems into boring, reliable
            systems. I care about type safety, measurable latency and
            interfaces that stay out of the way.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-400">
            Currently open to staff/architecture roles, consulting engagements
            and interesting open-source collaborations. The fastest way to
            reach me is email — I reply within 24 hours.
          </p>
          <div className="mt-8 flex items-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.94 }}
                className="rounded-lg border border-neutral-800 bg-[#121212] p-2.5 text-neutral-400 transition-colors hover:border-neutral-600 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
            <motion.a
              href="mailto:hello@alpharidho.dev"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="ml-2 rounded-md bg-white px-5 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-neutral-300"
            >
              Say Hello →
            </motion.a>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="rounded-xl border border-neutral-800 bg-[#121212] p-6">
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <Mail className="h-4 w-4 text-neutral-500" />
              hello@alpharidho.dev
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-neutral-800 pt-4 text-xs text-neutral-500">
              <span>location</span>
              <span className="text-neutral-300">Jakarta, ID (UTC+7)</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-neutral-800 pt-3 text-xs text-neutral-500">
              <span>status</span>
              <span className="flex items-center gap-2 text-neutral-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                open to work
              </span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-neutral-800 pt-3 text-xs text-neutral-500">
              <span>more</span>
              <Link
                href="/about"
                className="text-neutral-300 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                /about →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* footer                                                              */
/* ------------------------------------------------------------------ */

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-2 border-t border-neutral-800/70 px-6 py-8 text-[11px] text-neutral-600 md:flex-row md:px-12">
      <span>© 2026 Alpharidho</span>
      <span>built with next.js + tailwind — no pixels were colored</span>
    </footer>
  );
}
