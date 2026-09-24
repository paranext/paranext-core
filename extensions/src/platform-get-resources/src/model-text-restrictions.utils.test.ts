import { afterEach, describe, expect, it, vi } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import type { ModelTextRestrictions } from 'platform-get-resources';
import {
  applyModelTextRestrictions,
  applyModelTextRestrictionsToCatalog,
  createModelTextRestrictionsCache,
} from './model-text-restrictions.utils';

function row(overrides: Partial<DblResourceData>): DblResourceData {
  return {
    dblEntryUid: 'uid',
    displayName: 'Name',
    fullName: 'Full name',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1,
    installed: false,
    updateAvailable: false,
    projectId: '',
    ...overrides,
  };
}

const RESTRICTIONS: ModelTextRestrictions = {
  dblIds: ['a1b2c3d4e5f60718'],
  projectIds: ['NIVUK11'],
};

describe('applyModelTextRestrictions', () => {
  it('restricts a catalog row whose DBL id is on the list, whatever its case', () => {
    const [restricted] = applyModelTextRestrictions(
      [row({ dblEntryUid: 'A1B2C3D4E5F60718' })],
      RESTRICTIONS,
    );

    expect(restricted.isRestrictedAsModelText).toBe(true);
  });

  // An installed text restricted by its copyright statement has no DBL id on the list to match on.
  it('restricts a row whose installed project id is listed, whatever its case', () => {
    const [restricted] = applyModelTextRestrictions(
      [row({ dblEntryUid: 'ffffffffffffffff', projectId: 'nivuk11', installed: true })],
      RESTRICTIONS,
    );

    expect(restricted.isRestrictedAsModelText).toBe(true);
  });

  // Local non-DBL rows carry `dblEntryUid === projectId`, so the project id is the only handle.
  it('restricts a local non-DBL row by its project id', () => {
    const [restricted] = applyModelTextRestrictions(
      [row({ dblEntryUid: 'NIVUK11', projectId: 'NIVUK11', installed: true })],
      RESTRICTIONS,
    );

    expect(restricted.isRestrictedAsModelText).toBe(true);
  });

  it('marks every other row explicitly unrestricted, overriding whatever it carried', () => {
    const [unrestricted] = applyModelTextRestrictions(
      [row({ dblEntryUid: 'ffffffffffffffff', projectId: 'WEB', isRestrictedAsModelText: true })],
      RESTRICTIONS,
    );

    expect(unrestricted.isRestrictedAsModelText).toBe(false);
  });

  // An uninstalled catalog row has an empty project id; an empty entry in the list must not match
  // every such row.
  it('does not match an empty project id against an empty entry in the list', () => {
    const [unrestricted] = applyModelTextRestrictions([row({ projectId: '' })], {
      dblIds: [],
      projectIds: [''],
    });

    expect(unrestricted.isRestrictedAsModelText).toBe(false);
  });

  it('leaves the rows exactly as they were when the restrictions are not known', () => {
    const rows = [row({ isRestrictedAsModelText: true }), row({})];

    expect(applyModelTextRestrictions(rows, undefined)).toBe(rows);
  });
});

describe('applyModelTextRestrictionsToCatalog', () => {
  it('stamps the rows of an available catalog', () => {
    const catalog = applyModelTextRestrictionsToCatalog(
      { status: 'available', resources: [row({ dblEntryUid: 'a1b2c3d4e5f60718' })] },
      RESTRICTIONS,
    );

    expect(catalog.status === 'available' && catalog.resources[0].isRestrictedAsModelText).toBe(
      true,
    );
  });

  it('passes an unavailable catalog through untouched', () => {
    const catalog = { status: 'unavailable', reason: 'notConfigured' } as const;

    expect(applyModelTextRestrictionsToCatalog(catalog, RESTRICTIONS)).toBe(catalog);
  });
});

