import { AUTO_SYNC_MAX_DURATION_MS } from '@shared/data/platform.data';
import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import { logger } from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import { settingsService } from '@shared/services/settings.service';
import {
  getAllOpenWebViewDefinitionsWithReachability,
  getOpenWebViewDefinitionsForWindow,
} from '@main/services/web-view.service-router';
import { serializeRequestType } from '@shared/utils/util';
import {
  SCRIPTURE_EDITOR_WEBVIEW_TYPE,
  type SavedWebViewDefinition,
} from '@shared/models/web-view.model';
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
 * - `partial`: only part of the app was covered — a window did not report its open editors, so
 *   whatever it was editing was never in the selection. Covers both a sync that ran for the
 *   projects that did surface and one that had nothing to run because only some windows could be
 *   read. Warned.
 * - `failed`: the sync ran but did not succeed (Power: the command returned `'failed'`). Warned.
 * - `selection-failed`: nothing ran because what the app had open could not be established at all, so
 *   no project could be selected (Simple mode only). The failure detail was already warned where it
 *   was caught. Warned.
 * - `skipped`: nothing ran — nothing scheduled, not due, or already syncing (Power: `'skipped'`), or
 *   every window answered and nothing writable was open anywhere (Simple).
 * - `unreachable`: the S/R call rejected before the timeout (e.g. the command isn't registered). The
 *   failure detail was already warned inside {@link runBoundedShutdownSync}.
 * - `timed-out`: neither settled within {@link AUTO_SYNC_MAX_DURATION_MS} (also already warned there).
 */
type ShutdownSyncOutcome =
  | 'synced'
  | 'partial'
  | 'failed'
  | 'selection-failed'
  | 'skipped'
  | 'unreachable'
  | 'timed-out';

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
 * In Simple mode: cancels any in-progress sync, then S/Rs the projects of all open writable
 * Scripture Editors across every window. All errors are swallowed — extension may not be installed,
 * or may fail — shutdown must never be permanently blocked.
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
 * whichever writable editors happen to be open — for a Power user, possibly projects they
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
  // writable editors happen to be open — for a Power user, possibly projects they excluded from
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

/**
 * Per-window close syncs that are still running.
 *
 * Tracked so the app-shutdown sync can wait for them instead of cancelling them: a closing window's
 * editors are gone once it is, so its own sync is the only thing that can ever cover them, and a
 * quit arriving mid-flight would otherwise abort it with nothing to run in its place.
 */
const inFlightWindowCloseSyncs = new Set<Promise<void>>();

/**
 * Send/Receive what a single window had open, because that window is going away while the app stays
 * up.
 *
 * A window's editors are only visible through that window's own services, so once it is gone
 * nothing can tell that anything was open in it: the shutdown sync fans out over the windows that
 * are still there, and whatever the user was editing in this one would never be sent. The window
 * has to still be alive when this runs.
 *
 * Simple mode only. Power mode syncs the projects the user scheduled for session boundaries, and
 * one window of several closing is not the end of a session — running the session sync here would
 * sync a set of projects that has nothing to do with the window going away, on an event the user
 * never asked to sync on.
 *
 * Nothing is cancelled first, unlike {@link performShutdownTasks}: the app is not going down, so a
 * sync already in progress belongs to a window that is staying.
 *
 * Same error-swallowing contract as {@link performShutdownTasks} — a window must never be left
 * un-closable because the S/R extension is missing or failing.
 *
 * @param closingWindowId Window that is closing
 */
export async function performWindowCloseTasks(closingWindowId: number): Promise<void> {
  const windowCloseSync = (async () => {
    try {
      await performWindowCloseTasksInternal(closingWindowId);
    } catch (e) {
      logger.error(`Unexpected error while syncing the projects of a closing window:`, e);
    }
  })();
  inFlightWindowCloseSyncs.add(windowCloseSync);
  try {
    await windowCloseSync;
  } finally {
    inFlightWindowCloseSyncs.delete(windowCloseSync);
  }
}

async function performWindowCloseTasksInternal(closingWindowId: number): Promise<void> {
  // An unreadable mode skips the sync rather than falling through to Simple mode's behavior, for the
  // same reason performShutdownTasksInternal does: Simple mode would S/R whichever writable editors
  // are open, which for a Power user may be projects they deliberately excluded from their schedule.
  let interfaceMode: SettingTypes['platform.interfaceMode'] | undefined;
  try {
    interfaceMode = await settingsService.get('platform.interfaceMode');
  } catch (e) {
    logger.warn(
      `Could not read platform.interfaceMode; skipping the sync for closing window ${closingWindowId}: ${getErrorMessage(e)}`,
    );
    return;
  }
  if (interfaceMode !== 'simple') return;

  let projectIds: string[];
  try {
    projectIds = getWritableEditorProjectIds(
      await getOpenWebViewDefinitionsForWindow(closingWindowId),
    );
  } catch (e) {
    // Said plainly rather than swallowed: this is the last moment anything can know what this
    // window had open, so a failure here means those edits go unsynced with nothing to correct it
    // later.
    logger.warn(
      `Could not read what closing window ${closingWindowId} had open, so anything unsynced in it is not covered by a sync: ${getErrorMessage(e)}`,
    );
    return;
  }
  if (projectIds.length === 0) return;

  logger.info(
    `Syncing the projects of closing window ${closingWindowId}: ${projectIds.join(', ')}`,
  );
  const settlement = await runBoundedShutdownSync(`window ${closingWindowId} close sync`, () =>
    networkService.requestNoRetry(
      serializeRequestType(CATEGORY_COMMAND, 'paratextBibleSendReceive.sendReceiveProjects'),
      projectIds,
    ),
  );
  // The already-warned settlements (`failed`, `timedOut`) add nothing here
  if (settlement.status === 'completed')
    logger.info(`Sync for closing window ${closingWindowId} complete`);
}

/**
 * The projects of the writable Scripture Editors among a set of open web views, without duplicates.
 *
 * Read-only Resource Viewers are left out because no local change is possible in them. Duplicates
 * are dropped because two windows may have editors on the same project and `sendReceiveProjects`
 * should not be asked to sync it twice.
 */
function getWritableEditorProjectIds(definitions: SavedWebViewDefinition[]): string[] {
  const writableEditorProjectIds = definitions
    .filter(
      (definition) =>
        definition.webViewType === SCRIPTURE_EDITOR_WEBVIEW_TYPE && !definition.state?.isReadOnly,
    )
    .map((definition) => definition.projectId)
    .filter((id) => id !== undefined);
  return [...new Set(writableEditorProjectIds)];
}

async function performSimpleModeShutdownSync(): Promise<void> {
  // A window that closed a moment ago is already syncing what went with it, and nothing else can:
  // its editors only ever existed in it. Waited for rather than cancelled below — it is bounded by
  // the same shutdown wait everything else here is, so the cost is a delay and the alternative is
  // that window's edits never going out at all.
  if (inFlightWindowCloseSyncs.size > 0) {
    logger.info(
      `Waiting for ${inFlightWindowCloseSyncs.size} closing window sync(s) before cancelling in-progress syncs for shutdown`,
    );
    await Promise.allSettled([...inFlightWindowCloseSyncs]);
  }

  // Cancel any in-progress sync first (e.g. a first-sync on startup), then S/R the active project.
  try {
    await networkService.requestNoRetry(
      serializeRequestType(CATEGORY_COMMAND, 'paratextBibleSendReceive.cancelSync'),
    );
  } catch {
    /* no sync in progress, or extension unavailable */
  }

  // S/R the project of every open writable Scripture Editor.
  // If only read-only Resource Viewers are open (no local changes possible), skip S/R.
  let projectIds: string[] = [];
  /** Windows whose editors are missing from the selection below, so the sync cannot cover them */
  let unreachableWindowIdsForSync: number[] = [];
  /** Whether the selection could not be made at all, so no window's editors are covered */
  let didSelectionFail = false;
  try {
    const { definitions: openWebViewDefinitions, unreachableWindowIds } =
      await getAllOpenWebViewDefinitionsWithReachability();
    unreachableWindowIdsForSync = unreachableWindowIds;
    // Only genuine Simple mode reaches here — Power mode selects by schedule (see
    // performPowerModeShutdownSync) and an unreadable mode returns early above rather than falling
    // through. The main-process WebView service fans this call out across every open window and
    // merges the results, so more than one writable Scripture Editor can appear here even in Simple
    // mode — one per window. Take them all: picking a single one would leave the other windows'
    // edits unsynced.
    projectIds = getWritableEditorProjectIds(openWebViewDefinitions);
  } catch (e) {
    // The same loss the coverage warning below reports, for every window at once: this is the last
    // moment anything can know what the app had open, so nothing selected here means nothing gets
    // sent. Said out loud, and followed by an outcome, so the log never shows a silent shutdown.
    logger.warn(
      `Could not establish what any window had open, so nothing unsynced anywhere is covered by a shutdown sync: ${getErrorMessage(e)}`,
    );
    didSelectionFail = true;
  }

  // Said before the sync runs, and said even when nothing is left to sync: a window that could not
  // report its open editors is indistinguishable from one with nothing open, so whatever it was
  // editing is simply absent from the selection below. The sync goes ahead with the projects that
  // did surface — some coverage beats none while the app is closing — but it is not the whole app,
  // and "Sync on shutdown complete" must not be the last word on it.
  if (unreachableWindowIdsForSync.length > 0)
    logger.warn(
      `Shutdown sync coverage is incomplete: windows ${unreachableWindowIdsForSync.join(', ')} did not report their open editors, so anything unsynced in them is not covered by this sync.`,
    );

  if (didSelectionFail) {
    logShutdownSyncOutcome('selection-failed');
    return;
  }
  if (projectIds.length === 0) {
    // "Nothing writable was open" is only what was established if every window said so. When one
    // could not be asked, this is the coverage gap the selection just ran into, and recording it as
    // a deliberate skip would put the quietest line in the log on the run most likely to have
    // dropped someone's unsynced work.
    logShutdownSyncOutcome(unreachableWindowIdsForSync.length > 0 ? 'partial' : 'skipped');
    return;
  }

  logger.info(`Syncing projects on shutdown: ${projectIds.join(', ')}`);
  // `sendReceiveProjects` takes the whole list in one call, so every open editor's project goes out
  // as a single S/R under one bounded wait rather than N serial syncs racing the shutdown timeout.
  const settlement = await runBoundedShutdownSync('shutdown sync', () =>
    networkService.requestNoRetry(
      serializeRequestType(CATEGORY_COMMAND, 'paratextBibleSendReceive.sendReceiveProjects'),
      projectIds,
    ),
  );
  // The nothing-to-do states already returned above, so reaching here means at least one writable
  // project was selected and a resolution is a completed S/R — of the projects that were found. A
  // window that never answered keeps this from being reported as a clean, complete sync.
  let outcome: ShutdownSyncOutcome;
  if (settlement.status === 'timedOut') outcome = 'timed-out';
  else if (settlement.status === 'failed') outcome = 'unreachable';
  else if (unreachableWindowIdsForSync.length > 0) outcome = 'partial';
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
 * {@link AUTO_SYNC_MAX_DURATION_MS} is the ONLY real bound on this call: the S/R extension registers
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
    case 'partial':
      logger.warn('Sync on shutdown covered only the part of the app that could be read');
      break;
    case 'failed':
      logger.warn('Sync on shutdown ran but reported failure');
      break;
    case 'selection-failed':
      logger.warn(
        'Sync on shutdown did not run: what the app had open could not be established, so nothing could be selected to sync',
      );
      break;
    case 'skipped':
      logger.debug(
        'Sync on shutdown skipped (nothing writable open, nothing scheduled, not due, or already syncing)',
      );
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
 * {@link AUTO_SYNC_MAX_DURATION_MS} so a genuinely hung sync can never wedge shutdown open forever.
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
    AUTO_SYNC_MAX_DURATION_MS,
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
        `${variableName} timed out after ${AUTO_SYNC_MAX_DURATION_MS} ms; continuing shutdown`,
      );
      return { status: 'timedOut' };
    }
    logger.warn(`${variableName} did not complete: ${getErrorMessage(e)}`);
    return { status: 'failed' };
  }
}
