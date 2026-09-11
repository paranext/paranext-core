// ProjectSelector accepts a discriminated union of props (mode: 'project' | 'project-multi' |
// 'projectScrollGroup'). Destructuring at the parameter level loses TypeScript's type narrowing
// on the mode-discriminated adjacent fields, so we keep `props.X` access throughout to preserve
// narrowing inside `if (props.mode === '...')` blocks.
/* eslint-disable react/destructuring-assignment */
import {
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type RefObject,
} from 'react';
import { ArrowRight, Check, ChevronDown, ChevronsUpDown, Filter, Loader2 } from 'lucide-react';
import {
  getLocalizeKeyForScrollGroupId,
  normalizeProjectId,
  type ScrollGroupId,
} from 'platform-bible-utils';
import { DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS } from 'platform-bible-utils/experimental';
import { cn } from '@/utils/shadcn-ui/utils';
import { Z_INDEX_ABOVE_DOCK } from '@/components/z-index';
import { Badge } from '@/components/shadcn-ui/badge';
import { Button, ButtonProps } from '@/components/shadcn-ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/shadcn-ui/command';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import { useTruncationTooltip } from '@/hooks/use-truncation-tooltip.hook';
import {
  computeRows,
  partitionByGrouping,
  partitionFlat,
  type ProjectSelectorOpenTab,
  type ProjectMultiSelection,
  type ProjectSelectorGrouping,
  type ProjectSelectorProjectPair,
  type ProjectRow,
  type ProjectScrollGroupSelection,
  type ProjectSelection,
  type ProjectSelectorMode,
  type ProjectSelectorProject,
  type RowSection,
} from './project-selector.rows';

import type {
  BuiltInGroupingStrings,
  SelectionGroupingStrings,
} from './project-selector.groupings';

export type {
  ProjectSelectorOpenTab,
  ProjectMultiSelection,
  ProjectSelectorGrouping,
  ProjectSelectorProjectPair,
  ProjectRow,
  ProjectScrollGroupSelection,
  ProjectSelection,
  ProjectSelectorMode,
  ProjectSelectorProject,
} from './project-selector.rows';

export {
  defaultGroupings,
  makeBuiltInGroupings,
  makeSelectionGrouping,
  type BuiltInGroupingStrings,
  type SelectionGroupingStrings,
} from './project-selector.groupings';

// The selector's own popover already sits at `Z_INDEX_ABOVE_DOCK`; overlays that portal from
// inside it (the row tooltip and the filter dropdown) must stack above that popover, not behind.
const Z_INDEX_ABOVE_SELECTOR_POPOVER = Z_INDEX_ABOVE_DOCK + 50;

// Below this trigger width the chevron + its 8px margin + the button's own padding leave no room
// for a legible label — auto-hide the chevron so at least a few characters of the shortName
// remain. Tuned to the manage-books icon-rail sidebar (~56px), which needs to drop the chevron
// while a normally-sized picker (~180px+) keeps it.
const NARROW_TRIGGER_THRESHOLD_PX = 100;

// #region Localized strings

/**
 * Every user-facing string the selector can render. All keys are optional; unset values fall back
 * to English defaults. Consumers wire this from a shared platform-level localization block (see
 * `%projectSelector_*%` keys in the platform's localizedStrings JSON) so every ProjectSelector in
 * the app reads the same vocabulary.
 *
 * Grouping _labels_ (the radio items in the filter menu) are NOT in this map — those live on the
 * {@link ProjectSelectorGrouping} objects the caller passes via `availableGroupings`, so custom
 * groupings can supply their own localized label without a separate string channel.
 */
export type ProjectSelectorLocalizedStrings = {
  /** Trigger `aria-label`. */
  ariaLabel?: string;
  /** Trigger fallback text when nothing is selected. */
  buttonPlaceholder?: string;
  /** "No results" message inside the popover when the search has no matches. */
  commandEmptyMessage?: string;
  /** Placeholder for the popover's search input. */
  searchPlaceholder?: string;
  /** Accessible label + `title` for the filter menu icon button. */
  filterAriaLabel?: string;
  /** Filter menu: section heading for the grouping radio group. */
  groupSectionLabel?: string;
  /** Filter menu: "None" grouping radio item — the "no grouping" option. */
  filterGroupNone?: string;
  /** Section heading rendered above the "open tabs" bucket. */
  openTabsSectionHeading?: string;
  /** Section heading rendered above the "other projects" bucket. */
  otherProjectsSectionHeading?: string;
  /**
   * Radio label used by the auto-added `openTabs` grouping (renders whenever `openTabs.length > 0`
   * and the caller didn't already include an `openTabs` grouping in `availableGroupings`).
   */
  autoOpenTabsGroupingLabel?: string;
  /**
   * Radio label used by the auto-added `selection` grouping (renders in `project-multi` mode when
   * the caller didn't already include a `selection` grouping).
   */
  autoSelectionGroupingLabel?: string;
  /** Auto-added selection grouping: heading over the "Selected" bucket. */
  autoSelectionSelectedSectionHeading?: string;
  /** Auto-added selection grouping: heading over the "Unselected" bucket. */
  autoSelectionUnselectedSectionHeading?: string;
  /**
   * Tooltip on a bound-but-closed chip. `{group}` is replaced with the scroll-group letter (e.g.
   * `"A"`).
   */
  boundButClosedTooltip?: string;
  /** Label of the "Open" button shown on bound-but-closed rows. */
  openButtonLabel?: string;
  /** Multi-select: "Clear all" button (shown only when at least one pair is selected). */
  clearAll?: string;
};

