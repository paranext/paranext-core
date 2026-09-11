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
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronsUpDown,
  Loader2,
  SlidersHorizontal,
} from 'lucide-react';
import {
  getLocalizeKeyForScrollGroupId,
  normalizeProjectId,
  type LocalizedStringValue,
  type ScrollGroupId,
} from 'platform-bible-utils';
import { DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS } from 'platform-bible-utils/experimental';
import { cn } from '@/utils/shadcn-ui/utils';
import { Z_INDEX_ABOVE_POPOVER } from '@/components/z-index';
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
  DropdownMenuCheckboxItem,
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
  partitionAndSort,
  partitionByCustomSections,
  partitionByLanguage,
  partitionByLastUsed,
  partitionByType,
  partitionByVersification,
  type ProjectSelectorOpenTab,
  type ProjectSelectorMultiSelection,
  type ProjectSelectorProjectPair,
  type ProjectRow,
  type ProjectSelectorScrollGroupSelection,
  type ProjectSelectorSelection,
  type ProjectSelectorMode,
  type ProjectSelectorProject,
  type ProjectSelectorSection,
  type RowSection,
} from './project-selector.rows';

export type {
  ProjectSelectorOpenTab,
  ProjectSelectorMultiSelection,
  ProjectSelectorProjectPair,
  ProjectRow,
  ProjectSelectorScrollGroupSelection,
  ProjectSelectorSelection,
  ProjectSelectorMode,
  ProjectSelectorProject,
  ProjectSelectorSection,
} from './project-selector.rows';

// #region Localized strings

/**
 * Object containing all keys used for localization in this component. If you're using this
 * component in an extension, you can pass it into the useLocalizedStrings hook to easily obtain the
 * localized strings and pass them into the localizedStrings prop of this component
 */
export const PROJECT_SELECTOR_STRING_KEYS = Object.freeze([
  /** Placeholder for the popover's search input. Defaults to `"Search projects & resources"`. */
  '%webView_projectSelector_searchPlaceholder%',
  /** Accessible label for the view-options icon button. Defaults to `"View options"`. */
  '%webView_projectSelector_viewOptionsAriaLabel%',
  /** View options: section heading for the grouping choices. Defaults to `"Group by"`. */
  '%webView_projectSelector_groupSectionLabel%',
  /** View options: section heading for the filter toggles. Defaults to `"Filter"`. */
  '%webView_projectSelector_filterSectionLabel%',
  /** View options: "None" radio item under the Group by section. Defaults to `"None"`. */
  '%webView_projectSelector_groupNone%',
  /** View options: "Open tabs" item under the Group by section. Defaults to `"Open tabs"`. */
  '%webView_projectSelector_groupByOpenTabs%',
  /** View options: "Last used" item under the Group by section. Defaults to `"Last used"`. */
  '%webView_projectSelector_groupByLastUsed%',
  /** View options: "Language" item under the Group by section. Defaults to `"Language"`. */
  '%webView_projectSelector_groupByLanguage%',
  /** View options: "Versification" item under the Group by section. Defaults to `"Versification"`. */
  '%webView_projectSelector_groupByVersification%',
  /** View options: "Type" item under the Group by section. Defaults to `"Type"`. */
  '%webView_projectSelector_groupByType%',
  /**
   * View options: "Custom" item under the Group by section, shown when `'custom'` is in
   * `availableGroupings`. Defaults to `"Custom"` — a mechanism name, not an axis a user recognizes,
   * so a caller offering `'custom'` should override it with the name of the axis their
   * `customSections` actually express (e.g. `"Relevance"`, `"Workflow stage"`).
   */
  '%webView_projectSelector_groupByCustom%',
  /** View options: multi-only item under the Filter section. Defaults to `"Show selected only"`. */
  '%webView_projectSelector_filterShowSelectedOnly%',
  /** Section heading for the Open tabs section. Defaults to `"Opened project & resource tabs"`. */
  '%webView_projectSelector_openTabsSectionHeading%',
  /** Section heading for the Other projects section. Defaults to `"Your projects & resources"`. */
  '%webView_projectSelector_otherProjectsSectionHeading%',
  /**
   * Section heading rendered for the "Unknown versification" bucket in versification-grouping mode
   * — covers projects whose versification can't be resolved at load time. Defaults to `"Unknown
   * versification"`.
   */
  '%webView_projectSelector_versificationUnknownSectionHeading%',
  /**
   * Section heading for rows without a `language` field when grouping by language. Defaults to
   * `"Unknown language"`.
   */
  '%webView_projectSelector_languageUnknownSectionHeading%',
  /**
   * Section heading for rows without a `type` field when grouping by type. Defaults to `"Unknown
   * type"`.
   */
  '%webView_projectSelector_typeUnknownSectionHeading%',
  /**
   * Section heading for the "Recently used" bucket when grouping by last used. Defaults to
   * `"Recently used"`.
   */
  '%webView_projectSelector_lastUsedRecentSectionHeading%',
  /**
   * Section heading for the "Other" bucket when grouping by last used — rows without a `lastUsedAt`
   * timestamp. Defaults to `"Other"`.
   */
  '%webView_projectSelector_lastUsedOtherSectionHeading%',
  /**
   * Section heading for the trailing bucket of rows that no caller-supplied custom section claimed,
   * when the active grouping is `custom`. Defaults to `"Other"`.
   */
  '%webView_projectSelector_customUnmatchedSectionHeading%',
  /**
   * Tooltip on the bound-but-closed chip. `{group}` is replaced with the scroll-group letter.
   * Defaults to `"Bound to {group} · not currently open"`.
   */
  '%webView_projectSelector_boundButClosedTooltip%',
  /** Label of the "Open" button shown on bound-but-closed rows. Defaults to `"Open"`. */
  '%webView_projectSelector_openButtonLabel%',
  /** Multi-select: "Select all" button. Defaults to `"Select all"`. */
  '%webView_projectSelector_selectAll%',
  /** Multi-select: "Clear all" button. Defaults to `"Clear all"`. */
  '%webView_projectSelector_clearAll%',
] as const);

