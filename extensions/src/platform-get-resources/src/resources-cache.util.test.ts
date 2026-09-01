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
});
