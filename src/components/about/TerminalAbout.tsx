"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE_OUT, Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* syntax token helpers — netral + aksen hijau terminal                */
/* ------------------------------------------------------------------ */

const Kw = ({ children }: { children: ReactNode }) => (
  <span className="font-medium text-green-400">{children}</span>
);
const Str = ({ children }: { children: ReactNode }) => (
  <span className="text-neutral-300">{children}</span>
);
const Prop = ({ children }: { children: ReactNode }) => (
  <span className="text-neutral-400">{children}</span>
);
const Fn = ({ children }: { children: ReactNode }) => (
  <span className="font-medium text-white">{children}</span>
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
    <Pu>{"{"}</Pu> <Prop>mode</Prop>
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
    <Pu>();</Pu>{" "}
    {/* kursor terminal berkedip — aksen hijau */}
    <span className="inline-block h-[1.05em] w-2 translate-y-[0.15em] animate-blink bg-green-400" />
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
        {/* code body — nomor baris + per-line staggered reveal */}
        <div className="overflow-x-auto p-5 text-[13px] leading-6 md:p-6">
          {CODE_LINES.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: EASE_OUT }}
              className={cn(
                "-mx-1 flex gap-5 rounded-sm px-1",
                i === CODE_LINES.length - 1 && "bg-neutral-800/40",
              )}
            >
              <span className="w-5 shrink-0 select-none text-right text-neutral-700">
                {i + 1}
              </span>
              <span className="min-w-0 flex-1 whitespace-pre-wrap break-words">
                {line}
              </span>
            </motion.div>
          ))}
        </div>
        {/* status bar ala editor — biar terasa seperti editor beneran */}
        <div className="flex items-center justify-between border-t border-neutral-800/80 px-5 py-2 text-[10px] text-neutral-500">
          <span>{`Ln ${CODE_LINES.length}, Col 19`}</span>
          <span className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
              no issues
            </span>
            <span>TypeScript</span>
            <span>UTF-8</span>
          </span>
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
  { src: "/images/about-1.png", w: 85, h: 400, top: 0, border: "border-0" },
  { src: "/images/about-2.png", w: 82, h: 492, top: 0, border: "border-0" },
  { src: "/images/about-3.png", w: 82, h: 444, top: 0, border: "border-0" },
];

function PhotoCollage() {
  return (
    <div className="shrink-0">
      {/* mobile: single full photo */}
      <div className="relative h-80 overflow-hidden rounded-xl border border-neutral-700/60 md:hidden">
        <Image
          src="/images/about-2.png"
          alt="Alpharidho sitting with a mountain view"
          fill
          sizes="(min-width: 768px) 120px, 100vw"
          className="object-cover transition-transform duration-700 hover:scale-[1.04]"
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
              className="object-cover transition-transform duration-700 hover:scale-[1.04]"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* composition — terminal editor (aksen hijau) + foto belah 3          */
/* ------------------------------------------------------------------ */

export function TerminalAbout() {
  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
      <PhotoCollage />
      <div className="min-w-0 flex-1">
        <CodeEditor />
      </div>
    </div>
  );
}