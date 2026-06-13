import type { CSSProperties } from "react";
import type { Sprite } from "./sprites";

interface Props {
  sprite: Sprite;
  motion: "walk" | "fly";
  /** 픽셀 한 칸 크기(px) */
  px?: number;
  /** 위치 + 모션 CSS 변수(--dur/--travel/--delay/--floatdur) */
  style?: CSSProperties;
  className?: string;
}

/**
 * 도트 캐릭터 1마리. 순수 CSS 애니메이션 (서버 컴포넌트).
 * 바깥: 위치 + 가로 드리프트, 안쪽: 걷기 bob / 날기 float.
 */
export function PixelCharacter({
  sprite,
  motion,
  px = 5,
  style,
  className,
}: Props) {
  const { rows, palette, label } = sprite;
  const cols = rows[0].length;
  const gridWidth = cols * px;

  return (
    <div className={`absolute ${className ?? ""}`} style={style}>
      <div className="spr-drift">
        <div className={motion === "walk" ? "spr-bob" : "spr-float"}>
          <div
            aria-hidden="true"
            className="grid"
            style={{
              gridTemplateColumns: `repeat(${cols}, ${px}px)`,
              width: gridWidth,
            }}
          >
            {rows.flatMap((row, y) =>
              row.split("").map((ch, x) => (
                <span
                  key={`${x}-${y}`}
                  style={{
                    width: px,
                    height: px,
                    background: palette[ch] ?? "transparent",
                  }}
                />
              )),
            )}
          </div>
        </div>

        {/* 발밑 그림자 (걷는 캐릭터만, bob과 분리돼 지면에 고정) */}
        {motion === "walk" && (
          <div
            aria-hidden="true"
            className="spr-shadow mx-auto rounded-[50%] bg-black"
            style={{ width: gridWidth * 0.7, height: Math.max(2, px - 1) }}
          />
        )}

        <div className="mt-1 text-center font-mono text-[9px] leading-none text-muted/70">
          {label}
        </div>
      </div>
    </div>
  );
}
