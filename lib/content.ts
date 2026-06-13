import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

/**
 * 콘텐츠 레이어.
 * content/articles, content/notes 의 .mdx 파일을 빌드타임에 읽어
 * 페이지가 사용할 깔끔한 인터페이스(getPosts/getPost/getAllSlugs)만 노출한다.
 * 페이지·컴포넌트는 파일시스템을 직접 건드리지 않는다.
 */

export type PostType = "articles" | "notes";

export interface PostFrontmatter {
  title: string;
  description: string;
  /** YAML은 따옴표 없는 날짜를 Date로 파싱하므로 둘 다 허용 (읽을 때 문자열로 정규화) */
  date: string | Date;
  tags?: string[];
  published?: boolean;
}

export interface PostMeta {
  title: string;
  description: string;
  date: string; // 정규화된 "YYYY-MM-DD"
  tags: string[];
  slug: string;
  type: PostType;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  /** frontmatter를 제외한 원본 MDX 본문 */
  body: string;
}

const CONTENT_DIR = path.join(process.cwd(), "content");

function readAll(type: PostType): Post[] {
  const dir = path.join(CONTENT_DIR, type);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const fm = data as PostFrontmatter;

      // YAML은 따옴표 없는 2026-06-10을 Date 객체로 자동 변환한다.
      // 항상 "YYYY-MM-DD" 문자열로 정규화해 다운스트림을 단순하게 유지.
      const date =
        fm.date instanceof Date
          ? fm.date.toISOString().slice(0, 10)
          : String(fm.date);

      return {
        post: {
          title: fm.title,
          description: fm.description,
          date,
          tags: fm.tags ?? [],
          slug: file.replace(/\.mdx$/, ""),
          type,
          readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
          body: content,
        } satisfies Post,
        published: fm.published !== false,
      };
    })
    .filter(({ published }) => published)
    .map(({ post }) => post)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

/** 메타데이터만 (목록용). 본문 제외. */
export function getPosts(type: PostType): PostMeta[] {
  return readAll(type).map(({ body, ...meta }) => meta);
}

/** 단일 글 (본문 포함). 없으면 null. */
export function getPost(type: PostType, slug: string): Post | null {
  return readAll(type).find((post) => post.slug === slug) ?? null;
}

/** generateStaticParams 용 slug 목록. */
export function getAllSlugs(type: PostType): string[] {
  return readAll(type).map((post) => post.slug);
}
