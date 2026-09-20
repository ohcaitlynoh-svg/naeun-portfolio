# Senior PM Portfolio Guide

## 1. Global Principles

이 포트폴리오는 단순한 화면설계서나 산출물 모음이 아니라,
“복잡한 상황에서 어떤 판단을 했고, 그 판단을 어떻게 실행으로 연결했는가”
를 보여주는 것을 목표로 한다.

핵심 원칙:

- UI보다 System
- 산출물보다 Decision
- 업무 나열보다 Ownership
- 프로세스보다 Trade-off
- 출시보다 Impact
- “무엇을 했다”보다 “왜 그렇게 판단했는가”가 먼저 보여야 한다.
- 화면, 와이어프레임, 정책서, Diagram 등은 주인공이 아니라 판단과 실행을 증명하는 Evidence로 사용한다.
- 숫자가 없으면 억지로 만들지 않는다.
- 모든 표현은 실제 경험에 기반하며 새로운 사실을 만들어내지 않는다.
- 단독 의사결정권자처럼 과장하지 않는다.
- 반대로 단순 요구사항 전달자나 화면 설계자로 약하게 보이지 않게 한다.
- PM의 실제 역할은 요구를 해석하고, 구현 범위·방식·우선순위·정책·UX·개발 명세를 결정하고 조직과 조율하는 것으로 표현한다.

대표 프로젝트:
1. EXEM
2. Flor Momento
3. ReadyKorea

세 프로젝트는 서로 다른 역량을 증명해야 한다.

---

# 2. EXEM Case Study

## Core Positioning

EXEM 프로젝트에서 보여줄 핵심:

“B2B Enterprise 고객 요구와 내부 제약을 함께 듣고,
제품 목적·일정·리소스·사용성을 기준으로
구현 방식과 범위를 판단한 PM”

단순히 고객 VOC를 받아 기능을 만든 프로젝트로 보이면 안 된다.

## Decision Flow

고객 요구 / 사업 조건
+
개발 / 디자인 / 엔지니어 / 영업 / 경영 의견

↓

제품 적합성 / 일정 / 리소스 / 범용성 / 사용성 검토

↓

구현 전략 결정

↓

개발 가능성 및 일정 검증

↓

필요 시 본부 / 영업 / 엔지니어 / 경영 합의

↓

Delivery

## Decision Context

- B2B Enterprise 납품형 제품
- 대부분 비딩을 통해 고객사에 납품
- 고객이 원하는 납기일은 사실상 고정
- 온프렘 제품 특성상 잦은 패치가 어려움
- 고객사별 요구가 상이함
- 개발 리소스와 기술 준비도가 제한적
- 고객 요구와 내부 의견을 동등하게 청취

## Decision Criteria

고객 요구를 그대로 구현하지 않고 아래를 기준으로 판단한다.

1. 제품의 목적과 성격에 맞는가
2. 일정 내 구현 가능한가
3. 특정 고객뿐 아니라 반복 가능한 요구인가
4. 기존 사용성과 제품 구조를 해치지 않는가
5. 기존 기능 / 자사 제품 / API로 대체 가능한가

## Product Boundary / Decision Pattern

판단 결과에 따라 다음 방식 중 하나를 선택한다.

- 공통 제품 기능으로 반영
- 기존 기능 유지
- 자사 제품 / 내부 API 연계
- 사용자 Custom API 제공
- 대규모 고객 전용 Branch / Version
- 제품 Scope 밖이면 기각 또는 다른 제품으로 이관

예:
- 인프라 Health Check 제품에 네트워크 / 장비 모니터링 요청이 들어오면 제품 Scope 밖으로 판단
- 자사 제품 기능으로 해결 가능하면 내부 API로 연계
- 외부 제품 연동이 필요하면 특정 Vendor 종속 기능보다 Custom API 방식 제공
- 사업적으로 중요한 대규모 고객 요구지만 범용성이 낮으면 별도 Branch / Version으로 분리
- 단, 기존 UX와 제품 Tone & Manner를 훼손하는 경우에는 그대로 반영하지 않음

## Delivery Decision

납기일이 고정되어 있기 때문에
개발 단계에서 발생하는 재작업과 리소스 낭비를 줄이는 것을 중요하게 판단했다.

- 기획 단계에서 구현 범위와 개발 명세를 최대한 구체화
- 개발자별 숙련도 및 기술 준비도 고려
- 사전 Study가 필요한 경우 일정 Buffer 제공
- 팀 단위 일정 조정이 필요하면 개발팀장과 협의
- PM이 일방적으로 일정을 정하는 방식이 아니라 개발 가능성과 준비도를 확인한 뒤 확정

## PM Ownership

- 고객 요구와 RFP를 제품 요구로 해석
- View / 기능 범위 / 정책 / UX / 개발 명세 정의
- 제품 반영 방식과 우선순위 1차 판단
- 개발 가능성 및 일정 검증
- 개발·디자인·영업·엔지니어 조직과 조율
- 사업 영향과 Scope가 큰 사안은 본부 / 영업 / 엔지니어 / 경영과 합의

