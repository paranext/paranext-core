import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { useProgressiveList } from './resource-picker-dialog.utils';
import { getResourcePickerBodyState } from './resource-picker-dialog.component';

const SETTLED_WITH_ROWS = {
  isResourcesLoading: false,
  hasResourcesError: false,
  hasNoResults: false,
  canClearFiltersHelp: false,
  areDownloadsUnavailable: false,
};

describe('getResourcePickerBodyState', () => {
  it('shows the list when there is something to show', () => {
    expect(getResourcePickerBodyState(SETTLED_WITH_ROWS)).toBe('list');
  });

  it('shows the spinner while the catalog has not settled', () => {
    expect(getResourcePickerBodyState({ ...SETTLED_WITH_ROWS, isResourcesLoading: true })).toBe(
      'loading',
    );
  });

  // A fetch can fail partially — one source of several — and replacing a usable list with an error
  // card throws away resources the user can act on. The `notice` prop explains an incomplete list;
  // the error state is for having nothing to show at all.
  it('keeps the list when a fetch failed but something still loaded', () => {
    expect(getResourcePickerBodyState({ ...SETTLED_WITH_ROWS, hasResourcesError: true })).toBe(
      'list',
    );
  });

  // An empty list caused by a fetch that never arrived is not an answer about the catalog, so the
  // failure outranks the emptiness states the user cannot act on.
  it('reports the failure when nothing loaded and no filter is to blame', () => {
    expect(
      getResourcePickerBodyState({
        isResourcesLoading: false,
        hasResourcesError: true,
        hasNoResults: true,
        canClearFiltersHelp: false,
        areDownloadsUnavailable: true,
      }),
    ).toBe('error');
  });

  it('blames the user own clearable filters before reporting a fetch failure', () => {
    expect(
      getResourcePickerBodyState({
        isResourcesLoading: false,
        hasResourcesError: true,
        hasNoResults: true,
        canClearFiltersHelp: true,
        areDownloadsUnavailable: true,
      }),
    ).toBe('filteredEmpty');
  });

  it('blames clearable filters before anything the user cannot act on', () => {
    expect(
      getResourcePickerBodyState({
        ...SETTLED_WITH_ROWS,
        hasNoResults: true,
        canClearFiltersHelp: true,
        areDownloadsUnavailable: true,
      }),
    ).toBe('filteredEmpty');
  });

  it('explains an installation that cannot download once no filter is to blame', () => {
    expect(
      getResourcePickerBodyState({
        ...SETTLED_WITH_ROWS,
        hasNoResults: true,
        areDownloadsUnavailable: true,
      }),
    ).toBe('downloadsUnavailable');
  });

  it('falls back to the plain empty state for a genuinely empty catalog', () => {
    expect(getResourcePickerBodyState({ ...SETTLED_WITH_ROWS, hasNoResults: true })).toBe('empty');
  });
});

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
