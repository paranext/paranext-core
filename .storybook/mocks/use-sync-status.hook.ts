/**
 * Storybook mock for `@renderer/hooks/use-sync-status.hook`.
 *
 * `.storybook/main.ts` rewrites the exact request `@renderer/hooks/use-sync-status.hook` to this
 * file via a `NormalModuleReplacementPlugin` (a `resolve.alias` is silently overridden by the
 * renderer config's `TsconfigPathsPlugin`), mirroring how `renderer-papi-hooks.tsx` is wired.
 *
 * The real hook derives its status from two Send/Receive commands and two network events. Storybook
 * has no PAPI backend, so every read fails: the hook reports `idle` and then `unknown` a minute
 * later, and no other state is reachable at all. Replacing the hook — rather than the services
 * under it — is what lets a story ask for any one of the five statuses directly, including
 * `unknown`, without the sync button growing props it does not need in the app.
 *
 * With no story opted in, this returns the inert `idle` state the real hook shows in Storybook
 * anyway, so stories that merely contain a toolbar are unaffected.
 */
import { useContext } from 'react';
// Type-only, so nothing of the real hook is pulled into the bundle. Deep relative (not
// `@renderer/*`) so these requests are not rewritten back to this file.
import type {
  SyncStatus,
  SyncingProject,
  SyncStatusInfo,
} from '../../src/renderer/hooks/use-sync-status.hook';
import { SyncStatusMockContext } from './sync-status-mock-channel';

// Re-exported so the mock presents the same surface as the module it replaces.
export type { SyncStatus, SyncingProject, SyncStatusInfo };

/** Frozen so a consumer cannot mutate the shared default. Stable identity across renders. */
const IDLE: SyncStatusInfo = Object.freeze({
  status: 'idle',
  syncingProjects: Object.freeze([]),
});

export function useSyncStatus(): SyncStatusInfo {
  return useContext(SyncStatusMockContext) ?? IDLE;
}

export default useSyncStatus;
