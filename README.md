# 프론트엔드 기술 블로그

**글(딥다이브)** 과 **노트(개념 정리)** 를 구조적으로 분리해, 어필하고 싶은 글이
가벼운 메모에 묻히지 않습니다. 사이트 이름·히어로 카피는 [lib/site.ts](lib/site.ts)에서 바꾸세요.

- **Next.js (App Router) + TypeScript** — 전부 SSG로 정적 생성
- **MDX 파일 + git** — 외부 CMS 없이 레포가 곧 콘텐츠 저장소
- **Tailwind CSS v4** — 다크 기본 / 라이트 토글
- 접근성: 시맨틱 랜드마크, skip 링크, 포커스 관리, `prefers-reduced-motion`

## 개발

```bash
npm run dev    # http://localhost:3000
npm run build  # 정적 빌드
```

## 글 쓰는 법

`content/articles/` (깊은 글) 또는 `content/notes/` (가벼운 글)에 `.mdx` 파일을 추가합니다.
파일명이 곧 URL slug가 됩니다.

```text
---
title: "글 제목"
description: "목록·메타에 쓰일 한 줄 요약"
date: 2026-06-13
tags: ["React", "성능"]
published: true        # false면 숨김
---

본문은 마크다운 + JSX. 코드블록은 자동 하이라이팅됩니다.
```

코드블록은 ```` ```tsx title="example.tsx" {2} ```` 처럼 파일명과 강조 줄을 지정할 수 있습니다.

- **글 vs 노트**: 어필용 딥다이브·프로젝트 후기 → `articles`, 짧은 개념 정리 → `notes`
- 정렬은 `date` 기준 최신순 (각 영역 안에서만)

## 소개 / 포트폴리오 수정

- 프로필·기술 스택·프로젝트 카드: [lib/profile.ts](lib/profile.ts)
- 소개 본문: [content/about.mdx](content/about.mdx)

## 구조

```text
app/
  page.tsx              홈 (히어로 + 글 + 노트)
  articles/             글 목록 · 상세
  notes/                노트 목록 · 상세
  about/                소개
components/             Header · Hero · 카드 · MDX 렌더러 · 테마 토글
lib/content.ts          MDX 콘텐츠 레이어 (파일시스템 격리)
lib/profile.ts          소개 페이지 데이터
content/                MDX 글 (articles / notes)
```
