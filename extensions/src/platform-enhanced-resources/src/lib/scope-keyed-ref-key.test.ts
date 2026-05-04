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

  it('includes the verse when scope is current-sense (maps to backend CurrentVerse)', () => {
    // 'current-sense' is enabled only when a token filter is active and routes
    // through marbleScopeToBackend -> ScopeEnum.CurrentVerse on the C# side, so
    // it must re-key on verse the same way 'current-verse' does. Otherwise the
    // research tabs would show stale rows scoped to the previous verse.
    const key = computeScopeKeyedRefKey('current-sense', {
      book: 'JHN',
      chapterNum: 1,
      verseNum: 5,
    });
    expect(key).toBe('JHN|1|v5');
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
