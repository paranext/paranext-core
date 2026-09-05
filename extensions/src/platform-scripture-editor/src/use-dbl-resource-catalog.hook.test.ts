// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import type { DblResourceData } from 'platform-bible-utils';
import papi from '@papi/frontend';
import { useDblResourceCatalog } from './use-dbl-resource-catalog.hook';

vi.mock('@papi/frontend', () => ({
  default: { commands: { sendCommand: vi.fn() } },
  // `debug` as well as `warn`: the registration probe logs an unanswerable probe at debug, and a
  // mock missing it turns that log line into a TypeError that escapes the probe's own catch.
  logger: { warn: vi.fn(), debug: vi.fn() },
}));

// Typed as a bare `Mock` rather than through `vi.mocked`: the implementation routes by command name
// and so returns a different shape per command, which cannot satisfy `sendCommand`'s generic
// signature (its return type is derived from the command name) without a type assertion.
const mockSendCommand: Mock = vi.mocked(papi.commands.sendCommand);

const RESOURCE: DblResourceData = {
  dblEntryUid: 'uid-web',
  displayName: 'WEB',
  fullName: 'World English Bible',
  bestLanguageName: 'English',
  type: 'ScriptureResource',
  size: 1200,
  installed: true,
  updateAvailable: false,
  projectId: 'project-web',
};

/** A locally-installed non-DBL resource: `dblEntryUid === projectId` marks it as such. */
const LOCAL_RESOURCE: DblResourceData = {
  dblEntryUid: 'VULGP83',
  displayName: 'VULGP83',
  fullName: 'Vulgate 1983',
  bestLanguageName: 'Latin',
  type: 'ScriptureResource',
  size: 0,
  installed: true,
  updateAvailable: false,
  projectId: 'VULGP83',
};

