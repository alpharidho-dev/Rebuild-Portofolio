"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export const EASE_OUT = [0.22, 0.61, 0.36, 1] as const;

/**
 * Scroll-triggered entrance wrapper: fades + slides content up once it
 * enters the viewport. Transform animations are automatically disabled
 * for users who prefer reduced motion (via <MotionConfig reducedMotion="user">).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
