"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  Mail,
} from "lucide-react";
import { useEffect, useState, type ComponentType } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";
import { TerminalAbout } from "@/components/about/TerminalAbout";
import { GithubIcon, InstagramIcon } from "@/components/icons";
import { ProjectCard } from "@/components/karya/ProjectCard";
import { SkillsGrid } from "@/components/skills/SkillsGrid";
import { siteConfig } from "@/config/site";
import type { Certificate, Project } from "@/types/content";

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
        <span className="text-xs text-neutral-500">{hint}</span>
      </div>
    </Reveal>
  );
}

/* padding nyambung sama halaman sub-route (about/lab/stats) */
/* section = satu layar penuh, konten di tengah vertikal */
const SECTION_WRAP =
  "relative flex min-h-svh flex-col justify-center px-5 py-24 md:pl-[255px] md:pr-10";

const SOCIAL_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  GitHub: GithubIcon,
  Instagram: InstagramIcon,
};

function SocialLinks({ size = "h-4 w-4" }: { size?: string }) {
  return (
    <>
      {siteConfig.socials.map((s) => {
        const Icon = SOCIAL_ICONS[s.label] ?? GithubIcon;
        return (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.94 }}
            className="rounded-lg border border-neutral-800 bg-[#121212] p-2.5 text-neutral-400 transition-colors hover:border-neutral-600 hover:text-white"
          >
            <Icon className={size} />
          </motion.a>
        );
      })}
    </>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard nggak tersedia — diem aja */
    }
  };

  return (
    <button
      onClick={onCopy}
      className="flex items-center gap-2 rounded-md border border-neutral-800 bg-[#121212] px-4 py-2.5 text-xs text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-green-400" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
      {copied ? "copied!" : siteConfig.email}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* S2 — about                                                          */
/* ------------------------------------------------------------------ */

export function AboutSection() {
  return (
    <section id="about" className={SECTION_WRAP}>
      <SectionHeader index="01 · whoami" title="About" hint="[student]" />
      <div className="mt-10">
        <TerminalAbout />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* S3 — stack                                                          */
/* ------------------------------------------------------------------ */

export function StackSection() {
  return (
    <section id="stack" className={SECTION_WRAP}>
      <SectionHeader
        index="02 · daily drivers"
        title="Stack"
        hint="[grouped]"
      />
      {/* isi section mengisi sisa tinggi layar biar marquee penuh, bukan ketengah */}
      <div className="mt-10 flex min-h-0 flex-1 flex-col">
        <SkillsGrid />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* S4 — selected work                                                  */
/* ------------------------------------------------------------------ */

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className={SECTION_WRAP}>
      <SectionHeader
        index="03 · selected work"
        title="Karya"
        hint={`[${projects.length} featured]`}
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
      <Reveal delay={0.1}>
        <Link
          href="/karya"
          className="group mt-8 inline-flex items-center gap-2 text-xs text-neutral-400 transition-colors hover:text-white"
        >
          view all projects
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* S5 — certificates marquee                                           */
/* ------------------------------------------------------------------ */

function CertCard({ cert }: { cert: Certificate }) {
  return (
    <a
      href={cert.credentialUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-neutral-800 bg-[#121212] transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-600 hover:bg-[#161616]"
    >
      {/* cover sertifikat — placeholder monokrom kalau image_url kosong */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-neutral-800 bg-[#0d0d0d]">
        {cert.imageUrl ? (
          <Image
            src={cert.imageUrl}
            alt={`${cert.title} certificate`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Award className="h-8 w-8 text-neutral-700" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-[10px] text-neutral-500 transition-colors duration-300 group-hover:text-neutral-300">
            <Award className="h-3.5 w-3.5 text-neutral-500 transition-colors duration-300 group-hover:text-white" />
            {cert.issuer}
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 text-neutral-600 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
        </div>
        <p className="mt-3 text-sm font-semibold leading-snug text-white">
          {cert.title}
        </p>
        <p className="mt-auto pt-4 text-[10px] text-neutral-500">{cert.year}</p>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* S5 — certificates carousel (auto-rotate, pause on hover)            */
/* ------------------------------------------------------------------ */

function CertCarousel({ certificates }: { certificates: Certificate[] }) {
  const reduced = useReducedMotion();
  const [perView, setPerView] = useState(3);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);

  // jumlah kartu per slide mengikuti breakpoint biar pagination konsisten
  useEffect(() => {
    const getPerView = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) return 3;
      if (window.matchMedia("(min-width: 640px)").matches) return 2;
      return 1;
    };
    const update = () => setPerView(getPerView());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const slides: Certificate[][] = [];
  for (let i = 0; i < certificates.length; i += perView) {
    slides.push(certificates.slice(i, i + perView));
  }
  const pageCount = Math.max(slides.length, 1);
  // turunan aman — page di-clamp saat perView berubah (resize)
  const safePage = Math.min(page, pageCount - 1);

  // auto-rotate tiap 4.5 detik; pause saat hover; off kalau reduced motion
  useEffect(() => {
    if (reduced || paused || pageCount <= 1) return;
    const timer = setInterval(
      () => setPage((p) => (Math.min(p, pageCount - 1) + 1) % pageCount),
      4500,
    );
    return () => clearInterval(timer);
  }, [reduced, paused, pageCount]);

  return (
    <div
      className="mt-10"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${safePage * 100}%)` }}
        >
          {slides.map((group, i) => (
            <div
              key={i}
              className="grid w-full shrink-0 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
              aria-hidden={i !== safePage}
              inert={i !== safePage}
            >
              {group.map((c) => (
                <CertCard key={c.slug} cert={c} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {pageCount > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === safePage ? "true" : undefined}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === safePage
                    ? "w-6 bg-white"
                    : "w-1.5 bg-neutral-700 hover:bg-neutral-500",
                )}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setPage((p) => (Math.min(p, pageCount - 1) - 1 + pageCount) % pageCount)
              }
              aria-label="Previous certificates"
              className="rounded-md border border-neutral-800 bg-[#121212] p-2 text-neutral-400 transition-colors hover:border-neutral-600 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() =>
                setPage((p) => (Math.min(p, pageCount - 1) + 1) % pageCount)
              }
              aria-label="Next certificates"
              className="rounded-md border border-neutral-800 bg-[#121212] p-2 text-neutral-400 transition-colors hover:border-neutral-600 hover:text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function CertificatesSection({
  certificates,
}: {
  certificates: Certificate[];
}) {
  return (
    <section id="certificates" className={SECTION_WRAP}>
      <SectionHeader
        index="04 · credentials"
        title="Sertifikat"
        hint={`[${certificates.length}]`}
      />
      <Reveal delay={0.05}>
        <CertCarousel certificates={certificates} />
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* S6 — connect                                                        */
/* ------------------------------------------------------------------ */

export function ContactSection() {
  return (
    <section id="connect" className={SECTION_WRAP}>
      <SectionHeader index="05 · say hello" title="Connect" hint="[open]" />
      <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_1fr]">
        <Reveal delay={0.05}>
          <p className="text-sm leading-relaxed text-neutral-400">
            I&apos;m currently open to internships, freelance projects and
            interesting open-source collaborations. The fastest way to reach me
            is email — I reply within 24 hours.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <SocialLinks />
            <motion.a
              href={`mailto:${siteConfig.email}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              className="ml-2 flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-neutral-300"
            >
              <Mail className="h-3.5 w-3.5" />
              Say Hello →
            </motion.a>
            <CopyEmail />
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="rounded-xl border border-neutral-800 bg-[#121212] p-6">
            <div className="flex items-center gap-3 text-sm text-neutral-300">
              <Mail className="h-4 w-4 text-neutral-500" />
              {siteConfig.email}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-neutral-800 pt-4 text-xs text-neutral-500">
              <span>location</span>
              <span className="text-neutral-300">{siteConfig.location}</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-neutral-800 pt-3 text-xs text-neutral-500">
              <span>status</span>
              <span className="flex items-center gap-2 text-neutral-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                {siteConfig.status}
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
/* S7 — footer                                                         */
/* ------------------------------------------------------------------ */

export function Footer() {
  return (
    <footer className="flex flex-col items-center justify-between gap-2 border-t border-neutral-800/70 px-6 py-8 text-[11px] text-neutral-600 md:flex-row md:px-12">
      <span>
        © 2026 {siteConfig.name} · {siteConfig.handle}
      </span>
      <span>built with next.js + tailwind — no pixels were colored</span>
    </footer>
  );
}