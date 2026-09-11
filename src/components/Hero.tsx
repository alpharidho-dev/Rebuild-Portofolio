"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { BinaryRain } from "@/components/BinaryRain";
import { EASE_OUT } from "@/components/Reveal";
import { ScrollStage } from "@/components/ScrollStage";

export function Hero() {
  return (
    <ScrollStage
      as="section"
      id="home"
      className="relative flex min-h-screen items-end justify-center overflow-hidden"
    >
      <BinaryRain />

      {/* guitarist, anchored to the bottom edge and melting into black */}
      <motion.div
        initial={{ opacity: 0, y: 48, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.1, ease: EASE_OUT, delay: 0.15 }}
        className="relative z-10 h-[80vh] w-full max-w-6xl md:h-[90vh]"      >
        <Image
          src="/images/hero.png"
          alt="Monochrome silhouette of a guitarist performing with arms raised"
          fill
          priority
          sizes="100vh"
          className="object-contain object-bottom" />
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-44 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />

      {/* scroll hint */}
      <div className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2">
        <motion.a
          href="#work"
          aria-label="Scroll to projects"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col items-center gap-1 text-neutral-600 transition-colors hover:text-neutral-300"
        >
          <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ChevronDown className="h-4 w-4" />
          </motion.span>
        </motion.a>
      </div>
    </ScrollStage>
  );
}
