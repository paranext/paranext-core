import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { sendCommand } from '@shared/services/command.service';
import { logger } from '@shared/services/logger.service';
import {
  getExtensionHostNotice,
  markExtensionHostRestarted,
  markExtensionHostRestarting,
  reportExtensionHostStopped,
  resetExtensionHostNotice,
} from '@renderer/services/extension-host-stopped-store';
import {
  reportConnectionLost,
  resetConnectionLost,
} from '@renderer/services/connection-lost-store';
import { BELOW_TOOLBAR_STRIP_HEIGHT_CSS_VARIABLE } from '@renderer/components/toolbar-height.util';
import {
  ENGLISH_FALLBACKS,
  EXTENSION_HOST_STOPPED_DISMISS_KEY,
  EXTENSION_HOST_STOPPED_MESSAGE_CRASHED_KEY,
  EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY,
  EXTENSION_HOST_STOPPED_RESTART_APP_KEY,
  EXTENSION_HOST_STOPPED_RESTART_EXTENSIONS_KEY,
  EXTENSION_HOST_STOPPED_RESTART_UNCONFIRMED_TITLE_KEY,
  EXTENSION_HOST_STOPPED_RESTARTED_MESSAGE_KEY,
  EXTENSION_HOST_STOPPED_RESTARTED_TITLE_KEY,
  EXTENSION_HOST_STOPPED_RESTARTING_KEY,
  EXTENSION_HOST_STOPPED_TITLE_KEY,
  ExtensionHostStoppedBanner,
  LOCALIZED_STRING_KEYS,
  PRODUCT_NAME_KEY,
  RESTART_READY_FALLBACK_MS,
} from './extension-host-stopped-banner.component';

vi.mock('@renderer/hooks/papi-hooks', () => ({ useLocalizedStrings: vi.fn() }));
vi.mock('@shared/services/command.service', () => ({ sendCommand: vi.fn() }));
vi.mock('@shared/services/logger.service', () => ({
  logger: { error: vi.fn(), warn: vi.fn(), info: vi.fn() },
}));

/**
 * Records every observed element and calls back only when the test says so, so a test can play the
 * browser's part in measuring the strip.
 */
class FakeResizeObserver implements ResizeObserver {
  static instances: FakeResizeObserver[] = [];

  targets: Element[] = [];

  constructor(private readonly callback: ResizeObserverCallback) {
    FakeResizeObserver.instances.push(this);
  }

  observe(target: Element) {
    this.targets.push(target);
  }

  unobserve(target: Element) {
    this.targets = this.targets.filter((observed) => observed !== target);
  }

  disconnect() {
    this.targets = [];
  }

  /** Reports a resize of every element this observer still watches. */
  resize() {
    // The callback reads the element itself, not the entries, so empty entries are enough here.
    this.callback([], this);
  }
}

/** Gives `element` a laid-out height, as the browser would, and reports the resize. */
function layOut(element: HTMLElement, height: number) {
  Object.defineProperty(element, 'offsetHeight', { configurable: true, value: height });
  act(() =>
    FakeResizeObserver.instances
      .filter((observer) => observer.targets.includes(element))
      .forEach((observer) => observer.resize()),
  );
}

/** The English title as the user reads it, with the English product name filled in. */
const ENGLISH_TITLE = 'A Platform.Bible service on this computer has stopped working';

/** What `useLocalizedStrings` returns while loading: the raw keys themselves. */
const UNRESOLVED = Object.fromEntries(LOCALIZED_STRING_KEYS.map((key) => [key, key]));

const RESTART_EXTENSIONS = {
  name: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTART_EXTENSIONS_KEY],
};
const RESTART_APP = { name: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTART_APP_KEY] };
const DISMISS = { name: ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_DISMISS_KEY] };

