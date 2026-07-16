import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import * as commandService from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import { settingsService } from '@shared/services/settings.service';
import { serializeRequestType } from '@shared/utils/util';
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
 * In Power mode: requests a sync of just the projects scheduled "On startup/shutdown" (PT-4162),
 * via the S/R extension's `runScheduledSessionSync` command. Same error-swallowing contract as
 * Simple mode — if the S/R extension hasn't registered the command yet (or at all, e.g. plain
 * Platform.Bible), this is a logged no-op, never a crash or a blocked startup.
 *
 * Any other (unrecognized) mode: returns immediately with no automatic sync. Mirrors the mode
 * gating in {@link performShutdownTasks}.
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

  if (interfaceMode === 'power') {
    await performPowerModeStartupSync();
    return;
  }

  // Any other non-simple mode: no automatic sync on startup.
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

/**
 * Power mode: triggers the S/R extension's session-boundary sync for the projects scheduled "On
 * startup/shutdown" (PT-4162). The extension owns everything else — reading PT-4160's schedule
 * store for the `onStartupShutdown` subset, running the sync, raising/clearing the PT-4159
 * editing-block for its duration, stamping `lastRunAt`, and opening the results view on
 * conflicts/errors. Core only triggers it and swallows failures, same contract as Simple mode's
 * `syncProjects` call above.
 *
 * Uses the retrying `networkService.request` (rather than `commandService.sendCommand`) because
 * `runScheduledSessionSync` isn't declared in `CommandHandlers` yet — it's a new command the S/R
 * extension adds; core doesn't own that type contract (PT-4162 design D1). Retry semantics still
 * matter here: like the C# S/R command, the extension-hosted command may not have registered yet
 * this early in startup, and retrying gives it time to come up instead of failing the one sync
 * attempt this session boundary gets.
 */
async function performPowerModeStartupSync(): Promise<void> {
  logger.debug('Power-mode startup sync starting');
  try {
    await networkService.request(
      serializeRequestType(CATEGORY_COMMAND, 'paratextBibleSendReceive.runScheduledSessionSync'),
      'startup',
    );
    logger.debug('Power-mode startup sync complete');
  } catch (e) {
    logger.warn(
      `Power-mode startup sync failed or skipped (command absent / extension not yet activated): ${getErrorMessage(e)}`,
    );
  }
}
