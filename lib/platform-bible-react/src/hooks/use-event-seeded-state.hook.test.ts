// @vitest-environment jsdom

import { act, renderHook } from '@testing-library/react';
import type { PlatformEvent } from 'platform-bible-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useEventSeededState } from './use-event-seeded-state.hook';

type Snapshot = { n?: number; busy?: boolean; tag?: string };

const isSnapshot = (value: unknown): value is Snapshot =>
  typeof value === 'object' && !!value && !('nope' in value);

function createFakeEvent() {
  const handlers = new Set<(data: unknown) => void>();
  const event: PlatformEvent<unknown> = (handler) => {
    handlers.add(handler);
    return () => handlers.delete(handler);
  };
  const emit = (data: unknown) => handlers.forEach((handler) => handler(data));
  return { event, emit };
}

function createDeferred<T>() {
  let resolveDeferred!: (value: T) => void;
  let rejectDeferred!: (reason: unknown) => void;
  const promise = new Promise<T>((resolve, reject) => {
    resolveDeferred = resolve;
    rejectDeferred = reject;
  });
  return { promise, resolve: resolveDeferred, reject: rejectDeferred };
}

/** Lets already-resolved promise continuations run without advancing fake timers. */
const flush = () => act(async () => {});

describe('useEventSeededState', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('seeds from read', async () => {
    const read = vi.fn(async () => ({ n: 1 }));
    const { result } = renderHook(() =>
      useEventSeededState({ read, event: undefined, isValid: isSnapshot }),
    );

    await flush();

    expect(result.current.value).toEqual({ n: 1 });
    expect(result.current.hasSeedFailed).toBe(false);
  });

  it('retries a rejecting read then succeeds', async () => {
    const read = vi
      .fn<() => Promise<unknown>>()
      .mockRejectedValueOnce(new Error('not yet'))
      .mockRejectedValueOnce(new Error('not yet'))
      .mockResolvedValue({ n: 3 });
    const { result } = renderHook(() =>
      useEventSeededState({ read, event: undefined, isValid: isSnapshot, seedRetryDelayMs: 500 }),
    );

    await flush();
    expect(read).toHaveBeenCalledTimes(1);
    await act(() => vi.advanceTimersByTimeAsync(500));
    expect(read).toHaveBeenCalledTimes(2);
    await act(() => vi.advanceTimersByTimeAsync(500));

    expect(read).toHaveBeenCalledTimes(3);
    expect(result.current.value).toEqual({ n: 3 });
    expect(result.current.hasSeedFailed).toBe(false);
  });

  it('reports seed failure after retries are exhausted, and an event recovers', async () => {
    const read = vi.fn(async (): Promise<unknown> => {
      throw new Error('down');
    });
    const { event, emit } = createFakeEvent();
    const { result } = renderHook(() =>
      useEventSeededState({
        read,
        event,
        isValid: isSnapshot,
        seedRetries: 2,
        seedRetryDelayMs: 100,
      }),
    );

    await flush();
    await act(() => vi.advanceTimersByTimeAsync(100));
    await act(() => vi.advanceTimersByTimeAsync(100));
    await act(() => vi.advanceTimersByTimeAsync(1000));

    expect(read).toHaveBeenCalledTimes(3);
    expect(result.current.hasSeedFailed).toBe(true);
    expect(result.current.value).toBeUndefined();

    act(() => emit({ n: 5 }));

    expect(result.current.value).toEqual({ n: 5 });
    expect(result.current.hasSeedFailed).toBe(false);
  });

  it('lets an event win over a read that was in flight when it arrived', async () => {
    const deferred = createDeferred<unknown>();
    const read = vi.fn(() => deferred.promise);
    const { event, emit } = createFakeEvent();
    const { result } = renderHook(() => useEventSeededState({ read, event, isValid: isSnapshot }));

    act(() => emit({ n: 2 }));
    await act(async () => deferred.resolve({ n: 1 }));

    expect(result.current.value).toEqual({ n: 2 });
  });

  it('does not report seed failure when an event answered before the last read rejected', async () => {
    const deferred = createDeferred<unknown>();
    const read = vi.fn(() => deferred.promise);
    const { event, emit } = createFakeEvent();
    const { result } = renderHook(() =>
      useEventSeededState({ read, event, isValid: isSnapshot, seedRetries: 0 }),
    );

    act(() => emit({ busy: true }));
    await act(async () => deferred.reject(new Error('down')));

    expect(result.current.value).toEqual({ busy: true });
    expect(result.current.hasSeedFailed).toBe(false);
  });

  it('stops seed retries once an event has answered', async () => {
    const read = vi.fn(async (): Promise<unknown> => {
      throw new Error('down');
    });
    const { event, emit } = createFakeEvent();
    renderHook(() =>
      useEventSeededState({ read, event, isValid: isSnapshot, seedRetryDelayMs: 100 }),
    );

    await flush();
    expect(read).toHaveBeenCalledTimes(1);
    act(() => emit({ n: 1 }));
    await act(() => vi.advanceTimersByTimeAsync(1000));

    expect(read).toHaveBeenCalledTimes(1);
  });

  it('rechecks while shouldRecheck is true and stops when it turns false', async () => {
    const read = vi
      .fn<() => Promise<unknown>>()
      .mockResolvedValueOnce({ busy: true })
      .mockResolvedValue({ busy: false });
    const { result } = renderHook(() =>
      useEventSeededState({
        read,
        event: undefined,
        isValid: isSnapshot,
        recheckIntervalMs: 1000,
        shouldRecheck: (value) => value.busy === true,
      }),
    );

    await flush();
    expect(result.current.value).toEqual({ busy: true });
    expect(read).toHaveBeenCalledTimes(1);

    await act(() => vi.advanceTimersByTimeAsync(1000));
    expect(read).toHaveBeenCalledTimes(2);
    expect(result.current.value).toEqual({ busy: false });

    await act(() => vi.advanceTimersByTimeAsync(5000));
    expect(read).toHaveBeenCalledTimes(2);
  });

  it('drops a recheck result that is older than an event', async () => {
    const recheck = createDeferred<unknown>();
    const read = vi
      .fn<() => Promise<unknown>>()
      .mockResolvedValueOnce({ busy: true })
      .mockReturnValueOnce(recheck.promise);
    const { event, emit } = createFakeEvent();
    const { result } = renderHook(() =>
      useEventSeededState({
        read,
        event,
        isValid: isSnapshot,
        recheckIntervalMs: 1000,
        shouldRecheck: (value) => value.busy === true,
      }),
    );

    await flush();
    await act(() => vi.advanceTimersByTimeAsync(1000));
    expect(read).toHaveBeenCalledTimes(2);
    act(() => emit({ busy: true, tag: 'event' }));
    await act(async () => recheck.resolve({ busy: false }));

    expect(result.current.value).toEqual({ busy: true, tag: 'event' });
  });

  it('ignores invalid payloads from read and from events', async () => {
    const read = vi.fn(async (): Promise<unknown> => ({ nope: 1 }));
    const { event, emit } = createFakeEvent();
    const { result } = renderHook(() => useEventSeededState({ read, event, isValid: isSnapshot }));

    await flush();
    expect(result.current.value).toBeUndefined();

    act(() => emit({ n: 1 }));
    act(() => emit({ nope: 2 }));

    expect(result.current.value).toEqual({ n: 1 });
  });

  it('resets and reads nothing while disabled', async () => {
    const read = vi.fn(async () => ({ n: 1 }));
    const { result, rerender } = renderHook(
      ({ enabled }) =>
        useEventSeededState({ read, event: undefined, isValid: isSnapshot, enabled }),
      { initialProps: { enabled: true } },
    );
    await flush();
    expect(result.current.value).toEqual({ n: 1 });
    expect(read).toHaveBeenCalledTimes(1);

    rerender({ enabled: false });
    await flush();

    expect(result.current.value).toBeUndefined();
    expect(read).toHaveBeenCalledTimes(1);
  });

  it('does not read at all when it starts disabled', async () => {
    const read = vi.fn(async () => ({ n: 1 }));
    renderHook(() =>
      useEventSeededState({ read, event: undefined, isValid: isSnapshot, enabled: false }),
    );

    await flush();
    await act(() => vi.advanceTimersByTimeAsync(10000));

    expect(read).not.toHaveBeenCalled();
  });

  it('cancels pending retries on unmount', async () => {
    const read = vi.fn(async (): Promise<unknown> => {
      throw new Error('down');
    });
    const { unmount } = renderHook(() =>
      useEventSeededState({ read, event: undefined, isValid: isSnapshot, seedRetryDelayMs: 100 }),
    );

    await flush();
    expect(read).toHaveBeenCalledTimes(1);
    unmount();
    await vi.advanceTimersByTimeAsync(1000);

    expect(read).toHaveBeenCalledTimes(1);
  });
});
