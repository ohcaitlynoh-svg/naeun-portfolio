"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/projects";
import styles from "./CareerTopology.module.css";

type CareerEntry = { company: string; period: string; role: string; domain: string };
type FreelanceEntry = { company: string; period: string; note?: string };

type NodeKind = "center" | "domain" | "selected" | "career" | "freelance";

type TopoNode = {
  id: string;
  label: string;
  kind: NodeKind;
  parentId?: string;
  angle?: number;
  ring?: number;
  period?: string;
  role?: string;
  summary?: string;
  slug?: string;
};

const DOMAINS = [
  { id: "d-ent", label: "Enterprise / Observability" },
  { id: "d-com", label: "Commerce / Subscription" },
  { id: "d-mkt", label: "MarTech / CRM / CDP / Ads" },
  { id: "d-gov", label: "e-Government / Global Solution" },
  { id: "d-erp", label: "ERP / Infrastructure" },
];

// Company name -> parent domain id. Grounded in each entry's existing
// `domain`/`role` field (see lib/about-content.ts) — not new claims, just
// grouping already-stated facts into the 5 requested categories.
const DOMAIN_OF: Record<string, string> = {
  EXEM: "d-ent",
  Biginsight: "d-mkt",
  "Flor Momento": "d-com",
  Cafe24: "d-com",
  ReadyKorea: "d-gov",
  Yuratech: "d-erp",
  "Hyundai Home Shopping": "d-com",
};

const RING_DOMAIN = 170;
const RING_FREELANCE = 108;
const RING_COMPANY = 270;
const CENTER = 400;
const NODE_R = { center: 27, domain: 11, selected: 9.5, career: 8, freelance: 5.5 };

function polar(r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: CENTER + r * Math.cos(rad), y: CENTER + r * Math.sin(rad) };
}

