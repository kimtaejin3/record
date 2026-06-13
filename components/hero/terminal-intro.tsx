import type { CSSProperties } from "react";
import { site } from "@/lib/site";

/**
 * 터미널 스타일 소개. 각 줄이 순서대로 타이핑(CSS clip-path 타자기)된다.
 * JS 없이 동작하므로 서버 렌더 + SEO 안전. prefers-reduced-motion이면 전체 즉시 노출.
 */
export function TerminalIntro() {
  const lines = site.hero.lines;
  const GAP = 0.22; // 줄 사이 간격(초)
  let elapsed = 0;

  return (
    <div className="relative z-10 max-w-md font-mono text-sm sm:text-base">
      {/* 윈도우 헤더 */}
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-2 text-xs text-muted">~/blog — zsh</span>
      </div>

      <div className="space-y-1.5">
        {lines.map((line, i) => {
          const charCount = line.type === "cmd" ? line.text.length + 2 : line.text.length;
          const dur = Math.max(0.3, charCount * 0.055);
          const delay = elapsed;
          elapsed += dur + GAP;
          const isLast = i === lines.length - 1;

          const lineStyle = {
            "--n": charCount,
            "--dur": `${dur}s`,
            "--delay": `${delay}s`,
          } as CSSProperties;

          return (
            <div key={i} className="whitespace-pre">
              <span className="hero-line align-top" style={lineStyle}>
                {line.type === "cmd" ? (
                  <>
                    <span className="text-accent">$ </span>
                    <span className="text-fg">{line.text}</span>
                  </>
                ) : (
                  <span className="text-muted">{line.text}</span>
                )}
              </span>
              {isLast && (
                <span
                  className="hero-caret ml-0.5 inline-block text-accent"
                  style={{ animationDelay: `${elapsed}s` }}
                >
                  ▋
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
