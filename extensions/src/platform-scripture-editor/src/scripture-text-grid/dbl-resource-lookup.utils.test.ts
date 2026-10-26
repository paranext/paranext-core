import { describe, it, expect } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import type { DblResourceReference } from 'platform-scripture';
import { findCachedDblResource, isSameDblEntryUid } from './dbl-resource-lookup.utils';

const cached = (over: Partial<DblResourceData> & { dblEntryUid: string }): DblResourceData => ({
  displayName: '',
  fullName: '',
  bestLanguageName: '',
  type: 'ScriptureResource',
  projectId: '',
  installed: true,
  size: 0,
  updateAvailable: false,
  ...over,
});

const dblRef = (id: string): DblResourceReference => ({ type: 'dblResource', name: 'x', id });

describe('findCachedDblResource', () => {
  it('returns the entry whose dblEntryUid matches the reference id', () => {
    const entry = cached({ dblEntryUid: 'niv', fullName: 'New International Version' });
    expect(findCachedDblResource(dblRef('niv'), [cached({ dblEntryUid: 'esv' }), entry])).toBe(
      entry,
    );
  });

  it('returns undefined when no cached entry matches', () => {
    expect(findCachedDblResource(dblRef('niv'), [cached({ dblEntryUid: 'esv' })])).toBeUndefined();
  });

  it('matches a uid that differs only in case', () => {
    const entry = cached({ dblEntryUid: 'ABCDEF0123456789' });
    expect(findCachedDblResource(dblRef('abcdef0123456789'), [entry])).toBe(entry);
  });
});

describe('isSameDblEntryUid', () => {
  it('ignores case', () => {
    expect(isSameDblEntryUid('ABCdef', 'abcDEF')).toBe(true);
  });

  it('rejects different uids', () => {
    expect(isSameDblEntryUid('abc', 'abd')).toBe(false);
  });
});
