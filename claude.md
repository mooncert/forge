# CROSS Ads - Service Planning Agent System

## 1. 오케스트레이션 구조

**Superpowers가 오케스트레이터, Agents가 실행자** 역할을 한다.

```
사용자 요청
  │
  ▼
Superpowers (오케스트레이션)
  ├── brainstorming        → 요구사항 탐색, 범위 정의
  ├── writing-plans        → 실행 계획 수립
  ├── executing-plans      → 계획 실행 (에이전트 디스패치)
  ├── subagent-driven-dev  → 독립 태스크 병렬 실행
  ├── verification         → 산출물 검증
  └── finishing-branch     → 작업 완료 및 통합
        │
        ▼
  .claude/agents/ (실행)
  ├── researcher.md        → 시장조사, 경쟁사 분석
  ├── meeting-note.md      → 기획 대화 요약
  ├── prd.md               → 요구사항 문서 작성
  ├── uiux-spec.md         → 화면 정의서 작성
  ├── diagram.md           → UML, 플로우차트, ERD
  ├── reviewer.md          → 문서 품질 검토
  └── senior-frontend-developer.md → 프론트엔드 구현
```

### 워크플로우 실행 원칙

1. **모든 작업은 superpowers skill로 시작**: brainstorming → writing-plans → executing-plans 순서
2. **계획 실행 시 agents를 디스패치**: Agent 도구로 `.claude/agents/`의 에이전트를 스폰
3. **독립 태스크는 병렬 실행**: subagent-driven-development로 병렬 가능한 에이전트 동시 스폰
4. **완료 전 반드시 검증**: verification-before-completion으로 산출물 확인

### 표준 워크플로우

```
1. brainstorming          → 사용자와 요구사항/범위 합의
2. writing-plans          → 단계별 실행 계획 문서화
3. executing-plans        → 계획에 따라 에이전트 디스패치
   ├── researcher (시장조사)          ← 병렬
   ├── meeting-note (세션 기록)       ← 병렬
   │
   └── prd (요구사항 정의)            ← 리서치 완료 후
         ├── uiux-spec (화면 정의)    ← 병렬
         └── diagram (다이어그램)      ← 병렬
               │
               └── reviewer (QA 검토)
4. verification           → 산출물 품질 확인
5. finishing-branch       → 작업 완료 처리
```

---

## 2. 프로젝트 개요

서비스/제품 기획 전 과정을 Claude 에이전트 팀이 자동화하는 시스템이다.
리서치 → PRD → UX/다이어그램 → 리뷰까지의 파이프라인을 구조화된 문서와 품질 관리 워크플로우로 운영한다.

### 기술 스택

| 영역 | 기술 |
|------|------|
| Frontend | Next.js 16, React 19, TypeScript |
| UI | Shadcn UI, Radix UI, Tailwind CSS 4 |
| Forms/Validation | React Hook Form, Zod |
| 데이터/상태 | React Query, React Table |
| 차트 | Recharts |
| 문서 포맷 | Markdown + YAML front matter |
| 에이전트 | Claude (Opus, Sonnet, Haiku) |

### 디렉토리 구조

```
/
├── .claude/
│   ├── agents/           # 에이전트 정의 (7개)
│   └── worktree/         # 워크플로우 정의
├── apps/
│   ├── admin/            # Next.js 관리자 대시보드
│   └── external-admin/   # Next.js 외부 관리자 앱
├── docs/                 # 기획 산출물 저장소
│   ├── meta.yml
│   ├── 01-research/
│   ├── 02-planning/
│   ├── 03-prd/
│   ├── 04-policy/
│   ├── 05-ux/
│   ├── 06-diagrams/
│   ├── 07-reviews/
│   └── 08-meeting-note/
├── shared/               # 공통 규칙 파일
├── templates/            # 문서 템플릿
└── config.yml            # 메인 설정 파일
```

---

## 3. 에이전트 역할 및 구조

### 에이전트 목록

| 에이전트 | 모델 | 역할 | 산출물 경로 |
|----------|------|------|------------|
| **researcher** | Sonnet | 시장조사, 경쟁사 분석, 트렌드 파악 | `01-research/` |
| **meeting-note** | Haiku | 기획 대화 요약, 결정사항/액션아이템 추출 | `08-meeting-note/` |
| **prd** | Sonnet | 제품 요구사항 문서 작성 (기능 정의, 수용 기준) | `03-prd/` |
| **uiux-spec** | Sonnet | 화면 정의서, 와이어프레임, 인터랙션 설계 | `05-ux/` |
| **diagram** | Sonnet | UML, 플로우차트, ERD, 시퀀스 다이어그램 | `06-diagrams/` |
| **reviewer** | Sonnet | 문서 품질 검토, 교차 검증, 승인/반려 | `07-reviews/` |
| **senior-frontend-developer** | - | 기획 산출물 기반 프론트엔드 구현 | `apps/` |

