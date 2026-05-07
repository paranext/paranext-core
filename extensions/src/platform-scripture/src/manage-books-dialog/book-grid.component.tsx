/**
 * Book grid pill selector ported from paranext-core PR #2224 (`ManageBooksDialogViewListSelect`
 * story). Renders a multi-column responsive grid of bordered pill cards instead of a single-column
 * list, with per-group collapsible headers, a per-group select-all checkbox, and column-aware
 * keyboard navigation.
 *
 * Source of truth: lib/platform-bible-react/src/stories/advanced/manage-books-dialog.stories.tsx @
 * ref 1706c716f105b61bebbb1ff97dc56e766ee4412d, lines ~5121–6045.
 *
 * Adaptations from the storybook source:
 *
 * - Replaced inline mock book constants with the canonical `getSectionForBook` from
 *   `platform-bible-utils`, switching on the resulting `Section` enum.
 * - All user-facing text is sourced from a `localizedStrings` map (no hard- coded English) so the
 *   component participates in PT10 localization.
 * - The pill `<li>` carries the canonical `data-book` / `aria-checked` / `role="option"` attributes
 *   the existing WP-001 functional tests rely on; the inner `<button>` handles the keyboard / click
 *   logic.
 * - `BookGridSelector` exposes `aria-label` and `aria-multiselectable` on the container `<ul>` to
 *   preserve the listbox role.
 * - Tooltips render only at the pill level to keep accessible-name resolution deterministic for
 *   WP-001 tests.
 */

