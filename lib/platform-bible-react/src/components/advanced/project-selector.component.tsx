import { Fragment, ReactNode, useMemo, useState, type CSSProperties, type MouseEvent } from 'react';
import { Check, ChevronDown, ChevronsUpDown, Filter } from 'lucide-react';
import { cn } from '@/utils/shadcn-ui.util';
import { Z_INDEX_OVERLAY } from '@/components/z-index';
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

// #region Types

/** Category used by the "By type" grouping in the project selector. */
export type ProjectSelectorProjectType = 'project' | 'resource';

/**
 * Grouping applied to the project selector's list. `none` renders a flat list. Projects are
 * always sorted alphabetically within each group.
 */
export type ProjectSelectorGroupMode =
  | 'none'
  | 'bySelection'
  | 'byType'
  | 'byOpenedTabs'
  | 'byLastUpdated';

/** A single project entry rendered in the project selector. */
export type ProjectSelectorProject = {
  /** Unique project identifier. */
  id: string;
  /** Short project name, shown as the primary label. */
  shortName: string;
  /** Full project name, shown as a secondary label and in the tooltip. */
  fullName: string;
  /** Human-readable language name (e.g. "Hawaii Creole English"). Used in the tooltip. */
  language?: string;
  /** BCP-47-ish language code (e.g. "hwc-x-ux"). Used in the tooltip. */
  languageCode?: string;
  /** Whether the project is currently opened in a tab. Drives the "Opened tabs" grouping and filter. */
  isOpenedTab?: boolean;
  /** Category used by the "By type" grouping. */
  projectType?: ProjectSelectorProjectType;
  /**
   * Short label of the scroll group the project is docked in (e.g. "A", "B"). Rendered on the
   * right side of the row and in the tooltip.
   */
  scrollGroup?: string;
  /** Current scripture reference of the scroll group, shown in the tooltip (e.g. "MAT 3:16"). */
  scrollGroupScrRef?: string;
  /**
   * When the project was last updated — `Date`, millisecond timestamp, or ISO string. Used by the
   * "Last updated" grouping to bucket projects by recency. Projects without a value fall into the
   * "Unknown" bucket.
   */
  lastUpdated?: Date | number | string;
};

/** Optional labels surfaced by the project selector UI. */
export type ProjectSelectorLocalizedStrings = {
  /** Placeholder for the popover's search input. Defaults to `"Search projects & resources"`. */
  searchPlaceholder?: string;
  /** Accessible label for the filter/group icon button. Defaults to `"Group and filter"`. */
  filterAriaLabel?: string;
  /** Section label for the grouping options. Defaults to `"Group"`. */
  groupSectionLabel?: string;
  /** Section label for the filter options. Defaults to `"Filter"`. */
  filterSectionLabel?: string;
  /** Group menu: "None" item (no grouping). Defaults to `"None"`. */
  groupNone?: string;
  /** Group menu: "By selection" item. Defaults to `"By selection"`. */
  groupBySelection?: string;
  /** Group menu: "By type" item. Defaults to `"By type"`. */
  groupByType?: string;
  /** Group menu: "By opened tabs" item. Defaults to `"By opened tabs"`. */
  groupByOpenedTabs?: string;
  /** Group menu: "Last updated" item. Defaults to `"Last updated"`. */
  groupByLastUpdated?: string;
  /** Filter toggle: "Display opened tabs". Defaults to `"Display opened tabs"`. */
  filterDisplayOpenedTabs?: string;
  /** Group heading for opened tabs. Defaults to `"Opened tabs"`. */
  openedTabsGroupHeading?: string;
  /** Group heading for the "Other projects & resources" group. Defaults to `"Other projects & resources"`. */
  otherProjectsGroupHeading?: string;
  /** Group heading for selected projects (used by "By selection"). Defaults to `"Selected"`. */
  selectedGroupHeading?: string;
  /** Group heading for unselected projects (used by "By selection"). Defaults to `"Not selected"`. */
  unselectedGroupHeading?: string;
  /** Group heading for the Projects group (used by "By type"). Defaults to `"Projects"`. */
  projectsGroupHeading?: string;
  /** Group heading for the Resources group (used by "By type"). Defaults to `"Resources"`. */
  resourcesGroupHeading?: string;
  /** "Last updated" bucket: within the past day. Defaults to `"Today"`. */
  lastUpdatedTodayHeading?: string;
  /** "Last updated" bucket: within the past 7 days. Defaults to `"This week"`. */
  lastUpdatedThisWeekHeading?: string;
  /** "Last updated" bucket: within the past 30 days. Defaults to `"This month"`. */
  lastUpdatedThisMonthHeading?: string;
  /** "Last updated" bucket: within the past 365 days. Defaults to `"This year"`. */
  lastUpdatedThisYearHeading?: string;
  /** "Last updated" bucket: older than 365 days. Defaults to `"Older"`. */
  lastUpdatedOlderHeading?: string;
  /** "Last updated" bucket: no update information available. Defaults to `"Unknown"`. */
  lastUpdatedUnknownHeading?: string;
  /** Multi-select: "Select all" button. Defaults to `"Select all"`. */
  selectAll?: string;
  /** Multi-select: "Clear all" button. Defaults to `"Clear all"`. */
  clearAll?: string;
};

