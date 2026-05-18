import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useProgressiveList } from './resource-picker-dialog.utils';

type IOCallback = (entries: Partial<IntersectionObserverEntry>[]) => void;
let ioCallback: IOCallback;
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
  vi.stubGlobal(
    'IntersectionObserver',
    vi.fn((cb: IOCallback) => {
      ioCallback = cb;
      return { observe: mockObserve, disconnect: mockDisconnect };
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.clearAllMocks();
});

const makeItems = (count: number) => Array.from({ length: count }, (_, i) => i);

describe('useProgressiveList', () => {
  it('returns the first pageSize items initially and reports hasMore', () => {
    const items = makeItems(120);
    const { result } = renderHook(() => useProgressiveList(items, 50));

    expect(result.current.visibleItems).toHaveLength(50);
    expect(result.current.visibleItems[0]).toBe(0);
    expect(result.current.visibleItems[49]).toBe(49);
    expect(result.current.hasMore).toBe(true);
  });

  it('appends the next page when the sentinel intersects', () => {
    const items = makeItems(120);
    const { result } = renderHook(() => useProgressiveList(items, 50));

    act(() => {
      ioCallback([{ isIntersecting: true }]);
    });

    expect(result.current.visibleItems).toHaveLength(100);
    expect(result.current.hasMore).toBe(true);
  });

  it('resets to the first page when the items array reference changes', () => {
    const first = makeItems(120);
    const { result, rerender } = renderHook(({ items }) => useProgressiveList(items, 50), {
      initialProps: { items: first },
    });

    // Scroll to page 2
    act(() => {
      ioCallback([{ isIntersecting: true }]);
    });
    expect(result.current.visibleItems).toHaveLength(100);

    // Simulate a filter change — new array reference
    const second = makeItems(80);
    rerender({ items: second });

    expect(result.current.visibleItems).toHaveLength(50);
  });

  it('sets hasMore to false and caps visibleItems at items.length when list is small', () => {
    const items = makeItems(20);
    const { result } = renderHook(() => useProgressiveList(items, 50));

    expect(result.current.visibleItems).toHaveLength(20);
    expect(result.current.hasMore).toBe(false);
  });

  it('does not advance the page when the sentinel fires with isIntersecting false', () => {
    const items = makeItems(120);
    const { result } = renderHook(() => useProgressiveList(items, 50));

    act(() => {
      ioCallback([{ isIntersecting: false }]);
    });

    expect(result.current.visibleItems).toHaveLength(50);
  });
});