import {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AlertTriangle, Ban, ChevronDown, ChevronRight, X } from 'lucide-react';
import { Canon } from '@sillsdev/scripture';
import {
  Badge,
  Button,
  Checkbox,
  cn,
  Label,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from 'platform-bible-react';
import { getSectionForBook, Section } from 'platform-bible-utils';

/* ------------------------------------------------------------------ */
/* Public types                                                       */
/* ------------------------------------------------------------------ */

/**
 * Tone variants for a pill — drive the comparison badge color in Copy / Import modes. `'neutral'`
 * means no badge (Show / Create / Delete).
 */
export type BookGridTone = 'neutral' | 'older' | 'newer' | 'new' | 'same';

/** Grouping mode for the pill grid. */
export type BookGridGroupBy = 'canon' | 'status' | 'none';

/** A single book entry rendered as a pill in the grid. */
export type BookGridItem = {
  /** USFM 3-letter book id (`'GEN'`, `'EXO'`, …). */
  book: string;
  /**
   * Whether the book currently exists in the (destination) project. Drives the pill's color +
   * status dot.
   */
  present: boolean;
  /** Drives the comparison-badge variant (none if `'neutral'`). */
  tone: Exclude<BookGridTone, 'hidden'>;
  /**
   * Used as the section header when grouping by Status, AND as the badge text (or part of it).
   * Pre-localized by the caller.
   */
  statusLabel: string;
  /**
   * Date shown on the primary tooltip line — typically the destination project's last-modified
   * date.
   */
  primaryDate?: string;
  /** Date shown on the secondary tooltip line — typically the source / file last-modified date. */
  secondaryDate?: string;
  /** Optional trailing slot rendered after the badge — used by Show to expose per-pill actions. */
  trailing?: ReactNode;
  /** When true, render a small monochrome warning glyph for "out of scope". */
  unplanned?: boolean;
  /** When true, render a destructive `X` glyph for "untracked". */
  untracked?: boolean;
  /** When true, the pill is non-toggleable and dimmed. */
  disabled?: boolean;
  /** Optional explanation surfaced in the pill tooltip when the row is disabled. */
  disabledReason?: string;
};

/* ------------------------------------------------------------------ */
/* Pill styling                                                       */
/* ------------------------------------------------------------------ */

/**
 * Base classes shared by every pill, regardless of present/absent state. Exposed so callers that
 * render a non-toggleable variant of the pill (e.g. inside a tooltip preview) can stay visually
 * consistent.
 */
const BOOK_PILL_BASE_CLASS =
  'tw-flex tw-w-full tw-items-center tw-gap-2 tw-rounded tw-border tw-px-2 tw-py-1 tw-text-start';

/**
 * Compose the pill's color/border classes for a given `present` flag. In-project (`present`) books
 * use the accent tone at rest and shift to primary on hover; absent books get a dashed primary
 * outline plus muted text and the same primary hover treatment. Per Sebastian item 24
 * (2026-05-06).
 *
 * NOTE on `hover:tw-bg-primary/90` vs `hover:tw-bg-primary`: the slashless `hover:tw-bg-primary`
 * does not get JIT-compiled in this build pipeline (only the slash variants `/10`, `/70`, `/80`,
 * `/90` are emitted). Using `/90` keeps a near-solid primary on hover while ensuring the rule
 * actually exists in the stylesheet — without it the hover background falls back to the at-rest
 * accent color and the white `text-primary-foreground` becomes unreadable on the light background.
 */
const bookPillClasses = (present: boolean): string =>
  cn(
    BOOK_PILL_BASE_CLASS,
    'tw-transition-colors hover:tw-bg-primary/90 hover:tw-text-primary-foreground',
    present
      ? 'tw-border-primary/40 tw-bg-accent'
      : 'tw-border-dashed tw-border-primary/40 tw-text-muted-foreground',
  );

/* ------------------------------------------------------------------ */
/* Tone / status mapping                                              */
/* ------------------------------------------------------------------ */

/**
 * Map of badge variant per pill tone. `neutral` reuses `outline` for cases where a badge happens to
 * be rendered as a defensive default — Copy/Import normally suppress the badge entirely when `tone
 * === 'neutral'`.
 */
const STATUS_BADGE_VARIANT: Record<
  BookGridTone,
  'default' | 'secondary' | 'destructive' | 'outline'
> = {
  neutral: 'outline',
  older: 'destructive',
  newer: 'default',
  new: 'outline',
  same: 'secondary',
};

/**
 * Group-priority table mirroring the source story's `STATUS_GROUP_PRIORITY`. Lower numbers appear
 * first when grouping by status. Labels not present here default to 50 and keep first-encountered
 * order. The keys match the orchestrator's pre-localized `statusLabel` values.
 */
const STATUS_GROUP_PRIORITY: Record<string, number> = {
  // English
  'In project, tracked': 0,
  'In project, untracked': 1,
  'In project': 2,
  Tracked: 3,
  Untracked: 4,
  'In scope': 5,
  'New - in scope': 10,
  'New - out of scope': 11,
  New: 12,
  Newer: 20,
  Same: 21,
  Older: 22,
  'Out of scope': 80,
  'Not in project': 100,
};

/**
 * Status group labels that should default to collapsed. Mirrors the source story so destructive /
 * risky groups stay tucked away until the user opens them.
 */
const DEFAULT_COLLAPSED_STATUS_GROUPS: ReadonlySet<string> = new Set(['New - out of scope']);

const statusGroupPriority = (label: string): number => STATUS_GROUP_PRIORITY[label] ?? 50;

/**
 * Helper for callers that want to convert a comparison state into a pill tone directly. Mirrors the
 * storybook source behavior — `Missing` / `Failed` collapse to `'hidden'` so the caller can
 * suppress the row entirely.
 */
export function toneForComparisonState(
  state:
    | 'filesAreSame'
    | 'sourceIsNewer'
    | 'sourceIsOlder'
    | 'sourceDoesNotExist'
    | 'destDoesNotExist'
    | 'undetermined',
): BookGridTone | 'hidden' {
  switch (state) {
    case 'sourceIsOlder':
      return 'older';
    case 'sourceIsNewer':
      return 'newer';
    case 'destDoesNotExist':
      return 'new';
    case 'filesAreSame':
      return 'same';
    case 'sourceDoesNotExist':
      return 'hidden';
    default:
      return 'neutral';
  }
}

/* ------------------------------------------------------------------ */
/* Localization plumbing                                              */
/* ------------------------------------------------------------------ */

/**
 * Localized strings consumed by the grid's chrome (group-by toggle, group headers, select-all aria
 * labels, fallback tooltips). Workflows that already track a localized string map can pass a
 * partial map; missing entries fall back to English.
 */
export type BookGridLocalizedStrings = {
  groupByCanon?: string;
  groupByStatus?: string;
  groupByNone?: string;
  groupByLabel?: string;
  /** Label for the canon-grouping bucket containing the OT books. */
  canonGroupOT?: string;
  /** Label for the canon-grouping bucket containing the NT books. */
  canonGroupNT?: string;
  /** Label for the canon-grouping bucket containing deuterocanonical books. */
  canonGroupDC?: string;
  /** Label for the canon-grouping bucket containing FRT/BAK/XX */
  canonGroupExtra?: string;
  /**
   * Template for the group-level select-all checkbox aria label, with a `{0}` placeholder that
   * receives the group name.
   */
  selectAllInGroup?: string;
  /** Tooltip text for the out-of-scope warning glyph and tooltip line. */
  outOfScope?: string;
  /** Tooltip line shown for untracked rows. */
  untracked?: string;
  /** Filter-input placeholder. */
  filterPlaceholder?: string;
};

const fmt = (template: string, ...values: ReadonlyArray<string | number>): string =>
  template.replace(/\{(\d+)\}/g, (_, idx) => {
    const v = values[Number(idx)];
    return v === undefined ? '' : String(v);
  });

/* ------------------------------------------------------------------ */
/* Group-by toggle (radio)                                            */
/* ------------------------------------------------------------------ */

export function BookGridGroupByToggle({
  value,
  onChange,
  localizedStrings,
}: {
  value: BookGridGroupBy;
  onChange: (next: BookGridGroupBy) => void;
  localizedStrings?: BookGridLocalizedStrings;
}) {
  const labels = {
    canon: localizedStrings?.groupByCanon ?? 'Canon',
    status: localizedStrings?.groupByStatus ?? 'Status',
    none: localizedStrings?.groupByNone ?? 'None',
    groupBy: localizedStrings?.groupByLabel ?? 'Group by',
  };
  const itemClass =
    'tw-h-6 tw-px-2 tw-text-xs data-[state=on]:!tw-bg-background data-[state=on]:tw-shadow-sm';
  return (
    <div className="tw-flex tw-shrink-0 tw-items-center tw-gap-2" data-testid="book-grid-groupby">
      <Label className="tw-hidden tw-shrink-0 tw-text-xs tw-text-muted-foreground [@media(min-width:640px)]:tw-block">
        {labels.groupBy}
      </Label>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v) => {
          if (v === 'canon' || v === 'status' || v === 'none') onChange(v);
        }}
        className="tw-shrink-0 tw-rounded-lg tw-bg-muted tw-p-1"
        aria-label={labels.groupBy}
      >
        <ToggleGroupItem
          value="status"
          className={itemClass}
          data-testid="book-grid-groupby-status"
        >
          {labels.status}
        </ToggleGroupItem>
        <ToggleGroupItem value="canon" className={itemClass} data-testid="book-grid-groupby-canon">
          {labels.canon}
        </ToggleGroupItem>
        <ToggleGroupItem
          value="none"
          className={itemClass}
          aria-label={labels.none}
          data-testid="book-grid-groupby-none"
        >
          <Ban className="tw-h-3.5 tw-w-3.5" aria-hidden />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* BookGridSelector — multi-column pill grid                          */
/* ------------------------------------------------------------------ */

export type BookGridSelectorProps = {
  items: BookGridItem[];
  selected: Set<string>;
  onToggle: (book: string) => void;
  groupBy: BookGridGroupBy;
  /** When provided, used as the `aria-label` on the listbox container. */
  ariaLabel?: string;
  /** Forwarded as `aria-multiselectable` on the listbox; defaults to true. */
  ariaMultiselectable?: boolean;
  /** If provided, the pill tooltip shows `<primaryDateLabel>: <item.primaryDate ?? '—'>`. */
  primaryDateLabel?: string;
  /** If provided, the pill tooltip shows `<secondaryDateLabel>: <item.secondaryDate ?? '—'>`. */
  secondaryDateLabel?: string;
  /** When false, pills render as non-interactive `<div>`s (Show Books mode). */
  interactive?: boolean;
  /** Extra classes merged into the scroll container's className. */
  contentClassName?: string;
  /** Localization map for chrome strings (see `BookGridLocalizedStrings`). */
  localizedStrings?: BookGridLocalizedStrings;
  /** Optional renderer for the count text shown next to a group's title. */
  renderGroupCount?: (label: string, filteredItems: BookGridItem[]) => ReactNode;
  /** Predicate run on each group label; returning true hides the group's select-all checkbox. */
  hideGroupSelectAll?: (label: string | undefined) => boolean;
  /** Bulk-toggle handler for shift-click range selection. */
  onRangeToggle?: (books: string[], select: boolean) => void;
  /**
   * Optional renderer that supplies a row-level accessible label for screen readers — e.g. "Select
   * Genesis". When omitted, the inner `<button>` is given a fallback aria-label of the book id.
   */
  getRowAriaLabel?: (item: BookGridItem) => string;
};

export function BookGridSelector({
  items,
  selected,
  onToggle,
  groupBy,
  ariaLabel,
  ariaMultiselectable = true,
  primaryDateLabel,
  secondaryDateLabel,
  interactive = true,
  contentClassName,
  localizedStrings,
  renderGroupCount,
  hideGroupSelectAll,
  onRangeToggle,
  getRowAriaLabel,
}: BookGridSelectorProps) {
  const groups = useMemo<{ label?: string; items: BookGridItem[] }[]>(() => {
    if (groupBy === 'none') {
      return items.length === 0 ? [] : [{ items }];
    }
    if (groupBy === 'canon') {
      const ot: BookGridItem[] = [];
      const nt: BookGridItem[] = [];
      const dc: BookGridItem[] = [];
      const extra: BookGridItem[] = [];
      items.forEach((it) => {
        switch (getSectionForBook(it.book)) {
          case Section.OT:
            ot.push(it);
            break;
          case Section.NT:
            nt.push(it);
            break;
          case Section.DC:
            dc.push(it);
            break;
          case Section.Extra:
          default:
            extra.push(it);
            break;
        }
      });
      return [
        { label: localizedStrings?.canonGroupOT ?? 'Old Testament', items: ot },
        { label: localizedStrings?.canonGroupNT ?? 'New Testament', items: nt },
        { label: localizedStrings?.canonGroupDC ?? 'Deuterocanon', items: dc },
        { label: localizedStrings?.canonGroupExtra ?? 'Extra', items: extra },
      ].filter((g) => g.items.length > 0);
    }
    // status grouping
    const order: string[] = [];
    const byLabel = new Map<string, BookGridItem[]>();
    items.forEach((it) => {
      const bucket = byLabel.get(it.statusLabel);
      if (bucket) {
        bucket.push(it);
      } else {
        byLabel.set(it.statusLabel, [it]);
        order.push(it.statusLabel);
      }
    });
    const sortedOrder = order
      .map((label, idx) => ({ label, idx }))
      .sort((a, b) => {
        const pa = statusGroupPriority(a.label);
        const pb = statusGroupPriority(b.label);
        return pa === pb ? a.idx - b.idx : pa - pb;
      })
      .map((entry) => entry.label);
    return sortedOrder.map((label) => ({ label, items: byLabel.get(label) ?? [] }));
  }, [items, groupBy, localizedStrings]);

  // -- collapse state -----------------------------------------------------
  const [userCollapsedGroups, setUserCollapsedGroups] = useState<Set<string>>(() => new Set());
  const [seenGroups, setSeenGroups] = useState<Set<string>>(() => new Set());
  useEffect(() => {
    setSeenGroups((prev) => {
      const next = new Set(prev);
      let changed = false;
      groups.forEach((g) => {
        if (g.label && !next.has(g.label)) {
          next.add(g.label);
          changed = true;
        }
      });
      return changed ? next : prev;
    });
  }, [groups]);
  const toggleCollapsed = (label: string) =>
    setUserCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  const isCollapsed = (label?: string) => {
    if (!label) return false;
    if (seenGroups.has(label)) {
      const defaultCollapsed = DEFAULT_COLLAPSED_STATUS_GROUPS.has(label);
      const userToggled = userCollapsedGroups.has(label);
      return defaultCollapsed !== userToggled;
    }
    return DEFAULT_COLLAPSED_STATUS_GROUPS.has(label);
  };

  // Books participating in keyboard navigation = expanded groups only.
  const flatBooks = useMemo(
    () => groups.flatMap((g) => (isCollapsed(g.label) ? [] : g.items)),
    // `isCollapsed` is a closure over userCollapsedGroups + seenGroups; the
    // hooks-deps rule cannot follow it, so we list those deps explicitly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [groups, userCollapsedGroups, seenGroups],
  );
  const groupStarts = useMemo(() => {
    const starts: number[] = [];
    let sum = 0;
    groups.forEach((g) => {
      starts.push(sum);
      if (!isCollapsed(g.label)) sum += g.items.length;
    });
    return starts;
    // `isCollapsed` is closed over groups + userCollapsedGroups + seenGroups; the
    // hooks rule cannot resolve that, so we list those deps manually here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groups, userCollapsedGroups, seenGroups]);

  // Using null for React ref compatibility
  // eslint-disable-next-line no-null/no-null
  const firstUlRef = useRef<HTMLUListElement>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [columns, setColumns] = useState(2);
  const anchorIndexRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    anchorIndexRef.current = undefined;
  }, [items]);
  const [hoveredGroupLabel, setHoveredGroupLabel] = useState<string | undefined>(undefined);

  // Re-measure columns whenever the visible cell count or grouping changes.
  useEffect(() => {
    const ul = firstUlRef.current;
    if (!ul) return undefined;
    const measure = () => {
      const lis = ul.querySelectorAll<HTMLLIElement>(':scope > li');
      if (lis.length === 0) return;
      const firstTop = lis[0].offsetTop;
      let cols = 0;
      // We need an early-exit `break`, which Array.prototype.forEach can't
      // express — switching to a `for…of` over `Array.from(lis)` keeps the
      // measurement linear without iterating past the first row.
      // eslint-disable-next-line no-restricted-syntax
      for (const li of Array.from(lis)) {
        if (li.offsetTop !== firstTop) break;
        cols += 1;
      }
      if (cols > 0) setColumns(cols);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(ul);
    return () => ro.disconnect();
  }, [flatBooks.length, groups.length]);

  useEffect(() => {
    setFocusedIndex((prev) => {
      if (flatBooks.length === 0) return 0;
      return Math.min(prev, flatBooks.length - 1);
    });
  }, [flatBooks.length]);

  const moveFocus = (nextIdx: number) => {
    if (flatBooks.length === 0) return;
    const clamped = Math.max(0, Math.min(flatBooks.length - 1, nextIdx));
    setFocusedIndex(clamped);
    buttonRefs.current[clamped]?.focus();
  };

  const navKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>, flatIndex: number) => {
    switch (e.key) {
      case 'ArrowRight':
        e.preventDefault();
        moveFocus(flatIndex + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        moveFocus(flatIndex - 1);
        break;
      case 'ArrowDown':
        e.preventDefault();
        moveFocus(flatIndex + columns);
        break;
      case 'ArrowUp':
        e.preventDefault();
        moveFocus(flatIndex - columns);
        break;
      case 'Home':
        e.preventDefault();
        moveFocus(0);
        break;
      case 'End':
        e.preventDefault();
        moveFocus(flatBooks.length - 1);
        break;
      default:
        break;
    }
  };

  // Wider pills when a comparison badge OR an out-of-scope warning glyph could
  // render. The extension's Tailwind compile pass doesn't reliably emit the
  // arbitrary-media variants (`[@media(min-width:N)]:tw-grid-cols-K`) the
  // storybook source uses, so we fall through to a CSS Grid `auto-fill +
  // minmax()` track so the grid naturally lays out as many columns as fit at
  // the current container width — Outlook-style. The minmax minimum tracks
  // pill content (book code + dot + optional badge) and is widened when the
  // pill carries a comparison badge or warning glyph.
  const anyBadges = items.some((it) => it.tone !== 'neutral');
  const anyUnplanned = items.some((it) => it.unplanned);
  const needsWiderPills = anyBadges || anyUnplanned;
  // Minimum-width thresholds chosen to roughly match the source story's
  // breakpoint table at common Manage Books widths:
  //   • narrow (<560px) → 2 cols
  //   • mid (~720px)    → 3 cols
  //   • wide (~900px)   → 4 cols
  //   • full (~1200px+) → 5 cols
  // 200px / 260px minimums hit those targets via auto-fill+minmax without
  // needing media queries the extension's Tailwind compile pass doesn't emit.
  const gridStyle: CSSProperties = {
    gridTemplateColumns: `repeat(auto-fill, minmax(${needsWiderPills ? 260 : 200}px, 1fr))`,
  };

  const outOfScopeText = localizedStrings?.outOfScope ?? 'Out of scope';
  const untrackedText = localizedStrings?.untracked ?? 'Untracked';
  const selectAllTemplate = localizedStrings?.selectAllInGroup ?? 'Select all in {0}';

  const renderPill = (item: BookGridItem, flatIndex: number) => {
    const isSelected = selected.has(item.book);
    const showBadge = item.tone !== 'neutral';
    const badgeClass =
      'tw-ml-auto tw-shrink-0 tw-whitespace-nowrap tw-px-1.5 tw-py-0 tw-text-[10px] tw-leading-tight';
    const badgeLabel =
      item.statusLabel === 'New' || item.statusLabel.startsWith('New -') ? 'New' : item.statusLabel;
    const badge = showBadge ? (
      <Badge variant={STATUS_BADGE_VARIANT[item.tone]} className={badgeClass}>
        {badgeLabel}
      </Badge>
    ) : undefined;

    const dot = (
      <span
        aria-hidden
        className={cn(
          'tw-inline-block tw-h-2.5 tw-w-2.5 tw-shrink-0 tw-rounded-full',
          item.present ? 'tw-bg-primary' : 'tw-bg-muted',
        )}
      />
    );

    const unplannedIcon = item.unplanned ? (
      <span
        aria-label={outOfScopeText}
        className="tw-inline-flex tw-h-3.5 tw-w-3.5 tw-shrink-0 tw-items-center tw-justify-center tw-text-muted-foreground"
      >
        <AlertTriangle className="tw-h-3.5 tw-w-3.5" aria-hidden />
      </span>
    ) : undefined;

    const body = (
      <>
        {interactive && (
          <Checkbox
            checked={isSelected}
            tabIndex={-1}
            aria-hidden
            className="tw-pointer-events-none tw-shrink-0"
          />
        )}
        {dot}
        <span className="tw-shrink-0 tw-font-medium">{item.book}</span>
        {unplannedIcon}
        {badge}
        {item.trailing}
      </>
    );

    const englishName = Canon.bookIdToEnglishName(item.book) || item.book;
    const isRedundantStatus =
      item.statusLabel === 'In scope' ||
      item.statusLabel === 'Out of scope' ||
      item.statusLabel === 'In project' ||
      item.statusLabel === 'Not in project';
    const tooltipContent = (
      <div className="tw-flex tw-flex-col tw-gap-0.5 tw-text-xs">
        <div className="tw-font-semibold">{englishName}</div>
        {!showBadge && !isRedundantStatus && (
          <div className="tw-inline-flex tw-items-center tw-gap-1">
            {item.untracked && (
              <X className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-destructive" aria-hidden />
            )}
            <span>{item.untracked ? untrackedText : item.statusLabel}</span>
          </div>
        )}
        {item.unplanned && (
          <div className="tw-inline-flex tw-items-center tw-gap-1">
            <AlertTriangle
              className="tw-h-3 tw-w-3 tw-shrink-0 tw-text-muted-foreground"
              aria-hidden
            />
            <span>{outOfScopeText}</span>
          </div>
        )}
        {item.primaryDate !== undefined && primaryDateLabel !== undefined && (
          <div>
            {primaryDateLabel}: {item.primaryDate}
          </div>
        )}
        {item.secondaryDate !== undefined && secondaryDateLabel !== undefined && (
          <div>
            {secondaryDateLabel}: {item.secondaryDate}
          </div>
        )}
        {item.disabled && item.disabledReason && (
          <div className="tw-text-muted-foreground">{item.disabledReason}</div>
        )}
      </div>
    );

    if (!interactive) {
      const plain = <div className={bookPillClasses(item.present)}>{body}</div>;
      return (
        <Tooltip>
          <TooltipTrigger asChild>{plain}</TooltipTrigger>
          <TooltipContent side="bottom" align="end">
            {tooltipContent}
          </TooltipContent>
        </Tooltip>
      );
    }

    const button = (
      <button
        ref={(el) => {
          buttonRefs.current[flatIndex] = el;
        }}
        type="button"
        tabIndex={flatIndex === focusedIndex ? 0 : -1}
        aria-pressed={isSelected}
        aria-disabled={item.disabled || undefined}
        aria-label={getRowAriaLabel ? getRowAriaLabel(item) : item.book}
        disabled={item.disabled}
        onClick={(e) => {
          if (item.disabled) return;
          if (e.shiftKey && onRangeToggle && anchorIndexRef.current !== undefined) {
            const anchor = anchorIndexRef.current;
            const start = Math.min(anchor, flatIndex);
            const end = Math.max(anchor, flatIndex);
            const anchorBook = flatBooks[anchor]?.book;
            const select = anchorBook ? selected.has(anchorBook) : true;
            const range: string[] = [];
            for (let i = start; i <= end; i += 1) {
              const it = flatBooks[i];
              // Skip empty / disabled entries while keeping the loop's index
              // advance natural; restructuring this as a filter+map would
              // require a second array allocation per click.
              // eslint-disable-next-line no-continue
              if (!it || it.disabled) continue;
              range.push(it.book);
            }
            if (range.length > 0) onRangeToggle(range, select);
            return;
          }
          anchorIndexRef.current = flatIndex;
          onToggle(item.book);
        }}
        onKeyDown={(e) => {
          if (item.disabled) return;
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            anchorIndexRef.current = flatIndex;
            onToggle(item.book);
            return;
          }
          navKeyDown(e, flatIndex);
        }}
        onFocus={() => setFocusedIndex(flatIndex)}
        className={cn(
          bookPillClasses(item.present),
          'tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1',
          isSelected && 'tw-text-accent-foreground',
          item.disabled && 'tw-cursor-not-allowed tw-opacity-50',
        )}
      >
        {body}
      </button>
    );
    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent side="bottom" align="end">
          {tooltipContent}
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <div
      className={cn(
        'tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-overflow-auto tw-p-1',
        contentClassName,
      )}
    >
      {groups.map((group, gi) => {
        const collapsed = isCollapsed(group.label);
        const groupBooks = group.items.map((it) => it.book);
        const groupSelectedCount = groupBooks.reduce(
          (acc, book) => (selected.has(book) ? acc + 1 : acc),
          0,
        );
        const allSelected = groupBooks.length > 0 && groupSelectedCount === groupBooks.length;
        const computeHeaderCheckState = (): boolean | 'indeterminate' => {
          if (groupSelectedCount === 0) return false;
          if (allSelected) return true;
          return 'indeterminate';
        };
        const headerCheckState: boolean | 'indeterminate' = computeHeaderCheckState();
        const toggleAllInGroup = () => {
          if (allSelected) {
            groupBooks.forEach((book) => onToggle(book));
          } else {
            groupBooks.filter((book) => !selected.has(book)).forEach((book) => onToggle(book));
          }
        };
        const Chevron = collapsed ? ChevronRight : ChevronDown;
        // The single-group "no header" case still renders its <ul> so the grid
        // measurement / nav code has something to point at, but the header is
        // skipped entirely when grouping is `'none'`.
        const showHeader = !!group.label;
        const selectAllAria = group.label ? fmt(selectAllTemplate, group.label) : '';
        return (
          <section
            key={group.label ?? 'all'}
            className="tw-flex tw-flex-col"
            data-testid={group.label ? `book-grid-group-${group.label}` : 'book-grid-group-all'}
          >
            {showHeader && (
              <div
                className={cn(
                  'tw-sticky tw-top-0 tw-z-10 tw-flex tw-items-center tw-gap-2 tw-bg-background',
                  gi === 0 ? 'tw-pt-0' : 'tw-pt-1',
                )}
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => group.label && toggleCollapsed(group.label)}
                  aria-expanded={!collapsed}
                  className="tw-h-6 tw-flex-1 tw-justify-start tw-gap-1 tw-px-2 tw-text-[11px] tw-font-semibold tw-uppercase tw-tracking-wider tw-text-muted-foreground hover:tw-text-foreground"
                >
                  <Chevron className="tw-h-3.5 tw-w-3.5" aria-hidden />
                  <span>{group.label}</span>
                  <span className="tw-ml-1 tw-font-normal tw-normal-case tw-tracking-normal tw-text-muted-foreground/70">
                    {renderGroupCount && group.label
                      ? renderGroupCount(group.label, group.items)
                      : `(${group.items.length})`}
                  </span>
                </Button>
                {interactive && !(hideGroupSelectAll?.(group.label) ?? false) && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        onMouseEnter={() => group.label && setHoveredGroupLabel(group.label)}
                        onMouseLeave={() => setHoveredGroupLabel(undefined)}
                        className="tw-flex tw-shrink-0 tw-items-center"
                      >
                        <Checkbox
                          checked={headerCheckState}
                          onCheckedChange={toggleAllInGroup}
                          disabled={groupBooks.length === 0}
                          aria-label={selectAllAria}
                          data-testid={
                            group.label ? `book-grid-group-selectall-${group.label}` : undefined
                          }
                        />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>{selectAllAria}</TooltipContent>
                  </Tooltip>
                )}
              </div>
            )}
            {!collapsed && (
              <ul
                ref={gi === 0 ? firstUlRef : undefined}
                role="listbox"
                aria-label={ariaLabel}
                aria-multiselectable={ariaMultiselectable}
                style={gridStyle}
                className={cn(
                  'tw-grid tw-auto-rows-min tw-gap-1 tw-text-sm',
                  group.label && 'tw-mt-0.5',
                  hoveredGroupLabel === group.label &&
                    '[&_>li>button]:!tw-bg-primary [&_>li>button]:!tw-text-primary-foreground [&_>li>div]:!tw-bg-primary [&_>li>div]:!tw-text-primary-foreground',
                )}
              >
                {group.items.map((item, i) => {
                  const isSelected = selected.has(item.book);
                  return (
                    <li
                      key={item.book}
                      data-book={item.book}
                      role="option"
                      aria-selected={interactive ? isSelected : undefined}
                      aria-checked={interactive ? isSelected : undefined}
                    >
                      {renderPill(item, groupStarts[gi] + i)}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
