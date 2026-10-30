/**
 * What a consumer knows about the backend's sync activity, and the pieces every reader of the
 * `paratextBibleSendReceive.getSyncActivity` command and `onSyncActivityChanged` event shares: the
 * check of the payload, the mapping to what a consumer reads, and the recheck rule. Free of React
 * and PAPI, so the renderer, the extension host and web views can all use it.
 */

/**
 * The part of a sync-activity snapshot a consumer relies on, as it arrives on the wire.
 * `projectIds` may be absent (a build that predates it) or `null` (the backend cannot name the
 * projects yet); both mean "no project is named".
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export type SyncActivityValue = {
  /**
   * Whether a sync is running, whichever path started it
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  isSyncing: boolean;
  /**
   * IDs of the projects being synced, when the backend names them
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  projectIds?: readonly string[] | null;
  /**
   * Entry uids of the resources the running sync will update, when the backend names them
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  resourceIds?: readonly string[] | null;
};

/**
 * What a consumer knows about the backend sync activity.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export type SyncActivity = {
  /**
   * Whether a sync is running. `false` while the answer is not known: unknown never disables
   * anything.
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  isSyncing: boolean;
  /**
   * IDs of the projects being synced. Empty when no sync runs or the backend does not name them.
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  projectIds: readonly string[];
  /**
   * Entry uids of the resources the running sync will update. Empty when no sync runs or the
   * backend does not name them.
   *
   * @experimental This field is unstable and may change or disappear without notice
   */
  resourceIds: readonly string[];
};

/**
 * Whether a value read from the wire is a usable sync-activity snapshot. Checked rather than
 * trusted: the payload comes from another process, and a build may send another shape. `isSyncing`
 * must be a boolean; `projectIds` and `resourceIds` may each be absent, `undefined`, `null` or a
 * list of strings, and anything else makes the whole snapshot unusable.
 *
 * @param value The raw payload of the command or event
 * @returns `true` if the value is a {@link SyncActivityValue}
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function isSyncActivitySnapshot(value: unknown): value is SyncActivityValue {
  if (typeof value !== 'object' || !value) return false;
  if (!('isSyncing' in value) || typeof value.isSyncing !== 'boolean') return false;
  return (
    isOptionalStringList('projectIds' in value ? value.projectIds : undefined) &&
    isOptionalStringList('resourceIds' in value ? value.resourceIds : undefined)
  );
}

/** Whether a wire value is absent, `undefined`, `null` or a list of strings */
function isOptionalStringList(list: unknown): boolean {
  // The wire may send null for an absent list, so null has to be compared against
  // eslint-disable-next-line no-null/no-null
  if (list === undefined || list === null) return true;
  return Array.isArray(list) && list.every((id) => typeof id === 'string');
}

/**
 * The activity a consumer reads while nothing is known: no sync, no projects. A constant, so a
 * consumer that memoizes on it does not re-render.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const IDLE_SYNC_ACTIVITY: SyncActivity = Object.freeze({
  isSyncing: false,
  projectIds: Object.freeze([]),
  resourceIds: Object.freeze([]),
});

/**
 * Maps the latest snapshot to what a consumer reads. Falls back to {@link IDLE_SYNC_ACTIVITY} while
 * no snapshot is known, so a missing, rejected or malformed answer never disables anything. The
 * project ids are only carried while a sync runs.
 *
 * @param value The latest valid snapshot, or `undefined` while none is known
 * @returns The activity to show
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function toSyncActivity(value: SyncActivityValue | undefined): SyncActivity {
  if (value === undefined) return IDLE_SYNC_ACTIVITY;
  return {
    isSyncing: value.isSyncing,
    projectIds: value.isSyncing ? (value.projectIds ?? []) : [],
    resourceIds: value.isSyncing ? (value.resourceIds ?? []) : [],
  };
}

/**
 * How often to re-read the sync activity while a sync is reported as running. The events that
 * forward `onSyncActivityChanged` are fire-and-forget, so a lost closing event would otherwise
 * leave a finished sync reported as running.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export const SYNC_ACTIVITY_RECHECK_INTERVAL_MS = 30_000;

/**
 * Whether the sync activity needs re-reading on a timer: only while a known snapshot says a sync is
 * running. Never while idle or unknown.
 *
 * @param value The latest valid snapshot, or `undefined` while none is known
 * @returns `true` while a sync is reported as running
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function shouldRecheckSyncActivity(value: SyncActivityValue | undefined): boolean {
  return value?.isSyncing === true;
}
