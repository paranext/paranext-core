import type { ScrollGroupId } from 'platform-bible-utils';

// #region Types

/** The three modes of the project selector. */
export type ProjectSelectorMode = 'project' | 'project-multi' | 'projectScrollGroup';

/** Minimal project metadata fed to the selector. */
export type ProjectSelectorProject = {
  id: string;
  shortName: string;
  fullName: string;
  language?: string;
  languageCode?: string;
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
   * Locale-stable versification identifier (e.g. the numeric `ScrVersType` enum as a string). Used
   * by the selector's optional versification-grouping mode to bucket projects by canon, and to pin
   * the consumer-supplied "priority" versification group to the top. Pair with `versificationName`
   * for display.
   */
  versificationId?: string;
  /**
   * Human-readable versification name (e.g. "English", "Vulgate"). Used as the section header in
   * versification-grouping mode. Defaults to a "Unknown" bucket when a project has a
   * `versificationId` but no `versificationName`. Pair with `versificationId`.
   */
  versificationName?: string;
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

/** One row in the project selector list. */
export type ProjectRow = {
  /** Stable unique key for React / cmdk. */
  rowKey: string;
  projectId: string;
  shortName: string;
  fullName: string;
  language?: string;
  languageCode?: string;
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
  /** Mirrors {@link ProjectSelectorProject.versificationId}. */
  versificationId?: string;
  /** Mirrors {@link ProjectSelectorProject.versificationName}. */
  versificationName?: string;
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

/**
 * Project ids are matched case-insensitively because their casing is not guaranteed to agree across
 * sources: canonical ids are UPPERCASE (C# `ProjectSummary` → `Guid.ToUpperInvariant()`), but some
 * producers (e.g. the open-project-tabs hook) lowercase them. Normalizing both sides of the
 * open-tab↔project join here keeps the "Open Tabs" section from silently disappearing on a casing
 * mismatch. See I12.
 */
export function normalizeProjectId(projectId: string): string {
  return projectId.toUpperCase();
}

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
 * (see {@link partitionAndSort}).
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
        language: project.language,
        languageCode: project.languageCode,
        scrollGroupId: undefined,
        scrollGroupScrRefLabel: undefined,
        openGroups: tabs.map((t) => t.scrollGroupId),
        isSelected: selectedId === project.id,
        isMuted: tabs.length === 0,
        isBoundButClosed: false,
        isDisabled: project.isDisabled === true,
        disabledReason: project.disabledReason,
        versificationId: project.versificationId,
        versificationName: project.versificationName,
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
        language: project.language,
        languageCode: project.languageCode,
        scrollGroupId: undefined,
        scrollGroupScrRefLabel: undefined,
        openGroups: [],
        isSelected: pairIsSelected(selectedPairs, project.id, undefined),
        isMuted: true,
        isBoundButClosed: false,
        isDisabled: project.isDisabled === true,
        disabledReason: project.disabledReason,
        versificationId: project.versificationId,
        versificationName: project.versificationName,
      });
      return;
    }
    tabs.forEach((tab) => {
      rows.push({
        rowKey: `tab:${project.id}:${tab.scrollGroupId}`,
        projectId: project.id,
        shortName: project.shortName,
        fullName: project.fullName,
        language: project.language,
        languageCode: project.languageCode,
        scrollGroupId: tab.scrollGroupId,
        scrollGroupScrRefLabel: tab.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: pairIsSelected(selectedPairs, project.id, tab.scrollGroupId),
        isMuted: false,
        isBoundButClosed: false,
        isDisabled: project.isDisabled === true,
        disabledReason: project.disabledReason,
        versificationId: project.versificationId,
        versificationName: project.versificationName,
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
      language: project.language,
      languageCode: project.languageCode,
      scrollGroupId: pair.scrollGroupId,
      scrollGroupScrRefLabel: undefined,
      openGroups: [],
      isSelected: true,
      isMuted: false,
      isBoundButClosed: true,
      isDisabled: project.isDisabled === true,
      disabledReason: project.disabledReason,
      versificationId: project.versificationId,
      versificationName: project.versificationName,
    });
  });

  return rows;
}

// #endregion

// #region partitionAndSort

