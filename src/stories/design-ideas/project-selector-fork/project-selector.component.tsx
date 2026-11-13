// Design-ideas fork of
// lib/platform-bible-react/src/components/advanced/project-selector/project-selector.component.tsx.
// Kept as close to the production file as possible. What the fork adds: `searchOnlyProjects` —
// rows that appear only while the search query is non-empty, appended after every section in a
// muted style, each with a short hint ("Get", "Install · 12 MB"), and handed to
// `onSelectSearchOnlyProject` instead of changing the selection. The production component keeps
// its search query internal, so a caller cannot add such rows from outside. Also fork-only:
// `showSearchOnlyProjectsWithoutQuery` (list those rows before any search), `renderProjectIcon` (a
// leading type icon before the name), `getProjectTooltipLine` (an extra row tooltip line), and a
// grouping's `getSectionCaption` (a muted line under a section heading), and collapsible sections:
// every section heading (the search-only one included) is a toggle button with a chevron, all
// sections start expanded, any edit to the search query expands them all again, and closing the
// popover resets them. See `SectionHeadingToggle` for how that coexists with cmdk's keyboard model.
// Also fork-only: `getSearchOnlySectionHeading` (a heading built from the search-only row count),
// and `searchOnlyPaging` — a footer row that, instead of leaving the popover, lists the search-only
// rows in batches inside it, loading the next batch (after a simulated delay) whenever the end of
// the list scrolls into view; see `ProjectSelectorSearchOnlyPaging`. Also fork-only:
// `formatSectionCount` (a count after every section heading, "(x of y)" while searching), a
// grouping's `isSectionListedOnlyWhileSearching`, `isSectionHeadingShownOnlyWhileSearching` and
// `areSectionsCollapsedByDefault`, a list that scrolls to its top when the grouping changes, an X
// that clears the search box, a shadcn `Empty` zero state, a footer row that is also a Tab stop,
// `renderProjectTrailingIndicator` (a glyph at a row's end), tooltips that open leftward on
// everything at a row's end (`TrailingTooltip`), a ⋮ menu for its "Compact" view option (each row
// on one line: short name, then the muted full name; on from the start with
// `isCompactViewByDefault`, left out with `hasViewOptions`), and in `project-multi` mode an unselect-all checkbox
// beside the search box, with a trigger that names the selection without counting it (or shows a
// fixed `triggerLabel`, the names moving to its tooltip). The fork draws no rules
// between sections — the headings alone divide the list — only one above the footer row.
//
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
  useId,
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
  EllipsisVertical,
  ArrowUpToLine,
  Minus,
  Loader2,
  X,
} from 'lucide-react';
import {
  formatProjectName,
  getLocalizeKeyForScrollGroupId,
  hasDistinctFullName,
  normalizeProjectId,
  type ScrollGroupId,
} from 'platform-bible-utils';
import { DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS } from 'platform-bible-utils/experimental';
import {
  Badge,
  Button,
  type ButtonProps,
  cn,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Empty,
  EmptyContent,
  EmptyHeader,
  EmptyTitle,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useTruncationTooltip,
  Z_INDEX_ABOVE_POPOVER,
} from 'platform-bible-react';
import { resolveLocalizedString } from 'platform-bible-react/experimental';
import {
  computeRows,
  DEFAULT_SELECTED_SECTION_HEADING,
  DEFAULT_UNSELECTED_SECTION_HEADING,
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

import {
  makeOpenTabsGrouping,
  makeSelectionGrouping,
  readProjectSelectorString,
  type ProjectSelectorStringLookup,
} from './project-selector.groupings';

/**
 * An action row pinned below the project list — "More projects…", "Browse the server…". Expressed
 * as data rather than a render prop on purpose: the selector owns the markup so the row stays
 * keyboard-reachable, which a caller-rendered `<button>` would not be.
 */
/**
 * What {@link ProjectSelectorProps.renderProjectIndicator} returns for a row: the glyph, and
 * optionally what it means.
 *
 * One value rather than a glyph prop and a label prop, so the two cannot drift: a label with no
 * glyph would describe an icon that is not on screen, and there is nothing in a two-prop shape to
 * stop that. Returning `undefined` for a row means no indicator, and the column stays reserved for
 * it either way.
 */
export type ProjectSelectorIndicator = {
  /** The glyph to render in the row's indicator slot. */
  node: ReactNode;
  /**
   * The glyph's meaning as text, surfaced in the row tooltip. Supply it whenever the glyph carries
   * meaning a sighted user cannot otherwise get from the row.
   *
   * The rows are already tooltip triggers, so a caller cannot give the glyph its own hover label
   * without opening a second tooltip over the row's — this is the way in.
   *
   * **Only supply this when {@link node} already names itself** — with `role="img"` and an
   * `aria-label`, or equivalent. The tooltip line is the sighted-user half and is rendered
   * `aria-hidden`, because Radix wires an open tooltip as the row's `aria-describedby` and a glyph
   * that names itself would otherwise be announced twice per row. A `node` that is itself
   * `aria-hidden` paired with a `label` leaves the indicator silent at both ends.
   */
  label?: string;
};

/**
 * A row listed only while the user is searching — something not on this computer that the search
 * can still reach, such as a project on the Send/Receive server or a resource on the DBL. Selecting
 * one hands its id to {@link ProjectSelectorProps.onSelectSearchOnlyProject}; it never becomes the
 * selection, because there is nothing local to select yet.
 */
export type ProjectSelectorSearchOnlyProject = ProjectSelectorProject & {
  /** Short muted text on the row's trailing edge naming what selecting it does ("Get"). */
  hint?: string;
  /** The hint's own tooltip, saying more ("Install from DBL, 12 MB"). */
  hintTooltip?: string;
};

/**
 * Fork-only: lists search-only rows in batches inside the popover, with no search, once the user
 * asks for them. See {@link ProjectSelectorProps} `searchOnlyPaging`.
 *
 * The footer row reads {@link revealLabel} until it is picked; picking it keeps the popover open and
 * lists the first batch of {@link pagedProjects} in the search-only section. Whenever the end of the
 * list scrolls into view (by pointer or by arrowing to the last row) a "Loading more…" row shows
 * for {@link loadDelayMs} and the next batch is appended. Once every batch is in, the footer reads
 * {@link allLoadedLabel} as plain text. A search lists every matching search-only row regardless of
 * how many batches are loaded, and hides the footer, since nothing more can be loaded for it.
 * Closing the popover returns to the unrevealed state.
 */
export type ProjectSelectorSearchOnlyPaging = {
  /** The footer row's label before the batches are revealed ("More resources…"). */
  revealLabel: string;
  /** Muted footer text once the last batch is listed. */
  allLoadedLabel: string;
  /** Text beside the spinner while a batch loads. Defaults to "Loading more…". */
  loadingLabel?: string;
  /** Rows per batch. */
  batchSize: number;
  /**
   * How long a batch takes to arrive, standing in for a paged backend's round-trip. Defaults to 300
   * ms.
   */
  loadDelayMs?: number;
  /**
   * The rows listed in batches without a search. Defaults to `searchOnlyProjects`; pass a subset
   * when only some search-only rows belong in the browsable list.
   */
  pagedProjects?: readonly ProjectSelectorSearchOnlyProject[];
  /** Called each time a batch after the first is requested, for a caller with a real paged source. */
  onLoadMore?: () => void;
};

const DEFAULT_PAGING_LOADING_LABEL = 'Loading more…';
const DEFAULT_PAGING_LOAD_DELAY_MS = 300;

export type ProjectSelectorFooterAction = {
  /** Localized row label. */
  label: string;
  /** Run when the row is activated. The popover closes afterwards. */
  onSelect: () => void;
};

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
  buildBuiltInGroupingStrings,
  buildSelectionGroupingStrings,
  PROJECT_SELECTOR_STRING_KEYS,
  type BuiltInGroupingStrings,
  type SelectionGroupingStrings,
  type ProjectSelectorLocalizedStringKey,
  type ProjectSelectorStringLookup,
} from './project-selector.groupings';

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
 * Grouping _labels_ (the radio items in the group-by menu) are NOT in this map — those live on the
 * {@link ProjectSelectorGrouping} objects the caller passes via `availableGroupings`, so custom
 * groupings can supply their own localized label without a separate string channel.
 */
export type ProjectSelectorLocalizedStrings = {
  /**
   * Names what the trigger selects (e.g. "Project"), NOT the whole accessible name. With something
   * selected the trigger announces `"{ariaLabel}: {selection}"`, so a consumer passing `"Select
   * project"` gets "Select project: WEB". Supply the group label alone and let the selection be
   * appended.
   */
  ariaLabel?: string;
  /** Trigger fallback text when nothing is selected. */
  buttonPlaceholder?: string;
  /** "No results" message inside the popover when the search has no matches. */
  commandEmptyMessage?: string;
  /** Placeholder for the popover's search input. */
  searchPlaceholder?: string;
  /** Accessible label + `title` for the group-by menu icon button. */
  groupByAriaLabel?: string;
  /** Group-by menu: section heading for the grouping radio group. */
  groupSectionLabel?: string;
  /** Group-by menu: "None" grouping radio item — the "no grouping" option. */
  groupByNone?: string;
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
  /** Multi-select: the checkbox before the search box that unselects everything. */
  clearAll?: string;
  /** Fork-only: name of the button that scrolls a scrolled list back to its top. */
  scrollToTop?: string;
  /** Heading over the search-only rows (see `searchOnlyProjects`). */
  searchOnlySectionHeading?: string;
  /** Accessible name of the X button that clears the search box. */
  clearSearchAriaLabel?: string;
  /** Tooltip of a row's scroll-group letter; `{group}` is replaced by the letter. */
  scrollGroupTooltip?: string;
  /** Accessible name of the ⋮ menu button when it offers no grouping choice, only the view. */
  viewOptionsAriaLabel?: string;
  /** The ⋮ menu's heading over its view options. */
  viewSectionLabel?: string;
  /** The ⋮ menu's checkbox that lists each row on one line. */
  compactView?: string;
  /** Fork-only: the ⋮ menu's option listing only the selected rows. */
  showOnlySelected?: string;
};

/**
 * English text for every {@link ProjectSelectorLocalizedStrings} key, used for any key a consumer
 * leaves unset.
 *
 * `ariaLabel` and `buttonPlaceholder` are last-resort fallbacks for an unlocalized mount (e.g. a
 * bare Storybook render), not production copy: every real consumer merges its own values for these
 * two fields on top via `localizedStrings`. They exist so the trigger never renders with an empty
 * accessible name or empty text before localized strings resolve.
 *
 * Exported so a consumer's tests can assert that NONE of these reach the screen at that call site —
 * a consumer typically localizes only the handful of keys its configuration can reach, and which
 * keys those are is a property of the configuration rather than of the component. Looping over this
 * map keeps such a guard honest when a key is renamed or added; a hand-copied list of strings
 * silently stops asserting anything.
 */
export const PROJECT_SELECTOR_DEFAULT_STRINGS: Required<ProjectSelectorLocalizedStrings> = {
  ariaLabel: 'Projects & resources',
  buttonPlaceholder: 'Select a project',
  commandEmptyMessage: 'No projects found',
  searchPlaceholder: 'Search projects & resources',
  groupByAriaLabel: 'Group by',
  groupSectionLabel: 'Group by',
  groupByNone: 'None',
  openTabsSectionHeading: 'Opened project & resource tabs',
  otherProjectsSectionHeading: 'Your projects & resources',
  autoOpenTabsGroupingLabel: 'Open tabs',
  autoSelectionGroupingLabel: 'Selection',
  autoSelectionSelectedSectionHeading: DEFAULT_SELECTED_SECTION_HEADING,
  autoSelectionUnselectedSectionHeading: DEFAULT_UNSELECTED_SECTION_HEADING,
  boundButClosedTooltip: 'Bound to {group} · not currently open',
  openButtonLabel: 'Open',
  clearAll: 'Unselect all',
  scrollToTop: 'Scroll to top',
  searchOnlySectionHeading: 'Not on this computer',
  clearSearchAriaLabel: 'Clear search',
  scrollGroupTooltip: 'Scroll group {group}',
  viewOptionsAriaLabel: 'View options',
  viewSectionLabel: 'View',
  compactView: 'Compact',
  showOnlySelected: 'Show only selected',
};

