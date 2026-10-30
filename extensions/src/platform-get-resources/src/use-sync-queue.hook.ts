import papi, { logger } from '@papi/frontend';
import { useEventSeededState } from 'platform-bible-react';
import { getErrorMessage } from 'platform-bible-utils';
import {
  isSyncQueueSnapshot,
  toSyncQueue,
  type SyncQueue,
  type SyncQueueValue,
} from 'platform-bible-utils/experimental';
import { useMemo } from 'react';

const readSyncQueue = () =>
  papi.commands.sendCommand('paratextBibleSendReceive.getSyncQueue').catch((e) => {
    logger.debug(`Home could not read the sync queue: ${getErrorMessage(e)}`);
    throw e;
  });

/**
 * Follows the Send/Receive extension's sync queue: the projects waiting for a later sync run. Falls
 * back to an empty queue whenever the answer is unknown, rejected or malformed, so a missing answer
 * never shows a project as waiting.
 *
 * Hidden case: nothing to defer — the waiting list is data, so a hidden Home shows the current list
 * when it is next shown.
 */
export function useSyncQueue(): SyncQueue {
  const event = useMemo(
    () => papi.network.getNetworkEvent('paratextBibleSendReceive.onSyncQueueChanged'),
    [],
  );
  const { value } = useEventSeededState<SyncQueueValue>({
    read: readSyncQueue,
    event,
    isValid: isSyncQueueSnapshot,
  });

  return useMemo(() => toSyncQueue(value), [value]);
}

export default useSyncQueue;
