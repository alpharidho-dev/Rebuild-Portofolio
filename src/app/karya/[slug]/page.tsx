import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { BinaryRain } from "@/components/BinaryRain";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { TechIcon } from "@/components/TechIcon";
import {
  getAllProjectSlugs,
  getProjectBySlug,
} from "@/lib/data/projects";

type Props = { params: Promise<{ slug: string }> };

// ISR 1 jam (PRD)
export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Not Found" };

  return {
    title: `${project.title} — Alpharidho`,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  // draft / slug nggak dikenal = 404 (PRD: status draft = 404)
  if (!project) notFound();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BinaryRain />
      <main className="relative z-10 px-5 pb-28 pt-47 md:pb-16 md:pl-[240px] md:pr-10">
        <Reveal>
          <Link
            href="/karya"
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            all projects
          </Link>
        </Reveal>

        <div className="mt-6">
          <PageHeader
            index={`project · ${project.slug}`}
            title={project.title}
            hint={`[${project.techStack.length} tech]`}
          />
        </div>

        <Reveal delay={0.05}>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-neutral-400">
            {project.tagline}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap gap-2">
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
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-10 max-w-2xl space-y-4">
            {project.description.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm leading-relaxed text-neutral-300">
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-neutral-300"
              >
                view repo
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border border-neutral-800 bg-[#121212] px-5 py-2.5 text-xs text-neutral-300 transition-colors hover:border-neutral-600 hover:text-white"
              >
                live demo
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            <Link
              href="/karya"
              className="text-xs text-neutral-500 transition-colors hover:text-white"
            >
              ← back to karya
            </Link>
          </div>
        </Reveal>
      </main>
    </div>
  );
}