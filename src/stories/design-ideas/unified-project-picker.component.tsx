/*
 * The compact counterpart of the unified Home (`home-unified.component.tsx`): the same
 * `UnifiedItem[]`, shown as a project/resource picker. Listed rows are what is on this computer
 * (never hidden items — those live only in Home's Hidden group), in fixed context sections:
 *
 * - `kind: 'projects'` (Simple's title bar) lists only the recent projects, with no heading, until
 *   the user searches; a search labels them "Recent" and adds the other matching local projects under "Projects", and the
 *   projects on the Send/Receive server under "On the server". "More projects…" opens Home for the
 *   full list. With no recently used project, the local projects are listed without a search; with
 *   no local projects at all the server projects are, so an empty install has somewhere to start.
 *   A project whose administrator set a team layout ends in a muted team layout icon. Whether the
 *   user administers a project, or it is on this computer alone, shows in Home only.
 * - `kind: 'resources'` (Bible texts panel, text collection) groups by the current project's
 *   context — resources first, then other projects ("Team resources: NNB", "Projects"). A search
 *   also reaches what is not on this computer (DBL resources, server projects), listed last under
 *   "Available for download".
 *
 * Every section heading, in every grouping, counts its rows: "Projects (4)", or "Projects (1 of 4)"
 * while a search narrows it. Simple's multi-select pickers have no sections: one alphabetical
 * list, with what a search adds from outside this computer after it. Power's keep their
 * groupings, and only "Last used" lists an open project once per scroll group.
 *
 * Picking a row for something not on this computer runs Get / Install instead of selecting it.
 * The title bar's "More projects…" footer opens Home. Given `onMoreItems`, the resource pickers'
 * "More resources…" footer opens Get resources the same way; otherwise it stays in the dropdown: it lists the DBL resources not on this computer under
 * "Available for download", a batch at a time, loading the next batch when the list is scrolled
 * to its end (the fork's `searchOnlyPaging`).
 *
 * The picker is only for picking: it shows no status (sync, update, in-progress) for what is on
 * this computer — that lives in Home. The muted "Get" / "Install · N MB" hint on a row not on
 * this computer is not a status either: it says what picking that row does.
 *
 * Every section heading toggles its section and sticks to the top of the list while its rows
 * scroll; see the fork's `SectionHeadingToggle`. A picker opens scrolled to its first
 * selected row.
 *
 * A resource that some project uses ends in a muted project icon whose own tooltip names those
 * projects: in Power always, in Simple only outside the context sections ("Team resources" says it).
 *
 * In Power, every picker's ⋮ menu has a Compact view: one line per row, the short name then
 * the muted full name. Simple's pickers have no ⋮ menu.
 *
 * With `onChangeSelectedIds` the picker is multi-select (the text collection's toolbar): rows
 * toggle, a checkbox before the search box unselects them all, and the trigger names what is
 * picked.
 *
 * Built on the design-ideas fork of `ProjectSelector` (`./project-selector-fork/`), which adds the
 * search-only rows, the leading icon slot, section captions, and collapsible sections the
 * production component lacks.
 */

