import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Shell } from "@/components/Shell";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://alpharidho.dev"),
  title: {
    default: `${siteConfig.name} — ${siteConfig.handle} · ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: `Monochrome developer portfolio of ${siteConfig.name} (${siteConfig.handle}). Selected projects, engineering stack, lab experiments and contact.`,
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.handle}`,
    description: "Monochrome developer portfolio — binary rain included.",
    type: "website",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary",
    title: `${siteConfig.name} — ${siteConfig.handle}`,
    description: "Monochrome developer portfolio.",
  },
};

// JSON-LD Person — structured data buat search engine & AI
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  alternateName: siteConfig.handle,
  jobTitle: siteConfig.role,
  email: `mailto:${siteConfig.email}`,
  url: "https://alpharidho.dev",
  knowsAbout: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "MySQL",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="bg-[#050505] font-mono text-neutral-200 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}