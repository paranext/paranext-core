import { beforeEach, describe, expect, it, vi } from 'vitest';
import { logger } from '@shared/services/logger.service';
import { settingsService } from '@shared/services/settings.service';
import { isFirstRunComplete } from '@main/first-run-consent.util';

vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: vi.fn() },
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

const mockSettingsGet = vi.mocked(settingsService.get);
const mockLoggerWarn = vi.mocked(logger.warn);

beforeEach(() => {
  vi.clearAllMocks();
});

/**
 * Tests the consent gate at its source. Each of the three call sites (startup, shutdown, window
 * close) proves it acts on the answer; this proves the answer itself, so the fail-closed default
 * does not depend on any one call site's suite surviving.
 */
describe('isFirstRunComplete', () => {
  it('reports complete once the wizard has finished', async () => {
    mockSettingsGet.mockResolvedValue(true);

    await expect(isFirstRunComplete()).resolves.toBe(true);
    expect(mockSettingsGet).toHaveBeenCalledWith('platform.firstRunComplete');
    expect(mockLoggerWarn).not.toHaveBeenCalled();
  });

  it('reports not complete while the wizard is unfinished', async () => {
    mockSettingsGet.mockResolvedValue(false);

    await expect(isFirstRunComplete()).resolves.toBe(false);
    expect(mockLoggerWarn).not.toHaveBeenCalled();
  });

  it('reports not complete for a non-boolean value, so only a literal true opens the gate', async () => {
    mockSettingsGet.mockResolvedValue('simple');

    await expect(isFirstRunComplete()).resolves.toBe(false);
  });

  it('reports not complete when the flag cannot be read (fails CLOSED) rather than rejecting, and says so', async () => {
    // The consent-safe default, and the reason the gate exists: syncing without consent cannot be
    // undone, so an unreadable flag must never be the thing that lets a sync through. Resolving
    // rather than rejecting is what lets every call site gate on this without its own try/catch, and
    // the warn is what tells a reader the gate closed for this reason rather than an unfinished
    // wizard.
    mockSettingsGet.mockRejectedValue(new Error('settings unavailable'));

    await expect(isFirstRunComplete()).resolves.toBe(false);
    expect(mockLoggerWarn).toHaveBeenCalledWith(
      expect.stringContaining('Could not read platform.firstRunComplete'),
    );
  });
});
