/**
 * Registers this renderer's window-scoped handlers for the commands the main process's routing
 * proxy expects to find under a `${commandName}-${windowId}` name (see
 * `RENDERER_HOSTED_COMMAND_NAMES`), and tracks which of them this renderer actually registered.
 *
 * The canonical list of renderer-hosted command names is declared centrally, but which module
 * registers each one is a design choice no type can check across module boundaries: a command added
 * to the list without a matching registration call anywhere would otherwise go unnoticed until a
 * caller hits the service router's timeout. Routing every registration through
 * {@link registerScopedCommands} makes that omission visible at startup instead — see
 * {@link assertAllRendererHostedCommandsRegistered}.
 */

import { registerCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { CommandNames } from 'papi-shared-types';
import { RENDERER_HOSTED_COMMAND_NAMES } from '@shared/services/web-view.service-model';
import { UnsubscriberAsync } from 'platform-bible-utils';

export type RendererHostedCommandName = (typeof RENDERER_HOSTED_COMMAND_NAMES)[number];

/**
 * Handlers for a subset of the renderer-hosted commands, keyed by their generic (unscoped) name.
 * The handler side is loosely typed because these commands have unrelated signatures; the key side
 * is still checked against {@link RendererHostedCommandName}, so a typo or a name that is not on the
 * canonical list is a compile error rather than a silently-ignored extra registration.
 */
export type RendererHostedCommandHandlers = Partial<
  // Handlers can be any function type; each command's real signature is declared once, in
  // `papi-shared-types`, and checked there and at every call site that invokes it by name.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<RendererHostedCommandName, (...args: any[]) => any>
>;

/** Renderer-hosted command names this renderer has registered a scoped handler for so far */
const registeredCommandNames = new Set<RendererHostedCommandName>();

/**
 * Register this window's scoped handler (e.g. `platform.about-1`) for each command in `handlers`,
 * and record that this renderer registered it.
 *
 * @param handlers Handlers to register, keyed by generic (unscoped) command name
 * @returns One promise per handler, resolving to its unsubscriber — the same shape
 *   `registerCommand` returns for a single command
 */
export function registerScopedCommands(
  handlers: RendererHostedCommandHandlers,
): Promise<UnsubscriberAsync>[] {
  return Object.entries(handlers).map(([commandName, handler]) =>
    // The scoped name is built at runtime, so it can't be one of the literal `CommandNames`, and the
    // handler's real signature was already checked against RendererHostedCommandHandlers above, not
    // against the specific CommandHandlers[CommandName] registerCommand expects here.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    registerCommand(`${commandName}-${globalThis.windowId}` as CommandNames, handler).then(
      (unsubscribe) => {
        // Recorded once the registration has landed, not when it was attempted. The check this
        // feeds is meant to prove there is a handler for the service router to forward to, and a
        // name recorded up front would report a registration that rejected — a name collision after
        // a reload, a network failure during startup — as covered.
        // Object.entries widens the key to string; the RendererHostedCommandHandlers parameter type
        // already pins every key it accepts to RendererHostedCommandName.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        registeredCommandNames.add(commandName as RendererHostedCommandName);
        return unsubscribe;
      },
    ),
  );
}

/**
 * Confirm every renderer-hosted command has a registered scoped handler in this renderer. Call once
 * at startup, after every service that might own one of these commands has finished registering —
 * each of them awaits its own registrations, so by then every name that is going to be recorded has
 * been.
 *
 * A name in `RENDERER_HOSTED_COMMAND_NAMES` that no {@link registerScopedCommands} call registered
 * means the main process's service router has nothing to forward calls to for that command —
 * without this check, that surfaces only as the proxy's request timing out, with nothing pointing
 * at the missing registration as the cause.
 */
export function assertAllRendererHostedCommandsRegistered(): void {
  const missingCommandNames = RENDERER_HOSTED_COMMAND_NAMES.filter(
    (commandName) => !registeredCommandNames.has(commandName),
  );
  if (missingCommandNames.length === 0) return;

  // Says what a reader of the log will see happen rather than only naming constants: whatever menu
  // item, toolbar button, or keyboard shortcut invokes one of these commands in this window does
  // nothing, after the service router spends its request timeout looking for a handler.
  const message = `Renderer-hosted commands have no registered handler in this window, so the menu items, buttons, and keyboard shortcuts that invoke them will silently do nothing here: ${missingCommandNames.join(', ')}`;
  // In dev/test, fail loudly and immediately so the gap cannot ship. In production, a thrown error
  // here would take down renderer startup over one unroutable command; log it instead so the rest of
  // the app still comes up.
  if (!globalThis.isPackaged) throw new Error(message);
  logger.error(message);
}

/**
 * Reset the renderer-hosted command registry state for testing. This function is only exported for
 * testing purposes and should not be used in production code.
 */
export function resetForTesting(): void {
  registeredCommandNames.clear();
}
