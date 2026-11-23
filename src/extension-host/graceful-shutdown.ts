import * as analyticsService from '@extension-host/services/analytics.service';
import * as extensionService from '@extension-host/services/extension.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';

/** The shutdown under way, if one has started. A process shuts down once. */
let shutdownPromise: Promise<void> | undefined;

/**
 * Shuts the extension host's services down in order and then exits. Never rejects: each step's
 * failure is logged and the next step still runs, and `exitProcess` always runs last.
 *
 * Runs once per process. A later call (main's graceful-shutdown message and a lost connection can
 * both arrive during one quit or restart) returns the shutdown already under way, and its own
 * `exitProcess` is never called: a second run would end the process with its own exit code while
 * the first was still deactivating extensions.
 *
 * @param exitProcess Ends the process. The entry module passes `() => process.exit()`.
 */
export function runGracefulShutdown(exitProcess: () => void): Promise<void> {
  if (!shutdownPromise) shutdownPromise = shutDownThenExit(exitProcess);
  return shutdownPromise;
}

/** Whether {@link runGracefulShutdown} has been called in this process. Stays `true` once it has. */
export function hasGracefulShutdownStarted(): boolean {
  return shutdownPromise !== undefined;
}

async function shutDownThenExit(exitProcess: () => void): Promise<void> {
  // Analytics first: its shutdown is self-bounded to half a second (its
  // ANALYTICS_SHUTDOWN_BUDGET_MS), and extension deactivation below may take the rest of the
  // budget.
  try {
    await analyticsService.shutdown();
  } catch (error) {
    logger.error(`Analytics: failed to shut down cleanly. ${getErrorMessage(error)}`);
  }
  try {
    await extensionService.shutdown();
  } catch (error) {
    logger.error(`Failed to deactivate extensions. ${getErrorMessage(error)}`);
  } finally {
    logger.info('Finished the graceful shutdown; ending the process');
    exitProcess();
  }
}