type CommonProjectSelectorProps = {
  /** Projects to choose from. */
  projects: readonly ProjectSelectorProject[];
  /** Text shown on the trigger when no project is selected. */
  buttonPlaceholder?: string;
  /** Message shown when the user's search yields no matching projects. */
  commandEmptyMessage?: string;
  /** Accessible label for the trigger button. */
  ariaLabel?: string;
  /** Variant of the trigger button. Defaults to `outline`. */
  buttonVariant?: ButtonProps['variant'];
  /** Additional css classes for the trigger button. */
  buttonClassName?: string;
  /** Additional css classes for the popover content. */
  popoverContentClassName?: string;
  /** Inline styles for the popover content (useful for z-index overrides). */
  popoverContentStyle?: CSSProperties;
  /** Popover alignment. Defaults to `start`. */
  alignDropDown?: 'start' | 'center' | 'end';
  /** If true, the trigger is disabled. */
  isDisabled?: boolean;
  /**
   * Fallback heading used by the "None" group mode. Ignored by the other grouping modes, which
   * use their own headings from `localizedStrings`.
   */
  groupHeading?: string;
  /** Optional localized strings. Each property has a reasonable English default. */
  localizedStrings?: ProjectSelectorLocalizedStrings;
  /** Initial group mode. Defaults to `"byOpenedTabs"`. */
  defaultGroupMode?: ProjectSelectorGroupMode;
  /**
   * Initial value of the "Display opened tabs" filter. When `false`, projects with
   * `isOpenedTab=true` are hidden from the list. Defaults to `true`.
   */
  defaultDisplayOpenedTabs?: boolean;
};

export type ProjectSelectorProps = CommonProjectSelectorProps & {
  /** Id of the currently selected project, if any. */
  selectedProjectId?: string;
  /** Called with the newly selected project's id. */
  onChangeProject: (projectId: string) => void;
};

export type ProjectMultiSelectorProps = CommonProjectSelectorProps & {
  /** Ids of the currently selected projects. */
  selectedProjectIds: readonly string[];
  /** Called with the next full list of selected ids. */
  onChangeSelectedProjectIds: (projectIds: string[]) => void;
  /**
   * Text shown on the trigger when at least one project is selected. Receives the list of
   * selected projects so the caller can produce e.g. "3 projects: WEB, ASV, KJV" or just the
   * short names joined. The default renders "N projects: name1, name2, ..." and relies on the
   * trigger's ellipsis overflow to truncate.
   */
  getSelectedText?: (selected: readonly ProjectSelectorProject[]) => string;
};

// #endregion

// #region Defaults & helpers

