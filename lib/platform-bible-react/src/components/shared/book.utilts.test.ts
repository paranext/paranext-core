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

  // A search box is filtered on every keystroke, so it is fed prefixes that stop wherever the user
  // has got to — which for a script that builds characters from several code points is usually
  // mid-cluster. Rejecting those empties the list while someone is still typing, so this comparison
  // matches by code unit. Here the accented letter is decomposed (`e` + U+0301), the form macOS and
  // some input methods produce.
  test('matches a query that stops mid-cluster in a localized name', () => {
    // Starts with `x` so the queries below can only reach the localized comparison — nothing in the
    // English name `Genesis` or the id `GEN` matches them
    const localizedBookNames = new Map([
      ['GEN', { localizedId: 'Xe\u0301n', localizedName: 'Xe\u0301nesis' }],
    ]);

    expect(doesBookMatchQuery('GEN', 'xe', localizedBookNames)).toBe(true);
    expect(doesBookMatchQuery('GEN', 'xe\u0301nesis', localizedBookNames)).toBe(true);
  });

  // Khmer builds a character from a base plus vowel and sign code points, so almost every prefix a
  // user types lands mid-cluster. These are the shipped `km.json` names for Romans and Job, whose
  // very first keystroke stopped matching once segmentation became UAX #29 conformant.
  test('matches Khmer book names keystroke by keystroke', () => {
    const localizedBookNames = new Map([
      ['ROM', { localizedId: 'រ៉ូម', localizedName: 'រ៉ូម' }],
      ['JOB', { localizedId: 'យ៉ូប', localizedName: 'យ៉ូប' }],
    ]);

    const typedPrefixes = (name: string) =>
      [...name].map((_, index) => [...name].slice(0, index + 1).join(''));

    typedPrefixes('រ៉ូម').forEach((prefix) => {
      expect(doesBookMatchQuery('ROM', prefix, localizedBookNames)).toBe(true);
    });
    typedPrefixes('យ៉ូប').forEach((prefix) => {
      expect(doesBookMatchQuery('JOB', prefix, localizedBookNames)).toBe(true);
    });

    // A book whose name shares no prefix with the query still does not match.
    expect(doesBookMatchQuery('JOB', 'រ៉', localizedBookNames)).toBe(false);
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
