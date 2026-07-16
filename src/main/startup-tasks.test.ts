import { vi } from 'vitest';
import { JSONRPCErrorCode } from 'json-rpc-2.0';
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
const mockLoggerWarn = vi.mocked(logger.warn);

/**
 * Builds a rejection shaped like what `networkService`'s request plumbing actually throws for a
 * JSON-RPC "method not found" response (see `doRequest` in `network.service.ts`): a value whose
 * `message` embeds `JSON-RPC Request error (${JSONRPCErrorCode.MethodNotFound})`. This is the only
 * signal `isMethodNotFoundError` (in `startup-tasks.ts`) has to key off of — see its doc comment.
 */
function methodNotFoundError() {
  return new Error(
    `JSON-RPC Request error (${JSONRPCErrorCode.MethodNotFound}): 'command:paratextBibleSendReceive.runScheduledSessionSync' not found`,
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

  it('swallows a missing/failing runScheduledSessionSync command in power mode without throwing', async () => {
    mockSettingsGet.mockResolvedValue('power');
    mockRequestNoRetry.mockRejectedValue(new Error('command not registered'));
    await expect(performStartupTasks()).resolves.toBeUndefined();
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

  // #region PT-4162 boot-race retry: distinguishes "not registered yet" (retry) from a genuine
  // handler failure (don't retry), and bounds the retry budget so startup is never blocked.

  describe('power-mode startup sync boot-race retry', () => {
    it('keeps retrying past the shared ~9s ceiling on MethodNotFound and succeeds once the handler appears late (t+30s)', async () => {
      mockSettingsGet.mockResolvedValue('power');
      const SUCCEED_ON_CALL = 21; // see startup-tasks.ts retry cadence: 10 attempts @1s + N @2s
      let callCount = 0;
      mockRequestNoRetry.mockImplementation(async () => {
        callCount += 1;
        if (callCount < SUCCEED_ON_CALL) throw methodNotFoundError();
        return undefined;
      });

      vi.useFakeTimers();
      try {
        const startupPromise = performStartupTasks();
        // 35s comfortably covers the ~30s it takes to reach the 21st attempt at this cadence.
        await vi.advanceTimersByTimeAsync(35_000);
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
        if (callCount === 1)
          throw new Error(
            'JSON-RPC Request timed out: command:paratextBibleSendReceive.runScheduledSessionSync ["startup"]',
          );
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
      expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('failed or skipped'));
    });

    it('gives up once the retry budget is exhausted, warns once, and never blocks startup', async () => {
      mockSettingsGet.mockResolvedValue('power');
      mockRequestNoRetry.mockRejectedValue(methodNotFoundError());

      vi.useFakeTimers();
      try {
        const startupPromise = performStartupTasks();
        // Comfortably past the full retry budget so the deadline check is guaranteed to trip.
        await vi.advanceTimersByTimeAsync(STARTUP_SYNC_RETRY_BUDGET_MS + 5_000);
        // Startup itself was never blocked: this resolves once fake time has been advanced past
        // the budget, proving the retry loop is bounded rather than looping forever.
        await expect(startupPromise).resolves.toBeUndefined();
      } finally {
        vi.useRealTimers();
      }

      expect(mockRequestNoRetry.mock.calls.length).toBeGreaterThan(1);
      expect(mockLoggerWarn).toHaveBeenCalledTimes(1);
      expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('failed or skipped'));
    });
  });

  // #endregion
});
