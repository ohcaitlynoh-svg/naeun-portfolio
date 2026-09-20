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
      "Had to restructure a fragmented APM / DPM / Cloud monitoring landscape into one Observability product while still meeting varied customer requirements.",
    context: [
      "143 VOC items + sales / technical support requirements",
      "Enterprise environment",
      "Existing product structure and technical constraints",
      "Collaborated across multiple development orgs",
    ],
    action: [
      "Re-sorted VOC and requirements by problem type, not as a feature list",
      "Defined a common user flow and the core monitoring scenarios",
      "Decided the feasible MVP scope and its priorities",
      "Designed APM / DPM / Cloud into one unified experience",
    ],
    result: [
      "6-month MVP",
      "v3.0 / GS certification",
      "Used in Enterprise PoC and contract processes",
      "Contributed to roughly ₩4B in business impact",
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
      "Reservation, scheduling, and delivery were run manually, making repeat operations and scale hard.",
    context: ["A one-person / small-scale operation", "Ran solo from planning through launch and operations"],
    action: [
      "Analyzed the actual operating flow",
      "Structured reservation / schedule / delivery status",
      "Systematized repeat operations",
      "Connected the subscription product and operations into one platform",
      "Later extended into a customizable module structure for B2B",
    ],
    result: [
      "Launched a 0→1 subscription platform",
      "Ran it in production for B2C",
      "Expanded into B2B customization / sales",
      "Experienced monetization / a business exit",
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

export type ToolkitCard = {
  num: string;
  title: string;
  subtitle: string;
  evidence: string[];
  coreFlow: string[];
  tools: string[];
  image: string;
};

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
    tools: ["Figma", "Claude", "ChatGPT"],
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
    tools: ["ClickUp", "ChatGPT"],
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
    tools: ["ClickUp", "Notion", "Jira", "Confluence"],
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
