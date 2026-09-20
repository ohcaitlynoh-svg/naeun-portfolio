# Naeun Oh — Senior Product Manager Portfolio Spec

## 0. Purpose

이 문서는 Naeun Oh의 Senior Product Manager 웹 포트폴리오를 구현하기 위한 Single Source of Truth다.

이 포트폴리오의 목적은 단순히 경력과 화면 산출물을 나열하는 것이 아니다.

채용 담당자와 Product Leader가 아래를 빠르게 이해할 수 있어야 한다.

- 어떤 문제를 다뤄왔는가
- 어떤 기준으로 판단하는가
- 고객 요구를 어떻게 제품 결정으로 바꾸는가
- 기술 / 일정 / 사업 제약 안에서 어떤 Trade-off를 만드는가
- 여러 이해관계자를 어떻게 조율하는가
- 그 판단이 실제 출시와 사업 결과로 어떻게 이어졌는가

핵심 원칙:

UI보다 System  
산출물보다 Decision  
업무 나열보다 Ownership  
프로세스보다 Trade-off  
출시보다 Impact


---

# 1. Information Architecture

Navigation

- Home
- How I Work
- Projects
- About
- Contact


## Home

역할:
이 사람이 어떤 PM인지 빠르게 이해시키는 페이지

포함:
- Hero
- PM Positioning
- How I Work Preview
- Selected Projects
- Contact CTA

금지:
- 상세 Career Timeline
- 프로젝트 상세 설명 반복
- 긴 경력 기술


## How I Work

역할:
PM으로서 요구사항을 어떻게 듣고,
어떤 기준으로 판단하고,
어떻게 조직과 합의해 Delivery까지 연결하는지 설명


## Projects

역할:
대표 프로젝트 3개의 Index

프로젝트:
1. EXEMONE
2. Flor Momento
3. ReadyKorea

Home의 프로젝트 내용을 그대로 반복하지 말고,
각 프로젝트의 차별점을 강조한다.


## About

역할:
Career Journey와 Product Domain 확장을 설명

포함:
- Career Timeline
- Product Domains
- Leadership
- Closing Statement

금지:
- 프로젝트 상세 Case Study 반복


## Project Detail

역할:
실제 PM 의사결정과 실행 경험을 증명

기본 흐름:

Problem
→ Complexity
→ Evidence
→ Constraints
→ Decision
→ Trade-off
→ System / Product Design
→ Collaboration
→ Impact
→ Learning


---

# 2. Home

## Hero

Name

오나은  
Naeun Oh

Title

Senior Product Manager

Main Message

고객과 내부 조직의 요구를 함께 듣고,  
제약 안에서 실행 가능한 제품 결정으로 연결하는  
Senior Product Manager

Supporting Message

0→1 제품부터 Enterprise B2B 제품까지  
제품의 문제를 구조화하고,  
구현 방식과 우선순위를 결정하며  
출시와 사업 결과까지 연결해왔습니다.


## How I Make Product Decisions

Flow

Listen
→ Analyze
→ Decide
→ Align
→ Deliver

Supporting Text

고객 요구를 그대로 구현하기보다  
제품의 목적, 일정, 기술 제약, 범용성, 기존 사용성을 함께 고려해  
지속 가능한 구현 방식과 범위를 결정합니다.


## Selected Projects

### 01 EXEMONE

Domain

Enterprise Observability

One Line

분산된 모니터링 환경을 하나의 통합 Observability 제품으로 재구성

Role

Senior Product Manager

Team

기획 8명 리드  
개발 약 60명 협업

Key Result

6개월 내 통합 MVP 출시

Enterprise PoC·계약 과정에서  
약 40억 원 규모 사업성과에 기여

CTA

View Case Study


### 02 Flor Momento

Domain

Subscription Platform / 0→1

One Line

수동 예약·배송 운영을  
정기구독 제품과 운영 시스템으로 전환

Role

