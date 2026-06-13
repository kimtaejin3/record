import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";

const prettyCodeOptions: Options = {
  // 듀얼 테마: 라이트/다크 색을 인라인 CSS 변수로 출력 → globals.css에서 토글
  theme: { light: "github-light", dark: "github-dark" },
  keepBackground: false,
};

/**
 * MDX 본문을 RSC에서 빌드타임 컴파일해 렌더.
 * frontmatter는 content 레이어에서 이미 파싱하므로 여기선 본문만 받는다.
 */
export async function MDXContent({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [rehypePrettyCode, prettyCodeOptions],
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ],
      },
    },
  });

  return content;
}
