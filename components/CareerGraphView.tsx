"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/projects";
import styles from "./CareerGraphView.module.css";

type CareerEntry = { company: string; period: string; role: string; domain: string };
type FreelanceEntry = { company: string; period: string; note?: string };

type GraphNode = {
  id: string;
  label: string;
  period: string;
  role?: string;
  summary?: string;
  // Short, always-visible "what domain/role" line for Home's "large" graph
  // — sourced only from the career timeline entry (never a project's own
  // longer heroRole/oneLiner, which stay reserved for the Detail Panel), so
  // it's consistently a single short tag rather than a full sentence.
  trackLabel?: string;
  slug?: string;
  isSelected: boolean;
  isFreelance: boolean;
  dateValue: number;
  xRatio: number;
};

// Chronological order, past -> present, exactly as specified — not derived
// from date parsing, since some periods only carry a bare year (e.g. Flor
// Momento "2018–2021") which can't be reliably sub-ordered against a
// precise one (Cafe24 "2018.03.12–2018.07.20"). This sequence is the
// authority; date parsing below is only used for freelance placement.
const MAIN_ORDER = [
  "Hyundai Home Shopping",
  "Yuratech",
  "ReadyKorea",
  "Cafe24",
  "Flor Momento",
  "Biginsight",
  "EXEM",
];

function parsePeriodStart(period: string): number {
  const match = period.match(/(\d{4})(?:\.(\d{2}))?/);
  if (!match) return 0;
  const year = parseInt(match[1], 10);
  const month = match[2] ? parseInt(match[2], 10) : 1;
  return year + (month - 1) / 12;
}

function wrapLabel(label: string): string[] {
  if (label.length <= 12 || !label.includes(" ")) return [label];
  const words = label.split(" ");
  let bestIdx = 1;
  let bestDiff = Infinity;
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(" ").length;
    const b = words.slice(i).join(" ").length;
    const diff = Math.abs(a - b);
    if (diff < bestDiff) {
      bestDiff = diff;
      bestIdx = i;
    }
  }
  return [words.slice(0, bestIdx).join(" "), words.slice(bestIdx).join(" ")];
}

const VIEW_W = 1100;
const X_PAD = 85;
const USABLE_W = VIEW_W - X_PAD * 2;
const MIN_FREELANCE_GAP = 0.09;

function mainX(ratio: number) {
  return X_PAD + ratio * USABLE_W;
}

// Piecewise-linear interpolation across the main path's index-based x
// positions, using each pair's actual dates as the interpolation key. This
// places a freelance node's x proportional to where its date genuinely
// falls between the two main nodes bracketing it — not just "nearest node
// + fixed nudge" (that approach could collapse two different freelance
// dates onto the identical x position).
function interpolateXRatio(dateValue: number, main: GraphNode[]): number {
  if (dateValue <= main[0].dateValue) return main[0].xRatio;
  for (let i = 0; i < main.length - 1; i++) {
    const a = main[i];
    const b = main[i + 1];
    const lo = Math.min(a.dateValue, b.dateValue);
    const hi = Math.max(a.dateValue, b.dateValue);
    if (dateValue >= lo && dateValue <= hi && hi > lo) {
      const t = (dateValue - a.dateValue) / (b.dateValue - a.dateValue);
      return a.xRatio + t * (b.xRatio - a.xRatio);
    }
  }
  return main[main.length - 1].xRatio;
}

