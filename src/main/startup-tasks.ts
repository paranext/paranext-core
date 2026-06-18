import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import { settingsService } from '@shared/services/settings.service';
import { serializeRequestType } from '@shared/utils/util';

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
    logger.error('Unexpected error during startup tasks:', e);
  }
}

async function performStartupTasksInternal(): Promise<void> {
  logger.info('performStartupTasks invoked');

  // Power mode: no automatic sync on startup.
  // If the setting can't be read, default to simple mode to avoid skipping sync.
  let interfaceMode: string | undefined;
  try {
    interfaceMode = await settingsService.get('platform.interfaceMode');
  } catch {
    /* settings service unavailable — treat as simple mode */
  }
  logger.info(`performStartupTasks: interfaceMode=${interfaceMode}`);
  if (interfaceMode !== undefined && interfaceMode !== 'simple') return;

  // Simple mode: sync all locally-known shared projects (no project IDs = "sync all" per the
  // C# `String[]? projectIds` contract). Uses `request` (with retry on missing handler), not
  // `requestNoRetry`, because the C# S/R command registers asynchronously during startup; this
  // call may race ahead of it. `undefined` as the single arg serializes as `null` in the
  // JSON-RPC params array — matching the "sync all" sentinel on the C# side.
  logger.info('Startup sync starting');
  try {
    await networkService.request(
      serializeRequestType(CATEGORY_COMMAND, 'paratextBibleSendReceive.syncProjects'),
      undefined,
    );
    logger.info('Startup sync complete');
  } catch {
    /* command absent (Platform.Bible) / extension not yet activated / sync failed — no-op */
  }
}
