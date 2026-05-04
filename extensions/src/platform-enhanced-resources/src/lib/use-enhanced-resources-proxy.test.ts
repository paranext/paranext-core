// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useEnhancedResourcesProxy } from './use-enhanced-resources-proxy';

// `vi.hoisted` lifts the spy declaration above the (also hoisted) `vi.mock` factory so the mock
// can close over a stable spy reference even though `vi.mock` runs before module-level
// statements at runtime.
const { networkObjectsGetSpy, onDidCreateNetworkObjectSpy } = vi.hoisted(() => ({
  networkObjectsGetSpy: vi.fn(),
  onDidCreateNetworkObjectSpy: vi.fn(),
}));

vi.mock('@papi/frontend', () => ({
  default: {
    networkObjects: {
      get: (...args: unknown[]) => networkObjectsGetSpy(...args),
      onDidCreateNetworkObject: (...args: unknown[]) => onDidCreateNetworkObjectSpy(...args),
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
  onDidCreateNetworkObjectSpy.mockReset();
  // Default: subscribing returns a no-op unsubscribe; tests can override per-case.
  onDidCreateNetworkObjectSpy.mockImplementation(() => () => {});
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe('useEnhancedResourcesProxy', () => {
  it('returns undefined while the proxy is pending', () => {
    networkObjectsGetSpy.mockImplementation(() => new Promise(() => {})); // never resolves
    const { result } = renderHook(() => useEnhancedResourcesProxy());
    expect(result.current).toBeUndefined();
  });

  it('returns the resolved proxy once papi.networkObjects.get settles', async () => {
    const proxy = { loadDictionary: vi.fn() };
    networkObjectsGetSpy.mockResolvedValue(proxy);
    const { result } = renderHook(() => useEnhancedResourcesProxy());
    expect(result.current).toBeUndefined();
    await waitFor(() => expect(result.current).toBe(proxy));
  });

  it('calls papi.networkObjects.get exactly once across multiple consumer renders of the same hook instance', async () => {
    const proxy = { loadDictionary: vi.fn() };
    networkObjectsGetSpy.mockResolvedValue(proxy);
    const { result, rerender } = renderHook(() => useEnhancedResourcesProxy());
    await waitFor(() => expect(result.current).toBe(proxy));
    rerender();
    rerender();
    rerender();
    expect(networkObjectsGetSpy).toHaveBeenCalledTimes(1);
  });

  it('returns undefined and logs a warning if papi.networkObjects.get rejects', async () => {
    const error = new Error('backend unavailable');
    networkObjectsGetSpy.mockRejectedValue(error);
    const { result } = renderHook(() => useEnhancedResourcesProxy());
    await waitFor(() =>
      expect(networkObjectsGetSpy).toHaveBeenCalledWith('platform.enhancedResources'),
    );
    expect(result.current).toBeUndefined();
  });

  it('subscribes to onDidCreateNetworkObject and resolves the proxy when the ER network object is created later', async () => {
    // First papi.networkObjects.get returns undefined (network object not yet registered).
    networkObjectsGetSpy.mockResolvedValueOnce(undefined);
    // Second get (after the event fires) returns the resolved proxy.
    const proxy = { loadDictionary: vi.fn() };
    networkObjectsGetSpy.mockResolvedValueOnce(proxy);

    let capturedListener: ((details: { id: string }) => void) | undefined;
    onDidCreateNetworkObjectSpy.mockImplementation(
      (listener: (details: { id: string }) => void) => {
        capturedListener = listener;
        return () => {};
      },
    );

    const { result } = renderHook(() => useEnhancedResourcesProxy());

    // First get resolves to undefined - proxy stays undefined; subscription happens.
    await waitFor(() => expect(onDidCreateNetworkObjectSpy).toHaveBeenCalledTimes(1));
    expect(networkObjectsGetSpy).toHaveBeenCalledTimes(1);
    expect(result.current).toBeUndefined();
    expect(capturedListener).toBeDefined();

    // Simulate the ER network object being registered.
    capturedListener?.({ id: 'platform.enhancedResources' });

    // The hook should re-attempt and resolve.
    await waitFor(() => expect(result.current).toBe(proxy));
    expect(networkObjectsGetSpy).toHaveBeenCalledTimes(2);
  });

  it('ignores onDidCreateNetworkObject events for unrelated network objects', async () => {
    networkObjectsGetSpy.mockResolvedValueOnce(undefined);

    let capturedListener: ((details: { id: string }) => void) | undefined;
    onDidCreateNetworkObjectSpy.mockImplementation(
      (listener: (details: { id: string }) => void) => {
        capturedListener = listener;
        return () => {};
      },
    );

    const { result } = renderHook(() => useEnhancedResourcesProxy());
    await waitFor(() => expect(onDidCreateNetworkObjectSpy).toHaveBeenCalledTimes(1));
    expect(networkObjectsGetSpy).toHaveBeenCalledTimes(1);

    // Fire the event for a DIFFERENT network object.
    capturedListener?.({ id: 'someOtherNetworkObject' });

    // Allow microtasks to drain. The hook should NOT have re-attempted.
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 0);
    });
    expect(networkObjectsGetSpy).toHaveBeenCalledTimes(1);
    expect(result.current).toBeUndefined();
  });

  it('does not subscribe if the first get resolves successfully', async () => {
    const proxy = { loadDictionary: vi.fn() };
    networkObjectsGetSpy.mockResolvedValueOnce(proxy);

    const { result } = renderHook(() => useEnhancedResourcesProxy());
    await waitFor(() => expect(result.current).toBe(proxy));
    // No subscription needed because we resolved on first attempt.
    expect(onDidCreateNetworkObjectSpy).not.toHaveBeenCalled();
  });

  it('unsubscribes on unmount when subscription was active', async () => {
    networkObjectsGetSpy.mockResolvedValueOnce(undefined);
    const unsubSpy = vi.fn();
    onDidCreateNetworkObjectSpy.mockImplementation(() => unsubSpy);

    const { unmount } = renderHook(() => useEnhancedResourcesProxy());
    await waitFor(() => expect(onDidCreateNetworkObjectSpy).toHaveBeenCalledTimes(1));

    unmount();
    expect(unsubSpy).toHaveBeenCalledTimes(1);
  });
});
