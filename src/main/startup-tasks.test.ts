import { vi } from 'vitest';
import { settingsService } from '@shared/services/settings.service';
import * as networkService from '@shared/services/network.service';
import { performStartupTasks } from './startup-tasks';

vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: vi.fn() },
}));

vi.mock('@shared/services/network.service', () => ({
  request: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const mockSettingsGet = vi.mocked(settingsService.get);
const mockRequest = vi.mocked(networkService.request);

beforeEach(() => {
  vi.clearAllMocks();
  mockRequest.mockResolvedValue(undefined);
});

describe('performStartupTasks', () => {
  it('returns without firing sync when interface mode is power', async () => {
    mockSettingsGet.mockResolvedValue('power');
    await performStartupTasks();
    expect(mockRequest).not.toHaveBeenCalled();
  });

  it('fires syncProjects with no project IDs when interface mode is simple', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    await performStartupTasks();
    expect(mockRequest).toHaveBeenCalledWith(expect.stringContaining('syncProjects'), undefined);
  });

  it('fires syncProjects (simple-mode fallback) when settings service throws', async () => {
    mockSettingsGet.mockRejectedValue(new Error('settings unavailable'));
    await performStartupTasks();
    expect(mockRequest).toHaveBeenCalledWith(expect.stringContaining('syncProjects'), undefined);
  });

  it('swallows sync failures without throwing', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockRequest.mockRejectedValue(new Error('sync command not registered'));
    await expect(performStartupTasks()).resolves.toBeUndefined();
  });

  it('swallows unexpected errors and does not throw', async () => {
    mockSettingsGet.mockResolvedValue('simple');
    mockRequest.mockImplementation(() => {
      throw new Error('unexpected non-async throw');
    });
    await expect(performStartupTasks()).resolves.toBeUndefined();
  });
});
