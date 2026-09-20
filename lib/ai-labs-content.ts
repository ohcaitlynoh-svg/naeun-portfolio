// Shared between Home's short "AI Labs" teaser and the dedicated /ai-labs
// page's card + modal. All card/modal text is read from this file — never
// hardcoded into an image — so future edits only ever touch this file.
export const aiLabsIntro = [
  "AI를 활용해 기획부터 제작, 운영까지 직접 실험한 개인 프로젝트입니다.",
  "완료되는 대로 이 영역에 계속 추가할 예정입니다.",
];

export type AiLabSection = {
  title: string;
  bullets: string[];
};

export type AiLabProject = {
  slug: string;
  title: string;
  // One-line description — shown on the card (wraps to ~2-3 lines at card
  // width) and again at the top of the modal.
  subtitle: string;
  status: string;
  // Thumbnail/banner image only — no title/description/number text baked
  // into the image itself. Swapping in a real project screenshot later is
  // just replacing the file at this same path; no content-code change.
  coverImage: string;
  // The 4 modal sections, always in this order: 시작 배경 / 주요 기능 /
  // 지속적 개선 / 성과 및 회고.
  sections: AiLabSection[];
};

export const aiLabsProjects: AiLabProject[] = [
  {
    slug: "ai-portfolio",
    title: "AI를 활용한 PM 포트폴리오 제작",
    subtitle:
      "AI와 협업해 정보 구조, UI, 콘텐츠, QA까지 반복 개선하며 직접 구축한 웹 포트폴리오",
    status: "진행 중",
    coverImage: "/ai-labs/ai-portfolio-cover.png",
    sections: [
      {
        title: "시작 배경",
        bullets: [
          "다양한 경력과 프로젝트를 문서형 이력서가 아니라 실제 탐색 가능한 웹 포트폴리오로 재구성하고자 시작",
          "긴 경력 정보를 어떻게 구조화하고 우선순위를 보여줄지 반복적으로 검증할 필요가 있었음",
        ],
      },
      {
        title: "주요 기능",
        bullets: [
          "Portfolio IA 설계",
          "Home / About / How I Work / Core Projects / AI Labs 구조 설계",
          "카드, 모달, Section Indicator, Case Study 구조 설계",
          "AI와 협업해 카피라이팅, UI 개선, QA, 구조 변경 반복",
        ],
      },
      {
        title: "지속적 개선",
        bullets: [
          "Hero와 각 페이지 content width system 통일",
          "카드 및 long-form page hierarchy 조정",
          "responsive / spacing / alignment 지속 개선",
          "AI가 제안한 결과를 그대로 쓰지 않고 실제 화면을 기준으로 반복 검수",
        ],
      },
      {
        title: "성과 및 회고",
        bullets: [
          "문서형 경력 정리에서 실제 배포 가능한 제품 형태의 포트폴리오로 전환",
          "PM이 AI와 협업하며 구조 설계 → 구현 → QA → 배포까지 연결하는 workflow 경험",
          "빠른 구현에는 AI가 효과적이지만 최종 구조와 품질 판단은 사람의 역할이라는 점 확인",
        ],
      },
    ],
  },
  {
    slug: "career-translator",
    title: "직장인을 위한 AI 경력 번역기",
    subtitle:
      "JD와 이력서의 표현을 의미 단위로 연결해 지원 포지션에 맞는 경력 문장으로 재구성하는 AI 도구",
    status: "진행 중",
    coverImage: "/ai-labs/career-translator-cover.png",
    sections: [
      {
        title: "시작 배경",
        bullets: [
          "실제 경험은 충분하지만 JD와 이력서가 서로 다른 언어를 사용해 강점이 전달되지 않는 문제에서 출발",
          "단순 키워드 복사가 아니라 경력의 의미와 수준을 유지하면서 채용 언어로 번역하는 도구를 목표로 함",
        ],
      },
      {
        title: "주요 기능",
        bullets: [
          "JD 핵심 역할 / 역량 / 키워드 추출",
          "사용자 이력서 경험과 JD 요구사항 의미 매칭",
          "유사 의미 / 유사 seniority 표현 연결",
          "사실 범위 안에서 경력 bullet 재작성",
          "지원 포지션별 요약 문장 생성",
          "예상 Flow: JD 입력 → 핵심 요구사항 추출 → 이력서 경험 구조화 → 의미 · 수준 매칭 → Gap 확인 → 추천 워딩 생성 → 이력서 문장 재구성",
        ],
      },
      {
        title: "지속적 개선",
        bullets: [
          "단순 keyword matching에서 semantic matching으로 고도화",
          "직무 / 연차 / 도메인에 따른 표현 차이 반영",
          "사용자가 실제 수행하지 않은 경험을 생성하지 않도록 검증 단계 강화",
          "ATS 최적화와 사람에게 자연스러운 문장 사이 균형 개선",
        ],
      },
      {
        title: "성과 및 회고",
        bullets: [
          "현재는 제품 가설 및 프로토타입 단계",
          "실제 제작 완료 후 실제 화면과 사용 결과로 업데이트 예정",
          "개인 구직 문제를 AI Product로 전환하는 실험",
        ],
      },
    ],
  },
  {
    slug: "ai-classical-workflow",
    title: "AI 클래식 채널 운영 실험",
    subtitle:
      "AI 도구를 연결해 클래식 음악 콘텐츠의 기획, 제작, 편집, 발행까지 직접 운영하는 크리에이티브 실험",
    status: "운영 중",
    coverImage: "/ai-labs/ai-classical-workflow-cover.png",
    sections: [
      {
        title: "시작 배경",
        bullets: [
          "개인이 음악 콘텐츠를 지속적으로 제작하려면 음악, 비주얼, 영상, 썸네일, 발행까지 여러 제작 업무가 필요",
          "여러 AI 도구를 연결하면 1인이 어디까지 반복 가능한 콘텐츠 제작 파이프라인을 만들 수 있는지 실험",
        ],
      },
      {
        title: "주요 기능",
        bullets: [
          "GPT → 음악 콘셉트 및 프롬프트 작성",
          "Suno → 클래식 기반 음악 제작",
          "Midjourney → 곡의 분위기에 맞는 visual asset 제작",
          "CapCut → 영상 편집",
          "ALLO → 영상 / 모션 관련 제작 보조",
          "Canva → 썸네일 및 publishing asset 제작",
          "YouTube → 실제 콘텐츠 발행 및 운영",
        ],
      },
      {
        title: "지속적 개선",
        bullets: [
          "음악과 visual tone의 일관성 개선",
          "프롬프트 구조 반복 개선",
          "short-form / long-form 콘텐츠 포맷 테스트",
          "제작 시간과 품질 사이 workflow 최적화",
          "실제 발행 데이터를 보며 콘텐츠 형식 지속 조정",
        ],
      },
      {
        title: "성과 및 회고",
        bullets: [
          "AI 기반 음악 / 이미지 / 영상 도구를 하나의 운영 workflow로 연결",
          "결과물 생성보다 여러 도구 사이의 연결 방식과 반복 가능한 프로세스 설계가 중요하다는 점 확인",
          "실제 상업적 발행까지 연결해 AI creative workflow의 실사용 가능성을 검증 중",
        ],
      },
    ],
  },
];
