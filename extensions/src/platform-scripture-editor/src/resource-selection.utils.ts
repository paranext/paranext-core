import {
  getProjectRowId,
  getResourceReferenceBareId,
  getResourceReferenceRowId,
} from './resource-reference.utils';
import type { PickerResource } from './downloaded-resources.utils';

/** What the panel should do with its persisted selection on this render. */
export type ResourceSelectionResolution = {
  /**
   * The row id to persist, or `undefined` to leave the stored selection alone. Always the
   * namespaced form, so a legacy bare id is rewritten the first time its row is seen — as is a
   * selection found only by its project (see {@link findSelectedRow}), to its row's own id.
   */
  nextSelectedResourceId: string | undefined;
  /** Whether the in-flight pick has arrived in the list and can stop suppressing auto-correct. */
  shouldClearPending: boolean;
  /** The row to display, or `undefined` when there is nothing to show. */
  selectedRow: PickerResource | undefined;
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
 *    only by its project to its row's own id), or fall back to the first row that has something to
 *    display when the selection has left the list. A row with no `projectId` has no content, so
 *    selecting it would spin forever.
 *
 * @param rows The panel's filtered rows
 * @param selectedResourceId The persisted selection, namespaced or legacy-bare
 * @param pendingResourceId The row id of a pick still propagating, if any
 * @returns See {@link ResourceSelectionResolution}
 */
export function resolveResourceSelection(
  rows: PickerResource[],
  selectedResourceId: string | undefined,
  pendingResourceId: string | undefined,
): ResourceSelectionResolution {
  const selectedRow = findSelectedRow(rows, selectedResourceId);
  const displayRow = selectedRow ?? rows[0];

  if (pendingResourceId !== undefined) {
    const pendingRow = rows.find(
      (row) => getResourceReferenceRowId(row.reference) === pendingResourceId,
    );
    if (pendingRow)
      return {
        nextSelectedResourceId: pendingResourceId,
        shouldClearPending: true,
        selectedRow: pendingRow,
      };
    return {
      nextSelectedResourceId: undefined,
      shouldClearPending: false,
      selectedRow: displayRow,
    };
  }

  if (rows.length === 0)
    return { nextSelectedResourceId: undefined, shouldClearPending: false, selectedRow: undefined };

  if (selectedRow) {
    const rowId = getResourceReferenceRowId(selectedRow.reference);
    return {
      nextSelectedResourceId: rowId === selectedResourceId ? undefined : rowId,
      shouldClearPending: false,
      selectedRow,
    };
  }

  const firstUsable = rows.find((row) => row.projectId !== undefined);
  return {
    nextSelectedResourceId: firstUsable
      ? getResourceReferenceRowId(firstUsable.reference)
      : undefined,
    shouldClearPending: false,
    selectedRow: displayRow,
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
 * @param options.isCatalogUnavailable Whether the DBL catalog failed to load
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
