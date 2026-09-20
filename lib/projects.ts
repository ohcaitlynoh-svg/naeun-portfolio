export type Project = {
  slug: string;
  name: string;
  domain: string;
  oneLiner: string;
  role: string;
  keyResult: string;
  summary: string;
  problem: string;
  complexity: string;
  evidence: string;
  constraints: string;
  decision: string;
  tradeoff: string;
  systemDesign: string;
  collaboration: string;
  impact: string;
  learning: string;
  // Optional: the representative image for Home/Projects-index cards — a
  // real screenshot/slide, reused as-is (never a new/fabricated asset).
  // fit/position are presentation-only (never crop the source file itself):
  // "cover" fills the frame (default "center" position unless overridden);
  // "contain" (default) shows the whole asset, letterboxed if needed.
  cardVisual?: {
    src: string;
    alt: string;
    fit?: "cover" | "contain";
    position?: string;
    // Modest zoom (e.g. 1.08) to close some of a "contain"-fitted image's
    // letterboxing when it's mostly whitespace — kept small deliberately
    // so it never approaches cropping real content (logos, titles).
    scale?: number;
  };
  // Optional fit/position/scale override used only by the "large" /projects
  // index card — Home's compact card keeps cardVisual's own values. The
  // two contexts have different aspect ratios/sizes, so the best-looking
  // crop for one isn't always the best for the other.
  cardVisualLarge?: {
    fit?: "cover" | "contain";
    position?: string;
    scale?: number;
  };
  // Optional: powers the detail-page hero strip (see app/projects/[slug]/page.tsx).
  fullName?: string;
  heroRole?: string;
  heroTeam?: string;
  heroPeriod?: string;
  heroScope?: string[];
  heroKeyResult?: string[];
  // Optional: powers the compressed EXEM-style case study — Problem +
  // Constraints, Decision Framework, 3 Decision Cases, From Decision to
  // Delivery, Impact + Learning (see app/projects/[slug]/page.tsx). When
  // present, these replace the generic placeholder fields below.
  problemParagraphs?: string[];
  keyMessage?: string;
  constraintItems?: { num: string; title: string; description: string }[];
  decisionPrinciplesIntro?: string;
  decisionPrinciples?: string[];
  decisionPrinciplesConclusion?: string;
  decisionExamples?: {
    title: string;
    paragraph: string;
    altLabel?: string;
    bullets?: string[];
  }[];
  deliverySummary?: {
    governanceFlow: string;
    deliveryFlow: string[];
    implementationFocus: { title: string; phrase: string }[];
    images: {
      num: string;
      subtitle: string;
      captionTitle: string;
      captionText: string;
    }[];
  };
  impactSection?: {
    intro: string;
    keyResultsLabel: string;
    keyResults: { label: string; description: string }[];
    expansionLabel: string;
    expansionIntro: string;
    expansionBullets: string[];
    expansionOutro: string;
    messageLabel: string;
    message: string;
  };
  learningSection?: {
    learnings: { label: string; text: string }[];
  };
  // Optional: a fully custom, ordered set of case-study sections that
  // REPLACES the generic Problem/Complexity/Evidence/.../Learning fields
  // below. Used for projects whose narrative doesn't fit the EXEM template.
  customSections?: {
    title: string;
    // "detail" lowers this section's visual weight (smaller heading, muted)
    // without removing content — used for supporting/optional-read sections.
    emphasis?: "detail";
    // When set, this section's whole body is wrapped in <details>/<summary>,
    // collapsed by default — content stays in the DOM, just opt-in to read.
    collapsible?: { summary: string };
    blocks: (
      | { type: "p"; text: string }
      | {
          type: "bullets";
          intro?: string;
          items: string[];
          outro?: string;
          muted?: boolean;
          // Wraps just this block in <details>/<summary>, collapsed by default.
          collapsible?: { summary: string };
        }
      | { type: "flow"; items: string[] }
      // Same items as "flow", but drawn as an inline line/node diagram
      // instead of a text-and-arrow list — no image, no card.
      | { type: "flowDiagram"; items: string[] }
      // "src" is optional: without it, renders the existing dashed
      // "Image Placeholder" box (used by projects with no real asset yet).
      // width/height are the real file's intrinsic pixel size, used only
      // to size the <img> before load — the image is always displayed at
      // its own aspect ratio (width: 100%; height: auto), never cropped.
      | {
          type: "images";
          // 3 (default, unchanged) or 2 — a wider column for real evidence
          // shots whose on-screen text needs to stay legible.
          columns?: 2 | 3;
          // A single image that's deliberately kept small — supporting
          // evidence, not a result to feature. Ignored unless there's
          // exactly one item.
          compact?: boolean;
          items: {
            num: string;
            caption: string;
            src?: string;
            alt?: string;
            width?: number;
            height?: number;
          }[];
        }
      // A single large, full-bleed image — for the one flagship result
      // shot a case study wants to lead with, distinct from the smaller
      // "images" evidence grid above. Same optional-src placeholder
      // fallback as "images".
      | {
          type: "heroImage";
          caption: string;
          src?: string;
          alt?: string;
          width?: number;
          height?: number;
        }
      // Title + one-line judgment, divided by hairlines (same visual
      // language as the old EXEM-template "3 Decision Cases" list).
      | { type: "titledItems"; items: { title: string; text: string }[] }
      // Big-number result grid (same visual language as the old
      // EXEM-template Impact + Learning key-results grid).
      | { type: "impactGrid"; items: { label: string; description: string }[] }
    )[];
  }[];
};