Founder / Product Manager

Key Result

정기배송 플랫폼 출시

예비창업패키지 선정

B2C에서 B2B 모듈 판매까지 수익모델 확장

CTA

View Case Study


### 03 ReadyKorea

Domain

e-Government / Global Localization

One Line

현지 행정·무역 프로세스를 분석해  
한국형 전자정부 시스템을 Localization

Role

Product Manager / IT Expert

Key Result

2억 원 규모 World Bank 컨설팅 프로젝트 수행

약 200억 원 규모 전자정부 ICT 구축 프로젝트 수행

CTA

View Case Study


---

# 3. How I Work

## Intro

고객 VOC와 내부 개발 / 영업 / 엔지니어 의견을 동등하게 듣는 것에서 시작해,  
명확한 기준으로 구현 방식과 범위를 판단하고  
관련 조직과 합의해 Delivery까지 연결합니다.


## Decision Flow

01 Listen  
02 Analyze  
03 Decide  
04 Align  
05 Deliver


## Listening: Internal & External Voice

### External

- 고객 VOC
- 영업 / RFP
- 시장 / 경쟁사
- Enterprise 고객 납기 조건


### Internal

- 개발
- 디자인 / UX
- 기획 / 제품
- 엔지니어
- 경영 / 유관부서


## Judgment Criteria

### Product Fit

요구사항이 제품의 핵심 목적과 범위에 부합하는지 먼저 판단합니다.

제품 성격을 벗어나는 요구는  
다른 자사 제품으로 이관하거나 제외합니다.


### 일정과 개발 리소스

B2B 납품 일정이 고정된 경우가 많기 때문에,  
개발 가능성과 사전 준비가 필요한 기술 영역을 확인한 뒤  
개발팀과 협의해 현실적인 일정과 범위를 정합니다.


### 범용성

특정 고객만을 위한 기능인지,  
다른 고객에게도 반복적으로 필요한 공통 요구인지 구분합니다.

공통성이 높은 요구는 제품 기능으로 우선 검토합니다.


### 기존 사용성

이미 배포된 온프레미스 제품은  
잦은 패치가 어렵기 때문에

기존 사용 흐름과 안정성을 최대한 유지하면서  
변경 범위를 결정합니다.


### 시스템 확장성

기존 자사 제품의 기능으로 해결할 수 있다면  
내부 API 연계를 우선합니다.

외부 제품 연동이 필요한 경우에는  
특정 제품에 종속되지 않도록  
사용자가 API를 Custom할 수 있는 방식도 검토합니다.


### 사업 영향도

범용성은 낮지만  
대규모 고객의 강한 요구가 있는 경우에는

공통 제품을 훼손하지 않는 범위에서  
고객 전용 Branch 또는 Version으로 분리합니다.


## Decision Types

### Common Product

여러 고객에게 반복적으로 필요한 요구

→ 공통 제품 기능으로 반영


### Keep Existing

변경 효과보다 기존 사용성 훼손 위험이 큰 경우

→ 기존 기능 유지


### Internal Integration

자사 다른 제품의 기능으로 해결 가능한 경우

→ 내부 API 연계


### Custom API

외부 시스템 연동 요구가 다양하고  
특정 Vendor에 종속되면 안 되는 경우

→ 사용자 Custom API 제공


### Customer-specific Version

사업 영향은 크지만  
공통 제품에 넣기 어려운 요구

→ 고객 전용 Branch / Version


### Reject / Redirect

제품의 본래 목적과 범위를 벗어나는 요구

→ 기각 또는 다른 제품으로 이관


## Alignment

### Level 01 — Product / UX Decision

기획 / PM에서 먼저 안을 정의

- 고객 요구 해석
- View 구조
- 기능 범위
- UX 방향
- 개발 명세
- 우선순위


### Level 02 — Technical Feasibility

개발자 및 개발팀장과 검증

- 구현 가능성
- 기술 난이도
- 사전 Study
- 개발 리소스
- 일정


