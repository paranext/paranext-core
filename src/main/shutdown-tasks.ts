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
import {
  RUN_SCHEDULED_SESSION_SYNC_REQUEST_TYPE,
  type ScheduledSessionSyncResult,
  type SessionSyncBoundary,
} from '@main/scheduled-session-sync.util';
import type { SettingTypes } from 'papi-shared-types';
import { AsyncVariable, getErrorMessage } from 'platform-bible-utils';

/**
 * Behaviour-driving outcome of a bounded shutdown sync. The extension reports its own result, so
 * this carries what actually happened and {@link logShutdownSyncOutcome} can log it truthfully
 * rather than always claiming "complete":
 *
 * - `synced`: the sync ran and completed (Simple: the S/R resolved; Power: the command returned
 *   `'synced'`).
 * - `failed`: the sync ran but did not succeed (Power: the command returned `'failed'`). Warned.
 * - `skipped`: nothing ran — nothing scheduled, not due, or already syncing (Power: `'skipped'`).
 * - `unreachable`: the S/R call rejected before the timeout (e.g. the command isn't registered). The
 *   failure detail was already warned inside {@link runBoundedShutdownSync}.
 * - `timed-out`: neither settled within {@link SHUTDOWN_SYNC_TIME_OUT_MS} (also already warned there).
 */
type ShutdownSyncOutcome = 'synced' | 'failed' | 'skipped' | 'unreachable' | 'timed-out';

/**
 * How a {@link runBoundedShutdownSync} bounded wait settled, before the mode-specific caller maps it
 * to a {@link ShutdownSyncOutcome}: `performSync` resolved (its value is in `result`), rejected
 * (already warned), or the wait timed out (already warned).
 */
type BoundedSyncSettlement<T> =
  | { status: 'completed'; result: T }
  | { status: 'failed' }
  | { status: 'timedOut' };

/**
 * Runs cleanup tasks (e.g., syncing projects) when the user closes the main window.
 *
 * In Simple mode: cancels any in-progress sync, then S/Rs the open writable Scripture Editor's
 * project. All errors are swallowed — extension may not be installed, or may fail — shutdown must
 * never be permanently blocked.
 *
 * In Power mode: S/Rs the projects scheduled "On startup/shutdown" via the S/R extension's
 * `runScheduledSessionSync` command. Same error-swallowing contract — if the command isn't
 * registered (e.g. plain Platform.Bible with no S/R extension), this is a logged no-op, never a
 * crash or a wedged shutdown. No edit-block and no conflict surfacing here: the app is closing, so
 * there is nothing left to protect and no UI to show a result in — conflicts are surfaced again on
 * next startup instead.
 *
 * If the interface-mode setting can't be read: skips the automatic shutdown S/R entirely and warns,
 * rather than falling through to Simple mode's open-editor S/R. The read can fail exactly when the
 * app is closing (the extension host may already be tearing down), and Simple mode would S/R
 * whichever writable editor happens to be open — for a Power user, possibly a project they
 * deliberately excluded from their schedule. Symmetric with {@link performStartupTasks}.
 */
export async function performShutdownTasks(): Promise<void> {
  try {
    await performShutdownTasksInternal();
  } catch (e) {
    logger.error('Unexpected error during shutdown tasks:', e);
  }
}

async function performShutdownTasksInternal(): Promise<void> {
  // An unreadable mode must NOT fall through to Simple mode's open-editor S/R (symmetric with
  // startup): the read can fail exactly when the app is closing, and Simple mode S/Rs whatever
  // writable editor happens to be open — for a Power user, possibly a project they excluded from
  // their schedule. When we can't tell the mode, skip the automatic shutdown S/R and warn.
  let interfaceMode: SettingTypes['platform.interfaceMode'] | undefined;
  try {
    interfaceMode = await settingsService.get('platform.interfaceMode');
  } catch (e) {
    logger.warn(
      `Could not read platform.interfaceMode; skipping automatic shutdown sync: ${getErrorMessage(e)}`,
    );
    return;
  }

  if (interfaceMode === 'power') {
    await performPowerModeShutdownSync();
    return;
  }

  // The setting's type and its runtime validator close the union to 'simple' | 'power', so 'simple'
  // is the only value left here — Simple mode is the fall-through, not a checked branch. A future
  // third mode would be a compile error here, not a silent no-S/R.
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
    // Only genuine Simple mode reaches here — Power mode selects by schedule (see
    // performPowerModeShutdownSync) and an unreadable mode now returns early above rather than
    // falling through. Simple mode allows at most one writable Scripture Editor at a time, so find()
    // is sufficient.
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
  const settlement = await runBoundedShutdownSync('shutdown sync', () =>
    networkService.requestNoRetry(
      serializeRequestType(CATEGORY_COMMAND, 'paratextBibleSendReceive.sendReceiveProjects'),
      [syncProjectId],
    ),
  );
  // Simple mode has no "skipped" state: reaching here means a writable project was selected, so a
  // resolution is a completed S/R.
  let outcome: ShutdownSyncOutcome;
  if (settlement.status === 'timedOut') outcome = 'timed-out';
  else if (settlement.status === 'failed') outcome = 'unreachable';
  else outcome = 'synced';
  logShutdownSyncOutcome(outcome);
}

