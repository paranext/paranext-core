import { Canon } from '@sillsdev/scripture';
import { getAvailableBookIds, summarizeSelectedBooks } from './scope-selector.utils';

describe('scope-selector.utils', () => {
  describe('getAvailableBookIds', () => {
    test('Returns the available books for a well-formed info string', () => {
      const onlyGenesis = `1${'0'.repeat(Canon.allBookIds.length - 1)}`;
      expect(getAvailableBookIds(onlyGenesis)).toEqual(['GEN']);
    });

    test('Returns an empty array for an empty info string', () => {
      // `BOOKS_PRESENT_DEFAULT` is '', so this is what callers see before the setting loads.
      expect(getAvailableBookIds('')).toEqual([]);
    });

    test('Returns the books it can read from a short info string', () => {
      // Shares `getBookIdsFromBooksPresent`'s decoding, so a truncated string still yields the
      // flags it does carry rather than discarding the whole read.
      expect(getAvailableBookIds(`11${'0'.repeat(64)}`)).toEqual(['GEN', 'EXO']);
    });

    test('Ignores flags past the last canon book', () => {
      // The provider always emits exactly `Canon.allBookIds.length` flags, so anything beyond that
      // is never meaningful — and reading it would produce Canon's '***' placeholder id.
      expect(getAvailableBookIds(`1${'0'.repeat(Canon.allBookIds.length)}`)).toEqual(['GEN']);
    });

    test('Omits obsolete books that are flagged as present', () => {
      const allPresent = '1'.repeat(Canon.allBookIds.length);
      const availableBookIds = getAvailableBookIds(allPresent);
      expect(availableBookIds.length).toBeLessThan(Canon.allBookIds.length);
      expect(
        availableBookIds.some((bookId) => Canon.isObsolete(Canon.bookIdToNumber(bookId))),
      ).toBe(false);
    });
  });

  describe('summarizeSelectedBooks', () => {
    const allBooksText = 'All books';
    // A small stand-in for a project's available books, in canon order.
    const availableBookIds = ['GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG', 'MAT', 'MRK', 'REV'];

    test('Returns undefined when nothing is selected', () => {
      expect(summarizeSelectedBooks([], availableBookIds, allBooksText)).toBeUndefined();
    });

    test('Returns the "all books" text when every available book is selected', () => {
      expect(summarizeSelectedBooks(availableBookIds, availableBookIds, allBooksText)).toBe(
        allBooksText,
      );
    });

    test('Returns the "all books" text regardless of the order the selection arrived in', () => {
      const shuffled = ['REV', 'GEN', 'MRK', 'DEU', 'JOS', 'EXO', 'MAT', 'JDG', 'NUM', 'LEV'];
      expect(summarizeSelectedBooks(shuffled, availableBookIds, allBooksText)).toBe(allBooksText);
    });

    test('Prefers the "all books" text over the collapsed range', () => {
      // A full selection of a seven-book project is past the listing threshold, so the range form
      // would otherwise apply; "All books" has to win or it would read "GEN - JDG".
      const sevenBookProject = ['GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'JOS', 'JDG'];
      expect(summarizeSelectedBooks(sevenBookProject, sevenBookProject, allBooksText)).toBe(
        allBooksText,
      );
    });

    test('Lists every book when five or fewer are selected', () => {
      expect(summarizeSelectedBooks(['GEN', 'EXO', 'LEV'], availableBookIds, allBooksText)).toBe(
        'GEN, EXO, LEV',
      );
    });

    test('Lists books in canon order, not selection order', () => {
      expect(summarizeSelectedBooks(['REV', 'GEN', 'MAT'], availableBookIds, allBooksText)).toBe(
        'GEN, MAT, REV',
      );
    });

    test('Lists exactly five selected books in full', () => {
      // The boundary of the listing threshold: five still lists, six collapses.
      expect(
        summarizeSelectedBooks(['GEN', 'EXO', 'LEV', 'NUM', 'DEU'], availableBookIds, allBooksText),
      ).toBe('GEN, EXO, LEV, NUM, DEU');
    });

    test('Collapses to a first-to-last range once more than five are selected', () => {
      // Listing every book overflowed the trigger, so past the threshold the summary keeps only
      // the canon-order endpoints (this is how Paratext 9 summarizes a book set).
      expect(
        summarizeSelectedBooks(
          ['MRK', 'GEN', 'EXO', 'LEV', 'NUM', 'DEU'],
          availableBookIds,
          allBooksText,
        ),
      ).toBe('GEN - MRK');
    });

    test('Picks the range endpoints in canon order, not selection order', () => {
      // Click order is meaningless to a reader, so the first and last books of the range must come
      // from the canonical sort rather than from whichever book was clicked first.
      expect(
        summarizeSelectedBooks(
          ['REV', 'MRK', 'MAT', 'JDG', 'JOS', 'DEU', 'NUM'],
          availableBookIds,
          allBooksText,
        ),
      ).toBe('NUM - REV');
    });

    test('Does not claim "all books" when a book the project lacks stands in for a missing one', () => {
      // A stale selection can hold a book that is no longer available; it must not tip the
      // summary over into "All books" when an available book is still unselected.
      const selected = [...availableBookIds.slice(0, -1), 'JHN'];
      expect(summarizeSelectedBooks(selected, availableBookIds, allBooksText)).toBe('GEN - JHN');
    });

    test('Does not claim "all books" when the selection is a superset of the project', () => {
      // Every available book IS selected here, but so is a book the project does not have, so the
      // selection is not "the project's books" and must not say so.
      const selected = [...availableBookIds, 'JHN'];
      expect(summarizeSelectedBooks(selected, availableBookIds, allBooksText)).toBe('GEN - REV');
    });

    test('Matches the "all books" check case-insensitively', () => {
      // Book IDs are not guaranteed uppercase — `handleScopeChange` seeds the current reference's
      // book raw — so a lowercase selection still describes the same set of books.
      const lowercased = availableBookIds.map((bookId) => bookId.toLowerCase());
      expect(summarizeSelectedBooks(lowercased, availableBookIds, allBooksText)).toBe(allBooksText);
    });

    test('Ignores a book ID Canon does not recognize', () => {
      // `Canon.bookIdToNumber` returns 0 for an unknown id, which would sort it ahead of Genesis
      // and make it the range's left endpoint.
      expect(
        summarizeSelectedBooks(
          ['GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'XYZ'],
          availableBookIds,
          allBooksText,
        ),
      ).toBe('GEN, EXO, LEV, NUM, DEU');
    });

    test('Collapses duplicate book IDs', () => {
      expect(summarizeSelectedBooks(['GEN', 'gen', 'EXO'], availableBookIds, allBooksText)).toBe(
        'GEN, EXO',
      );
    });

    test('Returns undefined when nothing in the selection is a recognizable book', () => {
      expect(summarizeSelectedBooks(['XYZ'], availableBookIds, allBooksText)).toBeUndefined();
    });

    test('Never claims "all books" when the available books are unknown', () => {
      // An empty availableBookIds means the project's books setting has not loaded (or was
      // malformed); "All books" would be a claim we cannot make.
      expect(summarizeSelectedBooks(['GEN', 'EXO'], [], allBooksText)).toBe('GEN, EXO');
      expect(summarizeSelectedBooks(availableBookIds, [], allBooksText)).toBe('GEN - REV');
    });

    test('Uses localized book IDs when a localized name map is provided', () => {
      const localizedBookNames = new Map([
        ['GEN', { localizedId: 'Gén', localizedName: 'Génesis' }],
        ['EXO', { localizedId: 'Éxo', localizedName: 'Éxodo' }],
      ]);
      expect(
        summarizeSelectedBooks(['GEN', 'EXO'], availableBookIds, allBooksText, localizedBookNames),
      ).toBe('Gén, Éxo');
    });

    test('Uses localized book IDs for the endpoints of a collapsed range', () => {
      // The range form localizes its endpoints too, not just the listed form.
      const localizedBookNames = new Map([
        ['GEN', { localizedId: 'Gén', localizedName: 'Génesis' }],
        ['MRK', { localizedId: 'Mar', localizedName: 'Marcos' }],
      ]);
      expect(
        summarizeSelectedBooks(
          ['MRK', 'GEN', 'EXO', 'LEV', 'NUM', 'DEU'],
          availableBookIds,
          allBooksText,
          localizedBookNames,
        ),
      ).toBe('Gén - Mar');
    });

    test('Falls back to the uppercase book ID when a book is missing from the localized map', () => {
      const localizedBookNames = new Map([
        ['GEN', { localizedId: 'Gén', localizedName: 'Génesis' }],
      ]);
      expect(
        summarizeSelectedBooks(['GEN', 'EXO'], availableBookIds, allBooksText, localizedBookNames),
      ).toBe('Gén, EXO');
    });
  });
});
