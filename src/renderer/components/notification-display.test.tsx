import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
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
  logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn(), debug: vi.fn() },
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

  // PT-4193 layout fix: a live E2E screenshot showed a toast with BOTH an action and a cancel
  // button collapsing its message down to a ~1-character-wide sliver - Sonner's default layout
  // puts icon/content/cancel/action in a single un-wrapped flex row, and two non-shrinking buttons
  // crush the content column. notification-display.scss fixes this with a `:has()`-scoped stylesheet
  // rule keyed off the classNames wired up in notification-display.tsx. jsdom doesn't compute actual
  // flex-wrap layout, so these tests pin the DOM shape (classes + shared flex-container ancestry)
  // that stylesheet rule depends on, rather than pixel positions.
  it('gives a two-button toast the content/action/cancel class hooks the layout fix keys off, and keeps both buttons working', async () => {
    render(<NotificationDisplay />);

    const notification: PlatformNotification = {
      message: 'Time to sync',
      severity: 'info',
      clickCommandLabel: 'Send/Receive now',
      // The test only needs a command NAME to send/assert on; it never resolves to a real handler.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      clickCommand: 'test.primary' as never,
      secondaryClickCommandLabel: 'Postpone until 3:24 PM',
      // The test only needs a command NAME to send/assert on; it never resolves to a real handler.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      secondaryClickCommand: 'test.secondary' as never,
    };

    const notificationId = await capturedService.send(notification);

    const actionButton = await screen.findByRole('button', { name: 'Send/Receive now' });
    const cancelButton = await screen.findByRole('button', { name: 'Postpone until 3:24 PM' });
    const title = await screen.findByText('Time to sync');
    const content = title.closest('.notification-toast-content');
    const toastRoot = document.querySelector('.notification-toast');

    // The fix's CSS rule is
    // `.notification-toast:has(.notification-toast-cancel-button):has(.notification-toast-action-button)`
    // - assert that shape exists: one shared flex-container ancestor directly containing the
    // content, the action button, and the cancel button as siblings (not nested inside each other),
    // which is what lets `flex-grow` on the content and `order` on the buttons rearrange them into
    // separate rows.
    expect(toastRoot).not.toBeNull();
    expect(content).not.toBeNull();
    expect(actionButton).toHaveClass('notification-toast-action-button');
    expect(cancelButton).toHaveClass('notification-toast-cancel-button');
    expect(content?.parentElement).toBe(toastRoot);
    expect(actionButton.parentElement).toBe(toastRoot);
    expect(cancelButton.parentElement).toBe(toastRoot);

    fireEvent.click(actionButton);
    fireEvent.click(cancelButton);

    expect(mockSendCommand).toHaveBeenCalledWith('test.primary', notificationId);
    expect(mockSendCommand).toHaveBeenCalledWith('test.secondary', notificationId);
  });

  it('does not add the action-button hook to a single-button (cancel-only) toast', async () => {
    render(<NotificationDisplay />);

    const notification: PlatformNotification = {
      message: 'A decision is needed',
      severity: 'info',
      secondaryClickCommandLabel: 'Postpone',
      // The test only needs a command NAME to send/assert on; it never resolves to a real handler.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      secondaryClickCommand: 'test.secondary' as never,
    };

    await capturedService.send(notification);

    const cancelButton = await screen.findByRole('button', { name: 'Postpone' });
    // The layout fix only engages when BOTH button classes are present under the same toast (see
    // the `:has()...:has()` rule in notification-display.scss). A single-button toast must not
    // accidentally satisfy that condition, so the content keeps its plain, un-grown structure.
    expect(cancelButton).toHaveClass('notification-toast-cancel-button');
    expect(document.querySelector('.notification-toast-action-button')).not.toBeInTheDocument();
  });

  it('renders a plain string toast with the content hook and no button hooks', async () => {
    render(<NotificationDisplay />);

    const notification: PlatformNotification = {
      message: 'Just an update',
      severity: 'info',
    };

    await capturedService.send(notification);

    const title = await screen.findByText('Just an update');
    expect(title.closest('.notification-toast-content')).not.toBeNull();
    expect(document.querySelector('.notification-toast-cancel-button')).not.toBeInTheDocument();
    expect(document.querySelector('.notification-toast-action-button')).not.toBeInTheDocument();
  });

  // PT-4193 (review C61-2): a per-toast `position` makes Sonner render one <ol data-sonner-toaster>
  // per distinct position, all sharing a single ref, so Sonner's own Alt+T hotkey only ever focuses
  // the last list. NotificationDisplay layers a focus-cycling handler on top so repeated Alt+T
  // reaches every list. (This pins that both lists become the active element across presses; jsdom
  // does not model Sonner's real-browser per-<ol> focus-trap, so the blur-reset guarding that is
  // manually verified - see the PR notes.)
  it('cycles keyboard focus across every toast position list on the Alt+T hotkey', async () => {
    render(<NotificationDisplay />);

    // One default-position (bottom-right) toast and one top-center toast => two separate <ol> lists.
    await capturedService.send({ message: 'Bottom toast', severity: 'info' });
    await capturedService.send({ message: 'Top toast', severity: 'info', position: 'top-center' });
    await screen.findByText('Bottom toast');
    await screen.findByText('Top toast');

    const lists = Array.from(document.querySelectorAll<HTMLElement>('[data-sonner-toaster]'));
    expect(lists).toHaveLength(2);

    async function pressHotkey() {
      await act(async () => {
        document.dispatchEvent(
          new KeyboardEvent('keydown', { altKey: true, code: 'KeyT', bubbles: true }),
        );
        // Let the handler's queued microtask (which does the actual focus move) run.
        await Promise.resolve();
      });
      return document.activeElement;
    }

    const firstFocused = await pressHotkey();
    const secondFocused = await pressHotkey();

    // Each press lands on one of the two lists, and the two presses reach different lists - so no
    // position group is left keyboard-unreachable.
    expect(lists).toContain(firstFocused);
    expect(lists).toContain(secondFocused);
    expect(firstFocused).not.toBe(secondFocused);
  });
});
