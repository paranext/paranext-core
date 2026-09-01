import { doesBookMatchQuery } from './book.utils';

describe('doesBookMatchQuery', () => {
  test('matches by English book ID (case insensitive)', () => {
    expect(doesBookMatchQuery('GEN', 'gen')).toBe(true);
    expect(doesBookMatchQuery('GEN', 'GEN')).toBe(true);
    expect(doesBookMatchQuery('GEN', 'Gen')).toBe(true);
    expect(doesBookMatchQuery('MAT', 'mat')).toBe(true);
  });

  test('matches by English book name (case insensitive)', () => {
    expect(doesBookMatchQuery('GEN', 'genesis')).toBe(true);
    expect(doesBookMatchQuery('GEN', 'Genesis')).toBe(true);
    expect(doesBookMatchQuery('GEN', 'GENESIS')).toBe(true);
    expect(doesBookMatchQuery('MAT', 'matthew')).toBe(true);
    expect(doesBookMatchQuery('REV', 'revelation')).toBe(true);
  });

  test('matches partial English book name', () => {
    expect(doesBookMatchQuery('GEN', 'gene')).toBe(true);
    expect(doesBookMatchQuery('MAT', 'matt')).toBe(true);
    expect(doesBookMatchQuery('1CO', 'corin')).toBe(true);
  });

  test('does not match unrelated queries', () => {
    expect(doesBookMatchQuery('GEN', 'matthew')).toBe(false);
    expect(doesBookMatchQuery('MAT', 'genesis')).toBe(false);
    expect(doesBookMatchQuery('GEN', 'xyz')).toBe(false);
  });

  test('handles empty query', () => {
    expect(doesBookMatchQuery('GEN', '')).toBe(false);
    expect(doesBookMatchQuery('GEN', '   ')).toBe(false);
  });

  test('matches with localized book names', () => {
    const localizedBookNames = new Map([
      ['GEN', { localizedId: 'Gén', localizedName: 'Génesis' }],
      ['MAT', { localizedId: 'Mat', localizedName: 'Mateo' }],
    ]);

    // Match by localized ID
    expect(doesBookMatchQuery('GEN', 'gén', localizedBookNames)).toBe(true);
    expect(doesBookMatchQuery('MAT', 'mat', localizedBookNames)).toBe(true);

    // Match by localized name
    expect(doesBookMatchQuery('GEN', 'génesis', localizedBookNames)).toBe(true);
    expect(doesBookMatchQuery('MAT', 'mateo', localizedBookNames)).toBe(true);

    // Partial match
    expect(doesBookMatchQuery('GEN', 'géne', localizedBookNames)).toBe(true);
    expect(doesBookMatchQuery('MAT', 'mate', localizedBookNames)).toBe(true);

    // Still works with English
    expect(doesBookMatchQuery('GEN', 'genesis', localizedBookNames)).toBe(true);
  });

  // English names and canon ids are ASCII, which is what lets the English comparison use native
  // `includes`: a non-ASCII query has nothing to match in an ASCII haystack either way.
  test('does not match a non-ASCII query against an English name', () => {
    expect(doesBookMatchQuery('GEN', 'génesis')).toBe(false);
    expect(doesBookMatchQuery('GEN', 'gén')).toBe(false);
    expect(doesBookMatchQuery('GEN', '创世记')).toBe(false);
  });

  // Localized names are the case grapheme awareness exists for, so that comparison must stay
  // grapheme-aware: a query that would end in the middle of a cluster is not a match. Here the
  // accented letter is decomposed (`e` + U+0301), the form macOS and some input methods produce.
  test('does not match a query ending mid-cluster in a localized name', () => {
    // Starts with `x` so the query below can only reach the localized comparison — nothing in the
    // English name `Genesis` or the id `GEN` matches it
    const localizedBookNames = new Map([
      ['GEN', { localizedId: 'Xe\u0301n', localizedName: 'Xe\u0301nesis' }],
    ]);

    expect(doesBookMatchQuery('GEN', 'xe', localizedBookNames)).toBe(false);
    expect(doesBookMatchQuery('GEN', 'xe\u0301nesis', localizedBookNames)).toBe(true);
  });

  test('localized book names do not interfere with other books', () => {
    const localizedBookNames = new Map([['GEN', { localizedId: 'Gén', localizedName: 'Génesis' }]]);

    // Matthew should not match Genesis localized names
    expect(doesBookMatchQuery('MAT', 'génesis', localizedBookNames)).toBe(false);
    expect(doesBookMatchQuery('MAT', 'gén', localizedBookNames)).toBe(false);

    // But Matthew should still match its English name
    expect(doesBookMatchQuery('MAT', 'matthew', localizedBookNames)).toBe(true);
  });
});