const DEFAULT_STRINGS: Required<ProjectSelectorLocalizedStrings> = {
  searchPlaceholder: 'Search projects & resources',
  filterAriaLabel: 'Group and filter',
  groupSectionLabel: 'Group',
  filterSectionLabel: 'Filter',
  groupNone: 'None',
  groupBySelection: 'By selection',
  groupByType: 'By type',
  groupByOpenedTabs: 'By opened tabs',
  groupByLastUpdated: 'Last updated',
  filterDisplayOpenedTabs: 'Display opened tabs',
  openedTabsGroupHeading: 'Opened tabs',
  otherProjectsGroupHeading: 'Other projects & resources',
  selectedGroupHeading: 'Selected',
  unselectedGroupHeading: 'Not selected',
  projectsGroupHeading: 'Projects',
  resourcesGroupHeading: 'Resources',
  lastUpdatedTodayHeading: 'Today',
  lastUpdatedThisWeekHeading: 'This week',
  lastUpdatedThisMonthHeading: 'This month',
  lastUpdatedThisYearHeading: 'This year',
  lastUpdatedOlderHeading: 'Older',
  lastUpdatedUnknownHeading: 'Unknown',
  selectAll: 'Select all',
  clearAll: 'Clear all',
};

function resolveStrings(
  partial: ProjectSelectorLocalizedStrings | undefined,
): Required<ProjectSelectorLocalizedStrings> {
  return { ...DEFAULT_STRINGS, ...partial };
}

function projectMatchesQuery(project: ProjectSelectorProject, query: string): boolean {
  if (!query) return true;
  const needle = query.toLowerCase();
  return (
    project.shortName.toLowerCase().includes(needle) ||
    project.fullName.toLowerCase().includes(needle) ||
    (project.language ?? '').toLowerCase().includes(needle) ||
    (project.languageCode ?? '').toLowerCase().includes(needle)
  );
}

