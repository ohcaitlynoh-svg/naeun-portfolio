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
// breathing gap), shared by the collision-box estimate in buildGraph and
// the actual render in renderSvg so the two can never drift apart. Both a
// visible step down from Main Career's own label tier (bigger, bolder,
// semibold company weight) — Freelance reads as secondary reference
// information stacked close to the line, not a peer of the main line's
// company/role hierarchy. Multiplied by geo.fontScale like every other
// label constant.
const FREELANCE_COMPANY_FONT = 10.5;
const FREELANCE_TRACK_FONT = 8.5;
const FREELANCE_COMPANY_LINE_H = 12;
const FREELANCE_TRACK_LINE_H = 10;
const FREELANCE_LABEL_GAP = 5;

// Main Career's own label layout — one single rule, used identically by
// all 7 points, no per-company exception and no collision detection.
// point -> (MAIN_LABEL_GAP) -> company name -> (MAIN_TRACK_GAP) ->
// role/domain. MAIN_COMPANY_LINE_H is the wrapped-company-line advance
// (Hyundai Home Shopping is the only name that wraps to 2 lines) — a
// typographic necessity, not a layout offset, so it doesn't vary either.
const MAIN_LABEL_GAP = 12;
const MAIN_COMPANY_LINE_H = 20;
const MAIN_TRACK_GAP = 3;
// Baseline-to-baseline advance from the company font's own line to the
// (smaller) role/domain line below it — typographic, not a layout offset.
const MAIN_TRACK_BASELINE_ADVANCE = 14;
// Per-line advance when role/domain text itself wraps to 2+ lines.
const MAIN_TRACK_LINE_H = 15;

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

// Freelance / Project's X is a fixed visual placement, not a real date
// axis — Home's Career Snapshot treats this row as secondary reference
// info ("how it reads"), not a chronology ("when it happened"); the exact
// date is still available in each marker's own tooltip. Each ratio was
// picked to sit in the empty space between two Main Career points,
// matching the requested reading rhythm (roughly: Sesun between Cafe24
// and Flor Momento; Asiance early in the Flor Momento-Biginsight gap;
// Eastend just right of Asiance; Aladin right of Eastend/left of
// Biginsight; Storelink between Biginsight and EXEM) — never computed
// from period dates.
const FREELANCE_X_RATIO: Record<string, number> = {
  "Sesun Electronics": 0.52,
  "Asiance Korea": 0.655,
  Eastend: 0.78,
  "Aladin Communication": 0.885,
  Storelink: 0.985,
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
  freelanceTierBase: number;
  freelanceTierStep: number;
};

