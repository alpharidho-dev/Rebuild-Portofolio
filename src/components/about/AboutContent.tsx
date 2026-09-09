"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { BinaryRain } from "@/components/BinaryRain";
import { EASE_OUT, Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* syntax token helpers (manual highlighting)                          */
/* ------------------------------------------------------------------ */

const Kw = ({ children }: { children: ReactNode }) => (
  <span className="text-fuchsia-400">{children}</span>
);
const Str = ({ children }: { children: ReactNode }) => (
  <span className="text-green-400">{children}</span>
);
const Prop = ({ children }: { children: ReactNode }) => (
  <span className="text-cyan-300">{children}</span>
);
const Fn = ({ children }: { children: ReactNode }) => (
  <span className="text-yellow-300">{children}</span>
);
const Pu = ({ children }: { children: ReactNode }) => (
  <span className="text-neutral-500">{children}</span>
);
const Id = ({ children }: { children: ReactNode }) => (
  <span className="text-neutral-200">{children}</span>
);

const CODE_LINES: ReactNode[] = [
  <>
    <Kw>import</Kw> <Pu>{"{"}</Pu> <Id>Student</Id> <Pu>{"}"}</Pu>{" "}
    <Kw>from</Kw> <Str>&apos;@SMK/Taruna-Bhakti&apos;</Str>
    <Pu>;</Pu>
  </>,
  <>
    <Kw>import</Kw> <Pu>{"{"}</Pu> <Fn>XI_RPL_4</Fn> <Pu>{"}"}</Pu>{" "}
    <Kw>from</Kw> <Str>&apos;2026/2027&apos;</Str>
    <Pu>;</Pu>
  </>,
  <>
    <Kw>import</Kw> <Pu>{"{"}</Pu> <Id>initializeAPI</Id> <Pu>{"}"}</Pu>{" "}
    <Kw>from</Kw> <Str>&apos;@core/api&apos;</Str>
    <Pu>;</Pu>
  </>,
  <>&nbsp;</>,
  <>
    <Kw>async</Kw> <Kw>function</Kw> <Fn>introduce</Fn>
    <Pu>() {"{"}</Pu>
  </>,
  <>
    {"  "}
    <Kw>const</Kw> <Id>status</Id> <Pu>=</Pu> <Kw>await</Kw>{" "}
    <Fn>initializeAPI</Fn>
    <Pu>({"{"}</Pu> <Prop>mode</Prop>
    <Pu>:</Pu> <Str>&apos;production&apos;</Str>
    <Pu>,</Pu> <Prop>version</Prop>
    <Pu>:</Pu> <Str>&apos;1.0.0&apos;</Str>
    <Pu>{"});"}</Pu>
  </>,
  <>
    {"  "}
    <Kw>const</Kw> <Id>about</Id> <Pu>=</Pu>{" "}
    <Str>
      {
        "`Hi, I'm Alpharidho — a High School Developer building full-stack web apps with React, Next.js, TypeScript, and MySQL. I write type-safe frontends, craft clean API routes, and keep my database queries efficient, all while balancing high school classes. Right now, I'm diving deeper into Next.js Server Actions and looking for an internship to bring my skills to a real-world team. Let's build something impactful together!`"
      }
    </Str>
    <Pu>;</Pu>
  </>,
  <>
    {"  "}
    <Id>console</Id>
    <Pu>.</Pu>
    <Fn>log</Fn>
    <Pu>(</Pu>
    <Id>about</Id>
    <Pu>)</Pu>
  </>,
  <>
    {"  "}
    <Kw>return</Kw> <Pu>{"{"}</Pu>
  </>,
  <>
    {"    "}
    <Prop>name</Prop>
    <Pu>:</Pu> <Str>&apos;Alpharidho&apos;</Str>
    <Pu>,</Pu> <Prop>class</Prop>
    <Pu>:</Pu> <Fn>XI_RPL_4</Fn>
    <Pu>,</Pu> <Prop>school</Prop>
    <Pu>:</Pu> <Str>&apos;SMK Taruna Bhakti&apos;</Str>
    <Pu>,</Pu> <Prop>system</Prop>
    <Pu>:</Pu> <Id>student</Id>
    <Pu>,</Pu>
  </>,
  <>
    {"  "}
    <Pu>{"};"}</Pu>
  </>,
  <>
    <Pu>{"}"}</Pu>
  </>,
  <>&nbsp;</>,
  <>
    <Kw>await</Kw> <Fn>introduce</Fn>
    <Pu>();</Pu>
  </>,
];

function CodeEditor() {
  return (
    <Reveal>
      <div className="overflow-hidden rounded-xl border border-neutral-800 bg-[#0d0d0d] shadow-2xl shadow-black/50">
        {/* title bar */}
        <div className="flex items-center justify-between border-b border-neutral-800/80 px-5 py-3.5">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-xs text-neutral-500">About.ts</span>
        </div>
        {/* code body — per-line staggered reveal */}
        <div className="overflow-x-auto p-5 text-[13px] leading-6 md:p-6">
          {CODE_LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: EASE_OUT }}
              className="whitespace-pre-wrap break-words"
            >
              {line}
            </motion.div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* photo collage — three vertical strips from the mountain-view shoot  */
/* heights & vertical offsets mirror the mockup: middle tallest,       */
/* right reaches the lowest                                            */
/* ------------------------------------------------------------------ */

const STRIPS = [
  { src: "/images/about-1.png", w: 85, h: 400, top: 80, border: "border-0" },
  { src: "/images/about-2.png", w: 82, h: 492, top: 0, border: "border-0" },
  { src: "/images/about-3.png", w: 82, h: 444, top: 70, border: "border-0" },
];

function PhotoCollage() {
  return (
    <div className="shrink-0 pt-20 pr-30 ">
      {/* mobile: single full photo */}
      <div className="relative h-80 overflow-hidden rounded-xl border border-neutral-700/60 md:hidden">
        <Image
          src="/images/about-2.png"
          alt="Alpharidho sitting with a mountain view"
          fill
          sizes="(min-width: 768px) 120px, 100vw"
          className="object-cover"
        />
      </div>

      {/* desktop: sliced strips */}
      <div className="hidden items-start gap-4 md:flex">
        {STRIPS.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: EASE_OUT }}
            className={cn("relative overflow-hidden rounded-lg border", s.border)}
            style={{ width: s.w, height: s.h, marginTop: s.top }}
          >
            <Image
              src={s.src}
              alt="Alpharidho sitting with a mountain view"
              fill
              sizes="120px"
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MEM_USAGE card — count-up number + cycling highlighted bar          */
/* ------------------------------------------------------------------ */

const BARS = [40, 56, 74, 48, 92, 60];

function MemUsageCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [value, setValue] = useState("0.0");
  const [highlight, setHighlight] = useState(4);

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, 78.4, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setValue(v.toFixed(1)),
    });
    return () => controls.stop();
  }, [inView, reduced]);

  const displayed = reduced && inView ? "78.4" : value;

  useEffect(() => {
    if (reduced || !inView) return;
    const timer = setInterval(
      () => setHighlight((h) => (h + 1) % BARS.length),
      2000,
    );
    return () => clearInterval(timer);
  }, [reduced, inView]);

  return (
    <Reveal delay={0.1}>
      <div
        ref={ref}
        className="flex h-full flex-col rounded-xl border border-cyan-400/80 bg-[#0d0d0d] p-6 shadow-[0_0_28px_rgba(34,211,238,0.22)]"
      >
        <p className="text-xs tracking-widest text-neutral-400">MEM_USAGE</p>
        <p className="mt-2 text-4xl font-bold text-white">
          {displayed}
          <span className="ml-1 text-lg font-semibold text-cyan-400">%</span>
        </p>
        <div className="mt-auto flex h-24 items-end gap-2 pt-6">
          {BARS.map((h, i) => (
            <div
              key={i}
              className={cn(
                "flex-1 rounded-sm transition-all duration-500",
                i === highlight
                  ? "bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]"
                  : "bg-teal-700/80",
              )}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* tty1 card — looping boot log with blinking cursor                   */
/* ------------------------------------------------------------------ */

const LOG_LINES = [
  { text: "analyzing network traffic...", tone: "dim" },
  { text: "compiling assets [450ms]", tone: "dim" },
  { text: "deploying container: dev-web-01", tone: "bright" },
  { text: "STATUS: HEALTHY", tone: "status" },
];

function TtyCard() {
  const reduced = useReducedMotion();
  // State untuk menyimpan 4 baris log terakhir
  const [logs, setLogs] = useState(() => LOG_LINES.slice(0, 4));
  
  // State untuk mengatur phase:
  // 0 = analyzing (boleh diulang)
  // 1 = compiling, 2 = deploying, 3 = STATUS (harus berurutan)
  const [phase, setPhase] = useState(0);
  // Counter untuk berapa kali analyzing sudah muncul di siklus ini
  const [analyzingCount, setAnalyzingCount] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => {
      setLogs((prev) => {
        let newLine;

        if (phase === 0) {
          // Phase 0: masih di analyzing, bisa diulang
          // 60% kemungkinan muncul analyzing lagi, 40% lanjut ke compiling
          if (Math.random() < 0.6) {
            // Muncul analyzing lagi
            newLine = LOG_LINES[0];
            setAnalyzingCount((c) => c + 1);
          } else {
            // Lanjut ke compiling
            newLine = LOG_LINES[1];
            setPhase(1);
            setAnalyzingCount(0);
          }
        } else if (phase === 1) {
          // Compiling → wajib lanjut ke deploying
          newLine = LOG_LINES[2];
          setPhase(2);
        } else if (phase === 2) {
          // Deploying → wajib lanjut ke STATUS
          newLine = LOG_LINES[3];
          setPhase(3);
        } else {
          // phase === 3: STATUS sudah muncul, siklus selesai
          // Kembali ke analyzing untuk siklus baru
          newLine = LOG_LINES[0];
          setPhase(0);
          setAnalyzingCount(0);
        }

        // Tambahkan di akhir, buang yang paling atas agar tetap 4 baris
        return [...prev.slice(1), newLine];
      });
    }, 1200); // ganti tiap 1.2 detik

    return () => clearInterval(timer);
  }, [reduced, phase]);

  return (
    <Reveal delay={0.18}>
      <div className="flex h-full flex-col rounded-xl border border-neutral-800 bg-[#0d0d0d] p-5 shadow-xl shadow-black/40">
        <div className="flex justify-end">
          <span className="text-[10px] text-neutral-500">tty1</span>
        </div>
        <div className="mt-2 flex-1 space-y-1.5 text-xs overflow-hidden">
          {logs.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                line.tone === "status" && "text-cyan-300",
                line.tone === "bright" && "text-green-400",
                line.tone === "dim" && "text-green-500/80",
              )}
            >
              <span className="mr-2 opacity-70">&gt;</span>
              {line.text}
            </motion.p>
          ))}
        </div>
        <div className="mt-4 border-t border-neutral-800 pt-3 text-xs text-green-400">
          <span className="mr-2 opacity-70">&gt;</span>
          root@dev-sys:~# <span className="animate-blink">_</span>
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* page composition                                                    */
/* ------------------------------------------------------------------ */

export function AboutContent() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BinaryRain variant="light" />
      <main className="relative z-10 px-5 pb-28 pt-47 md:pb-16 md:pl-[240px] md:pr-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start">
          <PhotoCollage />
          <div className="min-w-0 flex-1">
            <CodeEditor />
            <div className="mt-8 grid gap-8 xl:grid-cols-[1.15fr_1fr]">
              <MemUsageCard />
              <TtyCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
