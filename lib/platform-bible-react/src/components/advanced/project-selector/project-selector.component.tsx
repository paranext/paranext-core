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
import { ArrowRight, Check, ChevronDown, ChevronsUpDown, Filter } from 'lucide-react';
import {
  DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS,
  getLocalizeKeyForScrollGroupId,
  type ScrollGroupId,
} from 'platform-bible-utils';
import { cn } from '@/utils/shadcn-ui/utils';
import { Z_INDEX_OVERLAY } from '@/components/z-index';
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn-ui/tooltip';
import {
  computeRows,
  partitionAndSort,
  type ProjectSelectorOpenTab,
  type ProjectMultiSelection,
  type ProjectSelectorProjectPair,
  type ProjectRow,
  type ProjectScrollGroupSelection,
  type ProjectSelection,
  type ProjectSelectorMode,
  type ProjectSelectorProject,
  type RowSection,
} from './project-selector.rows';

export type {
  ProjectSelectorOpenTab,
  ProjectMultiSelection,
  ProjectSelectorProjectPair,
  ProjectRow,
  ProjectScrollGroupSelection,
  ProjectSelection,
  ProjectSelectorMode,
  ProjectSelectorProject,
} from './project-selector.rows';

// #region Localized strings

export type ProjectSelectorLocalizedStrings = {
  /** Placeholder for the popover's search input. Defaults to `"Search projects & resources"`. */
  searchPlaceholder?: string;
  /** Accessible label for the filter menu icon button. Defaults to `"Filter"`. */
  filterAriaLabel?: string;
  /** Filter menu: section heading for the grouping toggle. Defaults to `"Group"`. */
  groupSectionLabel?: string;
  /** Filter menu: section heading for the filter toggles. Defaults to `"Filter"`. */
  filterSectionLabel?: string;
  /** Filter menu: "By open tabs" item under the Group section. Defaults to `"By open tabs"`. */
  filterGroupByOpenTabs?: string;
  /** Filter menu: multi-only item under the Filter section. Defaults to `"Show selected only"`. */
  filterShowSelectedOnly?: string;
  /** Section heading for the Open tabs section. Defaults to `"Opened project & resource tabs"`. */
  openTabsSectionHeading?: string;
  /** Section heading for the Other projects section. Defaults to `"Your projects & resources"`. */
  otherProjectsSectionHeading?: string;
  /**
   * Tooltip on the bound-but-closed chip. `{group}` is replaced with the scroll-group letter.
   * Defaults to `"Bound to {group} · not currently open"`.
   */
  boundButClosedTooltip?: string;
  /** Label of the "Open" button shown on bound-but-closed rows. Defaults to `"Open"`. */
  openButtonLabel?: string;
  /** Multi-select: "Select all" button. Defaults to `"Select all"`. */
  selectAll?: string;
  /** Multi-select: "Clear all" button. Defaults to `"Clear all"`. */
  clearAll?: string;
};

const DEFAULT_STRINGS: Required<ProjectSelectorLocalizedStrings> = {
  searchPlaceholder: 'Search projects & resources',
  filterAriaLabel: 'Filter',
  groupSectionLabel: 'Group',
  filterSectionLabel: 'Filter',
  filterGroupByOpenTabs: 'By open tabs',
  filterShowSelectedOnly: 'Show selected only',
  openTabsSectionHeading: 'Opened project & resource tabs',
  otherProjectsSectionHeading: 'Your projects & resources',
  boundButClosedTooltip: 'Bound to {group} · not currently open',
  openButtonLabel: 'Open',
  selectAll: 'Select all',
  clearAll: 'Clear all',
};

function resolveStrings(
  partial: ProjectSelectorLocalizedStrings | undefined,
): Required<ProjectSelectorLocalizedStrings> {
  return { ...DEFAULT_STRINGS, ...partial };
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
  buttonPlaceholder?: string;
  commandEmptyMessage?: string;
  ariaLabel?: string;
  buttonVariant?: ButtonProps['variant'];
  buttonClassName?: string;
  popoverContentClassName?: string;
  popoverContentStyle?: CSSProperties;
  alignDropDown?: 'start' | 'center' | 'end';
  isDisabled?: boolean;
  localizedStrings?: ProjectSelectorLocalizedStrings;
  /** Initial state of the "Group by open tabs" toggle. Defaults to `true`. */
  defaultGroupByOpenTabs?: boolean;
};

