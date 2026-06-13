"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

/**
 * 다크/라이트 토글. 유일한 인터랙티브 위젯이라 라이브러리 없이 <button> 한 개로 구현.
 * - aria-label/aria-pressed로 스크린리더에 상태 전달
 * - 마운트 전에는 아이콘을 숨겨 SSR/CSR 불일치(hydration mismatch) 방지
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      aria-pressed={isDark}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-surface hover:text-fg"
    >
      {/* 마운트 전엔 빈 공간(레이아웃 시프트 방지), 마운트 후 현재 테마 아이콘 */}
      <span className="sr-only">{isDark ? "다크 모드" : "라이트 모드"}</span>
      {mounted &&
        (isDark ? (
          <SunIcon className="h-[1.15rem] w-[1.15rem]" />
        ) : (
          <MoonIcon className="h-[1.15rem] w-[1.15rem]" />
        ))}
    </button>
  );
}

function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
