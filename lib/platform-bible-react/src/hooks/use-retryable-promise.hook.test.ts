// @vitest-environment jsdom

import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useRetryablePromise } from './use-retryable-promise.hook';

describe('useRetryablePromise', () => {
  beforeEach(() => {
    // `usePromise` logs every rejection it sees; these tests reject on purpose.
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('reports a rejection as an error rather than as an absent value', async () => {
    const factory = vi.fn(async () => {
      throw new Error('the fetch blew up');
    });

    const { result } = renderHook(() => useRetryablePromise(factory));

    await waitFor(() => expect(result.current.hasError).toBe(true));
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
  });

  it('resolves without an error and delivers the value', async () => {
    const factory = vi.fn(async () => 'the catalog');

    const { result } = renderHook(() => useRetryablePromise(factory));

    await waitFor(() => expect(result.current.data).toBe('the catalog'));
    expect(result.current.hasError).toBe(false);
  });

  it('clears the error and re-runs the fetch when refetch is called', async () => {
    let shouldFail = true;
    const factory = vi.fn(async () => {
      if (shouldFail) throw new Error('the fetch blew up');
      return 'the catalog';
    });

    const { result } = renderHook(() => useRetryablePromise(factory));
    await waitFor(() => expect(result.current.hasError).toBe(true));

    shouldFail = false;
    act(() => {
      result.current.refetch();
    });

    await waitFor(() => expect(result.current.data).toBe('the catalog'));
    expect(result.current.hasError).toBe(false);
    expect(factory).toHaveBeenCalledTimes(2);
  });

  // `usePromise`'s own currency flag suppresses only its `setValue`/`setIsLoading`. A superseded
  // invocation still runs to completion, so its success would otherwise clear an error raised by a
  // newer fetch and leave the UI reporting success for a failure the user can still see. This is
  // the one piece of state `usePromise` cannot guard for us.
  it('does not let a superseded fetch clear a newer fetch error', async () => {
    let resolveFirst: (value: string) => void = () => {};
    const firstFetch = new Promise<string>((resolve) => {
      resolveFirst = resolve;
    });
    let callCount = 0;
    const factory = vi.fn(async () => {
      callCount += 1;
      if (callCount === 1) return firstFetch;
      throw new Error('the second fetch blew up');
    });

    const { result } = renderHook(() => useRetryablePromise(factory));
    await waitFor(() => expect(factory).toHaveBeenCalledTimes(1));

    act(() => {
      result.current.refetch();
    });
    await waitFor(() => expect(result.current.hasError).toBe(true));

    await act(async () => {
      resolveFirst('a stale catalog');
      await Promise.resolve();
    });

    expect(result.current.hasError).toBe(true);
  });

  // A changed factory identity supersedes an in-flight fetch exactly as `refetch` does. Guarding
  // only the `refetch` path leaves the guarantee holding for one of the two ways supersession
  // happens, which is worse than no guarantee because the TSDoc states it unconditionally.
  it('does not let a fetch superseded by a new factory clear the newer error', async () => {
    let resolveFirst: (value: string) => void = () => {};
    const firstFactory = vi.fn(
      async () =>
        new Promise<string>((resolve) => {
          resolveFirst = resolve;
        }),
    );
    const secondFactory = vi.fn(async () => {
      throw new Error('the second factory blew up');
    });

    const { result, rerender } = renderHook(
      ({ factory }: { factory: () => Promise<string> }) => useRetryablePromise(factory),
      { initialProps: { factory: firstFactory } },
    );
    await waitFor(() => expect(firstFactory).toHaveBeenCalledTimes(1));

    rerender({ factory: secondFactory });
    await waitFor(() => expect(result.current.hasError).toBe(true));

    await act(async () => {
      resolveFirst('a stale catalog');
      await Promise.resolve();
    });

    expect(result.current.hasError).toBe(true);
  });

  // The generation must be bumped synchronously by `refetch`, not derived from state that lands a
  // render later: in that window an already-superseded fetch still compares equal and can resurrect
  // the very error the retry just cleared.
  it('does not let a fetch that fails after refetch resurrect the cleared error', async () => {
    let rejectFirst: (reason: Error) => void = () => {};
    let callCount = 0;
    const factory = vi.fn(async () => {
      callCount += 1;
      if (callCount === 1)
        return new Promise<string>((_resolve, reject) => {
          rejectFirst = reject;
        });
      return new Promise<string>(() => {});
    });

    const { result } = renderHook(() => useRetryablePromise(factory));
    await waitFor(() => expect(factory).toHaveBeenCalledTimes(1));

    act(() => {
      result.current.refetch();
    });
    expect(result.current.hasError).toBe(false);

    await act(async () => {
      rejectFirst(new Error('the superseded fetch blew up'));
      await Promise.resolve();
    });

    expect(result.current.hasError).toBe(false);
  });

  it('does not report having settled until a fetch actually completes', async () => {
    let resolveFetch: (value: string) => void = () => {};
    const factory = vi.fn(
      async () =>
        new Promise<string>((resolve) => {
          resolveFetch = resolve;
        }),
    );

    const { result } = renderHook(() => useRetryablePromise(factory));

    expect(result.current.hasSettled).toBe(false);

    await act(async () => {
      resolveFetch('the catalog');
      await Promise.resolve();
    });

    expect(result.current.hasSettled).toBe(true);
  });

  // The render between a retry click and the effect that restarts the fetch reports
  // `isLoading: false`, so a caller deriving "finished" from `!isLoading` paints a settled state
  // over a fetch that has not run yet.
  it('stops reporting having settled while a retry is being started', async () => {
    const factory = vi.fn(async () => {
      throw new Error('the fetch blew up');
    });

    const { result } = renderHook(() => useRetryablePromise(factory));
    await waitFor(() => expect(result.current.hasSettled).toBe(true));

    act(() => {
      result.current.refetch();
    });

    expect(result.current.hasSettled).toBe(false);
  });

  it('reports neither loading nor error when there is no fetch to run', () => {
    const { result } = renderHook(() => useRetryablePromise(undefined));

    expect(result.current.isLoading).toBe(false);
    expect(result.current.hasError).toBe(false);
    expect(result.current.data).toBeUndefined();
  });
});