export type ProjectSelectorProps =
  | (CommonProps & {
      mode: 'project';
      selection: ProjectSelection;
      onChangeSelection: (selection: { projectId: string }) => void;
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
  /**
   * Sebastian #5 (2026-05-11): forwarded by the parent so it can scroll the selected row into view
   * when the popover opens (replacing the prior float-to-top behavior).
   */
  selectedRowRef?: RefObject<HTMLDivElement>;
};

function ProjectRowView({ row, mode, strings, onClick, onOpen, selectedRowRef }: RowRenderProps) {
  // Per-row hover state. We control Radix Tooltip's `open` prop manually because Radix's
  // built-in pointer/focus auto-detection does not fire on cmdk's `<CommandItem>` trigger
  // (data-state stays "closed" even after pointerenter / pointermove / focus). Tracking
  // hover ourselves bypasses that auto-detection entirely.
  const [isHovered, setIsHovered] = useState(false);

  // Ref to the truncating label span so we can measure scrollWidth vs clientWidth on hover
  // and decide whether the tooltip should show. We only want a tooltip on rows where the
  // visible text is actually clipped — or on rows that have extra info to surface beyond
  // what's visible in the row itself.
  // React's ref API requires `null` as the initial value for DOM refs.
  // eslint-disable-next-line no-null/no-null
  const labelRef = useRef<HTMLSpanElement>(null);

  const tooltipHasLanguage = Boolean(row.language || row.languageCode);

  // Tooltip lines that convey information NOT visible in the row text. These rows should
  // always show a tooltip on hover, regardless of whether the visible text is truncated.
  const hasExtraTooltipContent =
    tooltipHasLanguage ||
    Boolean(row.scrollGroupScrRefLabel) ||
    row.isBoundButClosed ||
    (row.isDisabled && Boolean(row.disabledReason));

  const handlePointerEnter = useCallback(() => {
    if (hasExtraTooltipContent) {
      setIsHovered(true);
      return;
    }
    // Otherwise only open the tooltip if the visible row text is actually truncated.
    const el = labelRef.current;
    if (!el) return;
    if (el.scrollWidth > el.clientWidth) setIsHovered(true);
  }, [hasExtraTooltipContent]);

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
      value={`${row.rowKey} ${row.shortName} ${row.fullName} ${row.language ?? ''} ${row.languageCode ?? ''}`}
      onSelect={() => {
        if (row.isDisabled) return;
        onClick(row);
      }}
      disabled={row.isDisabled}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={() => setIsHovered(false)}
      className="tw:flex tw:items-center tw:gap-2 tw:pe-4"
      data-selected={row.isSelected}
    >
      <span className="tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center">
        {leftCheck}
      </span>
      {/* Sebastian #35 (2026-05-11): row label uses a 2-line layout — shortName on top,
          fullName muted below. Each line truncates independently. Tooltip-on-clip still
          works because the wrapping span is what scrollWidth/clientWidth is measured on
          (truncation in EITHER child contributes to overflow). Reviewer confirmation
          requested before this lands wide. */}
      <span
        ref={labelRef}
        className="tw-flex tw-min-w-0 tw-flex-1 tw-flex-col tw-items-start tw-overflow-hidden tw-text-start"
      >
        <span className="tw-w-full tw-truncate tw-font-medium">{row.shortName}</span>
        <span className="tw-w-full tw-truncate tw-text-xs tw-text-muted-foreground">
          {row.fullName}
        </span>
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
        style={{ zIndex: Z_INDEX_OVERLAY }}
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

type FilterMenuProps = {
  groupByOpenTabs: boolean;
  onChangeGroupByOpenTabs: (value: boolean) => void;
  showSelectedOnly: boolean | undefined;
  onChangeShowSelectedOnly: ((value: boolean) => void) | undefined;
  strings: Required<ProjectSelectorLocalizedStrings>;
};

function FilterMenu({
  groupByOpenTabs,
  onChangeGroupByOpenTabs,
  showSelectedOnly,
  onChangeShowSelectedOnly,
  strings,
}: FilterMenuProps) {
  // A filter (as opposed to grouping) is "active" when at least one filter toggle is on.
  // Today that's just `showSelectedOnly`; when we add more, OR them here.
  const isFilterActive = Boolean(showSelectedOnly);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            'tw:h-8 tw:w-8 tw:shrink-0 tw:p-0',
            // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
            // that's currently pressed when a filter is active.
            isFilterActive &&
              'tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent',
          )}
          aria-label={strings.filterAriaLabel}
          aria-pressed={isFilterActive}
          title={strings.filterAriaLabel}
          onMouseDown={(event: MouseEvent) => event.preventDefault()}
        >
          <Filter className="tw:h-4 tw:w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="tw:w-56" style={{ zIndex: Z_INDEX_OVERLAY }}>
        <DropdownMenuLabel>{strings.groupSectionLabel}</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={groupByOpenTabs}
          onCheckedChange={onChangeGroupByOpenTabs}
          onSelect={(event) => event.preventDefault()}
        >
          {strings.filterGroupByOpenTabs}
        </DropdownMenuCheckboxItem>
        {onChangeShowSelectedOnly && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>{strings.filterSectionLabel}</DropdownMenuLabel>
            <DropdownMenuCheckboxItem
              checked={Boolean(showSelectedOnly)}
              onCheckedChange={onChangeShowSelectedOnly}
              onSelect={(event) => event.preventDefault()}
            >
              {strings.filterShowSelectedOnly}
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
 */
export function ProjectSelector(props: ProjectSelectorProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [groupByOpenTabs, setGroupByOpenTabs] = useState(props.defaultGroupByOpenTabs ?? true);
  const [showSelectedOnly, setShowSelectedOnly] = useState(false);

  // Sebastian #5 (2026-05-11): clear the search filter when the popover closes so the
  // next open starts fresh. Previously the query persisted across open/close, which
  // confused users who'd typed a filter and expected the list to reset.
  //
  // Scroll-to-selected: when the popover opens, scroll the selected row into view
  // (replaces the float-to-top behavior removed in rows.ts). The ref is wired through
  // ProjectRowView; in multi-select the last selected row in the alphabetical order
  // wins (good-enough for the typical project-mode case where there's only one).
  // null is the canonical initial value for React DOM refs.
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

  const sections = useMemo(
    () => partitionAndSort(filteredRows, groupByOpenTabs),
    [filteredRows, groupByOpenTabs],
  );

  // Every (project, scrollGroupId) pair available for selection — independent of the current
  // search query or "Show selected only" filter. Used by "Select all" in multi mode so the user
  // can select the full catalog without first clearing the search box.
  const allPairs = useMemo<ProjectSelectorProjectPair[]>(() => {
    if (props.mode !== 'project-multi') return [];
    const result: ProjectSelectorProjectPair[] = [];
    props.projects.forEach((project) => {
      const tabs = props.openTabs.filter((t) => t.projectId === project.id);
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
    // obvious way out, since the toggle lives inside the filter dropdown. Turn it off.
    if (showSelectedOnly) setShowSelectedOnly(false);
  };

  const triggerContent = useMemo<{ node: ReactNode; title: string }>(() => {
    switch (props.mode) {
      case 'project': {
        const selected = props.projects.find((p) => p.id === props.selection.projectId);
        const text = selected ? selected.shortName : (props.buttonPlaceholder ?? '');
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

  const triggerIcon =
    props.mode === 'project-multi' ? (
      <ChevronsUpDown className="tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" />
    ) : (
      <ChevronDown className="tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" />
    );

  const openButtonHandler =
    props.mode === 'projectScrollGroup' ||
    (props.mode === 'project-multi' && props.onOpenProjectInGroup)
      ? handleOpenProjectInGroup
      : undefined;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant={props.buttonVariant ?? 'outline'}
          role="combobox"
          aria-expanded={open}
          aria-label={props.ariaLabel}
          disabled={props.isDisabled ?? false}
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
      </PopoverTrigger>
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
                  placeholder={strings.searchPlaceholder}
                  className="tw:border-0"
                />
              </div>
              <FilterMenu
                groupByOpenTabs={groupByOpenTabs}
                onChangeGroupByOpenTabs={setGroupByOpenTabs}
                showSelectedOnly={props.mode === 'project-multi' ? showSelectedOnly : undefined}
                onChangeShowSelectedOnly={
                  props.mode === 'project-multi' ? setShowSelectedOnly : undefined
                }
                strings={strings}
              />
            </div>
            {props.mode === 'project-multi' && (
              <div className="tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2">
                <Button variant="ghost" size="sm" onClick={handleSelectAll}>
                  {`${strings.selectAll} (${allPairs.length.toString()})`}
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClearAll}>
                  {`${strings.clearAll} (${props.selection.pairs.length.toString()})`}
                </Button>
              </div>
            )}
            <CommandList>
              <CommandEmpty>{props.commandEmptyMessage ?? 'No projects found'}</CommandEmpty>
              {sections.map((section, index) => (
                <Fragment key={section.kind}>
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
    case 'flat':
    default:
      return undefined;
  }
}

export default ProjectSelector;

// #endregion