function fanAngles(baseAngle: number, count: number) {
  if (count <= 1) return [baseAngle];
  const spread = Math.min(70, 24 * (count - 1));
  return Array.from({ length: count }, (_, i) => baseAngle - spread / 2 + (spread * i) / (count - 1));
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

export default function CareerTopology({
  projects,
  career,
  freelance,
}: {
  projects: Project[];
  career: CareerEntry[];
  freelance: FreelanceEntry[];
}) {
  const router = useRouter();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const { nodes, edges } = useMemo(() => {
    const nodeList: TopoNode[] = [
      { id: "center", label: "Product Management", kind: "center" },
    ];

    // 10 evenly spaced slots around the center: domains on even indices,
    // freelance on odd indices, interleaved for visual rhythm.
    DOMAINS.forEach((d, i) => {
      nodeList.push({ id: d.id, label: d.label, kind: "domain", parentId: "center", angle: -90 + i * 2 * 36, ring: RING_DOMAIN });
    });
    freelance.forEach((f, i) => {
      nodeList.push({
        id: `f-${f.company}`,
        label: f.company,
        kind: "freelance",
        parentId: "center",
        angle: -90 + 36 + i * 2 * 36,
        ring: RING_FREELANCE,
        period: f.period,
        role: "Freelance / Project Experience",
        summary: f.note,
      });
    });

    const companiesByDomain = new Map<string, { company: string; kind: NodeKind; node: TopoNode }[]>();

    const pushCompany = (company: string, node: Omit<TopoNode, "id" | "parentId" | "angle" | "ring">) => {
      const domainId = DOMAIN_OF[company];
      if (!domainId) return;
      const list = companiesByDomain.get(domainId) ?? [];
      list.push({ company, kind: node.kind, node: { ...node, id: `c-${company}`, parentId: domainId } });
      companiesByDomain.set(domainId, list);
    };

    projects.forEach((p) => {
      pushCompany(p.name, {
        label: p.name,
        kind: "selected",
        period: p.heroPeriod,
        role: p.heroRole ?? p.role,
        summary: p.oneLiner,
        slug: p.slug,
      });
    });

    career.forEach((entry) => {
      if (DOMAIN_OF[entry.company] === undefined) return;
      if (projects.some((p) => p.name === entry.company)) return; // already added as "selected"
      pushCompany(entry.company, {
        label: entry.company,
        kind: "career",
        period: entry.period,
        role: entry.role || undefined,
        summary: entry.domain || undefined,
      });
    });

    DOMAINS.forEach((d) => {
      const kids = companiesByDomain.get(d.id) ?? [];
      const domainNode = nodeList.find((n) => n.id === d.id)!;
      const angles = fanAngles(domainNode.angle ?? 0, kids.length);
      kids.forEach((k, i) => {
        nodeList.push({ ...k.node, angle: angles[i], ring: RING_COMPANY });
      });
    });

    const edgeList: [string, string][] = [];
    DOMAINS.forEach((d) => edgeList.push(["center", d.id]));
    freelance.forEach((f) => edgeList.push(["center", `f-${f.company}`]));
    nodeList
      .filter((n) => n.kind === "selected" || n.kind === "career")
      .forEach((n) => n.parentId && edgeList.push([n.parentId, n.id]));

    return { nodes: nodeList, edges: edgeList };
  }, [projects, career, freelance]);

  const neighborMap = useMemo(() => {
    const map = new Map<string, Set<string>>();
    const add = (a: string, b: string) => {
      if (!map.has(a)) map.set(a, new Set());
      map.get(a)!.add(b);
    };
    edges.forEach(([a, b]) => {
      add(a, b);
      add(b, a);
    });
    return map;
  }, [edges]);

  const highlightSet = useMemo(() => {
    if (!hoveredId) return null;
    const set = new Set<string>([hoveredId, ...(neighborMap.get(hoveredId) ?? [])]);
    return set;
  }, [hoveredId, neighborMap]);

  const activeNode = nodes.find((n) => n.id === activeId) ?? null;

  const isDetailable = (n: TopoNode) =>
    n.kind === "selected" || n.kind === "career" || n.kind === "freelance";

  const handleActivate = (n: TopoNode) => {
    if (!isDetailable(n)) return;
    if (n.kind === "selected" && n.slug) {
      if (activeId === n.id) {
        router.push(`/projects/${n.slug}`);
        return;
      }
    }
    setActiveId(n.id);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.stage}>
        <svg viewBox="0 0 800 800" className={styles.svg} role="img" aria-label="Career topology map">
          <g className={styles.edges}>
            {edges.map(([a, b]) => {
              const na = nodes.find((n) => n.id === a);
              const nb = nodes.find((n) => n.id === b);
              if (!na || !nb) return null;
              const pa = na.id === "center" ? { x: CENTER, y: CENTER } : polar(na.ring ?? 0, na.angle ?? 0);
              const pb = nb.id === "center" ? { x: CENTER, y: CENTER } : polar(nb.ring ?? 0, nb.angle ?? 0);
              const dimmed = highlightSet ? !(highlightSet.has(a) && highlightSet.has(b)) : false;
              const isFreelanceEdge = na.kind === "freelance" || nb.kind === "freelance";
              return (
                <line
                  key={`${a}-${b}`}
                  x1={pa.x}
                  y1={pa.y}
                  x2={pb.x}
                  y2={pb.y}
                  className={`${styles.edge} ${isFreelanceEdge ? styles.edgeLight : ""} ${dimmed ? styles.edgeDim : ""}`}
                />
              );
            })}
          </g>

          <g>
            {nodes.map((n) => {
              const pos = n.id === "center" ? { x: CENTER, y: CENTER } : polar(n.ring ?? 0, n.angle ?? 0);
              const r = NODE_R[n.kind];
              const dimmed = highlightSet ? !highlightSet.has(n.id) : false;
              const selected = activeId === n.id;
              const interactive = isDetailable(n);
              const labelOffset =
                n.kind === "domain" ? 36 : n.kind === "freelance" ? 11 : 12;
              const labelPos =
                n.kind === "center"
                  ? { x: CENTER, y: CENTER + r + 18 }
                  : polar((n.ring ?? 0) + r + labelOffset, n.angle ?? 0);
              const anchor =
                n.kind === "center"
                  ? "middle"
                  : Math.cos(((n.angle ?? 0) * Math.PI) / 180) > 0.2
                  ? "start"
                  : Math.cos(((n.angle ?? 0) * Math.PI) / 180) < -0.2
                  ? "end"
                  : "middle";
              const labelLines = n.kind === "center" ? [n.label] : wrapLabel(n.label);

              return (
                <g
                  key={n.id}
                  className={`${styles.node} ${styles[`node-${n.kind}`]} ${
                    dimmed ? styles.nodeDim : ""
                  } ${selected ? styles.nodeSelected : ""} ${interactive ? styles.nodeInteractive : ""}`}
                  role={interactive ? "button" : undefined}
                  tabIndex={interactive ? 0 : -1}
                  aria-label={interactive ? [n.label, n.period].filter(Boolean).join(", ") : n.label}
                  onMouseEnter={() => {
                    setHoveredId(n.id);
                    if (interactive) setActiveId(n.id);
                  }}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => {
                    setHoveredId(n.id);
                    if (interactive) setActiveId(n.id);
                  }}
                  onBlur={() => setHoveredId(null)}
                  onClick={() => handleActivate(n)}
                  onKeyDown={(e) => {
                    if (interactive && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      handleActivate(n);
                    }
                  }}
                >
                  <circle cx={pos.x} cy={pos.y} r={r} className={styles.nodeCircle} />
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor={anchor}
                    className={`${styles.nodeLabel} ${styles[`nodeLabel-${n.kind}`]}`}
                  >
                    {labelLines.map((line, li) => (
                      <tspan key={li} x={labelPos.x} dy={li === 0 ? 0 : 16}>
                        {line}
                      </tspan>
                    ))}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <div className={styles.detailPanel}>
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
            {activeNode.kind === "selected" && activeNode.slug && (
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
    </div>
  );
}
