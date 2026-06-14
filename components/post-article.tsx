import Link from "next/link";
import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { extractToc } from "@/lib/toc";
import { MDXContent } from "./mdx-content";
import { TagChip } from "./tag-chip";
import { Toc } from "./toc";

const BACK_LINK: Record<Post["type"], { href: string; label: string }> = {
  articles: { href: "/articles", label: "글 목록" },
  notes: { href: "/notes", label: "노트 목록" },
};

/** 글/노트 상세의 공통 레이아웃. 제목·메타·태그 + prose 본문 + 우측 sticky 목차. */
export function PostArticle({ post }: { post: Post }) {
  const back = BACK_LINK[post.type];
  const toc = extractToc(post.body);

  return (
    <div className="mx-auto flex max-w-6xl justify-center gap-10 px-5 py-12 sm:py-16">
      <div className="w-full max-w-3xl">
        <Link
          href={back.href}
          className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
        >
          ← {back.label}
        </Link>

        <article className="mt-6">
          <header className="border-b border-border pb-6">
            <h1 className="text-3xl font-bold leading-tight tracking-tight">
              {post.title}
            </h1>
            <p className="mt-3 text-muted">{post.description}</p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes}분 읽기</span>
            </div>

            {post.tags.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <li key={tag}>
                    <TagChip tag={tag} />
                  </li>
                ))}
              </ul>
            )}
          </header>

          <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-headings:tracking-tight prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
            <MDXContent source={post.body} />
          </div>
        </article>
      </div>

      {/* 우측 sticky 목차 — 데스크탑(xl+) + 헤딩 2개 이상일 때만 */}
      {toc.length >= 2 && (
        <aside className="hidden xl:block">
          <div className="sticky top-24 w-56">
            <Toc items={toc} />
          </div>
        </aside>
      )}
    </div>
  );
}
