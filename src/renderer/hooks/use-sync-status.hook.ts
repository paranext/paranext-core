import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { getErrorMessage } from 'platform-bible-utils';
import { useEvent, usePromise } from 'platform-bible-react';
import type { SyncProgressEvent, SyncState } from 'paratext-bible-send-receive';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * What the sync indicator is reporting.
 *
 * - `idle` — nothing has synced yet this session
 * - `syncing` — a sync is running now
 * - `synced` — a sync finished this session and none is running
 */
export type SyncStatus = 'idle' | 'syncing' | 'synced';

export type SyncStatusInfo = {
  status: SyncStatus;
  /**
   * Display names of the projects syncing right now, for naming them in the UI. Empty whenever
   * nothing is syncing — and also while a sync IS running if the names aren't knowable (see
   * {@link useSyncStatus}), so callers must fall back to a status that names no projects rather than
   * reading empty as "nothing is syncing". Use {@link SyncStatusInfo.status} for that.
   */
  syncingProjectNames: string[];
};

/** Stable identity so `usePromise`'s default doesn't change between renders. */
const NO_PROJECT_NAMES: string[] = [];

/**
 * Maps a startup snapshot to the status to show. Unlike an event — where `isSyncing: false` always
 * means a sync just finished — a snapshot's `isSyncing: false` only means one is not running, which
 * is also true before anything has synced. `lastResults` is what separates the two.
 */
function deriveStatusFromSnapshot(state: SyncState): SyncStatus {
  if (state.isSyncing) return 'syncing';
  return state.lastResults ? 'synced' : 'idle';
}

/**
 * Current Send/Receive status for an ambient indicator, seeded so it is correct from the moment it
 * mounts.
 *
 * The seed is the point. `paratextBibleSendReceive.onSyncStateChanged` fires on transitions only,
 * so a consumer that mounts during a sync — a scheduled sync, or a renderer reload mid-sync — would
 * otherwise show `idle` until that sync ENDS. This reads `paratextBibleSendReceive.getSyncState`
 * once on mount to cover exactly that gap. An event that lands while the seed is still in flight
 * wins: it describes a later moment than the snapshot does.
 *
 * What the seed CANNOT cover: a sync that never reached the Send/Receive extension's wrappers is
 * absent from `getSyncState` and fires no event, so this reports `idle` throughout it. In Simple
 * mode that currently includes the startup sync itself (`main/startup-tasks.ts` calls the dotnet
 * `syncProjects` command directly), so "correct from startup" holds for manual and scheduled syncs
 * but not yet for that one. See {@link SyncState} for the full list and PT-4214 for the fix.
 *
 * Project names are resolved from project metadata rather than the event, which carries no ids.
 * They are absent (empty, with `status` still `syncing`) in two cases callers must handle: a
 * Send/Receive build predating `syncingProjectIds`, and a `getSyncState` call that fails. Names for
 * ids whose metadata can't be fetched fall back to the project id, so a partial failure loses
 * precision but never a project.
 *
 * @param options.enabled When false, nothing is fetched or subscribed and the status stays `idle`.
 *   Use it where no sync UI is rendered. Defaults to true.
 */
export function useSyncStatus({ enabled = true }: { enabled?: boolean } = {}): SyncStatusInfo {
  const [status, setStatus] = useState<SyncStatus>('idle');
  const [syncingProjectIds, setSyncingProjectIds] = useState<string[]>(NO_PROJECT_NAMES);

  /**
   * Whether an `onSyncStateChanged` event has been applied. Once one has, the mount snapshot is
   * stale by definition and must not overwrite it.
   */
  const hasAppliedEventRef = useRef(false);
  /**
   * Identifies the current run. Bumped on teardown so an in-flight read that resolves afterwards is
   * recognised and dropped rather than setting state on an unmounted hook.
   */
  const runRef = useRef(0);

  const readSyncState = useCallback(async (): Promise<SyncState | undefined> => {
    try {
      return await sendCommand('paratextBibleSendReceive.getSyncState');
    } catch (e) {
      // Send/Receive may not have registered its commands yet (cold start), or may be absent from
      // this build. Either way the caller keeps whatever state it already has.
      logger.warn(`Could not read send/receive sync state: ${getErrorMessage(e)}`);
      return undefined;
    }
  }, []);

  // Seed from a snapshot on mount so a sync already in progress is reflected immediately.
  useEffect(() => {
    if (!enabled) return undefined;
    runRef.current += 1;
    const run = runRef.current;

    const seed = async () => {
      const state = await readSyncState();
      if (!state || run !== runRef.current) return;
      // An event beat the snapshot here. It describes a later moment, so the snapshot is discarded
      // rather than merged — applying only its ids would pair this sync's status with the ids from
      // before the transition.
      if (hasAppliedEventRef.current) return;
      setStatus(deriveStatusFromSnapshot(state));
      setSyncingProjectIds(state.syncingProjectIds ?? NO_PROJECT_NAMES);
    };
    seed().catch((e: unknown) => {
      // readSyncState swallows its own failures, so reaching here means a bug in the code above
      // rather than an unavailable command — worth a log that says so.
      logger.warn(`Unexpected failure seeding sync status: ${getErrorMessage(e)}`);
    });

    return () => {
      runRef.current += 1;
    };
  }, [enabled, readSyncState]);

  const handleSyncStateChanged = useCallback(
    ({ isSyncing }: SyncProgressEvent) => {
      hasAppliedEventRef.current = true;
      setStatus(isSyncing ? 'syncing' : 'synced');

      if (!isSyncing) {
        setSyncingProjectIds(NO_PROJECT_NAMES);
        return;
      }

      // The event carries no ids, so which projects are syncing takes a follow-up read. The status
      // above is already correct, so a failure here costs the names only.
      const run = runRef.current;
      readSyncState()
        .then((state) => {
          if (state && run === runRef.current) {
            setSyncingProjectIds(state.syncingProjectIds ?? NO_PROJECT_NAMES);
          }
          return undefined;
        })
        .catch((e: unknown) => {
          logger.warn(`Unexpected failure reading syncing projects: ${getErrorMessage(e)}`);
        });
    },
    [readSyncState],
  );

  const onSyncStateChanged = useMemo(
    () => getNetworkEvent<SyncProgressEvent>('paratextBibleSendReceive.onSyncStateChanged'),
    [],
  );
  // Gate on the event, not the handler: `useEvent` treats an undefined EVENT as "don't subscribe".
  useEvent(enabled ? onSyncStateChanged : undefined, handleSyncStateChanged);

  const [syncingProjectNames] = usePromise(
    useCallback(async () => {
      if (syncingProjectIds.length === 0) return NO_PROJECT_NAMES;
      // Per-id rather than one fan-out with a shared catch: one unresolvable project must not blank
      // the names of the others. Short name ("HNF") over full name — this labels a compact toolbar
      // control, and it is the name Paratext users identify a project by.
      return Promise.all(
        syncingProjectIds.map(async (projectId) => {
          try {
            const metadata = await projectLookupService.getMetadataForProject(projectId);
            return metadata.name ?? metadata.fullName ?? projectId;
          } catch (e) {
            logger.warn(
              `Could not resolve name of syncing project ${projectId}: ${getErrorMessage(e)}`,
            );
            return projectId;
          }
        }),
      );
    }, [syncingProjectIds]),
    NO_PROJECT_NAMES,
  );

  return { status, syncingProjectNames };
}

export default useSyncStatus;