// NOTE: All narrative fields below are placeholders.
// Replace each [bracketed] line with real project content —
// nothing here beyond the project name/domain has been invented.
export const projects: Project[] = [
  {
    slug: "exem",
    name: "EXEM",
    domain: "Enterprise Observability",
    cardVisual: {
      src: "/exem/exem-network-performance-dashboard.png",
      alt: "EXEM unified monitoring dashboard",
      // The dashboard's nav/filter chrome is generic UI; biasing the crop
      // toward the right keeps the charts + network topology (the actual
      // evidence) fully in frame instead of centering into the sidebar.
      fit: "cover",
      position: "85% center",
    },
    // /projects' compact 3-up grid has more image height to work with, so
    // the whole dashboard fits legibly without needing the Home crop.
    cardVisualLarge: { fit: "contain" },
    oneLiner: "분산된 모니터링 환경을 하나의 통합 Observability 제품으로 재구성",
    role: "Senior Product Manager",
    keyResult:
      "6개월 내 통합 MVP 출시\n\nEnterprise PoC·계약 과정에서\n약 40억 원 규모 사업성과에 기여",
    fullName: "EXEMONE",
    heroRole: "Senior Product Manager",
    heroTeam: "기획 8명 리드 · 개발 약 60명 협업",
    heroPeriod: "2023.10.30 – 2025.07.24",
    heroScope: ["APM", "DPM", "Cloud", "Kubernetes", "AI Monitoring"],
    heroKeyResult: [
      "6개월 내 통합 MVP 출시",
      "Enterprise PoC·계약 과정에서 약 40억 원 규모 사업성과에 기여",
    ],
    customSections: [
      {
        title: "Problem",
        blocks: [
          {
            type: "bullets",
            items: [
              "APM·DPM·Cloud 등 여러 제품과 화면에 모니터링이 흩어져 있어, 고객이 시스템 상태를 하나의 기준으로 파악하기 어려웠습니다.",
              "고객사별 요구가 서로 달라, 요청을 그대로 반영하면 제품 복잡도와 유지보수 부담이 커지는 구조였습니다.",
              "비딩 기반 납품으로 일정이 사실상 고정되어 있어, 통합 방향과 우선순위를 빠르게 판단해야 했습니다.",
            ],
          },
        ],
      },
      {
        title: "Decision Framework",
        blocks: [
          {
            type: "p",
            text: "통합 제품의 구현 방식과 범위를 아래 기준으로 판단했습니다.",
          },
          {
            type: "bullets",
            items: [
              "제품의 핵심 목적과 범위에 부합하는가",
              "고정된 일정 안에 구현 가능한가",
              "다수 고객에게 반복적으로 필요한 요구인가",
              "기존 사용성과 안정성을 해치지 않는가",
              "기존 기능·자사 제품·내부/외부 API로 대체 가능한가",
            ],
          },
        ],
      },
      {
        title: "Final Product",
        blocks: [
          {
            type: "p",
            text: "APM·DPM·Cloud로 흩어져 있던 모니터링 화면을 하나의 제품 구조로 통합했습니다. 아래는 네트워크·인프라 모니터링 영역을 하나의 화면에서 탐색할 수 있도록 구성한 대표 화면입니다.",
          },
          {
            type: "heroImage",
            src: "/exem/exem-network-performance-dashboard.png",
            alt: "Network Performance Monitoring 통합 대시보드",
            width: 1672,
            height: 941,
            caption:
              "Network Performance Monitoring — 네트워크 상태와 성능 지표를 한 화면에서 탐색할 수 있도록 구성한 통합 모니터링 화면",
          },
        ],
      },
      {
        title: "Product Expansion · AI Anomaly Detection",
        emphasis: "detail",
        blocks: [
          {
            type: "p",
            text: "통합 제품 위에서 AI 이상 탐지 영역으로 확장한 사례입니다.",
          },
          {
            type: "images",
            columns: 2,
            items: [
              {
                num: "01",
                src: "/exem/exem-final-dashboard.png",
                alt: "AI 이상 탐지 대시보드",
                width: 1448,
                height: 1086,
                caption: "AI 이상 탐지 대시보드",
              },
              {
                num: "02",
                src: "/exem/exem-anomaly-scenario.png",
                alt: "이상 탐지 시나리오를 정의한 기획서",
                width: 915,
                height: 766,
                caption: "이상 탐지 시나리오를 정의한 기획서",
              },
              {
                num: "03",
                src: "/exem/exem-anomaly-detail.png",
                alt: "정보 위계를 재구성한 annotated 화면",
                width: 898,
                height: 769,
                caption: "정보 위계를 재구성한 annotated 화면",
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
                title: "01 · 제품 경계 재정의",
                text: "제품 목적과 무관한 요청은 범위 밖으로 정의하고, 반복되는 요구만 공통 기능으로 흡수했다.",
              },
              {
                title: "02 · 정보 구조 통합",
                text: "APM·DPM·Cloud로 흩어진 화면을 하나의 정보 구조 안에서 탐색할 수 있도록 재구성했다.",
              },
              {
                title: "03 · 확장 가능한 연동 구조 설계",
                text: "특정 Vendor에 종속되지 않도록 Custom API 방식으로 외부 연동 확장성을 확보했다.",
              },
              {
                title: "04 · 고영향 요구의 분리",
                text: "범용성은 낮지만 사업적으로 중요한 대규모 고객 요구는 전용 Branch로 분리해 공통 제품을 보호했다.",
              },
            ],
          },
        ],
      },
      {
        title: "Evidence & Process",
        blocks: [
          { type: "p", text: "완성형 화면에 이르기까지의 판단 근거입니다." },
          {
            type: "images",
            columns: 2,
            items: [
              {
                num: "01",
                src: "/exem/exem-monitoring-detail.png",
                alt: "통합 화면 설계를 구체화한 상세 기획",
                width: 895,
                height: 513,
                caption: "통합 화면 설계를 구체화한 상세 기획",
              },
            ],
          },
        ],
      },
      {
        title: "Impact",
        blocks: [
          {
            type: "impactGrid",
            items: [
              { label: "6 Months", description: "통합 Observability MVP 출시" },
              { label: "v3.0", description: "제품 고도화 및 Version 확장" },
              { label: "GS", description: "GS 인증" },
              {
                label: "Enterprise",
                description:
                  "LG PoC 및 Samsung 등 Enterprise 고객 계약 과정에 제품 활용",
              },
              {
                label: "Business Impact",
                description: "약 40억 원 규모 사업성과에 기여",
              },
            ],
          },
          {
            type: "p",
            text: "MVP 이후 Cloud·Kubernetes·AI 이상 탐지 등으로 제품 영역을 단계적으로 확장했습니다.",
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
                text: "고객 요구 반영보다 제품 역할 유지를 우선했다 — 맞지 않으면 다른 제품·연동으로 해결했다.",
              },
              {
                title: "Delivery Risk",
                text: "납기가 고정된 프로젝트에서는 기획 단계의 기술 검증이 Delivery Risk를 줄였다.",
              },
              {
                title: "Product Asset",
                text: "반복 가능성 있는 요구는 단발성 Custom이 아니라 제품 자산으로 검토했다.",
              },
            ],
          },
        ],
      },
    ],
    summary: "[Project Summary — 프로젝트 개요를 입력해주세요.]",
    problem: "[Problem — 어떤 문제를 다뤘는지 입력해주세요.]",
    complexity: "[Complexity — 문제가 왜 복잡했는지 입력해주세요.]",
    evidence: "[Evidence — 문제를 뒷받침하는 근거/데이터를 입력해주세요.]",
    constraints: "[Constraints — 일정, 리소스, 기술적 제약 등을 입력해주세요.]",
    decision: "[Decision — 어떤 결정을 내렸는지 입력해주세요.]",
    tradeoff: "[Trade-off — 그 결정으로 포기한 것은 무엇인지 입력해주세요.]",
    systemDesign:
      "[System / Policy Design — 시스템/정책적으로 어떻게 설계했는지 입력해주세요.]",
    collaboration: "[Collaboration — 어떤 팀/역할과 협업했는지 입력해주세요.]",
    impact: "[Impact — 결과로 어떤 임팩트가 있었는지 입력해주세요.]",
    learning: "[Learning — 이 프로젝트에서 배운 점을 입력해주세요.]",
  },
  {
    slug: "flor-momento",
    name: "Flor Momento",
    domain: "Subscription Platform / 0→1",
    cardVisual: {
      src: "/flor/flor-final-product-home.png",
      alt: "Flor Momento subscription product home screen",
    },
    // Cropped to the top of the page (brand, nav, hero banner) rather than
    // showing the whole tall page shrunk down to illegible size.
    cardVisualLarge: { fit: "cover", position: "center top" },
    oneLiner: "수동 예약·배송 운영을\n정기구독 제품과 운영 시스템으로 전환",
    role: "Founder / Product Manager",
    heroPeriod: "2018.08.08 – 2021.03",
    keyResult:
      "정기배송 플랫폼 출시\n\n예비창업패키지 선정\n\nB2C에서 B2B 모듈 판매까지 수익모델 확장",
    customSections: [
      {
        title: "Problem",
        blocks: [
          {
            type: "p",
            text: "조문장식·핸드크래프트 제품은 주문 이후 제작·일정·배송 관리가 복잡했고,\n반복 배송에서는 단순 주문 기능만으로 운영이 어려웠습니다.",
          },
          {
            type: "bullets",
            items: ["예약", "일정 관리", "배송 관리", "고객 알림"],
            outro: "등 반복 업무를 수작업에 의존해 운영 부담이 컸습니다.",
          },
          {
            type: "p",
            text: "1인 사업자·소규모 운영자에게는 기존 이커머스 기능이 과도하거나 맞지 않았습니다.",
          },
        ],
      },
      {
        title: "Product Opportunity",
        blocks: [
          {
            type: "p",
            text: "단순 쇼핑몰이 아니라 정기배송 운영 자체를 제품화해야 한다고 판단했습니다.",
          },
          {
            type: "p",
            text: "핵심 문제를 주문이 아니라 반복 운영으로 재정의하고,\n실제 업무를 제품 기능으로 전환했습니다.",
          },
        ],
      },
      {
        title: "Final Product",
        blocks: [
          {
            type: "heroImage",
            src: "/flor/flor-final-product-home.png",
            alt: "실제 운영된 Flor Momento 서비스 메인 화면",
            width: 874,
            height: 882,
            caption: "실제 운영된 Flor Momento 서비스 메인 화면",
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
              "1인 사업자에게 필요한 핵심 기능만 남기는 경량화",
              "일반 커머스 전체 기능보다 일정관리·반복배송 운영에 집중",
              "B2C로 끝내지 않고 커스터마이징 가능한 모듈 구조로 확장",
              "실제 구현 가능한 수준으로 화면·정책·기능 정의",
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
                alt: "정기배송 서비스 구조와 운영 화면을 정의한 실제 기획 자료",
                width: 2488,
                height: 1148,
                caption:
                  "정기배송 서비스 구조와 운영 화면을 정의한 실제 기획 자료",
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
              "사업 및 제품 기획",
              "서비스 구조 정의",
              "고객 Journey 및 정기배송 Logic 설계",
              "화면 / 기능 / 운영 정책 정의",
              "외주 개발·디자인 협업",
              "출시 및 운영",
              "모듈 판매 등 수익화",
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
              "중소벤처기업부 예비창업패키지 선정",
              "B2C 실제 운영",
              "기능 모듈화 / B2B 판매",
            ],
          },
          {
            type: "images",
            compact: true,
            items: [
              {
                num: "01",
                src: "/flor/flor-startup-package.png",
                alt: "예비창업패키지 선정을 보여주는 보조 자료",
                width: 338,
                height: 368,
                caption: "예비창업패키지 선정 보조 자료",
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
              "운영 문제를 먼저 이해해야 실제 제품 구조가 나온다는 점",
              "기능을 많이 넣는 것보다 핵심 반복 업무를 제품화하는 것이 중요하다는 점",
              "단일 서비스 기능도 구조화하면 다른 사업자에게 재사용 가능한 제품이 될 수 있다는 점",
            ],
          },
        ],
      },
    ],
    summary: "[Project Summary — 프로젝트 개요를 입력해주세요.]",
    problem: "[Problem — 어떤 문제를 다뤘는지 입력해주세요.]",
    complexity: "[Complexity — 문제가 왜 복잡했는지 입력해주세요.]",
    evidence: "[Evidence — 문제를 뒷받침하는 근거/데이터를 입력해주세요.]",
    constraints: "[Constraints — 일정, 리소스, 기술적 제약 등을 입력해주세요.]",
    decision: "[Decision — 어떤 결정을 내렸는지 입력해주세요.]",
    tradeoff: "[Trade-off — 그 결정으로 포기한 것은 무엇인지 입력해주세요.]",
    systemDesign:
      "[System / Policy Design — 시스템/정책적으로 어떻게 설계했는지 입력해주세요.]",
    collaboration: "[Collaboration — 어떤 팀/역할과 협업했는지 입력해주세요.]",
    impact: "[Impact — 결과로 어떤 임팩트가 있었는지 입력해주세요.]",
    learning: "[Learning — 이 프로젝트에서 배운 점을 입력해주세요.]",
  },
  {
    slug: "readykorea",
    name: "ReadyKorea",
    domain: "e-Government / Global Localization",
    cardVisual: {
      src: "/readykorea/readykorea-worldbank-npts-cover.png",
      alt: "World Bank / Belarus NPTS Technical Assistance final presentation title slide",
    },
    // Contain keeps the logo/title/flag safe; a small zoom closes some of
    // the slide's own whitespace margin without reaching them.
    cardVisualLarge: { scale: 1.08 },
    oneLiner:
      "현지 행정·무역 프로세스를 분석해\n한국형 전자정부 시스템을 Localization",
    role: "Product Manager / IT Expert\n5명의 PM 중 1인 · 시스템 기획·현지화 담당",
    heroPeriod: "2015.09.21 – 2018.02.28",
    keyResult:
      "2억 원 규모 World Bank 컨설팅 프로젝트 수행\n\n약 200억 원 규모 전자정부 ICT 구축 프로젝트 수행",
    customSections: [
      {
        // Titled "Project Cover" (not "Overview") to avoid colliding with
        // the hero-meta block's own permanent id="overview" wrapper in
        // ProjectDetailView.tsx — both would otherwise slugify to the same
        // "overview" id, an invalid duplicate that broke this section's
        // SectionIndicator entry.
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
            text: "한국의 전자정부·전자무역 시스템을 벨라루스 환경에 적용하는 Global Consulting 및 구축 프로젝트였습니다.",
          },
          {
            type: "p",
            text: "한국은 항공·항만 중심 무역 환경이지만 벨라루스는 육로 중심 환경으로,",
          },
          {
            type: "bullets",
            items: ["법", "행정 절차", "무역 환경", "기관 구조", "시스템 환경"],
            outro: "이 모두 달라, 단순 UI 변경으로는 해결할 수 없는 차이였습니다.",
          },
        ],
      },
      {
        title: "Research / Evidence",
        blocks: [
          {
            type: "bullets",
            items: [
              "벨라루스 정부 담당자 및 현업 인터뷰",
              "현지 행정 업무 분석",
              "전자무역 업무 분석",
              "러시아–벨라루스 연계 시스템 조사",
              "기존 전자정부·전자무역 시스템 현황 조사",
              "국내 시스템과 현지 시스템 비교",
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
              "현지 업무 조사",
              "AS-IS 프로세스 구조화",
              "한국 시스템과 Gap 분석",
              "현지 적용 가능한 기능·구조 정의",
              "TO-BE Flow / System / Dashboard 설계",
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
              "한국 시스템을 그대로 복제하지 않고 현지 업무에 맞게 구조 변경",
              "현지 업무 흐름을 기준으로 메뉴·시스템 구조 재구성",
              "국가별 시스템·문서 흐름 차이 반영",
              "필요한 모듈·기능의 우선순위 결정",
              "여러 기관 요구를 하나의 시스템 구조로 정리",
            ],
          },
        ],
      },
      {
        title: "Implementation Roadmap",
        blocks: [
          {
            type: "p",
            text: "World Bank NPTS 프로젝트의 실제 구축 범위와 단계별 계획입니다: Legal and Governance Framework, Paperless Portal System, Cargo·Goods Management & Monitoring System, Technical Architecture System, Global Transaction System.",
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
            text: "아래 산출물은 작업 결과물이 아니라, 어떤 복잡성을 정리하고 어떤 결정을 가능하게 했는지 보여주는 Evidence입니다.",
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
              { num: "03", caption: "화면설계서 / Prototype" },
            ],
          },
        ],
      },
      {
        title: "Stakeholder Alignment",
        blocks: [
          {
            type: "flow",
            items: ["기관별 요구 수집", "시스템 요구로 구조화", "보고 및 합의"],
          },
          {
            type: "bullets",
            items: [
              "World Bank",
              "한국 / 벨라루스 정부기관",
              "KTNET",
              "NIA / NIPA",
              "현지 개발 조직",
              "국내 개발 · 기획 · 디자인 조직",
            ],
          },
          {
            type: "bullets",
            muted: true,
            collapsible: { summary: "View ownership details" },
            items: [
              "현지 업무·시스템 분석",
              "AS-IS / TO-BE 설계",
              "시스템 · 화면 · 프로세스 기획",
              "현지화 요구사항 정의",
              "프로젝트 일정·인력 관리",
              "다기관 커뮤니케이션",
              "한/영 보고서 및 World Bank 제출 자료 작성",
              "개발·디자인 조직 조율",
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
              "2억 원 규모 World Bank 컨설팅 프로젝트 수행",
              "약 200억 원 규모 벨라루스 전자정부 ICT 구축 프로젝트 수행",
              "한국형 전자정부·전자무역 시스템을 현지 환경에 맞게 설계",
              "한국–벨라루스–우크라이나 기획·개발·디자인 협업 경험",
            ],
          },
          {
            type: "bullets",
            intro: "Learning",
            items: [
              "Localization은 번역이 아니라 업무·제도·시스템 구조를 다시 설계하는 일이라는 점",
              "복잡한 프로젝트일수록 AS-IS를 정확히 구조화해야 TO-BE가 나온다는 점",
              "여러 기관의 요구를 그대로 병합하지 않고 시스템 기준으로 정리해야 한다는 점",
            ],
          },
        ],
      },
    ],
    summary: "[Project Summary — 프로젝트 개요를 입력해주세요.]",
    problem: "[Problem — 어떤 문제를 다뤘는지 입력해주세요.]",
    complexity: "[Complexity — 문제가 왜 복잡했는지 입력해주세요.]",
    evidence: "[Evidence — 문제를 뒷받침하는 근거/데이터를 입력해주세요.]",
    constraints: "[Constraints — 일정, 리소스, 기술적 제약 등을 입력해주세요.]",
    decision: "[Decision — 어떤 결정을 내렸는지 입력해주세요.]",
    tradeoff: "[Trade-off — 그 결정으로 포기한 것은 무엇인지 입력해주세요.]",
    systemDesign:
      "[System / Policy Design — 시스템/정책적으로 어떻게 설계했는지 입력해주세요.]",
    collaboration: "[Collaboration — 어떤 팀/역할과 협업했는지 입력해주세요.]",
    impact: "[Impact — 결과로 어떤 임팩트가 있었는지 입력해주세요.]",
    learning: "[Learning — 이 프로젝트에서 배운 점을 입력해주세요.]",
  },
];
