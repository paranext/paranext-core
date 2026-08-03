// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useViewVisibility } from './use-view-visibility.hook';

// jsdom has no IntersectionObserver; stub it capturing the callback so tests can simulate
// intersection changes (same pattern as resource-picker-dialog.utils.test.ts). The callback is
// captured with just the entry shape the hook consumes, so no type assertions are needed.
type MinimalIntersectionCallback = (entries: { isIntersecting: boolean }[]) => void;

let intersectionCallback: MinimalIntersectionCallback | undefined;
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
  intersectionCallback = undefined;
  mockObserve.mockClear();
  mockDisconnect.mockClear();
  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn((callback: MinimalIntersectionCallback) => {
      intersectionCallback = callback;
      return { observe: mockObserve, disconnect: mockDisconnect };
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

/** Simulates the observer reporting an intersection change */
function simulateIntersection(isIntersecting: boolean) {
  act(() => {
    intersectionCallback?.([{ isIntersecting }]);
  });
}

describe('useViewVisibility', () => {
  it('starts hidden when the document has no layout (jsdom reports zero geometry)', () => {
    const { result } = renderHook(() => useViewVisibility());
    expect(result.current).toBe(false);
  });

  it('observes the document body', () => {
    renderHook(() => useViewVisibility());
    expect(mockObserve).toHaveBeenCalledWith(document.body);
  });

  it('becomes visible when the observer reports intersection', () => {
    const { result } = renderHook(() => useViewVisibility());
    simulateIntersection(true);
    expect(result.current).toBe(true);
  });

  it('becomes hidden again when the observer reports no intersection', () => {
    const { result } = renderHook(() => useViewVisibility());
    simulateIntersection(true);
    simulateIntersection(false);
    expect(result.current).toBe(false);
  });

  it('disconnects the observer on unmount', () => {
    const { unmount } = renderHook(() => useViewVisibility());
    unmount();
    expect(mockDisconnect).toHaveBeenCalled();
  });
});