/** Type definition for the localized strings used in this component */
export type ProjectSelectorLocalizedStrings = {
  [projectSelectorKey in (typeof PROJECT_SELECTOR_STRING_KEYS)[number]]?: LocalizedStringValue;
};

/**
 * English text rendered for each key when the caller supplies no localized value for it, so the
 * selector reads correctly in a consumer that has not wired up localization yet.
 */
const DEFAULT_STRINGS: Required<ProjectSelectorLocalizedStrings> = {
  '%webView_projectSelector_searchPlaceholder%': 'Search projects & resources',
  '%webView_projectSelector_viewOptionsAriaLabel%': 'View options',
  '%webView_projectSelector_groupSectionLabel%': 'Group by',
  '%webView_projectSelector_filterSectionLabel%': 'Filter',
  '%webView_projectSelector_groupNone%': 'None',
  '%webView_projectSelector_groupByOpenTabs%': 'Open tabs',
  '%webView_projectSelector_groupByLastUsed%': 'Last used',
  '%webView_projectSelector_groupByLanguage%': 'Language',
  '%webView_projectSelector_groupByVersification%': 'Versification',
  '%webView_projectSelector_groupByType%': 'Type',
  '%webView_projectSelector_groupByCustom%': 'Custom',
  '%webView_projectSelector_filterShowSelectedOnly%': 'Show selected only',
  '%webView_projectSelector_openTabsSectionHeading%': 'Open project & resource tabs',
  '%webView_projectSelector_otherProjectsSectionHeading%': 'Your projects & resources',
  '%webView_projectSelector_versificationUnknownSectionHeading%': 'Unknown versification',
  '%webView_projectSelector_languageUnknownSectionHeading%': 'Unknown language',
  '%webView_projectSelector_typeUnknownSectionHeading%': 'Unknown type',
  '%webView_projectSelector_lastUsedRecentSectionHeading%': 'Recently used',
  '%webView_projectSelector_lastUsedOtherSectionHeading%': 'Older',
  '%webView_projectSelector_customUnmatchedSectionHeading%': 'Other',
  '%webView_projectSelector_boundButClosedTooltip%': 'Follows group {group} · not currently open',
  '%webView_projectSelector_openButtonLabel%': 'Open',
  '%webView_projectSelector_selectAll%': 'Select all',
  '%webView_projectSelector_clearAll%': 'Clear all',
};

