"use client";

import { useEffect, useRef, type VideoHTMLAttributes } from "react";

interface Props extends VideoHTMLAttributes<HTMLVideoElement> {
  /** 재생 시작 지점(초) */
  start?: number;
  /** 재생 종료 지점(초). 도달하면 start로 되돌아가 구간을 반복한다. */
  end?: number;
}

/**
 * 동영상의 [start, end] 구간만 반복 재생한다.
 * 네이티브 loop은 파일 전체(0~끝)를 돌리므로, 구간 루프는 JS로 직접 처리한다.
 */
export function ClipVideo({ start = 0, end, ...rest }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const toStart = () => {
      if (video.currentTime < start || (end != null && video.currentTime >= end)) {
        video.currentTime = start;
      }
    };
    const onTimeUpdate = () => {
      if (end != null && video.currentTime >= end) {
        video.currentTime = start;
        if (video.paused) void video.play().catch(() => {});
      }
    };
    const onEnded = () => {
      video.currentTime = start;
      void video.play().catch(() => {});
    };

    if (video.readyState >= 1) toStart();
    video.addEventListener("loadedmetadata", toStart);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("loadedmetadata", toStart);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [start, end]);

  // loop은 직접 관리하므로 전달하지 않는다.
  return <video ref={ref} {...rest} />;
}
