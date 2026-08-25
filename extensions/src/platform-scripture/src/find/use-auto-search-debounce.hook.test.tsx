// @vitest-environment jsdom

import { renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useAutoSearchDebounce } from './use-auto-search-debounce.hook';

const DELAY_MS = 500;

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('useAutoSearchDebounce', () => {
  it('runs the search once the term stops changing', () => {
    const startSearch = vi.fn();
    const { result } = renderHook(() => useAutoSearchDebounce(startSearch, DELAY_MS));

    result.current.requestAutoSearch();
    expect(startSearch).not.toHaveBeenCalled();

    vi.advanceTimersByTime(DELAY_MS);

    expect(startSearch).toHaveBeenCalledTimes(1);
  });

  it('collapses a burst of keystrokes into a single search', () => {
    const startSearch = vi.fn();
    const { result } = renderHook(() => useAutoSearchDebounce(startSearch, DELAY_MS));

    result.current.requestAutoSearch();
    vi.advanceTimersByTime(DELAY_MS - 1);
    result.current.requestAutoSearch();
    vi.advanceTimersByTime(DELAY_MS - 1);
    result.current.requestAutoSearch();
    vi.advanceTimersByTime(DELAY_MS);

    expect(startSearch).toHaveBeenCalledTimes(1);
  });

  it('drops a pending auto-search when a search starts for another reason', () => {
    const startSearch = vi.fn();
    const { result } = renderHook(() => useAutoSearchDebounce(startSearch, DELAY_MS));

    // The keystroke that armed the timer, then Enter on that same keystroke: the queued
    // auto-search is now redundant and must not re-run the search a moment later.
    result.current.requestAutoSearch();
    result.current.cancelPendingAutoSearch();
    vi.advanceTimersByTime(DELAY_MS);

    expect(startSearch).not.toHaveBeenCalled();
  });

  // THE REGRESSION THIS EXISTS FOR. Deduplication used to be a one-shot "skip the next debounce"
  // flag, cleared only when a debounce actually fired. Every search that started with no timer
  // pending — Enter after the typing settled, a project-switch rerun, the restore-time fallback —
  // left the flag armed, and it then swallowed the user's next keystroke search: typing a new term
  // after a prior search produced no new results at all.
  it('does not swallow the next auto-search when nothing was pending to drop', () => {
    const startSearch = vi.fn();
    const { result } = renderHook(() => useAutoSearchDebounce(startSearch, DELAY_MS));

    result.current.cancelPendingAutoSearch();

    result.current.requestAutoSearch();
    vi.advanceTimersByTime(DELAY_MS);

    expect(startSearch).toHaveBeenCalledTimes(1);
  });

  it('keeps searching after a cancelled request, for as many rounds as the user types', () => {
    const startSearch = vi.fn();
    const { result } = renderHook(() => useAutoSearchDebounce(startSearch, DELAY_MS));

    result.current.requestAutoSearch();
    result.current.cancelPendingAutoSearch();

    result.current.requestAutoSearch();
    vi.advanceTimersByTime(DELAY_MS);
    result.current.requestAutoSearch();
    vi.advanceTimersByTime(DELAY_MS);

    expect(startSearch).toHaveBeenCalledTimes(2);
  });

  it('calls the latest search callback without needing it memoized', () => {
    const firstStartSearch = vi.fn();
    const secondStartSearch = vi.fn();
    const { result, rerender } = renderHook(
      ({ startSearch }: { startSearch: () => void }) =>
        useAutoSearchDebounce(startSearch, DELAY_MS),
      { initialProps: { startSearch: firstStartSearch } },
    );

    result.current.requestAutoSearch();
    rerender({ startSearch: secondStartSearch });
    vi.advanceTimersByTime(DELAY_MS);

    expect(firstStartSearch).not.toHaveBeenCalled();
    expect(secondStartSearch).toHaveBeenCalledTimes(1);
  });

  it('returns stable callbacks so effects listing them do not re-fire', () => {
    const { result, rerender } = renderHook(() => useAutoSearchDebounce(vi.fn(), DELAY_MS));
    const first = result.current;

    rerender();

    expect(result.current.requestAutoSearch).toBe(first.requestAutoSearch);
    expect(result.current.cancelPendingAutoSearch).toBe(first.cancelPendingAutoSearch);
  });

  it('abandons a pending search when the view unmounts', () => {
    const startSearch = vi.fn();
    const { result, unmount } = renderHook(() => useAutoSearchDebounce(startSearch, DELAY_MS));

    result.current.requestAutoSearch();
    unmount();
    vi.advanceTimersByTime(DELAY_MS);

    expect(startSearch).not.toHaveBeenCalled();
  });

  // Production hands this hook a promise-returning function, and `debounce` awaits it — so the
  // shared promise stays open for the whole search-start, and a cancel arriving in that window
  // rejects a search that is already running. Nothing may be suppressed by that: the running search
  // is not the queued one, and the next request must still be able to queue.
  it('leaves an already-running search alone when cancelled mid-flight', async () => {
    let resolveSearch: () => void = () => {};
    const startSearch = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveSearch = resolve;
        }),
    );
    const { result } = renderHook(() => useAutoSearchDebounce(startSearch, DELAY_MS));

    result.current.requestAutoSearch();
    vi.advanceTimersByTime(DELAY_MS);
    expect(startSearch).toHaveBeenCalledTimes(1);

    // The search is in flight; cancelling must not stand it down, and must not poison the next one.
    result.current.cancelPendingAutoSearch();
    resolveSearch();
    await vi.advanceTimersByTimeAsync(0);

    result.current.requestAutoSearch();
    await vi.advanceTimersByTimeAsync(DELAY_MS);

    expect(startSearch).toHaveBeenCalledTimes(2);
  });

  // The hook takes a logger rather than importing `@papi/frontend`, so this asserts the failure is
  // actually reported — an import-shaped logger is `undefined` under the test alias, which would
  // turn every failed search into a TypeError thrown from a catch handler.
  it('reports a search that fails to start, without treating a cancel as a failure', async () => {
    const logger = { warn: vi.fn() };
    const startSearch = vi.fn(() => {
      throw new Error('provider exploded');
    });
    const { result } = renderHook(() => useAutoSearchDebounce(startSearch, DELAY_MS, logger));

    result.current.requestAutoSearch();
    await vi.advanceTimersByTimeAsync(DELAY_MS);

    expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('provider exploded'));

    logger.warn.mockClear();
    result.current.requestAutoSearch();
    result.current.cancelPendingAutoSearch();
    await vi.advanceTimersByTimeAsync(DELAY_MS);

    expect(logger.warn).not.toHaveBeenCalled();
  });
});
