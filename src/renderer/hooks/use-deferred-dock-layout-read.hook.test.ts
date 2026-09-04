import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useDeferredDockLayoutRead } from '@renderer/hooks/use-deferred-dock-layout-read.hook';

/** Lets every scheduled read run: they are deferred to a macrotask, not a microtask. */
async function flushDeferredReads() {
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve);
    });
  });
}

describe('useDeferredDockLayoutRead', () => {
  it('does not read while the caller is still in the event handler', async () => {
    // The whole point: rc-dock has not committed its new layout yet at this moment, so a read here
    // would see the layout being changed FROM.
    const read = vi.fn();
    const { result } = renderHook(() => useDeferredDockLayoutRead(read));

    act(() => result.current());

    expect(read).not.toHaveBeenCalled();

    await flushDeferredReads();

    expect(read).toHaveBeenCalledOnce();
  });

  it('collapses a burst of requests into one read', async () => {
    // A buffered network event drains as one synchronous loop, so startup tab restoration requests
    // this once per restored tab. Without coalescing that is one full dock walk each.
    const read = vi.fn();
    const { result } = renderHook(() => useDeferredDockLayoutRead(read));

    act(() => {
      for (let i = 0; i < 10; i += 1) result.current();
    });
    await flushDeferredReads();

    expect(read).toHaveBeenCalledOnce();
  });

  it('reads again for a request made after the previous read ran', async () => {
    const read = vi.fn();
    const { result } = renderHook(() => useDeferredDockLayoutRead(read));

    act(() => result.current());
    await flushDeferredReads();
    act(() => result.current());
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
    act(() => result.current());
    await flushDeferredReads();

    expect(staleRead).not.toHaveBeenCalled();
    expect(currentRead).toHaveBeenCalledOnce();
  });

  it('keeps one scheduler identity so it cannot churn event subscriptions', () => {
    // Consumers pass this straight to `useEvent`; an identity that changed with the read would tear
    // down and rebuild every web view subscription each time the caller's inputs changed.
    const { result, rerender } = renderHook(
      ({ read }: { read: () => void }) => useDeferredDockLayoutRead(read),
      { initialProps: { read: () => {} } },
    );
    const firstScheduler = result.current;

    rerender({ read: () => {} });

    expect(result.current).toBe(firstScheduler);
  });

  it('cancels a scheduled read on unmount rather than setting state afterwards', async () => {
    const read = vi.fn();
    const { result, unmount } = renderHook(() => useDeferredDockLayoutRead(read));

    act(() => result.current());
    unmount();
    await flushDeferredReads();

    expect(read).not.toHaveBeenCalled();
  });
});
