"use client";

import { useEffect } from "react";
import type { AiLabProject } from "@/lib/ai-labs-content";
import styles from "./AiLabModal.module.css";

export default function AiLabModal({
  project,
  onClose,
}: {
  project: AiLabProject;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      onClick={onClose}
    >
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
          Close ✕
        </button>

        <div className={styles.header}>
          <h2 className={styles.title}>{project.title}</h2>
          {project.period && <p className={styles.period}>{project.period}</p>}
          <p className={styles.subtitle}>{project.subtitle}</p>
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              View →
            </a>
          )}
        </div>

        <div className={styles.sections}>
          {project.sections.map((section) => (
            <div key={section.title} className={styles.section}>
              <h3 className={styles.sectionTitle}>{section.title}</h3>
              <ul className={styles.bulletList}>
                {section.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
