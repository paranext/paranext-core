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

/** The JSON-RPC error code for "no handler is registered for this method". */
const JSON_RPC_METHOD_NOT_FOUND_CODE = -32601;

/**
 * Whether a rejection of `command` says no handler is registered for it, e.g. because the
 * Send/Receive extension is not running. Extensions cannot import each other or the shared RPC
 * helpers, so this matches the message the network service throws for an error response: `JSON-RPC
 * Request error (-32601): ...`, which names the request type.
 *
 * @param error What the command rejected with
 * @param command The command that was sent
 * @returns `true` if the rejection is a method-not-found error naming `command`
 */
export function isCommandNotRegisteredError(error: unknown, command: string): boolean {
  const message = getErrorMessage(error);
  return (
    message.includes(`JSON-RPC Request error (${JSON_RPC_METHOD_NOT_FOUND_CODE})`) &&
    message.includes(command)
  );
}
