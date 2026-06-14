"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/toc";

/**
 * 우측 고정 목차 + 스크롤 스파이.
 * IntersectionObserver로 화면 상단에 가장 가까운 헤딩을 현재 섹션으로 하이라이트한다.
 */
export function Toc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        // 보이는 헤딩 중 가장 위쪽 것을 현재 위치로
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActiveId(topmost.target.id);
      },
      // 상단 헤더(약 56px) 아래 ~ 화면 위쪽 30% 구간에 들어온 헤딩을 활성으로
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="목차" className="text-sm">
      <p className="mb-3 font-medium tracking-tight">목차</p>
      <ul className="border-l border-border">
        {items.map((item) => {
          const active = activeId === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={active ? "location" : undefined}
                className={`-ml-px block border-l-2 py-1 leading-snug transition-colors ${
                  item.level === 3 ? "pl-6" : "pl-3"
                } ${
                  active
                    ? "border-accent text-accent"
                    : "border-transparent text-muted hover:border-border hover:text-fg"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
