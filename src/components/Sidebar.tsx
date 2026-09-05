"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Cpu,
  FlaskConical,
  Home,
  Layers,
  Mail,
  Settings,
  UserRound,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// --- Definisikan tipe nav item ---
interface NavItem {
  href: string;
  label: string;
  Icon: typeof Home;
}

const ITEMS: NavItem[] = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/about", label: "About", Icon: UserRound },
  { href: "/lab", label: "Lab", Icon: FlaskConical },
  { href: "/stack", label: "Stack", Icon: Layers },
  { href: "/contact", label: "Contact", Icon: Mail },
  { href: "/settings", label: "Settings", Icon: Settings },
];

// --- Props untuk Sidebar (sudah kamu buat, sekarang kita pakai) ---
interface Props {
  expanded: boolean;   // true = sidebar terbuka lebar
  collapsed: boolean;  // true = sidebar menyempit (opsional)
}

// --- Komponen NavList (yang tadinya kosong, sekarang diisi) ---
function NavList() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col items-center gap-1 py-4">
      {ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            title={item.label}
            className={cn(
              "relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
              isActive
                ? "bg-neutral-700 text-white"
                : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
            )}
          >
            <item.Icon className="h-5 w-5" />
            {/* Jika sidebar expanded, tampilkan label di samping (opsional) */}
          </Link>
        );
      })}
    </div>
  );
}

// --- KOMPONEN UTAMA SIDEBAR ---
export function Sidebar({ expanded, collapsed }: Props) {
  // Tentukan lebar berdasarkan props
  const width = expanded ? 200 : 56; // 56px = w-14, 200px = expanded

  return (
    <motion.aside
      className="fixed z-50 flex h-full flex-col border-r border-neutral-800 bg-neutral-900 left-4 rounded-t-xl"
      initial={{ x: -20, y: 85, opacity: 0 }}          // ✅ Muncul dari kiri dengan fade
      animate={{
        x: 0,                                   // ✅ Posisi akhir
        width: width,                           // ✅ Lebar dinamis dari props
        opacity: 1,
      }}
      transition={{
        type: "tween",                          // ✅ BUKAN "number"!
        duration: 0.2,
        ease: "easeOut",
      }}
      whileHover={{                              // ✅ Efek hover (opsional)
        width: expanded ? 200 : 64,             // Melebar sedikit saat hover
        transition: { duration: 0.1 },
      }}
    >
      {/* Daftar navigasi */}
      <NavList />

      {/* Bagian bawah: Settings & Social */}
      <div className="mt-auto border-t border-neutral-800 p-2">
        <button className="flex w-full items-center justify-center rounded-lg p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white">
          <Settings className="h-5 w-5" />
        </button>

        {/* Link GitHub (perbaiki href sesuai kebutuhan) */}
        <Link
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 flex w-full items-center justify-center rounded-lg p-2 text-neutral-400 hover:bg-neutral-800 hover:text-white"
        >
          <svg
            className="h-5 w-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </motion.aside>
  );
}