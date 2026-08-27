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
 * The real service opens a PAPI WebSocket that has no backend in Storybook, so no story gets a
 * useful answer from it either way. Stories that do not opt in get `undefined` — a benign
 * non-answer, so a caller that ignores the result still renders. That is deliberately NOT the same
 * as the real service's failure, so a story that depends on a particular answer — including a
 * rejection — must set a responder rather than rely on this default.
 *
 * Webpack-only: this file is outside `tsconfig.json`'s `include`, so it is never type-checked. Keep
 * it dependency-free apart from the channel.
 */
import { getCommandServiceMock } from './command-service-mock-channel';

/** @inheritdoc */
export const sendCommand = async (commandName: string, ...args: unknown[]): Promise<unknown> => {
  const responder = getCommandServiceMock();
  if (!responder) return undefined;
  return responder(commandName, ...args);
};

/** Inert: nothing in Storybook dispatches to a registered handler. */
export const registerCommand = async (): Promise<() => Promise<boolean>> => async () => true;

/** @inheritdoc */
export const createSendCommandFunction =
  (commandName: string) =>
  async (...args: unknown[]): Promise<unknown> =>
    sendCommand(commandName, ...args);
