import { normalizeProjectId } from 'platform-bible-utils';

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
