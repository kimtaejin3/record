import Link from "next/link";
import type { PostMeta } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { TagChip } from "./tag-chip";

/**
 * '글(Articles)' 카드 — 어필용 깊은 글. 큼직하게, 설명까지 노출.
 * 카드 전체가 링크지만 제목에 의미 있는 링크 텍스트를 둬 스크린리더 친화적.
 */
export function ArticleCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative flex flex-col rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/60">
      <div className="mb-3 flex items-center gap-2 text-xs text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingMinutes}분 읽기</span>
      </div>

      <h3 className="text-lg font-semibold leading-snug tracking-tight">
        <Link
          href={`/articles/${post.slug}`}
          className="after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
        >
          {post.title}
        </Link>
      </h3>

      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
        {post.description}
      </p>

      {post.tags.length > 0 && (
        <ul className="relative mt-4 flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <li key={tag}>
              <TagChip tag={tag} />
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
