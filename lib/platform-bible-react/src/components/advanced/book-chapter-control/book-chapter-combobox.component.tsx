import { useCallback, useLayoutEffect, useMemo, useRef, useState, KeyboardEvent } from 'react';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { formatScrRef, getChaptersForBook } from 'platform-bible-utils';
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
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

const ALL_BOOK_IDS = Canon.allBookIds.filter(
  (bookId) => !Canon.isObsolete(Canon.bookIdToNumber(bookId)),
);
const ALL_ENGLISH_BOOK_NAMES = Object.fromEntries(
  ALL_BOOK_IDS.map((bookId) => [bookId, Canon.bookIdToEnglishName(bookId)]),
);

type BookType = 'OT' | 'NT' | 'DC' | 'Extra';
const BOOK_TYPE_LABELS: Record<BookType, string> = {
  OT: 'Old Testament',
  NT: 'New Testament',
  DC: 'Deuterocanon',
  Extra: 'Extra',
};

// Smart parsing regex patterns
const SCRIPTURE_REGEX_PATTERNS = {
  // Matches book name/id only: "John" or "1 Corinthians"
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Matches book + chapter: "John 3" or "1 Corinthians 13"
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s*(\d+)$/i,
  // Matches book + chapter + verse: "John 3:16" or "1 Cor 13:4"
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s*(\d+):(\d*)$/i,
} as const;

const SEARCH_QUERY_FORMATS = [
  SCRIPTURE_REGEX_PATTERNS.BOOK_ONLY,
  SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER,
  SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER_VERSE,
];

type BookWithOptionalChapterAndVerse = Omit<SerializedVerseRef, 'chapterNum' | 'verseNum'> &
  Partial<Pick<SerializedVerseRef, 'chapterNum' | 'verseNum'>>;

