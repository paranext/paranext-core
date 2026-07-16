import { describe, it, expect, vi, beforeEach } from 'vitest';
import type {
  INotificationService,
  PlatformNotification,
} from '@shared/models/notification.service-model';
import * as commandService from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';

/**
 * Minimal shape of the toastOptions object the host passes to Sonner's `toast.*` functions - typed
 * just precisely enough to invoke `action.onClick` / `cancel.onClick` / `onDismiss` / `onAutoClose`
 * from tests without a type assertion (see `.eslintrc.cjs` `no-type-assertion` rule).
 */
interface CapturedToastOptions {
  action?: { label: string; onClick: () => Promise<void> | void };
  cancel?: { label: string; onClick: () => Promise<void> | void };
  onDismiss?: () => Promise<void> | void;
  onAutoClose?: () => Promise<void> | void;
}

// Typed via the explicit generic (rather than named-but-unused parameters on the implementation)
// so `mock.calls` is typed as `[string, CapturedToastOptions?]` without unused-arg lint errors.
const mockToastInfo = vi.fn<(message: string, options?: CapturedToastOptions) => string>(
  () => 'mock-toast-id',
);
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
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
}));

const mockSendCommand = vi.mocked(commandService.sendCommand);

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
    mockSendCommand.mockResolvedValue(undefined);
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

  describe('secondary action and position', () => {
    it('builds a Sonner cancel action from the secondary click fields', async () => {
      const notification: PlatformNotification = {
        message: 'test',
        severity: 'info',
        secondaryClickCommandLabel: 'Postpone',
        // The host passes this straight to Sonner without validating it against real command names,
        // so a stub literal suffices; the cast only satisfies the keyof CommandHandlers field type.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        secondaryClickCommand: 'test.secondary' as never,
      };

      await capturedService.send(notification);

      expect(mockToastInfo).toHaveBeenCalledWith(
        'test',
        expect.objectContaining({
          cancel: expect.objectContaining({ label: 'Postpone' }),
        }),
      );
    });

    it('forwards a per-toast position to Sonner', async () => {
      const notification: PlatformNotification = {
        message: 'test',
        severity: 'info',
        position: 'top-center',
      };

      await capturedService.send(notification);

      expect(mockToastInfo).toHaveBeenCalledWith(
        'test',
        expect.objectContaining({ position: 'top-center' }),
      );
    });

    it('forwards dismissible so a toast can be made non-swipe-dismissible', async () => {
      const notification: PlatformNotification = {
        message: 'test',
        severity: 'info',
        dismissible: false,
      };

      await capturedService.send(notification);

      expect(mockToastInfo).toHaveBeenCalledWith(
        'test',
        expect.objectContaining({ dismissible: false }),
      );
    });

    it('ignores dismissible:false when a secondary command is present so that button stays live', async () => {
      const notification: PlatformNotification = {
        message: 'test',
        severity: 'info',
        dismissible: false,
        secondaryClickCommandLabel: 'Postpone',
        // The host passes this straight to Sonner without validating it against real command names,
        // so a stub literal suffices; the cast only satisfies the keyof CommandHandlers field type.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        secondaryClickCommand: 'test.secondary' as never,
      };

      await capturedService.send(notification);

      // Sonner gates the cancel/secondary button on `dismissible`, so forwarding false would make it
      // a dead button; the host must drop the false and keep the toast dismissible.
      expect(mockToastInfo).toHaveBeenCalledWith(
        'test',
        expect.objectContaining({ dismissible: undefined }),
      );
    });

    it('renders no action/cancel button and no position/dismissible override when those fields are omitted (back-compat)', async () => {
      const notification: PlatformNotification = { message: 'test', severity: 'info' };

      await capturedService.send(notification);

      // Assert the rendered outcome (no buttons, default placement, default dismissibility) rather
      // than the exact option-object shape, so this doesn't cement any particular way of passing the
      // omitted fields through to Sonner.
      expect(mockToastInfo).toHaveBeenCalledWith(
        'test',
        expect.objectContaining({
          action: undefined,
          cancel: undefined,
          position: undefined,
          dismissible: undefined,
        }),
      );
    });

    it('keeps an omitted optional field at its previous value on an update-send instead of clobbering it', async () => {
      const first: PlatformNotification = {
        message: 'Consent?',
        severity: 'info',
        notificationId: 'consent',
        position: 'top-center',
        secondaryClickCommandLabel: 'Postpone',
        // The host passes this straight to Sonner without validating it against real command names,
        // so a stub literal suffices; the cast only satisfies the keyof CommandHandlers field type.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        secondaryClickCommand: 'test.postpone' as never,
        dismissible: false,
      };
      await capturedService.send(first);

      // Update that omits position, the secondary action, and dismissible entirely.
      await capturedService.send({
        message: 'Consent? (retrying)',
        severity: 'info',
        notificationId: 'consent',
      });

      const secondOptions = mockToastInfo.mock.calls[1][1];
      // The position the first send set is preserved, not reverted to the Toaster default...
      expect(mockToastInfo).toHaveBeenNthCalledWith(
        2,
        'Consent? (retrying)',
        expect.objectContaining({ position: 'top-center' }),
      );
      // ...and the secondary (cancel) button survives the update.
      expect(secondOptions?.cancel?.label).toBe('Postpone');
    });

    it('invokes the secondary command with the notification id when the cancel button is clicked', async () => {
      const notification: PlatformNotification = {
        message: 'test',
        severity: 'info',
        secondaryClickCommandLabel: 'Postpone',
        // The host passes this straight to Sonner without validating it against real command names,
        // so a stub literal suffices; the cast only satisfies the keyof CommandHandlers field type.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        secondaryClickCommand: 'test.secondary' as never,
      };

      const notificationId = await capturedService.send(notification);
      const options = mockToastInfo.mock.calls[0][1];
      await options?.cancel?.onClick();

      expect(mockSendCommand).toHaveBeenCalledWith('test.secondary', notificationId);
    });

    it('logs a warning instead of throwing when the secondary command rejects', async () => {
      mockSendCommand.mockRejectedValueOnce(new Error('boom'));
      const notification: PlatformNotification = {
        message: 'test',
        severity: 'info',
        secondaryClickCommandLabel: 'Postpone',
        // The host passes this straight to Sonner without validating it against real command names,
        // so a stub literal suffices; the cast only satisfies the keyof CommandHandlers field type.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        secondaryClickCommand: 'test.secondary' as never,
      };

      await capturedService.send(notification);
      const options = mockToastInfo.mock.calls[0][1];

      // The catch handler must swallow the rejection - awaiting the returned promise must not throw.
      await expect(options?.cancel?.onClick()).resolves.toBeUndefined();
      expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('boom'));
    });
  });

  describe('dismissClickCommand (Sonner onDismiss)', () => {
    it("maps dismissClickCommand to Sonner's onDismiss option and sends it the notification id", async () => {
      const notification: PlatformNotification = {
        message: 'test',
        severity: 'info',
        // The host passes this straight to Sonner without validating it against real command names,
        // so a stub literal suffices; the cast only satisfies the keyof CommandHandlers field type.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        dismissClickCommand: 'test.dismiss' as never,
      };

      const notificationId = await capturedService.send(notification);
      const options = mockToastInfo.mock.calls[0][1];
      await options?.onDismiss?.();

      expect(mockSendCommand).toHaveBeenCalledWith('test.dismiss', notificationId);
    });

    it('logs a warning instead of throwing when the dismiss command rejects', async () => {
      mockSendCommand.mockRejectedValueOnce(new Error('boom'));
      const notification: PlatformNotification = {
        message: 'test',
        severity: 'info',
        // The host passes this straight to Sonner without validating it against real command names,
        // so a stub literal suffices; the cast only satisfies the keyof CommandHandlers field type.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        dismissClickCommand: 'test.dismiss' as never,
      };

      await capturedService.send(notification);
      const options = mockToastInfo.mock.calls[0][1];

      // The catch handler must swallow the rejection - awaiting the returned promise must not throw.
      await expect(options?.onDismiss?.()).resolves.toBeUndefined();
      expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('boom'));
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

    it('updates instead of duplicating for the legal id 0 (does not treat it as absent)', async () => {
      mockToastInfo.mockReturnValueOnce('toast-0');
      const notification: PlatformNotification = {
        message: 'first',
        severity: 'info',
        notificationId: 0,
      };

      await capturedService.send(notification);
      await capturedService.send({ message: 'second', severity: 'info', notificationId: 0 });

      expect(mockToastInfo).toHaveBeenCalledTimes(2);
      // The second send must UPDATE (pass the mapped toast id), not create a fresh toast with id
      // undefined - which a truthiness test of `notificationId` would wrongly do for 0.
      expect(mockToastInfo).toHaveBeenNthCalledWith(
        2,
        'second',
        expect.objectContaining({ id: 'toast-0' }),
      );
    });

    it('gives an id-less send an id in its own namespace so a numeric caller id cannot collide', async () => {
      const autoId = await capturedService.send({ message: 'A', severity: 'info' });
      // The returned id is our own string handle, not Sonner's internal numeric auto-id.
      expect(typeof autoId).toBe('string');
      expect(autoId).not.toBe(1);

      // An unrelated caller using the numeric id 1 must get a brand-new toast, not an update of A.
      await capturedService.send({ message: 'B', severity: 'info', notificationId: 1 });

      expect(mockToastInfo).toHaveBeenCalledTimes(2);
      expect(mockToastInfo).toHaveBeenNthCalledWith(
        2,
        'B',
        expect.objectContaining({ id: undefined }),
      );
    });
  });

  describe('primary action command', () => {
    it('logs a warning instead of leaving an unhandled rejection when the primary command rejects', async () => {
      mockSendCommand.mockRejectedValueOnce(new Error('boom'));
      const notification: PlatformNotification = {
        message: 'test',
        severity: 'info',
        clickCommandLabel: 'Send/Receive now',
        // The host passes this straight to Sonner without validating it against real command names,
        // so a stub literal suffices; the cast only satisfies the keyof CommandHandlers field type.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        clickCommand: 'test.primary' as never,
      };

      await capturedService.send(notification);
      const options = mockToastInfo.mock.calls[0][1];

      // The primary action must have a .catch too (it historically did not) - awaiting must not throw.
      await expect(options?.action?.onClick()).resolves.toBeUndefined();
      expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('boom'));
    });
  });

  describe('onAutoClose', () => {
    it('runs the dismiss command and cleans up bookkeeping when the toast auto-closes', async () => {
      const notification: PlatformNotification = {
        message: 'test',
        severity: 'info',
        // The host passes this straight to Sonner without validating it against real command names,
        // so a stub literal suffices; the cast only satisfies the keyof CommandHandlers field type.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        dismissClickCommand: 'test.dismiss' as never,
      };

      const notificationId = await capturedService.send(notification);
      const options = mockToastInfo.mock.calls[0][1];
      // Timer expiry: Sonner fires onAutoClose (not onDismiss). It must run the same dismiss command.
      await options?.onAutoClose?.();

      expect(mockSendCommand).toHaveBeenCalledWith('test.dismiss', notificationId);

      // And the mapping is cleaned up, so a later dismiss() for that id is a no-op (no leak).
      await capturedService.dismiss(notificationId);
      expect(mockToast.dismiss).not.toHaveBeenCalled();
    });
  });
});
