import { Badge } from '@/components/shadcn-ui/badge';
import { Button } from '@/components/shadcn-ui/button';
import { Checkbox } from '@/components/shadcn-ui/checkbox';
import { Input } from '@/components/shadcn-ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import {
  doesBookMatchQuery,
  getLocalizedBookName,
  getSectionLongName,
} from '@/components/shared/book.utils';
import { cn } from '@/utils/shadcn-ui.util';
import { Canon } from '@sillsdev/scripture';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { getSectionForBook, LanguageStrings, LocalizeKey, Section } from 'platform-bible-utils';
import {
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

/** Maximum number of badges to show before collapsing into a "+X more" badge */
const VISIBLE_BADGES_COUNT = 5;
/** Maximum number of badges that can be shown without triggering the collapse */
const MAX_VISIBLE_BADGES = 6;

type BookGridSelectorProps = {
  /**
   * Information about available books, formatted as a 123 character long string as defined in a
   * projects BooksPresent setting
   */
  availableBookInfo: string;
  /** Array of currently selected book IDs */
  selectedBookIds: string[];
  /** Callback function that is executed when the book selection changes */
  onChangeSelectedBookIds: (books: string[]) => void;
  /** Object containing the localized strings for the component */
  localizedStrings: LanguageStrings;
  /**
   * Optional map of localized book IDs/short names and full names. Key is the (English) book ID,
   * value contains localized versions of the ID and full book name
   */
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>;
  /**
   * When true, OT and NT books are additionally sub-grouped by traditional biblical book category
   * (Pentateuch, Historical, Wisdom, Major Prophets, Minor Prophets in OT; Gospels, Acts, Pauline
   * Epistles, General Epistles, Revelation in NT). Each category gets a smaller sub-header with its
   * own tristate select-all checkbox. DC and Extra sections are not sub-divided. Defaults to
   * false.
   */
  groupByCategory?: boolean;
};

/** Sections rendered as groups, in display order. */
const GROUP_SECTIONS: readonly Section[] = [Section.OT, Section.NT, Section.DC, Section.Extra];

/**
 * Traditional biblical book categories used as a second grouping layer when
 * `groupByCategory={true}`. Only OT and NT have category sub-divisions; DC and Extra render flat.
 */
enum BookCategory {
  Pentateuch = 'Pentateuch',
  Historical = 'Historical',
  Wisdom = 'Wisdom',
  MajorProphets = 'MajorProphets',
  MinorProphets = 'MinorProphets',
  Gospels = 'Gospels',
  Acts = 'Acts',
  PaulineEpistles = 'PaulineEpistles',
  GeneralEpistles = 'GeneralEpistles',
  Revelation = 'Revelation',
}

/** Categories rendered within each section, in display order. Sections missing here are flat. */
const CATEGORIES_BY_SECTION: Partial<Record<Section, readonly BookCategory[]>> = {
  [Section.OT]: [
    BookCategory.Pentateuch,
    BookCategory.Historical,
    BookCategory.Wisdom,
    BookCategory.MajorProphets,
    BookCategory.MinorProphets,
  ],
  [Section.NT]: [
    BookCategory.Gospels,
    BookCategory.Acts,
    BookCategory.PaulineEpistles,
    BookCategory.GeneralEpistles,
    BookCategory.Revelation,
  ],
};

/**
 * Book ID → category lookup. Books not present here (DC, Extra, unknown) have no category and
 * render in their section without a category sub-header.
 */
const BOOK_TO_CATEGORY: Readonly<Record<string, BookCategory>> = Object.freeze({
  GEN: BookCategory.Pentateuch,
  EXO: BookCategory.Pentateuch,
  LEV: BookCategory.Pentateuch,
  NUM: BookCategory.Pentateuch,
  DEU: BookCategory.Pentateuch,
  JOS: BookCategory.Historical,
  JDG: BookCategory.Historical,
  RUT: BookCategory.Historical,
  '1SA': BookCategory.Historical,
  '2SA': BookCategory.Historical,
  '1KI': BookCategory.Historical,
  '2KI': BookCategory.Historical,
  '1CH': BookCategory.Historical,
  '2CH': BookCategory.Historical,
  EZR: BookCategory.Historical,
  NEH: BookCategory.Historical,
  EST: BookCategory.Historical,
  JOB: BookCategory.Wisdom,
  PSA: BookCategory.Wisdom,
  PRO: BookCategory.Wisdom,
  ECC: BookCategory.Wisdom,
  SNG: BookCategory.Wisdom,
  ISA: BookCategory.MajorProphets,
  JER: BookCategory.MajorProphets,
  LAM: BookCategory.MajorProphets,
  EZK: BookCategory.MajorProphets,
  DAN: BookCategory.MajorProphets,
  HOS: BookCategory.MinorProphets,
  JOL: BookCategory.MinorProphets,
  AMO: BookCategory.MinorProphets,
  OBA: BookCategory.MinorProphets,
  JON: BookCategory.MinorProphets,
  MIC: BookCategory.MinorProphets,
  NAM: BookCategory.MinorProphets,
  HAB: BookCategory.MinorProphets,
  ZEP: BookCategory.MinorProphets,
  HAG: BookCategory.MinorProphets,
  ZEC: BookCategory.MinorProphets,
  MAL: BookCategory.MinorProphets,
  MAT: BookCategory.Gospels,
  MRK: BookCategory.Gospels,
  LUK: BookCategory.Gospels,
  JHN: BookCategory.Gospels,
  ACT: BookCategory.Acts,
  ROM: BookCategory.PaulineEpistles,
  '1CO': BookCategory.PaulineEpistles,
  '2CO': BookCategory.PaulineEpistles,
  GAL: BookCategory.PaulineEpistles,
  EPH: BookCategory.PaulineEpistles,
  PHP: BookCategory.PaulineEpistles,
  COL: BookCategory.PaulineEpistles,
  '1TH': BookCategory.PaulineEpistles,
  '2TH': BookCategory.PaulineEpistles,
  '1TI': BookCategory.PaulineEpistles,
  '2TI': BookCategory.PaulineEpistles,
  TIT: BookCategory.PaulineEpistles,
  PHM: BookCategory.PaulineEpistles,
  // Hebrews is grouped with the General Epistles since Pauline authorship is disputed by most
  // modern scholarship. (Older categorizations sometimes group it with Pauline.)
  HEB: BookCategory.GeneralEpistles,
  JAS: BookCategory.GeneralEpistles,
  '1PE': BookCategory.GeneralEpistles,
  '2PE': BookCategory.GeneralEpistles,
  '1JN': BookCategory.GeneralEpistles,
  '2JN': BookCategory.GeneralEpistles,
  '3JN': BookCategory.GeneralEpistles,
  JUD: BookCategory.GeneralEpistles,
  REV: BookCategory.Revelation,
});

/** Localized string key per category. Falls back to a sensible English default when unset. */
const CATEGORY_STRING_KEYS: Readonly<Record<BookCategory, { key: LocalizeKey; fallback: string }>> =
  Object.freeze({
    [BookCategory.Pentateuch]: {
      key: '%scripture_category_pentateuch%',
      fallback: 'Pentateuch',
    },
    [BookCategory.Historical]: {
      key: '%scripture_category_historical%',
      fallback: 'Historical Books',
    },
    [BookCategory.Wisdom]: {
      key: '%scripture_category_wisdom%',
      fallback: 'Wisdom Books',
    },
    [BookCategory.MajorProphets]: {
      key: '%scripture_category_major_prophets%',
      fallback: 'Major Prophets',
    },
    [BookCategory.MinorProphets]: {
      key: '%scripture_category_minor_prophets%',
      fallback: 'Minor Prophets',
    },
    [BookCategory.Gospels]: {
      key: '%scripture_category_gospels%',
      fallback: 'Gospels',
    },
    [BookCategory.Acts]: {
      key: '%scripture_category_acts%',
      fallback: 'Acts',
    },
    [BookCategory.PaulineEpistles]: {
      key: '%scripture_category_pauline_epistles%',
      fallback: 'Pauline Epistles',
    },
    [BookCategory.GeneralEpistles]: {
      key: '%scripture_category_general_epistles%',
      fallback: 'General Epistles',
    },
    [BookCategory.Revelation]: {
      key: '%scripture_category_revelation%',
      fallback: 'Revelation',
    },
  });

/**
 * A book selection component that renders a grid of clickable book pills grouped by canon section
 * (Old Testament, New Testament, Deuterocanon, Extra). Each group has a tristate select-all
 * checkbox in its header. Inspired by the BookGridSelector in the Manage Books dialog design
 * (paranext-core PR #2224).
 *
 * Differences from {@link BookSelector}:
 *
 * - No "OT / NT / DC / Extra" buttons above the popover — bulk-select per group lives directly on
 *   each group's header inside the grid.
 * - Books are presented as a multi-column grid of pills rather than a vertical list.
 * - Group headers are sticky and collapsible.
 */
export function BookGridSelector({
  availableBookInfo,
  selectedBookIds,
  onChangeSelectedBookIds,
  localizedStrings,
  localizedBookNames,
  groupByCategory = false,
}: BookGridSelectorProps) {
  const searchBooksText = localizedStrings['%webView_book_selector_search_books%'];
  const selectAllText = localizedStrings['%webView_book_selector_select_all%'];
  const clearAllText = localizedStrings['%webView_book_selector_clear_all%'];
  const noBookFoundText = localizedStrings['%webView_book_selector_no_book_found%'];
  const moreText = localizedStrings['%webView_book_selector_more%'];

  const otLong = localizedStrings['%scripture_section_ot_long%'];
  const ntLong = localizedStrings['%scripture_section_nt_long%'];
  const dcLong = localizedStrings['%scripture_section_dc_long%'];
  const extraLong = localizedStrings['%scripture_section_extra_long%'];

  if (availableBookInfo.length !== Canon.allBookIds.length) {
    throw new Error('availableBookInfo length must match Canon.allBookIds length');
  }

  const [filterText, setFilterText] = useState('');
  // Per-group collapse state. A group missing from the set is expanded.
  const [collapsedGroups, setCollapsedGroups] = useState<Set<Section>>(() => new Set());
  // Anchor index for shift-click range selection. Stored as the index into the flat
  // (filtered) book list so the range covers exactly what the user sees.
  const anchorIndexRef = useRef<number | undefined>(undefined);

  const selectedSet = useMemo(() => new Set(selectedBookIds), [selectedBookIds]);

  const availableBookIds = useMemo(
    () =>
      Canon.allBookIds.filter(
        (bookId, index) =>
          availableBookInfo[index] === '1' && !Canon.isObsolete(Canon.bookIdToNumber(bookId)),
      ),
    [availableBookInfo],
  );

  /** Books per group, in canonical order, before the search filter is applied. */
  const booksByGroup = useMemo(() => {
    const grouped: Record<Section, string[]> = {
      [Section.OT]: [],
      [Section.NT]: [],
      [Section.DC]: [],
      [Section.Extra]: [],
    };
    availableBookIds.forEach((bookId) => {
      grouped[getSectionForBook(bookId)].push(bookId);
    });
    return grouped;
  }, [availableBookIds]);

  /** Books per group after the search filter is applied. Empty groups are kept (rendered hidden). */
  const filteredBooksByGroup = useMemo(() => {
    if (!filterText.trim()) return booksByGroup;
    const filtered: Record<Section, string[]> = {
      [Section.OT]: [],
      [Section.NT]: [],
      [Section.DC]: [],
      [Section.Extra]: [],
    };
    GROUP_SECTIONS.forEach((section) => {
      filtered[section] = booksByGroup[section].filter((bookId) =>
        doesBookMatchQuery(bookId, filterText, localizedBookNames),
      );
    });
    return filtered;
  }, [booksByGroup, filterText, localizedBookNames]);

  /**
   * Flat array of currently-visible (non-collapsed, post-filter) books. Used for keyboard nav and
   * shift-click ranges.
   */
  const flatVisibleBooks = useMemo(
    () =>
      GROUP_SECTIONS.flatMap((section) =>
        collapsedGroups.has(section) ? [] : filteredBooksByGroup[section],
      ),
    [filteredBooksByGroup, collapsedGroups],
  );

  // Reset the shift-click anchor whenever the visible set changes — a stale anchor in
  // a now-hidden group would silently produce a surprisingly large range.
  useEffect(() => {
    anchorIndexRef.current = undefined;
  }, [flatVisibleBooks]);

  const totalVisible = flatVisibleBooks.length;

  const handleToggleGroupCollapse = (section: Section) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  const toggleBook = useCallback(
    (bookId: string) => {
      onChangeSelectedBookIds(
        selectedSet.has(bookId)
          ? selectedBookIds.filter((id) => id !== bookId)
          : [...selectedBookIds, bookId],
      );
    },
    [selectedBookIds, selectedSet, onChangeSelectedBookIds],
  );

  /**
   * Toggles a contiguous range of books between the shift-click anchor and the clicked book. The
   * final state for every book in the range mirrors whatever the anchor would become when toggled —
   * extending a select extends with select, extending a deselect extends with deselect.
   */
  const toggleRange = useCallback(
    (anchorIndex: number, targetIndex: number) => {
      const start = Math.min(anchorIndex, targetIndex);
      const end = Math.max(anchorIndex, targetIndex);
      const range = flatVisibleBooks.slice(start, end + 1);
      if (range.length === 0) return;
      const anchorBook = flatVisibleBooks[anchorIndex];
      // Anchor's NEW state after toggling drives the bulk action: if the anchor was
      // unselected, the gesture selects everything in the range (and vice versa).
      const select = anchorBook ? !selectedSet.has(anchorBook) : true;
      const next = new Set(selectedBookIds);
      range.forEach((bookId) => {
        if (select) next.add(bookId);
        else next.delete(bookId);
      });
      onChangeSelectedBookIds([...next]);
    },
    [flatVisibleBooks, selectedSet, selectedBookIds, onChangeSelectedBookIds],
  );

  const handlePillClick = (event: MouseEvent, bookId: string, flatIndex: number) => {
    if (event.shiftKey && anchorIndexRef.current !== undefined) {
      toggleRange(anchorIndexRef.current, flatIndex);
      return;
    }
    anchorIndexRef.current = flatIndex;
    toggleBook(bookId);
  };

  const handleToggleAllInGroup = (section: Section) => {
    const groupBooks = filteredBooksByGroup[section];
    if (groupBooks.length === 0) return;
    const allSelected = groupBooks.every((bookId) => selectedSet.has(bookId));
    const next = new Set(selectedBookIds);
    if (allSelected) {
      groupBooks.forEach((bookId) => next.delete(bookId));
    } else {
      groupBooks.forEach((bookId) => next.add(bookId));
    }
    onChangeSelectedBookIds([...next]);
  };

  const handleSelectAll = () => {
    onChangeSelectedBookIds(availableBookIds.slice());
  };

  const handleClearAll = () => {
    onChangeSelectedBookIds([]);
  };

  // Roving tabindex / arrow-key navigation across the visible pills. Down / Up step
  // by the current column count so the cursor moves intuitively even in the multi-
  // column grid layout.
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [columns, setColumns] = useState(2);
  // React's ref API uses `null` for "not attached yet" — there is no `undefined`
  // equivalent. Same for the array of pill button refs assigned by ref callbacks.
  // eslint-disable-next-line no-null/no-null
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  // eslint-disable-next-line no-null/no-null
  const firstUlRef = useRef<HTMLUListElement>(null);

  // Measure the actual column count from the rendered DOM so arrow-key navigation
  // matches whatever CSS grid produced at the current container width.
  useEffect(() => {
    const ul = firstUlRef.current;
    if (!ul) return undefined;
    const measure = () => {
      const lis = ul.querySelectorAll<HTMLLIElement>(':scope > li');
      if (lis.length === 0) return;
      const firstTop = lis[0].offsetTop;
      // findIndex returns the first li that has wrapped to a new row — that index
      // is the column count. -1 means every li shares the first row's offsetTop,
      // i.e. there's only a single row, so the count is the total length.
      const wrapIndex = Array.from(lis).findIndex((li) => li.offsetTop !== firstTop);
      const cols = wrapIndex === -1 ? lis.length : wrapIndex;
      if (cols > 0) setColumns(cols);
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(measure);
    ro.observe(ul);
    return () => ro.disconnect();
  }, [totalVisible]);

  useEffect(() => {
    setFocusedIndex((prev) => {
      if (totalVisible === 0) return 0;
      return Math.min(prev, totalVisible - 1);
    });
  }, [totalVisible]);

  const moveFocus = (nextIdx: number) => {
    if (totalVisible === 0) return;
    const clamped = Math.max(0, Math.min(totalVisible - 1, nextIdx));
    setFocusedIndex(clamped);
    buttonRefs.current[clamped]?.focus();
  };

  const onGridKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        moveFocus(focusedIndex + 1);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        moveFocus(focusedIndex - 1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        moveFocus(focusedIndex + columns);
        break;
      case 'ArrowUp':
        event.preventDefault();
        moveFocus(focusedIndex - columns);
        break;
      case 'Home':
        event.preventDefault();
        moveFocus(0);
        break;
      case 'End':
        event.preventDefault();
        moveFocus(totalVisible - 1);
        break;
      default:
        break;
    }
  };

  // The flatVisibleBooks index where each group's pills start in the rendered grid;
  // used to translate (group, withinGroup) to the flat keyboard / shift-click index.
  const groupStarts = useMemo(() => {
    const starts = new Map<Section, number>();
    let sum = 0;
    GROUP_SECTIONS.forEach((section) => {
      starts.set(section, sum);
      if (!collapsedGroups.has(section)) sum += filteredBooksByGroup[section].length;
    });
    return starts;
  }, [filteredBooksByGroup, collapsedGroups]);

  const renderGroupHeader = (section: Section) => {
    const groupBooks = filteredBooksByGroup[section];
    const groupSelectedCount = groupBooks.reduce(
      (acc, bookId) => (selectedSet.has(bookId) ? acc + 1 : acc),
      0,
    );
    const allSelected = groupBooks.length > 0 && groupSelectedCount === groupBooks.length;
    let checkState: boolean | 'indeterminate' = false;
    if (allSelected) checkState = true;
    else if (groupSelectedCount > 0) checkState = 'indeterminate';
    const collapsed = collapsedGroups.has(section);
    const Chevron = collapsed ? ChevronRight : ChevronDown;
    const groupLabel = getSectionLongName(section, otLong, ntLong, dcLong, extraLong);

    return (
      <div className="tw-sticky tw-top-0 tw-z-10 tw-flex tw-items-center tw-gap-2 tw-bg-background tw-pt-1">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleToggleGroupCollapse(section)}
          aria-expanded={!collapsed}
          className="tw-h-6 tw-flex-1 tw-justify-start tw-gap-1 tw-px-2 tw-text-[11px] tw-font-semibold tw-uppercase tw-tracking-wider tw-text-muted-foreground hover:tw-text-foreground"
        >
          <Chevron className="tw-h-3.5 tw-w-3.5" aria-hidden />
          <span>{groupLabel}</span>
          <span className="tw-ms-1 tw-font-normal tw-normal-case tw-tracking-normal tw-text-muted-foreground/70">
            ({groupBooks.length})
          </span>
        </Button>
        {/* Per-group select-all replaces the OT/NT/DC/Extra section buttons on the
            classic BookSelector: tristate (off / indeterminate / all) with hover-tooltip
            spelling out the action for screen-reader / mouse-only users. */}
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="tw-flex tw-shrink-0 tw-items-center">
              <Checkbox
                checked={checkState}
                onCheckedChange={() => handleToggleAllInGroup(section)}
                disabled={groupBooks.length === 0}
                aria-label={`${selectAllText} – ${groupLabel}`}
              />
            </span>
          </TooltipTrigger>
          <TooltipContent>{`${selectAllText} – ${groupLabel}`}</TooltipContent>
        </Tooltip>
      </div>
    );
  };

  /**
   * Splits a section's filtered books into render-time sub-groups. When `groupByCategory` is true
   * and the section has a category list (OT, NT), books are partitioned by category in the
   * canonical category order; otherwise the section produces a single un-categorized sub-group.
   * Empty categories are dropped so we don't render headers for nothing.
   */
  const getSubgroupsForSection = useCallback(
    (
      section: Section,
      sectionBooks: string[],
    ): Array<{ category?: BookCategory; books: string[] }> => {
      const categoryOrder = groupByCategory ? CATEGORIES_BY_SECTION[section] : undefined;
      if (!categoryOrder) return [{ books: sectionBooks }];
      const buckets = new Map<BookCategory, string[]>(categoryOrder.map((cat) => [cat, []]));
      sectionBooks.forEach((bookId) => {
        const cat = BOOK_TO_CATEGORY[bookId];
        const bucket = cat ? buckets.get(cat) : undefined;
        if (bucket) bucket.push(bookId);
      });
      return categoryOrder
        .map((cat) => ({ category: cat, books: buckets.get(cat) ?? [] }))
        .filter((sub) => sub.books.length > 0);
    },
    [groupByCategory],
  );

  const handleToggleAllInCategory = (booksInCategory: string[]) => {
    if (booksInCategory.length === 0) return;
    const allSelected = booksInCategory.every((bookId) => selectedSet.has(bookId));
    const next = new Set(selectedBookIds);
    if (allSelected) {
      booksInCategory.forEach((bookId) => next.delete(bookId));
    } else {
      booksInCategory.forEach((bookId) => next.add(bookId));
    }
    onChangeSelectedBookIds([...next]);
  };

  const renderCategoryHeader = (category: BookCategory, booksInCategory: string[]) => {
    const { key, fallback } = CATEGORY_STRING_KEYS[category];
    const label = localizedStrings[key] ?? fallback;
    const selectedCount = booksInCategory.reduce(
      (acc, bookId) => (selectedSet.has(bookId) ? acc + 1 : acc),
      0,
    );
    const allSelected = booksInCategory.length > 0 && selectedCount === booksInCategory.length;
    let checkState: boolean | 'indeterminate' = false;
    if (allSelected) checkState = true;
    else if (selectedCount > 0) checkState = 'indeterminate';

    return (
      <div className="tw-mt-1 tw-flex tw-items-center tw-gap-2 tw-ps-2">
        <span className="tw-flex-1 tw-text-[10px] tw-font-medium tw-uppercase tw-tracking-wide tw-text-muted-foreground/80">
          {label}
          <span className="tw-ms-1 tw-font-normal tw-normal-case tw-tracking-normal tw-text-muted-foreground/60">
            ({booksInCategory.length})
          </span>
        </span>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="tw-flex tw-shrink-0 tw-items-center">
              <Checkbox
                checked={checkState}
                onCheckedChange={() => handleToggleAllInCategory(booksInCategory)}
                aria-label={`${selectAllText} – ${label}`}
              />
            </span>
          </TooltipTrigger>
          <TooltipContent>{`${selectAllText} – ${label}`}</TooltipContent>
        </Tooltip>
      </div>
    );
  };

  const renderPill = (bookId: string, flatIndex: number) => {
    const isSelected = selectedSet.has(bookId);
    return (
      <button
        ref={(el) => {
          buttonRefs.current[flatIndex] = el;
        }}
        type="button"
        tabIndex={flatIndex === focusedIndex ? 0 : -1}
        aria-pressed={isSelected}
        onClick={(event) => handlePillClick(event, bookId, flatIndex)}
        onFocus={() => setFocusedIndex(flatIndex)}
        className={cn(
          'tw-flex tw-w-full tw-items-center tw-gap-2 tw-rounded tw-border tw-px-2 tw-py-1 tw-text-start tw-text-sm',
          'tw-transition-colors hover:tw-bg-accent hover:tw-text-accent-foreground',
          'focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1',
          isSelected ? 'tw-border-primary tw-bg-primary/10 tw-text-primary' : 'tw-border-input',
        )}
      >
        <Checkbox
          checked={isSelected}
          tabIndex={-1}
          aria-hidden
          className="tw-pointer-events-none tw-shrink-0"
        />
        <span className="tw-shrink-0">{bookId}</span>
        <span className="tw-min-w-0 tw-truncate tw-text-muted-foreground">
          {getLocalizedBookName(bookId, localizedBookNames)}
        </span>
      </button>
    );
  };

  const visibleGroups = GROUP_SECTIONS.filter(
    (section) => filteredBooksByGroup[section].length > 0,
  );
  const showEmptyState = visibleGroups.length === 0;

  return (
    // Local TooltipProvider so the per-group select-all checkbox tooltip works even when this
    // component is rendered outside of an ambient provider (e.g. inside the radio-variant
    // ScopeSelector which doesn't ship one of its own).
    <TooltipProvider delayDuration={300} disableHoverableContent>
      <div className="tw-space-y-2">
        <div className="tw-flex tw-flex-wrap tw-items-center tw-gap-2">
          <Input
            value={filterText}
            onChange={(event) => setFilterText(event.target.value)}
            placeholder={searchBooksText}
            className="tw-h-8 tw-min-w-0 tw-flex-1"
          />
          <Button variant="ghost" size="sm" onClick={handleSelectAll}>
            {selectAllText}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleClearAll}>
            {clearAllText}
          </Button>
        </div>

        {/* role="grid" is the appropriate ARIA role for a 2D collection of selectable items
          and lets us attach a keyboard handler without tripping
          jsx-a11y/no-static-element-interactions. The pills inside are buttons, so they
          remain individually focusable; the wrapper handler only forwards arrow keys. */}
        <div
          role="grid"
          tabIndex={-1}
          onKeyDown={onGridKeyDown}
          className="tw-flex tw-max-h-80 tw-min-h-0 tw-flex-col tw-overflow-auto tw-rounded-md tw-border tw-p-1"
        >
          {showEmptyState ? (
            <div className="tw-py-6 tw-text-center tw-text-sm tw-text-muted-foreground">
              {noBookFoundText}
            </div>
          ) : (
            visibleGroups.map((section, groupIdx) => {
              const groupBooks = filteredBooksByGroup[section];
              const collapsed = collapsedGroups.has(section);
              const groupStart = groupStarts.get(section) ?? 0;
              const subgroups = getSubgroupsForSection(section, groupBooks);
              // Cumulative offset of each sub-group's first pill into the section's flat
              // book list — used to compute the global flat index for keyboard nav.
              let subgroupOffset = 0;
              return (
                <section key={section} className="tw-flex tw-flex-col">
                  {renderGroupHeader(section)}
                  {!collapsed &&
                    subgroups.map((subgroup, subgroupIdx) => {
                      const startWithinSection = subgroupOffset;
                      subgroupOffset += subgroup.books.length;
                      // Attach `firstUlRef` to the very first rendered ul (first section's
                      // first sub-group). The measurement assumes a sub-group with at least
                      // enough books to wrap at the smallest breakpoint (2 cols); both
                      // entry points satisfy that — Pentateuch (5) for OT, Gospels (4) for
                      // NT-only filter results.
                      const isFirstUl = groupIdx === 0 && subgroupIdx === 0;
                      // Sections without category sub-grouping (DC, Extra, or `groupByCategory=false`)
                      // produce a single un-categorized sub-group per section, so `__flat-0` is
                      // unique within the section's list of subgroups. The eslint exception that
                      // would otherwise fire for using an index here doesn't trigger because the
                      // index isn't the sole key — it's the fallback for a stable empty-category.
                      return (
                        <div key={subgroup.category ?? `__flat-${subgroupIdx}`}>
                          {subgroup.category &&
                            renderCategoryHeader(subgroup.category, subgroup.books)}
                          <ul
                            ref={isFirstUl ? firstUlRef : undefined}
                            className={cn(
                              'tw-mt-0.5 tw-grid tw-auto-rows-min tw-gap-1',
                              'tw-grid-cols-2 [@media(min-width:560px)]:tw-grid-cols-3 [@media(min-width:720px)]:tw-grid-cols-4',
                            )}
                          >
                            {subgroup.books.map((bookId, withinSubgroup) => (
                              <li key={bookId}>
                                {renderPill(
                                  bookId,
                                  groupStart + startWithinSection + withinSubgroup,
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                </section>
              );
            })
          )}
        </div>

        {selectedBookIds.length > 0 && (
          <div className="tw-mt-2 tw-flex tw-flex-wrap tw-gap-1">
            {selectedBookIds
              .slice(
                0,
                selectedBookIds.length === MAX_VISIBLE_BADGES
                  ? MAX_VISIBLE_BADGES
                  : VISIBLE_BADGES_COUNT,
              )
              .map((bookId) => (
                <Badge className="hover:tw-bg-secondary" key={bookId} variant="secondary">
                  {getLocalizedBookName(bookId, localizedBookNames)}
                </Badge>
              ))}
            {selectedBookIds.length > MAX_VISIBLE_BADGES && (
              <Badge
                className="hover:tw-bg-secondary"
                variant="secondary"
              >{`+${selectedBookIds.length - VISIBLE_BADGES_COUNT} ${moreText}`}</Badge>
            )}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

export default BookGridSelector;
