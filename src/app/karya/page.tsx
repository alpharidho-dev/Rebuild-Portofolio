import type { Metadata } from "next";
import { BinaryRain } from "@/components/BinaryRain";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/karya/ProjectCard";
import { getPublishedProjects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Karya — Alpharidho",
  description:
    "All published projects by Alpharidho — case studies, tech stacks and repo links.",
};

// ISR 1 jam (PRD): data dari Supabase, kalau down saji cache lama
export const revalidate = 3600;

export default async function KaryaPage() {
  const projects = await getPublishedProjects();

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BinaryRain />
      <main className="relative z-10 px-5 pb-28 pt-47 md:pb-16 md:pl-[255px] md:pr-10">
        <PageHeader
          index="02 · portofolio"
          title="Karya"
          hint={`[${projects.length}]`}
        />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
}