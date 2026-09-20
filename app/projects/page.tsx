"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { useLanguage } from "@/components/SiteProviders";
import ProjectCard from "@/components/ProjectCard";
import SectionIndicator from "@/components/SectionIndicator";
import { projects } from "@/lib/projects";
import { projectsEn } from "@/lib/projects.en";
import { careerTimeline, freelanceExperience } from "@/lib/about-content";
import { careerTimelineEn, freelanceExperienceEn } from "@/lib/about-content.en";
import { otherProjectSnapshots, type OtherProjectSnapshot } from "@/lib/other-projects-content";
import { otherProjectSnapshotsEn } from "@/lib/other-projects-content.en";
import styles from "./page.module.css";

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

const introLines = {
  ko: [
    "제품 유형과 조직 환경은 달랐지만",
    "각 프로젝트에서 반복적으로 맡아온 역할은",
    "",
    "복잡한 문제를 구조화하고,",
    "구현 가능한 범위를 결정하고,",
    "여러 조직을 연결해 실제 제품과 사업 결과로 만드는 일이었습니다.",
  ],
  en: [
    "Product types and organizational contexts differed,",
    "but the role I repeatedly played across each project was",
    "",
    "structuring complex problems,",
    "deciding what's feasible to build,",
    "and connecting multiple organizations to turn it into real products and business results.",
  ],
};

// The 3 featured projects above have their own case studies and are
// excluded here. Everything below is read from the shared career/freelance
// data (lib/about-content.ts — the single date source of truth) plus
// hand-authored snapshot content (lib/other-projects-content.ts) keyed by
// the same `company` field. This explicit order is the requested IA, not
// the raw array order the data happens to be stored in.
const TOP_LEVEL_ORDER = [
  "Biginsight",
  "Aladin Communication",
  "Cafe24",
  "__freelance_group__",
  "Yuratech",
  "Hyundai Home Shopping",
] as const;

const FREELANCE_GROUP_COMPANIES = ["Storelink", "Eastend", "Asiance Korea", "Sesun Electronics"];

const sections = [
  { id: "core-projects", label: "Core Projects" },
  { id: "other-projects", label: "Other Projects" },
];

