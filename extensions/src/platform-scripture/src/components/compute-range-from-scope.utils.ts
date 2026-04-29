import type { SerializedVerseRef } from '@sillsdev/scripture';
import type { Scope } from 'platform-bible-react';
import type { ChecklistScriptureRange } from 'platform-scripture';

// 999 is the documented "end of chapter / end of book" sentinel for ScriptureRange (see platform-scripture.d.ts).
const FALLBACK_END_VERSE = 999;
const FALLBACK_END_CHAPTER = 999;

export interface ComputeRangeFromScopeArgs {
  scope: Scope;
  ref: SerializedVerseRef;
  rangeStart: SerializedVerseRef;
  rangeEnd: SerializedVerseRef;
  /** Returns final verse number for (book, chapter) or 0 if unknown. */
  getEndVerse: (bookId: string, chapterNum: number) => number;
  /**
   * Returns final chapter number for the book or 0 if unknown. Optional — only used for `'book'`
   * scope.
   */
  getLastChapter?: (bookId: string) => number;
}

/**
 * Compute the wire `ChecklistScriptureRange` from the user's chosen scope.
 *
 * `verse` / `chapter` / `book` snapshot from `ref` (PT9-faithful: caller passes the _frozen_
 * reference, not the live one). `range` echoes user-picked rangeStart/rangeEnd. `selectedBooks` and
 * `selectedText` are unsupported by the backend and return `undefined`.
 *
 * VAL-003: when `chapterNum === 1`, start verseNum is 0 to include any introductory material.
 */
export function computeRangeFromScope({
  scope,
  ref,
  rangeStart,
  rangeEnd,
  getEndVerse,
  getLastChapter,
}: ComputeRangeFromScopeArgs): ChecklistScriptureRange | undefined {
  switch (scope) {
    case 'verse':
      return { start: ref, end: ref };
    case 'chapter': {
      const startVerseNum = ref.chapterNum === 1 ? 0 : 1;
      const endVerseNum = getEndVerse(ref.book, ref.chapterNum) || FALLBACK_END_VERSE;
      return {
        start: { book: ref.book, chapterNum: ref.chapterNum, verseNum: startVerseNum },
        end: { book: ref.book, chapterNum: ref.chapterNum, verseNum: endVerseNum },
      };
    }
    case 'book': {
      const lastChapter = getLastChapter?.(ref.book) || FALLBACK_END_CHAPTER;
      const endVerseNum = getEndVerse(ref.book, lastChapter) || FALLBACK_END_VERSE;
      return {
        start: { book: ref.book, chapterNum: 1, verseNum: 0 },
        end: { book: ref.book, chapterNum: lastChapter, verseNum: endVerseNum },
      };
    }
    case 'range':
      return { start: rangeStart, end: rangeEnd };
    case 'selectedBooks':
    case 'selectedText':
      return undefined;
    default: {
      // Exhaustiveness check: if `Scope` grows in platform-bible-react and a new value is added,
      // TypeScript will flag this assignment as a compile-time error so the helper is forced to
      // grow with the union.
      const _exhaustive: never = scope;
      void _exhaustive;
      return undefined;
    }
  }
}
