// @vitest-environment jsdom

import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { usePromise } from './use-promise.hook';

describe('usePromise when the promise factory rejects', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /** A factory that always rejects with {@link rejection} */
  const rejection = new Error('the factory blew up');
  const rejectingFactory = async (): Promise<string> => {
    throw rejection;
  };

  // Nothing else resolves the promise this hook was handed, so a rejection is the end of the wait.
  // Reporting that it is still loading leaves every spinner driven by this hook spinning for the
  // life of the component.
  it('stops reporting that it is loading', async () => {
    const { result } = renderHook(() => usePromise(rejectingFactory, 'default value'));

    await waitFor(() => expect(result.current[1]).toBe(false));
    expect(result.current[0]).toBe('default value');
  });

  it('reports the rejection rather than leaving it to surface as an unhandled rejection', async () => {
    renderHook(() => usePromise(rejectingFactory, 'default value'));

    await waitFor(() =>
      expect(vi.mocked(console.error)).toHaveBeenCalledWith(expect.any(String), rejection),
    );
  });

  // `preserveValue` is about what to show while a promise is running, and this one is over. Wiping
  // the last good value on a failed refresh would blank the UI rather than leave it stale.
  it('leaves a value it had already resolved alone', async () => {
    const resolvingFactory = async () => 'resolved value';
    const { result, rerender } = renderHook(
      ({ factory }: { factory: () => Promise<string> }) => usePromise(factory, 'default value'),
      { initialProps: { factory: resolvingFactory } },
    );
    await waitFor(() => expect(result.current[0]).toBe('resolved value'));

    rerender({ factory: rejectingFactory });

    await waitFor(() => expect(vi.mocked(console.error)).toHaveBeenCalled());
    expect(result.current[0]).toBe('resolved value');
    expect(result.current[1]).toBe(false);
  });
});
