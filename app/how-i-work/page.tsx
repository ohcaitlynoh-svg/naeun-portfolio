"use client";

import { useLanguage } from "@/components/SiteProviders";
import SectionIndicator from "@/components/SectionIndicator";
import styles from "./how-i-work.module.css";
import {
  flowSteps,
  listening,
  judgeQuestions,
  judgeKeywords,
  decideItems,
  alignItems,
  alignLevels,
  axisPoints,
  axisCaption,
  deliverItems,
} from "@/lib/how-i-work-content";
import {
  flowStepsEn,
  listeningEn,
  judgeQuestionsEn,
  judgeKeywordsEn,
  decideItemsEn,
  alignItemsEn,
  alignLevelsEn,
  axisPointsEn,
  axisCaptionEn,
  deliverItemsEn,
} from "@/lib/how-i-work-content.en";

const introKo =
  "고객 VOC와 내부 개발 / 영업 / 엔지니어 의견을 동등하게 듣는 것에서 시작해, 명확한 기준으로 구현 방식과 범위를 판단하고 합의를 거쳐 전달합니다.";
const introEn =
  "Starting by weighing customer VOC equally against internal development / sales / engineering input, I judge the implementation approach and scope against clear criteria, align on it, and deliver.";

const sections = [
  { id: "principle", label: "Principle" },
  { id: "listen", label: "Listen" },
  { id: "judge", label: "Judge" },
  { id: "decide", label: "Decide" },
  { id: "align", label: "Align" },
  { id: "deliver", label: "Deliver" },
];

export default function HowIWorkPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const flow = isEn ? flowStepsEn : flowSteps;
  const listen = isEn ? listeningEn : listening;
  const judge = isEn ? judgeQuestionsEn : judgeQuestions;
  const judgeKw = isEn ? judgeKeywordsEn : judgeKeywords;
  const decide = isEn ? decideItemsEn : decideItems;
  const align = isEn ? alignItemsEn : alignItems;
  const alignLv = isEn ? alignLevelsEn : alignLevels;
  const axes = isEn ? axisPointsEn : axisPoints;
  const axesCaption = isEn ? axisCaptionEn : axisCaption;
  const deliver = isEn ? deliverItemsEn : deliverItems;

  return (
    <div className="container section">
      <div className="pageIntro">
        <h1 className={styles.title}>How I Work</h1>
        <p className={styles.intro}>{isEn ? introEn : introKo}</p>

        <ol className={styles.flowStrip}>
          {flow.map((step) => (
            <li key={step.label} className={styles.flowStep}>
              <span className={styles.flowNumber}>{step.num}</span>
              <span className={styles.flowLabel}>{step.label}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="longFormGrid">
        <div>
          <section id="principle" className={styles.stepBlock}>
            <div className={styles.stepHead}>
              <span className={styles.stepNumBig}>01</span>
              <h2 className={styles.stepTitle}>Principle</h2>
            </div>
            <figure className={styles.axesFocus}>
              <p className={styles.axesLabel}>
                {isEn ? "Before Any Decision" : "판단 이전"}
              </p>
              <svg
                viewBox="0 -6 260 226"
                className={styles.axesSvgFocus}
                role="img"
                aria-label={`${axes.join(", ")} — a triangle diagram meeting at a center decision point`}
              >
                <polygon
                  points="130,18 240,190 20,190"
                  fill="none"
                  className={styles.axisEdge}
                />
                <line x1="130" y1="18" x2="130" y2="140" className={styles.axisEdge} />
                <line x1="240" y1="190" x2="130" y2="140" className={styles.axisEdge} />
                <line x1="20" y1="190" x2="130" y2="140" className={styles.axisEdge} />

                <circle cx="130" cy="140" r="17" className={styles.axisNodeCenter} />
                <text x="130" y="144" textAnchor="middle" className={styles.axisLabelCenter}>
                  FIT
                </text>

                <circle cx="130" cy="18" r="4" className={styles.axisDot} />
                <text x="130" y="6" textAnchor="middle" className={styles.axisLabel}>
                  {axes[1]}
                </text>

                <circle cx="240" cy="190" r="4" className={styles.axisDot} />
                <text x="238" y="207" textAnchor="end" className={styles.axisLabel}>
                  {axes[2]}
                </text>

                <circle cx="20" cy="190" r="4" className={styles.axisDot} />
                <text x="22" y="207" textAnchor="start" className={styles.axisLabel}>
                  {axes[0]}
                </text>
              </svg>
              <figcaption className={styles.axesCopyFocus}>{axesCaption}</figcaption>
            </figure>
          </section>

          <section id="listen" className={styles.stepBlock}>
            <div className={styles.stepHead}>
              <span className={styles.stepNumBig}>02</span>
              <h2 className={styles.stepTitle}>Listen</h2>
            </div>
            <div className={styles.listenGrid}>
              <div>
                <h3 className={styles.listenGroupTitle}>External</h3>
                <ul className={styles.listenList}>
                  {listen.external.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className={styles.listenGroupTitle}>Internal</h3>
                <ul className={styles.listenList}>
                  {listen.internal.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section id="judge" className={styles.stepBlock}>
            <div className={styles.stepHead}>
              <span className={styles.stepNumBig}>03</span>
              <h2 className={styles.stepTitle}>Judge</h2>
            </div>
            <ul className={styles.judgeCompactGrid}>
              {judge.map((question, i) => (
                <li key={question} className={styles.judgeItem}>
                  <span className={styles.judgeKeyword}>{judgeKw[i]}</span>
                  <span className={styles.judgeExplain}>{question}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="decide" className={styles.stepBlock}>
            <div className={styles.stepHead}>
              <span className={styles.stepNumBig}>04</span>
              <h2 className={styles.stepTitle}>Decide</h2>
            </div>
            <ul className={styles.decideChipGrid}>
              {decide.map((item) => (
                <li key={item} className={styles.decideChip}>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="align" className={styles.stepBlock}>
            <div className={styles.stepHead}>
              <span className={styles.stepNumBig}>05</span>
              <h2 className={styles.stepTitle}>Align</h2>
            </div>
            <ul className={styles.alignCompactList}>
              {align.map((item, i) => (
                <li key={item} className={styles.alignItem}>
                  <span className={styles.alignKeyword}>{alignLv[i]}</span>
                  <span className={styles.alignExplain}>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="deliver" className={styles.stepBlock}>
            <div className={styles.stepHead}>
              <span className={styles.stepNumBig}>06</span>
              <h2 className={styles.stepTitle}>Deliver</h2>
            </div>
            <ul className={styles.deliverChipRow}>
              {deliver.map((item, i) => {
                const isLast = i === deliver.length - 1;
                return (
                  <li
                    key={item}
                    className={
                      isLast
                        ? `${styles.deliverChip} ${styles.deliverChipFeedback}`
                        : styles.deliverChip
                    }
                    title={
                      isLast
                        ? isEn
                          ? "Feedback loops back to Listen"
                          : "Feedback는 다시 Listen으로 순환됩니다"
                        : undefined
                    }
                  >
                    {item}
                    {isLast ? " ↻" : ""}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <SectionIndicator sections={sections} />
      </div>
    </div>
  );
}
