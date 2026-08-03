// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

vi.mock('@papi/frontend', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

// Imported after the mock so the underlying util picks up the mocked logger.
// eslint-disable-next-line import/first
import { useInstallDblResource } from './use-install-dbl-resource.hook';

afterEach(() => {
  vi.clearAllMocks();
});

describe('useInstallDblResource', () => {
  it('installs via the provider and marks resources stale on success', async () => {
    const installDblResource = vi.fn(async () => {});
    const provider = { installDblResource };
    const onInstalled = vi.fn();
    const { result } = renderHook(() =>
      useInstallDblResource(provider, 'model text panel', onInstalled),
    );

    await result.current('uid-a');

    expect(installDblResource).toHaveBeenCalledWith('uid-a');
    expect(onInstalled).toHaveBeenCalledTimes(1);
  });

  it('does not mark resources stale while the provider is unresolved (no-op)', async () => {
    const onInstalled = vi.fn();
    const { result } = renderHook(() =>
      useInstallDblResource(undefined, 'model text panel', onInstalled),
    );

    await result.current('uid-a');

    expect(onInstalled).not.toHaveBeenCalled();
  });

  it('rejects and does not mark resources stale when the install fails', async () => {
    const provider = {
      installDblResource: vi.fn(async () => {
        throw new Error('install boom');
      }),
    };
    const onInstalled = vi.fn();
    const { result } = renderHook(() =>
      useInstallDblResource(provider, 'resource text panel', onInstalled),
    );

    await expect(result.current('uid-a')).rejects.toThrow('install boom');
    expect(onInstalled).not.toHaveBeenCalled();
  });

  it('keeps a stable callback identity while its inputs are unchanged', () => {
    const provider = { installDblResource: vi.fn(async () => {}) };
    const onInstalled = vi.fn();
    const { result, rerender } = renderHook(() =>
      useInstallDblResource(provider, 'model text panel', onInstalled),
    );

    const first = result.current;
    rerender();
    // Stable identity matters: the panels' auto-install effect depends on this callback, so a new
    // identity every render would re-fire it.
    expect(result.current).toBe(first);
  });
});
