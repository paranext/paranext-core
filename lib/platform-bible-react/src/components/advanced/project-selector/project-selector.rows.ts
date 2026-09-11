import { normalizeProjectId, type ScrollGroupId } from 'platform-bible-utils';

// #region Types

/** The three modes of the project selector. */
export type ProjectSelectorMode = 'project' | 'project-multi' | 'projectScrollGroup';

/**
 * Minimal project metadata fed to the selector.
 *
 * Grouping-specific fields (versification, language, type, last-used) are NOT typed here — they
 * live in {@link customData}. This keeps the component's public shape minimal and lets any grouping
 * (built-in or consumer-defined) declare its own key without widening the row type.
 */
export type ProjectSelectorProject = {
  id: string;
  shortName: string;
  fullName: string;
  /**
   * When `true`, the row for this project is rendered muted, is not selectable, and the
   * `disabledReason` (if provided) is surfaced in the row tooltip. Use when a project is present in
   * the list but cannot be picked in the current context (e.g. a read-only target, a reference
   * project that lacks the required data type). Already-selected pairs that become disabled remain
   * visible — the selector renders them as disabled-and-selected so the user can see the prior
   * selection but can't toggle it again.
   */
  isDisabled?: boolean;
  /** Human-readable explanation surfaced in the row tooltip when `isDisabled` is true. */
  disabledReason?: string;
  /**
   * Consumer-owned extra fields read by `ProjectSelectorGrouping.getGroupKey` implementations. The
   * component itself never introspects this map — it just carries it through to the grouping's
   * partitioner.
   *
   * Well-known keys used by the built-ins returned from `makeBuiltInGroupings`:
   *
   * - `lastUsedAt: number` — ms-epoch timestamp; the built-in `lastUsed` grouping bins projects with
   *   a timestamp under "Recently used" and the rest under "Other".
   * - `language: string` — language name; the built-in `language` grouping buckets by exact equality
   *   and uses the value as the section heading.
   * - `type: string` — locale-stable type key; the built-in `type` grouping buckets by exact
   *   equality. `typeName: string` (optional) supplies a friendlier heading — the grouping uses the
   *   first non-empty `typeName` observed in each bucket.
   *
   * Custom groupings are free to define any keys they like. Values are `unknown` so the grouping's
   * `getGroupKey` narrows them itself.
   */
  customData?: Readonly<Record<string, unknown>>;
};

/** A project that is currently open in a specific scroll group. */
export type ProjectSelectorOpenTab = {
  projectId: string;
  scrollGroupId: ScrollGroupId;
  /**
   * Optional, pre-formatted "current scripture reference" for this scroll group (e.g. `"MAT
   * 3:16"`). Surfaced in the row tooltip. Caller decides the format — the selector does no
   * scripture-ref formatting of its own.
   */
  scrollGroupScrRefLabel?: string;
};

/**
 * A `(projectId, scrollGroupId)` pair. `scrollGroupId` is undefined when the pair refers to a
 * project that is not currently open in any scroll group.
 */
export type ProjectSelectorProjectPair = {
  projectId: string;
  scrollGroupId?: ScrollGroupId;
};

/** Selection shape for single `project` mode. */
export type ProjectSelection = { projectId?: string };

/**
 * Selection shape for `project-multi` mode. Each entry is a `(projectId, scrollGroupId)` pair; the
 * same project open in two scroll groups is two distinct pairs. `scrollGroupId` is undefined when a
 * project that is not currently open anywhere is selected.
 */
export type ProjectMultiSelection = { pairs: readonly ProjectSelectorProjectPair[] };

/** Selection shape for `projectScrollGroup` mode. */
export type ProjectScrollGroupSelection = {
  projectId?: string;
  scrollGroupId?: ScrollGroupId;
};

/**
 * One partitioned grouping definition. See {@link partitionByGrouping} and `makeBuiltInGroupings` in
 * `project-selector.component`.
 */
