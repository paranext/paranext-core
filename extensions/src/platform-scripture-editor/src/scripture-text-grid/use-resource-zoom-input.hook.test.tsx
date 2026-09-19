/// <reference types="vitest" />
// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { useRef } from 'react';
import { useResourceZoomInput } from './use-resource-zoom-input.hook';

type Handlers = { adjustZoom: ReturnType<typeof vi.fn> };

function Harness({ handlers }: { handlers: Handlers }) {
  // React's ref API requires `null` as the initial value for DOM refs.
  // eslint-disable-next-line no-null/no-null
  const containerRef = useRef<HTMLDivElement>(null);
  useResourceZoomInput({
    containerRef,
    adjustZoom: handlers.adjustZoom,
  });
  return (
    <div ref={containerRef} data-testid="grid">
      <div data-resource-id="r1">
        <button type="button" data-testid="cell-r1">
          verse
        </button>
      </div>
    </div>
  );
}

/** A wheel event carrying Chromium's non-standard `wheelDeltaY`, which jsdom does not populate. */
function wheelEvent(deltaY: number, wheelDeltaY: number): WheelEvent {
  const event = new WheelEvent('wheel', {
    deltaY,
    ctrlKey: true,
    bubbles: true,
    cancelable: true,
  });
  Object.defineProperty(event, 'wheelDeltaY', { value: wheelDeltaY });
  return event;
}

let handlers: Handlers;
beforeEach(() => {
  handlers = { adjustZoom: vi.fn() };
});
afterEach(() => vi.restoreAllMocks());

describe('useResourceZoomInput', () => {
  it('Ctrl+wheel up over a cell zooms that resource in and prevents page zoom', () => {
    const { getByTestId } = render(<Harness handlers={handlers} />);
    const target = getByTestId('cell-r1');
    const event = new WheelEvent('wheel', {
      deltaY: -100,
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    target.dispatchEvent(event);
    expect(handlers.adjustZoom).toHaveBeenCalledWith('r1', 1);
    expect(event.defaultPrevented).toBe(true);
  });

  it('Ctrl+wheel down zooms out', () => {
    const { getByTestId } = render(<Harness handlers={handlers} />);
    getByTestId('cell-r1').dispatchEvent(
      new WheelEvent('wheel', { deltaY: 100, ctrlKey: true, bubbles: true, cancelable: true }),
    );
    expect(handlers.adjustZoom).toHaveBeenCalledWith('r1', -1);
  });

  it('plain wheel without modifier: does not call adjustZoom AND does not preventDefault (normal scrolling preserved)', () => {
    const { getByTestId } = render(<Harness handlers={handlers} />);
    const target = getByTestId('cell-r1');
    const event = new WheelEvent('wheel', { deltaY: -100, bubbles: true, cancelable: true });
    target.dispatchEvent(event);
    // No zoom action taken.
    expect(handlers.adjustZoom).not.toHaveBeenCalled();
    // Normal scroll must not be consumed — the browser's default scroll behavior is preserved.
    expect(event.defaultPrevented).toBe(false);
  });

  it('prevents default on Ctrl+wheel even when the event target is outside any [data-resource-id], but does not call adjustZoom', () => {
    const { getByTestId } = render(<Harness handlers={handlers} />);
    // Fire directly on the bare container — it has no [data-resource-id] attribute itself.
    const container = getByTestId('grid');
    const event = new WheelEvent('wheel', {
      deltaY: -100,
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    container.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(handlers.adjustZoom).not.toHaveBeenCalled();
  });

  it('steps one resource once per wheel notch', () => {
    // One notch is 120 units of `wheelDeltaY` on every platform, while the PIXELS it carries are a
    // system setting — so the pixel delta alone cannot decide how far to step.
    const { getByTestId } = render(<Harness handlers={handlers} />);
    getByTestId('cell-r1').dispatchEvent(wheelEvent(-100, 120));
    expect(handlers.adjustZoom).toHaveBeenCalledTimes(1);
    expect(handlers.adjustZoom).toHaveBeenCalledWith('r1', 1);
  });

  it('does not run a resource across its range on one trackpad pinch', () => {
    // Chromium synthesizes a pinch as ctrl+wheel at the display's refresh rate with a tiny deltaY.
    // Twelve frames of 2 px is about 24 px of travel — two steps, not twelve.
    const { getByTestId } = render(<Harness handlers={handlers} />);
    const cell = getByTestId('cell-r1');
    Array.from({ length: 12 }).forEach(() => {
      cell.dispatchEvent(wheelEvent(-2, 2));
    });
    const totalSteps = handlers.adjustZoom.mock.calls.reduce(
      (sum: number, call: unknown[]) => sum + Number(call[1]),
      0,
    );
    expect(totalSteps).toBeGreaterThan(0);
    expect(totalSteps).toBeLessThanOrEqual(3);
  });

  it('removes every listener it installed when the component unmounts', () => {
    // The container's own wheel listener, plus the six the reader installs to track
    // physically-held modifier keys (window keydown/keyup/pointerdown/pointermove/blur, document
    // visibilitychange). Every one of them is asserted, because an unremoved listener outlives the
    // grid silently — and so does a removal whose capture flag does not match the registration's,
    // which is why each expectation carries the flag the reader registered with.
    const { getByTestId, unmount } = render(<Harness handlers={handlers} />);
    const container = getByTestId('grid');
    const containerRemoveSpy = vi.spyOn(container, 'removeEventListener');
    const windowRemoveSpy = vi.spyOn(window, 'removeEventListener');
    const documentRemoveSpy = vi.spyOn(document, 'removeEventListener');
    unmount();
    expect(containerRemoveSpy).toHaveBeenCalledWith('wheel', expect.any(Function), true);
    expect(windowRemoveSpy).toHaveBeenCalledWith('keydown', expect.any(Function), true);
    expect(windowRemoveSpy).toHaveBeenCalledWith('keyup', expect.any(Function), true);
    expect(windowRemoveSpy).toHaveBeenCalledWith('pointerdown', expect.any(Function), true);
    expect(windowRemoveSpy).toHaveBeenCalledWith('pointermove', expect.any(Function), true);
    expect(windowRemoveSpy).toHaveBeenCalledWith('blur', expect.any(Function));
    expect(documentRemoveSpy).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
  });
});
