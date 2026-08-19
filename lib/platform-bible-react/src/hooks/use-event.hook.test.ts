import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { PlatformEvent, PlatformEventHandler } from 'platform-bible-utils';
import { useEvent } from './use-event.hook';

/**
 * A controllable synchronous event. Registered handlers are retained even after unsubscription so
 * tests can simulate a provider that emits to a snapshotted handler list racing with
 * unsubscription.
 */
function createControlledEvent<T>({ throwOnUnsubscribe = false } = {}) {
  const registrations: { handler: PlatformEventHandler<T>; unsubscribeCallCount: number }[] = [];

  const event: PlatformEvent<T> = (handler) => {
    const registration = { handler, unsubscribeCallCount: 0 };
    registrations.push(registration);
    return () => {
      registration.unsubscribeCallCount += 1;
      if (throwOnUnsubscribe) throw new Error('unsubscribe failed');
      return true;
    };
  };

  return {
    event,
    emitTo: (index: number, data: T) => registrations[index].handler(data),
    getUnsubscribeCallCount: (index: number) => registrations[index].unsubscribeCallCount,
  };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('useEvent', () => {
  it('delivers emissions to the handler while subscribed', () => {
    const controlled = createControlledEvent<string>();
    const eventHandler = vi.fn();
    renderHook(() => useEvent(controlled.event, eventHandler));

    act(() => controlled.emitTo(0, 'hello'));

    expect(eventHandler).toHaveBeenCalledExactlyOnceWith('hello');
  });

  it('does not deliver an emission that arrives after unmount', () => {
    const controlled = createControlledEvent<string>();
    const eventHandler = vi.fn();
    const { unmount } = renderHook(() => useEvent(controlled.event, eventHandler));

    unmount();
    // Simulate a provider emitting to a snapshotted handler list racing with unsubscription
    controlled.emitTo(0, 'late');

    expect(eventHandler).not.toHaveBeenCalled();
  });

  it('does not deliver from a superseded subscription after the event changes', () => {
    const first = createControlledEvent<string>();
    const second = createControlledEvent<string>();
    const eventHandler = vi.fn();
    const { rerender } = renderHook(
      ({ event }: { event: PlatformEvent<string> }) => useEvent(event, eventHandler),
      { initialProps: { event: first.event } },
    );

    rerender({ event: second.event });

    first.emitTo(0, 'stale');
    expect(eventHandler).not.toHaveBeenCalled();

    act(() => second.emitTo(0, 'fresh'));
    expect(eventHandler).toHaveBeenCalledExactlyOnceWith('fresh');
  });

  it('does not deliver from a superseded subscription after the event handler changes', () => {
    const controlled = createControlledEvent<string>();
    const firstHandler = vi.fn();
    const secondHandler = vi.fn();
    const { rerender } = renderHook(
      ({ eventHandler }: { eventHandler: PlatformEventHandler<string> }) =>
        useEvent(controlled.event, eventHandler),
      { initialProps: { eventHandler: firstHandler } },
    );

    rerender({ eventHandler: secondHandler });

    // A handler identity change resubscribes just like an event change, so a provider still holding
    // the first registration must reach neither the old handler nor the new one
    controlled.emitTo(0, 'stale');
    expect(firstHandler).not.toHaveBeenCalled();
    expect(secondHandler).not.toHaveBeenCalled();
    expect(controlled.getUnsubscribeCallCount(0)).toBe(1);

    act(() => controlled.emitTo(1, 'fresh'));
    expect(secondHandler).toHaveBeenCalledExactlyOnceWith('fresh');
  });

  it('subscribes nothing while the event is undefined, then subscribes once it arrives', () => {
    const controlled = createControlledEvent<string>();
    const eventHandler = vi.fn();
    const initialProps: { event: PlatformEvent<string> | undefined } = { event: undefined };
    const { rerender, unmount } = renderHook(
      ({ event }: { event: PlatformEvent<string> | undefined }) => useEvent(event, eventHandler),
      { initialProps },
    );

    // Tearing down an effect that never subscribed must be a no-op, not a call through a missing
    // unsubscriber
    rerender({ event: controlled.event });

    act(() => controlled.emitTo(0, 'arrived'));
    expect(eventHandler).toHaveBeenCalledExactlyOnceWith('arrived');
    expect(() => unmount()).not.toThrow();
  });

  it('runs the unsubscriber exactly once on unmount', () => {
    const controlled = createControlledEvent<string>();
    const { unmount } = renderHook(() => useEvent(controlled.event, vi.fn()));

    unmount();

    expect(controlled.getUnsubscribeCallCount(0)).toBe(1);
  });

  it('warns instead of throwing when the unsubscriber fails during cleanup', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const controlled = createControlledEvent<string>({ throwOnUnsubscribe: true });
    const { unmount } = renderHook(() => useEvent(controlled.event, vi.fn()));

    expect(() => unmount()).not.toThrow();
    expect(controlled.getUnsubscribeCallCount(0)).toBe(1);
    expect(warn).toHaveBeenCalledOnce();
  });
});
