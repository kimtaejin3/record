import { site } from "@/lib/site";
import { TerminalIntro } from "./hero/terminal-intro";

/** 홈 히어로 — 터미널 스타일 소개. */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:py-28">
        {/* SEO/스크린리더용 실제 제목 */}
        <h1 className="sr-only">{site.name} — 프론트엔드를 코드로 따라가는 기록</h1>
        <TerminalIntro />
      </div>
    </section>
  );
}
