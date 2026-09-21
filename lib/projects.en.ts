import type { Project } from "./projects";

// English counterpart to lib/projects.ts — same structure, same facts and
// figures, translated content. Numbers/company names/dates are unchanged.
export const projectsEn: Project[] = [
  {
    slug: "exem",
    name: "EXEM",
    domain: "Enterprise Observability",
    cardVisual: {
      src: "/exem/exem-network-performance-dashboard.png",
      alt: "EXEM unified monitoring dashboard",
      fit: "cover",
      position: "85% center",
    },
    cardVisualLarge: { fit: "contain" },
    oneLiner:
      "Restructured a fragmented monitoring landscape into one unified Observability product",
    role: "Senior Product Manager",
    keyResult:
      "Shipped the unified MVP within 6 months\n\nContributed to roughly ₩4B in business impact\nthrough Enterprise PoC and contract processes",
    fullName: "EXEMONE",
    heroRole: "Senior Product Manager",
    heroTeam: "Led 8 planners · Collaborated with ~60 engineers",
    heroPeriod: "2023.10.30 – 2025.07.24",
    heroScope: ["APM", "DPM", "Cloud", "Kubernetes", "AI Monitoring"],
    heroKeyResult: [
      "Shipped the unified MVP within 6 months",
      "Contributed to roughly ₩4B in business impact through Enterprise PoC and contract processes",
    ],
    customSections: [
      {
        title: "Problem",
        blocks: [
          {
            type: "p",
            text: "EXEM ONE is an Enterprise Observability product designed to monitor large-scale infrastructure distributed not just across Korea but worldwide, in a single control environment.",
          },
          {
            type: "bullets",
            items: [
              "Monitoring was scattered across separate products and screens — APM, DPM, Cloud — making it hard for customers to read system health against one consistent standard.",
              "Requirements varied by customer; adopting them as-is would have driven up product complexity and maintenance cost.",
              "Delivery was bidding-based, so the schedule was effectively fixed — the integration direction and priorities had to be judged quickly.",
            ],
          },
        ],
      },
      {
        title: "Goal",
        blocks: [
          {
            type: "p",
            text: "The goal was to integrate fragmented APM, DPM, Kubernetes, and Cloud monitoring capabilities into one Enterprise Observability product.",
          },
          {
            type: "bullets",
            intro: "Success Criteria",
            items: [
              "Build the MVP within 6 months",
              "Reach a level of product completeness that could be proposed, validated, and delivered in a real Enterprise environment",
              "Establish a product structure that could keep absorbing customer requirements going forward",
            ],
          },
        ],
      },
      {
        title: "Decision Framework",
        blocks: [
          {
            type: "p",
            text: "I judged the integrated product's implementation approach and scope against these criteria.",
          },
          {
            type: "bullets",
            items: [
              "Does it fit the product's core purpose and scope?",
              "Is it feasible within the fixed schedule?",
              "Is it a recurring need across multiple customers?",
              "Does it preserve existing usability and stability?",
              "Can it be solved with existing features, our own products, or internal/external APIs?",
            ],
          },
        ],
      },
      {
        title: "Execution",
        blocks: [
          {
            type: "p",
            text: "Rather than moving the large volume of accumulating customer VOC and sales/technical-support requests straight into a feature list, I structured them by recurrence, product fit, schedule, and technical feasibility to decide the product's scope and priorities.",
          },
          {
            type: "p",
            text: "Instead of the product being handed to sales only after it was built, I detailed the product structure, policies, screens, and features to an actual product-level fidelity from before development started.",
          },
          {
            type: "p",
            text: "I used that planning output as the standard for development, and drove the development process so the product was built to match it.",
          },
          {
            type: "p",
            text: "Even after launch, I kept maintaining and advancing the product by continuously reflecting Enterprise customer needs and requirements that surfaced during operation.",
          },
        ],
      },
      {
        title: "Final Product",
        blocks: [
          {
            type: "p",
            text: "I integrated monitoring screens that had been scattered across APM, DPM, and Cloud into one product structure. Below is the flagship screen built to explore network and infrastructure monitoring in a single view.",
          },
          {
            type: "heroImage",
            src: "/exem/exem-network-performance-dashboard.png",
            alt: "Network Performance Monitoring unified dashboard",
            width: 1672,
            height: 941,
            caption:
              "Network Performance Monitoring — a unified monitoring screen built to explore network status and performance metrics in one view.",
          },
        ],
      },
      {
        title: "Product Expansion · AI Anomaly Detection",
        emphasis: "detail",
        blocks: [
          {
            type: "p",
            text: "An expansion built on top of the integrated product, into AI-based anomaly detection.",
          },
          {
            type: "images",
            columns: 2,
            items: [
              {
                num: "01",
                src: "/exem/exem-final-dashboard.png",
                alt: "AI anomaly detection dashboard",
                width: 1448,
                height: 1086,
                caption: "AI anomaly detection dashboard",
              },
              {
                num: "02",
                src: "/exem/exem-anomaly-scenario.png",
                alt: "The planning document that defined the detection scenario",
                width: 915,
                height: 766,
                caption: "The planning document that defined the detection scenario",
              },
              {
                num: "03",
                src: "/exem/exem-anomaly-detail.png",
                alt: "The annotated screen that restructured the information hierarchy",
                width: 898,
                height: 769,
                caption: "The annotated screen that restructured the information hierarchy",
              },
            ],
          },
        ],
      },
      {
        title: "Key Product Decisions",
        blocks: [
          {
            type: "titledItems",
            items: [
              {
                title: "01 · Redefined the Product Boundary",
                text: "Defined requests unrelated to the product's purpose as out of scope, and absorbed only recurring needs into the common feature set.",
              },
              {
                title: "02 · Unified the Information Structure",
                text: "Restructured screens scattered across APM, DPM, and Cloud so they could be explored within one information structure.",
              },
              {
                title: "03 · Designed an Extensible Integration Structure",
                text: "Secured external-integration extensibility through a Custom API, instead of tying the product to a specific vendor.",
              },
              {
                title: "04 · Isolated High-Impact Requests",
                text: "Split a large customer's low-generality but business-critical request into a dedicated Branch, protecting the common product.",
              },
            ],
          },
        ],
      },
      {
        title: "Evidence & Process",
        blocks: [
          { type: "p", text: "The judgment behind the final screen." },
          {
            type: "images",
            columns: 2,
            items: [
              {
                num: "01",
                src: "/exem/exem-monitoring-detail.png",
                alt: "The detailed spec that fleshed out the unified screen design",
                width: 895,
                height: 513,
                caption: "The detailed spec that fleshed out the unified screen design",
              },
            ],
          },
        ],
      },
      {
        title: "Result",
        blocks: [
          {
            type: "impactGrid",
            items: [
              { label: "6 Months", description: "Unified Observability MVP shipped" },
              { label: "Launch", description: "Product launched and continuously upgraded" },
              {
                label: "GS Certified",
                description: "GS certification obtained across 4 programs — APM · DPM · Kubernetes · Cloud",
              },
            ],
          },
          {
            type: "p",
            text: "After the MVP, the product expanded step by step into Cloud, Kubernetes, and AI-based anomaly detection, among other areas.",
          },
        ],
      },
      {
        title: "Business Impact",
        blocks: [
          {
            type: "p",
            text: "I detailed EXEM ONE's product structure and core features to an actual product-level fidelity before development was complete, and drove the development and customer-validation process against that standard.",
          },
          {
            type: "p",
            text: "Large-scale infrastructure monitoring projects — for LG Electronics, Samsung Electronics, KFTC (Korea Financial Telecommunications & Clearings Institute), and the Korean National Police Agency, among others — were carried out on top of this product, contributing to roughly ₩4B in revenue on the major projects.",
          },
        ],
      },
      {
        title: "My Contribution",
        blocks: [
          {
            type: "bullets",
            items: [
              "Defined the product structure, policies, screens, and features",
              "Decided scope and priorities",
              "Established the implementation standard",
              "Drove the development process",
              "Continuously maintained and advanced the product based on customer needs",
            ],
          },
        ],
      },
      {
        title: "Learning",
        blocks: [
          {
            type: "titledItems",
            items: [
              {
                title: "Product Boundary",
                text: "Keeping the product's role clear came before accommodating every request — mismatches were solved via other products or integrations.",
              },
              {
                title: "Delivery Risk",
                text: "On a fixed-deadline project, validating feasibility at the planning stage reduced Delivery Risk.",
              },
              {
                title: "Product Asset",
                text: "Requests with repeat potential were treated as a product asset, not a one-off customization.",
              },
            ],
          },
        ],
      },
    ],
    summary: "[Project Summary — not used]",
    problem: "[Problem — not used]",
    complexity: "[Complexity — not used]",
    evidence: "[Evidence — not used]",
    constraints: "[Constraints — not used]",
    decision: "[Decision — not used]",
    tradeoff: "[Trade-off — not used]",
    systemDesign: "[System / Policy Design — not used]",
    collaboration: "[Collaboration — not used]",
    impact: "[Impact — not used]",
    learning: "[Learning — not used]",
  },
  {
    slug: "flor-momento",
    name: "Flor Momento",
    domain: "Subscription Platform / 0→1",
    cardVisual: {
      src: "/flor/flor-final-product-home.png",
      alt: "Flor Momento subscription product home screen",
    },
    cardVisualLarge: { fit: "cover", position: "center top" },
    oneLiner:
      "Turned manual booking and delivery operations\ninto a subscription product with an operating system",
    role: "Founder / Product Manager",
    heroPeriod: "2018.08.08 – 2021.03",
    keyResult:
      "Launched a subscription delivery platform\n\nSelected for a government pre-startup program\n\nExpanded the revenue model from B2C to B2B module sales",
    customSections: [
      {
        title: "Problem",
        blocks: [
          {
            type: "p",
            text: "Funeral flowers and handcrafted products required complex production, scheduling, and delivery management after ordering,\nand recurring deliveries were hard to run with simple order features alone.",
          },
          {
            type: "bullets",
            items: [
              "Booking",
              "Schedule management",
              "Delivery management",
              "Customer notifications",
            ],
            outro:
              "and other recurring tasks relied on manual work, creating heavy operational load.",
          },
          {
            type: "p",
            text: "For solo and small-scale operators, existing e-commerce features were excessive or simply didn't fit.",
          },
        ],
      },
      {
        title: "Product Opportunity",
        blocks: [
          {
            type: "p",
            text: "I concluded that recurring-delivery operations themselves — not just a storefront — needed to be productized.",
          },
          {
            type: "p",
            text: "I redefined the core problem as recurring operations rather than ordering,\nand turned the real operational work into product features.",
          },
        ],
      },
      {
        title: "Final Product",
        blocks: [
          {
            type: "heroImage",
            src: "/flor/flor-final-product-home.png",
            alt: "The live, operating Flor Momento service — main screen",
            width: 874,
            height: 882,
            caption: "The live, operating Flor Momento service — main screen",
          },
        ],
      },
      {
        title: "Operating Logic / Lifecycle",
        blocks: [
          {
            type: "flowDiagram",
            items: [
              "Subscription Order",
              "Schedule",
              "Production / Preparation",
              "Delivery",
              "Status / Alert",
              "Repeat",
            ],
          },
        ],
      },
      {
        title: "Product Decisions",
        blocks: [
          {
            type: "bullets",
            items: [
              "Lightened the product to only the core features a solo operator needs",
              "Focused on schedule management and recurring delivery operations rather than full commerce functionality",
              "Extended beyond B2C into a customizable module structure",
              "Defined screens, policies, and features to a build-ready level",
            ],
          },
        ],
      },
      {
        title: "Evidence / Product Design",
        blocks: [
          {
            type: "images",
            items: [
              {
                num: "01",
                src: "/flor/flor-project-contact-sheet.png",
                alt: "The actual planning material defining the subscription-delivery service structure and operating screens",
                width: 2488,
                height: 1148,
                caption:
                  "The actual planning material defining the subscription-delivery service structure and operating screens",
              },
            ],
          },
        ],
      },
      {
        title: "Ownership & Delivery",
        emphasis: "detail",
        collapsible: { summary: "View ownership details" },
        blocks: [
          {
            type: "bullets",
            items: [
              "Business and product planning",
              "Service structure definition",
              "Customer journey and subscription-delivery logic design",
              "Screen / feature / operations policy definition",
              "Collaboration with outsourced development and design",
              "Launch and operations",
              "Monetization, including module sales",
            ],
          },
        ],
      },
      {
        title: "Impact",
        blocks: [
          {
            type: "bullets",
            items: [
              "Selected for the Korea Ministry of SMEs and Startups' Pre-Startup Package",
              "Operated as a real B2C service",
              "Modularized features / B2B sales",
            ],
          },
          {
            type: "images",
            compact: true,
            items: [
              {
                num: "01",
                src: "/flor/flor-startup-package.png",
                alt: "Supporting evidence for the Pre-Startup Package selection",
                width: 338,
                height: 368,
                caption: "Pre-Startup Package — supporting evidence",
              },
            ],
          },
        ],
      },
      {
        title: "Learning",
        blocks: [
          {
            type: "bullets",
            collapsible: { summary: "View learning" },
            items: [
              "Understanding the operational problem first is what produces a real product structure",
              "Productizing the core recurring task matters more than adding many features",
              "Even a single service function, once structured, can become a reusable product for other operators",
            ],
          },
        ],
      },
    ],
    summary: "[Project Summary — not used]",
    problem: "[Problem — not used]",
    complexity: "[Complexity — not used]",
    evidence: "[Evidence — not used]",
    constraints: "[Constraints — not used]",
    decision: "[Decision — not used]",
    tradeoff: "[Trade-off — not used]",
    systemDesign: "[System / Policy Design — not used]",
    collaboration: "[Collaboration — not used]",
    impact: "[Impact — not used]",
    learning: "[Learning — not used]",
  },
  {
    slug: "readykorea",
    name: "ReadyKorea",
    domain: "e-Government / Global Localization",
    cardVisual: {
      src: "/readykorea/readykorea-worldbank-npts-cover.png",
      alt: "World Bank / Belarus NPTS Technical Assistance final presentation title slide",
    },
    cardVisualLarge: { scale: 1.08 },
    oneLiner:
      "Analyzed local administrative and trade processes to\nlocalize a Korean e-government system",
    role: "Product Manager / IT Expert\nOne of 5 PMs · Owned system planning and localization",
    heroPeriod: "2015.09.21 – 2018.02.28",
    keyResult:
      "Delivered a ₩200M World Bank consulting project\n\nDelivered a ~₩20B e-government ICT build project",
    customSections: [
      {
        // See lib/projects.ts — "Project Cover" (not "Overview") avoids a
        // duplicate id="overview" collision with ProjectDetailView.tsx's
        // permanent hero-meta wrapper.
        title: "Project Cover",
        blocks: [
          {
            type: "heroImage",
            caption:
              "World Bank / Belarus — \"Technical Assistance - Development of National Paperless Trade System (NPTS) for Belarus\", Final Presentation title slide",
            src: "/readykorea/readykorea-worldbank-npts-cover.png",
            alt: "World Bank / Belarus NPTS Technical Assistance final presentation title slide",
            width: 991,
            height: 464,
          },
        ],
      },
      {
        title: "Complexity",
        blocks: [
          {
            type: "p",
            text: "This was a global consulting and build project applying Korea's e-government and e-trade systems to the Belarusian context.",
          },
          {
            type: "p",
            text: "Korea's trade environment centers on air and sea, while Belarus's centers on overland routes, so",
          },
          {
            type: "bullets",
            items: [
              "Law",
              "Administrative procedures",
              "Trade environment",
              "Institutional structure",
              "System environment",
            ],
            outro:
              "all differed — gaps that a simple UI change couldn't resolve.",
          },
        ],
      },
      {
        title: "Research / Evidence",
        blocks: [
          {
            type: "bullets",
            items: [
              "Interviews with Belarusian government officials and field staff",
              "Analysis of local administrative operations",
              "Analysis of e-trade operations",
              "Study of the Russia–Belarus linked system",
              "Survey of the existing e-government / e-trade system landscape",
              "Comparison of the Korean system against the local system",
            ],
          },
        ],
      },
      {
        title: "AS-IS → Gap → TO-BE",
        blocks: [
          {
            type: "flow",
            items: [
              "Local operations research",
              "Structuring the AS-IS process",
              "Gap analysis against the Korean system",
              "Defining locally applicable features and structure",
              "TO-BE Flow / System / Dashboard design",
            ],
          },
        ],
      },
      {
        title: "Key Decisions",
        blocks: [
          {
            type: "bullets",
            items: [
              "Restructured for local operations instead of replicating the Korean system as-is",
              "Reorganized menus and system structure around local workflows",
              "Reflected country-specific differences in system and document flow",
              "Prioritized the necessary modules and features",
              "Consolidated multiple institutions' requirements into one system structure",
            ],
          },
        ],
      },
      {
        title: "Implementation Roadmap",
        blocks: [
          {
            type: "p",
            text: "The actual build scope and phased plan from the World Bank NPTS project: Legal and Governance Framework, Paperless Portal System, Cargo & Goods Management & Monitoring System, Technical Architecture System, Global Transaction System.",
          },
          {
            type: "heroImage",
            caption: "Implementation Road-Map — National Paperless Trade System (NPTS) for Belarus",
            src: "/readykorea/readykorea-implementation-roadmap.png",
            alt: "Implementation Road-Map for the National Paperless Trade System, Belarus",
            width: 1052,
            height: 727,
          },
        ],
      },
      {
        title: "System Design Evidence",
        collapsible: { summary: "View system design evidence" },
        blocks: [
          {
            type: "p",
            text: "The artifacts below aren't deliverables for their own sake — they're evidence of the complexity resolved and the decisions they enabled.",
          },
          {
            type: "images",
            items: [
              {
                num: "01",
                caption: "AS-IS / TO-BE Flow Chart",
                src: "/readykorea/readykorea-npts-system-flow.png",
                alt: "Export / Import / National Trade process flow charts",
                width: 925,
                height: 379,
              },
              { num: "02", caption: "System Architecture / Dashboard" },
              { num: "03", caption: "Screen Specs / Prototype" },
            ],
          },
        ],
      },
      {
        title: "Stakeholder Alignment",
        blocks: [
          {
            type: "flow",
            items: [
              "Gathering requirements by institution",
              "Structuring into system requirements",
              "Reporting and alignment",
            ],
          },
          {
            type: "bullets",
            items: [
              "World Bank",
              "Korean / Belarusian government agencies",
              "KTNET",
              "NIA / NIPA",
              "Local development team",
              "Domestic development · planning · design team",
            ],
          },
          {
            type: "bullets",
            muted: true,
            collapsible: { summary: "View ownership details" },
            items: [
              "Local operations and systems analysis",
              "AS-IS / TO-BE design",
              "System, screen, and process planning",
              "Localization requirements definition",
              "Project schedule and staffing management",
              "Cross-institution communication",
              "Authored Korean/English reports and World Bank submission materials",
              "Coordinated development and design teams",
            ],
          },
          {
            type: "images",
            compact: true,
            items: [
              {
                num: "01",
                caption:
                  "\"National Paperless Trade System Consulting and Planning\" — role introduction",
                src: "/readykorea/readykorea-role-evidence.png",
                alt: "Project participation and role introduction — Na-eun Oh, System Analyst and Architect",
                width: 991,
                height: 352,
              },
            ],
          },
        ],
      },
      {
        title: "Impact + Learning",
        blocks: [
          {
            type: "bullets",
            items: [
              "Delivered a ₩200M World Bank consulting project",
              "Delivered a ~₩20B Belarusian e-government ICT build project",
              "Designed a Korean-model e-government/e-trade system adapted to the local context",
              "Cross-border planning, development, and design collaboration across Korea, Belarus, and Ukraine",
            ],
          },
          {
            type: "bullets",
            intro: "Learning",
            items: [
              "Localization isn't translation — it's redesigning the structure of operations, institutions, and systems",
              "The more complex the project, the more precisely the AS-IS must be structured before a TO-BE can emerge",
              "Requirements from multiple institutions must be organized around the system, not merged as-is",
            ],
          },
        ],
      },
    ],
    summary: "[Project Summary — not used]",
    problem: "[Problem — not used]",
    complexity: "[Complexity — not used]",
    evidence: "[Evidence — not used]",
    constraints: "[Constraints — not used]",
    decision: "[Decision — not used]",
    tradeoff: "[Trade-off — not used]",
    systemDesign: "[System / Policy Design — not used]",
    collaboration: "[Collaboration — not used]",
    impact: "[Impact — not used]",
    learning: "[Learning — not used]",
  },
];
