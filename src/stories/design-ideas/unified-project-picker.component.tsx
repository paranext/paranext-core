/*
 * The compact counterpart of the unified Home (`home-unified.component.tsx`): the same
 * `UnifiedItem[]`, shown as a project/resource picker. Listed rows are what is on this computer
 * (never hidden items — those live only in Home's Hidden group), in fixed context sections:
 *
 * - `kind: 'projects'` (Simple's title bar) mirrors main's `ToolbarProjectSelector` in
 *   `src/renderer/components/platform-bible-toolbar.tsx`: "Recent", then "Your projects on this
 *   computer". A search also reaches the projects on the Send/Receive server, listed last under
 *   "On the server"; with no local projects at all they are listed up front, without a search, so
 *   an empty install has somewhere to start.
 * - `kind: 'resources'` (Bible texts panel, text collection) groups by the current project's
 *   context — resources first, then other projects — with each heading counting its rows for the
 *   current search ("Team resources: NNB (2)", "Projects (4)"). A search also reaches what is not
 *   on this computer (DBL resources, server projects), listed last under "Available for download
 *   (n)".
 *
 * Picking a row for something not on this computer runs Get / Install instead of selecting it.
 * The title bar's "More projects…" footer opens Home. The resource pickers' "More resources…"
 * footer stays in the dropdown instead: it lists the DBL resources not on this computer under
 * "Available for download", a batch at a time, loading the next batch when the list is scrolled
 * to its end (the fork's `searchOnlyPaging`).
 *
 * The picker is only for picking: it shows no status (sync, update, in-progress) for what is on
 * this computer — that lives in Home. The muted "Get" / "Install · N MB" hint on a row not on
 * this computer is not a status either: it says what picking that row does.
 *
 * Every section heading toggles its section; see the fork's `SectionHeadingToggle`.
 *
 * Built on the design-ideas fork of `ProjectSelector` (`./project-selector-fork/`), which adds the
 * search-only rows, the leading icon slot, section captions, and collapsible sections the
 * production component lacks.
 */

import { ReactNode, useCallback, useMemo } from 'react';
import { BookOpen, ScrollText } from 'lucide-react';
import type { ButtonProps } from 'platform-bible-react';
import { compareProjectsByName, makeProjectSelectorCustomData } from 'platform-bible-utils';
import {
  ProjectSelector,
  type ProjectSelectorLocalizedStrings,
  type ProjectSelectorProject,
  type ProjectSelectorSearchOnlyPaging,
  type ProjectSelectorSearchOnlyProject,
} from './project-selector-fork/project-selector.component';
import { makeBuiltInGroupings } from './project-selector-fork/project-selector.groupings';
import type { ProjectSelectorGrouping } from './project-selector-fork/project-selector.rows';
import type {
  UnifiedItem,
  UnifiedItemAction,
  UnifiedItemType,
  UnifiedStatus,
} from './home-unified.component';

export type UnifiedProjectPickerKind = 'projects' | 'resources';

/** A built-in grouping a caller can offer next to the context sections, via a group-by menu. */
export type UnifiedProjectPickerExtraGrouping = 'lastUsed' | 'language' | 'type';

