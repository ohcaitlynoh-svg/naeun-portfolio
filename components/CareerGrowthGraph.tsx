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
// PLOT_TOP (the Y=12 gridline) leaves a dedicated top zone above it for
// the freelance lane's always-visible company+domain labels (below) —
// tall enough that even the far-row label of a freelance marker sitting
// near EXEM's own x position doesn't collide with EXEM's "above" label
// (see the points loop further down). Was 118 before freelance markers
// carried visible text at all.
const PLOT_TOP = 185;
const PLOT_H = 240; // "wide, low, gentle" — the drawing area itself, not
// counting the label margins added above/below it — unchanged, so the
// line's slope is exactly as before.
const PLOT_BOTTOM = PLOT_TOP + PLOT_H; // the Y=0 gridline / X-axis baseline
const VIEW_H = PLOT_BOTTOM + 92;

// Freelance lane sits above PLOT_TOP, its own fixed zone independent of
// the Y=0..13 growth scale (freelance experience isn't part of that
// cumulative value — see freelancePoints below, which never feeds into
// the main line's Y). Two staggered anchor rows (near/far) so adjacent
// freelance markers — several sit close together in 2021 — don't have
// their labels collide; each marker's row is picked by alternating index
// after sorting by x (see freelancePoints).
const FREELANCE_DOT_Y = 150;
const FREELANCE_STEM_LEN = 14;
const FREELANCE_NEAR_ANCHOR = FREELANCE_DOT_Y - 12;
const FREELANCE_ROW_STAGGER = 40;
const FREELANCE_FAR_ANCHOR = FREELANCE_NEAR_ANCHOR - FREELANCE_ROW_STAGGER;
const FREELANCE_COMPANY_TRACK_GAP = 15;
const FREELANCE_COMPANY_DY = 12;
const FREELANCE_TRACK_DY = 11;

function plotX(ratio: number) {
  return PLOT_LEFT + ratio * PLOT_W;
}
function plotY(years: number) {
  return PLOT_BOTTOM - (Math.min(years, SCALE_MAX) / SCALE_MAX) * PLOT_H;
}

// Reused as-is from CareerGraphView's freelance placement — a freelance
// entry's x is interpolated between whichever two main points its date
// falls between, then nudged apart from its neighbors so close dates never
// collapse onto the same point.
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
// dot) — combined with the near/far row stagger below, keeps adjacent
// labels from touching even when several dates cluster close together
// (2021's three freelance stints).
const MIN_FREELANCE_GAP = 0.11;

