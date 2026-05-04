import { describe, expect, it } from 'vitest';
import { computeScopeKeyedRefKey } from './scope-keyed-ref-key';

describe('computeScopeKeyedRefKey', () => {
  const ref = { book: 'JHN', chapterNum: 1, verseNum: 5 };

  it('includes the verse when scope is current-verse (PT9 Scope.CurrentVerse)', () => {
    const key = computeScopeKeyedRefKey('current-verse', ref);
    expect(key).toBe('JHN|1|v5');
  });

  it('includes a section-scoped verse marker when scope is current-section', () => {
    const key = computeScopeKeyedRefKey('current-section', ref);
    expect(key).toBe('JHN|1|s5');
  });

  it('does not include the verse when scope is current-chapter', () => {
    const key = computeScopeKeyedRefKey('current-chapter', ref);
    expect(key).toBe('JHN|1');
  });

  // Note: PT10 MarbleScope union is `current-verse | current-section | current-chapter |
  // current-sense`. The plan's original test referenced a hypothetical `current-book` literal that
  // does not exist in the codebase; substituted with `current-sense` (the only other non-verse,
  // non-section, non-chapter scope) to preserve the test's intent: any scope outside
  // verse/section keys at chapter level.
  it('does not include the verse when scope is current-sense', () => {
    const key = computeScopeKeyedRefKey('current-sense', ref);
    expect(key).toBe('JHN|1');
  });

  it('produces distinct keys when only the chapter changes', () => {
    expect(
      computeScopeKeyedRefKey('current-chapter', { book: 'JHN', chapterNum: 1, verseNum: 5 }),
    ).not.toBe(
      computeScopeKeyedRefKey('current-chapter', { book: 'JHN', chapterNum: 2, verseNum: 5 }),
    );
  });

  it('produces identical keys when only the verse changes at chapter scope (PT9-faithful)', () => {
    expect(
      computeScopeKeyedRefKey('current-chapter', { book: 'JHN', chapterNum: 1, verseNum: 5 }),
    ).toBe(computeScopeKeyedRefKey('current-chapter', { book: 'JHN', chapterNum: 1, verseNum: 9 }));
  });

  it('returns identical keys when scope=current-chapter and only verse changes (regression: PT9 behavior)', () => {
    const ref1 = { book: 'JHN', chapterNum: 1, verseNum: 1 };
    const ref2 = { book: 'JHN', chapterNum: 1, verseNum: 51 };
    expect(computeScopeKeyedRefKey('current-chapter', ref1)).toEqual(
      computeScopeKeyedRefKey('current-chapter', ref2),
    );
  });
});
