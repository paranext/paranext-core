import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useIsContentZoomable } from './use-is-content-zoomable.hook';

const { zoomableByWebViewId, listeners } = vi.hoisted(() => ({
  zoomableByWebViewId: new Map<string, boolean>(),
  listeners: new Set<(event: { webViewId: string; isContentZoomable: boolean }) => void>(),
}));

vi.mock('@renderer/services/web-view-content-zoom.service', () => ({
  isContentZoomable: (webViewId: string) => zoomableByWebViewId.get(webViewId) ?? false,
  onDidChangeContentZoomable: (
    listener: (event: { webViewId: string; isContentZoomable: boolean }) => void,
  ) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
}));

function announce(webViewId: string, isContentZoomable: boolean): void {
  zoomableByWebViewId.set(webViewId, isContentZoomable);
  act(() => {
    listeners.forEach((listener) => listener({ webViewId, isContentZoomable }));
  });
}

describe('useIsContentZoomable', () => {
  afterEach(() => {
    zoomableByWebViewId.clear();
    listeners.clear();
  });

  it("reads the pane's zoomability and follows its change event", () => {
    const { result } = renderHook(() => useIsContentZoomable('pane-1'));
    expect(result.current).toBe(false);
    announce('pane-2', true);
    expect(result.current).toBe(false);
    announce('pane-1', true);
    expect(result.current).toBe(true);
    announce('pane-1', false);
    expect(result.current).toBe(false);
  });

  it('is false for a tab hosting no web view, and subscribes to nothing for it', () => {
    const { result } = renderHook(() => useIsContentZoomable(undefined));
    expect(result.current).toBe(false);
  });

  it('unsubscribes when unmounted', () => {
    const { unmount } = renderHook(() => useIsContentZoomable('pane-1'));
    expect(listeners.size).toBe(1);
    unmount();
    expect(listeners.size).toBe(0);
  });
});
