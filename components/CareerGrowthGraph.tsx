"use client";

import { useState } from "react";
import styles from "./CareerGrowthGraph.module.css";

type CareerEntry = { company: string; period: string; role: string; domain: string };
type FreelanceEntry = { company: string; period: string; domain?: string; note?: string };

// Home's Career Snapshot only — "how far the career has grown," not just
// "time passed." X = chronological order of the main roles; Y = cumulative
// years since the first job (elapsed calendar span, gaps included — the
// same span the site's own "12 years" headline figure is rounded from).
// About's page keeps its own separate horizontal timeline (CareerGraphView)
// entirely untouched; this component doesn't read or affect it.
const MAIN_ORDER = [
  "Hyundai Home Shopping",
  "Yuratech",
  "ReadyKorea",
  "Cafe24",
  "Flor Momento",
  "Biginsight",
  "EXEM",
];

// Both are pinned to the Y=0 baseline at the user's explicit request — they
// read as the career's starting point, not yet part of the "growth" being
// plotted. Everything from ReadyKorea on uses its actual computed value.
const BASELINE_COMPANIES = new Set(["Hyundai Home Shopping", "Yuratech"]);

// The plotted scale (SCALE_MAX) and the labeled ticks (AXIS_TICKS) are
// deliberately different numbers. The full first-job-to-last-day span
// (gaps included — the same span the site's "12 years" headline figure is
// rounded from) computes to ~12.08 years at EXEM, a hair over the "12"
// gridline; scaling to 13 gives that last point visual headroom above the
// 12 line instead of pinning it to the very top edge of the chart, while
// the ticks themselves stay the requested 0/3/6/9/12 (13 is not itself a
// labeled tick).
const SCALE_MAX = 13;
const AXIS_TICKS = [0, 3, 6, 9, 12];

function parseDatePart(part: string): Date {
  const [y, m, d] = part.trim().split(".").map((n) => parseInt(n, 10));
  return new Date(y, (m || 1) - 1, d || 1);
}

function splitPeriod(period: string): [Date, Date] {
  const [startStr, endStr] = period.split(" – ");
  const start = parseDatePart(startStr);
  const end = endStr ? parseDatePart(endStr) : start;
  return [start, end];
}

