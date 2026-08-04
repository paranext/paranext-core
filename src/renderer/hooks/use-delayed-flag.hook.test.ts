import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useDelayedFlag } from './use-delayed-flag.hook';

describe('useDelayedFlag', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('stays false until active has been true for the full delay', () => {
    const { result } = renderHook(() => useDelayedFlag(true, 2000));

    expect(result.current).toBe(false);
    act(() => {
      vi.advanceTimersByTime(1999);
    });
    expect(result.current).toBe(false);
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe(true);
  });

  it('never becomes true while active is false', () => {
    const { result } = renderHook(() => useDelayedFlag(false, 2000));

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(result.current).toBe(false);
  });

  it('does not fire if active goes false before the delay elapses', () => {
    const { result, rerender } = renderHook(({ active }) => useDelayedFlag(active, 2000), {
      initialProps: { active: true },
    });

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    rerender({ active: false });
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(result.current).toBe(false);
  });

  it('resets to false as soon as active goes false after having fired', () => {
    const { result, rerender } = renderHook(({ active }) => useDelayedFlag(active, 2000), {
      initialProps: { active: true },
    });

    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current).toBe(true);

    rerender({ active: false });
    expect(result.current).toBe(false);
  });

  it('clears the pending timer on unmount', () => {
    const { unmount } = renderHook(() => useDelayedFlag(true, 2000));

    expect(vi.getTimerCount()).toBe(1); // timer armed while active
    unmount();
    expect(vi.getTimerCount()).toBe(0); // cleanup cleared it — nothing left to fire post-teardown
  });
});
