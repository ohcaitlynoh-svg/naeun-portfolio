"use client";

import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/lib/projects";
import styles from "./ProjectCard.module.css";

export default function ProjectCard({
  project,
  size = "compact",
}: {
  project: Project;
  size?: "compact" | "large";
}) {
  const visual = project.cardVisual;
  const override = size === "large" ? project.cardVisualLarge : undefined;
  const fit = override?.fit ?? visual?.fit ?? "contain";
  const position = override?.position ?? visual?.position ?? "center";
  const scale = override?.scale ?? visual?.scale;

  return (
    <article className={`${styles.card} ${size === "large" ? styles.large : ""}`}>
      <div className={styles.visual}>
        {visual ? (
          <Image
            src={visual.src}
            alt={visual.alt}
            fill
            sizes={
              size === "large"
                ? "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px"
                : "(max-width: 720px) 100vw, 340px"
            }
            className={styles.visualImg}
            style={{
              objectFit: fit,
              objectPosition: position,
              transform: scale ? `scale(${scale})` : undefined,
            }}
          />
        ) : (
          <div className={styles.visualPlaceholder}>Image Placeholder</div>
        )}
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{project.name}</h3>
        <p className={styles.meta}>
          {[project.domain, project.role.split("\n")[0], project.heroPeriod]
            .filter(Boolean)
            .join(" · ")}
        </p>
        <p className={styles.summary}>{project.oneLiner}</p>
        <Link href={`/projects/${project.slug}`} className={styles.cta}>
          View Case Study →
        </Link>
      </div>
    </article>
  );
}