export type ProjectSelectorGrouping = {
  /**
   * Unique id — used as the radio value in the filter menu and to persist the "active grouping"
   * choice within a single mount. Must be unique within an `availableGroupings` array.
   *
   * The id `'openTabs'` is reserved: when present, partitioning derives from the separate
   * `openTabs` prop (see {@link partitionByOpenTabs}) rather than any row data, and `getGroupKey` is
   * ignored.
   */
  id: string;
  /**
   * Label rendered in the filter menu's radio item. Consumer supplies a localized string; the
   * component does not resolve labels on its own.
   */
  label: string;
  /**
   * Extract the row's group key. Called per project. Returning `undefined` routes the project into
   * the "unknown" bucket (see {@link unknownSectionHeading}). Ignored for the built-in `'openTabs'`
   * and `'selection'` groupings — those partition off row state (open-tabs prop / `isSelected`),
   * not project fields.
   */
  getGroupKey?: (project: ProjectSelectorProject) => string | undefined;
  /**
   * Format the section heading for a given group key. Called once per non-empty bucket with the key
   * and every project in the bucket (so consumers can lift a friendlier heading from `customData`,
   * e.g. `typeName`). Defaults to the key verbatim.
   *
   * For the built-in `'selection'` grouping, this is called with the keys `'selected'` and
   * `'unselected'` (in that order); the returned strings are used as the two section headings.
   * Ignored for `'openTabs'`.
   */
  getSectionHeading?: (key: string, projects: readonly ProjectSelectorProject[]) => string;
  /**
   * Heading for the "unknown" bucket — rows where `getGroupKey` returned `undefined`. When absent,
   * the unknown bucket is not emitted (its rows are dropped from the grouping's output).
   */
  unknownSectionHeading?: string;
  /**
   * Pin the bucket with this key to the top. Other buckets fall through to `compareSections`.
   * Ignored for `'openTabs'` and `'selection'` (which have fixed ordering).
   */
  priorityKey?: string;
  /**
   * Ordering for non-priority buckets. Defaults to alphabetic (case-insensitive) by heading.
   * Ignored for `'openTabs'` and `'selection'`.
   */
  compareSections?: (
    a: { key: string; heading: string },
    b: { key: string; heading: string },
  ) => number;
};

/** One row in the project selector list. */
export type ProjectRow = {
  /** Stable unique key for React / cmdk. */
  rowKey: string;
  projectId: string;
  shortName: string;
  fullName: string;
  /**
   * The scroll group this row represents. `undefined` means the row is a project-level row (no
   * chip, or `project` mode chips aggregated in `openGroups`).
   */
  scrollGroupId?: ScrollGroupId;
  /**
   * Current scripture reference for the row's scroll group (for the tooltip). Populated only when
   * the caller provided one via `ProjectSelectorOpenTab.scrollGroupScrRefLabel`.
   */
  scrollGroupScrRefLabel?: string;
  /**
   * `project` mode: scroll groups the project is open in (one chip each). Always empty in the other
   * modes.
   */
  openGroups: readonly ScrollGroupId[];
  isSelected: boolean;
  /**
   * `project` mode: true when the project isn't open in any scroll group. `project-multi` /
   * `projectScrollGroup`: true for the not-open-project row (no chip). Drives muted row styling.
   */
  isMuted: boolean;
  /**
   * True for a synthetic row representing a currently-selected (projectId, scrollGroupId) pair
   * whose tab is not currently open. Rendered with a struck-through chip and an "Open" button that
   * reopens the tab via `onOpenProjectInGroup`.
   */
  isBoundButClosed: boolean;
  /**
   * Mirrors {@link ProjectSelectorProject.isDisabled}. When true, the row renders muted and is not
   * selectable. Disabled-and-selected rows are allowed (still visible, surface prior selection).
   */
  isDisabled: boolean;
  /** Mirrors {@link ProjectSelectorProject.disabledReason}. Surfaced in the row tooltip. */
  disabledReason?: string;
  /**
   * The source project — kept on the row so grouping partitioners can call
   * `grouping.getGroupKey(row.project)` without another lookup. Also carries
   * {@link ProjectSelectorProject.customData} through unchanged.
   */
  project: ProjectSelectorProject;
};

export type ComputeRowsArgs =
  | {
      mode: 'project';
      projects: readonly ProjectSelectorProject[];
      openTabs: readonly ProjectSelectorOpenTab[];
      selection: ProjectSelection;
    }
  | {
      mode: 'project-multi';
      projects: readonly ProjectSelectorProject[];
      openTabs: readonly ProjectSelectorOpenTab[];
      selection: ProjectMultiSelection;
    }
  | {
      mode: 'projectScrollGroup';
      projects: readonly ProjectSelectorProject[];
      openTabs: readonly ProjectSelectorOpenTab[];
      selection: ProjectScrollGroupSelection;
    };

