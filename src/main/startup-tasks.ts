import {
  isJsonRpcMethodNotFoundError,
  JSON_RPC_REQUEST_TIMED_OUT_MESSAGE_PREFIX,
  MAX_REQUEST_ATTEMPTS,
  REQUEST_ATTEMPT_WAIT_TIME_MS,
} from '@shared/data/rpc.model';
import * as commandService from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import { settingsService } from '@shared/services/settings.service';
import {
  RUN_SCHEDULED_SESSION_SYNC_REQUEST_TYPE,
  type ScheduledSessionSyncResult,
  type SessionSyncBoundary,
} from '@main/scheduled-session-sync.util';
import { waitForScriptureWorkspaceReady } from '@main/startup-readiness.util';
import type { SettingTypes } from 'papi-shared-types';
import { getErrorMessage, wait } from 'platform-bible-utils';

/**
 * How long (ms) to keep retrying `runScheduledSessionSync` while it's still unregistered before
 * giving up. Boot-appropriate budget: live E2E testing (2026-07-16) observed the extension host
 * take longer than the shared `networkService.request` retry policy's ~9 s ceiling
 * ({@link MAX_REQUEST_ATTEMPTS} × {@link REQUEST_ATTEMPT_WAIT_TIME_MS}) to activate the send-receive
 * extension — all 10 attempts got back a "method not found" response, and the startup sync silently
 * never ran even though the extension activated moments later. That shared policy is tuned for
 * steady-state requests against handlers that are normally already registered; it isn't meant to
 * (and shouldn't, for every other caller's sake) absorb the much longer, one-time race against
 * extension-host activation at cold boot. Hence this module keeps its own longer, gentler retry
 * budget locally instead of changing the shared default.
 *
 * Exported so the retry tests can drive fake timers by the exact same duration rather than
 * duplicating the literal (mirrors `AUTO_SYNC_MAX_DURATION_MS` in `shutdown-tasks.ts`).
 */
export const STARTUP_SYNC_RETRY_BUDGET_MS = 120_000;

/**
 * How long (ms) after the main window becomes interactive a still-pending "startup" sync may still
 * be fired. The boot-race loop keeps retrying up to {@link STARTUP_SYNC_RETRY_BUDGET_MS}, but a
 * trigger that only lands well into the session is no longer a "startup" moment: firing it would
 * raise the S/R extension's editing-block — the guard that blocks editing a project while it is
 * syncing — on an editor the user has by now opened and started typing in, with no apparent cause.
 * Past this window the trigger is dropped (those projects sync at the next session boundary
 * instead).
 *
 * Anchored to window-interactive time (supplied by main via
 * {@link StartupTasksSignals.getWindowInteractiveElapsedMs}), not process start, so a slow _window_
 * boot still gets its startup sync — only a slow _user_ does not — and the full retry budget stays
 * usable when the window itself comes up late. Shorter than the budget so the block-raising window
 * is bounded even though the budget is longer.
 */
const STARTUP_SYNC_FRESHNESS_WINDOW_MS = 30_000;

/**
 * Cadence (ms) for the first {@link INITIAL_RETRY_ATTEMPTS} retry attempts. Aliased from the shared
 * `requestWithRetry` cadence ({@link REQUEST_ATTEMPT_WAIT_TIME_MS}) — rather than re-declaring the
 * literal — so the common case (the extension activates within the first few seconds) behaves the
 * same as the shared policy, including if that policy is ever retuned; only the long tail beyond
 * that gets the gentler {@link EXTENDED_RETRY_INTERVAL_MS} cadence.
 */
const INITIAL_RETRY_INTERVAL_MS = REQUEST_ATTEMPT_WAIT_TIME_MS;

/**
 * Number of attempts at {@link INITIAL_RETRY_INTERVAL_MS} before backing off to the gentler
 * {@link EXTENDED_RETRY_INTERVAL_MS} cadence for the remainder of
 * {@link STARTUP_SYNC_RETRY_BUDGET_MS}. Aliased from the shared {@link MAX_REQUEST_ATTEMPTS} for the
 * same stay-in-lockstep reason as {@link INITIAL_RETRY_INTERVAL_MS}.
 */
const INITIAL_RETRY_ATTEMPTS = MAX_REQUEST_ATTEMPTS;

