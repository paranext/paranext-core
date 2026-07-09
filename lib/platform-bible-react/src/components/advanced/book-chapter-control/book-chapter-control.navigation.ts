import { Direction } from '@/utils/dir-helper.util';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { ComponentType, useCallback, useMemo } from 'react';
import { fetchEndChapter } from './book-chapter-control.utils';

export interface QuickNavButton {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  icon: ComponentType<{ className?: string }>;
}

/**
 * Versification-dependent chapter/verse bounds used to roll navigation across chapter and book
 * boundaries. Lookups return `undefined` when the bound is unknown (e.g. no project versification
 * is available), in which case navigation degrades gracefully (see each `get*Ref` function).
 */
export type ScriptureBounds = {
  /** Last chapter number of the book, or `undefined` if unknown */
  getEndChapter(book: string): number | undefined;
  /** Last verse number of the chapter in the book, or `undefined` if unknown */
  getEndVerse(book: string, chapterNum: number): number | undefined;
};

/** Last chapter of `book` from `bounds` when known, else the English-canon `fetchEndChapter`. */
function getEndChapterWithFallback(book: string, bounds?: ScriptureBounds): number {
  return bounds?.getEndChapter(book) ?? fetchEndChapter(book);
}

/**
 * Previous chapter (verse 1), rolling into the previous book's last chapter at chapter 1.
 *
 * Unlike `offsetChapter` in `platform-bible-utils` (which steps within the current book and clamps
 * at its bounds), the `get*Ref` functions honor the `availableBooks` list and roll across book
 * boundaries.
 */
export function getPreviousChapterRef(
  scrRef: SerializedVerseRef,
  availableBooks: string[],
  bounds?: ScriptureBounds,
): SerializedVerseRef | undefined {
  if (scrRef.chapterNum > 1)
    return { book: scrRef.book, chapterNum: scrRef.chapterNum - 1, verseNum: 1 };

  const currentBookIndex = availableBooks.indexOf(scrRef.book);
  if (currentBookIndex <= 0) return undefined;

  const previousBook = availableBooks[currentBookIndex - 1];
  return {
    book: previousBook,
    chapterNum: Math.max(getEndChapterWithFallback(previousBook, bounds), 1),
    verseNum: 1,
  };
}

/** Next chapter (verse 1), rolling into the next book's chapter 1 at the last chapter. */
export function getNextChapterRef(
  scrRef: SerializedVerseRef,
  availableBooks: string[],
  bounds?: ScriptureBounds,
): SerializedVerseRef | undefined {
  const maxChapter = getEndChapterWithFallback(scrRef.book, bounds);
  if (scrRef.chapterNum < maxChapter)
    return { book: scrRef.book, chapterNum: scrRef.chapterNum + 1, verseNum: 1 };

  const currentBookIndex = availableBooks.indexOf(scrRef.book);
  // A current book that is not in availableBooks (e.g. a shared scroll group ref set by another
  // project) must no-op like the other get*Ref functions — without the -1 guard, index -1 + 1
  // would "roll" to the FIRST available book
  if (currentBookIndex === -1 || currentBookIndex >= availableBooks.length - 1) return undefined;

  return { book: availableBooks[currentBookIndex + 1], chapterNum: 1, verseNum: 1 };
}

/**
 * Previous book (chapter 1 verse 1), clamped at the first available book.
 *
 * Unlike `offsetBook` in `platform-bible-utils` (which steps through the full canon), the `get*Ref`
 * functions honor the `availableBooks` list.
 */
export function getPreviousBookRef(
  scrRef: SerializedVerseRef,
  availableBooks: string[],
): SerializedVerseRef | undefined {
  const currentBookIndex = availableBooks.indexOf(scrRef.book);
  if (currentBookIndex <= 0) return undefined;
  return { book: availableBooks[currentBookIndex - 1], chapterNum: 1, verseNum: 1 };
}

/** Next book (chapter 1 verse 1), clamped at the last available book. */
export function getNextBookRef(
  scrRef: SerializedVerseRef,
  availableBooks: string[],
): SerializedVerseRef | undefined {
  const currentBookIndex = availableBooks.indexOf(scrRef.book);
  if (currentBookIndex === -1 || currentBookIndex >= availableBooks.length - 1) return undefined;
  return { book: availableBooks[currentBookIndex + 1], chapterNum: 1, verseNum: 1 };
}

/**
 * Previous verse, matching Paratext 9 (`SIL.Scripture.VerseRef.PreviousVerse`): decrement within
 * the chapter; from chapter 1 verse 1 go to verse 0 (P9 assumes verse 0 exists only at chapter 1);
 * otherwise at verse ≤ 1 roll to the previous chapter's last verse, crossing into the previous
 * available book's last chapter when at chapter 1. Returns `undefined` at the very start of the
 * available books (nowhere to go).
 *
 * Without `bounds` (or when a needed verse count is unknown) the rollover degrades: no bounds at
 * all keeps the pre-versification behavior of flooring at verse 0, and a missing verse count for a
 * known roll target lands on verse 1 of that chapter.
 */
