import { ALL_BOOK_IDS, ALL_ENGLISH_BOOK_NAMES } from '@/components/shared/book.utils';
import { Section } from 'platform-bible-utils';
import {
  fetchEndChapter,
  calculateTopMatch,
  deriveBookChapterControlBookLists,
  SCRIPTURE_REGEX_PATTERNS,
} from './book-chapter-control.utils';

describe('book-chapter-control.utils', () => {
  describe('fetchEndChapter', () => {
    test('Returns correct chapter count for Genesis', () => {
      const chapters = fetchEndChapter('GEN');
      expect(chapters).toBe(50);
    });

    test('Returns correct chapter count for Psalm', () => {
      const chapters = fetchEndChapter('PSA');
      expect(chapters).toBe(150);
    });

    test('Returns correct chapter count for Matthew', () => {
      const chapters = fetchEndChapter('MAT');
      expect(chapters).toBe(28);
    });

    test('Returns correct chapter count for Philemon (single chapter)', () => {
      const chapters = fetchEndChapter('PHM');
      expect(chapters).toBe(1);
    });

    test('Returns 1 for Deuterocanonical book with unknown chapters', () => {
      const chapters = fetchEndChapter('3ES');
      expect(chapters).toBe(1);
    });

    test('Returns -1 for invalid book ID', () => {
      const chapters = fetchEndChapter('INVALID');
      expect(chapters).toBe(-1);
    });
  });

  describe('calculateTopMatch', () => {
    const availableBooks = ['GEN', 'EXO', 'LEV', 'MAT', 'MRK', 'LUK', '1JN', '2JN', '3JN', 'REV'];

    describe('empty or invalid input', () => {
      test('Returns undefined for empty string', () => {
        const result = calculateTopMatch('', availableBooks);
        expect(result).toBeUndefined();
      });

      test('Returns undefined for whitespace only', () => {
        const result = calculateTopMatch('   ', availableBooks);
        expect(result).toBeUndefined();
      });

      test('Returns undefined for unrecognized input', () => {
        const result = calculateTopMatch('XYZ NotABook', availableBooks);
        expect(result).toBeUndefined();
      });
    });

    describe('exact book ID matching', () => {
      test('Matches exact book ID (uppercase)', () => {
        const result = calculateTopMatch('GEN', availableBooks);
        expect(result).toEqual({
          book: 'GEN',
          chapterNum: undefined,
          verseNum: undefined,
        });
      });

      test('Matches exact book ID (lowercase)', () => {
        const result = calculateTopMatch('gen', availableBooks);
        expect(result).toEqual({
          book: 'GEN',
          chapterNum: undefined,
          verseNum: undefined,
        });
      });

      test('Matches exact book ID (mixed case)', () => {
        const result = calculateTopMatch('GeN', availableBooks);
        expect(result).toEqual({
          book: 'GEN',
          chapterNum: undefined,
          verseNum: undefined,
        });
      });
    });

    describe('exact book name matching', () => {
      test('Matches exact English book name', () => {
        const result = calculateTopMatch('Genesis', availableBooks);
        expect(result).toEqual({
          book: 'GEN',
          chapterNum: undefined,
          verseNum: undefined,
        });
      });

      test('Matches exact English book name (case insensitive)', () => {
        const result = calculateTopMatch('genesis', availableBooks);
        expect(result).toEqual({
          book: 'GEN',
          chapterNum: undefined,
          verseNum: undefined,
        });
      });

      test('Matches exact English book name (mixed case)', () => {
        const result = calculateTopMatch('GeNeSiS', availableBooks);
        expect(result).toEqual({
          book: 'GEN',
          chapterNum: undefined,
          verseNum: undefined,
        });
      });

      test('Matches multi-word book name', () => {
        const result = calculateTopMatch('3 jo', availableBooks);
        expect(result).toEqual({
          book: '3JN',
          chapterNum: undefined,
          verseNum: undefined,
        });
      });
    });

    describe('partial matching', () => {
      test('Matches partial book name with single result', () => {
        const result = calculateTopMatch('Gen', availableBooks);
        expect(result).toEqual({
          book: 'GEN',
          chapterNum: undefined,
          verseNum: undefined,
        });
      });

      test('Does not match partial book name with multiple results', () => {
        // Both "Mark" and "Matthew" contain "M"
        const result = calculateTopMatch('M', availableBooks);
        expect(result).toBeUndefined();
      });

      test('Matches partial book ID with single result', () => {
        const result = calculateTopMatch('RE', availableBooks);
        expect(result).toEqual({
          book: 'REV',
          chapterNum: undefined,
          verseNum: undefined,
        });
      });
    });

    describe('book with chapter', () => {
      test('Parses book and valid chapter', () => {
        const result = calculateTopMatch('Genesis 1', availableBooks);
        expect(result).toEqual({
          book: 'GEN',
          chapterNum: 1,
          verseNum: undefined,
        });
      });

      test('Parses book ID and valid chapter', () => {
        const result = calculateTopMatch('GEN 50', availableBooks);
        expect(result).toEqual({
          book: 'GEN',
          chapterNum: 50,
          verseNum: undefined,
        });
      });

      test('Caps chapter number to book maximum', () => {
        const result = calculateTopMatch('GEN 999', availableBooks);
        expect(result).toEqual({
          book: 'GEN',
          chapterNum: 50, // Genesis has 50 chapters
          verseNum: undefined,
        });
      });

      test('Handles chapter 0', () => {
        const result = calculateTopMatch('GEN 0', availableBooks);
        expect(result).toEqual({
          book: 'GEN',
          chapterNum: 0,
          verseNum: undefined,
        });
      });

      test('Handles DC book with invalid chapter data', () => {
        const dcBooks = ['3ES', 'JDT', 'ESG'];
        const result = calculateTopMatch('3ES 999', dcBooks);
        expect(result).toEqual({
          book: '3ES',
          chapterNum: 1, // Falls back to 1 when fetchEndChapter returns -1
          verseNum: undefined,
        });
      });
    });

    describe('book with chapter and verse', () => {
      test('Parses book, chapter, and verse', () => {
        const result = calculateTopMatch('Genesis 1:1', availableBooks);
        expect(result).toEqual({
          book: 'GEN',
          chapterNum: 1,
          verseNum: 1,
        });
      });

      test('Parses with book ID', () => {
        const result = calculateTopMatch('GEN 1:1', availableBooks);
        expect(result).toEqual({
          book: 'GEN',
          chapterNum: 1,
          verseNum: 1,
        });
      });

      test('Handles verse number 0', () => {
        const result = calculateTopMatch('GEN 1:0', availableBooks);
        expect(result).toEqual({
          book: 'GEN',
          chapterNum: 1,
          verseNum: 0,
        });
      });

      test('Handles missing verse number after colon', () => {
        const result = calculateTopMatch('GEN 1:', availableBooks);
        expect(result).toEqual({
          book: 'GEN',
          chapterNum: 1,
          verseNum: undefined,
        });
      });

      test('Caps chapter number with verse', () => {
        const result = calculateTopMatch('GEN 999:1', availableBooks);
        expect(result).toEqual({
          book: 'GEN',
          chapterNum: 50, // Genesis has 50 chapters
          verseNum: 1,
        });
      });
    });

    describe('edge cases', () => {
      test('Handles book not in available books list', () => {
        const result = calculateTopMatch('ROM', availableBooks);
        expect(result).toBeUndefined();
      });

      test('Trims whitespace from input', () => {
        const result = calculateTopMatch('  GEN 1  ', availableBooks);
        expect(result).toEqual({
          book: 'GEN',
          chapterNum: 1,
          verseNum: undefined,
        });
      });

      test('Handles empty available books array', () => {
        const result = calculateTopMatch('GEN', []);
        expect(result).toBeUndefined();
      });
    });
  });

  describe('constants', () => {
    test('ALL_BOOK_IDS excludes obsolete books', () => {
      expect(ALL_BOOK_IDS).not.toContain('4ES'); // 4 Ezra is obsolete
      expect(ALL_BOOK_IDS).toContain('GEN');
      expect(ALL_BOOK_IDS).toContain('REV');
    });

    test('ALL_ENGLISH_BOOK_NAMES has entries for all book IDs', () => {
      ALL_BOOK_IDS.forEach((bookId) => {
        expect(ALL_ENGLISH_BOOK_NAMES[bookId]).toBeDefined();
        expect(typeof ALL_ENGLISH_BOOK_NAMES[bookId]).toBe('string');
      });
    });

    test('SCRIPTURE_REGEX_PATTERNS match expected formats', () => {
      // Book only
      expect(SCRIPTURE_REGEX_PATTERNS.BOOK_ONLY.test('Genesis')).toBe(true);
      expect(SCRIPTURE_REGEX_PATTERNS.BOOK_ONLY.test('GEN')).toBe(true);
      expect(SCRIPTURE_REGEX_PATTERNS.BOOK_ONLY.test('1 John')).toBe(true);

      // Book and chapter
      expect(SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER.test('Genesis 1')).toBe(true);
      expect(SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER.test('GEN 50')).toBe(true);
      expect(SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER.test('Genesis')).toBe(false);
      expect(SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER.test('Genesis 1:1')).toBe(false);

      // Book, chapter, and verse
      expect(SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER_VERSE.test('Genesis 1:1')).toBe(true);
      expect(SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER_VERSE.test('GEN 1:1')).toBe(true);
      expect(SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER_VERSE.test('Genesis 1:')).toBe(true);
      expect(SCRIPTURE_REGEX_PATTERNS.BOOK_CHAPTER_VERSE.test('Genesis 1')).toBe(false);
    });
  });

  describe('deriveBookChapterControlBookLists', () => {
    test('Project books alone are both browsable and reachable, with nothing dimmed', () => {
      const {
        projectBooksBySection,
        reachableBooksBySection,
        reachableBooks,
        booksOutsideProject,
      } = deriveBookChapterControlBookLists(['GEN', 'MAT', 'REV'], []);

      expect(Object.values(projectBooksBySection).flat()).toEqual(['GEN', 'MAT', 'REV']);
      expect(Object.values(reachableBooksBySection).flat()).toEqual(['GEN', 'MAT', 'REV']);
      expect(reachableBooks).toEqual(['GEN', 'MAT', 'REV']);
      expect(booksOutsideProject.size).toBe(0);
    });

    test('An additional book outside the project is reachable, not browsable, and dimmed', () => {
      const { projectBooksBySection, reachableBooks, booksOutsideProject } =
        deriveBookChapterControlBookLists(['GEN', 'MAT'], ['TOB']);

      expect(reachableBooks).toContain('TOB');
      expect(Object.values(projectBooksBySection).flat()).not.toContain('TOB');
      expect(booksOutsideProject.has('TOB')).toBe(true);
    });

    test('An additional id the project already has is not dimmed', () => {
      const { reachableBooks, booksOutsideProject } = deriveBookChapterControlBookLists(
        ['GEN', 'MAT'],
        ['MAT'],
      );

      expect(reachableBooks).toEqual(['GEN', 'MAT']);
      expect(booksOutsideProject.has('MAT')).toBe(false);
      expect(booksOutsideProject.size).toBe(0);
    });

    test('A book the caller never passes is not reachable', () => {
      const { reachableBooks, booksOutsideProject } = deriveBookChapterControlBookLists(
        ['GEN', 'MAT'],
        [],
      );

      expect(reachableBooks).not.toContain('REV');
      expect(booksOutsideProject.size).toBe(0);
    });

    test('A book the caller passes as additional is reachable and dimmed', () => {
      const { reachableBooks, booksOutsideProject } = deriveBookChapterControlBookLists(
        ['GEN', 'MAT'],
        ['REV'],
      );

      expect(reachableBooks).toContain('REV');
      expect(booksOutsideProject.has('REV')).toBe(true);
    });

    // Guards against `reachableBooks` being "simplified" to the raw canon-filtered list: section
    // grouping drops the peripheral ids, so callers are never offered a book they cannot browse to.
    test('A peripheral additional id no section claims is not reachable', () => {
      const { reachableBooks, booksOutsideProject } = deriveBookChapterControlBookLists(
        ['GEN', 'MAT'],
        ['FRT'],
      );

      expect(reachableBooks).not.toContain('FRT');
      expect(reachableBooks).toEqual(['GEN', 'MAT']);
      expect(booksOutsideProject.has('FRT')).toBe(false);
    });

    test('Reachable books come back in canon order regardless of the project list order', () => {
      const { reachableBooks } = deriveBookChapterControlBookLists(['REV', 'GEN'], ['MAT']);

      expect(reachableBooks).toEqual(['GEN', 'MAT', 'REV']);
    });

    test('The collapsed navigation universe is the project list', () => {
      const { projectBooks } = deriveBookChapterControlBookLists(['GEN', 'MAT', 'REV'], ['TOB']);

      expect(projectBooks).toEqual(['GEN', 'MAT', 'REV']);
    });

    test('An additional book never joins the collapsed navigation universe', () => {
      const { projectBooks, reachableBooks } = deriveBookChapterControlBookLists(
        ['GEN', 'MAT'],
        ['TOB', 'REV'],
      );

      expect(projectBooks).toEqual(['GEN', 'MAT']);
      expect(reachableBooks).toContain('TOB');
      expect(reachableBooks).toContain('REV');
    });

    test('A peripheral project id no section claims is not in the collapsed navigation universe', () => {
      const { projectBooks } = deriveBookChapterControlBookLists(['GEN', 'MAT', 'FRT'], []);

      expect(projectBooks).toEqual(['GEN', 'MAT']);
    });

    test('With no extras, the project list is grouped as-is', () => {
      const { reachableBooksBySection } = deriveBookChapterControlBookLists(
        ['REV', 'GEN', 'TOB'],
        [],
      );

      expect(reachableBooksBySection[Section.OT]).toEqual(['GEN']);
      expect(reachableBooksBySection[Section.NT]).toEqual(['REV']);
      expect(reachableBooksBySection[Section.DC]).toEqual(['TOB']);
      expect(reachableBooksBySection[Section.Extra]).toEqual([]);
    });
  });
});
