"use client";

import Image from "next/image";
import type { AiLabProject } from "@/lib/ai-labs-content";
import ToolBar from "./ToolBar";
import styles from "./AiLabCard.module.css";

export default function AiLabCard({
  project,
  ctaLabel,
  onOpen,
}: {
  project: AiLabProject;
  ctaLabel: string;
  onOpen: () => void;
}) {
  return (
    <button type="button" className={styles.card} onClick={onOpen}>
      <div className={styles.visual}>
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 45vw, 340px"
          className={styles.visualImg}
        />
      </div>

      <div className={styles.body}>
        <span className={styles.status}>{project.status}</span>
        <h3 className={styles.name}>{project.title}</h3>
        <p className={styles.summary}>{project.subtitle}</p>
        <div className={styles.toolBarSlot}>
          <ToolBar tools={project.tools} />
        </div>
        <span className={styles.cta}>{ctaLabel} →</span>
      </div>
    </button>
  );
}
