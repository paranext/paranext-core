import papi, { logger } from '@papi/frontend';
import type { NetworkObjectDetails } from '@papi/core';
import { useEvent } from 'platform-bible-react';
import { getErrorMessage } from 'platform-bible-utils';
import type { SyncActivitySnapshot } from 'paratext-bible-send-receive';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Whether this user has any project of their own.
 *
 * - `unknown` — not settled: the lookup has not answered, failed or came back empty, or a sync is
 *   running or its state is not yet known. **Not** interchangeable with `none`.
 * - `none` — the lookup answered with no project of the user's own, and no sync is running that could
 *   bring one
 * - `some` — the lookup answered with at least one project of the user's own
 */
export type ProjectPresence = 'unknown' | 'none' | 'some';

/**
 * `projectInterface` a project must support to count: it can be opened in the Scripture editor.
 *
 * The toolbar picker (`src/renderer/hooks/use-project-picker-data.hook.ts`) keeps its own copy of
 * this literal. If you change this one, consider whether that one should change too.
 */
const PROJECT_INTERFACE = 'platformScripture.USJ_Chapter';

/**
 * `NetworkObjectDetails.objectType` of a project data provider factory. Core's
 * `PDP_FACTORY_OBJECT_TYPE` is not exported to extensions, so this mirrors its value.
 */
const PDP_FACTORY_OBJECT_TYPE = 'pdpFactory';

/** Collapses a burst of factory registrations (e.g. an extension reload) into one lookup. */
export const PDP_FACTORY_REGISTRATION_DEBOUNCE_MS = 200;

/**
 * How long to wait before retrying a lookup that failed. One factory failing fails the whole
 * fan-out, and a layering factory can time out at startup. Same policy as the toolbar picker.
 */
export const LOOKUP_RETRY_DELAY_MS = 5 * 1000;
/**
 * How many times to retry a failed lookup. A lookup triggered by a new project or factory event
 * starts a fresh budget.
 */
export const MAX_LOOKUP_RETRIES = 3;

/** How long to wait before asking for the sync activity again after the request failed. */
export const SYNC_ACTIVITY_SEED_RETRY_DELAY_MS = 3 * 1000;

/**
 * How many times to retry the sync activity seed. The realistic failure is a cold-start race with
 * the .NET process registering the command, which resolves in seconds; past this, the pushed
 * `onSyncActivityChanged` event is the only way the state becomes known.
 */
const MAX_SYNC_ACTIVITY_SEED_RETRIES = 10;

/**
 * How often to re-read the sync activity while a sync is running. Both hops that forward
 * `onSyncActivityChanged` are fire-and-forget, so a lost closing event would otherwise leave the
 * answer `unknown` until the next sync. Same interval as core's `sync-activity-service.ts`
 * watchdog.
 */
export const SYNC_ACTIVITY_RECHECK_INTERVAL_MS = 30 * 1000;

/**
 * ID of the sample WEB project, which `LocalParatextProjects.Initialize` (C#) installs whenever it
 * finds no projects. Fixed by its `Settings.xml` (`c-sharp/assets/WEB/Settings.xml`); upper-cased
 * because project IDs arrive in either case.
 */
const SAMPLE_PROJECT_ID = '32664DC3288A28DF2E2BB75DED887FC8F17A15FB';

/**
 * Whether the metadata is a project of the user's own: neither a resource (`isPublished`) nor the
 * sample project. A factory that omits `isPublished` is treated as unpublished, matching the
 * `platform.isPublished` default.
 */
function isOwnProject(metadata: { id: string; isPublished?: boolean }): boolean {
  return metadata.isPublished !== true && metadata.id.toUpperCase() !== SAMPLE_PROJECT_ID;
}

// Checked rather than trusted: the sync-activity types were declared ahead of the Paratext 10 change
// that implements them, so a build may send another shape.
function isSyncActivitySnapshot(value: unknown): value is Pick<SyncActivitySnapshot, 'isSyncing'> {
  return (
    typeof value === 'object' &&
    !!value &&
    'isSyncing' in value &&
    typeof value.isSyncing === 'boolean'
  );
}

/**
 * Reports whether this user has any project of their own, as a tri-state that keeps "could not
 * tell" distinct from "none". Only `none` supports telling the user they have no projects, so every
 * uncertain input resolves to `unknown`:
 *
 * - A sync that is running may be about to download the user's first project, so projects are looked
 *   up only once sync activity is known to be idle. Sync activity comes from
 *   `paratextBibleSendReceive.getSyncActivity` / `onSyncActivityChanged`, which see every sync
 *   path, but only a Paratext 10 build reports real activity; Platform.Bible always answers idle.
 * - An empty answer reads `unknown`: core installs a sample project whenever it finds none, so empty
 *   means the Paratext project factory has not answered yet. Its registration
 *   (`object:onDidCreateNetworkObject`) triggers another lookup. A user who deletes the sample
 *   mid-session also reads `unknown` until core reinstalls it on the next launch.
 * - A failed lookup reads `unknown` and is retried, a bounded number of times.
 *
 * Live: a project arriving later in the session (`platform.onDidChangeProjects`) triggers a new
 * lookup, which replaces `none` once it answers.
 *
 * Each lookup fans out to every project data provider factory in every process, so pass `enabled:
 * false` whenever the answer is not being shown. A disabled hook makes no requests.
 */
