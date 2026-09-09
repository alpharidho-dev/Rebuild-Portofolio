"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Award, Check, Copy, Mail } from "lucide-react";
import { useState, type ComponentType } from "react";
import { Reveal } from "@/components/Reveal";
import { GithubIcon, InstagramIcon } from "@/components/icons";
import { ProjectCard } from "@/components/karya/ProjectCard";
import { SkillsGrid } from "@/components/skills/SkillsGrid";
import { siteConfig } from "@/config/site";
import { getFeaturedCertificates } from "@/lib/data/certificates";
import { getFeaturedProjects } from "@/lib/data/projects";
import type { Certificate } from "@/types/content";

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

/* padding nyambung sama halaman sub-route (about/lab/stats) */
const SECTION_WRAP = "relative px-5 py-24 md:pl-[240px] md:pr-10";

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
      <div className="mt-10 grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <Reveal delay={0.05}>
          <p className="text-sm leading-relaxed text-neutral-400">
            I&apos;m {siteConfig.name} — a {siteConfig.role.toLowerCase()}{" "}
            building full-stack web apps with React, Next.js, TypeScript and
            MySQL. I write type-safe frontends, craft clean API routes and keep
            my database queries efficient — all while balancing high school
            classes.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-neutral-400">
            Right now I&apos;m diving deeper into Next.js Server Actions and
            looking for an internship to bring my skills to a real-world team.
            Let&apos;s build something impactful together.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <SocialLinks />
            <Link
              href="/about"
              className="ml-2 rounded-md border border-neutral-800 bg-[#121212] px-4 py-2.5 text-xs text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white"
            >
              full story →
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="rounded-xl border border-neutral-800 bg-[#121212] p-6">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4 text-xs text-neutral-500">
              <span>status</span>
              <span className="flex items-center gap-2 text-neutral-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                </span>
                {siteConfig.status}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
              <span>location</span>
              <span className="text-neutral-300">{siteConfig.location}</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-neutral-800 pt-3 text-xs text-neutral-500">
              <span>school</span>
              <span className="text-neutral-300">SMK Taruna Bhakti · XI RPL 4</span>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-neutral-800 pt-3 text-xs text-neutral-500">
              <span>stack</span>
              <span className="text-neutral-300">React · Next.js · TS</span>
            </div>
          </div>
        </Reveal>
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
      <div className="mt-10">
        <SkillsGrid />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* S4 — selected work                                                  */
/* ------------------------------------------------------------------ */

export function ProjectsSection() {
  const featured = getFeaturedProjects();
  return (
    <section id="work" className={SECTION_WRAP}>
      <SectionHeader
        index="03 · selected work"
        title="Karya"
        hint={`[${featured.length} featured]`}
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {featured.map((p, i) => (
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
      className="group flex h-full flex-col rounded-xl border border-neutral-800 bg-[#121212] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-600 hover:bg-[#161616]"
    >
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
    </a>
  );
}

export function CertificatesSection() {
  const certs = getFeaturedCertificates();

  return (
    <section id="certificates" className={SECTION_WRAP}>
      <SectionHeader
        index="04 · credentials"
        title="Sertifikat"
        hint={`[${certs.length}]`}
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certs.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 0.06} className="h-full">
            <CertCard cert={c} />
          </Reveal>
        ))}
      </div>
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