Decision Governance:

PM 1차 판단
→ 개발팀 기술 / 일정 검증
→ 사업 영향이 큰 사안은 본부 / 영업 / 엔지니어 / 경영 합의

## Recommended Structure

1. Overview
2. Problem + Constraints
3. Decision Framework
4. Decision Cases
5. From Decision to Delivery
6. Impact + Learning

---

# 3. Flor Momento Case Study

## Core Positioning

Flor Momento에서 보여줄 핵심:

“수동 예약·일정·배송 운영 문제를
반복 가능한 Subscription Product와 운영 구조로 제품화한 0→1 경험”

EXEM처럼 Enterprise 의사결정 프로젝트로 보이면 안 된다.

핵심은:
운영 문제 발견
→ 반복 업무 구조화
→ Product Logic 설계
→ 실제 서비스 구현
→ B2B 모듈 확장

## Problem

- 조문장식 / 핸드크래프트 제품은 주문 이후 제작·일정·배송 관리가 복잡함
- 반복 배송은 단순 주문 기능만으로 운영하기 어려움
- 수동 예약과 일정 관리에 의존할 경우 반복 주문 증가와 함께 운영 부담 증가
- 1인 사업자 / 소규모 운영자에게 기존 이커머스 기능은 과도하거나 맞지 않음

## Product Opportunity

단순 쇼핑몰이 아니라
“정기배송 운영 자체를 제품화해야 한다”고 판단.

핵심 문제를 다음으로 정의:

- 주문
- 반복 일정
- 정기배송
- 알림
- 배송 상태
- 판매자 운영

## Operating Logic

기능 나열이 아니라 Lifecycle로 보여준다.

Subscription Order
→ Schedule
→ Production / Preparation
→ Delivery
→ Status / Alert
→ Repeat

핵심 Logic:

- 정기결제
- 상품 주문
- 배송 일정
- 알림
- 배송 진행상태 시각화
- 판매자 운영 흐름
- 반복 배송 일정 관리

## Product Decisions

- 1인 사업자에게 필요한 핵심 기능 중심으로 경량화
- 일반 이커머스 전체 기능보다 일정관리와 반복배송 운영에 집중
- B2C 서비스에서 끝내지 않고 커스터마이징 가능한 모듈 구조로 확장
- 외주 개발사와 협업해 실제 구현 가능한 수준으로 화면·정책·기능 정의

## Ownership

기여도 100% 같은 표현은 사용하지 않는다.

실제 책임 범위:

- 사업 및 제품 기획
- 서비스 구조 정의
- 고객 Journey 및 정기배송 Logic 설계
- 화면 / 기능 / 운영 정책 정의
- 외주 개발·디자인 협업
- 출시 및 운영
- 모듈 판매 등 수익화

## Impact

검증 가능한 결과만 사용:

- 중소벤처기업부 예비창업패키지 선정
- 정기배송 플랫폼 출시
- B2C 서비스 운영
- 기능 모듈화
- B2B 판매 / 커스터마이징 활용
- 수익화 경험
- 사업 Exit 경험

Exit 형태는 확인되지 않았으므로
인수, M&A 등으로 표현하지 않는다.

## Learning

- 운영 문제를 먼저 이해해야 실제 제품 구조가 나온다.
- 기능을 많이 넣는 것보다 반복 업무를 제품화하는 것이 중요하다.
- 단일 서비스 기능도 구조화하면 다른 사업자에게 재사용 가능한 제품이 될 수 있다.

## Recommended Structure

1. Overview
2. Problem
3. Product Opportunity
4. Operating Logic / Lifecycle
5. Product Decisions
6. Ownership & Delivery
7. Impact + Learning

EXEM보다 짧게 유지한다.

---

# 4. ReadyKorea Case Study

## Core Positioning

ReadyKorea에서 보여줄 핵심:

“복잡한 국가 단위 업무·제도·시스템을 구조화하고
현지 환경에 맞는 TO-BE 시스템으로 Localization한 경험”

단순 해외 프로젝트나 화면기획 사례로 보이면 안 된다.

핵심은:
Research
→ AS-IS
→ Gap
→ TO-BE
→ System Design
→ Multi-stakeholder Alignment

## Complexity

- 한국과 벨라루스의 행정·무역 환경 차이
- 한국은 항공 / 항만 중심, 벨라루스는 육로 중심 무역 환경
- 현지 법령, 정부기관, 전자문서 흐름, 기존 시스템 구조가 다름
- World Bank, 한국/벨라루스 정부기관, KTNET 등 다수 이해관계자 참여
- 단순 UI 변경으로 해결할 수 없는 업무·제도·시스템 차이 존재

## Research / Evidence

- 현지 정부기관 및 현업 인터뷰
- AS-IS 업무 프로세스 분석
- 전자정부 / 전자무역 시스템 현황 조사
- 러시아-벨라루스 연계 시스템 조사
- 전자문서 흐름 구조화
- 국내 시스템과 현지 시스템 비교

## Problem Structuring

단순히 “Localization했다”고 쓰지 않는다.

