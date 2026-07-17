import {
  getJsonRpcRequestErrorMessagePrefix,
  JSON_RPC_REQUEST_TIMED_OUT_MESSAGE_PREFIX,
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
import { JSONRPCErrorCode } from 'json-rpc-2.0';
import type { SettingTypes } from 'papi-shared-types';
import { getErrorMessage, wait } from 'platform-bible-utils';

/**
 * How long (ms) to keep retrying `runScheduledSessionSync` while it's still unregistered before
 * giving up. Boot-appropriate budget: live E2E testing (PT-4162, 2026-07-16) observed the extension
 * host take longer than the shared `networkService.request` retry policy's ~9 s ceiling
 * (`MAX_REQUEST_ATTEMPTS` × `REQUEST_ATTEMPT_WAIT_TIME_MS` in `rpc.model.ts`) to activate the
 * send-receive extension — all 10 attempts got back a "method not found" response, and the startup
 * sync silently never ran even though the extension activated moments later. That shared policy is
 * tuned for steady-state requests against handlers that are normally already registered; it isn't
 * meant to (and shouldn't, for every other caller's sake) absorb the much longer, one-time race
 * against extension-host activation at cold boot. Hence this module keeps its own longer, gentler
 * retry budget locally instead of changing the shared default.
 *
 * Exported so the retry tests can drive fake timers by the exact same duration rather than
 * duplicating the literal (mirrors `AUTO_SYNC_MAX_DURATION_MS` in `shutdown-tasks.ts`).
 */
export const STARTUP_SYNC_RETRY_BUDGET_MS = 120_000;

/**
 * How long (ms) after the main window becomes interactive a still-pending "startup" sync may still
 * be fired. The boot-race loop keeps retrying up to {@link STARTUP_SYNC_RETRY_BUDGET_MS}, but a
 * trigger that only lands well into the session is no longer a "startup" moment: firing it would
 * raise the extension's editing-block (PT-4159) on an editor the user has by now opened and started
 * typing in, with no apparent cause. Past this window the trigger is dropped (those projects sync
 * at the next session boundary instead).
 *
 * Anchored to window-interactive time (supplied by main via
 * {@link StartupTasksSignals.getWindowInteractiveElapsedMs}), not process start, so a slow _window_
 * boot still gets its startup sync — only a slow _user_ does not — and the full retry budget stays
 * usable when the window itself comes up late. Shorter than the budget so the block-raising window
 * is bounded even though the budget is longer.
 */
const STARTUP_SYNC_FRESHNESS_WINDOW_MS = 30_000;

/**
 * Cadence (ms) for the first {@link INITIAL_RETRY_ATTEMPTS} retry attempts. Matches the shared
 * `requestWithRetry`'s cadence (`REQUEST_ATTEMPT_WAIT_TIME_MS` in `rpc.model.ts`) so the common
 * case — the extension activates within the first few seconds — behaves the same as it did before
 * this fix; only the long tail beyond that gets the gentler {@link EXTENDED_RETRY_INTERVAL_MS}
 * cadence.
 */
const INITIAL_RETRY_INTERVAL_MS = 1000;

/**
 * Number of attempts at {@link INITIAL_RETRY_INTERVAL_MS} before backing off to the gentler
 * {@link EXTENDED_RETRY_INTERVAL_MS} cadence for the remainder of
 * {@link STARTUP_SYNC_RETRY_BUDGET_MS}.
 */
const INITIAL_RETRY_ATTEMPTS = 10;

/** Cadence (ms) for retry attempts once {@link INITIAL_RETRY_ATTEMPTS} is exhausted. */
const EXTENDED_RETRY_INTERVAL_MS = 2000;

/**
 * Optional signals `performStartupTasks` receives from the main process. Both are omitted where
 * there is no boot-race loop to steer (Simple mode) or in unit tests that drive the loop directly,
 * in which case behavior is unchanged (never aborts, never goes stale).
 */
export interface StartupTasksSignals {
  /**
   * Aborts the Power-mode boot-race retry loop once the app has begun quitting. Stops it from (a)
   * firing `runScheduledSessionSync('startup')` after `('shutdown')` already fired and (b) issuing
   * a request that would resurrect the network connection `networkService.shutdown()` is tearing
   * down. Wired to `will-quit` and the window close in `main.ts`.
   */
  abortSignal?: AbortSignal;
  /**
   * How long (ms) the main window has been interactive, or `undefined` if it has not been shown
   * yet. The freshness anchor for {@link STARTUP_SYNC_FRESHNESS_WINDOW_MS}.
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
 * If the interface-mode setting can't be read: skips the automatic startup sync entirely and warns,
 * rather than falling through to Simple mode's "sync everything". The read can fail under the same
 * slow-cold-boot conditions the Power retry budget exists for, and Simple's no-ID `syncProjects`
 * would S/R every locally-known shared project — overriding a Power user's schedule (PT-4162).
 * Mirrors the symmetric gating in {@link performShutdownTasks}.
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
 * conflicts/errors. Core only triggers it and logs the reported outcome; startup is never blocked
 * or failed by it.
 *
 * Goes through `requestSessionSyncWithBootRetry` (raw `networkService.requestNoRetry` under its own
 * boot-race budget) rather than the typed `commandService.sendCommand`. The reason is retry
 * semantics, not typing: `sendCommand` always applies the shared network retry policy, whose fixed
 * ~9 s ceiling loses the cold-boot race against extension-host activation (see
 * `requestSessionSyncWithBootRetry`). The command name and boundary come from the shared
 * {@link RUN_SCHEDULED_SESSION_SYNC_REQUEST_TYPE} / {@link SessionSyncBoundary} contract so this raw
 * call still can't drift from the shutdown call site. Full design record:
 * docs/specs/donna-auto-syncs/2026-07-14-pt-4162-startup-shutdown-design.md.
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
    if (isMethodNotFoundError(e))
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
 * Whether `error` is what `networkService`'s request plumbing (`doRequest` in `network.service.ts`)
 * throws for a JSON-RPC "method not found" response — i.e. no handler for the requested command has
 * registered yet anywhere on the network (see the `createErrorResponse(...,
 * JSONRPCErrorCode.MethodNotFound)` calls in `rpc-server.ts` / `rpc-websocket-listener.ts`).
 *
 * This is the one thing that needs distinguishing here: "not registered yet" is worth retrying, but
 * a registered handler that threw is a real failure and must NOT be retried blindly. Getting that
 * distinction wrong the other way — treating every failure as retryable — would silently repeat a
 * genuine handler error for up to {@link STARTUP_SYNC_RETRY_BUDGET_MS} before reporting it.
 *
 * `networkService` does not expose the raw JSON-RPC error code to callers for this to key off of
 * directly: `doRequest` flattens every RPC-level error — method-not-found and a handler throwing
 * alike — into a thrown value whose `message` is `JSON-RPC Request error (${code}): ${message}`,
 * with no other machine-readable marker distinguishing the two (the richer `platformErrorCode`
 * field is populated only for C# `PlatformErrorCodes.WithCode` throws, which a "no handler yet"
 * response never carries — it has no `error.data` at all). Matching the numeric JSON-RPC code
 * embedded in that message is therefore the only signal available today. This mirrors the same
 * message-substring-matching pattern already used by
 * `isErrorMessageAboutParatextBlockingInternetAccess` / `isErrorMessageAboutRegistryAuthFailure` in
 * `platform-bible-utils` for the same reason (no richer signal exposed). The exact format comes
 * from {@link getJsonRpcRequestErrorMessagePrefix}, the same producer `doRequest` builds the message
 * with, so a reformat there can't silently stop this matcher (and its test fixture) from matching.
 */
function isMethodNotFoundError(error: unknown): boolean {
  return getErrorMessage(error).includes(
    getJsonRpcRequestErrorMessagePrefix(JSONRPCErrorCode.MethodNotFound),
  );
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
 * Matches by message substring for the same reason as {@link isMethodNotFoundError}, deriving the
 * format from the same producer ({@link JSON_RPC_REQUEST_TIMED_OUT_MESSAGE_PREFIX}).
 */
function isRequestTimedOutError(error: unknown): boolean {
  return getErrorMessage(error).includes(JSON_RPC_REQUEST_TIMED_OUT_MESSAGE_PREFIX);
}

/**
 * Whether `error` from a `runScheduledSessionSync` attempt is a boot-race condition worth retrying
 * within the budget rather than a genuine handler failure. Both retryable shapes mean "the handler
 * isn't answering yet", not "the handler ran and failed": a {@link isMethodNotFoundError} (no
 * handler registered anywhere on the network yet) or a {@link isRequestTimedOutError} (a handler may
 * be present but hasn't responded in time this early in boot). Anything else — a registered handler
 * that threw — is a real failure and must NOT be retried blindly.
 */
function isRetryableBootRaceError(error: unknown): boolean {
  return isMethodNotFoundError(error) || isRequestTimedOutError(error);
}

/**
 * Retries `paratextBibleSendReceive.runScheduledSessionSync('startup')` on its own boot-appropriate
 * schedule (see {@link STARTUP_SYNC_RETRY_BUDGET_MS}), using `networkService.requestNoRetry` for
 * each individual attempt rather than the shared retrying `networkService.request` — whose fixed ~9
 * s retry ceiling lost the race against extension host activation in live E2E testing (PT-4162,
 * 2026-07-16; see {@link STARTUP_SYNC_RETRY_BUDGET_MS}'s doc for the observed timing).
 *
 * Only {@link isRetryableBootRaceError} failures are retried — a missing handler or an early request
 * timeout, both meaning "not answering yet"; any other error — the command exists but its handler
 * threw — is NOT retried and is rethrown immediately, since blindly retrying a genuine handler
 * failure would just repeat it for no benefit and delay reporting it to the caller (who logs it as
 * a warning and moves on).
 *
 * This is deliberately a narrow, local retry loop rather than a new per-call retry option on
 * `networkService.request`: it only serves this one boot-time race, and the shared retry policy
 * other callers rely on should stay as-is. The cleaner long-term shape would be the S/R extension
 * self-triggering its own startup sync at the end of its own activation, so core never has to race
 * extension-host startup at all; that is a larger cross-repo change and is out of scope here (core
 * has no signal today for "a method just registered" — the RPC registry set is not surfaced as an
 * event; see the standing `TODO (maybe): Wait for signal from the extension host` in `main.ts`).
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
