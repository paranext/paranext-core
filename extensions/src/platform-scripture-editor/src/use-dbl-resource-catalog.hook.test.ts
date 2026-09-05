// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import type { DblResourceCatalog } from 'platform-get-resources';
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
  let fetchDblCatalog: () => Promise<DblResourceCatalog>;
  let fetchLocalNonDbl: () => Promise<DblResourceData[]>;
  // Probed only after the DBL half has failed, to tell a missing registration (which a retry can
  // never fix) from a transient failure (which it can). Defaults to registered.
  let isRegistrationValid: () => Promise<boolean>;

  beforeEach(() => {
    vi.clearAllMocks();
    fetchDblCatalog = () => Promise.resolve({ status: 'available', resources: [] });
    fetchLocalNonDbl = () => Promise.resolve([]);
    isRegistrationValid = () => Promise.resolve(true);
    mockSendCommand.mockImplementation((command: string) => {
      if (command === 'platformGetResources.getLocalNonDblResources') return fetchLocalNonDbl();
      if (command === 'paratextRegistration.doesUserHaveValidRegistration')
        return isRegistrationValid();
      return fetchDblCatalog();
    });
  });

  it('reports a registration failure when the catalog is not configured and the user is not registered', async () => {
    // The path a missing registration actually takes: the provider answers `notConfigured` rather
    // than throwing, so the thrown-sentinel check never sees it. Without the probe the no-project
    // panel offers a pick prompt whose picker can never be populated.
    fetchDblCatalog = () => Promise.resolve({ status: 'unavailable', reason: 'notConfigured' });
    isRegistrationValid = () => Promise.resolve(false);

    const { result } = renderHook(() => useDblResourceCatalog());

    await waitFor(() => expect(result.current.hasRegistrationError).toBe(true));
    // Still not a retryable failure: no retry can change a missing registration.
    expect(result.current.hasCatalogError).toBe(false);
  });

  it('does not report a registration failure for a provider that is only not ready yet', async () => {
    // `notReady` is transient and a retry works, so it must keep its retry even for an unregistered
    // user — the registration question only arises once the provider can answer at all.
    fetchDblCatalog = () => Promise.resolve({ status: 'unavailable', reason: 'notReady' });
    isRegistrationValid = () => Promise.resolve(false);

    const { result } = renderHook(() => useDblResourceCatalog());

    await waitFor(() => expect(result.current.hasCatalogError).toBe(true));
    expect(result.current.hasRegistrationError).toBe(false);
  });

  it('treats an unanswerable probe as not-a-registration-problem', async () => {
    // Telling a registered user to register is worse than offering nothing to do, so only a
    // definitive `false` counts.
    fetchDblCatalog = () => Promise.resolve({ status: 'unavailable', reason: 'notConfigured' });
    isRegistrationValid = () => Promise.reject(new Error('provider not ready'));

    const { result } = renderHook(() => useDblResourceCatalog());

    await waitFor(() => expect(result.current.isCatalogReady).toBe(true));
    expect(mockSendCommand).toHaveBeenCalledWith('paratextRegistration.doesUserHaveValidRegistration');
    expect(result.current.hasRegistrationError).toBe(false);
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
