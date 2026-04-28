import { describe, it, expect, vi, beforeEach } from 'vitest';
import type {
  INotificationService,
  PlatformNotification,
} from '@shared/models/notification.service-model';

const mockToastInfo = vi.fn(() => 'mock-toast-id');
const mockToastWarning = vi.fn(() => 'mock-toast-id');
const mockToastError = vi.fn(() => 'mock-toast-id');
const mockToast = Object.assign(
  vi.fn(() => 'mock-toast-id'),
  {
    info: mockToastInfo,
    warning: mockToastWarning,
    error: mockToastError,
    dismiss: vi.fn(),
  },
);

vi.mock('sonner', () => ({ toast: mockToast }));
vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));
vi.mock('@shared/services/localization.service', () => ({
  localizationService: {
    getLocalizedString: vi.fn(({ localizeKey }: { localizeKey: string }) =>
      Promise.resolve(localizeKey),
    ),
  },
}));
vi.mock('@shared/services/logger.service', () => ({
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

let capturedService: INotificationService;
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: {
    set: vi.fn((_name: string, service: INotificationService) => {
      capturedService = service;
      return Promise.resolve();
    }),
  },
}));

describe('notification service host', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    const { startNotificationService } = await import(
      '@renderer/services/notification.service-host'
    );
    await startNotificationService();
  });

  describe('send with duration', () => {
    it('uses the provided duration when specified', async () => {
      const notification: PlatformNotification = {
        message: 'test',
        severity: 'info',
        duration: 5000,
      };

      await capturedService.send(notification);

      expect(mockToastInfo).toHaveBeenCalledWith(
        'test',
        expect.objectContaining({ duration: 5000 }),
      );
    });

    it('uses the computed duration when duration is not specified', async () => {
      const notification: PlatformNotification = {
        message: 'test',
        severity: 'info',
      };

      await capturedService.send(notification);

      // 'test' has length 4: Math.min(Math.max(4 * 265, 10000), 35000) = 10000
      expect(mockToastInfo).toHaveBeenCalledWith(
        'test',
        expect.objectContaining({ duration: 10000 }),
      );
    });
  });
});
