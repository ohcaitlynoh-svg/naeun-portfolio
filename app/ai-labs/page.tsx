"use client";

import { Fragment, useState } from "react";
import { useLanguage } from "@/components/SiteProviders";
import AiLabCard from "@/components/AiLabCard";
import AiLabModal from "@/components/AiLabModal";
import { aiLabsIntro, aiLabsProjects } from "@/lib/ai-labs-content";
import { aiLabsIntroEn, aiLabsProjectsEn } from "@/lib/ai-labs-content.en";
import styles from "./ai-labs.module.css";

function Lines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </>
  );
}

export default function AiLabsPage() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const intro = isEn ? aiLabsIntroEn : aiLabsIntro;
  const projects = isEn ? aiLabsProjectsEn : aiLabsProjects;
  const ctaLabel = isEn ? "View Project" : "자세히 보기";
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeProject = projects.find((p) => p.slug === activeSlug) ?? null;

  return (
    <div className="container section">
      <div className="pageIntro">
        <h1 className={styles.title}>AI Labs</h1>
        <p className={styles.intro}>
          <Lines lines={intro} />
        </p>

        {projects.length > 0 && (
          <div className={styles.grid}>
            {projects.map((project) => (
              <AiLabCard
                key={project.slug}
                project={project}
                ctaLabel={ctaLabel}
                onOpen={() => setActiveSlug(project.slug)}
              />
            ))}
          </div>
        )}
      </div>

      {activeProject && (
        <AiLabModal project={activeProject} onClose={() => setActiveSlug(null)} />
      )}
    </div>
  );
}