### Level 03 — Business / Scope Decision

제품 Scope 또는 사업 영향이 큰 사안은

- 본부장
- 경영회의
- 영업
- 엔지니어
- 개발 조직

과 함께 최종 방향을 결정


## Core Message

PM의 역할을  
모든 것을 혼자 결정하는 것으로 보지 않습니다.

필요한 정보를 먼저 구조화하고,  
결정 가능한 안을 만든 뒤,

영향도에 맞는 사람들과 합의해  
실행 가능한 결정으로 만드는 것이  
PM의 역할이라고 생각합니다.


---

# 4. Projects Index

Page Title

Selected Projects

Intro

제품 유형과 조직 환경은 달랐지만  
각 프로젝트에서 반복적으로 맡아온 역할은

복잡한 문제를 구조화하고,  
구현 가능한 범위를 결정하고,  
여러 조직을 연결해 실제 제품과 사업 결과로 만드는 일이었습니다.


## 01 EXEMONE

Domain

Enterprise Observability

Keyword

Decision / Trade-off / Enterprise Product

Summary

분산된 모니터링 환경에서  
고객 요구와 내부 기술 제약을 함께 고려해  
통합 제품의 구현 방식과 범위를 결정

Representative Result

6개월 MVP 출시  
Enterprise 사업성과 기여


## 02 Flor Momento

Domain

Subscription Platform

Keyword

0→1 / Business Logic / Operations

Summary

수동 예약·배송 운영을  
정기배송 제품과 운영 시스템으로 전환

Representative Result

플랫폼 출시  
B2C → B2B 수익모델 확장


## 03 ReadyKorea

Domain

e-Government Localization

Keyword

Complexity / System Thinking / Global Stakeholder

Summary

현지 업무와 시스템을 분석해  
한국형 전자정부 모델을  
현지 환경에 맞는 TO-BE 시스템으로 재설계

Representative Result

World Bank 컨설팅  
전자정부 ICT 구축 프로젝트 수행


---

# 5. EXEMONE Case Study

## Project Summary

Project

EXEMONE

Domain

Enterprise Observability

Role

Senior Product Manager

Team

기획 8명 리드  
개발 약 60명 협업

Period

2023–2025

Scope

- APM
- DPM
- Cloud
- Kubernetes
- AI Monitoring


## Key Results

6 Months

통합 Observability MVP 출시


v3.0

제품 고도화


GS

GS 인증


Enterprise

PoC 및 고객 계약 활용


Business Impact

약 40억 원 규모 사업성과에 기여


---

## Problem

EXEMONE은 Enterprise 고객에게 납품되는 Observability 제품으로,  
고객사별 환경과 요구가 서로 달랐습니다.

APM, DPM, Cloud 등 여러 모니터링 영역이 분산되어 있었고,  
고객은 여러 제품과 화면을 오가며  
시스템 상태를 확인해야 했습니다.

또한 대부분 비딩 기반 프로젝트였기 때문에  
고객이 원하는 납품 일정은 사실상 고정되어 있었고,

제한된 개발 리소스 안에서  
일정 지연과 재작업을 줄이는 것이 중요했습니다.


---

## Evidence

제품 의사결정은  
고객 VOC뿐 아니라  
내부 기술·운영 조건을 함께 고려했습니다.

### External Input

- 고객 VOC
- 영업 / RFP
- Enterprise 납기 조건


### Internal Input

- 개발자 / 개발팀장
- 엔지니어
- 기획 / 제품
- 기존 제품 구조
- 기존 사용성


반복적으로 등장하는 요구와  
개별 고객 요구를 구분하고,

공통 제품 반영 여부와  
구현 방식을 결정했습니다.


### Core Message

고객 요구를 그대로 구현하는 것이 아니라,

고객 요구와 내부 기술·일정 제약을 함께 고려해  
제품에 가장 적합한 구현 방식과 범위를 결정했습니다.


