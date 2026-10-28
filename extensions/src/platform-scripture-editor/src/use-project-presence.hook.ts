import papi, { logger } from '@papi/frontend';
import type { IProjectDataProviderFactory, NetworkObjectDetails } from '@papi/core';
import { useEvent, useEventSeededState } from 'platform-bible-react';
import { getErrorMessage } from 'platform-bible-utils';
import type { SyncActivitySnapshot } from 'paratext-bible-send-receive';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Whether this user has any project of their own.
 *
 * - `unknown` — not settled: the lookup has not answered or failed, it came back empty without the C#
 *   Paratext project factory confirming it has no projects, or a sync is running or its state is
 *   not yet known. **Not** interchangeable with `none`.
 * - `none` — the lookup found no project of the user's own (an empty answer only once the C# Paratext
 *   project factory, asked directly, also has none), and no sync is running that could bring one
 * - `some` — the lookup answered with at least one project of the user's own
 */
export type ProjectPresence = 'unknown' | 'none' | 'some';

/**
 * `projectInterface` a project must support to count: it can be opened in the Scripture editor.
 *
 * The toolbar picker (`src/renderer/hooks/use-project-picker-data.hook.ts`) and the startup
 * readiness gate (`src/main/startup-readiness.util.ts`) each keep their own copy of this literal.
 * If you change this one, consider whether those should change too.
 */
const PROJECT_INTERFACE = 'platformScripture.USJ_Chapter';

/**
 * `NetworkObjectDetails.objectType` of a project data provider factory. Core's
 * `PDP_FACTORY_OBJECT_TYPE` is not exported to extensions, so this mirrors its value.
 */
const PDP_FACTORY_OBJECT_TYPE = 'pdpFactory';

/**
 * Network object ID of the C# factory for the user's Paratext projects:
 * `platform.{PDPF_NAME}-pdpf`, with `PDPF_NAME` from
 * `c-sharp/Projects/ParatextProjectDataProviderFactory.cs`. It scans the projects folder before it
 * registers or answers, so its list is complete.
 *
 * `src/main/startup-readiness.util.ts` keeps its own copy of this literal; keep them in step.
 */
export const PARATEXT_PDP_FACTORY_ID = 'platform.Paratext-pdpf';

/** Collapses a burst of factory registrations (e.g. an extension reload) into one lookup. */
export const PDP_FACTORY_REGISTRATION_DEBOUNCE_MS = 200;

/**
 * How long to wait before retrying a lookup that failed. One factory failing fails the whole
 * fan-out, and a layering factory can time out at startup. Same policy as the toolbar picker.
 */
export const LOOKUP_RETRY_DELAY_MS = 5 * 1000;
/**
 * How many times to retry a failed lookup. A lookup triggered by a new project or factory event, or
 * resuming after a sync or a disabled stretch, starts a fresh budget.
 */
export const MAX_LOOKUP_RETRIES = 3;

/** How long to wait before asking for the sync activity again after the request failed. */
export const SYNC_ACTIVITY_SEED_RETRY_DELAY_MS = 3 * 1000;

/**
 * How many times to retry the sync activity seed. The realistic failure is a cold-start race with
 * the .NET process registering the command, which resolves in seconds; past this, the state becomes
 * known from the pushed `onSyncActivityChanged` event or the slower recheck
 * (`SYNC_ACTIVITY_RECHECK_INTERVAL_MS`).
 */
const MAX_SYNC_ACTIVITY_SEED_RETRIES = 10;

/**
 * How often to re-read the sync activity while a sync is reported as running. Both hops that
 * forward `onSyncActivityChanged` are fire-and-forget, so a lost closing event would otherwise
 * leave the answer `unknown` until the next sync. The shared hook rechecks only once a valid
 * snapshot exists, so a seed that ran out of retries is recovered by the next event, not by this
 * interval. Same interval as core's `sync-activity-service.ts` watchdog.
 */
export const SYNC_ACTIVITY_RECHECK_INTERVAL_MS = 30 * 1000;

/**
 * ID of the sample WEB project, which `LocalParatextProjects.Initialize` (C#) installs into an
 * empty projects folder only when `PLATFORM_BIBLE_INSTALL_SAMPLE_PROJECT` is `true`, which the
 * development launchers set by default. Fixed by its `Settings.xml`
 * (`c-sharp/assets/WEB/Settings.xml`); upper-cased because project IDs arrive in either case.
 */
export const SAMPLE_PROJECT_ID = '32664DC3288A28DF2E2BB75DED887FC8F17A15FB';

/**
 * Whether the C# Paratext project factory, asked directly, has no projects. `false` when it is not
 * registered or reachable, or has any project; rejects if asking it fails.
 */
async function isParatextFactoryEmpty(): Promise<boolean> {
  const factory =
    await papi.networkObjects.get<IProjectDataProviderFactory>(PARATEXT_PDP_FACTORY_ID);
  if (!factory) return false;
  // The C# handler takes one (ignored) argument, and StreamJsonRpc matches handlers by arity
  return (await factory.getAvailableProjects({})).length === 0;
}

/**
 * Whether the metadata is a project of the user's own that they can open: neither a resource
 * (`isPublished`), the sample project, nor a project that cannot be opened (`unsupportedReason`). A
 * factory that omits `isPublished` is treated as unpublished, matching the `platform.isPublished`
 * default.
 *
 * A user whose only projects cannot be opened is shown how to get a project, even though the
 * toolbar's project picker lists those projects (disabled, with the reason).
 */
function isOwnProject(metadata: {
  id: string;
  isPublished?: boolean;
  unsupportedReason?: string;
}): boolean {
  return (
    metadata.isPublished !== true &&
    !metadata.unsupportedReason &&
    metadata.id.toUpperCase() !== SAMPLE_PROJECT_ID
  );
}

