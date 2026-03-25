import { BookItem } from '@/components/shared/book-item.component';
import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from '@/components/shadcn-ui/command';
import { cn } from '@/utils/shadcn-ui.util';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { ArrowLeft, BookOpenIcon, ClockIcon, CornerDownLeftIcon, HashIcon } from 'lucide-react';
import { formatScrRef, getSectionForBook, Section } from 'platform-bible-utils';
import {
  getSectionLongName,
  getLocalizedBookName,
  ALL_BOOK_IDS,
  ALL_ENGLISH_BOOK_NAMES,
  doesBookMatchQuery,
} from '@/components/shared/book.utils';
import { KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  calculateTopMatch,
  fetchEndChapter,
  getKeyCharacterType,
} from '../book-chapter-control/book-chapter-control.utils';
import { CommandNavigatorProps } from './command-navigator.types';

/**
 * `CommandNavigator` is a dialog-based command palette for navigating scripture references. It
 * provides searchable book/chapter selection with keyboard navigation, direct match banners,
 * navigation history, and a responsive chapter grid.
 */
export function CommandNavigator({
  scrRef,
  handleSubmit,
  className,
  getActiveBookIds,
  localizedBookNames,
  localizedStrings,
  recentSearches,
  onAddRecentSearch,
  id,
}: CommandNavigatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [focusedBookIndex, setFocusedBookIndex] = useState(-1);
  const [focusedChapter, setFocusedChapter] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const chapterGridRef = useRef<HTMLDivElement>(null);

  // #region Available books and filtering

  const activeBookIds = useMemo(() => {
    return getActiveBookIds ? getActiveBookIds() : ALL_BOOK_IDS;
  }, [getActiveBookIds]);

  const availableBooksByType = useMemo(() => {
    const grouped: Record<Section, string[]> = {
      [Section.OT]: activeBookIds.filter((bookId) => Canon.isBookOT(bookId)),
      [Section.NT]: activeBookIds.filter((bookId) => Canon.isBookNT(bookId)),
      [Section.DC]: activeBookIds.filter((bookId) => Canon.isBookDC(bookId)),
      [Section.Extra]: activeBookIds.filter((bookId) => Canon.extraBooks().includes(bookId)),
    };
    return grouped;
  }, [activeBookIds]);

  const availableBooks = useMemo(() => {
    return Object.values(availableBooksByType).flat();
  }, [availableBooksByType]);

  const filteredBooksByType = useMemo(() => {
    if (!searchQuery.trim()) return availableBooksByType;

    const filtered: Record<Section, string[]> = {
      [Section.OT]: [],
      [Section.NT]: [],
      [Section.DC]: [],
      [Section.Extra]: [],
    };

    const bookTypes: Section[] = [Section.OT, Section.NT, Section.DC, Section.Extra];
    bookTypes.forEach((type) => {
      filtered[type] = availableBooksByType[type].filter((bookId) => {
        return doesBookMatchQuery(bookId, searchQuery, localizedBookNames);
      });
    });

    return filtered;
  }, [availableBooksByType, searchQuery, localizedBookNames]);

  const filteredBooks = useMemo(() => {
    return Object.values(filteredBooksByType).flat();
  }, [filteredBooksByType]);

  // Top match: resolved book+chapter from smart parsing
  const topMatch = useMemo(
    () => calculateTopMatch(searchQuery, availableBooks, localizedBookNames),
    [searchQuery, availableBooks, localizedBookNames],
  );

  // Unique book match: exactly one book matches but no chapter specified
  const uniqueBookMatch = useMemo(() => {
    if (!searchQuery.trim()) return undefined;
    if (topMatch?.chapterNum !== undefined) return undefined;
    if (topMatch) return topMatch.book;
    // Check if exactly one book matches the filter
    if (filteredBooks.length === 1) return filteredBooks[0];
    return undefined;
  }, [searchQuery, topMatch, filteredBooks]);

  // The book to show chapters for (either from direct match or unique match)
  const resolvedBookId = topMatch?.book ?? uniqueBookMatch ?? undefined;

  // #endregion

  // #region Submit and select handlers

  const handleSubmitAndAddToRecent = useCallback(
    (newScrRef: SerializedVerseRef) => {
      handleSubmit(newScrRef);
      if (onAddRecentSearch) {
        onAddRecentSearch(newScrRef);
      }
    },
    [handleSubmit, onAddRecentSearch],
  );

  const handleNavigate = useCallback(
    (bookId: string, chapter: number) => {
      handleSubmitAndAddToRecent({
        book: bookId,
        chapterNum: chapter,
        verseNum: 1,
      });
      setIsOpen(false);
    },
    [handleSubmitAndAddToRecent],
  );

  const handleBookSelect = useCallback(
    (bookId: string) => {
      const endChapter = fetchEndChapter(bookId);
      if (endChapter <= 1) {
        handleNavigate(bookId, 1);
        return;
      }
      // Show chapters for this book
      const bookName = localizedBookNames
        ? getLocalizedBookName(bookId, localizedBookNames)
        : ALL_ENGLISH_BOOK_NAMES[bookId];
      setSearchQuery(`${bookName} `);
      setFocusedBookIndex(-1);
      setFocusedChapter(-1);
      inputRef.current?.focus();
    },
    [handleNavigate, localizedBookNames],
  );

  const handleChapterSelect = useCallback(
    (chapter: number) => {
      if (!resolvedBookId) return;
      handleNavigate(resolvedBookId, chapter);
    },
    [resolvedBookId, handleNavigate],
  );

  const handleDirectMatchSelect = useCallback(() => {
    if (topMatch) {
      handleNavigate(topMatch.book, topMatch.chapterNum ?? 1);
    }
  }, [topMatch, handleNavigate]);

  // #endregion

  // #region Dialog open/close

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (open) {
      setSearchQuery('');
      setFocusedBookIndex(-1);
      setFocusedChapter(-1);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, []);

  // Scroll to current book when opening with empty search
  useEffect(() => {
    if (!isOpen) return undefined;
    const timer = setTimeout(() => {
      if (!listRef.current || searchQuery) return;
      const currentBookBtn = listRef.current.querySelector(
        `[data-book-id="${scrRef.book}"]`,
      ) as HTMLElement;
      if (currentBookBtn) {
        currentBookBtn.scrollIntoView({ block: 'center', behavior: 'instant' });
      }
    }, 150);
    return () => clearTimeout(timer);
  }, [isOpen, scrRef.book, searchQuery]);

  // #endregion

  // #region Keyboard navigation

  const getGridCols = useCallback((): number => {
    if (!chapterGridRef.current) return 10;
    const buttons = chapterGridRef.current.querySelectorAll('[data-chapter-btn]');
    if (buttons.length < 2) return 1;
    const firstTop = (buttons[0] as HTMLElement).offsetTop;
    let cols = 0;
    for (let i = 0; i < buttons.length; i++) {
      if ((buttons[i] as HTMLElement).offsetTop === firstTop) cols++;
      else break;
    }
    return cols || 1;
  }, []);

  const focusInput = useCallback(() => {
    setFocusedBookIndex(-1);
    setFocusedChapter(-1);
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Escape: clear search or close
      if (e.key === 'Escape') {
        if (resolvedBookId && searchQuery) {
          setSearchQuery('');
          setFocusedChapter(-1);
          e.stopPropagation();
          e.preventDefault();
        } else {
          setIsOpen(false);
        }
        return;
      }

      // Tab: move between input and content areas
      if (e.key === 'Tab') {
        e.preventDefault();
        e.stopPropagation();
        if (e.shiftKey) {
          focusInput();
        } else if (resolvedBookId) {
          setFocusedChapter(0);
        } else if (filteredBooks.length > 0) {
          setFocusedBookIndex(0);
        }
        return;
      }

      // Chapter grid navigation
      if (resolvedBookId && focusedChapter >= 0) {
        const totalChapters = fetchEndChapter(resolvedBookId);
        const cols = getGridCols();

        const updateChapterFocus = (newIndex: number) => {
          setFocusedChapter(newIndex);
        };

        if (e.key === 'ArrowRight') {
          e.preventDefault();
          if (focusedChapter < totalChapters - 1) updateChapterFocus(focusedChapter + 1);
          return;
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          if (focusedChapter > 0) updateChapterFocus(focusedChapter - 1);
          return;
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const next = focusedChapter + cols;
          if (next < totalChapters) updateChapterFocus(next);
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          const next = focusedChapter - cols;
          if (next < 0) focusInput();
          else updateChapterFocus(next);
          return;
        }
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleChapterSelect(focusedChapter + 1);
          return;
        }

        // Any letter/digit: go back to input and type
        const { isLetter, isDigit } = getKeyCharacterType(e.key);
        if (isLetter || isDigit) {
          e.preventDefault();
          setSearchQuery((prev) => prev + e.key);
          setFocusedChapter(-1);
          inputRef.current?.focus();
        }
        return;
      }

      // Book list navigation
      if (!resolvedBookId && filteredBooks.length > 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          e.stopPropagation();
          if (focusedBookIndex < 0) setFocusedBookIndex(0);
          else if (focusedBookIndex + 1 < filteredBooks.length)
            setFocusedBookIndex(focusedBookIndex + 1);
          return;
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          e.stopPropagation();
          if (focusedBookIndex < 0) return;
          if (focusedBookIndex - 1 < 0) focusInput();
          else setFocusedBookIndex(focusedBookIndex - 1);
          return;
        }
      }

      // Input-level navigation into chapters
      if (resolvedBookId && focusedChapter < 0) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          const startIndex = topMatch?.chapterNum ? topMatch.chapterNum - 1 : 0;
          setFocusedChapter(startIndex);
          return;
        }
      }

      // Enter: direct match or single book selection
      if (e.key === 'Enter') {
        if (topMatch?.chapterNum) {
          handleDirectMatchSelect();
          return;
        }
        if (!resolvedBookId && focusedBookIndex >= 0 && focusedBookIndex < filteredBooks.length) {
          e.preventDefault();
          handleBookSelect(filteredBooks[focusedBookIndex]);
          return;
        }
        if (!resolvedBookId && filteredBooks.length === 1) {
          handleBookSelect(filteredBooks[0]);
          return;
        }
      }

      // Space: select focused book
      if (e.key === ' ' && !resolvedBookId && focusedBookIndex >= 0) {
        e.preventDefault();
        handleBookSelect(filteredBooks[focusedBookIndex]);
      }
    },
    [
      resolvedBookId,
      searchQuery,
      focusedChapter,
      focusedBookIndex,
      filteredBooks,
      topMatch,
      focusInput,
      getGridCols,
      handleChapterSelect,
      handleDirectMatchSelect,
      handleBookSelect,
    ],
  );

  // Reset focus when filtered results change
  useEffect(() => {
    setFocusedBookIndex(-1);
  }, [filteredBooks.length]);

  useEffect(() => {
    setFocusedChapter(-1);
  }, [resolvedBookId]);

  // Auto-scroll focused chapter into view
  useEffect(() => {
    if (!chapterGridRef.current) return;
    const targetChapter = focusedChapter >= 0 ? focusedChapter : undefined;
    if (targetChapter === undefined) return;
    const buttons = chapterGridRef.current.querySelectorAll('[data-chapter-btn]');
    const el = buttons[targetChapter] as HTMLElement;
    if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [focusedChapter]);

  // #endregion

  // #region Display values and labels

  const currentDisplayValue = useMemo(
    () =>
      formatScrRef(
        scrRef,
        localizedBookNames ? getLocalizedBookName(scrRef.book, localizedBookNames) : 'English',
      ),
    [scrRef, localizedBookNames],
  );

  const { otLong, ntLong, dcLong, extraLong } = {
    otLong: localizedStrings?.['%scripture_section_ot_long%'],
    ntLong: localizedStrings?.['%scripture_section_nt_long%'],
    dcLong: localizedStrings?.['%scripture_section_dc_long%'],
    extraLong: localizedStrings?.['%scripture_section_extra_long%'],
  };

  const getSectionLabel = useCallback(
    (section: Section): string => {
      return getSectionLongName(section, otLong, ntLong, dcLong, extraLong);
    },
    [otLong, ntLong, dcLong, extraLong],
  );

  const showHistory =
    !searchQuery && !resolvedBookId && recentSearches && recentSearches.length > 0;

  const resolvedBookChapters = resolvedBookId ? fetchEndChapter(resolvedBookId) : 0;

  const hintText = useMemo(() => {
    if (focusedChapter >= 0 && resolvedBookId) {
      const bookName = getLocalizedBookName(resolvedBookId, localizedBookNames);
      return `Enter to go to ${bookName} ${focusedChapter + 1}`;
    }
    if (topMatch?.chapterNum) {
      const bookName = getLocalizedBookName(topMatch.book, localizedBookNames);
      return `Press Enter to go to ${bookName} ${topMatch.chapterNum}`;
    }
    if (uniqueBookMatch) {
      return 'Type a chapter number or click to select';
    }
    if (filteredBooks.length === 1 && searchQuery) {
      const bookName = getLocalizedBookName(filteredBooks[0], localizedBookNames);
      return `↓ Enter to select ${bookName}`;
    }
    if (focusedBookIndex >= 0 && focusedBookIndex < filteredBooks.length) {
      const bookName = getLocalizedBookName(filteredBooks[focusedBookIndex], localizedBookNames);
      return `Enter to select ${bookName}`;
    }
    return `${filteredBooks.length} books available · Search books… e.g. "GEN 5" or "Genesis 5"`;
  }, [
    focusedChapter,
    resolvedBookId,
    topMatch,
    uniqueBookMatch,
    filteredBooks,
    searchQuery,
    focusedBookIndex,
    localizedBookNames,
  ]);

  // #endregion

  return (
    <>
      {/* Trigger button */}
      <Button
        aria-label="book-chapter-trigger"
        variant="outline"
        role="combobox"
        aria-expanded={isOpen}
        onClick={() => handleOpenChange(true)}
        className={cn(
          'tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1',
          className,
        )}
      >
        <span className="tw-truncate">{currentDisplayValue}</span>
      </Button>

      {/* Command dialog */}
      <CommandDialog open={isOpen} onOpenChange={handleOpenChange} shouldFilter={false}>
        <CommandInput
          ref={inputRef}
          icon={
            resolvedBookId ? (
              <Button
                variant="ghost"
                size="icon"
                className="tw-me-2 tw-h-8 tw-w-8 tw-shrink-0"
                onClick={() => {
                  setSearchQuery('');
                  setFocusedChapter(-1);
                  inputRef.current?.focus();
                }}
              >
                <ArrowLeft className="tw-h-4 tw-w-4" />
              </Button>
            ) : undefined
          }
          value={searchQuery}
          onValueChange={(val) => {
            setSearchQuery(val);
            setFocusedChapter(-1);
            setFocusedBookIndex(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            setFocusedChapter(-1);
            setFocusedBookIndex(-1);
          }}
          placeholder='Search books… e.g. "GEN 5" or "Genesis 5"'
          autoFocus
        />

        {/* Direct match banner */}
        {topMatch?.chapterNum && (
          <div className="tw-flex tw-items-center tw-justify-between tw-border-b tw-bg-muted tw-px-4 tw-py-2">
            <div className="tw-flex tw-items-center tw-gap-2">
              <CornerDownLeftIcon className="tw-h-3.5 tw-w-3.5 tw-text-muted-foreground" />
              <span className="tw-text-sm tw-text-foreground">
                Go to{' '}
                <span className="tw-font-semibold">
                  {getLocalizedBookName(topMatch.book, localizedBookNames)} {topMatch.chapterNum}
                  {topMatch.verseNum ? `:${topMatch.verseNum}` : ''}
                </span>
              </span>
            </div>
            <Badge variant="secondary">ENTER</Badge>
          </div>
        )}

        {/* Unique book match banner (no chapter yet) */}
        {!topMatch?.chapterNum && uniqueBookMatch && (
          <div className="tw-flex tw-items-center tw-justify-between tw-border-b tw-bg-muted tw-px-4 tw-py-2">
            <div className="tw-flex tw-items-center tw-gap-2">
              <CornerDownLeftIcon className="tw-h-3.5 tw-w-3.5 tw-text-muted-foreground" />
              <span className="tw-text-sm tw-text-foreground">
                Select chapter in{' '}
                <span className="tw-font-semibold">
                  {getLocalizedBookName(uniqueBookMatch, localizedBookNames)}
                </span>
              </span>
            </div>
          </div>
        )}

        {/* Book header when showing chapters */}
        {resolvedBookId && (
          <div className="tw-flex tw-items-baseline tw-justify-between tw-border-b tw-px-4 tw-py-3">
            <h3 className="tw-text-lg tw-font-bold">
              {getLocalizedBookName(resolvedBookId, localizedBookNames)}
            </h3>
            <span className="tw-text-xs tw-uppercase tw-tracking-wider tw-text-muted-foreground">
              {resolvedBookChapters} Chapters
            </span>
          </div>
        )}

        {/* Navigation history */}
        {showHistory && (
          <div className="tw-border-b tw-px-2 tw-py-2">
            <div className="tw-mb-2 tw-flex tw-items-center tw-gap-1.5 tw-px-2">
              <ClockIcon className="tw-h-3 tw-w-3 tw-text-muted-foreground" />
              <span className="tw-text-xs tw-font-medium tw-text-muted-foreground">
                {localizedStrings?.['%history_recent%'] ?? 'Recent'}
              </span>
            </div>
            <div className="tw-flex tw-flex-col tw-gap-1">
              {recentSearches!.map((entry) => {
                const isCurrent =
                  entry.book === scrRef.book && entry.chapterNum === scrRef.chapterNum;
                return (
                  <button
                    type="button"
                    key={`${entry.book}-${entry.chapterNum}-${entry.verseNum}`}
                    tabIndex={-1}
                    onClick={() => {
                      handleSubmitAndAddToRecent(entry);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'tw-flex tw-w-full tw-items-center tw-justify-between tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors',
                      isCurrent
                        ? 'tw-bg-accent tw-text-accent-foreground'
                        : 'hover:tw-bg-accent hover:tw-text-accent-foreground',
                    )}
                  >
                    <span>{formatScrRef(entry, 'English')}</span>
                    {isCurrent && (
                      <Badge variant="secondary" className="tw-text-[10px]">
                        Current
                      </Badge>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Content: chapter grid or book list */}
        {resolvedBookId ? (
          <div className="tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden tw-p-4">
            <div
              ref={chapterGridRef}
              className="tw-grid tw-grid-cols-5 tw-gap-2 sm:tw-grid-cols-8 md:tw-grid-cols-10"
            >
              {Array.from({ length: resolvedBookChapters }).map((_, i) => {
                const chapter = i + 1;
                const isMatched = topMatch?.chapterNum === chapter;
                const isCurrent = resolvedBookId === scrRef.book && chapter === scrRef.chapterNum;
                const isFocused = focusedChapter === i;
                return (
                  <Button
                    key={chapter}
                    data-chapter-btn
                    tabIndex={-1}
                    variant={
                      isFocused || isMatched ? 'default' : isCurrent ? 'secondary' : 'outline'
                    }
                    onClick={() => handleChapterSelect(chapter)}
                    className={cn(
                      'tw-aspect-square tw-h-auto tw-p-0 tw-font-mono',
                      isFocused && 'tw-ring-2 tw-ring-ring tw-ring-offset-2',
                    )}
                  >
                    {chapter}
                  </Button>
                );
              })}
            </div>
          </div>
        ) : (
          <CommandList ref={listRef} id={id}>
            {/* Book list grouped by testament */}
            {Object.entries(filteredBooksByType).map(([type, books]) => {
              if (books.length === 0) return undefined;
              return (
                // eslint-disable-next-line no-type-assertion/no-type-assertion
                <CommandGroup key={type} heading={getSectionLabel(type as Section)}>
                  {books.map((bookId) => {
                    const globalIdx = filteredBooks.indexOf(bookId);
                    const isFocused = focusedBookIndex === globalIdx;
                    return (
                      <BookItem
                        key={bookId}
                        bookId={bookId}
                        onSelect={(selectedBookId: string) => handleBookSelect(selectedBookId)}
                        section={getSectionForBook(bookId)}
                        commandValue={`${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId]}`}
                        localizedBookNames={localizedBookNames}
                        className={cn(
                          scrRef.book === bookId && !isFocused && 'tw-bg-accent/50',
                          isFocused && 'tw-bg-accent tw-text-accent-foreground',
                        )}
                      />
                    );
                  })}
                </CommandGroup>
              );
            })}

            {filteredBooks.length === 0 && (
              <CommandEmpty>No books found matching &ldquo;{searchQuery}&rdquo;</CommandEmpty>
            )}
          </CommandList>
        )}

        {/* Footer with hint text */}
        <div className="tw-flex tw-items-center tw-justify-between tw-border-t tw-px-4 tw-py-2 tw-text-xs tw-text-muted-foreground">
          <span>{hintText}</span>
          <div className="tw-flex tw-gap-3">
            <span className="tw-flex tw-items-center tw-gap-1">
              <BookOpenIcon className="tw-h-3 tw-w-3" />
              <span>Book</span>
            </span>
            <span className="tw-flex tw-items-center tw-gap-1">
              <HashIcon className="tw-h-3 tw-w-3" />
              <span>Chapter</span>
            </span>
          </div>
        </div>
      </CommandDialog>
    </>
  );
}

export default CommandNavigator;
