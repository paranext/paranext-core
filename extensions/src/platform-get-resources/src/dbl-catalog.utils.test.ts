import { describe, expect, it, vi } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import {
  resolveDblCatalog,
  shouldStopBackgroundFetch,
  type DblCatalogSource,
} from './dbl-catalog.utils';

/*
 * These pin the PRODUCER half of the catalog contract. Every consumer is tested against mocked
 * command results, so without this the one thing nothing verifies is that the backend actually emits
 * the shapes those mocks assume.
 */

const RESOURCE: DblResourceData = {
  dblEntryUid: 'uid-web',
  displayName: 'WEB',
  fullName: 'World English Bible',
  bestLanguageName: 'English',
  type: 'ScriptureResource',
  size: 100,
  installed: false,
  updateAvailable: false,
  projectId: 'proj-web',
};

function makeProvider(overrides: Partial<DblCatalogSource> = {}): DblCatalogSource {
  return {
    isGetDblResourcesAvailable: vi.fn(async () => true),
    getDblResources: vi.fn(async () => [RESOURCE]),
    ...overrides,
  };
}

describe('resolveDblCatalog', () => {
  it('reports the catalog when the provider delivers one', async () => {
    await expect(resolveDblCatalog(makeProvider())).resolves.toEqual({
      status: 'available',
      resources: [RESOURCE],
    });
  });

  // Transient: the provider registers later, so a caller may offer a retry that can actually work.
  it('reports notReady when the provider has not registered yet', async () => {
    await expect(resolveDblCatalog(undefined)).resolves.toEqual({
      status: 'unavailable',
      reason: 'notReady',
    });
  });

  // Permanent for this installation. Callers must not attach a retry to it, so it has to be
  // distinguishable from both notReady and a failure.
  it('reports notConfigured when this installation has no DBL credentials', async () => {
    const provider = makeProvider({ isGetDblResourcesAvailable: vi.fn(async () => false) });

    await expect(resolveDblCatalog(provider)).resolves.toEqual({
      status: 'unavailable',
      reason: 'notConfigured',
    });
    // Asking for the catalog anyway would be a pointless round trip to a backend that cannot answer.
    expect(provider.getDblResources).not.toHaveBeenCalled();
  });

  // The one case that must NOT resolve: an empty answer here means the fetch failed, and resolving
  // it as an empty catalog would tell the user there is nothing to download.
  it('rejects when the provider is configured but produces no catalog', async () => {
    const provider = makeProvider({ getDblResources: vi.fn(async () => undefined) });

    await expect(resolveDblCatalog(provider)).rejects.toThrow();
  });

  it('lets a provider failure reject rather than flattening it into an unavailable result', async () => {
    const provider = makeProvider({
      getDblResources: vi.fn(async () => {
        throw new Error('the backend blew up');
      }),
    });

    await expect(resolveDblCatalog(provider)).rejects.toThrow('the backend blew up');
  });
});

describe('shouldStopBackgroundFetch', () => {
  it('stops once there is a catalog', () => {
    expect(shouldStopBackgroundFetch({ status: 'available', resources: [RESOURCE] })).toBe(true);
  });

  it('stops on an installation that has no DBL credentials, rather than retrying nine more times', () => {
    expect(shouldStopBackgroundFetch({ status: 'unavailable', reason: 'notConfigured' })).toBe(
      true,
    );
  });

  it('keeps retrying while the provider has merely not registered yet', () => {
    expect(shouldStopBackgroundFetch({ status: 'unavailable', reason: 'notReady' })).toBe(false);
  });
});
