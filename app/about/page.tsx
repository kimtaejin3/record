import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { MDXContent } from "@/components/mdx-content";
import { profile } from "@/lib/profile";

export const metadata: Metadata = {
  title: "소개",
  description: `${profile.name} · ${profile.role}`,
};

function getAboutBody(): string {
  return fs.readFileSync(
    path.join(process.cwd(), "content", "about.mdx"),
    "utf8",
  );
}

export default async function AboutPage() {
  const body = getAboutBody();

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:py-16">
      {/* 소개 */}
      <header>
        <h1 className="text-3xl font-bold tracking-tight">{profile.name}</h1>
        <p className="mt-1 text-accent">{profile.role}</p>
        <p className="mt-3 text-muted">{profile.tagline}</p>
      </header>

      <div className="prose prose-neutral mt-6 max-w-none dark:prose-invert">
        <MDXContent source={body} />
      </div>

      {/* 기술 스택 */}
      <section aria-labelledby="stack-heading" className="mt-12">
        <h2 id="stack-heading" className="text-lg font-semibold tracking-tight">
          기술 스택
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {profile.stack.map((item) => (
            <li
              key={item}
              className="rounded-lg border border-border bg-surface px-3 py-1 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* 프로젝트 */}
      <section aria-labelledby="projects-heading" className="mt-12">
        <h2 id="projects-heading" className="text-lg font-semibold tracking-tight">
          프로젝트
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {profile.projects.map((project) => {
            const inner = (
              <>
                <h3 className="font-semibold group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {project.description}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-md border border-border px-2 py-0.5 text-xs text-muted"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </>
            );

            return (
              <li
                key={project.title}
                className="group rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/60"
              >
                {project.link ? (
                  <a href={project.link} className="block">
                    {inner}
                  </a>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </section>

      {/* 링크 */}
      <section aria-labelledby="links-heading" className="mt-12">
        <h2 id="links-heading" className="sr-only">
          연락처
        </h2>
        <div className="flex flex-wrap gap-4 text-sm">
          <a
            href={`mailto:${profile.email}`}
            className="text-muted transition-colors hover:text-fg"
          >
            {profile.email}
          </a>
          <a
            href={profile.github}
            className="text-muted transition-colors hover:text-fg"
            rel="me noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </div>
      </section>
    </div>
  );
}