function resolveStrings(
  partial: ProjectSelectorLocalizedStrings | undefined,
): Required<ProjectSelectorLocalizedStrings> {
  const given = partial ?? {};
  // Resolved field by field rather than by spreading `partial` over the defaults, because a spread
  // cannot tell "the caller did not set this" from "the caller set it to something unusable":
  // `buildProjectSelectorLocalizedStrings` emits a property for EVERY field, and a present-but-
  // `undefined` property overwrites the default just as a real value would. What counts as usable
  // is `resolveLocalizedString`'s to decide — see `isResolvedLocalizedValue` for the three states
  // it rejects.
  //
  // Written out one field at a time on purpose. The `Required<…>` return type then makes a missing
  // or misspelled field a compile error, which a key-loop or an `Object.fromEntries` round-trip
  // both erase.
  return {
    // The one field where an empty string is meaningful: it is a deliberate "no accessible name
    // here; the visible text or a labelling ancestor names this control", so it passes through
    // rather than falling back. Matches `RecentSearches`. Whitespace-only is not that opt-out.
    ariaLabel:
      given.ariaLabel === ''
        ? ''
        : resolveLocalizedString(given.ariaLabel, PROJECT_SELECTOR_DEFAULT_STRINGS.ariaLabel),
    buttonPlaceholder: resolveLocalizedString(
      given.buttonPlaceholder,
      PROJECT_SELECTOR_DEFAULT_STRINGS.buttonPlaceholder,
    ),
    commandEmptyMessage: resolveLocalizedString(
      given.commandEmptyMessage,
      PROJECT_SELECTOR_DEFAULT_STRINGS.commandEmptyMessage,
    ),
    searchPlaceholder: resolveLocalizedString(
      given.searchPlaceholder,
      PROJECT_SELECTOR_DEFAULT_STRINGS.searchPlaceholder,
    ),
    groupByAriaLabel: resolveLocalizedString(
      given.groupByAriaLabel,
      PROJECT_SELECTOR_DEFAULT_STRINGS.groupByAriaLabel,
    ),
    groupSectionLabel: resolveLocalizedString(
      given.groupSectionLabel,
      PROJECT_SELECTOR_DEFAULT_STRINGS.groupSectionLabel,
    ),
    groupByNone: resolveLocalizedString(
      given.groupByNone,
      PROJECT_SELECTOR_DEFAULT_STRINGS.groupByNone,
    ),
    openTabsSectionHeading: resolveLocalizedString(
      given.openTabsSectionHeading,
      PROJECT_SELECTOR_DEFAULT_STRINGS.openTabsSectionHeading,
    ),
    otherProjectsSectionHeading: resolveLocalizedString(
      given.otherProjectsSectionHeading,
      PROJECT_SELECTOR_DEFAULT_STRINGS.otherProjectsSectionHeading,
    ),
    autoOpenTabsGroupingLabel: resolveLocalizedString(
      given.autoOpenTabsGroupingLabel,
      PROJECT_SELECTOR_DEFAULT_STRINGS.autoOpenTabsGroupingLabel,
    ),
    autoSelectionGroupingLabel: resolveLocalizedString(
      given.autoSelectionGroupingLabel,
      PROJECT_SELECTOR_DEFAULT_STRINGS.autoSelectionGroupingLabel,
    ),
    autoSelectionSelectedSectionHeading: resolveLocalizedString(
      given.autoSelectionSelectedSectionHeading,
      PROJECT_SELECTOR_DEFAULT_STRINGS.autoSelectionSelectedSectionHeading,
    ),
    autoSelectionUnselectedSectionHeading: resolveLocalizedString(
      given.autoSelectionUnselectedSectionHeading,
      PROJECT_SELECTOR_DEFAULT_STRINGS.autoSelectionUnselectedSectionHeading,
    ),
    boundButClosedTooltip: resolveLocalizedString(
      given.boundButClosedTooltip,
      PROJECT_SELECTOR_DEFAULT_STRINGS.boundButClosedTooltip,
    ),
    openButtonLabel: resolveLocalizedString(
      given.openButtonLabel,
      PROJECT_SELECTOR_DEFAULT_STRINGS.openButtonLabel,
    ),
    clearAll: resolveLocalizedString(given.clearAll, PROJECT_SELECTOR_DEFAULT_STRINGS.clearAll),
    scrollToTop: resolveLocalizedString(
      given.scrollToTop,
      PROJECT_SELECTOR_DEFAULT_STRINGS.scrollToTop,
    ),
    searchOnlySectionHeading: resolveLocalizedString(
      given.searchOnlySectionHeading,
      PROJECT_SELECTOR_DEFAULT_STRINGS.searchOnlySectionHeading,
    ),
    clearSearchAriaLabel: resolveLocalizedString(
      given.clearSearchAriaLabel,
      PROJECT_SELECTOR_DEFAULT_STRINGS.clearSearchAriaLabel,
    ),
    scrollGroupTooltip: resolveLocalizedString(
      given.scrollGroupTooltip,
      PROJECT_SELECTOR_DEFAULT_STRINGS.scrollGroupTooltip,
    ),
    viewOptionsAriaLabel: resolveLocalizedString(
      given.viewOptionsAriaLabel,
      PROJECT_SELECTOR_DEFAULT_STRINGS.viewOptionsAriaLabel,
    ),
    viewSectionLabel: resolveLocalizedString(
      given.viewSectionLabel,
      PROJECT_SELECTOR_DEFAULT_STRINGS.viewSectionLabel,
    ),
    compactView: resolveLocalizedString(
      given.compactView,
      PROJECT_SELECTOR_DEFAULT_STRINGS.compactView,
    ),
    showOnlySelected: resolveLocalizedString(
      given.showOnlySelected,
      PROJECT_SELECTOR_DEFAULT_STRINGS.showOnlySelected,
    ),
  };
}

/**
 * Convert the raw `%projectSelector_*%` resolved strings into a
 * {@link ProjectSelectorLocalizedStrings} bag ready to pass as the `localizedStrings` prop. Merge
 * consumer-specific strings (`ariaLabel`, `buttonPlaceholder`) on top afterwards.
 */
