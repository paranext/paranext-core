import { useCallback, useLayoutEffect, useMemo, useRef, useState, KeyboardEvent } from 'react';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { formatScrRef, getChaptersForBook } from 'platform-bible-utils';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/shadcn-ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { cn } from '@/utils/shadcn-ui.util';

export type BookChapterComboboxProps = {
  /** The current scripture reference */
  scrRef: SerializedVerseRef;
  /** Function to handle the submission of selected references */
  handleSubmit: (scrRef: SerializedVerseRef) => void;
  /** Optional additional class name for styling */
  className?: string;
  /** Function to retrieve active book IDs */
  getActiveBookIds?: () => string[];
};

// Reuse constants from the original component
const ALL_BOOK_IDS = Canon.allBookIds.filter((b) => !Canon.isObsolete(Canon.bookIdToNumber(b)));
const ALL_ENGLISH_BOOK_NAMES = Object.fromEntries(
  ALL_BOOK_IDS.map((bookId) => [bookId, Canon.bookIdToEnglishName(bookId)]),
);

type BookType = 'OT' | 'NT' | 'DC';
const BOOK_TYPE_LABELS: Record<BookType, string> = {
  OT: 'Old Testament',
  NT: 'New Testament',
  DC: 'Deuterocanon',
};

// Smart parsing regex patterns (from original component)
const SCRIPTURE_REGEX_PATTERNS = {
  // Matches book name/id only: "John" or "1 Corinthians"
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Matches book + chapter: "John 3" or "1 Corinthians 13"
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Matches book + chapter + verse: "John 3:16" or "1 Cor 13:4"
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i,
} as const;

const SEARCH_QUERY_FORMATS = [
  SCRIPTURE_REGEX_PATTERNS.BOOK_ONLY,
  SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER,
  SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER_VERSE,
];

type BookWithOptionalChapterAndVerse = Omit<SerializedVerseRef, 'chapterNum' | 'verseNum'> &
  Partial<Pick<SerializedVerseRef, 'chapterNum' | 'verseNum'>>;

// View modes for the component
type ViewMode = 'books' | 'chapters' | 'hybrid';

/** Gets a bookId from given English name */
function getBookIdFromEnglishName(bookName: string): string | undefined {
  const matchingBookId = ALL_BOOK_IDS.find(
    (bookId) => ALL_ENGLISH_BOOK_NAMES[bookId].toLowerCase() === bookName.toLowerCase(),
  );
  return matchingBookId;
}

/** Gets the number of chapters for a book */
function fetchEndChapter(bookId: string) {
  return getChaptersForBook(Canon.bookIdToNumber(bookId));
}

/**
 * `BookChapterCombobox` is an alternative implementation of BookChapterControl using
 * Popover+Command instead of DropdownMenu. This provides better control over focus behavior and
 * interaction patterns.
 *
 * Features implemented:
 *
 * - Smart parsing logic for "John 3:16" style input
 * - Book selection with automatic chapter view transition
 * - Native Command keyboard navigation for chapter selection
 * - Grid-based CommandItem chapter layout with built-in accessibility
 * - Custom grid navigation: ↑↓ for rows, ←→ for columns in 6-column layout
 * - Back navigation between views
 * - Home/End key support for input cursor movement
 *
 * Chapter selection uses CommandItems in a 6-column grid with intuitive keyboard navigation:
 *
 * - Arrow Up/Down: Move between rows (6 chapters up/down)
 * - Arrow Left/Right: Move between columns (previous/next chapter)
 * - Enter: Select chapter
 * - Backspace: Return to book selection
 */
