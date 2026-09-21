"use client";

import Image from "next/image";
import { useLanguage } from "@/components/SiteProviders";
import SectionIndicator from "@/components/SectionIndicator";
import ToolBar from "@/components/ToolBar";
import styles from "./how-i-work.module.css";
import {
  approachIntro,
  approachDescription,
  cases,
  executionToolkit,
  operatingModel,
  closingStatement,
} from "@/lib/how-i-work-content";
import {
  approachIntroEn,
  approachDescriptionEn,
  casesEn,
  executionToolkitEn,
  operatingModelEn,
  closingStatementEn,
} from "@/lib/how-i-work-content.en";

const sections = [
  { id: "approach", label: "Approach" },
  { id: "cases", label: "Cases" },
  { id: "execution-toolkit", label: "Execution Toolkit" },
  { id: "operating-model", label: "Operating Model" },
  { id: "closing", label: "Closing" },
];

export default function HowIWorkView() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const keyMessage = isEn ? approachIntroEn : approachIntro;
  const description = isEn ? approachDescriptionEn : approachDescription;
  const caseList = isEn ? casesEn : cases;
  const toolkit = isEn ? executionToolkitEn : executionToolkit;
  const operating = isEn ? operatingModelEn : operatingModel;
  const closing = isEn ? closingStatementEn : closingStatement;

  return (
    <div className="container section">
      <div className="pageIntro">
        <h1 className={styles.title}>How I Work</h1>
      </div>

      <div className={styles.pageLayout}>
        <div className={styles.pageContent}>
          <section id="approach" className={styles.stepBlock}>
            <div className={styles.stepHead}>
              <span className={styles.stepNumBig}>01</span>
              <h2 className={styles.stepTitle}>Approach</h2>
            </div>
            <p className={styles.approachKeyMessage}>{keyMessage}</p>
            <p className={styles.approachDescription}>{description}</p>
          </section>

          <section id="cases" className={styles.stepBlock}>
            <div className={styles.stepHead}>
              <span className={styles.stepNumBig}>02</span>
              <h2 className={styles.stepTitle}>Problem Solving Cases</h2>
            </div>

            <div className={styles.caseList}>
              {caseList.map((c) => (
                <article key={c.id} className={styles.caseBlock}>
                  <div className={styles.caseHead}>
                    <span className={styles.caseNum}>{c.num}</span>
                    <h3 className={styles.caseCompany}>{c.company}</h3>
                    <span className={styles.caseDomain}>{c.domain}</span>
                  </div>

                  <div className={styles.caseGrid}>
                    <div className={styles.caseLeft}>
                      <div>
                        <p className={styles.caseLabel}>Problem</p>
                        <p className={styles.caseProblem}>{c.problem}</p>
                      </div>
                      <p className={styles.caseLabel}>Constraint / Context</p>
                      <ul className={styles.caseContextList}>
                        {c.context.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.caseRight}>
                      <div>
                        <p className={styles.caseLabel}>Decision & Action</p>
                        <ul className={styles.caseActionList}>
                          {c.action.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className={styles.caseLabel}>Result</p>
                        <ul className={styles.caseResultList}>
                          {c.result.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <a href={c.ctaHref} className={styles.caseCta}>
                    {c.ctaLabel}
                  </a>
                </article>
              ))}
            </div>
          </section>

          <section id="execution-toolkit" className={styles.stepBlock}>
            <div className={styles.stepHead}>
              <span className={styles.stepNumBig}>03</span>
              <h2 className={styles.stepTitle}>Execution Toolkit</h2>
            </div>

            <div className={styles.toolkitCardList}>
              {toolkit.map((card) => (
                <article key={card.num} className={styles.toolkitCard}>
                  <div className={styles.toolkitCardImage}>
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 640px) calc(100vw - 36px), (max-width: 1024px) 45vw, 344px"
                      className={styles.toolkitCardImg}
                    />
                  </div>

                  <div className={styles.toolkitCardBody}>
                    <div className={styles.toolkitCardHead}>
                      <span className={styles.toolkitCardNum}>{card.num}</span>
                      <h3 className={styles.toolkitCardTitle}>{card.title}</h3>
                    </div>
                    <p className={styles.toolkitCardSubtitle}>{card.subtitle}</p>

                    <ul className={styles.toolkitCardEvidence}>
                      {card.evidence.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.toolBarSlot}>
                    <ToolBar tools={card.tools} />
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="operating-model" className={styles.stepBlock}>
            <div className={styles.stepHead}>
              <span className={styles.stepNumBig}>04</span>
              <h2 className={styles.stepTitle}>Operating Model</h2>
            </div>
            <ul className={styles.operatingStrip}>
              {operating.map((s) => (
                <li key={s.step} className={styles.operatingItem}>
                  <span className={styles.operatingStep}>{s.step}</span>
                  <span className={styles.operatingArrow} aria-hidden="true">
                    →
                  </span>
                  <span className={styles.operatingDescription}>{s.description}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="closing" className={styles.stepBlock}>
            <div className={styles.stepHead}>
              <span className={styles.stepNumBig}>05</span>
              <h2 className={styles.stepTitle}>Closing</h2>
            </div>
            <p className={styles.closingText}>{closing}</p>
          </section>
        </div>

        <div className={styles.indicatorRail}>
          <SectionIndicator sections={sections} />
        </div>
      </div>
    </div>
  );
}
