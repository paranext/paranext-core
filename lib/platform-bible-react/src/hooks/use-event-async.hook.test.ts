import { act, renderHook } from '@testing-library/react';
import { StrictMode } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PlatformEventAsync, PlatformEventHandler, UnsubscriberAsync } from 'platform-bible-utils';
import { useEventAsync } from './use-event-async.hook';

/**
 * A controllable asynchronous event for exercising subscribe/teardown races.
 *
 * Registered handlers are retained even after their subscription is torn down so tests can simulate
 * a provider that emits to a handler after (or racing with) unsubscription — the exact situation
 * the hook must guard against. The subscribe promise for each registration resolves only when the
 * test calls {@link ControlledAsyncEvent.resolveSubscribe}, so tests control whether cleanup happens
 * before or after the subscription finishes being established.
 */
interface ControlledAsyncEvent<T> {
  event: PlatformEventAsync<T>;
  /** Resolves the `index`th registration's subscribe promise with a counting unsubscriber */
  resolveSubscribe: (index: number) => void;
  /** Rejects the `index`th registration's subscribe promise */
  rejectSubscribe: (index: number, error: Error) => void;
  /** Emits `data` to the `index`th registration's handler, even if it was unsubscribed */
  emitTo: (index: number, data: T) => void;
  /** How many times the `index`th registration's unsubscriber has run */
  getUnsubscribeCallCount: (index: number) => number;
  /** How many registrations the event has received */
  getSubscribeCount: () => number;
}

