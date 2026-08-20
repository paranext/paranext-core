import { Canon } from '@sillsdev/scripture';
import { summarizeSelectedBooks, tryGetAvailableBookIds } from './scope-selector.utils';

describe('scope-selector.utils', () => {
  describe('tryGetAvailableBookIds', () => {
    test('Returns the available books for a well-formed info string', () => {
      const onlyGenesis = `1${'0'.repeat(Canon.allBookIds.length - 1)}`;
      expect(tryGetAvailableBookIds(onlyGenesis)).toEqual(['GEN']);
    });

    test('Returns an empty array for an empty info string', () => {
      // `BOOKS_PRESENT_DEFAULT` is '', so this is what callers see before the setting loads.
      expect(tryGetAvailableBookIds('')).toEqual([]);
    });

    test('Returns an empty array for a wrong-length info string', () => {
      expect(tryGetAvailableBookIds('1'.repeat(66))).toEqual([]);
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
      expect(
        summarizeSelectedBooks(['GEN', 'EXO', 'LEV', 'NUM', 'DEU'], availableBookIds, allBooksText),
      ).toBe('GEN, EXO, LEV, NUM, DEU');
    });

    test('Truncates to first … last in canon order when more than five are selected', () => {
      expect(
        summarizeSelectedBooks(
          ['MRK', 'GEN', 'EXO', 'LEV', 'NUM', 'DEU'],
          availableBookIds,
          allBooksText,
        ),
      ).toBe('GEN … MRK');
    });

    test('Does not claim "all books" when a book the project lacks is selected', () => {
      // A stale selection can hold a book that is no longer available; it must not tip the
      // summary over into "All books" when an available book is still unselected.
      const selected = [...availableBookIds.slice(0, -1), 'JHN'];
      expect(summarizeSelectedBooks(selected, availableBookIds, allBooksText)).toBe('GEN … JHN');
    });

    test('Never claims "all books" when the available books are unknown', () => {
      // An empty availableBookIds means the project's books setting has not loaded (or was
      // malformed); "All books" would be a claim we cannot make.
      expect(summarizeSelectedBooks(['GEN', 'EXO'], [], allBooksText)).toBe('GEN, EXO');
      expect(summarizeSelectedBooks(availableBookIds, [], allBooksText)).toBe('GEN … REV');
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
