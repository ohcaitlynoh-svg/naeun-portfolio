// Optional, hand-authored expanded content for "Other Projects" entries on
// /projects — keyed by the exact `company` field used in
// lib/about-content.ts's careerTimeline/freelanceExperience arrays (NOT a
// new display name — "Aladin Market" is shown via `projectName` but keyed
// under "Aladin Communication" so its period stays the one verified date).
// Content here is sourced from the user's own Notion career/planning
// notes; dates are never duplicated here — always read from
// careerTimeline/freelanceExperience, the single source of truth for
// periods. Unverified figures (e.g. old Notion metrics for Aladin Market)
// are deliberately omitted, not estimated or rewritten.
export type OtherProjectSnapshot = {
  // The specific product/client name worked on, when it differs from the
  // company/agency name already shown as the row header (e.g. "Aladin
  // Market" under the "Aladin Communication" row).
  projectName?: string;
  role?: string;
  domain?: string;
  summary: string[];
  // Simple bullet list of scope items (no sub-grouping).
  keyScope?: string[];
  products?: { name: string; items: string[] }[];
  // Flat bullet list — use this OR workedOnGroups, not both.
  workedOn?: string[];
  // Grouped bullet lists under their own sub-labels.
  workedOnGroups?: { group: string; items: string[] }[];
  // A distinct secondary initiative worth naming but not a full section.
  secondaryProject?: { title: string; items: string[] };
  // One closing "Key Story"/"Key Product Decision" line, only when there
  // genuinely is one.
  keyDecision?: string;
  // Small clarifying caveat (e.g. consulting-context disclaimer), shown
  // in muted text.
  note?: string;
  // Real product/evidence screenshots ONLY — never set this for a file
  // that doesn't exist yet under public/others/. app/projects/page.tsx
  // renders the gallery purely based on whether this array is present and
  // non-empty; there is no placeholder/fallback UI for a missing image,
  // by design (see the per-company "planned assets" comments below for
  // the filenames to wire in once each real file is added).
  assets?: { src: string; alt: string; caption?: string }[];
};