// #endregion

// #region Helpers

type TabInfo = {
  scrollGroupId: ScrollGroupId;
  scrollGroupScrRefLabel?: string;
};

function collectOpenTabsByProject(
  openTabs: readonly ProjectSelectorOpenTab[],
): Map<string, TabInfo[]> {
  const map = new Map<string, TabInfo[]>();
  openTabs.forEach((tab) => {
    const key = normalizeProjectId(tab.projectId);
    const existing = map.get(key);
    const info: TabInfo = {
      scrollGroupId: tab.scrollGroupId,
      scrollGroupScrRefLabel: tab.scrollGroupScrRefLabel,
    };
    if (existing) {
      if (!existing.some((t) => t.scrollGroupId === tab.scrollGroupId)) existing.push(info);
    } else {
      map.set(key, [info]);
    }
  });
  map.forEach((infos) => infos.sort((a, b) => a.scrollGroupId - b.scrollGroupId));
  return map;
}

function pairIsSelected(
  pairs: readonly ProjectSelectorProjectPair[],
  projectId: string,
  scrollGroupId: ScrollGroupId | undefined,
): boolean {
  return pairs.some((p) => p.projectId === projectId && p.scrollGroupId === scrollGroupId);
}

// #endregion

// #region computeRows

/**
 * Build the selector's row list from the current inputs. Pure: same inputs produce the same output
 * in the same order. Consumers render these rows in the order returned unless they sort further
 * (see {@link partitionByOpenTabs}).
 */
export function computeRows(args: ComputeRowsArgs): ProjectRow[] {
  const tabsByProject = collectOpenTabsByProject(args.openTabs);

  if (args.mode === 'project') {
    const selectedId = args.selection.projectId;
    return args.projects.map((project) => {
      const tabs = tabsByProject.get(normalizeProjectId(project.id)) ?? [];
      return {
        rowKey: project.id,
        projectId: project.id,
        shortName: project.shortName,
        fullName: project.fullName,
        scrollGroupId: undefined,
        scrollGroupScrRefLabel: undefined,
        openGroups: tabs.map((t) => t.scrollGroupId),
        isSelected: selectedId === project.id,
        isMuted: tabs.length === 0,
        isBoundButClosed: false,
        isDisabled: project.isDisabled === true,
        disabledReason: project.disabledReason,
        project,
      };
    });
  }

  // project-multi and projectScrollGroup share the row structure (per-pair rows plus per-project
  // rows for not-open projects). They differ only in how selection is keyed.
  let selectedPairs: readonly ProjectSelectorProjectPair[] = [];
  if (args.mode === 'project-multi') {
    selectedPairs = args.selection.pairs;
  } else if (args.selection.projectId !== undefined) {
    selectedPairs = [
      {
        projectId: args.selection.projectId,
        scrollGroupId: args.selection.scrollGroupId,
      },
    ];
  }

  const rows: ProjectRow[] = [];

  args.projects.forEach((project) => {
    const tabs = tabsByProject.get(normalizeProjectId(project.id));
    if (!tabs || tabs.length === 0) {
      rows.push({
        rowKey: `project:${project.id}`,
        projectId: project.id,
        shortName: project.shortName,
        fullName: project.fullName,
        scrollGroupId: undefined,
        scrollGroupScrRefLabel: undefined,
        openGroups: [],
        isSelected: pairIsSelected(selectedPairs, project.id, undefined),
        isMuted: true,
        isBoundButClosed: false,
        isDisabled: project.isDisabled === true,
        disabledReason: project.disabledReason,
        project,
      });
      return;
    }
    tabs.forEach((tab) => {
      rows.push({
        rowKey: `tab:${project.id}:${tab.scrollGroupId}`,
        projectId: project.id,
        shortName: project.shortName,
        fullName: project.fullName,
        scrollGroupId: tab.scrollGroupId,
        scrollGroupScrRefLabel: tab.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: pairIsSelected(selectedPairs, project.id, tab.scrollGroupId),
        isMuted: false,
        isBoundButClosed: false,
        isDisabled: project.isDisabled === true,
        disabledReason: project.disabledReason,
        project,
      });
    });
  });

  // Synthetic bound-but-closed rows: one per selected pair whose (projectId, scrollGroupId) isn't
  // represented above. Only pairs with a defined `scrollGroupId` produce synthetic rows — a
  // selected "not-open project" pair is already represented by the not-open row rendered above.
  selectedPairs.forEach((pair) => {
    if (pair.scrollGroupId === undefined) return;
    if (
      rows.some((r) => r.projectId === pair.projectId && r.scrollGroupId === pair.scrollGroupId)
    ) {
      return;
    }
    const project = args.projects.find((p) => p.id === pair.projectId);
    if (!project) return;
    rows.push({
      rowKey: `closed:${project.id}:${pair.scrollGroupId}`,
      projectId: project.id,
      shortName: project.shortName,
      fullName: project.fullName,
      scrollGroupId: pair.scrollGroupId,
      scrollGroupScrRefLabel: undefined,
      openGroups: [],
      isSelected: true,
      isMuted: false,
      isBoundButClosed: true,
      isDisabled: project.isDisabled === true,
      disabledReason: project.disabledReason,
      project,
    });
  });

  return rows;
}

