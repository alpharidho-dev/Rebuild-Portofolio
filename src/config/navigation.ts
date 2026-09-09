import type { NavItem } from "@/types/content";

/**
 * Navigasi global — data-driven. Navbar baca dari sini,
 * jadi nambah/mengubah menu tidak perlu edit komponen.
 */
export const mainNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Karya", href: "/karya" },
  { label: "Lab", href: "/lab" },
  { label: "Statistics", href: "/statistics" },
];