---

## Constraints

### Fixed Delivery Date

Enterprise B2B 제품은  
비딩을 통해 납품되는 경우가 많아  
고객의 납품 일정은 사실상 고정되어 있었습니다.


### Limited Development Resource

개발 리소스는 한정되어 있었고,

담당 개발자의 경험과 기술 준비 수준에 따라  
실제 필요한 시간이 달랐습니다.


### On-premise Product

온프레미스 제품 특성상  
배포 이후 잦은 패치가 어렵기 때문에

이미 제공 중인 기능과 사용 흐름은  
최대한 안정적으로 유지해야 했습니다.


### Different Customer Needs

고객사마다 요구가 달랐기 때문에

한 고객의 강한 요구를 공통 제품에 그대로 반영하면  
제품 복잡도와 유지보수 비용이 커질 수 있었습니다.


### Product Boundary

모든 요구를 하나의 제품이 해결하려 하면  
제품의 본래 목적과 역할이 흐려질 수 있었습니다.


---

## Decision Principles

제품의 핵심 목적과 범위에 부합하는가

고정된 일정 안에 구현 가능한가

다수 고객에게 반복적으로 필요한가

기존 사용성과 안정성을 해치지 않는가

기존 기능 또는 자사 제품으로 해결 가능한가

내부 API 또는 Custom API로 해결 가능한가

고객 전용 Branch / Version이 필요한가


---

## Decision Examples

### Case 01 — Product Scope 밖의 요구

인프라 Health Check 제품에  
네트워크 모니터링이나 장비 모니터링 요청이 들어온 경우,

제품 Scope와 맞지 않으면  
공통 기능으로 추가하지 않았습니다.

대신

- 적합한 자사 제품으로 이관
- 기존 자사 제품과 내부 API 연계

방식을 검토했습니다.


### Case 02 — External Integration

타사 제품 연동 요구가 있는 경우,

특정 Vendor에 종속되는 기능을 직접 추가하기보다

사용자가 API를 Custom할 수 있는 방식으로  
확장성을 확보했습니다.


### Case 03 — Large Enterprise Request

범용성은 낮지만  
대규모 고객의 강한 요구가 있는 경우,

공통 제품의 구조와 사용성을 해치지 않는 범위에서  
고객 전용 Branch 또는 Version으로 분리했습니다.


---

## Development Schedule Decision

개발 일정은 일괄적으로 결정하지 않았습니다.

구현 전 개발자 의견을 먼저 확인하고,

사전 Study가 필요한 영역에는  
추가 준비 시간을 반영했습니다.

담당자 단위로 해결이 어려운 경우에는  
개발팀장과 팀 단위 일정을 조정했습니다.

개발 가능성과 일정이 검증된 이후  
기획 Scope를 확정했습니다.


### Goal

고정된 납기 안에서  
재작업과 리소스 낭비로 인한  
일정 지연을 최소화


---

## Product Decision & Implementation

고객 요구사항이 제품에 반영되기로 결정된 이후에는

요구를 그대로 화면으로 옮기지 않고,  
제품의 기존 구조와 사용성을 고려해  
실제 구현 방식을 구체화했습니다.


### View & Information Structure

같은 요구사항이라도  
어떤 View와 정보 구조로 제공하느냐에 따라  
제품 사용성이 달라질 수 있었습니다.

기존 화면 구조와 사용 흐름을 먼저 검토하고,

새 메뉴나 기능을 추가할 것인지  
기존 View 안에서 확장할 것인지 판단했습니다.


### Feature Scope

고객이 요청한 기능 전체를 그대로 구현하기보다  
실제 사용 목적을 다시 확인하고  
필요한 기능 범위를 구체화했습니다.

제품 역할과 직접 관련 없는 기능은 제외하거나  
다른 제품 및 연동 방식으로 해결했습니다.


### UX / UI Direction

