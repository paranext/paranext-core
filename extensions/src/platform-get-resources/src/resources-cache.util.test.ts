import { describe, expect, it } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import { reconcileCachedResources } from './resources-cache.util';

/** Registration has settled, so a project missing from the list really is gone. */
const SETTLED = { canTrustAbsence: true };
/** Project factories may still be registering, so a missing project proves nothing. */
const STILL_REGISTERING = { canTrustAbsence: false };

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
      SETTLED,
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
      SETTLED,
    );

    expect(resources[0].updateAvailable).toBe(true);
    expect(isChanged).toBe(true);
  });

  it('keeps the cached updateAvailable when the backend reports no status for the resource', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [INSTALLED_WITH_UPDATE],
      ['ABC123AAAA'],
      undefined,
      SETTLED,
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
      SETTLED,
    );

    expect(resources[0].updateAvailable).toBe(true);
    expect(isChanged).toBe(false);
  });

  it('keeps the cached updateAvailable when the backend answers only for other resources', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [INSTALLED_WITH_UPDATE],
      ['ABC123AAAA'],
      { somethingElse: false },
      SETTLED,
    );

    expect(resources[0].updateAvailable).toBe(true);
    expect(isChanged).toBe(false);
  });

  it('clears updateAvailable on a resource installed elsewhere while the backend cannot answer', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [{ ...INSTALLED_WITH_UPDATE, installed: false, projectId: '' }],
      ['ABC123AAAA'],
      {},
      SETTLED,
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
      SETTLED,
    );

    expect(resources[0]).toBe(INSTALLED_WITH_UPDATE);
    expect(isChanged).toBe(false);
  });

  it('marks a resource installed and records its project id when its project appears locally', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [{ ...INSTALLED_WITH_UPDATE, installed: false, projectId: '' }],
      ['ABC123AAAA'],
      { abc123: false },
      SETTLED,
    );

    expect(resources[0].installed).toBe(true);
    expect(resources[0].projectId).toBe('ABC123AAAA');
    expect(isChanged).toBe(true);
  });

  it('marks a resource uninstalled and clears its project id when its project is gone locally', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [INSTALLED_WITH_UPDATE],
      [],
      {
        abc123: true,
      },
      SETTLED,
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
      [],
      {
        abc123: true,
      },
      SETTLED,
    );

    expect(resources[0].installed).toBe(false);
    expect(resources[0].updateAvailable).toBe(false);
    expect(isChanged).toBe(true);
  });

  it('keeps the backend answer on an install, where it is the authoritative fresh value', () => {
    const { resources } = reconcileCachedResources(
      [{ ...INSTALLED_WITH_UPDATE, installed: false, projectId: '', updateAvailable: false }],
      ['ABC123AAAA'],
      { abc123: true },
      SETTLED,
    );

    expect(resources[0].installed).toBe(true);
    expect(resources[0].updateAvailable).toBe(true);
  });

  it('recovers a missing project id on a resource already cached as installed', () => {
    const { resources, isChanged } = reconcileCachedResources(
      [{ ...INSTALLED_WITH_UPDATE, projectId: '' }],
      ['ABC123AAAA'],
      { abc123: true },
      SETTLED,
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
      SETTLED,
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
      SETTLED,
    );

    expect(resources).toHaveLength(2);
    expect(resources[0].updateAvailable).toBe(false);
    expect(resources[1]).toBe(laterUnchanged);
    expect(isChanged).toBe(true);
  });

  it('leaves an installed resource alone while its project may not have registered yet', () => {
    // A catalog whose flags C# read live, checked against a list that has registered one of its
    // two projects: rewriting the other as uninstalled would persist the very flag this avoids.
    const notYetRegistered = {
      ...INSTALLED_WITH_UPDATE,
      dblEntryUid: 'def456',
      projectId: 'DEF456BBBB',
    };
    const cached = [INSTALLED_WITH_UPDATE, notYetRegistered];

    const early = reconcileCachedResources(cached, ['ABC123AAAA'], undefined, STILL_REGISTERING);
    expect(early.resources[1]).toBe(notYetRegistered);
    expect(early.isChanged).toBe(false);

    // Positive control: once the list has settled, the same absence does downgrade the row.
    const settled = reconcileCachedResources(cached, ['ABC123AAAA'], undefined, SETTLED);
    expect(settled.resources[1]).toMatchObject({ installed: false, projectId: '' });
  });

  it('downgrades the resource the caller changed even while projects may be registering', () => {
    // A resource the user just removed is missing because it is gone, not because it is late, and
    // the caller that removed it says so. Every other row keeps the benefit of the doubt.
    const justRemoved = {
      ...INSTALLED_WITH_UPDATE,
      dblEntryUid: 'def456',
      projectId: 'DEF456BBBB',
    };
    const stillRegistering = {
      ...INSTALLED_WITH_UPDATE,
      dblEntryUid: 'ghi789',
      projectId: 'GHI789CCCC',
    };

    const { resources, isChanged } = reconcileCachedResources(
      [justRemoved, stillRegistering],
      [],
      undefined,
      { ...STILL_REGISTERING, trustAbsenceFor: 'def456' },
    );

    expect(resources[0]).toMatchObject({ installed: false, projectId: '' });
    expect(resources[1]).toBe(stillRegistering);
    expect(isChanged).toBe(true);
  });

  it('still applies the backend update status to a row whose project may be registering', () => {
    // Holding back the `installed` downgrade holds back that flag and the project id, nothing else.
    // Dropping the whole row would discard a backend answer the caller paid a round trip for.
    const { resources, isChanged } = reconcileCachedResources(
      [{ ...INSTALLED_WITH_UPDATE, updateAvailable: false }],
      [],
      { abc123: true },
      STILL_REGISTERING,
    );

    expect(resources[0]).toMatchObject({
      installed: true,
      projectId: 'ABC123AAAA',
      updateAvailable: true,
    });
    expect(isChanged).toBe(true);
  });

  it('still marks a resource installed while projects may still be registering', () => {
    // Presence is proof whenever it shows up, so a poisoned flag is corrected at the first chance.
    const { resources } = reconcileCachedResources(
      [{ ...INSTALLED_WITH_UPDATE, installed: false, projectId: '' }],
      ['ABC123AAAA'],
      { abc123: false },
      STILL_REGISTERING,
    );

    expect(resources[0]).toMatchObject({ installed: true, projectId: 'ABC123AAAA' });
  });
});
