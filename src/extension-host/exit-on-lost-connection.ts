import { EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE } from '@node/models/interprocess-messages.model';
import { logger } from '@shared/services/logger.service';
import { PlatformEvent, Unsubscriber } from 'platform-bible-utils';

/**
 * How long the graceful shutdown may take on a lost connection before the process exits anyway.
 * Nothing else bounds it on this path: main is not waiting for this exit, unlike a requested stop,
 * where main hard-kills the process after its own budget.
 */
export const LOST_CONNECTION_SHUTDOWN_TIMEOUT_MS = 5_000;

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
 * Reacts to the first loss only: the shutdown is already under way after that. When this loss is
 * what starts the shutdown, arms a watchdog first ({@link LOST_CONNECTION_SHUTDOWN_TIMEOUT_MS}), so
 * an extension whose `deactivate` never settles cannot keep the process alive with no window told
 * about it. A loss during a shutdown main requested only joins that shutdown and arms nothing: main
 * bounds its own requested stops, and a requested stop must not end with the lost-connection code.
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
    if (!hasGracefulShutdownStarted())
      // Deliberately keeps the event loop alive until it fires: if the shutdown hangs on a promise
      // with nothing else pending, an unreferenced timer would let Node exit with code 0, which
      // main would report as a crash rather than a lost connection.
      setTimeout(
        () => exitProcess(EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE),
        LOST_CONNECTION_SHUTDOWN_TIMEOUT_MS,
      );
    // Not awaited: `runGracefulShutdown` never rejects and always ends with `exitProcess`. If a
    // shutdown is already under way, this joins it and that shutdown's own exit stands.
    runGracefulShutdown(() => exitProcess(EXTENSION_HOST_LOST_CONNECTION_EXIT_CODE));
  });
  return unsubscribe;
}
