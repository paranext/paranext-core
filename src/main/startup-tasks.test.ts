import { vi } from 'vitest';
import { settingsService } from '@shared/services/settings.service';
import * as commandService from '@shared/services/command.service';
import * as networkService from '@shared/services/network.service';
import { performStartupTasks } from './startup-tasks';

vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: vi.fn() },
}));

vi.mock('@shared/services/command.service', () => ({
  sendCommand: vi.fn(),
}));

vi.mock('@shared/services/network.service', () => ({
  request: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const mockSettingsGet = vi.mocked(settingsService.get);
const mockSendCommand = vi.mocked(commandService.sendCommand);
const mockRequest = vi.mocked(networkService.request);

beforeEach(() => {
  vi.clearAllMocks();
  mockSendCommand.mockResolvedValue(undefined);
  mockRequest.mockResolvedValue(undefined);
});

describe('performStartupTasks', () => {
  it('fires runScheduledSessionSync("startup") when interface mode is power', async () => {
    mockSettingsGet.mockResolvedValue('power');
    await performStartupTasks();
    expect(mockRequest).toHaveBeenCalledWith(
      expect.stringContaining('runScheduledSessionSync'),
      'startup',
    );
    expect(mockSendCommand).not.toHaveBeenCalled();
  });

  it('swallows a missing/failing runScheduledSessionSync command in power mode without throwing', async () => {
    mockSettingsGet.mockResolvedValue('power');
    mockRequest.mockRejectedValue(new Error('command not registered'));
    await expect(performStartupTasks()).resolves.toBeUndefined();
  });

  it('fires syncProjects with no project IDs when interface mode is simple', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    await performStartupTasks();
    expect(mockSendCommand).toHaveBeenCalledWith(
      'paratextBibleSendReceive.syncProjects',
      undefined,
    );
    expect(mockRequest).not.toHaveBeenCalled();
  });

  it('fires syncProjects (simple-mode fallback) when settings service throws', async () => {
    mockSettingsGet.mockRejectedValue(new Error('settings unavailable'));
    await performStartupTasks();
    expect(mockSendCommand).toHaveBeenCalledWith(
      'paratextBibleSendReceive.syncProjects',
      undefined,
    );
  });

  it('returns without firing any sync when interface mode is neither simple nor power', async () => {
    mockSettingsGet.mockResolvedValue('somethingElse');
    await performStartupTasks();
    expect(mockSendCommand).not.toHaveBeenCalled();
    expect(mockRequest).not.toHaveBeenCalled();
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
});
