import type { Metadata } from "next";
import { NoteRow } from "@/components/note-row";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "노트",
  description: "개념을 가볍게 정리한 짧은 글 모음.",
};

export default function NotesPage() {
  const notes = getPosts("notes");

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:py-16">
      <header className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">노트</h1>
        <p className="mt-2 text-muted">기록 용도</p>
      </header>

      {notes.length > 0 ? (
        <ul className="divide-y divide-border">
          {notes.map((post) => (
            <NoteRow key={post.slug} post={post} />
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">아직 작성된 노트가 없습니다.</p>
      )}
    </div>
  );
}
