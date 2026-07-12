// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { useState } from 'react';
import { renderHook, act } from '@testing-library/react';
import { useResourceZoom, type ZoomByResourceId } from './use-resource-zoom.hook';
import { MAX_ZOOM_FACTOR, MIN_ZOOM_FACTOR } from './resource-zoom.util';

// Minimal stand-in for WebViewProps['useWebViewState']: real React state so re-renders happen,
// standing in for the synchronous localStorage-backed hook.
function makeFakeUseWebViewState() {
  return function useFakeWebViewState<T>(_key: string, defaultValue: T): [T, (next: T) => void] {
    const [value, setValue] = useState<T>(defaultValue);
    return [value, setValue];
  };
}

function renderController() {
  const useFake = makeFakeUseWebViewState();
  return renderHook(() => useResourceZoom(useFake));
}

describe('useResourceZoom', () => {
  it('returns the default factor for an unknown resource', () => {
    const { result } = renderController();
    expect(result.current.getZoom('unknown')).toBe(1);
  });

  it('setZoomForResource stores a clamped, rounded factor', () => {
    const { result } = renderController();
    act(() => result.current.setZoomForResource('r1', 1.2000000001));
    expect(result.current.getZoom('r1')).toBe(1.2);
    act(() => result.current.setZoomForResource('r1', 99));
    expect(result.current.getZoom('r1')).toBe(MAX_ZOOM_FACTOR);
  });

  it('adjustZoom steps up and down and clamps at the floor', () => {
    const { result } = renderController();
    act(() => result.current.adjustZoom('r1', 1));
    expect(result.current.getZoom('r1')).toBe(1.1);
    act(() => result.current.adjustZoom('r1', -10));
    expect(result.current.getZoom('r1')).toBe(MIN_ZOOM_FACTOR);
  });

  it('resetZoom removes the entry so getZoom falls back to default', () => {
    const { result } = renderController();
    act(() => result.current.setZoomForResource('r1', 1.5));
    act(() => result.current.resetZoom('r1'));
    expect(result.current.getZoom('r1')).toBe(1);
  });

  it('pruneToResourceIds drops entries whose resource is gone', () => {
    const { result } = renderController();
    act(() => result.current.setZoomForResource('keep', 1.3));
    act(() => result.current.setZoomForResource('drop', 1.4));
    act(() => result.current.pruneToResourceIds(['keep']));
    expect(result.current.getZoom('keep')).toBe(1.3);
    expect(result.current.getZoom('drop')).toBe(1);
  });

  it('a DBL resource keyed by its stable id keeps zoom across a projectId change', () => {
    // Zoom is keyed by resourceId, not projectId, so a reinstall (new projectId, same resourceId)
    // preserves the entry. Modeled here as: the same resourceId is still present after prune.
    const { result } = renderController();
    act(() => result.current.setZoomForResource('dbl-uid-9', 1.5));
    act(() => result.current.pruneToResourceIds(['dbl-uid-9']));
    expect(result.current.getZoom('dbl-uid-9')).toBe(1.5);
  });

  it('does not thrash state when pruning nothing', () => {
    const { result } = renderController();
    const before: ZoomByResourceId = { r1: 1.2 };
    act(() => result.current.setZoomForResource('r1', 1.2));
    act(() => result.current.pruneToResourceIds(['r1']));
    expect(result.current.getZoom('r1')).toBe(before.r1);
  });

  it('pruneToResourceIds([]) drops all entries (controller does not special-case empty)', () => {
    // NOTE: the empty-list SAFETY GUARD lives in the grid component
    // (scripture-text-grid.component.tsx skips calling prune when resources.length === 0,
    // preventing data loss during source loading). This test documents that the controller itself
    // does NOT special-case an empty list — if called with [], it drops everything.
    const { result } = renderController();
    act(() => result.current.setZoomForResource('a', 1.5));
    act(() => result.current.setZoomForResource('b', 1.2));
    act(() => result.current.pruneToResourceIds([]));
    expect(result.current.getZoom('a')).toBe(1);
    expect(result.current.getZoom('b')).toBe(1);
  });

  it('setting one resource zoom does not affect another (per-resource independence)', () => {
    const { result } = renderController();
    act(() => result.current.setZoomForResource('a', 1.5));
    // 'b' was never touched; it must still return the default.
    expect(result.current.getZoom('a')).toBe(1.5);
    expect(result.current.getZoom('b')).toBe(1);
  });
});
