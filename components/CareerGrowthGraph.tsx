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
  mainLabelTierStep: number;
  freelanceTierBase: number;
  freelanceTierStep: number;
};

// Desktop/wide-tablet — the original layout, unchanged.
const DESKTOP_GEOMETRY: Geometry = {
  viewW: 1100,
  yAxisW: 40,
  sideMargin: 85,
  plotTop: 200,
  plotH: 240,
  bottomMargin: 108,
  fontScale: 1,
  companyMaxChars: 15,
  trackMaxChars: 22,
  freelanceCompanyMaxChars: 16,
  freelanceTrackMaxChars: 18,
  mainLabelGap: 24,
  // Every main label starts at mainLabelGap; this is only added on top for
  // whichever point(s) a real bounding-box collision check (see below)
  // finds still overlapping an already-placed label — most of the time
  // it's never used at all.
  mainLabelTierStep: 34,
  // Step (~70) is sized to clear a full 2-line-company + 2-line-track
  // label's real height, not just the previous tuning's smaller gap — see
  // the collision algorithm above, which now checks real rendered
  // rectangles rather than a fixed "close to the previous point" rule.
  // Uncapped (base + step*n) rather than a fixed short list, so a longer
  // run of clustered dates always has a next tier to fall back to instead
  // of silently reusing an already-colliding one.
  freelanceTierBase: 48,
  freelanceTierStep: 70,
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
  plotTop: 280,
  plotH: 230,
  bottomMargin: 190,
  fontScale: 1.3,
  companyMaxChars: 10,
  trackMaxChars: 10,
  freelanceCompanyMaxChars: 14,
  freelanceTrackMaxChars: 16,
  mainLabelGap: 31,
  mainLabelTierStep: 44,
  freelanceTierBase: 60,
  freelanceTierStep: 90,
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
  index: number;
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

  const plotX = (ratio: number) => plotLeft + ratio * plotW;
  const plotY = (years: number) => plotBottom - (Math.min(years, SCALE_MAX) / SCALE_MAX) * geo.plotH;

  const mainData = MAIN_ORDER.map((company) => career.find((c) => c.company === company));
  const firstEntry = mainData[0];
  const [firstStart] = firstEntry ? splitPeriod(firstEntry.period) : [new Date()];
  const lastEntry = mainData[mainData.length - 1];
  const [lastMainStart] = lastEntry ? splitPeriod(lastEntry.period) : [firstStart];
  // The one shared date -> x function, used for every main AND freelance
  // point — a real, continuous calendar axis (gaps included) rather than
  // main's previous fixed, evenly-spaced columns. Anchored so the last
  // main point (EXEM) always lands exactly at ratio 1 (the right edge),
  // matching where the old index-based layout put it.
  const totalSpanYears = yearsBetween(firstStart, lastMainStart) || 1;
  const dateToXRatio = (date: Date) => yearsBetween(firstStart, date) / totalSpanYears;

  const points: Point[] = MAIN_ORDER.map((company, i) => {
    const entry = mainData[i];
    const period = entry?.period ?? "";
    const [start, end] = entry ? splitPeriod(entry.period) : [firstStart, firstStart];
    const years = BASELINE_COMPANIES.has(company) ? 0 : yearsBetween(firstStart, end);
    // Each main point's x uses its own start date — the same date basis
    // the freelance interpolation already anchored to before this change,
    // now used directly instead of just as an interpolation anchor.
    const xRatio = dateToXRatio(start);
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

  // Freelance x uses the exact same dateToXRatio as main points — a
  // freelance stint's own start date, on the same shared timeline. Never
  // nudged apart or capped for layout reasons; only sorted (for the
  // label-tier pass below). The dot always lands exactly where its real
  // date places it, including landing close to — or even level with — a
  // neighboring point when that's what actually happened.
  const raw = freelance.map((f) => {
    const [start] = splitPeriod(f.period);
    return {
      id: `f-${f.company}`,
      company: f.company,
      period: f.period,
      trackLabel: f.domain ?? "",
      xRatio: dateToXRatio(start),
    };
  });
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
  const companyFontPx = 13 * geo.fontScale;
  const trackFontPx = 10.5 * geo.fontScale;
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
    const companyBlockH = companyLines.length * 15 * geo.fontScale + 6 * geo.fontScale;
    const trackBlockH = trackLines.length > 0 ? (trackLines.length - 1) * 12 * geo.fontScale + 12 * geo.fontScale : 0;
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
  // layered render below). Every main point starts from the exact same
  // point->company gap (mainLabelGap) — no per-company exception. Real
  // dates can still put two points' labels close enough to collide (e.g.
  // Hyundai/Yuratech, only 9 months apart), so each point's actual
  // rendered rectangle is checked against every already-placed label and
  // only steps to the next shared tier (mainLabelGap + n*mainLabelTierStep)
  // when a genuine overlap is found — the same real-rectangle approach
  // already used for freelance labels below, generalized so it isn't tied
  // to any specific company. Between two colliding points, the one that
  // gets bumped is decided by a generic rule (intern roles defer to
  // regular ones), not a company-name check.
  const mainCompanyFontPx = 20 * geo.fontScale;
  const MAIN_LABEL_AVG_CHAR_WIDTH = 0.56;
  const mainShapes = points.map((p) => {
    const companyLines = wrapToWidth(p.company, geo.companyMaxChars);
    const trackLines = p.trackLabel ? wrapToWidth(p.trackLabel, geo.trackMaxChars) : [];
    const trackFontPxLocal = (p.isIntern ? 12 : 14) * geo.fontScale;
    const companyMaxChars = Math.max(0, ...companyLines.map((l) => l.length));
    const trackMaxChars = Math.max(0, ...trackLines.map((l) => l.length));
    const halfWidth =
      (Math.max(companyMaxChars * mainCompanyFontPx, trackMaxChars * trackFontPxLocal) *
        MAIN_LABEL_AVG_CHAR_WIDTH) /
        2 +
      6 * geo.fontScale;
    return { companyLines, trackLines, trackFontPxLocal, halfWidth };
  });
  type MainRect = { left: number; right: number; top: number; bottom: number };
  const rectForMain = (i: number, offset: number): MainRect => {
    const p = points[i];
    const s = mainShapes[i];
    const companyY = p.y + offset;
    const trackY = companyY + (s.companyLines.length - 1) * 20 * geo.fontScale + (p.isIntern ? 16 : 20) * geo.fontScale;
    const top = companyY - mainCompanyFontPx * 0.85;
    const bottom =
      s.trackLines.length > 0
        ? trackY + (s.trackLines.length - 1) * 15 * geo.fontScale + s.trackFontPxLocal * 0.4
        : companyY + (s.companyLines.length - 1) * 20 * geo.fontScale + mainCompanyFontPx * 0.4;
    return { left: p.x - s.halfWidth, right: p.x + s.halfWidth, top, bottom };
  };
  const mainRectsOverlap = (a: MainRect, b: MainRect) =>
    a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  // Non-intern points claim their base tier first; an intern role (only
  // Hyundai today, but not hardcoded to it) is placed last and yields to
  // whichever tier is actually free once real careers have already been
  // placed. Ties otherwise keep chronological order.
  const placementOrder = points
    .map((_, i) => i)
    .sort((a, b) => {
      const pa = points[a].isIntern ? 1 : 0;
      const pb = points[b].isIntern ? 1 : 0;
      return pa !== pb ? pa - pb : a - b;
    });
  const MAX_MAIN_TIER_ATTEMPTS = 8;
  const mainOffsets = new Array<number>(points.length);
  const placedMainRects: MainRect[] = [];
  for (const i of placementOrder) {
    let chosen = geo.mainLabelGap;
    for (let n = 0; n < MAX_MAIN_TIER_ATTEMPTS; n++) {
      const candidate = geo.mainLabelGap + n * geo.mainLabelTierStep;
      const rect = rectForMain(i, candidate);
      if (!placedMainRects.some((r) => mainRectsOverlap(rect, r))) {
        chosen = candidate;
        break;
      }
      chosen = candidate;
    }
    mainOffsets[i] = chosen;
    placedMainRects.push(rectForMain(i, chosen));
  }

  const mainLabels: MainLabel[] = points.map((p, i) => {
    const { companyLines, trackLines } = mainShapes[i];
    const companyY = p.y + mainOffsets[i];
    const trackY =
      companyY + (companyLines.length - 1) * 20 * geo.fontScale + (p.isIntern ? 16 : 20) * geo.fontScale;
    return { id: p.id, x: p.x, isIntern: p.isIntern, companyLines, trackLines, companyY, trackY };
  });

  const freelanceLabels: FreelanceLabel[] = freelancePoints.map((f) => {
    const companyY = f.y - f.labelOffset;
    const stemTopY = companyY + 6 * geo.fontScale; // small gap between the
    // dashed line's end and the label's own bottom edge
    const companyLines = wrapToWidth(f.company, geo.freelanceCompanyMaxChars);
    const trackLines = f.trackLabel ? wrapToWidth(f.trackLabel, geo.freelanceTrackMaxChars) : [];
    // Full company block height (not just "one extra line's worth") plus a
    // fixed breathing gap — company wrapping to 2+ lines is common once
    // freelanceCompanyMaxChars is narrow (the tablet geometry), so the old
    // "(lines-1) * small-increment" shorthand under-counted a multi-line
    // company block's real height and let it touch the track line above.
    const trackY = companyY - (companyLines.length * 15 * geo.fontScale + 6 * geo.fontScale);
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

  // The bottom margin has to clear whichever main label reaches furthest
  // down — normally that's just the base mainLabelGap reach, but a
  // collision-escalated point (see mainOffsets above) can sit well past
  // that. Computed from each label's own real line count/offset instead
  // of a fixed constant, so it can't fall out of sync with the actual
  // collision outcome for whatever career data is in play.
  const maxLabelBottom = Math.max(
    plotBottom + geo.bottomMargin,
    ...mainLabels.map((l) => {
      const trackFontPxLocal = (l.isIntern ? 12 : 14) * geo.fontScale;
      return l.trackLines.length > 0
        ? l.trackY + (l.trackLines.length - 1) * 15 * geo.fontScale + trackFontPxLocal
        : l.companyY + (l.companyLines.length - 1) * 20 * geo.fontScale + mainCompanyFontPx * 0.3;
    })
  );
  const viewH = maxLabelBottom + 24 * geo.fontScale;

  return { plotLeft, plotRight, viewH, points, freelancePoints, mainLabels, freelanceLabels, linePath };
}

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
    const freelanceCompanyStyle = { fontSize: 13 * fs, strokeWidth: 2.5 * fs };
    const freelanceTrackStyle = { fontSize: 10.5 * fs, strokeWidth: 2.5 * fs };
    const axisTickStyle = { fontSize: 12 * fs };
    const axisUnitStyle = { fontSize: 11 * fs };
    const mainDotR = { normal: 7.5 * fs, intern: 5 * fs, hit: 16 * fs };
    const freelanceDotR = 3.5 * fs;
    const freelanceHitHalfW = 10 * fs;

    // The rising line is knocked out (real gap, not a painted box) behind
    // every main label's own bounding box, so it never visually passes
    // through a company/role-domain text area — text z-order alone wasn't
    // enough, since the line could still run through the whitespace next
    // to/between glyphs even when painted behind the text itself. Applied
    // to every label generically (not just the reported ReadyKorea/Flor
    // Momento/Biginsight) since it's a no-op wherever the line wasn't
    // passing through anyway. Point positions and the line's own path are
    // untouched — this only changes what's visibly painted.
    const MAIN_LABEL_AVG_CHAR_WIDTH = 0.56;
    const maskId = `line-knockout-${geo.viewW}`;
    const lineMaskRects = mainLabels.map((label) => {
      const companyFontPxLocal = 20 * fs;
      const trackFontPxLocal = (label.isIntern ? 12 : 14) * fs;
      const companyMaxChars = Math.max(0, ...label.companyLines.map((l) => l.length));
      const trackMaxChars = Math.max(0, ...label.trackLines.map((l) => l.length));
      const halfWidth =
        (Math.max(companyMaxChars * companyFontPxLocal, trackMaxChars * trackFontPxLocal) *
          MAIN_LABEL_AVG_CHAR_WIDTH) /
          2 +
        6 * fs;
      const top = label.companyY - companyFontPxLocal * 0.85;
      const bottom =
        label.trackLines.length > 0
          ? label.trackY + (label.trackLines.length - 1) * 15 * fs + trackFontPxLocal * 0.4
          : label.companyY + (label.companyLines.length - 1) * 20 * fs + companyFontPxLocal * 0.4;
      return { id: label.id, x: label.x, top, bottom, halfWidth };
    });

    return (
      <svg
        viewBox={`0 0 ${geo.viewW} ${viewH}`}
        className={styles.svg}
        role="img"
        aria-label="Career growth graph: cumulative years of experience across roles, past to present"
      >
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x={0} y={0} width={geo.viewW} height={viewH}>
            <rect x={0} y={0} width={geo.viewW} height={viewH} fill="white" />
            {lineMaskRects.map((r) => (
              <rect
                key={r.id}
                x={r.x - r.halfWidth}
                y={r.top}
                width={r.halfWidth * 2}
                height={r.bottom - r.top}
                rx={4}
                fill="black"
              />
            ))}
          </mask>
        </defs>

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
        <polyline points={linePath} className={styles.growthLine} mask={`url(#${maskId})`} />

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
              x={label.x}
              y={label.companyY}
              textAnchor="middle"
              className={styles.freelanceCompany}
              style={freelanceCompanyStyle}
            >
              {[...label.companyLines].reverse().map((line, li) => (
                <tspan key={li} x={label.x} dy={li === 0 ? 0 : -15 * fs}>
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
                  <tspan key={li} x={label.x} dy={li === 0 ? 0 : -12 * fs}>
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

  return (
    <div className={styles.wrap}>
      <div className={styles.desktopGraph}>
        {renderSvg(DESKTOP_GEOMETRY, desktopData)}
        {legend}
      </div>

      {/* 721–900px: a distinct, more spacious layout (see TABLET_GEOMETRY)
          — not the desktop SVG scaled down — so company/role/domain text
          and freelance labels stay a normal reading size instead of
          shrinking along with the viewBox. */}
      <div className={styles.tabletGraph}>
        {renderSvg(TABLET_GEOMETRY, tabletData)}
        {legend}
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
    </div>
  );
}
