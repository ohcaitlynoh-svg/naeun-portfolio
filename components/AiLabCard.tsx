"use client";

import Image from "next/image";
import type { AiLabProject } from "@/lib/ai-labs-content";
import styles from "./AiLabCard.module.css";

export default function AiLabCard({
  project,
  onOpen,
}: {
  project: AiLabProject;
  onOpen: () => void;
}) {
  return (
    <button type="button" className={styles.card} onClick={onOpen}>
      <div className={styles.visual}>
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 720px) 100vw, 340px"
            className={styles.visualImg}
          />
        ) : (
          <div className={styles.visualPlaceholder}>Image Placeholder</div>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{project.title}</h3>
        {project.period && <p className={styles.meta}>{project.period}</p>}
        <p className={styles.summary}>{project.subtitle}</p>
      </div>
    </button>
  );
}
