import {
  getProjectRowId,
  getResourceReferenceBareId,
  getResourceReferenceRowId,
  isDblResourceReference,
} from './resource-reference.utils';
import type { PickerResource } from './downloaded-resources.utils';

/** What the panel knows about its selection on this render. */
export type ResourceSelectionInputs = {
  /** The persisted selection, namespaced or legacy-bare */
  selectedResourceId: string | undefined;
  /**
   * The id of the resource the user last chose themselves — from the dropdown, the resource picker,
   * or by opening it from Home. The persisted selection is the user's pick only when the two name
   * the same row; any other selection is one the panel fell back to.
   */
  userPickedResourceId: string | undefined;
  /** The row id of a pick still propagating, if any */
  pendingResourceId: string | undefined;
  /** The row id of the downloaded fallback the panel showed last, if any (never persisted) */
  heldFallbackRowId: string | undefined;
  /**
   * Whether every layer of the list has loaded. While one is missing, a row can be absent or listed
   * as `downloaded` only for now, so nothing is replaced on that evidence.
   */
  isListComplete: boolean;
};

/** What the panel should do with its persisted selection on this render. */
export type ResourceSelectionResolution = {
  /**
   * The row id to persist, or `undefined` to leave the stored selection alone. Always the
   * namespaced form, so a legacy bare id is rewritten the first time its row is seen — as is a
   * selection found only by its project (see {@link findSelectedRow}), to its row's own id.
   */
  nextSelectedResourceId: string | undefined;
  /**
   * The id to persist as the user's pick, or `undefined` to leave it alone. Set when a pick is
   * committed, and when the selection the user picked is rewritten to another form of its id.
   */
  nextUserPickedResourceId: string | undefined;
  /** Whether the in-flight pick has arrived in the list and can stop suppressing auto-correct. */
  shouldClearPending: boolean;
  /** The row to display, or `undefined` when there is nothing to show. */
  selectedRow: PickerResource | undefined;
  /**
   * The row id of a downloaded resource shown as a fallback without being persisted, for the panel
   * to hold on to as `heldFallbackRowId` so the fallback does not move as rows change.
   */
  shownFallbackRowId: string | undefined;
};

/**
 * Whether a row is the one a persisted selection refers to.
 *
 * Row ids are namespaced by reference kind (`dbl:` / `project:`) because a DBL entry UID and a
 * project id are drawn from different spaces and would otherwise collide. A selection persisted
 * before that namespacing holds the bare id, so both forms are accepted — otherwise every existing
 * panel silently resets to the first row on its first render after upgrade.
 *
 * @param row The picker row to test
 * @param selectedResourceId The persisted selection, in either form
 * @returns `true` when `row` is the selected resource
 */
export function matchesSelectedResourceId(
  row: PickerResource,
  selectedResourceId: string | undefined,
): boolean {
  if (selectedResourceId === undefined) return false;
  return (
    getResourceReferenceRowId(row.reference) === selectedResourceId ||
    getResourceReferenceBareId(row.reference) === selectedResourceId
  );
}

/**
 * Finds the row a persisted selection refers to: the row it names (see
 * {@link matchesSelectedResourceId}), or — only when no row is named by it — a row showing the
 * project a `project:` selection names.
 *
 * The fallback is for a resource selected by its project before the catalog arrived, as one opened
 * from Home while the catalog is still loading, whose row the catalog has since identified as a DBL
 * resource. It is the same resource, so the selection holds, and is then rewritten to the row's own
 * id. It never applies while a row matches exactly, so a list listing one resource under both kinds
 * of reference keeps whichever of the two the user picked.
 *
 * @param rows The panel's filtered rows
 * @param selectedResourceId The persisted selection
 * @returns The selected row, or `undefined` if no row is selected
 */
export function findSelectedRow(
  rows: PickerResource[],
  selectedResourceId: string | undefined,
): PickerResource | undefined {
  if (selectedResourceId === undefined) return undefined;
  return (
    rows.find((row) => matchesSelectedResourceId(row, selectedResourceId)) ??
    rows.find(
      (row) => row.projectId !== undefined && selectedResourceId === getProjectRowId(row.projectId),
    )
  );
}

