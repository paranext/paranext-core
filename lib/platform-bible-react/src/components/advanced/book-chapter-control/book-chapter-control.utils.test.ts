import { ALL_BOOK_IDS, ALL_ENGLISH_BOOK_NAMES } from '@/components/shared/book.utils';
import {
  fetchEndChapter,
  calculateTopMatch,
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

    test('Returns -1 for Deuterocanonical book (not in scrBookData)', () => {
      const chapters = fetchEndChapter('TOB');
      expect(chapters).toBe(-1);
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
        const dcBooks = ['TOB', 'JDT', 'ESG'];
        const result = calculateTopMatch('TOB 999', dcBooks);
        expect(result).toEqual({
          book: 'TOB',
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
});
