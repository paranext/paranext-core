import { BookItem } from '@/components/shared/book-item.component';
import { Button } from '@/components/shadcn-ui/button';
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/shadcn-ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import { Direction, readDirection } from '@/utils/dir-helper.util';
import { cn } from '@/utils/shadcn-ui.util';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { formatScrRef, getSectionForBook, Section } from 'platform-bible-utils';
import {
  getSectionLongName,
  getLocalizedBookName,
  getLocalizedBookId,
  ALL_BOOK_IDS,
  ALL_ENGLISH_BOOK_NAMES,
  doesBookMatchQuery,
} from '@/components/shared/book.utils';
import { KeyboardEvent, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { generateCommandValue } from '@/components/shared/book-item.utils';
import RecentSearches from '../recent-searches.component';
import { useQuickNavButtons } from './book-chapter-control.navigation';
import { BookChapterControlProps, ViewMode } from './book-chapter-control.types';
import {
  calculateTopMatch,
  fetchEndChapter,
  getKeyCharacterType,
} from './book-chapter-control.utils';
import { ChapterGrid } from './chapter-grid.component';

/**
 * `BookChapterControl` is a component that provides an interactive UI for selecting book chapters.
 * It allows users to input a search query to find specific books and chapters, navigate through
 * options with keyboard interactions, and submit selections. The component handles various
 * interactions such as opening and closing the dropdown menu, filtering book lists based on search
 * input, and managing highlighted selections. It also integrates with external handlers for
 * submitting selected references and retrieving active book IDs.
 */
export function BookChapterControl({
  scrRef,
  handleSubmit,
  className,
  getActiveBookIds,
  localizedBookNames,
  localizedStrings,
  recentSearches,
  onAddRecentSearch,
  id,
}: BookChapterControlProps) {
  const direction: Direction = readDirection();

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
  const [isCommandListHidden, setIsCommandListHidden] = useState(false);

  // Reference to the Command component
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const commandRef = useRef<HTMLDivElement>(undefined!);
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
  const chapterRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Wrapper function to handle submit and add to recent searches
  const handleSubmitAndAddToRecent = useCallback(
    (newScrRef: SerializedVerseRef) => {
      handleSubmit(newScrRef);
      if (onAddRecentSearch) {
        onAddRecentSearch(newScrRef);
      }
    },
    [handleSubmit, onAddRecentSearch],
  );

  // #region Available books, filtering and top match logic

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

  // Filter books based on search input
  const filteredBooksByType = useMemo(() => {
    if (!inputValue.trim()) return availableBooksByType;

    const filteredBooks: Record<Section, string[]> = {
      [Section.OT]: [],
      [Section.NT]: [],
      [Section.DC]: [],
      [Section.Extra]: [],
    };

    const bookTypes: Section[] = [Section.OT, Section.NT, Section.DC, Section.Extra];
    bookTypes.forEach((type) => {
      filteredBooks[type] = availableBooksByType[type].filter((bookId) => {
        return doesBookMatchQuery(bookId, inputValue, localizedBookNames);
      });
    });

    return filteredBooks;
  }, [availableBooksByType, inputValue, localizedBookNames]);

  // Get the current top match
  const topMatch = useMemo(
    () => calculateTopMatch(inputValue, availableBooks, localizedBookNames),
    [inputValue, availableBooks, localizedBookNames],
  );

  // #endregion

  // #region Submitting references

  const handleTopMatchSelect = useCallback(() => {
    // If we have a top match (smart parsed or single book filter), use its specific chapter/verse
    if (topMatch) {
      handleSubmitAndAddToRecent({
        book: topMatch.book,
        chapterNum: topMatch.chapterNum ?? 1,
        verseNum: topMatch.verseNum ?? 1,
      });
      setIsCommandOpen(false);
      setInputValue('');
      setCommandValue(''); // Reset command value
    }
  }, [handleSubmitAndAddToRecent, topMatch]);

  const handleBookSelect = useCallback(
    (bookId: string) => {
      // Check if book has chapters - if not, submit immediately
      const endChapter = fetchEndChapter(bookId);
      if (endChapter <= 1) {
        handleSubmitAndAddToRecent({
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
    [handleSubmitAndAddToRecent],
  );

  const handleChapterSelect = useCallback(
    (chapterNumber: number) => {
      // Determine which book we're selecting a chapter for
      const bookId = viewMode === 'chapters' ? selectedBookForChaptersView : topMatch?.book;
      if (!bookId) return;

      handleSubmitAndAddToRecent({
        book: bookId,
        chapterNum: chapterNumber,
        verseNum: 1,
      });
      setIsCommandOpen(false);
      setViewMode('books');
      setSelectedBookForChaptersView(undefined);
      setInputValue('');
    },
    [handleSubmitAndAddToRecent, viewMode, selectedBookForChaptersView, topMatch],
  );

  const handleRecentItemSelect = useCallback(
    (item: SerializedVerseRef) => {
      handleSubmitAndAddToRecent(item);
      setIsCommandOpen(false);
      setInputValue('');
    },
    [handleSubmitAndAddToRecent],
  );

  // #endregion

  // #region Navigation and view changes

  // Hook that provides navigation buttons for quick chapter/verse navigation
  const quickNavButtons = useQuickNavButtons(scrRef, availableBooks, direction, handleSubmit);

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

  const doesChapterMatch = useCallback(
    (chapter: number) => {
      if (!topMatch) return false;
      return !!topMatch.chapterNum && !chapter.toString().includes(topMatch.chapterNum.toString());
    },
    [topMatch],
  );

  const currentDisplayValue = useMemo(
    () =>
      formatScrRef(
        scrRef,
        localizedBookNames ? getLocalizedBookName(scrRef.book, localizedBookNames) : 'English',
      ),
    [scrRef, localizedBookNames],
  );

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
    (event: KeyboardEvent<HTMLDivElement | HTMLButtonElement>) => {
      if (event.ctrlKey) return;

      const { isLetter, isDigit } = getKeyCharacterType(event.key);

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
          return match ? parseInt(match[1], 10) : 0;
        })();

        const maxChapter = fetchEndChapter(currentBookId);

        if (!maxChapter) return;

        let targetChapter = currentChapter;
        const GRID_COLS = 6;

        switch (event.key) {
          case 'ArrowLeft':
            if (currentChapter !== 0)
              targetChapter = currentChapter > 1 ? currentChapter - 1 : maxChapter;
            break;
          case 'ArrowRight':
            if (currentChapter !== 0)
              targetChapter = currentChapter < maxChapter ? currentChapter + 1 : 1;
            break;
          case 'ArrowUp':
            targetChapter =
              currentChapter === 0 ? maxChapter : Math.max(1, currentChapter - GRID_COLS);
            break;
          case 'ArrowDown':
            targetChapter =
              currentChapter === 0 ? 1 : Math.min(maxChapter, currentChapter + GRID_COLS);
            break;
          default:
            return;
        }

        if (targetChapter !== currentChapter) {
          event.preventDefault();
          event.stopPropagation();

          // Update the command value to the target chapter
          setCommandValue(generateCommandValue(currentBookId, localizedBookNames, targetChapter));

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
      commandValue,
      localizedBookNames,
    ],
  );

  const handleQuickNavButtonKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.shiftKey || event.key === 'Tab' || event.key === ' ') return;

    const { isLetter, isDigit } = getKeyCharacterType(event.key);

    if (isLetter || isDigit) {
      event.preventDefault();

      setInputValue((prevValue) => prevValue + event.key);
      commandInputRef.current.focus();

      setIsCommandListHidden(false);
    }
  }, []);

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
  }, [isCommandOpen, viewMode, inputValue, topMatch, scrRef.book]);

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

        // Ensure Command component has focus for keyboard navigation
        if (commandRef.current) {
          commandRef.current.focus();
        }
      }, 0);
    }
  }, [viewMode, selectedBookForChaptersView, topMatch, scrRef.book, scrRef.chapterNum]);

  // #endregion

  return (
    <Popover open={isCommandOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          aria-label="book-chapter-trigger"
          variant="outline"
          role="combobox"
          aria-expanded={isCommandOpen}
          className={cn(
            'tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1',
            className,
          )}
        >
          <span className="tw-truncate">{currentDisplayValue}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent id={id} forceMount className="tw-w-[280px] tw-p-0" align="center">
        <Command
          ref={commandRef}
          onKeyDown={handleCommandKeyDown}
          loop
          value={commandValue}
          onValueChange={setCommandValue}
          shouldFilter={false}
        >
          {/* Header: Input (with quick nav buttons) for book view, fixed header for chapter view */}
          {viewMode === 'books' ? (
            <div className="tw-flex tw-items-end">
              <div className="tw-relative tw-flex-1">
                <CommandInput
                  ref={commandInputRef}
                  value={inputValue}
                  onValueChange={setInputValue}
                  onKeyDown={handleInputKeyDown}
                  onFocus={() => setIsCommandListHidden(false)}
                  className={recentSearches && recentSearches.length > 0 ? '!tw-pr-10' : ''}
                />
                {recentSearches && recentSearches.length > 0 && (
                  <RecentSearches
                    recentSearches={recentSearches}
                    onSearchItemSelect={handleRecentItemSelect}
                    renderItem={(verseRef) => formatScrRef(verseRef, 'English')}
                    getItemKey={(verseRef) =>
                      `${verseRef.book}-${verseRef.chapterNum}-${verseRef.verseNum}`
                    }
                    ariaLabel={localizedStrings?.['%history_recentSearches_ariaLabel%']}
                    groupHeading={localizedStrings?.['%history_recent%']}
                  />
                )}
              </div>
              {/* Navigation buttons for previous/next chapter/book */}
              <div className="tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2">
                {quickNavButtons.map(({ onClick, disabled, title, icon: Icon }) => (
                  <Button
                    key={title}
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setIsCommandListHidden(true);
                      onClick();
                    }}
                    disabled={disabled}
                    className="tw-h-10 tw-w-4 tw-p-0"
                    title={title}
                    onKeyDown={handleQuickNavButtonKeyDown}
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
                tabIndex={-1}
              >
                {direction === 'ltr' ? (
                  <ArrowLeft className="tw-h-4 tw-w-4" />
                ) : (
                  <ArrowRight className="tw-h-4 tw-w-4" />
                )}
              </Button>
              {selectedBookForChaptersView && (
                <span tabIndex={-1} className="tw-text-sm tw-font-medium">
                  {getLocalizedBookName(selectedBookForChaptersView, localizedBookNames)}
                </span>
              )}
            </div>
          )}

          {/** Body */}
          {!isCommandListHidden && (
            <CommandList ref={commandListRef}>
              {/** Book list mode (also used in case of top matches) */}
              {viewMode === 'books' && (
                <>
                  {/* Book List - Show when we don't have a top match */}
                  {!topMatch &&
                    Object.entries(filteredBooksByType).map(([type, books]) => {
                      if (books.length === 0) return undefined;

                      return (
                        // We are mapping over filteredBooksByType, which uses Section as key type
                        // eslint-disable-next-line no-type-assertion/no-type-assertion
                        <CommandGroup key={type} heading={getSectionLabel(type as Section)}>
                          {books.map((bookId) => (
                            <BookItem
                              key={bookId}
                              bookId={bookId}
                              onSelect={(selectedBookId: string) =>
                                handleBookSelect(selectedBookId)
                              }
                              section={getSectionForBook(bookId)}
                              commandValue={`${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId]}`}
                              ref={bookId === scrRef.book ? selectedBookItemRef : undefined}
                              localizedBookNames={localizedBookNames}
                            />
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
                        {formatScrRef(
                          {
                            book: topMatch.book,
                            chapterNum: topMatch.chapterNum ?? 1,
                            verseNum: topMatch.verseNum ?? 1,
                          },
                          localizedBookNames
                            ? getLocalizedBookId(topMatch.book, localizedBookNames)
                            : undefined,
                        )}
                      </CommandItem>
                    </CommandGroup>
                  )}

                  {/* Chapter Selector - Show when we have a top match */}
                  {topMatch && fetchEndChapter(topMatch.book) > 1 && (
                    <>
                      <div className="tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground">
                        {getLocalizedBookName(topMatch.book, localizedBookNames)}
                      </div>
                      <ChapterGrid
                        bookId={topMatch.book}
                        scrRef={scrRef}
                        onChapterSelect={handleChapterSelect}
                        setChapterRef={setChapterRef}
                        isChapterDimmed={doesChapterMatch}
                        className="tw-px-4 tw-pb-4"
                      />
                    </>
                  )}
                </>
              )}

              {/* Basic chapter view mode */}
              {viewMode === 'chapters' && selectedBookForChaptersView && (
                <ChapterGrid
                  bookId={selectedBookForChaptersView}
                  scrRef={scrRef}
                  onChapterSelect={handleChapterSelect}
                  setChapterRef={setChapterRef}
                  className="tw-p-4"
                />
              )}
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default BookChapterControl;
