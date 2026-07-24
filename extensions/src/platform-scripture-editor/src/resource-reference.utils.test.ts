import { describe, it, expect } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import type { EffectiveResourceReference } from 'platform-scripture';
import { getRefLabel } from './resource-reference.utils';

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
];

describe('getRefLabel', () => {
  it('returns "{fullName} ({displayName})" for a DBL reference matched in the resource list', () => {
    const ref: EffectiveResourceReference = {
      type: 'dblResource',
      id: 'uid-web',
      name: 'WEB',
      source: 'admin',
    };
    expect(getRefLabel(ref, dblResources)).toBe('World English Bible (WEB)');
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
