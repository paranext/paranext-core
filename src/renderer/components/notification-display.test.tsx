import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import type {
  INotificationService,
  PlatformNotification,
} from '@shared/models/notification.service-model';
import * as commandService from '@shared/services/command.service';
import { NotificationDisplay } from './notification-display';

// This is the ONE render-level test in the notification suite that uses REAL Sonner instead of
// mocking it (every other notification.service-host.test.ts case mocks 'sonner' wholesale, which is
// exactly why the cancel-slot-button-is-dead-when-dismissible-is-false blocker slipped through
// review undetected - see PT-4193's "Review fix" PR notes). Rendering the real Toaster and clicking
// the real DOM button pins the actual Sonner contract instead of just the shape we hand it.
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

const mockSendCommand = vi.mocked(commandService.sendCommand);

// jsdom does not implement `window.matchMedia`; Sonner's Toaster calls it directly (unrelated to
// this app's own theme service) to pick its light/dark default. Precedent:
// share-layout.dialog.test.tsx hits the same gap for a different matchMedia caller.
function stubMatchMedia() {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: undefined,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe('NotificationDisplay with real Sonner', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    mockSendCommand.mockResolvedValue(undefined);
    stubMatchMedia();
    const { startNotificationService } = await import(
      '@renderer/services/notification.service-host'
    );
    await startNotificationService();
  });

  it('sends the secondary command when the user clicks the rendered cancel-slot button', async () => {
    render(<NotificationDisplay />);

    const notification: PlatformNotification = {
      message: 'A decision is needed',
      severity: 'info',
      secondaryClickCommandLabel: 'Postpone',
      // The test only needs a command NAME to send/assert on; it never resolves to a real handler.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      secondaryClickCommand: 'test.secondary' as never,
      // Left true (the default) deliberately: this is the exact "two working buttons" shape the
      // blocker was about - dismissible: false would render this same button inert.
    };

    const notificationId = await capturedService.send(notification);

    const cancelButton = await screen.findByRole('button', { name: 'Postpone' });
    fireEvent.click(cancelButton);

    expect(mockSendCommand).toHaveBeenCalledWith('test.secondary', notificationId);
  });
});
