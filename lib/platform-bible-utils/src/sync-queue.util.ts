/**
 * What a consumer knows about the backend's sync queue, and the pieces every reader of the
 * `paratextBibleSendReceive.getSyncQueue` command and `onSyncQueueChanged` event shares: the check
 * of the payload and the mapping to what a consumer reads. Free of React and PAPI, so the renderer,
 * the extension host and web views can all use it.
 */

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
};

/**
 * Whether a value read from the wire is a usable sync-queue snapshot. Checked rather than trusted:
 * the payload comes from another process, and a build may send another shape. `waitingProjectIds`
 * may be absent, `undefined`, `null` or a list of strings, and anything else makes the whole
 * snapshot unusable.
 *
 * @param value The raw payload of the command or event
 * @returns `true` if the value is a {@link SyncQueueValue}
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function isSyncQueueSnapshot(value: unknown): value is SyncQueueValue {
  if (typeof value !== 'object' || !value) return false;
  if (
    !('waitingProjectIds' in value) ||
    value.waitingProjectIds === undefined ||
    // The wire may send null for an absent list, so null has to be compared against
    // eslint-disable-next-line no-null/no-null
    value.waitingProjectIds === null
  )
    return true;
  return (
    Array.isArray(value.waitingProjectIds) &&
    value.waitingProjectIds.every((id) => typeof id === 'string')
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
  return { waitingProjectIds: value.waitingProjectIds ?? [] };
}
