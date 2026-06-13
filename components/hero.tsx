import { site } from "@/lib/site";

/** 홈 히어로 — 사이트의 한 줄 정체성. "거창하지 않게" 텍스트 중심. */
export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-5xl px-5 py-20 sm:py-28">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {site.hero.title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {site.hero.subtitle}
        </p>
      </div>
    </section>
  );
}
