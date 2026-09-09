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
      <Hero />
      <AboutSection />
      <StackSection />
      <ProjectsSection projects={featuredProjects} />
      <CertificatesSection certificates={featuredCertificates} />
      <ContactSection />
      <Footer />
    </>
  );
}