/**
 * Decides the panel's selection from the rows currently in its filtered list.
 *
 * Three jobs, in priority order, so that they cannot fight each other across renders:
 *
 * 1. Commit a pick that has arrived. `pendingResourceId` holds the row id of a resource the user just
 *    chose, while the write propagates through the settings chain into the list. It is compared as
 *    a row id, so it must be derived from the reference that was actually stored — a bare DBL entry
 *    UID never matches, and for a locally-installed non-DBL resource the stored reference is a
 *    project reference whose id is the project id, not the UID.
 * 2. Hold still while a pick is in flight. Auto-correct must not overwrite the selection before the
 *    new resource shows up.
 * 3. Auto-correct otherwise — rewrite a legacy bare id to its namespaced form (and a selection found
 *    only by its project to its row's own id), or fall back when the selection has left the list.
 *
 * A configured resource (in the admin's or the user's list) wins over a `downloaded` one (installed
 * locally, but in neither list) the panel falls back to:
 *
 * - A fallback to a configured row is persisted, but only to a row that has something to display. A
 *   row with no `projectId` has no content, so selecting it would spin forever.
 * - A fallback to a downloaded row is shown but never persisted, since a downloaded row stays in the
 *   list and would otherwise outlive the configuration that later arrives. It is held between
 *   renders (see `heldFallbackRowId`), so a newly installed resource does not take its place. A
 *   configured row that is not installed yet is shown in its place, which gets it installed.
 * - A persisted downloaded selection that is not the user's pick — one saved by an earlier version of
 *   the panel — gives way to an installed configured DBL resource. Not to a project reference:
 *   TODO(PT-4896) it counts as displayable even when its project is not on this machine, and would
 *   replace a working text with a blank editor.
 *
 * Nothing is replaced while `isListComplete` is false, and a selection that has left the list is
 * then fallen back from on screen only, since it may be back once the missing layer loads.
 *
 * @param rows The panel's filtered rows
 * @param inputs See {@link ResourceSelectionInputs}
 * @returns See {@link ResourceSelectionResolution}
 */
