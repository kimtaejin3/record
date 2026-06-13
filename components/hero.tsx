import type { CSSProperties } from "react";
import { site } from "@/lib/site";
import { TerminalIntro } from "./hero/terminal-intro";
import { PixelCharacter } from "./hero/pixel-character";
import { warrior, knight, wizard, ninja } from "./hero/sprites";

/** 히어로에 떠도는 도트 캐릭터들의 배치(결정적 값 → 하이드레이션 안전) */
const PLACEMENTS = [
  {
    key: "js",
    sprite: warrior,
    motion: "walk" as const,
    px: 5,
    className: "",
    style: { left: "52%", bottom: "30px", "--dur": "9s", "--travel": "78px", "--delay": "0s" },
  },
  {
    key: "ts",
    sprite: knight,
    motion: "walk" as const,
    px: 5,
    className: "hidden sm:block",
    style: { left: "74%", bottom: "30px", "--dur": "11s", "--travel": "-64px", "--delay": "1.2s" },
  },
  {
    key: "react",
    sprite: wizard,
    motion: "fly" as const,
    px: 5,
    className: "",
    style: {
      left: "64%",
      bottom: "150px",
      "--dur": "13s",
      "--travel": "58px",
      "--delay": "0.4s",
      "--floatdur": "4.2s",
    },
  },
  {
    key: "next",
    sprite: ninja,
    motion: "fly" as const,
    px: 4,
    className: "hidden sm:block",
    style: {
      left: "83%",
      bottom: "108px",
      "--dur": "7s",
      "--travel": "-92px",
      "--delay": "0s",
      "--floatdur": "3.1s",
    },
  },
];

/** 홈 히어로 — 터미널 소개 + 스택 의인화 도트 캐릭터. */
export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="relative mx-auto min-h-[360px] max-w-5xl px-5 py-20 sm:min-h-[400px] sm:py-28">
        {/* SEO/스크린리더용 실제 제목 */}
        <h1 className="sr-only">{site.name} — 프론트엔드를 코드로 따라가는 기록</h1>

        <TerminalIntro />

        {/* 도트 캐릭터 레이어 (장식 → aria-hidden, 클릭 통과) */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
          {PLACEMENTS.map(({ key, sprite, motion, px, className, style }) => (
            <PixelCharacter
              key={key}
              sprite={sprite}
              motion={motion}
              px={px}
              className={className}
              style={style as CSSProperties}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
