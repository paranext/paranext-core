import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { ScriptureRange } from 'platform-scripture';

/* All these types and functions could live in `check-aggregator.service.ts`, but to get jest tests
 * to run properly, it was much easier to pull these standalone functions into a different file and
 * test them directly.
 */

export function isWithinRange(range: ScriptureRange, verseRef: SerializedVerseRef): boolean {
  const startBookNum = Canon.bookIdToNumber(range.start.book);
  const endBookNum = range.end?.book ? Canon.bookIdToNumber(range.end.book) : startBookNum;
  const bookNum = Canon.bookIdToNumber(verseRef.book);
  if (bookNum < startBookNum || bookNum > endBookNum) return false;

  const startChapterNum = range.start.chapterNum;
  const endChapterNum = range.end?.chapterNum ?? 999;
  if (verseRef.chapterNum < startChapterNum || verseRef.chapterNum > endChapterNum) return false;

  // Don't worry about verse numbers for now since the UI only works at the chapter level
  return true;
}