describe('createModelTextRestrictionsCache', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  /** A fetch whose each call resolves only when the test says so. */
  function makeControlledFetch() {
    const resolvers: ((value: ModelTextRestrictions | undefined) => void)[] = [];
    const fetchRestrictions = vi.fn(
      () =>
        new Promise<ModelTextRestrictions | undefined>((resolve) => {
          resolvers.push(resolve);
        }),
    );
    return {
      fetchRestrictions,
      resolve: (i: number, v?: ModelTextRestrictions) => resolvers[i](v),
    };
  }

  it('shares one fetch between callers that ask while it is in flight', async () => {
    const { fetchRestrictions, resolve } = makeControlledFetch();
    const cache = createModelTextRestrictionsCache(fetchRestrictions);

    const first = cache.ensureLoaded();
    const second = cache.ensureLoaded();
    resolve(0, RESTRICTIONS);

    await expect(first).resolves.toBe(RESTRICTIONS);
    await expect(second).resolves.toBe(RESTRICTIONS);
    expect(fetchRestrictions).toHaveBeenCalledTimes(1);
  });

  it('does not fetch again once the restrictions are known', async () => {
    const fetchRestrictions = vi.fn(async () => RESTRICTIONS);
    const cache = createModelTextRestrictionsCache(fetchRestrictions);

    await cache.ensureLoaded();
    await cache.ensureLoaded();

    expect(fetchRestrictions).toHaveBeenCalledTimes(1);
  });

  it('retries a failed fetch on the next call rather than remembering the failure', async () => {
    const fetchRestrictions = vi
      .fn<() => Promise<ModelTextRestrictions | undefined>>()
      .mockResolvedValueOnce(undefined)
      .mockResolvedValueOnce(RESTRICTIONS);
    const cache = createModelTextRestrictionsCache(fetchRestrictions);

    await expect(cache.ensureLoaded()).resolves.toBeUndefined();
    await expect(cache.ensureLoaded()).resolves.toBe(RESTRICTIONS);
    expect(fetchRestrictions).toHaveBeenCalledTimes(2);
  });

  // A newly installed restricted text is only reported once it is on disk.
  it('fetches afresh on refresh even when the restrictions are already known', async () => {
    const installed: ModelTextRestrictions = { dblIds: [], projectIds: ['NEW'] };
    const fetchRestrictions = vi
      .fn<() => Promise<ModelTextRestrictions | undefined>>()
      .mockResolvedValueOnce(RESTRICTIONS)
      .mockResolvedValueOnce(installed);
    const cache = createModelTextRestrictionsCache(fetchRestrictions);

    await cache.ensureLoaded();

    await expect(cache.refresh()).resolves.toBe(installed);
    await expect(cache.ensureLoaded()).resolves.toBe(installed);
  });

  // The fetch already running may have read the disk before the install that prompted the refresh.
  it('does not let a refresh join a fetch that was already in flight', async () => {
    const { fetchRestrictions, resolve } = makeControlledFetch();
    const cache = createModelTextRestrictionsCache(fetchRestrictions);
    const installed: ModelTextRestrictions = { dblIds: [], projectIds: ['NEW'] };

    const loading = cache.ensureLoaded();
    const refreshed = cache.refresh();
    // Started concurrently, the older fetch could land last and overwrite the newer answer.
    expect(fetchRestrictions).toHaveBeenCalledTimes(1);
    resolve(0, RESTRICTIONS);
    await expect(loading).resolves.toBe(RESTRICTIONS);
    await vi.waitFor(() => expect(fetchRestrictions).toHaveBeenCalledTimes(2));
    resolve(1, installed);

    await expect(refreshed).resolves.toBe(installed);
    await expect(cache.getWithin(0)).resolves.toBe(installed);
  });

  // Failing open would make every restricted text selectable because one refresh failed.
  it('keeps the last known restrictions when a refresh fails', async () => {
    const fetchRestrictions = vi
      .fn<() => Promise<ModelTextRestrictions | undefined>>()
      .mockResolvedValueOnce(RESTRICTIONS)
      .mockResolvedValueOnce(undefined);
    const cache = createModelTextRestrictionsCache(fetchRestrictions);

    await cache.ensureLoaded();

    await expect(cache.refresh()).resolves.toBe(RESTRICTIONS);
    await expect(cache.getWithin(0)).resolves.toBe(RESTRICTIONS);
  });

  describe('sync', () => {
    it('leaves known restrictions alone when local state has not changed', async () => {
      const fetchRestrictions = vi.fn(async () => RESTRICTIONS);
      const cache = createModelTextRestrictionsCache(fetchRestrictions);
      await cache.ensureLoaded();

      await cache.sync(false);

      expect(fetchRestrictions).toHaveBeenCalledTimes(1);
    });

    it('retries a failed first fetch even when local state has not changed', async () => {
      const fetchRestrictions = vi
        .fn<() => Promise<ModelTextRestrictions | undefined>>()
        .mockResolvedValueOnce(undefined)
        .mockResolvedValueOnce(RESTRICTIONS);
      const cache = createModelTextRestrictionsCache(fetchRestrictions);
      await cache.ensureLoaded();

      await expect(cache.sync(false)).resolves.toBe(RESTRICTIONS);
    });

    // After an install, so the newly installed text's project id is covered.
    it('fetches afresh when local state may have changed', async () => {
      const installed: ModelTextRestrictions = { dblIds: [], projectIds: ['NEW'] };
      const fetchRestrictions = vi
        .fn<() => Promise<ModelTextRestrictions | undefined>>()
        .mockResolvedValueOnce(RESTRICTIONS)
        .mockResolvedValueOnce(installed);
      const cache = createModelTextRestrictionsCache(fetchRestrictions);
      await cache.ensureLoaded();

      await expect(cache.sync(true)).resolves.toBe(installed);
    });
  });

  describe('getWithin', () => {
    it('answers from what is known without fetching', async () => {
      const fetchRestrictions = vi.fn(async () => RESTRICTIONS);
      const cache = createModelTextRestrictionsCache(fetchRestrictions);
      await cache.ensureLoaded();

      await expect(cache.getWithin(2000)).resolves.toBe(RESTRICTIONS);
      expect(fetchRestrictions).toHaveBeenCalledTimes(1);
    });

    it('waits for a first fetch that arrives inside the bound', async () => {
      vi.useFakeTimers();
      const { fetchRestrictions, resolve } = makeControlledFetch();
      const cache = createModelTextRestrictionsCache(fetchRestrictions);

      const answer = cache.getWithin(2000);
      await vi.advanceTimersByTimeAsync(1500);
      resolve(0, RESTRICTIONS);

      await expect(answer).resolves.toBe(RESTRICTIONS);
    });

    it('gives up on a first fetch that outlasts the bound, and serves it once it lands', async () => {
      vi.useFakeTimers();
      const { fetchRestrictions, resolve } = makeControlledFetch();
      const cache = createModelTextRestrictionsCache(fetchRestrictions);

      const answer = cache.getWithin(2000);
      await vi.advanceTimersByTimeAsync(2000);
      await expect(answer).resolves.toBeUndefined();

      resolve(0, RESTRICTIONS);
      await expect(cache.getWithin(2000)).resolves.toBe(RESTRICTIONS);
      expect(fetchRestrictions).toHaveBeenCalledTimes(1);
    });
  });
});
