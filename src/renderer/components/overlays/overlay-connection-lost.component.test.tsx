import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { onDidLoseConnection } from '@shared/services/network.service';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import {
  initConnectionLostStore,
  resetConnectionLost,
} from '@renderer/services/connection-lost-store';
import {
  CONNECTION_LOST_RELOAD_KEY,
  CONNECTION_LOST_TITLE_KEY,
  ConnectionLostOverlay,
  ConnectionLostOverlayPresentational,
  ENGLISH_FALLBACKS,
} from './overlay-connection-lost.component';

/** What the localization service returns once it has answered over a live connection. */
const RESOLVED_STRINGS = {
  '%overlay_connectionLostTitle%': 'Connection lost.',
  '%overlay_connectionLost%': "Platform.Bible can't reach its background services.",
  '%overlay_connectionLostReload%': 'Reload',
};

/**
 * What `useLocalizedStrings` returns while loading and on any error: `defaultState`, whose values
 * are the raw keys themselves.
 */
const UNRESOLVED_STRINGS = {
  '%overlay_connectionLostTitle%': '%overlay_connectionLostTitle%',
  '%overlay_connectionLost%': '%overlay_connectionLost%',
  '%overlay_connectionLostReload%': '%overlay_connectionLostReload%',
};

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(),
}));

vi.mock('@renderer/hooks/use-is-power-mode.hook', () => ({
  useIsPowerMode: vi.fn(() => true),
}));

vi.mock('@shared/services/network.service', () => ({
  onDidLoseConnection: vi.fn(() => () => true),
}));

/** Flips the store to lost, the way a real disconnect would. */
function loseConnection() {
  const subscribe = vi.mocked(onDidLoseConnection);
  const teardown = initConnectionLostStore();
  const callback = subscribe.mock.calls[subscribe.mock.calls.length - 1][0];
  callback(undefined);
  return teardown;
}

const PROPS = {
  title: 'Connection lost.',
  message: "Platform.Bible can't reach its background services.",
  reloadLabel: 'Reload',
  isPowerMode: true,
  onReload: () => {},
};

describe('ConnectionLostOverlayPresentational', () => {
  it('states the problem in an assertive alert dialog', () => {
    render(<ConnectionLostOverlayPresentational {...PROPS} />);
    const alert = screen.getByRole('alertdialog');
    expect(alert).toHaveTextContent('Connection lost.');
    expect(alert).toHaveTextContent("Platform.Bible can't reach its background services.");
  });

  it('calls onReload when the reload button is clicked', async () => {
    const onReload = vi.fn();
    render(<ConnectionLostOverlayPresentational {...PROPS} onReload={onReload} />);

    await userEvent.click(screen.getByRole('button', { name: 'Reload' }));

    expect(onReload).toHaveBeenCalledTimes(1);
  });

  it('puts focus on reload, the only control that still works', () => {
    render(<ConnectionLostOverlayPresentational {...PROPS} />);
    expect(screen.getByRole('button', { name: 'Reload' })).toHaveFocus();
  });

  // Whether the scrim actually swallows clicks is a layout question, and jsdom has neither layout
  // nor the Tailwind stylesheet — a click-through assertion here would pass whether or not the
  // scrim covered anything. So this asserts only the structure that makes covering possible; that
  // it really blocks is verified against the running app (see the plan's live-verification task).
  it('lays a full-window scrim under the banner', () => {
    render(<ConnectionLostOverlayPresentational {...PROPS} />);
    // The dialog content is itself the scrim — see FULL_SCREEN_SCRIM_CONTENT for why the layer that
    // covers the window cannot be `DialogContent`'s own backdrop.
    const scrim = screen.getByTestId('connection-lost-dialog');
    expect(scrim).toHaveClass('tw:fixed', 'tw:inset-0', 'tw:h-screen', 'tw:w-screen');
    // The banner is inside the scrim, so the scrim covers every part of the window the banner does
    // not, and the banner stays clickable.
    expect(scrim).toContainElement(screen.getByTestId('connection-lost-banner'));
  });

  it('starts the banner below the 48px Power-mode toolbar', () => {
    render(<ConnectionLostOverlayPresentational {...PROPS} isPowerMode />);
    expect(screen.getByTestId('connection-lost-banner')).toHaveStyle({ top: '48px' });
  });

  it('starts the banner below the 56px Simple-mode toolbar', () => {
    render(<ConnectionLostOverlayPresentational {...PROPS} isPowerMode={false} />);
    expect(screen.getByTestId('connection-lost-banner')).toHaveStyle({ top: '56px' });
  });
});

