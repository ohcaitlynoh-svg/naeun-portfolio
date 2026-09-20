export const flowSteps = [
  { num: "01", label: "Principle" },
  { num: "02", label: "Listen" },
  { num: "03", label: "Judge" },
  { num: "04", label: "Decide" },
  { num: "05", label: "Align" },
  { num: "06", label: "Deliver" },
];

export const listening = {
  external: ["고객 VOC", "영업 / RFP", "시장 / 경쟁사", "Enterprise 고객 납기 조건"],
  internal: ["개발", "디자인 / UX", "기획 / 제품", "엔지니어", "경영 / 유관부서"],
};

export const judgeQuestions = [
  "이 요구는 제품의 목적과 범위에 맞는가?",
  "일정과 개발 리소스 안에서 구현 가능한가?",
  "특정 고객만이 아니라 반복 가능한 요구인가?",
  "기존 사용성과 제품 구조를 해치지 않는가?",
  "기존 기능, 자사 제품, API로 해결 가능한가?",
];

export const decideItems = [
  "공통 제품에 반영",
  "기존 기능 유지",
  "자사 제품 / 내부 API 연계",
  "사용자 Custom API 제공",
  "고객 전용 Branch / Version",
  "제품 범위 밖이면 제외 또는 이관",
];

export const alignItems = [
  "구현 방식과 우선순위는 기획/PM이 먼저 판단",
  "개발 가능성과 일정은 개발팀과 검증",
  "Scope와 사업 영향이 큰 사안은 영업/엔지니어/본부/경영과 합의",
];

// Keyword labels for alignItems above, one per index — from PORTFOLIO_SPEC.md's
// "Alignment" Level 01–03 headings (Product/UX Decision, Technical Feasibility,
// Business/Scope Decision).
export const alignLevels = ["Product / UX", "Technical Feasibility", "Business / Scope"];

// Keyword labels for judgeQuestions above, one per index — from PORTFOLIO_SPEC.md's
// "Judgment Criteria" headings (Product Fit, 일정과 개발 리소스, 범용성, 기존 사용성, 시스템 확장성).
export const judgeKeywords = ["Product Fit", "일정 · 리소스", "범용성", "기존 사용성", "시스템 확장성"];

export const axisPoints = ["User Needs", "Business Goals", "Technical Feasibility"];
export const axisCaption = "세 축이 동시에 성립할 때만 다음 단계로 진행합니다.";

export const deliverItems = [
  "Scope",
  "View",
  "Policy",
  "UX / Design",
  "Development Spec",
  "Launch / Delivery",
  "Feedback",
];
