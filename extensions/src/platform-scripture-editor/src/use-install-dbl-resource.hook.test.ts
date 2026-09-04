// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

vi.mock('@papi/frontend', () => ({
  default: { commands: { sendCommand: vi.fn() } },
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

// Both imported after the mock so the hook and the underlying util pick up the mocked papi.
// eslint-disable-next-line import/first
import papi from '@papi/frontend';
// Same reason as the import above; the rule fires once per statement.
// eslint-disable-next-line import/first
import { useInstallDblResource } from './use-install-dbl-resource.hook';

const mockSendCommand = vi.mocked(papi.commands.sendCommand);

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

  it('refreshes the catalog installed flags before marking resources stale', async () => {
    const callOrder: string[] = [];
    mockSendCommand.mockImplementation(async () => {
      callOrder.push('refresh');
      return undefined;
    });
    const provider = { installDblResource: vi.fn(async () => {}) };
    const onInstalled = vi.fn(() => callOrder.push('onInstalled'));
    const { result } = renderHook(() =>
      useInstallDblResource(provider, 'model text panel', onInstalled),
    );

    await result.current('uid-a');

    expect(mockSendCommand).toHaveBeenCalledWith('platformGetResources.refreshInstalledFlags');
    // Order matters: re-resolving first reads the catalog as it was before this install, so the
    // panel would report the resource it just installed as missing.
    expect(callOrder).toEqual(['refresh', 'onInstalled']);
  });

  it('still marks resources stale when the flag refresh fails', async () => {
    mockSendCommand.mockRejectedValue(new Error('refresh boom'));
    const provider = { installDblResource: vi.fn(async () => {}) };
    const onInstalled = vi.fn();
    const { result } = renderHook(() =>
      useInstallDblResource(provider, 'model text panel', onInstalled),
    );

    // The install succeeded, so a failed refresh must not surface as an install failure — the
    // flags just catch up on a later read.
    await expect(result.current('uid-a')).resolves.toBeUndefined();
    expect(onInstalled).toHaveBeenCalledTimes(1);
  });

  it('does not refresh flags or mark resources stale while the provider is unresolved (no-op)', async () => {
    const onInstalled = vi.fn();
    const { result } = renderHook(() =>
      useInstallDblResource(undefined, 'model text panel', onInstalled),
    );

    await result.current('uid-a');

    expect(onInstalled).not.toHaveBeenCalled();
    expect(mockSendCommand).not.toHaveBeenCalled();
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
