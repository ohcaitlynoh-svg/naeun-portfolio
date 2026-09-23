"use client";

import { useState, type ReactNode } from "react";
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

// Freelance / Project's own label typography (font sizes, line-heights,
// breathing gap), shared by label geometry and SVG rendering. A
// visible step down from Main Career's own label tier (bigger, bolder,
// semibold company weight) — Freelance reads as secondary reference
// information stacked close to the line, not a peer of the main line's
// company/role hierarchy. Multiplied by geo.fontScale like every other
// label constant.
const FREELANCE_COMPANY_FONT = 9;
const FREELANCE_TRACK_FONT = 7.5;
const FREELANCE_COMPANY_LINE_H = 12;
const FREELANCE_TRACK_LINE_H = 10;
const FREELANCE_LABEL_GAP = 5;

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

// Home-only editorial placement between main career anchors; dates remain
// unchanged for tooltips.
const FREELANCE_PLACEMENT: Record<string, [string, string, number]> = {
  "Sesun Electronics": ["Cafe24", "Flor Momento", 0.5],
  "Asiance Korea": ["Flor Momento", "Biginsight", 0.25],
  Eastend: ["Flor Momento", "Biginsight", 0.5],
  "Aladin Communication": ["Flor Momento", "Biginsight", 0.75],
  Storelink: ["Biginsight", "EXEM", 0.5],
};

// One geometry drives the whole layout — viewBox size, plot margins, wrap
// widths, label gaps/tiers, all scaled together — so a breakpoint's variant
// is a single consistent config, not a pile of independent overrides.
// `fontScale` multiplies every label's declared font-size *and* its own
// internal line-spacing/gap/tier constants together, so bigger text always
// keeps its original, uncollided proportions rather than just growing
// glyphs inside spacing tuned for the smaller size.
type Geometry = {
  viewW: number;
  yAxisW: number;
  sideMargin: number;
  plotTop: number;
  plotH: number;
  bottomMargin: number;
  fontScale: number;
  companyMaxChars: number;
  trackMaxChars: number;
  freelanceCompanyMaxChars: number;
  freelanceTrackMaxChars: number;
  mainLabelGap: number;
  freelanceTierBase: number;
};

// Desktop/wide-tablet. Freelance's label offset is deliberately
// tight — Freelance / Project reads as secondary reference info stacked
// close to the line, never a peer structure competing with Main Career's
// own rising line/points for vertical space. plotTop/plotH are sized to
// this compact freelance zone, not the old, much taller one.
const DESKTOP_GEOMETRY: Geometry = {
  viewW: 1100,
  yAxisW: 40,
  sideMargin: 85,
  plotTop: 115,
  plotH: 95,
  bottomMargin: 108,
  fontScale: 1,
  companyMaxChars: 15,
  trackMaxChars: 22,
  freelanceCompanyMaxChars: 16,
  freelanceTrackMaxChars: 18,
  mainLabelGap: 24,
  // All freelance labels share one compact offset above the line.
  freelanceTierBase: 10,
};

// 721–900px — the range between the mobile list breakpoint and desktop's
// own comfortable width. A plain scaled-down copy of the desktop SVG makes
// every label shrink along with the viewBox (the original bug report), so
// this is a distinct layout: a narrower viewBox (closer to the tablet
// container's real width, so the render's zoom ratio approaches 1:1) with
// bigger declared font sizes and proportionally bigger spacing/tiers, plus
// tighter wrap widths so each still-legible line fits the narrower
// columns instead of overflowing into its neighbor.
const TABLET_GEOMETRY: Geometry = {
  viewW: 860,
  yAxisW: 32,
  sideMargin: 56,
  plotTop: 265,
  plotH: 95,
  bottomMargin: 190,
  fontScale: 1.3,
  companyMaxChars: 10,
  trackMaxChars: 10,
  freelanceCompanyMaxChars: 14,
  freelanceTrackMaxChars: 16,
  mainLabelGap: 31,
  freelanceTierBase: 13,
};

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
};

type FreelancePoint = {
  id: string;
  company: string;
  period: string;
  trackLabel: string;
  xRatio: number;
  x: number;
  y: number;
  labelOffset: number;
};

type MainLabel = {
  id: string;
  x: number;
  isIntern: boolean;
  companyLines: string[];
  trackLines: string[];
  companyY: number;
  trackY: number;
};

type FreelanceLabel = {
  id: string;
  x: number;
  y: number;
  labelX: number;
  stemTopY: number;
  hitTop: number;
  hitBottom: number;
  companyLines: string[];
  trackLines: string[];
  companyY: number;
  trackY: number;
};

type GraphData = {
  plotLeft: number;
  plotRight: number;
  viewH: number;
  points: Point[];
  freelancePoints: FreelancePoint[];
  mainLabels: MainLabel[];
  freelanceLabels: FreelanceLabel[];
  linePath: string;
};

