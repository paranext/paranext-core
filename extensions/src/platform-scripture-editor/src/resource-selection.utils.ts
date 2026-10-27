import { getResourceReferenceBareId, getResourceReferenceRowId } from './resource-reference.utils';
import type { PickerResource } from './downloaded-resources.utils';

/** What the panel should do with its persisted selection on this render. */
export type ResourceSelectionResolution = {
  /**
   * The row id to persist, or `undefined` to leave the stored selection alone. Always the
   * namespaced form, so a legacy bare id is rewritten the first time its row is seen.
   */
  nextSelectedResourceId: string | undefined;
  /**
   * Whether the selection to persist is the user's own pick, or `undefined` to leave the stored
   * mark alone. Set whenever `nextSelectedResourceId` changes which resource is selected.
   */
  nextIsUserPick: boolean | undefined;
  /** Whether the in-flight pick has arrived in the list and can stop suppressing auto-correct. */
  shouldClearPending: boolean;
  /** The row to display, or `undefined` when there is nothing to show. */
  selectedRow: PickerResource | undefined;
  /**
   * Whether `selectedRow` is a `downloaded` row the panel fell back to rather than one the user
   * picked. Such a row is shown but must not be offered to global navigation, since what a panel
   * publishes there is persisted with the layout just like its selection.
   */
  isDownloadedFallback: boolean;
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
 *    `projectId` has no content, so selecting it would spin forever.
 *
 * A fallback to a `downloaded` row (installed locally, but in neither the admin's nor the user's
 * list) is shown but never persisted, and a persisted `downloaded` selection the user did not pick
 * gives way to the first displayable configured row. Otherwise a fallback chosen while nothing was
 * configured would outlive the configuration that later arrives, since a downloaded row stays in
 * the list. A selection persisted without a user-pick mark counts as not picked by the user.
 *
 * @param rows The panel's filtered rows
 * @param selectedResourceId The persisted selection, namespaced or legacy-bare
 * @param pendingResourceId The row id of a pick still propagating, if any
 * @param isUserPick Whether the persisted selection is the user's own pick
 * @returns See {@link ResourceSelectionResolution}
 */
export function resolveResourceSelection(
  rows: PickerResource[],
  selectedResourceId: string | undefined,
  pendingResourceId: string | undefined,
  isUserPick?: boolean,
): ResourceSelectionResolution {
  const firstUsable = rows.find((row) => row.projectId !== undefined);
  const firstUsableConfigured = rows.find(
    (row) => row.projectId !== undefined && row.source !== 'downloaded',
  );
  const matchedRow = rows.find((row) => matchesSelectedResourceId(row, selectedResourceId));
  const isSupersededFallback =
    matchedRow?.source === 'downloaded' && !isUserPick && firstUsableConfigured !== undefined;
  const selectedRow = isSupersededFallback ? undefined : matchedRow;
  // `isUserPick` describes the persisted selection only; any other row shown is not the user's pick.
  const isSelectionUnpickedDownload = selectedRow?.source === 'downloaded' && !isUserPick;

  if (pendingResourceId !== undefined) {
    const pendingRow = rows.find(
      (row) => getResourceReferenceRowId(row.reference) === pendingResourceId,
    );
    if (pendingRow)
      return {
        nextSelectedResourceId: pendingResourceId,
        nextIsUserPick: true,
        shouldClearPending: true,
        selectedRow: pendingRow,
        isDownloadedFallback: false,
      };
    const heldRow = selectedRow ?? firstUsableConfigured ?? firstUsable ?? rows[0];
    return {
      nextSelectedResourceId: undefined,
      nextIsUserPick: undefined,
      shouldClearPending: false,
      selectedRow: heldRow,
      isDownloadedFallback: selectedRow
        ? isSelectionUnpickedDownload
        : heldRow?.source === 'downloaded',
    };
  }

  if (rows.length === 0)
    return {
      nextSelectedResourceId: undefined,
      nextIsUserPick: undefined,
      shouldClearPending: false,
      selectedRow: undefined,
      isDownloadedFallback: false,
    };

  if (selectedRow) {
    const rowId = getResourceReferenceRowId(selectedRow.reference);
    return {
      nextSelectedResourceId: rowId === selectedResourceId ? undefined : rowId,
      nextIsUserPick: undefined,
      shouldClearPending: false,
      selectedRow,
      isDownloadedFallback: isSelectionUnpickedDownload,
    };
  }

  if (firstUsableConfigured)
    return {
      nextSelectedResourceId: getResourceReferenceRowId(firstUsableConfigured.reference),
      nextIsUserPick: false,
      shouldClearPending: false,
      selectedRow: firstUsableConfigured,
      isDownloadedFallback: false,
    };
  // Nothing configured is displayable and the selection has left the list (or was never set), so
  // whatever is shown here is a fallback the user did not pick. The stale id stays persisted on
  // purpose: if its resource comes back, the user's choice takes effect again.
  const fallbackRow = firstUsable ?? rows[0];
  return {
    nextSelectedResourceId: undefined,
    nextIsUserPick: undefined,
    shouldClearPending: false,
    selectedRow: fallbackRow,
    isDownloadedFallback: fallbackRow.source === 'downloaded',
  };
}
