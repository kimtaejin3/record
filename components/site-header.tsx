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
        <Link
          href="/"
          aria-label={`${site.name} 홈`}
          className="flex items-center rounded-lg"
        >
          <LogoMark />
        </Link>

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

function LogoMark() {
  return (
    <svg
      viewBox="0 0 28 28"
      width="28"
      height="28"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 hover:scale-105"
    >
      <defs>
        <linearGradient
          id="logo-grad"
          x1="0"
          y1="0"
          x2="28"
          y2="28"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#7c5ce6" />
        </linearGradient>
      </defs>
      {/* 둥근 사각 배지 */}
      <rect width="28" height="28" rx="8" fill="url(#logo-grad)" />
      {/* 더블 셰브론 ❯❯ — '실행/run' 모티프 */}
      <path
        d="M9 10l4 4-4 4M15 10l4 4-4 4"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
