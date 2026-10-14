import { EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE } from '@node/models/interprocess-messages.model';
import { logger } from '@shared/services/logger.service';
import { PlatformEvent, Unsubscriber } from 'platform-bible-utils';

/**
 * How long the graceful shutdown may take on a lost connection before the process exits anyway.
 * Nothing else bounds it on this path: main is not waiting for this exit, unlike a requested stop,
 * where main hard-kills the process after its own budget.
 */
export const LOST_CONNECTION_SHUTDOWN_TIMEOUT_MS = 5_000;

/**
 * How long a shutdown main requested may still take, once the connection is lost during it, before
 * the process exits anyway. Main's own hard-kill for a requested stop comes far sooner, so this
 * only ever fires when main itself is gone (it quit right after sending the shutdown message, or it
 * crashed) and an extension's `deactivate` hangs, which would otherwise orphan the process.
 */
export const LOST_CONNECTION_JOINED_SHUTDOWN_TIMEOUT_MS = 30_000;

type Dependencies = {
  /** The network service's connection-lost event */
  onDidLoseConnection: PlatformEvent<void>;
  /** `runGracefulShutdown` from `./graceful-shutdown`; takes the function that ends the process */
  runGracefulShutdown: (exitProcess: () => void) => Promise<void>;
  /** `hasGracefulShutdownStarted` from `./graceful-shutdown` */
  hasGracefulShutdownStarted: () => boolean;
  /** Ends the process with the given code; `process.exit` in production */
  exitProcess: (code: number) => void;
};

/**
 * Ends the extension host when its connection to main dies, so main's child-process `exit` handler
 * can tell every window that extensions have stopped.
 *
 * Exiting is deliberate, not a workaround: once the socket is gone every request this process makes
 * throws, nothing in it can reach main, and reconnecting in place would also mean re-announcing
 * every method, command, event, data provider and network object against a main that has already
 * broadcast their disposal. A fresh process re-registers all of that naturally, and main already
 * knows how to start one (`platform.restartExtensionHost`). See
 * `adr-extension-host-exits-on-lost-connection`.
 *
 * Reacts to the first loss only: the shutdown is already under way after that. Always arms a
 * watchdog before joining or starting the graceful shutdown, so an extension whose `deactivate`
 * never settles cannot keep the process alive:
 *
 * - When this loss starts the shutdown, the watchdog fires after
 *   {@link LOST_CONNECTION_SHUTDOWN_TIMEOUT_MS}; nothing else bounds that shutdown.
 * - When the loss joins a shutdown main requested, main bounds it with its own, much shorter
 *   hard-kill, and the watchdog is only a backstop for when main is gone
 *   ({@link LOST_CONNECTION_JOINED_SHUTDOWN_TIMEOUT_MS}). Main has already marked that stop as
 *   requested, so the exit code this ends with is not reported to anyone.
 *
 * @returns Unsubscriber; the entry module never calls it, this runs for the process's lifetime
 */
export function exitExtensionHostOnLostConnection({
  onDidLoseConnection,
  runGracefulShutdown,
  hasGracefulShutdownStarted,
  exitProcess,
}: Dependencies): Unsubscriber {
  let hasReacted = false;
  const unsubscribe = onDidLoseConnection(() => {
    if (hasReacted) return;
    hasReacted = true;
    logger.error(
      'Extension host lost its connection to main. Exiting so main can report it to the user.',
    );
    // Read before `runGracefulShutdown` below, which would make it true.
    const isJoiningShutdown = hasGracefulShutdownStarted();
    // Deliberately keeps the event loop alive until it fires: if the shutdown hangs on a promise
    // with nothing else pending, an unreferenced timer would let Node exit with code 0, which main
    // would report as a crash rather than a lost connection.
    setTimeout(
      () => exitProcess(EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE),
      isJoiningShutdown
        ? LOST_CONNECTION_JOINED_SHUTDOWN_TIMEOUT_MS
        : LOST_CONNECTION_SHUTDOWN_TIMEOUT_MS,
    );
    // Not awaited: `runGracefulShutdown` never rejects and always ends with `exitProcess`. If a
    // shutdown is already under way, this joins it, and that shutdown's own exit stands unless the
    // backstop above fires first.
    runGracefulShutdown(() => exitProcess(EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE));
  });
  return unsubscribe;
}
