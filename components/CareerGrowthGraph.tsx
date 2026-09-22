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

// Main career labels sit below the line (uniform for every point — see
// mainLabels below), so PLOT_TOP only has to clear the plot itself plus
// freelance markers' flagpoles (they sit above the line at their own real
// x/y). Freelance experience isn't part of the Y scale, so its vertical
// reach is independent of SCALE_MAX.
const PLOT_TOP = 90;
const PLOT_H = 240; // "wide, low, gentle" — the drawing area itself, not
// counting the label margins added above/below it — unchanged, so the
// line's slope is exactly as before.
const PLOT_BOTTOM = PLOT_TOP + PLOT_H; // the Y=0 gridline / X-axis baseline
// Bottom margin holds every main label's below-the-line reach, including
// Hyundai/Yuratech's (both at Y=0, i.e. right at PLOT_BOTTOM) plus the
// extra drop a tight-Y neighbor can trigger (see mainLabels).
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

// Every main label uses the same point->company gap; a point whose Y sits
// within TIGHT_Y_THRESHOLD of the PREVIOUS point's (Hyundai/Yuratech both
// at Y=0; ReadyKorea/Cafe24 ~0.4 years apart) gets pushed down this much
// extra so the two labels don't collide — still below the line either way,
// just at different depths. This is the one departure from "identical gap
// for every point," and only fires on an actual close call.
const MAIN_LABEL_GAP = 24;
const MAIN_LABEL_EXTRA_DROP = 34;
const TIGHT_Y_THRESHOLD = 30;

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

  // Label geometry, precomputed once and shared by the marker layer (for
  // interaction hit-areas' aria-labels) and the text layer (see the
  // layered render below) — every main point uses the identical
  // point->company gap (MAIN_LABEL_GAP) unless it sits too close in Y to
  // the point right before it, in which case it drops an extra
  // MAIN_LABEL_EXTRA_DROP so the two labels don't collide. Both stay below
  // the line either way — this is the only "minimal offset" exception.
  const mainLabels = points.map((p, i) => {
    const prev = i > 0 ? points[i - 1] : null;
    const extraDrop = prev && Math.abs(p.y - prev.y) < TIGHT_Y_THRESHOLD ? MAIN_LABEL_EXTRA_DROP : 0;
    const companyLines = wrapToWidth(p.company, COMPANY_MAX_CHARS);
    const trackLines = p.trackLabel ? wrapToWidth(p.trackLabel, TRACK_MAX_CHARS) : [];
    const companyY = p.y + MAIN_LABEL_GAP + extraDrop;
    const trackY = companyY + (companyLines.length - 1) * 20 + (p.isIntern ? 16 : 20);
    return { id: p.id, x: p.x, isIntern: p.isIntern, companyLines, trackLines, companyY, trackY };
  });

  const freelanceLabels = freelancePoints.map((f) => {
    const offset = f.raised ? 78 : 48;
    const companyY = f.y - offset;
    const stemTopY = companyY + 6; // small gap between the dashed line's
    // end and the label's own bottom edge
    const companyLines = wrapToWidth(f.company, FREELANCE_COMPANY_MAX_CHARS);
    const trackLines = f.trackLabel ? wrapToWidth(f.trackLabel, FREELANCE_TRACK_MAX_CHARS) : [];
    const trackY = companyY - ((companyLines.length - 1) * 11 + 12);
    // A freelance date can fall genuinely days/weeks from a main role's own
    // start (e.g. Aladin Communication ending right before Biginsight
    // begins), so the dot itself can sit almost on top of a main point.
    // The visible dot/label positions are unaffected by this; it's only
    // the *invisible* hit-area shape below that's widened into a tall pill
    // running from the dot up to just past the label, so there's always a
    // generous, unambiguous hover/tap target near the label itself even
    // when the dot's immediate few pixels are shared with a neighboring
    // main point (which wins there — see the marker paint order below).
    const hitTop = Math.min(f.y, stemTopY) - 6;
    const hitBottom = Math.max(f.y, stemTopY) + 6;
    return { id: f.id, x: f.x, y: f.y, stemTopY, hitTop, hitBottom, companyLines, trackLines, companyY, trackY };
  });

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
      {/* Desktop/tablet: rising SVG line graph. Layer order (back to
          front) follows the requested reading priority — grid/axis,
          freelance connector, main line, point markers, tooltip, then
          every text label last — so a label is never visually crossed by
          the line, a point, or a connector, regardless of which point it
          belongs to. Markers keep the interaction handlers (hover/focus/
          click); labels are purely presentational text positioned from
          the same mainLabels/freelanceLabels data, so splitting them out
          doesn't change what's clickable. */}
      <div className={styles.desktopGraph}>
        <svg
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          className={styles.svg}
          role="img"
          aria-label="Career growth graph: cumulative years of experience across roles, past to present"
        >
          {/* 6. Grid / axis */}
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

          {/* 5. Freelance connector (dashed stem only — the dot itself is
              a marker, layer 3) */}
          {freelanceLabels.map((f) => (
            <line
              key={f.id}
              x1={f.x}
              y1={f.y}
              x2={f.x}
              y2={f.stemTopY}
              className={styles.freelanceStem}
            />
          ))}

          {/* 4. Main career line */}
          <polyline points={linePath} className={styles.growthLine} />

          {/* 3. Point markers — freelance first, main career last. A
              freelance date can fall genuinely days/weeks from a main
              role's own start (e.g. Aladin Communication ending right
              before Biginsight begins), so the two dots can sit almost on
              top of each other; painting main's hit-area last means a
              click/hover exactly on the (larger, primary) main dot always
              resolves to that main point, while freelance keeps a tall
              pill-shaped hit-area reaching from its own dot up toward its
              label (see hitTop/hitBottom below) — well clear of any main
              point's reach — so it stays a generous, unambiguous target of
              its own everywhere except the few shared pixels right at a
              main dot. Visible dot/label positions are unaffected either
              way. */}
          {freelancePoints.map((f) => {
            const label = freelanceLabels.find((l) => l.id === f.id)!;
            const isShown = tooltipId === f.id;
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
                <circle cx={f.x} cy={f.y} r={3.5} className={styles.freelanceDot} />
                <rect
                  x={f.x - 10}
                  y={label.hitTop}
                  width={20}
                  height={label.hitBottom - label.hitTop}
                  rx={10}
                  className={styles.hitArea}
                />
              </g>
            );
          })}

          {/* 3. Point markers — main career */}
          {points.map((p) => {
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
              </g>
            );
          })}

          {/* 2. Tooltip */}
          {tooltipTarget &&
            (() => {
              const mainPoint = tooltipIsMain ? (tooltipTarget as Point) : null;
              const freelancePoint = !mainPoint
                ? (tooltipTarget as (typeof freelancePoints)[number])
                : null;
              const x = mainPoint ? mainPoint.x : freelancePoint!.x;
              const pointY = mainPoint ? mainPoint.y : freelancePoint!.y;
              // Opposite side from the always-visible label: every main
              // label sits below its point now, so the tooltip goes
              // above; every freelance label sits above (flagpole), so
              // its tooltip goes below, toward the line. The two never
              // compete for the same space.
              const below = !mainPoint;
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

          {/* 1. Text labels — always on top, never crossed by the line,
              a point, a connector, or the grid. A subtle halo (stroke in
              the section's own background color — see .companyLabel etc.
              in the stylesheet) keeps glyph edges crisp on the rare
              occasion a label still sits very close to the line, without
              resorting to a solid card/background box. */}
          {mainLabels.map((label) => (
            <g key={label.id} pointerEvents="none">
              <text x={label.x} y={label.companyY} textAnchor="middle" className={styles.companyLabel}>
                {label.companyLines.map((line, li) => (
                  <tspan key={li} x={label.x} dy={li === 0 ? 0 : 20}>
                    {line}
                  </tspan>
                ))}
              </text>
              {label.trackLines.length > 0 && (
                <text
                  x={label.x}
                  y={label.trackY}
                  textAnchor="middle"
                  className={label.isIntern ? styles.trackLabelIntern : styles.trackLabel}
                >
                  {label.trackLines.map((line, li) => (
                    <tspan key={li} x={label.x} dy={li === 0 ? 0 : 15}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}
            </g>
          ))}

          {freelanceLabels.map((label) => (
            <g key={label.id} pointerEvents="none">
              <text x={label.x} y={label.companyY} textAnchor="middle" className={styles.freelanceCompany}>
                {[...label.companyLines].reverse().map((line, li) => (
                  <tspan key={li} x={label.x} dy={li === 0 ? 0 : -11}>
                    {line}
                  </tspan>
                ))}
              </text>
              {label.trackLines.length > 0 && (
                <text x={label.x} y={label.trackY} textAnchor="middle" className={styles.freelanceTrack}>
                  {[...label.trackLines].reverse().map((line, li) => (
                    <tspan key={li} x={label.x} dy={li === 0 ? 0 : -10}>
                      {line}
                    </tspan>
                  ))}
                </text>
              )}
            </g>
          ))}
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
