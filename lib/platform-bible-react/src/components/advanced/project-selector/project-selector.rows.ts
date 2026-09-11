import { normalizeProjectId, type ScrollGroupId } from 'platform-bible-utils';

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
  /**
   * Locale-stable type key for the "Group by type" option.
   *
   * **This field is a free-form `string` on purpose — the selector does NOT enforce a taxonomy.**
   * It groups rows by exact key equality (case-sensitive) and displays them under whatever
   * {@link typeName} the caller supplies. No enum, no union, no wire contract, and no localization
   * key set for the values is defined by this component.
   *
   * ### Why free-form?
   *
   * Rows in a single picker can come from more than one already-established taxonomy, and none of
   * them are owned by `platform-bible-react`:
   *
   * - **Paratext project types** — the PT9 `ProjectType` enum, surfaced by the C# ParatextData
   *   library via `ScrText.Settings.TranslationInfo.Type.InternalValue` and forwarded on the wire
   *   as `ProjectListResult.projectType` (see `c-sharp/ManageBooks/ProjectSummary.cs`). Values
   *   include `"Standard"`, `"BackTranslation"`, `"Auxiliary"`, `"Daughter"`, `"StudyBible"`,
   *   `"StudyBibleAdditions"`, `"ConsultantNotes"`, `"Transliteration"`,
   *   `"TransliterationWithEncoder"`.
   * - **DBL resource types** — the `ResourceType` union in `platform-bible-utils`
   *   (`lib/platform-bible-utils/src/resources.model.ts`): `"ScriptureResource"`,
   *   `"CommentaryResource"`, `"EnhancedResource"`, `"XmlResource"`, `"SourceLanguageResource"`.
   *
   * Constraining `type` to a hard-coded union would either duplicate one of those taxonomies (and
   * quickly drift from its source of truth) or invent a new one, and neither buys the selector
   * anything — grouping only needs equality.
   *
   * If a future consumer wants type-safety on the caller side, the recommended shape is a typed
   * literal at the call site (e.g. `type: 'Standard' satisfies string`), not a widening of this
   * type. Escalating this to a union is a deliberate, future decision — not something to add
   * ad-hoc.
   */
  type?: string;
  /**
   * Human-readable label for {@link type} used as the section header in type-grouping mode. Falls
   * back to the raw `type` key when absent. Callers own the mapping from `type` to `typeName` and
   * should provide a localized string (e.g. `"Back translation"`, `"Study Bible"`, `"Scripture
   * resource"`). The selector does not resolve labels itself — see {@link type} for the rationale.
   */
  typeName?: string;
  /**
   * Millisecond-epoch timestamp of when the caller last used this project/resource. Optional;
   * consumed by the "Group by last used" option, which places rows with a timestamp under a
   * "Recently used" section (sorted newest-first) and rows without under "Other".
   */
  lastUsedAt?: number;
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
  /** Mirrors {@link ProjectSelectorProject.type}. */
  type?: string;
  /** Mirrors {@link ProjectSelectorProject.typeName}. */
  typeName?: string;
  /** Mirrors {@link ProjectSelectorProject.lastUsedAt}. */
  lastUsedAt?: number;
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
        type: project.type,
        typeName: project.typeName,
        lastUsedAt: project.lastUsedAt,
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
        type: project.type,
        typeName: project.typeName,
        lastUsedAt: project.lastUsedAt,
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
        type: project.type,
        typeName: project.typeName,
        lastUsedAt: project.lastUsedAt,
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
      type: project.type,
      typeName: project.typeName,
      lastUsedAt: project.lastUsedAt,
    });
  });

  return rows;
}

// #endregion

// #region partitionAndSort

