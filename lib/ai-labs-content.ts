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
  // Not every AI Labs project has a tracked date range (these are personal
  // experiments, not career entries), so left unset rather than guessed.
  period?: string;
  // Thumbnail/banner image only — no title/description text baked into the
  // image itself. Left unset until a real file exists under
  // public/ai-labs/<slug>-cover.png; the card falls back to a plain
  // placeholder (same pattern as components/ProjectCard.tsx) rather than
  // pointing at a file that doesn't exist yet.
  coverImage?: string;
  // The 4 modal sections, always in this order: 시작 배경 / 주요 기능 /
  // 지속적 개선 / 성과 및 회고.
  sections: AiLabSection[];
  link?: string;
};

export const aiLabsProjects: AiLabProject[] = [
  {
    slug: "ai-portfolio",
    title: "AI와 함께 만든 PM 포트폴리오",
    subtitle:
      "AI를 활용해 포트폴리오 정보 구조를 재정리하고, 콘텐츠 구조화·UI 개선·카피 다듬기까지 반복적으로 실험하며 직접 구축한 프로젝트.",
    sections: [
      {
        title: "시작 배경",
        bullets: [
          "긴 경력과 다양한 프로젝트를 하나의 포트폴리오로 정리하는 과정에서, 정보 구조와 우선순위를 빠르게 실험할 필요가 있었음",
          "정적 문서가 아닌 실제 배포 가능한 웹 포트폴리오 형태로 구현하며, 기획자의 사고와 결과물을 함께 보여주는 것을 목표로 함",
        ],
      },
      {
        title: "주요 기능",
        bullets: [
          "포트폴리오 IA 재구성 및 페이지 구조 설계",
          "About / How I Work / Core Projects / AI Labs 구조 설계",
          "카드, 모달, 인디케이터, 프로젝트 상세 페이지 설계",
          "AI와 협업하여 카피라이팅, 구조 정리, QA 포인트 도출 반복",
        ],
      },
      {
        title: "지속적 개선",
        bullets: [
          "섹션 간 위계, 콘텐츠 폭, 정렬 기준을 반복 조정",
          "프로젝트 카드/히어로/인디케이터의 일관된 레이아웃 규칙 수립",
          "모바일/데스크톱에서의 가독성과 시각적 밀도를 지속적으로 보정",
        ],
      },
      {
        title: "성과 및 회고",
        bullets: [
          "문서형 이력서가 아닌, 실제 탐색 가능한 포트폴리오 형태로 전환",
          "기획/설계/검수 전 과정을 AI와 협업하는 방식으로 실험",
          "빠른 시도와 수정에는 강하지만, 최종 구조화와 품질 판단은 사람의 역할이 중요하다는 점을 확인",
        ],
      },
    ],
  },
  {
    slug: "career-translator",
    title: "직장인을 위한 AI 경력 번역기",
    subtitle:
      "채용 공고의 표현과 개인 경력의 표현 사이 간극을 줄여, JD에 맞는 언어로 이력서와 경력 내용을 재구성해주는 AI 도구 기획.",
    sections: [
      {
        title: "시작 배경",
        bullets: [
          "실제 이직 과정에서, 같은 경험도 표현 방식에 따라 전달력이 크게 달라진다는 문제를 체감",
          "JD와 경력기술서 사이의 언어 차이를 줄이는 도구가 있으면 지원 효율이 높아질 것이라 판단",
        ],
      },
      {
        title: "주요 기능",
        bullets: [
          "JD 핵심 키워드 추출",
          "사용자의 경력 문장과 JD 요구사항 간 의미 매칭",
          "유사 레벨/유사 의미 워딩 추천",
          "이력서 bullet / 경력기술서 / 자기소개용 문장 자동 재구성",
          "PM/PO/Product Lead 포지션 중심의 표현 가이드 제안",
        ],
      },
      {
        title: "지속적 개선",
        bullets: [
          "단순 키워드 치환이 아니라 맥락 기반 표현 변환으로 개선",
          "포지션/연차/도메인별 추천 문장 톤 차별화",
          "경력 과장 없이 사실 범위 내에서 설득력 있게 재표현하는 로직 보완",
        ],
      },
      {
        title: "성과 및 회고",
        bullets: [
          "구직자 관점에서 가장 실용적인 AI 보조 도구 중 하나가 될 가능성을 확인",
          "표현 최적화는 가능하지만, 사실 검증과 우선순위 판단은 사용자 주도성이 필요",
          "향후 실제 프로토타입으로 발전 가능한 주제",
        ],
      },
    ],
  },
  {
    slug: "classical-creative-workflow",
    title: "AI 클래식 채널 크리에이티브 워크플로우",
    subtitle:
      "AI를 활용해 클래식 음악 기반 콘텐츠 기획, 이미지 생성, 영상 편집, 발행까지 연결하는 개인 크리에이티브 운영 실험.",
    sections: [
      {
        title: "시작 배경",
        bullets: [
          "음악 콘텐츠를 혼자 제작하고 운영하는 과정에서, 기획부터 비주얼, 편집, 발행까지의 제작 부담을 줄일 방법이 필요했음",
          "AI 도구를 조합해 소규모 크리에이티브 파이프라인을 직접 실험",
        ],
      },
      {
        title: "주요 기능",
        bullets: [
          "GPT 기반 콘텐츠 기획 및 프롬프트 작성",
          "Suno를 활용한 음악 제작 실험",
          "Midjourney 기반 이미지 제작",
          "CapCut / ALLO / Canva를 활용한 영상 편집 및 패키징",
          "하나의 음악 아이디어를 썸네일, 영상, 업로드 에셋까지 연결하는 제작 흐름 구축",
        ],
      },
      {
        title: "지속적 개선",
        bullets: [
          "프롬프트 구조를 반복 개선해 결과물 일관성 향상",
          "음악-이미지-영상 간 톤앤매너 정렬",
          "짧은 제작 시간 안에서 반복 가능한 운영 방식 정리",
        ],
      },
      {
        title: "성과 및 회고",
        bullets: [
          "개인 창작자도 AI 조합만으로 기획-제작-발행까지 연결 가능한 워크플로우를 구축할 수 있음을 확인",
          "각 도구의 품질보다, 전체 파이프라인을 어떻게 연결하느냐가 더 중요하다는 점을 체감",
          "향후 클래식 기반 영상 콘텐츠 운영과 자동화 실험으로 확장 가능",
        ],
      },
    ],
  },
];
