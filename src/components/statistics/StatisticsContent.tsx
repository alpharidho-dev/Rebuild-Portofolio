"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { Star } from "lucide-react";
import { BinaryRain } from "@/components/BinaryRain";
import { PageHeader } from "@/components/PageHeader";
import { EASE_OUT, Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import type { MonkeytypeData } from "@/lib/stats/monkeytype";
import type { GithubData } from "@/lib/stats/github";

/* ------------------------------------------------------------------ */
/* shared bits                                                         */
/* ------------------------------------------------------------------ */

function SourceBadge({ source }: { source: "live" | "demo" }) {
  if (source === "live") {
    return (
      <span className="flex items-center gap-1.5 rounded border border-cyan-400/60 px-2 py-0.5 text-[10px] text-cyan-300">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
        </span>
        LIVE
      </span>
    );
  }
  return (
    <span className="rounded border border-neutral-700 px-2 py-0.5 text-[10px] text-neutral-400">
      DEMO DATA
    </span>
  );
}

function Tile({ label, value, suffix }: { label: string; value: ReactNode; suffix?: string }) {
  return (
    <div className="rounded-lg border border-neutral-800 bg-[#121212] px-4 py-3">
      <p className="text-[10px] tracking-widest text-neutral-500">{label}</p>
      <p className="mt-1 text-xl font-bold text-white">
        {value}
        {suffix && (
          <span className="ml-1 text-xs font-normal text-neutral-500">{suffix}</span>
        )}
      </p>
    </div>
  );
}

/** Angka count-up saat masuk viewport (pola sama kayak MemUsageCard). */
function CountUp({
  value,
  decimals = 0,
  className,
}: {
  value: number;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();
  const [txt, setTxt] = useState("0");

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setTxt(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, reduced, value, decimals]);

  // reduced-motion / belum di viewport → tampilkan nilai akhir langsung
  const displayed = !inView ? "0" : reduced ? value.toFixed(decimals) : txt;

  return (
    <span ref={ref} className={className}>
      {displayed}
    </span>
  );
}

/** Bar chart murni div — bar tertinggi di-highlight cyan. */
function Bars({
  values,
  labels,
  height = "h-24",
}: {
  values: number[];
  labels?: string[];
  height?: string;
}) {
  const max = Math.max(...values, 1);
  const maxI = values.indexOf(max);
  return (
    <div>
      <div className={cn("flex items-end gap-1.5", height)}>
        {values.map((v, i) => (
          <motion.div
            key={i}
            title={String(v)}
            initial={{ height: 0 }}
            whileInView={{ height: `${Math.max((v / max) * 100, 4)}%` }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.04, ease: EASE_OUT }}
            className={cn(
              "flex-1 rounded-sm",
              i === maxI
                ? "bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.55)]"
                : "bg-neutral-700",
            )}
          />
        ))}
      </div>
      {labels && labels.length > 0 && (
        <div className="mt-1.5 flex justify-between text-[9px] text-neutral-600">
          <span>{labels[0]}</span>
          <span>{labels[labels.length - 1]}</span>
        </div>
      )}
    </div>
  );
}

