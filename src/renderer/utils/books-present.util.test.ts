import { describe, expect, test } from 'vitest';
import { getBookIdsFromBooksPresent } from '@renderer/utils/books-present.util';

describe('getBookIdsFromBooksPresent', () => {
  test('maps 1-flags to canonical book ids by position', () => {
    // Positions 1 (GEN) and 3 (LEV) flagged
    expect(getBookIdsFromBooksPresent('101')).toEqual(['GEN', 'LEV']);
  });

  test('returns empty array for empty or all-zero strings', () => {
    expect(getBookIdsFromBooksPresent('')).toEqual([]);
    expect(getBookIdsFromBooksPresent('000')).toEqual([]);
  });
});
