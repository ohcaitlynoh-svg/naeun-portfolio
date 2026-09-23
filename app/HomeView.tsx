"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import { useLanguage } from "@/components/SiteProviders";
import CareerGrowthGraph from "@/components/CareerGrowthGraph";
import ProjectCard from "@/components/ProjectCard";
import HomeSectionRail from "@/components/HomeSectionRail";
import {
  AboutIcon,
  HowIWorkIcon,
  ProjectIcon,
  CareerIcon,
  AiLabsIcon,
  ContactIcon,
  LinkedInIcon,
} from "@/components/icons/HomeIcons";
import { projects } from "@/lib/projects";
import { projectsEn } from "@/lib/projects.en";
import styles from "./page.module.css";
import aboutStyles from "./about/about.module.css";
import howStyles from "./how-i-work/how-i-work.module.css";
import {
  careerTimeline,
  freelanceExperience,
  productDomains,
  aboutIntro,
} from "@/lib/about-content";
import {
  careerTimelineEn,
  freelanceExperienceEn,
  productDomainsEn,
  aboutIntroEn,
} from "@/lib/about-content.en";
import { flowSteps } from "@/lib/how-i-work-content";
import { flowStepsEn } from "@/lib/how-i-work-content.en";
import { aiLabsIntro } from "@/lib/ai-labs-content";
import { aiLabsIntroEn } from "@/lib/ai-labs-content.en";

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

