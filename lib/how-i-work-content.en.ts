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

export const listeningEn = {
  external: [
    "Customer VOC",
    "Sales / RFP",
    "Market / Competitors",
    "Enterprise customer delivery terms",
  ],
  internal: [
    "Development",
    "Design / UX",
    "Planning / Product",
    "Engineering",
    "Leadership / Related teams",
  ],
};

export const judgeQuestionsEn = [
  "Does this request fit the product's purpose and scope?",
  "Is it feasible within the schedule and development resources?",
  "Is it a repeatable need, not just one customer's request?",
  "Does it preserve existing usability and product structure?",
  "Can it be solved with existing features, our own products, or an API?",
];

export const decideItemsEn = [
  "Adopt into the common product",
  "Keep the existing feature as-is",
  "Connect via our own product / internal API",
  "Provide a Custom API for the user",
  "Customer-specific Branch / Version",
  "Exclude or redirect if outside product scope",
];

export const alignItemsEn = [
  "Implementation approach and priority are judged first by planning/PM",
  "Feasibility and timeline are validated with the dev team",
  "Issues with major scope or business impact are aligned with sales/engineering/HQ/leadership",
];

// Keyword labels for alignItemsEn above, one per index.
export const alignLevelsEn = ["Product / UX", "Technical Feasibility", "Business / Scope"];

// Keyword labels for judgeQuestionsEn above, one per index.
export const judgeKeywordsEn = ["Product Fit", "Schedule & Resources", "Repeatability", "Existing Usability", "Extensibility"];

export const axisPointsEn = ["User Needs", "Business Goals", "Technical Feasibility"];
export const axisCaptionEn = "A decision only proceeds once all three axes align.";

export const deliverItemsEn = [
  "Scope",
  "View",
  "Policy",
  "UX / Design",
  "Development Spec",
  "Launch / Delivery",
  "Feedback",
];
