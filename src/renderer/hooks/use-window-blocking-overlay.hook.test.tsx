import { render } from '@testing-library/react';
import { useLayoutEffect } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  isWindowBlockedByOverlay,
  resetWindowBlockingOverlays,
} from '@renderer/services/window-blocking-overlay-store';
import { useWindowBlockingOverlay } from './use-window-blocking-overlay.hook';

function BlockingOverlay({ isBlocking }: { isBlocking: boolean }) {
  useWindowBlockingOverlay(isBlocking);
  return undefined;
}

/**
 * Reads the store from a LAYOUT effect, which React runs for the whole tree before the browser
 * paints and before any passive effect in that tree. Rendered after the overlay, so it reads the
 * store at the first moment a frame carrying the overlay could be on screen.
 */
function LayoutPhaseProbe({ onRead }: { onRead: (isBlocked: boolean) => void }) {
  useLayoutEffect(() => {
    onRead(isWindowBlockedByOverlay());
  }, [onRead]);
  return undefined;
}

describe('useWindowBlockingOverlay', () => {
  afterEach(() => {
    // Module-level singleton: a registration left behind would block the window for every later
    // test in this process.
    resetWindowBlockingOverlays();
  });

  // The whole point of registering from a layout effect rather than a passive one: a passive effect
  // commits after the browser has painted, so for that frame the scrim would be on screen while the
  // store still answered "unblocked" — and a zoom chord landing in that window would zoom, and
  // persist, a pane the user cannot see.
  it('holds the window before the frame carrying the overlay can be painted', () => {
    const onRead = vi.fn();
    render(
      <>
        <BlockingOverlay isBlocking />
        <LayoutPhaseProbe onRead={onRead} />
      </>,
    );
    expect(onRead).toHaveBeenCalledWith(true);
  });

  it('holds nothing while the overlay is not blocking', () => {
    const onRead = vi.fn();
    render(
      <>
        <BlockingOverlay isBlocking={false} />
        <LayoutPhaseProbe onRead={onRead} />
      </>,
    );
    expect(onRead).toHaveBeenCalledWith(false);
    expect(isWindowBlockedByOverlay()).toBe(false);
  });

  it('releases the window when the overlay stops blocking, without unmounting', () => {
    const { rerender } = render(<BlockingOverlay isBlocking />);
    expect(isWindowBlockedByOverlay()).toBe(true);
    rerender(<BlockingOverlay isBlocking={false} />);
    expect(isWindowBlockedByOverlay()).toBe(false);
  });

  it('holds the window once for a component React mounts, unmounts and remounts', () => {
    const { unmount } = render(<BlockingOverlay isBlocking />);
    expect(isWindowBlockedByOverlay()).toBe(true);
    unmount();
    expect(isWindowBlockedByOverlay()).toBe(false);
  });
});
