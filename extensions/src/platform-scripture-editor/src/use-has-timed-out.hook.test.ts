// @vitest-environment jsdom
import { describe, expect, test, vi, beforeEach, afterEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useHasTimedOut } from './use-has-timed-out.hook';

const TIMEOUT_MS = 10000;

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe('useHasTimedOut', () => {
  test('does not report a timeout while the wait is within its allowance', () => {
    const { result } = renderHook(() => useHasTimedOut(true, TIMEOUT_MS));

    act(() => {
      vi.advanceTimersByTime(TIMEOUT_MS - 1);
    });

    expect(result.current).toBe(false);
  });

  test('reports a timeout once the wait outlasts its allowance', () => {
    const { result } = renderHook(() => useHasTimedOut(true, TIMEOUT_MS));

    act(() => {
      vi.advanceTimersByTime(TIMEOUT_MS);
    });

    expect(result.current).toBe(true);
  });

  test('never reports a timeout when nothing is being waited on', () => {
    const { result } = renderHook(() => useHasTimedOut(false, TIMEOUT_MS));

    act(() => {
      vi.advanceTimersByTime(TIMEOUT_MS * 10);
    });

    expect(result.current).toBe(false);
  });

  test('clears a reported timeout when the wait ends', () => {
    const { result, rerender } = renderHook(
      ({ isWaiting }: { isWaiting: boolean }) => useHasTimedOut(isWaiting, TIMEOUT_MS),
      { initialProps: { isWaiting: true } },
    );
    act(() => {
      vi.advanceTimersByTime(TIMEOUT_MS);
    });
    expect(result.current).toBe(true);

    rerender({ isWaiting: false });

    expect(result.current).toBe(false);
  });

  test('restarts the allowance when the subject changes, even if the wait never ends', () => {
    // A project switch while the sources are still unresolved: `isWaiting` is true before and
    // after, so only the key distinguishes B's wait from A's expired one.
    const { result, rerender } = renderHook(
      ({ waitKey }: { waitKey: string }) => useHasTimedOut(true, TIMEOUT_MS, waitKey),
      { initialProps: { waitKey: 'projectA' } },
    );
    act(() => {
      vi.advanceTimersByTime(TIMEOUT_MS);
    });
    expect(result.current).toBe(true);

    rerender({ waitKey: 'projectB' });

    expect(result.current).toBe(false);
  });

  test('does not restart the allowance while the subject is unchanged', () => {
    const { result, rerender } = renderHook(
      ({ waitKey }: { waitKey: string }) => useHasTimedOut(true, TIMEOUT_MS, waitKey),
      { initialProps: { waitKey: 'projectA' } },
    );
    act(() => {
      vi.advanceTimersByTime(TIMEOUT_MS);
    });

    rerender({ waitKey: 'projectA' });

    expect(result.current).toBe(true);
  });

  test('gives a later wait its full allowance rather than an earlier one leftover', () => {
    const { result, rerender } = renderHook(
      ({ isWaiting }: { isWaiting: boolean }) => useHasTimedOut(isWaiting, TIMEOUT_MS),
      { initialProps: { isWaiting: true } },
    );
    act(() => {
      vi.advanceTimersByTime(TIMEOUT_MS - 1);
    });
    rerender({ isWaiting: false });
    rerender({ isWaiting: true });

    act(() => {
      vi.advanceTimersByTime(TIMEOUT_MS - 1);
    });

    expect(result.current).toBe(false);
  });
});