export type RowSection = {
  /**
   * 'flat' means no section header (grouping toggle off). 'versification', 'language', 'type', and
   * 'lastUsed' are custom-labeled sections whose header comes from `label`; the priority
   * versification group (typically the active project's versification) is pinned to the top by
   * `partitionByVersification`.
   */
  kind: 'openTabs' | 'other' | 'flat' | 'versification' | 'language' | 'type' | 'lastUsed';
  rows: ProjectRow[];
  /**
   * Set on `versification`, `language`, `type`, and `lastUsed` sections — the localized label to
   * render as the section header. `undefined` for `flat`, `openTabs`, and `other` (whose labels
   * come from ProjectSelector's strings map instead).
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

/**
 * Bucket rows by `language`, sort each bucket by `compareRows`, and emit sections alphabetically by
 * language name. Rows without a `language` are collected into a single trailing "Unknown language"
 * section using `unknownLabel`. Empty sections are elided (no bucket is created for a language with
 * zero rows, and the unknown bucket is omitted when empty).
 */
export function partitionByLanguage(
  rows: readonly ProjectRow[],
  unknownLabel: string,
): RowSection[] {
  const buckets = new Map<string, ProjectRow[]>();
  const unknownRows: ProjectRow[] = [];
  rows.forEach((row) => {
    const key = row.language;
    if (!key) {
      unknownRows.push(row);
      return;
    }
    const existing = buckets.get(key);
    if (existing) existing.push(row);
    else buckets.set(key, [row]);
  });
  const entries = [...buckets.entries()].map(([label, groupRows]) => ({
    label,
    rows: [...groupRows].sort(compareRows),
  }));
  entries.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));
  const sections: RowSection[] = entries.map(({ label, rows: groupRows }) => ({
    kind: 'language' as const,
    rows: groupRows,
    label,
  }));
  if (unknownRows.length > 0) {
    sections.push({
      kind: 'language',
      rows: [...unknownRows].sort(compareRows),
      label: unknownLabel,
    });
  }
  return sections;
}

/**
 * Bucket rows by `type` key, using `typeName` for the section label (falling back to `type` when
 * `typeName` is absent). Emits sections alphabetically by label. Rows without a `type` go into a
 * single trailing "Unknown type" section using `unknownLabel`. Empty sections are elided.
 */
export function partitionByType(rows: readonly ProjectRow[], unknownLabel: string): RowSection[] {
  const buckets = new Map<string, { label: string; rows: ProjectRow[] }>();
  const unknownRows: ProjectRow[] = [];
  rows.forEach((row) => {
    const key = row.type;
    if (!key) {
      unknownRows.push(row);
      return;
    }
    const label = row.typeName ?? key;
    const existing = buckets.get(key);
    if (existing) {
      existing.rows.push(row);
      // Adopt the first non-empty typeName observed — protects against a row missing
      // typeName while siblings within the same type key have it.
      if (existing.label === key && row.typeName) existing.label = row.typeName;
    } else {
      buckets.set(key, { label, rows: [row] });
    }
  });
  const entries = [...buckets.values()].map(({ label, rows: groupRows }) => ({
    label,
    rows: [...groupRows].sort(compareRows),
  }));
  entries.sort((a, b) => a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }));
  const sections: RowSection[] = entries.map(({ label, rows: groupRows }) => ({
    kind: 'type' as const,
    rows: groupRows,
    label,
  }));
  if (unknownRows.length > 0) {
    sections.push({
      kind: 'type',
      rows: [...unknownRows].sort(compareRows),
      label: unknownLabel,
    });
  }
  return sections;
}

/**
 * Split rows into "Recently used" (rows with a `lastUsedAt`, sorted newest-first) and "Other" (rows
 * without a timestamp, sorted by `compareRows`). Both section labels are caller-provided; empty
 * sections are elided.
 */
export function partitionByLastUsed(
  rows: readonly ProjectRow[],
  recentLabel: string,
  otherLabel: string,
): RowSection[] {
  const recent: ProjectRow[] = [];
  const other: ProjectRow[] = [];
  rows.forEach((row) => {
    if (typeof row.lastUsedAt === 'number') recent.push(row);
    else other.push(row);
  });
  recent.sort((a, b) => (b.lastUsedAt ?? 0) - (a.lastUsedAt ?? 0));
  other.sort(compareRows);
  const sections: RowSection[] = [];
  if (recent.length > 0) sections.push({ kind: 'lastUsed', rows: recent, label: recentLabel });
  if (other.length > 0) sections.push({ kind: 'lastUsed', rows: other, label: otherLabel });
  return sections;
}

// #endregion