/** Cadence (ms) for retry attempts once {@link INITIAL_RETRY_ATTEMPTS} is exhausted. */
const EXTENDED_RETRY_INTERVAL_MS = 2000;

/**
 * Optional signals `performStartupTasks` receives from the main process. All are omitted in unit
 * tests that drive the sync logic directly, in which case behavior is unchanged (never aborts,
 * never goes stale, always allowed to fire). `getWindowInteractiveElapsedMs` steers only Power
 * mode's freshness window — Simple mode has no freshness concept — and `readinessAbortSignal` and
 * `canFireStartupSync` steer only Simple mode's readiness gate; `abortSignal` applies to both.
 */
export interface StartupTasksSignals {
  /**
   * Stops the startup tasks once the app has begun going down by EITHER route — a quit, or the last
   * window closing. Aborted unconditionally, which is the behavior this signal has always had.
   *
   * - The Power-mode boot-race retry loop. Stops it from (a) firing
   *   `runScheduledSessionSync('startup')` after `('shutdown')` already fired and (b) issuing a
   *   request that would resurrect the network connection `networkService.shutdown()` is tearing
   *   down. Deliberately NOT consulted by Simple mode's post-readiness path. A macOS last-window
   *   close makes `isAppShuttingDown()` true, so this signal aborts on exactly the close
   *   {@link StartupTasksSignals.readinessAbortSignal} exists to survive; re-checking it after the
   *   wait would make that carve-out unreachable. Simple mode's hard stop is
   *   {@link StartupTasksSignals.canFireStartupSync}, evaluated live at fire time.
   *
   * Wired to `will-quit` and the window close in `main.ts`.
   */
  abortSignal?: AbortSignal;
  /**
   * Stops Simple mode's readiness wait ({@link waitForScriptureWorkspaceReady}) specifically.
   *
   * Separate from {@link StartupTasksSignals.abortSignal} because the two answer different
   * questions. This one is aborted only when the app is really going away — on macOS, closing the
   * last window leaves the app resident, and the startup tasks run once per PROCESS, so aborting
   * there would drop the startup sync for the rest of the process's life even though a dock
   * reactivation still wants it. See `shouldWindowCloseAbortReadinessWait` in
   * `shutdown-latch.service.ts`. Keeping it separate is also what stops that macOS exception
   * leaking into Power mode's loop, which must keep aborting on any shutdown.
   *
   * Omitted (or equal to {@link StartupTasksSignals.abortSignal}) is fine; it just means the wait
   * has no separate escape hatch.
   */
  readinessAbortSignal?: AbortSignal;
  /**
   * Whether the app is still in a state where firing the Simple-mode startup sync makes sense,
   * asked immediately before the command goes out.
   *
   * Needed because {@link StartupTasksSignals.readinessAbortSignal} deliberately survives a macOS
   * last-window close: without this re-check, a wait parked for up to the readiness budget could
   * resolve minutes later and fire a whole-workspace Send/Receive into a resident but WINDOWLESS
   * app — after the shutdown sync already ran, with no UI to report progress or failure into. Main
   * answers `false` in that state, so the sync survives only into a session that actually has a
   * window (a dock reactivation), which is the only case the exception exists to serve.
   *
   * Omitted means "always allowed to fire", preserving today's behavior for tests.
   */
  canFireStartupSync?: () => boolean;
  /**
   * How long (ms) the main window has been interactive, or `undefined` if it has not been shown
   * yet. The freshness anchor for {@link STARTUP_SYNC_FRESHNESS_WINDOW_MS} — consulted only by Power
   * mode; Simple mode has no freshness window of its own (see the readiness gate's TSDoc on
   * {@link performStartupTasks} for why).
   */
  getWindowInteractiveElapsedMs?: () => number | undefined;
}

/**
 * Why {@link requestSessionSyncWithBootRetry} stopped without throwing, so
 * {@link performPowerModeStartupSync} can log each case truthfully:
 *
 * - One of {@link ScheduledSessionSyncResult} — the command ran and reported that result;
 * - `'skipped-stale'` — the startup moment went stale before the command registered, so the trigger
 *   was dropped rather than fired late onto an active editor;
 * - `'aborted'` — the app began quitting before the command registered.
 */