function buildGraph(geo: Geometry, career: CareerEntry[], freelance: FreelanceEntry[]): GraphData {
  const plotLeft = geo.yAxisW + geo.sideMargin;
  const plotRight = geo.viewW - geo.sideMargin;
  const plotW = plotRight - plotLeft;
  const plotBottom = geo.plotTop + geo.plotH;
  const viewH = plotBottom + geo.bottomMargin;

  const plotX = (ratio: number) => plotLeft + ratio * plotW;
  const plotY = (years: number) => plotBottom - (Math.min(years, SCALE_MAX) / SCALE_MAX) * geo.plotH;

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

  const freelancePoints: FreelancePoint[] = freelance.map((f) => {
    const [leftCompany, rightCompany, fraction] = FREELANCE_PLACEMENT[f.company];
    const left = points.find((p) => p.company === leftCompany)!;
    const right = points.find((p) => p.company === rightCompany)!;
    const xRatio = left.xRatio + (right.xRatio - left.xRatio) * fraction;
    return {
      id: `f-${f.company}`,
      company: f.company,
      period: f.period,
      trackLabel: f.domain ?? "",
      xRatio,
      x: plotX(xRatio),
      y: lineYAt(xRatio),
      labelOffset: geo.freelanceTierBase,
    };
  }).sort((a, b) => a.xRatio - b.xRatio);

  const linePath = points.map((p) => `${p.x},${p.y}`).join(" ");

  // Label geometry, precomputed once and shared by the marker layer (for
  // interaction hit-areas' aria-labels) and the text layer (see the
  // layered render below) — every main point uses the exact same
  // point->company gap (mainLabelGap), no per-company exception and no
  // collision check. Equal X spacing (see xRatio above) is what actually
  // keeps every label clear of its neighbors, including pairs that share
  // a Y (Hyundai/Yuratech's baseline, or any other close-years pair).
  const mainLabels: MainLabel[] = points.map((p) => {
    const companyLines = wrapToWidth(p.company, geo.companyMaxChars);
    const trackLines = p.trackLabel ? wrapToWidth(p.trackLabel, geo.trackMaxChars) : [];
    const companyY = p.y + geo.mainLabelGap;
    const trackY =
      companyY + (companyLines.length - 1) * 20 * geo.fontScale + (p.isIntern ? 16 : 20) * geo.fontScale;
    return { id: p.id, x: p.x, isIntern: p.isIntern, companyLines, trackLines, companyY, trackY };
  });

  const freelanceLabels: FreelanceLabel[] = freelancePoints.map((f) => {
    const companyY = f.y - f.labelOffset;
    const stemTopY = companyY + FREELANCE_LABEL_GAP * geo.fontScale; // small gap between
    // the dashed line's end and the label's own bottom edge
    const companyLines = wrapToWidth(f.company, geo.freelanceCompanyMaxChars);
    const trackLines = f.trackLabel ? wrapToWidth(f.trackLabel, geo.freelanceTrackMaxChars) : [];
    // Full company block height (not just "one extra line's worth") plus a
    // fixed breathing gap — company wrapping to 2+ lines is common once
    // freelanceCompanyMaxChars is narrow (the tablet geometry), so the old
    // "(lines-1) * small-increment" shorthand under-counted a multi-line
    // company block's real height and let it touch the track line above.
    const trackY = companyY - (companyLines.length * FREELANCE_COMPANY_LINE_H * geo.fontScale + FREELANCE_LABEL_GAP * geo.fontScale);
    // Keep a generous hover/tap target between each dot and its label.
    const hitTop = Math.min(f.y, stemTopY) - 6 * geo.fontScale;
    const hitBottom = Math.max(f.y, stemTopY) + 6 * geo.fontScale;
    const labelX = f.x + (f.company === "Asiance Korea" ? -24 : f.company === "Aladin Communication" ? 24 : 0) * geo.fontScale;
    return { id: f.id, x: f.x, labelX, y: f.y, stemTopY, hitTop, hitBottom, companyLines, trackLines, companyY, trackY };
  });

  return { plotLeft, plotRight, viewH, points, freelancePoints, mainLabels, freelanceLabels, linePath };
}

