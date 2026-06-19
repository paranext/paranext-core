import * as commandService from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import { settingsService } from '@shared/services/settings.service';
import { getErrorMessage } from 'platform-bible-utils';

/**
 * Runs initialization tasks (currently: triggering an initial project sync) shortly after the app
 * finishes starting up.
 *
 * In Simple mode: requests a sync of all locally-known shared projects so the user sees the latest
 * content as soon as they open the app. All errors are swallowed — the S/R extension may not be
 * installed (e.g. Platform.Bible), the command may not yet be registered, or the sync may fail.
 * Startup must never be blocked or visibly affected by this.
 *
 * In Power mode (or any non-Simple mode): returns immediately with no automatic sync. Power-mode
 * users manage Send/Receive manually. Mirrors the mode gating in {@link performShutdownTasks}.
 */
export async function performStartupTasks(): Promise<void> {
  try {
    await performStartupTasksInternal();
  } catch (e) {
    logger.warn(`Unexpected error during startup tasks: ${getErrorMessage(e)}`);
  }
}

async function performStartupTasksInternal(): Promise<void> {
  logger.debug('performStartupTasks invoked');

  // Power mode: no automatic sync on startup.
  // If the setting can't be read, default to simple mode to avoid skipping sync.
  let interfaceMode: string | undefined;
  try {
    interfaceMode = await settingsService.get('platform.interfaceMode');
  } catch (e) {
    logger.warn(
      `Could not read platform.interfaceMode; defaulting to simple-mode behavior: ${getErrorMessage(e)}`,
    );
  }
  logger.debug(`performStartupTasks: interfaceMode=${interfaceMode}`);
  if (interfaceMode !== undefined && interfaceMode !== 'simple') return;

  // Simple mode: sync all locally-known shared projects (no project IDs = "sync all" per the
  // C# `String[]? projectIds` contract). The C# S/R command registers asynchronously during
  // startup; `sendCommand` will wait (with retry on missing handler) until it's available or
  // times out. `undefined` as the single arg serializes as `null` in the JSON-RPC params array
  // — matching the "sync all" sentinel on the C# side.
  logger.debug('Startup sync starting');
  try {
    await commandService.sendCommand('paratextBibleSendReceive.syncProjects', undefined);
    logger.debug('Startup sync complete');
  } catch (e) {
    logger.warn(
      `Startup sync failed or skipped (command absent / extension not yet activated): ${getErrorMessage(e)}`,
    );
  }
}
