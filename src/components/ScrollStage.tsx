"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { EASE_OUT } from "@/components/Reveal";

/* "sudah hidrasi?" tanpa setState di dalam effect: server render false,
   klien render true sesudah hidrasi selesai. */
const emptySubscribe = () => () => {};
const getMounted = () => true;
const getServerMounted = () => false;

/**
 * ScrollStage — animasi depth yang terikat posisi scroll.
 *
 * "slide" (default): buat blok setinggi layar, dipakai section homepage.
 *   Blok datang dari kedalaman pas masuk viewport — mengecil, miring
 *   sedikit, dan turun — rata sempurna saat memenuhi layar, lalu mundur
 *   lagi saat ditinggalkan. Rasa 3D tanpa perlu scroll-snap.
 *
 * "page": buat konten halaman (about/karya/lab/statistics). Konten
 *   "mendarat" halus sekali saat halaman dibuka.
 *
 * Dua lapis, dan itu disengaja:
 *   - lapisan luar = elemen semantik + target anchor (#about, #work, dst.)
 *     dan elemen yang diukur posisinya. Lapisan ini TIDAK kena transform.
 *   - lapisan dalam = yang dianimasikan, membawa className + transform.
 * Kalau transform dipasang ke lapisan luar, box-nya bergerak saat di-clik
 * dari navbar dan smooth scroll mendarat ~110px terlalu jauh.
 *
 * Scroll tetap native dan bebas (tidak di-hijack). Transform baru dipasang
 * setelah mount, jadi HTML dari server tetap bersih tanpa transform dan
 * tidak ada kedipan sebelum hidrasi selesai. User dengan
 * prefers-reduced-motion tidak mendapat transform sama sekali.
 */
export function ScrollStage({
  as = "div",
  id,
  className,
  children,
  variant = "slide",
}: {
  as?: "div" | "section" | "main";
  id?: string;
  className?: string;
  children: ReactNode;
  variant?: "slide" | "page";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();
  const mounted = useSyncExternalStore(emptySubscribe, getMounted, getServerMounted);

  // progress: 0 = blok baru nongol dari bawah, 0.5 = pas memenuhi layar,
  // 1 = blok sudah lewat ke atas
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.32, 0.68, 1], [0.92, 1, 1, 0.92]);
  const rotateX = useTransform(scrollYProgress, [0, 0.32, 0.68, 1], [8, 0, 0, -8]);
  const y = useTransform(scrollYProgress, [0, 0.32, 0.68, 1], [60, 0, 0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  const isPage = variant === "page";

  const layer = (
    <motion.div
      className={className}
      style={
        isPage
          ? { transformPerspective: 1200 }
          : {
              transformPerspective: 1200,
              transformOrigin: "center center",
              ...(mounted && !reduced ? { scale, rotateX, y, opacity } : {}),
            }
      }
      initial={isPage ? { scale: 0.97, rotateX: 5, y: 28 } : undefined}
      animate={isPage ? { scale: 1, rotateX: 0, y: 0 } : undefined}
      transition={isPage ? { duration: 0.75, ease: EASE_OUT } : undefined}
    >
      {children}
    </motion.div>
  );

  const setRef = (el: HTMLElement | null) => {
    ref.current = el;
  };

  if (as === "section") {
    return (
      <section id={id} ref={setRef}>
        {layer}
      </section>
    );
  }

  if (as === "main") {
    return (
      <main id={id} ref={setRef}>
        {layer}
      </main>
    );
  }

  return (
    <div id={id} ref={setRef}>
      {layer}
    </div>
  );
}
