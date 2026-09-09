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

export const metadata: Metadata = {
  title: "Alpharidho — Dev_Root · Senior Architect",
  description:
    "Monochrome developer portfolio of Alpharidho. Home of the binary rain.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <StackSection />
      <ProjectsSection />
      <CertificatesSection />
      <ContactSection />
      <Footer />
    </>
  );
}