type Point = {
  id: string;
  company: string;
  period: string;
  trackLabel: string;
  years: number;
  isIntern: boolean;
  xRatio: number;
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
    return {
      id: `m-${company}`,
      company,
      period,
      trackLabel: entry?.domain || entry?.role || "",
      years,
      isIntern: /intern/i.test(entry?.role ?? ""),
      xRatio: i / (MAIN_ORDER.length - 1),
      index: i,
    };
  });

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
    const sorted = [...raw].sort((a, b) => a.xRatio - b.xRatio);
    for (let i = 1; i < sorted.length; i++) {
      sorted[i].xRatio = Math.max(sorted[i].xRatio, sorted[i - 1].xRatio + MIN_FREELANCE_GAP);
    }
    if (sorted.length > 0) {
      // Capped short of 1 (EXEM's own x) — a freelance marker landing in
      // that exact column would sit directly under EXEM's "above" label
      // regardless of row stagger, since stagger only adds vertical
      // separation, not horizontal.
      sorted[sorted.length - 1].xRatio = Math.min(0.94, sorted[sorted.length - 1].xRatio);
    }
    for (let i = sorted.length - 2; i >= 0; i--) {
      sorted[i].xRatio = Math.min(sorted[i].xRatio, sorted[i + 1].xRatio - MIN_FREELANCE_GAP);
    }
    return sorted;
  })();

  const linePath = points.map((p) => `${plotX(p.xRatio)},${plotY(p.years)}`).join(" ");

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
          <text
            x={Y_AXIS_W}
            y={PLOT_TOP - 14}
            textAnchor="end"
            className={styles.axisUnit}
          >
            Years
          </text>

          {freelancePoints.map((f, fi) => {
            const x = plotX(f.xRatio);
            const isShown = tooltipId === f.id;
            // Alternate rows so adjacent freelance labels don't share a
            // height band — except close to either main-line edge (x near
            // 0 or 1), where Hyundai's/EXEM's own "above" label already
            // reaches into this lane at that same column regardless of
            // row; those are forced to the far row, which starts higher
            // and clears it.
            const nearMainEdge = f.xRatio > 0.88 || f.xRatio < 0.12;
            const isFar = nearMainEdge || fi % 2 === 1;
            const anchor = isFar ? FREELANCE_FAR_ANCHOR : FREELANCE_NEAR_ANCHOR;
            const companyLines = wrapToWidth(f.company, FREELANCE_COMPANY_MAX_CHARS);
            const trackLines = f.trackLabel ? wrapToWidth(f.trackLabel, FREELANCE_TRACK_MAX_CHARS) : [];
            const trackAnchor = anchor - ((companyLines.length - 1) * FREELANCE_COMPANY_DY + FREELANCE_COMPANY_TRACK_GAP);
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
                <line
                  x1={x}
                  y1={FREELANCE_DOT_Y}
                  x2={x}
                  y2={FREELANCE_DOT_Y + FREELANCE_STEM_LEN}
                  className={styles.freelanceStem}
                />
                <circle cx={x} cy={FREELANCE_DOT_Y} r={3.5} className={styles.freelanceDot} />
                {/* Larger invisible hit-area — the visible dot/stem alone
                    is too small/thin a target for hover and tap. */}
                <circle cx={x} cy={FREELANCE_DOT_Y + 6} r={13} className={styles.hitArea} />
                <text x={x} y={anchor} textAnchor="middle" className={styles.freelanceCompany}>
                  {[...companyLines].reverse().map((line, li) => (
                    <tspan key={li} x={x} dy={li === 0 ? 0 : -FREELANCE_COMPANY_DY}>
                      {line}
                    </tspan>
                  ))}
                </text>
                {trackLines.length > 0 && (
                  <text x={x} y={trackAnchor} textAnchor="middle" className={styles.freelanceTrack}>
                    {[...trackLines].reverse().map((line, li) => (
                      <tspan key={li} x={x} dy={li === 0 ? 0 : -FREELANCE_TRACK_DY}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                )}
              </g>
            );
          })}

          <polyline points={linePath} className={styles.growthLine} />

          {points.map((p) => {
            const x = plotX(p.xRatio);
            const y = plotY(p.years);
            const labelAbove = p.index % 2 === 0;
            const companyLines = wrapToWidth(p.company, COMPANY_MAX_CHARS);
            const trackLines = p.trackLabel ? wrapToWidth(p.trackLabel, TRACK_MAX_CHARS) : [];
            const dir = labelAbove ? -1 : 1;
            const companyY = y + dir * (p.isIntern ? 22 : 24);
            const trackGapStart = companyY + dir * ((companyLines.length - 1) * 20 + (p.isIntern ? 16 : 20));
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
                  cx={x}
                  cy={y}
                  r={p.isIntern ? 5 : 7.5}
                  className={p.isIntern ? styles.pointIntern : styles.point}
                />
                <circle cx={x} cy={y} r={16} className={styles.hitArea} />
                <text
                  x={x}
                  y={companyY}
                  textAnchor="middle"
                  className={styles.companyLabel}
                >
                  {(labelAbove ? [...companyLines].reverse() : companyLines).map((line, li) => (
                    <tspan key={li} x={x} dy={li === 0 ? 0 : dir * 20}>
                      {line}
                    </tspan>
                  ))}
                </text>
                {trackLines.length > 0 && (
                  <text
                    x={x}
                    y={trackGapStart}
                    textAnchor="middle"
                    className={p.isIntern ? styles.trackLabelIntern : styles.trackLabel}
                  >
                    {(labelAbove ? [...trackLines].reverse() : trackLines).map((line, li) => (
                      <tspan key={li} x={x} dy={li === 0 ? 0 : dir * 15}>
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
              const x = tooltipIsMain
                ? plotX((tooltipTarget as Point).xRatio)
                : plotX((tooltipTarget as (typeof freelancePoints)[number]).xRatio);
              const pointY = tooltipIsMain
                ? plotY((tooltipTarget as Point).years)
                : FREELANCE_DOT_Y + FREELANCE_STEM_LEN;
              const mainPoint = tooltipIsMain ? (tooltipTarget as Point) : null;
              // Opposite side from the always-visible label, so the two
              // never compete for the same space.
              const below = mainPoint ? mainPoint.index % 2 === 0 : true;
              const period = toMonthPrecision(tooltipTarget.period);
              // Main points already show company + role/domain permanently
              // (see companyLabel/trackLabel above) — the only genuinely
              // new information a tooltip adds there is the date, so it
              // stays a compact one-liner. Neighboring points can sit close
              // together both on the X axis and, since this line rises,
              // sometimes close in Y too (e.g. Biginsight/EXEM) — a taller
              // multi-line box risks overlapping that neighbor's own
              // always-visible label, which a single short line avoids.
              // Freelance markers have no permanent label at all, so their
              // tooltip still needs the company name to identify them.
              const lines = mainPoint ? [period] : [tooltipTarget.company, period];
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
