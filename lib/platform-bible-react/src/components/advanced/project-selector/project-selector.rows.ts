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
};

/** A project that is currently open in a specific scroll group. */
export type OpenProjectTab = {
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
export type ProjectPair = {
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
export type ProjectMultiSelection = { pairs: readonly ProjectPair[] };

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
   * the caller provided one via `OpenProjectTab.scrollGroupScrRefLabel`.
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
};

export type ComputeRowsArgs =
  | {
      mode: 'project';
      projects: readonly ProjectSelectorProject[];
      openTabs: readonly OpenProjectTab[];
      selection: ProjectSelection;
    }
  | {
      mode: 'project-multi';
      projects: readonly ProjectSelectorProject[];
      openTabs: readonly OpenProjectTab[];
      selection: ProjectMultiSelection;
    }
  | {
      mode: 'projectScrollGroup';
      projects: readonly ProjectSelectorProject[];
      openTabs: readonly OpenProjectTab[];
      selection: ProjectScrollGroupSelection;
    };

// #endregion

// #region Helpers

type TabInfo = {
  scrollGroupId: ScrollGroupId;
  scrollGroupScrRefLabel?: string;
};

function collectOpenTabsByProject(openTabs: readonly OpenProjectTab[]): Map<string, TabInfo[]> {
  const map = new Map<string, TabInfo[]>();
  openTabs.forEach((tab) => {
    const existing = map.get(tab.projectId);
    const info: TabInfo = {
      scrollGroupId: tab.scrollGroupId,
      scrollGroupScrRefLabel: tab.scrollGroupScrRefLabel,
    };
    if (existing) {
      if (!existing.some((t) => t.scrollGroupId === tab.scrollGroupId)) existing.push(info);
    } else {
      map.set(tab.projectId, [info]);
    }
  });
  map.forEach((infos) => infos.sort((a, b) => a.scrollGroupId - b.scrollGroupId));
  return map;
}

function pairIsSelected(
  pairs: readonly ProjectPair[],
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
      const tabs = tabsByProject.get(project.id) ?? [];
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
      };
    });
  }

  // project-multi and projectScrollGroup share the row structure (per-pair rows plus per-project
  // rows for not-open projects). They differ only in how selection is keyed.
  let selectedPairs: readonly ProjectPair[] = [];
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
    const tabs = tabsByProject.get(project.id);
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
    });
  });

  return rows;
}

// #endregion

// #region partitionAndSort

export type RowSection = {
  /** 'flat' means no section header (grouping toggle off). */
  kind: 'openTabs' | 'other' | 'flat';
  rows: ProjectRow[];
};

function belongsToOpenTabsSection(row: ProjectRow): boolean {
  if (row.isBoundButClosed) return false;
  if (row.scrollGroupId !== undefined) return true;
  return row.openGroups.length > 0;
}

function compareRows(a: ProjectRow, b: ProjectRow): number {
  // Selected rows float to the top of their section.
  if (a.isSelected !== b.isSelected) return a.isSelected ? -1 : 1;
  // Then alphabetical by shortName.
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
 * list is currently open in any scroll group), we fall back to a flat list. A lone "Other
 * projects" heading without a partner section reads as a bug — the user wonders what they're
 * "other" to. This commonly happens when the consumer hasn't (or can't) seed `openTabs` with
 * already-open tabs at mount time.
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

// #endregion
