import Link from "next/link";
import { Hero } from "@/components/hero";
import { ArticleCard } from "@/components/article-card";
import { NoteRow } from "@/components/note-row";
import { getPosts } from "@/lib/content";

export default function HomePage() {
  const articles = getPosts("articles").slice(0, 4);
  const notes = getPosts("notes").slice(0, 6);

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-5xl px-5 py-14 sm:py-16">
        {/* 글 — 어필용 깊은 글을 메인에 크게 */}
        <section aria-labelledby="articles-heading">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 id="articles-heading" className="text-xl font-semibold tracking-tight">
              글
            </h2>
            <Link
              href="/articles"
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              전체 보기 →
            </Link>
          </div>

          {articles.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2">
              {articles.map((post) => (
                <li key={post.slug}>
                  <ArticleCard post={post} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">아직 발행된 글이 없습니다.</p>
          )}
        </section>

        {/* 노트 — 가벼운 정리글을 아래에 밀도 높게 */}
        <section aria-labelledby="notes-heading" className="mt-16">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 id="notes-heading" className="text-xl font-semibold tracking-tight">
              노트
            </h2>
            <Link
              href="/notes"
              className="text-sm text-muted transition-colors hover:text-fg"
            >
              전체 보기 →
            </Link>
          </div>

          {notes.length > 0 ? (
            <ul className="divide-y divide-border">
              {notes.map((post) => (
                <NoteRow key={post.slug} post={post} />
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted">아직 작성된 노트가 없습니다.</p>
          )}
        </section>
      </div>
    </>
  );
}