export function resolveResourceSelection(
  rows: PickerResource[],
  inputs: ResourceSelectionInputs,
): ResourceSelectionResolution {
  const {
    selectedResourceId,
    userPickedResourceId,
    pendingResourceId,
    heldFallbackRowId,
    isListComplete,
  } = inputs;
  const isConfigured = (row: PickerResource) => row.source !== 'downloaded';
  const firstUsable = rows.find((row) => row.projectId !== undefined);
  const firstUsableConfigured = rows.find(
    (row) => isConfigured(row) && row.projectId !== undefined,
  );
  const matchedRow = findSelectedRow(rows, selectedResourceId);
  const isUserPick =
    matchedRow !== undefined && findSelectedRow(rows, userPickedResourceId) === matchedRow;
  const replacement = rows.find(
    (row) =>
      isConfigured(row) && row.projectId !== undefined && isDblResourceReference(row.reference),
  );
  const isSuperseded =
    matchedRow?.source === 'downloaded' &&
    !isUserPick &&
    isListComplete &&
    replacement !== undefined;
  const selectedRow = isSuperseded ? undefined : matchedRow;
  // The configured row to fall back to. A superseded selection gives way to `replacement` itself,
  // so a project reference listed ahead of it cannot take its place.
  const configuredFallback = isSuperseded ? replacement : firstUsableConfigured;

  // What to show, unsaved, when nothing configured is displayable: a configured row not installed
  // yet, else the downloaded row shown last, else the first row with something to display.
  const pickUnsavedFallback = () =>
    rows.find(isConfigured) ??
    rows.find(
      (row) =>
        row.projectId !== undefined &&
        getResourceReferenceRowId(row.reference) === heldFallbackRowId,
    ) ??
    firstUsable ??
    rows[0];
  const shownFallbackRowIdOf = (row: PickerResource | undefined) =>
    row?.source === 'downloaded' ? getResourceReferenceRowId(row.reference) : undefined;

  if (pendingResourceId !== undefined) {
    const pendingRow = rows.find(
      (row) => getResourceReferenceRowId(row.reference) === pendingResourceId,
    );
    if (pendingRow)
      return {
        nextSelectedResourceId: pendingResourceId,
        nextUserPickedResourceId: pendingResourceId,
        shouldClearPending: true,
        selectedRow: pendingRow,
        shownFallbackRowId: undefined,
      };
    const heldRow = selectedRow ?? configuredFallback ?? pickUnsavedFallback();
    return {
      nextSelectedResourceId: undefined,
      nextUserPickedResourceId: undefined,
      shouldClearPending: false,
      selectedRow: heldRow,
      shownFallbackRowId: selectedRow ? undefined : shownFallbackRowIdOf(heldRow),
    };
  }

  if (rows.length === 0)
    return {
      nextSelectedResourceId: undefined,
      nextUserPickedResourceId: undefined,
      shouldClearPending: false,
      selectedRow: undefined,
      shownFallbackRowId: undefined,
    };

  if (selectedRow) {
    const rowId = getResourceReferenceRowId(selectedRow.reference);
    const isRewritten = rowId !== selectedResourceId;
    return {
      nextSelectedResourceId: isRewritten ? rowId : undefined,
      nextUserPickedResourceId: isRewritten && isUserPick ? rowId : undefined,
      shouldClearPending: false,
      selectedRow,
      shownFallbackRowId: undefined,
    };
  }

  if (configuredFallback)
    return {
      nextSelectedResourceId: isListComplete
        ? getResourceReferenceRowId(configuredFallback.reference)
        : undefined,
      nextUserPickedResourceId: undefined,
      shouldClearPending: false,
      selectedRow: configuredFallback,
      shownFallbackRowId: undefined,
    };
  // Nothing configured is displayable and the selection has left the list (or was never set), so
  // whatever is shown here is a fallback the user did not pick. The stale id stays persisted on
  // purpose: if its resource comes back, the user's choice takes effect again.
  const fallbackRow = pickUnsavedFallback();
  return {
    nextSelectedResourceId: undefined,
    nextUserPickedResourceId: undefined,
    shouldClearPending: false,
    selectedRow: fallbackRow,
    shownFallbackRowId: shownFallbackRowIdOf(fallbackRow),
  };
}

/**
 * Whether a picker row is one the project administrator put in the team layout.
 *
 * Decided by `source === 'admin'` alone. While the DBL catalog is unavailable a team `dblResource`
 * reference cannot be resolved (see `buildPickerResources`), so an installed team resource comes
 * back as a `downloaded` row and does not count.
 *
 * @param row The row to test
 * @returns Whether the row is the team's
 */
export function isTeamPickerResource(row: PickerResource): boolean {
  return row.source === 'admin';
}

/**
 * Split picker rows into the team's (`source === 'admin'`), the user's own (`'user'`), and other
 * resources installed on this computer that neither list names (`'downloaded'`), often downloaded
 * for another project. Each group keeps the order its rows had in `rows`.
 *
 * While the catalog is unavailable, `other` is empty and its rows go in `user`, in their original
 * order: without the catalog every DBL reference resolves as a plain download (see
 * `buildPickerResources`), so a separate group would make the user's own resources look removed. So
 * `user` can then hold `downloaded` rows; anything deciding what the user may remove must check
 * each row's `source`, not its group.
 *
 * @param rows The rows to split
 * @param options.isCatalogUnavailable Whether a DBL catalog is expected but not here (loading or
 *   failed)
 * @returns The team's rows, the user's rows and the other rows
 */
export function splitPickerResourcesBySource(
  rows: PickerResource[],
  { isCatalogUnavailable }: { isCatalogUnavailable: boolean },
): {
  team: PickerResource[];
  user: PickerResource[];
  other: PickerResource[];
} {
  const team = rows.filter(isTeamPickerResource);
  if (isCatalogUnavailable)
    return { team, user: rows.filter((row) => !isTeamPickerResource(row)), other: [] };
  return {
    team,
    user: rows.filter((row) => row.source === 'user'),
    other: rows.filter((row) => row.source === 'downloaded'),
  };
}