// #endregion

// #region Section partitioning

export type RowSection = {
  /**
   * - `'flat'` — single unheaded list (grouping = none).
   * - `'openTabs'` / `'other'` — the two sections produced by the built-in `'openTabs'` grouping;
   *   their headings come from the component's localized strings (openTabsSectionHeading /
   *   otherProjectsSectionHeading).
   * - `'grouping'` — a bucket produced by any other grouping. `label` is the heading text supplied by
   *   the grouping (either via `getSectionHeading` or `unknownSectionHeading`).
   */
  kind: 'openTabs' | 'other' | 'flat' | 'grouping';
  rows: ProjectRow[];
  /** Localized heading text for `'grouping'` sections. Undefined for `'flat'`. */
  label?: string;
  /** Grouping id for `'grouping'` sections — makes them addressable in tests and section keys. */
  groupingId?: string;
  /** Group key for `'grouping'` sections. `undefined` for the unknown bucket. */
  key?: string;
  /** True for the priority bucket in a `'grouping'` section. */
  isPriority?: boolean;
};

function belongsToOpenTabsSection(row: ProjectRow): boolean {
  if (row.isBoundButClosed) return false;
  if (row.scrollGroupId !== undefined) return true;
  return row.openGroups.length > 0;
}

function compareRows(a: ProjectRow, b: ProjectRow): number {
  // Stable canonical order: alphabetical by shortName, tie-broken by
  // scrollGroupId. The component scrolls the selected row into view on open,
  // so selected rows do NOT float to the top — users can predict where any
  // project will land after selecting it.
  const nameCmp = a.shortName.localeCompare(b.shortName, undefined, { sensitivity: 'base' });
  if (nameCmp !== 0) return nameCmp;
  // Tie-break: scrollGroupId asc so the same project lists A before B before C.
  const aGroup = a.scrollGroupId ?? Number.POSITIVE_INFINITY;
  const bGroup = b.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return aGroup - bGroup;
}

/** Return a single flat, sorted section. Used when no grouping is active. */
export function partitionFlat(rows: readonly ProjectRow[]): RowSection[] {
  return [{ kind: 'flat', rows: [...rows].sort(compareRows) }];
}

/**
 * Split rows into the Open tabs / Other projects sections. Within each section rows are sorted by
 * {@link compareRows}.
 *
 * "Open tabs" rows are: open-group rows (project-multi / projectScrollGroup modes) and
 * `project`-mode rows whose project is open somewhere. Bound-but-closed synthetic rows and not-open
 * project rows land in "Other projects".
 *
 * Special case: when the "Open tabs" section would be empty (no project in the list is currently
 * open in any scroll group), we fall back to a flat list. A lone "Other projects" heading without a
 * partner section reads as a bug — the user wonders what they're "other" to. This commonly happens
 * when the consumer hasn't (or can't) seed `openTabs` with already-open tabs at mount time.
 */
export function partitionByOpenTabs(rows: readonly ProjectRow[]): RowSection[] {
  const open = rows.filter(belongsToOpenTabsSection).sort(compareRows);
  const other = rows.filter((r) => !belongsToOpenTabsSection(r)).sort(compareRows);
  if (open.length === 0) {
    return [{ kind: 'flat', rows: other }];
  }
  const sections: RowSection[] = [{ kind: 'openTabs', rows: open }];
  if (other.length > 0) sections.push({ kind: 'other', rows: other });
  return sections;
}

