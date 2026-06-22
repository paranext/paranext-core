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

  describe('dismiss', () => {
    it('calls toast.dismiss with the mapped toast id', async () => {
      mockToastInfo.mockReturnValueOnce('specific-toast-id');
      const notification: PlatformNotification = { message: 'test', severity: 'info' };
      const notificationId = await capturedService.send(notification);

      await capturedService.dismiss(notificationId);

      expect(mockToast.dismiss).toHaveBeenCalledWith('specific-toast-id');
    });

    it('does nothing when the notification id is not found', async () => {
      await capturedService.dismiss('nonexistent-id');

      expect(mockToast.dismiss).not.toHaveBeenCalled();
    });
  });

  describe('send with a reused notificationId', () => {
    it('passes the existing toast id as the top-level id so Sonner updates instead of duplicating', async () => {
      mockToastInfo.mockReturnValueOnce('toast-1');
      const notification: PlatformNotification = {
        message: 'Syncing...',
        severity: 'info',
        notificationId: 'sync-status',
      };

      // First send creates the toast and maps notificationId -> 'toast-1'.
      await capturedService.send(notification);
      // Re-sending with the same notificationId must UPDATE the existing toast, i.e. pass the
      // existing toast id as the top-level `id` option (what Sonner uses to update vs create).
      await capturedService.send(notification);

      expect(mockToastInfo).toHaveBeenCalledTimes(2);
      expect(mockToastInfo).toHaveBeenNthCalledWith(
        2,
        'Syncing...',
        expect.objectContaining({ id: 'toast-1' }),
      );
    });
  });
});
