import { describe, expect, it } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import { reconcileCachedResources } from './resources-cache.util';

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
      ['ABC123AAAA'],
      { abc123: false },
    );

    expect(resources[0].updateAvailable).toBe(false);
    expect(resources[0].installed).toBe(true);
    expect(isChanged).toBe(true);
  });

  it('sets updateAvailable on an installed resource once the backend reports an update', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [{ ...INSTALLED_WITH_UPDATE, updateAvailable: false }],
      ['ABC123AAAA'],
      { abc123: true },
    );

    expect(resources[0].updateAvailable).toBe(true);
    expect(isChanged).toBe(true);
  });

  it('keeps the cached updateAvailable when the backend reports no status for the resource', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [INSTALLED_WITH_UPDATE],
      ['ABC123AAAA'],
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
      ['ABC123AAAA'],
      {},
    );

    expect(resources[0].updateAvailable).toBe(true);
    expect(isChanged).toBe(false);
  });

  it('keeps the cached updateAvailable when the backend answers only for other resources', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [INSTALLED_WITH_UPDATE],
      ['ABC123AAAA'],
      { somethingElse: false },
    );

    expect(resources[0].updateAvailable).toBe(true);
    expect(isChanged).toBe(false);
  });

  it('clears updateAvailable on a resource installed elsewhere while the backend cannot answer', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [{ ...INSTALLED_WITH_UPDATE, installed: false, projectId: '' }],
      ['ABC123AAAA'],
      {},
    );

    expect(resources[0].installed).toBe(true);
    expect(resources[0].updateAvailable).toBe(false);
    expect(isChanged).toBe(true);
  });

  it('reports no change when the backend agrees with the cache', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [INSTALLED_WITH_UPDATE],
      ['ABC123AAAA'],
      { abc123: true },
    );

    expect(resources[0]).toBe(INSTALLED_WITH_UPDATE);
    expect(isChanged).toBe(false);
  });

  it('marks a resource installed and records its project id when its project appears locally', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [{ ...INSTALLED_WITH_UPDATE, installed: false, projectId: '' }],
      ['ABC123AAAA'],
      { abc123: false },
    );

    expect(resources[0].installed).toBe(true);
    expect(resources[0].projectId).toBe('ABC123AAAA');
    expect(isChanged).toBe(true);
  });

  it('marks a resource uninstalled and clears its project id when its project is gone locally', () => {
    const { resources, isChanged } = reconcileCachedResources([INSTALLED_WITH_UPDATE], [], {
      abc123: true,
    });

    expect(resources[0].installed).toBe(false);
    expect(resources[0].projectId).toBe('');
    expect(isChanged).toBe(true);
  });

  // The backend reports `true` for everything uninstalled, since nothing installed cannot be the
  // newest. `updateAvailable` is only meaningful while installed, so that answer must not survive
  // into the cache.
  it('clears updateAvailable on an uninstall even when the backend reports an update', () => {
    const { resources, isChanged } = reconcileCachedResources([INSTALLED_WITH_UPDATE], [], {
      abc123: true,
    });

    expect(resources[0].installed).toBe(false);
    expect(resources[0].updateAvailable).toBe(false);
    expect(isChanged).toBe(true);
  });

  it('keeps the backend answer on an install, where it is the authoritative fresh value', () => {
    const { resources } = reconcileCachedResources(
      [{ ...INSTALLED_WITH_UPDATE, installed: false, projectId: '', updateAvailable: false }],
      ['ABC123AAAA'],
      { abc123: true },
    );

    expect(resources[0].installed).toBe(true);
    expect(resources[0].updateAvailable).toBe(true);
  });

  it('recovers a missing project id on a resource already cached as installed', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [{ ...INSTALLED_WITH_UPDATE, projectId: '' }],
      ['ABC123AAAA'],
      { abc123: true },
    );

    expect(resources[0].installed).toBe(true);
    expect(resources[0].projectId).toBe('ABC123AAAA');
    expect(isChanged).toBe(true);
  });

  // An empty `dblEntryUid` would otherwise match every local project, because `''.startsWith('')`
  // is true for every string.
  it('does not match a resource with an empty dblEntryUid to an arbitrary local project', () => {
    const { resources } = reconcileCachedResources(
      [{ ...INSTALLED_WITH_UPDATE, dblEntryUid: '', installed: false, projectId: '' }],
      ['ABC123AAAA'],
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
      ['ABC123AAAA', 'DEF456AAAA'],
      { abc123: false, def456: true },
    );

    expect(resources).toHaveLength(2);
    expect(resources[0].updateAvailable).toBe(false);
    expect(resources[1]).toBe(laterUnchanged);
    expect(isChanged).toBe(true);
  });
});
