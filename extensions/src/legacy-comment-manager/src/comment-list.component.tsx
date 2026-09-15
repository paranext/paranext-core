import { ChevronDown, X } from 'lucide-react';
import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommentList,
  Label,
  Popover,
  PopoverContent,
  PopoverPortalContainerProvider,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Skeleton,
} from 'platform-bible-react';
import { formatReplacementString, LanguageStrings, LocalizeKey } from 'platform-bible-utils';
import { ComponentProps, ReactNode, useState } from 'react';
import {
  areCommentFiltersAtDefault,
  assignmentFilterToLabelKey,
  AUTHOR_FILTER_ALL,
  CommentFilters,
  datePresetFilterToLabelKey,
  DEFAULT_COMMENT_FILTERS,
  isAssignmentFilter,
  isDatePresetFilter,
  isReadFilter,
  isResolvedFilter,
  isScopeFilter,
  isTypeFilter,
  readFilterToLabelKey,
  resolvedFilterToLabelKey,
  ScopeFilter,
  SCOPE_FILTER_CURRENT_CHAPTER,
  scopeFilterToLabelKey,
  toAuthorOptions,
  typeFilterToLabelKey,
  UNFILTERED,
} from './comment-list-filters.model';

/** Extra localization keys this panel needs beyond `COMMENT_LIST_STRING_KEYS`. */
export const COMMENT_LIST_PANEL_EXTRA_STRING_KEYS = [
  '%comment_filter_aria_assignment%',
  '%comment_filter_aria_author%',
  '%comment_filter_aria_date%',
  '%comment_filter_aria_read%',
  '%comment_filter_aria_resolved%',
  '%comment_filter_aria_scope%',
  '%comment_filter_aria_type%',
  '%comment_filter_assignment_all%',
  '%comment_filter_assignment_me%',
  '%comment_filter_assignment_team%',
  '%comment_filter_assignment_unassigned%',
  '%comment_filter_author_all%',
  '%comment_filter_author_no_results%',
  '%comment_filter_author_search_placeholder%',
  '%comment_filter_axis_assignment%',
  '%comment_filter_axis_author%',
  '%comment_filter_axis_date%',
  '%comment_filter_axis_read%',
  '%comment_filter_axis_resolved%',
  '%comment_filter_axis_scope%',
  '%comment_filter_axis_type%',
  '%comment_filter_button%',
  '%comment_filter_chip_clear%',
  '%comment_filter_date_all%',
  '%comment_filter_date_last_30_days%',
  '%comment_filter_date_last_7_days%',
  '%comment_filter_date_today%',
  '%comment_filter_read_all%',
  '%comment_filter_read_read%',
  '%comment_filter_read_unread%',
  '%comment_filter_resolved_all%',
  '%comment_filter_resolved_resolved%',
  '%comment_filter_resolved_unresolved%',
  '%comment_filter_scope_all_books%',
  '%comment_filter_scope_current_chapter%',
  '%comment_filter_type_all%',
  '%comment_filter_type_comments%',
  '%comment_filter_type_conflicts%',
  '%no_comments%',
  '%no_comments_match_filter%',
  '%webView_legacyCommentManager_syncEditBlocked_notice%',
] as const;

/**
 * Slim "editing paused during Send/Receive" notice text shown while this project's sync blocks
 * edits.
 */
const SYNC_BLOCKED_NOTICE_KEY = '%webView_legacyCommentManager_syncEditBlocked_notice%';

// Reuse the underlying CommentList prop types so this panel stays in sync with platform-bible-react.
type CommentListProps = ComponentProps<typeof CommentList>;

export type CommentListPanelProps = Pick<
  CommentListProps,
  | 'threads'
  | 'currentUser'
  | 'handleAddCommentToThread'
  | 'handleUpdateComment'
  | 'handleDeleteComment'
  | 'handleReadStatusChange'
  | 'assignableUsers'
  | 'canUserAddCommentToThread'
  | 'canUserAssignThreadCallback'
  | 'canUserResolveThreadCallback'
  | 'conflictResolution'
  | 'canUserEditOrDeleteCommentCallback'
  | 'selectedThreadId'
  | 'onSelectedThreadChange'
  | 'onVerseRefClick'
