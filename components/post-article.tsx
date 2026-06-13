import Link from "next/link";
import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { MDXContent } from "./mdx-content";
import { TagChip } from "./tag-chip";

const BACK_LINK: Record<Post["type"], { href: string; label: string }> = {
  articles: { href: "/articles", label: "글 목록" },
  notes: { href: "/notes", label: "노트 목록" },
};

/** 글/노트 상세의 공통 레이아웃. 제목·메타·태그 + prose 본문. */
export function PostArticle({ post }: { post: Post }) {
  const back = BACK_LINK[post.type];

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:py-16">
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
  );
}
