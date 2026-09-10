import { getResourceReferenceBareId, getResourceReferenceRowId } from './resource-reference.utils';
import type { PickerResource } from './downloaded-resources.utils';

/** What the panel should do with its persisted selection on this render. */
export type ResourceSelectionResolution = {
  /**
   * The row id to persist, or `undefined` to leave the stored selection alone. Always the
   * namespaced form, so a legacy bare id is rewritten the first time its row is seen.
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
 * 3. Auto-correct otherwise — rewrite a legacy bare id to its namespaced form, or fall back to the
 *    first row that has something to display when the selection has left the list. A row with no
 *    `projectId` has no content, so selecting it would spin forever. Only once the sources behind
 *    `rows` have settled, though: until then a selection is missing because its source has not
 *    landed, not because it is gone, and correcting on that overwrites the user's pick for good.
 *
 * Takes an options object rather than positional arguments, matching `getResourcePanelReadiness`:
 * two adjacent `string | undefined` ids and two booleans are all transposable without a type error,
 * and each transposition silently changes the answer.
 *
 * @param options.rows The panel's filtered rows
 * @param options.selectedResourceId The persisted selection, namespaced or legacy-bare
 * @param options.pendingResourceId The row id of a pick still propagating, if any
 * @param options.areSourcesSettled Whether the sources `rows` is filtered against have settled, so
 *   that a selection's ABSENCE from them can be read as genuine (see
 *   `canResolveResourceSelection`). Governs DISPLAY: a settled absence may fall back to another
 *   row. Required rather than defaulted: the safe-looking default is `false`, and a caller that
 *   silently got it would render no resource at all.
 * @param options.mayPersistCorrection Whether an absence is settled in a way that will not be
 *   undone, so a fallback derived from it may be WRITTEN BACK over the stored selection. Strictly
 *   narrower than `areSourcesSettled`: a failed catalog settles what the rows are for now, but its
 *   retry can still restore the missing row, and the stored id does not come back once overwritten.
 *   See `canResolveResourceSelection` for why the two questions diverge.
 * @returns See {@link ResourceSelectionResolution}
 */
export function resolveResourceSelection({
  rows,
  selectedResourceId,
  pendingResourceId,
  areSourcesSettled,
  mayPersistCorrection,
}: {
  rows: PickerResource[];
  selectedResourceId: string | undefined;
  pendingResourceId: string | undefined;
  areSourcesSettled: boolean;
  mayPersistCorrection: boolean;
}): ResourceSelectionResolution {
  const selectedRow = rows.find((row) => matchesSelectedResourceId(row, selectedResourceId));
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

  // The selection is not among the rows. That is only evidence it is GONE once the sources the rows
  // are filtered against have settled; while one is still arriving it is evidence of nothing, and
  // both correcting the stored id and displaying `rows[0]` in its place would be wrong — the stored
  // id would be overwritten by a resource the user never chose, and it does not come back.
  if (!areSourcesSettled)
    return { nextSelectedResourceId: undefined, shouldClearPending: false, selectedRow: undefined };

  // Displaying a fallback and PERSISTING one are separate decisions, because they carry different
  // costs when the settlement turns out to be temporary. Showing another row while the catalog is
  // down is recoverable — the right row reappears on a successful retry. Writing that row over the
  // stored id is not: the pick is gone before the reader ever sees the panel, since this window
  // renders the catalog-error view rather than the selector.
  const firstUsable = rows.find((row) => row.projectId !== undefined);
  return {
    nextSelectedResourceId:
      mayPersistCorrection && firstUsable
        ? getResourceReferenceRowId(firstUsable.reference)
        : undefined,
    shouldClearPending: false,
    selectedRow: displayRow,
  };
}
