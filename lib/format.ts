/** YYYY-MM-DD → "2026년 6월 13일" (스크린리더 친화적 <time> 텍스트) */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}년 ${m}월 ${d}일`;
}
