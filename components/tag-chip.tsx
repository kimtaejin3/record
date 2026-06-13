/** 태그 표시용 칩. v1에서는 필터 기능 없이 메타데이터로만 노출. */
export function TagChip({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center rounded-md border border-border bg-surface px-2 py-0.5 text-xs font-medium text-muted">
      #{tag}
    </span>
  );
}
