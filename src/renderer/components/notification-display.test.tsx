import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { CommandHandlers } from 'papi-shared-types';
import type { ThemeDefinitionExpanded } from 'platform-bible-utils';
import type {
  INotificationService,
  PlatformNotification,
} from '@shared/models/notification.service-model';
import * as commandService from '@shared/services/command.service';
import { NotificationDisplay } from './notification-display';

/**
 * Make a `keyof CommandHandlers` value from a test-only command name. These tests only need a
 * command NAME to send/assert on - it never resolves to a real handler - so this single cast
 * satisfies the field type without repeating the assertion (and its eslint-disable) at every use
 * site.
 */
function commandStub(name: string): keyof CommandHandlers {
  // No real handler is ever registered for these names, so a cast is the only way to type them
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return name as keyof CommandHandlers;
}

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

// Theme type the CurrentTheme data hook reports to NotificationDisplay; tests flip this to 'dark'
// to pin the Toaster's theme wiring. The papi data hooks are stubbed wholesale because pulling the
// real ones into jsdom drags the whole data-provider network stack along with them.
let mockCurrentThemeType = 'light';
vi.mock('@renderer/hooks/papi-hooks', () => ({
  useDataProvider: vi.fn(),
  useData: vi.fn(() => ({
    CurrentTheme: (_selector: undefined, defaultValue: ThemeDefinitionExpanded) => [
      { ...defaultValue, type: mockCurrentThemeType, id: mockCurrentThemeType },
      vi.fn(),
      false,
    ],
  })),
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
    mockCurrentThemeType = 'light';
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
      secondaryClickCommand: commandStub('test.secondary'),
      // Left true (the default) deliberately: this is the exact "two working buttons" shape the
      // blocker was about - dismissible: false would render this same button inert.
    };

    const notificationId = await capturedService.send(notification);

    const cancelButton = await screen.findByRole('button', { name: 'Postpone' });
    fireEvent.click(cancelButton);

    expect(mockSendCommand).toHaveBeenCalledWith('test.secondary', notificationId);
  });

  // PT-4193 layout fix: live E2E screenshots showed toasts with buttons collapsing their message
  // down to a sliver - first a toast with BOTH an action and a cancel button, then (round-4 E2E)
  // a single-action break-lock toast. Sonner's default layout puts icon/content/cancel/action in a
  // single un-wrapped flex row, and non-shrinking buttons crush the content column.
  // notification-display.scss fixes this with a `:has()`-scoped stylesheet rule - engaging for ANY
  // toast with at least one button - keyed off the classNames wired up in notification-display.tsx.
  // jsdom doesn't compute actual flex-wrap layout, so these tests pin the DOM shape (classes +
  // shared flex-container ancestry) that stylesheet rule depends on, rather than pixel positions.
  it('gives a two-button toast the content/action/cancel class hooks the layout fix keys off, and keeps both buttons working', async () => {
    render(<NotificationDisplay />);

    const notification: PlatformNotification = {
      message: 'Time to sync',
      severity: 'info',
      clickCommandLabel: 'Send/Receive now',
      clickCommand: commandStub('test.primary'),
      secondaryClickCommandLabel: 'Postpone until 3:24 PM',
      secondaryClickCommand: commandStub('test.secondary'),
    };

    const notificationId = await capturedService.send(notification);

    const actionButton = await screen.findByRole('button', { name: 'Send/Receive now' });
    const cancelButton = await screen.findByRole('button', { name: 'Postpone until 3:24 PM' });
    const title = await screen.findByText('Time to sync');
    const content = title.closest('.notification-toast-content');
    const toastRoot = document.querySelector('.notification-toast');

    // The fix's CSS rule is
    // `.notification-toast:has(.notification-toast-cancel-button, .notification-toast-action-button)`
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

  // Round-4 E2E finding: the break-lock toast (one long warning + one wide "Break lock and retry"
  // action button, no cancel button) rendered text and button crammed side-by-side because the
  // original rule only engaged when BOTH buttons were present. The rule now engages for any
  // buttoned toast, so a single-action toast must present the same shape it keys off.
  it('gives a single-button (action-only) toast the content/action class hooks the layout fix keys off, and keeps the button working', async () => {
    render(<NotificationDisplay />);

    const notification: PlatformNotification = {
      message:
        'The project is locked on the server by another user. Breaking the lock may discard their unfinished send.',
      severity: 'warning',
      clickCommandLabel: 'Break lock and retry',
      clickCommand: commandStub('test.primary'),
    };

    const notificationId = await capturedService.send(notification);

    const actionButton = await screen.findByRole('button', { name: 'Break lock and retry' });
    const title = await screen.findByText(/locked on the server/);
    const content = title.closest('.notification-toast-content');
    const toastRoot = document.querySelector('.notification-toast');

    // Same structural pin as the two-button case: the `:has()` rule matches on either button class,
    // and content + action button must be direct siblings under the toast flex container for the
    // `flex-grow`/`order` reflow to put them on separate rows.
    expect(toastRoot).not.toBeNull();
    expect(content).not.toBeNull();
    expect(actionButton).toHaveClass('notification-toast-action-button');
    expect(content?.parentElement).toBe(toastRoot);
    expect(actionButton.parentElement).toBe(toastRoot);
    expect(document.querySelector('.notification-toast-cancel-button')).not.toBeInTheDocument();

    fireEvent.click(actionButton);

    expect(mockSendCommand).toHaveBeenCalledWith('test.primary', notificationId);
  });

  // PT-4193 press-collapse regression (found in external triage): Sonner flips the toast to
  // `data-swiping="true"` on pointerdown - ANY mouse button, on the toast body, BEFORE any movement
  // (its handler checks neither `event.button` nor movement, only that the target is not a BUTTON)
  // - and clears it again on pointerup. An earlier notification-display.scss revision gated the
  // button-row flex break out of that state, so merely holding the mouse down on a buttoned toast
  // collapsed it to a one-character-wide sliver until release. The break is now unconditional
  // (see the `::before` rule's comment); jsdom computes no CSS layout and exposes no
  // pseudo-elements, so the stylesheet side cannot be asserted here. What this test pins is the DOM
  // contract that fix rests on: a plain press really does enter Sonner's swiping state (if a Sonner
  // upgrade stops doing that, the scss comment needs revisiting), and the class/sibling hooks the
  // layout rules key off remain in place throughout the press.
  it('enters Sonner swiping state on a plain press and keeps the layout-fix hooks throughout', async () => {
    render(<NotificationDisplay />);

    const notification: PlatformNotification = {
      message: 'Time to sync',
      severity: 'info',
      clickCommandLabel: 'Send/Receive now',
      clickCommand: commandStub('test.primary'),
      secondaryClickCommandLabel: 'Postpone until 3:24 PM',
      secondaryClickCommand: commandStub('test.secondary'),
    };

    await capturedService.send(notification);

    const title = await screen.findByText('Time to sync');
    const toastRoot = document.querySelector('.notification-toast');
    expect(toastRoot).toHaveAttribute('data-swiping', 'false');

    // Sonner's pointerdown handler pointer-captures the target; jsdom does not implement pointer
    // capture, so stub it (same category of jsdom gap as the matchMedia stub above).
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const titleElement = title as HTMLElement & {
      setPointerCapture: (pointerId: number) => void;
    };
    titleElement.setPointerCapture = vi.fn();

    // Left-button press on the toast body (the title div, not a button), no movement.
    fireEvent.pointerDown(title, { pointerId: 1, button: 0 });
    expect(toastRoot).toHaveAttribute('data-swiping', 'true');
    // Mid-press, the hooks the two-row layout keys off must all still be present and siblings.
    const content = title.closest('.notification-toast-content');
    const actionButton = screen.getByRole('button', { name: 'Send/Receive now' });
    const cancelButton = screen.getByRole('button', { name: 'Postpone until 3:24 PM' });
    expect(content?.parentElement).toBe(toastRoot);
    expect(actionButton.parentElement).toBe(toastRoot);
    expect(cancelButton.parentElement).toBe(toastRoot);

    fireEvent.pointerUp(title, { pointerId: 1, button: 0 });
    expect(toastRoot).toHaveAttribute('data-swiping', 'false');

    // Right-button press behaves identically (the live bug reproduced with either button).
    fireEvent.pointerDown(title, { pointerId: 1, button: 2 });
    expect(toastRoot).toHaveAttribute('data-swiping', 'true');
    fireEvent.pointerUp(title, { pointerId: 1, button: 2 });
    expect(toastRoot).toHaveAttribute('data-swiping', 'false');
  });

  it('does not add the action-button hook to a single-button (cancel-only) toast', async () => {
    render(<NotificationDisplay />);

    const notification: PlatformNotification = {
      message: 'A decision is needed',
      severity: 'info',
      secondaryClickCommandLabel: 'Postpone',
      secondaryClickCommand: commandStub('test.secondary'),
    };

    await capturedService.send(notification);

    const cancelButton = await screen.findByRole('button', { name: 'Postpone' });
    // A cancel-only toast now gets the two-row layout too (the `:has()` rule matches either button
    // class), but it must do so with ONLY the cancel hook present - a spurious action button here
    // would both render a button nobody asked for and trip the pair-only margin override.
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

  // PT-4193 (PR #2561): the Toaster follows the app theme from the theme service. Sonner's own
  // default is a fixed light theme, which left dark-themed apps with white toasts - and made the
  // shadcn-token-styled secondary button (which reads the app-level `--secondary` variables) flip
  // to dark-theme colors on a still-white toast, collapsing the primary/secondary hierarchy.
  it('themes the toaster to match the current app theme', async () => {
    mockCurrentThemeType = 'dark';
    render(<NotificationDisplay />);

    await capturedService.send({ message: 'Dark toast', severity: 'info' });
    await screen.findByText('Dark toast');

    expect(document.querySelector('[data-sonner-toaster]')).toHaveAttribute('data-theme', 'dark');
  });

  it('falls back to the light look for a theme type Sonner does not understand', async () => {
    mockCurrentThemeType = 'paratext-classic';
    render(<NotificationDisplay />);

    await capturedService.send({ message: 'Custom-theme toast', severity: 'info' });
    await screen.findByText('Custom-theme toast');

    expect(document.querySelector('[data-sonner-toaster]')).toHaveAttribute('data-theme', 'light');
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
        // Let the handler's queued macrotask (which does the actual focus move) run.
        await new Promise((resolve) => {
          setTimeout(resolve, 0);
        });
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