import { ReactNode, useCallback, useMemo } from 'react';
import { BookOpen, Lock, PanelsTopLeft } from 'lucide-react';
import type { ButtonProps } from 'platform-bible-react';
import { compareProjectsByName, makeProjectSelectorCustomData } from 'platform-bible-utils';
import {
  NO_GROUPING,
  ProjectSelector,
  type ProjectSelectorLocalizedStrings,
  type ProjectSelectorProject,
  type ProjectSelectorSearchOnlyPaging,
  type ProjectSelectorSearchOnlyProject,
} from './project-selector-fork/project-selector.component';
import { makeBuiltInGroupings } from './project-selector-fork/project-selector.groupings';
import { ParatextProjectLogo } from './paratext-project-logo.component';
import type {
  ProjectSelectorGrouping,
  ProjectSelectorOpenTab,
  ProjectSelectorProjectPair,
} from './project-selector-fork/project-selector.rows';
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
  /**
   * Single-select: the picked item. Ignored once `onChangeSelectedIds` makes the picker
   * multi-select.
   */
  selectedId?: string;
  /** Single-select: called when the user picks an item that is on this computer. */
  onSelect?: (item: UnifiedItem) => void;
  /**
   * Multi-select: the picked items. Rows toggle instead of closing the dropdown, and the checkbox
   * before the search box unpicks them all.
   */
  selectedIds?: readonly string[];
  /** Makes the picker multi-select; called with every picked id after each toggle. */
  onChangeSelectedIds?: (ids: string[]) => void;
  /**
   * Multi-select by (item, scroll group) pair instead of by item, for a picker that lists
   * `openTabs`: each open item is then pickable once per scroll group it is open in.
   */
  selectedPairs?: readonly ProjectSelectorProjectPair[];
  /** Makes the picker multi-select by pair; called with every picked pair after each toggle. */
  onChangeSelectedPairs?: (pairs: ProjectSelectorProjectPair[]) => void;
  /**
   * Multi-select: a fixed trigger label, such as "Text collection (4)", in place of the picked
   * short names, which then move to the trigger's tooltip.
   */
  multiTriggerLabel?: string;
  /**
   * Items listed but not pickable, muted, with `disabledReason` in their tooltip — such as the
   * model text in the Bible texts panel, which would only show the same text twice.
   */
  disabledIds?: readonly string[];
  /** Why the `disabledIds` rows cannot be picked; already localized. */
  disabledReason?: string;
  /** Replaces the footer row's label ("More projects…" / "More resources…"); already localized. */
  moreItemsLabel?: string;
  /** Replaces the trigger's text while nothing is picked; already localized. */
  placeholder?: string;
  /** Replaces the search box's placeholder; already localized. */
  searchPlaceholder?: string;
  /**
   * Items open in tabs, with each tab's scroll group. A multi-select picker lists such an item once
   * per scroll group, with that group's letter at the row's end; Power's "Last used" grouping lists
   * them first, under "Opened".
   */
  openTabs?: readonly ProjectSelectorOpenTab[];
  /**
   * One row listed first when a search matches it, in a section of its own headed `heading` with no
   * count — such as the model text in the Bible texts panel. Only the context sections set it
   * apart.
   */
  pinnedItem?: {
    id: string;
    heading: string;
    /** Listed without a search too, as in the Text collection, where it can be picked. */
    isAlwaysListed?: boolean;
  };
  /** A Simple multi-select picker keeps the context sections, as the Text collection's does. */
  isMultiGrouped?: boolean;
  /**
   * Rows that cannot be unpicked — such as the team resources a team layout keeps in the Text
   * collection. Their "Team resources" section starts collapsed, with a lock after its heading
   * whose tooltip is `label`.
   */
  lockedItems?: { ids: readonly string[]; label: string };
  /**
   * Called with a listed row's item and scroll group while the pointer is over the row, and with
   * `undefined` when it leaves — for pointing at the tab the row stands for.
   */
  onRowHoverChange?: (
    row: { id: string; scrollGroupId: ProjectSelectorProjectPair['scrollGroupId'] } | undefined,
  ) => void;
  /**
   * Items on this computer the picker does not list, because the surface already shows them another
   * way (the text collection's team resources, which are always in the collection).
   */
  excludedIds?: readonly string[];
  /**
   * Called with Get (server project) or Install (DBL resource) when the user picks a row for
   * something not on this computer.
   */
  onItemAction?: (item: UnifiedItem, action: UnifiedItemAction) => void | Promise<void>;
  /**
   * The footer's "More projects…" / "More resources…" row, which closes the dropdown and opens
   * another surface (Home, or Get resources). Without it the title bar picker has no footer, and a
   * resource picker's "More resources…" lists the DBL resources not on this computer in batches
   * inside the dropdown instead. A search reaches those resources either way.
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
   * Built-in groupings offered in the ⋮ menu after the context sections, which stay the default.
   * Omit (the default) to lock the picker to its context sections; the menu then offers only
   * Power's Compact view.
   */
  groupings?: readonly UnifiedProjectPickerExtraGrouping[];
  /**
   * Just two sections, "Resources" then "Projects", and no groupings to pick, for a surface where
   * the context sections would mislead (Simple's model text column: a project with a team layout
   * fixes its model text, so the picker only ever appears for projects without one — and so without
   * team resources). Ignores `groupings`.
   */
  isGroupedByKindOnly?: boolean;
  buttonClassName?: string;
  buttonVariant?: ButtonProps['variant'];
  /** The picker sits in a dialog: its dropdown opens modal, so the list scrolls with the wheel. */
  isInDialog?: boolean;
  /** `false` leaves the trigger without its tooltip. Defaults to `true`. */
  hasTriggerTooltip?: boolean;
  /** Multi-select: the ⋮ menu offers "Show only selected". Defaults to `true` for multi-select. */
  hasShowOnlySelected?: boolean;
  /** Multi-select: the name of the checkbox before the search box. Defaults to "Unselect all". */
  unselectAllLabel?: string;
  /** Multi-select: selected items the trigger does not name, as they show elsewhere. */
  triggerHiddenIds?: readonly string[];
  /** Whether the dropdown is open, for a parent that opens it from elsewhere (an empty state). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
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
  ScriptureResource: 'Bible texts',
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
    multiPlaceholder: 'Select projects',
  },
  resources: {
    ariaLabel: 'Resource',
    buttonPlaceholder: 'Select a resource',
    searchPlaceholder: 'Search resources…',
    commandEmptyMessage: 'No resources found',
    searchOnlySectionHeading: 'Available for download',
    moreItems: 'More resources…',
    multiPlaceholder: 'Add resources',
  },
  allAvailableLoaded: 'All available resources loaded',
  loadingMore: 'Loading more…',
  countOf: 'of',
  sectionRecent: 'Recent',
  sectionLocalProjects: 'Projects',
  sectionResources: 'Resources',
  sectionProjects: 'Projects',
  sectionTeamResources: 'Team resources',
  sectionUserResources: 'User resources',
  // Power's context sections take Simple's names; its "Team resources" are those any project's
  // team shares, not only the current project's.
  sectionUsedByProjects: 'Team resources',
  sectionYourResources: 'User resources',
  contextGroupingLabel: 'Context',
  usedBy: 'Used by',
  lastUsedGroupingLabel: 'Last used',
  sectionOpened: 'Opened',
  sectionLastUsedRecent: 'Recent',
  sectionLastUsedOther: 'Other',
  hasTeamLayout: 'Has a team layout',
  get: 'Get',
  install: 'Install',
  getHintTooltip: 'Get this project from the Send/Receive server',
  installHintTooltip: 'Install this resource from DBL',
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

/** Every section heading's count, in every grouping: "(12)", or "(3 of 12)" while searching. */
function formatSectionCount(shown: number, totalWhileSearching: number | undefined): string {
  return totalWhileSearching === undefined
    ? `(${shown})`
    : `(${shown} ${STRINGS.countOf} ${totalWhileSearching})`;
}

