"use client";

import { useEffect, useState } from "react";
import {
  HomeIcon,
  AboutIcon,
  HowIWorkIcon,
  ProjectIcon,
  CareerIcon,
  AiLabsIcon,
} from "./icons/HomeIcons";
import styles from "./HomeSectionRail.module.css";

// Home's own in-page position readout — separate from SectionIndicator
// (the protected long-form right rail used by About/How I Work/Project
// Detail). Distinct role: SectionIndicator lives on a single long-form
// page; this tracks where you are within Home only. Desktop-only, fixed
// to the viewport edge, and deliberately small/subtle so it never competes
// with the Global Nav (page-to-page) for attention.
const items = [
  { id: "hero", label: "Home", Icon: HomeIcon },
  { id: "projects", label: "Projects", Icon: ProjectIcon },
  { id: "about", label: "About", Icon: AboutIcon },
  { id: "how-i-work", label: "How I Work", Icon: HowIWorkIcon },
  { id: "experience", label: "Career", Icon: CareerIcon },
  { id: "labs", label: "AI Labs", Icon: AiLabsIcon },
];

export default function HomeSectionRail() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const els = items
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
  }, []);

  const handleClick = (e: React.MouseEvent, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  return (
    <nav className={styles.rail} aria-label="Home section position">
      <ul className={styles.list}>
        {items.map(({ id, label, Icon }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={activeId === id ? styles.current : undefined}
              onClick={(e) => handleClick(e, id)}
              aria-current={activeId === id ? "true" : undefined}
            >
              <Icon className={styles.icon} />
              <span className={styles.label}>{label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