type SyncActivityValue = Pick<SyncActivitySnapshot, 'isSyncing'>;

// Checked rather than trusted: the sync-activity types were declared ahead of the Paratext 10 change
// that implements them, so a build may send another shape.
function isSyncActivitySnapshot(value: unknown): value is SyncActivityValue {
  return (
    typeof value === 'object' &&
    !!value &&
    'isSyncing' in value &&
    typeof value.isSyncing === 'boolean'
  );
}

const readSyncActivity = () =>
  papi.commands.sendCommand('paratextBibleSendReceive.getSyncActivity').catch((e) => {
    logger.debug(`Could not read the sync activity: ${getErrorMessage(e)}`);
    throw e;
  });

const isSyncRunning = (snapshot: SyncActivityValue) => snapshot.isSyncing;

/**
 * Reports whether this user has any project of their own, as a tri-state that keeps "could not
 * tell" distinct from "none". Only `none` supports telling the user they have no projects, so every
 * uncertain input resolves to `unknown`:
 *
 * - A sync that is running may be about to download the user's first project, so projects are looked
 *   up only once sync activity is known to be idle. Sync activity comes from
 *   `paratextBibleSendReceive.getSyncActivity` / `onSyncActivityChanged`, which see every sync
 *   path, but only a Paratext 10 build reports real activity; Platform.Bible always answers idle.
 * - The lookup skips a factory it cannot reach, so an empty answer means the user has no projects
 *   only if the C# Paratext project factory, asked directly afterward, also has none. Otherwise it
 *   reads `unknown`.
 * - A failed or unconfirmed lookup is retried, a bounded number of times, and a factory registering
 *   (`object:onDidCreateNetworkObject`) triggers another lookup.
 *
 * Live: a project arriving later in the session (`platform.onDidChangeProjects`) triggers a new
 * lookup, which replaces `none` once it answers.
 *
 * Uses `getMetadataForAllProjectsWithoutRetries`: the retrying variant re-asks an empty answer
 * every second until the process is 30 seconds old, which would hold back `none` from a user with
 * no projects. The events above already re-ask when a factory or project arrives.
 *
 * Each lookup fans out to every project data provider factory in every process, so pass `enabled:
 * false` whenever the answer is not being shown. A disabled hook makes no requests.
 */
export function useProjectPresence({ enabled }: { enabled: boolean }): ProjectPresence {
  const [lookupAnswer, setLookupAnswer] = useState<ProjectPresence>('unknown');
  const onSyncActivityChanged = useMemo(
    () => papi.network.getNetworkEvent('paratextBibleSendReceive.onSyncActivityChanged'),
    [],
  );
  const { value: syncActivity } = useEventSeededState<SyncActivityValue>({
    read: readSyncActivity,
    event: onSyncActivityChanged,
    isValid: isSyncActivitySnapshot,
    seedRetries: MAX_SYNC_ACTIVITY_SEED_RETRIES,
    seedRetryDelayMs: SYNC_ACTIVITY_SEED_RETRY_DELAY_MS,
    recheckIntervalMs: SYNC_ACTIVITY_RECHECK_INTERVAL_MS,
    shouldRecheck: isSyncRunning,
    enabled,
  });
  // `undefined` until the first valid snapshot arrives: not knowing is not the same as idle
  const isSyncing = syncActivity?.isSyncing;
  const [lookupRequestCount, setLookupRequestCount] = useState(0);
  const requestLookup = useCallback(() => setLookupRequestCount((count) => count + 1), []);
  const lookupRetryCountRef = useRef(0);
  // A new event is new information, so its lookup gets a fresh retry budget
  const requestLookupForEvent = useCallback(() => {
    lookupRetryCountRef.current = 0;
    requestLookup();
  }, [requestLookup]);

  const isIdle = enabled && isSyncing === false;

  useEffect(() => {
    // An answer from before a sync or a disabled stretch may be stale, so it is dropped rather than
    // kept until the next lookup answers. The lookups that resume afterward get a fresh retry budget.
    if (!isIdle) {
      setLookupAnswer('unknown');
      lookupRetryCountRef.current = 0;
      return undefined;
    }
    let isCurrent = true;
    let retryTimer: ReturnType<typeof setTimeout> | undefined;
    const retryWithinBudget = () => {
      if (lookupRetryCountRef.current >= MAX_LOOKUP_RETRIES) return;
      lookupRetryCountRef.current += 1;
      retryTimer = setTimeout(requestLookup, LOOKUP_RETRY_DELAY_MS);
    };
    (async () => {
      try {
        const allMetadata = await papi.projectLookup.getMetadataForAllProjectsWithoutRetries({
          includeProjectInterfaces: [PROJECT_INTERFACE],
        });
        if (!isCurrent) return;
        // TODO(PT-4941): replace with the project lookup service's own answer once it can say
        // whether every factory answered.
        const isConfirmed = allMetadata.length > 0 || (await isParatextFactoryEmpty());
        if (!isCurrent) return;
        if (isConfirmed) {
          lookupRetryCountRef.current = 0;
          setLookupAnswer(allMetadata.some(isOwnProject) ? 'some' : 'none');
          return;
        }
        setLookupAnswer('unknown');
        retryWithinBudget();
      } catch (e) {
        // A failed lookup is not evidence either way, and the previous answer may be out of date.
        logger.warn(`Could not determine whether the user has any projects: ${getErrorMessage(e)}`);
        if (!isCurrent) return;
        setLookupAnswer('unknown');
        retryWithinBudget();
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

  return isIdle ? lookupAnswer : 'unknown';
}

export default useProjectPresence;
