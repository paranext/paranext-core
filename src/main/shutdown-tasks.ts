import { SHUTDOWN_SYNC_TIME_OUT_MS } from '@shared/data/platform.data';
import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';
import { networkObjectService } from '@shared/services/network-object.service';
import * as networkService from '@shared/services/network.service';
import { settingsService } from '@shared/services/settings.service';
import {
  NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
  WebViewServiceType,
} from '@shared/services/web-view.service-model';
import { serializeRequestType } from '@shared/utils/util';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from '@shared/models/web-view.model';
import { AsyncVariable, getErrorMessage } from 'platform-bible-utils';

/**
 * Outcome of a {@link runBoundedShutdownSync} bounded wait:
 *
 * - `succeeded`: `performSync` resolved before the timeout.
 * - `failed`: `performSync` rejected (or the command was missing/unregistered) before the timeout;
 *   the failure itself is already logged by {@link runBoundedShutdownSync} as a warning.
 * - `timed-out`: neither a resolution nor a rejection arrived within
 *   {@link SHUTDOWN_SYNC_TIME_OUT_MS}.
 */
type ShutdownSyncOutcome = 'succeeded' | 'failed' | 'timed-out';

/**
 * Runs cleanup tasks (e.g., syncing projects) when the user closes the main window.
 *
 * In Simple mode: cancels any in-progress sync, then S/Rs the open writable Scripture Editor's
 * project. All errors are swallowed — extension may not be installed, or may fail — shutdown must
 * never be permanently blocked.
 *
 * In Power mode: S/Rs the projects scheduled "On startup/shutdown" (PT-4162), via the S/R
 * extension's `runScheduledSessionSync` command. Same error-swallowing contract — if the command
 * isn't registered (e.g. plain Platform.Bible with no S/R extension), this is a logged no-op, never
 * a crash or a wedged shutdown. No edit-block and no conflict surfacing here: the app is closing,
 * so there is nothing left to protect and no UI to show a result in (PT-4162 design D5; conflicts
 * are picked up again on next startup).
 *
 * Any other (unrecognized) mode: returns immediately with no automatic S/R.
 */
export async function performShutdownTasks(): Promise<void> {
  try {
    await performShutdownTasksInternal();
  } catch (e) {
    logger.error('Unexpected error during shutdown tasks:', e);
  }
}

async function performShutdownTasksInternal(): Promise<void> {
  // If the setting can't be read, default to simple mode to avoid skipping S/R and risking data loss.
  let interfaceMode: string | undefined;
  try {
    interfaceMode = await settingsService.get('platform.interfaceMode');
  } catch {
    /* settings service unavailable — treat as simple mode to avoid data loss */
  }

  if (interfaceMode === 'power') {
    await performPowerModeShutdownSync();
    return;
  }

  // Any other non-simple mode: close immediately — no automatic S/R on shutdown.
  if (interfaceMode !== undefined && interfaceMode !== 'simple') return;

  await performSimpleModeShutdownSync();
}

async function performSimpleModeShutdownSync(): Promise<void> {
  // Cancel any in-progress sync first (e.g. a first-sync on startup), then S/R the active project.
  try {
    await networkService.requestNoRetry(
      serializeRequestType(CATEGORY_COMMAND, 'paratextBibleSendReceive.cancelSync'),
    );
  } catch {
    /* no sync in progress, or extension unavailable */
  }

  // S/R only the currently open writable Scripture Editor's project.
  // If only a read-only Resource Viewer is open (no local changes possible), skip S/R.
  let projectId: string | undefined;
  try {
    const webViewService = await networkObjectService.get<WebViewServiceType>(
      NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
    );
    const openDefs = await webViewService?.getAllOpenWebViewDefinitions();
    // Simple mode allows at most one writable Scripture Editor at a time, so find() is sufficient.
    // Power mode selects by schedule instead (see performPowerModeShutdownSync), not open editors.
    const activeEditor = openDefs?.find(
      (def) => def.webViewType === SCRIPTURE_EDITOR_WEBVIEW_TYPE && !def.state?.isReadOnly,
    );
    projectId = activeEditor?.projectId;
  } catch {
    /* WebView service unavailable */
  }

  if (!projectId) return;

  logger.info('Syncing project on shutdown...');
  // Copy to a const so TypeScript knows the type is string inside the bounded-wait callback.
  const syncProjectId = projectId;
  const outcome = await runBoundedShutdownSync('shutdown sync', () =>
    networkService.requestNoRetry(
      serializeRequestType(CATEGORY_COMMAND, 'paratextBibleSendReceive.sendReceiveProjects'),
      [syncProjectId],
    ),
  );
  logShutdownSyncOutcome(outcome);
}

