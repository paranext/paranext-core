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
 * - `openSyncStatus` resolves, so "View sync details" closes the popover as it does in the app rather
 *   than raising an "unavailable" toast about a web view Storybook could never open.
 */
import * as realCommandService from '../../src/shared/services/command.service';

export const { registerCommand, createSendCommandFunction } = realCommandService;

export type { ModuleSummaryComments } from '../../src/shared/services/command.service';

/** A cancel request that has been accepted and has not yet taken effect. */
const NEVER_SETTLES = new Promise<never>(() => {});

const sendCommandStub = (commandName: string, ...args: unknown[]) => {
  if (commandName === 'paratextBibleSendReceive.cancelSync') return NEVER_SETTLES;
  if (commandName === 'paratextBibleSendReceive.openSyncStatus') return Promise.resolve(undefined);
  // `sendCommand` resolves a different return type per command name, which no single pass-through
  // body can satisfy; typing it faithfully would mean reproducing the whole command map here.
  // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
  return (realCommandService.sendCommand as any)(commandName, ...args);
};

// Same reason as above: the stub answers every command name, so it cannot satisfy the per-command
// generic signature it stands in for.
// eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
export const sendCommand = sendCommandStub as any as typeof realCommandService.sendCommand;
