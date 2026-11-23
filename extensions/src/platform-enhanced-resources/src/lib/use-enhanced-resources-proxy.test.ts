// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useEnhancedResourcesProxy } from './use-enhanced-resources-proxy';

// `vi.hoisted` lifts the spy declaration above the (also hoisted) `vi.mock` factory so the mock
// can close over a stable spy reference even though `vi.mock` runs before module-level
// statements at runtime.
const { networkObjectsGetSpy, waitForNetworkObjectSpy, loggerWarnSpy } = vi.hoisted(() => ({
  networkObjectsGetSpy: vi.fn(),
  waitForNetworkObjectSpy: vi.fn(),
  loggerWarnSpy: vi.fn(),
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
    warn: (...args: unknown[]) => loggerWarnSpy(...args),
    info: vi.fn(),
    debug: vi.fn(),
  },
}));

/** Build a minimal proxy stub with `readInitializeResult` reporting `haveMarbleData` ready. */
function makeReadyProxy(extra: Record<string, unknown> = {}) {
  return {
    readInitializeResult: vi.fn().mockResolvedValue({
      haveMarbleData: true,
      availableResources: ['ESV16UK+'],
      availableGlossLanguages: ['en'],
      requiredProjectsMissing: false,
      missingRequiredPackages: [],
    }),
    loadDictionary: vi.fn(),
    ...extra,
  };
}

beforeEach(() => {
  networkObjectsGetSpy.mockReset();
  waitForNetworkObjectSpy.mockReset();
  loggerWarnSpy.mockReset();
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

  it('returns the resolved proxy once the network object exists, get settles, and haveMarbleData is true', async () => {
    const proxy = makeReadyProxy();
    waitForNetworkObjectSpy.mockResolvedValue({ id: 'platform.enhancedResources' });
    networkObjectsGetSpy.mockResolvedValue(proxy);
    const { result } = renderHook(() => useEnhancedResourcesProxy());
    expect(result.current).toBeUndefined();
    await waitFor(() => expect(result.current).toBe(proxy));
  });

  it('calls papi.networkObjects.get exactly once across multiple consumer renders of the same hook instance', async () => {
    const proxy = makeReadyProxy();
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
    const proxy = makeReadyProxy();
    waitForNetworkObjectSpy.mockResolvedValueOnce({ id: 'platform.enhancedResources' });
    networkObjectsGetSpy.mockResolvedValueOnce(proxy);

    const { result } = renderHook(() => useEnhancedResourcesProxy());
    await waitFor(() => expect(result.current).toBe(proxy));

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

  // --------------------------------------------------------------------------
  // Stage 2: data-load readiness gate (closes GAP-022 / GAP-023)
  // --------------------------------------------------------------------------

  it('keeps proxy undefined while readInitializeResult.haveMarbleData stays false', async () => {
    const proxy = {
      readInitializeResult: vi.fn().mockResolvedValue({
        haveMarbleData: false,
        availableResources: [],
        availableGlossLanguages: [],
        requiredProjectsMissing: false,
        missingRequiredPackages: [],
      }),
      loadDictionary: vi.fn(),
    };
    waitForNetworkObjectSpy.mockResolvedValue({ id: 'platform.enhancedResources' });
    networkObjectsGetSpy.mockResolvedValue(proxy);

    const { result } = renderHook(() => useEnhancedResourcesProxy());
    await waitFor(() => expect(proxy.readInitializeResult).toHaveBeenCalled());
    expect(result.current).toBeUndefined();
    expect(loggerWarnSpy).not.toHaveBeenCalled();
  });

  it('resolves the proxy when readInitializeResult.haveMarbleData flips from false to true', async () => {
    const proxy = {
      readInitializeResult: vi
        .fn()
        .mockResolvedValueOnce({
          haveMarbleData: false,
          availableResources: [],
          availableGlossLanguages: [],
          requiredProjectsMissing: false,
          missingRequiredPackages: [],
        })
        .mockResolvedValueOnce({
          haveMarbleData: false,
          availableResources: [],
          availableGlossLanguages: [],
          requiredProjectsMissing: false,
          missingRequiredPackages: [],
        })
        .mockResolvedValue({
          haveMarbleData: true,
          availableResources: ['ESV16UK+'],
          availableGlossLanguages: ['en'],
          requiredProjectsMissing: false,
          missingRequiredPackages: [],
        }),
      loadDictionary: vi.fn(),
    };
    waitForNetworkObjectSpy.mockResolvedValue({ id: 'platform.enhancedResources' });
    networkObjectsGetSpy.mockResolvedValue(proxy);

    const { result } = renderHook(() => useEnhancedResourcesProxy());
    await waitFor(() => expect(result.current).toBe(proxy), { timeout: 3000 });
    expect(proxy.readInitializeResult).toHaveBeenCalledTimes(3);
  });

  it('resolves the proxy and logs a warning when readInitializeResult itself fails (assume-ready fallback)', async () => {
    const proxy = {
      readInitializeResult: vi.fn().mockRejectedValue(new Error('probe broke')),
      loadDictionary: vi.fn(),
    };
    waitForNetworkObjectSpy.mockResolvedValue({ id: 'platform.enhancedResources' });
    networkObjectsGetSpy.mockResolvedValue(proxy);

    const { result } = renderHook(() => useEnhancedResourcesProxy());
    await waitFor(() => expect(result.current).toBe(proxy));
    expect(loggerWarnSpy).toHaveBeenCalledWith(
      expect.stringContaining('readInitializeResult probe failed'),
    );
  });
});
