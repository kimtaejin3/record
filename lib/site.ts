/**
 * 사이트 정체성. 이름·히어로 카피·메타데이터를 여기 한 곳에서만 고치면 된다.
 * (아래는 전부 플레이스홀더 — 본인 것으로 자유롭게 바꾸세요.)
 */
export const site = {
  /** 헤더 로고 / 푸터 / 메타 타이틀에 쓰이는 블로그 이름 */
  name: "내 블로그",
  /** 한 줄 설명 (메타 description, 푸터) */
  description: "프론트엔드를 공부하고 기록하는 공간.",
  /**
   * 헤더 로고(회전하는 LP판). Flaticon 무료 아이콘은 저작자 표시가 필수다.
   * author는 Flaticon 아이콘 페이지에 표시된 제작자 이름으로 정확히 채워주세요.
   */
  logo: {
    src: "/assets/lp-disc.png",
    attribution: {
      author: "<Flaticon 제작자 이름>",
      href: "https://www.flaticon.com/free-icons/lp",
    },
  },
  /**
   * 히어로 터미널에 타이핑되는 줄들. 자유롭게 수정하세요.
   * type "cmd" → "$ " 프롬프트가 붙는 명령어 / "out" → 명령 출력.
   */
  hero: {
    lines: [
      { type: "cmd", text: "whoami" },
      { type: "out", text: "Frontend Engineer" },
      { type: "cmd", text: "cat blog.md" },
      { type: "out", text: "프론트엔드를 코드로 돌려보며 기록합니다" },
    ],
  },
} as const;