### 에이전트 호출 방법

에이전트는 **직접 호출하지 않고** superpowers skill을 통해 디스패치한다.

```
사용자: "시장 조사해줘"
  → superpowers:brainstorming (범위 확인)
  → superpowers:writing-plans (조사 계획)
  → Agent 도구로 researcher 에이전트 스폰

사용자: "PRD 작성해줘"
  → superpowers:brainstorming (요구사항 확인)
  → superpowers:writing-plans (PRD 작성 계획)
  → Agent 도구로 prd 에이전트 스폰

사용자: "전체 기획 시작"
  → superpowers:brainstorming (전체 범위 합의)
  → superpowers:writing-plans (파이프라인 계획)
  → superpowers:executing-plans (단계별 에이전트 디스패치)
```

### 에이전트 트리거 키워드

- **researcher**: "시장 조사", "경쟁사 분석", "트렌드", "벤치마킹", "리서치"
- **meeting-note**: "회의록 작성", "대화 정리", "논의 내용 정리", "세션 정리"
- **prd**: "PRD 작성", "요구사항 문서", "기능 명세", "스펙 문서"
- **uiux-spec**: "화면 정의", "와이어프레임", "UI 스펙", "화면 설계", "인터랙션"
- **diagram**: "다이어그램", "플로우차트", "UML", "시퀀스", "ERD"
- **reviewer**: "문서 검토", "QA", "리뷰", "검증", "피드백"
- **senior-frontend-developer**: PRD/UX 스펙 완료 후 구현 단계

### ID 체계

**문서 ID**: `{타입}-{프로젝트코드}-{순번}` (프로젝트 코드: 3-4자 영문 대문자, `meta.yml`에 정의)

| 항목 | 패턴 | 예시 |
|------|------|------|
| 문서 | `{TYPE}-{PROJECT}-{NUM}` | PRD-ADS-001 |
| 기능 | `F-{n}` | F-001 |
| 요구사항 | `REQ-{기능}-{순번}` | REQ-001-01 |
| 화면 | `SCR-{n}` | SCR-001 |
| UI 요소 | `E-{화면}-{순번}` | E-001-01 |
| 인터랙션 | `INT-{화면}-{순번}` | INT-001-01 |
| 결정사항 | `D-{n}` | D-001 |
| 액션아이템 | `A-{n}` | A-001 |
| 질문 | `Q-{n}` | Q-001 |
| 리스크 | `R-{n}` | R-001 |

### 파일 네이밍 규칙

```
{YYYY-MM-DD}_{TYPE}_{PROJECT}_{TOPIC}_v{VERSION}.md
예: 2026-04-01_PRD_ads_campaign-management_v1.0.md
```

**타입 접두사**:

| 접두사 | 타입 | 에이전트 |
|--------|------|----------|
| `RES` | 리서치 리포트 | researcher |
| `MTG` | 회의록 | meeting-note |
| `SES` | 기획 세션 | (superpowers orchestrator) |
| `PRD` | PRD | prd |
| `POL` | 운영정책 | (직접 작성) |
| `UX` | 화면정의서 | uiux-spec |
| `DIA` | 다이어그램 | diagram |
| `REV` | 검토 리포트 | reviewer |

**규칙**: 모든 문자 소문자 (타입 접두사 제외), 공백 대신 `-`, 특수문자 금지, 영문 사용 권장

### 태그 규칙

문서 front matter의 tags:
```yaml
tags:
  - "project:{프로젝트명}"
  - "type:{문서타입}"
  - "status:{상태}"
  - "feature:{기능}"
```

### Git 커밋 메시지

```
[{에이전트}] {액션}: {설명}
예: [prd] create: PRD-ADS-001 초안 작성
    [reviewer] update: REV-ADS-001 피드백 반영
```

---

## 4. shared/ 규칙 파일 참조

모든 에이전트는 아래 공통 규칙 파일을 준수해야 한다.

| 파일 | 경로 | 설명 |
|------|------|------|
| 스타일 가이드 | `shared/style-guide.md` | 문서 작성 표준 (YAML front matter, 제목 구조, 포맷 규칙, 버전 관리) |
| 용어집 | `shared/terminology.md` | 표준 용어 정의 (플랫폼, 광고, 과금, 블록체인, 세그먼트, 규제, 비즈니스) |
| 네이밍 규칙 | `shared/conventions.md` | 파일명, 문서 ID, 내부 항목 ID, 폴더 구조, 태깅 규칙 |
| 검토 체크리스트 | `shared/review-checklist.md` | QA 기준 (공통/유형별 체크리스트, 교차 검증, 승인 기준) |

