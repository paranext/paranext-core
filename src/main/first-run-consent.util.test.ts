import { beforeEach, describe, expect, it, vi } from 'vitest';
import { logger } from '@shared/services/logger.service';
import { settingsService } from '@shared/services/settings.service';
import {
  deferAutomaticSyncForSession,
  getAutomaticSyncConsent,
  resetAutomaticSyncDeferralForTesting,
} from '@main/first-run-consent.util';

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
  resetAutomaticSyncDeferralForTesting();
});

/**
 * Tests the consent gate at its source. Each call site proves it acts on the answer; this proves
 * the answer itself, so the fail-closed default does not depend on any one call site's suite
 * surviving.
 */
describe('getAutomaticSyncConsent', () => {
  it('grants consent once the wizard has finished', async () => {
    mockSettingsGet.mockResolvedValue(true);

    await expect(getAutomaticSyncConsent()).resolves.toBe('granted');
    expect(mockSettingsGet).toHaveBeenCalledWith('platform.firstRunComplete');
    expect(mockLoggerWarn).not.toHaveBeenCalled();
  });

  it('withholds consent while the wizard is unfinished', async () => {
    mockSettingsGet.mockResolvedValue(false);

    await expect(getAutomaticSyncConsent()).resolves.toBe('unconfirmed');
    expect(mockLoggerWarn).not.toHaveBeenCalled();
  });

  it('withholds consent for a non-boolean value, so only a literal true grants it', async () => {
    mockSettingsGet.mockResolvedValue('simple');

    await expect(getAutomaticSyncConsent()).resolves.toBe('unconfirmed');
  });

  it('withholds consent when the flag cannot be read (fails CLOSED) rather than rejecting, and says so', async () => {
    // Syncing without consent cannot be undone, so an unreadable flag must never be what lets a
    // sync through. Resolving rather than rejecting is what lets every call site gate on this
    // without its own try/catch, and the warn is the only record that a failed read closed the gate.
    mockSettingsGet.mockRejectedValue(new Error('settings unavailable'));

    await expect(getAutomaticSyncConsent()).resolves.toBe('unconfirmed');
    expect(mockLoggerWarn).toHaveBeenCalledWith(
      expect.stringContaining('Could not read platform.firstRunComplete'),
    );
  });

  it('withholds consent for the rest of the session once the user defers sync, even with the wizard finished', async () => {
    // "Don't sync yet" marks the wizard finished too, so without the deferral every gate would open
    // the moment the user declined.
    mockSettingsGet.mockResolvedValue(true);

    deferAutomaticSyncForSession();

    await expect(getAutomaticSyncConsent()).resolves.toBe('deferred');
    await expect(getAutomaticSyncConsent()).resolves.toBe('deferred');
  });
});
