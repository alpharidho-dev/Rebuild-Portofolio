import Link from "next/link";
import { motion } from "framer-motion";
import { Radio, Terminal } from "lucide-react";
import { EASE_OUT } from "@/components/Reveal";
import { mainNav } from "@/config/navigation";

export function Navbar() { 
  return (
    <header className="fixed inset-x-3.5 top-3.5 z-50">
      <motion.nav
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
        className="relative flex h-14 items-center justify-between rounded-xl border border-neutral-800/60 bg-neutral-900/90 px-5 backdrop-blur-md"
      >
        <Link
          href="/"
          className="text-sm font-bold tracking-[0.18em] text-white transition-opacity hover:opacity-80"
        >
          Alpharidho
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 md:flex">
          {mainNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs text-neutral-400 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3.5">
          <motion.a
            href="https://github.com/alpharidho-dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Terminal"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="text-neutral-400 transition-colors hover:text-white"
          >
            <Terminal className="h-[18px] w-[18px]" />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/alpharidhooo/ "
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Broadcast status"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="text-neutral-400 transition-colors hover:text-white"
          >
            <Radio className="h-[18px] w-[18px]" />
          </motion.a>

          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-md bg-white"
          >
            {/* <a> biasa, bukan Link — cross-page hash Link (/#hash) memicu
                error "Router action dispatched before initialization" di Next 16 */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/#connect"
              className="block rounded-md px-4 py-1.5 text-xs font-semibold text-black transition-colors hover:bg-neutral-300"
            >
              Connect
            </a>
          </motion.div>
        </div>
      </motion.nav>
    </header>
  );
}