기존 고객이 이미 사용하고 있는 제품이기 때문에

새로운 기능을 추가하더라도  
기존 화면과 사용 흐름을 크게 변경하지 않는 것을 중요하게 봤습니다.

기획자별 화면 편차를 줄이기 위해  
공통 Component와 UI 기준을 공유했습니다.


### Development Specification

개발자가 바로 구현할 수 있도록

- 기능 조건
- 상태별 동작
- 데이터 표현 방식
- 예외 상황
- 화면 Interaction
- 기존 기능과의 관계

를 상세 기획 및 Description으로 정리했습니다.


---

## Alignment & Governance

B2B Enterprise 제품은  
PM이 모든 것을 단독으로 결정할 수 있는 구조가 아니었습니다.

고객 요구, 사업 일정, 기술 가능성, 제품 방향이  
동시에 연결되어 있었기 때문에

의사결정의 크기와 영향도에 따라  
관련 조직과 함께 결정했습니다.


### Level 01 — Product / UX Decision

기획팀에서

- 고객 요구 해석
- View 구조
- 기능 범위
- UX 방향
- 개발 명세
- 우선순위

의 1차 안을 정의했습니다.


### Level 02 — Technical Feasibility

개발자 및 개발팀장과

- 기술 구현 가능성
- 개발 난이도
- 사전 Study
- 개발 리소스
- Dependency
- 예상 일정

을 검토했습니다.


### Level 03 — Business / Product Scope

제품 Scope가 크거나  
Enterprise 계약 및 사업 영향도가 큰 사안은

- 본부장
- 경영회의
- 영업
- 엔지니어
- 개발 조직

과 함께 검토하고  
최종 방향을 합의했습니다.


### PM Role

각 조직의 의견을 단순 전달하는 것이 아니라

서로 다른 요구와 제약을  
하나의 실행 가능한 제품안으로 정리하는 역할을 맡았습니다.


---

## From Decision to Delivery

Flow

Requirement  
→ Product Decision  
→ Wireframe  
→ Technical Review  
→ Detailed Specification  
→ Development  
→ Validation  
→ Release


### Requirement

고객 VOC, 영업, 엔지니어, RFP를 통해  
요구사항을 수집하고

제품 반영 여부와 구현 방향을 검토했습니다.


### Wireframe

제품 구조와 사용 흐름을 기준으로  
1차 Wireframe을 작성했습니다.


### Technical Review

기획·개발·디자인 리드와 함께

- 구현 가능성
- 성능 및 부하 영향
- 기존 제품 구조와의 적합성
- 개발 난이도

를 검토했습니다.


### Detailed Specification

검토 결과를 반영해

- 기능 조건
- 화면 상태
- Interaction
- Description
- 예외 조건

을 개발 가능한 수준으로 구체화했습니다.


### Team Review

기획팀 내부 리뷰를 통해

화면 변경 내용뿐 아니라  
기획 의도와 결정 이유를 공유했습니다.


### Release

개발 및 검증 과정을 거쳐  
실제 제품으로 Release했습니다.


### Evidence Image Areas

01 Requirement / Research

Caption

제품 반영 여부를 판단한 실제 요구사항


02 Wireframe / Specification

Caption

개발 가능한 수준으로 구체화한 상세 기획


03 Released Product

Caption

기획이 실제 제품으로 구현된 결과


실제 이미지가 들어오기 전까지  
가짜 이미지를 생성하지 않는다.


---

## Impact

### 6 Months

통합 Observability MVP 출시


### v3.0

제품 고도화


### GS

GS 인증


### Enterprise

PoC 및 Enterprise 계약 과정에서 제품 활용


### Business Impact

약 40억 원 규모 사업성과에 기여


## Product Expansion

MVP 이후 Roadmap

- Cloud
- Kubernetes / Cloud Native
- AI Predictive Monitoring
- 이상징후 탐지
- LLM 기반 Assistant
- GPU Monitoring
- Hypervisor Monitoring


