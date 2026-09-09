import type { MetadataRoute } from "next";
import { getAllProjectSlugs } from "@/lib/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://alpharidho.dev";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/karya`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/lab`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/statistics`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getAllProjectSlugs().map(
    (slug) => ({
      url: `${base}/karya/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }),
  );

  return [...staticRoutes, ...projectRoutes];
}