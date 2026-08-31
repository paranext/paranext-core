import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { describe, expect, it, vi } from 'vitest';
import { ConnectionLostOverlayPresentational } from './overlay-connection-lost.component';

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
