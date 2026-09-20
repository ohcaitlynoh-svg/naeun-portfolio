"use client";

import { useLanguage } from "@/components/SiteProviders";
import SectionIndicator from "@/components/SectionIndicator";
import styles from "./how-i-work.module.css";
import {
  approachIntro,
  cases,
  operatingModel,
  closingStatement,
} from "@/lib/how-i-work-content";
import {
  approachIntroEn,
  casesEn,
  operatingModelEn,
  closingStatementEn,
} from "@/lib/how-i-work-content.en";

const sections = [
  { id: "approach", label: "Approach" },
  { id: "cases", label: "Cases" },
  { id: "operating-model", label: "Operating Model" },
  { id: "closing", label: "Closing" },
];

export default function HowIWorkPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const intro = isEn ? approachIntroEn : approachIntro;
  const caseList = isEn ? casesEn : cases;
  const operating = isEn ? operatingModelEn : operatingModel;
  const closing = isEn ? closingStatementEn : closingStatement;

  return (
    <div className="container section">
      <div className="pageIntro" id="approach">
        <h1 className={styles.title}>How I Work</h1>
        <p className={styles.intro}>{intro}</p>
      </div>

      <div className="longFormGrid">
        <div>
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
                      <p className={styles.caseProblem}>{c.problem}</p>
                      <p className={styles.caseLabel}>Context / Constraint</p>
                      <ul className={styles.caseContextList}>
                        {c.context.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className={styles.caseRight}>
                      <div>
                        <p className={styles.caseLabel}>Action</p>
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

          <section id="operating-model" className={styles.stepBlock}>
            <div className={styles.stepHead}>
              <span className={styles.stepNumBig}>03</span>
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
              <span className={styles.stepNumBig}>04</span>
              <h2 className={styles.stepTitle}>Closing</h2>
            </div>
            <p className={styles.closingText}>{closing}</p>
          </section>
        </div>

        <SectionIndicator sections={sections} />
      </div>
    </div>
  );
}
