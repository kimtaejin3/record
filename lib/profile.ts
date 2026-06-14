/**
 * 소개 페이지 데이터. 이 파일과 content/about.mdx만 고치면 About가 갱신된다.
 */

export interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
}

export const profile = {
  name: "김태진",
  role: "Frontend Engineer",
  tagline: "코드로 직접 돌려보며 프론트엔드를 따라갑니다.",
  email: "ktj3727@gmail.com",
  github: "https://github.com/",
  stack: [
    "React",
    "Next.js",
    "TypeScript",
    "RSC",
    "Tailwind CSS",
    "성능 최적화",
  ],
  projects: [
    {
      title: "기술 블로그",
      description:
        "글(딥다이브)과 노트(개념 정리)를 분리해, 어필하고 싶은 글이 묻히지 않는 블로그. (지금 보고 계신 사이트)",
      tech: ["Next.js", "MDX", "SSG"],
      link: "/",
    },
    {
      title: "프로젝트 제목",
      description:
        "여기에 프로젝트 한 줄 설명을 적으세요. lib/profile.ts에서 자유롭게 추가·수정할 수 있습니다.",
      tech: ["React", "TypeScript"],
    },
  ] satisfies Project[],
} as const;