> & {
  /** Localized strings for the panel toolbar/empty states and the underlying comment list. */
  localizedStrings: LanguageStrings;
  /** Whether comment threads are still loading (renders skeletons). */
  isLoading: boolean;
  /** Current comment-filter axis selections (controlled; the web view uses them to query threads). */
  filters: CommentFilters;
  /** Called when any comment-filter axis changes. */
  onFiltersChange: (filters: CommentFilters) => void;
  /** Currently selected scope filter (controlled by the web view, which drives the query). */
  scopeFilter: ScopeFilter;
  /** Called when the scope filter changes. */
  onScopeFilterChange: (filter: ScopeFilter) => void;
  /**
   * Whether this list can scope to the "current chapter". True when it follows a live Scripture
   * reference — an editor-anchored list via its wired editor, or the Column 3 panel via the active
   * project's scroll group. When false (e.g. a cross-project open with no matching reference), the
   * "current chapter" scope option is hidden. Defaults to `true`.
   */
  canScopeToCurrentChapter?: boolean;
  /**
   * Whether this project's automatic Send/Receive is currently blocking edits. When true, a slim
   * "editing paused" notice is shown above the list; the write affordances are disabled separately
   * by the web view via the capability callbacks. Defaults to `false`.
   */
  isSyncBlocked?: boolean;
};

/**
 * A single filter dropdown for one axis. Renders each option's localized label and reports the
 * chosen value through `onChange`, narrowed by `isValue` so no unsafe cast is needed. Generic over
 * the axis's value union.
 */