export type UnifiedProjectPickerProps = {
  items: UnifiedItem[];
  /**
   * `'projects'` lists `type === 'Project'` items (the title bar picker); `'resources'` lists other
   * installed projects and resources (the Bible texts panel and the text collection).
   */
  kind: UnifiedProjectPickerKind;
  /** Which context sections `kind: 'resources'` uses. Ignored for `'projects'`. */
  interfaceMode?: 'simple' | 'power';
  /**
   * The project the picker is opened from. `kind: 'resources'` leaves it out of "Projects" and, in
   * Simple, lists its team's resources under "Team resources".
   */
  currentProjectId?: string;
  selectedId?: string;
  /** Called when the user picks an item that is on this computer. */
  onSelect: (item: UnifiedItem) => void;
  /**
   * Called with Get (server project) or Install (DBL resource) when the user picks a row for
   * something not on this computer.
   */
  onItemAction?: (item: UnifiedItem, action: UnifiedItemAction) => void | Promise<void>;
  /**
   * `kind: 'projects'` only: the footer's "More projects…" row, which opens Home. Without it the
   * title bar picker has no footer.
   *
   * Unused for `kind: 'resources'`: its "More resources…" footer lists the DBL resources not on
   * this computer in batches inside the dropdown, rather than opening another surface.
   */
  onMoreItems?: () => void;
  /**
   * `kind: 'resources'` only: called each time the "Available for download" list asks for its next
   * batch, for a caller whose DBL list is paged from a backend. The picker pages through `items`
   * either way.
   */
  onLoadMoreAvailable?: () => void;
  /**
   * Ids with an action running. Only affects rows for something not on this computer: their hint
   * reads "Getting…" / "Installing…", and picking one again starts nothing new. Rows that are on
   * this computer show no status, so a running Sync or Update does not change them.
   */
  inFlightIds?: string[];
  /**
   * Built-in groupings offered in a group-by menu after the context sections, which stay the
   * default. Omit (the default) to lock the picker to its context sections with no menu.
   */
  groupings?: readonly UnifiedProjectPickerExtraGrouping[];
  buttonClassName?: string;
  buttonVariant?: ButtonProps['variant'];
  renderTriggerLabel?: (selected: UnifiedItem | undefined) => ReactNode;
};

const INSTALLED_STATUSES: ReadonlySet<UnifiedStatus> = new Set<UnifiedStatus>([
  'installedProject',
  'installedResource',
  'installedNeedsSync',
  'installedNeedsUpdate',
]);

const TYPE_NAMES: Record<UnifiedItemType, string> = {
  Project: 'Projects',
  ScriptureResource: 'Scripture',
  CommentaryResource: 'Commentaries',
  EnhancedResource: 'Enhanced resources',
  SourceLanguageResource: 'Source language resources',
  XmlResource: 'XML resources',
};

const STRINGS = {
  projects: {
    ariaLabel: 'Project',
    buttonPlaceholder: 'Select project',
    searchPlaceholder: 'Search projects…',
    commandEmptyMessage: 'No projects found',
    searchOnlySectionHeading: 'On the server',
    moreItems: 'More projects…',
  },
  resources: {
    ariaLabel: 'Resource',
    buttonPlaceholder: 'Select a resource',
    searchPlaceholder: 'Search resources…',
    commandEmptyMessage: 'No resources found',
    searchOnlySectionHeading: 'Available for download',
    moreItems: 'More resources…',
  },
  allAvailableLoaded: 'All available resources loaded',
  loadingMore: 'Loading more…',
  sectionRecent: 'Recent',
  sectionLocalProjects: 'Your projects on this computer',
  sectionProjects: 'Projects',
  sectionTeamResources: 'Team resources',
  sectionUserResources: 'User resources',
  sectionUsedByProjects: 'Used by projects',
  sectionYourResources: 'Your resources',
  contextGroupingLabel: 'Context',
  usedBy: 'Used by',
  get: 'Get',
  install: 'Install',
  getting: 'Getting…',
  installing: 'Installing…',
} as const;

/**
 * Matches `MAX_RECENT_PROJECTS` in
 * `extensions/src/platform-scripture/src/recently-opened-projects.service.ts`.
 */
const MAX_RECENT_PROJECTS = 5;

/** Rows per "Available for download" batch in the resource pickers. */
const AVAILABLE_BATCH_SIZE = 25;

const BUILT_IN_GROUPINGS = makeBuiltInGroupings();
const NO_OPEN_TABS = [] as const;

// Section keys for the context grouping; never rendered.
const SECTION = {
  recent: 'recent',
  localProjects: 'localProjects',
  projects: 'projects',
  team: 'team',
  user: 'user',
  usedBy: 'usedBy',
  yours: 'yours',
} as const;
type SectionKey = (typeof SECTION)[keyof typeof SECTION];

