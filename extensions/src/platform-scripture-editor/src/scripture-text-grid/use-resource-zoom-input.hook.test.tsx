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
});
