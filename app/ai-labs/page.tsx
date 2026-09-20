"use client";

import { Fragment } from "react";
import { useLanguage } from "@/components/SiteProviders";
import { aiLabsIntro, aiLabsProjects } from "@/lib/ai-labs-content";
import { aiLabsIntroEn, aiLabsProjectsEn } from "@/lib/ai-labs-content.en";
import styles from "./ai-labs.module.css";

export default function AiLabsPage() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const intro = isEn ? aiLabsIntroEn : aiLabsIntro;
  const projects = isEn ? aiLabsProjectsEn : aiLabsProjects;

  return (
    <div className="container section">
      <h1 className={styles.title}>AI Labs</h1>
      <p className={styles.intro}>
        {intro.map((line, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            {line}
          </Fragment>
        ))}
      </p>

      {projects.length > 0 && (
        <div className={styles.list}>
          {projects.map((project) => (
            <article key={project.name} className={styles.item}>
              <h2 className={styles.name}>{project.name}</h2>
              <p className={styles.summary}>{project.summary}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
