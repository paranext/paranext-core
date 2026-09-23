import * as analyticsService from '@extension-host/services/analytics.service';
import * as extensionService from '@extension-host/services/extension.service';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Shuts the extension host's services down in order and then exits. Never rejects: each step's
 * failure is logged and the next step still runs, and `exitProcess` always runs last.
 *
 * @param exitProcess Ends the process. The entry module passes `() => process.exit()`.
 */
export async function runGracefulShutdown(exitProcess: () => void): Promise<void> {
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
    logger.info('Finally shutting down process due to graceful shutdown message');
    exitProcess();
  }
}