export function getPreviousVerseRef(
  scrRef: SerializedVerseRef,
  availableBooks?: string[],
  bounds?: ScriptureBounds,
): SerializedVerseRef | undefined {
  const { book, chapterNum, verseNum } = scrRef;
  if (verseNum > 1) return { book, chapterNum, verseNum: verseNum - 1 };

  // P9 parity: verse 0 is assumed to exist at chapter 1 of every book and nowhere else
  if (verseNum === 1 && chapterNum === 1) return { book, chapterNum: 1, verseNum: 0 };

  if (!bounds) return { book, chapterNum, verseNum: 0 };

  if (chapterNum > 1) {
    const endVerse = bounds.getEndVerse(book, chapterNum - 1);
    return { book, chapterNum: chapterNum - 1, verseNum: Math.max(endVerse ?? 1, 1) };
  }

  // At chapter 1 verse 0 (or below): previous available book's last chapter's last verse
  if (!availableBooks) return undefined;
  const currentBookIndex = availableBooks.indexOf(book);
  if (currentBookIndex <= 0) return undefined;
  const previousBook = availableBooks[currentBookIndex - 1];
  const endChapter = Math.max(getEndChapterWithFallback(previousBook, bounds), 1);
  const endVerse = bounds.getEndVerse(previousBook, endChapter);
  return { book: previousBook, chapterNum: endChapter, verseNum: Math.max(endVerse ?? 1, 1) };
}

/**
 * Next verse, matching Paratext 9 (`SIL.Scripture.VerseRef.NextVerse`): increment within the
 * chapter until the last verse, then roll to the next chapter's verse 1, crossing into the next
 * available book at the last chapter. Returns `undefined` at the very end of the available books.
 *
 * Without `bounds` (or when the chapter's verse count is unknown) there is no known boundary, so
 * this keeps the pre-versification behavior of incrementing without an upper bound.
 */
export function getNextVerseRef(
  scrRef: SerializedVerseRef,
  availableBooks?: string[],
  bounds?: ScriptureBounds,
): SerializedVerseRef | undefined {
  const endVerse = bounds?.getEndVerse(scrRef.book, scrRef.chapterNum);
  if (endVerse !== undefined && scrRef.verseNum >= endVerse)
    return getNextChapterRef(scrRef, availableBooks ?? [], bounds);
  return { book: scrRef.book, chapterNum: scrRef.chapterNum, verseNum: scrRef.verseNum + 1 };
}

export function useQuickNavButtons(
  scrRef: SerializedVerseRef,
  availableBooks: string[],
  direction: Direction,
  handleSubmit: (scrRef: SerializedVerseRef) => void,
): QuickNavButton[] {
  const handlePreviousChapter = useCallback(() => {
    const newRef = getPreviousChapterRef(scrRef, availableBooks);
    if (newRef) handleSubmit(newRef);
  }, [scrRef, availableBooks, handleSubmit]);

  const handleNextChapter = useCallback(() => {
    const newRef = getNextChapterRef(scrRef, availableBooks);
    if (newRef) handleSubmit(newRef);
  }, [scrRef, availableBooks, handleSubmit]);

  // The buttons intentionally pass no ScriptureBounds (no versification source here), so verse
  // navigation keeps its floor-at-0 / unbounded behavior and these refs are always defined.
  // Making the buttons versification-aware so they match the keyboard navigation commands is
  // tracked in PT-4143.
  const handlePreviousVerse = useCallback(() => {
    const newRef = getPreviousVerseRef(scrRef);
    if (newRef) handleSubmit(newRef);
  }, [scrRef, handleSubmit]);

  const handleNextVerse = useCallback(() => {
    const newRef = getNextVerseRef(scrRef);
    if (newRef) handleSubmit(newRef);
  }, [scrRef, handleSubmit]);

  return useMemo(() => {
    return [
      {
        onClick: handlePreviousChapter,
        disabled:
          availableBooks.length === 0 ||
          (scrRef.chapterNum === 1 && availableBooks.indexOf(scrRef.book) === 0),
        title: 'Previous chapter',
        icon: direction === 'ltr' ? ChevronsLeft : ChevronsRight,
      },
      {
        onClick: handlePreviousVerse,
        disabled: availableBooks.length === 0 || scrRef.verseNum === 0,
        title: 'Previous verse',
        icon: direction === 'ltr' ? ChevronLeft : ChevronRight,
      },
      {
        onClick: handleNextVerse,
        disabled: availableBooks.length === 0,
        title: 'Next verse',
        icon: direction === 'ltr' ? ChevronRight : ChevronLeft,
      },
      {
        onClick: handleNextChapter,
        disabled:
          availableBooks.length === 0 ||
          ((scrRef.chapterNum === fetchEndChapter(scrRef.book) ||
            fetchEndChapter(scrRef.book) <= 0) &&
            availableBooks.indexOf(scrRef.book) === availableBooks.length - 1),
        title: 'Next chapter',
        icon: direction === 'ltr' ? ChevronsRight : ChevronsLeft,
      },
    ];
  }, [
    scrRef,
    availableBooks,
    direction,
    handlePreviousChapter,
    handlePreviousVerse,
    handleNextVerse,
    handleNextChapter,
  ]);
}
