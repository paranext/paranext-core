import { vi } from 'vitest';
import { JSONRPCErrorCode } from 'json-rpc-2.0';
import {
  getJsonRpcRequestErrorMessagePrefix,
  JSON_RPC_REQUEST_TIMED_OUT_MESSAGE_PREFIX,
  MAX_REQUEST_ATTEMPTS,
  REQUEST_ATTEMPT_WAIT_TIME_MS,
} from '@shared/data/rpc.model';
import { settingsService } from '@shared/services/settings.service';
import * as commandService from '@shared/services/command.service';
import * as networkService from '@shared/services/network.service';
import { logger } from '@shared/services/logger.service';
import { waitForScriptureWorkspaceReady } from '@main/startup-readiness.util';
import { performStartupTasks, STARTUP_SYNC_RETRY_BUDGET_MS } from './startup-tasks';

vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: vi.fn() },
}));

vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn(),
}));

vi.mock('@shared/services/network.service', () => ({
  requestNoRetry: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

vi.mock('@main/startup-readiness.util', () => ({
  waitForScriptureWorkspaceReady: vi.fn(),
}));

const mockSettingsGet = vi.mocked(settingsService.get);
const mockSendCommand = vi.mocked(commandService.sendCommand);
const mockRequestNoRetry = vi.mocked(networkService.requestNoRetry);
const mockLoggerDebug = vi.mocked(logger.debug);
const mockLoggerWarn = vi.mocked(logger.warn);
const mockWaitForReady = vi.mocked(waitForScriptureWorkspaceReady);

/**
 * Builds a rejection shaped like what `networkService`'s request plumbing actually throws for a
 * JSON-RPC "method not found" response (see `doRequest` in `network.service.ts`). The message
 * prefix is derived from `getJsonRpcRequestErrorMessagePrefix` — the same producer `doRequest` uses
 * — rather than hand-copied, so if that format is ever reformatted this fixture (and the matcher)
 * move with it and can't silently stop matching real errors while the test stays green.
 */
function methodNotFoundError() {
  return new Error(
    `${getJsonRpcRequestErrorMessagePrefix(JSONRPCErrorCode.MethodNotFound)}: 'command:paratextBibleSendReceive.runScheduledSessionSync' not found`,
  );
}

/** Builds a rejection shaped like a client-side request timeout, derived from the same producer. */
function requestTimedOutError() {
  return new Error(
    `${JSON_RPC_REQUEST_TIMED_OUT_MESSAGE_PREFIX} command:paratextBibleSendReceive.runScheduledSessionSync ["startup"]`,
  );
}

function stubSettings({ mode = 'simple', firstRunComplete = true, syncOnStartup = true } = {}) {
  mockSettingsGet.mockImplementation(async (key: string) => {
    if (key === 'platform.interfaceMode') return mode;
    if (key === 'platform.firstRunComplete') return firstRunComplete;
    if (key === 'platform.syncOnStartup') return syncOnStartup;
    throw new Error(`Unexpected settings key in test stub: ${key}`);
  });
}

/** The settings snapshot a Simple-mode startup sync needs before anything else can skip it. */
const SIMPLE_MODE_SETTINGS = { mode: 'simple', firstRunComplete: true, syncOnStartup: true };

/**
 * Drives a Simple-mode startup whose readiness gate parks, swapping the settings the gates read
 * from `before` to `after` while it is parked.
 *
 * This is the only way to exercise the post-wait re-read: the gate can sit for up to the readiness
 * budget, so what the user wanted when it started may not be what they want when it finishes.
 */
async function startupWithSettingsChangedDuringReadinessWait(
  before: typeof SIMPLE_MODE_SETTINGS,
  after: typeof SIMPLE_MODE_SETTINGS,
): Promise<void> {
  let current = before;
  mockSettingsGet.mockImplementation(async (key: string) => {
    if (key === 'platform.interfaceMode') return current.mode;
    if (key === 'platform.firstRunComplete') return current.firstRunComplete;
    if (key === 'platform.syncOnStartup') return current.syncOnStartup;
    throw new Error(`Unexpected settings key in test stub: ${key}`);
  });
  let resolveReadiness: (result: { outcome: 'ready' }) => void = () => {};
  mockWaitForReady.mockReturnValue(
    new Promise((resolve) => {
      resolveReadiness = resolve;
    }),
  );

  const startupPromise = performStartupTasks();
  await vi.waitFor(() => expect(mockWaitForReady).toHaveBeenCalled());
  current = after;
  resolveReadiness({ outcome: 'ready' });
  await startupPromise;
}

beforeEach(() => {
  vi.clearAllMocks();
  mockSendCommand.mockResolvedValue(undefined);
  mockRequestNoRetry.mockResolvedValue(undefined);
  mockWaitForReady.mockResolvedValue({ outcome: 'ready' });
});

describe('performStartupTasks', () => {
  it('fires runScheduledSessionSync("startup") when interface mode is power', async () => {
    mockSettingsGet.mockResolvedValue('power');
    await performStartupTasks();
    expect(mockRequestNoRetry).toHaveBeenCalledWith(
      expect.stringContaining('runScheduledSessionSync'),
      'startup',
    );
    expect(mockSendCommand).not.toHaveBeenCalled();
  });

  it('fires syncProjects with no project IDs when interface mode is simple', async () => {
    stubSettings({ mode: 'simple', firstRunComplete: true });
    await performStartupTasks();
    expect(mockSendCommand).toHaveBeenCalledWith(
      'paratextBibleSendReceive.syncProjects',
      undefined,
    );
    expect(mockRequestNoRetry).not.toHaveBeenCalled();
  });

  it('skips the automatic startup sync and warns when settings service throws (no sync-everything fallback)', async () => {
    // An unreadable mode must not fall through to Simple's no-ID syncProjects (= S/R every shared
    // project), which would override a Power user's schedule under the exact slow-boot conditions
    // the read fails in. Do nothing this session and warn instead.
    mockSettingsGet.mockRejectedValue(new Error('settings unavailable'));
    await performStartupTasks();
    expect(mockSendCommand).not.toHaveBeenCalled();
    expect(mockRequestNoRetry).not.toHaveBeenCalled();
    expect(mockLoggerWarn).toHaveBeenCalledWith(
      expect.stringContaining('Could not read platform.interfaceMode'),
    );
  });

  // Also covers the upgrade-launch case: the flag defaults to false before the renderer backfills it.
  it('does NOT fire sync in simple mode when first run is not complete', async () => {
    stubSettings({ mode: 'simple', firstRunComplete: false });
    await performStartupTasks();
    expect(mockSendCommand).not.toHaveBeenCalled();
  });

  it('fires sync in simple mode once first run is complete', async () => {
    stubSettings({ mode: 'simple', firstRunComplete: true });
    await performStartupTasks();
    expect(mockSendCommand).toHaveBeenCalledWith(
      'paratextBibleSendReceive.syncProjects',
      undefined,
    );
  });

  it('skips startup sync when user chose "Skip automatic sync" on sync consent step', async () => {
    stubSettings({ mode: 'simple', firstRunComplete: true, syncOnStartup: false });
    await performStartupTasks();
    expect(mockSendCommand).not.toHaveBeenCalled();
    expect(mockRequestNoRetry).not.toHaveBeenCalled();
    expect(mockLoggerDebug).toHaveBeenCalledWith(
      expect.stringContaining('Startup sync skipped: platform.syncOnStartup'),
    );
  });

  it('proceeds with startup sync when syncOnStartup setting read throws (fail-open to sync)', async () => {
    // If the setting read fails, default to proceeding with sync rather than silently skipping
    // a user who never actually chose to skip.
    mockSettingsGet.mockImplementation(async (key: string) => {
      if (key === 'platform.interfaceMode') return 'simple';
      if (key === 'platform.firstRunComplete') return true;
      if (key === 'platform.syncOnStartup') throw new Error('read failed');
      throw new Error(`Unexpected settings key in test stub: ${key}`);
    });
    await performStartupTasks();
    expect(mockSendCommand).toHaveBeenCalledWith(
      'paratextBibleSendReceive.syncProjects',
      undefined,
    );
    expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('platform.syncOnStartup'));
  });

  it('swallows sync failures without throwing', async () => {
    stubSettings({ mode: 'simple', firstRunComplete: true });
    mockSendCommand.mockRejectedValue(new Error('sync command not registered'));
    await expect(performStartupTasks()).resolves.toBeUndefined();
  });

  it('swallows unexpected errors and does not throw', async () => {
    stubSettings({ mode: 'simple', firstRunComplete: true });
    mockSendCommand.mockImplementation(() => {
      throw new Error('unexpected non-async throw');
    });
    await expect(performStartupTasks()).resolves.toBeUndefined();
  });

  describe('power-mode startup sync outcome', () => {
    it('warns (not "complete") when the command reports "failed"', async () => {
      mockSettingsGet.mockResolvedValue('power');
      mockRequestNoRetry.mockResolvedValue('failed');
      await performStartupTasks();
      expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('reported failure'));
    });

    it('logs a debug-only skip (no warn) when the command reports "skipped"', async () => {
      mockSettingsGet.mockResolvedValue('power');
      mockRequestNoRetry.mockResolvedValue('skipped');
      await performStartupTasks();
      expect(mockLoggerWarn).not.toHaveBeenCalled();
      expect(mockLoggerDebug).toHaveBeenCalledWith(expect.stringContaining('skipped'));
    });

    it('treats a legacy void resolution as "synced" (no warn)', async () => {
      mockSettingsGet.mockResolvedValue('power');
      mockRequestNoRetry.mockResolvedValue(undefined);
      await performStartupTasks();
      expect(mockLoggerWarn).not.toHaveBeenCalled();
      expect(mockLoggerDebug).toHaveBeenCalledWith(
        expect.stringContaining('Power-mode startup sync complete'),
      );
    });

    it('drops a stale startup trigger without firing when the window has been interactive too long', async () => {
      mockSettingsGet.mockResolvedValue('power');
      // The command is registered, but the user has had the window well past the freshness window,
      // so firing now would raise the edit-block on an editor they are already using.
      await performStartupTasks({ getWindowInteractiveElapsedMs: () => 10 * 60 * 1000 });
      expect(mockRequestNoRetry).not.toHaveBeenCalled();
      expect(mockLoggerWarn).not.toHaveBeenCalled();
      expect(mockLoggerDebug).toHaveBeenCalledWith(expect.stringContaining('no longer fresh'));
    });

    it('fires the sync when the window has been interactive for less than the freshness window', async () => {
      mockSettingsGet.mockResolvedValue('power');
      // Counterpart to the stale-drop test above: main.ts always supplies this signal in
      // production, so without this case an inverted freshness gate (or a zeroed window) would
      // silently drop every real boot's startup sync while the suite stays green.
      await performStartupTasks({ getWindowInteractiveElapsedMs: () => 1_000 });
      expect(mockRequestNoRetry).toHaveBeenCalledWith(
        expect.stringContaining('runScheduledSessionSync'),
        'startup',
      );
      expect(mockLoggerWarn).not.toHaveBeenCalled();
    });

    it('does not fire (or warn) when the app is already quitting before the command registers', async () => {
      mockSettingsGet.mockResolvedValue('power');
      const abort = new AbortController();
      abort.abort();
      await performStartupTasks({ abortSignal: abort.signal });
      expect(mockRequestNoRetry).not.toHaveBeenCalled();
      expect(mockLoggerWarn).not.toHaveBeenCalled();
      expect(mockLoggerDebug).toHaveBeenCalledWith(expect.stringContaining('quitting'));
    });
  });

  // #region Boot-race retry: distinguishes "not registered yet" (retry) from a genuine
  // handler failure (don't retry), and bounds the retry budget so startup is never blocked.

  describe('power-mode startup sync boot-race retry', () => {
    // Retry cadence (see startup-tasks.ts): the first INITIAL_RETRY_ATTEMPTS waits are
    // INITIAL_RETRY_INTERVAL_MS; every wait after that is EXTENDED_RETRY_INTERVAL_MS (2s). The
    // initial phase derives from the shared rpc.model constants — the same source startup-tasks.ts
    // aliases — so a retune of the shared retry policy flows through both without silent drift.
    const INITIAL_RETRY_ATTEMPTS = MAX_REQUEST_ATTEMPTS;
    const INITIAL_RETRY_INTERVAL_MS = REQUEST_ATTEMPT_WAIT_TIME_MS;
    const EXTENDED_RETRY_INTERVAL_MS = 2000;

    it('keeps retrying MethodNotFound past the shared ~9s ceiling and pins the two-phase backoff cadence', async () => {
      mockSettingsGet.mockResolvedValue('power');
      // Succeed on a deliberately NON-symmetric attempt so the two-phase cadence is observable: 10
      // waits @1s + 4 waits @2s before the 15th attempt = 18s. Deleting the backoff (all @1s = 14s)
      // or inverting the phases (@2s then @1s = 22s) both change this elapsed time and fail below.
      const SUCCEED_ON_CALL = 15;
      const EXPECTED_ELAPSED_MS =
        INITIAL_RETRY_ATTEMPTS * INITIAL_RETRY_INTERVAL_MS +
        (SUCCEED_ON_CALL - 1 - INITIAL_RETRY_ATTEMPTS) * EXTENDED_RETRY_INTERVAL_MS; // 18_000
      let callCount = 0;
      mockRequestNoRetry.mockImplementation(async () => {
        callCount += 1;
        if (callCount < SUCCEED_ON_CALL) throw methodNotFoundError();
        return undefined;
      });

      vi.useFakeTimers();
      try {
        const startupPromise = performStartupTasks();
        // 1ms before the expected time the succeeding attempt has not fired yet.
        await vi.advanceTimersByTimeAsync(EXPECTED_ELAPSED_MS - 1);
        expect(callCount).toBe(SUCCEED_ON_CALL - 1);
        // Crossing the expected elapsed time triggers exactly the succeeding attempt.
        await vi.advanceTimersByTimeAsync(1);
        await expect(startupPromise).resolves.toBeUndefined();
      } finally {
        vi.useRealTimers();
      }

      expect(callCount).toBe(SUCCEED_ON_CALL);
      // A successful retry never reaches the "failed or skipped" warn.
      expect(mockLoggerWarn).not.toHaveBeenCalled();
    });

    it('retries a client-side request timeout (not just MethodNotFound) and succeeds when it clears', async () => {
      // A request timeout at cold boot is a "not ready yet" condition, not a genuine failure (e.g.
      // the extension's timeout override hasn't propagated yet), so it must be retried within budget.
      mockSettingsGet.mockResolvedValue('power');
      let callCount = 0;
      mockRequestNoRetry.mockImplementation(async () => {
        callCount += 1;
        if (callCount === 1) throw requestTimedOutError();
        return undefined;
      });

      vi.useFakeTimers();
      try {
        const startupPromise = performStartupTasks();
        await vi.advanceTimersByTimeAsync(5_000);
        await expect(startupPromise).resolves.toBeUndefined();
      } finally {
        vi.useRealTimers();
      }

      expect(callCount).toBe(2);
      expect(mockLoggerWarn).not.toHaveBeenCalled();
    });

    it('does NOT retry a non-MethodNotFound error (a real handler failure) and warns immediately', async () => {
      mockSettingsGet.mockResolvedValue('power');
      mockRequestNoRetry.mockRejectedValue(new Error('handler threw: something went wrong'));

      await expect(performStartupTasks()).resolves.toBeUndefined();

      // Exactly one attempt: blindly retrying a genuine handler error would just repeat it.
      expect(mockRequestNoRetry).toHaveBeenCalledTimes(1);
      expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
      // A registered handler that threw is a real failure — the message must not blame missing
      // registration (it says "failed", not "never registered").
      expect(mockLoggerWarn).toHaveBeenCalledWith(
        expect.stringContaining('Power-mode startup sync failed'),
      );
    });

    it('honors the retry budget: retries on the expected cadence up to ~66 attempts, then stops and warns once', async () => {
      mockSettingsGet.mockResolvedValue('power');
      mockRequestNoRetry.mockRejectedValue(methodNotFoundError());

      vi.useFakeTimers();
      try {
        const startupPromise = performStartupTasks();
        // Comfortably past the full retry budget so the deadline check is guaranteed to trip.
        await vi.advanceTimersByTimeAsync(STARTUP_SYNC_RETRY_BUDGET_MS + 10_000);
        // Startup itself was never blocked: this resolves once fake time is past the budget.
        await expect(startupPromise).resolves.toBeUndefined();
      } finally {
        vi.useRealTimers();
      }

      // Cadence over the 120s budget: attempts 1-10 fire through t=9s (their 10 waits are @1s), then
      // one every 2s from t=10s. The deadline check is `>=`, so the attempt landing exactly at the
      // t=120s deadline still fires before the loop gives up — 10 @1s + 56 @2s = 66 attempts. Pinning
      // the count (rather than just ">1") is what makes an `if (attempt >= 2) throw` mutation — or any
      // budget that ignores STARTUP_SYNC_RETRY_BUDGET_MS — fail this test.
      const EXPECTED_ATTEMPTS =
        INITIAL_RETRY_ATTEMPTS +
        (STARTUP_SYNC_RETRY_BUDGET_MS - INITIAL_RETRY_ATTEMPTS * INITIAL_RETRY_INTERVAL_MS) /
          EXTENDED_RETRY_INTERVAL_MS +
        1; // 66 (the final attempt lands on the deadline itself)
      expect(mockRequestNoRetry).toHaveBeenCalledTimes(EXPECTED_ATTEMPTS);
      expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
      // Budget exhausted on MethodNotFound means the command never registered — the message says so.
      expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('never registered'));
    });
  });

  // #endregion

  describe('simple-mode readiness gate', () => {
    it('does not fire the sync until readiness resolves', async () => {
      stubSettings({ mode: 'simple', firstRunComplete: true });
      let resolveReadiness: (result: { outcome: 'ready' }) => void = () => {};
      mockWaitForReady.mockReturnValue(
        new Promise((resolve) => {
          resolveReadiness = resolve;
        }),
      );

      const startupPromise = performStartupTasks();
      // Wait until we are demonstrably PARKED on the readiness gate — past all three settings
      // gates — before asserting nothing was sent. Flushing a fixed number of microtasks instead
      // would make this test pass even with no gate at all: `sendCommand` simply would not have
      // been reached yet, and the assertion would be vacuously true.
      await vi.waitFor(() => expect(mockWaitForReady).toHaveBeenCalled());
      expect(mockSendCommand).not.toHaveBeenCalled();

      resolveReadiness({ outcome: 'ready' });
      await startupPromise;
      expect(mockSendCommand).toHaveBeenCalledWith(
        'paratextBibleSendReceive.syncProjects',
        undefined,
      );
    });

    it('fires the sync anyway (and warns) when readiness times out', async () => {
      // The sync is delayed, never permanently suppressed.
      stubSettings({ mode: 'simple', firstRunComplete: true });
      mockWaitForReady.mockResolvedValue({
        outcome: 'timed-out',
        detail:
          'the scripture project data provider factory did not register within the readiness budget',
      });

      await performStartupTasks();

      expect(mockSendCommand).toHaveBeenCalledWith(
        'paratextBibleSendReceive.syncProjects',
        undefined,
      );
      expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('did not become ready'));
    });

    it('includes the returned detail in the readiness warn', async () => {
      // Packaged builds log at info; every `logger.debug` this feature emits is invisible there, so
      // the warn itself must carry the real cause rather than pointing at a debug log the caller
      // can't see.
      stubSettings({ mode: 'simple', firstRunComplete: true });
      mockWaitForReady.mockResolvedValue({
        outcome: 'timed-out',
        detail:
          'the scripture project data provider factory registered but never reported any projects',
      });

      await performStartupTasks();

      expect(mockLoggerWarn).toHaveBeenCalledWith(
        expect.stringContaining(
          'the scripture project data provider factory registered but never reported any projects',
        ),
      );
    });

    it('does not fire the sync when the app is quitting during the readiness wait', async () => {
      stubSettings({ mode: 'simple', firstRunComplete: true });
      mockWaitForReady.mockResolvedValue({ outcome: 'aborted' });

      await performStartupTasks();

      expect(mockSendCommand).not.toHaveBeenCalled();
      expect(mockLoggerWarn).not.toHaveBeenCalled();
      expect(mockLoggerDebug).toHaveBeenCalledWith(expect.stringContaining('quitting'));
    });

    it('does not fire (or warn) when readiness times out but the app is already quitting', async () => {
      // Pins the merged, reordered abort check: without it, a 'timed-out' outcome would reach the
      // warn below before the abort recheck ran, logging "syncing anyway" for a sync that is then
      // skipped.
      stubSettings({ mode: 'simple', firstRunComplete: true });
      const abort = new AbortController();
      abort.abort();
      mockWaitForReady.mockResolvedValue({ outcome: 'timed-out', detail: 'some cause' });

      await performStartupTasks({ abortSignal: abort.signal });

      expect(mockSendCommand).not.toHaveBeenCalled();
      expect(mockLoggerWarn).not.toHaveBeenCalled();
      expect(mockLoggerDebug).toHaveBeenCalledWith(expect.stringContaining('quitting'));
    });

    it('falls back to the general abort signal when no readiness signal is supplied', async () => {
      stubSettings({ mode: 'simple', firstRunComplete: true });
      const abort = new AbortController();

      await performStartupTasks({ abortSignal: abort.signal });

      // By identity, for the same reason as the test below: structural comparison cannot tell two
      // unaborted `AbortSignal`s apart, so it would also pass against `undefined`-turned-anything.
      expect(mockWaitForReady.mock.calls[0]?.[0]?.abortSignal).toBe(abort.signal);
    });

    it('waits on the readiness signal rather than the general one when they differ', async () => {
      // The two diverge on exactly one path: a macOS last-window close aborts the general signal
      // (Power's loop must stop on every platform) while deliberately leaving the readiness wait
      // running, because the app stays resident and the startup tasks run once per process. Waiting
      // on the general signal here would collapse that distinction and drop the sync.
      stubSettings({ mode: 'simple', firstRunComplete: true });
      const general = new AbortController();
      const readiness = new AbortController();

      await performStartupTasks({
        abortSignal: general.signal,
        readinessAbortSignal: readiness.signal,
      });

      // Asserted by IDENTITY, not with `toHaveBeenCalledWith`. That matcher compares structurally,
      // and two unaborted `AbortSignal`s are structurally identical — so it would pass just as
      // happily against the wrong signal, which is the entire thing this test exists to catch.
      expect(mockWaitForReady.mock.calls[0]?.[0]?.abortSignal).toBe(readiness.signal);
    });

    it('still fires after a macOS window close once a window is back, though the general signal aborted', async () => {
      // The exact combination production creates on a macOS last-window close, and the one that
      // proves the carve-out is reachable at all: `isAppShuttingDown()` is true during that close
      // (every tracked window is closing), so main aborts the GENERAL signal — while deliberately
      // leaving the readiness signal alone. If this path also re-checked the general signal, the
      // wait would survive the close only to be discarded as "quitting", and the readiness signal,
      // the platform predicate, and the windowless guard could never change any outcome.
      stubSettings({ mode: 'simple', firstRunComplete: true });
      const general = new AbortController();
      general.abort();
      mockWaitForReady.mockResolvedValue({ outcome: 'ready' });

      await performStartupTasks({
        abortSignal: general.signal,
        readinessAbortSignal: new AbortController().signal,
        // A dock reactivation brought a window back before readiness landed.
        canFireStartupSync: () => true,
      });

      expect(mockSendCommand).toHaveBeenCalledWith(
        'paratextBibleSendReceive.syncProjects',
        undefined,
      );
    });

    it('does not fire after a macOS window close while the app is still windowless', async () => {
      // Same production combination, other branch: the wait outlived the close but nothing brought
      // a window back, so the live guard — not the general signal — is what stops the sync.
      stubSettings({ mode: 'simple', firstRunComplete: true });
      const general = new AbortController();
      general.abort();
      mockWaitForReady.mockResolvedValue({ outcome: 'ready' });

      await performStartupTasks({
        abortSignal: general.signal,
        readinessAbortSignal: new AbortController().signal,
        canFireStartupSync: () => false,
      });

      expect(mockSendCommand).not.toHaveBeenCalled();
      expect(mockLoggerDebug).toHaveBeenCalledWith(expect.stringContaining('no window'));
    });

    it('does not fire the sync when the readiness signal itself aborted', async () => {
      // A real quit, or a last-window close off macOS: main aborts the readiness signal too, and
      // that is what this path treats as "the app is quitting".
      stubSettings({ mode: 'simple', firstRunComplete: true });
      const readinessAbort = new AbortController();
      readinessAbort.abort();
      mockWaitForReady.mockResolvedValue({ outcome: 'ready' });

      await performStartupTasks({
        abortSignal: new AbortController().signal,
        readinessAbortSignal: readinessAbort.signal,
        canFireStartupSync: () => true,
      });

      expect(mockSendCommand).not.toHaveBeenCalled();
      expect(mockLoggerDebug).toHaveBeenCalledWith(expect.stringContaining('quitting'));
    });

    it('does not fire the sync into a resident app that has no windows', async () => {
      // The hazard the surviving readiness wait would otherwise open: on macOS the wait can park
      // for the whole readiness budget past a last-window close, then resolve into a process that
      // is resident, not quitting, and windowless — where the shutdown sync has already run and
      // there is no UI to report progress or failure into. Neither abort signal describes that
      // state, so the sync would fire without this check.
      stubSettings({ mode: 'simple', firstRunComplete: true });
      mockWaitForReady.mockResolvedValue({ outcome: 'ready' });

      await performStartupTasks({ canFireStartupSync: () => false });

      expect(mockSendCommand).not.toHaveBeenCalled();
      expect(mockLoggerDebug).toHaveBeenCalledWith(expect.stringContaining('no window'));
    });

    it('fires the sync when a window is back by the time readiness resolves', async () => {
      // The other half of the case above, and the whole reason the wait is allowed to survive a
      // macOS last-window close: a dock reactivation brings a window back, so the startup sync that
      // session never got still lands.
      stubSettings({ mode: 'simple', firstRunComplete: true });
      mockWaitForReady.mockResolvedValue({ outcome: 'ready' });

      await performStartupTasks({ canFireStartupSync: () => true });

      expect(mockSendCommand).toHaveBeenCalledWith(
        'paratextBibleSendReceive.syncProjects',
        undefined,
      );
    });

    it('asks whether it may fire only after readiness resolves, not before the wait', async () => {
      // Order matters: asked up front, the answer describes the app at process start rather than
      // whenever the wait finally lands, which is the moment the guard is about to authorize.
      stubSettings({ mode: 'simple', firstRunComplete: true });
      const callOrder: string[] = [];
      mockWaitForReady.mockImplementation(async () => {
        callOrder.push('readiness');
        return { outcome: 'ready' };
      });

      await performStartupTasks({
        canFireStartupSync: () => {
          callOrder.push('canFire');
          return true;
        },
      });

      expect(callOrder).toEqual(['readiness', 'canFire']);
    });

    it('never consults the windowless guard in power mode', async () => {
      // Power mode has no readiness wait to outlive a window close, so it must not inherit the
      // guard that exists to contain one.
      mockSettingsGet.mockResolvedValue('power');
      const canFireStartupSync = vi.fn(() => true);

      await performStartupTasks({ canFireStartupSync });

      expect(canFireStartupSync).not.toHaveBeenCalled();
    });

    it('never consults readiness in power mode', async () => {
      // Pins "Power mode unchanged" against a future refactor that routes both modes through the
      // gate — which would charge readiness time against Power's freshness window and silently
      // drop legitimate startup syncs.
      mockSettingsGet.mockResolvedValue('power');

      await performStartupTasks();

      expect(mockWaitForReady).not.toHaveBeenCalled();
    });

    it('does not wait for readiness when a settings gate already skipped the sync', async () => {
      // Ordering guard: a session that will not sync must not pay the readiness wait.
      stubSettings({ mode: 'simple', firstRunComplete: true, syncOnStartup: false });

      await performStartupTasks();

      expect(mockWaitForReady).not.toHaveBeenCalled();
      expect(mockSendCommand).not.toHaveBeenCalled();
    });

    it('does not wait for readiness when first run is not complete', async () => {
      stubSettings({ mode: 'simple', firstRunComplete: false });

      await performStartupTasks();

      expect(mockWaitForReady).not.toHaveBeenCalled();
    });

    it('does not fire the sync when readiness resolves "ready" but the app began quitting while waiting', async () => {
      // Defense-in-depth guard at the call site: readiness settling with a non-'aborted' outcome
      // does not guarantee the app wasn't already quitting by the time it resolved — e.g. a quit
      // landing while the readiness gate's own probe was in flight.
      stubSettings({ mode: 'simple', firstRunComplete: true });
      const abort = new AbortController();
      abort.abort();
      mockWaitForReady.mockResolvedValue({ outcome: 'ready' });

      await performStartupTasks({ abortSignal: abort.signal });

      expect(mockSendCommand).not.toHaveBeenCalled();
      expect(mockLoggerDebug).toHaveBeenCalledWith(expect.stringContaining('quitting'));
    });

    // One case per gate. The gates share an implementation, but only the post-wait CALL is under
    // test here, and an early return that skipped just one of them would still pass the other two.
    it('does not fire the sync when the interface mode changes to power during the readiness wait', async () => {
      await startupWithSettingsChangedDuringReadinessWait(SIMPLE_MODE_SETTINGS, {
        ...SIMPLE_MODE_SETTINGS,
        mode: 'power',
      });

      // Neither mode's sync: not Simple's (the user is no longer in Simple) and not Power's either,
      // since this session already committed to the Simple path before the mode changed.
      expect(mockSendCommand).not.toHaveBeenCalled();
      expect(mockRequestNoRetry).not.toHaveBeenCalled();
      expect(mockLoggerDebug).toHaveBeenCalledWith(
        expect.stringContaining('Startup sync skipped after the readiness wait'),
      );
    });

    it('does not fire the sync when automatic sync is turned off during the readiness wait', async () => {
      await startupWithSettingsChangedDuringReadinessWait(SIMPLE_MODE_SETTINGS, {
        ...SIMPLE_MODE_SETTINGS,
        syncOnStartup: false,
      });

      expect(mockSendCommand).not.toHaveBeenCalled();
      expect(mockLoggerDebug).toHaveBeenCalledWith(
        expect.stringContaining('Startup sync skipped after the readiness wait'),
      );
    });

    it('does not fire the sync when first run becomes incomplete during the readiness wait', async () => {
      await startupWithSettingsChangedDuringReadinessWait(SIMPLE_MODE_SETTINGS, {
        ...SIMPLE_MODE_SETTINGS,
        firstRunComplete: false,
      });

      expect(mockSendCommand).not.toHaveBeenCalled();
      expect(mockLoggerDebug).toHaveBeenCalledWith(
        expect.stringContaining('Startup sync skipped after the readiness wait'),
      );
    });
  });
});
