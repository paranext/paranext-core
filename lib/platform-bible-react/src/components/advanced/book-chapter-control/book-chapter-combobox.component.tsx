import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
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
import { ChapterSelect } from '@/components/advanced/book-chapter-control/chapter-select.component';

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
 * Popover+Command instead of DropdownMenu. This should provide better control over focus behavior
 * and interaction patterns.
 *
 * Features implemented:
 *
 * - Smart parsing logic for "John 3:16" style input
 * - Book selection with automatic chapter view transition
 * - ChapterSelect component integration
 * - Back navigation between views
 *
 * TODO: Advanced keyboard navigation, topMatchChapters filtering, etc.
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
  const [highlightedChapter, setHighlightedChapter] = useState<number>(1);

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

          const matches = format.exec(query);
          if (matches) {
            const [book, chapter = undefined, verse = undefined] = matches.slice(1);
            const englishName = getBookIdFromEnglishName(book);
            const validBookId =
              englishName ?? (Canon.isBookIdValid(book) ? book.toLocaleUpperCase() : undefined);

            if (validBookId && availableBooks.includes(validBookId)) {
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

  // Filter books based on search input (only when not showing top match)
  const filteredBooks = useMemo(() => {
    // If we have a top match, don't show the filtered book list to reduce noise
    if (topMatch) {
      return { OT: [], NT: [], DC: [] };
    }

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
  }, [booksByType, inputValue, topMatch]);

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
      setHighlightedChapter(scrRef.book === bookId ? scrRef.chapterNum : 1);
      setInputValue(''); // Clear search when transitioning
    },
    [handleSubmit, scrRef.book, scrRef.chapterNum],
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

  const handleBackToBooks = useCallback(() => {
    setViewMode('books');
    setSelectedBookForChapters(undefined);
    setInputValue('');
  }, []);

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
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className={className}>
          {currentDisplayValue}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="tw-w-[300px] tw-p-0" align="start">
        <Command>
          {/* Input for book view, fixed header for chapter view */}
          {viewMode === 'books' ? (
            <CommandInput
              placeholder="Search books or type reference (e.g., John 3:16)..."
              value={inputValue}
              onValueChange={setInputValue}
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
            {viewMode === 'books' ? (
              <>
                <CommandEmpty>No books found.</CommandEmpty>

                {/* Top Match - Show parsed scripture reference */}
                {topMatch && (
                  <>
                    <CommandGroup heading="Scripture Reference">
                      <CommandItem
                        key="top-match"
                        value={`top-match-${topMatch.book}-${topMatch.chapterNum || 1}-${topMatch.verseNum || 1}`}
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

                {/* Book List - Only show when no top match */}
                {Object.entries(filteredBooks).map(([type, books]) => {
                  if (books.length === 0) return undefined;

                  return (
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    <CommandGroup key={type} heading={BOOK_TYPE_LABELS[type as BookType]}>
                      {books.map((bookId) => (
                        <CommandItem
                          key={bookId}
                          value={bookId}
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
            ) : (
              /* Chapter View */
              <div className="tw-p-4">
                {chapterViewData && (
                  <ChapterSelect
                    handleSelectChapter={handleChapterSelect}
                    endChapter={chapterViewData.endChapter}
                    selectedChapter={chapterViewData.selectedChapter}
                    highlightedChapter={highlightedChapter}
                    handleHighlightedChapter={setHighlightedChapter}
                  />
                )}
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default BookChapterCombobox;
