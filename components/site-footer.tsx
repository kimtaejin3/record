import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-1 px-5 py-8 text-sm text-muted">
        <p>
          © {new Date().getFullYear()} · {site.description}
        </p>
      </div>
    </footer>
  );
}