// View modes for the component
type ViewMode = 'books' | 'chapters';

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
  const [commandValue, setCommandValue] = useState('');

  // Refs for scrolling to selected book and focusing input
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const commandListRef = useRef<HTMLDivElement>(undefined!);
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const selectedBookItemRef = useRef<HTMLDivElement>(undefined!);
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const commandInputRef = useRef<HTMLInputElement>(undefined!);
  // Refs for chapter items to enable scrolling without DOM queries
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const chapterRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Get available books (same logic as original)
  const availableBooks = useMemo(() => {
    const activeBookIds = getActiveBookIds ? getActiveBookIds() : ALL_BOOK_IDS;
    return activeBookIds;
  }, [getActiveBookIds]);

  // Calculate top match based on current search query (smart parsing logic + single book filtering)
  const calculateTopMatch = useCallback(
    (query: string): BookWithOptionalChapterAndVerse | undefined => {
      if (!query.trim()) return undefined;

      // First try smart parsing with regex patterns
      const smartParseResult = SEARCH_QUERY_FORMATS.reduce(
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

      // If smart parsing found something, return it
      if (smartParseResult) return smartParseResult;

      // If no smart parsing match, check if filtering results in exactly one book
      const searchLower = query.toLowerCase();
      const matchingBooks = availableBooks.filter((bookId) => {
        const englishName = ALL_ENGLISH_BOOK_NAMES[bookId].toLowerCase();
        return englishName.includes(searchLower) || bookId.toLowerCase().includes(searchLower);
      });

      // If exactly one book matches the filter, treat it as a top match
      if (matchingBooks.length === 1) {
        return {
          book: matchingBooks[0],
          // No specific chapter/verse from filtering
        };
      }

      return undefined;
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
      Extra: availableBooks.filter((bookId) => Canon.extraBooks().includes(bookId)),
    };
    return grouped;
  }, [availableBooks]);

  // Filter books based on search input
  const filteredBooks = useMemo(() => {
    if (!inputValue.trim()) return booksByType;

    const searchLower = inputValue.toLowerCase();
    const filtered: Record<BookType, string[]> = { OT: [], NT: [], DC: [], Extra: [] };

    Object.entries(booksByType).forEach(([type, books]) => {
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      filtered[type as BookType] = books.filter((bookId) => {
        const englishName = ALL_ENGLISH_BOOK_NAMES[bookId].toLowerCase();
        return englishName.includes(searchLower) || bookId.toLowerCase().includes(searchLower);
      });
    });

    return filtered;
  }, [booksByType, inputValue]);

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
      // Determine which book we're selecting a chapter for
      const bookId = viewMode === 'chapters' ? selectedBookForChapters : topMatch?.book;
      if (!bookId) return;

      handleSubmit({
        book: bookId,
        chapterNum: chapterNumber,
        verseNum: 1,
      });
      setOpen(false);
      setViewMode('books');
      setSelectedBookForChapters(undefined);
      setInputValue('');
      setCommandValue(''); // Reset command value
    },
    [handleSubmit, viewMode, selectedBookForChapters, topMatch],
  );

  const handleBackToBooks = useCallback(() => {
    setViewMode('books');
    setSelectedBookForChapters(undefined);
    setCommandValue(''); // Reset command value

    // Focus the search input when returning to book view
    setTimeout(() => {
      if (commandInputRef.current) {
        commandInputRef.current.focus();
      }
    }, 0);
  }, []);

  // Navigation handlers for previous/next chapter/book
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
        const lastChapter = fetchEndChapter(previousBook);
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

  const handlePreviousBook = useCallback(() => {
    const currentBookIndex = availableBooks.indexOf(scrRef.book);
    if (currentBookIndex > 0) {
      const previousBook = availableBooks[currentBookIndex - 1];
      handleSubmit({
        book: previousBook,
        chapterNum: 1,
        verseNum: 1,
      });
    }
  }, [scrRef, availableBooks, handleSubmit]);

  const handleNextBook = useCallback(() => {
    const currentBookIndex = availableBooks.indexOf(scrRef.book);
    if (currentBookIndex < availableBooks.length - 1) {
      const nextBook = availableBooks[currentBookIndex + 1];
      handleSubmit({
        book: nextBook,
        chapterNum: 1,
        verseNum: 1,
      });
    }
  }, [scrRef, availableBooks, handleSubmit]);

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
        setCommandValue(''); // Reset command value
      }
    },
    [viewMode, handleBackToBooks],
  );

  // Unified handler for top match - always submits directly
  const handleUnifiedMatchSelect = useCallback(() => {
    // If we have a top match (smart parsed or single book filter), use its specific chapter/verse
    if (topMatch) {
      handleSubmit({
        book: topMatch.book,
        chapterNum: topMatch.chapterNum ?? 1,
        verseNum: topMatch.verseNum ?? 1,
      });
      setOpen(false);
      setInputValue('');
      setCommandValue(''); // Reset command value
    }
  }, [handleSubmit, topMatch]);

  // Enhanced input key handler that includes Ctrl+Enter for unified match
  const handleEnhancedInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      // Handle Ctrl+Enter for unified match selection from input
      if (event.ctrlKey && event.key === 'Enter' && topMatch) {
        event.preventDefault();
        event.stopPropagation();
        handleUnifiedMatchSelect();
        return;
      }

      // Delegate to the original handler for other keys
      handleInputKeyDown(event);
    },
    [topMatch, handleUnifiedMatchSelect, handleInputKeyDown],
  );

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

  // Calculate chapter data when we have a top match
  const topMatchChapterData = useMemo(() => {
    if (!topMatch) return undefined;

    const endChapter = fetchEndChapter(topMatch.book);
    const bookName = ALL_ENGLISH_BOOK_NAMES[topMatch.book];

    return {
      endChapter,
      bookName,
      selectedChapter: scrRef.book === topMatch.book ? scrRef.chapterNum : 0,
    };
  }, [topMatch, scrRef.book, scrRef.chapterNum]);

  // Helper function to generate command values
  const getChapterValue = useCallback((bookId: string, chapter: number) => {
    return `${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId]} ${chapter}`;
  }, []);

  const getBookValue = useCallback((bookId: string) => {
    return `${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId]}`;
  }, []);

  // Callback ref function to store chapter refs
  const setChapterRef = useCallback((chapter: number) => {
    return (element: HTMLDivElement | null) => {
      chapterRefs.current[chapter] = element;
    };
  }, []);

  // Grid-aware keyboard navigation using Command's controlled value
  const handleChapterKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      // Handle Ctrl+Enter for unified match selection from anywhere
      if (event.ctrlKey && event.key === 'Enter' && topMatch) {
        event.preventDefault();
        event.stopPropagation();
        handleUnifiedMatchSelect();
        return;
      }

      // Handle backspace for going back to books
      if (viewMode === 'chapters' && event.key === 'Backspace') {
        event.preventDefault();
        event.stopPropagation();
        handleBackToBooks();
        return;
      }

      // Handle letter and digit keypresses in chapter viewmode only (not when showing top match chapters)
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
          setCommandValue(''); // Reset command value

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
          setCommandValue(''); // Reset command value

          // Focus the search input
          setTimeout(() => {
            if (commandInputRef.current) {
              commandInputRef.current.focus();
            }
          }, 0);
          return;
        }
      }

      // Handle letter and digit keypresses when showing top match chapters (in books view)
      if (viewMode === 'books' && topMatch) {
        const isLetter = /^[a-zA-Z]$/.test(event.key);
        const isDigit = /^[0-9]$/.test(event.key);
        const isSpace = event.key === ' ';

        if (isLetter || isDigit || isSpace) {
          // Letter, digit, or space pressed: append to current search and focus input
          event.preventDefault();
          event.stopPropagation();

          const newValue = inputValue + event.key;
          setInputValue(newValue);
          setCommandValue(''); // Reset command value

          // Focus the search input
          setTimeout(() => {
            if (commandInputRef.current) {
              commandInputRef.current.focus();
              // Move cursor to end of input
              commandInputRef.current.selectionStart = newValue.length;
              commandInputRef.current.selectionEnd = newValue.length;
            }
          }, 0);
          return;
        }
      }

      // Handle grid navigation for arrow keys in chapter views
      if (
        (viewMode === 'chapters' || (viewMode === 'books' && topMatch)) &&
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)
      ) {
        // Extract current chapter from commandValue
        const currentBookId = viewMode === 'chapters' ? selectedBookForChapters : topMatch?.book;
        if (!currentBookId) return;

        // Parse chapter from current command value
        const currentChapter = (() => {
          if (!commandValue) return 1;
          const match = commandValue.match(/(\d+)$/);
          return match ? parseInt(match[1], 10) : 1;
        })();

        const maxChapter =
          viewMode === 'chapters' ? chapterViewData?.endChapter : topMatchChapterData?.endChapter;

        if (!maxChapter) return;

        // Helper function to check if a chapter is disabled (same logic as in JSX)
        const isChapterDisabled = (chapter: number) => {
          // In top match mode with specific chapter, disable chapters that don't match the parsed chapter
          if (viewMode === 'books' && topMatch && topMatch.chapterNum) {
            return !chapter.toString().includes(topMatch.chapterNum.toString());
          }
          return false;
        };

        // Helper function to find next valid (non-disabled) chapter in a direction
        const findNextValidChapter = (
          startChapter: number,
          direction: number,
          maxSteps: number,
        ) => {
          for (let i = 1; i <= maxSteps; i++) {
            const candidate = startChapter + direction * i;
            if (candidate < 1 || candidate > maxChapter) break;
            if (!isChapterDisabled(candidate)) {
              return candidate;
            }
          }
          return startChapter; // Return original if no valid chapter found
        };

        let targetChapter = currentChapter;
        const GRID_COLS = 6;

        switch (event.key) {
          case 'ArrowLeft':
            targetChapter = findNextValidChapter(currentChapter, -1, maxChapter);
            break;
          case 'ArrowRight':
            targetChapter = findNextValidChapter(currentChapter, 1, maxChapter);
            break;
          case 'ArrowUp':
            targetChapter = findNextValidChapter(
              currentChapter,
              -GRID_COLS,
              Math.ceil(maxChapter / GRID_COLS),
            );
            break;
          case 'ArrowDown':
            targetChapter = findNextValidChapter(
              currentChapter,
              GRID_COLS,
              Math.ceil(maxChapter / GRID_COLS),
            );
            break;
          default:
            return;
        }

        if (targetChapter !== currentChapter) {
          event.preventDefault();
          event.stopPropagation();

          // Update the command value to the target chapter
          setCommandValue(getChapterValue(currentBookId, targetChapter));

          // Scroll the target chapter into view using refs
          setTimeout(() => {
            const targetElement = chapterRefs.current[targetChapter];
            if (targetElement) {
              targetElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
          }, 0);
        }
      }
    },
    [
      viewMode,
      handleBackToBooks,
      chapterViewData?.endChapter,
      topMatchChapterData?.endChapter,
      selectedBookForChapters,
      topMatch,
      commandValue,
      getChapterValue,
      inputValue,
      handleUnifiedMatchSelect,
    ],
  );

  // Generic keyboard handler that can work with any element type
  const handleGenericKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      // Cast to the expected type for our main handler
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const divEvent = event as unknown as KeyboardEvent<HTMLDivElement>;
      handleChapterKeyDown(divEvent);
    },
    [handleChapterKeyDown],
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

        // Set the selected book as the active item for keyboard navigation
        setCommandValue(getBookValue(scrRef.book));
      }
    }, 10); // Small delay to ensure DOM is ready

    return () => {
      clearTimeout(scrollTimeout);
    };
  }, [open, viewMode, inputValue, topMatch, scrRef.book, getBookValue]);

  // Focus first valid chapter when entering chapter viewmode and reset scroll position
  useLayoutEffect(() => {
    if (viewMode === 'chapters' && selectedBookForChapters) {
      // Check if we're entering chapter view for the currently selected book
      const isCurrentlySelectedBook = selectedBookForChapters === scrRef.book;
      const startChapter = isCurrentlySelectedBook ? scrRef.chapterNum : 1;

      // Set the appropriate chapter as selected using the controlled value
      setCommandValue(getChapterValue(selectedBookForChapters, startChapter));

      // Reset scroll position to top, except when viewing the currently selected book
      setTimeout(() => {
        if (commandListRef.current) {
          if (isCurrentlySelectedBook) {
            // Scroll to the currently selected chapter
            const targetElement = chapterRefs.current[scrRef.chapterNum];
            if (targetElement) {
              targetElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
          } else {
            // Reset to top for other books
            commandListRef.current.scrollTo({ top: 0 });
          }
        }
      }, 0);
    } else if (viewMode === 'books' && topMatch) {
      // In books view with top match, if we have a topMatch with a chapter, start there
      // Otherwise start at chapter 1
      const startChapter = topMatch.chapterNum ?? 1;
      setCommandValue(getChapterValue(topMatch.book, startChapter));
    }
  }, [
    viewMode,
    selectedBookForChapters,
    getChapterValue,
    topMatch,
    scrRef.book,
    scrRef.chapterNum,
  ]);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          aria-label="book-chapter-trigger"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('tw-w-64', className)}
        >
          {currentDisplayValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="tw-w-[300px] tw-p-0" align="start">
        <Command
          onKeyDown={handleChapterKeyDown}
          loop
          value={commandValue}
          onValueChange={setCommandValue}
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

              // For chapter items when showing top match chapters, check if they match the parsed book
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
            <div className="tw-flex tw-items-end">
              <CommandInput
                ref={commandInputRef}
                placeholder={currentDisplayValue}
                value={inputValue}
                onValueChange={setInputValue}
                onKeyDown={handleEnhancedInputKeyDown}
              />
              {/* Navigation buttons for previous/next chapter/book */}
              <div className="tw-flex tw-items-center tw-gap-1 tw-border-b">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePreviousBook}
                  disabled={availableBooks.indexOf(scrRef.book) === 0}
                  className="tw-h-10 tw-w-4 tw-p-0"
                  title="Previous Book"
                >
                  <ChevronsLeft />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePreviousChapter}
                  disabled={scrRef.chapterNum === 1 && availableBooks.indexOf(scrRef.book) === 0}
                  className="tw-h-10 tw-w-4 tw-p-0"
                  title="Previous Chapter"
                >
                  <ChevronLeft />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNextChapter}
                  disabled={
                    scrRef.chapterNum === fetchEndChapter(scrRef.book) &&
                    availableBooks.indexOf(scrRef.book) === availableBooks.length - 1
                  }
                  className="tw-h-10 tw-w-4 tw-p-0"
                  title="Next Chapter"
                >
                  <ChevronRight />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNextBook}
                  disabled={availableBooks.indexOf(scrRef.book) === availableBooks.length - 1}
                  className="tw-h-10 tw-w-4 tw-p-0"
                  title="Next Book"
                >
                  <ChevronsRight />
                </Button>
              </div>
            </div>
          ) : (
            <div className="tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToBooks}
                onKeyDown={handleGenericKeyDown}
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

                {/* Unified Scripture Reference - Show parsed reference when available */}
                {topMatch && (
                  <>
                    <CommandGroup heading="Scripture Reference">
                      <CommandItem
                        key="unified-match"
                        value={`${topMatch.book} ${ALL_ENGLISH_BOOK_NAMES[topMatch.book]} ${
                          topMatch.chapterNum || ''
                        }:${topMatch.verseNum || ''})}`}
                        onSelect={handleUnifiedMatchSelect}
                        className="tw-font-semibold tw-text-primary"
                      >
                        {formatScrRef({
                          book: topMatch.book,
                          chapterNum: topMatch.chapterNum ?? 1,
                          verseNum: topMatch.verseNum ?? 1,
                        })}
                        <span className="tw-ml-auto tw-text-xs tw-text-muted-foreground">
                          Ctrl+Enter
                        </span>
                      </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                  </>
                )}

                {/* Chapter Selector - Show when we have a top match */}
                {topMatch && topMatchChapterData && (
                  <>
                    <div className="tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground">
                      {topMatchChapterData.bookName} - Select Chapter
                    </div>
                    <CommandGroup forceMount>
                      <div className="tw-grid tw-grid-cols-6 tw-gap-1 tw-px-4 tw-pb-4">
                        {Array.from(
                          { length: topMatchChapterData.endChapter },
                          (_, i) => i + 1,
                        ).map((chapter) => (
                          <CommandItem
                            key={chapter}
                            value={`${topMatch.book} ${ALL_ENGLISH_BOOK_NAMES[topMatch.book]} ${chapter}`}
                            onSelect={() => handleChapterSelect(chapter)}
                            data-chapter={chapter}
                            ref={setChapterRef(chapter)}
                            className={cn(
                              'tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm',
                              {
                                'tw-bg-primary tw-text-primary-foreground':
                                  chapter === topMatchChapterData.selectedChapter,
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
                        ))}
                      </div>
                    </CommandGroup>
                  </>
                )}

                {/* Book List - Show when we don't have a top match */}
                {!topMatch &&
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
                            ref={setChapterRef(chapter)}
                            className={cn(
                              'tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm',
                              {
                                'tw-bg-primary tw-text-primary-foreground':
                                  chapter === chapterViewData.selectedChapter,
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