AI 경험은 위 내용 이상으로 확장하지 않는다.

금지:

- RAG
- Agent
- Model Evaluation
- Prompt Engineering
- ML Lifecycle


---

## Learning

### 01 Product Boundary

Enterprise 제품에서는  
고객 요구를 많이 반영하는 것보다

제품의 역할을 명확하게 유지하는 것이 중요했습니다.


### 02 Delivery Risk

납기 일정이 고정된 B2B 프로젝트에서는

개발 이후 문제를 해결하기보다  
기획 단계에서 기술 가능성과 리소스를 먼저 검증하는 것이

Delivery Risk를 줄이는 데 중요했습니다.


### 03 Product Alignment

PM의 의사결정은  
독립적인 판단보다

고객  
개발  
엔지니어  
영업  
경영진

의 서로 다른 관점을  
제품 관점에서 구조화하는 과정에 가까웠습니다.


### 04 Product Asset

특정 고객을 위한 기능이라도  
반복 가능성이 있다면

단발성 Custom 기능이 아니라  
제품 자산으로 확장할 수 있는 구조를 검토해야 했습니다.


## Next

새로운 요구사항을 받을 때

“만들 수 있는가?”보다

“이 제품이 해결해야 하는 문제인가?”

“다른 고객에게도 반복되는 문제인가?”

“기존 구조 안에서 지속 가능하게 제공할 수 있는가?”

를 먼저 판단합니다.


---

# 6. Flor Momento Case Study

## Project Summary

Project

Flor Momento

Domain

Subscription Platform / 0→1

Role

Founder / Product Manager


## Problem

예약  
일정 관리  
배송 관리  
고객 알림

등 반복 운영 업무가  
수작업 중심으로 이루어지고 있었습니다.

사업이 확대될수록

운영자가 직접 관리해야 하는  
일정과 배송 업무도 함께 증가했습니다.


## Product Goal

반복적인 운영 업무를  
정기배송 제품과 운영 시스템으로 전환


## Product Design

- 정기결제
- 주문
- 배송 일정
- 알림
- 배송 과정 시각화

를 하나의 흐름으로 설계했습니다.


## Business Logic

제품에서 관리해야 할 핵심 운영 흐름

- 정기배송 일정
- 고객별 배송 예정일
- 배송 진행 상태
- 사용자 알림
- 판매자 운영 흐름


## Decision

복잡한 Commerce 기능을 모두 제공하기보다

1인 사업자가 실제 운영에 필요한 기능을 중심으로  
제품을 경량화했습니다.

핵심은

일정관리  
배송 운영

이었습니다.


## Ownership

- 제품 구조
- 사업 구조
- 정기배송 모델
- 외주 개발 협업
- 디자인 협업
- 운영 프로세스
- 제품 출시
- B2C 운영
- B2B 모듈 판매


## Impact

- 정기배송 플랫폼 출시
- 예비창업패키지 선정
- B2C 서비스 운영
- 제품 기능 모듈화
- B2B 판매로 수익모델 확장
- 사업 Exit 경험

Exit의 구체적인 형태는  
현재 제공된 정보 이상으로 추정하지 않는다.


## Learning

0→1 제품에서는  
기능의 완성도뿐 아니라

실제 운영자가 반복해서 수행하는 업무를  
얼마나 제품으로 전환할 수 있는지가 중요했습니다.


---

# 7. ReadyKorea Case Study

## Project Summary

Project

ReadyKorea

Domain

e-Government / e-Trade Localization

Role

Product Manager / IT Expert


## Context

한국의 전자정부·전자무역 시스템을  
벨라루스 환경에 적용하기 위한

Global Consulting 및 구축 프로젝트였습니다.


## Complexity

한국과 벨라루스는

- 법
- 행정 절차
- 무역 환경
- 기관 구조
- 시스템 환경

이 서로 달랐습니다.

