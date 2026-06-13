import Link from "next/link";
import type { PostMeta } from "@/lib/content";
import { formatDate } from "@/lib/format";

/**
 * '노트(Notes)' 행 — 가볍게 정리한 글. 제목 위주로 밀도 높게.
 * 글 카드와 시각적으로 명확히 구분되도록 한 줄 리스트 형태.
 */
export function NoteRow({ post }: { post: PostMeta }) {
  return (
    <li>
      <Link
        href={`/notes/${post.slug}`}
        className="group flex items-baseline justify-between gap-4 rounded-lg px-3 py-2.5 -mx-3 transition-colors hover:bg-surface"
      >
        <span className="min-w-0 truncate font-medium group-hover:text-accent">
          {post.title}
        </span>
        <time
          dateTime={post.date}
          className="shrink-0 text-xs tabular-nums text-muted"
        >
          {formatDate(post.date)}
        </time>
      </Link>
    </li>
  );
}
