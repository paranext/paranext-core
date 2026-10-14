import { seedWithRetry } from '@renderer/services/seed-with-retry.util';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { normalizeProjectId } from '@shared/models/project-lookup.service-model';
import { getErrorMessage, isString } from 'platform-bible-utils';
import { useEvent } from 'platform-bible-react';
import type { UnsyncedChangesSnapshot } from 'paratext-bible-send-receive';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * The projects out of step with the Send/Receive server, in each direction, as normalized,
 * de-duplicated, sorted ids. A project can appear in both lists.
 */
export type UnsyncedChangeSets = {
  /** Projects whose local repository holds changes not yet sent. */
  toSend: readonly string[];
  /** Projects for which the server holds changes not yet received. */
  toReceive: readonly string[];
  /**
   * Whether the backend is still rechecking after a sync: true from a sync's start until the local
   * recheck and the server lookup that follow its end have both finished. While true, the lists can
   * still describe the moment before that sync. An absent or non-boolean value on the wire (a
   * backend that predates the field) reads as `false`.
   */
  isRechecking: boolean;
};

/** Whether a value read off the wire is an array of strings. */
function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

/**
 * Whether a payload read off the wire carries both id lists this hook reads. It is untrusted data
 * from another process, so the shape is checked rather than assumed; a payload missing either list
 * is rejected whole rather than read as "nothing in that direction".
 */
function isValidSnapshot(value: unknown): value is UnsyncedChangesSnapshot {
  return (
    typeof value === 'object' &&
    !!value &&
    'toSend' in value &&
    isStringArray(value.toSend) &&
    'toReceive' in value &&
    isStringArray(value.toReceive)
  );
}

/** Ids as a normalized, de-duplicated, sorted, frozen list. */
function toIdSet(ids: readonly string[]): readonly string[] {
  return Object.freeze([...new Set(ids.map(normalizeProjectId))].sort());
}

/** Whether two sorted id lists hold the same ids. */
function isSameSet(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((id, index) => id === b[index]);
}

/**
 * Whether both lists and the recheck flag are unchanged, so the previous value can keep its
 * identity.
 */
function isSameSets(a: UnsyncedChangeSets | undefined, b: UnsyncedChangeSets): boolean {
  return (
    !!a &&
    a.isRechecking === b.isRechecking &&
    isSameSet(a.toSend, b.toSend) &&
    isSameSet(a.toReceive, b.toReceive)
  );
}

/**
 * The projects out of step with the Send/Receive server — those whose local repository holds
 * changes not yet sent, and those for which the server holds changes not yet received — or
 * `undefined` while that is not known: before the seed answers, and after the seed's retry window
 * closes with no answer. `undefined` is not "nothing is unsynced": a consumer must not make that
 * claim on the strength of a failed read.
 *
 * Seeded from `paratextBibleSendReceive.getUnsyncedChanges` because
 * `paratextBibleSendReceive.onUnsyncedChangesChanged` fires only when either list changes, plus one
 * baseline per backend start, and carries no replay for a subscriber that arrives later. An event
 * that lands while the seed is in flight wins: it describes a later moment than the snapshot does.
 * If the backend stays unreachable for longer than the seed's retry window during a cold start,
 * this stays `undefined` until the next event arrives. The same lists and flag arriving again keep
 * the same object, so consumers can depend on identity; a change of the flag alone yields a new
 * object that keeps the previous list arrays, so a consumer keyed on a list does not re-run.
 *
 * {@link UnsyncedChangeSets.isRechecking} says whether the lists can still describe the moment
 * before a sync: the backend sets it from a sync's start until the recheck that follows its end has
 * finished, and pushes the snapshot that clears it even when neither list changed.
 */
export function useUnsyncedChanges(): UnsyncedChangeSets | undefined {
  const [sets, setSets] = useState<UnsyncedChangeSets | undefined>(undefined);
  /** Once an event has been seen the seed's snapshot is stale and must not overwrite it. */
  const hasAppliedEventRef = useRef(false);
  const runRef = useRef(0);

  const apply = useCallback((snapshot: UnsyncedChangesSnapshot) => {
    const next: UnsyncedChangeSets = Object.freeze({
      toSend: toIdSet(snapshot.toSend),
      toReceive: toIdSet(snapshot.toReceive),
      isRechecking: snapshot.isRechecking === true,
    });
    setSets((previous) => {
      if (isSameSets(previous, next)) return previous;
      if (!previous) return next;
      // Keeps each list's identity while its ids are unchanged, so a flag-only change does not
      // re-run anything keyed on a list.
      return Object.freeze({
        toSend: isSameSet(previous.toSend, next.toSend) ? previous.toSend : next.toSend,
        toReceive: isSameSet(previous.toReceive, next.toReceive)
          ? previous.toReceive
          : next.toReceive,
        isRechecking: next.isRechecking,
      });
    });
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
        // No `onExhausted`: the seed gives up only when nothing has answered, so `sets` is still
        // the `undefined` that says the lists are not known.
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

  return sets;
}

export default useUnsyncedChanges;
