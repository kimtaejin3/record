"use client";

import { useEffect, useState, type FormEvent } from "react";

interface Idea {
  id: string;
  title: string;
  memo: string;
  done: boolean;
  createdAt: number;
}

const STORAGE_KEY = "blog-ideas";

/**
 * 글감 메모장. 데이터는 localStorage(이 브라우저)에만 저장된다 — 서버/백엔드 없음.
 */
export function IdeaBoard() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");

  // 최초 마운트 시 localStorage에서 로드 (SSR 불일치 방지)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setIdeas(JSON.parse(raw) as Idea[]);
    } catch {
      // 손상된 데이터는 무시
    }
    setLoaded(true);
  }, []);

  // 변경 시 저장 (로드 완료 후에만 → 빈 배열로 덮어쓰는 사고 방지)
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas));
    } catch {
      // 용량 초과/프라이빗 모드 등 무시
    }
  }, [ideas, loaded]);

  function addIdea(e: FormEvent) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    setIdeas((prev) => [
      { id: crypto.randomUUID(), title: t, memo: memo.trim(), done: false, createdAt: Date.now() },
      ...prev,
    ]);
    setTitle("");
    setMemo("");
  }

  const toggle = (id: string) =>
    setIdeas((prev) => prev.map((i) => (i.id === id ? { ...i, done: !i.done } : i)));
  const remove = (id: string) =>
    setIdeas((prev) => prev.filter((i) => i.id !== id));

  // 미완료 먼저(최신순), 완료는 아래로
  const sorted = [...ideas].sort(
    (a, b) => Number(a.done) - Number(b.done) || b.createdAt - a.createdAt,
  );
  const remaining = ideas.filter((i) => !i.done).length;

  return (
    <div>
      <form onSubmit={addIdea} className="rounded-xl border border-border bg-surface p-4">
        <label htmlFor="idea-title" className="sr-only">
          글감 제목
        </label>
        <input
          id="idea-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="떠오른 글감 한 줄…"
          className="w-full bg-transparent text-base outline-none placeholder:text-muted"
        />
        <label htmlFor="idea-memo" className="sr-only">
          메모
        </label>
        <textarea
          id="idea-memo"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="메모 (선택)"
          rows={2}
          className="mt-2 w-full resize-none bg-transparent text-sm text-muted outline-none placeholder:text-muted/60"
        />
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={!title.trim()}
            className="rounded-lg bg-accent px-4 py-1.5 text-sm font-medium text-accent-fg transition-opacity disabled:opacity-40"
          >
            추가
          </button>
        </div>
      </form>

      {loaded &&
        (ideas.length > 0 ? (
          <div className="mt-6">
            <p className="mb-3 text-sm text-muted">
              {remaining}개 남음 · 총 {ideas.length}개
            </p>
            <ul className="space-y-2">
              {sorted.map((idea) => (
                <li
                  key={idea.id}
                  className="flex items-start gap-3 rounded-lg border border-border bg-surface p-3"
                >
                  <input
                    type="checkbox"
                    checked={idea.done}
                    onChange={() => toggle(idea.id)}
                    aria-label={`${idea.title} 완료 표시`}
                    className="mt-1 h-4 w-4"
                    style={{ accentColor: "var(--accent)" }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className={`font-medium ${idea.done ? "text-muted line-through" : ""}`}>
                      {idea.title}
                    </p>
                    {idea.memo && (
                      <p className="mt-0.5 whitespace-pre-wrap text-sm text-muted">{idea.memo}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(idea.id)}
                    aria-label={`${idea.title} 삭제`}
                    className="shrink-0 rounded-md px-2 py-1 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted">
            아직 적어둔 글감이 없어요. 위에 떠오른 걸 적어보세요.
          </p>
        ))}
    </div>
  );
}