기존 한국 시스템을  
그대로 이식할 수 없는 프로젝트였습니다.


## Discovery

- 벨라루스 정부 담당자 및 현업 인터뷰
- 현지 행정 업무 분석
- 전자무역 업무 분석
- 러시아–벨라루스 시스템 연계 분석
- 기존 IT 시스템 AS-IS 조사


## System Design

AS-IS 업무 구조를 바탕으로

- TO-BE Flow
- 시스템 구조
- 전자문서 흐름
- 통합 Dashboard
- Interface

를 설계했습니다.


## Localization Decision

한국 시스템을 그대로 복제하기보다

현지 법·행정·무역 프로세스에 맞게

- 업무 Flow
- 시스템 Interface
- 사용자 구조
- 화면 구조

를 재설계했습니다.


## Stakeholders

- World Bank
- 벨라루스 정부
- 한국 정부기관
- KTNET
- 현지 개발 조직
- 국내 개발 / 디자인 / 기획 조직


## Ownership

- 현업 인터뷰
- AS-IS 분석
- TO-BE 설계
- Flow Chart
- Dashboard 기획
- 시스템 구조 문서
- 영문 보고서
- 프로젝트 일정
- 프로젝트 인력
- 기관 간 요구사항 조율


## Impact

2억 원 규모

World Bank Consulting Project 수행


약 200억 원 규모

e-Government ICT 구축 Project 수행


중요:

개인이 단독으로  
200억 사업을 수주했다고 표현하지 않는다.


## Learning

Localization은  
언어를 번역하는 일이 아니라

현지의 법·업무·시스템 구조를 이해하고  
제품과 정책을 다시 설계하는 과정이었습니다.


---

# 8. About

## Intro

구매 현업의 시스템 개선에서 시작해

Global Solution  
0→1 창업  
Commerce  
MarTech SaaS  
Enterprise Observability

까지 제품 책임 범위를 확장해왔습니다.


## Career Timeline

### 2023–2025

EXEM

Senior Product Manager  
제품기획팀 차장 / 팀장

Enterprise Observability


### 2022–2023

Biginsight

Product Manager / Part Lead

CRM / CDP / Ads SaaS


### 2021–2023

Independent Projects

Commerce / Data / Global Commerce


### 2018–2021

Flor Momento

Founder / Product Manager

Subscription Commerce


### 2015–2018

ReadyKorea

Product Manager

e-Trade / e-Government


### 2014–2015

Yuratech

Overseas Purchasing / SAP MM TFT


### 2013

Hyundai Home Shopping

MD Intern


## Product Domains

- Enterprise B2B
- Observability
- Monitoring
- CRM
- CDP
- Ads
- Commerce
- Subscription
- Global Solution
- e-Government
- ERP


## Leadership

최근에는

기획 8명 조직을 리드하고  
약 60명의 개발 조직과 협업하며

- 제품 요구
- 우선순위
- 상세 기획
- 조직 간 Alignment

을 관리했습니다.


중요:

개발조직을 직접 지휘했다고 표현하지 않는다.

항상

“기획 8명 리드 · 개발 약 60명 협업”

수준으로 유지한다.


## Closing

무엇을 만들 수 있는가보다

무엇을 먼저 만들어야 하는가,  
어떤 방식으로 만들어야 지속 가능한가를

판단하는 PM을 지향합니다.


---

# 9. Contact

Name

Naeun Oh  
오나은

Title

Senior Product Manager

Email

Placeholder

LinkedIn

Placeholder

Resume

Download Resume 버튼 영역

실제 파일이 없으면 Placeholder 링크 유지


---

# 10. Design System

## Direction

전체 디자인은 다음 키워드를 따른다.

- Senior Product Manager
- Enterprise
- B2B
- Editorial
- Minimal
- Contemporary


## Avoid

다음 스타일은 사용하지 않는다.

