import { endsWith, includes, slice, stringLength } from './string-util';
import isOptionalStringList from './optional-string-list.util';
import { getErrorMessage } from './util';

/**
 * What a consumer knows about the backend's sync queue, and the pieces every reader of the
 * `paratextBibleSendReceive.getSyncQueue` command and `onSyncQueueChanged` event shares: the check
 * of the payload and the mapping to what a consumer reads. Free of React and PAPI, so the renderer,
 * the extension host and web views can all use it.
 */

/**
 * Id of the command that asks the sync queue for a sync
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const REQUEST_SYNC_COMMAND = 'paratextBibleSendReceive.requestSync';

/**
 * Id of the command that asks the user whether to cancel the sync that is running
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const CANCEL_SYNC_PROMPT_COMMAND = 'paratextBibleSendReceive.cancelSyncPrompt';

/**
 * Ends the message of a `paratextBibleSendReceive.requestSync` rejection for a request that never
 * ran because it was removed from the sync queue, or dropped when the queue was disposed at quit.
 * An error that crosses papi arrives as a plain error carrying only its message, so this stable
 * token is how a caller recognizes that outcome.
 *
 * @experimental This is unstable and may change or disappear without notice
 */
export const SYNC_REQUEST_REMOVED_MARKER = ' (SR_REMOVED)';

/**
 * Ends the message of a `paratextBibleSendReceive` refusal that only says the sync queue could not
 * take the work right now because a sync is busy. An error that crosses papi arrives with only its
 * message, sometimes behind a JSON-RPC prefix, so this stable token is how a caller recognizes a
 * busy refusal; the error code alone does not say so.
 *
 * @experimental This is unstable and may change or disappear without notice
 */
export const SYNC_BUSY_MARKER = '(SYNC_BUSY)';

/**
 * Whether a rejection is a busy refusal: its message, trimmed at the end, ends with
 * {@link SYNC_BUSY_MARKER}. The error code is ignored, and anything that carries no such message
 * (including a non-error value) is not a busy refusal.
 *
 * @param error What the call rejected with
 * @returns `true` if the message ends with the busy marker
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function isSyncBusyError(error: unknown): boolean {
  return endsWith(getErrorMessage(error).trimEnd(), SYNC_BUSY_MARKER);
}

/**
 * Removes {@link SYNC_BUSY_MARKER} and the whitespace around it from the end of a message, leaving
 * the readable text. Only the end is touched, so a message without the marker (or with it in the
 * middle) comes back unchanged, and applying it twice gives the same result as applying it once.
 *
 * @param message A message that may end with the busy marker
 * @returns The message without a trailing busy marker
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function withoutSyncBusyMarker(message: string): string {
  const trimmed = message.trimEnd();
  if (!endsWith(trimmed, SYNC_BUSY_MARKER)) return message;
  return slice(trimmed, 0, stringLength(trimmed) - stringLength(SYNC_BUSY_MARKER)).trimEnd();
}

/**
 * Whether a `paratextBibleSendReceive.requestSync` rejection only says the request was taken out of
 * the queue. That is the outcome of a user action, not a failure to report. It matches the marker
 * anywhere in the message, so an error rebuilt from the removed error's message still matches.
 *
 * @param error What the request rejected with
 * @returns `true` if the rejection carries {@link SYNC_REQUEST_REMOVED_MARKER}
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function isSyncRequestRemovedError(error: unknown): boolean {
  return includes(getErrorMessage(error), SYNC_REQUEST_REMOVED_MARKER);
}

/**
 * The part of a sync-queue snapshot a consumer relies on, as it arrives on the wire.
 * `waitingProjectIds` may be absent or `null`; both mean "no project is waiting".
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export type SyncQueueValue = {
  /**
   * IDs of the projects waiting for a later sync run, in the order they will run
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  waitingProjectIds?: readonly string[] | null;
  /**
   * IDs of the projects in the sync run under way. Absent from a build that predates the field;
   * absent and `null` both mean "none is known to be running".
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  runningProjectIds?: readonly string[] | null;
};

/**
 * What a consumer knows about the backend sync queue.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export type SyncQueue = {
  /**
   * IDs of the projects waiting for a later sync run. Empty when nothing waits or the answer is not
   * known: unknown never disables anything.
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  waitingProjectIds: readonly string[];
  /**
   * IDs of the projects in the sync run under way. Empty when none runs or the answer is not known.
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  runningProjectIds: readonly string[];
};

/**
 * Whether a value read from the wire is a usable sync-queue snapshot. Checked rather than trusted:
 * the payload comes from another process, and a build may send another shape. `waitingProjectIds`
 * and `runningProjectIds` are each checked on their own: either may be absent, `undefined`, `null`
 * or a list of strings, and anything else makes the whole snapshot unusable.
 *
 * @param value The raw payload of the command or event
 * @returns `true` if the value is a {@link SyncQueueValue}
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function isSyncQueueSnapshot(value: unknown): value is SyncQueueValue {
  if (typeof value !== 'object' || !value) return false;
  return (
    isOptionalStringList('waitingProjectIds' in value ? value.waitingProjectIds : undefined) &&
    isOptionalStringList('runningProjectIds' in value ? value.runningProjectIds : undefined)
  );
}

/**
 * The queue a consumer reads while nothing is known: nothing waits. A constant, so a consumer that
 * memoizes on it does not re-render.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const IDLE_SYNC_QUEUE: SyncQueue = Object.freeze({
  waitingProjectIds: Object.freeze([]),
  runningProjectIds: Object.freeze([]),
});

/**
 * Maps the latest snapshot to what a consumer reads. Falls back to {@link IDLE_SYNC_QUEUE} while no
 * snapshot is known, so a missing, rejected or malformed answer never disables anything.
 *
 * @param value The latest valid snapshot, or `undefined` while none is known
 * @returns The queue to show
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function toSyncQueue(value: SyncQueueValue | undefined): SyncQueue {
  if (value === undefined) return IDLE_SYNC_QUEUE;
  return {
    waitingProjectIds: value.waitingProjectIds ?? [],
    runningProjectIds: value.runningProjectIds ?? [],
  };
}
