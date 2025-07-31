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
 * - Grid-based CommandItem chapter layout with built-in accessibility
 * - Back navigation between views (Backspace from chapter view)
 * - Home/End key support for input cursor movement
 * - Native Command keyboard navigation (arrows, Enter, Escape)
 *
 * Chapter selection uses CommandItems in a 6-column grid with standard Command navigation:
 *
 * - Arrow keys: Navigate through chapters in order
 * - Enter: Select chapter
 * - Backspace: Return to book selection from chapter view
 * - Escape: Close the popover
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

  // Refs for scrolling to selected book and focusing input
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const commandListRef = useRef<HTMLDivElement>(undefined!);
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const selectedBookItemRef = useRef<HTMLDivElement>(undefined!);
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const commandInputRef = useRef<HTMLInputElement>(undefined!);
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const firstChapterItemRef = useRef<HTMLDivElement>(undefined!);

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

    // Focus the search input when returning to book view
    setTimeout(() => {
      if (commandInputRef.current) {
        commandInputRef.current.focus();
      }
    }, 0);
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

  // Grid-aware keyboard navigation that works with Command's focus system
  const handleChapterKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      // Handle backspace for going back to books
      if (viewMode === 'chapters' && event.key === 'Backspace') {
        event.preventDefault();
        event.stopPropagation();
        handleBackToBooks();
        return;
      }

      // Handle letter and digit keypresses in chapter viewmode only (not hybrid)
      if (viewMode === 'chapters') {
        const isLetter = /^[a-zA-Z]$/.test(event.key);
        const isDigit = /^[0-9]$/.test(event.key);

        if (isLetter) {
          // Letter pressed: go back to book list and start new search with that letter
          event.preventDefault();
          event.stopPropagation();
          setViewMode('books');
          setSelectedBookForChapters(undefined);
          setInputValue(event.key);

          // Focus the search input
          setTimeout(() => {
            if (commandInputRef.current) {
              commandInputRef.current.focus();
            }
          }, 0);
          return;
        }

        if (isDigit && selectedBookForChapters) {
          // Digit pressed: go back to book list and start search with current book name + digit
          event.preventDefault();
          event.stopPropagation();
          const currentBookName = ALL_ENGLISH_BOOK_NAMES[selectedBookForChapters];
          setViewMode('books');
          setSelectedBookForChapters(undefined);
          setInputValue(`${currentBookName} ${event.key}`);

          // Focus the search input
          setTimeout(() => {
            if (commandInputRef.current) {
              commandInputRef.current.focus();
            }
          }, 0);
          return;
        }
      }

      // Handle grid navigation for arrow keys in chapter views
      if (
        (viewMode === 'chapters' || shouldShowHybridView) &&
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)
      ) {
        // Since Command doesn't focus individual items, we need to find the currently highlighted item
        // The Command component uses aria-selected="true" to mark the active item
        const highlightedItem = document.querySelector('[cmdk-item][aria-selected="true"]');
        console.log('highlightedItem data-chapter:', highlightedItem?.getAttribute('data-chapter'));

        if (highlightedItem) {
          const currentChapter = parseInt(highlightedItem.getAttribute('data-chapter') || '1', 10);
          const maxChapter =
            viewMode === 'chapters' ? chapterViewData?.endChapter : hybridChapterData?.endChapter;

          if (!maxChapter) return;

          let targetChapter = currentChapter;
          const GRID_COLS = 6;

          switch (event.key) {
            case 'ArrowLeft':
              targetChapter = Math.max(1, currentChapter - 1);
              break;
            case 'ArrowRight':
              targetChapter = Math.min(maxChapter, currentChapter + 1);
              break;
            case 'ArrowUp':
              targetChapter = Math.max(1, currentChapter - GRID_COLS);
              break;
            case 'ArrowDown':
              targetChapter = Math.min(maxChapter, currentChapter + GRID_COLS);
              break;
            default:
              return;
          }

          if (targetChapter !== currentChapter) {
            event.preventDefault();
            event.stopPropagation();

            // Find the target CommandItem and trigger its selection programmatically
            const targetElement = document.querySelector(
              `[data-chapter="${targetChapter}"][cmdk-item]`,
            );
            console.log('targetElement:', targetElement);

            if (targetElement) {
              // Remove the current selection first
              const currentSelected = document.querySelector('[cmdk-item][aria-selected="true"]');
              if (currentSelected) {
                currentSelected.setAttribute('aria-selected', 'false');
                currentSelected.setAttribute('data-selected', 'false');
              }

              // Set the new selection
              targetElement.setAttribute('aria-selected', 'true');
              targetElement.setAttribute('data-selected', 'true');

              // Scroll the target element into view if needed
              targetElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
          }
        }
      }
    },
    [
      viewMode,
      handleBackToBooks,
      shouldShowHybridView,
      chapterViewData?.endChapter,
      hybridChapterData?.endChapter,
      selectedBookForChapters,
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

  // Focus first chapter when entering chapter viewmode
  useLayoutEffect(() => {
    if (viewMode === 'chapters') {
      const focusTimeout = setTimeout(() => {
        // Use ref to set focus on the first chapter
        if (firstChapterItemRef.current) {
          // Remove any existing selections first
          const currentSelected = document.querySelector('[cmdk-item][aria-selected="true"]');
          if (currentSelected) {
            currentSelected.setAttribute('aria-selected', 'false');
            currentSelected.setAttribute('data-selected', 'false');
          }

          // Set the first chapter as selected
          firstChapterItemRef.current.setAttribute('aria-selected', 'true');
          firstChapterItemRef.current.setAttribute('data-selected', 'true');

          // Scroll into view if needed
          firstChapterItemRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
      }, 10); // Small delay to ensure DOM is ready

      return () => {
        clearTimeout(focusTimeout);
      };
    }

    return undefined;
  }, [viewMode]);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={className}>
          {currentDisplayValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="tw-w-[300px] tw-p-0" align="start">
        <Command
          onKeyDown={handleChapterKeyDown}
          loop
          filter={(value, search) => {
            // Custom filter that preserves original order
            // Return 1 if the item matches, 0 if it doesn't
            // All matching items get the same rank to maintain original order
            if (!search) return 1; // Show all items when no search

            const searchLower = search.toLowerCase();
            const valueLower = value.toLowerCase();

            // If we have a topMatch (smart parsing succeeded), we need special handling
            if (topMatch) {
              // For the top match item itself, always show it
              if (
                valueLower.includes(topMatch.book.toLowerCase()) &&
                valueLower.includes(ALL_ENGLISH_BOOK_NAMES[topMatch.book].toLowerCase())
              ) {
                return 1;
              }

              // For chapter items in hybrid view, check if they match the parsed book
              if (
                value.includes(topMatch.book) &&
                value.includes(ALL_ENGLISH_BOOK_NAMES[topMatch.book])
              ) {
                return 1;
              }
            }

            // Regular filtering: check if search term appears anywhere in the value
            if (valueLower.includes(searchLower)) {
              return 1; // All matches get the same rank (no reordering)
            }

            return 0; // Hide non-matches
          }}
        >
          {/* Input for book view, fixed header for chapter view */}
          {viewMode === 'books' ? (
            <CommandInput
              ref={commandInputRef}
              placeholder={currentDisplayValue}
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
                    <CommandGroup forceMount>
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
                                },
                              )}
                              disabled={
                                topMatch &&
                                !!topMatch.chapterNum &&
                                !chapter.toString().includes(topMatch.chapterNum.toString())
                              }
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
                          <div
                            key={bookId}
                            className={cn(
                              'tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid',
                              {
                                'tw-border-s-red-200': type.toLowerCase() === 'ot',
                                'tw-border-s-purple-200': type.toLowerCase() === 'nt',
                                'tw-border-s-indigo-200': type.toLowerCase() === 'dc',
                              },
                            )}
                          >
                            <CommandItem
                              value={`${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId]}`}
                              onSelect={() => handleBookSelect(bookId)}
                              ref={bookId === scrRef.book ? selectedBookItemRef : undefined}
                              className="tw-ms-1 tw-px-2"
                            >
                              {ALL_ENGLISH_BOOK_NAMES[bookId]}
                            </CommandItem>
                          </div>
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
                              },
                            )}
                            ref={chapter === 1 ? firstChapterItemRef : undefined}
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