function toMillis(value: Date | number | string | undefined): number | undefined {
  if (value === undefined) return undefined;
  if (value instanceof Date) return value.getTime();
  if (typeof value === 'number') return value;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

function compareAlphabetically(a: ProjectSelectorProject, b: ProjectSelectorProject): number {
  return a.shortName.localeCompare(b.shortName, undefined, { sensitivity: 'base' });
}

const DAY_MS = 24 * 60 * 60 * 1000;

type LastUpdatedBucket = 'today' | 'thisWeek' | 'thisMonth' | 'thisYear' | 'older' | 'unknown';

function lastUpdatedBucket(value: Date | number | string | undefined): LastUpdatedBucket {
  const ms = toMillis(value);
  if (ms === undefined) return 'unknown';
  const ageDays = (Date.now() - ms) / DAY_MS;
  if (ageDays < 1) return 'today';
  if (ageDays < 7) return 'thisWeek';
  if (ageDays < 30) return 'thisMonth';
  if (ageDays < 365) return 'thisYear';
  return 'older';
}

// #endregion

// #region Group

type Group = {
  heading?: string;
  projects: ProjectSelectorProject[];
};

function groupProjects(
  projects: readonly ProjectSelectorProject[],
  groupMode: ProjectSelectorGroupMode,
  isSelected: (id: string) => boolean,
  strings: Required<ProjectSelectorLocalizedStrings>,
  fallbackGroupHeading: string | undefined,
): Group[] {
  const sorted = [...projects].sort(compareAlphabetically);

  switch (groupMode) {
    case 'none': {
      return [{ heading: fallbackGroupHeading, projects: sorted }];
    }

    case 'bySelection': {
      const selected: ProjectSelectorProject[] = [];
      const unselected: ProjectSelectorProject[] = [];
      sorted.forEach((p) => (isSelected(p.id) ? selected.push(p) : unselected.push(p)));
      return [
        { heading: strings.selectedGroupHeading, projects: selected },
        { heading: strings.unselectedGroupHeading, projects: unselected },
      ].filter((g) => g.projects.length > 0);
    }

    case 'byType': {
      const projectsGroup: ProjectSelectorProject[] = [];
      const resourcesGroup: ProjectSelectorProject[] = [];
      const otherGroup: ProjectSelectorProject[] = [];
      sorted.forEach((p) => {
        if (p.projectType === 'project') projectsGroup.push(p);
        else if (p.projectType === 'resource') resourcesGroup.push(p);
        else otherGroup.push(p);
      });
      return [
        { heading: strings.projectsGroupHeading, projects: projectsGroup },
        { heading: strings.resourcesGroupHeading, projects: resourcesGroup },
        { heading: strings.otherProjectsGroupHeading, projects: otherGroup },
      ].filter((g) => g.projects.length > 0);
    }

    case 'byOpenedTabs': {
      const opened: ProjectSelectorProject[] = [];
      const other: ProjectSelectorProject[] = [];
      sorted.forEach((p) => (p.isOpenedTab ? opened.push(p) : other.push(p)));
      return [
        { heading: strings.openedTabsGroupHeading, projects: opened },
        { heading: strings.otherProjectsGroupHeading, projects: other },
      ].filter((g) => g.projects.length > 0);
    }

    case 'byLastUpdated': {
      const buckets: Record<LastUpdatedBucket, ProjectSelectorProject[]> = {
        today: [],
        thisWeek: [],
        thisMonth: [],
        thisYear: [],
        older: [],
        unknown: [],
      };
      sorted.forEach((p) => buckets[lastUpdatedBucket(p.lastUpdated)].push(p));
      return [
        { heading: strings.lastUpdatedTodayHeading, projects: buckets.today },
        { heading: strings.lastUpdatedThisWeekHeading, projects: buckets.thisWeek },
        { heading: strings.lastUpdatedThisMonthHeading, projects: buckets.thisMonth },
        { heading: strings.lastUpdatedThisYearHeading, projects: buckets.thisYear },
        { heading: strings.lastUpdatedOlderHeading, projects: buckets.older },
        { heading: strings.lastUpdatedUnknownHeading, projects: buckets.unknown },
      ].filter((g) => g.projects.length > 0);
    }

    default:
      return [{ heading: fallbackGroupHeading, projects: sorted }];
  }
}

// #endregion

// #region Group & filter menu

type GroupFilterMenuProps = {
  groupMode: ProjectSelectorGroupMode;
  onChangeGroupMode: (mode: ProjectSelectorGroupMode) => void;
  displayOpenedTabs: boolean;
  onChangeDisplayOpenedTabs: (value: boolean) => void;
  strings: Required<ProjectSelectorLocalizedStrings>;
};

type GroupOption = {
  mode: ProjectSelectorGroupMode;
  labelKey: keyof Required<ProjectSelectorLocalizedStrings>;
};

const GROUP_OPTIONS: readonly GroupOption[] = [
  { mode: 'none', labelKey: 'groupNone' },
  { mode: 'bySelection', labelKey: 'groupBySelection' },
  { mode: 'byType', labelKey: 'groupByType' },
  { mode: 'byOpenedTabs', labelKey: 'groupByOpenedTabs' },
  { mode: 'byLastUpdated', labelKey: 'groupByLastUpdated' },
];

function GroupFilterMenu({
  groupMode,
  onChangeGroupMode,
  displayOpenedTabs,
  onChangeDisplayOpenedTabs,
  strings,
}: GroupFilterMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="tw-h-8 tw-w-8 tw-shrink-0 tw-p-0"
          aria-label={strings.filterAriaLabel}
          title={strings.filterAriaLabel}
          // Prevent focus-stealing from the CommandInput
          onMouseDown={(event: MouseEvent) => event.preventDefault()}
        >
          <Filter className="tw-h-4 tw-w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="tw-w-48"
        style={{ zIndex: Z_INDEX_OVERLAY }}
      >
        <DropdownMenuLabel>{strings.groupSectionLabel}</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={groupMode}
          onValueChange={(value) => onChangeGroupMode(value as ProjectSelectorGroupMode)}
        >
          {GROUP_OPTIONS.map((option) => (
            <DropdownMenuRadioItem
              key={option.mode}
              value={option.mode}
              onSelect={(event) => event.preventDefault()}
            >
              {strings[option.labelKey]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>{strings.filterSectionLabel}</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={displayOpenedTabs}
          onCheckedChange={onChangeDisplayOpenedTabs}
          onSelect={(event) => event.preventDefault()}
        >
          {strings.filterDisplayOpenedTabs}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// #endregion

// #region Row with tooltip

type ProjectRowProps = {
  project: ProjectSelectorProject;
  isSelected: boolean;
  onSelect: () => void;
  /** Rendered on the left of the row. Checkmark for single/multi selection indicator. */
  leftSlot: ReactNode;
};

function ProjectRow({ project, isSelected, onSelect, leftSlot }: ProjectRowProps) {
  const tooltipHasLanguage = Boolean(project.language || project.languageCode);
  const tooltipHasScrollGroup = Boolean(project.scrollGroup || project.scrollGroupScrRef);

  // Row layout:
  //   [left slot] [shortName fixed w-16] [fullName flex-1, hidden under 280px] [scrollGroup at right]
  // - The id is prefixed into `value` so two projects with the same shortName (e.g. the same
  //   project opened in two tabs) are treated as distinct by cmdk.
  // - shortName: fixed narrow width so columns align across rows.
  // - fullName: takes remaining flex space, left-aligned, truncating with ellipsis.
  // - scrollGroup: right-aligned via ms-auto; ps-4 gives breathing room before the letter.
  // - pe-4 on the row gives 16px of space before the popover's right edge.
  const rowContent = (
    <CommandItem
      value={`${project.id} ${project.shortName} ${project.fullName} ${project.language ?? ''} ${project.languageCode ?? ''}`}
      onSelect={onSelect}
      className="tw-flex tw-items-center tw-gap-2 tw-pe-4 tw-@container"
      data-selected={isSelected}
    >
      <span className="tw-flex tw-h-4 tw-w-4 tw-shrink-0 tw-items-center tw-justify-center">
        {leftSlot}
      </span>
      <span className="tw-w-16 tw-shrink-0 tw-truncate">{project.shortName}</span>
      <span className="tw-hidden tw-min-w-0 tw-flex-1 tw-truncate tw-text-start tw-text-muted-foreground @[280px]:tw-block">
        {project.fullName}
      </span>
      {project.scrollGroup && (
        <span className="tw-ms-auto tw-ps-4 tw-shrink-0 tw-text-xs tw-text-muted-foreground">
          {project.scrollGroup}
        </span>
      )}
    </CommandItem>
  );

  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>{rowContent}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="start"
        sideOffset={8}
        collisionPadding={16}
        className="tw-max-w-xs"
        style={{ zIndex: Z_INDEX_OVERLAY }}
      >
        <div className="tw-font-semibold">{project.fullName}</div>
        {tooltipHasLanguage && (
          <div className="tw-text-sm">
            {project.language}
            {project.languageCode && (
              <span className="tw-text-muted-foreground"> ({project.languageCode})</span>
            )}
          </div>
        )}
        {tooltipHasScrollGroup && (
          <div className="tw-text-sm">
            {project.scrollGroupScrRef}
            {project.scrollGroup && (
              <span className="tw-text-muted-foreground"> · {project.scrollGroup}</span>
            )}
          </div>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

// #endregion

// #region Popover body (shared by single + multi)

type PopoverBodyProps = {
  projects: readonly ProjectSelectorProject[];
  isProjectSelected: (id: string) => boolean;
  onSelectProject: (id: string) => void;
  renderLeftSlot: (project: ProjectSelectorProject) => ReactNode;
  commandEmptyMessage?: string;
  strings: Required<ProjectSelectorLocalizedStrings>;
  groupHeading?: string;
  defaultGroupMode: ProjectSelectorGroupMode;
  defaultDisplayOpenedTabs: boolean;
  /**
   * Extra toolbar rendered between the search row and the list (used by multi-select). Receives
   * the ids of the currently visible projects so actions like "Select all" can target them.
   */
  renderToolbar?: (args: { visibleProjectIds: readonly string[] }) => ReactNode;
};

function PopoverBody({
  projects,
  isProjectSelected,
  onSelectProject,
  renderLeftSlot,
  commandEmptyMessage,
  strings,
  groupHeading,
  defaultGroupMode,
  defaultDisplayOpenedTabs,
  renderToolbar,
}: PopoverBodyProps) {
  const [query, setQuery] = useState('');
  const [groupMode, setGroupMode] = useState<ProjectSelectorGroupMode>(defaultGroupMode);
  const [displayOpenedTabs, setDisplayOpenedTabs] = useState(defaultDisplayOpenedTabs);

  const groups = useMemo(() => {
    const matching = projects.filter(
      (p) => (displayOpenedTabs || !p.isOpenedTab) && projectMatchesQuery(p, query),
    );
    return groupProjects(matching, groupMode, isProjectSelected, strings, groupHeading);
  }, [projects, query, groupMode, displayOpenedTabs, isProjectSelected, strings, groupHeading]);

  const visibleProjectIds = useMemo(
    () => groups.flatMap((group) => group.projects.map((project) => project.id)),
    [groups],
  );

  return (
    <TooltipProvider delayDuration={150}>
      <Command shouldFilter={false}>
        <div className="tw-flex tw-items-center tw-border-b tw-pe-4">
          <div className="tw-flex-1">
            <CommandInput
              value={query}
              onValueChange={setQuery}
              placeholder={strings.searchPlaceholder}
              className="tw-border-0"
            />
          </div>
          <GroupFilterMenu
            groupMode={groupMode}
            onChangeGroupMode={setGroupMode}
            displayOpenedTabs={displayOpenedTabs}
            onChangeDisplayOpenedTabs={setDisplayOpenedTabs}
            strings={strings}
          />
        </div>
        {renderToolbar?.({ visibleProjectIds })}
        <CommandList>
          <CommandEmpty>{commandEmptyMessage ?? 'No projects found'}</CommandEmpty>
          {groups.map((group, index) => (
            <Fragment key={group.heading ?? `group-${index}`}>
              <CommandGroup heading={group.heading}>
                {group.projects.map((project) => (
                  <ProjectRow
                    key={project.id}
                    project={project}
                    isSelected={isProjectSelected(project.id)}
                    onSelect={() => onSelectProject(project.id)}
                    leftSlot={renderLeftSlot(project)}
                  />
                ))}
              </CommandGroup>
              {index < groups.length - 1 && <CommandSeparator />}
            </Fragment>
          ))}
        </CommandList>
      </Command>
    </TooltipProvider>
  );
}

// #endregion

// #region Single-select: ProjectSelector

/**
 * Combo-box project picker. Single selection. The popover's list can be grouped and filtered via
 * the "Group and filter" menu; by default projects with `isOpenedTab=true` are rendered under
 * "Opened tabs" and the rest under "Other projects & resources". Projects are always sorted
 * alphabetically within each group.
 */
export function ProjectSelector({
  projects,
  selectedProjectId,
  onChangeProject,
  groupHeading,
  buttonPlaceholder,
  commandEmptyMessage,
  ariaLabel,
  buttonVariant = 'outline',
  buttonClassName,
  popoverContentClassName,
  popoverContentStyle,
  alignDropDown = 'start',
  isDisabled = false,
  localizedStrings,
  defaultGroupMode = 'byOpenedTabs',
  defaultDisplayOpenedTabs = true,
}: ProjectSelectorProps) {
  const [open, setOpen] = useState(false);
  const strings = resolveStrings(localizedStrings);

  const selectedProject = useMemo(
    () => projects.find((p) => p.id === selectedProjectId),
    [projects, selectedProjectId],
  );

  const handleSelect = (id: string) => {
    onChangeProject(id);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={buttonVariant}
          role="combobox"
          aria-expanded={open}
          aria-label={ariaLabel}
          disabled={isDisabled}
          className={cn(
            'tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden',
            buttonClassName,
          )}
        >
          <span className="tw-min-w-0 tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start">
            {selectedProject ? selectedProject.shortName : (buttonPlaceholder ?? '')}
          </span>
          <ChevronDown className="tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={alignDropDown}
        collisionPadding={16}
        className={cn(
          'tw-w-[500px] tw-max-w-[calc(100vw-2rem)] tw-p-0',
          popoverContentClassName,
        )}
        style={popoverContentStyle}
      >
        <PopoverBody
          projects={projects}
          isProjectSelected={(id) => id === selectedProjectId}
          onSelectProject={handleSelect}
          renderLeftSlot={(project) => (
            <Check
              className={cn(
                'tw-h-4 tw-w-4',
                project.id === selectedProjectId ? 'tw-opacity-100' : 'tw-opacity-0',
              )}
            />
          )}
          commandEmptyMessage={commandEmptyMessage}
          strings={strings}
          groupHeading={groupHeading}
          defaultGroupMode={defaultGroupMode}
          defaultDisplayOpenedTabs={defaultDisplayOpenedTabs}
        />
      </PopoverContent>
    </Popover>
  );
}

export default ProjectSelector;

// #endregion

// #region Multi-select: ProjectMultiSelector

function defaultMultiTriggerText(selected: readonly ProjectSelectorProject[]): string {
  const names = selected.map((p) => p.shortName).join(', ');
  return `${selected.length.toString()} projects: ${names}`;
}

/**
 * Combo-box project picker. Multi selection with "Select all" / "Clear all" controls, a
 * "Group and filter" menu, and a chevrons-up-down trigger icon. Same grouping and tooltip rules
 * as {@link ProjectSelector}.
 */
export function ProjectMultiSelector({
  projects,
  selectedProjectIds,
  onChangeSelectedProjectIds,
  groupHeading,
  buttonPlaceholder,
  commandEmptyMessage,
  ariaLabel,
  buttonVariant = 'outline',
  buttonClassName,
  popoverContentClassName,
  popoverContentStyle,
  alignDropDown = 'start',
  isDisabled = false,
  localizedStrings,
  getSelectedText,
  defaultGroupMode = 'byOpenedTabs',
  defaultDisplayOpenedTabs = true,
}: ProjectMultiSelectorProps) {
  const [open, setOpen] = useState(false);
  const strings = resolveStrings(localizedStrings);

  const selectedSet = useMemo(() => new Set(selectedProjectIds), [selectedProjectIds]);

  const selectedProjects = useMemo(
    () => projects.filter((p) => selectedSet.has(p.id)),
    [projects, selectedSet],
  );

  const triggerLabel = useMemo(() => {
    if (selectedProjects.length === 0) return buttonPlaceholder ?? '';
    if (getSelectedText) return getSelectedText(selectedProjects);
    return defaultMultiTriggerText(selectedProjects);
  }, [selectedProjects, getSelectedText, buttonPlaceholder]);

  const toggle = (id: string) => {
    if (selectedSet.has(id)) onChangeSelectedProjectIds(selectedProjectIds.filter((x) => x !== id));
    else onChangeSelectedProjectIds([...selectedProjectIds, id]);
  };

  const handleClearAll = () => {
    onChangeSelectedProjectIds([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={buttonVariant}
          role="combobox"
          aria-expanded={open}
          aria-label={ariaLabel}
          disabled={isDisabled}
          title={selectedProjects.length > 0 ? triggerLabel : undefined}
          className={cn(
            'tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden',
            buttonClassName,
          )}
        >
          <span className="tw-min-w-0 tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start">
            {triggerLabel}
          </span>
          <ChevronsUpDown className="tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align={alignDropDown}
        collisionPadding={16}
        className={cn(
          'tw-w-[500px] tw-max-w-[calc(100vw-2rem)] tw-p-0',
          popoverContentClassName,
        )}
        style={popoverContentStyle}
      >
        <PopoverBody
          projects={projects}
          isProjectSelected={(id) => selectedSet.has(id)}
          onSelectProject={toggle}
          renderLeftSlot={(project) => (
            <Check
              className={cn(
                'tw-h-4 tw-w-4',
                selectedSet.has(project.id) ? 'tw-opacity-100' : 'tw-opacity-0',
              )}
            />
          )}
          commandEmptyMessage={commandEmptyMessage}
          strings={strings}
          groupHeading={groupHeading}
          defaultGroupMode={defaultGroupMode}
          defaultDisplayOpenedTabs={defaultDisplayOpenedTabs}
          renderToolbar={({ visibleProjectIds }) => (
            <div className="tw-flex tw-justify-between tw-border-b tw-py-2 tw-ps-2 tw-pe-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onChangeSelectedProjectIds([...visibleProjectIds])}
              >
                {strings.selectAll}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleClearAll}>
                {strings.clearAll}
              </Button>
            </div>
          )}
        />
      </PopoverContent>
    </Popover>
  );
}

// #endregion
