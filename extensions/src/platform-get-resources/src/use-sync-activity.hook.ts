import papi, { logger } from '@papi/frontend';
import { useEventSeededState } from 'platform-bible-react';
import { getErrorMessage } from 'platform-bible-utils';
import type { SyncActivitySnapshot } from 'paratext-bible-send-receive';
import { useMemo } from 'react';

/** What Home knows about the backend sync activity (any sync path, not only Home's own). */
export type SyncActivity = {
  /** Whether a sync is running. `false` while the answer is not known: unknown never disables. */
  isSyncing: boolean;
  /** IDs of the projects being synced. Empty when the backend does not name them. */
  projectIds: readonly string[];
};

/**
 * How often to re-read the sync activity while a sync is reported as running. The events that
 * forward `onSyncActivityChanged` are fire-and-forget, so a lost closing event would otherwise
 * leave a finished sync reported as running.
 */
export const SYNC_ACTIVITY_RECHECK_INTERVAL_MS = 30_000;

const IDLE_ACTIVITY: SyncActivity = { isSyncing: false, projectIds: [] };

type SyncActivityValue = Pick<SyncActivitySnapshot, 'isSyncing' | 'projectIds'>;

/**
 * Checked rather than trusted: the snapshot is wire data from another process, and only a Paratext
 * 10 build serves it, so a build may send another shape. `projectIds` may be absent or null.
 */
export function isSyncActivitySnapshot(value: unknown): value is SyncActivityValue {
  if (typeof value !== 'object' || !value) return false;
  if (!('isSyncing' in value) || typeof value.isSyncing !== 'boolean') return false;
  // The wire may send null for an absent list, so null has to be compared against
  // eslint-disable-next-line no-null/no-null
  if (!('projectIds' in value) || value.projectIds === undefined || value.projectIds === null)
    return true;
  return Array.isArray(value.projectIds) && value.projectIds.every((id) => typeof id === 'string');
}

const readSyncActivity = () =>
  papi.commands.sendCommand('paratextBibleSendReceive.getSyncActivity').catch((e) => {
    logger.debug(`Home could not read the sync activity: ${getErrorMessage(e)}`);
    throw e;
  });

const shouldRecheck = (snapshot: SyncActivityValue | undefined) => snapshot?.isSyncing === true;

/**
 * Follows the backend sync activity, which sees every sync path. Falls back to idle whenever the
 * activity is unknown, rejected or malformed, so it never disables anything on missing
 * information.
 */
export function useSyncActivity(): SyncActivity {
  const event = useMemo(
    () => papi.network.getNetworkEvent('paratextBibleSendReceive.onSyncActivityChanged'),
    [],
  );
  const { value } = useEventSeededState<SyncActivityValue>({
    read: readSyncActivity,
    event,
    isValid: isSyncActivitySnapshot,
    shouldRecheck,
    recheckIntervalMs: SYNC_ACTIVITY_RECHECK_INTERVAL_MS,
  });

  return useMemo(() => {
    if (value === undefined) return IDLE_ACTIVITY;
    return {
      isSyncing: value.isSyncing,
      projectIds: value.isSyncing ? (value.projectIds ?? []) : [],
    };
  }, [value]);
}

export default useSyncActivity;