export function BookChapterCombobox({
  scrRef,
  handleSubmit,
  className,
  getActiveBookIds,
}: BookChapterComboboxProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('books');
  const [selectedBookForChapters, setSelectedBookForChapters] = useState<string | undefined>(
    undefined,
  );
  const [currentChapterFocus, setCurrentChapterFocus] = useState<number>(1);

  // Refs for scrolling to selected book
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const commandListRef = useRef<HTMLDivElement>(undefined!);
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const selectedBookItemRef = useRef<HTMLDivElement>(undefined!);

  // Get available books (same logic as original)
  const availableBooks = useMemo(() => {
    const activeBookIds = getActiveBookIds ? getActiveBookIds() : ALL_BOOK_IDS;
    return activeBookIds;
  }, [getActiveBookIds]);

  // Calculate top match based on current search query (smart parsing logic)
  const calculateTopMatch = useCallback(
    (query: string): BookWithOptionalChapterAndVerse | undefined => {
      if (!query.trim()) return undefined;

      return SEARCH_QUERY_FORMATS.reduce(
        (result: BookWithOptionalChapterAndVerse | undefined, format) => {
          if (result) return result;

          const matches = format.exec(query.trim());
          if (matches) {
            const [book, chapter = undefined, verse = undefined] = matches.slice(1);

            // Try multiple ways to find the book
            let validBookId: string | undefined;

            // 1. Try exact English name match
            const exactEnglishName = getBookIdFromEnglishName(book);
            if (exactEnglishName && availableBooks.includes(exactEnglishName)) {
              validBookId = exactEnglishName;
            }

            // 2. Try direct book ID validation
            if (!validBookId && Canon.isBookIdValid(book)) {
              const upperBook = book.toLocaleUpperCase();
              if (availableBooks.includes(upperBook)) {
                validBookId = upperBook;
              }
            }

            // 3. Try partial matching (for cases like "jh" -> "JHN")
            if (!validBookId) {
              const searchLower = book.toLowerCase();

              // Find all books that could match this search term
              const allPotentialMatches = availableBooks.filter((bookId) => {
                const bookEnglishName = ALL_ENGLISH_BOOK_NAMES[bookId].toLowerCase();
                return (
                  bookEnglishName.includes(searchLower) ||
                  bookId.toLowerCase().includes(searchLower)
                );
              });

              // Only create a topMatch if exactly one book could match
              if (allPotentialMatches.length === 1) {
                [validBookId] = allPotentialMatches;
              }
            }

            if (validBookId) {
              const chapterNum = chapter ? parseInt(chapter, 10) : undefined;
              if (chapterNum && chapterNum > fetchEndChapter(validBookId)) return undefined;
              const verseNum = verse ? parseInt(verse, 10) : undefined;

              return {
                book: validBookId,
                chapterNum,
                verseNum,
              };
            }
          }

          return undefined;
        },
        undefined,
      );
    },
    [availableBooks],
  );

  // Get the current top match
  const topMatch = useMemo(() => calculateTopMatch(inputValue), [calculateTopMatch, inputValue]);

  // Group books by type (simplified for now)
  const booksByType = useMemo(() => {
    const grouped: Record<BookType, string[]> = {
      OT: availableBooks.filter((bookId) => Canon.isBookOT(bookId)),
      NT: availableBooks.filter((bookId) => Canon.isBookNT(bookId)),
      DC: availableBooks.filter((bookId) => Canon.isBookDC(bookId)),
    };
    return grouped;
  }, [availableBooks]);

  // Filter books based on search input
  const filteredBooks = useMemo(() => {
    if (!inputValue.trim()) return booksByType;

    const searchLower = inputValue.toLowerCase();
    const filtered: Record<BookType, string[]> = { OT: [], NT: [], DC: [] };

    Object.entries(booksByType).forEach(([type, books]) => {
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      filtered[type as BookType] = books.filter((bookId) => {
        const englishName = ALL_ENGLISH_BOOK_NAMES[bookId].toLowerCase();
        return englishName.includes(searchLower) || bookId.toLowerCase().includes(searchLower);
      });
    });

    return filtered;
  }, [booksByType, inputValue]);

  // Detect if we should show hybrid view (single book match + chapters)
  const shouldShowHybridView = useMemo(() => {
    if (!inputValue.trim()) return false;

    // If we have a topMatch, always show chapter selector (smart parsing found a single book)
    if (topMatch) {
      return true;
    }

    // If no topMatch, show hybrid view only if exactly one book matches the text search
    const allFilteredBooks = [...filteredBooks.OT, ...filteredBooks.NT, ...filteredBooks.DC];
    return allFilteredBooks.length === 1;
  }, [inputValue, filteredBooks, topMatch]);

  const hybridBookId = useMemo(() => {
    if (!shouldShowHybridView) return undefined;

    // If we have a topMatch, use that book
    if (topMatch) {
      return topMatch.book;
    }

    // Otherwise use the single filtered book
    const allFilteredBooks = [...filteredBooks.OT, ...filteredBooks.NT, ...filteredBooks.DC];
    return allFilteredBooks[0];
  }, [shouldShowHybridView, filteredBooks, topMatch]);

  const handleBookSelect = useCallback(
    (bookId: string) => {
      // Check if book has chapters - if not, submit immediately
      const endChapter = fetchEndChapter(bookId);
      if (endChapter <= 1) {
        // Book has no chapters or only 1 chapter - submit immediately
        handleSubmit({
          book: bookId,
          chapterNum: 1,
          verseNum: 1,
        });
        setOpen(false);
        setInputValue('');
        return;
      }

      // Book has multiple chapters - transition to chapter view
      setSelectedBookForChapters(bookId);
      setViewMode('chapters');
      setInputValue(''); // Clear search when transitioning
      setCurrentChapterFocus(1); // Reset chapter focus to first chapter
    },
    [handleSubmit],
  );

  const handleChapterSelect = useCallback(
    (chapterNumber: number) => {
      if (!selectedBookForChapters) return;

      handleSubmit({
        book: selectedBookForChapters,
        chapterNum: chapterNumber,
        verseNum: 1,
      });
      setOpen(false);
      setViewMode('books');
      setSelectedBookForChapters(undefined);
      setInputValue('');
    },
    [handleSubmit, selectedBookForChapters],
  );

  const handleHybridChapterSelect = useCallback(
    (chapterNumber: number) => {
      if (!hybridBookId) return;

      handleSubmit({
        book: hybridBookId,
        chapterNum: chapterNumber,
        verseNum: 1,
      });
      setOpen(false);
      setInputValue('');
    },
    [handleSubmit, hybridBookId],
  );

  const handleBackToBooks = useCallback(() => {
    setViewMode('books');
    setSelectedBookForChapters(undefined);
  }, []);

  // Handle keyboard navigation for CommandInput
  const handleInputKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    // Allow Home and End keys to work normally for cursor movement
    if (event.key === 'Home' || event.key === 'End') {
      event.stopPropagation(); // Prevent Command component from handling these
    }
  }, []);

  // Reset view state when popover opens
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      // If we're closing from chapter view, go back to books instead
      if (!newOpen && viewMode === 'chapters') {
        handleBackToBooks();
        return; // Don't actually close the popover
      }

      setOpen(newOpen);

      if (newOpen) {
        // Reset to book view when opening
        setViewMode('books');
        setSelectedBookForChapters(undefined);
        setInputValue('');
        setCurrentChapterFocus(1); // Reset chapter focus
      }
    },
    [viewMode, handleBackToBooks],
  );

  const handleTopMatchSelect = useCallback(() => {
    if (!topMatch) return;

    handleSubmit({
      book: topMatch.book,
      chapterNum: topMatch.chapterNum ?? 1,
      verseNum: topMatch.verseNum ?? 1,
    });
    setOpen(false);
    setInputValue('');
  }, [handleSubmit, topMatch]);

  const currentDisplayValue = formatScrRef(scrRef, 'English');

  // Calculate chapter-related data when in chapter view
  const chapterViewData = useMemo(() => {
    if (viewMode !== 'chapters' || !selectedBookForChapters) return undefined;

    const endChapter = fetchEndChapter(selectedBookForChapters);
    const bookName = ALL_ENGLISH_BOOK_NAMES[selectedBookForChapters];

    return {
      endChapter,
      bookName,
      selectedChapter: scrRef.book === selectedBookForChapters ? scrRef.chapterNum : 0,
    };
  }, [viewMode, selectedBookForChapters, scrRef.book, scrRef.chapterNum]);

  // Calculate hybrid view chapter data
  const hybridChapterData = useMemo(() => {
    if (!shouldShowHybridView || !hybridBookId) return undefined;

    const endChapter = fetchEndChapter(hybridBookId);
    const bookName = ALL_ENGLISH_BOOK_NAMES[hybridBookId];

    return {
      endChapter,
      bookName,
      selectedChapter: scrRef.book === hybridBookId ? scrRef.chapterNum : 0,
    };
  }, [shouldShowHybridView, hybridBookId, scrRef.book, scrRef.chapterNum]);

  // Custom grid navigation for chapter selection
  const handleChapterKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      console.log('yo!');

      // Handle backspace for going back to books
      if (viewMode === 'chapters' && event.key === 'Backspace') {
        event.preventDefault();
        event.stopPropagation();
        handleBackToBooks();
        return;
      }

      // Handle Enter key to select current chapter
      if ((viewMode === 'chapters' || shouldShowHybridView) && event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();

        if (viewMode === 'chapters') {
          handleChapterSelect(currentChapterFocus);
        } else if (shouldShowHybridView) {
          handleHybridChapterSelect(currentChapterFocus);
        }
        return;
      }

      // Only handle arrow keys when in chapter selection mode
      if (
        !(viewMode === 'chapters' || shouldShowHybridView) ||
        !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)
      ) {
        return; // Let other keys pass through normally
      }

      const currentData = chapterViewData || hybridChapterData;
      if (!currentData) return;

      // Prevent default arrow key behavior
      event.preventDefault();
      event.stopPropagation();

      const { endChapter } = currentData;
      const chapters = Array.from({ length: endChapter }, (_, i) => i + 1);

      // Use our state-tracked current chapter instead of DOM focus
      let targetChapter = currentChapterFocus;
      const cols = 6; // tw-grid-cols-6

      console.log('Handling chapter key down:', {
        eventKey: event.key,
        currentChapter: currentChapterFocus,
        targetChapter,
        endChapter,
        cols,
      });

      switch (event.key) {
        case 'ArrowRight':
          // Move to next item (right)
          if (currentChapterFocus < endChapter) {
            targetChapter = currentChapterFocus + 1;
          }
          break;
        case 'ArrowLeft':
          // Move to previous item (left)
          if (currentChapterFocus > 1) {
            targetChapter = currentChapterFocus - 1;
          }
          break;
        case 'ArrowDown':
          // Move down a row (6 items forward)
          if (currentChapterFocus + cols <= endChapter) {
            targetChapter = currentChapterFocus + cols;
          }
          break;
        case 'ArrowUp':
          // Move up a row (6 items backward)
          if (currentChapterFocus - cols > 0) {
            targetChapter = currentChapterFocus - cols;
          }
          break;
        default:
          return; // Let other keys pass through
      }

      if (targetChapter !== currentChapterFocus && chapters.includes(targetChapter)) {
        // Update our focus state
        setCurrentChapterFocus(targetChapter);

        // Focus the target chapter element for visual feedback
        const targetElement = document.querySelector(`[data-chapter="${targetChapter}"]`);
        if (targetElement) {
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          (targetElement as HTMLElement).focus();
        }
      }
    },
    [
      viewMode,
      handleBackToBooks,
      shouldShowHybridView,
      chapterViewData,
      hybridChapterData,
      currentChapterFocus,
      setCurrentChapterFocus,
      handleChapterSelect,
      handleHybridChapterSelect,
    ],
  );

  // Auto-scroll to currently selected book when dropdown opens in book view
  useLayoutEffect(() => {
    const scrollTimeout = setTimeout(() => {
      if (
        open &&
        viewMode === 'books' &&
        !inputValue.trim() && // Only auto-scroll when not searching
        !topMatch && // Only auto-scroll when not showing top match
        commandListRef.current &&
        selectedBookItemRef.current
      ) {
        const listElement = commandListRef.current;
        const itemElement = selectedBookItemRef.current;

        // Calculate scroll position to center the selected item
        const itemOffsetTop = itemElement.offsetTop;
        const listHeight = listElement.clientHeight;
        const itemHeight = itemElement.clientHeight;
        const scrollPosition = itemOffsetTop - listHeight / 2 + itemHeight / 2;

        listElement.scrollTo({
          top: Math.max(0, scrollPosition),
          behavior: 'smooth',
        });
      }
    }, 10); // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(scrollTimeout);
    };
  }, [open, viewMode, inputValue, topMatch]);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={className}>
          {currentDisplayValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="tw-w-[300px] tw-p-0" align="start">
        <Command onKeyDown={handleChapterKeyDown}>
          {/* Input for book view, fixed header for chapter view */}
          {viewMode === 'books' ? (
            <CommandInput
              placeholder="Search reference (e.g., John 3:16)..."
              value={inputValue}
              onValueChange={setInputValue}
              onKeyDown={handleInputKeyDown}
            />
          ) : (
            <div className="tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToBooks}
                className="tw-mr-2 tw-h-6 tw-w-6 tw-p-0"
              >
                <ArrowLeft className="tw-h-4 tw-w-4" />
              </Button>
              <span className="tw-text-sm tw-font-medium">
                {chapterViewData?.bookName} - Select Chapter
              </span>
            </div>
          )}

          <CommandList ref={commandListRef}>
            {viewMode === 'books' && (
              <>
                <CommandEmpty>No books found.</CommandEmpty>

                {/* Top Match - Show parsed scripture reference */}
                {topMatch && (
                  <>
                    <CommandGroup heading="Scripture Reference">
                      <CommandItem
                        key="top-match"
                        value={`${topMatch.book} ${ALL_ENGLISH_BOOK_NAMES[topMatch.book]} ${
                          topMatch.chapterNum || ''
                        }:${topMatch.verseNum || ''})}`}
                        onSelect={handleTopMatchSelect}
                        className="tw-font-semibold tw-text-primary"
                      >
                        {formatScrRef({
                          book: topMatch.book,
                          chapterNum: topMatch.chapterNum ?? 1,
                          verseNum: topMatch.verseNum ?? 1,
                        })}
                        <span className="tw-ml-auto tw-text-xs tw-text-muted-foreground">
                          Press Enter ↵
                        </span>
                      </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                  </>
                )}

                {/* Chapter Selector - Show when we have a single book match (with or without topMatch) */}
                {shouldShowHybridView && hybridBookId && hybridChapterData && (
                  <>
                    {!topMatch && (
                      /* Only show the book match item if we don't already have a topMatch */
                      <>
                        <CommandGroup heading="Scripture Reference">
                          <CommandItem
                            key="hybrid-match"
                            value={`${hybridBookId} ${ALL_ENGLISH_BOOK_NAMES[hybridBookId]}`}
                            onSelect={() => handleBookSelect(hybridBookId)}
                            className="tw-font-semibold tw-text-primary"
                          >
                            {formatScrRef({
                              book: hybridBookId,
                              chapterNum: 1,
                              verseNum: 1,
                            })}
                            <span className="tw-ml-auto tw-text-xs tw-text-muted-foreground">
                              Press Enter ↵
                            </span>
                          </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                      </>
                    )}

                    <div className="tw-p-4">
                      <div className="tw-mb-2 tw-text-sm tw-font-medium tw-text-muted-foreground">
                        {hybridChapterData.bookName} - Select Chapter
                      </div>
                    </div>
                    <CommandGroup>
                      <div className="tw-grid tw-grid-cols-6 tw-gap-1 tw-px-4 tw-pb-4">
                        {Array.from({ length: hybridChapterData.endChapter }, (_, i) => i + 1).map(
                          (chapter) => (
                            <CommandItem
                              key={chapter}
                              value={`${hybridBookId} ${ALL_ENGLISH_BOOK_NAMES[hybridBookId]} ${chapter}`}
                              onSelect={() => handleHybridChapterSelect(chapter)}
                              data-chapter={chapter}
                              className={cn(
                                'tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm',
                                {
                                  'tw-bg-primary tw-text-primary-foreground':
                                    chapter === hybridChapterData.selectedChapter,
                                  'tw-ring-2 tw-ring-blue-500': chapter === currentChapterFocus,
                                },
                              )}
                            >
                              {chapter}
                            </CommandItem>
                          ),
                        )}
                      </div>
                    </CommandGroup>
                  </>
                )}

                {/* Book List - Show when we have multiple book matches (not hybrid view) */}
                {!shouldShowHybridView &&
                  Object.entries(filteredBooks).map(([type, books]) => {
                    if (books.length === 0) return undefined;

                    return (
                      // eslint-disable-next-line no-type-assertion/no-type-assertion
                      <CommandGroup key={type} heading={BOOK_TYPE_LABELS[type as BookType]}>
                        {books.map((bookId) => (
                          <CommandItem
                            key={bookId}
                            value={`${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId]}`}
                            onSelect={() => handleBookSelect(bookId)}
                            ref={bookId === scrRef.book ? selectedBookItemRef : undefined}
                          >
                            {ALL_ENGLISH_BOOK_NAMES[bookId]}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    );
                  })}
              </>
            )}

            {viewMode === 'chapters' && (
              /* Regular Chapter View */
              <>
                <div className="tw-p-4 tw-pb-2">
                  <div className="tw-text-sm tw-font-medium tw-text-muted-foreground">
                    Select Chapter
                  </div>
                </div>
                <CommandGroup>
                  <div className="tw-grid tw-grid-cols-6 tw-gap-1 tw-px-4 tw-pb-4">
                    {chapterViewData &&
                      Array.from({ length: chapterViewData.endChapter }, (_, i) => i + 1).map(
                        (chapter) => (
                          <CommandItem
                            key={chapter}
                            value={`${selectedBookForChapters || ''} ${chapterViewData ? ALL_ENGLISH_BOOK_NAMES[selectedBookForChapters || ''] || '' : ''} ${chapter}`}
                            onSelect={() => handleChapterSelect(chapter)}
                            data-chapter={chapter}
                            className={cn(
                              'tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm',
                              {
                                'tw-bg-primary tw-text-primary-foreground':
                                  chapter === chapterViewData.selectedChapter,
                                'tw-ring-2 tw-ring-blue-500': chapter === currentChapterFocus,
                              },
                            )}
                          >
                            {chapter}
                          </CommandItem>
                        ),
                      )}
                  </div>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default BookChapterCombobox;
