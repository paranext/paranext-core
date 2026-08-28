/**
 * Opt-in channel for the Storybook command-service mock.
 *
 * Kept as its own dependency-free module (mirroring `first-run-language-mock-channel.ts`) so story
 * files under `src/` can import it without pulling the webpack-only `command-service.ts` mock into
 * `tsc` typecheck. The webpack-aliased mock reads this same module instance at call time. See
 * `.storybook/mocks/command-service.ts`.
 *
 * This exists because `spyOn(commandService, 'sendCommand')` does NOT work in Storybook 9: the
 * module namespace is a non-configurable ESM namespace, so spying on it throws "Cannot spy on
 * export ... Module namespace is not configurable in ESM". Stories must set a responder here
 * instead.
 */

/** Answers a PAPI command in a story. Return the value the command would resolve to, or throw. */
export type CommandResponder = (commandName: string, ...args: unknown[]) => unknown;

let responder: CommandResponder | undefined;

/**
 * Route `sendCommand` calls to `next` for the duration of a story. Call with `undefined` (or use
 * {@link resetCommandServiceMock}) to restore the default, which rejects the way an unanswerable
 * request does in Storybook.
 */
export function setCommandServiceMock(next: CommandResponder | undefined): void {
  responder = next;
}

/** Clears the responder. Pair this with {@link setCommandServiceMock} in a story's `beforeEach`. */
export function resetCommandServiceMock(): void {
  responder = undefined;
}

/** Read by the webpack-aliased mock. Not for story use. @internal */
export function getCommandServiceMock(): CommandResponder | undefined {
  return responder;
}