describe('useDblResourceCatalog', () => {
  // The hook issues both fetches together, so the mock routes by command rather than by call
  // order: a test that drives one of them must not depend on which lands first.
  let fetchDblCatalog: () => Promise<DblResourceData[] | undefined>;
  let fetchLocalNonDbl: () => Promise<DblResourceData[]>;
  // Probed only after the DBL half has failed, to tell a missing registration (which a retry can
  // never fix) from a transient failure (which it can). Defaults to registered.
  let isRegistrationValid: () => Promise<boolean>;

  beforeEach(() => {
    vi.clearAllMocks();
    fetchDblCatalog = () => Promise.resolve([]);
    fetchLocalNonDbl = () => Promise.resolve([]);
    isRegistrationValid = () => Promise.resolve(true);
    mockSendCommand.mockImplementation((command: string) => {
      if (command === 'platformGetResources.getLocalNonDblResources') return fetchLocalNonDbl();
      if (command === 'paratextRegistration.doesUserHaveValidRegistration')
        return isRegistrationValid();
      return fetchDblCatalog();
    });
  });

  it('reports a registration failure when the catalog resolves undefined and the user is not registered', async () => {
    // The path a missing registration actually takes: the provider returns early rather than
    // throwing, so the thrown-sentinel check never sees it. Without the probe this state offers a
    // Try again button that can never succeed.
    fetchDblCatalog = () => Promise.resolve(undefined);
    isRegistrationValid = () => Promise.resolve(false);

    const { result } = renderHook(() => useDblResourceCatalog());

    await waitFor(() => expect(result.current.hasRegistrationError).toBe(true));
    expect(result.current.hasCatalogError).toBe(true);
  });

  it('keeps a retryable catalog error when the catalog fails but the user IS registered', async () => {
    fetchDblCatalog = () => Promise.resolve(undefined);

    const { result } = renderHook(() => useDblResourceCatalog());

    await waitFor(() => expect(result.current.hasCatalogError).toBe(true));
    expect(result.current.hasRegistrationError).toBe(false);
  });

  it('treats an unanswerable probe as not-a-registration-problem', async () => {
    // Telling a registered user to register is worse than offering a retry that may work, so only a
    // definitive `false` counts.
    fetchDblCatalog = () => Promise.resolve(undefined);
    isRegistrationValid = () => Promise.reject(new Error('provider not ready'));

    const { result } = renderHook(() => useDblResourceCatalog());

    await waitFor(() => expect(result.current.hasCatalogError).toBe(true));
    expect(result.current.hasRegistrationError).toBe(false);
  });

  it('reports the catalog as ready once the fetch delivers', async () => {
    fetchDblCatalog = () => Promise.resolve([RESOURCE]);

    const { result } = renderHook(() => useDblResourceCatalog());

    await waitFor(() => expect(result.current.isCatalogReady).toBe(true));
    expect(result.current.dblResources).toEqual([RESOURCE]);
    expect(result.current.hasCatalogError).toBe(false);
  });

  it('appends the locally-installed non-DBL resources to the catalog', async () => {
    fetchDblCatalog = () => Promise.resolve([RESOURCE]);
    fetchLocalNonDbl = () => Promise.resolve([LOCAL_RESOURCE]);

    const { result } = renderHook(() => useDblResourceCatalog());

    await waitFor(() => expect(result.current.isCatalogReady).toBe(true));
    expect(result.current.dblResources).toEqual([RESOURCE, LOCAL_RESOURCE]);
  });

  it('still delivers the DBL catalog when the local non-DBL fetch fails', async () => {
    // The local list is supplementary: losing it degrades the panel to DBL-only resources rather
    // than reporting the whole catalog as failed.
    fetchDblCatalog = () => Promise.resolve([RESOURCE]);
    fetchLocalNonDbl = () => Promise.reject(new Error('no projects'));

    const { result } = renderHook(() => useDblResourceCatalog());

    await waitFor(() => expect(result.current.isCatalogReady).toBe(true));
    expect(result.current.dblResources).toEqual([RESOURCE]);
    expect(result.current.hasCatalogError).toBe(false);
  });

  it('reports an error instead of loading forever when the fetch rejects', async () => {
    // `usePromise` has no rejection path, so an uncaught rejection leaves `isLoading` true forever
    // and strands the panel on a spinner it can never leave.
    fetchDblCatalog = () => Promise.reject(new Error('offline'));

    const { result } = renderHook(() => useDblResourceCatalog());

    await waitFor(() => expect(result.current.hasCatalogError).toBe(true));
    expect(result.current.isLoadingResources).toBe(false);
  });

  it('clears the error and re-fetches when asked to refetch', async () => {
    fetchDblCatalog = () => Promise.reject(new Error('offline'));

    const { result } = renderHook(() => useDblResourceCatalog());
    await waitFor(() => expect(result.current.hasCatalogError).toBe(true));

    fetchDblCatalog = () => Promise.resolve([RESOURCE]);
    act(() => result.current.refetchCatalog());

    await waitFor(() => expect(result.current.hasCatalogError).toBe(false));
    await waitFor(() => expect(result.current.dblResources).toEqual([RESOURCE]));
  });

  it('ignores a superseded fetch that resolves late and would clear a real error', async () => {
    // `usePromise`'s own `promiseIsCurrent` flag guards only its `setValue`/`setIsLoading`; a
    // superseded factory invocation still runs to completion and still writes OUR state. Left
    // unguarded, a late-resolving stale fetch clears a genuine error, leaving hasCatalogError
    // false + an empty catalog + isCatalogReady true — which `getResourcePanelReadiness` reads as
    // 'empty'. That is exactly the premature empty state this branch exists to remove.
    let resolveStale: ((value: DblResourceData[]) => void) | undefined;
    fetchDblCatalog = () =>
      new Promise<DblResourceData[]>((resolve) => {
        resolveStale = resolve;
      });

    const { result } = renderHook(() => useDblResourceCatalog());
    await waitFor(() => expect(resolveStale).toBeDefined());

    // A refetch supersedes the in-flight fetch, and the new one fails for real.
    fetchDblCatalog = () => Promise.reject(new Error('offline'));
    act(() => result.current.refetchCatalog());
    await waitFor(() => expect(result.current.hasCatalogError).toBe(true));

    // The superseded fetch now resolves successfully, out of order.
    await act(async () => {
      resolveStale?.([RESOURCE]);
      await Promise.resolve();
    });

    expect(result.current.hasCatalogError).toBe(true);
    // The symptom a panel would actually show: a cleared error plus a defined-but-empty catalog
    // reads as `isCatalogReady`, which `getResourcePanelReadiness` turns into 'empty'.
    expect(result.current.isCatalogReady).toBe(false);
  });
});
