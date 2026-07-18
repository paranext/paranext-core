import { vi } from 'vitest';
import { settingsService } from '@shared/services/settings.service';
import * as commandService from '@shared/services/command.service';
import { performStartupTasks } from './startup-tasks';

vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: vi.fn() },
}));

vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const mockSettingsGet = vi.mocked(settingsService.get);
const mockSendCommand = vi.mocked(commandService.sendCommand);

function stubSettings({ mode = 'simple', firstRunComplete = true } = {}) {
  mockSettingsGet.mockImplementation(async (key: string) => {
    if (key === 'platform.interfaceMode') return mode;
    if (key === 'platform.firstRunComplete') return firstRunComplete;
    throw new Error(`Unexpected settings key in test stub: ${key}`);
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mockSendCommand.mockResolvedValue(undefined);
});

describe('performStartupTasks', () => {
  it('returns without firing sync when interface mode is power', async () => {
    stubSettings({ mode: 'power' });
    await performStartupTasks();
    expect(mockSendCommand).not.toHaveBeenCalled();
  });

  it('fires syncProjects with no project IDs when interface mode is simple', async () => {
    stubSettings({ mode: 'simple', firstRunComplete: true });
    await performStartupTasks();
    expect(mockSendCommand).toHaveBeenCalledWith(
      'paratextBibleSendReceive.syncProjects',
      undefined,
    );
  });

  it('skips sync when settings are unreadable (safe default)', async () => {
    mockSettingsGet.mockRejectedValue(new Error('settings unavailable'));
    await performStartupTasks();
    expect(mockSendCommand).not.toHaveBeenCalled();
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
});
