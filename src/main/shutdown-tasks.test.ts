import { vi } from 'vitest';
import { settingsService } from '@shared/services/settings.service';
import * as networkService from '@shared/services/network.service';
import { networkObjectService } from '@shared/services/network-object.service';
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
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const mockSettingsGet = vi.mocked(settingsService.get);
const mockRequestNoRetry = vi.mocked(networkService.requestNoRetry);
const mockNetworkObjectGet = vi.mocked(networkObjectService.get);

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
  it('returns without any network calls when interface mode is neither simple nor power', async () => {
    mockSettingsGet.mockResolvedValue('somethingElse');
    await performShutdownTasks();
    expect(mockRequestNoRetry).not.toHaveBeenCalled();
  });

  it('fires runScheduledSessionSync("shutdown") when interface mode is power', async () => {
    mockSettingsGet.mockResolvedValue('power');
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
  });

  it('swallows a missing/failing runScheduledSessionSync command in power mode without throwing', async () => {
    mockSettingsGet.mockResolvedValue('power');
    mockRequestNoRetry.mockRejectedValue(new Error('command not registered'));
    await expect(performShutdownTasks()).resolves.toBeUndefined();
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

  it('proceeds with S/R (simple-mode fallback) when settings service throws', async () => {
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
    expect(mockRequestNoRetry).toHaveBeenCalledWith(expect.stringContaining('cancelSync'));
    expect(mockRequestNoRetry).toHaveBeenCalledWith(
      expect.stringContaining('sendReceiveProjects'),
      ['fallback-project'],
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
