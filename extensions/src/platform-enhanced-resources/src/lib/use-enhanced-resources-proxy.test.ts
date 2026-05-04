// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useEnhancedResourcesProxy } from './use-enhanced-resources-proxy';

// `vi.hoisted` lifts the spy declaration above the (also hoisted) `vi.mock` factory so the mock
// can close over a stable spy reference even though `vi.mock` runs before module-level
// statements at runtime.
const { networkObjectsGetSpy, waitForNetworkObjectSpy } = vi.hoisted(() => ({
  networkObjectsGetSpy: vi.fn(),
  waitForNetworkObjectSpy: vi.fn(),
}));

vi.mock('@papi/frontend', () => ({
  default: {
    networkObjects: {
      get: (...args: unknown[]) => networkObjectsGetSpy(...args),
    },
    networkObjectStatus: {
      waitForNetworkObject: (...args: unknown[]) => waitForNetworkObjectSpy(...args),
    },
  },
  logger: {
    warn: vi.fn(),
    info: vi.fn(),
    debug: vi.fn(),
  },
}));

beforeEach(() => {
  networkObjectsGetSpy.mockReset();
  waitForNetworkObjectSpy.mockReset();
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('useEnhancedResourcesProxy', () => {
  it('returns undefined while the proxy is pending', () => {
    waitForNetworkObjectSpy.mockReturnValue(new Promise(() => {})); // never resolves
    const { result } = renderHook(() => useEnhancedResourcesProxy());
    expect(result.current).toBeUndefined();
  });

  it('returns the resolved proxy once the network object exists and get settles', async () => {
    const proxy = { loadDictionary: vi.fn() };
    waitForNetworkObjectSpy.mockResolvedValue({ id: 'platform.enhancedResources' });
    networkObjectsGetSpy.mockResolvedValue(proxy);
    const { result } = renderHook(() => useEnhancedResourcesProxy());
    expect(result.current).toBeUndefined();
    await waitFor(() => expect(result.current).toBe(proxy));
  });

  it('calls papi.networkObjects.get exactly once across multiple consumer renders of the same hook instance', async () => {
    const proxy = { loadDictionary: vi.fn() };
    waitForNetworkObjectSpy.mockResolvedValue({ id: 'platform.enhancedResources' });
    networkObjectsGetSpy.mockResolvedValue(proxy);
    const { result, rerender } = renderHook(() => useEnhancedResourcesProxy());
    await waitFor(() => expect(result.current).toBe(proxy));
    rerender();
    rerender();
    rerender();
    expect(networkObjectsGetSpy).toHaveBeenCalledTimes(1);
  });

  it('returns undefined and logs a warning if get rejects', async () => {
    waitForNetworkObjectSpy.mockResolvedValue({ id: 'platform.enhancedResources' });
    networkObjectsGetSpy.mockRejectedValue(new Error('backend unavailable'));
    const { result } = renderHook(() => useEnhancedResourcesProxy());
    await waitFor(() =>
      expect(networkObjectsGetSpy).toHaveBeenCalledWith('platform.enhancedResources'),
    );
    expect(result.current).toBeUndefined();
  });

  it('waits for the ER network object to exist before calling get', async () => {
    const proxy = { loadDictionary: vi.fn() };
    // waitForNetworkObject resolves once the network object is "available"
    waitForNetworkObjectSpy.mockResolvedValueOnce({ id: 'platform.enhancedResources' });
    networkObjectsGetSpy.mockResolvedValueOnce(proxy);

    const { result } = renderHook(() => useEnhancedResourcesProxy());
    await waitFor(() => expect(result.current).toBe(proxy));

    // Confirms call ordering: waitForNetworkObject must be called before get.
    expect(waitForNetworkObjectSpy).toHaveBeenCalledWith({ id: 'platform.enhancedResources' });
    expect(networkObjectsGetSpy).toHaveBeenCalledWith('platform.enhancedResources');
  });

  it('returns undefined and logs a warning if waitForNetworkObject rejects', async () => {
    waitForNetworkObjectSpy.mockRejectedValueOnce(new Error('timeout'));
    const { result } = renderHook(() => useEnhancedResourcesProxy());
    await waitFor(() => expect(waitForNetworkObjectSpy).toHaveBeenCalled());
    // Get should NOT have been called - we bailed out at the wait step.
    expect(networkObjectsGetSpy).not.toHaveBeenCalled();
    expect(result.current).toBeUndefined();
  });

  it('returns undefined if waitForNetworkObject resolves but get returns undefined (defensive)', async () => {
    waitForNetworkObjectSpy.mockResolvedValueOnce({ id: 'platform.enhancedResources' });
    networkObjectsGetSpy.mockResolvedValueOnce(undefined);
    const { result } = renderHook(() => useEnhancedResourcesProxy());
    await waitFor(() => expect(networkObjectsGetSpy).toHaveBeenCalled());
    expect(result.current).toBeUndefined();
  });
});
