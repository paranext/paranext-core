import { vi } from 'vitest';
import { AUTO_SYNC_MAX_DURATION_MS } from '@shared/data/platform.data';
import { settingsService } from '@shared/services/settings.service';
import * as networkService from '@shared/services/network.service';
import { getAllOpenWebViewDefinitionsWithReachability } from '@main/services/web-view-routing.service';
import { logger } from '@shared/services/logger.service';
import { performShutdownTasks } from './shutdown-tasks';

vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: vi.fn() },
}));

vi.mock('@shared/services/network.service', () => ({
  requestNoRetry: vi.fn(),
}));

vi.mock('@main/services/web-view-routing.service', () => ({
  getAllOpenWebViewDefinitionsWithReachability: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  // `debug` matches the sibling startup-tasks.test.ts mock; logShutdownSyncOutcome logs a scheduled
  // skip at debug, so leaving it out would throw "logger.debug is not a function".
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const mockSettingsGet = vi.mocked(settingsService.get);
const mockRequestNoRetry = vi.mocked(networkService.requestNoRetry);
const mockGetOpenWebViews = vi.mocked(getAllOpenWebViewDefinitionsWithReachability);
const mockLoggerDebug = vi.mocked(logger.debug);
const mockLoggerInfo = vi.mocked(logger.info);
const mockLoggerWarn = vi.mocked(logger.warn);
const mockLoggerError = vi.mocked(logger.error);

/**
 * What the WebView fan-out answers: the definitions the windows that answered reported, and the
 * windows that could not be asked (whose editors are therefore missing from the list).
 */
function openWebViews(definitions: object[], unreachableWindowIds: number[] = []) {
  // The fan-out's real definitions are `SavedWebViewDefinition`s; these fixtures carry only the
  // three fields the shutdown selection reads
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { definitions, unreachableWindowIds } as Awaited<
    ReturnType<typeof getAllOpenWebViewDefinitionsWithReachability>
  >;
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
    expect(mockGetOpenWebViews).not.toHaveBeenCalled();
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
    // `timedOut` branch — the one path AUTO_SYNC_MAX_DURATION_MS exists to bound. (An unregistered
    // command does NOT reach here; it rejects fast and settles as `failed`, covered above.)
    mockRequestNoRetry.mockImplementation(() => new Promise(() => {}));
    vi.useFakeTimers();
    try {
      const shutdownPromise = performShutdownTasks();
      await vi.advanceTimersByTimeAsync(AUTO_SYNC_MAX_DURATION_MS);
      await expect(shutdownPromise).resolves.toBeUndefined();
    } finally {
      vi.useRealTimers();
    }
    expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('timed out'));
    expect(mockLoggerInfo).not.toHaveBeenCalledWith(expect.stringContaining('complete'));
  });

  it('cancels sync but skips S/R when no Scripture Editor is open', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockGetOpenWebViews.mockResolvedValue(openWebViews([]));
    await performShutdownTasks();
    expect(mockRequestNoRetry).toHaveBeenCalledWith(expect.stringContaining('cancelSync'));
    expect(mockRequestNoRetry.mock.calls.map(([cmd]) => cmd)).not.toContainEqual(
      expect.stringContaining('sendReceiveProjects'),
    );
  });

  it('skips S/R when the only open Scripture Editor is read-only', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockGetOpenWebViews.mockResolvedValue(
      openWebViews([
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
    mockGetOpenWebViews.mockResolvedValue(
      openWebViews([
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

  it('syncs every distinct writable editor project when several windows are open', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    // The main-process WebView service proxy fans getAllOpenWebViewDefinitions out across every
    // window and merges the results, so this one list represents two windows' editors.
    mockGetOpenWebViews.mockResolvedValue(
      openWebViews([
        {
          webViewType: 'platformScriptureEditor.react',
          state: { isReadOnly: false },
          projectId: 'window-1-project',
        },
        {
          webViewType: 'platformScriptureEditor.react',
          state: { isReadOnly: true },
          projectId: 'read-only-project',
        },
        {
          webViewType: 'platformScriptureEditor.react',
          state: { isReadOnly: false },
          projectId: 'window-2-project',
        },
      ]),
    );
    await performShutdownTasks();
    // Both windows' projects sync; the read-only one is still excluded.
    expect(mockRequestNoRetry).toHaveBeenCalledWith(
      expect.stringContaining('sendReceiveProjects'),
      ['window-1-project', 'window-2-project'],
    );
  });

  it('sends a project shared by two windows only once', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockGetOpenWebViews.mockResolvedValue(
      openWebViews([
        {
          webViewType: 'platformScriptureEditor.react',
          state: { isReadOnly: false },
          projectId: 'shared-project',
        },
        {
          webViewType: 'platformScriptureEditor.react',
          state: { isReadOnly: false },
          projectId: 'shared-project',
        },
      ]),
    );
    await performShutdownTasks();
    expect(mockRequestNoRetry).toHaveBeenCalledWith(
      expect.stringContaining('sendReceiveProjects'),
      ['shared-project'],
    );
  });

  it('ignores a writable editor with no project id', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockGetOpenWebViews.mockResolvedValue(
      openWebViews([
        { webViewType: 'platformScriptureEditor.react', state: { isReadOnly: false } },
        {
          webViewType: 'platformScriptureEditor.react',
          state: { isReadOnly: false },
          projectId: 'real-project',
        },
      ]),
    );
    await performShutdownTasks();
    expect(mockRequestNoRetry).toHaveBeenCalledWith(
      expect.stringContaining('sendReceiveProjects'),
      ['real-project'],
    );
  });

  it('skips S/R when every writable editor lacks a project id', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockGetOpenWebViews.mockResolvedValue(
      openWebViews([
        { webViewType: 'platformScriptureEditor.react', state: { isReadOnly: false } },
      ]),
    );
    await performShutdownTasks();
    expect(mockRequestNoRetry.mock.calls.map(([cmd]) => cmd)).not.toContainEqual(
      expect.stringContaining('sendReceiveProjects'),
    );
  });

  it('warns that the sync covers only part of the app when a window could not be asked', async () => {
    // This read happens once, at quit, with no event stream to correct it afterwards. A window that
    // failed to answer looks exactly like one with nothing open, so the projects it was editing
    // drop out of the sync silently — reporting that as a completed sync is the dangerous part.
    mockSettingsGet.mockResolvedValue('simple');
    mockGetOpenWebViews.mockResolvedValue(
      openWebViews(
        [
          {
            webViewType: 'platformScriptureEditor.react',
            state: { isReadOnly: false },
            projectId: 'answered-project',
          },
        ],
        [2],
      ),
    );
    await performShutdownTasks();
    expect(mockRequestNoRetry).toHaveBeenCalledWith(
      expect.stringContaining('sendReceiveProjects'),
      ['answered-project'],
    );
    expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('2'));
    expect(mockLoggerInfo).not.toHaveBeenCalledWith('Sync on shutdown complete');
  });

  it('warns when the window that did not answer was the only one that could have had editors', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockGetOpenWebViews.mockResolvedValue(openWebViews([], [1]));
    await performShutdownTasks();
    expect(mockRequestNoRetry.mock.calls.map(([cmd]) => cmd)).not.toContainEqual(
      expect.stringContaining('sendReceiveProjects'),
    );
    expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('1'));
  });

  it('skips S/R when the WebView service is unavailable', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockGetOpenWebViews.mockRejectedValue(new Error('service unavailable'));
    await performShutdownTasks();
    expect(mockRequestNoRetry.mock.calls.map(([cmd]) => cmd)).not.toContainEqual(
      expect.stringContaining('sendReceiveProjects'),
    );
  });

  it('skips the automatic shutdown S/R and warns when settings service throws (no open-editor fallback)', async () => {
    // Symmetric with startup: an unreadable mode must not fall through to Simple's open-editor S/R,
    // which could sync a project a Power user excluded from their schedule. Do nothing and warn.
    mockSettingsGet.mockRejectedValue(new Error('settings unavailable'));
    mockGetOpenWebViews.mockResolvedValue(
      openWebViews([
        {
          webViewType: 'platformScriptureEditor.react',
          state: { isReadOnly: false },
          projectId: 'fallback-project',
        },
      ]),
    );
    await performShutdownTasks();
    expect(mockRequestNoRetry).not.toHaveBeenCalled();
    expect(mockGetOpenWebViews).not.toHaveBeenCalled();
    expect(mockLoggerWarn).toHaveBeenCalledWith(
      expect.stringContaining('Could not read platform.interfaceMode'),
    );
  });

  it('swallows unexpected errors and does not throw (exercises the outer try/catch)', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    // A WRITABLE editor so the flow runs past the `if (!projectId) return` early return and into
    // performSimpleModeShutdownSync's unguarded region (an empty list would return early and never
    // exercise the outer catch — the whole point of this test).
    mockGetOpenWebViews.mockResolvedValue(
      openWebViews([
        {
          webViewType: 'platformScriptureEditor.react',
          state: { isReadOnly: false },
          projectId: 'p1',
        },
      ]),
    );
    // Inject an unexpected error from an UNGUARDED spot — the "Syncing project on shutdown..." log,
    // which is not wrapped in an inner try/catch. It escapes the inner handlers so that only
    // performShutdownTasks's outer try/catch can swallow it. (Verified falsifiable: deleting that
    // outer try/catch makes performShutdownTasks reject and this `resolves` assertion fail.)
    mockLoggerInfo.mockImplementationOnce(() => {
      throw new Error('unexpected logging failure');
    });
    await expect(performShutdownTasks()).resolves.toBeUndefined();
    // The outer catch handled it via logger.error.
    expect(mockLoggerError).toHaveBeenCalled();
  });
});
