/**
 * 도트(픽셀) 캐릭터 데이터.
 * 각 스프라이트는 9×11 매트릭스. rows의 글자 한 개 = 픽셀 한 칸.
 * palette가 글자를 색으로 매핑한다. "." = 투명.
 *
 * 기술 스택 의인화:
 *  - JS  → 전사(노란 갑옷 + 검)
 *  - TS  → 기사(파란 갑옷 + 방패, 타입으로 무장한 JS)
 *  - React → 마법사(청록 로브 + 지팡이 오브)
 *  - Next  → 닌자(흑백, 빠름)
 *
 * label은 캐릭터 아래 표시. 추후 레벨 시스템을 붙인다면 여기에 level 필드를 더하면 된다.
 */
export interface Sprite {
  rows: string[];
  palette: Record<string, string>;
  label: string;
}

const SKIN = "#f3c98b";
const EYE = "#15120c";

// JS 전사
export const warrior: Sprite = {
  label: "JS",
  palette: {
    O: "#6e5f00",
    B: "#f7df1e",
    A: "#b88a00",
    S: SKIN,
    E: EYE,
    W: "#dcdce4",
  },
  rows: [
    ".........",
    "...OOO...",
    "..OBBBO..",
    "..OSSSO.W",
    "...ESE..W",
    "...SSS..W",
    "..OBBBO.A",
    ".OBBBBBO.",
    "..OABAO..",
    "..OB.BO..",
    "..OO.OO..",
  ],
};

// TS 기사
export const knight: Sprite = {
  label: "TS",
  palette: {
    O: "#0c2a4f",
    B: "#3178c6",
    A: "#9ecbff",
    S: SKIN,
    E: EYE,
  },
  rows: [
    ".........",
    "...OOO...",
    "..OBBBO..",
    "..OSSSO..",
    "...EAE...",
    "...SSS...",
    "A.OBBBO..",
    "AAOBBBBO.",
    "A.OABAO..",
    "..OB.BO..",
    "..OO.OO..",
  ],
};

// React 마법사
export const wizard: Sprite = {
  label: "React",
  palette: {
    O: "#0b3a47",
    B: "#1f6f8b",
    A: "#61dafb",
    S: SKIN,
    E: EYE,
  },
  rows: [
    "....A....",
    "...AAA...",
    "..OAAAO..",
    "..OSSSO.A",
    "...ESE..O",
    "...SSS..O",
    "..OBBBO.O",
    ".OBBBBBO.",
    "..OBABO..",
    "..OBBBO..",
    "..OOOOO..",
  ],
};

// Next 닌자
export const ninja: Sprite = {
  label: "Next",
  palette: {
    O: "#0b0d10",
    B: "#1c2128",
    A: "#ffffff",
    S: SKIN,
    E: EYE,
  },
  rows: [
    ".........",
    "..OOOOO..",
    "..OOOOO..",
    "..OBBBO..",
    "..OA.AO..",
    "..OBBBO..",
    "..AAAAA..",
    ".OBBBBBO.",
    "..OBBBO..",
    "..OB.BO..",
    "..OO.OO..",
  ],
};
