import { useCallback, useLayoutEffect, useMemo, useRef, useState, KeyboardEvent } from 'react';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { formatScrRef, getChaptersForBook } from 'platform-bible-utils';
import { ArrowLeft, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn-ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { cn } from '@/utils/shadcn-ui.util';
import { Direction, readDirection } from '@/utils/dir-helper.util';

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
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
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
type ViewMode = 'books' | 'chapters';

function fetchEndChapter(bookId: string) {
  // getChaptersForBook returns -1 if not found in scrBookData
  // scrBookData only includes OT and NT, so all DC will return -1
  return getChaptersForBook(Canon.bookIdToNumber(bookId));
}

export type BookChapterControlProps = {
  /** The current scripture reference */
  scrRef: SerializedVerseRef;
  /** Function to handle the submission of selected references */
  handleSubmit: (scrRef: SerializedVerseRef) => void;
  /** Optional additional class name for styling */
  className?: string;
  /** Function to retrieve active book IDs */
  getActiveBookIds?: () => string[];
};

/**
 * `BookChapterControl` is a component that provides an interactive UI for selecting book chapters.
 * It allows users to input a search query to find specific books and chapters, navigate through
 * options with keyboard interactions, and submit selections. The component handles various
 * interactions such as opening and closing the dropdown menu, filtering book lists based on search
 * input, and managing highlighted selections. It also integrates with external handlers for
 * submitting selected references and retrieving active book IDs.
 *
 * @param {BookChapterControlProps} props
 * @param {SerializedVerseRef} props.scrRef - The current scripture reference.
 * @param {function} props.handleSubmit - Function to handle the submission of selected references.
 * @param {string} [props.className] - Optional additional class name for styling.
 * @param {function} [props.getActiveBookIds] - Function to retrieve active book IDs.
 */
export function BookChapterControl({
  scrRef,
  handleSubmit,
  className,
  getActiveBookIds,
}: BookChapterControlProps) {
  const dir: Direction = readDirection();

  // Indicates if the Command popover is open or not
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  // The value of the Command, mainly needed for reliable keyboard navigation
  const [commandValue, setCommandValue] = useState('');
  // The value of the Input inside the Command
  const [inputValue, setInputValue] = useState('');
  // The current view mode (books or chapters)
  const [viewMode, setViewMode] = useState<ViewMode>('books');
  // The book currently selected for chapter view, if any
  const [selectedBookForChaptersView, setSelectedBookForChaptersView] = useState<
    string | undefined
  >(undefined);

  // Reference to the Input component inside the Command
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const commandInputRef = useRef<HTMLInputElement>(undefined!);
  // Reference to the CommandList inside the Command
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const commandListRef = useRef<HTMLDivElement>(undefined!);
  // Reference to the selected book item in the CommandList
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const selectedBookItemRef = useRef<HTMLDivElement>(undefined!);
  // References to the chapters that are shown as CommandItems
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const chapterRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // #region Available books, filtering and top match logic

  const activeBookIds = useMemo(() => {
    return getActiveBookIds ? getActiveBookIds() : ALL_BOOK_IDS;
  }, [getActiveBookIds]);

  const availableBooksByType = useMemo(() => {
    const grouped: Record<BookType, string[]> = {
      OT: activeBookIds.filter((bookId) => Canon.isBookOT(bookId)),
      NT: activeBookIds.filter((bookId) => Canon.isBookNT(bookId)),
      DC: activeBookIds.filter((bookId) => Canon.isBookDC(bookId)),
      Extra: activeBookIds.filter((bookId) => Canon.extraBooks().includes(bookId)),
    };
    return grouped;
  }, [activeBookIds]);

  const availableBooks = useMemo(() => {
    return Object.values(availableBooksByType).flat();
  }, [availableBooksByType]);

  // Filter books based on search input
  const filteredBooksByType = useMemo(() => {
    if (!inputValue.trim()) return availableBooksByType;

    const inputValueLowerCase = inputValue.toLowerCase();
    const filteredBooks: Record<BookType, string[]> = { OT: [], NT: [], DC: [], Extra: [] };

    const bookTypes: BookType[] = ['OT', 'NT', 'DC', 'Extra'];
    bookTypes.forEach((type) => {
      filteredBooks[type] = availableBooksByType[type].filter((bookId) => {
        const englishName = ALL_ENGLISH_BOOK_NAMES[bookId].toLowerCase();
        return (
          englishName.includes(inputValueLowerCase) ||
          bookId.toLowerCase().includes(inputValueLowerCase)
        );
      });
    });

    return filteredBooks;
  }, [availableBooksByType, inputValue]);

  // Calculate top match based on current search query
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

            let validBookId: string | undefined;

            // Match for exact full book name
            const getBookIdFromEnglishName = (bookName: string): string | undefined => {
              return Object.keys(ALL_ENGLISH_BOOK_NAMES).find(
                (bookId) => ALL_ENGLISH_BOOK_NAMES[bookId].toLowerCase() === bookName.toLowerCase(),
              );
            };

            const matchingBookIdForFullName = getBookIdFromEnglishName(book);
            if (matchingBookIdForFullName && availableBooks.includes(matchingBookIdForFullName)) {
              validBookId = matchingBookIdForFullName;
            }

            // Match for exact book id
            if (!validBookId && Canon.isBookIdValid(book)) {
              const bookUpperCase = book.toUpperCase();
              if (availableBooks.includes(bookUpperCase)) {
                validBookId = bookUpperCase;
              }
            }

            // Match for partial book name or id
            if (!validBookId) {
              const bookLowerCase = book.toLowerCase();

              const allPotentialMatches = availableBooks.filter((bookId) => {
                const bookEnglishName = ALL_ENGLISH_BOOK_NAMES[bookId];
                return (
                  bookEnglishName.toLowerCase().includes(bookLowerCase) ||
                  bookId.toLowerCase().includes(bookLowerCase)
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

      if (smartParseResult) return smartParseResult;

      return undefined;
    },
    [availableBooks],
  );

  // Get the current top match
  const topMatch = useMemo(() => calculateTopMatch(inputValue), [calculateTopMatch, inputValue]);

  // #endregion

  // #region Submitting references

  const handleTopMatchSelect = useCallback(() => {
    // If we have a top match (smart parsed or single book filter), use its specific chapter/verse
    if (topMatch) {
      handleSubmit({
        book: topMatch.book,
        chapterNum: topMatch.chapterNum ?? 1,
        verseNum: topMatch.verseNum ?? 1,
      });
      setIsCommandOpen(false);
      setInputValue('');
      setCommandValue(''); // Reset command value
    }
  }, [handleSubmit, topMatch]);

  const handleBookSelect = useCallback(
    (bookId: string) => {
      // Check if book has chapters - if not, submit immediately
      const endChapter = fetchEndChapter(bookId);
      if (endChapter <= 1) {
        handleSubmit({
          book: bookId,
          chapterNum: 1,
          verseNum: 1,
        });
        setIsCommandOpen(false);
        setInputValue('');
        return;
      }

      // Book has multiple chapters - transition to chapter view
      setSelectedBookForChaptersView(bookId);
      setViewMode('chapters');
    },
    [handleSubmit],
  );

  const handleChapterSelect = useCallback(
    (chapterNumber: number) => {
      // Determine which book we're selecting a chapter for
      const bookId = viewMode === 'chapters' ? selectedBookForChaptersView : topMatch?.book;
      if (!bookId) return;

      handleSubmit({
        book: bookId,
        chapterNum: chapterNumber,
        verseNum: 1,
      });
      setIsCommandOpen(false);
      setViewMode('books');
      setSelectedBookForChaptersView(undefined);
      setInputValue('');
    },
    [handleSubmit, viewMode, selectedBookForChaptersView, topMatch],
  );

  // #endregion

  // #region Navigation and view changes

  const handleBackToBooks = useCallback(() => {
    setViewMode('books');
    setSelectedBookForChaptersView(undefined);

    // Focus the search input when returning to book view
    setTimeout(() => {
      if (commandInputRef.current) {
        commandInputRef.current.focus();
      }
    }, 0);
  }, []);

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

  const quickNavButtons = useMemo(() => {
    return [
      {
        onClick: handlePreviousChapter,
        disabled: scrRef.chapterNum === 1 && availableBooks.indexOf(scrRef.book) === 0,
        title: 'Previous chapter',
        icon: dir === 'ltr' ? ChevronLeft : ChevronRight,
      },
      {
        onClick: handlePreviousVerse,
        disabled: scrRef.verseNum === 0,
        title: 'Previous verse',
        icon: dir === 'ltr' ? ChevronsLeft : ChevronsRight,
      },
      {
        onClick: handleNextVerse,
        title: 'Next verse',
        icon: dir === 'ltr' ? ChevronsRight : ChevronsLeft,
      },
      {
        onClick: handleNextChapter,
        disabled:
          (scrRef.chapterNum === fetchEndChapter(scrRef.book) ||
            fetchEndChapter(scrRef.book) === -1) &&
          availableBooks.indexOf(scrRef.book) === availableBooks.length - 1,
        title: 'Next chapter',
        icon: dir === 'ltr' ? ChevronRight : ChevronLeft,
      },
    ];
  }, [
    handlePreviousChapter,
    scrRef.chapterNum,
    scrRef.book,
    scrRef.verseNum,
    availableBooks,
    dir,
    handlePreviousVerse,
    handleNextVerse,
    handleNextChapter,
  ]);

  // Reset view state when popover opens
  const handleOpenChange = useCallback(
    (shouldCommandBeOpen: boolean) => {
      // If we're closing from chapter view, don't close popover but go back to books view instead
      if (!shouldCommandBeOpen && viewMode === 'chapters') {
        handleBackToBooks();
        return;
      }

      setIsCommandOpen(shouldCommandBeOpen);

      if (shouldCommandBeOpen) {
        // Reset Command state when opening
        setViewMode('books');
        setSelectedBookForChaptersView(undefined);
        setInputValue('');
      }
    },
    [viewMode, handleBackToBooks],
  );

  // #endregion

  // #region Helper functions and variables

  const isChapterDisabled = useCallback(
    (chapter: number) => {
      if (!topMatch) return false;
      return !!topMatch.chapterNum && !chapter.toString().includes(topMatch.chapterNum.toString());
    },
    [topMatch],
  );

  const currentDisplayValue = useMemo(() => formatScrRef(scrRef, 'English'), [scrRef]);

  const chapterViewData = useMemo(() => {
    const bookId = selectedBookForChaptersView ?? topMatch?.book;
    if (!bookId) return undefined;

    const endChapter = fetchEndChapter(bookId);
    const bookName = ALL_ENGLISH_BOOK_NAMES[bookId];

    return {
      endChapter,
      bookName,
      selectedChapter: scrRef.book === bookId ? scrRef.chapterNum : 0,
    };
  }, [selectedBookForChaptersView, topMatch?.book, scrRef.book, scrRef.chapterNum]);

  const generateCommandValue = useCallback((bookId: string, chapter?: number) => {
    return `${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId]}${chapter ? ` ${chapter}` : ''}`;
  }, []);

  const setChapterRef = useCallback((chapter: number) => {
    return (element: HTMLDivElement | null) => {
      chapterRefs.current[chapter] = element;
    };
  }, []);

  // #endregion

  // #region Keyboard handling

  // Handle keyboard navigation for CommandInput
  const handleInputKeyDown = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
    // Override default Home and End key behavior to work normally for cursor movement.
    // Default behavior was to jump to the start/end of the list of items in the Command
    if (event.key === 'Home' || event.key === 'End') {
      event.stopPropagation(); // Prevent Command component from handling these
    }
  }, []);

  // Grid-aware keyboard navigation using Command's controlled value
  const handleCommandKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      // if (event.ctrlKey) return;

      const isLetter = /^[a-zA-Z]$/.test(event.key);
      const isDigit = /^[0-9]$/.test(event.key);

      // Handle keypresses in chapter viewmode
      if (viewMode === 'chapters') {
        // Handle backspace for going back to books
        if (event.key === 'Backspace') {
          event.preventDefault();
          event.stopPropagation();
          handleBackToBooks();
          return;
        }

        if (isLetter || isDigit) {
          event.preventDefault();
          event.stopPropagation();
          setViewMode('books');
          setSelectedBookForChaptersView(undefined);

          if (isDigit && selectedBookForChaptersView) {
            // Digit pressed: go back to book list and start search with current book name + digit
            const currentBookName = ALL_ENGLISH_BOOK_NAMES[selectedBookForChaptersView];
            setInputValue(`${currentBookName} ${event.key}`);
          } else {
            setInputValue(event.key);
          }

          setTimeout(() => {
            if (commandInputRef.current) {
              commandInputRef.current.focus();
            }
          }, 0);
          return;
        }
      }

      // Handle keypresses in books viewmode
      if (viewMode === 'books' && (isLetter || isDigit)) {
        event.preventDefault();
        event.stopPropagation();

        setInputValue((prevValue) => prevValue + event.key);

        setTimeout(() => {
          if (commandInputRef.current) {
            commandInputRef.current.focus();
          }
        }, 0);
        return;
      }

      // Handle grid navigation for arrow keys in chapter views
      if (
        (viewMode === 'chapters' || (viewMode === 'books' && topMatch)) &&
        ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)
      ) {
        // Extract current chapter from commandValue
        const currentBookId =
          viewMode === 'chapters' ? selectedBookForChaptersView : topMatch?.book;
        if (!currentBookId) return;

        // Parse chapter from current command value
        const currentChapter = (() => {
          if (!commandValue) return 1;
          const match = commandValue.match(/(\d+)$/);
          return match ? parseInt(match[1], 10) : 1;
        })();

        const maxChapter = chapterViewData?.endChapter;

        if (!maxChapter) return;

        // Helper function to find next valid (non-disabled) chapter in a direction
        const findValidChapter = (startChapter: number, direction: number, maxSteps: number) => {
          for (let i = 1; i <= maxSteps; i++) {
            const chapterNumber = startChapter + direction * i;
            if (chapterNumber < 1 || chapterNumber > maxChapter) break;
            if (!isChapterDisabled(chapterNumber)) {
              return chapterNumber;
            }
          }
          return startChapter; // Return original if no valid chapter found
        };

        let targetChapter = currentChapter;
        const GRID_COLS = 6;

        switch (event.key) {
          case 'ArrowLeft':
            targetChapter = findValidChapter(currentChapter, -1, maxChapter);
            break;
          case 'ArrowRight':
            targetChapter = findValidChapter(currentChapter, 1, maxChapter);
            break;
          case 'ArrowUp':
            targetChapter = findValidChapter(
              currentChapter,
              -GRID_COLS,
              Math.ceil(maxChapter / GRID_COLS),
            );
            break;
          case 'ArrowDown':
            targetChapter = findValidChapter(
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
          setCommandValue(generateCommandValue(currentBookId, targetChapter));

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
      topMatch,
      handleBackToBooks,
      selectedBookForChaptersView,
      chapterViewData?.endChapter,
      commandValue,
      isChapterDisabled,
      generateCommandValue,
    ],
  );

  // #endregion

  // #region Auto-scroll

  // Auto-scroll to currently selected book when dropdown opens in book view
  useLayoutEffect(() => {
    const scrollTimeout = setTimeout(() => {
      if (
        isCommandOpen &&
        viewMode === 'books' &&
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
        setCommandValue(generateCommandValue(scrRef.book));
      }
    }, 0);

    return () => {
      clearTimeout(scrollTimeout);
    };
  }, [isCommandOpen, viewMode, inputValue, topMatch, scrRef.book, generateCommandValue]);

  // Auto-scroll to appropriate chapter
  useLayoutEffect(() => {
    if (viewMode === 'chapters' && selectedBookForChaptersView) {
      // Check if we're entering chapter view for the currently selected book
      const isCurrentlySelectedBook = selectedBookForChaptersView === scrRef.book;

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
    }
  }, [
    viewMode,
    selectedBookForChaptersView,
    generateCommandValue,
    topMatch,
    scrRef.book,
    scrRef.chapterNum,
  ]);

  // #endregion

  return (
    <Popover open={isCommandOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          aria-label="book-chapter-trigger"
          variant="outline"
          role="combobox"
          aria-expanded={isCommandOpen}
          className={cn('tw-h-8 tw-min-w-48', className)}
        >
          {currentDisplayValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="tw-w-[280px] tw-p-0" align="center">
        <Command
          onKeyDown={handleCommandKeyDown}
          loop
          value={commandValue}
          onValueChange={setCommandValue}
          shouldFilter={false}
        >
          {/* Header: Input (with quick nav buttons) for book view, fixed header for chapter view */}
          {viewMode === 'books' ? (
            <div className="tw-flex tw-items-end">
              <CommandInput
                ref={commandInputRef}
                placeholder={currentDisplayValue}
                value={inputValue}
                onValueChange={setInputValue}
                onKeyDown={handleInputKeyDown}
              />
              {/* Navigation buttons for previous/next chapter/book */}
              <div className="tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2">
                {quickNavButtons.map(({ onClick, disabled, title, icon: Icon }) => (
                  <Button
                    key={title}
                    variant="ghost"
                    size="sm"
                    onClick={onClick}
                    disabled={disabled}
                    className="tw-h-10 tw-w-4 tw-p-0"
                    title={title}
                  >
                    <Icon />
                  </Button>
                ))}
              </div>
            </div>
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
              <span className="tw-text-sm tw-font-medium">{chapterViewData?.bookName}</span>
            </div>
          )}

          {/** Body */}
          <CommandList ref={commandListRef}>
            {/** Book list mode (also used in case of top matches) */}
            {viewMode === 'books' && (
              <>
                {/* Book List - Show when we don't have a top match */}
                {!topMatch &&
                  Object.entries(filteredBooksByType).map(([type, books]) => {
                    if (books.length === 0) return undefined;

                    return (
                      // We are mapping over filteredBooksByType, which uses BookType as key type
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
                                'tw-border-s-amber-200': type.toLowerCase() === 'extra',
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

                {/* Top match scripture reference */}
                {topMatch && (
                  <CommandGroup>
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
                    </CommandItem>
                  </CommandGroup>
                )}

                {/* Chapter Selector - Show when we have a top match and chapter data is available */}
                {topMatch && chapterViewData && chapterViewData.endChapter > 1 && (
                  <>
                    <div className="tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground">
                      {chapterViewData.bookName}
                    </div>
                    <CommandGroup>
                      <div className="tw-grid tw-grid-cols-6 tw-gap-1 tw-px-4 tw-pb-4">
                        {Array.from({ length: chapterViewData.endChapter }, (_, i) => i + 1).map(
                          (chapter) => (
                            <CommandItem
                              key={chapter}
                              value={`${topMatch.book} ${ALL_ENGLISH_BOOK_NAMES[topMatch.book]} ${chapter}`}
                              onSelect={() => handleChapterSelect(chapter)}
                              ref={setChapterRef(chapter)}
                              className={cn(
                                'tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm',
                                {
                                  'tw-bg-primary tw-text-primary-foreground':
                                    chapter === chapterViewData.selectedChapter,
                                },
                              )}
                              disabled={isChapterDisabled(chapter)}
                            >
                              {chapter}
                            </CommandItem>
                          ),
                        )}
                      </div>
                    </CommandGroup>
                  </>
                )}
              </>
            )}

            {/* Basic chapter view mode */}
            {viewMode === 'chapters' && (
              <CommandGroup>
                <div className="tw-grid tw-grid-cols-6 tw-gap-1 tw-p-4">
                  {chapterViewData &&
                    Array.from({ length: chapterViewData.endChapter }, (_, i) => i + 1).map(
                      (chapter) => (
                        <CommandItem
                          key={chapter}
                          value={`${selectedBookForChaptersView || ''} ${ALL_ENGLISH_BOOK_NAMES[selectedBookForChaptersView || ''] || ''} ${chapter}`}
                          onSelect={() => handleChapterSelect(chapter)}
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
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default BookChapterControl;
