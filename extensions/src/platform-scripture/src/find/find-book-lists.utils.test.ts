import { describe, it, expect } from 'vitest';
import { Canon } from '@sillsdev/scripture';
import { BOOKS_PRESENT_DEFAULT } from 'platform-bible-utils/experimental';
import {
  deriveFindBookLists,
  excludeExtraMaterialBooks,
  UNKNOWN_FIND_BOOK_LISTS,
} from './find-book-lists.utils';

/**
 * Builds a `booksPresent` flag string of full canon length with the given books flagged present.
 *
 * Throws on an id the canon does not recognize. A silent no-op there would hollow out whichever
 * test used it: the flag would land outside the string, the assertion would pass for the wrong
 * reason, and the behavior under test would go uncovered.
 */
function booksPresentFor(bookIds: string[]): string {
  const flags = Array.from({ length: Canon.allBookIds.length }, () => '0');
  bookIds.forEach((bookId) => {
    const bookNumber = Canon.bookIdToNumber(bookId);
    if (bookNumber <= 0) throw new Error(`booksPresentFor: '${bookId}' is not a canon book id`);
    flags[bookNumber - 1] = '1';
  });
  return flags.join('');
}

/** Reads back the ids flagged present in a `booksPresent` flag string */
function presentBookIds(booksPresent: string): string[] {
  const ids: string[] = [];
  for (let index = 0; index < booksPresent.length; index += 1) {
    if (booksPresent[index] === '1') ids.push(Canon.bookNumberToId(index + 1));
  }
  return ids;
}

/**
 * Every book id the canon classifies as extra material, spelled out as literals.
 *
 * Pins the set the exclusion is expected to cover, so extending the canon's extra material shows up
 * as a failing test rather than as a silently wider exclusion. It is the same 15 ids as
 * `Canon.nonCanonicalIds`, which the code under test derives from — not an independent oracle.
 */
const ALL_EXTRA_MATERIAL_BOOK_IDS = [
  'XXA',
  'XXB',
  'XXC',
  'XXD',
  'XXE',
  'XXF',
  'XXG',
  'FRT',
  'BAK',
  'OTH',
  'INT',
  'CNC',
  'GLO',
  'TDX',
  'NDX',
];

describe('excludeExtraMaterialBooks', () => {
  it('clears extra material while keeping OT, NT, and DC books', () => {
    const booksPresent = booksPresentFor(['GEN', 'MAT', 'TOB', 'GLO', 'FRT', 'INT', 'XXA']);
    expect(presentBookIds(excludeExtraMaterialBooks(booksPresent))).toEqual(['GEN', 'MAT', 'TOB']);
  });

  it('clears every extra-material book in the canon, not just the common ones', () => {
    const booksPresent = booksPresentFor([...ALL_EXTRA_MATERIAL_BOOK_IDS, 'GEN', 'REV']);
    expect(presentBookIds(excludeExtraMaterialBooks(booksPresent))).toEqual(['GEN', 'REV']);
  });

  // `getAvailableBookIds` in platform-bible-react throws when the flag string is not exactly canon
  // length, so the exclusion must clear flags in place rather than drop positions.
  it('preserves the length of the flag string', () => {
    const booksPresent = booksPresentFor(['GEN', 'GLO']);
    expect(excludeExtraMaterialBooks(booksPresent)).toHaveLength(booksPresent.length);
  });

  it('leaves a string with no extra material unchanged', () => {
    const booksPresent = booksPresentFor(['GEN', 'MAT']);
    expect(excludeExtraMaterialBooks(booksPresent)).toBe(booksPresent);
  });

  it('handles the default that is in place while the project setting resolves', () => {
    expect(excludeExtraMaterialBooks(BOOKS_PRESENT_DEFAULT)).toBe(BOOKS_PRESENT_DEFAULT);
  });
});

describe('deriveFindBookLists', () => {
  it('excludes extra material from the searchable flags and the available book ids', () => {
    const lists = deriveFindBookLists(booksPresentFor(['GEN', 'MAT', 'GLO', 'FRT']));
    expect(presentBookIds(lists.searchableBooksPresent)).toEqual(['GEN', 'MAT']);
    expect(lists.availableBookIds).toEqual(['GEN', 'MAT']);
  });

  it('keeps extra material localizable so a scope label can still name it', () => {
    const lists = deriveFindBookLists(booksPresentFor(['GEN', 'GLO']));
    expect(lists.localizableBookIds).toEqual(['GEN', 'GLO']);
  });

  it('drops obsolete books, which have no localized name and cannot be navigated to', () => {
    const lists = deriveFindBookLists(booksPresentFor(['GEN', 'JSA', '3ES']));
    expect(lists.availableBookIds).toEqual(['GEN']);
    expect(lists.localizableBookIds).toEqual(['GEN']);
  });

  it('keeps the searchable flag string at canon length so the book picker accepts it', () => {
    const booksPresent = booksPresentFor(['GEN', 'GLO']);
    expect(deriveFindBookLists(booksPresent).searchableBooksPresent).toHaveLength(
      booksPresent.length,
    );
  });

  it('yields empty book lists for a project that has no books at all', () => {
    const lists = deriveFindBookLists(booksPresentFor([]));
    expect(lists.availableBookIds).toEqual([]);
    expect(lists.localizableBookIds).toEqual([]);
  });

  it('offers nothing to search for a project whose only books are extra material', () => {
    const lists = deriveFindBookLists(booksPresentFor(['GLO', 'FRT']));
    expect(lists.availableBookIds).toEqual([]);
    expect(lists.localizableBookIds).toEqual(['FRT', 'GLO']);
  });

  // The distinction the prune depends on: an unknown list must not read as "this project has no
  // books", or a transient read error would wipe the user's persisted selection for good.
  it('reports an unknown book list as undefined rather than empty', () => {
    const lists = deriveFindBookLists(undefined);
    expect(lists.availableBookIds).toBeUndefined();
    expect(lists.searchableBooksPresent).toBe(BOOKS_PRESENT_DEFAULT);
    // The known-empty project is the case this must NOT be confused with.
    expect(deriveFindBookLists(booksPresentFor([])).availableBookIds).toEqual([]);
  });

  // Hoisted so re-rendering the unknown state hands effects and `useLocalizedStrings` the same
  // array identities instead of fresh ones.
  it('exposes the unknown lists as a shared constant, not a per-call derivation', () => {
    expect(UNKNOWN_FIND_BOOK_LISTS.availableBookIds).toBeUndefined();
    expect(UNKNOWN_FIND_BOOK_LISTS.localizableBookIds).toEqual([]);
    expect(deriveFindBookLists(undefined).localizableBookIds).not.toBe(
      UNKNOWN_FIND_BOOK_LISTS.localizableBookIds,
    );
  });
});
