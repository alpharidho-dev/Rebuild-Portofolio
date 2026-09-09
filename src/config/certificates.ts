import type { Certificate } from "@/types/content";

/**
 * Certificates — seed data di repo. Featured = 4-6 untuk marquee
 * homepage. Ganti credentialUrl sesuai link sertifikat asli.
 */
export const certificates: Certificate[] = [
  {
    slug: "dicoding-web-dasar",
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding",
    year: "2025",
    credentialUrl: "https://www.dicoding.com/",
    featured: true,
    sortOrder: 1,
    status: "published",
  },
  {
    slug: "fcc-responsive-web",
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    year: "2025",
    credentialUrl: "https://www.freecodecamp.org/",
    featured: true,
    sortOrder: 2,
    status: "published",
  },
  {
    slug: "dicoding-javascript",
    title: "Dasar JavaScript",
    issuer: "Dicoding",
    year: "2025",
    credentialUrl: "https://www.dicoding.com/",
    featured: true,
    sortOrder: 3,
    status: "published",
  },
  {
    slug: "fcc-js-algorithms",
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    year: "2024",
    credentialUrl: "https://www.freecodecamp.org/",
    featured: true,
    sortOrder: 4,
    status: "published",
  },
  {
    slug: "dicoding-fe-expert",
    title: "Front-End Web Developer Expert",
    issuer: "Dicoding",
    year: "2024",
    credentialUrl: "https://www.dicoding.com/",
    featured: true,
    sortOrder: 5,
    status: "published",
  },
  {
    slug: "bnsp-rpl",
    title: "Junior Web Developer (BNSP)",
    issuer: "BNSP",
    year: "2024",
    credentialUrl: "https://bnsp.go.id/",
    featured: false,
    sortOrder: 6,
    status: "published",
  },
];