export default function CareerGraphView({
  projects,
  career,
  freelance,
  size = "default",
  showDetail = true,
}: {
  projects: Project[];
  career: CareerEntry[];
  freelance: FreelanceEntry[];
  // "large" bumps label/node scale for Home's wider visual-summary
  // treatment — About keeps the default size unchanged.
  size?: "default" | "large";
  // Home hides the Node Detail panel (kept for About's interactive use) so
  // an unclicked graph doesn't leave a large empty box on the summary page.
  showDetail?: boolean;
}) {
  const router = useRouter();
  const mainRadius = size === "large" ? { base: 8, selected: 10 } : { base: 7, selected: 9 };
  const freelanceRadius = size === "large" ? 5 : 4.5;
  // "large" gets a taller viewBox (not just wider labels) so Home's graph
  // reads as a bigger visual, not just a stretched version of About's — the
  // extra room (270->300) is for .trackLabel below, so the company name's
  // own position doesn't have to move.
  const viewH = size === "large" ? 300 : 240;
  const mainLineY = size === "large" ? 165 : 140;
  const freelanceLaneY = size === "large" ? 58 : 54;
  const mainLabelDy = size === "large" ? 20 : 18;
  const mainLabelOffset = size === "large" ? { selected: 34, base: 32 } : { selected: 31, base: 29 };
  const periodLabelOffset = size === "large" ? { selected: 24, base: 22 } : { selected: 22, base: 20 };
  // Role/domain line — "large" (Home) only, sits below the company name at
  // a fixed gap past its LAST line (1 or 2, from wrapLabel), so a 2-line
  // company name (only "Hyundai Home Shopping") and a 2-line track label
  // (only Yuratech's/Cafe24's longer fallback) never have to be reasoned
  // about together — each node's own line count independently determines
  // where its own track label starts.
  const trackLabelGap = 16;
  const trackLabelDy = 14;
  // Adjacent main nodes sit close enough (7 nodes evenly spaced) that full
  // date-range strings ("2018.08.08 – 2021.03") can be wider than the gap
  // between them and collide. Stagger odd-index period labels further from
  // the line than even-index ones — same near/far two-row trick as the
  // domain labels below — so neighboring labels' vertical bands never
  // overlap, without moving nodes/line/company-name positions at all.
  const periodLabelStagger = 18;
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const mainNodes: GraphNode[] = useMemo(
    () =>
      MAIN_ORDER.map((company, i) => {
        const project = projects.find((p) => p.name === company);
        const careerEntry = career.find((c) => c.company === company);
        const period = project?.heroPeriod ?? careerEntry?.period ?? "";
        return {
          id: `m-${company}`,
          label: company,
          period,
          role: project ? project.heroRole ?? project.role : careerEntry?.role || undefined,
          summary: project ? project.oneLiner : careerEntry?.domain || undefined,
          trackLabel: careerEntry?.domain || careerEntry?.role || undefined,
          slug: project?.slug,
          isSelected: Boolean(project),
          isFreelance: false,
          dateValue: parsePeriodStart(period),
          xRatio: i / (MAIN_ORDER.length - 1),
        };
      }),
    [projects, career]
  );

  const freelanceNodes = useMemo(() => {
    const florMomento = mainNodes.find((n) => n.label === "Flor Momento") ?? mainNodes[0];

    const raw = freelance.map((entry) => {
      const dateValue = parsePeriodStart(entry.period);
      const isSesun = entry.company === "Sesun Electronics";
      const xRatio = isSesun ? florMomento.xRatio : interpolateXRatio(dateValue, mainNodes);
      const node: GraphNode & { connectTo: GraphNode; paired: boolean } = {
        id: `f-${entry.company}`,
        label: entry.company,
        period: entry.period,
        role: "Freelance / Project Experience",
        summary: entry.note,
        isSelected: false,
        isFreelance: true,
        dateValue,
        xRatio,
        connectTo: isSesun ? florMomento : mainNodes[0],
        paired: isSesun,
      };
      return node;
    });

    // Keep Sesun pinned exactly above Flor Momento (the paired connector
    // depends on that); enforce a minimum gap among the rest so two nearby
    // dates never collapse onto the same x position. A forward-only cascade
    // can push values past the right edge, and clamping them back would
    // collapse them onto the same boundary point again — so cap the last
    // node first, then push earlier ones left as needed (backward pass).
    const pinned = raw.filter((n) => n.paired);
    const movable = raw.filter((n) => !n.paired).sort((a, b) => a.xRatio - b.xRatio);

    for (let i = 1; i < movable.length; i++) {
      movable[i].xRatio = Math.max(movable[i].xRatio, movable[i - 1].xRatio + MIN_FREELANCE_GAP);
    }
    if (movable.length > 0) {
      movable[movable.length - 1].xRatio = Math.min(1, movable[movable.length - 1].xRatio);
    }
    for (let i = movable.length - 2; i >= 0; i--) {
      const maxAllowed = movable[i + 1].xRatio - MIN_FREELANCE_GAP;
      if (movable[i].xRatio > maxAllowed) {
        movable[i].xRatio = maxAllowed;
      }
    }

    return [...pinned, ...movable];
  }, [freelance, mainNodes]);

  const allNodes = useMemo(
    () => [...mainNodes, ...freelanceNodes].sort((a, b) => a.dateValue - b.dateValue),
    [mainNodes, freelanceNodes]
  );

  const activeNode = allNodes.find((n) => n.id === activeId) ?? null;

  const activate = (node: GraphNode) => {
    if (node.isSelected && node.slug) {
      if (activeId === node.id) {
        router.push(`/projects/${node.slug}`);
        return;
      }
    }
    setActiveId(node.id);
  };

  const nodeClass = (node: GraphNode, isActive: boolean, isHovered: boolean) =>
    [
      styles.node,
      node.isFreelance ? styles.nodeFreelance : styles.nodeMain,
      node.isSelected ? styles.nodeSelected : "",
      isActive ? styles.nodeActive : "",
      isHovered ? styles.nodeHovered : "",
    ]
      .filter(Boolean)
      .join(" ");

  return (
    <div className={`${styles.wrap} ${size === "large" ? styles.sizeLarge : ""}`}>
      {/* Desktop: horizontal SVG graph, past -> present left to right */}
      <div className={styles.desktopGraph}>
        <svg viewBox={`0 0 ${VIEW_W} ${viewH}`} className={styles.svg} role="img" aria-label="Career graph, past to present">
          <line
            x1={X_PAD}
            y1={mainLineY}
            x2={VIEW_W - X_PAD}
            y2={mainLineY}
            className={styles.mainLine}
          />

          {freelanceNodes.map((f) => {
            const x = mainX(f.xRatio);
            const targetX = f.paired ? mainX(f.connectTo.xRatio) : x;
            const targetY = f.paired ? mainLineY : mainLineY;
            return (
              <line
                key={`edge-${f.id}`}
                x1={x}
                y1={freelanceLaneY}
                x2={targetX}
                y2={targetY}
                className={f.paired ? styles.pairedEdge : styles.branchEdge}
              />
            );
          })}

          {mainNodes.map((n, i) => {
            const isActive = activeId === n.id;
            const isHovered = hoveredId === n.id;
            const lines = wrapLabel(n.label);
            const x = mainX(n.xRatio);
            const companyOffset = n.isSelected ? mainLabelOffset.selected : mainLabelOffset.base;
            const trackLines = size === "large" && n.trackLabel ? wrapLabel(n.trackLabel) : [];
            const trackLabelY =
              mainLineY + companyOffset + (lines.length - 1) * mainLabelDy + trackLabelGap;
            return (
              <g
                key={n.id}
                className={nodeClass(n, isActive, isHovered)}
                role="button"
                tabIndex={0}
                aria-label={[n.label, n.period].filter(Boolean).join(", ")}
                aria-pressed={isActive}
                onMouseEnter={() => {
                  setHoveredId(n.id);
                  setActiveId(n.id);
                }}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => {
                  setHoveredId(n.id);
                  setActiveId(n.id);
                }}
                onBlur={() => setHoveredId(null)}
                onClick={() => activate(n)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    activate(n);
                  }
                }}
              >
                <circle
                  cx={x}
                  cy={mainLineY}
                  r={n.isSelected ? mainRadius.selected : mainRadius.base}
                  className={styles.nodeCircle}
                />
                <text
                  x={x}
                  y={mainLineY + (n.isSelected ? mainLabelOffset.selected : mainLabelOffset.base)}
                  textAnchor="middle"
                  className={styles.mainLabel}
                >
                  {lines.map((line, li) => (
                    <tspan key={li} x={x} dy={li === 0 ? 0 : mainLabelDy}>
                      {line}
                    </tspan>
                  ))}
                </text>
                {trackLines.length > 0 && (
                  <text
                    x={x}
                    y={trackLabelY}
                    textAnchor="middle"
                    className={styles.trackLabel}
                  >
                    {trackLines.map((line, li) => (
                      <tspan key={li} x={x} dy={li === 0 ? 0 : trackLabelDy}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                )}
                <text
                  x={x}
                  y={
                    mainLineY -
                    (n.isSelected ? periodLabelOffset.selected : periodLabelOffset.base) -
                    (i % 2 === 1 ? periodLabelStagger : 0)
                  }
                  textAnchor="middle"
                  className={styles.periodLabel}
                >
                  {n.period}
                </text>
              </g>
            );
          })}

          {freelanceNodes.map((f) => {
            const isActive = activeId === f.id;
            const isHovered = hoveredId === f.id;
            const x = mainX(f.xRatio);
            return (
              <g
                key={f.id}
                className={nodeClass(f, isActive, isHovered)}
                role="button"
                tabIndex={0}
                aria-label={[f.label, f.period].filter(Boolean).join(", ")}
                aria-pressed={isActive}
                onMouseEnter={() => {
                  setHoveredId(f.id);
                  setActiveId(f.id);
                }}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => {
                  setHoveredId(f.id);
                  setActiveId(f.id);
                }}
                onBlur={() => setHoveredId(null)}
                onClick={() => activate(f)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    activate(f);
                  }
                }}
              >
                <circle cx={x} cy={freelanceLaneY} r={freelanceRadius} className={styles.nodeCircle} />
                <text
                  x={x}
                  y={freelanceLaneY - 12}
                  textAnchor="middle"
                  className={styles.freelanceLabel}
                >
                  {wrapLabel(f.label).map((line, li) => (
                    <tspan key={li} x={x} dy={li === 0 ? 0 : -13}>
                      {line}
                    </tspan>
                  ))}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile: vertical, chronological, past (top) -> present (bottom) */}
      <ol className={styles.mobileList}>
        {allNodes.map((n) => {
          const isActive = activeId === n.id;
          return (
            <li key={n.id}>
              <div
                className={`${styles.mobileItem} ${
                  n.isFreelance ? styles.mobileFreelance : styles.mobileMain
                } ${n.isSelected ? styles.mobileSelected : ""} ${isActive ? styles.mobileActive : ""}`}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onClick={() => activate(n)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    activate(n);
                  }
                }}
              >
                <span className={styles.mobileDot} />
                <span className={styles.mobileName}>{n.label}</span>
                <span className={styles.mobilePeriod}>{n.period}</span>
                {n.isFreelance && n.summary && (
                  <span className={styles.mobileNote}>{n.summary}</span>
                )}
                {!n.isFreelance && size === "large" && n.trackLabel && (
                  <span className={styles.mobileNote}>{n.trackLabel}</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {showDetail && (
        <div className={styles.detailPanel}>
          <p className={styles.detailEyebrow}>Node Detail</p>
          {activeNode ? (
            <>
              <div className={styles.detailHeader}>
                <h3 className={styles.detailName}>{activeNode.label}</h3>
                {activeNode.period && (
                  <span className={styles.detailPeriod}>{activeNode.period}</span>
                )}
              </div>
              {activeNode.role && <p className={styles.detailRole}>{activeNode.role}</p>}
              {activeNode.summary && (
                <p className={styles.detailSummary}>{activeNode.summary}</p>
              )}
              {activeNode.isSelected && activeNode.slug && (
                <a href={`/projects/${activeNode.slug}`} className={styles.detailCta}>
                  View Case Study →
                </a>
              )}
            </>
          ) : (
            <p className={styles.detailPlaceholder}>
              Hover or select a node to see company, period, and role.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