/**
 * Power mode: triggers the S/R extension's session-boundary sync for the projects scheduled "On
 * startup/shutdown" (PT-4162). The extension owns selecting that subset (from PT-4160's schedule
 * store), running the sync, and — deliberately — NOT surfacing conflicts, since the app is closing
 * and there's no UI left to show them in (PT9 parity, PT-4162 design D5). Core only triggers it and
 * bounds the wait with the same scaffold Simple mode uses, so a hung sync can't wedge shutdown open
 * forever.
 */
async function performPowerModeShutdownSync(): Promise<void> {
  logger.info('Syncing scheduled projects on shutdown...');
  const outcome = await runBoundedShutdownSync('power-mode shutdown session sync', () =>
    networkService.requestNoRetry(
      serializeRequestType(CATEGORY_COMMAND, 'paratextBibleSendReceive.runScheduledSessionSync'),
      'shutdown',
    ),
  );
  logShutdownSyncOutcome(outcome);
}

/**
 * Logs the result of a bounded shutdown sync truthfully: "complete" only when `performSync`
 * actually succeeded. A settled-but-failed sync gets its own distinct message (the failure detail
 * itself was already warned about inside {@link runBoundedShutdownSync}); a timed-out sync logs
 * nothing here because {@link runBoundedShutdownSync} already logged the timeout.
 */
function logShutdownSyncOutcome(outcome: ShutdownSyncOutcome): void {
  if (outcome === 'succeeded') logger.info('Sync on shutdown complete');
  else if (outcome === 'failed')
    logger.info('Sync on shutdown finished without succeeding (see warning above)');
}

/**
 * Runs `performSync` in the background and waits for it to settle, bounded by
 * {@link SHUTDOWN_SYNC_TIME_OUT_MS} so a hung sync (or a `runScheduledSessionSync` command that
 * never resolves because it isn't registered — see module doc) can never wedge shutdown open
 * forever. Failures from `performSync` are logged and swallowed here; the caller only decides how
 * to log the overall outcome (see {@link logShutdownSyncOutcome}), it doesn't need to know why a
 * failure happened.
 *
 * This is the one bounded-wait mechanism for shutdown; both Simple mode's `sendReceiveProjects` and
 * Power mode's `runScheduledSessionSync` go through it rather than each inventing their own.
 *
 * @returns The {@link ShutdownSyncOutcome} — `'succeeded'` if `performSync` resolved before the
 *   timeout, `'failed'` if it rejected before the timeout (already warned about above), or
 *   `'timed-out'` if neither happened in time (also already warned about above).
 */
async function runBoundedShutdownSync(
  variableName: string,
  performSync: () => Promise<unknown>,
): Promise<ShutdownSyncOutcome> {
  const syncComplete = new AsyncVariable<boolean>(variableName, SHUTDOWN_SYNC_TIME_OUT_MS);
  (async () => {
    let succeeded = false;
    try {
      await performSync();
      succeeded = true;
    } catch (e) {
      logger.warn(`${variableName} failed or skipped: ${getErrorMessage(e)}`);
    } finally {
      if (!syncComplete.hasTimedOut) syncComplete.resolveToValue(succeeded);
    }
  })();
  try {
    return (await syncComplete.promise) ? 'succeeded' : 'failed';
  } catch {
    logger.warn(
      `${variableName} timed out after ${SHUTDOWN_SYNC_TIME_OUT_MS} ms; continuing shutdown`,
    );
    return 'timed-out';
  }
}
