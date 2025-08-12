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

export function useQuickNavButtons(
  scrRef: SerializedVerseRef,
  availableBooks: string[],
  direction: Direction,
  handleSubmit: (scrRef: SerializedVerseRef) => void,
): QuickNavButton[] {
  const handlePreviousChapter = useCallback(() => {
    if (scrRef.chapterNum > 1) {
      handleSubmit({
        book: scrRef.book,
        chapterNum: scrRef.chapterNum - 1,
        verseNum: 1,
      });
    } else {
      // Go to previous book's last chapter
      const currentBookIndex = availableBooks.indexOf(scrRef.book);
      if (currentBookIndex > 0) {
        const previousBook = availableBooks[currentBookIndex - 1];
        const lastChapter = Math.max(fetchEndChapter(previousBook), 1);
        handleSubmit({
          book: previousBook,
          chapterNum: lastChapter,
          verseNum: 1,
        });
      }
    }
  }, [scrRef, availableBooks, handleSubmit]);

  const handleNextChapter = useCallback(() => {
    const maxChapter = fetchEndChapter(scrRef.book);
    if (scrRef.chapterNum < maxChapter) {
      handleSubmit({
        book: scrRef.book,
        chapterNum: scrRef.chapterNum + 1,
        verseNum: 1,
      });
    } else {
      // Go to next book's first chapter
      const currentBookIndex = availableBooks.indexOf(scrRef.book);
      if (currentBookIndex < availableBooks.length - 1) {
        const nextBook = availableBooks[currentBookIndex + 1];
        handleSubmit({
          book: nextBook,
          chapterNum: 1,
          verseNum: 1,
        });
      }
    }
  }, [scrRef, availableBooks, handleSubmit]);

  const handlePreviousVerse = useCallback(() => {
    handleSubmit({
      book: scrRef.book,
      chapterNum: scrRef.chapterNum,
      verseNum: scrRef.verseNum > 1 ? scrRef.verseNum - 1 : 0,
    });
  }, [scrRef, handleSubmit]);

  const handleNextVerse = useCallback(() => {
    handleSubmit({
      book: scrRef.book,
      chapterNum: scrRef.chapterNum,
      verseNum: scrRef.verseNum + 1,
    });
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
            fetchEndChapter(scrRef.book) === -1) &&
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