type StartupSyncTriggerOutcome = ScheduledSessionSyncResult | 'skipped-stale' | 'aborted';

/**
 * Runs initialization tasks (currently: triggering an initial project sync) shortly after the app
 * finishes starting up.
 *
 * In Simple mode: waits (bounded) for this workspace's scripture project data provider factories to
 * be registered and answering — see {@link waitForScriptureWorkspaceReady} — then requests a sync of
 * all locally-known shared projects so the user sees the latest content as soon as they open the
 * app. The wait exists because this sync saturates the .NET data provider and would otherwise
 * starve the very factory registration the project picker waits on, leaving the picker locked while
 * the rest of the UI looks loaded. On an exhausted readiness budget the sync still fires — it is
 * delayed, never suppressed. The two exceptions are shutdown and a windowless app: a quit aborts
 * the wait, and a wait that outlives a macOS last-window close (see
 * {@link StartupTasksSignals.readinessAbortSignal}) is not allowed to fire into a resident app with
 * no windows (see {@link StartupTasksSignals.canFireStartupSync}). All errors are swallowed — the
 * S/R extension may not be installed (e.g. Platform.Bible), the command may not yet be registered,
 * or the sync may fail. Startup must never be blocked or visibly affected by this.
 *
 * In Power mode: requests a sync of just the projects scheduled "On startup/shutdown" via the S/R
 * extension's `runScheduledSessionSync` command. Same error-swallowing contract as Simple mode — if
 * the S/R extension hasn't registered the command yet (or at all, e.g. plain Platform.Bible), this
 * is a logged no-op, never a crash or a blocked startup.
 *
 * If the interface-mode setting can't be read: skips the automatic startup sync entirely and warns,
 * rather than falling through to Simple mode's "sync everything". The read can fail under the same
 * slow-cold-boot conditions the Power retry budget exists for, and Simple's no-ID `syncProjects`
 * would S/R every locally-known shared project — overriding a Power user's schedule. Mirrors the
 * symmetric gating in {@link performShutdownTasks}.
 */
export async function performStartupTasks(signals?: StartupTasksSignals): Promise<void> {
  try {
    await performStartupTasksInternal(signals);
  } catch (e) {
    logger.warn(`Unexpected error during startup tasks: ${getErrorMessage(e)}`);
  }
}

