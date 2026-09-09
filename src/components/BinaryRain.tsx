import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/*
 * Deterministic "binary rain" backdrop.
 *
 * All digit positions/sizes/opacities are generated ONCE at module load by a
 * seeded PRNG (mulberry32). The module executes identically on the server and
 * the client, so the prerendered HTML and the hydrated tree match perfectly
 * — no hydration mismatch, no layout shift.
 */

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a += 0x6d2b79f5;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(20260827);

const SCATTER_SIZES = [
  "text-xs",
  "text-xs",
  "text-sm",
  "text-sm",
  "text-xl",
  "text-3xl",
  "text-5xl",
  "text-7xl",
  "text-9xl",
];

const COLUMN_SIZES = ["text-sm", "text-sm", "text-base", "text-2xl", "text-3xl","text-4xl"];

interface ScatterDigit {
  top: number;
  left: number;
  size: string;
  opacity: number;
  char: string;
  dur: number;
  delay: number;
  flicker: boolean;
}

interface DigitColumn {
  left: number;
  top: number;
  size: string;
  opacity: number;
  gap: number;
  dur: number;
  delay: number;
  digits: string[];
}

const SCATTER: ScatterDigit[] = Array.from({ length: 46 }, () => ({
  top: rand() * 115,
  left: rand() * 96,
  size: SCATTER_SIZES[Math.floor(rand() * SCATTER_SIZES.length)],
  opacity: 0.08 + rand() * 0.5,
  char: rand() > 0.5 ? "1" : "0",
  dur: 2.5 + rand() * 4,
  delay: rand() * 6,
  flicker: rand() > 0.4,
}));

const COLUMNS: DigitColumn[] = Array.from({ length: 14 }, () => ({
  left: rand() * 96,
  top: rand() * 68,
  size: COLUMN_SIZES[Math.floor(rand() * COLUMN_SIZES.length)],
  opacity: 0.22 + rand() * 0.38,
  gap: 8 + rand() * 12,
  dur: 9 + rand() * 9,
  delay: rand() * 6,
  digits: Array.from({ length: 4 + Math.floor(rand() * 6) }, () =>
    rand() > 0.5 ? "1" : "0",
  ),
}));

export function BinaryRain({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const light = variant === "light";
  const digitColor = light ? "digit-light text-white" : "text-neutral-500";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 select-none overflow-hidden"
    >
      {/* isolated single digits */}
      {SCATTER.map((d, i) => (
        <span
          key={`s-${i}`}
          className={cn(
            "absolute leading-none",
            digitColor,
            d.size,
            d.flicker && "binary-flicker",
          )}
          style={
            {
              top: `${d.top}%`,
              left: `${d.left}%`,
              opacity: d.opacity,
              "--o": d.opacity,
              "--dur": `${d.dur}s`,
              "--delay": `${d.delay}s`,
            } as CSSProperties
          }
        >
          {d.char}
        </span>
      ))}

      {/* vertical streams, like falling code columns */}
      {COLUMNS.map((c, i) => (
        <div
          key={`c-${i}`}
          className="binary-drift absolute flex flex-col items-center"
          style={
            {
              left: `${c.left}%`,
              top: `${c.top}%`,
              opacity: c.opacity,
              gap: `${c.gap}px`,
              "--dur": `${c.dur}s`,
              "--delay": `${c.delay}s`,
            } as CSSProperties
          }
        >
          {c.digits.map((char, j) => (
            <span key={j} className={cn("leading-none", digitColor, c.size)}>
              {char}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
