// @vitest-environment jsdom

import { describe, it, expect, afterEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useIsOnline } from './use-is-online.hook';

/** Override navigator.onLine for a test (jsdom defaults it to true). */
function setOnLine(value: boolean) {
  vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(value);
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useIsOnline', () => {
  it('returns the current navigator.onLine value', () => {
    setOnLine(false);
    const { result } = renderHook(() => useIsOnline());
    expect(result.current).toBe(false);
  });

  it('updates when an offline event fires', () => {
    setOnLine(true);
    const { result } = renderHook(() => useIsOnline());
    expect(result.current).toBe(true);

    act(() => {
      setOnLine(false);
      window.dispatchEvent(new Event('offline'));
    });
    expect(result.current).toBe(false);
  });

  it('updates when an online event fires', () => {
    setOnLine(false);
    const { result } = renderHook(() => useIsOnline());
    expect(result.current).toBe(false);

    act(() => {
      setOnLine(true);
      window.dispatchEvent(new Event('online'));
    });
    expect(result.current).toBe(true);
  });
});