// Desktop/wide-tablet. Freelance's tier zone (base/step) is deliberately
// tight — Freelance / Project reads as secondary reference info stacked
// close to the line, never a peer structure competing with Main Career's
// own rising line/points for vertical space. plotTop/plotH are sized to
// this compact freelance zone, not the old, much taller one.
const DESKTOP_GEOMETRY: Geometry = {
  viewW: 1100,
  yAxisW: 40,
  sideMargin: 50,
  plotTop: 120,
  plotH: 75,
  bottomMargin: 60,
  fontScale: 1,
  companyMaxChars: 15,
  trackMaxChars: 22,
  freelanceCompanyMaxChars: 16,
  freelanceTrackMaxChars: 18,
  // Base/step are sized only to clear the (now much smaller) freelance
  // label's real rendered height — see the collision algorithm above,
  // which checks real rendered rectangles rather than a fixed "close to
  // the previous point" rule. Uncapped (base + step*n) rather than a
  // fixed short list, so a longer run of clustered dates always has a
  // next tier to fall back to instead of silently reusing an
  // already-colliding one.
  freelanceTierBase: 14,
  freelanceTierStep: 18,
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
  sideMargin: 68,
  plotTop: 245,
  plotH: 100,
  bottomMargin: 75,
  fontScale: 1.3,
  companyMaxChars: 10,
  trackMaxChars: 10,
  freelanceCompanyMaxChars: 14,
  freelanceTrackMaxChars: 16,
  freelanceTierBase: 18,
  freelanceTierStep: 24,
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

  const raw = freelance.map((f) => ({
    id: `f-${f.company}`,
    company: f.company,
    period: f.period,
    trackLabel: f.domain ?? "",
    xRatio: FREELANCE_X_RATIO[f.company] ?? 0.5,
  }));
  // x is the fixed visual placement above (FREELANCE_X_RATIO) — never
  // computed from a real date. Only sorted here (for the label-tier pass
  // below), so two markers placed close together still get a
  // deterministic tier order.
  const sorted = [...raw].sort((a, b) => a.xRatio - b.xRatio);
  // Label collision avoidance: each point's label gets the LOWEST tier
  // (from geo.freelanceTiers) whose actual rendered rectangle — real
  // width from its wrapped text, real height from its own company+track
  // block — doesn't overlap any other point already placed, at ANY tier
  // (not just "the same tier" or "the immediately-previous point"). That
  // matters once more than two dates cluster together (2021's run of
  // three freelance stints): the 1st and 3rd of a cluster can still be too
  // close even though neither is adjacent to the other in sorted order,
  // and a tall multi-line label can reach up into a neighboring point's
  // tier even when the two aren't at the same tier. This is the "y-
  // offset/text-offset only" fix for label collision — the dot's x/y is
  // untouched either way.
  const companyFontPx = FREELANCE_COMPANY_FONT * geo.fontScale;
  const trackFontPx = FREELANCE_TRACK_FONT * geo.fontScale;
  const AVG_CHAR_WIDTH = 0.56; // empirical average glyph width, as a
  // fraction of font-size, for this bold/medium-weight label text
  const LABEL_PADDING = 10 * geo.fontScale;
  type Rect = { left: number; right: number; top: number; bottom: number };
  const shapes = sorted.map((f) => {
    const x = plotX(f.xRatio);
    const companyLines = wrapToWidth(f.company, geo.freelanceCompanyMaxChars);
    const trackLines = f.trackLabel ? wrapToWidth(f.trackLabel, geo.freelanceTrackMaxChars) : [];
    const companyMaxChars = Math.max(0, ...companyLines.map((l) => l.length));
    const trackMaxChars = Math.max(0, ...trackLines.map((l) => l.length));
    const halfWidth =
      Math.max(companyMaxChars * companyFontPx * AVG_CHAR_WIDTH, trackMaxChars * trackFontPx * AVG_CHAR_WIDTH) / 2 +
      LABEL_PADDING / 2;
    // Same block-height formula as the actual companyY/trackY placement
    // below — kept in sync so this estimate matches what's really drawn.
    const companyBlockH = companyLines.length * FREELANCE_COMPANY_LINE_H * geo.fontScale + FREELANCE_LABEL_GAP * geo.fontScale;
    const trackBlockH =
      trackLines.length > 0
        ? (trackLines.length - 1) * FREELANCE_TRACK_LINE_H * geo.fontScale + FREELANCE_TRACK_LINE_H * geo.fontScale
        : 0;
    return { x, companyBlockH, trackBlockH, halfWidth };
  });
  const rectFor = (i: number, offset: number): Rect => {
    const s = shapes[i];
    const y = lineYAt(sorted[i].xRatio);
    const companyY = y - offset;
    const top = companyY - s.companyBlockH - s.trackBlockH;
    return { left: s.x - s.halfWidth, right: s.x + s.halfWidth, top, bottom: companyY + 4 * geo.fontScale };
  };
  const rectsOverlap = (a: Rect, b: Rect) =>
    a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  const placedRects: Rect[] = [];
  const MAX_TIER_ATTEMPTS = 12; // generous — real data never needs more
  // than 3-4 before finding a clear spot; this just bounds the loop.
  const tiers = sorted.map((_, i) => {
    let chosen = geo.freelanceTierBase;
    for (let n = 0; n < MAX_TIER_ATTEMPTS; n++) {
      const candidate = geo.freelanceTierBase + n * geo.freelanceTierStep;
      const rect = rectFor(i, candidate);
      if (!placedRects.some((r) => rectsOverlap(rect, r))) {
        chosen = candidate;
        break;
      }
      chosen = candidate; // last-tried value, used if every attempt collides
    }
    placedRects.push(rectFor(i, chosen));
    return chosen;
  });
  const freelancePoints: FreelancePoint[] = sorted.map((f, fi) => ({
    ...f,
    x: plotX(f.xRatio),
    y: lineYAt(f.xRatio),
    labelOffset: tiers[fi],
  }));

  const linePath = points.map((p) => `${p.x},${p.y}`).join(" ");

  // Label geometry, precomputed once and shared by the marker layer (for
  // interaction hit-areas' aria-labels) and the text layer (see the
  // layered render below) — one single rule for all 7 points: point ->
  // MAIN_LABEL_GAP -> company -> MAIN_TRACK_GAP -> role/domain. No
  // per-company exception, no collision check, no tier. Equal X spacing
  // (see xRatio above) already keeps every point's label clear of its
  // neighbors, including the Hyundai/Yuratech pair that share the same
  // Y=0 baseline.
  const mainLabels: MainLabel[] = points.map((p) => {
    const companyLines = wrapToWidth(p.company, geo.companyMaxChars);
    const trackLines = p.trackLabel ? wrapToWidth(p.trackLabel, geo.trackMaxChars) : [];
    const companyY = p.y + MAIN_LABEL_GAP * geo.fontScale;
    const trackY =
      companyY +
      (companyLines.length - 1) * MAIN_COMPANY_LINE_H * geo.fontScale +
      (MAIN_TRACK_GAP + MAIN_TRACK_BASELINE_ADVANCE) * geo.fontScale;
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
    // A freelance date can fall genuinely days/weeks from a main role's own
    // start (e.g. Aladin Communication ending right before Biginsight
    // begins), so the dot itself can sit almost on top of a main point.
    // The visible dot/label positions are unaffected by this; it's only
    // the *invisible* hit-area shape below that's widened into a tall pill
    // running from the dot up to just past the label, so there's always a
    // generous, unambiguous hover/tap target near the label itself even
    // when the dot's immediate few pixels are shared with a neighboring
    // main point (which wins there — see the marker paint order below).
    const hitTop = Math.min(f.y, stemTopY) - 6 * geo.fontScale;
    const hitBottom = Math.max(f.y, stemTopY) + 6 * geo.fontScale;
    return { id: f.id, x: f.x, y: f.y, stemTopY, hitTop, hitBottom, companyLines, trackLines, companyY, trackY };
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
    const freelanceDotR = 2.5 * fs;
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

        {/* 3. Point markers — freelance first, main career last. A
            freelance date can fall genuinely days/weeks from a main role's
            own start (e.g. Aladin Communication ending right before
            Biginsight begins), so the two dots can sit almost on top of
            each other; painting main's hit-area last means a click/hover
            exactly on the (larger, primary) main dot always resolves to
            that main point, while freelance keeps a tall pill-shaped hit-
            area reaching from its own dot up toward its label (see
            hitTop/hitBottom below) — well clear of any main point's reach
            — so it stays a generous, unambiguous target of its own
            everywhere except the few shared pixels right at a main dot.
            Visible dot/label positions are unaffected either way. */}
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
                <tspan key={li} x={label.x} dy={li === 0 ? 0 : MAIN_COMPANY_LINE_H * fs}>
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
                  <tspan key={li} x={label.x} dy={li === 0 ? 0 : MAIN_TRACK_LINE_H * fs}>
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
              x={label.x}
              y={label.companyY}
              textAnchor="middle"
              className={styles.freelanceCompany}
              style={freelanceCompanyStyle}
            >
              {[...label.companyLines].reverse().map((line, li) => (
                <tspan key={li} x={label.x} dy={li === 0 ? 0 : -FREELANCE_COMPANY_LINE_H * fs}>
                  {line}
                </tspan>
              ))}
            </text>
            {label.trackLines.length > 0 && (
              <text
                x={label.x}
                y={label.trackY}
                textAnchor="middle"
                className={styles.freelanceTrack}
                style={freelanceTrackStyle}
              >
                {[...label.trackLines].reverse().map((line, li) => (
                  <tspan key={li} x={label.x} dy={li === 0 ? 0 : -FREELANCE_TRACK_LINE_H * fs}>
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

  // Legend + CTA share one compact row directly under the graph, instead
  // of the legend sitting under the graph and the CTA link in its own
  // separate area below that — no dedicated vertical zone for either.
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
