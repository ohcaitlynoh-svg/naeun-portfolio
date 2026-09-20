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
// Problem/Context/Action/Result shape, not new facts. No metric appears
// here that isn't already stated on one of those pages.
export const cases: HowIWorkCase[] = [
  {
    id: "exem",
    num: "CASE 01",
    company: "EXEM",
    domain: "Enterprise Observability",
    problem:
      "APM · DPM · Cloud 등 여러 제품과 화면에 흩어져 있던 모니터링을, 고객마다 다른 요구를 반영하면서도 하나의 Observability 제품으로 구조화해야 했습니다.",
    context: [
      "고객사별로 서로 다른 요구사항",
      "비딩 기반 납품으로 사실상 고정된 일정",
      "기존 제품 구조와 기술적 제약",
      "기획 8명 · 개발 약 60명 조직과 협업",
    ],
    action: [
      "요구를 기능이 아니라 목적 부합 · 일정 · 반복성 · 기존 사용성 · 대체 가능성 기준으로 재분류",
      "APM · DPM · Cloud를 하나의 정보 구조로 통합 설계",
      "구현 가능한 MVP 범위와 우선순위 결정",
      "특정 Vendor에 종속되지 않는 Custom API 연동 구조 설계",
    ],
    result: ["6개월 내 통합 MVP 출시, 이후 v3.0 · GS 인증", "Enterprise PoC·계약 과정에 활용, 약 40억 원 규모 사업성과에 기여"],
    ctaHref: "/projects/exem",
    ctaLabel: "View Case Study →",
  },
  {
    id: "flor-momento",
    num: "CASE 02",
    company: "Flor Momento",
    domain: "Subscription Platform / 0→1",
    problem:
      "조문장식·핸드크래프트 제품은 주문 이후 제작·일정·배송 관리가 복잡해, 예약과 반복 배송을 수작업으로 운영하기 어려웠습니다.",
    context: ["1인 사업자 · 소규모 운영 환경", "기존 이커머스 기능은 과도하거나 맞지 않음", "기획부터 출시·운영까지 단독 진행"],
    action: [
      "실제 운영 흐름을 분석해 예약 · 일정 · 배송 · 알림 구조로 재정의",
      "반복 업무를 수작업이 아닌 제품 기능으로 전환",
      "1인 사업자에게 필요한 핵심 기능만 남기는 경량화",
      "B2C로 끝내지 않고 커스터마이징 가능한 모듈 구조로 확장",
    ],
    result: [
      "0→1 정기배송 플랫폼 출시, 중소벤처기업부 예비창업패키지 선정",
      "B2C 운영에서 기능 모듈화 · B2B 판매로 수익모델 확장",
      "이후 business exit(매각)까지 진행",
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
      "이벤트 기반 고객 행동 데이터(CRM)와 광고 매체 데이터(Ads)가 각자 다른 제품으로 분리돼 있어, 마케팅 성과를 하나의 흐름으로 보기 어려웠습니다.",
    context: ["CRM · Ads 2개 제품을 각각 운영 중", "서로 다른 데이터 소스 · 서로 다른 팀 구조", "파트장으로 3개 제품 기획을 함께 관리"],
    action: [
      "CRM 이벤트 데이터와 Ads 매체 데이터 구조 분석",
      "노출 → 유입 → 클릭 → 행동 → 성과로 이어지는 흐름 정의",
      "CRM · Ads 제품 구조를 하나로 연결하는 Bigin ONE 기획",
      "Full-funnel Marketing Dashboard 설계",
    ],
    result: ["CRM + Ads 통합 분석 구조(Bigin ONE)로 제품 확장", "여러 마케팅 touchpoint를 하나의 제품 흐름으로 연결"],
    ctaHref: "/projects#other-projects",
    ctaLabel: "Other Projects에서 더 보기 →",
  },
  {
    id: "cafe24",
    num: "CASE 04",
    company: "Cafe24",
    domain: "Server Infrastructure · Monitoring · Internal Platform",
    problem:
      "Slack · JIRA · Wiki · Grafana · FireEye 등 여러 인프라 도구와 운영 프로세스가 분산돼 있어, 서버 상태와 운영 정보를 하나의 기준으로 확인하기 어려웠습니다.",
    context: ["대규모 서버 운영 환경", "CTO 직속 조직", "한국 ↔ 필리핀 개발팀 간 협업 구조"],
    action: [
      "실제 운영 workflow와 반복 업무 분석",
      "FireEye · Grafana · Datadog · Slack 등 기존 도구 조사",
      "서버 관제 Dashboard UIUX와 Load · Autoscaling 정책 설계",
      "한국 · 필리핀 개발팀 간 Roadmap 기반 협업 구조로 진행",
    ],
    result: ["대규모 서버 운영 환경을 위한 통합 관제 · 업무 시스템 기획", "내부 운영 효율 개선 방향 수립"],
    ctaHref: "/projects#other-projects",
    ctaLabel: "Other Projects에서 더 보기 →",
  },
];

export type OperatingModelStep = { step: string; description: string };

// The old 6-step Principle/Listen/.../Deliver breakdown, condensed to one
// line per step — same process, now a supporting summary beneath the
// case studies rather than the page's lead content.
export const operatingModel: OperatingModelStep[] = [
  { step: "Listen", description: "고객 VOC · 엔지니어 · 영업 요구 수집" },
  { step: "Judge", description: "문제 · 제약 · 영향도 구조화" },
  { step: "Decide", description: "Scope · Priority · Trade-off 결정" },
  { step: "Align", description: "이해관계자 합의" },
  { step: "Deliver", description: "제품 출시 · 운영 · 개선" },
];

export const closingStatement =
  "이 사례들은 결과로 증명된 판단의 기록입니다. 앞으로도 같은 기준으로, 제약 안에서 실행 가능한 답을 만들어 갑니다.";

export const executionToolkitTitle = "Execution Toolkit";
export const executionToolkitDescription = [
  "아이디어를 문서에 머물게 하지 않고,",
  "검증 가능한 화면과 데이터, 실행 가능한 업무 단위로 구체화합니다.",
];

export type ExecutionToolkitItem = {
  num: string;
  title: string;
  body: string[];
  tools: string[];
  workflow?: string[];
};

export const executionToolkit: ExecutionToolkitItem[] = [
  {
    num: "01",
    title: "기획안 & 프로토타이핑",
    body: [
      "요구사항을 문서로만 전달하지 않고, PM이 직접 목표 화면에 가까운 프로토타입까지 제작합니다.",
      "디자인이 적용되기 전 단계에서도 개발자가 실제 동작 화면을 기준으로 기능 흐름과 개발 의도를 이해할 수 있도록 하며, 구현 가능성(Feasibility)과 필요한 API·데이터 구조를 보다 구체적으로 확인합니다.",
      "이를 통해 기획 → 디자인 → 개발 사이의 해석 차이를 줄이고, 개발 착수 전에 목표 결과물에 대한 공통 이해를 만듭니다.",
    ],
    tools: ["Figma", "Claude", "ChatGPT"],
  },
  {
    num: "02",
    title: "데이터 기반 우선순위 & 의사결정",
    body: [
      "VOC와 현업 요구사항을 단순 요청 목록으로 관리하지 않고, 분류 가능한 데이터로 전환해 반복되는 문제와 영향도를 분석합니다.",
      "ClickUp에서 VOC와 요구사항을 수집·분류하고, 누적된 데이터를 ChatGPT를 활용해 유형·빈도·핵심 이슈 중심으로 분석한 뒤 의사결정에 활용할 수 있는 보고서 형태로 구조화합니다.",
      "분석 결과를 바탕으로 선행 과제를 선정하고 한정된 개발 리소스를 우선순위에 따라 배분해, 목표 일정 안에서 PoC와 Release 범위를 관리합니다.",
    ],
    tools: ["ClickUp", "ChatGPT"],
    workflow: ["VOC 수집", "Categorization", "AI-assisted Analysis", "Priority Decision", "Report"],
  },
  {
    num: "03",
    title: "프로젝트 관리 & 개발 협업",
    body: [
      "개발팀과 일정만 관리하는 것이 아니라, 개발이 빠르게 시작될 수 있도록 기획 단계에서 구현 기준을 구체화합니다.",
      "기획안을 프로토타입 수준까지 작성해 목표 화면과 기능 흐름을 명확히 하고, 디자인 완성 이전에도 API와 Backend 개발이 먼저 착수할 수 있도록 개발·디자인·기획의 선행 조건과 작업 순서를 조율합니다.",
      "요구사항, 일정, 이슈와 의사결정 내용을 지속적으로 문서화해 여러 팀이 같은 목표와 기준을 공유하도록 Align합니다.",
    ],
    tools: ["ClickUp", "Notion", "Jira", "Confluence"],
  },
];
