import type { SerializedVerseRef } from '@sillsdev/scripture';

const SCR_REF_PATTERN = /^([A-Za-z0-9]{3})\s+(\d+):(\d+)$/;

/**
 * Parse a scripture reference string ("GEN 1:1") into a `SerializedVerseRef`.
 *
 * Returns `undefined` for malformed input. Book is uppercased; chapter/verse must be integers.
 * Whitespace around the input is trimmed; internal whitespace runs are collapsed to a single space
 * before matching.
 */
export function parseScrRef(input: string): SerializedVerseRef | undefined {
  const trimmed = input.trim();
  if (!trimmed) return undefined;
  const collapsed = trimmed.replace(/\s+/g, ' ');
  const match = SCR_REF_PATTERN.exec(collapsed);
  if (!match) return undefined;
  const [, book, chapterStr, verseStr] = match;
  const chapterNum = Number.parseInt(chapterStr, 10);
  const verseNum = Number.parseInt(verseStr, 10);
  if (!Number.isInteger(chapterNum) || !Number.isInteger(verseNum)) return undefined;
  return { book: book.toUpperCase(), chapterNum, verseNum };
}
