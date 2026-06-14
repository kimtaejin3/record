import GithubSlugger from "github-slugger";

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * MDX 본문에서 h2·h3 헤딩을 뽑아 목차를 만든다.
 * id는 rehype-slug와 동일한 github-slugger로 생성하므로 본문 헤딩 id와 정확히 일치한다.
 * (rehype-slug는 문서의 모든 헤딩을 순서대로 slug 처리하며 중복 카운터를 유지하므로,
 *  여기서도 h1~h6를 같은 순서로 slug해 카운터를 맞추고 h2·h3만 목차에 담는다.)
 */
export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;

  for (const line of markdown.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{1,6})\s+(.+)$/.exec(line);
    if (!match) continue;

    const level = match[1].length;
    // 인라인 마크다운(코드·강조·링크 표기) 제거 후 텍스트만
    const text = match[2]
      .replace(/`([^`]+)`/g, "$1")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_]/g, "")
      .trim();

    const id = slugger.slug(text); // 모든 레벨을 순서대로 slug → 카운터 동기화
    if (level === 2 || level === 3) {
      items.push({ id, text, level });
    }
  }

  return items;
}