const NO_OPEN_TABS: readonly ProjectSelectorOpenTab[] = [];
const NO_IDS: readonly string[] = [];
const NO_GROUPINGS: readonly ProjectSelectorGrouping[] = [];

const CONTEXT_GROUPING_ID = 'context';
const LAST_USED_GROUPING_ID = 'lastUsed';
const LAST_USED_ONLY: readonly string[] = [LAST_USED_GROUPING_ID];

// Power's "Last used" sections, in display order; never rendered.
const LAST_USED_SECTION = { opened: 'opened', recent: 'recent', other: 'other' } as const;
const LAST_USED_SECTION_ORDER: readonly string[] = [
  LAST_USED_SECTION.opened,
  LAST_USED_SECTION.recent,
  LAST_USED_SECTION.other,
];

// Section keys for the context grouping; never rendered.
const SECTION = {
  pinned: 'pinned',
  recent: 'recent',
  localProjects: 'localProjects',
  resources: 'resources',
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
  [SECTION.resources, STRINGS.sectionResources],
  [SECTION.projects, STRINGS.sectionProjects],
  [SECTION.team, STRINGS.sectionTeamResources],
  [SECTION.user, STRINGS.sectionUserResources],
  [SECTION.usedBy, STRINGS.sectionUsedByProjects],
  [SECTION.yours, STRINGS.sectionYourResources],
]);

const LAST_USED_HEADINGS: ReadonlyMap<string, string> = new Map<string, string>([
  [LAST_USED_SECTION.opened, STRINGS.sectionOpened],
  [LAST_USED_SECTION.recent, STRINGS.sectionLastUsedRecent],
  [LAST_USED_SECTION.other, STRINGS.sectionLastUsedOther],
]);