const SECTION_HEADINGS: ReadonlyMap<string, string> = new Map<SectionKey, string>([
  [SECTION.recent, STRINGS.sectionRecent],
  [SECTION.localProjects, STRINGS.sectionLocalProjects],
  [SECTION.projects, STRINGS.sectionProjects],
  [SECTION.team, STRINGS.sectionTeamResources],
  [SECTION.user, STRINGS.sectionUserResources],
  [SECTION.usedBy, STRINGS.sectionUsedByProjects],
  [SECTION.yours, STRINGS.sectionYourResources],
]);

// Display order of the sections; a picker only ever produces one kind's subset. The resource
// pickers list resources before projects: Simple's Team then User, Power's Used by then Yours. The
// fork appends the search-only section after all of these.
const SECTION_ORDER: readonly string[] = [
  SECTION.recent,
  SECTION.localProjects,
  SECTION.team,
  SECTION.user,
  SECTION.usedBy,
  SECTION.yours,
  SECTION.projects,
];

function isListed(item: UnifiedItem): boolean {
  return INSTALLED_STATUSES.has(item.status) && !item.isHidden;
}

function toSelectorProject(item: UnifiedItem): ProjectSelectorProject {
  const lastUsedAt = item.lastUsedIso ? Date.parse(item.lastUsedIso) : undefined;
  return {
    id: item.id,
    shortName: item.shortName,
    fullName: item.fullName,
    customData: makeProjectSelectorCustomData({
      lastUsedAt,
      language: item.language,
      type: item.type,
      typeName: TYPE_NAMES[item.type],
    }),
  };
}

function searchOnlyHint(item: UnifiedItem, isInFlight: boolean): string {
  if (item.status === 'sharedNotInstalled') return isInFlight ? STRINGS.getting : STRINGS.get;
  if (isInFlight) return STRINGS.installing;
  return item.sizeMb === undefined ? STRINGS.install : `${STRINGS.install} · ${item.sizeMb} MB`;
}

/**
 * The most recently used local projects, newest first — the mock's stand-in for main's recently
 * opened list.
 */
function recentProjectIds(localProjects: readonly UnifiedItem[]): string[] {
  return localProjects
    .filter((item) => item.lastUsedIso)
    .sort((a, b) => (b.lastUsedIso ?? '').localeCompare(a.lastUsedIso ?? ''))
    .slice(0, MAX_RECENT_PROJECTS)
    .map((item) => item.id);
}

