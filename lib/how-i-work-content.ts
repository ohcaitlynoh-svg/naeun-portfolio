// flowSteps is also used by Home's compact "How I Work" summary card
// (app/page.tsx) — keep this export's shape/values stable even though this
// page itself no longer renders it as a standalone nav strip.
export const flowSteps = [
  { num: "01", label: "Principle" },
  { num: "02", label: "Listen" },
  { num: "03", label: "Judge" },
  { num: "04", label: "Decide" },
  { num: "05", label: "Align" },
  { num: "06", label: "Deliver" },
];

export const approachIntro =
  "복잡한 문제를 구조화하고, 사용자·사업·기술 제약 안에서 실행 가능한 결정을 만들어 실제 제품과 운영 결과로 연결합니다.";

export const approachDescription =
  "고객 VOC와 내부 개발·영업·엔지니어 의견을 듣는 것에서 시작해, 문제와 제약을 구조화하고 구현 가능한 범위와 우선순위를 판단합니다. 그 결과를 팀과 Align하고 실제 제품과 운영 결과까지 연결합니다.";

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

// Sourced from the same validated project/company data already on
// /projects/exem, /projects/flor-momento, and /projects' Other Projects
// snapshots (lib/other-projects-content.ts) — condensed into a
// Problem/Constraint/Decision & Action/Result shape, not new facts. No
// metric appears here that isn't already stated on one of those pages —
// EXEM's VOC count is deliberately left out (unverified anywhere in the
// codebase; excluded on the user's own earlier instruction).
export const cases: HowIWorkCase[] = [
  {
    id: "exem",
    num: "CASE 01",
    company: "EXEM",
    domain: "Enterprise Observability",
    problem:
      "분산된 APM / DPM / Cloud 모니터링 환경과 다양한 고객 요구를 하나의 Observability 제품으로 구조화해야 했습니다.",
    context: [
      "고객사별로 서로 다른 요구사항",
      "비딩 기반 납품으로 사실상 고정된 일정",
      "기존 제품 구조와 기술적 제약",
      "여러 개발 조직과 협업",
    ],
    action: [
      "VOC와 요구사항을 기능 목록이 아니라 문제 유형으로 재분류",
      "공통 사용자 흐름과 핵심 모니터링 시나리오 정의",
      "구현 가능한 MVP 범위와 우선순위 결정",
      "APM / DPM / Cloud를 하나의 통합 경험으로 설계",
    ],
    result: [
      "6개월 MVP, 이후 v3.0 / GS 인증",
      "Enterprise PoC·계약 과정에 활용, 약 40억 원 규모 사업성과에 기여",
    ],
    ctaHref: "/projects/exem",
    ctaLabel: "View Case Study →",
  },
  {
    id: "flor-momento",
    num: "CASE 02",
    company: "Flor Momento",
    domain: "Subscription Platform / 0→1",
    problem: "예약·일정·배송 운영이 수작업 중심이라 반복 운영과 확장이 어려웠습니다.",
    context: ["1인 사업자 · 소규모 운영 환경", "기획부터 출시·운영까지 단독 진행"],
    action: [
      "실제 운영 flow 분석",
      "예약 / 일정 / 배송 상태 구조화",
      "반복 업무 시스템화",
      "정기구독 상품과 운영 구조를 플랫폼으로 연결",
      "이후 B2B customization 가능한 module 구조로 확장",
    ],
    result: [
      "0→1 Subscription Platform 출시, B2C 실제 운영",
      "B2B customization / 판매 구조 확장, monetization / business exit 경험",
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
      "CRM 고객 행동 데이터와 광고 성과 데이터가 분리되어 마케팅 성과를 하나의 흐름으로 보기 어려웠습니다.",
    context: ["CRM · Ads 2개 제품을 각각 운영 중", "파트장으로 3개 제품 기획을 함께 관리"],
    action: [
      "CRM event data와 Ads media data 구조 분석",
      "고객 행동 → 캠페인 → 광고 성과 흐름 정의",
      "CRM / Ads 제품 구조 연결",
      "통합 dashboard / 분석 구조 기획",
    ],
    result: [
      "CRM + Ads 통합 분석 구조 확장",
      "분리된 마케팅 touchpoint를 하나의 제품 흐름으로 연결",
    ],
    ctaHref: "/projects#other-projects",
    ctaLabel: "Other Projects에서 더 보기 →",
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

export const executionToolkit: ToolkitCard[] = [
  {
    num: "01",
    title: "기획안 & 프로토타이핑",
    subtitle: "목표 화면을 먼저 만들어 개발 의도를 선명하게 전달합니다.",
    evidence: [
      "요구사항을 문서로만 전달하지 않고, PM이 직접 목표 화면에 가까운 프로토타입까지 제작합니다.",
      "디자인 적용 전에도 개발자가 실제 동작 화면을 기준으로 기능 흐름과 개발 의도를 이해할 수 있도록 하며, Feasibility와 필요한 API·데이터 구조를 개발 착수 전에 확인합니다.",
    ],
    coreFlow: ["요구사항 정리", "PM 프로토타입 제작", "개발자와 화면 기준 소통", "Feasibility Check", "개발 착수"],
    tools: ["Figma", "Claude", "ChatGPT"],
    image: "/how-i-work/how-i-work-prototyping.png",
  },
  {
    num: "02",
    title: "데이터 기반 우선순위 & 의사결정",
    subtitle: "VOC를 데이터로 바꿔 무엇을 먼저 만들지 결정합니다.",
    evidence: [
      "VOC와 현업 요구사항을 단순 요청 목록으로 관리하지 않고 분류 가능한 데이터로 전환합니다.",
      "ClickUp에서 VOC와 요구사항을 수집·분류하고, 누적 데이터를 ChatGPT로 유형·빈도·핵심 이슈 중심으로 분석합니다.",
      "분석 결과를 바탕으로 선행 과제를 선정하고, 한정된 개발 리소스를 우선순위에 따라 배분하며 PoC와 Release 범위를 관리합니다.",
    ],
    coreFlow: ["VOC 수집", "분류 / 데이터화", "AI 분석", "우선순위 선정", "리소스 배분", "PoC / Release"],
    tools: ["ClickUp", "ChatGPT"],
    image: "/how-i-work/how-i-work-priority-analysis.png",
  },
  {
    num: "03",
    title: "프로젝트 관리 & 개발 협업",
    subtitle: "작업 순서를 Align해 디자인과 개발이 병렬로 움직이게 합니다.",
    evidence: [
      "개발팀과 일정만 관리하는 것이 아니라, 기획 단계에서 구현 기준과 선행 조건을 구체화합니다.",
      "기획안을 프로토타입 수준까지 작성해 목표 화면과 기능 흐름을 명확히 하고, 디자인 완성 이전에도 API와 Backend 개발이 먼저 착수할 수 있도록 개발·디자인·기획의 작업 순서를 Align합니다.",
      "요구사항, 일정, 이슈, 의사결정은 지속적으로 문서화합니다.",
    ],
    coreFlow: ["기획 / 프로토타입", "디자인 / 화면 설계", "개발 / API·Backend"],
    tools: ["ClickUp", "Notion", "Jira", "Confluence"],
    image: "/how-i-work/how-i-work-development-collaboration.png",
  },
];

export type OperatingModelStep = { step: string; description: string };

// The old 6-step Principle/Listen/.../Deliver breakdown, condensed to one
// line per step — the recurring thought process behind the cases and
// toolkit above, now a compact summary rather than the page's lead
// content.
export const operatingModel: OperatingModelStep[] = [
  { step: "Listen", description: "고객 / 엔지니어 / 영업 요구 수집" },
  { step: "Judge", description: "문제 / 제약 / 영향도 구조화" },
  { step: "Decide", description: "Scope / Priority / Trade-off 결정" },
  { step: "Align", description: "이해관계자 기준과 작업 순서 합의" },
  { step: "Deliver", description: "출시 / 운영 / 개선" },
];

export const closingStatement =
  "좋은 기획은 문서를 많이 만드는 것이 아니라, 팀이 같은 문제와 목표를 이해하고 실제 제품으로 움직이게 만드는 것이라고 생각합니다.";
