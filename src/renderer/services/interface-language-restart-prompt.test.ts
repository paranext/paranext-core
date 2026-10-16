import { beforeEach, describe, expect, it, vi } from 'vitest';
import { logger } from '@shared/services/logger.service';
import { notificationService } from '@shared/services/notification.service';
import { settingsService } from '@shared/services/settings.service';

vi.mock('@shared/services/notification.service', () => ({
  notificationService: { send: vi.fn(async () => 'id'), dismiss: vi.fn(async () => {}) },
}));
vi.mock('@shared/services/settings.service', () => ({
  settingsService: { get: vi.fn(async () => ['en']) },
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn() },
}));

type PromptModule = typeof import('./interface-language-restart-prompt');

// The module remembers the language the app started in, so each test gets a fresh copy.
async function freshModule(): Promise<PromptModule> {
  vi.resetModules();
  return import('./interface-language-restart-prompt');
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('offerRestartAfterInterfaceLanguageChange', () => {
  it('offers a restart that stays up until the user acts on it when the primary language changes', async () => {
    const prompt = await freshModule();
    await prompt.offerRestartAfterInterfaceLanguageChange(['en'], ['es', 'en']);
    expect(notificationService.send).toHaveBeenCalledWith({
      message: '%interfaceLanguage_restartPrompt_message%',
      severity: 'info',
      clickCommand: 'platform.restart',
      clickCommandLabel: '%interfaceLanguage_restartPrompt_restartNow%',
      notificationId: prompt.INTERFACE_LANGUAGE_RESTART_NOTIFICATION_ID,
      duration: 0,
    });
  });

  it('does not offer a restart when only the fallback languages change', async () => {
    const prompt = await freshModule();
    await prompt.offerRestartAfterInterfaceLanguageChange(['en', 'fr'], ['en', 'es']);
    expect(notificationService.send).not.toHaveBeenCalled();
  });

  it('logs instead of rejecting when the notification cannot be sent', async () => {
    const prompt = await freshModule();
    vi.mocked(notificationService.send).mockRejectedValueOnce(new Error('no window'));
    await expect(
      prompt.offerRestartAfterInterfaceLanguageChange(['en'], ['es']),
    ).resolves.toBeUndefined();
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('no window'));
  });
});

describe('switching back to the language the app started in', () => {
  it('withdraws the prompt instead of offering a restart', async () => {
    const prompt = await freshModule();
    vi.mocked(settingsService.get).mockResolvedValueOnce(['en']);
    await prompt.rememberLaunchInterfaceLanguage();

    await prompt.offerRestartAfterInterfaceLanguageChange(['en'], ['es', 'en']);
    expect(notificationService.send).toHaveBeenCalledTimes(1);

    await prompt.offerRestartAfterInterfaceLanguageChange(['es', 'en'], ['en', 'es']);
    expect(notificationService.send).toHaveBeenCalledTimes(1);
    expect(notificationService.dismiss).toHaveBeenCalledWith(
      prompt.INTERFACE_LANGUAGE_RESTART_NOTIFICATION_ID,
    );
  });

  it('still offers a restart when switching to a language other than the start language', async () => {
    const prompt = await freshModule();
    vi.mocked(settingsService.get).mockResolvedValueOnce(['es']);
    await prompt.rememberLaunchInterfaceLanguage();

    await prompt.offerRestartAfterInterfaceLanguageChange(['es'], ['en', 'es']);
    expect(notificationService.send).toHaveBeenCalledTimes(1);
    expect(notificationService.dismiss).not.toHaveBeenCalled();
  });

  it('offers a restart as usual when the start language could not be read', async () => {
    const prompt = await freshModule();
    vi.mocked(settingsService.get).mockRejectedValueOnce(new Error('settings unavailable'));
    await expect(prompt.rememberLaunchInterfaceLanguage()).resolves.toBeUndefined();
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('settings unavailable'));

    await prompt.offerRestartAfterInterfaceLanguageChange(['es'], ['en']);
    expect(notificationService.send).toHaveBeenCalledTimes(1);
  });

  it('logs instead of rejecting when the prompt cannot be withdrawn', async () => {
    const prompt = await freshModule();
    await prompt.rememberLaunchInterfaceLanguage();
    vi.mocked(notificationService.dismiss).mockRejectedValueOnce(new Error('no window'));
    await expect(
      prompt.offerRestartAfterInterfaceLanguageChange(['es'], ['en']),
    ).resolves.toBeUndefined();
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('no window'));
  });
});
