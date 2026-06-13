import Link from "next/link";
import { site } from "@/lib/site";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "/articles", label: "글" },
  { href: "/notes", label: "노트" },
  { href: "/about", label: "소개" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5">
        {/* 회전하는 LP판 로고: hover하면 멈추고 저작자 표시가 뜬다.
            홈 링크와 저작자 링크는 형제 요소(앵커 중첩 방지). */}
        <div className="group relative flex items-center">
          <Link
            href="/"
            aria-label={`${site.name} 홈`}
            className="flex items-center rounded-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            {/* 검은 바이닐이라 다크 배경에 묻힘 → 다크모드에서 반전+색상보정으로 보이게 */}
            <img
              src={site.logo.src}
              alt=""
              aria-hidden="true"
              width={28}
              height={28}
              className="lp-spin group-hover:[animation-play-state:paused] dark:invert dark:hue-rotate-180"
            />
          </Link>
          <a
            href={site.logo.attribution.href}
            target="_blank"
            rel="noreferrer"
            className="pointer-events-none absolute left-0 top-full z-50 mt-2 whitespace-nowrap rounded-md border border-border bg-surface px-2 py-1 text-[10px] text-muted opacity-0 shadow-sm transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100"
          >
            LP disc icon by {site.logo.attribution.author} — Flaticon
          </a>
        </div>

        <nav aria-label="주요" className="flex items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
          <div className="ml-1">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
