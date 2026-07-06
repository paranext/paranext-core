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

/** Previous chapter (verse 1), rolling into the previous book's last chapter at chapter 1. */
export function getPreviousChapterRef(
  scrRef: SerializedVerseRef,
  availableBooks: string[],
): SerializedVerseRef | undefined {
  if (scrRef.chapterNum > 1)
    return { book: scrRef.book, chapterNum: scrRef.chapterNum - 1, verseNum: 1 };

  const currentBookIndex = availableBooks.indexOf(scrRef.book);
  if (currentBookIndex <= 0) return undefined;

  const previousBook = availableBooks[currentBookIndex - 1];
  return {
    book: previousBook,
    chapterNum: Math.max(fetchEndChapter(previousBook), 1),
    verseNum: 1,
  };
}

/** Next chapter (verse 1), rolling into the next book's chapter 1 at the last chapter. */
export function getNextChapterRef(
  scrRef: SerializedVerseRef,
  availableBooks: string[],
): SerializedVerseRef | undefined {
  const maxChapter = fetchEndChapter(scrRef.book);
  if (scrRef.chapterNum < maxChapter)
    return { book: scrRef.book, chapterNum: scrRef.chapterNum + 1, verseNum: 1 };

  const currentBookIndex = availableBooks.indexOf(scrRef.book);
  if (currentBookIndex >= availableBooks.length - 1) return undefined;

  return { book: availableBooks[currentBookIndex + 1], chapterNum: 1, verseNum: 1 };
}

/** Previous book (chapter 1 verse 1), clamped at the first available book. */
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

/** Previous verse in the same chapter, flooring at verse 0. */
export function getPreviousVerseRef(scrRef: SerializedVerseRef): SerializedVerseRef {
  return {
    book: scrRef.book,
    chapterNum: scrRef.chapterNum,
    verseNum: scrRef.verseNum > 1 ? scrRef.verseNum - 1 : 0,
  };
}

/** Next verse in the same chapter (no upper bound). */
export function getNextVerseRef(scrRef: SerializedVerseRef): SerializedVerseRef {
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

  const handlePreviousVerse = useCallback(() => {
    handleSubmit(getPreviousVerseRef(scrRef));
  }, [scrRef, handleSubmit]);

  const handleNextVerse = useCallback(() => {
    handleSubmit(getNextVerseRef(scrRef));
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