export function buildProjectSelectorLocalizedStrings(
  strings: ProjectSelectorStringLookup,
): ProjectSelectorLocalizedStrings {
  return {
    searchPlaceholder: readProjectSelectorString(strings, '%projectSelector_searchPlaceholder%'),
    commandEmptyMessage: readProjectSelectorString(
      strings,
      '%projectSelector_commandEmptyMessage%',
    ),
    groupByAriaLabel: readProjectSelectorString(strings, '%projectSelector_groupByAriaLabel%'),
    groupSectionLabel: readProjectSelectorString(strings, '%projectSelector_groupSectionLabel%'),
    groupByNone: readProjectSelectorString(strings, '%projectSelector_groupByNone%'),
    openTabsSectionHeading: readProjectSelectorString(
      strings,
      '%projectSelector_openTabsSectionHeading%',
    ),
    otherProjectsSectionHeading: readProjectSelectorString(
      strings,
      '%projectSelector_otherProjectsSectionHeading%',
    ),
    autoOpenTabsGroupingLabel: readProjectSelectorString(
      strings,
      '%projectSelector_grouping_openTabs_label%',
    ),
    autoSelectionGroupingLabel: readProjectSelectorString(
      strings,
      '%projectSelector_grouping_selection_label%',
    ),
    autoSelectionSelectedSectionHeading: readProjectSelectorString(
      strings,
      '%projectSelector_grouping_selection_selectedSectionHeading%',
    ),
    autoSelectionUnselectedSectionHeading: readProjectSelectorString(
      strings,
      '%projectSelector_grouping_selection_unselectedSectionHeading%',
    ),
    boundButClosedTooltip: readProjectSelectorString(
      strings,
      '%projectSelector_boundButClosedTooltip%',
    ),
    openButtonLabel: readProjectSelectorString(strings, '%projectSelector_openButtonLabel%'),
    clearAll: readProjectSelectorString(strings, '%projectSelector_clearAll%'),
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

/**
 * The footer action row's cmdk value.
 *
 * Cmdk derives an item's value from its rendered text unless one is given. The footer's text is a
 * caller-supplied localized label, which could collide with a project name, so the row carries this
 * fixed value instead. It must stay stable and must not look like a project id.
 *
 * Project rows already carry composite values (`rowKey shortName fullName`), so a collision is
 * unreachable in practice and no test can pin one. Keep this sentinel anyway: it is what makes that
 * true independently of how row values are composed later.
 */
const FOOTER_ACTION_VALUE = 'platform.footerAction';

type CommonProps = {
  projects: readonly ProjectSelectorProject[];
  openTabs: readonly ProjectSelectorOpenTab[];
  /**
   * Shadcn Button variant. Defaults to `'outline'`. Use `'default'` for a primary-fill affordance
   * (call-to-action) when the picker is empty and the user is expected to make a choice.
   */
  buttonVariant?: ButtonProps['variant'];
  /** Additional classes merged onto the trigger button, after the component's own trigger classes. */
  buttonClassName?: string;
  isDisabled?: boolean;
  /**
   * When true, the trigger shows a spinner (instead of the chevron) and is disabled, signalling
   * that the project list is still loading. Distinct from `isDisabled`, which conveys a generic
   * busy/blocked state with no spinner.
   */
  isLoading?: boolean;
  /**
   * Fork-only: opens the dropdown as a modal popover. Needed inside a dialog: the dialog blocks
   * wheel and touch scrolling outside itself, which includes the portalled dropdown list, unless
   * the popover holds its own scroll lock.
   */
  isModal?: boolean;
  /**
   * Fork-only: opens at the top of the list rather than scrolled to the first selected row — for a
   * list whose first section is the one to see (the Bible texts picker's team resources).
   */
  opensAtTop?: boolean;
  /**
   * Fork-only, `project-multi`: the groupings that list an open project once per scroll group, with
   * its letter. Every other grouping lists each project once, picked when any of its scroll groups
   * is. Omit to list per scroll group in every grouping.
   */
  scrollGroupGroupingIds?: readonly string[];
  /** Fork-only: `false` leaves the trigger without its tooltip. Defaults to `true`. */
  hasTriggerTooltip?: boolean;
  /**
   * Fork-only, `project-multi`: selected rows the trigger does not name — picked for the list's
   * sake but shown elsewhere (the team layout's model text in its Bible texts).
   */
  triggerHiddenIds?: readonly string[];
  /** Fork-only: whether the dropdown is open, for a parent that opens it from elsewhere. */
  open?: boolean;
  /** Fork-only: reports every request to open or close the dropdown. */
  onOpenChange?: (open: boolean) => void;
  /**
   * Fork-only, `project-multi`: the ⋮ menu offers "Show only selected", which lists only the picked
   * rows (and still searches within them).
   */
  hasShowOnlySelected?: boolean;
  /**
   * All user-facing strings. Optional keys fall back to English defaults. Consumers should wire
   * this from the platform's central `%projectSelector_*%` localization block plus any
   * consumer-specific overrides (typically `ariaLabel` and `buttonPlaceholder`, which vary per
   * picker role).
   */
  localizedStrings?: ProjectSelectorLocalizedStrings;
  /**
   * The grouping options exposed in the group-by menu, in order. Each entry is a
   * {@link ProjectSelectorGrouping} — either one of the built-ins from {@link makeBuiltInGroupings}
   * or a consumer-defined custom grouping.
   *
   * Behavior:
   *
   * - **Omitted** — the component auto-derives from context: adds `openTabs` when `openTabs.length >
   *   0`, and adds `selection` in `project-multi` mode. Pickers that don't care about the grouping
   *   menu can leave this prop unset and get a sensible default.
   * - **`[]`** — explicit empty. No group-by menu renders. The list opens flat.
   * - **Length 1** — the grouping is applied and the user is locked into it: the group-by menu has
   *   nothing to switch between so the funnel button is dropped entirely. Use this for pickers
   *   whose grouping is the entire point (e.g. manage-books Create "Based on" locked into
   *   versification).
   * - **Length ≥ 2** — a group-by menu renders with a "None" radio (above a separator) plus one radio
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
   * Pass `'none'` — exported as {@link NO_GROUPING} — to explicitly open flat even when groupings
   * are available.
   */
  defaultGrouping?: string | 'none';
  /**
   * Render an indicator for a row — typically a small icon distinguishing one kind of row from
   * another, derived from the caller's own `customData`.
   *
   * The selector ships no taxonomy and no default mapping: `customData` is a free-form bag whose
   * meaning belongs to whoever produced the list (Paratext project types and DBL resource types are
   * two different vocabularies, neither owned by this library), so the caller decides both what a
   * value means and what it looks like. Note that the conventional `customData.type` key carries a
   * project TYPE, not a project/resource discriminator — a caller who needs the latter has to pack
   * its own flag.
   *
   * **The returned node must carry its own accessible name** (an `aria-label`, or visually hidden
   * text) unless the row's own text already conveys the distinction. The selector renders it
   * verbatim and adds no `aria-hidden` and no description of its own, so an unlabeled icon is
   * information conveyed by sight alone (WCAG 1.1.1). Mark it `aria-hidden` only when the name
   * would be redundant.
   *
   * Runs during the selector's own render, once per filtered row, on every render, so it must be
   * pure, cheap, and free of hooks — the row count changes as the user filters, and a hook called
   * here would change the selector's hook count between renders and throw.
   */
  renderProjectIndicator?: (
    project: ProjectSelectorProject,
  ) => ProjectSelectorIndicator | undefined;
  /**
   * An action row pinned below every section. Use it for an affordance that opens a different
   * surface — the sections partition rows, so they cannot express one.
   *
   * The row stays available when the list is empty, which is when an escape hatch matters most, and
   * the "no projects" empty state still renders alongside it.
   */
  footerAction?: ProjectSelectorFooterAction;
  /**
   * Rows listed ONLY while the search query is non-empty, filtered by the same matching as the
   * normal rows and appended after every section (above the footer action) in a muted style under
   * `localizedStrings.searchOnlySectionHeading`. They stay keyboard-reachable like any other row.
   *
   * Use it for things the user can find but not yet pick — not installed, not downloaded — so a
   * search for a name they know does not dead-end in "No projects found".
   */
  searchOnlyProjects?: readonly ProjectSelectorSearchOnlyProject[];
  /** Called with the row's id when the user picks a search-only row. The popover closes afterwards. */
  onSelectSearchOnlyProject?: (projectId: string) => void;
  /**
   * List `searchOnlyProjects` even while the query is empty (still filtered once the user types).
   * For a list with nothing else in it, where those rows are the only useful answer.
   */
  showSearchOnlyProjectsWithoutQuery?: boolean;
  /**
   * A leading icon rendered before each row's name (search-only rows included), in a fixed-width
   * slot so every label starts at the same offset. Decorative: render it `aria-hidden`, since the
   * row's text and section heading carry its meaning. Same purity rules as
   * `renderProjectIndicator`.
   */
  renderProjectIcon?: (project: ProjectSelectorProject) => ReactNode;
  /**
   * An extra line for a row's tooltip, for information the row text does not show (e.g. which
   * projects use a resource). A row with one always shows its tooltip on hover. Same purity rules
   * as `renderProjectIndicator`.
   */
  getProjectTooltipLine?: (
    project: ProjectSelectorProject,
    activeGrouping: string,
  ) => string | undefined;
  /**
   * A glyph at the end of a listed row (not a search-only one), for a fact about the row that the
   * active grouping does not already show — hence the grouping id, which is {@link NO_GROUPING} for
   * a flat list. Its `label` is the glyph's own tooltip, not a line in the row's. Same purity rules
   * as `renderProjectIndicator`.
   */
  renderProjectTrailingIndicator?: (
    project: ProjectSelectorProject,
    activeGrouping: string,
  ) => ProjectSelectorIndicator | undefined;
  /**
   * Fork-only: a second muted glyph at the end of a listed row, just before the trailing indicator,
   * with its own tooltip — such as the user's role in the project. Same purity rules as
   * `renderProjectIndicator`.
   */
  renderProjectRoleIndicator?: (
    project: ProjectSelectorProject,
  ) => ProjectSelectorIndicator | undefined;
  /**
   * Builds the search-only section's heading from the number of rows the section holds for the
   * current search — every match while searching, or every row of `searchOnlyPaging.pagedProjects`
   * once revealed (loaded or not). Defaults to `localizedStrings.searchOnlySectionHeading`.
   */
  getSearchOnlySectionHeading?: (count: number) => string;
  /**
   * Appends a count to every section heading (the search-only one included). Called with the number
   * of rows the section lists, and — only while a search is typed — the number it lists without the
   * search, so the caller can say "(3 of 12)" while filtering and "(12)" otherwise. An empty string
   * leaves that heading uncounted. Takes precedence over `getSearchOnlySectionHeading`. Omit for
   * uncounted headings.
   */
  formatSectionCount?: (shown: number, totalWhileSearching: number | undefined) => string;
  /**
   * Fork-only: whether the ⋮ menu offers the "Compact" view. Defaults to `true`. Without it the ⋮
   * menu shows only when there is more than one grouping to choose from.
   */
  hasViewOptions?: boolean;
  /** Fork-only: the Compact view is on when the picker mounts. Defaults to `false`. */
  isCompactViewByDefault?: boolean;
  /**
   * Fork-only: called with a listed row's project and scroll group while the pointer is over the
   * row, and with `undefined` when it leaves (or the picker closes) — so the caller can point at
   * the tab that row stands for.
   */
  onRowHoverChange?: (
    row: { projectId: string; scrollGroupId: ScrollGroupId | undefined } | undefined,
  ) => void;
  /**
   * Browse the search-only rows in batches from a footer row; see
   * {@link ProjectSelectorSearchOnlyPaging}. Takes the footer's place, so `footerAction` is ignored
   * while this is set.
   */
  searchOnlyPaging?: ProjectSelectorSearchOnlyPaging;
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
      /**
       * Render the trigger's label yourself, in place of the derived `shortName` / `shortName -
       * fullName` string.
       *
       * Receives the entry of `projects` that `selection.projectId` names, or `undefined` — which
       * means either that nothing is selected OR that the selected id matches no entry of
       * `projects`. The second case is reachable whenever the selection and the list come from
       * different sources, so a caller that can name the selected project from its own state should
       * fall back to that rather than treating `undefined` as "nothing is open".
       *
       * When supplied, the selector renders **no tooltip of its own** over the trigger. That is
       * deliberate rather than an omission: a caller reaching for this prop is rendering a label
       * with its own hover affordance (`ToolbarCompoundLabel` carries a truncation tooltip), and
       * two tooltips over one control is worse than none. Surface the full text from inside your
       * own node.
       */
      renderTriggerLabel?: (selected: ProjectSelectorProject | undefined) => ReactNode;
    })
  | (CommonProps & {
      mode: 'project-multi';
      selection: ProjectMultiSelection;
      onChangeSelection: (selection: { pairs: ProjectSelectorProjectPair[] }) => void;
      /**
       * Fork-only: a fixed trigger label (e.g. "Text collection (4)") in place of the picked short
       * names, which then move to the trigger's tooltip.
       */
      triggerLabel?: string;
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

/**
 * Centers a side tooltip's caret on its trigger: the arrow's own transform leaves it a pixel off
 * vertically when the tooltip opens to the side.
 */
const SIDE_TOOLTIP_ARROW_CLASS = 'tw:translate-y-[calc(-50%-1px)]';

/**
 * Fork-only: a tooltip for something at a row's trailing edge — its scroll-group letter, hint or
 * trailing icon — opening to the left, into the row, rather than over the rows above.
 */
function TrailingTooltip({ label, children }: { label: string | undefined; children: ReactNode }) {
  if (!label) return children;
  return (
    <Tooltip delayDuration={400}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      {/* `aria-hidden`: what it says is already the row's own text or its element's name. Each
          line of `label` is a line of the tooltip. */}
      <TooltipContent
        side="left"
        aria-hidden
        className="tw:whitespace-pre-line"
        arrowClassName={SIDE_TOOLTIP_ARROW_CLASS}
      >
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

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
  // Muted and narrow: it says which scroll group, and should not compete with the row's name.
  return (
    <Badge variant="secondary" className="tw:px-1 tw:text-muted-foreground">
      {letter}
    </Badge>
  );
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
  indicator?: ProjectSelectorIndicator;
  /**
   * Whether to render the fixed-width indicator column at all. True whenever the caller supplied
   * `renderProjectIndicator`, even for rows it returned nothing for, so every row's label starts at
   * the same offset.
   */
  reserveIndicatorSlot: boolean;
  /** Resolved by the parent from `renderProjectIcon`; `undefined` when no renderer was given. */
  icon?: ReactNode;
  /** Whether to render the leading icon slot: true whenever the caller supplied `renderProjectIcon`. */
  reserveIconSlot: boolean;
  /** Resolved by the parent from `getProjectTooltipLine`. */
  tooltipLine?: string;
  /** Resolved by the parent from `renderProjectTrailingIndicator`. */
  trailingIndicator?: ProjectSelectorIndicator;
  /** Resolved by the parent from `renderProjectRoleIndicator`. */
  roleIndicator?: ProjectSelectorIndicator;
  /**
   * Some listed row has a trailing indicator (or a role glyph): rows without one keep its slot
   * empty, so each kind of glyph stays in its own column — the role first, the trailing one last.
   */
  reserveTrailingSlot?: boolean;
  reserveRoleSlot?: boolean;
  /** The ⋮ menu's compact view: the short and full names on one line. */
  isCompact: boolean;
  /** See {@link ProjectSelectorProps} `onRowHoverChange`. */
  onHoverChange?: ProjectSelectorProps['onRowHoverChange'];
};

/**
 * A row's name: the short name over the muted full name, or — in the compact view — both on one
 * line. The full name is left out whenever `hasDistinctFullName` says it adds nothing. `labelRef`
 * is what the truncation tooltip measures.
 */
function RowLabel({
  project,
  isCompact,
  labelRef,
  fullNameClassName,
}: {
  project: { shortName: string; fullName?: string };
  isCompact: boolean;
  labelRef: RefObject<HTMLSpanElement | null>;
  fullNameClassName: string;
}) {
  const fullName = hasDistinctFullName(project) ? project.fullName : undefined;
  if (isCompact)
    return (
      <span
        ref={labelRef}
        className="tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:text-start"
      >
        <span className="tw:shrink-0 tw:font-medium tw:whitespace-nowrap">{project.shortName}</span>
        {fullName && (
          <span className={cn('tw:min-w-0 tw:truncate tw:text-xs', fullNameClassName)}>
            {fullName}
          </span>
        )}
      </span>
    );
  return (
    <span
      ref={labelRef}
      className="tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start"
    >
      <span className="tw:w-full tw:truncate tw:font-medium">{project.shortName}</span>
      {fullName && (
        <span className={cn('tw:w-full tw:truncate tw:text-xs', fullNameClassName)}>
          {fullName}
        </span>
      )}
    </span>
  );
}

/** Fixed-width leading slot shared by every row kind, so labels line up. */
function IconSlot({ children, isDimmed = false }: { children?: ReactNode; isDimmed?: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center',
        // A muted row's icon fades with its text, so a colored icon does not stand out.
        isDimmed && 'tw:opacity-50',
      )}
    >
      {children}
    </span>
  );
}

function ProjectRowView({
  row,
  mode,
  strings,
  onClick,
  onOpen,
  selectedRowRef,
  indicator,
  reserveIndicatorSlot,
  icon,
  reserveIconSlot,
  tooltipLine,
  trailingIndicator,
  roleIndicator,
  reserveTrailingSlot = false,
  reserveRoleSlot = false,
  isCompact,
  onHoverChange,
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

  const disabledReasonId = useId();
  const hasDisabledReason = row.isDisabled && Boolean(row.disabledReason);

  // Tooltip lines that convey information NOT visible in the row text. These rows should
  // always show a tooltip on hover, regardless of whether the visible text is truncated.
  const hasExtraTooltipContent =
    Boolean(row.scrollGroupScrRefLabel) ||
    row.isBoundButClosed ||
    Boolean(indicator?.label) ||
    Boolean(tooltipLine) ||
    hasDisabledReason;

  const isHovered = isTruncatedHovered || isExtraContentHovered;

  const handlePointerEnter = useCallback(() => {
    onHoverChange?.({ projectId: row.projectId, scrollGroupId: row.scrollGroupId });
    if (hasExtraTooltipContent) {
      setIsExtraContentHovered(true);
      return;
    }
    // Otherwise only open the tooltip if the visible row text is actually truncated.
    onTruncationPointerEnter();
  }, [onHoverChange, row, hasExtraTooltipContent, onTruncationPointerEnter]);

  const handlePointerLeave = useCallback(() => {
    onHoverChange?.(undefined);
    setIsExtraContentHovered(false);
    onTruncationPointerLeave();
  }, [onHoverChange, onTruncationPointerLeave]);

  // Multi-select rows draw a checkbox, so picking several reads as ticking boxes; single-select
  // rows keep a bare check mark on the picked row. The box is only drawn: the row is the control.
  const leftCheck =
    mode === 'project-multi' ? (
      <span
        aria-hidden
        className={cn(
          'tw:flex tw:h-4 tw:w-4 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:shadow-xs',
          row.isSelected
            ? 'tw:border-primary tw:bg-primary tw:text-primary-foreground'
            : 'tw:border-input tw:bg-background',
        )}
      >
        {/* `size-3`: the row sizes every icon without a size- class to 16px. */}
        {row.isSelected && <Check className="tw:size-3" />}
      </span>
    ) : (
      <Check className={cn('tw:h-4 tw:w-4', row.isSelected ? 'tw:opacity-100' : 'tw:opacity-0')} />
    );

  // Right-side content: chip(s) and, for bound-but-closed rows that are not disabled, an "Open"
  // button. A disabled row still takes the pointer (for its tooltip), so the button must not render.
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
        <TrailingTooltip
          label={
            row.isBoundButClosed
              ? undefined
              : strings.scrollGroupTooltip.replace(
                  '{group}',
                  scrollGroupLetterFromMap(row.scrollGroupId),
                )
          }
        >
          <span className="tw:flex">
            <ScrollGroupChip
              scrollGroupId={row.scrollGroupId}
              isBoundButClosed={row.isBoundButClosed}
            />
          </span>
        </TrailingTooltip>
        {row.isBoundButClosed && !row.isDisabled && onOpen && (
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
      data-picked={row.isSelected || undefined}
      value={`${row.rowKey} ${row.shortName} ${row.fullName ?? ''}`}
      onSelect={() => {
        if (row.isDisabled) return;
        onClick(row);
      }}
      disabled={row.isDisabled}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      // Spread rather than passed as `undefined`: this node is a Radix `Slot` child, whose props win
      // over the trigger's, so an explicit `undefined` would erase the `aria-describedby` Radix
      // points at the open tooltip on every other row.
      {...(hasDisabledReason && { 'aria-describedby': disabledReasonId })}
      className={cn(
        // `[&>svg:last-child]:hidden` drops the check mark `CommandItem` appends for its own
        // checked state, which this row never uses (its check is at the start); left in, it holds
        // empty space after the row's end icons.
        'tw:flex tw:items-center tw:gap-2 tw:pe-2 tw:[&>svg:last-child]:hidden',
        // `CommandItem` turns pointer events off on disabled items, which would keep the tooltip
        // explaining why from ever opening. cmdk itself still ignores clicks on disabled items.
        // A disabled row keeps the plain cursor; its tooltip says why it cannot be picked.
        'tw:data-[disabled=true]:pointer-events-auto',
      )}
    >
      <span className="tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center">
        {leftCheck}
      </span>
      {reserveIconSlot && <IconSlot>{icon}</IconSlot>}
      {/* Fixed-width slot, reserved for every row once the caller supplies an indicator renderer.
          A renderer that returns a glyph for some rows and nothing for others is the expected
          shape (an icon for resources only, say), and rendering the wrapper conditionally would
          start those rows' labels at a different offset. `gap` on the row handles the spacing, so
          this stays correct under RTL. */}
      {reserveIndicatorSlot && (
        <span className="tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center">
          {indicator?.node}
        </span>
      )}
      {/* Row label uses a 2-line layout — shortName on top, fullName muted
          below. Each line truncates independently. Tooltip-on-clip still
          works because the wrapping span is what scrollWidth/clientWidth is
          measured on (truncation in EITHER child contributes to overflow).
          The muted second line is suppressed whenever `hasDistinctFullName`
          says there is nothing distinct to show, so the row reads as a
          single name rather than repeating it — edit that helper, not this
          condition, to change what counts as distinct. */}
      <RowLabel
        project={row}
        isCompact={isCompact}
        labelRef={labelRef}
        fullNameClassName="tw:text-muted-foreground"
      />
      {(roleIndicator || trailingIndicator) && (
        // The glyphs name themselves; the one tooltip over both, a line each, is the sighted-user
        // half.
        <TrailingTooltip
          label={[roleIndicator?.label, trailingIndicator?.label].filter(Boolean).join('\n')}
        >
          <span className="tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-1.5 tw:text-muted-foreground">
            {(roleIndicator || reserveRoleSlot) && (
              <span className="tw:flex tw:h-4 tw:w-4 tw:items-center tw:justify-center">
                {roleIndicator?.node}
              </span>
            )}
            {(trailingIndicator || reserveTrailingSlot) && (
              <span className="tw:flex tw:h-4 tw:w-4 tw:items-center tw:justify-center">
                {trailingIndicator?.node}
              </span>
            )}
          </span>
        </TrailingTooltip>
      )}
      {rightContent}
      {/* `hidden` rather than `sr-only`: the option's name comes from its content, which must not
          include the reason. A hidden element still supplies the text `aria-describedby` points at. */}
      {hasDisabledReason && (
        <span id={disabledReasonId} hidden>
          {row.disabledReason}
        </span>
      )}
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
        // No `zIndex` override: `TooltipContent` sets the tooltip tier itself, which is above the
        // popover this row is rendered inside. Pinning it to the overlay tier (400) would put the
        // tooltip behind its own host.
        // Wider than the popover that triggers it, deliberately: this tooltip stacks several
        // lines — full name, indicator meaning, scroll-group reference, disabled reason — and a
        // cap matching the popover's own width wraps every one of them. At this width only a long
        // full name wraps. Start-aligned rather than centred because centring lines of very
        // different lengths reads as ragged once there are more than two of them.
        className="tw:max-w-md tw:text-start"
      >
        {/* The whole label, not the full name alone: this tooltip doubles as the row's
            truncation disclosure (`useTruncationTooltip` opens it when EITHER line is clipped), so
            dropping the short name here would hide the very field a narrow row clipped. */}
        {/* `dir="auto"` because the joined form is one text node with a direction-neutral
            separator — see `PROJECT_NAME_SEPARATOR` — so a right-to-left name in a left-to-right
            container would otherwise put the separator on the visually wrong side. */}
        <div className="tw:font-semibold" dir="auto">
          {formatProjectName(row)}
        </div>
        {!row.isBoundButClosed && row.scrollGroupScrRefLabel && letter && (
          <div className="tw:text-sm">
            {row.scrollGroupScrRefLabel}
            <span className="tw:text-muted-foreground"> ({letter})</span>
          </div>
        )}
        {tooltipBoundBut && <div className="tw:text-sm tw:italic">{tooltipBoundBut}</div>}
        {/* The indicator glyph's meaning: the row is already a tooltip trigger, so the glyph
            cannot carry a hover label of its own without opening a second tooltip over this one.

            `aria-hidden` because this is the sighted-user half only. The glyph carries the same
            string as its own accessible name inside the row, and Radix wires an open tooltip as
            the row's `aria-describedby`, so announcing it here too would read it twice per row. */}
        {indicator?.label && (
          <div className="tw:text-sm" aria-hidden>
            {indicator.label}
          </div>
        )}
        {tooltipLine && <div className="tw:text-sm">{tooltipLine}</div>}
        {row.isDisabled && row.disabledReason && (
          <div className="tw:text-sm tw:italic">{row.disabledReason}</div>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

// #endregion

// #region Search-only row rendering

/**
 * The cmdk value prefix for search-only rows, so a search-only row whose id matches a listed
 * project's can never share that row's value (cmdk would highlight both).
 */
const SEARCH_ONLY_VALUE_PREFIX = 'platform.searchOnly:';

function searchOnlyRowValue(project: ProjectSelectorSearchOnlyProject): string {
  return `${SEARCH_ONLY_VALUE_PREFIX}${project.id} ${project.shortName} ${project.fullName ?? ''}`;
}

type SearchOnlyRowRenderProps = {
  project: ProjectSelectorSearchOnlyProject;
  onSelect: (project: ProjectSelectorSearchOnlyProject) => void;
  /** Resolved by the parent from `renderProjectIndicator`. */
  indicator?: ProjectSelectorIndicator;
  /** Same meaning as on {@link ProjectRowView}, so this row's label lines up with theirs. */
  reserveIndicatorSlot: boolean;
  /** Same meaning as on {@link ProjectRowView}. */
  icon?: ReactNode;
  /** Same meaning as on {@link ProjectRowView}. */
  reserveIconSlot: boolean;
  /** Same meaning as on {@link ProjectRowView}. */
  tooltipLine?: string;
  /** Same meaning as on {@link ProjectRowView}. */
  isCompact: boolean;
};

/**
 * One search-only row. Mirrors {@link ProjectRowView}'s layout (check slot, indicator slot, two-line
 * label) so its label starts at the same offset, but the whole row is muted, it carries no check
 * mark (it can never be the selection), and its hint sits where the scroll-group chips would.
 */
function SearchOnlyRowView({
  project,
  onSelect,
  indicator,
  reserveIndicatorSlot,
  icon,
  reserveIconSlot,
  tooltipLine,
  isCompact,
}: SearchOnlyRowRenderProps) {
  const {
    ref: labelRef,
    open: isTruncatedHovered,
    onPointerEnter,
    onPointerLeave,
  } = useTruncationTooltip<HTMLSpanElement>();
  const [isExtraContentHovered, setIsExtraContentHovered] = useState(false);
  const hasExtraTooltipContent = Boolean(indicator?.label) || Boolean(tooltipLine);

  const rowNode = (
    <CommandItem
      value={searchOnlyRowValue(project)}
      onSelect={() => onSelect(project)}
      onPointerEnter={() => {
        if (hasExtraTooltipContent) setIsExtraContentHovered(true);
        else onPointerEnter();
      }}
      onPointerLeave={() => {
        setIsExtraContentHovered(false);
        onPointerLeave();
      }}
      // Without `CommandItem`'s unused end check mark, as on listed rows.
      className="tw:flex tw:items-center tw:gap-2 tw:pe-2 tw:text-muted-foreground tw:[&>svg:last-child]:hidden"
    >
      <span
        aria-hidden
        className="tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center"
      />
      {reserveIconSlot && <IconSlot isDimmed>{icon}</IconSlot>}
      {reserveIndicatorSlot && (
        <span className="tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center">
          {indicator?.node}
        </span>
      )}
      {/* The whole row is already muted, so the full name takes no further dimming. */}
      <RowLabel project={project} isCompact={isCompact} labelRef={labelRef} fullNameClassName="" />
      {project.hint && (
        <TrailingTooltip label={project.hintTooltip}>
          <span className="tw:ms-auto tw:shrink-0 tw:text-xs tw:whitespace-nowrap">
            {project.hint}
          </span>
        </TrailingTooltip>
      )}
    </CommandItem>
  );

  return (
    <Tooltip open={isTruncatedHovered || isExtraContentHovered} delayDuration={400}>
      <TooltipTrigger asChild>{rowNode}</TooltipTrigger>
      {/* No `zIndex` override: `TooltipContent` sets the tooltip tier itself, above the popover. */}
      <TooltipContent
        side="top"
        align="center"
        sideOffset={8}
        collisionPadding={16}
        className="tw:max-w-md tw:text-start"
      >
        <div className="tw:font-semibold" dir="auto">
          {formatProjectName(project)}
        </div>
        {indicator?.label && (
          <div className="tw:text-sm" aria-hidden>
            {indicator.label}
          </div>
        )}
        {tooltipLine && <div className="tw:text-sm">{tooltipLine}</div>}
      </TooltipContent>
    </Tooltip>
  );
}

// #endregion

// #region Collapsible section heading

/** The collapse key of the search-only section; grouped sections use {@link sectionCollapseKey}. */
const SEARCH_ONLY_SECTION_KEY = 'platform.searchOnlySection';

const NO_COLLAPSED_SECTIONS: ReadonlySet<string> = new Set();

/** A stable key per section, shared by the React key and the collapse state. */
function sectionCollapseKey(section: RowSection): string {
  return `${section.kind}:${section.groupingId ?? ''}:${section.key ?? section.label ?? ''}`;
}

type SectionHeadingToggleProps = {
  heading: string;
  /** A glyph after the heading, named by its own tooltip. */
  indicator?: { node: ReactNode; label: string };
  isExpanded: boolean;
  onToggle: () => void;
  /** Id of the element holding the section's rows, for `aria-controls`. */
  controlsId: string;
};

/**
 * A section heading that opens and closes its section.
 *
 * Rendered in place of cmdk's own group heading rather than through `CommandGroup`'s `heading`
 * prop, because cmdk renders that heading `aria-hidden`, and a button inside it would be focusable
 * yet invisible to assistive tech. It is a plain `<button>`, not a `CommandItem`, so cmdk's arrow
 * keys walk only the rows: a collapsed section's rows are unmounted, which removes them from the
 * `[cmdk-item]` set cmdk navigates, and an expanded section's rows are navigable as before.
 *
 * Keyboard: Tab reaches the heading from the search box. Enter and Space toggle it, and the handler
 * calls `preventDefault()` because cmdk's root `keydown` handler skips any event already
 * default-prevented — without it, Enter would also pick whichever row cmdk has highlighted. A
 * pointer press keeps focus in the search box (`mousedown` is default-prevented) so the user can
 * keep typing and arrowing after clicking a heading.
 */
function SectionHeadingToggle({
  heading,
  indicator,
  isExpanded,
  onToggle,
  controlsId,
}: SectionHeadingToggleProps) {
  return (
    // Sticky, so the heading of the section the rows on screen belong to stays in view; each
    // heading is opaque and stacks over the one before it as the list scrolls.
    <div
      role="presentation"
      data-section-heading=""
      className="tw:sticky tw:top-0 tw:z-10 tw:bg-popover tw:px-1 tw:pt-1"
    >
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={controlsId}
        onMouseDown={(event) => event.preventDefault()}
        onClick={onToggle}
        onKeyDown={(event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          onToggle();
        }}
        className="tw:group/heading tw:flex tw:w-full tw:items-center tw:gap-1 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-start tw:text-xs tw:font-medium tw:text-muted-foreground tw:hover:text-foreground tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:outline-none"
      >
        {/* Shown only while the heading is hovered or focused, keeping its place: next to the
            rows' check marks, an always-visible chevron reads as one more checkbox. */}
        <ChevronDown
          aria-hidden
          className={cn(
            'tw:h-3.5 tw:w-3.5 tw:shrink-0 tw:opacity-0 tw:transition tw:group-hover/heading:opacity-100 tw:group-focus-visible/heading:opacity-100',
            !isExpanded && 'tw:-rotate-90 tw:rtl:rotate-90',
          )}
        />
        <span className="tw:min-w-0 tw:truncate">{heading}</span>
        {indicator && (
          <Tooltip delayDuration={400}>
            <TooltipTrigger asChild>
              <span className="tw:flex tw:shrink-0 tw:items-center">{indicator.node}</span>
            </TooltipTrigger>
            <TooltipContent>{indicator.label}</TooltipContent>
          </Tooltip>
        )}
      </button>
    </div>
  );
}

/** Puts focus in the search box of the picker `element` sits in. */
function focusSearchInput(element: HTMLElement) {
  element.closest('[cmdk-root]')?.querySelector<HTMLInputElement>('[cmdk-input]')?.focus();
}

type ClearSearchButtonProps = {
  label: string;
  onClear: () => void;
  className?: string;
};

/**
 * The X at the end of the search box. Clears the query and puts focus back in the search box, so
 * the user can type again straight away.
 */
function ClearSearchButton({ label, onClear, className }: ClearSearchButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={label}
      className={cn('tw:size-6 tw:text-muted-foreground', className)}
      onClick={(event) => {
        onClear();
        focusSearchInput(event.currentTarget);
      }}
    >
      <X className="tw:size-3.5" />
    </Button>
  );
}

// #endregion

// #region Group-by menu

/**
 * Sentinel `defaultGrouping` / active-grouping value meaning "no grouping" (a flat list). Backs the
 * group-by menu's None radio item, so it is a RESERVED {@link ProjectSelectorGrouping.id} that no
 * consumer-defined grouping may use.
 */
export const NO_GROUPING = 'none';

/**
 * Fork-only: in a multi-select picker the search row sits under the rows' columns — checkbox, then
 * icon, then name — so the search icon and the text start where a row's icon and name do. The
 * search box's own inset and its icon's padding are shrunk to get there.
 */
const MULTI_SEARCH_ALIGNMENT_CLASS =
  'tw:ms-0.5 tw:[&_[data-slot=input-group]>[data-slot=input-group-addon]]:ps-px! tw:[&_[data-slot=command-input]]:ps-2!';

const NO_OPEN_TABS: readonly ProjectSelectorOpenTab[] = [];

type ActiveGroupingId = string;

type GroupByMenuProps = {
  availableGroupings: readonly ProjectSelectorGrouping[];
  activeGrouping: ActiveGroupingId;
  onChangeGrouping: (value: ActiveGroupingId) => void;
  strings: Required<ProjectSelectorLocalizedStrings>;
  /** The "Compact" view checkbox, listed last under "View"; left out without it. */
  compactView?: { isOn: boolean; onChange: (isOn: boolean) => void };
  /** The "Show only selected" checkbox, under "View"; left out without it. */
  showOnlySelected?: { isOn: boolean; onChange: (isOn: boolean) => void };
};

function GroupByMenu({
  availableGroupings,
  activeGrouping,
  onChangeGrouping,
  strings,
  compactView,
  showOnlySelected,
}: GroupByMenuProps) {
  // The button reads as a toggle that is "on" whenever a grouping is applied, so the active state
  // is conveyed by the control itself rather than only by the section headings in the list.
  const hasGroupingChoice = availableGroupings.length > 1;
  const isGroupingActive = hasGroupingChoice && activeGrouping !== NO_GROUPING;
  const buttonLabel = hasGroupingChoice ? strings.groupByAriaLabel : strings.viewOptionsAriaLabel;

  return (
    <DropdownMenu>
      {/* The tooltip comes from the shadcn `Tooltip`, never a native `title` attribute, which would
          render the browser-default yellow tooltip alongside the app's own styling. The enclosing
          `TooltipProvider` lives on the selector's `PopoverContent`. */}
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'tw:h-8 tw:w-8 tw:shrink-0 tw:p-0',
                // Match shadcn Toggle's "on" styling so the icon reads as a toggle-group button
                // that's currently pressed while a grouping is active.
                isGroupingActive &&
                  'tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent',
              )}
              aria-label={buttonLabel}
              aria-pressed={isGroupingActive}
              onMouseDown={(event: MouseEvent) => event.preventDefault()}
            >
              <EllipsisVertical className="tw:h-4 tw:w-4" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        {/* No `zIndex` override: `TooltipContent` sets the tooltip tier itself, which is above both
            the host popover and this menu. */}
        <TooltipContent>{buttonLabel}</TooltipContent>
      </Tooltip>
      {/* One of the few places a consumer legitimately overrides an overlay's own tier, so the
          reason is recorded here: this menu opens from inside this component's own
          `PopoverContent`. `DropdownMenuContent`'s own tier is `Z_INDEX_ABOVE_DOCK`, the same tier
          the host popover sits on, so the two TIE and the menu wins only on paint order —
          `dropdown-menu.tsx` documents that and names this tier as what a caller needing to win
          outright should use. Verified against the group-by menu opened from the selector popover.
          The row tooltip above needs nothing: `TooltipContent`'s own tier already clears the
          popover. */}
      <DropdownMenuContent
        align="end"
        className="tw:w-56"
        style={{ zIndex: Z_INDEX_ABOVE_POPOVER }}
      >
        {hasGroupingChoice && <DropdownMenuLabel>{strings.groupSectionLabel}</DropdownMenuLabel>}
        {hasGroupingChoice && (
          <DropdownMenuRadioGroup value={activeGrouping} onValueChange={onChangeGrouping}>
            {/* No `onSelect={preventDefault}` here — picking a grouping should close the menu
              immediately, so the user sees the newly grouped list without a second click. */}
            <DropdownMenuRadioItem value={NO_GROUPING}>{strings.groupByNone}</DropdownMenuRadioItem>
            {/* Visually separate "None" from the real grouping options — "None" is the "off state"
              and the actual grouping choices sit below the divider. */}
            <DropdownMenuSeparator />
            {availableGroupings.map((grouping) => (
              <DropdownMenuRadioItem key={grouping.id} value={grouping.id}>
                {grouping.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        )}
        {(compactView || showOnlySelected) && (
          <>
            {hasGroupingChoice && <DropdownMenuSeparator />}
            <DropdownMenuLabel>{strings.viewSectionLabel}</DropdownMenuLabel>
            {showOnlySelected && (
              <DropdownMenuCheckboxItem
                checked={showOnlySelected.isOn}
                onCheckedChange={(checked) => showOnlySelected.onChange(checked === true)}
              >
                {strings.showOnlySelected}
              </DropdownMenuCheckboxItem>
            )}
            {compactView && (
              <DropdownMenuCheckboxItem
                checked={compactView.isOn}
                onCheckedChange={(checked) => compactView.onChange(checked === true)}
              >
                {strings.compactView}
              </DropdownMenuCheckboxItem>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// #endregion

// #region Main component

function resolveDefaultActiveGrouping(
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
  // Open state is the parent's when it passes `open` (a button elsewhere can open the dropdown),
  // and the selector's own otherwise; every change is reported through `onOpenChange`.
  const [openInternal, setOpenInternal] = useState(false);
  const open = props.open ?? openInternal;
  const { onOpenChange } = props;
  const setOpen = useCallback(
    (next: boolean) => {
      setOpenInternal(next);
      onOpenChange?.(next);
    },
    [onOpenChange],
  );
  const [query, setQuery] = useState('');
  // Memoized on the prop's identity, which is all a component can key on. Note it does NOT hold on
  // the unresolved path: `useLocalizedStrings` rebuilds its seed object in the render body and
  // returns it on every platform-error render, so the prop is a fresh object each time and this
  // recomputes. That is affordable — the work is a handful of anchored regex tests — but do not
  // read this memo as a guarantee.
  const strings = useMemo(() => resolveStrings(props.localizedStrings), [props.localizedStrings]);
  // Effective grouping list:
  //
  // - When the caller passes `availableGroupings` (even `[]`), it is taken LITERALLY. This is the
  //   contract for "I know exactly what groupings this picker should offer" cases like the
  //   manage-books Create "Based on" picker, which passes `[versificationGrouping]` and expects
  //   to be locked into that single option, with no grouping choice in the ⋮ menu (the fork
  //   still shows the menu, for its view options).
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
    // Built through the same factories `makeBuiltInGroupings` uses, so a descriptor's shape is
    // defined once. The labels come from the resolved strings bag rather than the raw
    // `%projectSelector_*%` lookup, which is why these have their own `auto*` string fields.
    if (props.openTabs.length > 0) {
      auto.push(makeOpenTabsGrouping(strings.autoOpenTabsGroupingLabel));
    }
    if (props.mode === 'project-multi') {
      auto.push(
        makeSelectionGrouping({
          label: strings.autoSelectionGroupingLabel,
          selectedSectionHeading: strings.autoSelectionSelectedSectionHeading,
          unselectedSectionHeading: strings.autoSelectionUnselectedSectionHeading,
        }),
      );
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
  // The grouping the user picked from the menu, or `undefined` while they have not picked one.
  // Tracking "has the user chosen?" separately from "which grouping is active?" is what lets the
  // resolved default below keep following its inputs without ever overriding a real choice.
  const [pickedGrouping, setPickedGrouping] = useState<ActiveGroupingId | undefined>(undefined);
  // Re-resolves whenever its inputs change, which matters because those inputs are commonly async:
  // a caller that omits `availableGroupings` and loads `openTabs` over the wire has an empty list
  // on first render, so a mount-only resolution would latch 'none' and leave the list flat even
  // after the `openTabs` radio appeared in the menu.
  const resolvedGrouping = useMemo<ActiveGroupingId>(
    () => resolveDefaultActiveGrouping(availableGroupings, props.defaultGrouping),
    [availableGroupings, props.defaultGrouping],
  );
  // The user's choice wins permanently once made; until then the resolved default tracks the props.
  // A picked id that later leaves `availableGroupings` degrades to flat (see `sections` below).
  const activeGrouping = pickedGrouping ?? resolvedGrouping;
  const { scrollGroupGroupingIds } = props;
  const isOneRowPerProject =
    props.mode === 'project-multi' &&
    scrollGroupGroupingIds !== undefined &&
    !scrollGroupGroupingIds.includes(activeGrouping);

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
  // Keys of the sections the user has toggled away from their starting state: closed, or — under
  // a grouping whose sections start collapsed — opened. Empty means every section is as it starts.
  const [collapsedSections, setCollapsedSections] =
    useState<ReadonlySet<string>>(NO_COLLAPSED_SECTIONS);
  const sectionIdPrefix = useId();
  const toggleSection = useCallback((key: string) => {
    setCollapsedSections((current) => {
      const next = new Set(current);
      if (!next.delete(key)) next.add(key);
      return next;
    });
  }, []);
  // Every edit to the query expands all sections, so a collapsed section never hides a match.
  // null is the canonical initial value for React DOM refs.
  // eslint-disable-next-line no-null/no-null
  const commandListRef = useRef<HTMLDivElement>(null);
  const handleQueryChange = useCallback((nextQuery: string) => {
    setQuery(nextQuery);
    setCollapsedSections(NO_COLLAPSED_SECTIONS);
    // Every change to the search starts the list from its top, where the best matches are.
    window.requestAnimationFrame(() => {
      if (commandListRef.current) commandListRef.current.scrollTop = 0;
    });
  }, []);
  // Whether the list is scrolled away from its top, for the Scroll to top button.
  const [isListScrolled, setIsListScrolled] = useState(false);
  // `searchOnlyPaging` state: how many paged rows are listed (0 = not revealed yet), and whether a
  // batch is on its way.
  const [pagedRowCount, setPagedRowCount] = useState(0);
  const [isLoadingBatch, setIsLoadingBatch] = useState(false);
  // The reveal row unmounts as it is picked, which would leave cmdk highlighting nothing, so the
  // first revealed row takes the highlight (and is scrolled to) instead.
  const [revealHighlight, setRevealHighlight] = useState<string | undefined>(undefined);
  const batchTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const cancelBatch = useCallback(() => {
    if (batchTimerRef.current !== undefined) clearTimeout(batchTimerRef.current);
    batchTimerRef.current = undefined;
    setIsLoadingBatch(false);
  }, []);
  useEffect(() => cancelBatch, [cancelBatch]);
  const { onRowHoverChange } = props;
  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      setOpen(nextOpen);
      if (!nextOpen) {
        onRowHoverChange?.(undefined);
        setQuery('');
        setCollapsedSections(NO_COLLAPSED_SECTIONS);
        cancelBatch();
        setPagedRowCount(0);
        setRevealHighlight(undefined);
        setIsListScrolled(false);
      }
    },
    [cancelBatch, onRowHoverChange, setOpen],
  );
  // Read when the picker opens, without making the scroll effect rerun.
  const opensAtTopRef = useRef(props.opensAtTop ?? false);
  opensAtTopRef.current = props.opensAtTop ?? false;
  useEffect(() => {
    if (!open) return;
    // Defer to the next frame so the popover content has rendered and the row refs are attached.
    const id = window.requestAnimationFrame(() => {
      // Every picker opens with its first selected row at the top of the list, just under its
      // sticky section heading, or at the list's top when nothing is selected. The list is
      // scrolled directly: `scrollIntoView` would also scroll any scrollable ancestor.
      const list = commandListRef.current;
      if (!list) return;
      const picked = opensAtTopRef.current
        ? undefined
        : list.querySelector<HTMLElement>('[data-picked]');
      if (!picked) {
        list.scrollTop = 0;
        return;
      }
      const headingHeight =
        list.querySelector<HTMLElement>('[data-section-heading]')?.offsetHeight ?? 0;
      // The popover is still scaled by its opening animation, so screen distances are divided by
      // that scale to get the list's own.
      const listRect = list.getBoundingClientRect();
      const scale = list.offsetHeight > 0 ? listRect.height / list.offsetHeight : 1;
      list.scrollTop += (picked.getBoundingClientRect().top - listRect.top) / scale - headingHeight;
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
      // One row per project: no open tabs to split it by, and a project picked in any scroll
      // group shows picked.
      if (isOneRowPerProject)
        return computeRows({
          mode: 'project-multi',
          projects: props.projects,
          openTabs: NO_OPEN_TABS,
          selection: {
            pairs: props.selection.pairs.map((pair) => ({ projectId: pair.projectId })),
          },
        });
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
  }, [props.mode, props.projects, props.openTabs, props.selection, isOneRowPerProject]);

  // The ⋮ menu's "Compact" view, one line per row; kept across opens like the picked grouping.
  const hasViewOptions = props.hasViewOptions ?? true;
  const [isCompactViewPicked, setIsCompactView] = useState(props.isCompactViewByDefault ?? false);
  // Without the ⋮ menu's view option, the view is fixed at its default.
  const isCompactView = hasViewOptions
    ? isCompactViewPicked
    : (props.isCompactViewByDefault ?? false);

  const hasShowOnlySelected =
    props.mode === 'project-multi' && (props.hasShowOnlySelected ?? false);
  const [isShowingOnlySelected, setIsShowingOnlySelected] = useState(false);
  const isOnlySelectedListed = hasShowOnlySelected && isShowingOnlySelected;
  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const shownRows = isOnlySelectedListed ? rows.filter((r) => r.isSelected) : rows;
    if (!needle) return shownRows;
    return shownRows.filter((r) => matchesSearch(r, needle));
  }, [rows, query, isOnlySelectedListed]);

  const { searchOnlyPaging } = props;
  const pagedProjects = useMemo<readonly ProjectSelectorSearchOnlyProject[]>(
    () =>
      searchOnlyPaging ? (searchOnlyPaging.pagedProjects ?? props.searchOnlyProjects ?? []) : [],
    [searchOnlyPaging, props.searchOnlyProjects],
  );
  const hasQuery = query.trim() !== '';
  const isPagingRevealed = Boolean(searchOnlyPaging) && pagedRowCount > 0;
  const isPagingBrowsing = isPagingRevealed && !hasQuery;
  const hasMoreBatches = isPagingBrowsing && pagedRowCount < pagedProjects.length;

  // Empty until the user types — these rows exist to answer a search, not to pad the list — unless
  // the caller opts into listing them up front, or the user revealed `searchOnlyPaging`'s batches.
  const filteredSearchOnlyProjects = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      if (isPagingRevealed) return pagedProjects.slice(0, pagedRowCount);
      if (!props.searchOnlyProjects) return [];
      return props.showSearchOnlyProjectsWithoutQuery ? props.searchOnlyProjects : [];
    }
    if (!props.searchOnlyProjects) return [];
    return props.searchOnlyProjects.filter((project) => matchesSearch(project, needle));
  }, [
    props.searchOnlyProjects,
    props.showSearchOnlyProjectsWithoutQuery,
    query,
    isPagingRevealed,
    pagedProjects,
    pagedRowCount,
  ]);
  // While browsing batches the heading counts the whole browsable list, not just what is loaded.
  const searchOnlySectionCount = isPagingBrowsing
    ? pagedProjects.length
    : filteredSearchOnlyProjects.length;
  const { formatSectionCount } = props;
  let searchOnlySectionHeading: string;
  if (formatSectionCount) {
    const count = formatSectionCount(
      searchOnlySectionCount,
      hasQuery ? (props.searchOnlyProjects?.length ?? 0) : undefined,
    );
    searchOnlySectionHeading = count
      ? `${strings.searchOnlySectionHeading} ${count}`
      : strings.searchOnlySectionHeading;
  } else if (props.getSearchOnlySectionHeading)
    searchOnlySectionHeading = props.getSearchOnlySectionHeading(searchOnlySectionCount);
  else searchOnlySectionHeading = strings.searchOnlySectionHeading;

  const revealPagedRows = useCallback(() => {
    if (!searchOnlyPaging || pagedProjects.length === 0) return;
    setPagedRowCount(searchOnlyPaging.batchSize);
    setRevealHighlight(searchOnlyRowValue(pagedProjects[0]));
  }, [searchOnlyPaging, pagedProjects]);
  // Switching the grouping starts the reordered list from its top, and every section as it starts.
  const previousGroupingRef = useRef(activeGrouping);
  useEffect(() => {
    if (previousGroupingRef.current === activeGrouping) return;
    previousGroupingRef.current = activeGrouping;
    setCollapsedSections(NO_COLLAPSED_SECTIONS);
    if (commandListRef.current) commandListRef.current.scrollTop = 0;
  }, [activeGrouping]);
  // After a reveal, scroll the newly listed section's heading to the top of the list, so the user
  // sees what was added rather than one row of it at the bottom, and put focus in the search box so
  // they can go straight on to narrowing it (a click on the footer row may have taken focus off it).
  // The list is scrolled directly: `scrollIntoView` would also scroll any scrollable ancestor.
  useEffect(() => {
    if (revealHighlight === undefined) return undefined;
    const id = window.requestAnimationFrame(() => {
      const list = commandListRef.current;
      const heading = list?.querySelector(
        `[aria-controls="${CSS.escape(`${sectionIdPrefix}-section-search-only`)}"]`,
      )?.parentElement;
      if (list && heading)
        list.scrollTop += heading.getBoundingClientRect().top - list.getBoundingClientRect().top;
      list
        ?.closest('[cmdk-root]')
        ?.querySelector<HTMLInputElement>('[cmdk-input]')
        ?.focus({ preventScroll: true });
    });
    return () => window.cancelAnimationFrame(id);
  }, [revealHighlight, sectionIdPrefix]);

  const loadNextBatch = useCallback(() => {
    if (!searchOnlyPaging || batchTimerRef.current !== undefined) return;
    setIsLoadingBatch(true);
    searchOnlyPaging.onLoadMore?.();
    batchTimerRef.current = setTimeout(() => {
      batchTimerRef.current = undefined;
      setIsLoadingBatch(false);
      setPagedRowCount((count) => count + searchOnlyPaging.batchSize);
    }, searchOnlyPaging.loadDelayMs ?? DEFAULT_PAGING_LOAD_DELAY_MS);
  }, [searchOnlyPaging]);

  // Sentinel after the last paged row. The observer's root is the scrolling `CommandList`, so the
  // next batch loads when the list's end scrolls into view — by wheel, or by cmdk scrolling the
  // highlighted row into view as the user arrows down. A sentinel still in view after a batch lands
  // (a short batch, a tall list) is reported again when it is re-observed, so the list keeps filling.
  const [pagingSentinel, setPagingSentinel] = useState<HTMLDivElement | undefined>(undefined);
  const pagingSentinelRef = useCallback((node: HTMLDivElement | null) => {
    setPagingSentinel(node ?? undefined);
  }, []);
  useEffect(() => {
    if (!pagingSentinel || isLoadingBatch || typeof IntersectionObserver === 'undefined')
      return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) loadNextBatch();
      },
      { root: pagingSentinel.closest('[cmdk-list]'), rootMargin: '0px 0px 48px 0px' },
    );
    observer.observe(pagingSentinel);
    return () => observer.disconnect();
  }, [pagingSentinel, isLoadingBatch, loadNextBatch, pagedRowCount]);

  /**
   * Every project keyed by its normalized id.
   *
   * Ids reach a consumer from mixed sources — the .NET data provider hands back uppercase GUIDs
   * while the open-tabs hook lowercases them — so the key is normalized; see `normalizeProjectId`'s
   * TSDoc.
   */
  const projectsById = useMemo(
    () => new Map(props.projects.map((project) => [normalizeProjectId(project.id), project])),
    [props.projects],
  );

  /**
   * The project a selection names, or `undefined`.
   *
   * Goes through {@link projectsById} rather than scanning `props.projects` so every lookup in this
   * component answers the same question the same way: the trigger label and the rows must agree on
   * what "selected" means, or a mixed-case caller gets a row marked selected above a trigger still
   * showing its placeholder. With duplicate ids a scan and a Map also disagree (`find` returns the
   * first, the Map keeps the last).
   */
  const lookUpProject = useCallback(
    (projectId: string | undefined): ProjectSelectorProject | undefined =>
      projectId === undefined ? undefined : projectsById.get(normalizeProjectId(projectId)),
    [projectsById],
  );

  const { renderProjectIndicator } = props;
  const renderIndicator = useCallback(
    (row: ProjectRow): ProjectSelectorIndicator | undefined =>
      renderProjectIndicator ? renderProjectIndicator(row.project) : undefined,
    [renderProjectIndicator],
  );
  const reserveIndicatorSlot = Boolean(renderProjectIndicator);
  const {
    renderProjectIcon,
    getProjectTooltipLine,
    renderProjectTrailingIndicator,
    renderProjectRoleIndicator,
  } = props;
  const reserveIconSlot = Boolean(renderProjectIcon);
  const reserveTrailingSlot = useMemo(
    () =>
      Boolean(renderProjectTrailingIndicator) &&
      rows.some((row) => renderProjectTrailingIndicator?.(row.project, activeGrouping)),
    [rows, renderProjectTrailingIndicator, activeGrouping],
  );
  const reserveRoleSlot = useMemo(
    () =>
      Boolean(renderProjectRoleIndicator) &&
      rows.some((row) => renderProjectRoleIndicator?.(row.project)),
    [rows, renderProjectRoleIndicator],
  );

  const sections = useMemo<RowSection[]>(() => {
    if (activeGrouping === NO_GROUPING) return partitionFlat(filteredRows);
    const grouping = availableGroupings.find((g) => g.id === activeGrouping);
    if (!grouping) return partitionFlat(filteredRows);
    const partitioned = partitionByGrouping(filteredRows, grouping);
    const isListedOnlyWhileSearching = grouping.isSectionListedOnlyWhileSearching;
    if (hasQuery || !isListedOnlyWhileSearching) return partitioned;
    return partitioned.filter(
      (section) => section.key === undefined || !isListedOnlyWhileSearching(section.key),
    );
  }, [filteredRows, activeGrouping, availableGroupings, hasQuery]);
  const listedRowCount = sections.reduce((count, section) => count + section.rows.length, 0);

  // Each section's row count without the search, keyed like the collapse state, for
  // `formatSectionCount`'s "(x of y)".
  const unfilteredSectionCounts = useMemo(() => {
    const counts = new Map<string, number>();
    if (!formatSectionCount || activeGrouping === NO_GROUPING) return counts;
    const grouping = availableGroupings.find((g) => g.id === activeGrouping);
    if (!grouping) return counts;
    partitionByGrouping(rows, grouping).forEach((section) =>
      counts.set(sectionCollapseKey(section), section.rows.length),
    );
    return counts;
  }, [formatSectionCount, rows, activeGrouping, availableGroupings]);
  const activeGroupingDefinition = availableGroupings.find((g) => g.id === activeGrouping);
  const withSectionCount = (
    heading: string,
    shown: number,
    total: number | undefined,
    key: string | undefined,
  ) => {
    if (key !== undefined && activeGroupingDefinition?.isSectionCountHidden?.(key)) return heading;
    const count = formatSectionCount?.(shown, hasQuery ? (total ?? shown) : undefined);
    return count ? `${heading} ${count}` : heading;
  };

  // A section's heading, unless its grouping keeps it for searches only.
  const shownSectionHeading = (section: RowSection) => {
    const isHeadingHidden =
      !hasQuery &&
      section.key !== undefined &&
      activeGroupingDefinition?.isSectionHeadingShownOnlyWhileSearching?.(section.key);
    return isHeadingHidden ? undefined : sectionHeading(section, strings);
  };

  // A section without a heading (the flat list) has no toggle, so it is always expanded.
  // A search starts every section expanded, whatever the grouping's default.
  const isSectionCollapsedByDefault = (section: RowSection) =>
    !hasQuery &&
    (Boolean(activeGroupingDefinition?.areSectionsCollapsedByDefault) ||
      (section.key !== undefined &&
        Boolean(activeGroupingDefinition?.isSectionCollapsedByDefault?.(section.key))));
  const isSectionExpanded = (section: RowSection) =>
    !shownSectionHeading(section) ||
    collapsedSections.has(sectionCollapseKey(section)) === isSectionCollapsedByDefault(section);
  const isSearchOnlySectionExpanded = !collapsedSections.has(SEARCH_ONLY_SECTION_KEY);

  // The footer row actually rendered: `searchOnlyPaging`'s reveal row until it is used (hidden
  // during a search, which already reaches every row it would list), otherwise `footerAction`.
  let footerAction: (ProjectSelectorFooterAction & { opensDialog: boolean }) | undefined;
  if (searchOnlyPaging) {
    if (!isPagingRevealed && !hasQuery)
      footerAction = {
        label: searchOnlyPaging.revealLabel,
        onSelect: revealPagedRows,
        opensDialog: false,
      };
  } else if (props.footerAction) footerAction = { ...props.footerAction, opensDialog: true };
  const runFooterAction = () => {
    footerAction?.onSelect();
    // Close through the handler rather than `setOpen`, so the search query is cleared and the next
    // open starts from the full list.
    if (footerAction?.opensDialog) handleOpenChange(false);
  };
  // The paging config, once its last batch is listed; drives the "all loaded" footer note.
  const fullyLoadedPaging =
    isPagingBrowsing && !hasMoreBatches && pagedProjects.length > 0 ? searchOnlyPaging : undefined;
  const hasAnyRows = listedRowCount + filteredSearchOnlyProjects.length > 0;
  const mountedRowCount =
    sections.reduce(
      (count, section) => count + (isSectionExpanded(section) ? section.rows.length : 0),
      0,
    ) + (isSearchOnlySectionExpanded ? filteredSearchOnlyProjects.length : 0);

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
        // lowercased tab-derived ids; see normalizeProjectId). Guarantees that clicking a
        // row toggles the SAME pair regardless of casing on either side.
        const normalizedRowId = normalizeProjectId(row.projectId);
        if (isOneRowPerProject) {
          // The row stands for the project in every scroll group: unpicking drops them all;
          // picking adds the project in the first scroll group it is open in, if any.
          const isOfRow = (p: { projectId: string }) =>
            normalizeProjectId(p.projectId) === normalizedRowId;
          if (current.some(isOfRow)) {
            props.onChangeSelection({ pairs: current.filter((p) => !isOfRow(p)) });
            return;
          }
          const openTab = props.openTabs.find(isOfRow);
          props.onChangeSelection({
            pairs: [
              ...current,
              { projectId: row.projectId, scrollGroupId: openTab?.scrollGroupId },
            ],
          });
          return;
        }
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

  const { onSelectSearchOnlyProject } = props;
  const handleSearchOnlySelect = useCallback(
    (project: ProjectSelectorSearchOnlyProject) => {
      onSelectSearchOnlyProject?.(project.id);
      // Through the handler rather than `setOpen`, so the query clears like it does for the footer.
      handleOpenChange(false);
    },
    [onSelectSearchOnlyProject, handleOpenChange],
  );

  const handleClearAll = () => {
    if (props.mode !== 'project-multi') return;
    props.onChangeSelection({ pairs: [] });
    // With nothing selected, "Show only selected" would list nothing, so it goes off too.
    setIsShowingOnlySelected(false);
  };

  // Narrowed out of the union here rather than read inside the memo below: `props` itself is a
  // fresh object on every render, so naming it in the dep list would make the memo never hit, and
  // these two members exist only on the `'project'` variant so a dep list cannot name them
  // directly.
  const renderTriggerLabel = props.mode === 'project' ? props.renderTriggerLabel : undefined;
  const triggerLabelFormat = props.mode === 'project' ? props.triggerLabelFormat : undefined;
  const multiTriggerLabel = props.mode === 'project-multi' ? props.triggerLabel : undefined;
  const { triggerHiddenIds } = props;

  const triggerContent = useMemo<{
    node: ReactNode;
    title: string;
    /**
     * The spoken form of {@link title}, when the two differ. `title` is written for the eye and can
     * carry punctuation a screen reader reads out as a word; this drops it.
     */
    accessibleTitle?: string;
    hasSelection: boolean;
  }>(() => {
    switch (props.mode) {
      case 'project': {
        const selected = lookUpProject(props.selection.projectId);
        // An empty title suppresses the tooltip wrapper below — see `renderTriggerLabel`'s TSDoc.
        if (renderTriggerLabel)
          return { node: renderTriggerLabel(selected), title: '', hasSelection: !!selected };
        let text = selected ? selected.shortName : strings.buttonPlaceholder;
        if (selected && triggerLabelFormat === 'shortNameAndFullName')
          text = formatProjectName(selected);
        return { node: text, title: text, hasSelection: !!selected };
      }
      case 'project-multi': {
        const { pairs } = props.selection;
        if (pairs.length === 0) {
          const text = multiTriggerLabel ?? strings.buttonPlaceholder;
          return { node: text, title: text, hasSelection: false };
        }
        type Tuple = { project: ProjectSelectorProject; scrollGroupId?: ScrollGroupId };
        const tuples: Tuple[] = [];
        pairs.forEach((pair) => {
          if (triggerHiddenIds?.includes(pair.projectId)) return;
          const project = lookUpProject(pair.projectId);
          if (project) tuples.push({ project, scrollGroupId: pair.scrollGroupId });
        });
        if (tuples.length === 0) {
          const text = multiTriggerLabel ?? strings.buttonPlaceholder;
          return { node: text, title: text, hasSelection: false };
        }
        const items = tuples
          .map(({ project, scrollGroupId }) =>
            scrollGroupId === undefined
              ? project.shortName
              : `${project.shortName} (${scrollGroupLetterFromMap(scrollGroupId)})`,
          )
          .join(', ');
        // Each name followed by the same scroll-group chip its row shows (without the row's
        // tooltip); the trigger's own tooltip spells the letters out in `title`.
        const chips = (
          // A row of name-and-chip pairs, each centered on one line; the row clips at the trigger's
          // end, where the trigger's tooltip has the full list.
          <span className="tw:flex tw:min-w-0 tw:items-center tw:overflow-hidden" dir="auto">
            {tuples.map(({ project, scrollGroupId }, index) => (
              <span
                key={`${project.id}:${scrollGroupId ?? ''}`}
                className="tw:flex tw:shrink-0 tw:items-center"
              >
                {index > 0 && <span className="tw:me-1">,</span>}
                {project.shortName}
                {scrollGroupId !== undefined && (
                  <span className="tw:ms-1 tw:flex">
                    <ScrollGroupChip scrollGroupId={scrollGroupId} isBoundButClosed={false} />
                  </span>
                )}
              </span>
            ))}
          </span>
        );
        return { node: multiTriggerLabel ?? chips, title: items, hasSelection: true };
      }
      case 'projectScrollGroup': {
        const selected = lookUpProject(props.selection.projectId);
        if (!selected) {
          const text = strings.buttonPlaceholder;
          return { node: text, title: text, hasSelection: false };
        }
        const group = props.selection.scrollGroupId;
        if (group === undefined) {
          return { node: selected.shortName, title: selected.shortName, hasSelection: true };
        }
        const groupLetter = scrollGroupLetterFromMap(group);
        // The middle dot is a visual separator; a screen reader reads it aloud ("WEB middle dot
        // A"). A comma is the spoken equivalent — it renders as a pause, not a word.
        return {
          node: `${selected.shortName} · ${groupLetter}`,
          title: `${selected.shortName} · ${groupLetter}`,
          accessibleTitle: `${selected.shortName}, ${groupLetter}`,
          hasSelection: true,
        };
      }
      default:
        return { node: '', title: '', hasSelection: false };
    }
  }, [
    props.mode,
    lookUpProject,
    props.selection,
    renderTriggerLabel,
    triggerLabelFormat,
    multiTriggerLabel,
    triggerHiddenIds,
    strings.buttonPlaceholder,
  ]);

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
    // Environments without ResizeObserver (jsdom, SSR) keep the one-shot measurement above and
    // simply never re-measure. Throwing here would take down the whole React tree of every
    // consumer, so degrade instead.
    if (typeof ResizeObserver === 'undefined') return undefined;
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
  // mode) so the user sees the selector is not ready yet.
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

  // `aria-label` REPLACES a button's text content for assistive tech, so a bare group label
  // ("Project settings") would leave a screen-reader user unable to tell which project is
  // selected — the one thing the visible trigger is there to say. Name the selection alongside the
  // group label instead.
  //
  // Gated on `hasSelection` rather than on the title being non-empty: with nothing selected the
  // title is the PLACEHOLDER, and "Project: Select a project" announces a selection that does not
  // exist. `title` is separately empty when a consumer supplies `renderTriggerLabel` — the label
  // node is arbitrary then, so the consumer owns naming it, as the Simple-mode toolbar does.
  const triggerAriaLabel =
    strings.ariaLabel && triggerContent.hasSelection && triggerContent.title
      ? `${strings.ariaLabel}: ${triggerContent.accessibleTitle ?? triggerContent.title}`
      : strings.ariaLabel || undefined;

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
      aria-label={triggerAriaLabel}
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
        props.buttonClassName,
      )}
    >
      <span className="tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:text-start tw:whitespace-nowrap">
        {typeof triggerContent.node === 'string' ? (
          // Muted while it is a placeholder, with nothing selected.
          <span
            className={cn(
              'tw:min-w-0 tw:truncate',
              // A filled (primary) trigger keeps its own text color: it is a call to pick.
              !triggerContent.hasSelection &&
                props.buttonVariant !== 'default' &&
                'tw:text-muted-foreground',
            )}
            dir="auto"
          >
            {triggerContent.node}
          </span>
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
  const triggerWithTooltip =
    triggerContent.title && (props.hasTriggerTooltip ?? true) ? (
      <TooltipProvider delayDuration={400}>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent dir="auto">{triggerContent.title}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ) : (
      <PopoverTrigger asChild>{triggerButton}</PopoverTrigger>
    );

  return (
    <Popover open={open} onOpenChange={handleOpenChange} modal={props.isModal}>
      {triggerWithTooltip}
      <PopoverContent
        align="start"
        collisionPadding={16}
        className="tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0"
      >
        <TooltipProvider delayDuration={400}>
          <Command
            shouldFilter={false}
            // Controlled only for the one render after the paging reveal row is picked — see
            // `revealHighlight`. cmdk keeps the value once it is released back to `undefined`, and
            // otherwise keeps its own "highlight the first item" behavior.
            value={revealHighlight}
            onValueChange={() => setRevealHighlight(undefined)}
          >
            {/* No `border-b` here — CommandInput's own InputGroup carries a full 1px border, and
                stacking the two draws an unexpected second horizontal line just below the pill. */}
            {/* End padding only before the ⋮ menu; without it the box runs to the same inset as its
                start. */}
            <div
              className={cn(
                'tw:flex tw:items-center',
                (hasViewOptions || hasShowOnlySelected || availableGroupings.length > 1) &&
                  'tw:pe-2',
              )}
            >
              {/* Multi-select: a checkbox before the search box, in line with the rows' boxes,
                  that unselects everything. It only ever unselects — there is deliberately no
                  "Select all": selecting every project mounts a data subscription per project, so
                  on a large installation it is a performance hazard rather than a convenience. */}
              {props.mode === 'project-multi' && (
                <Tooltip delayDuration={400}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      aria-label={strings.clearAll}
                      disabled={props.selection.pairs.length === 0}
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={handleClearAll}
                      className={cn(
                        'tw:ms-3 tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-[4px] tw:border tw:shadow-xs tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:outline-none',
                        // Uncolored, unlike the rows' ticked boxes: it is an action, not a pick.
                        'tw:border-input tw:bg-background tw:text-foreground tw:disabled:opacity-50',
                      )}
                    >
                      {props.selection.pairs.length > 0 && <Minus className="tw:size-3" />}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{strings.clearAll}</TooltipContent>
                </Tooltip>
              )}
              {/* Multi-select: the search box's icon and text line up with the rows' icons and names
                  below, as the checkbox before it lines up with theirs. */}
              <div
                className={cn(
                  'tw:relative tw:flex-1',
                  props.mode === 'project-multi' && MULTI_SEARCH_ALIGNMENT_CLASS,
                )}
              >
                <CommandInput
                  value={query}
                  onValueChange={handleQueryChange}
                  placeholder={strings.searchPlaceholder}
                  // End padding keeps typed text clear of the clear-search X laid over the input.
                  // The placeholder stays for assistive technology but is drawn by the overlay below.
                  className={cn('tw:border-0 tw:placeholder:text-transparent', query && 'tw:pe-7')}
                  // Picker semantics: with nothing typed, Space picks the highlighted project
                  // (the Enter UX) — the project list is the whole point here and a leading space
                  // is meaningless in a project name search.
                  spaceSelectsHighlightedItem
                  // With no row mounted (none listed, none matching, or every section collapsed)
                  // cmdk has nothing to act on, so Enter runs the footer row, the list's way out.
                  onKeyDown={(event) => {
                    if (event.key !== 'Enter' || mountedRowCount > 0 || !footerAction) return;
                    event.preventDefault();
                    runFooterAction();
                  }}
                />
                {/* The visible placeholder. A focused input never ends its placeholder with an
                    ellipsis — and this one has focus whenever the picker opens — so a long one
                    ("Search projects and resources…") is drawn here, truncating, instead.
                    `start-[35px]` is where the input's text starts, past the search icon. */}
                {!query && (
                  <span
                    aria-hidden
                    className={cn(
                      'tw:pointer-events-none tw:absolute tw:end-2 tw:top-[calc(50%+2px)] tw:-translate-y-1/2 tw:truncate tw:text-sm tw:text-muted-foreground',
                      // Where the input's text starts, past the search icon.
                      props.mode === 'project-multi' ? 'tw:start-[30px]' : 'tw:start-[35px]',
                    )}
                  >
                    {strings.searchPlaceholder}
                  </span>
                )}
                {query && (
                  <ClearSearchButton
                    label={strings.clearSearchAriaLabel}
                    onClear={() => handleQueryChange('')}
                    // `top-[calc(50%+2px)]`: the input wrapper pads its top but not its bottom.
                    className="tw:absolute tw:end-2 tw:top-[calc(50%+2px)] tw:-translate-y-1/2"
                  />
                )}
              </div>
              {/* Offered for its view options, and for the groupings when there is more than
                  one to choose from. */}
              {(hasViewOptions || hasShowOnlySelected || availableGroupings.length > 1) && (
                <GroupByMenu
                  availableGroupings={availableGroupings}
                  activeGrouping={activeGrouping}
                  onChangeGrouping={setPickedGrouping}
                  strings={strings}
                  compactView={
                    hasViewOptions ? { isOn: isCompactView, onChange: setIsCompactView } : undefined
                  }
                  showOnlySelected={
                    hasShowOnlySelected
                      ? { isOn: isShowingOnlySelected, onChange: setIsShowingOnlySelected }
                      : undefined
                  }
                />
              )}
            </div>
            {/* `relative` places the Scroll to top button over the list's bottom end corner. */}
            <div className="tw:relative">
              <CommandList
                ref={commandListRef}
                onScroll={(event) => setIsListScrolled(event.currentTarget.scrollTop > 0)}
              >
                {/* Gated on the rows themselves, not left to cmdk's registered count: with every
                  section collapsed nothing is registered, yet "No projects found" would be false. */}
                {!hasAnyRows && (
                  <CommandEmpty className="tw:p-0">
                    <Empty role="status" className="tw:gap-3 tw:p-4">
                      <EmptyHeader>
                        <EmptyTitle className="tw:text-sm">
                          {strings.commandEmptyMessage}
                        </EmptyTitle>
                      </EmptyHeader>
                      {hasQuery && (
                        <EmptyContent>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(event) => {
                              // Focus first: the button unmounts with the empty state it sits in.
                              focusSearchInput(event.currentTarget);
                              handleQueryChange('');
                            }}
                          >
                            {strings.clearSearchAriaLabel}
                          </Button>
                        </EmptyContent>
                      )}
                    </Empty>
                  </CommandEmpty>
                )}
                {sections.map((section, index) => {
                  const collapseKey = sectionCollapseKey(section);
                  const baseHeading = shownSectionHeading(section);
                  const heading =
                    baseHeading &&
                    withSectionCount(
                      baseHeading,
                      section.rows.length,
                      unfilteredSectionCounts.get(collapseKey),
                      section.key,
                    );
                  const isExpanded = isSectionExpanded(section);
                  const controlsId = `${sectionIdPrefix}-section-${index}`;
                  return (
                    // Custom groupings yield multiple 'grouping' sections, so the section key must
                    // include the label (or key) to stay stable across re-orders.
                    <Fragment key={collapseKey}>
                      {heading && (
                        <SectionHeadingToggle
                          heading={heading}
                          indicator={
                            section.key === undefined
                              ? undefined
                              : activeGroupingDefinition?.getSectionHeadingIndicator?.(section.key)
                          }
                          isExpanded={isExpanded}
                          onToggle={() => toggleSection(collapseKey)}
                          controlsId={controlsId}
                        />
                      )}
                      {/* A collapsed section unmounts its rows, which is what takes them out of
                        cmdk's arrow-key navigation. The wrapper stays as `aria-controls`' target. */}
                      <div id={controlsId} role="presentation">
                        {isExpanded && (
                          <CommandGroup className={heading ? 'tw:pt-0' : undefined}>
                            {section.caption && (
                              <p className="tw:px-2 tw:pb-1 tw:text-xs tw:text-muted-foreground">
                                {section.caption}
                              </p>
                            )}
                            {section.rows.map((row) => (
                              <ProjectRowView
                                isCompact={isCompactView}
                                onHoverChange={props.onRowHoverChange}
                                key={row.rowKey}
                                row={row}
                                mode={props.mode}
                                strings={strings}
                                onClick={handleRowClick}
                                onOpen={openButtonHandler}
                                selectedRowRef={selectedRowRef}
                                indicator={renderIndicator(row)}
                                reserveIndicatorSlot={reserveIndicatorSlot}
                                icon={renderProjectIcon?.(row.project)}
                                reserveIconSlot={reserveIconSlot}
                                tooltipLine={getProjectTooltipLine?.(row.project, activeGrouping)}
                                roleIndicator={renderProjectRoleIndicator?.(row.project)}
                                reserveTrailingSlot={reserveTrailingSlot}
                                reserveRoleSlot={reserveRoleSlot}
                                trailingIndicator={renderProjectTrailingIndicator?.(
                                  row.project,
                                  activeGrouping,
                                )}
                              />
                            ))}
                          </CommandGroup>
                        )}
                      </div>
                    </Fragment>
                  );
                })}
                {filteredSearchOnlyProjects.length > 0 && (
                  <>
                    <SectionHeadingToggle
                      heading={searchOnlySectionHeading}
                      isExpanded={isSearchOnlySectionExpanded}
                      onToggle={() => toggleSection(SEARCH_ONLY_SECTION_KEY)}
                      controlsId={`${sectionIdPrefix}-section-search-only`}
                    />
                    <div id={`${sectionIdPrefix}-section-search-only`} role="presentation">
                      {isSearchOnlySectionExpanded && (
                        <CommandGroup className="tw:pt-0">
                          {filteredSearchOnlyProjects.map((project) => (
                            <SearchOnlyRowView
                              isCompact={isCompactView}
                              key={`${SEARCH_ONLY_VALUE_PREFIX}${project.id}`}
                              project={project}
                              onSelect={handleSearchOnlySelect}
                              indicator={renderProjectIndicator?.(project)}
                              reserveIndicatorSlot={reserveIndicatorSlot}
                              icon={renderProjectIcon?.(project)}
                              reserveIconSlot={reserveIconSlot}
                              tooltipLine={getProjectTooltipLine?.(project, activeGrouping)}
                            />
                          ))}
                        </CommandGroup>
                      )}
                      {/* Collapsed, the section has no end to scroll to, so nothing loads. */}
                      {isSearchOnlySectionExpanded && hasMoreBatches && (
                        <div
                          ref={pagingSentinelRef}
                          role="presentation"
                          className="tw:flex tw:min-h-8 tw:items-center tw:gap-2 tw:px-2 tw:ps-8 tw:text-xs tw:text-muted-foreground"
                        >
                          {isLoadingBatch && (
                            <>
                              <Loader2 aria-hidden className="tw:h-3.5 tw:w-3.5 tw:animate-spin" />
                              <span role="status">
                                {searchOnlyPaging?.loadingLabel ?? DEFAULT_PAGING_LOADING_LABEL}
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                )}
                {fullyLoadedPaging && (
                  <div role="presentation" className="tw:sticky tw:bottom-0 tw:z-10 tw:bg-popover">
                    <p className="tw:px-2 tw:py-1.5 tw:ps-8 tw:text-xs tw:text-muted-foreground">
                      {fullyLoadedPaging.allLoadedLabel}
                    </p>
                  </div>
                )}
                {footerAction && (
                  // Stuck to the bottom of the scroll box rather than merely last in it. The footer
                  // is the list's escape hatch, and `CommandList` is `max-h-72 overflow-y-auto`, so
                  // as a plain last child it scrolls out of reach on any list long enough to need
                  // it — which is the state a user is most likely to be looking for it in. It stays
                  // INSIDE `CommandList` because that is the subtree cmdk's `getValidItems()` walks
                  // for arrow-key, Home/End and Enter navigation; moving it out would make it
                  // pointer-only. Opaque background so rows scroll behind it rather than through it.
                  // `role="presentation"` because this wrapper exists only to position the row:
                  // without it the div breaks `CommandList`'s `role="listbox"` ownership of the
                  // footer's `role="option"`, and some assistive tech stops counting the footer in
                  // "1 of N". The rule above it shows only when there are rows to divide it from.
                  <div
                    role="presentation"
                    className={cn(
                      'tw:sticky tw:bottom-0 tw:z-10 tw:bg-popover',
                      hasAnyRows && 'tw:border-t',
                    )}
                  >
                    {/* `forceMount` keeps this out of cmdk's registered-item set, so `filtered.count`
                      stays 0 on an empty list and CommandEmpty still renders — while the node
                      remains inside CommandList, where `getValidItems()` finds it for arrow-key,
                      Home/End and Enter navigation. See {@link FOOTER_ACTION_VALUE} for why the
                      value is explicit. */}
                    <CommandItem
                      forceMount
                      value={FOOTER_ACTION_VALUE}
                      data-testid="project-selector-footer-action"
                      // cmdk renders every CommandItem as `role="option"`, which promises a screen
                      // reader that activating it selects a value from this list. A `footerAction`
                      // closes the popover and opens a modal dialog instead, so it says so; the
                      // paging reveal row stays in this list.
                      aria-haspopup={footerAction.opensDialog ? 'dialog' : undefined}
                      // Also a Tab stop, so the footer is reachable without arrowing through every
                      // row. Enter and Space on the focused footer run it and are default-prevented,
                      // because cmdk's root `keydown` handler would otherwise pick whichever row it
                      // has highlighted — the same contract as `SectionHeadingToggle`.
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key !== 'Enter' && event.key !== ' ') return;
                        event.preventDefault();
                        runFooterAction();
                      }}
                      className="tw:flex tw:items-center tw:gap-2 tw:pe-4 tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:outline-none tw:focus-visible:ring-inset"
                      onSelect={runFooterAction}
                    >
                      {/* Empty stand-ins for the check and indicator slots every project row leads
                        with. Without them the footer's text starts ~40px to the left of every
                        label above it — the same ragged edge `reserveIndicatorSlot` exists to
                        prevent between rows. Mirrors `ProjectRowView`'s leading spans, so the two
                        stay aligned if that layout changes. */}
                      <span
                        aria-hidden
                        className="tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center"
                      />
                      {reserveIconSlot && <IconSlot />}
                      {Boolean(props.renderProjectIndicator) && (
                        <span
                          aria-hidden
                          className="tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center"
                        />
                      )}
                      <span className="tw:min-w-0 tw:flex-1 tw:truncate tw:text-start">
                        {footerAction.label}
                      </span>
                    </CommandItem>
                  </div>
                )}
              </CommandList>
              {isListScrolled && (
                // Outside every row, so a click scrolls and never picks anything; `mousedown` is
                // default-prevented so focus stays in the search box.
                <TrailingTooltip label={strings.scrollToTop}>
                  <Button
                    variant="secondary"
                    size="icon"
                    aria-label={strings.scrollToTop}
                    // Above the footer row ("More resources…"), when there is one, so it never
                    // covers it.
                    className={cn(
                      'tw:absolute tw:end-2 tw:z-20 tw:h-7 tw:w-7 tw:shadow-md',
                      footerAction ? 'tw:bottom-12' : 'tw:bottom-2',
                    )}
                    // The pointer over the button is not over a row: none of a row's hover effects
                    // (its highlight, the hovered tab's pulse) follow it here.
                    onPointerEnter={() => props.onRowHoverChange?.(undefined)}
                    onPointerMove={(event) => event.stopPropagation()}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={(event) => {
                      event.stopPropagation();
                      commandListRef.current?.scrollTo({ top: 0 });
                    }}
                  >
                    <ArrowUpToLine className="tw:h-4 tw:w-4" />
                  </Button>
                </TrailingTooltip>
              )}
            </div>
          </Command>
        </TooltipProvider>
      </PopoverContent>
    </Popover>
  );
}

/** The row filter: a case-insensitive substring match on the short or full name. */
function matchesSearch(
  project: Pick<ProjectSelectorProject, 'shortName' | 'fullName'>,
  needle: string,
): boolean {
  return (
    project.shortName.toLowerCase().includes(needle) ||
    (project.fullName ?? '').toLowerCase().includes(needle)
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