- Startup SaaS Landing Page
- 과도한 Rounded Card
- Gradient
- 많은 Icon
- 강한 Tech Blue
- 강한 Orange
- 과도한 Shadow
- 과도한 Motion
- 과도한 Glassmorphism


## Color

Neutral 기반.

Background

Warm Off White 또는 매우 옅은 Neutral


Primary Text

Charcoal


Secondary Text

Muted Gray


Border

Very Light Neutral Gray


Accent

한 가지 저채도 색만 사용

후보:

- Muted Burgundy
- Muted Deep Blue
- Muted Olive

전체 화면의 10% 이하에서만 사용


## Typography

Typography 중심의 디자인

Hero

크고 여백 충분히


Section Title

명확한 hierarchy


Body

충분한 line-height


한글과 영문이 자연스럽게 섞이는  
무료 Sans-serif Web Font 사용


## Layout

Desktop

- Content Max Width 제한
- 넓은 좌우 여백
- 충분한 Vertical Space
- Editorial Layout


Mobile

- 자연스럽게 1열
- Horizontal Scroll 금지
- 적절한 Line Length


## Components

카드 남발 금지

대신

- Whitespace
- Divider
- Grid
- Typography hierarchy

중심으로 구성


## Navigation

상단 Navigation

Sticky 가능

현재 페이지는

- 작은 underline
또는
- Accent Color

정도로만 표시


## Interaction

Hover는 약하게

허용:

- underline
- text color change

금지:

- 과도한 animation
- parallax
- bouncing
- flashy motion


## Project Evidence

Wireframe / Diagram / Product Screenshot이  
들어갈 영역은 충분히 크게 잡는다.

실제 이미지가 없는 경우

Placeholder만 생성한다.

가짜 이미지 생성 금지.


---

# 11. Content Guardrails

절대 임의 생성하지 않는다.

## EXEM

금지:

- RAG 경험
- AI Agent 경험
- Model Evaluation
- Prompt Engineering
- ML Lifecycle
- 직접 개발조직 60명 리딩
- 40억 계약 직접 수주
- 4개월 MVP

정확한 표현:

- MVP 6개월
- 기획 8명 리드
- 개발 약 60명 협업
- 약 40억 원 규모 사업성과에 기여


## Flor Momento

금지:

- Exit 형태 추정
- 기업 인수로 표현
- 정확하지 않은 투자금 표현

안전한 표현:

- 예비창업패키지 선정
- B2C 운영
- B2B 모듈 판매
- 사업 Exit 경험


## ReadyKorea

금지:

- 개인이 200억 사업 수주했다고 표현

안전한 표현:

- 2억 원 규모 World Bank Consulting Project 수행
- 약 200억 원 규모 e-Government ICT 구축 Project 수행


## General

없는 Metric 생성 금지

없는 A/B Test 생성 금지

없는 Experimentation 경험 생성 금지

없는 AI 기술경험 생성 금지

회사/프로젝트 사실을 추정해서 추가하지 않는다.


---

# 12. Implementation Rules for Claude Code

이 파일이 Single Source of Truth다.

항상 구현 전에 이 파일을 기준으로 판단한다.

기존 코드와 충돌하면  
PORTFOLIO_SPEC.md의 최신 내용을 우선한다.

하지만 이미 올바르게 구현된 부분은  
불필요하게 재작성하지 않는다.

## Before Editing

필요한 파일만 읽는다.

전체 프로젝트를 무작정 탐색하지 않는다.


## While Editing

요청받은 범위만 수정한다.

불필요한 Refactoring 금지.

불필요한 Library 추가 금지.

새 기술 스택 추가 금지.


## Content

이 문서에 없는 경력  
수치  
기술  
성과

생성 금지.


## Design

한 번 정한 Design System을  
페이지마다 다르게 바꾸지 않는다.


## Completion

작업 완료 후 길게 설명하지 않는다.

아래만 알려준다.

1. 수정 파일
2. 구현 영역
3. 남은 TODO
