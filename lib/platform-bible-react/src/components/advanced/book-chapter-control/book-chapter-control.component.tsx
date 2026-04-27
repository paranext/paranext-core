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
} from '@/components/shared/book.utils';
import {
  Fragment,
  KeyboardEvent,
  useCallback,
  useEffect,
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
  fetchEndChapter,
  getKeyCharacterType,
  hasChapterVerseSeparator,
  isBookBefore,
  isChapterBefore,
  isVerseBefore,
} from './book-chapter-control.utils';
import { ChapterGrid } from './chapter-grid.component';
import { VerseGrid } from './verse-grid.component';

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
  getEndVerse,
  disableReferencesUpTo,
  submitKeys,
  triggerContent,
  triggerVariant = 'outline',
  onOpenChange,
  onCloseAutoFocus,
  modal = false,
  align = 'center',
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
  // The book/chapter currently selected for verse view, if any
  const [selectedBookForVersesView, setSelectedBookForVersesView] = useState<string | undefined>(
    undefined,
  );
  const [selectedChapterForVersesView, setSelectedChapterForVersesView] = useState<
    number | undefined
  >(undefined);
  const [isCommandListHidden, setIsCommandListHidden] = useState(false);

  // Reference to the PopoverTrigger button. Used by `onPointerDownOutside` to detect
  // clicks on our own trigger while the popover is open — see that handler for the full
  // story. `null` is React's canonical "not yet attached" ref value; there's no undefined
  // equivalent in the DOM/ref API.
  // eslint-disable-next-line no-null/no-null
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  // Set in `onPointerDownOutside` when we detect a click on our trigger while the popover
  // is open. Consumed in Button's `onClick` to call `event.preventDefault()` before Radix's
  // own `onOpenToggle` handler runs — `composeEventHandlers` skips `onOpenToggle` when
  // `defaultPrevented` is true, so the popover stays closed instead of toggling back open.
  const justClosedByTriggerRef = useRef(false);
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
  // References to the verses that are shown as CommandItems
  const verseRefs = useRef<Record<number, HTMLDivElement | null>>({});

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

  // Surface open/close transitions to the parent. Fires only on the true boolean flip, not on
  // internal back-navigation (verses → chapters → books) which is handled without closing the
  // popover. Skip the initial mount run so callers don't see a spurious `onOpenChange(false)`
  // before any interaction — that phantom close has tripped parent focus-restore logic.
  const didMountRef = useRef(false);
  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    onOpenChange?.(isCommandOpen);
  }, [isCommandOpen, onOpenChange]);

  // #endregion

  // #region Submitting references

  const handleTopMatchSelect = useCallback(() => {
    // If we have a top match (smart parsed or single book filter), use its specific chapter/verse
    if (topMatch) {
      const effectiveChapter = topMatch.chapterNum ?? 1;
      const effectiveVerse = topMatch.verseNum ?? 1;
      if (
        disableReferencesUpTo &&
        isVerseBefore(topMatch.book, effectiveChapter, effectiveVerse, disableReferencesUpTo)
      ) {
        return;
      }
      handleSubmitAndAddToRecent({
        book: topMatch.book,
        chapterNum: effectiveChapter,
        verseNum: effectiveVerse,
      });
      setIsCommandOpen(false);
      setInputValue('');
      setCommandValue(''); // Reset command value
    }
  }, [handleSubmitAndAddToRecent, topMatch, disableReferencesUpTo]);

  const handleVerseSelect = useCallback(
    (verseNumber: number) => {
      const bookId = selectedBookForVersesView ?? topMatch?.book;
      const chapterNum = selectedChapterForVersesView ?? topMatch?.chapterNum;
      if (!bookId || !chapterNum) return;

      handleSubmitAndAddToRecent({
        book: bookId,
        chapterNum,
        verseNum: verseNumber,
      });
      // Don't reset view / selection state here — `handleOpenChange(true)` does that
      // when the popover reopens. Resetting now causes a flicker: the popover's fade-out
      // animation would otherwise render the book list for a frame before unmounting.
      setIsCommandOpen(false);
    },
    [handleSubmitAndAddToRecent, selectedBookForVersesView, selectedChapterForVersesView, topMatch],
  );

  const handleBookSelect = useCallback(
    (bookId: string) => {
      if (disableReferencesUpTo && isBookBefore(bookId, disableReferencesUpTo)) return;
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
    [handleSubmitAndAddToRecent, disableReferencesUpTo],
  );

  const handleChapterSelect = useCallback(
    (chapterNumber: number) => {
      // Determine which book we're selecting a chapter for
      const bookId = viewMode === 'chapters' ? selectedBookForChaptersView : topMatch?.book;
      if (!bookId) return;

      // If verse selection is enabled and the chapter has multiple verses, transition to verse view
      if (getEndVerse) {
        const endVerse = getEndVerse(bookId, chapterNumber);
        if (endVerse > 1) {
          setSelectedBookForVersesView(bookId);
          setSelectedChapterForVersesView(chapterNumber);
          setViewMode('verses');
          setCommandValue('');
          return;
        }
      }

      handleSubmitAndAddToRecent({
        book: bookId,
        chapterNum: chapterNumber,
        verseNum: 1,
      });
      // See `handleVerseSelect` — skip the view/selection reset to avoid a flicker
      // back to the book list during the popover's fade-out animation.
      setIsCommandOpen(false);
    },
    [handleSubmitAndAddToRecent, viewMode, selectedBookForChaptersView, topMatch, getEndVerse],
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
    setSelectedBookForVersesView(undefined);
    setSelectedChapterForVersesView(undefined);

    // Focus the search input when returning to book view
    setTimeout(() => {
      if (commandInputRef.current) {
        commandInputRef.current.focus();
      }
    }, 0);
  }, []);

  const handleBackToChapters = useCallback(() => {
    // Preserve selectedBookForChaptersView for the chapter view; reset verse state
    const previouslySelectedBook = selectedBookForVersesView;
    setSelectedBookForVersesView(undefined);
    setSelectedChapterForVersesView(undefined);

    if (previouslySelectedBook) {
      setSelectedBookForChaptersView(previouslySelectedBook);
      setViewMode('chapters');
      setCommandValue('');
    } else {
      handleBackToBooks();
    }
  }, [selectedBookForVersesView, handleBackToBooks]);

  // Reset view state when popover opens. Close requests always close the popover —
  // `Escape`, outside-click, and any other Radix-initiated dismiss route through here and
  // the user expects them to dismiss the whole picker. Stepping back through views is the
  // back button's job; trying to double-duty dismiss as "go up one level" silently rewinds
  // the user's selection when Radix fires a close for a transient reason (focus blip, click
  // in a non-item padding area, etc.).
  const handleOpenChange = useCallback((shouldCommandBeOpen: boolean) => {
    setIsCommandOpen(shouldCommandBeOpen);
    if (shouldCommandBeOpen) {
      setViewMode('books');
      setSelectedBookForChaptersView(undefined);
      setSelectedBookForVersesView(undefined);
      setSelectedChapterForVersesView(undefined);
      setInputValue('');
    }
  }, []);

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

  const setVerseRef = useCallback((verse: number) => {
    return (element: HTMLDivElement | null) => {
      verseRefs.current[verse] = element;
    };
  }, []);

  // Whether the current input contains a chapter-verse separator (colon)
  const hasVerseSeparatorInInput = useMemo(
    () => hasChapterVerseSeparator(inputValue),
    [inputValue],
  );

  // Whether we should show a verse grid for the current top match
  const shouldShowVerseGridForTopMatch = useMemo(() => {
    if (!getEndVerse || !topMatch || !topMatch.chapterNum) return false;
    if (!hasVerseSeparatorInInput) return false;
    return getEndVerse(topMatch.book, topMatch.chapterNum) > 0;
  }, [getEndVerse, topMatch, hasVerseSeparatorInInput]);

  const isBookDisabled = useCallback(
    (bookId: string) =>
      disableReferencesUpTo ? isBookBefore(bookId, disableReferencesUpTo) : false,
    [disableReferencesUpTo],
  );

  const makeIsChapterDisabled = useCallback(
    (bookId: string) => (chapter: number) =>
      disableReferencesUpTo ? isChapterBefore(bookId, chapter, disableReferencesUpTo) : false,
    [disableReferencesUpTo],
  );

  const makeIsVerseDisabled = useCallback(
    (bookId: string, chapterNum: number) => (verse: number) =>
      disableReferencesUpTo
        ? isVerseBefore(bookId, chapterNum, verse, disableReferencesUpTo)
        : false,
    [disableReferencesUpTo],
  );

  const selectChapterTitle =
    localizedStrings?.['%webView_bookChapterControl_selectChapter%'] ?? 'Select Chapter';
  const selectVerseTitle =
    localizedStrings?.['%webView_bookChapterControl_selectVerse%'] ?? 'Select Verse';

  // #endregion

  // #region Keyboard handling

  // Handle keyboard navigation for CommandInput
  const handleInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      // Override default Home and End key behavior to work normally for cursor movement.
      // Default behavior was to jump to the start/end of the list of items in the Command
      if (event.key === 'Home' || event.key === 'End') {
        event.stopPropagation(); // Prevent Command component from handling these
      }

      // Callers can declare extra submit keys (e.g. space and `-` for range pickers). We
      // only submit when the typed input resolves to a fully-qualified reference (book
      // AND chapter AND verse) — a partial match like "GEN" or "GEN 1" would be ambiguous
      // as an auto-complete from a separator keystroke, so we leave those for the user to
      // finish. When we do submit, consume the keystroke so the character doesn't end up
      // in the input after the popover closes.
      if (
        submitKeys &&
        submitKeys.includes(event.key) &&
        topMatch &&
        topMatch.chapterNum !== undefined &&
        topMatch.verseNum !== undefined
      ) {
        event.preventDefault();
        event.stopPropagation();
        handleTopMatchSelect();
      }
    },
    [submitKeys, topMatch, handleTopMatchSelect],
  );

  // Grid-aware keyboard navigation using Command's controlled value
  const handleCommandKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement | HTMLButtonElement>) => {
      if (event.ctrlKey) return;

      const { isLetter, isDigit } = getKeyCharacterType(event.key);

      // Enter / Space pick the highlighted chapter / verse. cmdk binds Enter natively on
      // the Command root, but a grid picker reads more like "activate the focused cell"
      // than an input form, so we centralize both keys here and let the `data-selected`
      // item drive the submit. When focus is on a natively interactive element (the back
      // button), yield: the browser's own activation (click on Enter keydown / Space
      // keyup) should run the button's `onClick`, not submit a grid cell. We still
      // `stopPropagation` so cmdk's Enter handler doesn't ALSO fire in parallel and
      // submit the highlighted chapter while the back button is being pressed.
      if (
        (viewMode === 'chapters' || viewMode === 'verses') &&
        (event.key === ' ' || event.key === 'Enter')
      ) {
        const target = event.target instanceof HTMLElement ? event.target : undefined;
        const isTargetInteractive = !!target?.closest(
          'button, a, input, select, textarea, [role="button"]',
        );
        if (isTargetInteractive) {
          // Don't preventDefault — browser-native activation (Enter → click, Space →
          // click on keyup) must still reach the button's onClick.
          event.stopPropagation();
          return;
        }
        const highlighted = commandRef.current?.querySelector<HTMLElement>(
          '[cmdk-item][data-selected="true"]:not([data-disabled="true"])',
        );
        if (highlighted) {
          event.preventDefault();
          event.stopPropagation();
          highlighted.click();
          return;
        }
      }

      // Letter / digit keys in chapter or verse view do nothing: the filter input isn't
      // visible there, so forwarding keystrokes to it would silently exit the grid
      // (jumping back to the book list and typing into the hidden input). Users stay
      // on the current page; Backspace is the explicit way back.
      if ((viewMode === 'chapters' || viewMode === 'verses') && (isLetter || isDigit)) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // Handle keypresses in chapter viewmode
      if (viewMode === 'chapters') {
        // Handle backspace for going back to books
        if (event.key === 'Backspace') {
          event.preventDefault();
          event.stopPropagation();
          handleBackToBooks();
          return;
        }
      }

      // Handle keypresses in verse viewmode
      if (viewMode === 'verses') {
        // Handle backspace for going back to chapters
        if (event.key === 'Backspace') {
          event.preventDefault();
          event.stopPropagation();
          handleBackToChapters();
          return;
        }
      }

      // Handle grid navigation for arrow keys in chapter/verse views
      const isGridNav = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key);

      if (viewMode === 'verses' && isGridNav) {
        const bookId = selectedBookForVersesView;
        const chapterNum = selectedChapterForVersesView;
        if (!bookId || !chapterNum || !getEndVerse) return;

        const maxVerse = getEndVerse(bookId, chapterNum);
        if (!maxVerse) return;

        // Arrow keys drive the grid now — pull focus off the back button (the only
        // natively focusable element in this view) so its lingering focus ring doesn't
        // compete visually with the grid's `data-selected` highlight. The Command root
        // has `tabIndex={-1}` (cmdk sets it), so it's a valid focus target and keeps
        // our PopoverContent capture-phase key handling working unchanged.
        commandRef.current?.focus();

        const currentVerse = (() => {
          if (!commandValue) return 1;
          const match = commandValue.match(/:(\d+)$/);
          return match ? parseInt(match[1], 10) : 0;
        })();

        let targetVerse = currentVerse;
        const GRID_COLS = 6;

        switch (event.key) {
          case 'ArrowLeft':
            if (currentVerse !== 0) targetVerse = currentVerse > 1 ? currentVerse - 1 : maxVerse;
            break;
          case 'ArrowRight':
            if (currentVerse !== 0) targetVerse = currentVerse < maxVerse ? currentVerse + 1 : 1;
            break;
          case 'ArrowUp':
            targetVerse = currentVerse === 0 ? maxVerse : Math.max(1, currentVerse - GRID_COLS);
            break;
          case 'ArrowDown':
            targetVerse = currentVerse === 0 ? 1 : Math.min(maxVerse, currentVerse + GRID_COLS);
            break;
          default:
            return;
        }

        if (targetVerse !== currentVerse) {
          event.preventDefault();
          event.stopPropagation();

          setCommandValue(
            `${bookId} ${ALL_ENGLISH_BOOK_NAMES[bookId] || ''} ${chapterNum}:${targetVerse}`,
          );

          setTimeout(() => {
            const targetElement = verseRefs.current[targetVerse];
            if (targetElement) {
              targetElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
          }, 0);
        }
        return;
      }

      if ((viewMode === 'chapters' || (viewMode === 'books' && topMatch)) && isGridNav) {
        // Extract current chapter from commandValue
        const currentBookId =
          viewMode === 'chapters' ? selectedBookForChaptersView : topMatch?.book;
        if (!currentBookId) return;

        // See the verses grid above — pull focus off the back button when arrow
        // navigation starts so its focus ring doesn't shadow the `data-selected`
        // highlight in the grid. Skipped for the `books` + topMatch branch where focus
        // already lives on the CommandInput.
        if (viewMode === 'chapters') {
          commandRef.current?.focus();
        }

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

          // Match ChapterGrid's CommandItem value exactly (no localized parts) — using
          // generateCommandValue here would diverge when localizedBookNames is provided and
          // cmdk wouldn't find a matching item to highlight.
          setCommandValue(
            `${currentBookId} ${ALL_ENGLISH_BOOK_NAMES[currentBookId] || ''} ${targetChapter}`,
          );

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
      handleBackToChapters,
      selectedBookForChaptersView,
      selectedBookForVersesView,
      selectedChapterForVersesView,
      getEndVerse,
      commandValue,
    ],
  );

  const handleQuickNavButtonKeyDown = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.shiftKey || event.key === 'Tab' || event.key === ' ') return;

    // Enter must activate the focused quick-nav button the way any other button
    // would. The browser turns keydown Enter into a click automatically, but cmdk's
    // onKeyDown on the Command root (an ancestor) would fire next and call
    // `event.preventDefault()` in its Enter branch — canceling that click synthesis
    // and submitting the highlighted book list item instead of running the
    // quick-nav handler. Stop propagation here (button onKeyDown runs before the
    // ancestor's) so cmdk never sees the Enter. Do NOT preventDefault — that's
    // what the browser uses to produce the click on the button.
    if (event.key === 'Enter') {
      event.stopPropagation();
      return;
    }

    // Up / Down signal the user wants to walk the book list. cmdk's arrow-key
    // handler on the Command root takes care of moving the `data-selected`
    // highlight (the keydown keeps bubbling up past us to reach it), but the
    // quick-nav button's focus ring would otherwise linger and compete with
    // the cmdk highlight. Pull focus to the search input — the visual focus
    // state that a user expects to see during book-list navigation.
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      commandInputRef.current?.focus();
      return;
    }

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
      const initialChapter = isCurrentlySelectedBook ? scrRef.chapterNum : 1;

      // Seed commandValue to the starting chapter so arrow-key navigation has a concrete
      // starting point (see handleCommandKeyDown) and cmdk visibly highlights that chapter
      // even when focus is pinned on the PopoverContent wrapper by Radix's FocusScope in
      // modal mode. Format must match ChapterGrid's CommandItem `value`.
      setCommandValue(
        `${selectedBookForChaptersView} ${ALL_ENGLISH_BOOK_NAMES[selectedBookForChaptersView] || ''} ${initialChapter}`,
      );

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

  // Auto-scroll to appropriate verse
  useLayoutEffect(() => {
    if (
      viewMode === 'verses' &&
      selectedBookForVersesView &&
      selectedChapterForVersesView !== undefined
    ) {
      const isCurrentlySelectedChapter =
        selectedBookForVersesView === scrRef.book &&
        selectedChapterForVersesView === scrRef.chapterNum;
      const initialVerse = isCurrentlySelectedChapter ? scrRef.verseNum : 1;

      // Seed commandValue so arrow-key navigation has a concrete starting verse and cmdk
      // highlights it when focus is pinned on the PopoverContent wrapper (modal FocusScope).
      // Format must match VerseGrid's CommandItem `value`.
      setCommandValue(
        `${selectedBookForVersesView} ${ALL_ENGLISH_BOOK_NAMES[selectedBookForVersesView] || ''} ${selectedChapterForVersesView}:${initialVerse}`,
      );

      setTimeout(() => {
        if (commandListRef.current) {
          if (isCurrentlySelectedChapter) {
            const targetElement = verseRefs.current[scrRef.verseNum];
            if (targetElement) {
              targetElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
            }
          } else {
            commandListRef.current.scrollTo({ top: 0 });
          }
        }
        if (commandRef.current) {
          commandRef.current.focus();
        }
      }, 0);
    }
  }, [
    viewMode,
    selectedBookForVersesView,
    selectedChapterForVersesView,
    scrRef.book,
    scrRef.chapterNum,
    scrRef.verseNum,
  ]);

  // #endregion

  return (
    <Popover open={isCommandOpen} onOpenChange={handleOpenChange} modal={modal}>
      <PopoverTrigger asChild>
        <Button
          ref={triggerRef}
          aria-label="book-chapter-trigger"
          variant={triggerVariant}
          role="combobox"
          aria-expanded={isCommandOpen}
          className={cn(
            'tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:overflow-hidden tw:px-1',
            className,
          )}
          onClick={(event) => {
            // When `onPointerDownOutside` detected our trigger was clicked while the
            // popover was open, it already closed the popover and set this flag. Without
            // this guard, the click event reaches Radix's `onOpenToggle` which sees
            // `open=false` (we already closed it) and toggles it back to `true`, causing
            // the reopen. `event.preventDefault()` makes `composeEventHandlers` skip
            // `onOpenToggle` so the popover stays closed.
            if (justClosedByTriggerRef.current) {
              justClosedByTriggerRef.current = false;
              event.preventDefault();
            }
          }}
        >
          {triggerContent ?? <span className="tw:truncate">{currentDisplayValue}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        id={id}
        forceMount
        className="tw:w-[280px] tw:p-0"
        align={align}
        // Capture-phase handler at the popover root so grid / view-switch key handling works
        // regardless of which element inside the popover has focus. When `modal` is true Radix's
        // FocusScope frequently lands focus on the popover wrapper after a view transition (e.g.
        // book → chapter), because the chapter grid has no natively tabbable elements — and a
        // bubble-phase handler on Command would never fire because Command isn't in the event path.
        onKeyDownCapture={handleCommandKeyDown}
        // Bubble-phase stopPropagation: the PopoverContent portals into its container, but React
        // synthetic events still bubble through the virtual tree — so keystrokes typed in the
        // Command input would reach any ancestor DropdownMenu and be interpreted as menu
        // activation (e.g. Space toggling the navigate DropdownMenuItem, which closes the
        // picker). The picker is a self-contained modal; every key either fired the cmdk / grid
        // handlers above or should just type into the input. Either way it has no business
        // reaching an outer menu.
        onKeyDown={(event) => event.stopPropagation()}
        // Close-on-trigger-click while open: Radix's built-in DismissableLayer prevents
        // dismissal when the pointer target is the trigger (it treats that as "user intends
        // to toggle, let the trigger's own onClick handle it"). But in our controlled
        // Popover the trigger's `onOpenToggle` calls `onOpenChange(!open)` — by the time
        // the click fires, React may have already re-rendered with `open=false` (from a
        // prior close), so `!open = true` and the popover reopens. We intercept here:
        // close the popover early (before Radix's own dismiss path) and set
        // `justClosedByTriggerRef` so the trigger's `onClick` can call `preventDefault()`
        // which makes Radix's `composeEventHandlers` skip `onOpenToggle` entirely.
        //
        // Guard with `isCommandOpen`: PopoverContent stays mounted during the fade-out
        // animation after close, so this handler still fires for trigger clicks made while
        // the popover is animating out. Treating those as "close" would set the
        // `justClosedByTriggerRef` interlock and block the legitimate reopen click. Only
        // intercept when the popover is logically open.
        onPointerDownOutside={(event) => {
          const { target } = event;
          if (
            isCommandOpen &&
            triggerRef.current &&
            target instanceof Node &&
            triggerRef.current.contains(target)
          ) {
            // Mark that we're closing due to a trigger click so the subsequent `click`
            // event on the button (which would reopen the popover via Radix's
            // `onOpenToggle`) can be blocked. See `justClosedByTriggerRef`.
            justClosedByTriggerRef.current = true;
            handleOpenChange(false);
          }
        }}
        onCloseAutoFocus={onCloseAutoFocus}
      >
        <Command
          ref={commandRef}
          loop
          value={commandValue}
          onValueChange={setCommandValue}
          shouldFilter={false}
        >
          {/* Header: Input (with quick nav buttons) for book view, fixed header for chapter view */}
          {viewMode === 'books' ? (
            <div className="tw:flex tw:items-end">
              <div className="tw:relative tw:flex-1">
                <CommandInput
                  ref={commandInputRef}
                  value={inputValue}
                  onValueChange={setInputValue}
                  onKeyDown={handleInputKeyDown}
                  onFocus={() => setIsCommandListHidden(false)}
                  className={recentSearches && recentSearches.length > 0 ? 'tw:!pr-10' : ''}
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
              <div className="tw:flex tw:items-center tw:gap-1 tw:border-b tw:pe-2">
                <div className="tw:h-5 tw:w-px tw:bg-border" aria-hidden="true" />
                {quickNavButtons.map(({ onClick, disabled, title, icon: Icon }, index) => (
                  <Fragment key={title}>
                    {index === 2 && (
                      <div className="tw:h-5 tw:w-px tw:bg-border" aria-hidden="true" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsCommandListHidden(true);
                        onClick();
                      }}
                      disabled={disabled}
                      className="tw:h-10 tw:w-6 tw:p-0"
                      title={title}
                      onKeyDown={handleQuickNavButtonKeyDown}
                    >
                      <Icon />
                    </Button>
                  </Fragment>
                ))}
              </div>
            </div>
          ) : (
            <div className="tw:flex tw:items-center tw:border-b tw:px-3 tw:py-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={viewMode === 'verses' ? handleBackToChapters : handleBackToBooks}
                className="tw:mr-2 tw:h-6 tw:w-6 tw:p-0"
                tabIndex={-1}
              >
                {direction === 'ltr' ? (
                  <ArrowLeft className="tw:h-4 tw:w-4" />
                ) : (
                  <ArrowRight className="tw:h-4 tw:w-4" />
                )}
              </Button>
              {viewMode === 'chapters' && selectedBookForChaptersView && (
                <span tabIndex={-1} className="tw:text-sm tw:font-medium">
                  {getLocalizedBookName(selectedBookForChaptersView, localizedBookNames)}
                </span>
              )}
              {viewMode === 'verses' &&
                selectedBookForVersesView &&
                selectedChapterForVersesView !== undefined && (
                  <span tabIndex={-1} className="tw:text-sm tw:font-medium">
                    {`${getLocalizedBookName(selectedBookForVersesView, localizedBookNames)} ${selectedChapterForVersesView}`}
                  </span>
                )}
              <span
                tabIndex={-1}
                className="tw:ms-auto tw:text-sm tw:font-medium tw:text-muted-foreground"
              >
                {viewMode === 'verses' ? selectVerseTitle : selectChapterTitle}
              </span>
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
                              disabled={isBookDisabled(bookId)}
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
                        disabled={
                          !!disableReferencesUpTo &&
                          isVerseBefore(
                            topMatch.book,
                            topMatch.chapterNum ?? 1,
                            topMatch.verseNum ?? 1,
                            disableReferencesUpTo,
                          )
                        }
                        className="tw:font-semibold tw:text-primary"
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

                  {/* Verse selector - when chapter-verse separator is present in the input */}
                  {topMatch &&
                    shouldShowVerseGridForTopMatch &&
                    topMatch.chapterNum &&
                    getEndVerse && (
                      <>
                        <div className="tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground">
                          <span>
                            {`${getLocalizedBookName(topMatch.book, localizedBookNames)} ${topMatch.chapterNum}`}
                          </span>
                          <span>{selectVerseTitle}</span>
                        </div>
                        <VerseGrid
                          bookId={topMatch.book}
                          chapterNum={topMatch.chapterNum}
                          endVerse={getEndVerse(topMatch.book, topMatch.chapterNum)}
                          scrRef={scrRef}
                          onVerseSelect={handleVerseSelect}
                          setVerseRef={setVerseRef}
                          isVerseDisabled={makeIsVerseDisabled(topMatch.book, topMatch.chapterNum)}
                          className="tw:px-4 tw:pb-4"
                        />
                      </>
                    )}

                  {/* Chapter Selector - Show when we have a top match without a verse separator */}
                  {topMatch &&
                    !shouldShowVerseGridForTopMatch &&
                    fetchEndChapter(topMatch.book) > 1 && (
                      <>
                        <div className="tw:mb-2 tw:flex tw:items-center tw:justify-between tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground">
                          <span>{getLocalizedBookName(topMatch.book, localizedBookNames)}</span>
                          <span>{selectChapterTitle}</span>
                        </div>
                        <ChapterGrid
                          bookId={topMatch.book}
                          scrRef={scrRef}
                          onChapterSelect={handleChapterSelect}
                          setChapterRef={setChapterRef}
                          isChapterDimmed={doesChapterMatch}
                          isChapterDisabled={makeIsChapterDisabled(topMatch.book)}
                          className="tw:px-4 tw:pb-4"
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
                  isChapterDisabled={makeIsChapterDisabled(selectedBookForChaptersView)}
                  className="tw:p-4"
                />
              )}

              {/* Verse view mode */}
              {viewMode === 'verses' &&
                selectedBookForVersesView &&
                selectedChapterForVersesView !== undefined &&
                getEndVerse && (
                  <VerseGrid
                    bookId={selectedBookForVersesView}
                    chapterNum={selectedChapterForVersesView}
                    endVerse={getEndVerse(selectedBookForVersesView, selectedChapterForVersesView)}
                    scrRef={scrRef}
                    onVerseSelect={handleVerseSelect}
                    setVerseRef={setVerseRef}
                    isVerseDisabled={makeIsVerseDisabled(
                      selectedBookForVersesView,
                      selectedChapterForVersesView,
                    )}
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
