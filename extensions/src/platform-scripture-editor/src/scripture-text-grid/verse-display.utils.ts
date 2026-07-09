/**
 * Parses a (possibly combined/partial) verse marker into a numeric range. `"5"` → `{5,5}`,
 * `"14-15"` → `{14,15}`, `"1-3a"` → `{1,3}`, `"3a"` → `{3,3}`. Non-numeric → `{NaN,NaN}`.
 */
export function parseVerseRange(marker: string): { start: number; end: number } {
  const parts = marker.split('-');
  const start = parseInt(parts[0], 10);
  const end = parts.length > 1 ? parseInt(parts[parts.length - 1], 10) : start;
  return { start, end };
}

/** Whether a (possibly combined) verse marker covers `verseNum`. */
export function verseRangeIncludes(marker: string, verseNum: number): boolean {
  const { start, end } = parseVerseRange(marker);
  if (Number.isNaN(start) || Number.isNaN(end)) return false;
  return verseNum >= start && verseNum <= end;
}
