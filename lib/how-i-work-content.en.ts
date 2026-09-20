// English counterpart to lib/how-i-work-content.ts — same structure, same
// facts, translated content.
export const flowStepsEn = [
  { num: "01", label: "Principle" },
  { num: "02", label: "Listen" },
  { num: "03", label: "Judge" },
  { num: "04", label: "Decide" },
  { num: "05", label: "Align" },
  { num: "06", label: "Deliver" },
];

export const approachIntroEn =
  "I structure complex problems and turn them into decisions that are actually executable within user, business, and technical constraints — then carry them through to real product and operational results.";

export type HowIWorkCase = {
  id: string;
  num: string;
  company: string;
  domain: string;
  problem: string;
  context: string[];
  action: string[];
  result: string[];
  ctaHref: string;
  ctaLabel: string;
};

export const casesEn: HowIWorkCase[] = [
  {
    id: "exem",
    num: "CASE 01",
    company: "EXEM",
    domain: "Enterprise Observability",
    problem:
      "Monitoring was scattered across separate products and screens — APM, DPM, Cloud — and had to be restructured into one Observability product while still meeting requirements that varied by customer.",
    context: [
      "Requirements that differed by customer",
      "Bidding-based delivery, so the schedule was effectively fixed",
      "Existing product structure and technical constraints",
      "Collaborated with an org of 8 planners and ~60 engineers",
    ],
    action: [
      "Re-sorted requests not by feature but by fit-to-purpose, schedule, repeatability, existing usability, and substitutability",
      "Designed APM, DPM, and Cloud into one unified information structure",
      "Decided the feasible MVP scope and its priorities",
      "Designed a Custom API integration structure not tied to any single vendor",
    ],
    result: [
      "Shipped the unified MVP within 6 months, later reaching v3.0 and GS certification",
      "Used through Enterprise PoC and contract processes, contributing to roughly ₩4B in business impact",
    ],
    ctaHref: "/projects/exem",
    ctaLabel: "View Case Study →",
  },
  {
    id: "flor-momento",
    num: "CASE 02",
    company: "Flor Momento",
    domain: "Subscription Platform / 0→1",
    problem:
      "Funeral flower and handcraft products had complex production, scheduling, and delivery after each order, making manual reservation and recurring delivery hard to operate.",
    context: [
      "A one-person / small-scale operation",
      "Standard e-commerce features were either excessive or a poor fit",
      "Ran solo from planning through launch and operations",
    ],
    action: [
      "Analyzed the actual operating flow and redefined it as reservation, schedule, delivery, and notification",
      "Turned repeated manual work into product features",
      "Kept only the core features a one-person operator actually needed",
      "Extended beyond B2C into a customizable module structure",
    ],
    result: [
      "Launched a 0→1 subscription delivery platform, selected for a government pre-startup package",
      "Expanded the revenue model from B2C operation into modularized B2B sales",
      "Eventually reached a business exit (sale)",
    ],
    ctaHref: "/projects/flor-momento",
    ctaLabel: "View Case Study →",
  },
  {
    id: "biginsight",
    num: "CASE 03",
    company: "Biginsight",
    domain: "CRM · CDP · Ads · Marketing SaaS",
    problem:
      "Event-based customer behavior data (CRM) and ad media data (Ads) lived in separate products, making it hard to see marketing performance as one flow.",
    context: [
      "CRM and Ads were run as two separate products",
      "Different data sources, different team structures",
      "Managed 3 products' planning as part lead",
    ],
    action: [
      "Analyzed the structure of CRM event data and Ads media data",
      "Defined the flow from impression → acquisition → click → behavior → performance",
      "Planned Bigin ONE to connect the CRM and Ads product structures",
      "Designed a full-funnel marketing dashboard",
    ],
    result: [
      "Expanded the product into an integrated CRM + Ads analytics structure (Bigin ONE)",
      "Connected multiple marketing touchpoints into one product flow",
    ],
    ctaHref: "/projects#other-projects",
    ctaLabel: "See more in Other Projects →",
  },
  {
    id: "cafe24",
    num: "CASE 04",
    company: "Cafe24",
    domain: "Server Infrastructure · Monitoring · Internal Platform",
    problem:
      "Operations were spread across Slack, JIRA, Wiki, Grafana, FireEye, and more, making it hard to check server status and operational information against one standard.",
    context: [
      "A large-scale server operating environment",
      "A CTO-direct organization",
      "A collaboration structure between Korea and Philippines development teams",
    ],
    action: [
      "Analyzed actual operating workflows and repeated tasks",
      "Surveyed existing tools including FireEye, Grafana, Datadog, and Slack",
      "Designed server monitoring dashboard UI/UX and load/autoscaling policy",
      "Ran the project as a roadmap-based collaboration between Korea and Philippines development teams",
    ],
    result: [
      "Planned an integrated monitoring and operations system for a large-scale server environment",
      "Established a direction for improving internal operational efficiency",
    ],
    ctaHref: "/projects#other-projects",
    ctaLabel: "See more in Other Projects →",
  },
];

export type OperatingModelStep = { step: string; description: string };

export const operatingModelEn: OperatingModelStep[] = [
  { step: "Listen", description: "Collect customer VOC, engineering, and sales input" },
  { step: "Judge", description: "Structure the problem, constraints, and impact" },
  { step: "Decide", description: "Decide scope, priority, and trade-offs" },
  { step: "Align", description: "Align with stakeholders" },
  { step: "Deliver", description: "Launch, operate, and improve the product" },
];

export const closingStatementEn =
  "These cases are a record of judgment proven by results. I'll keep working to the same standard — finding answers that are actually executable within constraints, and proving them the same way.";
