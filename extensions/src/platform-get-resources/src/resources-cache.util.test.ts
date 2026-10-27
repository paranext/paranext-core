import { describe, expect, it } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import { parsePersistedCatalog, reconcileCachedResources } from './resources-cache.util';

const INSTALLED_WITH_UPDATE: DblResourceData = {
  dblEntryUid: 'abc123',
  displayName: 'WEB',
  fullName: 'World English Bible',
  bestLanguageName: 'English',
  type: 'ScriptureResource',
  size: 100,
  installed: true,
  updateAvailable: true,
  projectId: 'ABC123AAAA',
};

describe('reconcileCachedResources', () => {
  it('clears updateAvailable on an installed resource once the backend reports no update', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [INSTALLED_WITH_UPDATE],
      { abc123: 'ABC123AAAA' },
      { abc123: false },
    );

    expect(resources[0].updateAvailable).toBe(false);
    expect(resources[0].installed).toBe(true);
    expect(isChanged).toBe(true);
  });

  it('sets updateAvailable on an installed resource once the backend reports an update', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [{ ...INSTALLED_WITH_UPDATE, updateAvailable: false }],
      { abc123: 'ABC123AAAA' },
      { abc123: true },
    );

    expect(resources[0].updateAvailable).toBe(true);
    expect(isChanged).toBe(true);
  });

  it('keeps the cached updateAvailable when the backend reports no status for the resource', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [INSTALLED_WITH_UPDATE],
      { abc123: 'ABC123AAAA' },
      undefined,
    );

    expect(resources[0].updateAvailable).toBe(true);
    expect(isChanged).toBe(false);
  });

  // The backend returns an empty map — never `undefined` — when it cannot answer: the catalog has
  // not loaded yet this session, or another DBL operation holds its gate past the timeout.
  it('keeps the cached updateAvailable when the backend returns an empty status map', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [INSTALLED_WITH_UPDATE],
      { abc123: 'ABC123AAAA' },
      {},
    );

    expect(resources[0].updateAvailable).toBe(true);
    expect(isChanged).toBe(false);
  });

  it('keeps the cached updateAvailable when the backend answers only for other resources', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [INSTALLED_WITH_UPDATE],
      { abc123: 'ABC123AAAA' },
      { somethingElse: false },
    );

    expect(resources[0].updateAvailable).toBe(true);
    expect(isChanged).toBe(false);
  });

  it('clears updateAvailable on a resource installed elsewhere while the backend cannot answer', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [{ ...INSTALLED_WITH_UPDATE, installed: false, projectId: '' }],
      { abc123: 'ABC123AAAA' },
      {},
    );

    expect(resources[0].installed).toBe(true);
    expect(resources[0].updateAvailable).toBe(false);
    expect(isChanged).toBe(true);
  });

  it('reports no change when the backend agrees with the cache', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [INSTALLED_WITH_UPDATE],
      { abc123: 'ABC123AAAA' },
      { abc123: true },
    );

    expect(resources[0]).toBe(INSTALLED_WITH_UPDATE);
    expect(isChanged).toBe(false);
  });

  it('marks a resource installed and records its project id when its project appears locally', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [{ ...INSTALLED_WITH_UPDATE, installed: false, projectId: '' }],
      { abc123: 'ABC123AAAA' },
      { abc123: false },
    );

    expect(resources[0].installed).toBe(true);
    expect(resources[0].projectId).toBe('ABC123AAAA');
    expect(isChanged).toBe(true);
  });

  it('marks a resource uninstalled and clears its project id when its project is gone locally', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [INSTALLED_WITH_UPDATE],
      { abc123: '' },
      {
        abc123: true,
      },
    );

    expect(resources[0].installed).toBe(false);
    expect(resources[0].projectId).toBe('');
    expect(isChanged).toBe(true);
  });

  // The backend reports `true` for everything uninstalled, since nothing installed cannot be the
  // newest. `updateAvailable` is only meaningful while installed, so that answer must not survive
  // into the cache.
  it('clears updateAvailable on an uninstall even when the backend reports an update', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [INSTALLED_WITH_UPDATE],
      { abc123: '' },
      {
        abc123: true,
      },
    );

    expect(resources[0].installed).toBe(false);
    expect(resources[0].updateAvailable).toBe(false);
    expect(isChanged).toBe(true);
  });

  it('keeps the backend answer on an install, where it is the authoritative fresh value', () => {
    const { resources } = reconcileCachedResources(
      [{ ...INSTALLED_WITH_UPDATE, installed: false, projectId: '', updateAvailable: false }],
      { abc123: 'ABC123AAAA' },
      { abc123: true },
    );

    expect(resources[0].installed).toBe(true);
    expect(resources[0].updateAvailable).toBe(true);
  });

  it('recovers a missing project id on a resource already cached as installed', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [{ ...INSTALLED_WITH_UPDATE, projectId: '' }],
      { abc123: 'ABC123AAAA' },
      { abc123: true },
    );

    expect(resources[0].installed).toBe(true);
    expect(resources[0].projectId).toBe('ABC123AAAA');
    expect(isChanged).toBe(true);
  });

  // These maps are deserialized JSON and so carry `Object.prototype`. A uid spelling an inherited
  // member resolves to a function rather than `undefined`, which an `=== undefined` guard reads as
  // "the backend reported on this row" — marking it installed with a function for its project id,
  // and persisting that. Uids are hex today, so this pins the contract by construction.
  it('treats a uid that names an inherited object member as unreported', () => {
    const row = { ...INSTALLED_WITH_UPDATE, dblEntryUid: 'toString', installed: true };

    const { resources, isChanged } = reconcileCachedResources([row], {}, undefined);

    expect(resources[0]).toBe(row);
    expect(isChanged).toBe(false);
  });

  it('does not take an inherited member as an update-status answer', () => {
    const row = { ...INSTALLED_WITH_UPDATE, dblEntryUid: 'constructor', updateAvailable: true };

    const { resources } = reconcileCachedResources([row], { constructor: 'ABC123AAAA' }, {});

    expect(resources[0].updateAvailable).toBe(true);
  });

  // The contract the whole reconcile rests on. The backend reports an empty string for a resource
  // it knows is not installed, and omits a uid entirely when it has nothing to say — offline, or
  // when its project scan could not read every project. Treating those the same way would mark an
  // installed resource not-installed and persist it.
  it('leaves a row absent from the install status exactly as it was', () => {
    const installedRow = { ...INSTALLED_WITH_UPDATE, installed: true, projectId: 'ABC123AAAA' };

    const { resources, isChanged } = reconcileCachedResources([installedRow], {}, undefined);

    expect(resources[0]).toBe(installedRow);
    expect(isChanged).toBe(false);
  });

  it('clears a row the install status reports as an empty string', () => {
    const installedRow = { ...INSTALLED_WITH_UPDATE, installed: true, projectId: 'ABC123AAAA' };

    const { resources, isChanged } = reconcileCachedResources(
      [installedRow],
      { abc123: '' },
      undefined,
    );

    expect(resources[0].installed).toBe(false);
    expect(resources[0].projectId).toBe('');
    expect(isChanged).toBe(true);
  });

  // An empty `dblEntryUid` cannot be a key the backend reported on, so the row is simply absent
  // from the status map and left alone — the same path any unreported row takes. It had to be
  // guarded explicitly when the match was `localProjectId.startsWith(dblEntryUid)`, since
  // `''.startsWith('')` is true for every string.
  it('leaves a resource with an empty dblEntryUid alone rather than matching it to a project', () => {
    const { resources } = reconcileCachedResources(
      [{ ...INSTALLED_WITH_UPDATE, dblEntryUid: '', installed: false, projectId: '' }],
      { abc123: 'ABC123AAAA' },
      {},
    );

    expect(resources[0].installed).toBe(false);
    expect(resources[0].projectId).toBe('');
  });

  // `isChanged` is a latch over the whole list, not a per-entry verdict. A per-entry assignment
  // would be last-entry-wins, and `main.ts` would skip the cache rewrite whenever an earlier
  // resource changed and a later one did not — reproducing the stale-flag bug for anyone with more
  // than one resource.
  it('reports a change when an earlier resource changes and a later one does not', () => {
    const laterUnchanged: DblResourceData = {
      ...INSTALLED_WITH_UPDATE,
      dblEntryUid: 'def456',
      displayName: 'ASV',
      projectId: 'DEF456AAAA',
    };

    const { resources, isChanged } = reconcileCachedResources(
      [INSTALLED_WITH_UPDATE, laterUnchanged],
      { abc123: 'ABC123AAAA', def456: 'DEF456AAAA' },
      { abc123: false, def456: true },
    );

    expect(resources).toHaveLength(2);
    expect(resources[0].updateAvailable).toBe(false);
    expect(resources[1]).toBe(laterUnchanged);
    expect(isChanged).toBe(true);
  });
});

describe('parsePersistedCatalog', () => {
  const ROW: DblResourceData = {
    dblEntryUid: 'uid-1',
    displayName: 'WEB',
    fullName: 'World English Bible',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1,
    installed: true,
    updateAvailable: false,
    projectId: 'PROJ1',
  };

  it('returns the persisted rows', () => {
    expect(parsePersistedCatalog(JSON.stringify([ROW]))).toEqual([ROW]);
  });

  it.each([
    ['nothing stored', undefined],
    ['an empty string', ''],
    ['a non-string', 42],
    ['malformed JSON', '[{'],
    ['a non-array', '{"a":1}'],
  ])('returns undefined for %s', (_label, persisted) => {
    expect(parsePersistedCatalog(persisted)).toBeUndefined();
  });

  it('discards an empty persisted catalog', () => {
    expect(parsePersistedCatalog('[]')).toBeUndefined();
  });
});
