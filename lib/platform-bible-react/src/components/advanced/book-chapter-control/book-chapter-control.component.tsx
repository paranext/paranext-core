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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { Direction, readDirection } from '@/utils/dir-helper.util';
import { cn } from '@/utils/shadcn-ui/utils';
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
  LIST_ITEM_KEYBOARD_FOCUS_RING,
} from '@/components/shared/book.utils';
import {
  Fragment,
  KeyboardEvent,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { generateCommandValue } from '@/components/shared/book-item.utils';
import RecentSearches from '../recent-searches.component';
import { useQuickNavButtons } from './book-chapter-control.navigation';
import { BookChapterControlProps, ViewMode } from './book-chapter-control.types';
import {
  calculateTopMatch,
  CHAPTER_GRID_COLUMNS,
  computeTargetChapter,
  fetchEndChapter,
  getKeyCharacterType,
  isArrowKey,
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

  // Reference to the Input component inside the Command
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const commandInputRef = useRef<HTMLInputElement>(undefined!);
  // Reference to the CommandList inside the Command
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const commandListRef = useRef<HTMLDivElement>(undefined!);
  // Reference to the selected book item in the CommandList
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const selectedBookItemRef = useRef<HTMLDivElement>(undefined!);
  // Reference to the back button in chapter view
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const backButtonRef = useRef<HTMLButtonElement>(undefined!);
  // References to the chapters that are shown as CommandItems
  const chapterRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // Track when the CommandList (the list/grid container) has DOM focus. This is the single
  // source of truth for "the list/grid is focused"; everything else (input, buttons, back
  // button) handles its own focus ring via shadcn's focus-visible styles. When the list/grid
  // doesn't have DOM focus, BookItem / ChapterGrid suppress their data-selected ring so exactly
  // one focus indicator is visible at any time.
  const [isListFocused, setIsListFocused] = useState(false);

  // cmdk's CommandPrimitive.List forces tabIndex={-1} on its rendered div *after* spreading
  // caller props, so passing tabIndex={0} as a prop is silently overridden. Force tabIndex=0
  // via an imperative ref assignment on every render to keep CommandList in the tab order.
  useLayoutEffect(() => {
    if (commandListRef.current) {
      commandListRef.current.tabIndex = 0;
    }
  });

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
  const quickNavButtons = useQuickNavButtons(
    scrRef,
    availableBooks,
    direction,
    handleSubmit,
    localizedStrings,
  );

  const backToBooksLabel =
    localizedStrings?.['%bookChapterControl_backToBooks%'] ?? 'Back to books';

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

  // While the top-match row is shown, the chapter grid below can be navigated with arrow keys.
  // Reflect the currently highlighted chapter in the top-match row so the user sees what they're
  // about to submit. ChapterGrid cells have commandValues that end with the (colon-free) chapter
  // number, whereas the top-match row's own commandValue has the form "BOOK BookName N:N" (it
  // contains a colon). Skip the colon case so we don't mistake the parsed *verse* for a
  // highlighted chapter — falling back to the parsed query chapter instead. (Same guard as the
  // arrow-key handler in handleCommandKeyDown.)
  const topMatchDisplayChapter = useMemo(() => {
    if (!topMatch) return undefined;
    if (!commandValue.includes(':')) {
      const trailingDigits = commandValue.match(/(\d+)$/);
      if (trailingDigits) {
        const parsed = parseInt(trailingDigits[1], 10);
        const maxChapter = fetchEndChapter(topMatch.book);
        if (parsed >= 1 && (maxChapter <= 0 || parsed <= maxChapter)) return parsed;
      }
    }
    return topMatch.chapterNum ?? 1;
  }, [commandValue, topMatch]);

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

  // Shared "enter the list from outside" helper: moves DOM focus to the CommandList, seeds
  // commandValue to the first or last visible item (so the focus ring lands on the correct edge
  // rather than wherever cmdk would advance to from the previous value), and scrolls that item
  // into view (matters mostly for ArrowUp → last item, which would otherwise be far off-screen).
  const enterListFromOutside = useCallback((edge: 'first' | 'last') => {
    commandListRef.current?.focus();
    const items = commandListRef.current?.querySelectorAll<HTMLElement>(
      '[cmdk-item]:not([data-disabled="true"])',
    );
    if (!items || items.length === 0) return;
    const target = edge === 'first' ? items[0] : items[items.length - 1];
    const targetValue = target.getAttribute('data-value');
    if (targetValue) setCommandValue(targetValue);
    setTimeout(() => {
      target.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, 0);
  }, []);

  // Route a typed letter/digit into the search input and move focus there, so typing from any
  // focusable child (list/grid, back button, quick-nav, clock) lands in the input. In chapter view
  // this also exits chapter view: the character starts a new search (a digit is prefixed with the
  // current book name so it reads e.g. "Matthew 5"). isListFocused is cleared synchronously rather
  // than waiting for the list's async onBlur — otherwise there is a window where the input already
  // owns the typed text but the list still "has focus", leaving a focus ring visible and letting
  // the next Space/Enter be captured by the list's submit handler instead of the input.
  const routeTypedCharacterToInput = useCallback(
    (key: string) => {
      setIsListFocused(false);
      if (viewMode === 'chapters') {
        setViewMode('books');
        const { isDigit } = getKeyCharacterType(key);
        if (isDigit && selectedBookForChaptersView) {
          const currentBookName = ALL_ENGLISH_BOOK_NAMES[selectedBookForChaptersView];
          setInputValue(`${currentBookName} ${key}`);
        } else {
          setInputValue(key);
        }
        setSelectedBookForChaptersView(undefined);
      } else {
        setInputValue((prev) => prev + key);
      }
      setTimeout(() => commandInputRef.current?.focus(), 0);
    },
    [viewMode, selectedBookForChaptersView],
  );

  // Handle keyboard navigation for CommandInput
  const handleInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      // Override default Home and End key behavior so they perform native cursor movement
      // instead of cmdk's "jump to start/end of list".
      if (event.key === 'Home' || event.key === 'End') {
        event.stopPropagation();
        return;
      }

      // Left/Right arrows must move the text cursor within the input — not navigate the list.
      // stopPropagation prevents the Command's arrow handler from intercepting.
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.stopPropagation();
        return;
      }

      // Up/Down arrows hand focus off to the list/grid as a unit (per the spec: arrows enter
      // the list). The first/last *visible* item in the list gets the ring — we query the DOM
      // because the first item depends on filter state (book list, top-match row, or chapter
      // grid). Without this explicit seeding, cmdk would advance from the current commandValue
      // (typically the currently-selected book), so the first ArrowDown press would land on the
      // *second* row rather than the first. stopPropagation prevents handleCommandKeyDown's 2D
      // arrow handler from also acting on this event and double-advancing the selection. Tab is
      // intentionally NOT handled here — natural Tab order walks through the quick-nav buttons
      // first, per requirement.
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        event.stopPropagation();
        enterListFromOutside(event.key === 'ArrowDown' ? 'first' : 'last');
      }
    },
    [enterListFromOutside],
  );

  // Grid-aware keyboard navigation using Command's controlled value
  const handleCommandKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement | HTMLButtonElement>) => {
      if (event.ctrlKey) return;

      const { isLetter, isDigit } = getKeyCharacterType(event.key);

      // Backspace in chapter view always returns to book list (regardless of which child has
      // focus — fires even when the event bubbles up from the back button).
      if (viewMode === 'chapters' && event.key === 'Backspace') {
        event.preventDefault();
        event.stopPropagation();
        handleBackToBooks();
        return;
      }

      // Typing letters/digits while the list/grid has focus routes the character back into the
      // input so the user can resume editing the search (routeTypedCharacterToInput also handles
      // the chapter-view exit and book-name prefixing).
      if (isListFocused && (isLetter || isDigit)) {
        event.preventDefault();
        event.stopPropagation();
        routeTypedCharacterToInput(event.key);
        return;
      }

      // Backspace while the list has focus in book view: remove last char and refocus input.
      // (Chapter-view Backspace is handled above by the broader "back to book list" rule.)
      if (isListFocused && viewMode === 'books' && event.key === 'Backspace') {
        event.preventDefault();
        setIsListFocused(false);
        setInputValue((prev) => prev.slice(0, -1));
        commandInputRef.current?.focus();
        return;
      }

      // Space submits the currently data-selected item, matching Enter's behavior. cmdk's own
      // Enter handler dispatches a cmdk-item-select event on the active item; we get the same
      // effect by synthesizing a click, which cmdk's item-level onClick converts into an
      // onSelect call (this is the same trick RecentSearches uses).
      if (isListFocused && event.key === ' ') {
        event.preventDefault();
        const active = commandListRef.current?.querySelector<HTMLDivElement>(
          '[cmdk-item][data-selected="true"]',
        );
        active?.click();
        return;
      }

      // Handle grid navigation for arrow keys in chapter views. Only act when CommandList itself
      // owns DOM focus — otherwise an arrow key from an outside element (back button, recent
      // button, etc.) would bubble here and move the grid selection without the user being in
      // the grid. Up/Down handlers on those outside elements explicitly call commandListRef.focus()
      // before bubbling, so document.activeElement is already CommandList by the time this check
      // runs; Left/Right from those elements doesn't focus the list, so the check fails and the
      // grid stays put.
      if (
        (viewMode === 'chapters' || (viewMode === 'books' && topMatch)) &&
        isArrowKey(event.key) &&
        document.activeElement === commandListRef.current
      ) {
        // Extract current chapter from commandValue
        const currentBookId =
          viewMode === 'chapters' ? selectedBookForChaptersView : topMatch?.book;
        if (!currentBookId) return;

        // Parse chapter from current command value. Returns 0 when no chapter cell is the active
        // cmdk item — that includes:
        //   - empty value
        //   - a non-chapter value like "MAT Matthew" (set on chapter-view entry)
        //   - the top-match row's value, which has the form "BOOK BookName N:N" (contains a
        //     colon). The trailing-digit regex would otherwise capture the *verse* and treat it
        //     as a chapter, so ArrowDown from the top-match row would skip ahead by
        //     CHAPTER_GRID_COLUMNS.
        // The entry-point logic below then picks the appropriate starting cell per arrow.
        const currentChapter = (() => {
          if (!commandValue || commandValue.includes(':')) return 0;
          const match = commandValue.match(/(\d+)$/);
          return match ? parseInt(match[1], 10) : 0;
        })();

        const maxChapter = fetchEndChapter(currentBookId);

        if (!maxChapter) return;

        // The isArrowKey type guard in the surrounding `if` narrows event.key to ArrowKey, so no
        // type assertion is needed here. The pure 2D grid arithmetic (entry points, wrap-around,
        // row clamping) lives in computeTargetChapter so it can be unit-tested in isolation.
        const targetChapter = computeTargetChapter(
          currentChapter,
          event.key,
          maxChapter,
          CHAPTER_GRID_COLUMNS,
        );

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
      isListFocused,
      routeTypedCharacterToInput,
    ],
  );

  // Keyboard handling on the back button:
  // - Arrow keys: hand focus to the CommandList. The event continues to bubble to
  //   handleCommandKeyDown which sets data-selected on the entry-point cell for that direction.
  // - Tab: seed chapter 1 + scroll into view + focus the CommandList. Plain natural Tab would
  //   also land on the CommandList (it's the next tabbable in DOM order), but we intercept to
  //   guarantee the chapter-1 seeding rather than relying on whatever cmdk has selected. Plus
  //   we stop propagation so the (formerly bouncing) Shift+Tab handler in Command can't
  //   interfere — that handler is now removed, but the defensive stop costs nothing.
  // - Enter / Space: stop the event from bubbling to the Command so cmdk's Enter / our Space
  //   submit handler can't fire a data-selected chapter while the back button owns focus. The
  //   browser still converts the keydown into a click on the button, so the native click handler
  //   (handleBackToBooks) runs as normal.
  const handleBackButtonKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        commandListRef.current?.focus();
        return;
      }
      // Typing a letter/digit while the back button is focused routes the character to the search
      // input (exiting chapter view to start a new search), so typing from anywhere lands in the
      // input — matching the list/grid, quick-nav, and clock-button behavior.
      const { isLetter, isDigit } = getKeyCharacterType(event.key);
      if (isLetter || isDigit) {
        event.preventDefault();
        event.stopPropagation();
        routeTypedCharacterToInput(event.key);
        return;
      }
      if (event.key === 'Tab') {
        event.preventDefault();
        event.stopPropagation();
        if (selectedBookForChaptersView) {
          setCommandValue(generateCommandValue(selectedBookForChaptersView, localizedBookNames, 1));
        }
        commandListRef.current?.focus();
        setTimeout(() => {
          chapterRefs.current[1]?.scrollIntoView({ block: 'center', behavior: 'smooth' });
        }, 0);
        return;
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.stopPropagation();
      }
    },
    [selectedBookForChaptersView, localizedBookNames, routeTypedCharacterToInput],
  );

  const handleQuickNavButtonKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.shiftKey || event.key === 'Tab' || event.key === ' ') return;

      // Up/Down arrows from a quick-nav button hand focus off to the list (per the spec: arrows
      // enter the list/grid as a unit). stopPropagation prevents handleCommandKeyDown's 2D arrow
      // handler from double-advancing.
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        event.stopPropagation();
        setIsCommandListHidden(false);
        enterListFromOutside(event.key === 'ArrowDown' ? 'first' : 'last');
        return;
      }

      const { isLetter, isDigit } = getKeyCharacterType(event.key);

      if (isLetter || isDigit) {
        event.preventDefault();

        setInputValue((prevValue) => prevValue + event.key);
        commandInputRef.current.focus();

        setIsCommandListHidden(false);
      }
    },
    [enterListFromOutside],
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
  }, [isCommandOpen, viewMode, inputValue, topMatch, scrRef.book]);

  // On entering chapter view, the back button receives DOM focus (it owns the visible focus
  // indicator initially). The chapter grid is not yet focused — pressing an arrow key (or Tab)
  // hands off to the Command + sets data-selected on an entry chapter.
  useLayoutEffect(() => {
    if (viewMode !== 'chapters' || !selectedBookForChaptersView) return;

    // Set commandValue to a non-empty value that does NOT match any chapter cell (the book's
    // value without a trailing chapter number). Non-empty so cmdk doesn't auto-select the first
    // item; non-matching so no chapter shows data-selected / the focus ring.
    setCommandValue(generateCommandValue(selectedBookForChaptersView, localizedBookNames));

    setTimeout(() => {
      // Reset scroll to top — no specific chapter is highlighted yet.
      if (commandListRef.current) {
        commandListRef.current.scrollTo({ top: 0 });
      }

      // Focus the back button so it owns the initial keyboard-focus indicator.
      if (backButtonRef.current) {
        backButtonRef.current.focus();
      }
    }, 0);
  }, [viewMode, selectedBookForChaptersView, localizedBookNames]);

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
            'tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:overflow-hidden tw:px-1',
            className,
          )}
        >
          <span className="tw:truncate">{currentDisplayValue}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        id={id}
        forceMount
        className="tw:w-[280px] tw:p-0"
        align="center"
        // In chapter view, Escape returns to the book list instead of closing the popover; in book
        // view we let Radix's default close-the-popover behavior run. We use Radix's document-level
        // onEscapeKeyDown escape hatch rather than our own keydown handler. Note that the back
        // button and quick-nav buttons are wrapped in Radix Tooltips: per the default shadcn/Radix
        // behavior, an open tooltip consumes the first Escape to dismiss itself, and only the next
        // Escape reaches this handler. (RecentSearches is a portaled DropdownMenu, so when it's
        // open Escape closes the menu without ever bubbling to this handler.)
        onEscapeKeyDown={(e) => {
          if (viewMode === 'chapters') {
            e.preventDefault();
            handleBackToBooks();
          }
        }}
        // Tab moving focus out of the popover must NOT close it. Radix's default
        // close-on-focus-outside behavior is fine for click-outside (handled separately), but
        // keyboard tab-out should be a no-op for the popover's open state.
        onFocusOutside={(e) => e.preventDefault()}
      >
        <Command
          onKeyDown={handleCommandKeyDown}
          loop
          value={commandValue}
          onValueChange={setCommandValue}
          shouldFilter={false}
          // Decouple pointer hover from keyboard focus: hovering an item must not update
          // commandValue, so the focus ring, the top-match row, and the Enter/Space submission
          // target are all driven exclusively by keyboard navigation. Clicking still submits
          // because cmdk attaches onClick independently of pointer-move tracking.
          disablePointerSelection
        >
          {/* Header: Input (with quick nav buttons) for book view, fixed header for chapter view */}
          {viewMode === 'books' ? (
            <div className={cn('tw:flex tw:items-end', isCommandListHidden && 'tw:pb-1')}>
              {/* Bubble-level handler for the RecentSearches clock button — it's a non-input
                  wrapper that picks up keydown events bubbling from the trigger button, which
                  doesn't have its own handler. Adding a role would mislead AT users since the
                  div is purely a passthrough for event delegation. The RecentSearches menu is
                  portaled (it's a shadcn DropdownMenu), so its internal key events never bubble
                  to this wrapper; only events from the input and the closed clock-button trigger
                  reach it. */}
              {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
              <div
                className="tw:relative tw:flex-1"
                onKeyDown={(event) => {
                  // ArrowUp/Down only enter the list when they come from the INPUT. The input's
                  // own handleInputKeyDown already stops propagation for these keys, so in
                  // practice they don't bubble here — but we still scope this branch to the input
                  // so an arrow press on the focused clock button is NOT hijacked: it must fall
                  // through to Radix's DropdownMenu default, which opens the recent menu.
                  if (
                    event.target === commandInputRef.current &&
                    (event.key === 'ArrowUp' || event.key === 'ArrowDown')
                  ) {
                    event.preventDefault();
                    event.stopPropagation();
                    enterListFromOutside(event.key === 'ArrowDown' ? 'first' : 'last');
                    return;
                  }
                  // Route typing from the history (clock) button to the input. Skip events
                  // that originated in the input itself (they're already being typed there)
                  // and the keys the button needs to keep (Tab moves focus naturally; Escape
                  // and the arrow keys are handled by Radix's DropdownMenu on the trigger).
                  if (event.target === commandInputRef.current) return;
                  if (event.key === 'Tab' || event.key === 'Escape') return;
                  const { isLetter: isLetterFromButton, isDigit: isDigitFromButton } =
                    getKeyCharacterType(event.key);
                  if (isLetterFromButton || isDigitFromButton) {
                    event.preventDefault();
                    event.stopPropagation();
                    setInputValue((prev) => prev + event.key);
                    commandInputRef.current?.focus();
                  }
                }}
              >
                <CommandInput
                  ref={commandInputRef}
                  value={inputValue}
                  onValueChange={setInputValue}
                  onKeyDown={handleInputKeyDown}
                  onFocus={() => {
                    setIsCommandListHidden(false);
                    // The input owning DOM focus is definitive proof the list/grid does not.
                    // Force isListFocused false here as a safety net so a stale "true" (e.g. left
                    // over when focus returns to the input after list navigation) can never keep a
                    // list item's focus ring visible or let the list's Space/Enter submit handlers
                    // capture keys meant for the input. Exactly one element holds focus at a time.
                    setIsListFocused(false);
                  }}
                  className={recentSearches && recentSearches.length > 0 ? 'tw:pe-8!' : ''}
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
                    buttonClassName="tw:absolute tw:end-1 tw:top-1"
                  />
                )}
              </div>
              {/* Navigation buttons for previous/next chapter/book */}
              <div className="tw:flex tw:translate-y-px tw:items-center tw:pe-2">
                <TooltipProvider>
                  {quickNavButtons.map(({ onClick, disabled, title, icon: Icon }, index) => (
                    <Fragment key={title}>
                      {index === 2 && (
                        <div className="tw:mx-1 tw:h-5 tw:w-px tw:bg-border" aria-hidden="true" />
                      )}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setIsCommandListHidden(true);
                              onClick();
                            }}
                            disabled={disabled}
                            className="tw:h-8.5 tw:w-6 tw:p-0"
                            aria-label={title}
                            onKeyDown={handleQuickNavButtonKeyDown}
                          >
                            <Icon />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>{title}</TooltipContent>
                      </Tooltip>
                    </Fragment>
                  ))}
                </TooltipProvider>
              </div>
            </div>
          ) : (
            <div className="tw:flex tw:items-center tw:border-b tw:px-3 tw:py-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      ref={backButtonRef}
                      variant="ghost"
                      size="sm"
                      onClick={handleBackToBooks}
                      onKeyDown={handleBackButtonKeyDown}
                      className="tw:mr-2 tw:h-8 tw:w-8 tw:p-0"
                      aria-label={backToBooksLabel}
                    >
                      {direction === 'ltr' ? (
                        <ArrowLeft className="tw:h-4 tw:w-4" />
                      ) : (
                        <ArrowRight className="tw:h-4 tw:w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{backToBooksLabel}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {selectedBookForChaptersView && (
                <span tabIndex={-1} className="tw:text-sm tw:font-medium">
                  {getLocalizedBookName(selectedBookForChaptersView, localizedBookNames)}
                </span>
              )}
            </div>
          )}

          {/** Body */}
          {!isCommandListHidden && (
            <CommandList
              ref={commandListRef}
              // CommandList is the single tab stop representing "the list / grid". Internal
              // navigation uses arrow keys; Tab / Shift+Tab enters and leaves the list as a unit.
              // Putting tabIndex on CommandList (rather than on Command) gives screen-reader
              // semantics for free since cmdk already sets role="listbox" + aria-activedescendant
              // here, and the tab stop disappears automatically when the list is hidden.
              tabIndex={0}
              onFocus={(e) => {
                if (e.target === e.currentTarget) setIsListFocused(true);
              }}
              onBlur={(e) => {
                if (e.target === e.currentTarget) setIsListFocused(false);
              }}
              // - outline-none: the data-selected ring is the focus indicator, not a wrapper outline.
              // - scrollbar overrides: shadcn's CommandList includes `no-scrollbar` which hides
              //   the scrollbar via `scrollbar-width: none` and `::-webkit-scrollbar { display:
              //   none }`. We force a thin scrollbar back on so users can see when the book list
              //   or chapter grid overflows the 18rem max-height.
              // - scroll-pt-10: when arrow navigation scrolls a chapter into view, account for the
              //   ~2.5rem sticky top-match row that occupies the top of the visible area so the
              //   target chapter isn't hidden behind it.
              className="tw:outline-none tw:scroll-pt-10 tw:![scrollbar-width:thin] tw:[&::-webkit-scrollbar]:!block tw:[&::-webkit-scrollbar]:!w-2 tw:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30 tw:[&::-webkit-scrollbar-thumb]:rounded"
            >
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
                              showActiveRing={isListFocused}
                            />
                          ))}
                        </CommandGroup>
                      );
                    })}

                  {/* Top match scripture reference — rendered as a direct child of CommandList
                      (no CommandGroup wrapper) so its parent's containing block spans the entire
                      scroll content. Wrapping in a CommandGroup would size the sticky range to
                      the group's own (tiny) height, which makes the row scroll away after the
                      first chapter row goes off-screen. */}
                  {topMatch && (
                    <CommandItem
                      key="top-match"
                      value={`${topMatch.book} ${ALL_ENGLISH_BOOK_NAMES[topMatch.book]} ${
                        topMatch.chapterNum ?? 1
                      }:${topMatch.verseNum ?? 1}`}
                      onSelect={handleTopMatchSelect}
                      className={cn(
                        'tw:font-semibold tw:text-primary tw:[&_svg]:hidden',
                        // Pin to the top of the scrollable CommandList so the parsed reference
                        // stays visible while the user navigates the chapter grid below it.
                        // bg-popover is required because position:sticky elements need a solid
                        // background; otherwise scrolling chapter cells show through.
                        'tw:sticky tw:top-0 tw:z-10 tw:bg-popover',
                        // Override shadcn's default data-selected:bg-muted / text-foreground —
                        // keep tw:text-primary and a solid popover background even when this
                        // row is the cmdk-active item. bg-popover (not bg-transparent) so the
                        // sticky stays opaque against the scrolling chapter cells underneath.
                        'tw:data-selected:bg-popover tw:data-selected:text-primary',
                        // Pointer-feedback background; distinct from the focus ring.
                        'tw:hover:bg-muted',
                        // Keyboard focus ring only when the list/grid owns DOM focus. Uses the
                        // shared LIST_ITEM_KEYBOARD_FOCUS_RING (shadcn's standard ring tokens).
                        isListFocused && LIST_ITEM_KEYBOARD_FOCUS_RING,
                      )}
                    >
                      <span className="tw:flex-1">
                        {formatScrRef(
                          {
                            book: topMatch.book,
                            chapterNum: topMatchDisplayChapter ?? 1,
                            verseNum:
                              topMatchDisplayChapter === topMatch.chapterNum
                                ? (topMatch.verseNum ?? 1)
                                : 1,
                          },
                          getLocalizedBookName(topMatch.book, localizedBookNames),
                        )}
                      </span>
                      <span className="tw:font-normal tw:text-muted-foreground">
                        {getLocalizedBookId(topMatch.book, localizedBookNames)}
                      </span>
                    </CommandItem>
                  )}

                  {/* Chapter Selector - Show when we have a top match */}
                  {topMatch && fetchEndChapter(topMatch.book) > 1 && (
                    <ChapterGrid
                      bookId={topMatch.book}
                      scrRef={scrRef}
                      onChapterSelect={handleChapterSelect}
                      setChapterRef={setChapterRef}
                      isChapterDimmed={doesChapterMatch}
                      // Hide the chapter ring while the input owns the visible focus indicator.
                      showActiveRing={isListFocused}
                      className="tw:px-4 tw:pb-4"
                    />
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
                  showActiveRing={isListFocused}
                  className="tw:p-4"
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