// Display order of the sections; a picker only ever produces one kind's subset. The resource
// pickers list resources before projects: Simple's team then user, Power's usedBy then yours
// (headed "Team resources" and "User resources" too). The fork appends the search-only section
// after all of these.
const SECTION_ORDER: readonly string[] = [
  SECTION.pinned,
  SECTION.recent,
  SECTION.localProjects,
  SECTION.team,
  SECTION.user,
  SECTION.usedBy,
  SECTION.yours,
  SECTION.resources,
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

/** A search-only row's hint tooltip: what picking the row does, at more length than the hint. */
function searchOnlyHintTooltip(item: UnifiedItem): string {
  return item.status === 'sharedNotInstalled' ? STRINGS.getHintTooltip : STRINGS.installHintTooltip;
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
  selectedIds = NO_IDS,
  onChangeSelectedIds,
  multiTriggerLabel,
  disabledIds = NO_IDS,
  disabledReason,
  moreItemsLabel,
  placeholder,
  searchPlaceholder,
  openTabs = NO_OPEN_TABS,
  selectedPairs,
  onChangeSelectedPairs,
  pinnedItem,
  onRowHoverChange,
  excludedIds = NO_IDS,
  onItemAction,
  onMoreItems,
  onLoadMoreAvailable,
  inFlightIds,
  groupings,
  isGroupedByKindOnly = false,
  buttonClassName,
  buttonVariant,
  renderTriggerLabel,
  isInDialog = false,
  hasTriggerTooltip = true,
  hasShowOnlySelected,
  triggerHiddenIds,
  unselectAllLabel,
  open,
  onOpenChange,
  isMultiGrouped = false,
  lockedItems,
}: UnifiedProjectPickerProps) {
  const strings = STRINGS[kind];
  const inFlight = useMemo(() => new Set(inFlightIds), [inFlightIds]);

  const itemsById = useMemo(() => new Map(items.map((item) => [item.id, item])), [items]);

  const listedItems = useMemo(
    () =>
      items.filter((item) => {
        if (!isListed(item) || excludedIds.includes(item.id)) return false;
        if (kind === 'projects') return item.type === 'Project';
        return item.type !== 'Project' || item.id !== currentProjectId;
      }),
    [items, kind, currentProjectId, excludedIds],
  );

  const selectorProjects = useMemo(
    () =>
      listedItems.map((item) =>
        disabledIds.includes(item.id)
          ? { ...toSelectorProject(item), isDisabled: true, disabledReason }
          : toSelectorProject(item),
      ),
    [listedItems, disabledIds, disabledReason],
  );

  const isMulti = Boolean(onChangeSelectedIds ?? onChangeSelectedPairs);

  // The title bar's "Recent" split. A multi-select project picker (Power's Checks, Comments and Find)
  // lists every project in one section instead.
  const recentRank = useMemo(() => {
    const rank = new Map<string, number>();
    if (kind === 'projects' && !isMulti)
      recentProjectIds(listedItems).forEach((id, position) => rank.set(id, position));
    return rank;
  }, [kind, isMulti, listedItems]);

  // Which context section each listed row belongs to.
  const sectionOf = useCallback(
    (item: UnifiedItem): SectionKey => {
      if (item.id === pinnedItem?.id) return SECTION.pinned;
      if (kind === 'projects')
        return recentRank.has(item.id) ? SECTION.recent : SECTION.localProjects;
      // A project the current project's team layout lists is one of its team resources.
      const isTeamResource = Boolean(
        currentProjectId && item.teamProjectIds?.includes(currentProjectId),
      );
      if (item.type === 'Project')
        return isTeamResource && !isGroupedByKindOnly && interfaceMode !== 'power'
          ? SECTION.team
          : SECTION.projects;
      if (isGroupedByKindOnly) return SECTION.resources;
      if (interfaceMode === 'power')
        return item.teamProjectIds?.length ? SECTION.usedBy : SECTION.yours;
      return isTeamResource ? SECTION.team : SECTION.user;
    },
    [kind, isGroupedByKindOnly, interfaceMode, currentProjectId, recentRank, pinnedItem?.id],
  );

  const currentProjectShortName = currentProjectId
    ? itemsById.get(currentProjectId)?.shortName
    : undefined;

  // Simple's single-select resource pickers (Bible texts) open at the top, on "Team resources",
  // with the other sections collapsed — even the one holding the selected row: the team's texts
  // are the ones to see first. Without team resources, nothing collapses.
  // Locked team rows cannot be unpicked, so their section starts collapsed, marked by a lock.
  const hasLockedTeamItems = (lockedItems?.ids.length ?? 0) > 0;
  const hasTeamSection =
    kind === 'resources' &&
    !isMulti &&
    interfaceMode !== 'power' &&
    !isGroupedByKindOnly &&
    listedItems.some((item) => sectionOf(item) === SECTION.team);

  // One grouping, so the selector locks to it and its ⋮ menu offers only Power's view options,
  // unless `groupings` adds more.
  const availableGroupings = useMemo<readonly ProjectSelectorGrouping[]>(() => {
    const context: ProjectSelectorGrouping = {
      id: CONTEXT_GROUPING_ID,
      label: STRINGS.contextGroupingLabel,
      getGroupKey: (project) => {
        const item = itemsById.get(project.id);
        return item ? sectionOf(item) : undefined;
      },
      // The selector appends each heading's count; see `formatSectionCount`.
      getSectionHeading: (key) => {
        if (key === SECTION.pinned && pinnedItem) return pinnedItem.heading;
        const heading = SECTION_HEADINGS.get(key) ?? key;
        return key === SECTION.team && currentProjectShortName
          ? `${heading}: ${currentProjectShortName}`
          : heading;
      },
      // The title bar lists the rest of its local projects only for a search, while it has a
      // "Recent" section to show instead.
      // The pinned row is there to explain itself, not to be picked, so its section shows only
      // when a search matches it, and without a count.
      isSectionListedOnlyWhileSearching: (key) =>
        (key === SECTION.localProjects && recentRank.size > 0) ||
        (key === SECTION.pinned && !pinnedItem?.isAlwaysListed),
      isSectionCountHidden: (key) => key === SECTION.pinned,
      isSectionCollapsedByDefault: (key) =>
        (hasTeamSection && key !== SECTION.team) || (key === SECTION.team && hasLockedTeamItems),
      getSectionHeadingIndicator: (key) =>
        key === SECTION.team && hasLockedTeamItems && lockedItems
          ? {
              node: <Lock role="img" aria-label={lockedItems.label} size={12} />,
              label: lockedItems.label,
            }
          : undefined,
      // Unsearched, "Recent" is the title bar's only section, so it goes unlabeled.
      isSectionHeadingShownOnlyWhileSearching: (key) => key === SECTION.recent,
      compareSections: (a, b) => SECTION_ORDER.indexOf(a.key) - SECTION_ORDER.indexOf(b.key),
      // Recent keeps recency order; every other section is alphabetical, as in main.
      compareProjects: (a, b) => {
        const aRank = recentRank.get(a.id);
        const bRank = recentRank.get(b.id);
        if (aRank !== undefined && bRank !== undefined) return aRank - bRank;
        return compareProjectsByName(a, b);
      },
    };
    if (isGroupedByKindOnly) return [context];
    const offers = (id: UnifiedProjectPickerExtraGrouping) =>
      groupings?.some((offered) => offered === id) ?? false;
    const builtIn = (id: UnifiedProjectPickerExtraGrouping) =>
      BUILT_IN_GROUPINGS.filter((grouping) => grouping.id === id && offers(id));
    if (interfaceMode !== 'power')
      return [context, ...builtIn('lastUsed'), ...builtIn('language'), ...builtIn('type')];
    // Power opens on "Last used" — open tabs, then recently used, then the rest — with Language
    // next, then Context, then Type.
    const opened = new Set(openTabs.map((tab) => tab.projectId));
    const lastUsed: ProjectSelectorGrouping = {
      id: LAST_USED_GROUPING_ID,
      label: STRINGS.lastUsedGroupingLabel,
      getGroupKey: (project) => {
        if (opened.has(project.id)) return LAST_USED_SECTION.opened;
        return itemsById.get(project.id)?.lastUsedIso
          ? LAST_USED_SECTION.recent
          : LAST_USED_SECTION.other;
      },
      getSectionHeading: (key) => LAST_USED_HEADINGS.get(key) ?? key,
      compareSections: (a, b) =>
        LAST_USED_SECTION_ORDER.indexOf(a.key) - LAST_USED_SECTION_ORDER.indexOf(b.key),
      // Newest first wherever a last use is known; alphabetical otherwise.
      compareProjects: (a, b) => {
        const aUsed = itemsById.get(a.id)?.lastUsedIso ?? '';
        const bUsed = itemsById.get(b.id)?.lastUsedIso ?? '';
        if (aUsed !== bUsed) return bUsed.localeCompare(aUsed);
        return compareProjectsByName(a, b);
      },
    };
    // Language and Type list many sections, so they open with every section collapsed.
    const collapsed = (id: UnifiedProjectPickerExtraGrouping) =>
      builtIn(id).map((grouping) => ({ ...grouping, areSectionsCollapsedByDefault: true }));
    return [
      ...(offers('lastUsed') ? [lastUsed] : []),
      ...collapsed('language'),
      context,
      ...collapsed('type'),
    ];
  }, [
    isGroupedByKindOnly,
    interfaceMode,
    openTabs,
    itemsById,
    sectionOf,
    recentRank,
    groupings,
    currentProjectShortName,
    pinnedItem,
    hasTeamSection,
    hasLockedTeamItems,
    lockedItems,
  ]);

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
          hintTooltip: searchOnlyHintTooltip(item),
        })),
    [items, kind, inFlight],
  );

  const localizedStrings = useMemo<ProjectSelectorLocalizedStrings>(
    () => ({
      ariaLabel: strings.ariaLabel,
      buttonPlaceholder:
        placeholder ??
        (isMulti && 'multiPlaceholder' in strings
          ? strings.multiPlaceholder
          : strings.buttonPlaceholder),
      searchPlaceholder: searchPlaceholder ?? strings.searchPlaceholder,
      commandEmptyMessage: strings.commandEmptyMessage,
      searchOnlySectionHeading: strings.searchOnlySectionHeading,
      clearAll: unselectAllLabel,
    }),
    [strings, isMulti, placeholder, searchPlaceholder, unselectAllLabel],
  );

  const footerAction = useMemo(
    () =>
      onMoreItems
        ? { label: moreItemsLabel ?? strings.moreItems, onSelect: onMoreItems }
        : undefined,
    [strings, onMoreItems, moreItemsLabel],
  );

  // "More resources…": browse the DBL resources not on this computer, alphabetically, in batches.
  // Server projects stay reachable by searching only.
  const searchOnlyPaging = useMemo<ProjectSelectorSearchOnlyPaging | undefined>(() => {
    if (kind !== 'resources' || onMoreItems) return undefined;
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
  }, [kind, strings, searchOnlyProjects, itemsById, onLoadMoreAvailable, onMoreItems]);

  // The render callbacks below are pure and hook-free: the selector calls them once per visible
  // row on every render.

  // Same icons as Home's rows: the Paratext logo for a project (monochrome when read-only), an
  // open book for every resource type.
  const renderProjectIcon = useCallback(
    (project: ProjectSelectorProject) => {
      const item = itemsById.get(project.id);
      return item?.type === 'Project' ? (
        <ParatextProjectLogo isEditable={!item.isReadOnly} />
      ) : (
        <BookOpen className="tw:shrink-0" size={16} />
      );
    },
    [itemsById],
  );

  // The projects that use a resource, by short name; empty for a project or an unused resource.
  const usedByNames = useCallback(
    (project: ProjectSelectorProject): string | undefined => {
      if (kind !== 'resources') return undefined;
      const item = itemsById.get(project.id);
      if (!item?.teamProjectIds?.length || !isListed(item)) return undefined;
      return item.teamProjectIds.map((id) => itemsById.get(id)?.shortName ?? id).join(', ');
    },
    [kind, itemsById],
  );

  // A row's muted trailing icon, with its own tooltip. The title bar's projects show the team
  // layout icon when their administrator set a team layout. A resource some project uses shows a
  // project icon naming those projects, in Power's context sections only (on its "Team resources"
  // rows, which may come from several projects' teams).
  const renderTrailingIndicator = useCallback(
    (project: ProjectSelectorProject, activeGrouping: string) => {
      if (kind === 'projects') {
        // Team layouts are Simple-only, like the title bar picker that shows them.
        if (interfaceMode === 'power' || !itemsById.get(project.id)?.hasTeamLayout)
          return undefined;
        return {
          node: <PanelsTopLeft role="img" aria-label={STRINGS.hasTeamLayout} size={14} />,
          label: STRINGS.hasTeamLayout,
        };
      }
      // Only Power's context sections show the "used by" icon (on its "Team resources" rows).
      // Simple's context sections say "Team resources" instead, and the other groupings leave it
      // out.
      if (interfaceMode !== 'power' || activeGrouping !== CONTEXT_GROUPING_ID) return undefined;
      const names = usedByNames(project);
      if (!names) return undefined;
      const label = `${STRINGS.usedBy} ${names}`;
      return {
        node: (
          <span role="img" aria-label={label} className="tw:flex">
            <ParatextProjectLogo isEditable={false} size={14} />
          </span>
        ),
        label,
      };
    },
    [kind, itemsById, interfaceMode, usedByNames],
  );

  const handleChangeSelection = useCallback(
    ({ projectId }: { projectId: string }) => {
      const item = itemsById.get(projectId);
      if (item) onSelect?.(item);
    },
    [itemsById, onSelect],
  );

  const multiSelection = useMemo(
    () => ({ pairs: selectedPairs ?? selectedIds.map((projectId) => ({ projectId })) }),
    [selectedPairs, selectedIds],
  );
  const handleChangeMultiSelection = useCallback(
    ({ pairs }: { pairs: ProjectSelectorProjectPair[] }) => {
      if (onChangeSelectedPairs) onChangeSelectedPairs(pairs);
      else onChangeSelectedIds?.(pairs.map((pair) => pair.projectId));
    },
    [onChangeSelectedPairs, onChangeSelectedIds],
  );

  const handleRowHoverChange = useMemo(
    () =>
      onRowHoverChange
        ? (
            row:
              | { projectId: string; scrollGroupId: ProjectSelectorProjectPair['scrollGroupId'] }
              | undefined,
          ) =>
            onRowHoverChange(
              row ? { id: row.projectId, scrollGroupId: row.scrollGroupId } : undefined,
            )
        : undefined,
    [onRowHoverChange],
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

  const commonProps = {
    projects: selectorProjects,
    openTabs,
    // Simple's multi-select pickers list their rows in one alphabetical list, without sections or
    // a grouping to pick. Power's keep its groupings; only "Last used" lists an open project once
    // per scroll group.
    availableGroupings:
      isMulti && interfaceMode !== 'power' && !isMultiGrouped ? NO_GROUPINGS : availableGroupings,
    scrollGroupGroupingIds: isMulti && interfaceMode === 'power' ? LAST_USED_ONLY : undefined,
    defaultGrouping: (() => {
      if (isMulti && interfaceMode !== 'power' && !isMultiGrouped) return NO_GROUPING;
      return interfaceMode === 'power' && groupings?.some((id) => id === LAST_USED_GROUPING_ID)
        ? LAST_USED_GROUPING_ID
        : CONTEXT_GROUPING_ID;
    })(),
    localizedStrings,
    renderProjectIcon,
    renderProjectTrailingIndicator: renderTrailingIndicator,
    footerAction,
    searchOnlyPaging,
    formatSectionCount,
    searchOnlyProjects,
    showSearchOnlyProjectsWithoutQuery: !hasLocalProjects,
    onSelectSearchOnlyProject: handleSelectSearchOnlyProject,
    buttonClassName,
    buttonVariant,
    isModal: isInDialog,
    opensAtTop: hasTeamSection,
    hasTriggerTooltip,
    hasShowOnlySelected: hasShowOnlySelected ?? isMulti,
    triggerHiddenIds,
    open,
    onOpenChange,
    // Simple keeps its pickers plain: no ⋮ menu for the Compact view.
    hasViewOptions: interfaceMode === 'power',
    // Power's pickers, and every multi-select one, list one line per row by default.
    isCompactViewByDefault: interfaceMode === 'power' || isMulti,
    onRowHoverChange: handleRowHoverChange,
  };

  if (isMulti)
    return (
      <ProjectSelector
        {...commonProps}
        mode="project-multi"
        triggerLabel={multiTriggerLabel}
        selection={multiSelection}
        onChangeSelection={handleChangeMultiSelection}
      />
    );
  return (
    <ProjectSelector
      {...commonProps}
      mode="project"
      selection={{ projectId: selectedId }}
      onChangeSelection={handleChangeSelection}
      triggerLabelFormat="shortNameAndFullName"
      renderTriggerLabel={handleRenderTriggerLabel}
    />
  );
}

export default UnifiedProjectPicker;