function SnapshotRow({
  company,
  period,
  snapshot,
  isEn,
  nested = false,
}: {
  company: string;
  period?: string;
  snapshot?: OtherProjectSnapshot;
  isEn: boolean;
  nested?: boolean;
}) {
  return (
    <details className={nested ? styles.otherSubEntry : styles.otherEntry}>
      <summary className={styles.otherSummary}>
        <span className={styles.otherName}>{company}</span>
        {snapshot?.projectName && (
          <span className={styles.otherProjectLabel}>{snapshot.projectName}</span>
        )}
        {snapshot?.domain && <span className={styles.otherDomain}>{snapshot.domain}</span>}
        {period && <span className={styles.otherPeriod}>{period}</span>}
        <span className={styles.otherChevron} aria-hidden="true">
          ›
        </span>
      </summary>
      {snapshot && (
        <div className={styles.otherExpanded}>
          {snapshot.projectName && (
            <p className={styles.otherProjectTitle}>{snapshot.projectName}</p>
          )}
          {snapshot.role && (
            <p className={styles.otherMeta}>
              <Lines lines={snapshot.role.split("\n")} />
            </p>
          )}
          <p className={styles.otherSummaryText}>
            <Lines lines={snapshot.summary} />
          </p>

          {snapshot.keyScope && (
            <div>
              <p className={styles.otherWorkedOnLabel}>{isEn ? "Key Scope" : "Key Scope"}</p>
              <ul className={styles.otherBulletList}>
                {snapshot.keyScope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {snapshot.products && (
            <div>
              <p className={styles.otherWorkedOnLabel}>{isEn ? "Products" : "Products"}</p>
              <div className={styles.otherProductList}>
                {snapshot.products.map((product) => (
                  <div key={product.name} className={styles.otherProduct}>
                    <p className={styles.otherProductName}>{product.name}</p>
                    <ul className={styles.otherBulletList}>
                      {product.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {snapshot.workedOn && (
            <div>
              <p className={styles.otherWorkedOnLabel}>What I Worked On</p>
              <ul className={styles.otherBulletList}>
                {snapshot.workedOn.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {snapshot.workedOnGroups && (
            <div>
              <p className={styles.otherWorkedOnLabel}>What I Worked On</p>
              <div className={styles.otherGroupList}>
                {snapshot.workedOnGroups.map((group) => (
                  <div key={group.group} className={styles.otherGroup}>
                    <p className={styles.otherGroupLabel}>{group.group}</p>
                    <ul className={styles.otherBulletList}>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {snapshot.secondaryProject && (
            <div className={styles.otherSecondary}>
              <p className={styles.otherWorkedOnLabel}>
                {isEn ? "Secondary Project" : "Secondary Project"}
              </p>
              <p className={styles.otherProductName}>{snapshot.secondaryProject.title}</p>
              <ul className={styles.otherBulletList}>
                {snapshot.secondaryProject.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {snapshot.keyDecision && <p className={styles.otherKeyDecision}>{snapshot.keyDecision}</p>}
          {snapshot.note && <p className={styles.otherNote}>{snapshot.note}</p>}

          {snapshot.assets && snapshot.assets.length > 0 && (
            <div>
              <p className={styles.otherWorkedOnLabel}>{isEn ? "Evidence" : "Evidence"}</p>
              <div
                className={`${styles.otherGallery} ${
                  snapshot.assets.length === 1 ? styles.otherGallerySingle : ""
                }`}
              >
                {snapshot.assets.map((asset) => (
                  <figure key={asset.src} className={styles.otherGalleryItem}>
                    <div className={styles.otherGalleryFrame}>
                      <Image
                        src={asset.src}
                        alt={asset.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 320px"
                        className={styles.otherGalleryImg}
                      />
                    </div>
                    {asset.caption && (
                      <figcaption className={styles.otherGalleryCaption}>{asset.caption}</figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          )}

          <Link href="/about#career" className={styles.otherCareerLink}>
            {isEn ? "View related career →" : "View related career →"}
          </Link>
        </div>
      )}
    </details>
  );
}

export default function ProjectsIndexPage() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const projectList = isEn ? projectsEn : projects;
  const intro = isEn ? introLines.en : introLines.ko;
  const snapshots = isEn ? otherProjectSnapshotsEn : otherProjectSnapshots;

  const careerList = isEn ? careerTimelineEn : careerTimeline;
  const freelanceList = isEn ? freelanceExperienceEn : freelanceExperience;

  const periodByCompany: Record<string, string> = {};
  careerList.forEach((entry) => {
    periodByCompany[entry.company] = entry.period;
  });
  freelanceList.forEach((entry) => {
    periodByCompany[entry.company] = entry.period;
  });

  return (
    <div className={`container section ${styles.projectsWrap}`}>
      <div className={styles.pageInner}>
        <div id="core-projects">
          <h1 className={styles.title}>Core Projects</h1>
          <p className={styles.intro}>
            {intro.map((line, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </Fragment>
            ))}
          </p>

          <div className={styles.cardGrid}>
            {projectList.map((project) => (
              <ProjectCard key={project.slug} project={project} size="large" />
            ))}
          </div>
        </div>

        <div id="other-projects" className={styles.otherSection}>
          <h2 className={styles.otherTitle}>Other Projects</h2>
          <div className={styles.otherList}>
            {TOP_LEVEL_ORDER.map((key) => {
              if (key === "__freelance_group__") {
                return (
                  <details key="freelance-group" className={styles.otherEntry}>
                    <summary className={styles.otherSummary}>
                      <span className={styles.otherName}>
                        {isEn ? "Freelance / Project Experience" : "Freelance / Project Experience"}
                      </span>
                      <span className={styles.otherChevron} aria-hidden="true">
                        ›
                      </span>
                    </summary>
                    <div className={styles.otherExpanded}>
                      <div className={styles.otherSubList}>
                        {FREELANCE_GROUP_COMPANIES.map((company) => (
                          <SnapshotRow
                            key={company}
                            company={company}
                            period={periodByCompany[company]}
                            snapshot={snapshots[company]}
                            isEn={isEn}
                            nested
                          />
                        ))}
                      </div>
                    </div>
                  </details>
                );
              }
              return (
                <SnapshotRow
                  key={key}
                  company={key}
                  period={periodByCompany[key]}
                  snapshot={snapshots[key]}
                  isEn={isEn}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className={styles.indicatorRail}>
        <SectionIndicator sections={sections} />
      </div>
    </div>
  );
}