export function useProjectPresence({ enabled }: { enabled: boolean }): ProjectPresence {
  const [lookupAnswer, setLookupAnswer] = useState<ProjectPresence>('unknown');
  // `undefined` until the first snapshot arrives: not knowing is not the same as idle
  const [isSyncing, setIsSyncing] = useState<boolean | undefined>(undefined);
  const [lookupRequestCount, setLookupRequestCount] = useState(0);
  const requestLookup = useCallback(() => setLookupRequestCount((count) => count + 1), []);
  const failedLookupCountRef = useRef(0);
  // A new event is new information, so its lookup gets a fresh retry budget
  const requestLookupForEvent = useCallback(() => {
    failedLookupCountRef.current = 0;
    requestLookup();
  }, [requestLookup]);
  // Counts sync-activity events, so a read that was in flight when one arrived can tell it is older
  const syncEventCountRef = useRef(0);

  const isIdle = enabled && isSyncing === false;

  useEffect(() => {
    // An answer from before a sync or a disabled stretch may be stale, so it is dropped rather than
    // kept until the next lookup answers.
    if (!isIdle) {
      setLookupAnswer('unknown');
      return undefined;
    }
    let isCurrent = true;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    (async () => {
      try {
        const allMetadata = await papi.projectLookup.getMetadataForAllProjects({
          includeProjectInterfaces: [PROJECT_INTERFACE],
        });
        if (!isCurrent) return;
        failedLookupCountRef.current = 0;
        if (allMetadata.length === 0) setLookupAnswer('unknown');
        else setLookupAnswer(allMetadata.some(isOwnProject) ? 'some' : 'none');
      } catch (e) {
        // A failed lookup is not evidence either way, and the previous answer may be out of date.
        logger.warn(`Could not determine whether the user has any projects: ${getErrorMessage(e)}`);
        if (!isCurrent) return;
        setLookupAnswer('unknown');
        if (failedLookupCountRef.current < MAX_LOOKUP_RETRIES) {
          failedLookupCountRef.current += 1;
          retryTimer = setTimeout(requestLookup, LOOKUP_RETRY_DELAY_MS);
        }
      }
    })();
    return () => {
      isCurrent = false;
      clearTimeout(retryTimer);
    };
  }, [isIdle, lookupRequestCount, requestLookup]);

  const onDidChangeProjects = useMemo(
    () => papi.network.getNetworkEvent('platform.onDidChangeProjects'),
    [],
  );
  useEvent(
    onDidChangeProjects,
    useCallback(() => {
      if (isIdle) requestLookupForEvent();
    }, [isIdle, requestLookupForEvent]),
  );

  const onDidCreateNetworkObject = useMemo(
    () => papi.network.getNetworkEvent('object:onDidCreateNetworkObject'),
    [],
  );
  const factoryRegistrationTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEvent(
    onDidCreateNetworkObject,
    useCallback(
      ({ objectType }: NetworkObjectDetails) => {
        if (!isIdle || objectType !== PDP_FACTORY_OBJECT_TYPE) return;
        clearTimeout(factoryRegistrationTimerRef.current);
        factoryRegistrationTimerRef.current = setTimeout(
          requestLookupForEvent,
          PDP_FACTORY_REGISTRATION_DEBOUNCE_MS,
        );
      },
      [isIdle, requestLookupForEvent],
    ),
  );
  useEffect(() => () => clearTimeout(factoryRegistrationTimerRef.current), []);

  /** Reads the sync activity. Rejects if the request fails. */
  const readSyncActivity = useCallback(async (isStillWanted: () => boolean) => {
    const eventCountAtRequest = syncEventCountRef.current;
    const snapshot = await papi.commands.sendCommand('paratextBibleSendReceive.getSyncActivity');
    // An event that arrived while this read was in flight is newer than the read, so it wins.
    if (
      isStillWanted() &&
      syncEventCountRef.current === eventCountAtRequest &&
      isSyncActivitySnapshot(snapshot)
    )
      setIsSyncing(snapshot.isSyncing);
  }, []);

  // The event carries no replay, so the state is seeded from the command as well.
  useEffect(() => {
    if (!enabled) {
      setIsSyncing(undefined);
      return undefined;
    }
    let isCurrent = true;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    const seed = async (retriesLeft: number) => {
      try {
        await readSyncActivity(() => isCurrent);
      } catch (e) {
        if (!isCurrent) return;
        logger.debug(`Could not read the sync activity: ${getErrorMessage(e)}`);
        if (retriesLeft > 0)
          retryTimer = setTimeout(() => seed(retriesLeft - 1), SYNC_ACTIVITY_SEED_RETRY_DELAY_MS);
      }
    };
    seed(MAX_SYNC_ACTIVITY_SEED_RETRIES);
    return () => {
      isCurrent = false;
      clearTimeout(retryTimer);
    };
  }, [enabled, readSyncActivity]);

  useEffect(() => {
    if (!enabled || isSyncing !== true) return undefined;
    let isCurrent = true;
    const recheckTimer = setInterval(() => {
      readSyncActivity(() => isCurrent).catch((e) =>
        logger.debug(`Could not re-read the sync activity: ${getErrorMessage(e)}`),
      );
    }, SYNC_ACTIVITY_RECHECK_INTERVAL_MS);
    return () => {
      isCurrent = false;
      clearInterval(recheckTimer);
    };
  }, [enabled, isSyncing, readSyncActivity]);

  const onSyncActivityChanged = useMemo(
    () => papi.network.getNetworkEvent('paratextBibleSendReceive.onSyncActivityChanged'),
    [],
  );
  useEvent(
    onSyncActivityChanged,
    useCallback(
      (snapshot: unknown) => {
        if (!enabled || !isSyncActivitySnapshot(snapshot)) return;
        syncEventCountRef.current += 1;
        setIsSyncing(snapshot.isSyncing);
      },
      [enabled],
    ),
  );

  return isIdle ? lookupAnswer : 'unknown';
}

export default useProjectPresence;