function yearsBetween(a: Date, b: Date): number {
  return (b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
}

function toMonthPrecision(period: string): string {
  return period
    .split(" – ")
    .map((part) => (/^\d{4}\.\d{2}\.\d{2}$/.test(part) ? part.slice(0, 7) : part))
    .join(" – ");
}

// Greedy word-wrap to a shared max-chars-per-line budget, so every point's
// company name / role-domain line targets the same rendered width instead
// of each string finding its own best-balanced split.
function wrapToWidth(label: string, maxChars: number): string[] {
  const words = label.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

const COMPANY_MAX_CHARS = 15;
const TRACK_MAX_CHARS = 22;
const FREELANCE_COMPANY_MAX_CHARS = 16;
const FREELANCE_TRACK_MAX_CHARS = 18;

const VIEW_W = 1100;
const Y_AXIS_W = 40;
const PLOT_LEFT = Y_AXIS_W + 85;
const PLOT_RIGHT = VIEW_W - 85;
const PLOT_W = PLOT_RIGHT - PLOT_LEFT;

// Main career labels sit below the line now (uniform — see the points loop
// below), so PLOT_TOP only has to clear the plot itself plus freelance
// markers' flagpoles (they sit above the line at their own real x/y — see
// freelancePoints and FREELANCE_OFFSET_*). Freelance experience isn't part
// of the Y scale, so its vertical reach is independent of SCALE_MAX.
const PLOT_TOP = 90;
const PLOT_H = 240; // "wide, low, gentle" — the drawing area itself, not
// counting the label margins added above/below it — unchanged, so the
// line's slope is exactly as before.
const PLOT_BOTTOM = PLOT_TOP + PLOT_H; // the Y=0 gridline / X-axis baseline
// Bottom margin holds every main label's below-the-line reach, including
// Hyundai/Yuratech's (both at Y=0, i.e. right at PLOT_BOTTOM).
const BOTTOM_MARGIN = 108;
const VIEW_H = PLOT_BOTTOM + BOTTOM_MARGIN;

function plotX(ratio: number) {
  return PLOT_LEFT + ratio * PLOT_W;
}
function plotY(years: number) {
  return PLOT_BOTTOM - (Math.min(years, SCALE_MAX) / SCALE_MAX) * PLOT_H;
}

// Reused as-is from CareerGraphView's freelance placement — a freelance
// entry's x is interpolated between whichever two main points its date
// falls between, then nudged apart from its neighbors so close dates never
// collapse onto the same point. This is the real, date-driven x — never
// adjusted for label layout; only each label's own vertical offset is.
function interpolateXRatio(dateValue: number, main: { xRatio: number; dateValue: number }[]): number {
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
// Wider now that freelance markers carry always-visible text (not just a
// dot) — keeps adjacent labels from touching even when several dates
// cluster close together (2021's three freelance stints).
const MIN_FREELANCE_GAP = 0.11;

type Point = {
  id: string;
  company: string;
  period: string;
  trackLabel: string;
  years: number;
  isIntern: boolean;
  xRatio: number;
  x: number;
  y: number;
  index: number;
};

export default function CareerGrowthGraph({
  career,
  freelance,
}: {
  career: CareerEntry[];
  freelance: FreelanceEntry[];
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const tooltipId = hoveredId ?? activeId;

  const mainData = MAIN_ORDER.map((company) => career.find((c) => c.company === company));
  const firstEntry = mainData[0];
  const [firstStart] = firstEntry ? splitPeriod(firstEntry.period) : [new Date()];

  const points: Point[] = MAIN_ORDER.map((company, i) => {
    const entry = mainData[i];
    const period = entry?.period ?? "";
    const [, end] = entry ? splitPeriod(entry.period) : [firstStart, firstStart];
    const years = BASELINE_COMPANIES.has(company) ? 0 : yearsBetween(firstStart, end);
    const xRatio = i / (MAIN_ORDER.length - 1);
    return {
      id: `m-${company}`,
      company,
      period,
      trackLabel: entry?.domain || entry?.role || "",
      years,
      isIntern: /intern/i.test(entry?.role ?? ""),
      xRatio,
      x: plotX(xRatio),
      y: plotY(years),
      index: i,
    };
  });

  // A freelance marker's dot sits ON the main line at its own real x — the
  // line between two adjacent main points is a straight segment (see the
  // polyline below), so linearly interpolating Y between them by x gives
  // the exact on-line position, not a detached "lane".
  function lineYAt(xRatio: number): number {
    if (xRatio <= points[0].xRatio) return points[0].y;
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      if (xRatio >= a.xRatio && xRatio <= b.xRatio) {
        const t = (xRatio - a.xRatio) / (b.xRatio - a.xRatio);
        return a.y + t * (b.y - a.y);
      }
    }
    return points[points.length - 1].y;
  }

  const freelancePoints = (() => {
    const mainForInterp = points.map((p) => ({
      xRatio: p.xRatio,
      dateValue: (() => {
        const [start] = splitPeriod(mainData[p.index]?.period ?? "");
        return yearsBetween(firstStart, start);
      })(),
    }));
    const raw = freelance.map((f) => {
      const [start] = splitPeriod(f.period);
      const dateValue = yearsBetween(firstStart, start);
      return {
        id: `f-${f.company}`,
        company: f.company,
        period: f.period,
        trackLabel: f.domain ?? "",
        xRatio: interpolateXRatio(dateValue, mainForInterp),
        dateValue,
      };
    });
    // Real date-driven x, only nudged apart by the minimum needed so two
    // close dates don't collapse onto the same point — never moved for
    // label-layout reasons.
    const sorted = [...raw].sort((a, b) => a.xRatio - b.xRatio);
    for (let i = 1; i < sorted.length; i++) {
      sorted[i].xRatio = Math.max(sorted[i].xRatio, sorted[i - 1].xRatio + MIN_FREELANCE_GAP);
    }
    if (sorted.length > 0) {
      // Capped short of 1 (EXEM's own x) so the dot doesn't land in
      // EXEM's exact column, which would put its flagpole/label directly
      // through EXEM's own marker.
      sorted[sorted.length - 1].xRatio = Math.min(0.94, sorted[sorted.length - 1].xRatio);
    }
    for (let i = sorted.length - 2; i >= 0; i--) {
      sorted[i].xRatio = Math.min(sorted[i].xRatio, sorted[i + 1].xRatio - MIN_FREELANCE_GAP);
    }
    return sorted.map((f, fi) => ({
      ...f,
      x: plotX(f.xRatio),
      y: lineYAt(f.xRatio),
      // Adjacent freelance dates can sit close together (2021's three
      // stints) — alternating a short/tall flagpole is the "y-offset only"
      // fix for label collision the brief asks for, since the dot's x/y
      // itself stays exactly on the real date-driven line position.
      raised: fi % 2 === 1,
    }));
  })();

  const linePath = points.map((p) => `${p.x},${p.y}`).join(" ");

  const tooltipTarget =
    points.find((p) => p.id === tooltipId) ??
    freelancePoints.find((f) => f.id === tooltipId) ??
    null;
  const tooltipIsMain = points.some((p) => p.id === tooltipId);

  const activate = (id: string) => {
    setActiveId((cur) => (cur === id ? null : id));
  };

  return (
    <div className={styles.wrap}>
      {/* Desktop/tablet: rising SVG line graph */}
      <div className={styles.desktopGraph}>
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className={styles.svg}
          role="img"
          aria-label="Career growth graph: cumulative years of experience across roles, past to present"
        >
          {AXIS_TICKS.map((tick) => {
            const y = plotY(tick);
            return (
              <g key={tick}>
                <line x1={PLOT_LEFT} y1={y} x2={PLOT_RIGHT} y2={y} className={styles.gridLine} />
                <text x={Y_AXIS_W} y={y + 4} textAnchor="end" className={styles.axisTick}>
                  {tick}
                </text>
              </g>
            );
          })}
          <text x={Y_AXIS_W} y={PLOT_TOP - 14} textAnchor="end" className={styles.axisUnit}>
            Years
          </text>

          <polyline points={linePath} className={styles.growthLine} />

          {/* Main career — always below the line, so it never competes
              with freelance's above-the-line labels. The two points tied
              at Y=0 (Hyundai/Yuratech) are the one unavoidable exception:
              Hyundai goes above instead, since a below label there would
              sit exactly under Yuratech's own. Cafe24 (only ~0.4 years,
              a few px, above ReadyKorea) gets a taller drop so its label
              clears ReadyKorea's — both stay below, just at different
              depths. */
          points.map((p) => {
            const isHyundai = p.company === "Hyundai Home Shopping";
            const isCafe24 = p.company === "Cafe24";
            const dir = isHyundai ? -1 : 1;
            const baseOffset = p.isIntern ? 22 : 24;
            const extraDrop = isCafe24 ? 34 : 0;
            const companyLines = wrapToWidth(p.company, COMPANY_MAX_CHARS);
            const trackLines = p.trackLabel ? wrapToWidth(p.trackLabel, TRACK_MAX_CHARS) : [];
            const companyY = p.y + dir * (baseOffset + extraDrop);
            const trackGapStart =
              companyY + dir * ((companyLines.length - 1) * 20 + (p.isIntern ? 16 : 20));
            const isShown = tooltipId === p.id;

            return (
              <g
                key={p.id}
                role="button"
                tabIndex={0}
                aria-label={[p.company, p.trackLabel, p.period].filter(Boolean).join(", ")}
                aria-pressed={isShown}
                onMouseEnter={() => setHoveredId(p.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(p.id)}
                onBlur={() => setHoveredId(null)}
                onClick={() => activate(p.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    activate(p.id);
                  }
                }}
                className={styles.mainNode}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={p.isIntern ? 5 : 7.5}
                  className={p.isIntern ? styles.pointIntern : styles.point}
                />
                <circle cx={p.x} cy={p.y} r={16} className={styles.hitArea} />
                <text x={p.x} y={companyY} textAnchor="middle" className={styles.companyLabel}>
                  {(isHyundai ? [...companyLines].reverse() : companyLines).map((line, li) => (
                    <tspan key={li} x={p.x} dy={li === 0 ? 0 : dir * 20}>
                      {line}
                    </tspan>
                  ))}
                </text>
                {trackLines.length > 0 && (
                  <text
                    x={p.x}
                    y={trackGapStart}
                    textAnchor="middle"
                    className={p.isIntern ? styles.trackLabelIntern : styles.trackLabel}
                  >
                    {(isHyundai ? [...trackLines].reverse() : trackLines).map((line, li) => (
                      <tspan key={li} x={p.x} dy={li === 0 ? 0 : dir * 15}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                )}
              </g>
            );
          })}

          {/* Freelance / project — secondary markers on the line at their
              real date position, connected up to an always-visible label
              by a short dashed flagpole. Y is independent of the Y=0..13
              growth scale; not counted toward it. Rendered after (i.e. on
              top of) main career points: a freelance date can land right
              next to a main point (Sesun Electronics ~1 month after Flor
              Momento's own start), and paint order also decides which
              element's hit-area wins a pointer event where they overlap —
              this keeps freelance interactive even then. */}
          {freelancePoints.map((f) => {
            const isShown = tooltipId === f.id;
            const offset = f.raised ? 78 : 48;
            const companyAnchor = f.y - offset;
            const stemTopY = companyAnchor + 6; // small gap between the
            // dashed line's end and the label's own bottom edge
            const companyLines = wrapToWidth(f.company, FREELANCE_COMPANY_MAX_CHARS);
            const trackLines = f.trackLabel ? wrapToWidth(f.trackLabel, FREELANCE_TRACK_MAX_CHARS) : [];
            const trackAnchor =
              companyAnchor - ((companyLines.length - 1) * 11 + 12);
            return (
              <g
                key={f.id}
                className={styles.freelanceNode}
                role="button"
                tabIndex={0}
                aria-label={[f.company, f.trackLabel, "freelance / project experience"].filter(Boolean).join(", ")}
                aria-pressed={isShown}
                onMouseEnter={() => setHoveredId(f.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(f.id)}
                onBlur={() => setHoveredId(null)}
                onClick={() => activate(f.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    activate(f.id);
                  }
                }}
              >
                <line x1={f.x} y1={f.y} x2={f.x} y2={stemTopY} className={styles.freelanceStem} />
                <circle cx={f.x} cy={f.y} r={3.5} className={styles.freelanceDot} />
                {/* Larger invisible hit-area — the visible dot/stem alone
                    is too small/thin a target for hover and tap. */}
                <circle cx={f.x} cy={f.y - 8} r={13} className={styles.hitArea} />
                <text x={f.x} y={companyAnchor} textAnchor="middle" className={styles.freelanceCompany}>
                  {[...companyLines].reverse().map((line, li) => (
                    <tspan key={li} x={f.x} dy={li === 0 ? 0 : -11}>
                      {line}
                    </tspan>
                  ))}
                </text>
                {trackLines.length > 0 && (
                  <text x={f.x} y={trackAnchor} textAnchor="middle" className={styles.freelanceTrack}>
                    {[...trackLines].reverse().map((line, li) => (
                      <tspan key={li} x={f.x} dy={li === 0 ? 0 : -10}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                )}
              </g>
            );
          })}

          {tooltipTarget &&
            (() => {
              const mainPoint = tooltipIsMain ? (tooltipTarget as Point) : null;
              const freelancePoint = !mainPoint
                ? (tooltipTarget as (typeof freelancePoints)[number])
                : null;
              const x = mainPoint ? mainPoint.x : freelancePoint!.x;
              const pointY = mainPoint ? mainPoint.y : freelancePoint!.y;
              // Opposite side from the always-visible label: below main
              // labels -> tooltip above; above freelance labels -> tooltip
              // below (toward the line), so the two never compete.
              const below = mainPoint ? mainPoint.company === "Hyundai Home Shopping" : true;
              const period = toMonthPrecision(tooltipTarget.period);
              // Main points already show company + role/domain permanently
              // — the only genuinely new information a tooltip adds there
              // is the date, so it stays a compact one-liner. Freelance
              // markers have no permanent date shown either, but do show
              // company/domain already, so likewise just the date; company
              // is still included so the tooltip is self-contained.
              const lines = mainPoint ? [period] : [freelancePoint!.company, period];
              const boxW = mainPoint ? 108 : 150;
              const lineH = 15;
              const boxH = lines.length * lineH + 10;
              const boxX = Math.min(Math.max(x - boxW / 2, PLOT_LEFT - 10), PLOT_RIGHT - boxW + 10);
              const boxY = below ? pointY + 12 : pointY - 12 - boxH;
              return (
                <g className={styles.tooltip} pointerEvents="none">
                  <rect x={boxX} y={boxY} width={boxW} height={boxH} rx={4} className={styles.tooltipBox} />
                  {lines.map((line, li) => (
                    <text
                      key={li}
                      x={boxX + boxW / 2}
                      y={boxY + 15 + li * lineH}
                      textAnchor="middle"
                      className={!mainPoint && li === 0 ? styles.tooltipTitle : styles.tooltipLine}
                    >
                      {line}
                    </text>
                  ))}
                </g>
              );
            })()}
        </svg>

        <div className={styles.legend}>
          <span className={styles.legendItem}>
            <span className={styles.legendDotMain} />
            Main Career
          </span>
          <span className={styles.legendItem}>
            <span className={styles.legendDotFreelance} />
            Freelance / Project
          </span>
        </div>
      </div>

      {/* Mobile: vertical list — desktop graph doesn't read well cramped
          into ~360px of usable width, so it's replaced (not shrunk) below
          the sizeLarge breakpoint. Company + role/domain stay always
          visible; period reveals on tap, matching desktop's hover/focus
          reveal. */}
      <ol className={styles.mobileList}>
        {points.map((p) => {
          const isShown = tooltipId === p.id;
          return (
            <li key={p.id}>
              <div
                className={`${styles.mobileItem} ${p.isIntern ? styles.mobileIntern : ""}`}
                role="button"
                tabIndex={0}
                aria-pressed={isShown}
                aria-label={[p.company, p.trackLabel, toMonthPrecision(p.period)].filter(Boolean).join(", ")}
                onClick={() => activate(p.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    activate(p.id);
                  }
                }}
              >
                <span className={styles.mobileDot} />
                <div className={styles.mobileText}>
                  <span className={styles.mobileName}>{p.company}</span>
                  {p.trackLabel && (
                    <span className={p.isIntern ? styles.mobileTrackIntern : styles.mobileTrack}>
                      {p.trackLabel}
                    </span>
                  )}
                  {isShown && <span className={styles.mobilePeriod}>{toMonthPrecision(p.period)}</span>}
                </div>
              </div>
            </li>
          );
        })}

        {freelancePoints.length > 0 && (
          <li className={styles.mobileFreelanceGroup}>
            <p className={styles.mobileFreelanceHeading}>Freelance / Project Experience</p>
            <ul className={styles.mobileFreelanceList}>
              {freelancePoints.map((f) => {
                const isShown = tooltipId === f.id;
                return (
                  <li key={f.id}>
                    <div
                      className={styles.mobileFreelanceItem}
                      role="button"
                      tabIndex={0}
                      aria-pressed={isShown}
                      aria-label={[f.company, f.trackLabel, toMonthPrecision(f.period)].filter(Boolean).join(", ")}
                      onClick={() => activate(f.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          activate(f.id);
                        }
                      }}
                    >
                      <div className={styles.mobileFreelanceText}>
                        <span className={styles.mobileFreelanceName}>{f.company}</span>
                        {f.trackLabel && (
                          <span className={styles.mobileFreelanceTrack}>{f.trackLabel}</span>
                        )}
                      </div>
                      {isShown && <span className={styles.mobilePeriod}>{toMonthPrecision(f.period)}</span>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </li>
        )}
      </ol>
    </div>
  );
}