/** Resolves or rejects the restart command only when the test says so. */
function deferredRestart() {
  let settle: () => void = () => {};
  let fail: (error: Error) => void = () => {};
  const promise = new Promise<void>((resolve, reject) => {
    settle = resolve;
    fail = reject;
  });
  vi.mocked(sendCommand).mockReturnValue(promise);
  return { resolve: settle, reject: fail };
}

function stop(reason: 'lost-connection' | 'crashed') {
  act(() => reportExtensionHostStopped({ reason }));
}

/** What the listener does when `platform.onDidStartExtensionHost` arrives. */
function extensionHostStarts() {
  act(() => markExtensionHostRestarted());
}

describe('ExtensionHostStoppedBanner', () => {
  const originalResizeObserver = globalThis.ResizeObserver;

  beforeAll(() => {
    globalThis.ResizeObserver = FakeResizeObserver;
  });

  afterAll(() => {
    globalThis.ResizeObserver = originalResizeObserver;
  });

  beforeEach(() => {
    FakeResizeObserver.instances = [];
    resetExtensionHostNotice();
    resetConnectionLost();
    vi.mocked(sendCommand).mockReset();
    vi.mocked(logger.error).mockClear();
    vi.mocked(useLocalizedStrings).mockReturnValue([UNRESOLVED, false]);
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('keeps an empty live region mounted while the extension host is running', () => {
    render(<ExtensionHostStoppedBanner />);
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  it('shows the lost-connection wording in English when localization has not resolved', () => {
    render(<ExtensionHostStoppedBanner />);
    stop('lost-connection');

    const banner = screen.getByRole('status');
    expect(banner).toHaveTextContent(ENGLISH_TITLE);
    expect(banner).toHaveTextContent(
      ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY],
    );
    expect(screen.getByRole('button', RESTART_EXTENSIONS)).toBeInTheDocument();
    expect(screen.getByRole('button', RESTART_APP)).toBeInTheDocument();
    expect(screen.queryByRole('button', DISMISS)).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows English for a value that is another unresolved key or only whitespace', () => {
    vi.mocked(useLocalizedStrings).mockReturnValue([
      {
        ...UNRESOLVED,
        [EXTENSION_HOST_STOPPED_TITLE_KEY]: '%some_other_key%',
        [EXTENSION_HOST_STOPPED_MESSAGE_CRASHED_KEY]: '   ',
      },
      false,
    ]);
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');

    const banner = screen.getByRole('status');
    expect(banner).toHaveTextContent(ENGLISH_TITLE);
    expect(banner).toHaveTextContent(ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_MESSAGE_CRASHED_KEY]);
    expect(banner).not.toHaveTextContent('%some_other_key%');
  });

  it('shows the crashed wording for a crash', () => {
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');

    expect(screen.getByRole('status')).toHaveTextContent(
      ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_MESSAGE_CRASHED_KEY],
    );
  });

  it('prefers resolved translations over the English fallbacks', () => {
    vi.mocked(useLocalizedStrings).mockReturnValue([
      {
        ...UNRESOLVED,
        [EXTENSION_HOST_STOPPED_MESSAGE_CRASHED_KEY]: 'Se detuvo de forma inesperada.',
      },
      false,
    ]);
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');

    expect(screen.getByRole('status')).toHaveTextContent('Se detuvo de forma inesperada.');
  });

  // The title names the product, which differs between builds, so it comes from localization like
  // every other product-named string.
  it('puts the resolved product name into the title, never the placeholder', () => {
    vi.mocked(useLocalizedStrings).mockReturnValue([
      {
        ...UNRESOLVED,
        [EXTENSION_HOST_STOPPED_TITLE_KEY]:
          'Un servicio de {productName} en este equipo ha dejado de funcionar',
        [PRODUCT_NAME_KEY]: 'Paratext 10',
      },
      false,
    ]);
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');

    const banner = screen.getByRole('status');
    expect(banner).toHaveTextContent(
      'Un servicio de Paratext 10 en este equipo ha dejado de funcionar',
    );
    expect(banner).not.toHaveTextContent('{productName}');
  });

  it('puts the English product name into the English title when nothing has resolved', () => {
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');

    const banner = screen.getByRole('status');
    expect(banner).toHaveTextContent(
      'A Platform.Bible service on this computer has stopped working',
    );
    expect(banner).not.toHaveTextContent('{productName}');
  });

  it('sends the restart command and stays in the restarting state after the command settles', async () => {
    const restart = deferredRestart();
    render(<ExtensionHostStoppedBanner />);
    stop('lost-connection');

    await userEvent.click(screen.getByRole('button', RESTART_EXTENSIONS));

    expect(sendCommand).toHaveBeenCalledWith('platform.restartExtensionHost');
    expect(getExtensionHostNotice()).toEqual({ phase: 'restarting', reason: 'lost-connection' });
    expect(screen.getByRole('status')).toHaveTextContent(
      ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTARTING_KEY],
    );
    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByRole('button', RESTART_EXTENSIONS)).toBeDisabled();
    // An app restart is always safe, and the way out if the new extension host never comes up.
    expect(screen.getByRole('button', RESTART_APP)).toBeEnabled();

    // The command settles at fork time; the new process is not up yet, so nothing changes.
    await act(async () => restart.resolve());
    expect(getExtensionHostNotice()).toEqual({ phase: 'restarting', reason: 'lost-connection' });
    expect(screen.getAllByRole('button')).toHaveLength(2);
    expect(screen.getByRole('button', RESTART_EXTENSIONS)).toBeDisabled();
    expect(screen.getByRole('button', RESTART_APP)).toBeEnabled();
  });

  it('restarts the app from the restarting state', async () => {
    deferredRestart();
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');
    await userEvent.click(screen.getByRole('button', RESTART_EXTENSIONS));

    await userEvent.click(screen.getByRole('button', RESTART_APP));

    expect(sendCommand).toHaveBeenLastCalledWith('platform.restart');
  });

  it('moves to the restarted state when the extension host announces it started', async () => {
    vi.mocked(sendCommand).mockResolvedValue(undefined);
    render(<ExtensionHostStoppedBanner />);
    stop('lost-connection');
    await userEvent.click(screen.getByRole('button', RESTART_EXTENSIONS));

    extensionHostStarts();

    await waitFor(() =>
      expect(screen.getByRole('status')).toHaveTextContent(
        ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTARTED_TITLE_KEY],
      ),
    );
    expect(screen.getByRole('status')).not.toHaveTextContent(
      ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTART_UNCONFIRMED_TITLE_KEY],
    );
    expect(getExtensionHostNotice()).toEqual({ phase: 'restarted', isConfirmed: true });
    expect(screen.getByRole('button', RESTART_APP)).toBeEnabled();
    expect(screen.getByRole('button', DISMISS)).toBeEnabled();
    expect(screen.queryByRole('button', RESTART_EXTENSIONS)).not.toBeInTheDocument();
  });

  it('falls back to an unconfirmed restarted state after the timeout if no start announcement comes', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.mocked(sendCommand).mockResolvedValue(undefined);
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');
    await userEvent.click(screen.getByRole('button', RESTART_EXTENSIONS));
    expect(getExtensionHostNotice()).toEqual({ phase: 'restarting', reason: 'crashed' });

    await act(async () => {
      vi.advanceTimersByTime(RESTART_READY_FALLBACK_MS);
    });

    expect(getExtensionHostNotice()).toEqual({ phase: 'restarted', isConfirmed: false });
    const banner = screen.getByRole('status');
    expect(banner).toHaveTextContent(
      ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTART_UNCONFIRMED_TITLE_KEY],
    );
    expect(banner).toHaveTextContent(
      ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTARTED_MESSAGE_KEY],
    );
    expect(banner).not.toHaveTextContent(
      ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTARTED_TITLE_KEY],
    );
    expect(screen.getByRole('button', RESTART_APP)).toBeEnabled();
    expect(screen.getByRole('button', DISMISS)).toBeEnabled();
    expect(screen.queryByRole('button', RESTART_EXTENSIONS)).not.toBeInTheDocument();
  });

  it('a stop while restarting brings the alarm back, and the fallback timer no longer fires', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.mocked(sendCommand).mockResolvedValue(undefined);
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');
    await userEvent.click(screen.getByRole('button', RESTART_EXTENSIONS));
    expect(getExtensionHostNotice()).toEqual({ phase: 'restarting', reason: 'crashed' });

    stop('lost-connection');

    expect(screen.getByRole('status')).toHaveTextContent(
      ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY],
    );
    expect(screen.getByRole('button', RESTART_EXTENSIONS)).toBeEnabled();
    expect(screen.getByRole('button', RESTART_APP)).toBeEnabled();

    await act(async () => {
      vi.advanceTimersByTime(RESTART_READY_FALLBACK_MS);
    });

    expect(getExtensionHostNotice()).toEqual({ phase: 'stopped', reason: 'lost-connection' });
    expect(screen.getByRole('button', RESTART_EXTENSIONS)).toBeEnabled();
  });

  it('disarms the fallback timer when the phase leaves restarting', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    const restart = deferredRestart();
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');
    await userEvent.click(screen.getByRole('button', RESTART_EXTENSIONS));
    await act(async () => restart.reject(new Error('main did not answer')));
    expect(getExtensionHostNotice()).toEqual({ phase: 'stopped', reason: 'crashed' });
    await act(async () => {
      vi.advanceTimersByTime(89_000);
    });

    vi.mocked(sendCommand).mockResolvedValue(undefined);
    await userEvent.click(screen.getByRole('button', RESTART_EXTENSIONS));
    await act(async () => {
      vi.advanceTimersByTime(5_000);
    });

    expect(getExtensionHostNotice()).toEqual({ phase: 'restarting', reason: 'crashed' });
  });

  it('dismiss clears the restarted state', async () => {
    vi.mocked(sendCommand).mockResolvedValue(undefined);
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');
    await userEvent.click(screen.getByRole('button', RESTART_EXTENSIONS));
    extensionHostStarts();
    await waitFor(() => expect(screen.getByRole('button', DISMISS)).toBeInTheDocument());

    await userEvent.click(screen.getByRole('button', DISMISS));

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(getExtensionHostNotice()).toBeUndefined();
  });

  it('a new stop after a restart brings the alarm back', async () => {
    vi.mocked(sendCommand).mockResolvedValue(undefined);
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');
    await userEvent.click(screen.getByRole('button', RESTART_EXTENSIONS));
    extensionHostStarts();
    await waitFor(() => expect(screen.getByRole('button', DISMISS)).toBeInTheDocument());

    stop('lost-connection');

    expect(screen.getByRole('status')).toHaveTextContent(
      ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY],
    );
    expect(screen.getByRole('button', RESTART_EXTENSIONS)).toBeEnabled();
  });

  it('reverts to the alarm, with both buttons enabled, when the restart command rejects', async () => {
    const restart = deferredRestart();
    render(<ExtensionHostStoppedBanner />);
    stop('lost-connection');
    await userEvent.click(screen.getByRole('button', RESTART_EXTENSIONS));

    await act(async () => restart.reject(new Error('main did not answer')));

    await waitFor(() => expect(screen.getAllByRole('button')).toHaveLength(2));
    screen.getAllByRole('button').forEach((button) => expect(button).toBeEnabled());
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('status')).toHaveTextContent(
      ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_MESSAGE_LOST_CONNECTION_KEY],
    );
    expect(getExtensionHostNotice()).toEqual({ phase: 'stopped', reason: 'lost-connection' });
  });

  it('restarts the app from the second button', async () => {
    vi.mocked(sendCommand).mockResolvedValue(undefined);
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');

    await userEvent.click(screen.getByRole('button', RESTART_APP));

    expect(sendCommand).toHaveBeenCalledWith('platform.restart');
  });

  it('logs and leaves the banner unchanged when restarting the app fails', async () => {
    vi.mocked(sendCommand).mockRejectedValue(new Error('main did not answer'));
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');

    await userEvent.click(screen.getByRole('button', RESTART_APP));

    await waitFor(() => expect(logger.error).toHaveBeenCalledTimes(1));
    expect(getExtensionHostNotice()).toEqual({ phase: 'stopped', reason: 'crashed' });
    expect(screen.getByRole('button', RESTART_EXTENSIONS)).toBeEnabled();
  });

  it('moves a stopped banner to restarted when another window restarts the extension host', () => {
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');

    extensionHostStarts();

    expect(screen.getByRole('status')).toHaveTextContent(
      ENGLISH_FALLBACKS[EXTENSION_HOST_STOPPED_RESTARTED_TITLE_KEY],
    );
  });

  it('keeps an empty live region mounted while the connection is lost', () => {
    render(<ExtensionHostStoppedBanner />);
    stop('crashed');
    act(() => reportConnectionLost());

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  // A live region inserted together with its content is generally not announced, so the region
  // itself must survive every change of what it says.
  it('keeps one live region, the same DOM node, before a stop, during it and after dismiss', async () => {
    vi.mocked(sendCommand).mockResolvedValue(undefined);
    render(<ExtensionHostStoppedBanner />);
    const region = screen.getByRole('status');

    stop('crashed');
    expect(screen.getByRole('status')).toBe(region);

    extensionHostStarts();
    await userEvent.click(screen.getByRole('button', DISMISS));
    expect(screen.getByRole('status')).toBe(region);
    expect(region).toBeEmptyDOMElement();
  });

  describe('dock clearance', () => {
    it('publishes its measured height so the dock below it moves down', () => {
      render(<ExtensionHostStoppedBanner />);
      stop('crashed');

      layOut(screen.getByRole('status'), 72);

      expect(
        document.documentElement.style.getPropertyValue(BELOW_TOOLBAR_STRIP_HEIGHT_CSS_VARIABLE),
      ).toBe('72px');
    });

    it('publishes a zero height once there is nothing to show', async () => {
      vi.mocked(sendCommand).mockResolvedValue(undefined);
      render(<ExtensionHostStoppedBanner />);
      stop('crashed');
      layOut(screen.getByRole('status'), 72);
      extensionHostStarts();

      await userEvent.click(screen.getByRole('button', DISMISS));
      layOut(screen.getByRole('status'), 0);

      expect(
        document.documentElement.style.getPropertyValue(BELOW_TOOLBAR_STRIP_HEIGHT_CSS_VARIABLE),
      ).toBe('0px');
    });

    it('removes the height when it unmounts', () => {
      const { unmount } = render(<ExtensionHostStoppedBanner />);
      stop('crashed');
      layOut(screen.getByRole('status'), 72);

      unmount();

      expect(
        document.documentElement.style.getPropertyValue(BELOW_TOOLBAR_STRIP_HEIGHT_CSS_VARIABLE),
      ).toBe('');
    });
  });

  describe('keyboard focus across phase changes', () => {
    it('moves focus to the strip when the focused button is disabled', async () => {
      deferredRestart();
      render(<ExtensionHostStoppedBanner />);
      stop('crashed');
      act(() => screen.getByRole('button', RESTART_EXTENSIONS).focus());

      await userEvent.keyboard('{Enter}');

      expect(screen.getByRole('button', RESTART_EXTENSIONS)).toBeDisabled();
      expect(screen.getByRole('status')).toHaveFocus();
    });

    it('moves focus to the strip when the focused button is removed', () => {
      render(<ExtensionHostStoppedBanner />);
      stop('crashed');
      act(() => screen.getByRole('button', RESTART_EXTENSIONS).focus());

      extensionHostStarts();

      expect(screen.queryByRole('button', RESTART_EXTENSIONS)).not.toBeInTheDocument();
      expect(screen.getByRole('status')).toHaveFocus();
    });

    it('leaves focus on a button that stays usable', () => {
      render(<ExtensionHostStoppedBanner />);
      stop('crashed');
      const restartApp = screen.getByRole('button', RESTART_APP);
      act(() => restartApp.focus());

      act(() => markExtensionHostRestarting());

      expect(restartApp).toHaveFocus();
    });

    it('does not take focus that was never inside the strip', () => {
      render(
        <>
          <button type="button">Elsewhere</button>
          <ExtensionHostStoppedBanner />
        </>,
      );
      stop('crashed');
      const elsewhere = screen.getByRole('button', { name: 'Elsewhere' });
      act(() => elsewhere.focus());
      act(() => elsewhere.blur());

      extensionHostStarts();

      expect(document.body).toHaveFocus();
    });

    // A browser can blur a button the moment it becomes disabled, before React's effect sees the
    // phase change; that blur is the banner's own doing, not the user leaving the strip.
    it('still rescues focus when the browser blurs a button as it becomes disabled', () => {
      render(<ExtensionHostStoppedBanner />);
      stop('crashed');
      const restartExtensions = screen.getByRole('button', RESTART_EXTENSIONS);
      act(() => restartExtensions.focus());

      // The browser's side of a disabling: the button is disabled and loses focus with nowhere
      // particular to go, ahead of the phase change that React then renders.
      restartExtensions.setAttribute('disabled', '');
      fireEvent.blur(restartExtensions);
      act(() => markExtensionHostRestarting());

      expect(screen.getByRole('status')).toHaveFocus();
    });

    // Switching to another app blurs the focused button too, but the user did not leave the strip.
    it('still rescues focus after the window itself lost focus', () => {
      const hasFocus = vi.spyOn(document, 'hasFocus');
      render(<ExtensionHostStoppedBanner />);
      stop('crashed');
      act(() => screen.getByRole('button', RESTART_EXTENSIONS).focus());

      hasFocus.mockReturnValue(false);
      act(() => screen.getByRole('button', RESTART_EXTENSIONS).blur());
      hasFocus.mockRestore();
      extensionHostStarts();

      expect(screen.getByRole('status')).toHaveFocus();
    });

    it('does not pull focus back after the user clicked away from the strip onto the page', async () => {
      // A window the user just clicked in has focus. jsdom says otherwise as soon as focus drops to
      // the body, so play the browser's part.
      vi.spyOn(document, 'hasFocus').mockReturnValue(true);
      render(<ExtensionHostStoppedBanner />);
      stop('crashed');
      act(() => screen.getByRole('button', RESTART_EXTENSIONS).focus());

      await userEvent.click(document.body);
      expect(document.body).toHaveFocus();
      extensionHostStarts();

      expect(document.body).toHaveFocus();
    });
  });

  describe('button emphasis', () => {
    it('makes Restart service the primary action while the service is down', () => {
      render(<ExtensionHostStoppedBanner />);
      stop('crashed');

      expect(screen.getByRole('button', RESTART_EXTENSIONS)).toHaveAttribute(
        'data-variant',
        'default',
      );
      expect(screen.getByRole('button', RESTART_APP)).toHaveAttribute('data-variant', 'outline');
    });

    it('keeps Restart app and Dismiss secondary once extensions are back', () => {
      render(<ExtensionHostStoppedBanner />);
      stop('crashed');
      extensionHostStarts();

      expect(screen.getByRole('button', RESTART_APP)).toHaveAttribute('data-variant', 'outline');
      expect(screen.getByRole('button', DISMISS)).toHaveAttribute('data-variant', 'ghost');
    });
  });
});
