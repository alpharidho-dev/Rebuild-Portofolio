import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import {
  AboutSection,
  CertificatesSection,
  ContactSection,
  Footer,
  ProjectsSection,
  StackSection,
} from "@/components/Sections";
import { WebGLDepth } from "@/components/WebGLDepth";
import { getFeaturedCertificates } from "@/lib/data/certificates";
import { getFeaturedProjects } from "@/lib/data/projects";

export const metadata: Metadata = {
  title: "Alpharidho — Dev_Root · Senior Architect",
  description:
    "Monochrome developer portfolio of Alpharidho. Home of the binary rain.",
};

// ISR 1 jam (PRD): data dari Supabase, kalau down saji cache lama
export const revalidate = 3600;

export default async function Home() {
  const [featuredProjects, featuredCertificates] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedCertificates(),
  ]);

  return (
    <>
      {/* latar 3D fixed di belakang konten — lihat components/WebGLDepth */}
      <WebGLDepth />
      <div className="relative z-10">
        <Hero />
        <AboutSection />
        <StackSection />
        <ProjectsSection projects={featuredProjects} />
        <CertificatesSection certificates={featuredCertificates} />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}