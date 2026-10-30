import { getErrorMessage, normalizeProjectId } from 'platform-bible-utils';
import { SYNC_REQUEST_REMOVED_MARKER } from 'platform-bible-utils/experimental';

/**
 * What a Home row's Get/Sync action shows: `running` shows the spinner, `waiting` shows the button
 * that takes the project out of the sync queue, and `idle` shows Get or Sync.
 */
export type RowSyncState = 'running' | 'waiting' | 'idle';

/**
 * Decides a row's {@link RowSyncState}. Waiting wins over running: a project clicked again while it
 * runs is queued for the next run, and the row shows that rather than the run already under way.
 *
 * @param projectId The row's project id, in any casing
 * @param runningProjectIds Normalized ids of the projects in the running sync
 * @param waitingProjectIds Normalized ids of the projects waiting in the sync queue
 * @returns The state the row shows
 */
export function getRowSyncState(
  projectId: string,
  runningProjectIds: ReadonlySet<string>,
  waitingProjectIds: ReadonlySet<string>,
): RowSyncState {
  const normalizedId = normalizeProjectId(projectId);
  if (waitingProjectIds.has(normalizedId)) return 'waiting';
  if (runningProjectIds.has(normalizedId)) return 'running';
  return 'idle';
}

/**
 * Whether a `paratextBibleSendReceive.requestSync` rejection only says the request was taken out of
 * the queue. That is the outcome of a user action, not a failure to report.
 *
 * @param error What the request rejected with
 * @returns `true` if the rejection carries the removed-from-queue marker
 */
export function isSyncRequestRemovedError(error: unknown): boolean {
  return getErrorMessage(error).includes(SYNC_REQUEST_REMOVED_MARKER);
}
