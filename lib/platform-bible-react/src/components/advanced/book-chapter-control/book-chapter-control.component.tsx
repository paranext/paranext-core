import { BookItem } from '@/components/shared/book-item.component';
import { Button } from '@/components/shadcn-ui/button';
import { ButtonGroup, ButtonGroupSeparator } from '@/components/shadcn-ui/button-group';
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
import { getKeyCharacterType, isArrowKey } from '@/utils/keyboard.util';
import { resolveLocalizedString } from '@/utils/localization.util';
import { cn } from '@/utils/shadcn-ui/utils';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { IconSelector } from '@tabler/icons-react';
import {
  formatReplacementString,
  formatScrRef,
  getSectionForBook,
  Section,
} from 'platform-bible-utils';
import {
  getSectionLongName,
  getLocalizedBookName,
  getLocalizedBookId,
  ALL_BOOK_IDS,
  doesBookMatchQuery,
} from '@/components/shared/book.utils';
import {
  Fragment,
  KeyboardEvent,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { SHRINK_STEP, useShrinkStepValue } from '@/context/shrink-step.context';
import { ToolbarCompoundLabel } from '@/components/advanced/toolbar-compound-label/toolbar-compound-label.component';
import {
  chapterItemValue,
  generateCommandValue,
  parseChapterFromItemValue,
  parseVerseFromItemValue,
  TOP_MATCH_ITEM_VALUE,
  verseItemValue,
} from '@/components/shared/book-item.utils';
import RecentSearches from '../recent-searches.component';
import { useQuickNavButtons } from './book-chapter-control.navigation';
import { BookChapterControlProps, ViewMode } from './book-chapter-control.types';
import {
  calculateTopMatch,
  deriveBookChapterControlBookLists,
  computeTargetGridItem,
  fetchEndChapter,
  groupBooksBySection,
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
  getAdditionalBookIds,
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
  showTriggerChevron = false,
  onOpenChange,
  onCloseAutoFocus,
  modal = false,
  align = 'center',
  ref,
  disabled,
  shrinkStep: shrinkStepOverride,
}: BookChapterControlProps) {
  const direction: Direction = readDirection();

  const contextShrinkStep = useShrinkStepValue();
  const shrinkStep = shrinkStepOverride ?? contextShrinkStep;

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
  // Whether the book list is expanded past the active project's books. Governs browsing only —
  // searching always spans every reachable book.
  const [isShowingMoreBooks, setIsShowingMoreBooks] = useState(false);

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

  // Books offered beyond the active project. Ignored when there is no project list to be outside of
  // (no getActiveBookIds means the control already offers the whole canon).
  const additionalBookIds = useMemo(
    () => (getActiveBookIds && getAdditionalBookIds ? getAdditionalBookIds() : []),
    [getActiveBookIds, getAdditionalBookIds],
  );

  const {
    projectBooksBySection,
    reachableBooksBySection,
    reachableBooks,
    projectBooks,
    booksOutsideProject,
  } = useMemo(
    () => deriveBookChapterControlBookLists(activeBookIds, additionalBookIds),
    [activeBookIds, additionalBookIds],
  );

  // Deliberately the boolean and not `scrRef` or the set it comes from: handleOpenChange closes
  // over this and its identity feeds useImperativeHandle, so depending on either of those would
  // re-register the consumer's imperative handle on every reference change. Depending on the
  // boolean re-registers only when the current book actually crosses in or out of the project.
  const isCurrentBookOutsideProject = booksOutsideProject.has(scrRef.book);

  // Filter books based on search input
  const filteredBooksByType = useMemo(() => {
    if (!inputValue.trim())
      return isShowingMoreBooks ? reachableBooksBySection : projectBooksBySection;

    // Searching always spans every reachable book, whatever the toggle says
    return groupBooksBySection(
      reachableBooks.filter((bookId) => doesBookMatchQuery(bookId, inputValue, localizedBookNames)),
    );
  }, [
    projectBooksBySection,
    reachableBooksBySection,
    reachableBooks,
    isShowingMoreBooks,
    inputValue,
    localizedBookNames,
  ]);

  // Get the current top match
  const topMatch = useMemo(
    () => calculateTopMatch(inputValue, reachableBooks, localizedBookNames),
    [inputValue, reachableBooks, localizedBookNames],
  );

  // The reference the top-match row shows, and the one selecting that row submits. Both read this
  // single value so the row can never submit something other than what it displays. The highlighted
  // preview cell is the more specific of the two sources — the user moved the highlight there — so
  // it wins over the chapter/verse parsed out of the typed query.
  const topMatchReference = useMemo((): SerializedVerseRef | undefined => {
    if (!topMatch) return undefined;
    // Only a highlight on this book's own grid refines the reference. A value left over from an
    // earlier query names another book's cell, and mixing it in would compose a reference that was
    // never on screen.
    const highlight = commandValue.startsWith(`${topMatch.book} `) ? commandValue : '';
    const highlightedVerse = parseVerseFromItemValue(highlight);
    const highlightedChapter = parseChapterFromItemValue(highlight);
    // A value cannot name both a chapter cell and a verse cell, so no case-split on which kind of
    // highlight is present is needed: whichever one the value is, the other parse yields
    // `undefined` and falls through.
    return {
      book: topMatch.book,
      chapterNum: highlightedChapter ?? topMatch.chapterNum ?? 1,
      verseNum: highlightedVerse ?? topMatch.verseNum ?? 1,
    };
  }, [topMatch, commandValue]);

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
    if (!topMatchReference) return;
    if (
      disableReferencesUpTo &&
      isVerseBefore(
        topMatchReference.book,
        topMatchReference.chapterNum,
        topMatchReference.verseNum,
        disableReferencesUpTo,
      )
    ) {
      return;
    }
    handleSubmitAndAddToRecent(topMatchReference);
    setIsCommandOpen(false);
    setInputValue('');
    setCommandValue(''); // Reset command value
  }, [handleSubmitAndAddToRecent, topMatchReference, disableReferencesUpTo]);

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
  // The collapsed list is the books the user has opted into, so quick navigation stays inside them
  // until the list is expanded.
  const quickNavButtons = useQuickNavButtons(
    scrRef,
    isShowingMoreBooks ? reachableBooks : projectBooks,
    direction,
    handleSubmit,
    localizedStrings,
  );

  const handleBackToBooks = useCallback(() => {
    setViewMode('books');
    setSelectedBookForChaptersView(undefined);
    setSelectedBookForVersesView(undefined);
    setSelectedChapterForVersesView(undefined);

    // Focus the search input when returning to book view
    setTimeout(() => {
      commandInputRef.current?.focus();
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
  const handleOpenChange = useCallback(
    (shouldCommandBeOpen: boolean) => {
      setIsCommandOpen(shouldCommandBeOpen);
      if (shouldCommandBeOpen) {
        setViewMode('books');
        setSelectedBookForChaptersView(undefined);
        setSelectedBookForVersesView(undefined);
        setSelectedChapterForVersesView(undefined);
        setInputValue('');
        // Seed, don't force: the list opens expanded when the current book is outside the project so
        // that book is visible, and the toggle still collapses from there.
        setIsShowingMoreBooks(isCurrentBookOutsideProject);
      }
    },
    [isCurrentBookOutsideProject],
  );

  // `disabled` on the trigger button only prevents OPENING the popover — it does not affect one
  // that is already open, which would otherwise keep accepting input and submit a reference for a
  // control the UI reports as non-interactive (e.g. the toolbar's navigation target disappearing
  // mid-interaction). Close it when the control becomes disabled.
  useEffect(() => {
    if (disabled) handleOpenChange(false);
  }, [disabled, handleOpenChange]);

  // Imperative `open()` goes through handleOpenChange (not setIsCommandOpen directly) so the
  // deferred view-state reset runs: the control deliberately leaves stale chapters/verses view
  // state behind on close (see handleVerseSelect / handleChapterSelect) and only resets it when
  // the popover opens. Callers like the Ctrl+B command can't know what view the control was last
  // left in, and CommandInput only renders in 'books' view — without the reset, focus would no-op.
  //
  // Focusing the search input is driven by this request counter (each `open()` call increments
  // it) rather than a `setTimeout` so the focus effect below runs after the commit that actually
  // rendered the popover's books-view CommandInput, even if that render takes longer than a tick.
  const [focusSearchInputRequestId, setFocusSearchInputRequestId] = useState(0);

  useEffect(() => {
    if (focusSearchInputRequestId === 0) return;
    commandInputRef.current?.focus();
  }, [focusSearchInputRequestId]);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        // Match the trigger button: a disabled control cannot be opened imperatively either
        if (disabled) return;
        handleOpenChange(true);
        setFocusSearchInputRequestId((requestId) => requestId + 1);
      },
    }),
    [handleOpenChange, disabled],
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

  /** The complete reference. Rendered at the widest step, and carried in the tooltip at every step. */
  const currentDisplayValue = useMemo(
    () =>
      formatScrRef(
        scrRef,
        localizedBookNames ? getLocalizedBookName(scrRef.book, localizedBookNames) : 'English',
      ),
    [scrRef, localizedBookNames],
  );

  /**
   * The book in whichever form the current step calls for: spelled out when there is room, the
   * abbreviated id from step 1 on. Both helpers already handle the no-localization fallback
   * (`Canon.bookIdToEnglishName` / the uppercase id), so this needs no new data and no new
   * localized strings.
   */
  const bookLabel = useMemo(
    () =>
      shrinkStep >= SHRINK_STEP.TIGHT
        ? getLocalizedBookId(scrRef.book, localizedBookNames)
        : getLocalizedBookName(scrRef.book, localizedBookNames),
    [scrRef.book, localizedBookNames, shrinkStep],
  );

  const chapterVerseLabel = `${scrRef.chapterNum}:${scrRef.verseNum}`;

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

  // Only offer the expansion while browsing: searching already spans every reachable book, so the
  // control would sit there doing nothing.
  // `!isCommandListHidden` because the toggle governs that list: quick navigation hides it while
  // leaving viewMode 'books', and a control offering to expand a list that is not on screen does
  // nothing a user can see.
  const canShowMoreBooksToggle =
    viewMode === 'books' &&
    !isCommandListHidden &&
    !inputValue.trim() &&
    booksOutsideProject.size > 0;

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

  // `||`, not `??`, throughout: an absent translation can come back as an empty string, which `??`
  // would pass straight through as a blank label. `||` falls back to the English text instead.
  // A key with no entry at all resolves to the key itself, which is truthy and so renders raw as
  // `%key%`; that case is guarded by `book-chapter-control-localization.test.ts`, which fails if any
  // key in `BOOK_CHAPTER_CONTROL_STRING_KEYS` lacks an English value.
  const selectChapterTitle = resolveLocalizedString(
    localizedStrings?.['%webView_bookChapterControl_selectChapter%'],
    'Select chapter',
  );
  const selectVerseTitle = resolveLocalizedString(
    localizedStrings?.['%webView_bookChapterControl_selectVerse%'],
    'Select verse',
  );
  const backLabel =
    viewMode === 'verses'
      ? resolveLocalizedString(
          localizedStrings?.['%webView_bookChapterControl_backToChapters%'],
          'Back to chapters',
        )
      : resolveLocalizedString(
          localizedStrings?.['%webView_bookChapterControl_backToBooks%'],
          'Back to books',
        );
  const bookNotInProjectLabel = resolveLocalizedString(
    localizedStrings?.['%webView_bookChapterControl_bookNotInProject%'],
    'Not in project',
  );
  const bookNotInProjectDescriptionTemplate = resolveLocalizedString(
    localizedStrings?.['%webView_bookChapterControl_bookNotInProjectDescription%'],
    '{book} is not in this project',
  );
  // A localized template that places the book itself, rather than appending the short label to a
  // name here: word order, punctuation, and any inflection of the name belong to the translation.
  // Substitutes the same `Name (ID)` form BookItem announces for an undimmed row, so the id is not
  // dropped from a dimmed row's accessible name and both read alike.
  const getBookNotInProjectDescription = useCallback(
    (bookId: string) =>
      formatReplacementString(bookNotInProjectDescriptionTemplate, {
        book: `${getLocalizedBookName(bookId, localizedBookNames)} (${getLocalizedBookId(
          bookId,
          localizedBookNames,
        )})`,
      }),
    [bookNotInProjectDescriptionTemplate, localizedBookNames],
  );
  const showMoreBooksLabel = resolveLocalizedString(
    localizedStrings?.['%webView_bookChapterControl_showMoreBooks%'],
    'Show more books',
  );
  const showProjectBooksOnlyLabel = resolveLocalizedString(
    localizedStrings?.['%webView_bookChapterControl_showProjectBooksOnly%'],
    'Show project books only',
  );

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

      const eventTarget = event.target instanceof HTMLElement ? event.target : undefined;

      // The recent-searches list portals out to `body`, but it stays a React child of this popover,
      // so its keydowns still arrive at this capture-phase handler — ahead of the list's own
      // bubble-phase navigation. Not one of them is ours to claim: while that list is open it owns
      // every key the user presses, and taking arrows or Enter here would leave it unnavigable and
      // submit a reference out from under it. Both roles matter, because the list is focused in two
      // stages: Radix focuses the CONTENT (`role="menu"`) when it opens and only moves focus onto a
      // row (`role="menuitem"`) once the user arrows.
      //
      // Asking only "is this inside a menu?" is not enough, because THIS PICKER can itself live
      // inside one: `ScopeSelector`'s Navigate footer renders it in a `DropdownMenuItem` and
      // portals its popover into the `DropdownMenuContent` (`PopoverPortalContainerProvider`, a
      // pattern `popover.tsx` documents). Every keystroke in the grid would then have `role="menu"`
      // as an ancestor, and this bail would disable the whole control there. So the question is
      // whether the keystroke landed OUTSIDE the cmdk surface this handler drives.
      const isInOwnCommandSurface = !!eventTarget && !!commandRef.current?.contains(eventTarget);
      if (!isInOwnCommandSurface && eventTarget?.closest('[role="menu"], [role="menuitem"]'))
        return;

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
        const isTargetInteractive = !!eventTarget?.closest(
          'button, a, input, select, textarea, [role="button"]',
        );
        if (isTargetInteractive) {
          // Don't preventDefault — browser-native activation (Enter → click, Space →
          // click on keyup) must still reach the button's onClick.
          event.stopPropagation();
          return;
        }
        // Activate the highlighted cell by calling the same handler its onSelect would, using the
        // item number we already hold in `commandValue`. Reading cmdk's private DOM attributes
        // (`cmdk-item`, `data-selected`, `data-disabled`) and synthesizing a click would tie
        // activation to library internals that nothing of ours pins.
        const activation = (() => {
          if (viewMode === 'verses') {
            const bookId = selectedBookForVersesView;
            const chapterNum = selectedChapterForVersesView;
            const verse = parseVerseFromItemValue(commandValue);
            if (!bookId || !chapterNum || verse === undefined) return undefined;
            return {
              isDisabled: makeIsVerseDisabled(bookId, chapterNum)(verse),
              activate: () => handleVerseSelect(verse),
            };
          }
          const bookId = selectedBookForChaptersView;
          const chapter = parseChapterFromItemValue(commandValue);
          if (!bookId || chapter === undefined) return undefined;
          return {
            isDisabled: makeIsChapterDisabled(bookId)(chapter),
            activate: () => handleChapterSelect(chapter),
          };
        })();

        if (activation) {
          event.preventDefault();
          event.stopPropagation();
          // Skip activation when the cell is disabled, checking the same predicate the grid
          // renders it with — activation has no DOM node here to read a disabled state from.
          if (!activation.isDisabled) activation.activate();
          return;
        }
      }

      // Enter over a top match submits the reference its row displays. The preview grid owns the
      // highlight, so cmdk would otherwise dispatch Enter at the highlighted cell — which knows
      // only a chapter and would drop the verse the user typed. Space is deliberately not included:
      // the books view is a text field, where a space is a character.
      //
      // `!isCommandListHidden` for the same reason the arrow branch below checks it: quick
      // navigation unmounts the list, taking the top-match row with it, while `topMatch` still
      // reflects the stale query. Submitting it there would silently undo the quick-nav step the
      // user just took, with nothing on screen that named the reference being submitted.
      if (viewMode === 'books' && topMatch && !isCommandListHidden && event.key === 'Enter') {
        // The header's own controls (quick navigation, the recent-searches trigger) keep their
        // activation, and so does any input that isn't this picker's search box. The
        // recent-searches list itself never gets this far — the portalled-menu bail at the top of
        // this handler returns before any of these branches run.
        //
        // Excluding the search box is load-bearing, not a special case: it is itself an `input`, so
        // without this it would match the selector below and Enter — the normal way to commit a
        // typed reference — would never submit anything. The chapters/verses branch above needs no
        // such exclusion because the search box is not rendered in those views.
        const isTargetInteractive =
          eventTarget !== commandInputRef.current &&
          !!eventTarget?.closest('button, a, input, select, textarea, [role="button"]');
        if (!isTargetInteractive) {
          event.preventDefault();
          event.stopPropagation();
          handleTopMatchSelect();
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

      // Backspace steps back one level: verses to chapters, chapters to books. This is the
      // keyboard counterpart to the header's back button, which is deliberately out of the tab
      // order, so it is the only way a keyboard user leaves a grid without committing a reference.
      if (event.key === 'Backspace' && (viewMode === 'chapters' || viewMode === 'verses')) {
        event.preventDefault();
        event.stopPropagation();
        if (viewMode === 'verses') handleBackToChapters();
        else handleBackToBooks();
        return;
      }

      // Narrows `event.key` to `ArrowKey` for `computeTargetGridItem` below, and leaves every
      // non-arrow key to cmdk.
      if (!isArrowKey(event.key)) return;

      // Quick navigation hides the whole list, and with it the top-match row and the preview grid
      // this handler would be steering. There is nothing on screen for an arrow to move, so
      // claiming one would swallow the keystroke — denying it both to cmdk and to the quick-nav
      // buttons' own focus-restore. The `fetchEndChapter(...) > 1` conjunct in the grid resolver
      // below exists for the same reason; this is the other half of "is a grid actually rendered".
      if (isCommandListHidden) return;

      // In the books view the search input keeps focus, so a horizontal arrow is first of all a
      // caret key: it belongs to the grid only once the caret has nowhere left to go in that
      // direction — the same rule a combobox uses, and the same reasoning that forwards Home and End
      // to the input. Claiming it unconditionally freezes the caret mid-query AND quietly retargets
      // what Enter submits, because the top-match row prefers the highlighted cell over the parsed
      // query: pressing ArrowLeft to edit the verse in "mat 12:15" would step the highlight to 14
      // and submit a verse that was never typed. The dedicated chapter and verse views render no
      // input and take all four arrows.
      if (viewMode === 'books' && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        // Only when the caret is actually IN the input. An `<input>` keeps its selection offsets
        // after blur, so reading them unconditionally would yield the key to a caret that cannot
        // move — and cmdk binds no horizontal arrows on the Command root, so the keystroke would do
        // nothing at all.
        const input = eventTarget === commandInputRef.current ? commandInputRef.current : undefined;
        const caretStart = input?.selectionStart ?? 0;
        const caretEnd = input?.selectionEnd ?? 0;
        // Which arrow walks toward the start of the text is a property of the layout, not of the
        // key: in a right-to-left field the leftmost character is the LAST one.
        const isTowardTextStart =
          direction === 'rtl' ? event.key === 'ArrowRight' : event.key === 'ArrowLeft';
        const canCaretMove =
          !!input &&
          (caretStart !== caretEnd ||
            (isTowardTextStart ? caretStart > 0 : caretEnd < input.value.length));
        if (canCaretMove) return;
      }

      // Shift+arrow is a selection gesture, not a navigation one: in the search box it extends the
      // text selection, and the grid has no notion of a range. Leave it to whatever has focus.
      if (event.shiftKey) return;

      // Arrows aimed at a focused header control belong to that control — the quick-nav buttons use
      // ArrowUp / ArrowDown to hand focus back to the search input. The books view's preview grid is
      // steered from the input and never holds focus itself, so it has no claim on those.
      if (
        viewMode === 'books' &&
        eventTarget !== commandInputRef.current &&
        eventTarget?.closest('button, a, [role="button"]')
      )
        return;

      // Chapters and verses differ only in where the item count comes from and how an item's
      // cmdk value is spelled. Everything else — reading the current highlight, computing the
      // target, writing it back, scrolling it into view — is identical, so it lives in one place
      // and a fix cannot land in only one grid.
      //
      // Select by the grid that is actually rendered, not by view mode: the books view shows a
      // VERSE preview grid whenever the query carries a chapter-verse separator, and driving that
      // with chapter arithmetic writes a value no verse cell can match, blanking the highlight.
      const grid = (() => {
        const versePreviewInBooksView =
          viewMode === 'books' && topMatch && shouldShowVerseGridForTopMatch && topMatch.chapterNum
            ? { bookId: topMatch.book, chapterNum: topMatch.chapterNum }
            : undefined;
        const verseTarget =
          viewMode === 'verses'
            ? { bookId: selectedBookForVersesView, chapterNum: selectedChapterForVersesView }
            : versePreviewInBooksView;

        if (verseTarget) {
          const { bookId, chapterNum } = verseTarget;
          if (!bookId || !chapterNum || !getEndVerse) return undefined;
          return {
            max: getEndVerse(bookId, chapterNum),
            current: parseVerseFromItemValue(commandValue) ?? 0,
            buildValue: (item: number) => verseItemValue(bookId, chapterNum, item),
            refs: verseRefs,
            // In books view focus stays on the CommandInput so the user can keep typing; only
            // the dedicated grid views pull focus off the back button.
            takeFocus: viewMode === 'verses',
          };
        }

        // The books view renders its chapter preview only for books with more than one chapter, so
        // a single-chapter top match (Jude, Obadiah, Philemon, 2-3 John) has no grid to drive. Claim
        // the keystroke there and it would write a chapter value no rendered item carries, blanking
        // the highlight; let it fall through to cmdk so the list stays navigable instead.
        if (
          viewMode === 'chapters' ||
          (viewMode === 'books' && topMatch && fetchEndChapter(topMatch.book) > 1)
        ) {
          const bookId = viewMode === 'chapters' ? selectedBookForChaptersView : topMatch?.book;
          if (!bookId) return undefined;
          return {
            max: fetchEndChapter(bookId),
            current: parseChapterFromItemValue(commandValue) ?? 0,
            buildValue: (item: number) => chapterItemValue(bookId, item),
            refs: chapterRefs,
            takeFocus: viewMode === 'chapters',
          };
        }
        return undefined;
      })();

      if (!grid) return;

      // A non-positive count means the Scripture data has no chapter/verse count for this book
      // (deuterocanonical books come back as -1). Navigating with it produces a highlight value
      // no grid cell can match, which silently blanks the highlight.
      if (grid.max <= 0) return;

      if (grid.takeFocus) {
        // Arrow keys drive the grid now — pull focus off the back button (the only natively
        // focusable element in these views) so its focus ring doesn't compete with the grid's
        // highlight. The Command root carries tabIndex={-1} from cmdk, so it is a valid focus
        // target and PopoverContent's capture-phase key handling keeps working.
        commandRef.current?.focus();
      }

      const target = computeTargetGridItem({
        current: grid.current,
        key: event.key,
        max: grid.max,
        direction,
      });

      // An arrow key aimed at the grid belongs to the grid even when the highlight does not move.
      // The Command root navigates with `loop`, so releasing a clamped keystroke to it would wrap
      // the highlight to the opposite edge — precisely what clamping exists to prevent.
      event.preventDefault();
      event.stopPropagation();

      if (target === grid.current) return;

      setCommandValue(grid.buildValue(target));

      const targetElement = grid.refs.current[target];
      if (targetElement) targetElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    },
    [
      viewMode,
      topMatch,
      shouldShowVerseGridForTopMatch,
      isCommandListHidden,
      direction,
      handleBackToBooks,
      handleBackToChapters,
      handleChapterSelect,
      handleTopMatchSelect,
      handleVerseSelect,
      makeIsChapterDisabled,
      makeIsVerseDisabled,
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
      commandInputRef.current?.focus();

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
      // modal mode.
      setCommandValue(chapterItemValue(selectedBookForChaptersView, initialChapter));

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
      setCommandValue(
        verseItemValue(selectedBookForVersesView, selectedChapterForVersesView, initialVerse),
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

  // Identity of the reference the preview grid is seeded from. Built out of the parsed reference
  // and the kind of grid on screen, so it changes exactly when a fresh seed is wanted — editing
  // the query to a different reference — and not when the highlight merely moves.
  const previewSeedKey = topMatch
    ? `${topMatch.book} ${topMatch.chapterNum ?? ''} ${topMatch.verseNum ?? ''} ${shouldShowVerseGridForTopMatch}`
    : '';
  const seededPreviewKeyRef = useRef('');
  // The cmdk value of the preview cell the highlight last named.
  const highlightedPreviewCellRef = useRef('');

  // The preview grid the books view renders under the top-match row, or `undefined` when there is
  // none on screen. Both the seeding effect below and the controlled-value handler read this, so
  // they cannot disagree about whether a grid exists to hold the highlight.
  const previewGrid = useMemo(() => {
    if (viewMode !== 'books' || !topMatch || isCommandListHidden) return undefined;

    const { book, chapterNum, verseNum } = topMatch;
    if (shouldShowVerseGridForTopMatch && chapterNum && getEndVerse) {
      return {
        max: getEndVerse(book, chapterNum),
        initial:
          verseNum ??
          (book === scrRef.book && chapterNum === scrRef.chapterNum ? scrRef.verseNum : 1),
        parse: parseVerseFromItemValue,
        buildValue: (item: number) => verseItemValue(book, chapterNum, item),
      };
    }
    // A single-chapter book renders no chapter preview, so there is no cell for a seed to land on;
    // writing one would blank the highlight instead of placing it.
    const endChapter = fetchEndChapter(book);
    if (endChapter <= 1) return undefined;
    return {
      max: endChapter,
      initial: chapterNum ?? (book === scrRef.book ? scrRef.chapterNum : 1),
      parse: parseChapterFromItemValue,
      buildValue: (item: number) => chapterItemValue(book, item),
    };
  }, [
    viewMode,
    topMatch,
    isCommandListHidden,
    shouldShowVerseGridForTopMatch,
    getEndVerse,
    scrRef.book,
    scrRef.chapterNum,
    scrRef.verseNum,
  ]);

  // The books view shows a chapter (or verse) preview grid under the top-match row. Seed its
  // highlight the same way the chapters and verses views seed theirs, so every grid surface obeys
  // the same rule: exactly one cell is highlighted for as long as the grid is on screen, and arrow
  // keys only ever move it.
  //
  // Seeding is still an effect rather than part of the value handler above, because a fresh
  // reference arrives as a render (the query changed), not as a value request from cmdk. Running it
  // in a LAYOUT effect keeps the seed in the same commit, so no frame is ever painted with the
  // highlight off the grid. A new parsed reference seeds afresh; a highlight the user moved
  // survives.
  useLayoutEffect(() => {
    if (viewMode !== 'books' || !topMatch || !previewGrid || previewGrid.max <= 0) {
      seededPreviewKeyRef.current = '';
      return;
    }

    const { max, initial, parse, buildValue } = previewGrid;
    // Only a value this grid actually renders can carry the highlight, so anything out of range or
    // belonging to another book counts as "off the grid".
    const cellNamedBy = (value: string) => {
      const item = parse(value);
      return item !== undefined && item >= 1 && item <= max && value === buildValue(item)
        ? item
        : undefined;
    };

    if (seededPreviewKeyRef.current !== previewSeedKey) {
      seededPreviewKeyRef.current = previewSeedKey;
      const seeded = buildValue(Math.min(Math.max(initial, 1), max));
      highlightedPreviewCellRef.current = seeded;
      setCommandValue(seeded);
      return;
    }

    if (cellNamedBy(commandValue) !== undefined) {
      highlightedPreviewCellRef.current = commandValue;
      return;
    }

    setCommandValue(
      cellNamedBy(highlightedPreviewCellRef.current) !== undefined
        ? highlightedPreviewCellRef.current
        : buildValue(Math.min(Math.max(initial, 1), max)),
    );
  }, [viewMode, topMatch, previewGrid, previewSeedKey, commandValue]);

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
          disabled={disabled}
          // `tw:shrink` overrides the `tw:shrink-0` in the shadcn Button base, and it is what makes
          // the abbreviation ladder above worth anything: `tw:w-full` gives this a flex base of the
          // full container width, so while it is rigid the trigger holds a fixed slot (capped at
          // `tw:max-w-48`) no matter which label form is inside it. Shortening `Genesis 1:1` to
          // `GEN` then frees no room for its neighbours — it just leaves more empty space in a box
          // of the same width, and the space they needed still comes out of somewhere else.
          // `tw:min-w-16` remains the floor, so the trigger stays a usable click target.
          className={cn(
            'tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:shrink tw:overflow-hidden tw:px-1',
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
          {triggerContent ?? (
            <ToolbarCompoundLabel
              primary={bookLabel}
              secondary={chapterVerseLabel}
              showSecondary={shrinkStep < SHRINK_STEP.MINIMUM}
              // From TIGHT on, `bookLabel` is the abbreviated id rather than the book name. Nothing
              // is visibly clipped, so only this tells the tooltip the label is incomplete.
              isPartial={shrinkStep >= SHRINK_STEP.TIGHT}
              fullText={currentDisplayValue}
            />
          )}
          {showTriggerChevron && (
            <IconSelector
              data-testid="book-chapter-control-chevron"
              className="tw:ms-2 tw:size-4 tw:shrink-0 tw:opacity-50"
            />
          )}
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
        <TooltipProvider>
          <Command
            ref={commandRef}
            loop
            value={commandValue}
            onValueChange={setCommandValue}
            // The keyboard highlight is this control's own state — seeded when a grid appears and
            // moved only by the arrow keys — while hover is styled separately on every item and
            // grid cell. Letting cmdk also move the highlight under the pointer contradicts that:
            // it hands the highlight to whatever the pointer is over, including the top-match row,
            // which names no grid cell. The seeding effect below then has to put it back, so every
            // pointer event over that row costs two renders of the whole preview grid — and a
            // pointer on its way to the grid must cross that row.
            disablePointerSelection
            shouldFilter={false}
          >
            {/* Header: Input (with quick nav buttons) for book view, fixed header for chapter view */}
            {viewMode === 'books' ? (
              <div className={cn('tw:flex tw:items-end', isCommandListHidden && 'tw:pb-1')}>
                <div className="tw:relative tw:flex-1">
                  <CommandInput
                    ref={commandInputRef}
                    value={inputValue}
                    onValueChange={setInputValue}
                    onKeyDown={handleInputKeyDown}
                    onFocus={() => setIsCommandListHidden(false)}
                    className={recentSearches && recentSearches.length > 0 ? 'tw:pe-8!' : ''}
                    // Picker semantics: with nothing typed, Space picks the highlighted book (the
                    // Enter UX). Neither of this control's own Space handlers covers that state —
                    // `handleInputKeyDown` claims a key only for a FULLY-qualified `submitKeys`
                    // match (an empty input has no top match at all), and the `data-selected` grid
                    // pick in `handleCommandKeyDown` is gated on the chapters and verses views,
                    // while this input exists only in the books view. Space is still an ordinary
                    // character once anything is typed, so "1 Samuel" stays searchable.
                    spaceSelectsHighlightedItem
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
                {/* Navigation buttons for previous/next chapter/verse. `ButtonGroup` (rather than a
                    plain flex row) supplies the `role="group"` that names these four as one control
                    and matches NavigationHistoryButtons, the neighbouring toolbar control. `gap-1`
                    overrides the group's default flush-edge packing, which would run the ghost
                    buttons together. A separator marks each change of `group`, so chapter and verse
                    controls stay visually distinct. */}
                {/* `h-8.5` on the buttons and `translate-y-px` here are tuned against the
                    `CommandInput` beside them, which InputGroup fixes at `h-8`, in this `items-end`
                    row — change them together if that height changes. */}
                <ButtonGroup className="tw:translate-y-px tw:gap-1 tw:pe-2">
                  {quickNavButtons.map(
                    (
                      { onClick, disabled: isQuickNavDisabled, title, icon: Icon, group },
                      index,
                    ) => {
                      const quickNavButton = (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setIsCommandListHidden(true);
                            onClick();
                          }}
                          disabled={isQuickNavDisabled}
                          className="tw:h-8.5 tw:w-6 tw:p-0"
                          aria-label={title}
                          onKeyDown={handleQuickNavButtonKeyDown}
                        >
                          <Icon />
                        </Button>
                      );

                      return (
                        // Keyed by position, not by `title`: the titles are localized, so they all
                        // change together the moment the strings resolve or the UI language does.
                        // Keying on them would remount all four buttons at that instant, dropping
                        // focus off whichever one the user was on and destroying an open tooltip.
                        // The set is fixed in size and order, so the index is stable.
                        // eslint-disable-next-line react/no-array-index-key
                        <Fragment key={`${group}-${index}`}>
                          {index > 0 && group !== quickNavButtons[index - 1].group && (
                            <ButtonGroupSeparator />
                          )}
                          {isQuickNavDisabled ? (
                            // A disabled Button carries `pointer-events: none` from its own base
                            // variants, so it is not hit-tested: neither a Radix tooltip nor a
                            // `title` ON THE BUTTON can ever fire. These arrows come back disabled
                            // at the edges of the canon — Genesis 1:1 is the default state of a
                            // freshly opened project — which is exactly where a user asks what the
                            // button was for. The wrapper is still hit-tested, so the native
                            // tooltip it carries is the one hover explanation available here.
                            <span title={title} className="tw:inline-flex">
                              {quickNavButton}
                            </span>
                          ) : (
                            <Tooltip>
                              <TooltipTrigger asChild>{quickNavButton}</TooltipTrigger>
                              <TooltipContent>{title}</TooltipContent>
                            </Tooltip>
                          )}
                        </Fragment>
                      );
                    },
                  )}
                </ButtonGroup>
              </div>
            ) : (
              <div className="tw:flex tw:items-center tw:border-b tw:px-3 tw:py-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={viewMode === 'verses' ? handleBackToChapters : handleBackToBooks}
                      className="tw:me-2 tw:h-6 tw:w-6 tw:p-0"
                      // Out of the tab order on purpose: the popover keeps focus on the cmdk
                      // surface that owns arrow-key navigation, and a tab stop here would drop the
                      // user out of it between every level. Backspace is the keyboard route back
                      // (catalogued as `book-chapter-control-back`), so this button is a pointer
                      // affordance rather than the only way out. It stays programmatically
                      // focusable, and a click does focus it — which is why the Enter/Space handler
                      // explicitly yields to a focused button.
                      tabIndex={-1}
                      aria-label={backLabel}
                    >
                      {direction === 'ltr' ? (
                        <ArrowLeft className="tw:h-4 tw:w-4" />
                      ) : (
                        <ArrowRight className="tw:h-4 tw:w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{backLabel}</TooltipContent>
                </Tooltip>
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
                                commandValue={generateCommandValue(bookId)}
                                ref={bookId === scrRef.book ? selectedBookItemRef : undefined}
                                localizedBookNames={localizedBookNames}
                                disabled={isBookDisabled(bookId)}
                                dimmedReason={
                                  booksOutsideProject.has(bookId)
                                    ? bookNotInProjectLabel
                                    : undefined
                                }
                                dimmedDescription={
                                  booksOutsideProject.has(bookId)
                                    ? getBookNotInProjectDescription(bookId)
                                    : undefined
                                }
                              />
                            ))}
                          </CommandGroup>
                        );
                      })}

                    {/* Top match scripture reference */}
                    {topMatch && topMatchReference && (
                      <CommandGroup>
                        <CommandItem
                          key="top-match"
                          value={TOP_MATCH_ITEM_VALUE}
                          onSelect={handleTopMatchSelect}
                          disabled={
                            !!disableReferencesUpTo &&
                            isVerseBefore(
                              topMatchReference.book,
                              topMatchReference.chapterNum,
                              topMatchReference.verseNum,
                              disableReferencesUpTo,
                            )
                          }
                          // The preview grid keeps the cmdk highlight, so `data-selected` never
                          // lands here; a hover rule of its own gives the row pointer feedback.
                          // Full `bg-muted`, matching the book rows and grid cells it shares the
                          // popover with — the `/50` wash is this design system's treatment for
                          // large surfaces (table rows, cards), not for list items.
                          // Hiding CommandItem's trailing check icon keeps this row's book-id
                          // column aligned with the book rows below, which hide it too.
                          className="tw:font-semibold tw:text-primary tw:hover:bg-muted tw:[&>svg:last-child]:hidden"
                        >
                          <span className="tw:min-w-0 tw:flex-1">
                            {formatScrRef(
                              topMatchReference,
                              getLocalizedBookName(topMatch.book, localizedBookNames),
                            )}
                          </span>
                          <span className="tw:ms-2 tw:shrink-0 tw:text-xs tw:text-muted-foreground">
                            {getLocalizedBookId(topMatch.book, localizedBookNames)}
                          </span>
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
                            isVerseDisabled={makeIsVerseDisabled(
                              topMatch.book,
                              topMatch.chapterNum,
                            )}
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
                      endVerse={getEndVerse(
                        selectedBookForVersesView,
                        selectedChapterForVersesView,
                      )}
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

            {/* Outside CommandList on purpose: inside it, cmdk would register this as an option —
                arrow-navigable and matched by typing — instead of a control. */}
            {canShowMoreBooksToggle && (
              <div className="tw:border-t tw:p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="tw:w-full tw:justify-start tw:font-normal"
                  // No aria-expanded: the label names the action and so already carries the state,
                  // and the two encode it in opposite directions — "Show project books only" plus
                  // `aria-expanded="true"` reads as a contradiction.
                  //
                  // No aria-controls either: cmdk's List spreads incoming props before setting its
                  // own `id`, so an id passed to CommandList never reaches the DOM and the attribute
                  // would reference nothing. cmdk does not expose the id it generates.
                  onClick={() => setIsShowingMoreBooks((wasShowing) => !wasShowing)}
                >
                  {isShowingMoreBooks ? showProjectBooksOnlyLabel : showMoreBooksLabel}
                </Button>
              </div>
            )}
          </Command>
        </TooltipProvider>
      </PopoverContent>
    </Popover>
  );
}

export default BookChapterControl;