export default function CareerGrowthGraph({
  career,
  freelance,
  cta,
}: {
  career: CareerEntry[];
  freelance: FreelanceEntry[];
  cta: ReactNode;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const tooltipId = hoveredId ?? activeId;

  const activate = (id: string) => {
    setActiveId((cur) => (cur === id ? null : id));
  };

  const desktopData = buildGraph(DESKTOP_GEOMETRY, career, freelance);
  const tabletData = buildGraph(TABLET_GEOMETRY, career, freelance);

  // Desktop/tablet: rising SVG line graph. Layer order (back to front)
  // follows the requested reading priority — grid/axis, freelance
  // connector, main line, point markers, tooltip, then every text label
  // last — so a label is never visually crossed by the line, a point, or a
  // connector, regardless of which point it belongs to. Markers keep the
  // interaction handlers (hover/focus/click); labels are purely
  // presentational text positioned from the same mainLabels/
  // freelanceLabels data, so splitting them out doesn't change what's
  // clickable.
  function renderSvg(geo: Geometry, data: GraphData) {
    const { plotLeft, plotRight, viewH, points, freelancePoints, mainLabels, freelanceLabels, linePath } = data;
    const plotY = (years: number) =>
      geo.plotTop + geo.plotH - (Math.min(years, SCALE_MAX) / SCALE_MAX) * geo.plotH;
    const fs = geo.fontScale;
    const companyStyle = { fontSize: 20 * fs, strokeWidth: 3 * fs };
    const trackStyle = { fontSize: 14 * fs, strokeWidth: 3 * fs };
    const trackInternStyle = { fontSize: 12 * fs, strokeWidth: 2.5 * fs };
    const freelanceCompanyStyle = { fontSize: FREELANCE_COMPANY_FONT * fs, strokeWidth: 2 * fs };
    const freelanceTrackStyle = { fontSize: FREELANCE_TRACK_FONT * fs, strokeWidth: 2 * fs };
    const axisTickStyle = { fontSize: 12 * fs };
    const axisUnitStyle = { fontSize: 11 * fs };
    const mainDotR = { normal: 7.5 * fs, intern: 5 * fs, hit: 16 * fs };
    const freelanceDotR = 2 * fs;
    const freelanceHitHalfW = 10 * fs;

    return (
      <svg
        viewBox={`0 0 ${geo.viewW} ${viewH}`}
        className={styles.svg}
        role="img"
        aria-label="Career growth graph: cumulative years of experience across roles, past to present"
      >
        {/* 6. Grid / axis */}
        {AXIS_TICKS.map((tick) => {
          const y = plotY(tick);
          return (
            <g key={tick}>
              <line x1={plotLeft} y1={y} x2={plotRight} y2={y} className={styles.gridLine} />
              <text x={geo.yAxisW} y={y + 4} textAnchor="end" className={styles.axisTick} style={axisTickStyle}>
                {tick}
              </text>
            </g>
          );
        })}
        <text
          x={geo.yAxisW}
          y={geo.plotTop - 14 * fs}
          textAnchor="end"
          className={styles.axisUnit}
          style={axisUnitStyle}
        >
          Years
        </text>

        {/* 5. Freelance connector (dashed stem only — the dot itself is a
            marker, layer 3) */}
        {freelanceLabels.map((f) => (
          <line key={f.id} x1={f.x} y1={f.y} x2={f.x} y2={f.stemTopY} className={styles.freelanceStem} />
        ))}

        {/* 4. Main career line */}
        <polyline points={linePath} className={styles.growthLine} />

        {/* 3. Point markers — freelance first, main career last. */}
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
              <circle cx={f.x} cy={f.y} r={freelanceDotR} className={styles.freelanceDot} />
              <rect
                x={f.x - freelanceHitHalfW}
                y={label.hitTop}
                width={freelanceHitHalfW * 2}
                height={label.hitBottom - label.hitTop}
                rx={freelanceHitHalfW}
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
                r={p.isIntern ? mainDotR.intern : mainDotR.normal}
                className={p.isIntern ? styles.pointIntern : styles.point}
              />
              <circle cx={p.x} cy={p.y} r={mainDotR.hit} className={styles.hitArea} />
            </g>
          );
        })}

        {/* 2. Tooltip */}
        {(() => {
          const mainPoint = points.find((p) => p.id === tooltipId) ?? null;
          const freelancePoint = !mainPoint ? freelancePoints.find((f) => f.id === tooltipId) ?? null : null;
          if (!mainPoint && !freelancePoint) return null;
          const x = mainPoint ? mainPoint.x : freelancePoint!.x;
          const pointY = mainPoint ? mainPoint.y : freelancePoint!.y;
          // Opposite side from the always-visible label: every main label
          // sits below its point now, so the tooltip goes above; every
          // freelance label sits above (flagpole), so its tooltip goes
          // below, toward the line. The two never compete for the same
          // space.
          const below = !mainPoint;
          const period = toMonthPrecision((mainPoint ?? freelancePoint!).period);
          // Main points already show company + role/domain permanently —
          // the only genuinely new information a tooltip adds there is the
          // date, so it stays a compact one-liner. Freelance markers have
          // no permanent date shown either, but do show company/domain
          // already, so likewise just the date; company is still included
          // so the tooltip is self-contained.
          const lines = mainPoint ? [period] : [freelancePoint!.company, period];
          const boxW = (mainPoint ? 108 : 150) * fs;
          const lineH = 15 * fs;
          const boxH = lines.length * lineH + 10 * fs;
          const boxX = Math.min(Math.max(x - boxW / 2, plotLeft - 10), plotRight - boxW + 10);
          const boxY = below ? pointY + 12 * fs : pointY - 12 * fs - boxH;
          return (
            <g className={styles.tooltip} pointerEvents="none">
              <rect x={boxX} y={boxY} width={boxW} height={boxH} rx={4} className={styles.tooltipBox} />
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={boxX + boxW / 2}
                  y={boxY + 15 * fs + li * lineH}
                  textAnchor="middle"
                  className={!mainPoint && li === 0 ? styles.tooltipTitle : styles.tooltipLine}
                  style={{ fontSize: (!mainPoint && li === 0 ? 13 : 12) * fs }}
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })()}

        {/* 1. Text labels — always on top, never crossed by the line, a
            point, a connector, or the grid. A subtle halo (stroke in the
            section's own background color — see .companyLabel etc. in the
            stylesheet) keeps glyph edges crisp on the rare occasion a
            label still sits very close to the line, without resorting to a
            solid card/background box. */}
        {mainLabels.map((label) => (
          <g key={label.id} pointerEvents="none">
            <text
              x={label.x}
              y={label.companyY}
              textAnchor="middle"
              className={styles.companyLabel}
              style={companyStyle}
            >
              {label.companyLines.map((line, li) => (
                <tspan key={li} x={label.x} dy={li === 0 ? 0 : 20 * fs}>
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
                style={label.isIntern ? trackInternStyle : trackStyle}
              >
                {label.trackLines.map((line, li) => (
                  <tspan key={li} x={label.x} dy={li === 0 ? 0 : 15 * fs}>
                    {line}
                  </tspan>
                ))}
              </text>
            )}
          </g>
        ))}

        {freelanceLabels.map((label) => (
          <g key={label.id} pointerEvents="none">
            <text
              x={label.labelX}
              y={label.companyY}
              textAnchor="middle"
              className={styles.freelanceCompany}
              style={freelanceCompanyStyle}
            >
              {[...label.companyLines].reverse().map((line, li) => (
                <tspan key={li} x={label.labelX} dy={li === 0 ? 0 : -FREELANCE_COMPANY_LINE_H * fs}>
                  {line}
                </tspan>
              ))}
            </text>
            {label.trackLines.length > 0 && (
              <text
                x={label.labelX}
                y={label.trackY}
                textAnchor="middle"
                className={styles.freelanceTrack}
                style={freelanceTrackStyle}
              >
                {[...label.trackLines].reverse().map((line, li) => (
                  <tspan key={li} x={label.labelX} dy={li === 0 ? 0 : -FREELANCE_TRACK_LINE_H * fs}>
                    {line}
                  </tspan>
                ))}
              </text>
            )}
          </g>
        ))}
      </svg>
    );
  }

  const legend = (
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
  );

  // Legend + CTA share one compact row directly under the graph — no
  // separate vertical zone for either.
  const bottomRow = (
    <div className={styles.bottomRow}>
      {legend}
      <span className={styles.bottomCta}>{cta}</span>
    </div>
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.desktopGraph}>
        {renderSvg(DESKTOP_GEOMETRY, desktopData)}
        {bottomRow}
      </div>

      {/* 721–900px: a distinct, more spacious layout (see TABLET_GEOMETRY)
          — not the desktop SVG scaled down — so company/role/domain text
          and freelance labels stay a normal reading size instead of
          shrinking along with the viewBox. */}
      <div className={styles.tabletGraph}>
        {renderSvg(TABLET_GEOMETRY, tabletData)}
        {bottomRow}
      </div>

      {/* Mobile: vertical list — desktop graph doesn't read well cramped
          into ~360px of usable width, so it's replaced (not shrunk) below
          the sizeLarge breakpoint. Company + role/domain stay always
          visible; period reveals on tap, matching desktop's hover/focus
          reveal. */}
      <ol className={styles.mobileList}>
        {desktopData.points.map((p) => {
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

        {desktopData.freelancePoints.length > 0 && (
          <li className={styles.mobileFreelanceGroup}>
            <p className={styles.mobileFreelanceHeading}>Freelance / Project Experience</p>
            <ul className={styles.mobileFreelanceList}>
              {desktopData.freelancePoints.map((f) => {
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
                        {f.trackLabel && <span className={styles.mobileFreelanceTrack}>{f.trackLabel}</span>}
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
      <p className={styles.mobileCta}>{cta}</p>
    </div>
  );
}
