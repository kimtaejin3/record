import type { Metadata } from "next";
import { IdeaBoard } from "@/components/idea-board";

export const metadata: Metadata = {
  title: "글감",
  // 개인용 페이지 — 검색엔진 색인 제외
  robots: { index: false, follow: false },
};

export default function IdeasPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:py-16">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">글감 메모</h1>
        <p className="mt-2 text-muted">
          블로그 글 소재가 떠오르면 여기에 적어둡니다. 이 메모는{" "}
          <strong className="text-fg">이 브라우저에만</strong> 저장돼요 (서버에 올라가지 않음).
        </p>
      </header>
      <IdeaBoard />
    </div>
  );
}
