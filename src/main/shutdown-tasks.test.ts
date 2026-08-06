import { vi } from 'vitest';
import { AUTO_SYNC_MAX_DURATION_MS } from '@shared/data/platform.data';
import { settingsService } from '@shared/services/settings.service';
import * as networkService from '@shared/services/network.service';
import {
  getAllOpenWebViewDefinitionsWithReachability,
  getOpenWebViewDefinitionsForWindow,
} from '@main/services/web-view.service-router';
import { logger } from '@shared/services/logger.service';
import { performShutdownTasks, performWindowCloseTasks } from './shutdown-tasks';

vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: vi.fn() },
}));

vi.mock('@shared/services/network.service', () => ({
  requestNoRetry: vi.fn(),
}));

vi.mock('@main/services/web-view.service-router', () => ({
  getAllOpenWebViewDefinitionsWithReachability: vi.fn(),
  getOpenWebViewDefinitionsForWindow: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  // `debug` matches the sibling startup-tasks.test.ts mock; logShutdownSyncOutcome logs a scheduled
  // skip at debug, so leaving it out would throw "logger.debug is not a function".
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const mockSettingsGet = vi.mocked(settingsService.get);
const mockRequestNoRetry = vi.mocked(networkService.requestNoRetry);
const mockGetOpenWebViews = vi.mocked(getAllOpenWebViewDefinitionsWithReachability);
const mockGetOpenWebViewsForWindow = vi.mocked(getOpenWebViewDefinitionsForWindow);
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
    // The main-process WebView service router fans getAllOpenWebViewDefinitions out across every
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

  it('says so rather than exiting silently when it cannot establish what was open', async () => {
    // Every window's unsynced work goes out unsynced here, and this is the app's last chance to know
    // it. A support engineer reading the log after a data-loss report must not find a clean
    // shutdown with nothing at all between "quitting" and process exit.
    mockSettingsGet.mockResolvedValue('simple');
    mockGetOpenWebViews.mockRejectedValue(new Error('service unavailable'));

    await performShutdownTasks();

    expect(mockRequestNoRetry.mock.calls.map(([cmd]) => cmd)).not.toContainEqual(
      expect.stringContaining('sendReceiveProjects'),
    );
    expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('service unavailable'));
    expect(mockLoggerWarn).toHaveBeenCalledWith(
      expect.stringContaining('could not be established'),
    );
    expect(mockLoggerInfo).not.toHaveBeenCalledWith('Sync on shutdown complete');
  });

  it('records a skip when nothing writable was open anywhere', async () => {
    // Every exit path from the shutdown sync leaves a line, so the log distinguishes "nothing to
    // sync" from "the sync never got as far as choosing anything"
    mockSettingsGet.mockResolvedValue('simple');
    mockGetOpenWebViews.mockResolvedValue(openWebViews([]));

    await performShutdownTasks();

    expect(mockLoggerDebug).toHaveBeenCalledWith(expect.stringContaining('skipped'));
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

describe('performWindowCloseTasks', () => {
  /**
   * The window's own open definitions. Real ones are `SavedWebViewDefinition`s; these fixtures
   * carry only the three fields the selection reads.
   */
  function windowWebViews(definitions: object[]) {
    // The real definitions carry far more than the selection under test reads; asserting the
    // fixtures is what keeps them to the three fields that matter here
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return definitions as Awaited<ReturnType<typeof getOpenWebViewDefinitionsForWindow>>;
  }

  const writableEditor = (projectId: string) => ({
    webViewType: 'platformScriptureEditor.react',
    state: { isReadOnly: false },
    projectId,
  });

  it('syncs the projects the closing window was editing, asking that window and no other', async () => {
    // Nothing else can answer for this window: once it is gone the shutdown fan-out only reaches the
    // windows that are still there, so whatever it had open would never be sent
    mockSettingsGet.mockResolvedValue('simple');
    mockGetOpenWebViewsForWindow.mockResolvedValue(
      windowWebViews([writableEditor('p1'), writableEditor('p2')]),
    );

    await performWindowCloseTasks(2);

    expect(mockGetOpenWebViewsForWindow).toHaveBeenCalledWith(2);
    expect(mockGetOpenWebViews).not.toHaveBeenCalled();
    expect(mockRequestNoRetry).toHaveBeenCalledWith(
      expect.stringContaining('sendReceiveProjects'),
      ['p1', 'p2'],
    );
  });

  it('does not cancel a sync another window may have started', async () => {
    // The app is staying up, unlike a shutdown — an in-progress sync belongs to a window that is not
    // going anywhere
    mockSettingsGet.mockResolvedValue('simple');
    mockGetOpenWebViewsForWindow.mockResolvedValue(windowWebViews([writableEditor('p1')]));

    await performWindowCloseTasks(2);

    expect(mockRequestNoRetry.mock.calls.map(([requestType]) => requestType)).not.toContainEqual(
      expect.stringContaining('cancelSync'),
    );
  });

  it('deduplicates projects and ignores read-only viewers', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockGetOpenWebViewsForWindow.mockResolvedValue(
      windowWebViews([
        writableEditor('p1'),
        writableEditor('p1'),
        {
          webViewType: 'platformScriptureEditor.react',
          state: { isReadOnly: true },
          projectId: 'p9',
        },
        { webViewType: 'someOther.webView', projectId: 'p8' },
      ]),
    );

    await performWindowCloseTasks(2);

    expect(mockRequestNoRetry).toHaveBeenCalledWith(
      expect.stringContaining('sendReceiveProjects'),
      ['p1'],
    );
  });

  it('syncs nothing when the closing window had no writable editor open', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockGetOpenWebViewsForWindow.mockResolvedValue(windowWebViews([]));

    await performWindowCloseTasks(2);

    expect(mockRequestNoRetry).not.toHaveBeenCalled();
  });

  it('does not run the session-boundary sync in power mode', async () => {
    // One window of several closing is not the end of a session, so the scheduled set of projects
    // has nothing to do with the window going away
    mockSettingsGet.mockResolvedValue('power');

    await performWindowCloseTasks(2);

    expect(mockRequestNoRetry).not.toHaveBeenCalled();
    expect(mockGetOpenWebViewsForWindow).not.toHaveBeenCalled();
  });

  it('skips the sync and warns when the interface mode cannot be read', async () => {
    mockSettingsGet.mockRejectedValue(new Error('extension host is going away'));

    await performWindowCloseTasks(2);

    expect(mockRequestNoRetry).not.toHaveBeenCalled();
    expect(mockLoggerWarn).toHaveBeenCalledWith(
      expect.stringContaining('Could not read platform.interfaceMode'),
    );
  });

  it('warns rather than silently syncing nothing when the closing window cannot be asked', async () => {
    // This is the last moment anything can know what the window had open, so an unanswered read is
    // not the same as "nothing was open"
    mockSettingsGet.mockResolvedValue('simple');
    mockGetOpenWebViewsForWindow.mockRejectedValue(new Error('window is unreachable'));

    await performWindowCloseTasks(2);

    expect(mockRequestNoRetry).not.toHaveBeenCalled();
    expect(mockLoggerWarn).toHaveBeenCalledWith(
      expect.stringContaining('Could not read what closing window 2 had open'),
    );
  });

  it('swallows a missing or failing S/R command so the window can still close', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockGetOpenWebViewsForWindow.mockResolvedValue(windowWebViews([writableEditor('p1')]));
    mockRequestNoRetry.mockRejectedValue(new Error('command not registered'));

    await expect(performWindowCloseTasks(2)).resolves.toBeUndefined();
    expect(mockLoggerWarn).toHaveBeenCalledWith(expect.stringContaining('failed or skipped'));
  });

  it('swallows unexpected errors and does not throw (exercises the outer try/catch)', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockGetOpenWebViewsForWindow.mockResolvedValue(windowWebViews([writableEditor('p1')]));
    mockLoggerInfo.mockImplementationOnce(() => {
      throw new Error('unexpected logging failure');
    });

    await expect(performWindowCloseTasks(2)).resolves.toBeUndefined();
    expect(mockLoggerError).toHaveBeenCalled();
  });

  it('is not cancelled out from under the closing window when the app quits mid-sync', async () => {
    // The closing window's editors only ever existed in it, so its sync is the only thing that can
    // ever cover them. A quit arriving while it runs used to cancel it with nothing left to sync
    // those projects.
    mockSettingsGet.mockResolvedValue('simple');
    mockGetOpenWebViewsForWindow.mockResolvedValue(
      windowWebViews([writableEditor('closing-window-project')]),
    );
    mockGetOpenWebViews.mockResolvedValue(openWebViews([]));
    let releaseWindowCloseSync = () => {};
    mockRequestNoRetry.mockImplementation(async (requestType) => {
      if (`${requestType}`.includes('sendReceiveProjects'))
        await new Promise<void>((resolve) => {
          releaseWindowCloseSync = resolve;
        });
      return undefined;
    });

    const windowCloseTasks = performWindowCloseTasks(2);
    await vi.waitFor(() =>
      expect(mockRequestNoRetry).toHaveBeenCalledWith(
        expect.stringContaining('sendReceiveProjects'),
        ['closing-window-project'],
      ),
    );

    const shutdownTasks = performShutdownTasks();
    // Give the quit every chance to reach its cancel while the window's sync is still running
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    expect(mockRequestNoRetry.mock.calls.map(([requestType]) => requestType)).not.toContainEqual(
      expect.stringContaining('cancelSync'),
    );

    releaseWindowCloseSync();
    await windowCloseTasks;
    await shutdownTasks;

    // Only once the window's sync had finished
    expect(mockRequestNoRetry.mock.calls.map(([requestType]) => requestType)).toContainEqual(
      expect.stringContaining('cancelSync'),
    );
  });
});
