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

  test('localized book names do not interfere with other books', () => {
    const localizedBookNames = new Map([['GEN', { localizedId: 'Gén', localizedName: 'Génesis' }]]);

    // Matthew should not match Genesis localized names
    expect(doesBookMatchQuery('MAT', 'génesis', localizedBookNames)).toBe(false);
    expect(doesBookMatchQuery('MAT', 'gén', localizedBookNames)).toBe(false);

    // But Matthew should still match its English name
    expect(doesBookMatchQuery('MAT', 'matthew', localizedBookNames)).toBe(true);
  });
});