describe('ConnectionLostOverlay', () => {
  beforeEach(() => {
    resetConnectionLost();
    vi.mocked(useLocalizedStrings).mockReturnValue([RESOLVED_STRINGS, false]);
  });

  it('renders nothing while the connection is alive', () => {
    render(<ConnectionLostOverlay />);
    // The component renders through a portal to document.body, so it lands as a sibling of RTL's
    // render container rather than inside it — asserting the container is empty would pass
    // regardless of whether the guard below exists. Look where the portal actually lands instead.
    expect(screen.queryByRole('alertdialog')).toBeNull();
  });

  it('shows the banner once the connection is lost', () => {
    render(<ConnectionLostOverlay />);

    act(() => {
      loseConnection();
    });

    expect(screen.getByRole('alertdialog')).toHaveTextContent('Connection lost.');
  });

  // This only pins that the component maps localizedStrings[KEY] into props instead of passing the
  // raw LocalizeKey constants straight through — it renders ConnectionLostOverlay directly and the
  // mock returns real strings unconditionally, so it cannot observe mount timing or a PAPI failure.
  // The startup-mount invariant (strings/interface mode captured before the connection drops) is
  // pinned at the app level in app.component.test.tsx, and verified live against the running app.
  it('maps localized strings into the banner instead of passing keys through', () => {
    render(<ConnectionLostOverlay />);

    act(() => {
      loseConnection();
    });

    const alert = screen.getByRole('alertdialog');
    expect(alert).not.toHaveTextContent('%overlay_');
    expect(alert).toHaveTextContent("Platform.Bible can't reach its background services.");
  });

  // A socket that dies before localization has answered leaves `useLocalizedStrings` returning its
  // `defaultState`, whose values are the raw keys — and PAPI is unreachable by then, so waiting for
  // a resolved value is not an option. The English fallback is what stands between the user and a
  // literal `%overlay_connectionLost%`.
  it('renders English text when localization has not resolved', () => {
    vi.mocked(useLocalizedStrings).mockReturnValue([UNRESOLVED_STRINGS, true]);
    render(<ConnectionLostOverlay />);

    act(() => {
      loseConnection();
    });

    const alert = screen.getByRole('alertdialog');
    // No `%` anywhere also proves `{%product_name%}` was expanded, not rendered raw.
    expect(alert).not.toHaveTextContent('%');
    expect(alert).toHaveTextContent(ENGLISH_FALLBACKS[CONNECTION_LOST_TITLE_KEY]);
    expect(alert).toHaveTextContent('Platform.Bible');
    expect(
      screen.getByRole('button', { name: ENGLISH_FALLBACKS[CONNECTION_LOST_RELOAD_KEY] }),
    ).toBeInTheDocument();
  });

  // The scrim blocks pointers, not keyboards. Without a focus trap, Tab off Reload walks into the
  // toolbar and dock, where every control is still focusable and Enter-activatable over the socket
  // that just died — the silent failure this state exists to end, reached by keyboard.
  it('keeps Tab and Shift+Tab on reload instead of letting focus reach the app behind it', async () => {
    render(
      <button type="button" data-testid="behind-the-overlay">
        Behind the overlay
      </button>,
    );

    act(() => {
      loseConnection();
    });
    // Rendered second so the overlay's portal lands after the background control in the document
    // order Tab follows.
    render(<ConnectionLostOverlay />);

    const reload = screen.getByRole('button', { name: 'Reload' });
    expect(reload).toHaveFocus();

    await userEvent.tab();
    expect(reload).toHaveFocus();

    await userEvent.tab({ shift: true });
    expect(reload).toHaveFocus();
    expect(screen.getByTestId('behind-the-overlay')).not.toHaveFocus();
  });

  it('reloads the window when reload is clicked', async () => {
    const originalLocation = window.location;
    const reload = vi.fn();
    // jsdom's location.reload isn't configurable in place, so replace the whole property instead
    // of spying on it directly.
    Object.defineProperty(window, 'location', {
      configurable: true,
      value: { ...originalLocation, reload },
    });
    try {
      render(<ConnectionLostOverlay />);
      act(() => {
        loseConnection();
      });

      await userEvent.click(screen.getByRole('button', { name: 'Reload' }));

      expect(reload).toHaveBeenCalledTimes(1);
    } finally {
      Object.defineProperty(window, 'location', { configurable: true, value: originalLocation });
    }
  });
});
