import { useEffect, useState } from 'react';
import { useSetting } from '@renderer/hooks/papi-hooks';
import { sendCommand } from '@shared/services/command.service';

/**
 * Whether the onboarding tour should wait for the user's first Send/Receive: `true` while
 * Send/Receive is available and `platform.firstSyncState` is `'pending'`, `false` otherwise. The
 * setting is subscribed to, so the hold lifts the moment the backend records the first sync.
 *
 * Fails open: while availability is still loading, or if asking for it rejects, this is `false`, so
 * a tour is never held on an answer that may never arrive. Availability is only asked once the
 * state is `'pending'`, since no other state can hold the tour.
 */
export function useTourHeldForFirstSync(): boolean {
  const [firstSyncState] = useSetting('platform.firstSyncState', 'unknown');
  const isPending = firstSyncState === 'pending';
  const [isSendReceiveAvailable, setIsSendReceiveAvailable] = useState(false);

  useEffect(() => {
    if (!isPending) return undefined;
    let isCurrent = true;
    sendCommand('paratextBibleSendReceive.isAvailable')
      .then((available) => {
        if (isCurrent) setIsSendReceiveAvailable(available === true);
        return undefined;
      })
      .catch(() => {
        if (isCurrent) setIsSendReceiveAvailable(false);
      });
    return () => {
      isCurrent = false;
    };
  }, [isPending]);

  return isPending && isSendReceiveAvailable;
}

export default useTourHeldForFirstSync;