function FilterDropdown<T extends string>({
  value,
  labelKeys,
  isValue,
  onChange,
  localizedStrings,
  ariaLabel,
  hiddenValues,
  testId,
}: {
  value: T;
  labelKeys: Readonly<Record<T, LocalizeKey>>;
  isValue: (value: string) => value is T;
  onChange: (value: T) => void;
  localizedStrings: LanguageStrings;
  /**
   * Accessible name for the trigger. The dropdown's displayed value doubles as its only visible
   * label, so a screen reader would otherwise announce just the value with no indication of which
   * axis it filters.
   */
  ariaLabel: string;
  /** Option values to omit from the list (e.g. a scope that doesn't apply without editor context). */
  hiddenValues?: readonly T[];
  /** Optional stable test hook placed on the trigger (e.g. for the scope dropdown in E2E tests). */
  testId?: string;
}) {
  return (
    <Select
      value={value}
      onValueChange={(next) => {
        if (isValue(next)) onChange(next);
      }}
    >
      <SelectTrigger className="tw:w-full" aria-label={ariaLabel} data-testid={testId}>
        <SelectValue>
          <div className="tw:text-start tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal">
            {localizedStrings[labelKeys[value]]}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="tw:max-w-sm" align="start">
        {Object.keys(labelKeys)
          .filter(isValue)
          .filter((option) => !hiddenValues?.includes(option))
          .map((option) => (
            <SelectItem key={option} value={option}>
              {localizedStrings[labelKeys[option]]}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
}

/** One labelled row in the filters popover. */
function FilterAxisRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="tw:space-y-1">
      <div className="tw:text-xs tw:font-medium tw:text-muted-foreground">{label}</div>
      {children}
    </div>
  );
}

/** Every closed-union comment-filter axis except `author`, whose value is an open set of user names. */
type ClosedAxisKey = Exclude<keyof CommentFilters, 'author'>;

/**
 * One closed-union filter axis, fully bound to its concrete value type at the point where
 * {@link closedAxis} is called. The bound `renderDropdown`/`isAtDefault`/`currentValueLabel`/
 * `cleared` functions below are deliberately non-generic on their public surface: a plain array of
 * `{ key, labelKeys, guard, ... }` records, each generic over a _different_ value union, cannot be
 * iterated with a single generic consumer — `Record<K1, X> | Record<K2, X>` is not the same type as
 * `Record<K1 | K2, X>`, so passing the array element straight into `FilterDropdown<T>` inside a
 * `.map` does not type-check once the element type is widened to the union. Closing over the axis's
 * value type inside each bound function avoids ever needing to re-widen it.
 */
type ClosedAxisDefinition = {
  key: ClosedAxisKey;
  /**
   * Localized axis name (e.g. "Resolved status") — the popover row heading and the chip's dismiss
   * label.
   */
  axisKey: LocalizeKey;
  /** Renders this axis's {@link FilterDropdown}. */
  renderDropdown: (
    filters: CommentFilters,
    localizedStrings: LanguageStrings,
    onFiltersChange: (filters: CommentFilters) => void,
  ) => ReactNode;
  /** True when this axis is at its `'all'` default. */
  isAtDefault: (filters: CommentFilters) => boolean;
  /** This axis's current value, localized — the chip's visible text. */
  currentValueLabel: (filters: CommentFilters, localizedStrings: LanguageStrings) => string;
  /** `filters` with just this axis reset to its default. */
  cleared: (filters: CommentFilters) => CommentFilters;
};

/**
 * Builds a {@link ClosedAxisDefinition}, inferring `K` fresh from this call's own arguments so
 * `labelKeys` and `guard` stay correlated to `key`'s value type — see the type's TSDoc for why that
 * correlation cannot survive being re-derived generically once several axes share one array.
 */
function closedAxis<K extends ClosedAxisKey>({
  key,
  labelKeys,
  guard,
  axisKey,
  ariaKey,
}: {
  key: K;
  labelKeys: Readonly<Record<CommentFilters[K], LocalizeKey>>;
  guard: (value: string) => value is CommentFilters[K];
  axisKey: LocalizeKey;
  ariaKey: LocalizeKey;
}): ClosedAxisDefinition {
  return {
    key,
    axisKey,
    renderDropdown: (filters, localizedStrings, onFiltersChange) => (
      <FilterDropdown
        value={filters[key]}
        labelKeys={labelKeys}
        isValue={guard}
        onChange={(value) => onFiltersChange({ ...filters, [key]: value })}
        localizedStrings={localizedStrings}
        ariaLabel={localizedStrings[ariaKey]}
      />
    ),
    isAtDefault: (filters) => filters[key] === DEFAULT_COMMENT_FILTERS[key],
    currentValueLabel: (filters, localizedStrings) => localizedStrings[labelKeys[filters[key]]],
    cleared: (filters) => ({ ...filters, [key]: DEFAULT_COMMENT_FILTERS[key] }),
  };
}

// Keyed by axis so a new closed-union axis on `CommentFilters` is a compile error here (a missing
// property on a `Record<ClosedAxisKey, ...>` literal) rather than a silently-uncovered axis.
const CLOSED_AXES_BY_KEY: Readonly<Record<ClosedAxisKey, ClosedAxisDefinition>> = {
  resolved: closedAxis({
    key: 'resolved',
    labelKeys: resolvedFilterToLabelKey,
    guard: isResolvedFilter,
    axisKey: '%comment_filter_axis_resolved%',
    ariaKey: '%comment_filter_aria_resolved%',
  }),
  read: closedAxis({
    key: 'read',
    labelKeys: readFilterToLabelKey,
    guard: isReadFilter,
    axisKey: '%comment_filter_axis_read%',
    ariaKey: '%comment_filter_aria_read%',
  }),
  type: closedAxis({
    key: 'type',
    labelKeys: typeFilterToLabelKey,
    guard: isTypeFilter,
    axisKey: '%comment_filter_axis_type%',
    ariaKey: '%comment_filter_aria_type%',
  }),
  assignment: closedAxis({
    key: 'assignment',
    labelKeys: assignmentFilterToLabelKey,
    guard: isAssignmentFilter,
    axisKey: '%comment_filter_axis_assignment%',
    ariaKey: '%comment_filter_aria_assignment%',
  }),
  date: closedAxis({
    key: 'date',
    labelKeys: datePresetFilterToLabelKey,
    guard: isDatePresetFilter,
    axisKey: '%comment_filter_axis_date%',
    ariaKey: '%comment_filter_aria_date%',
  }),
};

/**
 * Closed-union axes in chip/derivation order. Popover row order is laid out explicitly below
 * because it interleaves the author axis, which isn't part of this table.
 */
const CLOSED_AXES: readonly ClosedAxisDefinition[] = [
  CLOSED_AXES_BY_KEY.resolved,
  CLOSED_AXES_BY_KEY.read,
  CLOSED_AXES_BY_KEY.type,
  CLOSED_AXES_BY_KEY.assignment,
  CLOSED_AXES_BY_KEY.date,
];

/** One dismissible chip for an axis that is not at its default value. */
type FilterChip = {
  key: string;
  /** The chip's visible text: the axis's current value, localized. */
  label: string;
  /** Localized axis NAME (not the aria label), used to build the dismiss button's accessible name. */
  axisLabel: string;
  /** The filters object with just this axis reset to its default. */
  cleared: CommentFilters;
};

/**
 * Builds one chip per comment-filter axis that is not at its default. Scope produces no chip: it is
 * not part of {@link CommentFilters}, has its own setter, and stays a plain control in the popover.
 */
function buildFilterChips(
  filters: CommentFilters,
  localizedStrings: LanguageStrings,
): FilterChip[] {
  const chips: FilterChip[] = [];
  CLOSED_AXES.forEach((axis) => {
    if (axis.isAtDefault(filters)) return;
    chips.push({
      key: axis.key,
      label: axis.currentValueLabel(filters, localizedStrings),
      axisLabel: localizedStrings[axis.axisKey],
      cleared: axis.cleared(filters),
    });
  });
  if (filters.author !== AUTHOR_FILTER_ALL) {
    chips.push({
      key: 'author',
      label: filters.author,
      axisLabel: localizedStrings['%comment_filter_axis_author%'],
      cleared: { ...filters, author: AUTHOR_FILTER_ALL },
    });
  }
  return chips;
}

/**
 * Filter dropdown for the open-set author axis: an arbitrary project-user name rather than a value
 * from a closed union, so it cannot use {@link FilterDropdown}'s `Record<T, LocalizeKey>` shape.
 * `CommandInput` narrows a potentially long project user list by search.
 */
function AuthorFilterDropdown({
  value,
  authorOptions,
  onChange,
  localizedStrings,
}: {
  value: string;
  authorOptions: string[];
  onChange: (value: string) => void;
  localizedStrings: LanguageStrings;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const label =
    value === AUTHOR_FILTER_ALL ? localizedStrings['%comment_filter_author_all%'] : value;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          aria-label={localizedStrings['%comment_filter_aria_author%']}
          className="tw:w-full tw:justify-between tw:overflow-hidden tw:font-normal"
        >
          <span className="tw:min-w-0 tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start">
            {label}
          </span>
          <ChevronDown className="tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="tw:w-64 tw:p-0" align="start">
        <Command>
          <CommandInput
            placeholder={localizedStrings['%comment_filter_author_search_placeholder%']}
            // Picker semantics: the option list is the whole point of this control and a leading
            // space in the search box is meaningless, so Space picks the highlighted option.
            spaceSelectsHighlightedItem
          />
          <CommandEmpty>{localizedStrings['%comment_filter_author_no_results%']}</CommandEmpty>
          <CommandList>
            <CommandItem
              value={AUTHOR_FILTER_ALL}
              onSelect={() => {
                onChange(AUTHOR_FILTER_ALL);
                setIsOpen(false);
              }}
            >
              {localizedStrings['%comment_filter_author_all%']}
            </CommandItem>
            {authorOptions.map((author) => (
              <CommandItem
                key={author}
                value={author}
                onSelect={() => {
                  onChange(author);
                  setIsOpen(false);
                }}
              >
                {author}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

/**
 * Presentational half of the comment-list web view: a filter toolbar plus the comment list (or a
 * loading/empty state). All data and PAPI-backed callbacks are supplied by the web view via props;
 * the comment/scope filters are controlled because the web view uses them to query threads.
 *
 * The toolbar is a single "Filters" trigger opening every axis (resolved status, read status, note
 * type, assignment, author, date, scope) in one popover, plus a dismissible chip for each axis that
 * is not at its default; the axes AND together.
 */
export function CommentListPanel({
  localizedStrings,
  isLoading,
  threads,
  currentUser,
  filters,
  onFiltersChange,
  scopeFilter,
  onScopeFilterChange,
  canScopeToCurrentChapter = true,
  isSyncBlocked = false,
  handleAddCommentToThread,
  handleUpdateComment,
  handleDeleteComment,
  handleReadStatusChange,
  assignableUsers,
  canUserAddCommentToThread,
  canUserAssignThreadCallback,
  canUserResolveThreadCallback,
  conflictResolution,
  canUserEditOrDeleteCommentCallback,
  selectedThreadId,
  onSelectedThreadChange,
  onVerseRefClick,
}: CommentListPanelProps) {
  const noFiltersActive = areCommentFiltersAtDefault(filters) && scopeFilter === UNFILTERED;
  // Portal container for popovers opened from WITHIN the filters popover (the author combobox).
  // Radix Popover portals to document.body by default, which would put the author popover's
  // content outside the filters popover's DOM subtree; the filters popover's own outside-click
  // handling would then read a click inside the author popover as "outside" and close prematurely.
  // Re-portaling into the filters popover's own content element (once it exists) keeps it inside.
  const [filtersPopoverContentEl, setFiltersPopoverContentEl] = useState<HTMLDivElement | null>(
    // `null` is the idiomatic "no element yet" starting value here — see the comment above.
    // eslint-disable-next-line no-null/no-null
    null,
  );
  const filterChips = buildFilterChips(filters, localizedStrings);

  // The list area swaps between skeletons (loading), an empty-state message, and the list — but the
  // toolbar below always renders, so isLoading only governs this region.
  let listContent: ReactNode;
  if (isLoading) {
    listContent = (
      <div className="tw:p-2 tw:space-y-4">
        {[...Array(10)].map((_, index) => (
          <Skeleton
            // There are no other unique identifiers for these items
            // eslint-disable-next-line react/no-array-index-key
            key={`comment-thread-skeleton-${index}`}
            className="tw:h-48 tw:w-full"
          />
        ))}
      </div>
    );
  } else if (threads.length === 0) {
    listContent = (
      <div className="tw:m-4 tw:flex tw:justify-center">
        <Label>
          {noFiltersActive
            ? localizedStrings['%no_comments%']
            : localizedStrings['%no_comments_match_filter%']}
        </Label>
      </div>
    );
  } else {
    listContent = (
      <CommentList
        classNameForVerseText="scripture-font"
        threads={threads}
        currentUser={currentUser}
        localizedStrings={localizedStrings}
        handleAddCommentToThread={handleAddCommentToThread}
        handleUpdateComment={handleUpdateComment}
        handleDeleteComment={handleDeleteComment}
        handleReadStatusChange={handleReadStatusChange}
        assignableUsers={assignableUsers}
        canUserAddCommentToThread={canUserAddCommentToThread}
        canUserAssignThreadCallback={canUserAssignThreadCallback}
        canUserResolveThreadCallback={canUserResolveThreadCallback}
        conflictResolution={conflictResolution}
        canUserEditOrDeleteCommentCallback={canUserEditOrDeleteCommentCallback}
        selectedThreadId={selectedThreadId}
        onSelectedThreadChange={onSelectedThreadChange}
        onVerseRefClick={onVerseRefClick}
      />
    );
  }

  return (
    <div className="tw:flex tw:flex-col tw:h-full">
      {/* Sticky header: the editing-paused notice (when blocking) and the filter toolbar share one
          sticky container so both stay pinned to the top of whichever ancestor scrolls and neither
          scrolls out of view as the comments list scrolls. */}
      <div className="tw:sticky tw:top-0 tw:z-10 tw:shrink-0">
        {/* Slim, non-covering notice shown while this project's automatic Send/Receive is blocking
            edits. Only the write affordances are disabled (by the web view's gated capability
            callbacks); filtering/reading comments stays fully usable. */}
        {isSyncBlocked && (
          <div
            role="status"
            className="tw:border-b tw:border-border tw:bg-muted tw:px-4 tw:py-1.5 tw:text-sm tw:font-medium"
          >
            {localizedStrings[SYNC_BLOCKED_NOTICE_KEY]}
          </div>
        )}
        {/* Filter toolbar — one "Filters" trigger opens every axis in a popover, plus a dismissible
            chip per axis not at its default. Rendered regardless of the loading state: it must stay
            mounted across filter changes (each of which briefly flips `isLoading` true while the
            query resubscribes), or the control the user is interacting with would unmount from
            under them, causing a visible strobe. */}
        <div className="tw:border-b tw:bg-background tw:flex tw:flex-row tw:flex-wrap tw:gap-1.5 tw:items-center tw:pb-2 tw:px-4 tw:pt-4">
          <Popover>
            <PopoverTrigger asChild>
              {/* Stable test hook: this button is the toolbar's only always-rendered control, so
                  E2E tests anchor "the filter bar is present" on it. A test id rather than the
                  visible label keeps those tests working in any interface language. */}
              <Button variant="outline" data-testid="comment-filters-trigger">
                {localizedStrings['%comment_filter_button%']}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              ref={setFiltersPopoverContentEl}
              className="tw:w-72 tw:space-y-3"
              align="start"
            >
              {/* Re-portals popovers opened from within this content (the author combobox) — see
                  the `filtersPopoverContentEl` comment above for why. */}
              <PopoverPortalContainerProvider container={filtersPopoverContentEl}>
                <FilterAxisRow label={localizedStrings[CLOSED_AXES_BY_KEY.resolved.axisKey]}>
                  {CLOSED_AXES_BY_KEY.resolved.renderDropdown(
                    filters,
                    localizedStrings,
                    onFiltersChange,
                  )}
                </FilterAxisRow>
                <FilterAxisRow label={localizedStrings[CLOSED_AXES_BY_KEY.read.axisKey]}>
                  {CLOSED_AXES_BY_KEY.read.renderDropdown(
                    filters,
                    localizedStrings,
                    onFiltersChange,
                  )}
                </FilterAxisRow>
                <FilterAxisRow label={localizedStrings[CLOSED_AXES_BY_KEY.type.axisKey]}>
                  {CLOSED_AXES_BY_KEY.type.renderDropdown(
                    filters,
                    localizedStrings,
                    onFiltersChange,
                  )}
                </FilterAxisRow>
                <FilterAxisRow label={localizedStrings[CLOSED_AXES_BY_KEY.assignment.axisKey]}>
                  {CLOSED_AXES_BY_KEY.assignment.renderDropdown(
                    filters,
                    localizedStrings,
                    onFiltersChange,
                  )}
                </FilterAxisRow>
                {/* Author sits beside assignment — both concern people — so "All authors" and "All
                    assignments" read as distinct rather than accidentally similar. */}
                <FilterAxisRow label={localizedStrings['%comment_filter_axis_author%']}>
                  <AuthorFilterDropdown
                    value={filters.author}
                    authorOptions={toAuthorOptions(assignableUsers)}
                    onChange={(author) => onFiltersChange({ ...filters, author })}
                    localizedStrings={localizedStrings}
                  />
                </FilterAxisRow>
                <FilterAxisRow label={localizedStrings[CLOSED_AXES_BY_KEY.date.axisKey]}>
                  {CLOSED_AXES_BY_KEY.date.renderDropdown(
                    filters,
                    localizedStrings,
                    onFiltersChange,
                  )}
                </FilterAxisRow>
                <FilterAxisRow label={localizedStrings['%comment_filter_axis_scope%']}>
                  <FilterDropdown
                    value={scopeFilter}
                    labelKeys={scopeFilterToLabelKey}
                    isValue={isScopeFilter}
                    onChange={onScopeFilterChange}
                    localizedStrings={localizedStrings}
                    ariaLabel={localizedStrings['%comment_filter_aria_scope%']}
                    hiddenValues={
                      canScopeToCurrentChapter ? undefined : [SCOPE_FILTER_CURRENT_CHAPTER]
                    }
                    testId="comment-scope-filter"
                  />
                </FilterAxisRow>
              </PopoverPortalContainerProvider>
            </PopoverContent>
          </Popover>
          {filterChips.map((chip) => (
            <Badge
              key={chip.key}
              variant="secondary"
              className="tw:gap-1 tw:py-1 tw:ps-2.5 tw:pe-1.5"
            >
              <span className="tw:max-w-40 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap">
                {chip.label}
              </span>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label={formatReplacementString(
                  localizedStrings['%comment_filter_chip_clear%'],
                  {
                    axis: chip.axisLabel,
                  },
                )}
                onClick={() => onFiltersChange(chip.cleared)}
                className="tw:size-4 tw:rounded-full"
              >
                <X className="tw:size-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Comments list (or skeletons while loading / empty state). Only this region swaps on load,
          so the toolbar above stays mounted. */}
      <div className="tw:flex-1 tw:overflow-auto">{listContent}</div>
    </div>
  );
}

export default CommentListPanel;
