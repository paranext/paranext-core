import { vi } from 'vitest';
import { JSONRPCErrorCode } from 'json-rpc-2.0';
import {
  getJsonRpcRequestErrorMessagePrefix,
  JSON_RPC_REQUEST_TIMED_OUT_MESSAGE_PREFIX,
} from '@shared/data/rpc.model';
import { settingsService } from '@shared/services/settings.service';
import * as commandService from '@shared/services/command.service';
import * as networkService from '@shared/services/network.service';
import { logger } from '@shared/services/logger.service';
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

const mockSettingsGet = vi.mocked(settingsService.get);
const mockSendCommand = vi.mocked(commandService.sendCommand);
const mockRequestNoRetry = vi.mocked(networkService.requestNoRetry);
const mockLoggerDebug = vi.mocked(logger.debug);
const mockLoggerWarn = vi.mocked(logger.warn);

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

beforeEach(() => {
  vi.clearAllMocks();
  mockSendCommand.mockResolvedValue(undefined);
  mockRequestNoRetry.mockResolvedValue(undefined);
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
    mockSettingsGet.mockResolvedValue('simple');
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

  it('swallows sync failures without throwing', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockSendCommand.mockRejectedValue(new Error('sync command not registered'));
    await expect(performStartupTasks()).resolves.toBeUndefined();
  });

  it('swallows unexpected errors and does not throw', async () => {
    mockSettingsGet.mockResolvedValue('simple');
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

  // #region PT-4162 boot-race retry: distinguishes "not registered yet" (retry) from a genuine
  // handler failure (don't retry), and bounds the retry budget so startup is never blocked.

  describe('power-mode startup sync boot-race retry', () => {
    // Retry cadence (see startup-tasks.ts): the first INITIAL_RETRY_ATTEMPTS (10) waits are
    // INITIAL_RETRY_INTERVAL_MS (1s); every wait after that is EXTENDED_RETRY_INTERVAL_MS (2s).
    const INITIAL_RETRY_ATTEMPTS = 10;
    const INITIAL_RETRY_INTERVAL_MS = 1000;
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
});
