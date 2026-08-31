import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { onDidLoseConnection } from '@shared/services/network.service';
import {
  initConnectionLostStore,
  resetConnectionLost,
} from '@renderer/services/connection-lost-store';
import {
  ConnectionLostOverlay,
  ConnectionLostOverlayPresentational,
} from './overlay-connection-lost.component';

vi.mock('@renderer/hooks/papi-hooks', () => ({
  useLocalizedStrings: vi.fn(() => [
    {
      '%overlay_connectionLostTitle%': 'Connection lost.',
      '%overlay_connectionLost%': "Platform.Bible can't reach its background services.",
      '%overlay_connectionLostReload%': 'Reload',
    },
  ]),
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
  it('states the problem in an assertive alert', () => {
    render(<ConnectionLostOverlayPresentational {...PROPS} />);
    const alert = screen.getByRole('alert');
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
    const scrim = screen.getByTestId('connection-lost-scrim');
    expect(scrim).toHaveClass('tw:absolute', 'tw:inset-0');
    expect(scrim).toHaveAttribute('aria-hidden', 'true');
    // Under the banner in the DOM order that decides paint order, so the banner stays clickable.
    expect(scrim.compareDocumentPosition(screen.getByRole('alert'))).toBe(
      Node.DOCUMENT_POSITION_FOLLOWING,
    );
  });

  it('starts the banner below the 48px Power-mode toolbar', () => {
    render(<ConnectionLostOverlayPresentational {...PROPS} isPowerMode />);
    expect(screen.getByRole('alert')).toHaveStyle({ top: '48px' });
  });

  it('starts the banner below the 56px Simple-mode toolbar', () => {
    render(<ConnectionLostOverlayPresentational {...PROPS} isPowerMode={false} />);
    expect(screen.getByRole('alert')).toHaveStyle({ top: '56px' });
  });
});

describe('ConnectionLostOverlay', () => {
  beforeEach(() => {
    resetConnectionLost();
  });

  it('renders nothing while the connection is alive', () => {
    render(<ConnectionLostOverlay />);
    // The component renders through a portal to document.body, so it lands as a sibling of RTL's
    // render container rather than inside it — asserting the container is empty would pass
    // regardless of whether the guard below exists. Look where the portal actually lands instead.
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('shows the banner once the connection is lost', () => {
    render(<ConnectionLostOverlay />);

    act(() => {
      loseConnection();
    });

    expect(screen.getByRole('alert')).toHaveTextContent('Connection lost.');
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

    const alert = screen.getByRole('alert');
    expect(alert).not.toHaveTextContent('%overlay_');
    expect(alert).toHaveTextContent("Platform.Bible can't reach its background services.");
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
