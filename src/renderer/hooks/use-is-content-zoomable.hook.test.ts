import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useIsContentZoomable } from './use-is-content-zoomable.hook';

const { zoomableByWebViewId, listeners, isContentZoomable } = vi.hoisted(() => {
  const zoomableByWebViewIdMap = new Map<string, boolean>();
  return {
    zoomableByWebViewId: zoomableByWebViewIdMap,
    listeners: new Set<(event: { webViewId: string; isContentZoomable: boolean }) => void>(),
    isContentZoomable: vi.fn((webViewId: string) => zoomableByWebViewIdMap.get(webViewId) ?? false),
  };
});

vi.mock('@renderer/services/web-view-content-zoom.service', () => ({
  isContentZoomable,
  onDidChangeContentZoomable: (
    listener: (event: { webViewId: string; isContentZoomable: boolean }) => void,
  ) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
}));

function announce(webViewId: string, isZoomable: boolean): void {
  zoomableByWebViewId.set(webViewId, isZoomable);
  act(() => {
    listeners.forEach((listener) => listener({ webViewId, isContentZoomable: isZoomable }));
  });
}

describe('useIsContentZoomable', () => {
  afterEach(() => {
    zoomableByWebViewId.clear();
    listeners.clear();
    isContentZoomable.mockClear();
  });

  it("reads the pane's zoomability and follows its change event", () => {
    const { result } = renderHook(() => useIsContentZoomable('pane-1'));
    expect(result.current).toBe(false);

    // `useSyncExternalStore` itself only re-renders on a value change, so it already masks a
    // spurious `onStoreChange()` call that produces the SAME snapshot value — asserting on render
    // count could not tell a filtered subscription from an unfiltered one here. What the
    // subscription's own `event.webViewId === webViewId` check controls is whether the snapshot is
    // even RE-CHECKED for an event about a different pane, which is directly observable as a call
    // to `isContentZoomable`.
    isContentZoomable.mockClear();
    announce('pane-2', true);
    expect(result.current).toBe(false);
    // Another pane's flip must not even re-check this hook's snapshot: the subscription filters by
    // webViewId before calling `onStoreChange`.
    expect(isContentZoomable).not.toHaveBeenCalled();

    announce('pane-1', true);
    expect(result.current).toBe(true);
    // Positive control: this pane's own flip does re-check the snapshot, so the assertion above is
    // meaningful rather than vacuous.
    expect(isContentZoomable).toHaveBeenCalledWith('pane-1');

    announce('pane-1', false);
    expect(result.current).toBe(false);
  });

  it('is false for a tab hosting no web view, and subscribes to nothing for it', () => {
    const { result } = renderHook(() => useIsContentZoomable(undefined));
    expect(result.current).toBe(false);
    expect(listeners.size).toBe(0);
  });

  it('unsubscribes when unmounted', () => {
    const { unmount } = renderHook(() => useIsContentZoomable('pane-1'));
    expect(listeners.size).toBe(1);
    unmount();
    expect(listeners.size).toBe(0);
  });
});