export type RowSection = {
  /**
   * 'flat' means no section header (grouping toggle off). 'versification' is a custom-labeled
   * section that surfaces the versification name; the priority versification group (typically the
   * active project's versification) is pinned to the top by `partitionByVersification`.
   */
  kind: 'openTabs' | 'other' | 'flat' | 'versification';
  rows: ProjectRow[];
  /**
   * Set on `versification` sections — the localized versification name to render as the section
   * header. `undefined` for other section kinds.
   */
  label?: string;
  /** Set on `versification` sections — true for the consumer-supplied priority bucket. */
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

/**
 * Split rows into the Open tabs / Other projects sections (when `groupByOpenTabs`) or a single flat
 * section (otherwise). Within each section, selected rows float to the top, then alphabetical by
 * `shortName`, tie-broken by `scrollGroupId`.
 *
 * "Open tabs" rows are: open-group rows (project-multi / projectScrollGroup modes) and
 * `project`-mode rows whose project is open somewhere. Bound-but-closed synthetic rows and not-open
 * project rows land in "Other projects".
 *
 * Special case: when grouping is on but the "Open tabs" section would be empty (no project in the
 * list is currently open in any scroll group), we fall back to a flat list. A lone "Other projects"
 * heading without a partner section reads as a bug — the user wonders what they're "other" to. This
 * commonly happens when the consumer hasn't (or can't) seed `openTabs` with already-open tabs at
 * mount time.
 */
export function partitionAndSort(
  rows: readonly ProjectRow[],
  groupByOpenTabs: boolean,
): RowSection[] {
  if (!groupByOpenTabs) {
    return [{ kind: 'flat', rows: [...rows].sort(compareRows) }];
  }
  const open = rows.filter(belongsToOpenTabsSection).sort(compareRows);
  const other = rows.filter((r) => !belongsToOpenTabsSection(r)).sort(compareRows);
  if (open.length === 0) {
    // Grouping is on but no rows belong to "Open tabs" — render flat to avoid the misleading
    // standalone "Other projects" header.
    return [{ kind: 'flat', rows: other }];
  }
  const sections: RowSection[] = [{ kind: 'openTabs', rows: open }];
  if (other.length > 0) sections.push({ kind: 'other', rows: other });
  return sections;
}

/**
 * Group rows by their `versificationId`, render the priority group first, and then the other groups
 * sorted alphabetically by `versificationName`. Within each group rows are sorted by
 * {@link compareRows}.
 *
 * Rows without a `versificationId` are collected into a single trailing "Unknown" section labeled
 * by `unknownLabel`. When `priorityVersificationId` is undefined, no group is pinned.
 */
export function partitionByVersification(
  rows: readonly ProjectRow[],
  priorityVersificationId: string | undefined,
  unknownLabel: string,
): RowSection[] {
  // Bucket by versificationId. Maps preserve insertion order which we exploit for stable section
  // sorting below (alphabetical on the localized name, with the priority group lifted to index 0).
  const buckets = new Map<string, { label: string; rows: ProjectRow[] }>();
  const unknownRows: ProjectRow[] = [];
  rows.forEach((row) => {
    const id = row.versificationId;
    if (id === undefined || id === '') {
      unknownRows.push(row);
      return;
    }
    const label = row.versificationName ?? id;
    const existing = buckets.get(id);
    if (existing) {
      existing.rows.push(row);
      // Adopt the first non-empty label observed — protects against a row missing
      // versificationName while siblings have it.
      if (!existing.label && row.versificationName) existing.label = row.versificationName;
    } else {
      buckets.set(id, { label, rows: [row] });
    }
  });
  // Sort each bucket and emit sections in priority-first / alphabetical order.
  const entries = [...buckets.entries()].map(([id, { label, rows: groupRows }]) => ({
    id,
    label,
    rows: [...groupRows].sort(compareRows),
  }));
  entries.sort((a, b) => {
    if (a.id === priorityVersificationId) return -1;
    if (b.id === priorityVersificationId) return 1;
    return a.label.localeCompare(b.label, undefined, { sensitivity: 'base' });
  });
  const sections: RowSection[] = entries.map(({ id, label, rows: groupRows }) => ({
    kind: 'versification' as const,
    rows: groupRows,
    label,
    isPriority: id === priorityVersificationId,
  }));
  if (unknownRows.length > 0) {
    sections.push({
      kind: 'versification',
      rows: [...unknownRows].sort(compareRows),
      label: unknownLabel,
      isPriority: false,
    });
  }
  return sections;
}

// #endregion
