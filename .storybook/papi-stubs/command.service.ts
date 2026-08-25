/**
 * Storybook stub for `@shared/services/command.service`.
 *
 * Wired via `NormalModuleReplacementPlugin` in `.storybook/main.ts` (not `resolve.alias`, which
 * `TsconfigPathsPlugin` overrides for `@shared/*`). Every command is delegated to the real service,
 * which — through the inert rpc handler — answers with a JSON-RPC "no backend" error. The
 * exceptions are the two Send/Receive commands the toolbar's sync button fires, whose rejection is
 * what makes one of that button's states unreachable in Storybook:
 *
 * - `cancelSync` never settles, so the button stays in its accepted-cancel state ("Cancelling…")
 *   instead of flashing it and reverting on the rejection. That is also the truthful shape of a
 *   real cancel: it only takes effect once Send/Receive reaches a stopping point, so the request
 *   stays outstanding meanwhile. (Same device as the SyncConsentStep story's never-resolving
 *   `onSync`.)
 * - `openSyncStatus` resolves a web view id, so "View sync details" closes the popover as it does in
 *   the app rather than raising an "unavailable" toast about a web view Storybook could never open.
 *   An id, not a bare resolve: the command answers `undefined` when it created no web view, which
 *   the button treats as a failure exactly like a rejection.
 *
 * Both overrides are GLOBAL to the whole Storybook build, unlike the `useSyncStatus` mock beside
 * them in `.storybook/mocks/`, which is scoped per story through a React context. Any future story
 * that fires the same commands inherits this behavior whether it wants it or not — most obviously a
 * story for `sync-blocked-banner.component.tsx`, which fires the identical `cancelSync` and would
 * get a never-settling promise where every other command gets an inert rejection. Prefer scoping a
 * new override through the mocks directory; add one here only when it must hold for every story,
 * and say so when you do.
 */
import * as realCommandService from '../../src/shared/services/command.service';

export const { registerCommand, createSendCommandFunction } = realCommandService;

export type { ModuleSummaryComments } from '../../src/shared/services/command.service';

/** A cancel request that has been accepted and has not yet taken effect. */
const NEVER_SETTLES = new Promise<never>(() => {});

/** Stands in for the web view id a real `openSyncStatus` answers with when it opened the view. */
const STUB_SYNC_STATUS_WEB_VIEW_ID = 'storybook-sync-status-web-view';

const sendCommandStub = (commandName: string, ...args: unknown[]) => {
  if (commandName === 'paratextBibleSendReceive.cancelSync') return NEVER_SETTLES;
  if (commandName === 'paratextBibleSendReceive.openSyncStatus')
    return Promise.resolve(STUB_SYNC_STATUS_WEB_VIEW_ID);
  // `sendCommand` resolves a different return type per command name, which no single pass-through
  // body can satisfy; typing it faithfully would mean reproducing the whole command map here.
  // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
  return (realCommandService.sendCommand as any)(commandName, ...args);
};

// Same reason as above: the stub answers every command name, so it cannot satisfy the per-command
// generic signature it stands in for.
// eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
export const sendCommand = sendCommandStub as any as typeof realCommandService.sendCommand;