/**
 * Power mode: triggers the S/R extension's session-boundary sync for the projects scheduled "On
 * startup/shutdown". The extension owns selecting that subset (from its schedule store), running
 * the sync, and — deliberately — NOT surfacing conflicts, since the app is closing and there's no
 * UI left to show them in (PT9 parity). Core only triggers it and bounds the wait with the same
 * scaffold Simple mode uses, logging the reported outcome.
 *
 * There is deliberately no boot-race retry here, unlike startup
 * (`requestSessionSyncWithBootRetry`). A shutdown boot race is near-impossible: this only runs when
 * the user closes the window, which in normal use is long after the extension host has activated
 * and registered its commands — the cold-boot activation window the startup retry exists to absorb
 * has closed by the time anyone quits. If the command genuinely isn't registered (e.g. no S/R
 * extension), it rejects fast and this is a logged no-op, the right outcome at shutdown anyway;
 * retrying would only fight the window hang below, since the window is already held open waiting on
 * this one sync.
 *
 * {@link SHUTDOWN_SYNC_TIME_OUT_MS} is the ONLY real bound on this call: the S/R extension registers
 * `runScheduledSessionSync` with its per-request timeout disabled (a scheduled sync can
 * legitimately run long), so `requestNoRetry` has no client-side timeout of its own here. If the
 * extension ever stopped disabling that timeout, this would silently become a ~30 s truncation that
 * could kill a real sync mid-flight — so that cross-repo dependency is called out on purpose.
 */
async function performPowerModeShutdownSync(): Promise<void> {
  const settlement = await runBoundedShutdownSync('power-mode shutdown session sync', () =>
    networkService.requestNoRetry<[SessionSyncBoundary], ScheduledSessionSyncResult | undefined>(
      RUN_SCHEDULED_SESSION_SYNC_REQUEST_TYPE,
      'shutdown',
    ),
  );
  let outcome: ShutdownSyncOutcome;
  if (settlement.status === 'timedOut') outcome = 'timed-out';
  else if (settlement.status === 'failed') outcome = 'unreachable';
  // Tolerate a legacy void resolution (an older extension that returned `Promise<void>`): treat a
  // missing result as a completed sync.
  else outcome = settlement.result ?? 'synced';
  logShutdownSyncOutcome(outcome);
}

/**
 * Logs a {@link ShutdownSyncOutcome} truthfully — "complete" only when a sync actually ran and
 * succeeded. A sync that ran but reported failure warns; a deliberate skip (nothing scheduled) is
 * debug-only; and the already-warned cases (`unreachable`, `timed-out`) add nothing here.
 */
function logShutdownSyncOutcome(outcome: ShutdownSyncOutcome): void {
  switch (outcome) {
    case 'synced':
      logger.info('Sync on shutdown complete');
      break;
    case 'failed':
      logger.warn('Sync on shutdown ran but reported failure');
      break;
    case 'skipped':
      logger.debug('Sync on shutdown skipped (nothing scheduled, not due, or already syncing)');
      break;
    case 'unreachable':
    case 'timed-out':
      // The failure detail was already logged inside runBoundedShutdownSync; nothing truthful to add.
      break;
    default:
      break;
  }
}

/**
 * Runs `performSync` in the background and waits for it to settle, bounded by
 * {@link SHUTDOWN_SYNC_TIME_OUT_MS} so a genuinely hung sync can never wedge shutdown open forever.
 * The timeout is load-bearing for a _hung_ sync specifically: an unregistered command does NOT hang
 * — it rejects fast with MethodNotFound, which surfaces as a `failed` settlement (this is exactly
 * what startup's retry loop is built on). What the bound actually guards against is that the S/R
 * extension registers `runScheduledSessionSync` with its per-request timeout disabled (see
 * {@link performPowerModeShutdownSync}), so `requestNoRetry` has no client-side timeout of its own.
 *
 * Failures from `performSync` are warned and swallowed here; the caller maps the returned
 * settlement to a {@link ShutdownSyncOutcome} for the truthful summary log.
 *
 * This is the one bounded-wait mechanism for shutdown; both Simple mode's `sendReceiveProjects` and
 * Power mode's `runScheduledSessionSync` go through it rather than each inventing their own.
 */
async function runBoundedShutdownSync<T>(
  variableName: string,
  performSync: () => Promise<T>,
): Promise<BoundedSyncSettlement<T>> {
  const syncComplete = new AsyncVariable<BoundedSyncSettlement<T>>(
    variableName,
    SHUTDOWN_SYNC_TIME_OUT_MS,
  );
  (async () => {
    let settlement: BoundedSyncSettlement<T>;
    try {
      settlement = { status: 'completed', result: await performSync() };
    } catch (e) {
      logger.warn(`${variableName} failed or skipped: ${getErrorMessage(e)}`);
      settlement = { status: 'failed' };
    }
    // `resolveToValue` is a no-op (not a throw) once the timeout already settled the variable, so no
    // `hasTimedOut` guard is needed to avoid a double-settle here.
    syncComplete.resolveToValue(settlement);
  })();
  try {
    return await syncComplete.promise;
  } catch (e) {
    // Branch on `hasTimedOut` rather than assuming every rejection is the timeout: the AsyncVariable
    // timer is the only rejection path today, but a future cancel-on-quit path shouldn't be
    // mislabelled as a 10-minute timeout.
    if (syncComplete.hasTimedOut) {
      logger.warn(
        `${variableName} timed out after ${SHUTDOWN_SYNC_TIME_OUT_MS} ms; continuing shutdown`,
      );
      return { status: 'timedOut' };
    }
    logger.warn(`${variableName} did not complete: ${getErrorMessage(e)}`);
    return { status: 'failed' };
  }
}