const DEFAULT_STRINGS: Required<ProjectSelectorLocalizedStrings> = {
  ariaLabel: '',
  buttonPlaceholder: '',
  commandEmptyMessage: 'No projects found',
  searchPlaceholder: 'Search projects & resources',
  filterAriaLabel: 'Filter',
  groupSectionLabel: 'Group by',
  filterGroupNone: 'None',
  openTabsSectionHeading: 'Opened project & resource tabs',
  otherProjectsSectionHeading: 'Your projects & resources',
  autoOpenTabsGroupingLabel: 'Open tabs',
  autoSelectionGroupingLabel: 'Selection',
  autoSelectionSelectedSectionHeading: 'Selected',
  autoSelectionUnselectedSectionHeading: 'Unselected',
  boundButClosedTooltip: 'Bound to {group} · not currently open',
  openButtonLabel: 'Open',
  clearAll: 'Clear all',
};

function resolveStrings(
  partial: ProjectSelectorLocalizedStrings | undefined,
): Required<ProjectSelectorLocalizedStrings> {
  return { ...DEFAULT_STRINGS, ...partial };
}

/**
 * The platform-level localization keys that back every shared ProjectSelector string. Consumers
 * pass this list to `useLocalizedStrings` to fetch them all in one go, then feed the resolved
 * strings into {@link buildProjectSelectorLocalizedStrings} and (for the built-in groupings)
 * {@link makeBuiltInGroupings}.
 *
 * Consumer-specific strings (per-picker `ariaLabel` and `buttonPlaceholder`) are NOT in this list —
 * those are picker-role copy and should be resolved from the consumer's own l10n keys and merged in
 * on top.
 */
export const PROJECT_SELECTOR_STRING_KEYS = [
  '%projectSelector_searchPlaceholder%',
  '%projectSelector_commandEmptyMessage%',
  '%projectSelector_filterAriaLabel%',
  '%projectSelector_groupSectionLabel%',
  '%projectSelector_filterGroupNone%',
  '%projectSelector_openTabsSectionHeading%',
  '%projectSelector_otherProjectsSectionHeading%',
  '%projectSelector_boundButClosedTooltip%',
  '%projectSelector_openButtonLabel%',
  '%projectSelector_clearAll%',
  '%projectSelector_grouping_openTabs_label%',
  '%projectSelector_grouping_lastUsed_label%',
  '%projectSelector_grouping_lastUsed_recentSectionHeading%',
  '%projectSelector_grouping_lastUsed_otherSectionHeading%',
  '%projectSelector_grouping_language_label%',
  '%projectSelector_grouping_language_unknownSectionHeading%',
  '%projectSelector_grouping_type_label%',
  '%projectSelector_grouping_type_unknownSectionHeading%',
  '%projectSelector_grouping_selection_label%',
  '%projectSelector_grouping_selection_selectedSectionHeading%',
  '%projectSelector_grouping_selection_unselectedSectionHeading%',
] as const;

/** The union of {@link PROJECT_SELECTOR_STRING_KEYS} entries. */
export type ProjectSelectorLocalizedStringKey = (typeof PROJECT_SELECTOR_STRING_KEYS)[number];

/** A map from every {@link ProjectSelectorLocalizedStringKey} to its resolved localized value. */
export type ProjectSelectorResolvedStrings = Readonly<
  Record<ProjectSelectorLocalizedStringKey, string>
>;

/**
 * Convert the raw `%projectSelector_*%` resolved strings into a
 * {@link ProjectSelectorLocalizedStrings} bag ready to pass as the `localizedStrings` prop. Merge
 * consumer-specific strings (`ariaLabel`, `buttonPlaceholder`) on top afterwards.
 */
export function buildProjectSelectorLocalizedStrings(
  strings: ProjectSelectorResolvedStrings,
): ProjectSelectorLocalizedStrings {
  return {
    searchPlaceholder: strings['%projectSelector_searchPlaceholder%'],
    commandEmptyMessage: strings['%projectSelector_commandEmptyMessage%'],
    filterAriaLabel: strings['%projectSelector_filterAriaLabel%'],
    groupSectionLabel: strings['%projectSelector_groupSectionLabel%'],
    filterGroupNone: strings['%projectSelector_filterGroupNone%'],
    openTabsSectionHeading: strings['%projectSelector_openTabsSectionHeading%'],
    otherProjectsSectionHeading: strings['%projectSelector_otherProjectsSectionHeading%'],
    autoOpenTabsGroupingLabel: strings['%projectSelector_grouping_openTabs_label%'],
    autoSelectionGroupingLabel: strings['%projectSelector_grouping_selection_label%'],
    autoSelectionSelectedSectionHeading:
      strings['%projectSelector_grouping_selection_selectedSectionHeading%'],
    autoSelectionUnselectedSectionHeading:
      strings['%projectSelector_grouping_selection_unselectedSectionHeading%'],
    boundButClosedTooltip: strings['%projectSelector_boundButClosedTooltip%'],
    openButtonLabel: strings['%projectSelector_openButtonLabel%'],
    clearAll: strings['%projectSelector_clearAll%'],
  };
}

/**
 * Convert the raw `%projectSelector_*%` resolved strings into the labels + section-heading strings
 * that {@link makeBuiltInGroupings} accepts. Pair with {@link buildProjectSelectorLocalizedStrings}
 * to wire the whole picker from a single {@link PROJECT_SELECTOR_STRING_KEYS} call.
 */