function PanelShell({
  title,
  badge,
  children,
}: {
  title: ReactNode;
  badge: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="flex h-full flex-col rounded-xl border border-neutral-800 bg-[#0d0d0d] p-6 shadow-xl shadow-black/40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm text-neutral-200">{title}</div>
        {badge}
      </div>
      <div className="mt-6 flex flex-1 flex-col gap-6">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* monkeytype panel                                                    */
/* ------------------------------------------------------------------ */

function MonkeyPanel({ data }: { data: MonkeytypeData }) {
  // hero: pakai pb tertinggi yang tersedia (60 → 30 → 15)
  const hero = data.best.t60
    ? { mode: "60", entry: data.best.t60 }
    : data.best.t30
      ? { mode: "30", entry: data.best.t30 }
      : data.best.t15
        ? { mode: "15", entry: data.best.t15 }
        : null;
  return (
    <Reveal>
      <PanelShell
        title={
          <>
            <span className="text-neutral-500">~/</span>monkeytype
          </>
        }
        badge={<SourceBadge source={data.source} />}
      >
        {/* hero number */}
        <div>
          <p className="text-xs tracking-widest text-neutral-500">
            {`PERSONAL BEST · ${hero?.mode ?? "60"}s`}
          </p>
          <p className="mt-1 text-5xl font-bold text-white">
            <CountUp value={hero?.entry.wpm ?? 0} />
            <span className="ml-2 text-lg font-semibold text-cyan-400">wpm</span>
          </p>
        </div>

        {/* tiles */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Tile label="PB 15" value={data.best.t15?.wpm ?? "—"} suffix="wpm" />
          <Tile label="PB 30" value={data.best.t30?.wpm ?? "—"} suffix="wpm" />
          <Tile
            label="ACC"
            value={data.avgAcc ?? data.best.t60?.acc ?? "—"}
            suffix="%"
          />
          <Tile label="CONS" value={hero?.entry.consistency ?? "—"} suffix="%" />
          <Tile label="TIME" value={data.timeTypingHours} suffix="hrs" />
          <Tile label="TESTS" value={data.completedTests} />
        </div>

        {/* pb breakdown */}
        <div className="space-y-1.5 text-xs">
          {(["t15", "t30", "t60"] as const).map((k) => {
            const b = data.best[k];
            return (
              <div
                key={k}
                className="flex items-center justify-between border-b border-neutral-800/70 pb-1.5"
              >
                <span className="text-neutral-500">pb {k.slice(1)}s</span>
                <span className="text-neutral-300">
                  {b
                    ? `${b.wpm} wpm · raw ${b.raw} · ${b.acc}% acc · ${b.consistency}% cons`
                    : "—"}
                </span>
              </div>
            );
          })}
        </div>

        {/* recent tests chart */}
        <div className="mt-auto">
          <p className="mb-3 text-[10px] tracking-widest text-neutral-500">
            RECENT TESTS · WPM
          </p>
          {data.recent.length > 0 ? (
            <Bars values={data.recent.map((r) => r.wpm)} />
          ) : (
            <p className="text-xs text-neutral-600">no recent tests recorded.</p>
          )}
        </div>
      </PanelShell>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* github panel                                                        */
/* ------------------------------------------------------------------ */

const LANG_SHADES = ["bg-white", "bg-neutral-400", "bg-neutral-600", "bg-neutral-800"];

function GithubPanel({ data }: { data: GithubData }) {
  return (
    <Reveal delay={0.08}>
      <PanelShell
        title={
          <>
            {data.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.avatarUrl}
                alt={data.username}
                className="h-9 w-9 rounded-full border border-neutral-700 grayscale"
              />
            ) : (
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-700 text-xs text-neutral-300">
                {data.name.slice(0, 2).toUpperCase()}
              </span>
            )}
            <span>
              <span className="block text-neutral-200">{data.name}</span>
              <span className="block text-[10px] text-neutral-500">
                @{data.username} · since {data.joinedYear}
              </span>
            </span>
          </>
        }
        badge={<SourceBadge source={data.source} />}
      >
        {/* tiles */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Tile label="FOLLOWERS" value={data.followers} />
          <Tile label="REPOS" value={data.publicRepos} />
          <Tile label="STARS" value={data.totalStars} />
          <Tile label="ACTIVITY" value={<CountUp value={data.contributionsYear} />} />
        </div>
        <p className="-mt-4 text-[10px] text-neutral-600">{data.contributionsLabel}</p>

        {/* weekly activity */}
        <div>
          <p className="mb-3 text-[10px] tracking-widest text-neutral-500">
            ACTIVITY · 12 WEEKS
          </p>
          <Bars
            values={data.activity.map((a) => a.count)}
            labels={data.activity.map((a) => a.label)}
          />
        </div>

        {/* languages */}
        {data.languages.length > 0 && (
          <div>
            <p className="mb-3 text-[10px] tracking-widest text-neutral-500">
              LANGUAGES
            </p>
            <div className="flex h-2 w-full overflow-hidden rounded-full">
              {data.languages.map((l, i) => (
                <div
                  key={l.name}
                  style={{ width: `${l.percent}%` }}
                  className={LANG_SHADES[i % LANG_SHADES.length]}
                />
              ))}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-neutral-500">
              {data.languages.map((l, i) => (
                <span key={l.name} className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      LANG_SHADES[i % LANG_SHADES.length],
                    )}
                  />
                  {l.name} {l.percent}%
                </span>
              ))}
            </div>
          </div>
        )}

        {/* top repos */}
        <div className="mt-auto space-y-1.5 text-xs">
          {data.topRepos.map((r) => (
            <a
              key={r.name}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between border-b border-neutral-800/70 pb-1.5 transition-colors hover:text-white"
            >
              <span className="min-w-0 truncate text-neutral-300">
                {r.name}
                {r.description && (
                  <span className="ml-2 hidden text-neutral-600 sm:inline">
                    {r.description}
                  </span>
                )}
              </span>
              <span className="flex shrink-0 items-center gap-1 text-neutral-400">
                <Star className="h-3 w-3" />
                {r.stars}
              </span>
            </a>
          ))}
        </div>
      </PanelShell>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* page                                                                */
/* ------------------------------------------------------------------ */

export function StatisticsContent({
  monkeytype,
  github,
}: {
  monkeytype: MonkeytypeData;
  github: GithubData;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BinaryRain />
      <main className="relative z-10 px-5 pb-28 pt-47 md:pb-16 md:pl-[240px] md:pr-10">
        <PageHeader index="05 · telemetry" title="Statistics" hint="[live]" />

        <Reveal delay={0.05}>
          <p className="mt-6 text-xs text-green-400">
            <span className="mr-2 opacity-70">$</span>
            cat /proc/self/telemetry --watch
            <span className="animate-blink ml-1">_</span>
          </p>
        </Reveal>

        <div className="mt-8 grid gap-8 xl:grid-cols-2">
          <MonkeyPanel data={monkeytype} />
          <GithubPanel data={github} />
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-[11px] text-neutral-600">
            {"// data di-refresh tiap jam · isi APIMONKEYTYPER & GITHUB_TOKEN di .env.local buat data live"}
          </p>
        </Reveal>
      </main>
    </div>
  );
}