async function performStartupTasksInternal(signals?: StartupTasksSignals): Promise<void> {
  logger.debug('performStartupTasks invoked');

  // An unreadable mode must NOT fall through to Simple mode's "sync everything": the read can fail
  // under exactly the slow-cold-boot conditions the Power retry budget exists to tolerate, and
  // Simple's no-ID `syncProjects` fires an S/R of every locally-known shared project, overriding a
  // Power user's schedule and syncing projects they deliberately excluded. When we can't tell the
  // mode, the safe default is to skip the automatic startup sync this session and warn.
  let interfaceMode: SettingTypes['platform.interfaceMode'] | undefined;
  try {
    interfaceMode = await settingsService.get('platform.interfaceMode');
  } catch (e) {
    logger.warn(
      `Could not read platform.interfaceMode; skipping automatic startup sync: ${getErrorMessage(e)}`,
    );
    return;
  }
  logger.debug(`performStartupTasks: interfaceMode=${interfaceMode}`);

  if (interfaceMode === 'power') {
    await performPowerModeStartupSync(signals);
    return;
  }

  // The setting's type and its runtime validator (`interfaceModeValidator`) close the union to
  // 'simple' | 'power', so once 'power' is handled and an unreadable mode has already returned
  // above, 'simple' is the only value left — hence Simple mode is the fall-through rather than a
  // checked branch. A future third mode would be a compile error here (interfaceMode is typed from
  // the setting), not a silent no-sync.

  const gatesBeforeWait = await evaluateSimpleModeSyncGates();
  if (!gatesBeforeWait.run) {
    logger.debug(`Startup sync skipped: ${gatesBeforeWait.reason}`);
    return;
  }

  // Readiness gate: this is a whole-workspace Send/Receive served by the .NET data provider. Firing
  // it before the scripture project data provider factories are up starves their registration — the
  // project picker then waits on a factory that never appears and stays locked, with the rest of
  // the UI looking loaded. Wait, bounded, for the workspace to be able to list scripture projects.
  //
  // Deliberately NOT freshness-gated the way Power mode is (STARTUP_SYNC_FRESHNESS_WINDOW_MS): the
  // scripture editor needs the very factory this gate waits on, so readiness necessarily resolves
  // before the user can be editing, and dropping the sync outright would contradict this task's
  // contract that the startup sync is delayed but never suppressed.
  //
  // This path runs on `readinessAbortSignal` throughout — the wait below AND the abort check after
  // it — falling back to `abortSignal` only when main supplies no separate signal (unit tests).
  //
  // It must NOT also consult `abortSignal`: a macOS last-window close makes `isAppShuttingDown()`
  // true via `areAllWindowsClosing()`, so main aborts that signal on exactly the close the readiness
  // carve-out exists for. Re-checking it here would make the carve-out unreachable — the wait would
  // survive the close and then be discarded as "quitting" anyway, and `readinessAbortSignal` /
  // `canFireStartupSync` could never change any outcome.
  //
  // Dropping that check costs nothing, because the hard stop moved somewhere strictly better:
  // `canFireStartupSync` below is evaluated live at fire time and answers `false` for BOTH ways the
  // app can be un-syncable — shutting down (quit requested, or every window closing) and resident
  // but windowless. A latched signal can only report a moment that has already passed.
  const readinessAbortSignal = signals?.readinessAbortSignal ?? signals?.abortSignal;
  const readiness = await waitForScriptureWorkspaceReady({ abortSignal: readinessAbortSignal });

  // Covers a gate that reported 'aborted' and a quit that landed while it was still resolving
  // (readiness settling with a non-'aborted' outcome does not guarantee the app wasn't already
  // quitting by the time it resolved — e.g. a quit landing while the readiness gate's own probe was
  // in flight). Ordered before the 'timed-out' warn below so a sync that is about to be skipped
  // never gets logged as "syncing anyway".
  if (readiness.outcome === 'aborted' || readinessAbortSignal?.aborted) {
    logger.debug('Startup sync skipped: app is quitting');
    return;
  }
  if (readiness.outcome === 'timed-out')
    logger.warn(
      `Startup sync: scripture project data providers did not become ready (${readiness.detail}); syncing anyway`,
    );

  // Settings can change during a wait that may park for up to the readiness budget (120 s): a user
  // who switches to Power mode, or turns off automatic sync, while this was parked must not get a
  // no-ID `syncProjects` anyway on the way out — that is exactly the harm the unreadable-mode guard
  // above exists to prevent, just triggered by elapsed time instead of a read failure.
  const gatesAfterWait = await evaluateSimpleModeSyncGates();
  if (!gatesAfterWait.run) {
    logger.debug(`Startup sync skipped after the readiness wait: ${gatesAfterWait.reason}`);
    return;
  }

  // Last check before the command goes out: is there still an app to sync FOR? The readiness wait
  // deliberately survives a macOS last-window close (see `readinessAbortSignal`), which leaves one
  // state that signal cannot describe — resident, not quitting, no windows. Firing here
  // would run a whole-workspace Send/Receive after the shutdown sync already ran, into a process
  // with no UI to report progress or failure into. Skip instead; the surviving wait then pays off
  // only when a dock reactivation has brought a window back, which is the case it exists for.
  if (signals?.canFireStartupSync && !signals.canFireStartupSync()) {
    logger.debug('Startup sync skipped: the app has no window to sync for');
    return;
  }

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

/** What {@link evaluateSimpleModeSyncGates} decided, and why when it decided not to run. */
type SimpleModeSyncGateResult = { run: true } | { run: false; reason: string };

/**
 * Evaluates the three settings gates that must all pass before the Simple-mode startup sync fires:
 * `platform.interfaceMode` must still be `'simple'`, `platform.firstRunComplete` must be `true`,
 * and `platform.syncOnStartup` must not be `false`.
 *
 * Called twice by {@link performStartupTasksInternal} — once before the readiness wait and again
 * immediately after it, since that wait can park for up to the readiness budget (120 s) and any of
 * the three can change underneath it. Each call independently re-reads all three settings, so the
 * second call reflects whatever the user did during the wait rather than a value cached from before
 * it — this is what lets the post-wait call catch a mode switch or a sync-consent change that
 * happened while parked.
 *
 * Preserves today's exact per-setting semantics:
 *
 * - An unreadable `platform.interfaceMode` never falls through to "sync everything": the read can
 *   fail under the same slow-cold-boot conditions the Power retry budget exists to tolerate, and
 *   Simple's no-ID `syncProjects` would S/R every locally-known shared project, overriding a Power
 *   user's schedule. Logged as a warning (production-visible even in packaged builds).
 * - A mode that has moved away from `'simple'` (e.g. to `'power'`, mid-wait) is also `run: false` —
 *   this function only ever green-lights the Simple-mode sync.
 * - An unreadable or `false` `platform.firstRunComplete` skips (consent-safe: a fresh user must not
 *   sync before consenting, and an unreadable flag defaults to NOT syncing).
 * - `platform.syncOnStartup === false` skips (the user explicitly opted out). An unreadable flag
 *   defaults to PROCEEDING with sync instead (consent-safe the other way: a read failure should not
 *   silently suppress a sync the user never actually declined). Logged as a warning.
 */
async function evaluateSimpleModeSyncGates(): Promise<SimpleModeSyncGateResult> {
  // Re-reads the mode even though the caller already read one to pick this branch. Not redundant:
  // that read asks "which mode, and can we tell at all?", this one asks "is it STILL simple?" — and
  // the post-wait call exists precisely because the answer can change while the gate is parked.
  let interfaceMode: SettingTypes['platform.interfaceMode'] | undefined;
  try {
    interfaceMode = await settingsService.get('platform.interfaceMode');
  } catch (e) {
    const reason = `could not read platform.interfaceMode: ${getErrorMessage(e)}`;
    logger.warn(`Startup sync: ${reason}`);
    return { run: false, reason };
  }
  if (interfaceMode !== 'simple')
    return { run: false, reason: 'interface mode is no longer simple' };

  // First-run gate: skip auto-sync until the simple-mode wizard completes, so a fresh user never
  // syncs before consenting. On an unreadable flag, default to NOT syncing (consent-safe).
  let firstRunComplete = false;
  try {
    firstRunComplete = (await settingsService.get('platform.firstRunComplete')) === true;
  } catch (e) {
    logger.warn(
      `Could not read platform.firstRunComplete; skipping startup sync: ${getErrorMessage(e)}`,
    );
  }
  if (!firstRunComplete) return { run: false, reason: 'first run not complete' };

  // Sync-consent gate: if the user chose "Skip automatic sync" on the sync-consent step, honor that
  // permanently. On an unreadable flag, default to syncing (consent-safe: the user likely never
  // explicitly skipped — a read failure here should not silently suppress a legitimate sync).
  let syncDisabled = false;
  try {
    syncDisabled = (await settingsService.get('platform.syncOnStartup')) === false;
  } catch (e) {
    logger.warn(
      `Could not read platform.syncOnStartup; proceeding with sync: ${getErrorMessage(e)}`,
    );
  }
  if (syncDisabled) return { run: false, reason: 'platform.syncOnStartup is false' };

  return { run: true };
}

/**
 * Power mode: triggers the S/R extension's session-boundary sync for the projects scheduled "On
 * startup/shutdown". The extension owns everything else — reading its schedule store for the
 * `onStartupShutdown` subset, running the sync, raising/clearing the editing-block for its
 * duration, stamping `lastRunAt`, and opening the results view on conflicts/errors. Core only
 * triggers it and logs the reported outcome; startup is never blocked or failed by it.
 *
 * Goes through `requestSessionSyncWithBootRetry` (raw `networkService.requestNoRetry` under its own
 * boot-race budget) rather than the typed `commandService.sendCommand`. The reason is retry
 * semantics, not typing: `sendCommand` always applies the shared network retry policy, whose fixed
 * ~9 s ceiling loses the cold-boot race against extension-host activation (see
 * `requestSessionSyncWithBootRetry`). The command name and boundary come from the shared
 * {@link RUN_SCHEDULED_SESSION_SYNC_REQUEST_TYPE} / {@link SessionSyncBoundary} contract so this raw
 * call still can't drift from the shutdown call site.
 *
 * Logs the command's self-reported {@link ScheduledSessionSyncResult} truthfully — a real failure
 * warns; a deliberate skip (nothing scheduled, stale startup, or app quitting) is debug-only — so
 * the log never claims a sync that didn't happen.
 */
async function performPowerModeStartupSync(signals?: StartupTasksSignals): Promise<void> {
  logger.debug('Power-mode startup sync starting');
  let outcome: StartupSyncTriggerOutcome;
  try {
    outcome = await requestSessionSyncWithBootRetry(signals);
  } catch (e) {
    // The loop only throws for a non-retryable error or an exhausted budget. Branch the message on
    // which: a MethodNotFound at the deadline means the command never registered within the budget
    // (e.g. no S/R extension installed); anything else means the command was present but the call
    // failed (a request timeout, or a registered handler that threw) — so don't blame missing
    // registration for a failure that isn't one.
    if (isJsonRpcMethodNotFoundError(e))
      logger.warn(
        `Power-mode startup sync skipped: runScheduledSessionSync never registered within the boot retry budget: ${getErrorMessage(e)}`,
      );
    else logger.warn(`Power-mode startup sync failed: ${getErrorMessage(e)}`);
    return;
  }
  switch (outcome) {
    case 'synced':
      logger.debug('Power-mode startup sync complete');
      break;
    case 'failed':
      logger.warn('Power-mode startup sync ran but reported failure');
      break;
    case 'skipped':
      logger.debug(
        'Power-mode startup sync skipped (nothing scheduled, not due, or already syncing)',
      );
      break;
    case 'skipped-stale':
      logger.debug(
        'Power-mode startup sync skipped: startup no longer fresh; a late trigger would block an active editor',
      );
      break;
    case 'aborted':
      logger.debug('Power-mode startup sync aborted: app is quitting');
      break;
    default:
      break;
  }
}

/**
 * Whether `error` is what `networkService`'s request plumbing throws when a request times out
 * client-side before any response arrives (`doRequest` in `network.service.ts` builds `JSON-RPC
 * Request timed out: <requestType> <args>` when its per-request `AsyncVariable` fires).
 *
 * At cold boot a timeout is the same "not ready yet" condition as a missing handler, not a genuine
 * failure, so it belongs in the retryable set. Concretely, the S/R extension registers
 * `runScheduledSessionSync` with its request timeout disabled (a scheduled sync can legitimately
 * run long); until that override propagates to this process, `doRequest` still applies the default
 * 30 s timeout, so a slow-but-registered first sync can trip it. Excluding that from retry would
 * collapse the whole boot budget to a single attempt against a handler that is present and
 * working.
 *
 * Matches by message substring for the same reason as {@link isJsonRpcMethodNotFoundError}, deriving
 * the format from the same producer ({@link JSON_RPC_REQUEST_TIMED_OUT_MESSAGE_PREFIX}).
 */
function isRequestTimedOutError(error: unknown): boolean {
  return getErrorMessage(error).includes(JSON_RPC_REQUEST_TIMED_OUT_MESSAGE_PREFIX);
}

/**
 * Whether `error` from a `runScheduledSessionSync` attempt is a boot-race condition worth retrying
 * within the budget rather than a genuine handler failure. Both retryable shapes mean "the handler
 * isn't answering yet", not "the handler ran and failed": a {@link isJsonRpcMethodNotFoundError} (no
 * handler registered anywhere on the network yet) or a {@link isRequestTimedOutError} (a handler may
 * be present but hasn't responded in time this early in boot). Anything else — a registered handler
 * that threw — is a real failure and must NOT be retried blindly.
 */
function isRetryableBootRaceError(error: unknown): boolean {
  return isJsonRpcMethodNotFoundError(error) || isRequestTimedOutError(error);
}

/**
 * Retries `paratextBibleSendReceive.runScheduledSessionSync('startup')` on its own boot-appropriate
 * schedule (see {@link STARTUP_SYNC_RETRY_BUDGET_MS}), using `networkService.requestNoRetry` for
 * each individual attempt rather than the shared retrying `networkService.request` — whose fixed ~9
 * s retry ceiling lost the race against extension host activation in live E2E testing (2026-07-16;
 * see {@link STARTUP_SYNC_RETRY_BUDGET_MS}'s doc for the observed timing).
 *
 * Only {@link isRetryableBootRaceError} failures are retried — a missing handler or an early request
 * timeout, both meaning "not answering yet"; any other error — the command exists but its handler
 * threw — is NOT retried and is rethrown immediately, since blindly retrying a genuine handler
 * failure would just repeat it for no benefit and delay reporting it to the caller (who logs it as
 * a warning and moves on).
 *
 * This is deliberately a narrow, local retry loop rather than a new per-call retry option on
 * `networkService.request`: it only serves this one boot-time race, and the shared retry policy
 * other callers rely on should stay as-is.
 *
 * Note this loop waits for the S/R _command_ to register; it is NOT the project-data-provider
 * readiness gate the Simple-mode path uses. Power mode is deliberately left ungated against that
 * readiness: charging a readiness wait against this path's window-interactive freshness window
 * could silently drop a legitimate startup sync, trading a visible bug for an invisible one. See
 * ADR-0027 for that trade-off, and for why having the S/R extension self-trigger at the end of its
 * own activation — once floated here as the cleaner long-term shape — was rejected: extensions
 * activate sequentially, so nothing guarantees it activates after the scripture extension, and if
 * it goes first its self-trigger starves the same factory.
 *
 * Returns a {@link StartupSyncTriggerOutcome} for the cases the caller logs as non-failures (the
 * command ran and reported a result, the startup went stale, or the app is quitting), and throws
 * for a genuine failure (a non-retryable handler error, or the budget exhausted with the command
 * never registering) so the caller can warn with the right cause.
 *
 * Uses a monotonic `performance.now()` deadline rather than wall-clock `Date.now()`: this runs
 * during OS cold boot, exactly when the wall clock gets stepped (fresh boot / dual-boot RTC skew /
 * VM resume), which would otherwise make the loop give up early or overrun its budget.
 */
async function requestSessionSyncWithBootRetry(
  signals?: StartupTasksSignals,
): Promise<StartupSyncTriggerOutcome> {
  const deadline = performance.now() + STARTUP_SYNC_RETRY_BUDGET_MS;
  let attempt = 0;
  for (;;) {
    // Stop before firing if the app is quitting: a late fire could run `('startup')` after
    // `('shutdown')` already fired and would try to reach a network connection being torn down
    // (network.service `initialize` refuses to reconnect post-shutdown as a backstop).
    if (signals?.abortSignal?.aborted) return 'aborted';

    // Freshness gate, checked BEFORE firing because firing is what raises the editing-block: if the
    // window has been interactive long enough that the user is likely editing, drop a still-pending
    // startup trigger rather than block them (see STARTUP_SYNC_FRESHNESS_WINDOW_MS).
    const windowInteractiveMs = signals?.getWindowInteractiveElapsedMs?.();
    if (
      windowInteractiveMs !== undefined &&
      windowInteractiveMs >= STARTUP_SYNC_FRESHNESS_WINDOW_MS
    )
      return 'skipped-stale';

    attempt += 1;
    try {
      // Intentionally awaiting inside the loop so we attempt once at a time (mirrors
      // `requestWithRetry` in rpc.model.ts).
      // eslint-disable-next-line no-await-in-loop
      const result = await networkService.requestNoRetry<
        [SessionSyncBoundary],
        ScheduledSessionSyncResult | undefined
      >(RUN_SCHEDULED_SESSION_SYNC_REQUEST_TYPE, 'startup');
      // Tolerate a legacy void resolution (an older extension that returned `Promise<void>`): treat
      // a missing result as a completed sync.
      return result ?? 'synced';
    } catch (e) {
      if (!isRetryableBootRaceError(e)) throw e;
      if (performance.now() >= deadline) throw e;

      logger.debug(
        `Power-mode startup sync: runScheduledSessionSync not answering on attempt ${attempt}; retrying`,
      );
      const intervalMs =
        attempt <= INITIAL_RETRY_ATTEMPTS ? INITIAL_RETRY_INTERVAL_MS : EXTENDED_RETRY_INTERVAL_MS;
      // Intentionally awaiting inside the loop so we wait a bit before retrying.
      // eslint-disable-next-line no-await-in-loop
      await wait(intervalMs);
    }
  }
}