export function buildBuiltInGroupingStrings(
  strings: ProjectSelectorResolvedStrings,
): BuiltInGroupingStrings {
  return {
    openTabsLabel: strings['%projectSelector_grouping_openTabs_label%'],
    lastUsedLabel: strings['%projectSelector_grouping_lastUsed_label%'],
    lastUsedRecentSectionHeading:
      strings['%projectSelector_grouping_lastUsed_recentSectionHeading%'],
    lastUsedOtherSectionHeading: strings['%projectSelector_grouping_lastUsed_otherSectionHeading%'],
    languageLabel: strings['%projectSelector_grouping_language_label%'],
    languageUnknownSectionHeading:
      strings['%projectSelector_grouping_language_unknownSectionHeading%'],
    typeLabel: strings['%projectSelector_grouping_type_label%'],
    typeUnknownSectionHeading: strings['%projectSelector_grouping_type_unknownSectionHeading%'],
  };
}

/**
 * Convert the raw `%projectSelector_*%` resolved strings into the labels + section-heading strings
 * that {@link makeSelectionGrouping} accepts. Pair with {@link buildProjectSelectorLocalizedStrings}
 * to wire the multi-select "Selection" grouping from the same {@link PROJECT_SELECTOR_STRING_KEYS}
 * call.
 */
export function buildSelectionGroupingStrings(
  strings: ProjectSelectorResolvedStrings,
): SelectionGroupingStrings {
  return {
    label: strings['%projectSelector_grouping_selection_label%'],
    selectedSectionHeading: strings['%projectSelector_grouping_selection_selectedSectionHeading%'],
    unselectedSectionHeading:
      strings['%projectSelector_grouping_selection_unselectedSectionHeading%'],
  };
}

// #endregion

// #region Scroll group labels

/**
 * Map a scroll group id to its display letter (`0`→`A`, …, `25`→`Z`) using the canonical default
 * localized strings from `platform-bible-utils`. Falls back to the numeric id when no entry
 * exists.
 */
function scrollGroupLetterFromMap(id: ScrollGroupId): string {
  return DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS[getLocalizeKeyForScrollGroupId(id)] ?? String(id);
}

// #endregion

// #region Common props

type CommonProps = {
  projects: readonly ProjectSelectorProject[];
  openTabs: readonly ProjectSelectorOpenTab[];
  /**
   * Shadcn Button variant. Defaults to `'outline'`. Use `'default'` for a primary-fill affordance
   * (call-to-action) when the picker is empty and the user is expected to make a choice.
   */
  buttonVariant?: ButtonProps['variant'];
  isDisabled?: boolean;
  /**
   * When true, the trigger shows a spinner (instead of the chevron) and is disabled, signalling
   * that the project list is still loading. Distinct from `isDisabled`, which conveys a generic
   * busy/blocked state with no spinner.
   */
  isLoading?: boolean;
  /**
   * All user-facing strings. Optional keys fall back to English defaults. Consumers should wire
   * this from the platform's central `%projectSelector_*%` localization block plus any
   * consumer-specific overrides (typically `ariaLabel` and `buttonPlaceholder`, which vary per
   * picker role).
   */
  localizedStrings?: ProjectSelectorLocalizedStrings;
  /**
   * The grouping options exposed in the filter menu, in order. Each entry is a
   * {@link ProjectSelectorGrouping} — either one of the built-ins from {@link makeBuiltInGroupings}
   * or a consumer-defined custom grouping.
   *
   * Behavior:
   *
   * - **Omitted** — the component auto-derives from context: adds `openTabs` when `openTabs.length >
   *   0`, and adds `selection` in `project-multi` mode. Pickers that don't care about the grouping
   *   menu can leave this prop unset and get a sensible default.
   * - **`[]`** — explicit empty. No filter menu renders. The list opens flat.
   * - **Length 1** — the grouping is applied and the user is locked into it: the filter menu has
   *   nothing to switch between so the funnel button is dropped entirely. Use this for pickers
   *   whose grouping is the entire point (e.g. manage-books Create "Based on" locked into
   *   versification).
   * - **Length ≥ 2** — a filter menu renders with a "None" radio (above a separator) plus one radio
   *   per grouping.
   *
   * A caller that wants the historical set of built-ins passes `defaultGroupings` (or
   * `makeBuiltInGroupings(strings)`) explicitly. When you pass a list — even a single-entry lock —
   * the component uses it verbatim with no auto-additions on top.
   */
  availableGroupings?: readonly ProjectSelectorGrouping[];
  /**
   * The grouping active on initial mount, identified by `id`. When absent (or when the id isn't
   * present in `availableGroupings`), the active grouping resolves to:
   *
   * - The sole entry when `availableGroupings.length === 1` (single-grouping lock),
   * - `'openTabs'` when it's in the array,
   * - `'none'` (flat) otherwise.
   *
   * Pass `'none'` to explicitly open flat even when groupings are available.
   */
  defaultGrouping?: string | 'none';
};

export type ProjectSelectorProps =
  | (CommonProps & {
      mode: 'project';
      selection: ProjectSelection;
      onChangeSelection: (selection: { projectId: string }) => void;
      /**
       * Trigger label format. `'shortName'` (the default) renders just the selected project's short
       * name. `'shortNameAndFullName'` renders `"{shortName} - {fullName}"` (skipping the suffix
       * when the full name is absent or equal to the short name); since the short name leads the
       * string, the trigger's existing ellipsis truncation produces e.g. `"arb - True Meaning Ar…"`
       * when space is short, and the trigger's `title` still carries the untruncated text for
       * native hover.
       */
      triggerLabelFormat?: 'shortName' | 'shortNameAndFullName';
    })
  | (CommonProps & {
      mode: 'project-multi';
      selection: ProjectMultiSelection;
      onChangeSelection: (selection: { pairs: ProjectSelectorProjectPair[] }) => void;
      /**
       * Called when the user clicks the "Open" button on a bound-but-closed row (or the row
       * itself). The caller is expected to open a tab via `papi.webViews.openWebView(...)`.
       */
      onOpenProjectInGroup?: (projectId: string, scrollGroupId: ScrollGroupId) => void;
    })
  | (CommonProps & {
      mode: 'projectScrollGroup';
      selection: ProjectScrollGroupSelection;
      onChangeSelection: (selection: { projectId: string; scrollGroupId: ScrollGroupId }) => void;
      /**
       * Called when the user picks a not-open-project row OR clicks the "Open" button on a
       * bound-but-closed row. The caller is expected to open a tab via
       * `papi.webViews.openWebView(...)`.
       */
      onOpenProjectInGroup: (projectId: string, scrollGroupId: ScrollGroupId) => void;
    });

