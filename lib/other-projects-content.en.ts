// English counterpart to lib/other-projects-content.ts — same structure,
// same facts, translated content. Product names are transliterated
// ("빅인" -> "Bigin"), not renamed. Unverified Notion figures are omitted
// here too, for the same reason as the Korean file.
import type { OtherProjectSnapshot } from "./other-projects-content";

export const otherProjectSnapshotsEn: Record<string, OtherProjectSnapshot> = {
  Biginsight: {
    assets: [
      { src: "/others/biginsight-evidence-01.png", alt: "Biginsight product screen 1" },
      { src: "/others/biginsight-evidence-02.png", alt: "Biginsight product screen 2" },
      { src: "/others/biginsight-evidence-03.png", alt: "Biginsight product screen 3" },
      { src: "/others/biginsight-evidence-04.png", alt: "Biginsight product screen 4" },
    ],
    role: "Product Management / Product Owner\nTeam/Part Lead · Senior PM",
    domain: "CRM · CDP · Ads · Marketing SaaS",
    summary: [
      "200+ client companies each running campaigns across several ad",
      "media had to be registered, run, and managed individually —",
      "a CS operating load I absorbed into the product structure and",
      "automated.",
    ],
    keyScope: [
      "CS team supporting campaign operations for 200+ client companies",
      "Integrated with 4 major ad media",
      "Moved to a batch registration / run / management structure",
      "Standardized the monthly performance report",
      "A roughly 20-server-scale POC for a Lotte affiliate",
    ],
    workedOnGroups: [
      {
        group: "Product Decision",
        items: [
          "The core problem: many client companies' campaigns had to be registered, run, and managed individually across several ad media",
          "Judged that instead of building one more campaign feature, the operating work itself should be absorbed into the product structure and automated",
        ],
      },
      {
        group: "Product Change",
        items: [
          "Individual registration → batch registration",
          "Individual execution → batch execution",
          "Individual management → batch management",
          "Per-medium manual handling → automatic classification / media integration",
        ],
      },
      {
        group: "Reporting Standardization",
        items: [
          "Standardized the information structure and visualization rules for the monthly performance report",
          "Defined the chart type for each metric",
          "Designed the monthly data-query basis and query structure",
          "Designed the reporting process so CS could compile the stats and send the report",
        ],
      },
      {
        group: "POC",
        items: ["An initial POC for a Lotte affiliate", "Run at a scale of roughly 20 servers"],
      },
    ],
    keyDecision:
      "Productized the operating complexity of 200+ client companies running campaigns across 4 ad media into a batch registration / execution / management structure.",
  },
  "Aladin Communication": {
    projectName: "Aladin Market",
    assets: [
      { src: "/others/aladin-evidence-01.png", alt: "Aladin Market product screen 1" },
      { src: "/others/aladin-evidence-02.png", alt: "Aladin Market product screen 2" },
    ],
    role: "Service Planning\nPlanning Part Lead",
    domain: "C2C Commerce · Marketplace · Mobile App · UX Planning",
    summary: [
      "Redesigned the core user journey from browsing and listing",
      "through shipping to post-transaction rating in secondhand",
      "trading, defining transaction policy and interaction alongside the screens themselves.",
    ],
    keyScope: [
      "Main page renewal",
      "Product detail renewal",
      "Product registration renewal",
      "Shipping method TO-BE",
      "Post-transaction seller / buyer rating",
      "Region selection UX",
      "App event planning",
      "Backoffice planning",
    ],
    workedOnGroups: [
      {
        group: "Transaction Experience",
        items: [
          "Redesigned the main / detail / listing screens",
          "Analyzed the AS-IS / TO-BE shipping-method-selection flow",
          "Region selection UX",
          "Organized key interactions across the transaction flow",
        ],
      },
      {
        group: "Post-Transaction Experience",
        items: [
          "Seller ↔ buyer mutual rating screen",
          "Defined the rating criteria",
          "Defined the rating method and display standards",
        ],
      },
      {
        group: "Event / Growth",
        items: [
          "Monthly app events and promotion planning",
          "Event planning around listing / purchase / shipping",
        ],
      },
    ],
  },
  Cafe24: {
    assets: [
      { src: "/others/cafe24-evidence-01.png", alt: "Cafe24 product screen 1" },
      { src: "/others/cafe24-evidence-02.png", alt: "Cafe24 product screen 2" },
    ],
    role: "Infrastructure Planning Team\nService / UI/UX Planning\nCTO-direct organization",
    domain: "Server Infrastructure · Monitoring · Internal Platform · UI/UX",
    summary: [
      "In a server environment of roughly 1,000–1,500 machines,",
      "structured several operating tools and monitoring data into",
      "one internal UI, and drove development collaboration on an",
      "Axure prototype and operating policy.",
    ],
    keyScope: [
      "A server environment of roughly 1,000–1,500 machines",
      "Integrated Slack / Jira / Wiki / Grafana / security / server monitoring, among other tools",
      "Organized load / autoscaling operating policy",
      "Planning based on an Axure prototype",
      "Korea / Philippines development collaboration",
    ],
    workedOnGroups: [
      {
        group: "Infrastructure",
        items: [
          "Server monitoring dashboard UI/UX",
          "Defined load / autoscaling policy",
          "Analyzed existing tools: Slack / Jira / Wiki / Grafana / security / server monitoring, among others",
          "Analyzed each dev team's operating process",
          "Identified work that needed automation",
          "Scenario / screen spec",
          "Terminology / feature definition",
          "Wireframe / Axure prototype",
        ],
      },
      {
        group: "Collaboration",
        items: [
          "Korea development team ↔ Philippines development team",
          "Roadmap-based collaboration",
          "JIRA testing management",
        ],
      },
    ],
    secondaryProject: {
      title: "Planning a new SNS-based commerce platform",
      items: [
        "Instagram-based shopping concept",
        "Influencer commerce",
        "Backend planning",
        "Shopify reverse analysis",
        "Business feasibility review",
      ],
    },
  },
  Storelink: {
    domain: "Marketing · CRM · Monitoring",
    summary: [
      "Organized the planning org and workflow for a new IT business,",
      "and led initial planning for a marketing / CRM monitoring product.",
    ],
    keyScope: [
      "Planning team building",
      "Planning document system",
      "Operating process",
      "Planner evaluation criteria",
      "Initial product planning for marketing / CRM monitoring",
    ],
  },
  // Planned asset: assets: [{ src: "/others/Eastend_operations-dashboard.png", alt: "Eastend operations dashboard", caption: "Operations Dashboard" }],
  Eastend: {
    domain: "Fashion Wholesale · Inventory · Operations Dashboard",
    summary: [
      "Initial planning consultation to turn apparel wholesale/distribution",
      "inventory, production, and shipping flows into a dashboard product.",
    ],
    keyScope: [
      "IT team setup",
      "Documentation",
      "User interviews",
      "Operating process / scenario diagrams",
      "Inventory / production / shipping dashboard",
      "Product definition for IR",
    ],
  },
  // Planned asset: assets: [{ src: "/others/Asiance_data-platform.png", alt: "Asiance Korea data platform dashboard", caption: "Data Platform" }],
  "Asiance Korea": {
    domain: "Luxury Commerce · Data Platform · Global Brand",
    summary: [
      "Planned a data-analytics platform environment and initial product",
      "structure to support overseas luxury brands entering Korea.",
    ],
    keyScope: [
      "External development partner coordination",
      "Instagram / Facebook (Meta) / Google / Kakao data-integration dashboard",
      "UI/UX draft",
      "Wireframe / prototype",
      "User interviews",
      "User scenario / workflow",
      "Kakao chatbot–related feature planning",
    ],
    note: "Related brands (consulting context): Chanel · Gucci · Jimmy Choo · Tom Ford · LVMH, etc. — this was consulting/planning participation, not owning or operating the brands' own products.",
  },
  // Planned asset: assets: [{ src: "/others/Sesun_commerce-operations.png", alt: "Sesun Electronics commerce operations", caption: "Commerce Operations" }],
  "Sesun Electronics": {
    domain: "Commerce · O2O · Operations",
    summary: [
      "Organized broadcast-equipment sales/delivery work into an online",
      "commerce and operations-management flow, and planned automation",
      "for repetitive tasks.",
    ],
    keyScope: [
      "O2O service planning",
      "Online sales operations across the owned mall / ESM / Naver, etc.",
      "Sales / member data management program",
      "Product operation",
      "Automated the delivery-management process for public agencies / military units",
    ],
  },
  // Planned asset: assets: [{ src: "/others/Yuratech_sap-mm.png", alt: "Yuratech SAP MM module screen", caption: "SAP MM" }],
  Yuratech: {
    role: "Overseas Purchasing",
    domain: "Manufacturing · Overseas Purchasing · SAP ERP",
    summary: [
      "Handled overseas purchasing and customs for automotive ignition-",
      "system raw materials, while also participating as the field-side",
      "MM module lead on a SAP ERP build TFT.",
    ],
    keyScope: [
      "Collaborated with suppliers in the US / Germany / Japan",
      "Special-metal imports",
      "Managed customs / tariffs / duty drawback / VAT costs",
      "SAP ERP replacement TFT",
      "MM module field-side participation",
    ],
    keyDecision:
      "Experiencing field operations structure and an ERP build at the same time became the starting point for later transitioning my career into IT / Product Planning.",
  },
  "Hyundai Home Shopping": {
    role: "MD Intern\nBeauty / General Merchandise Team",
    summary: ["An early-career commerce / merchandising experience."],
  },
};
