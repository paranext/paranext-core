import { network } from '@papi/frontend';
import { useEvent } from 'platform-bible-react';
import { isString } from 'platform-bible-utils';
import { useCallback, useRef } from 'react';

/**
 * Network event the backend emits with a full snapshot each time the Send/Receive write gate arms
 * or disarms.
 */
const SYNC_WRITE_LOCK_CHANGED_EVENT = 'paratextBibleSendReceive.onSyncWriteLockChanged';

/**
 * Whether a write-gate snapshot says the gate is not blocking `projectId`. The payload is untrusted
 * wire data: a malformed one answers `false`, since a signal that cannot be read is no reason to
 * retry a request the gate may still refuse.
 */
export function isProjectUnblockedBySnapshot(snapshot: unknown, projectId: string): boolean {
  if (typeof snapshot !== 'object' || !snapshot) return false;
  if (!('isBlocking' in snapshot) || !('projectIds' in snapshot)) return false;
  const { isBlocking, projectIds } = snapshot;
  if (typeof isBlocking !== 'boolean' || !Array.isArray(projectIds) || !projectIds.every(isString))
    return false;
  if (!isBlocking) return true;
  const upperCaseProjectId = projectId.toUpperCase();
  return !projectIds.some((blockedId) => blockedId.toUpperCase() === upperCaseProjectId);
}

/**
 * Calls `onReleased` whenever the backend announces a write-gate state in which the automatic sync
 * is not blocking `projectId`. Requests the gate refused during a sync can be retried then.
 *
 * The announcement fires on every arm and disarm, including ones for other projects, so callers
 * should retry only when they know a request was refused.
 *
 * @param projectId The project whose requests were refused; with `undefined`, never calls back
 * @param onReleased Called with no arguments; need not be memoized
 */
export function useOnSyncWriteLockReleased(
  projectId: string | undefined,
  onReleased: () => void,
): void {
  const onReleasedRef = useRef(onReleased);
  onReleasedRef.current = onReleased;

  useEvent(
    network.getNetworkEvent(SYNC_WRITE_LOCK_CHANGED_EVENT),
    useCallback(
      (snapshot: unknown) => {
        if (projectId && isProjectUnblockedBySnapshot(snapshot, projectId)) onReleasedRef.current();
      },
      [projectId],
    ),
  );
}