export default function HomeView() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const t = {
    heroMain: isEn
      ? "I structure complex customer needs and operational problems from a product perspective."
      : "복잡한 고객 요구와 운영 문제를 제품 관점으로 구조화합니다.",
    heroSupporting: isEn
      ? "From 0→1 products to Enterprise B2B, I've decided what's feasible to build within business and technical constraints, prioritized it, and carried it through to launch and operations."
      : "0→1 제품부터 Enterprise B2B까지, 사업·기술 제약 안에서 구현 가능한 범위와 우선순위를 결정하고 출시와 운영까지 연결해왔습니다.",
    howIWorkIntro: isEn
      ? "Starting by weighing customer VOC equally against internal development / sales / engineering input, I judge the implementation approach and scope against clear criteria, align on it, and deliver."
      : "고객 VOC와 내부 개발 / 영업 / 엔지니어 의견을 동등하게 듣는 것에서 시작해, 명확한 기준으로 구현 방식과 범위를 판단하고 합의를 거쳐 전달합니다.",
    // Reuses the exact domain list from aboutIntro/aboutIntroEn (lib/about-content)
    // and the "12년"/"12 years" figure already established in app/about/page.tsx's
    // metadata — no new facts, just a one-line lead-in before the timeline.
    careerSummary: isEn
      ? "12 years across Global Solutions · 0→1 startup founding · Commerce · MarTech SaaS · Enterprise Observability."
      : "12년간 Global Solution · 0→1 창업 · Commerce · MarTech SaaS · Enterprise Observability로 제품 책임 범위를 확장해왔습니다.",
  };

  const projectList = isEn ? projectsEn : projects;
  const careerList = isEn ? careerTimelineEn : careerTimeline;
  const freelanceList = isEn ? freelanceExperienceEn : freelanceExperience;
  const domains = isEn ? productDomainsEn : productDomains;
  const aboutIntroLines = isEn ? aboutIntroEn : aboutIntro;
  const flow = isEn ? flowStepsEn : flowSteps;
  const labsIntroLines = isEn ? aiLabsIntroEn : aiLabsIntro;

  return (
    <>
      <HomeSectionRail />

      <section id="hero" className={`container section ${styles.hero}`}>
        <div className={styles.heroInner}>
          <div className={styles.heroPhoto}>
            <Image
              src="/naeun-profile.png"
              alt="Naeun Oh"
              fill
              sizes="(max-width: 640px) 11rem, 19rem"
              className={styles.heroPhotoImg}
              priority
            />
          </div>
          <div>
            <h1 className={styles.heroName}>{isEn ? "Naeun Oh" : "오나은"}</h1>
            <p className={styles.heroTitle}>Product Planner · Product Manager</p>
            <p className={styles.heroMain}>{t.heroMain}</p>
            <p className={styles.heroSupporting}>{t.heroSupporting}</p>
            <div className={styles.heroContact}>
              <a href="mailto:ohcaitlyn@hotmail.com" className={styles.heroContactItem}>
                <ContactIcon className={styles.heroContactIcon} />
                ohcaitlyn@hotmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/%EB%82%98%EC%9D%80-%EC%98%A4/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.heroContactItem}
              >
                <LinkedInIcon className={styles.heroContactIcon} />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className={`container section ${styles.homeSection} ${styles.anchorSection}`}
      >
        <div className={styles.sectionInner}>
          <h2 className={styles.cardHeading}>
            <ProjectIcon className={styles.cardIcon} /> Core Projects
          </h2>

          <div className={styles.projectCardGrid}>
            {projectList.map((project) => (
              <ProjectCard key={project.slug} project={project} size="compact" />
            ))}
          </div>

          <p className={styles.sectionCta}>
            <Link href="/projects">
              {isEn ? "View All Projects →" : "View All Projects →"}
            </Link>
          </p>
        </div>
      </section>

      <section
        id="experience"
        className={`container section ${styles.homeSection} ${styles.anchorSection}`}
      >
        <div className={styles.sectionInner}>
          <h2 className={styles.cardHeading}>
            <CareerIcon className={styles.cardIcon} /> Career Snapshot
          </h2>
          <p className={`${howStyles.intro} ${styles.careerIntro}`}>{t.careerSummary}</p>

          <div className={styles.visualSummary}>
            <CareerGrowthGraph
              career={careerList}
              freelance={freelanceList}
              cta={
                <Link href="/about#career">
                  {isEn ? "View Full Career →" : "View Full Career →"}
                </Link>
              }
            />
          </div>
        </div>
      </section>

      <section
        id="how-i-work"
        className={`container section ${styles.homeSection} ${styles.anchorSection}`}
      >
        <div className={styles.sectionInner}>
          <h2 className={styles.cardHeading}>
            <HowIWorkIcon className={styles.cardIcon} /> How I Work
          </h2>
          <p className={howStyles.intro}>{t.howIWorkIntro}</p>

          <ol className={howStyles.flowStrip}>
            {flow.map((step) => (
              <li key={step.label} className={howStyles.flowStep}>
                <span className={howStyles.flowNumber}>{step.num}</span>
                <span className={howStyles.flowLabel}>{step.label}</span>
              </li>
            ))}
          </ol>

          <p className={styles.sectionCta}>
            <Link href="/how-i-work">
              {isEn ? "View Full Operating Model →" : "View Full Operating Model →"}
            </Link>
          </p>
        </div>
      </section>

      <section
        id="about"
        className={`container section ${styles.homeSection} ${styles.anchorSection}`}
      >
        <div className={styles.sectionInner}>
          <h2 className={styles.cardHeading}>
            <AboutIcon className={styles.cardIcon} /> About
          </h2>
          <p className={`${aboutStyles.intro} ${styles.introHome}`}>
            <Lines lines={aboutIntroLines} />
          </p>

          <div className={`${aboutStyles.block} ${styles.blockHome}`}>
            <h3 className={aboutStyles.blockTitle}>Product Domains</h3>
            <ul className={`${aboutStyles.domainList} ${styles.domainListHome}`}>
              {domains.slice(0, 6).map((domain) => (
                <li key={domain}>{domain}</li>
              ))}
            </ul>
          </div>

          <p className={styles.sectionCta}>
            <Link href="/about">{isEn ? "Read Full Story →" : "Read Full Story →"}</Link>
          </p>
        </div>
      </section>

      <section
        id="labs"
        className={`container section ${styles.homeSection} ${styles.anchorSection}`}
      >
        <div className={styles.sectionInner}>
          <h2 className={styles.cardHeading}>
            <AiLabsIcon className={styles.cardIcon} /> AI Labs
          </h2>
          <p className={styles.labsPlaceholder}>
            <Lines lines={labsIntroLines} />
          </p>
          <p className={styles.sectionCta}>
            <Link href="/ai-labs">{isEn ? "View AI Labs →" : "View AI Labs →"}</Link>
          </p>
        </div>
      </section>

      <section
        id="contact"
        className={`container section ${styles.homeSection} ${styles.anchorSection}`}
      >
        <div className={styles.sectionInner}>
          <h2 className={styles.cardHeading}>
            <ContactIcon className={styles.cardIcon} /> Contact
          </h2>
          <ul className={styles.contactList}>
            <li>
              <span className={styles.contactLabel}>Email</span>
              <a href="mailto:ohcaitlyn@hotmail.com">ohcaitlyn@hotmail.com</a>
            </li>
            <li>
              <span className={styles.contactLabel}>LinkedIn</span>
              <a
                href="https://www.linkedin.com/in/%EB%82%98%EC%9D%80-%EC%98%A4/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Profile
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