/**
 * Split rows into Selected (rows.isSelected === true) and Unselected. Selected always renders
 * first. Headings come from the grouping's `getSectionHeading` (called with `'selected'` and
 * `'unselected'`); English defaults are used when the grouping omits the helper. Empty buckets are
 * elided.
 */
function partitionBySelection(
  rows: readonly ProjectRow[],
  grouping: ProjectSelectorGrouping,
): RowSection[] {
  const selected = rows.filter((r) => r.isSelected).sort(compareRows);
  const unselected = rows.filter((r) => !r.isSelected).sort(compareRows);
  const headingFor = (key: 'selected' | 'unselected', bucket: ProjectRow[]): string => {
    const resolved = grouping.getSectionHeading?.(
      key,
      bucket.map((r) => r.project),
    );
    if (typeof resolved === 'string' && resolved.length > 0) return resolved;
    return key === 'selected' ? 'Selected' : 'Unselected';
  };
  const sections: RowSection[] = [];
  if (selected.length > 0) {
    sections.push({
      kind: 'grouping',
      groupingId: grouping.id,
      key: 'selected',
      label: headingFor('selected', selected),
      rows: selected,
    });
  }
  if (unselected.length > 0) {
    sections.push({
      kind: 'grouping',
      groupingId: grouping.id,
      key: 'unselected',
      label: headingFor('unselected', unselected),
      rows: unselected,
    });
  }
  return sections;
}

/**
 * Bucket rows by the grouping's `getGroupKey`, then emit sections in priority-first /
 * `compareSections` order (alphabetic by heading if `compareSections` is absent).
 *
 * Rows whose `getGroupKey` returns `undefined` land in an "unknown" bucket labeled by
 * `grouping.unknownSectionHeading`. When that heading is absent the unknown bucket is dropped (its
 * rows are elided from the grouping's output — use only for groupings where "unknown" is genuinely
 * uninteresting).
 *
 * Two reserved ids override `getGroupKey`:
 *
 * - `'openTabs'` — routes to {@link partitionByOpenTabs}, which partitions off the separate `openTabs`
 *   prop rather than any row data.
 * - `'selection'` — partitions rows by `isSelected` into "Selected" and "Unselected" sections,
 *   Selected first. Meant for `project-multi` mode; harmless (but pointless) in single-select.
 */
export function partitionByGrouping(
  rows: readonly ProjectRow[],
  grouping: ProjectSelectorGrouping,
): RowSection[] {
  if (grouping.id === 'openTabs') return partitionByOpenTabs(rows);
  if (grouping.id === 'selection') return partitionBySelection(rows, grouping);
  if (!grouping.getGroupKey) return partitionFlat(rows);
  const buckets = new Map<string, ProjectRow[]>();
  const unknownRows: ProjectRow[] = [];
  const { getGroupKey } = grouping;
  rows.forEach((row) => {
    const key = getGroupKey(row.project);
    if (key === undefined || key === '') {
      unknownRows.push(row);
      return;
    }
    const existing = buckets.get(key);
    if (existing) existing.push(row);
    else buckets.set(key, [row]);
  });
  const entries = [...buckets.entries()].map(([key, groupRows]) => {
    const sortedRows = [...groupRows].sort(compareRows);
    const heading =
      grouping.getSectionHeading?.(
        key,
        sortedRows.map((r) => r.project),
      ) ?? key;
    return { key, heading, rows: sortedRows };
  });
  entries.sort((a, b) => {
    if (a.key === grouping.priorityKey) return -1;
    if (b.key === grouping.priorityKey) return 1;
    if (grouping.compareSections) {
      return grouping.compareSections(
        { key: a.key, heading: a.heading },
        { key: b.key, heading: b.heading },
      );
    }
    return a.heading.localeCompare(b.heading, undefined, { sensitivity: 'base' });
  });
  const sections: RowSection[] = entries.map(({ key, heading, rows: groupRows }) => ({
    kind: 'grouping',
    groupingId: grouping.id,
    key,
    label: heading,
    rows: groupRows,
    isPriority: key === grouping.priorityKey,
  }));
  if (unknownRows.length > 0 && grouping.unknownSectionHeading) {
    sections.push({
      kind: 'grouping',
      groupingId: grouping.id,
      key: undefined,
      label: grouping.unknownSectionHeading,
      rows: [...unknownRows].sort(compareRows),
    });
  }
  return sections;
}

// #endregion
