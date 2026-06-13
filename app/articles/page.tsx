import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "글",
  description: "딥다이브와 프로젝트 후기 — 힘줘서 쓴 글 모음.",
};

export default function ArticlesPage() {
  const articles = getPosts("articles");

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:py-16">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">글</h1>
        <p className="mt-2 text-muted">
          딥다이브와 프로젝트 후기 — 코드로 직접 돌려보며 따라간 기록.
        </p>
      </header>

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
    </div>
  );
}
