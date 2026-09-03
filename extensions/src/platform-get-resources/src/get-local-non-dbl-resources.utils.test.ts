import { describe, it, expect } from 'vitest';
import type { DblResourceData } from 'platform-bible-utils';
import {
  buildLocalNonDblResources,
  LOCAL_COMMENTARY_UIDS,
} from './get-local-non-dbl-resources.utils';

/** Minimal DblResourceData for use in the DBL catalog argument. */
function dblEntry(overrides: Partial<DblResourceData> & { dblEntryUid: string }): DblResourceData {
  return {
    displayName: overrides.dblEntryUid,
    fullName: overrides.dblEntryUid,
    bestLanguageName: '',
    type: 'ScriptureResource',
    size: 0,
    installed: true,
    updateAvailable: false,
    projectId: '',
    ...overrides,
  };
}

/** Read-only (non-editable) project metadata — the kind getLocalNonDblResources should include. */
function readOnlyProject(
  id: string,
  extras?: { name?: string; fullName?: string; language?: string },
) {
  return { id, isEditable: false as const, ...extras };
}

/** Editable project metadata — should always be excluded. */
function editableProject(id: string) {
  return { id, isEditable: true as const };
}

describe('buildLocalNonDblResources — filtering', () => {
  it('excludes editable projects', () => {
    expect(buildLocalNonDblResources([editableProject('user-proj')], [])).toHaveLength(0);
  });

  it('excludes projects with isEditable absent (treated as editable per platform convention)', () => {
    expect(buildLocalNonDblResources([{ id: 'ambiguous-proj' }], [])).toHaveLength(0);
  });

  it('includes read-only projects not in the DBL catalog', () => {
    const result = buildLocalNonDblResources([readOnlyProject('local-abc')], []);
    expect(result).toHaveLength(1);
    expect(result[0].projectId).toBe('local-abc');
  });

  it('excludes projects matched by exact projectId in the DBL catalog', () => {
    const result = buildLocalNonDblResources(
      [readOnlyProject('installed-proj-abc')],
      [dblEntry({ dblEntryUid: 'dbl-uid-1', projectId: 'installed-proj-abc', installed: true })],
    );
    expect(result).toHaveLength(0);
  });

  it('excludes projects matched by startsWith(dblEntryUid) when the entry is installed', () => {
    const result = buildLocalNonDblResources(
      [readOnlyProject('72dd0b9b0f2b4024_some_suffix')],
      [dblEntry({ dblEntryUid: '72dd0b9b0f2b4024', projectId: 'installed-proj', installed: true })],
    );
    expect(result).toHaveLength(0);
  });

  it('does NOT exclude via startsWith when the DBL entry is not installed (reassigned UID guard)', () => {
    // A local resource installed under an old UID should not be hidden just because an uninstalled
    // DBL entry has a UID that is a prefix of the local project ID (old UID reassigned to a different
    // resource in the current catalog).
    const result = buildLocalNonDblResources(
      [readOnlyProject('090f7cbf7924b245_old_tnn_suffix')],
      [dblEntry({ dblEntryUid: '090f7cbf7924b245', projectId: '', installed: false })],
    );
    expect(result).toHaveLength(1);
  });

  it('does NOT exclude via startsWith when dblEntryUid is empty string (empty-string guard)', () => {
    // ''.startsWith('') is true for every string, so an empty dblEntryUid must not match anything.
    const result = buildLocalNonDblResources(
      [readOnlyProject('any-local-project')],
      [dblEntry({ dblEntryUid: '', projectId: '', installed: true })],
    );
    expect(result).toHaveLength(1);
  });
});

describe('buildLocalNonDblResources — synthetic entry shape', () => {
  it('sets dblEntryUid === projectId on each entry (non-DBL synthetic marker)', () => {
    const [entry] = buildLocalNonDblResources([readOnlyProject('proj-xyz')], []);
    expect(entry.dblEntryUid).toBe('proj-xyz');
    expect(entry.projectId).toBe('proj-xyz');
    expect(entry.dblEntryUid).toBe(entry.projectId);
  });

  it('always marks entries as installed with size 0 and no update available', () => {
    const [entry] = buildLocalNonDblResources([readOnlyProject('proj-1')], []);
    expect(entry.installed).toBe(true);
    expect(entry.size).toBe(0);
    expect(entry.updateAvailable).toBe(false);
  });

  it('uses name, fullName, and language from metadata', () => {
    const [entry] = buildLocalNonDblResources(
      [readOnlyProject('proj-1', { name: 'Short Name', fullName: 'Full Name', language: 'fra' })],
      [],
    );
    expect(entry.displayName).toBe('Short Name');
    expect(entry.fullName).toBe('Full Name');
    expect(entry.bestLanguageName).toBe('fra');
  });

  it('falls back displayName and fullName to id when name is absent', () => {
    const [entry] = buildLocalNonDblResources([readOnlyProject('proj-fallback')], []);
    expect(entry.displayName).toBe('proj-fallback');
    expect(entry.fullName).toBe('proj-fallback');
  });

  it('falls back fullName to name when fullName is absent', () => {
    const [entry] = buildLocalNonDblResources([readOnlyProject('proj-2', { name: 'Short' })], []);
    expect(entry.fullName).toBe('Short');
  });
});

describe('buildLocalNonDblResources — commentary classification', () => {
  it('classifies TNN (current UID 72dd0b9b0f2b4024) as CommentaryResource', () => {
    const [entry] = buildLocalNonDblResources([readOnlyProject('72dd0b9b0f2b4024_suffix')], []);
    expect(entry.type).toBe('CommentaryResource');
  });

  it('classifies TNN (old UID 090f7cbf7924b245) as CommentaryResource', () => {
    const [entry] = buildLocalNonDblResources([readOnlyProject('090f7cbf7924b245_suffix')], []);
    expect(entry.type).toBe('CommentaryResource');
  });

  it('classifies a resource whose UID is not in the commentary list as ScriptureResource', () => {
    const [entry] = buildLocalNonDblResources([readOnlyProject('abcdef1234567890_vulgp83')], []);
    expect(entry.type).toBe('ScriptureResource');
  });

  it('is case-insensitive when matching commentary UIDs', () => {
    const [entry] = buildLocalNonDblResources([readOnlyProject('72DD0B9B0F2B4024_uppercase')], []);
    expect(entry.type).toBe('CommentaryResource');
  });
});

describe('LOCAL_COMMENTARY_UIDS', () => {
  it('contains the TNN current UID', () => {
    expect(LOCAL_COMMENTARY_UIDS.has('72dd0b9b0f2b4024')).toBe(true);
  });

  it('contains the TNN legacy UID retained for pre-reassignment installs', () => {
    expect(LOCAL_COMMENTARY_UIDS.has('090f7cbf7924b245')).toBe(true);
  });

  it('has exactly 14 entries (13 from C# whitelist + 1 legacy TNN UID)', () => {
    expect(LOCAL_COMMENTARY_UIDS.size).toBe(14);
  });
});
