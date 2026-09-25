import { beforeEach, describe, expect, it, vi } from 'vitest';
import { logger } from '@shared/services/logger.service';
import { notificationService } from '@shared/services/notification.service';
import {
  INTERFACE_LANGUAGE_RESTART_NOTIFICATION_ID,
  offerRestartAfterInterfaceLanguageChange,
} from './interface-language-restart-prompt';

vi.mock('@shared/services/notification.service', () => ({
  notificationService: { send: vi.fn(async () => 'id') },
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { warn: vi.fn() },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('offerRestartAfterInterfaceLanguageChange', () => {
  it('offers a restart that stays up until the user acts on it when the primary language changes', async () => {
    await offerRestartAfterInterfaceLanguageChange(['en'], ['es', 'en']);
    expect(notificationService.send).toHaveBeenCalledWith({
      message: '%interfaceLanguage_restartPrompt_message%',
      severity: 'info',
      clickCommand: 'platform.restart',
      clickCommandLabel: '%interfaceLanguage_restartPrompt_restartNow%',
      notificationId: INTERFACE_LANGUAGE_RESTART_NOTIFICATION_ID,
      duration: 0,
    });
  });

  it('does not offer a restart when only the fallback languages change', async () => {
    await offerRestartAfterInterfaceLanguageChange(['en', 'fr'], ['en', 'es']);
    expect(notificationService.send).not.toHaveBeenCalled();
  });

  it('logs instead of rejecting when the notification cannot be sent', async () => {
    vi.mocked(notificationService.send).mockRejectedValueOnce(new Error('no window'));
    await expect(offerRestartAfterInterfaceLanguageChange(['en'], ['es'])).resolves.toBeUndefined();
    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('no window'));
  });
});
