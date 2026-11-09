// @vitest-environment jsdom

import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCatalogRetryState } from './use-catalog-retry-state.hook';

function renderRetryState(initialHasSettled: boolean) {
  const refetchCatalog = vi.fn();
  const hook = renderHook(
    ({ hasCatalogSettled }: { hasCatalogSettled: boolean }) =>
      useCatalogRetryState(hasCatalogSettled, refetchCatalog),
    { initialProps: { hasCatalogSettled: initialHasSettled } },
  );
  return { ...hook, refetchCatalog };
}

describe('useCatalogRetryState', () => {
  it('is not retrying initially', () => {
    const { result, refetchCatalog } = renderRetryState(true);
    expect(result.current.isRetrying).toBe(false);
    expect(refetchCatalog).not.toHaveBeenCalled();
  });

  it('marks a retry in progress and refetches the catalog', () => {
    const { result, refetchCatalog } = renderRetryState(true);
    act(() => result.current.retry());
    expect(result.current.isRetrying).toBe(true);
    expect(refetchCatalog).toHaveBeenCalledTimes(1);
  });

  it('stays retrying while the refetch has not settled', () => {
    const { result, rerender } = renderRetryState(true);
    act(() => result.current.retry());
    rerender({ hasCatalogSettled: false });
    expect(result.current.isRetrying).toBe(true);
  });

  // The hook cannot tell a successful settle from a failed one; both clear the retry.
  it('clears once the refetch settles', () => {
    const { result, rerender } = renderRetryState(true);
    act(() => result.current.retry());
    rerender({ hasCatalogSettled: false });
    rerender({ hasCatalogSettled: true });
    expect(result.current.isRetrying).toBe(false);
  });

  it('can retry again after a settled retry', () => {
    const { result, rerender, refetchCatalog } = renderRetryState(true);
    act(() => result.current.retry());
    rerender({ hasCatalogSettled: false });
    rerender({ hasCatalogSettled: true });

    act(() => result.current.retry());
    expect(result.current.isRetrying).toBe(true);
    expect(refetchCatalog).toHaveBeenCalledTimes(2);
    rerender({ hasCatalogSettled: false });
    rerender({ hasCatalogSettled: true });
    expect(result.current.isRetrying).toBe(false);
  });
});