function createControlledAsyncEvent<T>({
  unsubscriberFactory,
}: {
  /** Overrides the unsubscriber a registration resolves with (default: counting success) */
  unsubscriberFactory?: (countCall: () => void) => UnsubscriberAsync;
} = {}): ControlledAsyncEvent<T> {
  const registrations: {
    handler: PlatformEventHandler<T>;
    resolve: (unsubscriber: UnsubscriberAsync) => void;
    reject: (error: Error) => void;
    unsubscribeCallCount: number;
  }[] = [];

  return {
    event: (handler) =>
      new Promise<UnsubscriberAsync>((resolve, reject) => {
        registrations.push({ handler, resolve, reject, unsubscribeCallCount: 0 });
      }),
    resolveSubscribe: (index) => {
      const registration = registrations[index];
      const countCall = () => {
        registration.unsubscribeCallCount += 1;
      };
      registration.resolve(
        unsubscriberFactory
          ? unsubscriberFactory(countCall)
          : async () => {
              countCall();
              return true;
            },
      );
    },
    rejectSubscribe: (index, error) => registrations[index].reject(error),
    emitTo: (index, data) => registrations[index].handler(data),
    getUnsubscribeCallCount: (index) => registrations[index].unsubscribeCallCount,
    getSubscribeCount: () => registrations.length,
  };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useEventAsync', () => {
  it('delivers emissions to the handler while subscribed', async () => {
    const controlled = createControlledAsyncEvent<string>();
    const eventHandler = vi.fn();
    renderHook(() => useEventAsync(controlled.event, eventHandler));

    await act(async () => controlled.resolveSubscribe(0));
    act(() => controlled.emitTo(0, 'hello'));

    expect(eventHandler).toHaveBeenCalledExactlyOnceWith('hello');
  });

  it('does not deliver an emission that arrives after unmount', async () => {
    const controlled = createControlledAsyncEvent<string>();
    const eventHandler = vi.fn();
    const { unmount } = renderHook(() => useEventAsync(controlled.event, eventHandler));

    await act(async () => controlled.resolveSubscribe(0));
    unmount();
    // Simulate a provider whose emission races with (or ignores) the unsubscription
    controlled.emitTo(0, 'late');

    expect(eventHandler).not.toHaveBeenCalled();
  });

  it('does not deliver from a superseded subscription after the event changes', async () => {
    const first = createControlledAsyncEvent<string>();
    const second = createControlledAsyncEvent<string>();
    const eventHandler = vi.fn();
    const { rerender } = renderHook(
      ({ event }: { event: PlatformEventAsync<string> }) => useEventAsync(event, eventHandler),
      { initialProps: { event: first.event } },
    );

    await act(async () => first.resolveSubscribe(0));
    rerender({ event: second.event });
    await act(async () => second.resolveSubscribe(0));

    // The old subscription's handler firing late must not reach the event handler...
    first.emitTo(0, 'stale');
    expect(eventHandler).not.toHaveBeenCalled();

    // ...while the current subscription still delivers.
    act(() => second.emitTo(0, 'fresh'));
    expect(eventHandler).toHaveBeenCalledExactlyOnceWith('fresh');
  });

  it('does not deliver from a superseded subscription after the event handler changes', async () => {
    const controlled = createControlledAsyncEvent<string>();
    const firstHandler = vi.fn();
    const secondHandler = vi.fn();
    const { rerender } = renderHook(
      ({ eventHandler }: { eventHandler: PlatformEventHandler<string> }) =>
        useEventAsync(controlled.event, eventHandler),
      { initialProps: { eventHandler: firstHandler } },
    );
    await act(async () => controlled.resolveSubscribe(0));

    rerender({ eventHandler: secondHandler });
    await act(async () => controlled.resolveSubscribe(1));

    // A handler identity change resubscribes just like an event change, so an emission the first
    // subscription still delivers must reach neither handler
    controlled.emitTo(0, 'stale');
    expect(firstHandler).not.toHaveBeenCalled();
    expect(secondHandler).not.toHaveBeenCalled();
    expect(controlled.getUnsubscribeCallCount(0)).toBe(1);

    act(() => controlled.emitTo(1, 'fresh'));
    expect(secondHandler).toHaveBeenCalledExactlyOnceWith('fresh');
  });

  it('subscribes nothing while the event is undefined, then subscribes once it arrives', async () => {
    const controlled = createControlledAsyncEvent<string>();
    const eventHandler = vi.fn();
    const initialProps: { event: PlatformEventAsync<string> | undefined } = { event: undefined };
    const { rerender, unmount } = renderHook(
      ({ event }: { event: PlatformEventAsync<string> | undefined }) =>
        useEventAsync(event, eventHandler),
      { initialProps },
    );

    expect(controlled.getSubscribeCount()).toBe(0);

    // Re-running the effect tears down the never-subscribed one first; that must be a no-op rather
    // than a call through a missing unsubscriber
    expect(() => rerender({ event: controlled.event })).not.toThrow();
    expect(controlled.getSubscribeCount()).toBe(1);

    await act(async () => controlled.resolveSubscribe(0));

    act(() => controlled.emitTo(0, 'arrived'));
    expect(eventHandler).toHaveBeenCalledExactlyOnceWith('arrived');
    expect(() => unmount()).not.toThrow();
  });

  it('unsubscribes a subscription whose subscribe resolves only after cleanup (no leak)', async () => {
    const controlled = createControlledAsyncEvent<string>();
    const { unmount } = renderHook(() => useEventAsync(controlled.event, vi.fn()));

    // Cleanup runs while the subscribe promise is still pending...
    unmount();
    // ...then the subscription finishes being established. It must be torn down immediately.
    await act(async () => controlled.resolveSubscribe(0));

    expect(controlled.getUnsubscribeCallCount(0)).toBe(1);
  });

  it('runs the unsubscriber exactly once when cleanup happens after subscribe resolved', async () => {
    const controlled = createControlledAsyncEvent<string>();
    const { unmount } = renderHook(() => useEventAsync(controlled.event, vi.fn()));

    await act(async () => controlled.resolveSubscribe(0));
    unmount();
    // Flush the async unsubscribe path
    await act(async () => {});

    expect(controlled.getUnsubscribeCallCount(0)).toBe(1);
  });

  it('logs instead of throwing when subscribing fails', async () => {
    const logError = vi.spyOn(console, 'error').mockImplementation(() => {});
    // A subscribe failure surfaces asynchronously, so escaping as an unhandled rejection is the
    // async shape of "throwing" — nothing in an effect could ever catch it.
    const subscribeError = new Error('subscribe failed');
    // Both listeners below are process-global within the vitest worker, so anything else running
    // concurrently could land in them. Every assertion therefore matches on THIS error rather than
    // counting events, so a neighboring test's rejection or log cannot fail this one.
    const escapedRejections: unknown[] = [];
    const recordRejection = (reason: unknown) => {
      escapedRejections.push(reason);
    };
    process.on('unhandledRejection', recordRejection);

    try {
      const controlled = createControlledAsyncEvent<string>();
      const { unmount } = renderHook(() => useEventAsync(controlled.event, vi.fn()));

      const failedSubscribe = act(async () => {
        controlled.rejectSubscribe(0, subscribeError);
      });

      // The failure must settle quietly rather than reject the render pass...
      await expect(failedSubscribe).resolves.toBeUndefined();
      // ...and tearing down a subscription that never got established must not throw either.
      expect(() => unmount()).not.toThrow();

      // Node reports unhandled rejections on the next macrotask, once the microtask queue drains.
      await new Promise((resolve) => {
        setTimeout(resolve, 0);
      });

      expect(escapedRejections).not.toContain(subscribeError);
      expect(logError).toHaveBeenCalledWith(
        'useEventAsync: error while subscribing to event',
        subscribeError,
      );
    } finally {
      process.off('unhandledRejection', recordRejection);
    }
  });

  it('logs instead of throwing when the unsubscriber fails', async () => {
    const logError = vi.spyOn(console, 'error').mockImplementation(() => {});
    const controlled = createControlledAsyncEvent<string>({
      unsubscriberFactory: (countCall) => async () => {
        countCall();
        throw new Error('unsubscribe failed');
      },
    });
    const { unmount } = renderHook(() => useEventAsync(controlled.event, vi.fn()));

    await act(async () => controlled.resolveSubscribe(0));
    unmount();
    await act(async () => {});

    expect(controlled.getUnsubscribeCallCount(0)).toBe(1);
    // Match on this error rather than counting calls: the spy is process-global within the worker
    expect(logError).toHaveBeenCalledWith(
      'useEventAsync: error while unsubscribing from event',
      expect.objectContaining({ message: 'unsubscribe failed' }),
    );
  });

  it('delivers exactly once per emission and leaks nothing under StrictMode double-mounting', async () => {
    const controlled = createControlledAsyncEvent<string>();
    const eventHandler = vi.fn();
    renderHook(() => useEventAsync(controlled.event, eventHandler), { wrapper: StrictMode });

    // StrictMode mounts, cleans up, and remounts: two registrations, the first already superseded
    expect(controlled.getSubscribeCount()).toBe(2);
    await act(async () => {
      controlled.resolveSubscribe(0);
      controlled.resolveSubscribe(1);
    });

    // The superseded first subscription must be torn down and silent
    expect(controlled.getUnsubscribeCallCount(0)).toBe(1);
    controlled.emitTo(0, 'stale');
    expect(eventHandler).not.toHaveBeenCalled();

    // The live second subscription delivers normally
    act(() => controlled.emitTo(1, 'fresh'));
    expect(eventHandler).toHaveBeenCalledExactlyOnceWith('fresh');
  });
});
