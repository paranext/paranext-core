import papi, { logger } from '@papi/frontend';
import { useEventSeededState } from 'platform-bible-react';
import { getErrorMessage } from 'platform-bible-utils';
import {
  isSyncActivitySnapshot,
  shouldRecheckSyncActivity,
  SYNC_ACTIVITY_RECHECK_INTERVAL_MS,
  toSyncActivity,
  type SyncActivity,
  type SyncActivityValue,
} from 'platform-bible-utils/experimental';
import { useMemo } from 'react';

const readSyncActivity = () =>
  papi.commands.sendCommand('paratextBibleSendReceive.getSyncActivity').catch((e) => {
    logger.debug(`Home could not read the sync activity: ${getErrorMessage(e)}`);
    throw e;
  });

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
    shouldRecheck: shouldRecheckSyncActivity,
    recheckIntervalMs: SYNC_ACTIVITY_RECHECK_INTERVAL_MS,
  });

  return useMemo(() => toSyncActivity(value), [value]);
}

export default useSyncActivity;
