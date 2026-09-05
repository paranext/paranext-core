import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useDeferredDockLayoutRead } from '@renderer/hooks/use-deferred-dock-layout-read.hook';

/** Lets every requested read run: they are deferred to a microtask. */
async function flushDeferredReads() {
  await act(async () => {
    await Promise.resolve();
  });
}

describe('useDeferredDockLayoutRead', () => {
  it('does not read while the caller is still in the event handler', async () => {
    // The whole point: the dock has not adopted its new layout yet at this moment, so a read here
    // would see the layout being changed FROM.
    const read = vi.fn();
    const { result } = renderHook(() => useDeferredDockLayoutRead(read));

    act(() => result.current.requestRead());

    expect(read).not.toHaveBeenCalled();

    await flushDeferredReads();

    expect(read).toHaveBeenCalledOnce();
  });

  it('reads on a microtask, before any macrotask the same tick queued', async () => {
    // Pins the mechanism the docblock argues for, which a bare "it eventually reads" assertion
    // cannot: a microtask is sufficient because rc-dock's `setLayout` assigns `tempLayout`
    // synchronously, and it is what `platform-dock-layout.component.tsx` already uses for the same
    // post-`onLayoutChange` read. A `setTimeout` deferral would fail this — it would run second.
    const order: string[] = [];
    const { result } = renderHook(() => useDeferredDockLayoutRead(() => order.push('read')));

    await act(async () => {
      const macrotaskRan = new Promise<void>((resolve) => {
        setTimeout(() => {
          order.push('macrotask');
          resolve();
        });
      });
      result.current.requestRead();
      await macrotaskRan;
    });

    expect(order).toEqual(['read', 'macrotask']);
  });

  it('collapses a burst of requests into one read', async () => {
    // A buffered network event drains as one synchronous loop, so startup tab restoration requests
    // this once per restored tab. Without coalescing that is one full dock walk each.
    const read = vi.fn();
    const { result } = renderHook(() => useDeferredDockLayoutRead(read));

    act(() => {
      for (let i = 0; i < 10; i += 1) result.current.requestRead();
    });
    await flushDeferredReads();

    expect(read).toHaveBeenCalledOnce();
  });

  it('reads again for a request made after the previous read ran', async () => {
    const read = vi.fn();
    const { result } = renderHook(() => useDeferredDockLayoutRead(read));

    act(() => result.current.requestRead());
    await flushDeferredReads();
    act(() => result.current.requestRead());
    await flushDeferredReads();

    expect(read).toHaveBeenCalledTimes(2);
  });

  it('runs the latest read, not the one captured when the scheduler was created', async () => {
    const staleRead = vi.fn();
    const currentRead = vi.fn();
    const { result, rerender } = renderHook(
      ({ read }: { read: () => void }) => useDeferredDockLayoutRead(read),
      { initialProps: { read: staleRead } },
    );

    rerender({ read: currentRead });
    act(() => result.current.requestRead());
    await flushDeferredReads();

    expect(staleRead).not.toHaveBeenCalled();
    expect(currentRead).toHaveBeenCalledOnce();
  });

  it('keeps one scheduler identity so it cannot churn event subscriptions', () => {
    // Consumers pass `requestRead` straight to `useEvent`; an identity that changed with the read
    // would tear down and rebuild every web view subscription each time the caller's inputs changed.
    const { result, rerender } = renderHook(
      ({ read }: { read: () => void }) => useDeferredDockLayoutRead(read),
      { initialProps: { read: () => {} } },
    );
    const firstScheduler = result.current;

    rerender({ read: () => {} });

    expect(result.current).toBe(firstScheduler);
    expect(result.current.requestRead).toBe(firstScheduler.requestRead);
    expect(result.current.cancelPendingRead).toBe(firstScheduler.cancelPendingRead);
  });

  it('revokes a requested read when the caller cancels before it runs', async () => {
    // For a consumer that has just cleared the value the read would repopulate: without this, the
    // read lands afterwards and puts back a value nothing is listening to correct.
    const read = vi.fn();
    const { result } = renderHook(() => useDeferredDockLayoutRead(read));

    act(() => {
      result.current.requestRead();
      result.current.cancelPendingRead();
    });
    await flushDeferredReads();

    expect(read).not.toHaveBeenCalled();
  });

  it('accepts a new request after a cancel', async () => {
    // Cancelling must not wedge the scheduler for the life of the hook.
    const read = vi.fn();
    const { result } = renderHook(() => useDeferredDockLayoutRead(read));

    act(() => {
      result.current.requestRead();
      result.current.cancelPendingRead();
      result.current.requestRead();
    });
    await flushDeferredReads();

    expect(read).toHaveBeenCalledOnce();
  });

  it('cancels a scheduled read on unmount rather than setting state afterwards', async () => {
    const read = vi.fn();
    const { result, unmount } = renderHook(() => useDeferredDockLayoutRead(read));

    act(() => result.current.requestRead());
    unmount();
    await flushDeferredReads();

    expect(read).not.toHaveBeenCalled();
  });
});
