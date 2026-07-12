import { describe, it, expect } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import type { DblResourceReference, ProjectReference } from 'platform-scripture';
import { resolveDblLongName } from './view-options-long-name.utils';

const cached = (over: Partial<DblResourceData> & { dblEntryUid: string }): DblResourceData => ({
  displayName: '',
  fullName: '',
  bestLanguageName: '',
  type: 'ScriptureResource',
  size: 0,
  installed: true,
  updateAvailable: false,
  projectId: '',
  ...over,
});

const dblRef = (id: string, name: string): DblResourceReference => ({
  type: 'dblResource',
  name,
  id,
});
const projectRef = (id: string, name: string): ProjectReference => ({ type: 'project', name, id });

describe('resolveDblLongName', () => {
  it('returns the DBL fullName when a cached entry matches and differs from the short name', () => {
    const list = [
      cached({ dblEntryUid: 'niv', displayName: 'NIV', fullName: 'New International Version' }),
    ];
    expect(resolveDblLongName(dblRef('niv', 'NIV'), list)).toBe('New International Version');
  });

  it('returns undefined for a project reference', () => {
    const list = [cached({ dblEntryUid: 'p1', displayName: 'P1', fullName: 'Project One' })];
    expect(resolveDblLongName(projectRef('p1', 'P1'), list)).toBeUndefined();
  });

  it('returns undefined when no cached entry matches the id', () => {
    expect(resolveDblLongName(dblRef('niv', 'NIV'), [])).toBeUndefined();
  });

  it('returns undefined when the cached fullName is empty', () => {
    const list = [cached({ dblEntryUid: 'niv', displayName: 'NIV', fullName: '' })];
    expect(resolveDblLongName(dblRef('niv', 'NIV'), list)).toBeUndefined();
  });

  it('returns undefined when the fullName equals the short name (no redundant "NIV — NIV")', () => {
    const list = [cached({ dblEntryUid: 'niv', displayName: 'NIV', fullName: 'NIV' })];
    expect(resolveDblLongName(dblRef('niv', 'NIV'), list)).toBeUndefined();
  });
});
