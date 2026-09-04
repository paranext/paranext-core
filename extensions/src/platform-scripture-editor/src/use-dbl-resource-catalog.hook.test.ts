// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import type { DblResourceCatalog } from 'platform-get-resources';
import type { DblResourceData } from 'platform-bible-utils';
import papi from '@papi/frontend';
import { useDblResourceCatalog } from './use-dbl-resource-catalog.hook';

vi.mock('@papi/frontend', () => ({
  default: { commands: { sendCommand: vi.fn() } },
  logger: { warn: vi.fn() },
}));

const mockSendCommand = vi.mocked(papi.commands.sendCommand);

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
  let fetchDblCatalog: () => Promise<DblResourceCatalog>;
  let fetchLocalNonDbl: () => Promise<DblResourceData[]>;

  beforeEach(() => {
    vi.clearAllMocks();
    fetchDblCatalog = () => Promise.resolve({ status: 'available', resources: [] });
    fetchLocalNonDbl = () => Promise.resolve([]);
    mockSendCommand.mockImplementation((command: string) =>
      command === 'platformGetResources.getLocalNonDblResources'
        ? fetchLocalNonDbl()
        : fetchDblCatalog(),
    );
  });

  it('reports the catalog as ready once the fetch delivers', async () => {
    fetchDblCatalog = () => Promise.resolve({ status: 'available', resources: [RESOURCE] });

    const { result } = renderHook(() => useDblResourceCatalog());

    await waitFor(() => expect(result.current.isCatalogReady).toBe(true));
    expect(result.current.dblResources).toEqual([RESOURCE]);
    expect(result.current.hasCatalogError).toBe(false);
  });

  it('appends the locally-installed non-DBL resources to the catalog', async () => {
    fetchDblCatalog = () => Promise.resolve({ status: 'available', resources: [RESOURCE] });
    fetchLocalNonDbl = () => Promise.resolve([LOCAL_RESOURCE]);

    const { result } = renderHook(() => useDblResourceCatalog());

    await waitFor(() => expect(result.current.isCatalogReady).toBe(true));
    expect(result.current.dblResources).toEqual([RESOURCE, LOCAL_RESOURCE]);
  });

  it('still delivers the DBL catalog when the local non-DBL fetch fails', async () => {
    // The local list is supplementary: losing it degrades the panel to DBL-only resources rather
    // than reporting the whole catalog as failed.
    fetchDblCatalog = () => Promise.resolve({ status: 'available', resources: [RESOURCE] });
    fetchLocalNonDbl = () => Promise.reject(new Error('no projects'));

    const { result } = renderHook(() => useDblResourceCatalog());

    await waitFor(() => expect(result.current.isCatalogReady).toBe(true));
    expect(result.current.dblResources).toEqual([RESOURCE]);
    expect(result.current.hasCatalogError).toBe(false);
  });

  // A build with no DBL credentials has ARRIVED at its answer: there is no catalog and there never
  // will be one. Treating that as an error strands the panel behind a retry that cannot work, in
  // the most common real-world case — DBL credentials live in studio, not core.
  it('reports a delivered, error-free catalog when this build cannot download DBL resources', async () => {
    fetchDblCatalog = () => Promise.resolve({ status: 'unavailable', reason: 'notConfigured' });
    fetchLocalNonDbl = () => Promise.resolve([LOCAL_RESOURCE]);

    const { result } = renderHook(() => useDblResourceCatalog());

    await waitFor(() => expect(result.current.isCatalogReady).toBe(true));
    expect(result.current.hasCatalogError).toBe(false);
    // The locally-installed rows are the only resources such a user has, so they still show.
    expect(result.current.dblResources).toEqual([LOCAL_RESOURCE]);
  });

  // The opposite of `notConfigured`: the DBL provider registers in the BACKGROUND, so the catalog
  // is still coming and a retry genuinely works. Delivering it as an empty catalog would tell a
  // panel that a project's configured resources are gone — and would let
  // `canPublishResourcePanelProjectIds` publish an empty navigable-project-id list over a correct
  // persisted one.
  it('reports an error, not a delivered empty catalog, when the provider is not registered yet', async () => {
    fetchDblCatalog = () => Promise.resolve({ status: 'unavailable', reason: 'notReady' });

    const { result } = renderHook(() => useDblResourceCatalog());

    await waitFor(() => expect(result.current.hasCatalogError).toBe(true));
    expect(result.current.isCatalogReady).toBe(false);
    expect(result.current.isLoadingResources).toBe(false);
  });

  it('recovers from a not-registered-yet catalog when the retry finds the provider', async () => {
    fetchDblCatalog = () => Promise.resolve({ status: 'unavailable', reason: 'notReady' });

    const { result } = renderHook(() => useDblResourceCatalog());
    await waitFor(() => expect(result.current.hasCatalogError).toBe(true));

    fetchDblCatalog = () => Promise.resolve({ status: 'available', resources: [RESOURCE] });
    act(() => result.current.refetchCatalog());

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

    fetchDblCatalog = () => Promise.resolve({ status: 'available', resources: [RESOURCE] });
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
    let resolveStale: ((value: DblResourceCatalog) => void) | undefined;
    fetchDblCatalog = () =>
      new Promise<DblResourceCatalog>((resolve) => {
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
      resolveStale?.({ status: 'available', resources: [RESOURCE] });
      await Promise.resolve();
    });

    expect(result.current.hasCatalogError).toBe(true);
    // The symptom a panel would actually show: a cleared error plus a defined-but-empty catalog
    // reads as `isCatalogReady`, which `getResourcePanelReadiness` turns into 'empty'.
    expect(result.current.isCatalogReady).toBe(false);
  });
});
