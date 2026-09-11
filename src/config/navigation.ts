import type { NavItem } from "@/types/content";

/**
 * Navigasi global — data-driven. Navbar baca dari sini,
 * jadi nambah/mengubah menu tidak perlu edit komponen.
 *
 * href di sini adalah anchor section di homepage (href="#id"), bukan route:
 * klik menu cuma scroll ke section-nya, tidak pindah halaman.
 * Id yang tersedia: #home, #about, #stack, #work, #certificates, #connect
 * (didefinisikan di components/Hero.tsx dan components/Sections.tsx).
 */
export const mainNav: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Karya", href: "#work" },
  { label: "Sertifikat", href: "#certificates" },
  { label: "Connect", href: "#connect" },
];