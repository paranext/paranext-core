import { describe, expect, it, vi } from 'vitest';
import type { DblResourceReference, ProjectReference } from 'platform-scripture';

// The shipped allowlist is data that changes independently of this logic, so the tests drive off a
// fixed stand-in. Testing against the real list would make these tests fail (or vacuously pass)
// every time the curated set is edited, which is exactly the churn the const/utils split avoids.
// The two cases differ in case on purpose — the UIDs reach the front end in whatever case the DBL
// catalog supplies, so the matching has to survive that.
vi.mock('./free-resources.const', () => ({
  FREE_RESOURCE_DBL_ENTRY_UIDS: Object.freeze(['AAAA1111BBBB2222', 'cccc3333dddd4444']),
}));

const {
  FREE_RESOURCE_IDS,
  HAS_FREE_RESOURCES,
  filterFreeReferences,
  freeResourcePickerOptions,
  isFreeResource,
  // Imported after the mock so the module-scope lookup set is built from the stand-in list.
} = await import('./free-resources.utils');

function dblRef(id: string): DblResourceReference {
  return { type: 'dblResource', name: id, id };
}

describe('isFreeResource', () => {
  it('accepts an allowlisted uid', () => {
    expect(isFreeResource('AAAA1111BBBB2222')).toBe(true);
  });

  it('accepts an allowlisted uid whose case differs from the list', () => {
    // The C# provider upper-cases before matching its own whitelist while `dblEntryUid` arrives in
    // the catalog's case, so a case-sensitive check would drop valid entries.
    expect(isFreeResource('aaaa1111bbbb2222')).toBe(true);
    expect(isFreeResource('CCCC3333DDDD4444')).toBe(true);
  });

  it('rejects a uid that is not allowlisted', () => {
    expect(isFreeResource('9999999999999999')).toBe(false);
  });

  it('rejects a missing or empty uid rather than throwing', () => {
    expect(isFreeResource(undefined)).toBe(false);
    expect(isFreeResource('')).toBe(false);
  });
});

describe('filterFreeReferences', () => {
  it('keeps allowlisted DBL references', () => {
    const refs = [dblRef('AAAA1111BBBB2222'), dblRef('cccc3333dddd4444')];

    expect(filterFreeReferences(refs)).toEqual(refs);
  });

  it('drops a stored reference that is no longer allowlisted', () => {
    // The case the write-side guard cannot cover: a uid persisted while the allowlist was wider, or
    // edited into the setting by hand, must not keep rendering in the no-project entry point.
    const stale = dblRef('9999999999999999');
    const free = dblRef('AAAA1111BBBB2222');

    expect(filterFreeReferences([stale, free])).toEqual([free]);
  });

  it('drops non-DBL references, which the no-project state cannot resolve', () => {
    const projectRef: ProjectReference = { type: 'project', name: 'Some project', id: 'abc123' };

    expect(filterFreeReferences([projectRef, dblRef('AAAA1111BBBB2222')])).toEqual([
      dblRef('AAAA1111BBBB2222'),
    ]);
  });

  it('returns an empty list unchanged', () => {
    expect(filterFreeReferences([])).toEqual([]);
  });
});

describe('FREE_RESOURCE_IDS', () => {
  it('exposes the curated list as-is, in its original case', () => {
    expect([...FREE_RESOURCE_IDS]).toEqual(['AAAA1111BBBB2222', 'cccc3333dddd4444']);
  });
});

describe('HAS_FREE_RESOURCES', () => {
  it('is true while the allowlist has entries', () => {
    expect(HAS_FREE_RESOURCES).toBe(true);
  });
});

describe('freeResourcePickerOptions', () => {
  it('restricts the picker to the allowlist at the free-resource entry point', () => {
    expect(freeResourcePickerOptions(true, 'Only free texts.')).toEqual({
      allowedResourceIds: FREE_RESOURCE_IDS,
      notice: 'Only free texts.',
    });
  });

  it('carries a notice, because the dialog cannot explain a list this narrowing emptied', () => {
    // The dialog builds its own explanation from the fetch results, which this narrowing does not
    // touch — so without the notice a restricted picker matching nothing renders a blank list with
    // nothing said about why.
    expect(freeResourcePickerOptions(true, 'Only free texts.')).toHaveProperty(
      'notice',
      'Only free texts.',
    );
  });

  it('adds no restriction anywhere else, leaving the whole catalog offerable', () => {
    expect(freeResourcePickerOptions(false, 'Only free texts.')).toEqual({});
  });

  it('keeps the unrestricted result at a stable identity', () => {
    // The unrestricted branch is spread into memoized dialog options on every render of every
    // project-backed panel, so it stays a module constant. The restricted branch cannot: it carries
    // a caller-supplied notice, and its callers memoize instead.
    expect(freeResourcePickerOptions(false, 'a')).toBe(freeResourcePickerOptions(false, 'b'));
  });
});
