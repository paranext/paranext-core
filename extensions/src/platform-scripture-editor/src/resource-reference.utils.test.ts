import { describe, it, expect } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import type { EffectiveResourceReference } from 'platform-scripture';
import { getRefLabel, isSameResource } from './resource-reference.utils';

const dblResources: DblResourceData[] = [
  {
    dblEntryUid: 'uid-web',
    displayName: 'WEB',
    fullName: 'World English Bible',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 1200,
    installed: true,
    updateAvailable: false,
    projectId: 'project-web',
  },
  {
    // A locally-installed non-DBL resource, synthesized by `getLocalNonDblResources` for a project
    // carrying no full name: its `fullName` falls back to the same string as its `displayName`.
    dblEntryUid: 'uid-tnn',
    displayName: 'TNN',
    fullName: 'TNN',
    bestLanguageName: 'English',
    type: 'ScriptureResource',
    size: 340,
    installed: true,
    updateAvailable: false,
    projectId: 'uid-tnn',
  },
];

describe('getRefLabel', () => {
  it('returns "{displayName} - {fullName}" for a DBL reference matched in the resource list', () => {
    const ref: EffectiveResourceReference = {
      type: 'dblResource',
      id: 'uid-web',
      name: 'WEB',
      source: 'admin',
    };
    expect(getRefLabel(ref, dblResources)).toBe('WEB - World English Bible');
  });

  it('returns the short name alone when a DBL resource repeats it as its full name', () => {
    const ref: EffectiveResourceReference = {
      type: 'dblResource',
      id: 'uid-tnn',
      name: 'TNN',
      source: 'admin',
    };
    expect(getRefLabel(ref, dblResources)).toBe('TNN');
  });

  it('falls back to ref.name for a DBL reference not present in the resource list', () => {
    const ref: EffectiveResourceReference = {
      type: 'dblResource',
      id: 'uid-missing',
      name: 'Missing Resource',
      source: 'admin',
    };
    expect(getRefLabel(ref, dblResources)).toBe('Missing Resource');
  });

  it('returns ref.name for a project reference', () => {
    const ref: EffectiveResourceReference = {
      type: 'project',
      id: 'project-123',
      name: 'My Project',
      source: 'user',
    };
    expect(getRefLabel(ref, dblResources)).toBe('My Project');
  });

  it('returns an empty string for a reference type it does not recognize', () => {
    // `useEffectiveResourceReferenceList` currently filters these out before `getRefLabel` sees
    // them, but the type signature still accepts every `ResourceReference` variant — document the
    // intended fallback behavior directly so it can't silently change to something else.
    const ref: EffectiveResourceReference = {
      type: 'enhancedResource',
      name: 'Some Enhanced Resource',
      source: 'admin',
    };
    expect(getRefLabel(ref, dblResources)).toBe('');
  });
});

describe('isSameResource', () => {
  it('matches DBL references whatever the casing of their entry UID', () => {
    expect(
      isSameResource(
        { type: 'dblResource', name: 'BYZ', id: 'UID-BYZ' },
        { type: 'dblResource', name: 'Byzantine', id: 'uid-byz' },
      ),
    ).toBe(true);
  });

  it('matches project references by exact id', () => {
    expect(
      isSameResource(
        { type: 'project', name: 'A', id: 'p1' },
        { type: 'project', name: 'B', id: 'p1' },
      ),
    ).toBe(true);
    expect(
      isSameResource(
        { type: 'project', name: 'A', id: 'p1' },
        { type: 'project', name: 'A', id: 'P1' },
      ),
    ).toBe(false);
  });

  it('never matches references of different kinds, even with the same id', () => {
    expect(
      isSameResource(
        { type: 'dblResource', name: 'X', id: 'x' },
        { type: 'project', name: 'X', id: 'x' },
      ),
    ).toBe(false);
  });
});
