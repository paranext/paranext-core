import { describe, expect, it } from 'vitest';
import { doesCatalogRowCoverProject, type DblResourceData } from './resources.model';

const row = (overrides: Partial<DblResourceData>): DblResourceData => ({
  dblEntryUid: '',
  displayName: '',
  fullName: '',
  bestLanguageName: '',
  type: 'ScriptureResource',
  size: 0,
  installed: false,
  updateAvailable: false,
  projectId: '',
  ...overrides,
});

describe('doesCatalogRowCoverProject', () => {
  it('covers a project it names exactly', () => {
    expect(
      doesCatalogRowCoverProject(row({ installed: true, projectId: 'ABC123' }), 'ABC123'),
    ).toBe(true);
  });

  it('covers a project by exact id even while the row is not flagged installed', () => {
    // The flag can lag an install; the id is the stronger evidence. Both call sites must agree on
    // this, or one treats the project as covered while the other looks for a row and finds none.
    expect(
      doesCatalogRowCoverProject(row({ installed: false, projectId: 'ABC123' }), 'ABC123'),
    ).toBe(true);
  });

  it("covers a project whose id begins with the row's DBL entry UID", () => {
    expect(
      doesCatalogRowCoverProject(
        row({ installed: true, dblEntryUid: 'aabbccdd', projectId: 'AABBCCDDEE99' }),
        'AABBCCDDEE99',
      ),
    ).toBe(true);
  });

  it('matches the UID prefix case-insensitively', () => {
    expect(
      doesCatalogRowCoverProject(row({ installed: true, dblEntryUid: 'AABBCCDD' }), 'aabbccddee99'),
    ).toBe(true);
  });

  it('covers nothing when the row has never been reconciled against disk', () => {
    // A never-synced row is `installed: false, projectId: ''`, and `''.startsWith('')` is true for
    // every string. Trusting it would let a stale row for a DBL-reassigned UID hide a local project.
    expect(doesCatalogRowCoverProject(row({}), 'ANY-PROJECT')).toBe(false);
  });

  it('does not cover a different project', () => {
    expect(
      doesCatalogRowCoverProject(
        row({ installed: true, dblEntryUid: 'aabbccdd', projectId: 'AABBCCDDEE99' }),
        'ZZZZ0000',
      ),
    ).toBe(false);
  });

  it('does not match on an empty UID when the row is installed under a different project', () => {
    expect(
      doesCatalogRowCoverProject(
        row({ installed: true, dblEntryUid: '', projectId: 'ABC' }),
        'XYZ',
      ),
    ).toBe(false);
  });
});
