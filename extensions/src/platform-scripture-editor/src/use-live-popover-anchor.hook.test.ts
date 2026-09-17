// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useLivePopoverAnchor } from './use-live-popover-anchor.hook';

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
