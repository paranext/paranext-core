import { vi } from 'vitest';
import { SHUTDOWN_SYNC_TIME_OUT_MS } from '@shared/data/platform.data';
import { settingsService } from '@shared/services/settings.service';
import * as networkService from '@shared/services/network.service';
import { networkObjectService } from '@shared/services/network-object.service';
import { logger } from '@shared/services/logger.service';
import { performShutdownTasks } from './shutdown-tasks';

vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: vi.fn() },
}));

vi.mock('@shared/services/network.service', () => ({
  requestNoRetry: vi.fn(),
}));

vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: vi.fn() },
}));

vi.mock('@shared/services/logger.service', () => ({
  // `debug` matches the sibling startup-tasks.test.ts mock; logShutdownSyncOutcome logs a scheduled
  // skip at debug, so leaving it out would throw "logger.debug is not a function".
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const mockSettingsGet = vi.mocked(settingsService.get);
const mockRequestNoRetry = vi.mocked(networkService.requestNoRetry);
const mockNetworkObjectGet = vi.mocked(networkObjectService.get);
const mockLoggerDebug = vi.mocked(logger.debug);
const mockLoggerInfo = vi.mocked(logger.info);
const mockLoggerWarn = vi.mocked(logger.warn);

function makeWebViewService(defs: object[]) {
  return {
    getAllOpenWebViewDefinitions: vi.fn().mockResolvedValue(defs),
    onDidDispose: vi.fn(),
  };
}

beforeEach(() => {
  vi.clearAllMocks();
  mockRequestNoRetry.mockResolvedValue(undefined);
});

describe('performShutdownTasks', () => {
  it('fires runScheduledSessionSync("shutdown") and logs "complete" when the command reports "synced"', async () => {
    mockSettingsGet.mockResolvedValue('power');
    mockRequestNoRetry.mockResolvedValue('synced');
    await performShutdownTasks();
    expect(mockRequestNoRetry).toHaveBeenCalledWith(
      expect.stringContaining('runScheduledSessionSync'),
      'shutdown',
    );
    // Power mode selects by schedule, not open editors/cancelSync — neither Simple-mode call fires.
    expect(mockRequestNoRetry.mock.calls.map(([cmd]) => cmd)).not.toContainEqual(
      expect.stringContaining('cancelSync'),
    );
    expect(mockNetworkObjectGet).not.toHaveBeenCalled();
    // A reported "synced" is the only thing that produces the truthful "complete" log.
    expect(mockLoggerInfo).toHaveBeenCalledWith('Sync on shutdown complete');
  });

  it('treats a legacy void resolution as "synced" (logs "complete")', async () => {
    mockSettingsGet.mockResolvedValue('power');
    mockRequestNoRetry.mockResolvedValue(undefined);
    await performShutdownTasks();
    expect(mockLoggerInfo).toHaveBeenCalledWith('Sync on shutdown complete');
  });

  it('warns (does not log "complete") when the command reports "failed"', async () => {
    mockSettingsGet.mockResolvedValue('power');
    mockRequestNoRetry.mockResolvedValue('failed');
    await performShutdownTasks();
    expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('reported failure'));
    expect(mockLoggerInfo).not.toHaveBeenCalledWith('Sync on shutdown complete');
  });

  it('logs a debug-only skip (no info, no warn) when the command reports "skipped"', async () => {
    mockSettingsGet.mockResolvedValue('power');
    mockRequestNoRetry.mockResolvedValue('skipped');
    await performShutdownTasks();
    expect(mockLoggerDebug).toHaveBeenCalledWith(expect.stringContaining('skipped'));
    expect(mockLoggerInfo).not.toHaveBeenCalledWith('Sync on shutdown complete');
    expect(mockLoggerWarn).not.toHaveBeenCalled();
  });

  it('swallows a missing/failing runScheduledSessionSync command in power mode without throwing, and does not log "complete"', async () => {
    mockSettingsGet.mockResolvedValue('power');
    mockRequestNoRetry.mockRejectedValue(new Error('command not registered'));
    await expect(performShutdownTasks()).resolves.toBeUndefined();
    // The bounded wait settled (the rejection was caught, not a timeout), so the failure is warned
    // and the misleading "complete" is never logged.
    expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('failed or skipped'));
    expect(mockLoggerInfo).not.toHaveBeenCalledWith('Sync on shutdown complete');
  });

  it('returns after the timeout when runScheduledSessionSync never settles, logs the timeout, and never logs "complete"', async () => {
    mockSettingsGet.mockResolvedValue('power');
    // Never-resolving promise: simulates a genuinely hung sync. `performSync` never settles, so the
    // AsyncVariable's timeout rejects `syncComplete.promise` and runBoundedShutdownSync takes its
    // `timedOut` branch — the one path SHUTDOWN_SYNC_TIME_OUT_MS exists to bound. (An unregistered
    // command does NOT reach here; it rejects fast and settles as `failed`, covered above.)
    mockRequestNoRetry.mockImplementation(() => new Promise(() => {}));
    vi.useFakeTimers();
    try {
      const shutdownPromise = performShutdownTasks();
      await vi.advanceTimersByTimeAsync(SHUTDOWN_SYNC_TIME_OUT_MS);
      await expect(shutdownPromise).resolves.toBeUndefined();
    } finally {
      vi.useRealTimers();
    }
    expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('timed out'));
    expect(mockLoggerInfo).not.toHaveBeenCalledWith(expect.stringContaining('complete'));
  });

  it('cancels sync but skips S/R when no Scripture Editor is open', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockNetworkObjectGet.mockResolvedValue(makeWebViewService([]));
    await performShutdownTasks();
    expect(mockRequestNoRetry).toHaveBeenCalledWith(expect.stringContaining('cancelSync'));
    expect(mockRequestNoRetry.mock.calls.map(([cmd]) => cmd)).not.toContainEqual(
      expect.stringContaining('sendReceiveProjects'),
    );
  });

  it('skips S/R when the only open Scripture Editor is read-only', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockNetworkObjectGet.mockResolvedValue(
      makeWebViewService([
        {
          webViewType: 'platformScriptureEditor.react',
          state: { isReadOnly: true },
          projectId: 'p1',
        }, // matches SCRIPTURE_EDITOR_WEBVIEW_TYPE
      ]),
    );
    await performShutdownTasks();
    expect(mockRequestNoRetry.mock.calls.map(([cmd]) => cmd)).not.toContainEqual(
      expect.stringContaining('sendReceiveProjects'),
    );
  });

  it('calls sendReceiveProjects with the writable editor project id', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockNetworkObjectGet.mockResolvedValue(
      makeWebViewService([
        {
          webViewType: 'platformScriptureEditor.react',
          state: { isReadOnly: false },
          projectId: 'test-project',
        },
      ]),
    );
    await performShutdownTasks();
    expect(mockRequestNoRetry).toHaveBeenCalledWith(
      expect.stringContaining('sendReceiveProjects'),
      ['test-project'],
    );
  });

  it('skips S/R when the WebView service is unavailable', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockNetworkObjectGet.mockRejectedValue(new Error('service unavailable'));
    await performShutdownTasks();
    expect(mockRequestNoRetry.mock.calls.map(([cmd]) => cmd)).not.toContainEqual(
      expect.stringContaining('sendReceiveProjects'),
    );
  });

  it('skips the automatic shutdown S/R and warns when settings service throws (no open-editor fallback)', async () => {
    // Symmetric with startup: an unreadable mode must not fall through to Simple's open-editor S/R,
    // which could sync a project a Power user excluded from their schedule. Do nothing and warn.
    mockSettingsGet.mockRejectedValue(new Error('settings unavailable'));
    mockNetworkObjectGet.mockResolvedValue(
      makeWebViewService([
        {
          webViewType: 'platformScriptureEditor.react',
          state: { isReadOnly: false },
          projectId: 'fallback-project',
        },
      ]),
    );
    await performShutdownTasks();
    expect(mockRequestNoRetry).not.toHaveBeenCalled();
    expect(mockNetworkObjectGet).not.toHaveBeenCalled();
    expect(mockLoggerWarn).toHaveBeenCalledWith(
      expect.stringContaining('Could not read platform.interfaceMode'),
    );
  });

  it('swallows unexpected errors and does not throw', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockNetworkObjectGet.mockResolvedValue(makeWebViewService([]));
    // Force an unexpected throw deep inside by making cancelSync throw a non-Error value
    mockRequestNoRetry.mockImplementation(() => {
      throw new Error('unexpected non-error throw');
    });
    await expect(performShutdownTasks()).resolves.toBeUndefined();
  });
});
