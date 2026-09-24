import { describe, it, expect } from 'vitest';
import { buildFindOptions, FindUiState } from './find-options.utils';

// Typed as FindUiState rather than `as const` so the spread overrides below are type-checked
// against the real field types. `as const` widens nothing and makes findScope a readonly tuple,
// which is not assignable to FindOptions['scope'].
const BASE_STATE: FindUiState = {
  searchTerm: 'beginning',
  findScope: [{ bookId: 'MAT', chapter: 1 }],
  shouldMatchCase: false,
  isRegexAllowed: false,
  searchTextType: 'all',
  wordRestriction: 'none',
  ignoreWhitespaceDifferences: false,
  ignoreDiacritics: false,
};

describe('buildFindOptions', () => {
  // The searched text is USJ with its text nodes concatenated, so it really can contain runs of
  // consecutive whitespace. Rewriting the query would make those runs unsearchable — see the
  // buildFindOptions TSDoc.
  it('passes the search term through byte-identical', () => {
    expect(buildFindOptions({ ...BASE_STATE, searchTerm: '   beginning    ' }).searchString).toBe(
      '   beginning    ',
    );
    expect(buildFindOptions({ ...BASE_STATE, searchTerm: 'the   Word' }).searchString).toBe(
      'the   Word',
    );
  });

  it('leaves invisible characters untouched so they can still be searched for exactly', () => {
    // U+00A0 no-break space, U+200B zero-width space
    expect(buildFindOptions({ ...BASE_STATE, searchTerm: 'a b' }).searchString).toBe('a b');
    expect(buildFindOptions({ ...BASE_STATE, searchTerm: 'a​b' }).searchString).toBe('a​b');
  });

  it('defaults both tolerance flags to off so searches are exact unless the user opts out', () => {
    const options = buildFindOptions(BASE_STATE);
    expect(options.ignoreWhitespaceDifferences).toBe(false);
    expect(options.ignoreDiacritics).toBe(false);
  });

  it('passes both tolerance flags through when the user enables them', () => {
    const options = buildFindOptions({
      ...BASE_STATE,
      ignoreWhitespaceDifferences: true,
      ignoreDiacritics: true,
    });
    expect(options.ignoreWhitespaceDifferences).toBe(true);
    expect(options.ignoreDiacritics).toBe(true);
  });

  it('passes the scope through unchanged', () => {
    expect(buildFindOptions(BASE_STATE).scope).toEqual([{ bookId: 'MAT', chapter: 1 }]);
  });

  it('inverts shouldMatchCase into caseInsensitive', () => {
    expect(buildFindOptions({ ...BASE_STATE, shouldMatchCase: true }).caseInsensitive).toBe(false);
    expect(buildFindOptions({ ...BASE_STATE, shouldMatchCase: false }).caseInsensitive).toBe(true);
  });

  it('maps searchTextType to verseTextOnly', () => {
    expect(buildFindOptions({ ...BASE_STATE, searchTextType: 'verseOnly' }).verseTextOnly).toBe(
      true,
    );
    expect(buildFindOptions({ ...BASE_STATE, searchTextType: 'all' }).verseTextOnly).toBe(false);
  });

  it('passes useRegex and wordRestriction through', () => {
    const options = buildFindOptions({
      ...BASE_STATE,
      isRegexAllowed: true,
      wordRestriction: 'wholeWord',
    });
    expect(options.useRegex).toBe(true);
    expect(options.wordRestriction).toBe('wholeWord');
  });
});
