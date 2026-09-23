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
    // 12 frames * 2 px = 24 px of travel against a ~9.53 px step (`ln(1.1) * 100`, the reader's
    // pinch calibration at the grid's 0.1 zoom step) is exactly 2 steps, not a range.
    expect(totalSteps).toBe(2);
  });

  it('removes every listener it installed when the component unmounts', () => {
    // The container's own wheel listener, plus the six the reader installs to track
    // physically-held modifier keys (window keydown/keyup/pointerdown/pointermove/blur, document
    // visibilitychange). A listener comes off only when the removal names the SAME function with
    // the same capture flag as the registration; any other function, or a mismatched flag, is a
    // silent no-op that leaves it attached for the life of the window. So each registration is
    // captured as it happens and its exact reference is what the removal must carry.
    // Spied per target, each installed before render: the container's listener goes through the
    // element prototype (the container does not exist until render), while the window and document
    // are spied on themselves.
    const spies = {
      element: {
        add: vi.spyOn(Element.prototype, 'addEventListener'),
        remove: vi.spyOn(Element.prototype, 'removeEventListener'),
      },
      window: {
        add: vi.spyOn(window, 'addEventListener'),
        remove: vi.spyOn(window, 'removeEventListener'),
      },
      document: {
        add: vi.spyOn(document, 'addEventListener'),
        remove: vi.spyOn(document, 'removeEventListener'),
      },
    };
    const { getByTestId, unmount } = render(<Harness handlers={handlers} />);
    const container = getByTestId('grid');

    const isCapture = (options: unknown): boolean =>
      options === true ||
      (typeof options === 'object' && !!options && 'capture' in options && !!options.capture);
    // React installs wheel listeners of its own on elements it manages; the hook's is the one on
    // the container registered in capture phase and non-passive, which is what lets it cancel page
    // zoom.
    const isHookWheel = (context: unknown, options: unknown): boolean =>
      context === container &&
      typeof options === 'object' &&
      !!options &&
      'passive' in options &&
      options.passive === false;
    type Expected = {
      on: keyof typeof spies;
      type: string;
      capture: boolean;
      isOurs?: (context: unknown, options: unknown) => boolean;
    };
    const expected: Expected[] = [
      { on: 'element', type: 'wheel', capture: true, isOurs: isHookWheel },
      { on: 'window', type: 'keydown', capture: true },
      { on: 'window', type: 'keyup', capture: true },
      { on: 'window', type: 'pointerdown', capture: true },
      { on: 'window', type: 'pointermove', capture: true },
      { on: 'window', type: 'blur', capture: false },
      { on: 'document', type: 'visibilitychange', capture: false },
    ];
    const registrations = expected.map(({ on, type, capture, isOurs }) => {
      const { add } = spies[on];
      const matches = add.mock.calls
        .map(([addedType, listener, options], index) => ({
          addedType,
          listener,
          options,
          context: add.mock.contexts[index],
        }))
        .filter(
          ({ addedType, options, context }) =>
            addedType === type &&
            isCapture(options) === capture &&
            (!isOurs || isOurs(context, options)),
        );
      return { on, type, capture, matches };
    });
    // Exactly one registration of each, so the reference captured below is unambiguous.
    expect(registrations.map(({ type, matches }) => [type, matches.length])).toEqual(
      expected.map(({ type }) => [type, 1]),
    );

    unmount();

    const leftAttached = registrations
      .filter(({ on, type, capture, matches: [{ listener, context }] }) => {
        const { remove } = spies[on];
        return !remove.mock.calls.some(
          ([removedType, removedListener, options], index) =>
            remove.mock.contexts[index] === context &&
            removedType === type &&
            removedListener === listener &&
            isCapture(options) === capture,
        );
      })
      .map(({ type }) => type);
    expect(leftAttached).toEqual([]);
  });
});
