import { seedWithRetry } from '@renderer/services/seed-with-retry.util';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { normalizeProjectId } from '@shared/models/project-lookup.service-model';
import { getErrorMessage } from 'platform-bible-utils';
import { useEvent } from 'platform-bible-react';
import type { UnsyncedChangesSnapshot } from 'paratext-bible-send-receive';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Whether a payload read off the wire carries the id list this hook reads. It is untrusted data
 * from another process, so the shape is checked rather than assumed.
 */
function isValidSnapshot(value: unknown): value is UnsyncedChangesSnapshot {
  return (
    typeof value === 'object' &&
    !!value &&
    'projectIds' in value &&
    Array.isArray(value.projectIds) &&
    value.projectIds.every((id: unknown) => typeof id === 'string')
  );
}

/** The snapshot's ids as a normalized, de-duplicated, sorted, frozen list. */
function toIdSet(snapshot: UnsyncedChangesSnapshot): readonly string[] {
  return Object.freeze([...new Set(snapshot.projectIds.map(normalizeProjectId))].sort());
}

/** Whether two sorted id lists hold the same ids, so an unchanged set keeps its identity. */
function isSameSet(a: readonly string[] | undefined, b: readonly string[]): boolean {
  return !!a && a.length === b.length && a.every((id, index) => id === b[index]);
}

/**
 * Normalized ids of the projects whose local repository holds changes Send/Receive has not yet
 * sent, or `undefined` while that is not known — before the seed answers, and after the seed's
 * retry window closes with no answer. `undefined` is not "nothing is unsynced": a consumer must not
 * make that claim on the strength of a failed read.
 *
 * Seeded from `paratextBibleSendReceive.getUnsyncedChanges` because
 * `paratextBibleSendReceive.onUnsyncedChangesChanged` fires only when the set changes, plus one
 * baseline per backend start, and carries no replay for a subscriber that arrives later. An event
 * that lands while the seed is in flight wins: it describes a later moment than the snapshot does.
 * If the backend stays unreachable for longer than the seed's retry window during a cold start,
 * this stays `undefined` until the next event arrives. The same set arriving again keeps the same
 * array instance, so consumers can depend on identity.
 */
export function useUnsyncedChanges(): readonly string[] | undefined {
  const [ids, setIds] = useState<readonly string[] | undefined>(undefined);
  /** Once an event has been seen the seed's snapshot is stale and must not overwrite it. */
  const hasAppliedEventRef = useRef(false);
  const runRef = useRef(0);

  const apply = useCallback((snapshot: UnsyncedChangesSnapshot) => {
    const next = toIdSet(snapshot);
    setIds((previous) => (isSameSet(previous, next) ? previous : next));
  }, []);

  useEffect(
    () =>
      seedWithRetry<UnsyncedChangesSnapshot>({
        read: async () => {
          try {
            const snapshot = await sendCommand('paratextBibleSendReceive.getUnsyncedChanges');
            if (isValidSnapshot(snapshot)) return snapshot;
            logger.warn('getUnsyncedChanges answered in an unexpected shape; ignoring it');
            return undefined;
          } catch (e) {
            // The command may not be registered yet (cold start); the seed retries.
            logger.debug(`getUnsyncedChanges not answered yet: ${getErrorMessage(e)}`);
            return undefined;
          }
        },
        apply,
        // No `onExhausted`: the seed gives up only when nothing has answered, so `ids` is still the
        // `undefined` that says the set is not known.
        hasEventApplied: () => hasAppliedEventRef.current,
        runRef,
        logLabel: 'unsynced changes',
      }),
    [apply],
  );

  const onChanged = useMemo(
    () => getNetworkEvent('paratextBibleSendReceive.onUnsyncedChangesChanged'),
    [],
  );
  useEvent(
    onChanged,
    useCallback(
      (snapshot: UnsyncedChangesSnapshot) => {
        if (!isValidSnapshot(snapshot)) {
          logger.warn('onUnsyncedChangesChanged carried an unexpected shape; ignoring it');
          return;
        }
        hasAppliedEventRef.current = true;
        apply(snapshot);
      },
      [apply],
    ),
  );

  return ids;
}

export default useUnsyncedChanges;
