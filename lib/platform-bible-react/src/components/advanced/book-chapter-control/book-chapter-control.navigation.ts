import { Direction } from '@/utils/dir-helper.util';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { ChevronDown, ChevronsLeft, ChevronsRight, ChevronUp } from 'lucide-react';
import { ComponentType, useCallback, useMemo } from 'react';
import { LanguageStrings } from 'platform-bible-utils';
import {
  getNextChapterRef,
  getNextVerseRef,
  getPreviousChapterRef,
  getPreviousVerseRef,
} from 'platform-bible-utils/experimental';

export interface QuickNavButton {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  icon: ComponentType<{ className?: string }>;
  group: 'chapter' | 'verse';
}

/** Whether stepping to `newRef` would do nothing: there is no target, or it equals `scrRef`. */
function isNoOpNavigation(
  scrRef: SerializedVerseRef,
  newRef: SerializedVerseRef | undefined,
): boolean {
  return (
    !newRef ||
    (newRef.book === scrRef.book &&
      newRef.chapterNum === scrRef.chapterNum &&
      newRef.verseNum === scrRef.verseNum)
  );
}

export function useQuickNavButtons(
  scrRef: SerializedVerseRef,
  availableBooks: string[],
  direction: Direction,
  handleSubmit: (scrRef: SerializedVerseRef) => void,
  localizedStrings?: LanguageStrings,
): QuickNavButton[] {
  // The buttons pass availableBooks (so navigation honors books-present and rolls across book
  // boundaries the way the keyboard commands do) but intentionally pass no ScriptureBounds — there
  // is no versification source here, so verse navigation keeps its pre-versification
  // floor-at-0 / unbounded-increment behavior within a book. Making the buttons versification-aware
  // to match the keyboard commands is tracked in PT-4379.
  //
  // Each target ref is computed once and reused for both the click handler and the disabled state,
  // so the button is disabled exactly when the step would be a no-op (no target, or the same ref).
  const previousChapterRef = useMemo(
    () => getPreviousChapterRef(scrRef, availableBooks),
    [scrRef, availableBooks],
  );
  const nextChapterRef = useMemo(
    () => getNextChapterRef(scrRef, availableBooks),
    [scrRef, availableBooks],
  );
  const previousVerseRef = useMemo(
    () => getPreviousVerseRef(scrRef, availableBooks),
    [scrRef, availableBooks],
  );
  const nextVerseRef = useMemo(
    () => getNextVerseRef(scrRef, availableBooks),
    [scrRef, availableBooks],
  );

  const submitIfChanged = useCallback(
    (newRef: SerializedVerseRef | undefined) => {
      if (newRef) handleSubmit(newRef);
    },
    [handleSubmit],
  );

  return useMemo(() => {
    return [
      {
        onClick: () => submitIfChanged(previousChapterRef),
        disabled: isNoOpNavigation(scrRef, previousChapterRef),
        title:
          localizedStrings?.['%webView_bookChapterControl_previousChapter%'] ?? 'Previous chapter',
        icon: direction === 'ltr' ? ChevronsLeft : ChevronsRight,
        group: 'chapter' as const,
      },
      {
        onClick: () => submitIfChanged(nextChapterRef),
        disabled: isNoOpNavigation(scrRef, nextChapterRef),
        title: localizedStrings?.['%webView_bookChapterControl_nextChapter%'] ?? 'Next chapter',
        icon: direction === 'ltr' ? ChevronsRight : ChevronsLeft,
        group: 'chapter' as const,
      },
      {
        onClick: () => submitIfChanged(previousVerseRef),
        disabled: isNoOpNavigation(scrRef, previousVerseRef),
        title: localizedStrings?.['%webView_bookChapterControl_previousVerse%'] ?? 'Previous verse',
        icon: ChevronUp,
        group: 'verse' as const,
      },
      {
        onClick: () => submitIfChanged(nextVerseRef),
        disabled: isNoOpNavigation(scrRef, nextVerseRef),
        title: localizedStrings?.['%webView_bookChapterControl_nextVerse%'] ?? 'Next verse',
        icon: ChevronDown,
        group: 'verse' as const,
      },
    ];
  }, [
    scrRef,
    direction,
    submitIfChanged,
    previousChapterRef,
    previousVerseRef,
    nextVerseRef,
    nextChapterRef,
    localizedStrings,
  ]);
}
