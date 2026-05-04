// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useEnhancedResourcesProxy } from './use-enhanced-resources-proxy';

// `vi.hoisted` lifts the spy declaration above the (also hoisted) `vi.mock` factory so the mock
// can close over a stable spy reference even though `vi.mock` runs before module-level
// statements at runtime.
const { networkObjectsGetSpy } = vi.hoisted(() => ({ networkObjectsGetSpy: vi.fn() }));

vi.mock('@papi/frontend', () => ({
  default: {
    networkObjects: {
      get: (...args: unknown[]) => networkObjectsGetSpy(...args),
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
});
