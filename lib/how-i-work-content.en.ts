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

export const approachDescriptionEn =
  "Starting by listening to customer VOC alongside internal development, sales, and engineering input, I structure the problem and its constraints and judge the feasible scope and priority. I align that result with the team and carry it through to a real product and operational outcome.";

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
      "Had to restructure a fragmented APM / DPM / Kubernetes / Cloud monitoring landscape — distributed worldwide, not just in Korea — into one Enterprise Observability product while still meeting varied customer requirements.",
    context: [
      "A large, continuously accumulating volume of VOC + sales / technical support requirements",
      "Enterprise environment",
      "Existing product structure and technical constraints",
      "Collaborated across multiple development orgs",
    ],
    action: [
      "Structured the large volume of VOC and requirements by recurrence, product fit, schedule, and technical feasibility",
      "Defined a common user flow and the core monitoring scenarios",
      "Decided the feasible MVP scope and its priorities",
      "Completed an actual product-level plan before development started, and used it as the development standard",
      "Designed APM / DPM / Kubernetes / Cloud into one unified experience",
    ],
    result: [
      "6-month MVP",
      "GS certification obtained across 4 programs — APM / DPM / Kubernetes / Cloud",
      "Applied to Enterprise projects at LG Electronics, Samsung Electronics, KFTC, and the Korean National Police Agency",
      "Roughly ₩4B in revenue on the major projects",
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
      "The recurring work behind subscription delivery was run manually, so schedule-management complexity grew as the customer base grew.",
    context: ["A one-person / small-scale operation", "Ran solo from planning through launch and operations"],
    action: [
      "Analyzed the actual operating flow",
      "Structured booking / schedule / production / delivery / after-service status",
      "Redefined the recurring operation itself — not feature-cutting — as the target for automation",
      "Connected the subscription product and operations into one platform",
      "Later expanded into a B2B model for construction companies",
    ],
    result: [
      "Launched a 0→1 subscription platform",
      "Ran it in production for B2C for roughly 2 years",
      "Expanded to B2B with 2 construction companies",
      "An initial customer base of roughly 2,000 combined subscribers and SNS followers",
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
      "CRM customer behavior data and ad performance data were separated, making it hard to see marketing performance as one flow.",
    context: ["Ran CRM and Ads as two separate products", "Managed 3 products' planning together as part lead"],
    action: [
      "Analyzed the structure of CRM event data and Ads media data",
      "Defined the flow from customer behavior → campaign → ad performance",
      "Connected the CRM and Ads product structures",
      "Planned an integrated dashboard / analytics structure",
    ],
    result: [
      "Expanded into an integrated CRM + Ads analytics structure",
      "Connected separated marketing touchpoints into one product flow",
    ],
    ctaHref: "/projects#other-projects",
    ctaLabel: "See more in Other Projects →",
  },
];

import { TOOL_LOGOS, type ToolLogo } from "./tool-logos";

export type { ToolLogo };

export type ToolkitCard = {
  num: string;
  title: string;
  subtitle: string;
  evidence: string[];
  coreFlow: string[];
  tools: ToolLogo[];
  image: string;
};

const { figma: FIGMA, claudeCode: CLAUDE_CODE, codex: CODEX, chatgpt: CHATGPT, clickup: CLICKUP, notion: NOTION, jira: JIRA, confluence: CONFLUENCE } =
  TOOL_LOGOS;

export const executionToolkitEn: ToolkitCard[] = [
  {
    num: "01",
    title: "Planning Docs & Prototyping",
    subtitle: "Build the target screen first, so development intent reads clearly.",
    evidence: [
      "I don't hand off requirements as documents alone — I build prototypes close to the target screen myself.",
      "Even before design is applied, this lets developers understand the feature flow and intent from an actually working screen, and lets me confirm feasibility and the API/data structure it needs before development starts.",
    ],
    coreFlow: [
      "Organize requirements",
      "Build a PM prototype",
      "Align with developers on the screen",
      "Feasibility check",
      "Development starts",
    ],
    tools: [FIGMA, CLAUDE_CODE, CODEX, CHATGPT],
    image: "/how-i-work/how-i-work-prototyping.png",
  },
  {
    num: "02",
    title: "Data-Driven Prioritization & Decisions",
    subtitle: "Turn VOC into data to decide what to build first.",
    evidence: [
      "I don't manage VOC and field requirements as a plain request list — I turn them into classifiable data.",
      "I collect and categorize VOC and requirements in ClickUp, then analyze the accumulated data with ChatGPT by type, frequency, and key issue.",
      "Based on that analysis, I select which tasks to prioritize and allocate limited development resources accordingly, managing PoC and release scope.",
    ],
    coreFlow: [
      "Collect VOC",
      "Categorize / turn into data",
      "AI analysis",
      "Set priority",
      "Allocate resources",
      "PoC / Release",
    ],
    tools: [CLICKUP, CHATGPT],
    image: "/how-i-work/how-i-work-priority-analysis.png",
  },
  {
    num: "03",
    title: "Project Management & Dev Collaboration",
    subtitle: "Align the work order so design and development move in parallel.",
    evidence: [
      "I don't just manage the schedule with the dev team — I make the implementation criteria and preconditions concrete at the planning stage.",
      "I write planning docs down to prototype level to clarify the target screens and feature flow, and align the work order across development, design, and planning so API and backend work can start even before design is finalized.",
      "Requirements, schedule, issues, and decisions are continuously documented.",
    ],
    coreFlow: ["Planning / Prototype", "Design / Screen design", "Development / API & Backend"],
    tools: [CLICKUP, NOTION, JIRA, CONFLUENCE],
    image: "/how-i-work/how-i-work-development-collaboration.png",
  },
];

export type OperatingModelStep = { step: string; description: string };

export const operatingModelEn: OperatingModelStep[] = [
  { step: "Listen", description: "Collect customer / engineering / sales input" },
  { step: "Judge", description: "Structure the problem / constraints / impact" },
  { step: "Decide", description: "Decide scope / priority / trade-offs" },
  { step: "Align", description: "Align on criteria and work order with stakeholders" },
  { step: "Deliver", description: "Launch / operate / improve" },
];

export const closingStatementEn =
  "I believe good planning isn't about producing a lot of documents — it's about getting a team to understand the same problem and goal, and actually move it into a real product.";
