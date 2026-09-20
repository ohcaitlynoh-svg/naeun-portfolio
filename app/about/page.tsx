"use client";

import { Fragment } from "react";
import { useLanguage } from "@/components/SiteProviders";
import CareerGraphView from "@/components/CareerGraphView";
import CareerTopology from "@/components/CareerTopology";
import SectionIndicator from "@/components/SectionIndicator";
import { projects } from "@/lib/projects";
import { projectsEn } from "@/lib/projects.en";
import styles from "./about.module.css";
import {
  careerTimeline,
  freelanceExperience,
  productDomains,
  leadershipAreas,
  aboutIntro,
  leadershipIntro,
  closingStatement,
  education,
  overseasExperience,
} from "@/lib/about-content";
import {
  careerTimelineEn,
  freelanceExperienceEn,
  productDomainsEn,
  leadershipAreasEn,
  aboutIntroEn,
  leadershipIntroEn,
  closingStatementEn,
  educationEn,
  overseasExperienceEn,
} from "@/lib/about-content.en";

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

const sections = [
  { id: "career", label: "Career" },
  { id: "education", label: "Education" },
  { id: "overseas-experience", label: "Overseas Experience" },
  { id: "product-domains", label: "Product Domains" },
  { id: "leadership", label: "Leadership" },
  { id: "closing", label: "Closing" },
];

export default function AboutPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const projectList = isEn ? projectsEn : projects;
  const careerList = isEn ? careerTimelineEn : careerTimeline;
  const freelanceList = isEn ? freelanceExperienceEn : freelanceExperience;
  const domains = isEn ? productDomainsEn : productDomains;
  const leadership = isEn ? leadershipAreasEn : leadershipAreas;
  const introLines = isEn ? aboutIntroEn : aboutIntro;
  const leadershipIntroLines = isEn ? leadershipIntroEn : leadershipIntro;
  const closingLines = isEn ? closingStatementEn : closingStatement;
  const leadershipOutro = isEn ? "." : "을 관리했습니다.";
  const edu = isEn ? educationEn : education;
  const overseas = isEn ? overseasExperienceEn : overseasExperience;

  return (
    <div className="container section">
      <div className="pageIntro">
        <h1 className={styles.title}>About</h1>
        <p className={styles.intro}>
          <Lines lines={introLines} />
        </p>
      </div>

      <div className="longFormGrid">
        <div>
          <section id="career" className={styles.block}>
            <h2 className={styles.blockTitle}>
              <span className={styles.num}>01</span>Career
            </h2>

            <CareerGraphView
              projects={projectList}
              career={careerList}
              freelance={freelanceList}
            />

            <h3 className={styles.topologyHeading}>Experience Topology</h3>
            <CareerTopology
              projects={projectList}
              career={careerList}
              freelance={freelanceList}
            />

            <h3 className={styles.topologySubheading}>
              {isEn ? "Freelance / Project Experience" : "Freelance / Project Experience"}
            </h3>
            <div className={styles.freelanceList}>
              {freelanceList.map((entry) => (
                <details key={entry.company} className={styles.freelanceEntry}>
                  <summary className={styles.freelanceSummary}>
                    <span className={styles.freelanceName}>{entry.company}</span>
                    <span className={styles.freelancePeriod}>{entry.period}</span>
                    <span className={styles.freelanceChevron} aria-hidden="true">
                      ›
                    </span>
                  </summary>
                  <div className={styles.freelanceExpanded}>
                    <p className={styles.freelanceRole}>
                      {isEn ? "Freelance / Project Experience" : "Freelance / Project Experience"}
                    </p>
                    {entry.note && (
                      <p className={styles.freelanceNote}>{entry.note}</p>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </section>

          <section id="education" className={styles.block}>
            <h2 className={styles.blockTitle}>
              <span className={styles.num}>02</span>Education
            </h2>
            <p className={styles.educationEntry}>
              <span className={styles.educationSchool}>{edu.school}</span>
              <span className={styles.educationNote}>{edu.note}</span>
            </p>
          </section>

          <section id="overseas-experience" className={styles.block}>
            <h2 className={styles.blockTitle}>
              <span className={styles.num}>03</span>Overseas Experience
            </h2>
            <ol className={styles.overseasTimeline}>
              {overseas.map((entry) => (
                <li key={entry.country} className={styles.overseasEntry}>
                  <div className={styles.overseasEntryHeader}>
                    <h3>{entry.country}</h3>
                    <span className={styles.overseasPeriod}>{entry.period}</span>
                  </div>
                  <p className={styles.role}>{entry.institutions.join(" · ")}</p>
                  <p className={styles.role}>{entry.type}</p>
                </li>
              ))}
            </ol>
          </section>

          <section id="product-domains" className={styles.block}>
            <h2 className={styles.blockTitle}>
              <span className={styles.num}>04</span>Product Domains
            </h2>
            <ul className={styles.domainList}>
              {domains.map((domain) => (
                <li key={domain}>{domain}</li>
              ))}
            </ul>
          </section>

          <section id="leadership" className={styles.block}>
            <h2 className={styles.blockTitle}>
              <span className={styles.num}>05</span>Leadership
            </h2>
            <p className={styles.leadershipIntro}>
              <Lines lines={leadershipIntroLines} />
            </p>
            <ul className={styles.bulletList}>
              {leadership.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
            <p className={styles.leadershipOutro}>{leadershipOutro}</p>
          </section>

          <section id="closing" className={styles.block}>
            <h2 className={styles.blockTitle}>
              <span className={styles.num}>06</span>Closing
            </h2>
            <p className={styles.closing}>
              <Lines lines={closingLines} />
            </p>
          </section>
        </div>

        <SectionIndicator sections={sections} />
      </div>
    </div>
  );
}
