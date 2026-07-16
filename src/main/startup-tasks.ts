import { CATEGORY_COMMAND } from '@shared/data/rpc.model';
import * as commandService from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import * as networkService from '@shared/services/network.service';
import { settingsService } from '@shared/services/settings.service';
import { serializeRequestType } from '@shared/utils/util';
import { JSONRPCErrorCode } from 'json-rpc-2.0';
import { getErrorMessage, wait } from 'platform-bible-utils';

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
 * Uses `requestSessionSyncWithBootRetry` (rather than `commandService.sendCommand`, or the shared
 * retrying `networkService.request`) because `runScheduledSessionSync` isn't declared in
 * `CommandHandlers` yet — it's a new command the S/R extension adds; core doesn't own that type
 * contract (PT-4162 design D1). Retry semantics still matter here: like the C# S/R command, the
 * extension-hosted command may not have registered yet this early in startup, and retrying gives it
 * time to come up instead of failing the one sync attempt this session boundary gets — see
 * `requestSessionSyncWithBootRetry`'s doc for why the shared `networkService.request` retry policy
 * isn't good enough for this particular race.
 */
async function performPowerModeStartupSync(): Promise<void> {
  logger.debug('Power-mode startup sync starting');
  try {
    await requestSessionSyncWithBootRetry();
    logger.debug('Power-mode startup sync complete');
  } catch (e) {
    logger.warn(
      `Power-mode startup sync failed or skipped (command absent / extension not yet activated): ${getErrorMessage(e)}`,
    );
  }
}

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
 * duplicating the literal (mirrors `SHUTDOWN_SYNC_TIME_OUT_MS` in `shutdown-tasks.ts`).
 */
export const STARTUP_SYNC_RETRY_BUDGET_MS = 120_000;

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
 * `platform-bible-utils` for the same reason (no richer signal exposed). If `network.service.ts`
 * ever changes that message format, this needs to change with it.
 */
function isMethodNotFoundError(error: unknown): boolean {
  return getErrorMessage(error).includes(
    `JSON-RPC Request error (${JSONRPCErrorCode.MethodNotFound})`,
  );
}

/**
 * Retries `paratextBibleSendReceive.runScheduledSessionSync('startup')` on its own boot-appropriate
 * schedule (see {@link STARTUP_SYNC_RETRY_BUDGET_MS}), using `networkService.requestNoRetry` for
 * each individual attempt rather than the shared retrying `networkService.request` — whose fixed ~9
 * s retry ceiling lost the race against extension host activation in live E2E testing (PT-4162,
 * 2026-07-16; see {@link STARTUP_SYNC_RETRY_BUDGET_MS}'s doc for the observed timing).
 *
 * Only {@link isMethodNotFoundError} failures are retried (the command hasn't registered yet); any
 * other error — the command exists but its handler threw — is NOT retried and is rethrown
 * immediately, since blindly retrying a genuine handler failure would just repeat it for no benefit
 * and delay reporting it to the caller (who logs it as a warning and moves on).
 *
 * This is deliberately a narrow, local retry loop rather than a new per-call retry option on
 * `networkService.request`: it only serves this one boot-time race, and the shared retry policy
 * other callers rely on should stay as-is. The cleaner long-term shape — the S/R extension
 * self-triggering its own startup sync at the end of its own activation, so core never has to race
 * extension-host startup at all — is deliberately out of scope for this fix; see the module doc
 * above `performStartupTasks`.
 */
async function requestSessionSyncWithBootRetry(): Promise<void> {
  const requestType = serializeRequestType(
    CATEGORY_COMMAND,
    'paratextBibleSendReceive.runScheduledSessionSync',
  );
  const deadline = Date.now() + STARTUP_SYNC_RETRY_BUDGET_MS;
  let attempt = 0;
  for (;;) {
    attempt += 1;
    try {
      // Intentionally awaiting inside the loop so we attempt once at a time (mirrors
      // `requestWithRetry` in rpc.model.ts).
      // eslint-disable-next-line no-await-in-loop
      await networkService.requestNoRetry(requestType, 'startup');
      return;
    } catch (e) {
      if (!isMethodNotFoundError(e)) throw e;
      if (Date.now() >= deadline) throw e;

      logger.debug(
        `Power-mode startup sync: runScheduledSessionSync not yet registered on attempt ${attempt}; retrying`,
      );
      const intervalMs =
        attempt <= INITIAL_RETRY_ATTEMPTS ? INITIAL_RETRY_INTERVAL_MS : EXTENDED_RETRY_INTERVAL_MS;
      // Intentionally awaiting inside the loop so we wait a bit before retrying.
      // eslint-disable-next-line no-await-in-loop
      await wait(intervalMs);
    }
  }
}