현지 업무 조사
→ AS-IS 구조화
→ 한국 시스템과 Gap 분석
→ 현지 적용 가능한 기능 / 구조 정의
→ TO-BE Flow / System / Dashboard 설계

## Key Decisions

- 한국 시스템을 그대로 복제하지 않음
- 현지 업무 흐름에 맞게 시스템 구조 변경
- 국가별 문서 / 시스템 연계 차이 반영
- 필요한 모듈과 기능의 우선순위 결정
- 기관별 요구를 하나의 시스템 구조로 정리

## System Thinking

아래 산출물은 Evidence로 사용:

- AS-IS / TO-BE Flow Chart
- System Architecture
- Interface 구조
- Dashboard
- 화면설계서
- 용어 / 기능 정의서
- Prototype

문서 자체보다
“이 구조가 어떤 복잡성을 정리했고 어떤 의사결정을 가능하게 했는가”
가 보이게 한다.

## Stakeholder Alignment

실제 이해관계자:

- World Bank
- 한국 / 벨라루스 정부기관
- KTNET
- NIA / NIPA
- 현지 개발 조직
- 국내 개발·기획·디자인 조직

단순 “협업”으로 쓰지 않는다.

기관별 요구 수집
→ 차이 확인
→ 시스템 요구로 구조화
→ 개발 / 일정 / 인력 조율
→ 보고 및 합의

## Ownership

실제 책임 범위:

- 현지 업무 / 시스템 분석
- AS-IS / TO-BE 설계
- 시스템 / 화면 / 프로세스 기획
- 현지화 요구사항 정의
- 프로젝트 일정·인력 관리
- 다기관 커뮤니케이션
- 한/영 보고서 작성
- World Bank 제출 자료 작성
- 개발·디자인 조직 조율

프로젝트 전체를 혼자 결정한 것처럼 표현하지 않는다.
5명의 PM 중 1인이라는 맥락을 유지하면서
내가 담당한 시스템 기획과 Localization 영역의 Ownership을 명확히 보여준다.

## Impact

검증 가능한 결과:

- 2억 원 규모 World Bank 컨설팅 프로젝트 수행
- 약 200억 원 규모 벨라루스 전자정부 ICT 구축 프로젝트 수행
- 한국형 전자정부 / 전자무역 시스템을 현지 환경에 맞게 설계
- 한국–벨라루스–우크라이나 기획·개발·디자인 협업

“내가 200억 수주를 만들었다”처럼 개인 인과관계를 과장하지 않는다.

## Learning

- Localization은 번역이 아니라 업무·제도·시스템 구조를 다시 설계하는 일이다.
- 복잡한 프로젝트일수록 AS-IS를 정확히 구조화해야 TO-BE가 나온다.
- 여러 기관 요구를 그대로 병합하는 것이 아니라 시스템 기준으로 정리해야 한다.

## Recommended Structure

1. Overview
2. Complexity
3. Research / Evidence
4. AS-IS → Gap → TO-BE
5. Key Decisions
6. System Design Evidence
7. Stakeholder Alignment
8. Impact + Learning

---

# 5. Writing Rules

- 한 문장에 메시지 하나만 담는다.
- 긴 설명문보다 짧은 Decision 문장을 사용한다.
- Product Strategy / Execution / Impact 같은 반복 제목 남발 금지
- “기여도 80%, 100%” 표현은 지양
- 실제 책임 범위로 Ownership을 표현
- 과장된 인과관계 금지
- “견인”, “주도”, “총괄” 등의 표현은 실제 근거가 있을 때만 사용
- 기술 구현을 직접 한 것처럼 표현하지 않는다.
- 개발 조직을 직접 리딩한 것처럼 과장하지 않는다.
- “한국판 Datadog” 같은 마케팅성 표현 사용 금지
- 존재하지 않는 지표나 성과를 만들지 않는다.
- 숫자가 없으면 실제 운영 변화나 사업 결과를 사용한다.

---

# 6. Design Rules

- minimal editorial style
- 과도한 카드 금지
- 아이콘 남발 금지
- gradient 금지
- decorative UI 최소화
- 큰 Typography + 충분한 whitespace
- product screenshot / diagram을 Evidence로 사용
- muted deep blue #3a4a63만 accent color로 제한적으로 사용
- 화면보다 Decision과 Information Hierarchy가 먼저 보이게 한다.
- 모든 프로젝트 페이지는 같은 디자인 언어를 사용하되 섹션 구조는 동일하게 복제하지 않는다.

---

# 7. Portfolio Role of Each Project

EXEM
→ B2B Enterprise Product Decision
→ 고객 요구 + 내부 제약 + 구현 전략 + Delivery

Flor Momento
→ 0→1 Product
→ 운영 문제 발견 + Business Logic + 반복 가능한 제품 구조 + 수익화

ReadyKorea
→ System Thinking / Localization
→ 복잡한 업무·제도 구조화 + TO-BE 시스템 설계 + 다기관 조율

세 프로젝트가 같은 강점을 반복하지 않도록 한다.
