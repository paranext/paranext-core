/**
 * Storybook mock for `@shared/services/command.service`.
 *
 * `.storybook/main.ts` rewrites that exact request to this file via `NormalModuleReplacementPlugin`
 * (a `resolve.alias` is silently overridden by the renderer config's `TsconfigPathsPlugin`).
 *
 * Why a module replacement rather than `spyOn(commandService, 'sendCommand')`: Storybook 9 hands
 * stories a real ESM module namespace, which is non-configurable, so spying on it throws "Cannot
 * spy on export ... Module namespace is not configurable in ESM". Stories drive this mock through
 * `setCommandServiceMock` in `command-service-mock-channel.ts` instead.
 *
 * This replacement is global: it stands in for the command service in EVERY story, not only the
 * ones that opt in. Its default must therefore match the un-mocked path, which rejects — Storybook
 * has no PAPI backend, so `papi-stubs/rpc-handler.factory.ts` answers every request with a JSON-RPC
 * error and `networkService` throws it. Keep the default rejecting: resolving `undefined` instead
 * would push every story that catches, or that renders an error or empty state, onto the success
 * path without touching the story.
 *
 * Webpack-only: this file is outside `tsconfig.json`'s `include`, so it is never type-checked. Keep
 * it dependency-free apart from the channel.
 */
import { getCommandServiceMock } from './command-service-mock-channel';

/** @inheritdoc */
export const sendCommand = async (commandName: string, ...args: unknown[]): Promise<unknown> => {
  const responder = getCommandServiceMock();
  if (!responder) throw new Error(`Storybook: no PAPI backend to handle "command:${commandName}"`);
  return responder(commandName, ...args);
};

/** Inert: nothing in Storybook dispatches to a registered handler. */
export const registerCommand = async (): Promise<() => Promise<boolean>> => async () => true;

/** @inheritdoc */
export const createSendCommandFunction =
  (commandName: string) =>
  async (...args: unknown[]): Promise<unknown> =>
    sendCommand(commandName, ...args);
