import type { HomeSection, NavItem } from "@/types/content";

/**
 * Navigasi global — data-driven. Navbar & sub-nav baca dari sini,
 * jadi nambah/mengubah menu tidak perlu edit komponen.
 */
export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Karya", href: "/karya" },
  { label: "Lab", href: "/lab" },
  { label: "Statistics", href: "/statistics" },
];

/** Section homepage yang di-track sub-nav (scroll-spy). */
export const homeSections: HomeSection[] = [
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "work", label: "Karya" },
  { id: "certificates", label: "Sertifikat" },
  { id: "connect", label: "Connect" },
];