### 스타일 가이드 핵심 (shared/style-guide.md)

**YAML Front Matter 필수 필드**:
```yaml
---
id: "PRD-ADS-001"
title: "문서 제목"
project: "프로젝트명"
version: "v1.0"
status: "draft | review | approved | archived"
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
author: "agent-name"
reviewers: []
related_docs: []
tags: []
---
```

**작성 원칙**:
- 명확성: 모호한 표현 금지 ("적절한", "빠른" → 구체적 수치/기준)
- 일관성: conventions.md, style-guide.md 준수
- 추적성: 모든 항목에 고유 ID, 관련 문서 상호 참조, 변경 이력 기록

**문서 상태 흐름**: `draft` → `review` → `approved` → `archived`
**버전 규칙**: v1.0(초기), v1.1(소규모 수정), v2.0+(대규모 변경)
**내부 문서 링크**: `[[PRD-ADS-001]]` 형식

### 리뷰 체크리스트 핵심 (shared/review-checklist.md)

**공통 검증**: 메타데이터 완전성, 스타일 가이드 준수, 네이밍 컨벤션, 필수 섹션 존재

**유형별 검증**:
- **RES**: 출처 명시, 경쟁사 3개 이상, 정량적 데이터, 6개월 이내 정보
- **PRD**: 기능 ID(F-xxx), 우선순위(P0/P1/P2), Acceptance Criteria(Given-When-Then)
- **POL**: 구체적 기준(수치/기간), 예외 상황, 법적 준수, 이의 제기 절차
- **UX**: 화면 ID(SCR-xxx), 상태별 화면(Default/Loading/Empty/Error), 접근성
- **DIA**: Mermaid 문법, 시작/종료 명확, 분기 조건, 예외 흐름

**교차 문서 검증**: PRD 기능 → UX/정책/다이어그램 매핑 완전성, 용어 일관성, 버전 동기화

**평가 기준**:

| 등급 | 기준 |
|------|------|
| Pass | 필수 항목 100%, 권장 항목 80% 이상 |
| Conditional | 필수 항목 100%, 권장 항목 60-80% |
| Fail | 필수 항목 미충족 |

### 아카이브 규칙

완료된 프로젝트: `docs/archive/{YYYY}/{project-name}/`

---

## 5. review-cycle.yml 워크플로우 요약

**파일 위치**: `.claude/worktree/review-cycle.yml`

### 개요

문서 검토 → 피드백 → 수정 → 재검토 사이클을 정의한 워크플로우다.
Reviewer 에이전트가 리드하며, 담당 에이전트들과 협업하여 문서 품질을 보장한다.

### 참여 에이전트

reviewer(리드), prd, uiux-spec, diagram

### 실행 단계

```
1. 검토 요청 수신
   └── 트리거: "문서 검토해줘", "PRD 리뷰 요청", "{project} 검토 시작"

2. 문서 수집
   └── docs/ 에서 status: review 문서 수집

3. 개별 문서 검토
   └── shared/review-checklist.md 기준 적용
   └── 이슈 기록: ID, 심각도(critical/major/minor), 위치, 설명, 제안

4. 교차 문서 검토
   ├── 기능 추적: PRD(F-xxx) → UX(SCR-xxx), 다이어그램 매핑
   ├── 용어 일관성: shared/terminology.md 기준 검증
   └── ID 참조 유효성: 깨진 참조, 순환 참조 확인

5. 검토 리포트 작성
   └── 산출물: docs/07-reviews/{date}_REV_{project}_review-report_v{n}.md

6. 평가 및 분기
   ├── Pass    (Critical: 0, Major: 0, Minor: <=5) → 승인 처리
   ├── Conditional (Critical: 0, Major: 1-3)       → 피드백 전달 → 수정 → 재검토
   └── Fail    (Critical: >=1 또는 Major: >=4)     → 피드백 전달 → 수정 → 재검토

7. 수정 및 재제출 (Conditional/Fail 시)
   └── 담당 에이전트가 피드백 반영 → 버전 업데이트(v1.0 → v1.1) → 재검토 요청

8. 승인 처리 (Pass 시)
   └── 전체 문서 status: approved 변경 → 최종 리포트 작성 → meta.yml 업데이트
```

### 이슈 심각도

| 등급 | 조건 | 조치 |
|------|------|------|
| Critical | 서비스 영향, 법적 문제 | 즉시 수정 필수 |
| Major | 품질 저하, 혼란 유발 | 승인 전 수정 필수 |
| Minor | 개선 권장 사항 | 다음 버전에서 반영 |