export function UnifiedProjectPicker({
  items,
  kind,
  interfaceMode = 'simple',
  currentProjectId,
  selectedId,
  onSelect,
  onItemAction,
  onMoreItems,
  onLoadMoreAvailable,
  inFlightIds,
  groupings,
  buttonClassName,
  buttonVariant,
  renderTriggerLabel,
}: UnifiedProjectPickerProps) {
  const strings = STRINGS[kind];
  const inFlight = useMemo(() => new Set(inFlightIds), [inFlightIds]);

  const itemsById = useMemo(() => new Map(items.map((item) => [item.id, item])), [items]);

  const listedItems = useMemo(
    () =>
      items.filter((item) => {
        if (!isListed(item)) return false;
        if (kind === 'projects') return item.type === 'Project';
        return item.type !== 'Project' || item.id !== currentProjectId;
      }),
    [items, kind, currentProjectId],
  );

  const selectorProjects = useMemo(() => listedItems.map(toSelectorProject), [listedItems]);

  const recentRank = useMemo(() => {
    const rank = new Map<string, number>();
    if (kind === 'projects')
      recentProjectIds(listedItems).forEach((id, position) => rank.set(id, position));
    return rank;
  }, [kind, listedItems]);

  // Which context section each listed row belongs to.
  const sectionOf = useCallback(
    (item: UnifiedItem): SectionKey => {
      if (kind === 'projects')
        return recentRank.has(item.id) ? SECTION.recent : SECTION.localProjects;
      if (item.type === 'Project') return SECTION.projects;
      if (interfaceMode === 'power')
        return item.teamProjectIds?.length ? SECTION.usedBy : SECTION.yours;
      return currentProjectId && item.teamProjectIds?.includes(currentProjectId)
        ? SECTION.team
        : SECTION.user;
    },
    [kind, interfaceMode, currentProjectId, recentRank],
  );

  const currentProjectShortName = currentProjectId
    ? itemsById.get(currentProjectId)?.shortName
    : undefined;

  // One grouping, so the selector locks to it and drops the group-by menu unless `groupings` adds
  // more.
  const availableGroupings = useMemo<readonly ProjectSelectorGrouping[]>(() => {
    const context: ProjectSelectorGrouping = {
      id: 'context',
      label: STRINGS.contextGroupingLabel,
      getGroupKey: (project) => {
        const item = itemsById.get(project.id);
        return item ? sectionOf(item) : undefined;
      },
      // The selector partitions the rows that match the search, so `projects` is the count to
      // show. The title bar's headings stay uncounted, as in main's toolbar picker.
      getSectionHeading: (key, projects) => {
        const heading = SECTION_HEADINGS.get(key) ?? key;
        if (kind !== 'resources') return heading;
        const named =
          key === SECTION.team && currentProjectShortName
            ? `${heading}: ${currentProjectShortName}`
            : heading;
        return `${named} (${projects.length})`;
      },
      compareSections: (a, b) => SECTION_ORDER.indexOf(a.key) - SECTION_ORDER.indexOf(b.key),
      // Recent keeps recency order; every other section is alphabetical, as in main.
      compareProjects: (a, b) => {
        const aRank = recentRank.get(a.id);
        const bRank = recentRank.get(b.id);
        if (aRank !== undefined && bRank !== undefined) return aRank - bRank;
        return compareProjectsByName(a, b);
      },
    };
    const extras = BUILT_IN_GROUPINGS.filter((grouping) =>
      groupings?.some((id) => id === grouping.id),
    );
    return [context, ...extras];
  }, [itemsById, sectionOf, recentRank, groupings, kind, currentProjectShortName]);

  const hasLocalProjects = kind === 'resources' || selectorProjects.length > 0;

  // Rows for what is not on this computer, offered to a search after every other section: server
  // projects in the title bar, DBL resources and server projects in the resource pickers. The
  // title bar also lists its server projects without a search on an install with no local project.
  const searchOnlyProjects = useMemo<ProjectSelectorSearchOnlyProject[]>(
    () =>
      items
        .filter((item) => {
          if (item.isHidden) return false;
          if (item.status === 'sharedNotInstalled') return true;
          return kind === 'resources' && item.status === 'dblNotInstalled';
        })
        .map((item) => ({
          ...toSelectorProject(item),
          hint: searchOnlyHint(item, inFlight.has(item.id)),
        })),
    [items, kind, inFlight],
  );

  const localizedStrings = useMemo<ProjectSelectorLocalizedStrings>(
    () => ({
      ariaLabel: strings.ariaLabel,
      buttonPlaceholder: strings.buttonPlaceholder,
      searchPlaceholder: strings.searchPlaceholder,
      commandEmptyMessage: strings.commandEmptyMessage,
      searchOnlySectionHeading: strings.searchOnlySectionHeading,
    }),
    [strings],
  );

  const footerAction = useMemo(
    () =>
      kind === 'projects' && onMoreItems
        ? { label: strings.moreItems, onSelect: onMoreItems }
        : undefined,
    [kind, strings, onMoreItems],
  );

  // "More resources…": browse the DBL resources not on this computer, alphabetically, in batches.
  // Server projects stay reachable by searching only.
  const searchOnlyPaging = useMemo<ProjectSelectorSearchOnlyPaging | undefined>(() => {
    if (kind !== 'resources') return undefined;
    return {
      revealLabel: strings.moreItems,
      allLoadedLabel: STRINGS.allAvailableLoaded,
      loadingLabel: STRINGS.loadingMore,
      batchSize: AVAILABLE_BATCH_SIZE,
      pagedProjects: searchOnlyProjects
        .filter((project) => itemsById.get(project.id)?.status === 'dblNotInstalled')
        .sort(compareProjectsByName),
      onLoadMore: onLoadMoreAvailable,
    };
  }, [kind, strings, searchOnlyProjects, itemsById, onLoadMoreAvailable]);

  const getSearchOnlySectionHeading = useMemo(
    () =>
      kind === 'resources'
        ? (count: number) => `${strings.searchOnlySectionHeading} (${count})`
        : undefined,
    [kind, strings],
  );

  // The render callbacks below are pure and hook-free: the selector calls them once per visible
  // row on every render.

  // Same icons as Home's rows: a scroll for a project, an open book for every resource type.
  const renderProjectIcon = useCallback(
    (project: ProjectSelectorProject) =>
      itemsById.get(project.id)?.type === 'Project' ? (
        <ScrollText className="tw:shrink-0" size={16} />
      ) : (
        <BookOpen className="tw:shrink-0" size={16} />
      ),
    [itemsById],
  );

  // Power's "Used by projects" rows name the projects that brought each resource in.
  const getProjectTooltipLine = useCallback(
    (project: ProjectSelectorProject): string | undefined => {
      if (kind !== 'resources' || interfaceMode !== 'power') return undefined;
      const item = itemsById.get(project.id);
      if (!item?.teamProjectIds?.length || !isListed(item)) return undefined;
      const names = item.teamProjectIds.map((id) => itemsById.get(id)?.shortName ?? id);
      return `${STRINGS.usedBy} ${names.join(', ')}`;
    },
    [kind, interfaceMode, itemsById],
  );

  const handleChangeSelection = useCallback(
    ({ projectId }: { projectId: string }) => {
      const item = itemsById.get(projectId);
      if (item) onSelect(item);
    },
    [itemsById, onSelect],
  );

  const handleSelectSearchOnlyProject = useCallback(
    (projectId: string) => {
      const item = itemsById.get(projectId);
      // Picking a row whose Get / Install is already running starts nothing new.
      if (!item || inFlight.has(projectId) || !onItemAction) return;
      onItemAction(item, { kind: item.status === 'sharedNotInstalled' ? 'get' : 'install' });
    },
    [itemsById, inFlight, onItemAction],
  );

  const handleRenderTriggerLabel = useMemo(
    () =>
      renderTriggerLabel
        ? (selected: ProjectSelectorProject | undefined) =>
            renderTriggerLabel(selected ? itemsById.get(selected.id) : undefined)
        : undefined,
    [renderTriggerLabel, itemsById],
  );

  return (
    <ProjectSelector
      mode="project"
      projects={selectorProjects}
      openTabs={NO_OPEN_TABS}
      selection={{ projectId: selectedId }}
      onChangeSelection={handleChangeSelection}
      triggerLabelFormat="shortNameAndFullName"
      renderTriggerLabel={handleRenderTriggerLabel}
      availableGroupings={availableGroupings}
      defaultGrouping="context"
      localizedStrings={localizedStrings}
      renderProjectIcon={renderProjectIcon}
      getProjectTooltipLine={getProjectTooltipLine}
      footerAction={footerAction}
      searchOnlyPaging={searchOnlyPaging}
      getSearchOnlySectionHeading={getSearchOnlySectionHeading}
      searchOnlyProjects={searchOnlyProjects}
      showSearchOnlyProjectsWithoutQuery={!hasLocalProjects}
      onSelectSearchOnlyProject={handleSelectSearchOnlyProject}
      buttonClassName={buttonClassName}
      buttonVariant={buttonVariant}
    />
  );
}

export default UnifiedProjectPicker;
