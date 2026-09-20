"use client";

import { useEffect, useState } from "react";
import styles from "./SectionIndicator.module.css";

export type IndicatorSection = { id: string; label: string };

// Sticky right-rail (desktop) / horizontal scroll strip (<=720px) for
// long-form pages (About, How I Work, Project Detail). Tracks the section
// currently in view and scrolls to a section on click — same
// IntersectionObserver + scrollIntoView pattern Navigation.tsx used to run
// for Home's anchor nav, now generalized for any page's own sections.
export default function SectionIndicator({
  sections,
}: {
  sections: IndicatorSection[];
}) {
  const [activeId, setActiveId] = useState<string | null>(
    sections[0]?.id ?? null
  );

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // sections is derived per-page and stable across renders of a given page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections.map((s) => s.id).join(",")]);

  const handleClick = (e: React.MouseEvent, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", `#${id}`);
    setActiveId(id);
  };

  if (sections.length === 0) return null;

  return (
    <>
      <nav className={styles.mobileNav} aria-label="Section navigation">
        <ul className={styles.mobileList}>
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={activeId === s.id ? styles.current : undefined}
                onClick={(e) => handleClick(e, s.id)}
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <nav className={styles.desktopRail} aria-label="Section navigation">
        <ul className={styles.desktopList}>
          {sections.map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={activeId === s.id ? styles.current : undefined}
                onClick={(e) => handleClick(e, s.id)}
              >
                <span className={styles.num}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