export const otherProjectSnapshots: Record<string, OtherProjectSnapshot> = {
  Biginsight: {
    assets: [
      { src: "/others/biginsight-evidence-01.png", alt: "Biginsight 제품 화면 1" },
      { src: "/others/biginsight-evidence-02.png", alt: "Biginsight 제품 화면 2" },
      { src: "/others/biginsight-evidence-03.png", alt: "Biginsight 제품 화면 3" },
      { src: "/others/biginsight-evidence-04.png", alt: "Biginsight 제품 화면 4" },
    ],
    role: "Product Management / Product Owner\n파트장 / Senior PM",
    domain: "CRM · CDP · Ads · Marketing SaaS",
    summary: [
      "200개 이상 고객사가 여러 광고매체에서 운영하는 캠페인을",
      "개별로 등록·진행·관리해야 하는 CS 운영 복잡도를",
      "제품 구조로 흡수해 자동화했습니다.",
    ],
    keyScope: [
      "CS 부서가 200개 이상 고객사 캠페인 운영 지원",
      "4개 주요 광고매체 연동",
      "일괄 등록·진행·관리 구조로 전환",
      "월간 성과 리포트 표준화",
      "롯데 계열사 대상 약 20대 서버 규모 POC",
    ],
    workedOnGroups: [
      {
        group: "Product Decision",
        items: [
          "여러 고객사의 캠페인을 여러 광고매체에서 개별 등록·진행·관리해야 하는 CS 운영 복잡도가 핵심 문제",
          "캠페인 기능을 하나 더 만드는 대신, 이 운영 업무 자체를 제품 구조로 흡수하고 자동화하는 방향으로 판단",
        ],
      },
      {
        group: "Product Change",
        items: [
          "개별 등록 → 일괄 등록",
          "개별 진행 → 일괄 진행",
          "개별 관리 → 일괄 관리",
          "매체별 개별 처리 → 자동 구분 / 매체 연동",
        ],
      },
      {
        group: "Reporting Standardization",
        items: [
          "월 1회 정기 성과 리포트의 정보 구조와 시각화 기준 표준화",
          "지표별 그래프 유형 정의",
          "1개월 단위 데이터 조회 기준 및 쿼리 구조 설계",
          "CS가 데이터를 통계화해 발송할 수 있는 리포팅 프로세스 설계",
        ],
      },
      {
        group: "POC",
        items: ["롯데 계열사 대상 초기 POC", "약 20대 서버 규모로 진행"],
      },
    ],
    keyDecision:
      "200개 이상 고객사 × 4개 광고매체의 캠페인 운영 복잡도를 일괄 등록·진행·관리 구조로 제품화한 경험입니다.",
  },
  "Aladin Communication": {
    projectName: "Aladin Market",
    assets: [
      { src: "/others/aladin-evidence-01.png", alt: "Aladin Market 제품 화면 1" },
      { src: "/others/aladin-evidence-02.png", alt: "Aladin Market 제품 화면 2" },
    ],
    role: "Service Planning\nPlanning Part Lead",
    domain: "C2C Commerce · Marketplace · Mobile App · UX Planning",
    summary: [
      "중고거래의 탐색부터 상품 등록, 배송, 거래 완료 후 평가까지",
      "핵심 사용자 여정을 재설계하고",
      "화면뿐 아니라 거래 정책과 Interaction을 함께 정의했습니다.",
    ],
    keyScope: [
      "Main Page renewal",
      "Product Detail renewal",
      "Product Registration renewal",
      "Shipping Method TO-BE",
      "Post-transaction Seller / Buyer Rating",
      "Region Selection UX",
      "App Event Planning",
      "Backoffice Planning",
    ],
    workedOnGroups: [
      {
        group: "Transaction Experience",
        items: [
          "메인 / 상세 / 상품등록 주요 화면 개편",
          "배송방법 선택 흐름 AS-IS / TO-BE 분석",
          "지역 선택 UX",
          "거래 과정의 주요 interaction 정리",
        ],
      },
      {
        group: "Post-Transaction Experience",
        items: [
          "판매자 ↔ 구매자 상호 평가 화면",
          "평가 항목 정의",
          "평가 방식 / 표현 기준 정의",
        ],
      },
      {
        group: "Event / Growth",
        items: [
          "월별 앱 이벤트 및 프로모션 기획",
          "상품등록 / 구매 / 배송 관련 이벤트 기획",
        ],
      },
    ],
  },
  Cafe24: {
    assets: [
      { src: "/others/cafe24-evidence-01.png", alt: "Cafe24 제품 화면 1" },
      { src: "/others/cafe24-evidence-02.png", alt: "Cafe24 제품 화면 2" },
    ],
    role: "Infrastructure Planning Team\nService / UIUX Planning\nCTO-direct organization",
    domain: "Server Infrastructure · Monitoring · Internal Platform · UIUX",
    summary: [
      "약 1,000~1,500대 규모 서버 운영 환경에서",
      "여러 운영 도구와 모니터링 정보를 하나의 내부 UI로 구조화하고,",
      "Axure prototype과 운영 정책을 기반으로 개발 협업을 진행했습니다.",
    ],
    keyScope: [
      "약 1,000~1,500대 규모 서버 운영 환경",
      "Slack / Jira / Wiki / Grafana / 보안 / 서버 모니터링 등 운영 도구 통합",
      "Load / Autoscaling 운영 정책 정리",
      "Axure prototype 기반 기획",
      "한국 / 필리핀 개발 협업",
    ],
    workedOnGroups: [
      {
        group: "Infrastructure",
        items: [
          "서버 관제 Dashboard UIUX",
          "Load / Autoscaling 정책 정의",
          "Slack / Jira / Wiki / Grafana / 보안 / 서버 모니터링 등 기존 운영 도구 분석",
          "각 개발팀 업무 프로세스 분석",
          "자동화가 필요한 업무 파악",
          "Scenario / Screen Spec",
          "Terminology / Feature Definition",
          "Wireframe / Axure Prototype",
        ],
      },
      {
        group: "Collaboration",
        items: [
          "Korea development team ↔ Philippines development team",
          "Roadmap 기반 협업",
          "JIRA testing management",
        ],
      },
    ],
    secondaryProject: {
      title: "SNS 기반 신규 commerce platform 기획",
      items: [
        "Instagram 기반 shopping concept",
        "influencer commerce",
        "backend planning",
        "Shopify reverse analysis",
        "business feasibility review",
      ],
    },
  },
  Storelink: {
    domain: "Marketing · CRM · Monitoring",
    summary: [
      "신규 IT 사업을 위한 기획 조직과 업무 체계를 정리하고",
      "마케팅 / CRM Monitoring Product의 초기 기획을 수행.",
    ],
    keyScope: [
      "Planning team building",
      "기획 문서 체계",
      "업무 프로세스",
      "기획자 평가 기준",
      "Marketing / CRM Monitoring 초기 Product Planning",
    ],
  },
  // Planned asset: assets: [{ src: "/others/Eastend_operations-dashboard.png", alt: "Eastend operations dashboard", caption: "Operations Dashboard" }],
  Eastend: {
    domain: "Fashion Wholesale · Inventory · Operations Dashboard",
    summary: [
      "의류 도매·유통 운영의 재고, 생산, 출고 흐름을",
      "Dashboard Product 구조로 전환하기 위한 초기 기획 컨설팅.",
    ],
    keyScope: [
      "IT team setup",
      "Documentation",
      "User Interview",
      "업무 프로세스 / Scenario diagram",
      "Inventory / Production / Shipping Dashboard",
      "Product Definition for IR",
    ],
  },
  // Planned asset: assets: [{ src: "/others/Asiance_data-platform.png", alt: "Asiance Korea data platform dashboard", caption: "Data Platform" }],
  "Asiance Korea": {
    domain: "Luxury Commerce · Data Platform · Global Brand",
    summary: [
      "해외 럭셔리 브랜드의 국내 진출을 지원하기 위한",
      "데이터 분석 플랫폼 구축 환경과 초기 Product Structure를 기획.",
    ],
    keyScope: [
      "External development partner coordination",
      "Instagram / Facebook(Meta) / Google / Kakao data integration dashboard",
      "UIUX draft",
      "Wireframe / Prototype",
      "User Interview",
      "User Scenario / Workflow",
      "Kakao chatbot related feature planning",
    ],
    note: "관련 브랜드(컨설팅 기준): Chanel · Gucci · Jimmy Choo · Tom Ford · LVMH 등 — 브랜드의 공식 제품을 직접 소유·운영한 것이 아닌 컨설팅/기획 참여 기준입니다.",
  },
  // Planned asset: assets: [{ src: "/others/Sesun_commerce-operations.png", alt: "Sesun Electronics commerce operations", caption: "Commerce Operations" }],
  "Sesun Electronics": {
    domain: "Commerce · O2O · Operations",
    summary: [
      "방송장비 판매·납품 업무를 온라인 commerce와 운영 관리 흐름으로",
      "정리하고 반복 업무 자동화를 기획.",
    ],
    keyScope: [
      "O2O Service Planning",
      "자사몰 / ESM / Naver 등 온라인 판매 운영",
      "판매 / 회원 데이터 관리 프로그램",
      "Product Operation",
      "공공기관 / 군부대 납품 관리 프로세스 자동화",
    ],
  },
  // Planned asset: assets: [{ src: "/others/Yuratech_sap-mm.png", alt: "Yuratech SAP MM module screen", caption: "SAP MM" }],
  Yuratech: {
    role: "Overseas Purchasing",
    domain: "Manufacturing · Overseas Purchasing · SAP ERP",
    summary: [
      "자동차 이그니션 시스템 원자재의 해외 구매·통관 업무를 담당하면서",
      "SAP ERP 구축 TFT에서 MM Module 현업 담당자로 참여한 경험.",
    ],
    keyScope: [
      "미국 / 독일 / 일본 공급사 협업",
      "특수금속 수입",
      "통관 / 관세 / 관세환급 / VAT 비용 관리",
      "SAP ERP replacement TFT",
      "MM module 현업 참여",
    ],
    keyDecision:
      "현업 업무 구조와 ERP 시스템 구축을 동시에 경험하며, 이후 IT / Product Planning으로 경력을 전환하게 된 출발점이었습니다.",
  },
  "Hyundai Home Shopping": {
    role: "MD Intern\nBeauty / General Merchandise Team",
    summary: ["커리어 초기의 commerce / merchandising 경험입니다."],
  },
};
