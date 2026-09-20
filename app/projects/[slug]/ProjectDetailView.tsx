"use client";

import { Fragment, useEffect, useId, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useLanguage } from "@/components/SiteProviders";
import SectionIndicator from "@/components/SectionIndicator";
import { projects } from "@/lib/projects";
import { projectsEn } from "@/lib/projects.en";
import styles from "./project.module.css";

type Lightbox = { src: string; alt: string; width: number; height: number };

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export default function ProjectDetailView({ slug }: { slug: string }) {
  const { language } = useLanguage();
  const list = language === "en" ? projectsEn : projects;
  const project = list.find((p) => p.slug === slug);
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);
  const flowArrowId = useId();

  useEffect(() => {
    if (!lightbox) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [lightbox]);

  if (!project) {
    notFound();
  }

  const hasHero = Boolean(project.heroRole);

  const hasProblemConstraints = Boolean(
    project.problemParagraphs && project.constraintItems
  );
  const hasDecisionFramework = Boolean(project.decisionPrinciples);
  const hasDecisionCases = Boolean(project.decisionExamples);
  const hasDeliverySummary = Boolean(project.deliverySummary);
  const hasImpactLearning = Boolean(
    project.impactSection && project.learningSection
  );

  const hasCustomSections = Boolean(project.customSections);

  const indicatorSections = hasCustomSections
    ? [
        { id: "overview", label: "Overview" },
        ...project.customSections!.map((s) => ({
          id: slugify(s.title),
          label: s.title,
        })),
      ]
    : [];

  const restSections = hasCustomSections
    ? []
    : [
        ...(hasProblemConstraints
          ? []
          : [
              { title: "Problem", content: project.problem },
              { title: "Complexity", content: project.complexity },
              { title: "Evidence", content: project.evidence },
              { title: "Constraints", content: project.constraints },
            ]),
        ...(hasDecisionFramework || hasDecisionCases
          ? []
          : [{ title: "Decision", content: project.decision }]),
        ...(hasDeliverySummary || hasImpactLearning
          ? []
          : [
              { title: "Trade-off", content: project.tradeoff },
              { title: "System / Policy Design", content: project.systemDesign },
              { title: "Collaboration", content: project.collaboration },
              { title: "Impact", content: project.impact },
              { title: "Learning", content: project.learning },
            ]),
      ].filter((section) => !section.content.startsWith("["));

  return (
    <div className="container section">
      <div className="pageIntro">
        <p className={styles.domain}>{project.domain}</p>
        <h1 className={styles.title}>{project.fullName ?? project.name}</h1>

        <div id="overview">
        {hasHero ? (
          <dl className={styles.meta}>
            <div>
              <dt>Role</dt>
              <dd className={styles.preLine}>{project.heroRole}</dd>
            </div>
            {project.heroTeam && (
              <div>
                <dt>Team</dt>
                <dd className={styles.preLine}>{project.heroTeam}</dd>
              </div>
            )}
            {project.heroPeriod && (
              <div>
                <dt>Period</dt>
                <dd>{project.heroPeriod}</dd>
              </div>
            )}
            {project.heroScope && (
              <div>
                <dt>Scope</dt>
                <dd>{project.heroScope.join(" · ")}</dd>
              </div>
            )}
            {project.heroKeyResult && (
              <div>
                <dt>Key Result</dt>
                <dd className={styles.accentText}>
                  {project.heroKeyResult.join(" · ")}
                </dd>
              </div>
            )}
          </dl>
        ) : (
          <>
            <p className={styles.oneLiner}>{project.oneLiner}</p>
            <dl className={styles.meta}>
              <div>
                <dt>Role</dt>
                <dd className={styles.preLine}>{project.role}</dd>
              </div>
              <div>
                <dt>Key Result</dt>
                <dd className={styles.preLine}>{project.keyResult}</dd>
              </div>
            </dl>
          </>
        )}
        </div>
      </div>

      <div className="longFormGrid">
      <div className={styles.caseStudy}>
        {!project.summary.startsWith("[") && (
          <section className={styles.caseSection}>
            <h2>Project Summary</h2>
            <p>{project.summary}</p>
          </section>
        )}

        {hasCustomSections && (
          <>
            {project.customSections!.map((section) => {
              const blocksContent = section.blocks.map((block, i) => {
                const bulletsBody = block.type === "bullets" && (
                  <>
                    {block.intro && (
                      <p className={styles.preLine}>{block.intro}</p>
                    )}
                    <ul
                      className={
                        block.muted
                          ? `${styles.bulletList} ${styles.mutedBullets}`
                          : styles.bulletList
                      }
                    >
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    {block.outro && (
                      <p className={styles.preLine}>{block.outro}</p>
                    )}
                  </>
                );

                return (
                  <Fragment key={i}>
                    {block.type === "p" && (
                      <p className={styles.preLine}>{block.text}</p>
                    )}
                    {block.type === "bullets" &&
                      (block.collapsible ? (
                        <details className={styles.collapsible}>
                          <summary>{block.collapsible.summary}</summary>
                          {bulletsBody}
                        </details>
                      ) : (
                        bulletsBody
                      ))}
                    {block.type === "flow" && (
                      <ol className={styles.processFlow}>
                        {block.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ol>
                    )}
                    {block.type === "flowDiagram" &&
                      (() => {
                        const items = block.items;
                        const width = 900;
                        const height = 100;
                        const padX = 60;
                        const cy = 38;
                        const step =
                          items.length > 1
                            ? (width - padX * 2) / (items.length - 1)
                            : 0;
                        const positions = items.map((_, i) => padX + step * i);

                        return (
                          <div className={styles.flowDiagramScroll}>
                            <div className={styles.flowDiagram}>
                              <svg
                                viewBox={`0 0 ${width} ${height}`}
                                role="img"
                                aria-label={items.join(" → ")}
                              >
                                <defs>
                                  <marker
                                    id={flowArrowId}
                                    viewBox="0 0 8 8"
                                    refX="7"
                                    refY="4"
                                    markerWidth="6"
                                    markerHeight="6"
                                    orient="auto-start-reverse"
                                  >
                                    <path
                                      d="M0,0 L8,4 L0,8 z"
                                      className={styles.flowDiagramArrow}
                                    />
                                  </marker>
                                </defs>
                                {positions.slice(0, -1).map((x, i) => (
                                  <line
                                    key={i}
                                    x1={x + 7}
                                    y1={cy}
                                    x2={positions[i + 1] - 9}
                                    y2={cy}
                                    className={styles.flowDiagramLine}
                                    markerEnd={`url(#${flowArrowId})`}
                                  />
                                ))}
                                {positions.map((x, i) => {
                                  const lines = items[i].split(" / ");
                                  return (
                                    <g key={i}>
                                      <circle
                                        cx={x}
                                        cy={cy}
                                        r={5}
                                        className={styles.flowDiagramNode}
                                      />
                                      <text
                                        x={x}
                                        y={cy + 20}
                                        textAnchor="middle"
                                        className={styles.flowDiagramLabel}
                                      >
                                        {lines.map((line, li) => (
                                          <tspan
                                            key={li}
                                            x={x}
                                            dy={li === 0 ? 0 : 13}
                                          >
                                            {line}
                                          </tspan>
                                        ))}
                                      </text>
                                    </g>
                                  );
                                })}
                              </svg>
                            </div>
                          </div>
                        );
                      })()}
                    {block.type === "images" &&
                      (() => {
                        const renderItem = (
                          image: (typeof block.items)[number],
                          sizes: string
                        ) =>
                          image.src ? (
                            <div key={image.num}>
                              <button
                                type="button"
                                className={styles.evidenceFrame}
                                onClick={() =>
                                  setLightbox({
                                    src: image.src!,
                                    alt: image.alt ?? image.caption,
                                    width: image.width ?? 1200,
                                    height: image.height ?? 800,
                                  })
                                }
                                aria-label={`${
                                  image.alt ?? image.caption
                                } — click to enlarge`}
                              >
                                <Image
                                  src={image.src}
                                  alt={image.alt ?? image.caption}
                                  fill
                                  sizes={sizes}
                                  className={styles.evidenceImageContain}
                                />
                              </button>
                              <p className={styles.imageCaptionText}>
                                {image.caption}
                              </p>
                            </div>
                          ) : (
                            <div key={image.num}>
                              <div className={styles.imagePlaceholder}>
                                Image Placeholder {image.num}
                              </div>
                              <p className={styles.imageCaptionText}>
                                {image.caption}
                              </p>
                            </div>
                          );

                        // A single evidence shot doesn't get grid rules
                        // forced on it — it stands alone, sized generously
                        // against the body column instead of squeezed into
                        // a grid cell. "compact" instead keeps it small —
                        // supporting evidence, not a result being featured.
                        if (block.items.length === 1) {
                          return (
                            <div
                              className={
                                block.compact
                                  ? styles.evidenceSecondary
                                  : styles.evidenceSingle
                              }
                            >
                              {renderItem(
                                block.items[0],
                                block.compact
                                  ? "(max-width: 640px) 45vw, 320px"
                                  : "(max-width: 640px) 100vw, 700px"
                              )}
                            </div>
                          );
                        }

                        if (block.columns === 2) {
                          return (
                            <div className={styles.imageGridWideBreakout}>
                              <div className={styles.imageGridWideInner}>
                                <div className={styles.imageGridWide}>
                                  {block.items.map((image) =>
                                    renderItem(
                                      image,
                                      "(max-width: 640px) 100vw, 500px"
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        }

                        return (
                          <div className={styles.imageGrid}>
                            {block.items.map((image) =>
                              renderItem(
                                image,
                                "(max-width: 640px) 100vw, 33vw"
                              )
                            )}
                          </div>
                        );
                      })()}
                    {block.type === "heroImage" && (
                      <div className={styles.heroImageBreakout}>
                        <div className={styles.heroImageInner}>
                          {block.src ? (
                            <Image
                              src={block.src}
                              alt={block.alt ?? block.caption}
                              width={block.width ?? 1920}
                              height={block.height ?? 1080}
                              sizes="(max-width: 1080px) 100vw, 1080px"
                              className={styles.heroImageAsset}
                              priority
                            />
                          ) : (
                            <div className={styles.heroImagePlaceholder}>
                              Image Placeholder
                            </div>
                          )}
                          <p className={styles.heroImageCaption}>
                            {block.caption}
                          </p>
                        </div>
                      </div>
                    )}
                    {block.type === "titledItems" && (
                      <div className={styles.subCaseList}>
                        {block.items.map((item) => (
                          <div key={item.title} className={styles.subCase}>
                            <p className={styles.caseTitle}>{item.title}</p>
                            <p className={styles.preLine}>{item.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {block.type === "impactGrid" && (
                      <div className={styles.impactGrid}>
                        {block.items.map((kr) => (
                          <div key={kr.label} className={styles.impactItem}>
                            <p className={styles.impactLabel}>{kr.label}</p>
                            <p className={styles.impactDescription}>
                              {kr.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </Fragment>
                );
              });

              return (
                <section
                  key={section.title}
                  id={slugify(section.title)}
                  className={
                    section.emphasis === "detail"
                      ? `${styles.caseSection} ${styles.detailSection}`
                      : styles.caseSection
                  }
                >
                  <h2>{section.title}</h2>
                  {section.collapsible ? (
                    <details className={styles.collapsible}>
                      <summary>{section.collapsible.summary}</summary>
                      {blocksContent}
                    </details>
                  ) : (
                    blocksContent
                  )}
                </section>
              );
            })}
          </>
        )}

        {hasProblemConstraints && (
          <section className={styles.caseSection}>
            <h2>Problem + Constraints</h2>
            {project.problemParagraphs!.map((paragraph) => (
              <p key={paragraph} className={styles.preLine}>
                {paragraph}
              </p>
            ))}
            <p className={`${styles.preLine} ${styles.keyMessage}`}>
              {project.keyMessage}
            </p>

            <h3 className={styles.subHeading}>Constraints</h3>
            <div className={styles.constraintsGrid}>
              {project.constraintItems!.map((item) => (
                <div key={item.title} className={styles.constraintItem}>
                  <p className={styles.constraintTitle}>
                    <span className={styles.constraintNumber}>
                      {item.num}
                    </span>
                    {item.title}
                  </p>
                  <p className={styles.preLine}>{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {hasDecisionFramework && (
          <section className={styles.caseSection}>
            <h2>Decision Framework</h2>
            <p>{project.decisionPrinciplesIntro}</p>
            <ul className={styles.bulletList}>
              {project.decisionPrinciples!.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            {project.decisionPrinciplesConclusion && (
              <p className={`${styles.preLine} ${styles.keyMessage}`}>
                {project.decisionPrinciplesConclusion}
              </p>
            )}
          </section>
        )}

        {hasDecisionCases && (
          <section className={styles.caseSection}>
            <h2>3 Decision Cases</h2>
            <div className={styles.subCaseList}>
              {project.decisionExamples!.map((example) => (
                <div key={example.title} className={styles.subCase}>
                  <p className={styles.caseTitle}>{example.title}</p>
                  <p className={styles.preLine}>{example.paragraph}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {hasDeliverySummary && (
          <section className={styles.caseSection}>
            <h2>From Decision to Delivery</h2>
            <p className={styles.preLine}>
              {project.deliverySummary!.governanceFlow}
            </p>

            <ol className={styles.processFlow}>
              {project.deliverySummary!.deliveryFlow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>

            <div className={styles.subCaseList}>
              {project.deliverySummary!.implementationFocus.map((f) => (
                <div key={f.title} className={styles.subCase}>
                  <p className={styles.subCaseTitle}>{f.title}</p>
                  <p className={styles.preLine}>{f.phrase}</p>
                </div>
              ))}
            </div>

            <div className={styles.imageGrid}>
              {project.deliverySummary!.images.map((image) => (
                <div key={image.num}>
                  <div className={styles.imagePlaceholder}>
                    Image Placeholder {image.num}
                    <br />
                    {image.subtitle}
                  </div>
                  <p className={styles.imageCaptionTitle}>
                    {image.captionTitle}
                  </p>
                  <p className={styles.imageCaptionText}>
                    {image.captionText}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {hasImpactLearning && (
          <section className={styles.caseSection}>
            <h2>Impact + Learning</h2>
            <p className={styles.preLine}>{project.impactSection!.intro}</p>

            <div className={styles.impactGrid}>
              {project.impactSection!.keyResults.map((kr) => (
                <div key={kr.label} className={styles.impactItem}>
                  <p className={styles.impactLabel}>{kr.label}</p>
                  <p className={styles.impactDescription}>
                    {kr.description}
                  </p>
                </div>
              ))}
            </div>

            <h3 className={styles.subHeading}>
              {project.impactSection!.expansionLabel}
            </h3>
            <p className={styles.preLine}>
              {project.impactSection!.expansionIntro}
            </p>
            <ul className={styles.bulletList}>
              {project.impactSection!.expansionBullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p>{project.impactSection!.expansionOutro}</p>

            <p className={`${styles.preLine} ${styles.keyMessage}`}>
              {project.impactSection!.message}
            </p>

            <h3 className={styles.subHeading}>Learning</h3>
            <ul className={styles.bulletList}>
              {project.learningSection!.learnings.map((l) => (
                <li key={l.label}>
                  <span className={styles.learningLabel}>{l.label}</span>
                  {l.text}
                </li>
              ))}
            </ul>
          </section>
        )}

        {restSections.map((section) => (
          <section key={section.title} className={styles.caseSection}>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </section>
        ))}
      </div>

      <SectionIndicator sections={indicatorSections} />
      </div>

      {lightbox && (
        <div
          className={styles.lightboxOverlay}
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className={styles.lightboxClose}
            onClick={() => setLightbox(null)}
          >
            Close ✕
          </button>
          <Image
            src={lightbox.src}
            alt={lightbox.alt}
            width={lightbox.width}
            height={lightbox.height}
            sizes="92vw"
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
