"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which page section currently sits in the vertical "focus band"
 * of the viewport (roughly the middle 45%–50% strip). Used to drive the
 * sidebar / mobile-nav active indicator while scrolling.
 */
export function useActiveSection(
  ids: readonly string[],
  defaultId: string,
): string {
  const [active, setActive] = useState(defaultId);
  const [prevDefault, setPrevDefault] = useState(defaultId);

  // Reset when the route-derived default changes (render-time adjustment,
  // the React-recommended pattern for "state derived from props").
  if (prevDefault !== defaultId) {
    setPrevDefault(defaultId);
    setActive(defaultId);
  }

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -52% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, defaultId]);

  return active;
}