// #endregion

// #region Chip + Open button

const DIAGONAL_STRIKE_STYLE: CSSProperties = {
  backgroundImage:
    'linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))',
};

type ScrollGroupChipProps = {
  scrollGroupId: ScrollGroupId;
  isBoundButClosed: boolean;
};

function ScrollGroupChip({ scrollGroupId, isBoundButClosed }: ScrollGroupChipProps) {
  const letter = scrollGroupLetterFromMap(scrollGroupId);
  if (isBoundButClosed) {
    return (
      <Badge
        variant="outline"
        className="tw:relative tw:text-muted-foreground"
        style={DIAGONAL_STRIKE_STYLE}
      >
        {letter}
      </Badge>
    );
  }
  return <Badge variant="secondary">{letter}</Badge>;
}

// #endregion

// #region Row rendering

type RowRenderProps = {
  row: ProjectRow;
  mode: ProjectSelectorMode;
  strings: Required<ProjectSelectorLocalizedStrings>;
  onClick: (row: ProjectRow) => void;
  onOpen: ((row: ProjectRow) => void) | undefined;
  /** Forwarded by the parent so it can scroll the selected row into view when the popover opens. */
  selectedRowRef?: RefObject<HTMLDivElement | null>;
};

function ProjectRowView({ row, mode, strings, onClick, onOpen, selectedRowRef }: RowRenderProps) {
  // We control Radix Tooltip's `open` prop manually because Radix's built-in pointer/focus
  // auto-detection does not fire on cmdk's `<CommandItem>` trigger (data-state stays "closed"
  // even after pointerenter / pointermove / focus). Tracking hover ourselves bypasses that
  // auto-detection entirely.
  //
  // `useTruncationTooltip` owns the label ref plus the open state and pointer handlers for the
  // "only show a tooltip when the row text is actually clipped" case. Its ref measures
  // scrollWidth vs clientWidth on the truncating label span.
  const {
    ref: labelRef,
    open: isTruncatedHovered,
    onPointerEnter: onTruncationPointerEnter,
    onPointerLeave: onTruncationPointerLeave,
  } = useTruncationTooltip<HTMLSpanElement>();

  // Some rows also carry a tooltip on hover regardless of truncation, because it surfaces info
  // that is NOT visible in the row text at all. Track that hover separately and OR it with the
  // truncation-driven open state.
  const [isExtraContentHovered, setIsExtraContentHovered] = useState(false);

  // Tooltip lines that convey information NOT visible in the row text. These rows should
  // always show a tooltip on hover, regardless of whether the visible text is truncated.
  const hasExtraTooltipContent =
    Boolean(row.scrollGroupScrRefLabel) ||
    row.isBoundButClosed ||
    (row.isDisabled && Boolean(row.disabledReason));

  const isHovered = isTruncatedHovered || isExtraContentHovered;

  const handlePointerEnter = useCallback(() => {
    if (hasExtraTooltipContent) {
      setIsExtraContentHovered(true);
      return;
    }
    // Otherwise only open the tooltip if the visible row text is actually truncated.
    onTruncationPointerEnter();
  }, [hasExtraTooltipContent, onTruncationPointerEnter]);

  const handlePointerLeave = useCallback(() => {
    setIsExtraContentHovered(false);
    onTruncationPointerLeave();
  }, [onTruncationPointerLeave]);

  const leftCheck = (
    <Check className={cn('tw:h-4 tw:w-4', row.isSelected ? 'tw:opacity-100' : 'tw:opacity-0')} />
  );

  // Right-side content: chip(s) and, for bound-but-closed rows, an "Open" button.
  let rightContent: ReactNode;
  if (mode === 'project') {
    if (row.openGroups.length > 0) {
      rightContent = (
        <span className="tw:ms-auto tw:flex tw:shrink-0 tw:gap-1">
          {row.openGroups.map((g) => (
            <Badge key={g} variant="secondary">
              {scrollGroupLetterFromMap(g)}
            </Badge>
          ))}
        </span>
      );
    }
  } else if (row.scrollGroupId !== undefined) {
    rightContent = (
      <span className="tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2">
        <ScrollGroupChip
          scrollGroupId={row.scrollGroupId}
          isBoundButClosed={row.isBoundButClosed}
        />
        {row.isBoundButClosed && onOpen && (
          <Button
            size="sm"
            variant="ghost"
            className="tw:h-6 tw:gap-1 tw:px-2 tw:text-xs"
            onClick={(event) => {
              event.stopPropagation();
              onOpen(row);
            }}
            onMouseDown={(event: MouseEvent) => event.stopPropagation()}
            aria-label={strings.openButtonLabel}
            title={strings.openButtonLabel}
          >
            <ArrowRight className="tw:h-3 tw:w-3" />
            {strings.openButtonLabel}
          </Button>
        )}
      </span>
    );
  }

  const rowNode = (
    <CommandItem
      ref={row.isSelected ? selectedRowRef : undefined}
      value={`${row.rowKey} ${row.shortName} ${row.fullName}`}
      onSelect={() => {
        if (row.isDisabled) return;
        onClick(row);
      }}
      disabled={row.isDisabled}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className="tw:flex tw:items-center tw:gap-2 tw:pe-4"
      data-selected={row.isSelected}
    >
      <span className="tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center">
        {leftCheck}
      </span>
      {/* Row label uses a 2-line layout — shortName on top, fullName muted
          below. Each line truncates independently. Tooltip-on-clip still
          works because the wrapping span is what scrollWidth/clientWidth is
          measured on (truncation in EITHER child contributes to overflow).
          When `fullName` is missing
          or equal to `shortName` the second line would render the same
          string the user already sees above (e.g. consumers that fall back
          `fullName ?? shortName` upstream and forward an unset project
          fullName). Suppress the muted line in that case so the row reads
          as a single name. */}
      <span
        ref={labelRef}
        className="tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start"
      >
        <span className="tw:w-full tw:truncate tw:font-medium">{row.shortName}</span>
        {row.fullName && row.fullName !== row.shortName && (
          <span className="tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground">
            {row.fullName}
          </span>
        )}
      </span>
      {rightContent}
    </CommandItem>
  );

  const letter =
    row.scrollGroupId !== undefined ? scrollGroupLetterFromMap(row.scrollGroupId) : undefined;

  const tooltipBoundBut =
    row.isBoundButClosed && letter
      ? strings.boundButClosedTooltip.replace('{group}', letter)
      : undefined;

  return (
    <Tooltip open={isHovered} delayDuration={400}>
      <TooltipTrigger asChild>{rowNode}</TooltipTrigger>
      <TooltipContent
        side="top"
        align="center"
        sideOffset={8}
        collisionPadding={16}
        className="tw:max-w-xs tw:text-center"
        style={{ zIndex: Z_INDEX_ABOVE_SELECTOR_POPOVER }}
      >
        <div className="tw:font-semibold">{row.fullName}</div>
        {!row.isBoundButClosed && row.scrollGroupScrRefLabel && letter && (
          <div className="tw:text-sm">
            {row.scrollGroupScrRefLabel}
            <span className="tw:text-muted-foreground"> ({letter})</span>
          </div>
        )}
        {tooltipBoundBut && <div className="tw:text-sm tw:italic">{tooltipBoundBut}</div>}
        {row.isDisabled && row.disabledReason && (
          <div className="tw:text-sm tw:italic tw:text-muted-foreground">{row.disabledReason}</div>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

// #endregion

// #region Filter menu

/** Sentinel used for the "no grouping" radio value. Kept module-local (not exported). */
const NO_GROUPING = 'none';

type ActiveGroupingId = string;

type FilterMenuProps = {
  availableGroupings: readonly ProjectSelectorGrouping[];
  activeGrouping: ActiveGroupingId;
  onChangeGrouping: (value: ActiveGroupingId) => void;
  strings: Required<ProjectSelectorLocalizedStrings>;
};

function FilterMenu({
  availableGroupings,
  activeGrouping,
  onChangeGrouping,
  strings,
}: FilterMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="tw:h-8 tw:w-8 tw:shrink-0 tw:p-0"
          aria-label={strings.filterAriaLabel}
          title={strings.filterAriaLabel}
          onMouseDown={(event: MouseEvent) => event.preventDefault()}
        >
          <Filter className="tw:h-4 tw:w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="tw:w-56"
        style={{ zIndex: Z_INDEX_ABOVE_SELECTOR_POPOVER }}
      >
        <DropdownMenuLabel>{strings.groupSectionLabel}</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={activeGrouping} onValueChange={onChangeGrouping}>
          {/* No `onSelect={preventDefault}` here — picking a grouping should close the menu
              immediately, so the user sees the newly grouped list without a second click. */}
          <DropdownMenuRadioItem value={NO_GROUPING}>
            {strings.filterGroupNone}
          </DropdownMenuRadioItem>
          {/* Visually separate "None" from the real grouping options — "None" is the "off state"
              and the actual grouping choices sit below the divider. */}
          <DropdownMenuSeparator />
          {availableGroupings.map((grouping) => (
            <DropdownMenuRadioItem key={grouping.id} value={grouping.id}>
              {grouping.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// #endregion

// #region Main component

function resolveInitialActiveGrouping(
  availableGroupings: readonly ProjectSelectorGrouping[],
  defaultGrouping: string | undefined,
): ActiveGroupingId {
  // Single-grouping lock: no choice to make, activate it unconditionally.
  if (availableGroupings.length === 1) return availableGroupings[0].id;
  if (defaultGrouping) {
    if (defaultGrouping === NO_GROUPING) return NO_GROUPING;
    if (availableGroupings.some((g) => g.id === defaultGrouping)) return defaultGrouping;
  }
  // Prefer 'openTabs' when it's in the menu, otherwise flat. Deliberately NOT
  // availableGroupings[0] — a caller who restricts to e.g. ['language','type'] should still open
  // in flat mode, not silently pick 'language'.
  if (availableGroupings.some((g) => g.id === 'openTabs')) return 'openTabs';
  return NO_GROUPING;
}

/**
 * Combo-box project picker with three modes:
 *
 * - `project` — single-select, one row per project; chips list every open scroll group as metadata
 *   (non-interactive, the whole row is the click target).
 * - `project-multi` — multi-select over `(projectId, scrollGroupId)` pairs. Same project open in two
 *   scroll groups renders as two independently-selectable rows. Projects not open anywhere render
 *   as a single row with no chip.
 * - `projectScrollGroup` — single-select of one `(projectId, scrollGroupId)` pair. Clicking a
 *   not-open-project row selects the project in Group A and calls `onOpenProjectInGroup`.
 *
 * In both per-pair modes, a currently-selected pair whose tab is not open renders as a synthetic
 * row with a diagonally-struck chip and an "Open" button.
 */
export function ProjectSelector(props: ProjectSelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const strings = resolveStrings(props.localizedStrings);
  // Effective grouping list:
  //
  // - When the caller passes `availableGroupings` (even `[]`), it is taken LITERALLY. This is the
  //   contract for "I know exactly what groupings this picker should offer" cases like the
  //   manage-books Create "Based on" picker, which passes `[versificationGrouping]` and expects
  //   to be locked into that single option with no filter menu.
  // - When the caller OMITS `availableGroupings`, the component auto-derives a sensible default
  //   from the runtime state:
  //     - `openTabs` when any tab is open (so pickers that show scroll-group chips also expose
  //       the "opened tabs vs everything else" partition without ceremony).
  //     - `selection` in `project-multi` mode (replaces the old `Show selected only` checkbox
  //       with a Selected / Unselected partition).
  //   Pickers that want the full built-in set (openTabs / lastUsed / language / type) pass
  //   `defaultGroupings` or `makeBuiltInGroupings(strings)` explicitly.
  const availableGroupings = useMemo<readonly ProjectSelectorGrouping[]>(() => {
    if (props.availableGroupings !== undefined) return props.availableGroupings;
    const auto: ProjectSelectorGrouping[] = [];
    if (props.openTabs.length > 0) {
      auto.push({ id: 'openTabs', label: strings.autoOpenTabsGroupingLabel });
    }
    if (props.mode === 'project-multi') {
      auto.push({
        id: 'selection',
        label: strings.autoSelectionGroupingLabel,
        getSectionHeading: (key) =>
          key === 'selected'
            ? strings.autoSelectionSelectedSectionHeading
            : strings.autoSelectionUnselectedSectionHeading,
      });
    }
    return auto;
  }, [
    props.availableGroupings,
    props.openTabs.length,
    props.mode,
    strings.autoOpenTabsGroupingLabel,
    strings.autoSelectionGroupingLabel,
    strings.autoSelectionSelectedSectionHeading,
    strings.autoSelectionUnselectedSectionHeading,
  ]);
  // Mount-time initializer only — we do NOT re-derive when props change, since that would fight a
  // user who has since picked a different grouping. Callers control the initial value; the
  // component owns the interactive one.
  const [activeGrouping, setActiveGrouping] = useState<ActiveGroupingId>(() =>
    resolveInitialActiveGrouping(availableGroupings, props.defaultGrouping),
  );

  // Clear the search filter when the popover closes so the next open starts
  // fresh — a persisted query across open/close confuses users who typed a
  // filter and expected the list to reset.
  //
  // Scroll-to-selected: when the popover opens, scroll the selected row into
  // view. The ref is wired through ProjectRowView; in multi-select the last
  // selected row in the alphabetical order wins (good-enough for the typical
  // project-mode case where there's only one). null is the canonical initial
  // value for React DOM refs.
  // eslint-disable-next-line no-null/no-null
  const selectedRowRef = useRef<HTMLDivElement>(null);
  const handleOpenChange = useCallback((nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) setQuery('');
  }, []);
  useEffect(() => {
    if (!open) return;
    // Defer to the next microtask so the popover content has rendered and the row
    // refs are attached. requestAnimationFrame works the same; microtask is enough.
    const id = window.requestAnimationFrame(() => {
      const el = selectedRowRef.current;
      if (!el) return;
      el.scrollIntoView({ block: 'nearest', behavior: 'auto' });
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);

  const rows = useMemo(() => {
    if (props.mode === 'project') {
      return computeRows({
        mode: 'project',
        projects: props.projects,
        openTabs: props.openTabs,
        selection: props.selection,
      });
    }
    if (props.mode === 'project-multi') {
      return computeRows({
        mode: 'project-multi',
        projects: props.projects,
        openTabs: props.openTabs,
        selection: props.selection,
      });
    }
    return computeRows({
      mode: 'projectScrollGroup',
      projects: props.projects,
      openTabs: props.openTabs,
      selection: props.selection,
    });
  }, [props.mode, props.projects, props.openTabs, props.selection]);

  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter(
      (r) =>
        r.shortName.toLowerCase().includes(needle) || r.fullName.toLowerCase().includes(needle),
    );
  }, [rows, query]);

  const sections = useMemo<RowSection[]>(() => {
    if (activeGrouping === NO_GROUPING) return partitionFlat(filteredRows);
    const grouping = availableGroupings.find((g) => g.id === activeGrouping);
    if (!grouping) return partitionFlat(filteredRows);
    return partitionByGrouping(filteredRows, grouping);
  }, [filteredRows, activeGrouping, availableGroupings]);

  const handleOpenProjectInGroup = (row: ProjectRow) => {
    if (row.scrollGroupId === undefined) return;
    if (props.mode === 'projectScrollGroup') {
      props.onOpenProjectInGroup(row.projectId, row.scrollGroupId);
      return;
    }
    if (props.mode === 'project-multi' && props.onOpenProjectInGroup) {
      props.onOpenProjectInGroup(row.projectId, row.scrollGroupId);
    }
  };

  const handleRowClick = (row: ProjectRow) => {
    switch (props.mode) {
      case 'project': {
        props.onChangeSelection({ projectId: row.projectId });
        setOpen(false);
        return;
      }
      case 'project-multi': {
        const current = props.selection.pairs;
        // Case-insensitive projectId match (canonical ids are UPPERCASE, but callers may pass
        // lowercased tab-derived ids; see normalizeProjectId / I12). Guarantees that clicking a
        // row toggles the SAME pair regardless of casing on either side.
        const normalizedRowId = normalizeProjectId(row.projectId);
        const match = (p: ProjectSelectorProjectPair) =>
          normalizeProjectId(p.projectId) === normalizedRowId &&
          p.scrollGroupId === row.scrollGroupId;
        // ADD path filters existing matches out first — belt-and-suspenders against a stale
        // `current` snapshot leaking a duplicate through under a rapid double-click on the same
        // row before the parent's state update propagates back down. Under normal single-click
        // conditions this is a no-op.
        const next = current.some(match)
          ? current.filter((p) => !match(p))
          : [
              ...current.filter((p) => !match(p)),
              { projectId: row.projectId, scrollGroupId: row.scrollGroupId },
            ];
        props.onChangeSelection({ pairs: next });
        return;
      }
      case 'projectScrollGroup': {
        if (row.isBoundButClosed && row.scrollGroupId !== undefined) {
          // Reopen the tab in the bound group; selection doesn't change.
          props.onOpenProjectInGroup(row.projectId, row.scrollGroupId);
          setOpen(false);
          return;
        }
        if (row.scrollGroupId !== undefined) {
          props.onChangeSelection({
            projectId: row.projectId,
            scrollGroupId: row.scrollGroupId,
          });
          setOpen(false);
          return;
        }
        // Not-open-project row: inherit the current selection's scroll group so the newly
        // opened tab lands where the user was already reading. If nothing is selected yet, fall
        // back to Group 0 (A).
        const targetGroup: ScrollGroupId = props.selection.scrollGroupId ?? 0;
        props.onChangeSelection({ projectId: row.projectId, scrollGroupId: targetGroup });
        props.onOpenProjectInGroup(row.projectId, targetGroup);
        setOpen(false);
      }
      // no default
    }
  };

  const handleClearAll = () => {
    if (props.mode !== 'project-multi') return;
    props.onChangeSelection({ pairs: [] });
  };

  const triggerContent = useMemo<{ node: ReactNode; title: string }>(() => {
    switch (props.mode) {
      case 'project': {
        const selected = props.projects.find((p) => p.id === props.selection.projectId);
        let text = selected ? selected.shortName : strings.buttonPlaceholder;
        if (
          selected &&
          props.triggerLabelFormat === 'shortNameAndFullName' &&
          selected.fullName &&
          selected.fullName !== selected.shortName
        )
          text = `${selected.shortName} - ${selected.fullName}`;
        return { node: text, title: text };
      }
      case 'project-multi': {
        const { pairs } = props.selection;
        if (pairs.length === 0) {
          const text = strings.buttonPlaceholder;
          return { node: text, title: text };
        }
        type Tuple = { project: ProjectSelectorProject; scrollGroupId?: ScrollGroupId };
        const tuples: Tuple[] = [];
        pairs.forEach((pair) => {
          const project = props.projects.find((p) => p.id === pair.projectId);
          if (project) tuples.push({ project, scrollGroupId: pair.scrollGroupId });
        });
        if (tuples.length === 0) {
          const text = strings.buttonPlaceholder;
          return { node: text, title: text };
        }
        const items = tuples
          .map(({ project, scrollGroupId }) =>
            scrollGroupId === undefined
              ? project.shortName
              : `${project.shortName} (${scrollGroupLetterFromMap(scrollGroupId)})`,
          )
          .join(', ');
        // Always render the count badge (even at 1) so the trigger is visually consistent across
        // selection counts — one-selected used to look like a bare label indistinguishable from
        // single-select mode's trigger.
        const countText = tuples.length.toString();
        return {
          node: (
            <>
              <Badge variant="muted" className="tw:shrink-0">
                {countText}
              </Badge>
              <span className="tw:min-w-0 tw:truncate">{items}</span>
            </>
          ),
          title: `${countText} ${items}`,
        };
      }
      case 'projectScrollGroup': {
        const selected = props.projects.find((p) => p.id === props.selection.projectId);
        if (!selected) {
          const text = strings.buttonPlaceholder;
          return { node: text, title: text };
        }
        const group = props.selection.scrollGroupId;
        if (group === undefined) {
          return { node: selected.shortName, title: selected.shortName };
        }
        const text = `${selected.shortName} · ${scrollGroupLetterFromMap(group)}`;
        return { node: text, title: text };
      }
      default:
        return { node: '', title: '' };
    }
  }, [props, strings.buttonPlaceholder]);

  // Auto-narrow: measure the trigger button's rendered width and hide the chevron below the
  // threshold at which the label would otherwise truncate to nothing. Consumers control the
  // trigger's width by wrapping the ProjectSelector in a sized container — this observer just
  // reacts to whatever width the layout produced.
  //
  // Threshold: the chevron + its 8px margin eats ~24px, and the button's own padding eats another
  // ~24px, leaving room for a few characters of label above ~100px of button width. Below that,
  // dropping the chevron is a net win for legibility.
  // eslint-disable-next-line no-null/no-null
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [isTriggerNarrow, setIsTriggerNarrow] = useState(false);
  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
    const update = (width: number) => {
      setIsTriggerNarrow(width < NARROW_TRIGGER_THRESHOLD_PX);
    };
    update(el.getBoundingClientRect().width);
    // Border-box width, NOT `contentRect` (which is content-box, i.e. minus padding). The
    // narrow-mode branch below tightens the button's padding, so switching states changes
    // contentRect but not the button's outer size — measuring contentRect would race against
    // itself around the threshold. Border-box is stable across padding changes.
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const [borderBox] = entry.borderBoxSize;
        if (borderBox) update(borderBox.inlineSize);
        else update(el.getBoundingClientRect().width);
      });
    });
    observer.observe(el, { box: 'border-box' });
    return () => observer.disconnect();
  }, []);

  let triggerIcon;
  // While the project list is loading, show a spinner in place of the chevron (even in narrow
  // mode) so the user sees the selector is not ready yet. See I1.
  if (props.isLoading)
    triggerIcon = (
      <Loader2 className="tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" />
    );
  else if (isTriggerNarrow) triggerIcon = undefined;
  else if (props.mode === 'project-multi')
    triggerIcon = <ChevronsUpDown className="tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" />;
  else triggerIcon = <ChevronDown className="tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" />;

  const openButtonHandler =
    props.mode === 'projectScrollGroup' ||
    (props.mode === 'project-multi' && props.onOpenProjectInGroup)
      ? handleOpenProjectInGroup
      : undefined;

  // The trigger's untruncated label is exposed through the shadcn Tooltip wrapped around the
  // PopoverTrigger below, never through a native `title` attribute: `title` surfaces the
  // browser-default yellow tooltip, inconsistent with the app's shadcn tooltip styling. Keep
  // `title` off this button so the two tooltips can never both appear.
  const triggerButton = (
    <Button
      ref={triggerRef}
      variant={props.buttonVariant ?? 'outline'}
      role="combobox"
      aria-expanded={open}
      aria-label={strings.ariaLabel || undefined}
      disabled={(props.isDisabled ?? false) || (props.isLoading ?? false)}
      className={cn(
        // `tw:shrink!` overrides shadcn Button's base `tw:shrink-0` (which would pin the trigger
        // at its intrinsic width in a flex row and force overflow past sibling icons/spacers).
        // `tw:min-w-0` then lets flex-shrink actually reduce below content width. `tw:w-full`
        // still handles the standalone / block-parent case at 100% of the container.
        'tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:shrink! tw:items-center tw:justify-between tw:overflow-hidden tw:font-normal',
        // Narrow triggers get a tighter internal padding + smaller text so the leading characters
        // of the shortName stay visible in an icon-rail sidebar (~56px). Layout unchanged in the
        // wide case.
        isTriggerNarrow && 'tw:px-0.5 tw:text-xs',
      )}
    >
      <span className="tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start">
        {typeof triggerContent.node === 'string' ? (
          <span className="tw:min-w-0 tw:truncate">{triggerContent.node}</span>
        ) : (
          triggerContent.node
        )}
      </span>
      {triggerIcon}
    </Button>
  );
  // Wrap the trigger tooltip in its own local TooltipProvider so the selector renders standalone
  // (in stories, tests, and consumers that haven't installed a TooltipProvider). Consumers that
  // DO install one — like the manage-books dialog — see no behavioral difference: Radix nests
  // providers fine.
  const triggerWithTooltip = triggerContent.title ? (
    <TooltipProvider delayDuration={400}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>{triggerContent.title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
  );

  // The filter menu only exists to let the user switch between groupings. With 0 or 1 groupings
  // there is nothing to switch between (single-grouping lock), so drop the funnel button entirely.
  const showFilterMenu = availableGroupings.length > 1;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      {triggerWithTooltip}
      <PopoverContent
        align="start"
        collisionPadding={16}
        className="tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0"
      >
        <TooltipProvider delayDuration={400}>
          <Command shouldFilter={false}>
            {/* No `border-b` here — CommandInput's own InputGroup carries a full 1px border, and
                stacking the two draws an unexpected second horizontal line just below the pill. */}
            <div className="tw:flex tw:items-center tw:pe-2">
              <div className="tw:flex-1">
                <CommandInput
                  value={query}
                  onValueChange={setQuery}
                  placeholder={strings.searchPlaceholder}
                  className="tw:border-0"
                  // Picker semantics: with nothing typed, Space picks the highlighted project
                  // (the Enter UX) — the project list is the whole point here and a leading space
                  // is meaningless in a project name search.
                  spaceSelectsHighlightedItem
                />
              </div>
              {showFilterMenu && (
                <FilterMenu
                  availableGroupings={availableGroupings}
                  activeGrouping={activeGrouping}
                  onChangeGrouping={setActiveGrouping}
                  strings={strings}
                />
              )}
            </div>
            {props.mode === 'project-multi' && props.selection.pairs.length > 0 && (
              // Right-aligned "Clear all" only. Select all was removed — it is redundant with the
              // built-in Selection grouping (which surfaces what's selected in its own bucket) and
              // encouraged sloppy bulk selection. Clear all is hidden while nothing is selected.
              <div className="tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2">
                <Button variant="ghost" size="sm" onClick={handleClearAll}>
                  {`${strings.clearAll} (${props.selection.pairs.length.toString()})`}
                </Button>
              </div>
            )}
            <CommandList>
              <CommandEmpty>{strings.commandEmptyMessage}</CommandEmpty>
              {sections.map((section, index) => (
                // Custom groupings yield multiple 'grouping' sections, so the section key must
                // include the label (or key) to stay stable across re-orders.
                <Fragment
                  key={`${section.kind}:${section.groupingId ?? ''}:${section.key ?? section.label ?? ''}`}
                >
                  <CommandGroup heading={sectionHeading(section, strings)}>
                    {section.rows.map((row) => (
                      <ProjectRowView
                        key={row.rowKey}
                        row={row}
                        mode={props.mode}
                        strings={strings}
                        onClick={handleRowClick}
                        onOpen={openButtonHandler}
                        selectedRowRef={selectedRowRef}
                      />
                    ))}
                  </CommandGroup>
                  {index < sections.length - 1 && <CommandSeparator />}
                </Fragment>
              ))}
            </CommandList>
          </Command>
        </TooltipProvider>
      </PopoverContent>
    </Popover>
  );
}

function sectionHeading(
  section: RowSection,
  strings: Required<ProjectSelectorLocalizedStrings>,
): string | undefined {
  switch (section.kind) {
    case 'openTabs':
      return strings.openTabsSectionHeading;
    case 'other':
      return strings.otherProjectsSectionHeading;
    case 'grouping':
      return section.label;
    case 'flat':
    default:
      return undefined;
  }
}

export default ProjectSelector;

// #endregion