function resolveStrings(
  partial: ProjectSelectorLocalizedStrings | undefined,
): Required<ProjectSelectorLocalizedStrings> {
  const resolved = { ...DEFAULT_STRINGS };
  if (!partial) return resolved;
  PROJECT_SELECTOR_STRING_KEYS.forEach((key) => {
    const value = partial[key];
    // `useLocalizedStrings` seeds every requested key with the key itself while localization is
    // loading and whenever the lookup fails, so a value identical to its own key is not a
    // translation. Keep the English default for those rather than rendering a raw `%key%`.
    if (value && value !== key) resolved[key] = value;
  });
  return resolved;
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

/**
 * Every grouping option the selector knows about, in the canonical order they are offered in.
 * `ProjectSelectorGroupingOption`, the default `availableGroupings`, and the menu's runtime
 * validation all derive from this list, so adding an option here is the only edit needed.
 */
const GROUPING_OPTIONS = [
  'openTabs',
  'lastUsed',
  'language',
  'versification',
  'type',
  'custom',
] as const;

/**
 * The set of grouping options the view-options menu can offer. Each corresponds to a partition
 * function in `project-selector.rows` and requires the corresponding field on
 * `ProjectSelectorProject`:
 *
 * - `openTabs` — uses the `openTabs` prop; the default.
 * - `lastUsed` — uses `lastUsedAt` (ms epoch).
 * - `language` — uses `language`.
 * - `versification` — uses `versificationId` / `versificationName`; pair with
 *   `priorityVersificationId` to pin the caller's active bucket to the top.
 * - `type` — uses `type` / `typeName`.
 * - `custom` — uses the `customSections` prop; sections are caller-defined rather than derived from a
 *   project field.
 */
export type ProjectSelectorGroupingOption = (typeof GROUPING_OPTIONS)[number];

/**
 * Default `availableGroupings` when the caller does not pass the prop — every option except
 * `'custom'`, which needs `customSections` to mean anything and so is opt-in. Order matters: this
 * list defines the order the options appear in the menu.
 */
const DEFAULT_GROUPINGS: readonly ProjectSelectorGroupingOption[] = GROUPING_OPTIONS.filter(
  (option) => option !== 'custom',
);

type CommonProps = {
  /**
   * Every project and resource the picker can offer, in any order — the selector derives its rows,
   * sections and sort order from this list rather than from the order supplied.
   */
  projects: readonly ProjectSelectorProject[];
  /**
   * The project tabs currently open, one entry per `(projectId, scrollGroupId)` pair. Drives the
   * scroll-group chips on each row, the "Opened project & resource tabs" section, and which rows
   * count as bound-but-closed. Pass an empty array for a picker that knows nothing about open
   * tabs.
   */
  openTabs: readonly ProjectSelectorOpenTab[];
  /** Trigger label shown while nothing is selected, e.g. `"Select a project"`. */
  buttonPlaceholder?: string;
  /**
   * Message shown in place of the list when the user's search matches no row. Defaults to `"No
   * projects found"`; override it when "project" is the wrong word for what this picker lists.
   */
  commandEmptyMessage?: string;
  /**
   * Accessible name for the trigger, announced in place of its visible label (which is just the
   * selected project's name and says nothing about what picking one does). Supply one — without it
   * the control is announced only as an unnamed combo box.
   */
  ariaLabel?: string;
  /**
   * Button variant for the trigger, so the picker can read as the primary control of its surface or
   * recede into a toolbar. Defaults to the `Button` component's own default.
   */
  buttonVariant?: ButtonProps['variant'];
  /**
   * Extra classes on the trigger button, for fitting it to its container — width, alignment,
   * height. Merged after the selector's own classes, so it wins on conflict.
   */
  buttonClassName?: string;
  /**
   * Extra classes on the popover panel, most often to widen or narrow it so the row text has room
   * (the panel does not size itself to the longest project name).
   */
  popoverContentClassName?: string;
  /**
   * Inline styles on the popover panel, for values a class can't carry — a computed max height
   * measured from the host layout, for instance.
   */
  popoverContentStyle?: CSSProperties;
  /**
   * How the popover lines up with the trigger. Use `'end'` when the trigger sits at the right edge
   * of its container so the panel opens inward rather than off-screen. Defaults to `'start'`.
   */
  alignDropDown?: 'start' | 'center' | 'end';
  /**
   * When true, the trigger is inert and styled as unavailable — for when picking a project makes no
   * sense yet (no permission, a prerequisite unmet). Use `isLoading` instead when the list is
   * merely still arriving.
   */
  isDisabled?: boolean;
  /**
   * When true, the trigger shows a spinner (instead of the chevron) and is disabled, signalling
   * that the project list is still loading. Distinct from `isDisabled`, which conveys a generic
   * busy/blocked state with no spinner.
   */
  isLoading?: boolean;
  localizedStrings?: ProjectSelectorLocalizedStrings;
  /**
   * Grouping options exposed in the view-options menu, in the order they appear. Defaults to all
   * five built-ins (`['openTabs', 'lastUsed', 'language', 'versification', 'type']`) so a caller
   * gets every grouping without passing the prop. Pass a subset to hide the ones your data doesn't
   * support (e.g. `['openTabs']` if none of your rows carry `type`/`lastUsedAt`), or an empty array
   * to hide the menu's "Group by" section — which, in a single-select picker, hides the menu
   * entirely since grouping is all it contains.
   */
  availableGroupings?: readonly ProjectSelectorGroupingOption[];
  /**
   * The grouping selected on initial mount. When absent, defaults to `'openTabs'` if the array
   * includes it, otherwise `'none'`. Pass `'none'` to explicitly open with a flat list. A value not
   * present in `availableGroupings` falls through to the same default.
   */
  defaultGrouping?: ProjectSelectorGroupingOption | 'none';
  /**
   * Legacy shorthand for `defaultGrouping`. When `false`, opens with `'none'`; when `true` or
   * absent, uses the resolved default. Prefer `defaultGrouping` for new code. Superseded silently
   * if both are set.
   *
   * @deprecated Use {@link defaultGrouping} instead.
   */
  defaultGroupByOpenTabs?: boolean;
  /**
   * Hide the chevron icon in the trigger button. For very narrow triggers (e.g. an icon-rail
   * sidebar ~56px wide) the chevron plus its margin consumes the entire content box and the label
   * truncates to nothing; hiding it leaves room for a few characters of the project name. Keep the
   * trigger visually recognizable as a control through its button variant when using this. Defaults
   * to `false`.
   */
  hideTriggerChevron?: boolean;
  /**
   * Versification id whose bucket should render first when the active grouping is `versification`
   * (typically the caller's active project's versification). Ignored under any other grouping.
   * Optional — when absent, versification buckets sort alphabetically by `versificationName`.
   */
  priorityVersificationId?: string;
  /**
   * When true, the view-options menu next to the search box is not rendered. Defaults to `false`.
   *
   * For a picker whose rows are ALL open tabs (so the "Open tabs" grouping only adds a section
   * heading over an otherwise identical list) and which is single-select (so "Show selected only"
   * never renders), the menu reduces to a control with no meaningful effect. Set this to drop the
   * affordance rather than present an inert one. Grouping still applies per `defaultGrouping`; only
   * the user-facing control goes away.
   */
  hideFilterMenu?: boolean;
  /**
   * Sections to bucket the list into, used when the active grouping is `'custom'`. Evaluated in
   * order — a project lands in the first section whose `match` accepts it, and anything unmatched
   * collects into a trailing section headed by
   * `%webView_projectSelector_customUnmatchedSectionHeading%` ("Other"), which you can retitle
   * through `localizedStrings`. Empty sections are not rendered.
   *
   * Must be referentially stable across renders — hoist it to a module constant or memoize it. The
   * selector re-partitions whenever this array's identity changes, so an inline literal
   * re-partitions the whole list on every render, including every search keystroke. `NO_OPEN_TABS`
   * in `extensions/src/platform-scripture/src/find/find.component.tsx` is the sibling precedent for
   * the hoisted-constant shape.
   *
   * `'custom'` is not offered by default: add it to `availableGroupings` to expose it. When you do,
   * override `%webView_projectSelector_groupByCustom%` through `localizedStrings` — its "Custom"
   * default names the mechanism, and the user needs the name of the axis your sections actually
   * express. To pin the list to these sections and nothing else, pass
   * `availableGroupings={['custom']}` with `defaultGrouping="custom"` and `hideFilterMenu`, since a
   * one-item grouping menu is an inert control.
   *
   * If `'custom'` is the active grouping and this is absent or empty, the list renders flat
   * (unsectioned) rather than showing an empty view.
   */
  customSections?: readonly ProjectSelectorSection[];
  /**
   * Render an indicator for a row — typically a small icon distinguishing a project from a
   * resource, derived from the caller's own `type` values.
   *
   * The selector ships no taxonomy and no default mapping: `type` is a free-form string whose
   * meaning belongs to whoever produced the list (Paratext project types and DBL resource types are
   * two different vocabularies, neither owned by this library), so the caller decides what a value
   * looks like. Output is treated as decorative — give it an accessible name yourself, or mark it
   * `aria-hidden`, since the selector cannot know what the glyph means. Marking it `aria-hidden`
   * does not strand the distinction: the row tooltip names the project's `typeName` whenever one is
   * supplied, so the type stays reachable by hover and by screen reader.
   */
  renderProjectIndicator?: (project: ProjectSelectorProject) => ReactNode;
};

/**
 * Props for {@link ProjectSelector}, discriminated by `mode`. Every mode shares the list, trigger
 * and popover props in `CommonProps`; `mode` then fixes the shape of `selection` and of the
 * `onChangeSelection` callback, and decides whether `onOpenProjectInGroup` is required. Pick the
 * mode from what the caller selects — a project, a set of project/scroll-group pairs, or one
 * project for a given scroll group.
 */
export type ProjectSelectorProps =
  | (CommonProps & {
      mode: 'project';
      selection: ProjectSelectorSelection;
      /** Called when the user picks a project. */
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
      selection: ProjectSelectorMultiSelection;
      /** Called when the user changes the set of selected project/scroll-group pairs. */
      onChangeSelection: (selection: { pairs: ProjectSelectorProjectPair[] }) => void;
      /**
       * Called when the user clicks the "Open" button on a bound-but-closed row (or the row
       * itself). The caller is expected to open a tab via `papi.webViews.openWebView(...)`.
       */
      onOpenProjectInGroup?: (projectId: string, scrollGroupId: ScrollGroupId) => void;
      /**
       * Optional custom trigger label when at least one pair is selected. Receives the list of
       * selected `(project, scrollGroupId)` tuples. Defaults to `"N: short1 (A), short2 (B),
       * ..."`.
       */
      getSelectedText?: (
        selected: ReadonlyArray<{
          project: ProjectSelectorProject;
          scrollGroupId?: ScrollGroupId;
        }>,
      ) => string;
    })
  | (CommonProps & {
      mode: 'projectScrollGroup';
      selection: ProjectSelectorScrollGroupSelection;
      /** Called when the user picks a project for the given scroll group. */
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
  /** Resolved by the parent from `renderProjectIndicator`. */
  indicator?: ReactNode;
  /**
   * Whether to render the fixed-width indicator column at all. True whenever the caller supplied
   * `renderProjectIndicator`, even for rows it returned nothing for, so every row's label starts at
   * the same offset.
   */
  reserveIndicatorSlot: boolean;
};

function ProjectRowView({
  row,
  mode,
  strings,
  onClick,
  onOpen,
  selectedRowRef,
  indicator,
  reserveIndicatorSlot,
}: RowRenderProps) {
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

  const tooltipHasLanguage = Boolean(row.language || row.languageCode);

  // Tooltip lines that convey information NOT visible in the row text. These rows should
  // always show a tooltip on hover, regardless of whether the visible text is truncated.
  const hasExtraTooltipContent =
    tooltipHasLanguage ||
    Boolean(row.typeName) ||
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
            aria-label={strings['%webView_projectSelector_openButtonLabel%']}
          >
            <ArrowRight className="tw:h-3 tw:w-3" />
            {strings['%webView_projectSelector_openButtonLabel%']}
          </Button>
        )}
      </span>
    );
  }

  const rowNode = (
    <CommandItem
      ref={row.isSelected ? selectedRowRef : undefined}
      value={`${row.rowKey} ${row.shortName} ${row.fullName} ${row.language ?? ''} ${row.languageCode ?? ''}`}
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
      {/* Fixed-width slot, reserved for every row once the caller supplies an indicator renderer.
          A renderer that returns a glyph for some rows and nothing for others is the expected
          shape (an icon for resources only, say), and rendering the wrapper conditionally would
          start those rows' labels at a different offset. Sized like the check slot above; `gap` on
          the row handles the spacing, so this stays correct under RTL. */}
      {reserveIndicatorSlot && (
        <span className="tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center">
          {indicator}
        </span>
      )}
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
      ? strings['%webView_projectSelector_boundButClosedTooltip%'].replace('{group}', letter)
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
        style={{ zIndex: Z_INDEX_ABOVE_POPOVER }}
      >
        <div className="tw:font-semibold">{row.fullName}</div>
        {tooltipHasLanguage && (
          <div className="tw:text-sm">
            {row.language}
            {row.languageCode && (
              <span className="tw:text-muted-foreground"> ({row.languageCode})</span>
            )}
          </div>
        )}
        {/* The row's type is otherwise carried only by the caller's optional
            `renderProjectIndicator` glyph, which the selector treats as decorative. Surfacing
            `typeName` here keeps "project or resource?" reachable by hover and by screen reader. */}
        {row.typeName && <div className="tw:text-sm">{row.typeName}</div>}
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

// #region View options menu

type GroupingChoice = ProjectSelectorGroupingOption | 'none';

/**
 * The grouping a picker opens in, from the caller's props. Also the baseline the view-options
 * trigger compares the live grouping against, so "grouped differently from how this opened" is one
 * definition rather than two that can drift.
 */
function resolveDefaultGrouping(
  availableGroupings: readonly ProjectSelectorGroupingOption[],
  defaultGrouping: ProjectSelectorGroupingOption | 'none' | undefined,
  defaultGroupByOpenTabs: boolean | undefined,
): GroupingChoice {
  if (defaultGrouping) {
    if (defaultGrouping === 'none') return 'none';
    if (availableGroupings.includes(defaultGrouping)) return defaultGrouping;
  }
  if (defaultGroupByOpenTabs === false) return 'none';
  // Fall back to 'openTabs' when it's on the menu, otherwise 'none'. Deliberately NOT
  // availableGroupings[0] — a caller who restricts to e.g. ['language','type'] should still open
  // in flat mode, not silently pick 'language'.
  return availableGroupings.includes('openTabs') ? 'openTabs' : 'none';
}

function isGroupingChoice(value: string): value is GroupingChoice {
  return value === 'none' || GROUPING_OPTIONS.some((option) => option === value);
}

type ViewOptionsMenuProps = {
  availableGroupings: readonly ProjectSelectorGroupingOption[];
  activeGrouping: GroupingChoice;
  /** The grouping the picker opens in, so the trigger can show when the user has moved off it. */
  defaultGrouping: GroupingChoice;
  onChangeGrouping: (value: GroupingChoice) => void;
  showSelectedOnly: boolean | undefined;
  onChangeShowSelectedOnly: ((value: boolean) => void) | undefined;
  strings: Required<ProjectSelectorLocalizedStrings>;
};

function groupingLabel(
  option: ProjectSelectorGroupingOption,
  strings: Required<ProjectSelectorLocalizedStrings>,
): string {
  switch (option) {
    case 'openTabs':
      return strings['%webView_projectSelector_groupByOpenTabs%'];
    case 'lastUsed':
      return strings['%webView_projectSelector_groupByLastUsed%'];
    case 'language':
      return strings['%webView_projectSelector_groupByLanguage%'];
    case 'versification':
      return strings['%webView_projectSelector_groupByVersification%'];
    case 'type':
      return strings['%webView_projectSelector_groupByType%'];
    case 'custom':
      return strings['%webView_projectSelector_groupByCustom%'];
    default:
      return option;
  }
}

function ViewOptionsMenu({
  availableGroupings,
  activeGrouping,
  defaultGrouping,
  onChangeGrouping,
  showSelectedOnly,
  onChangeShowSelectedOnly,
  strings,
}: ViewOptionsMenuProps) {
  // The trigger reads as pressed whenever the list differs from how the picker opened: a filter
  // toggle is on, or the user has grouped by something other than the default. Grouping counts
  // because it is the bulk of this menu — and the whole of it in single-select mode, where
  // `showSelectedOnly` never renders and the trigger could otherwise never appear active.
  const isViewModified = Boolean(showSelectedOnly) || activeGrouping !== defaultGrouping;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'tw:h-8 tw:w-8 tw:shrink-0 tw:p-0',
            // Match shadcn Toggle's "on" styling so the trigger reads as a toggle-group button
            // that's currently pressed while the view is off its defaults.
            isViewModified &&
              'tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent',
          )}
          aria-label={strings['%webView_projectSelector_viewOptionsAriaLabel%']}
          aria-pressed={isViewModified}
          title={strings['%webView_projectSelector_viewOptionsAriaLabel%']}
          onMouseDown={(event: MouseEvent) => event.preventDefault()}
        >
          <SlidersHorizontal className="tw:h-4 tw:w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="tw:w-56"
        style={{ zIndex: Z_INDEX_ABOVE_POPOVER }}
      >
        {availableGroupings.length > 0 && (
          <>
            <DropdownMenuLabel>
              {strings['%webView_projectSelector_groupSectionLabel%']}
            </DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={activeGrouping}
              onValueChange={(value) => {
                if (isGroupingChoice(value)) onChangeGrouping(value);
              }}
            >
              {/* No `onSelect={preventDefault}` here — picking a grouping should close the menu
                  immediately, so the user sees the newly grouped list without a second click. */}
              <DropdownMenuRadioItem value="none">
                {strings['%webView_projectSelector_groupNone%']}
              </DropdownMenuRadioItem>
              {availableGroupings.map((option) => (
                <DropdownMenuRadioItem key={option} value={option}>
                  {groupingLabel(option, strings)}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </>
        )}
        {onChangeShowSelectedOnly && (
          <>
            {availableGroupings.length > 0 && <DropdownMenuSeparator />}
            <DropdownMenuLabel>
              {strings['%webView_projectSelector_filterSectionLabel%']}
            </DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={Boolean(showSelectedOnly)}
              onCheckedChange={onChangeShowSelectedOnly}
              onSelect={(event) => event.preventDefault()}
            >
              {strings['%webView_projectSelector_filterShowSelectedOnly%']}
            </DropdownMenuCheckboxItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// #endregion

// #region Main component

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
 *
 * @example
 *
 * ```tsx
 * const [projectId, setProjectId] = useState<string | undefined>();
 * const [localizedStrings] = useLocalizedStrings(PROJECT_SELECTOR_STRING_KEYS);
 *
 * <ProjectSelector
 *   mode="project"
 *   projects={projects}
 *   openTabs={openTabs}
 *   selection={{ projectId }}
 *   onChangeSelection={({ projectId: newProjectId }) => setProjectId(newProjectId)}
 *   buttonPlaceholder="Select a project"
 *   ariaLabel="Project"
 *   localizedStrings={localizedStrings}
 * />;
 * ```
 */
export function ProjectSelector(props: ProjectSelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const availableGroupings = props.availableGroupings ?? DEFAULT_GROUPINGS;
  const defaultGrouping = resolveDefaultGrouping(
    availableGroupings,
    props.defaultGrouping,
    props.defaultGroupByOpenTabs,
  );
  // Mount-time initializer only — we do NOT re-derive when props change, since that would fight a
  // user who has since picked a different grouping. Callers control the initial value; the
  // component owns the interactive one.
  const [activeGrouping, setActiveGrouping] = useState<GroupingChoice>(defaultGrouping);
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

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

  const strings = resolveStrings(props.localizedStrings);

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
    let result = rows;
    if (needle) {
      result = result.filter(
        (r) =>
          r.shortName.toLowerCase().includes(needle) ||
          r.fullName.toLowerCase().includes(needle) ||
          (r.language ?? '').toLowerCase().includes(needle) ||
          (r.languageCode ?? '').toLowerCase().includes(needle),
      );
    }
    if (props.mode === 'project-multi' && showSelectedOnly) {
      result = result.filter((r) => r.isSelected);
    }
    return result;
  }, [rows, query, props.mode, showSelectedOnly]);

  // Keyed by normalizeProjectId because open-tab ids can arrive lowercased while canonical
  // project ids are uppercase; partitionByCustomSections looks rows up by the same key.
  const projectsById = useMemo(
    () => new Map(props.projects.map((project) => [normalizeProjectId(project.id), project])),
    [props.projects],
  );

  const { renderProjectIndicator } = props;
  const renderIndicator = useCallback(
    (row: ProjectRow): ReactNode => {
      if (!renderProjectIndicator) return undefined;
      const project = projectsById.get(normalizeProjectId(row.projectId));
      return project ? renderProjectIndicator(project) : undefined;
    },
    [renderProjectIndicator, projectsById],
  );

  // Section partitioning dispatches on the active grouping. Versification is just another option
  // here — `priorityVersificationId` still lets the caller pin their active project's bucket to
  // the top, but only when the active grouping happens to be 'versification'.
  //
  // The section headings are read into locals so the memo below can list them as plain
  // dependencies.
  const lastUsedRecentSectionHeading =
    strings['%webView_projectSelector_lastUsedRecentSectionHeading%'];
  const lastUsedOtherSectionHeading =
    strings['%webView_projectSelector_lastUsedOtherSectionHeading%'];
  const languageUnknownSectionHeading =
    strings['%webView_projectSelector_languageUnknownSectionHeading%'];
  const versificationUnknownSectionHeading =
    strings['%webView_projectSelector_versificationUnknownSectionHeading%'];
  const typeUnknownSectionHeading = strings['%webView_projectSelector_typeUnknownSectionHeading%'];
  const customUnmatchedSectionHeading =
    strings['%webView_projectSelector_customUnmatchedSectionHeading%'];

  const sections = useMemo(() => {
    switch (activeGrouping) {
      case 'openTabs':
        return partitionAndSort(filteredRows, true);
      case 'lastUsed':
        return partitionByLastUsed(
          filteredRows,
          lastUsedRecentSectionHeading,
          lastUsedOtherSectionHeading,
        );
      case 'language':
        return partitionByLanguage(filteredRows, languageUnknownSectionHeading);
      case 'versification':
        return partitionByVersification(
          filteredRows,
          props.priorityVersificationId,
          versificationUnknownSectionHeading,
        );
      case 'type':
        return partitionByType(filteredRows, typeUnknownSectionHeading);
      case 'custom':
        return partitionByCustomSections(
          filteredRows,
          props.customSections ?? [],
          projectsById,
          customUnmatchedSectionHeading,
        );
      case 'none':
      default:
        return partitionAndSort(filteredRows, false);
    }
  }, [
    filteredRows,
    activeGrouping,
    props.customSections,
    projectsById,
    props.priorityVersificationId,
    versificationUnknownSectionHeading,
    languageUnknownSectionHeading,
    lastUsedRecentSectionHeading,
    lastUsedOtherSectionHeading,
    typeUnknownSectionHeading,
    customUnmatchedSectionHeading,
  ]);

  // Every (project, scrollGroupId) pair available for selection — independent of the current
  // search query or "Show selected only" filter. Used by "Select all" in multi mode so the user
  // can select the full catalog without first clearing the search box.
  const allPairs = useMemo<ProjectSelectorProjectPair[]>(() => {
    if (props.mode !== 'project-multi') return [];
    const result: ProjectSelectorProjectPair[] = [];
    props.projects.forEach((project) => {
      // Case-insensitive match: open-tab projectIds may be lowercased while project ids are
      // canonical UPPERCASE. See normalizeProjectId / I12.
      const tabs = props.openTabs.filter(
        (t) => normalizeProjectId(t.projectId) === normalizeProjectId(project.id),
      );
      if (tabs.length === 0) {
        result.push({ projectId: project.id });
        return;
      }
      const seenGroups = new Set<ScrollGroupId>();
      tabs.forEach((tab) => {
        if (seenGroups.has(tab.scrollGroupId)) return;
        seenGroups.add(tab.scrollGroupId);
        result.push({ projectId: project.id, scrollGroupId: tab.scrollGroupId });
      });
    });
    return result;
  }, [props.mode, props.projects, props.openTabs]);

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
        const match = (p: ProjectSelectorProjectPair) =>
          p.projectId === row.projectId && p.scrollGroupId === row.scrollGroupId;
        const next = current.some(match)
          ? current.filter((p) => !match(p))
          : [...current, { projectId: row.projectId, scrollGroupId: row.scrollGroupId }];
        props.onChangeSelection({ pairs: next });
        // If the user just unticked the last selected item while "Show selected only" is on,
        // turn the filter off so they don't end up staring at an empty list.
        if (next.length === 0 && showSelectedOnly) setShowSelectedOnly(false);
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

  const handleSelectAll = () => {
    if (props.mode !== 'project-multi') return;
    const existing = props.selection.pairs;
    const existingKey = new Set(existing.map((p) => `${p.projectId}:${p.scrollGroupId ?? ''}`));
    const merged = [...existing];
    allPairs.forEach((pair) => {
      const key = `${pair.projectId}:${pair.scrollGroupId ?? ''}`;
      if (!existingKey.has(key)) {
        existingKey.add(key);
        merged.push(pair);
      }
    });
    props.onChangeSelection({ pairs: merged });
  };

  const handleClearAll = () => {
    if (props.mode !== 'project-multi') return;
    props.onChangeSelection({ pairs: [] });
    // Clearing everything while "Show selected only" is on would leave an empty list with no
    // obvious way out, since the toggle lives inside the view-options menu. Turn it off.
    if (showSelectedOnly) setShowSelectedOnly(false);
  };

  const triggerContent = useMemo<{ node: ReactNode; title: string }>(() => {
    switch (props.mode) {
      case 'project': {
        const selected = props.projects.find((p) => p.id === props.selection.projectId);
        let text = selected ? selected.shortName : (props.buttonPlaceholder ?? '');
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
          const text = props.buttonPlaceholder ?? '';
          return { node: text, title: text };
        }
        type Tuple = { project: ProjectSelectorProject; scrollGroupId?: ScrollGroupId };
        const tuples: Tuple[] = [];
        pairs.forEach((pair) => {
          const project = props.projects.find((p) => p.id === pair.projectId);
          if (project) tuples.push({ project, scrollGroupId: pair.scrollGroupId });
        });
        if (tuples.length === 0) {
          const text = props.buttonPlaceholder ?? '';
          return { node: text, title: text };
        }
        if (props.getSelectedText) {
          const text = props.getSelectedText(tuples);
          return { node: text, title: text };
        }
        const items = tuples
          .map(({ project, scrollGroupId }) =>
            scrollGroupId === undefined
              ? project.shortName
              : `${project.shortName} (${scrollGroupLetterFromMap(scrollGroupId)})`,
          )
          .join(', ');
        // One pair selected → drop the count; the name already conveys the cardinality.
        if (tuples.length === 1) return { node: items, title: items };
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
          const text = props.buttonPlaceholder ?? '';
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
  }, [props]);

  let triggerIcon;
  // While the project list is loading, show a spinner in place of the chevron (even in
  // hideTriggerChevron mode) so the user sees the selector is not ready yet. See I1.
  if (props.isLoading)
    triggerIcon = (
      <Loader2 className="tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" />
    );
  else if (props.hideTriggerChevron) triggerIcon = undefined;
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
      variant={props.buttonVariant ?? 'outline'}
      role="combobox"
      aria-expanded={open}
      aria-label={props.ariaLabel}
      disabled={(props.isDisabled ?? false) || (props.isLoading ?? false)}
      className={cn(
        'tw:flex tw:w-[180px] tw:items-center tw:justify-between tw:overflow-hidden',
        props.buttonClassName,
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
  // DO install one — like the manage-books dialog — see no behavioural difference: Radix nests
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

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      {triggerWithTooltip}
      <PopoverContent
        align={props.alignDropDown ?? 'start'}
        collisionPadding={16}
        className={cn('tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0', props.popoverContentClassName)}
        style={props.popoverContentStyle}
      >
        <TooltipProvider delayDuration={400}>
          <Command shouldFilter={false}>
            <div className="tw:flex tw:items-center tw:border-b tw:pe-2">
              <div className="tw:flex-1">
                <CommandInput
                  value={query}
                  onValueChange={setQuery}
                  placeholder={strings['%webView_projectSelector_searchPlaceholder%']}
                  className="tw:border-0"
                  // Picker semantics: with nothing typed, Space picks the highlighted project
                  // (the Enter UX) — the project list is the whole point here and a leading space
                  // is meaningless in a project name search.
                  spaceSelectsHighlightedItem
                />
              </div>
              {!props.hideFilterMenu &&
                (availableGroupings.length > 0 || props.mode === 'project-multi') && (
                  <ViewOptionsMenu
                    availableGroupings={availableGroupings}
                    activeGrouping={activeGrouping}
                    defaultGrouping={defaultGrouping}
                    onChangeGrouping={setActiveGrouping}
                    showSelectedOnly={props.mode === 'project-multi' ? showSelectedOnly : undefined}
                    onChangeShowSelectedOnly={
                      props.mode === 'project-multi' ? setShowSelectedOnly : undefined
                    }
                    strings={strings}
                  />
                )}
            </div>
            {props.mode === 'project-multi' && (
              <div className="tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2">
                <Button variant="ghost" size="sm" onClick={handleSelectAll}>
                  {`${strings['%webView_projectSelector_selectAll%']} (${allPairs.length.toString()})`}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClearAll}>
                  {`${strings['%webView_projectSelector_clearAll%']} (${props.selection.pairs.length.toString()})`}
                </Button>
              </div>
            )}
            <CommandList>
              <CommandEmpty>{props.commandEmptyMessage ?? 'No projects found'}</CommandEmpty>
              {sections.map((section, index) => (
                // Grouping schemes emit several sections of the same `kind`, so the key needs more
                // than that: custom sections carry an explicit `id`, and the rest are distinguished
                // by their heading label.
                <Fragment key={section.id ?? `${section.kind}:${section.label ?? ''}`}>
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
                        indicator={renderIndicator(row)}
                        reserveIndicatorSlot={Boolean(props.renderProjectIndicator)}
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
      return strings['%webView_projectSelector_openTabsSectionHeading%'];
    case 'other':
      return strings['%webView_projectSelector_otherProjectsSectionHeading%'];
    case 'versification':
    case 'language':
    case 'type':
    case 'lastUsed':
    case 'custom':
      return section.label;
    case 'flat':
    default:
      return undefined;
  }
}

export default ProjectSelector;

// #endregion
