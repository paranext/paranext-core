// @vitest-environment jsdom
import { describe, it, expect, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { leftEdgeRect, measureBox, useLivePopoverAnchor } from './use-live-popover-anchor.hook';

/** A rect the assertions can tell apart, in the shape `measure` returns. */
function rect(x: number, y: number): DOMRect {
  return new DOMRect(x, y, 10, 20);
}

describe('useLivePopoverAnchor', () => {
  it('re-measures the source on every read, so a popover follows its text', () => {
    const { result } = renderHook(() => useLivePopoverAnchor());
    const contextElement = document.createElement('div');
    let top = 100;
    result.current.setSource({ measure: () => rect(0, top), contextElement });

    expect(result.current.virtualRef.current.getBoundingClientRect().y).toBe(100);
    top = 40;
    expect(result.current.virtualRef.current.getBoundingClientRect().y).toBe(40);
    expect(result.current.virtualRef.current.contextElement).toBe(contextElement);
  });

  it('keeps the last rect it could read once the source can no longer be measured', () => {
    const { result } = renderHook(() => useLivePopoverAnchor());
    const contextElement = document.createElement('div');
    let measurable = true;
    result.current.setSource({
      measure: () => (measurable ? rect(0, 100) : undefined),
      contextElement,
    });

    expect(result.current.virtualRef.current.getBoundingClientRect().y).toBe(100);
    measurable = false;
    // An unmeasurable source must not collapse the anchor to the frame's corner: the popover would
    // jump to the top left instead of staying where its text was.
    expect(result.current.virtualRef.current.getBoundingClientRect().y).toBe(100);
  });

  it('measures a new source at once, so a second popover never opens against the first one', () => {
    const { result } = renderHook(() => useLivePopoverAnchor());
    const firstContext = document.createElement('div');
    const secondContext = document.createElement('div');
    result.current.setSource({ measure: () => rect(0, 100), contextElement: firstContext });
    expect(result.current.virtualRef.current.getBoundingClientRect().y).toBe(100);

    result.current.setSource({ measure: () => rect(0, 300), contextElement: secondContext });
    expect(result.current.virtualRef.current.getBoundingClientRect().y).toBe(300);
    expect(result.current.virtualRef.current.contextElement).toBe(secondContext);
  });

  it('starts a source that cannot be measured yet from an empty rect, not the previous source', () => {
    const { result } = renderHook(() => useLivePopoverAnchor());
    const contextElement = document.createElement('div');
    result.current.setSource({ measure: () => rect(0, 100), contextElement });
    expect(result.current.virtualRef.current.getBoundingClientRect().y).toBe(100);

    result.current.setSource({ measure: () => undefined, contextElement });
    expect(result.current.virtualRef.current.getBoundingClientRect().y).toBe(0);
  });

  it('keeps the same anchor object across re-renders, so the popover is not re-anchored', () => {
    const { result, rerender } = renderHook(() => useLivePopoverAnchor());
    const anchor = result.current;
    rerender();
    expect(result.current).toBe(anchor);
  });
});

/**
 * Gives `target` the client rects jsdom cannot lay out. `measureBox` reads `getClientRects()` and
 * `getBoundingClientRect()`, so a test supplies them directly.
 */
function stubClientRects(target: Range | Element, rects: DOMRect[]) {
  Object.defineProperty(target, 'getClientRects', { value: () => rects, configurable: true });
  Object.defineProperty(target, 'getBoundingClientRect', {
    configurable: true,
    value: () => {
      if (rects.length === 0) return new DOMRect();
      const left = Math.min(...rects.map((r) => r.left));
      const top = Math.min(...rects.map((r) => r.top));
      const right = Math.max(...rects.map((r) => r.right));
      const bottom = Math.max(...rects.map((r) => r.bottom));
      return new DOMRect(left, top, right - left, bottom - top);
    },
  });
}

/**
 * A rect's numbers, for comparison. `DOMRect` keeps its values on the prototype, so `toEqual` on
 * two rects compares nothing and passes for any pair.
 */
function rectNumbers(rectValue: DOMRect | undefined) {
  if (!rectValue) return undefined;
  return { x: rectValue.x, y: rectValue.y, width: rectValue.width, height: rectValue.height };
}

describe('measureBox', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  function addParagraphRange() {
    const paragraph = document.createElement('p');
    paragraph.textContent = 'In the beginning';
    document.body.appendChild(paragraph);
    const range = document.createRange();
    range.selectNodeContents(paragraph);
    return range;
  }

  it('has no rect once a range no longer lies in rendered text', () => {
    // The editor replaces text nodes as it re-renders; the range then collapses to an element
    // boundary, which paints nothing.
    const range = addParagraphRange();
    stubClientRects(range, []);

    expect(measureBox(range)).toBeUndefined();
  });

  it('is the range box while the text is rendered', () => {
    const range = addParagraphRange();
    stubClientRects(range, [new DOMRect(30, 60, 120, 18)]);

    expect(rectNumbers(measureBox(range))).toEqual({
      x: 30,
      y: 60,
      width: 120,
      height: 18,
    });
  });

  it('has no rect once an element has no layout, as inside a display:none rc-dock tab pane', () => {
    const element = document.createElement('div');
    stubClientRects(element, []);

    expect(measureBox(element)).toBeUndefined();
  });

  it('is the element box while it is laid out, even at zero width or height', () => {
    // A collapsed caret's element still occupies a real position; only "no box at all" (an empty
    // getClientRects()) counts as unmeasurable.
    const element = document.createElement('div');
    stubClientRects(element, [new DOMRect(40, 100, 0, 40)]);

    expect(rectNumbers(measureBox(element))).toEqual({
      x: 40,
      y: 100,
      width: 0,
      height: 40,
    });
  });
});

describe('leftEdgeRect', () => {
  it('collapses to the left edge and keeps the full height', () => {
    // A pop-up anchored on this sits below all of the original rect and centered on its left edge,
    // instead of centered under a wide caller.
    expect(rectNumbers(leftEdgeRect(new DOMRect(40, 100, 260, 40)))).toEqual({
      x: 40,
      y: 100,
      width: 0,
      height: 40,
    });
  });
});
