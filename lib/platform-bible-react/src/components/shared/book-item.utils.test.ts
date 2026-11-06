import { describe, expect, test } from 'vitest';
import {
  chapterItemValue,
  generateCommandValue,
  parseChapterFromItemValue,
  parseVerseFromItemValue,
  TOP_MATCH_ITEM_VALUE,
  verseItemValue,
} from './book-item.utils';

describe('generateCommandValue', () => {
  test('Generates command value for book only', () => {
    const result = generateCommandValue('GEN');
    expect(result).toBe('GEN Genesis');
  });

  const localizedBookNames = new Map([
    ['GEN', { localizedId: '创', localizedName: '创世记' }],
    ['MAT', { localizedId: '太', localizedName: '马太福音' }],
    ['REV', { localizedId: '启', localizedName: '启示录' }],
  ]);

  test('Generates command value with localizedBookNames for book only', () => {
    const result = generateCommandValue('GEN', localizedBookNames);
    expect(result).toBe('GEN Genesis 创 创世记');
  });

  test('Falls back to English name and uppercase ID if book not in localizedBookNames', () => {
    const result = generateCommandValue('EXO', localizedBookNames);
    expect(result).toBe('EXO Exodus EXO Exodus');
  });

  test('Generates command value for New Testament book', () => {
    const result = generateCommandValue('REV');
    expect(result).toBe('REV Revelation');
  });

  test('A book row never parses as a chapter or verse cell', () => {
    expect(parseChapterFromItemValue(generateCommandValue('GEN'))).toBeUndefined();
    expect(parseVerseFromItemValue(generateCommandValue('GEN'))).toBeUndefined();
  });
});

describe('chapter item values', () => {
  test('round-trips a chapter number', () => {
    expect(parseChapterFromItemValue(chapterItemValue('MAT', 28))).toBe(28);
    expect(parseChapterFromItemValue(chapterItemValue('GEN', 1))).toBe(1);
  });

  test('includes the book id and English name so cmdk matches the rendered item', () => {
    expect(chapterItemValue('MAT', 5)).toBe('MAT Matthew 5');
  });

  test('tolerates a book id with no English name', () => {
    expect(chapterItemValue('XYZ', 3)).toBe('XYZ  3');
  });
});

describe('verse item values', () => {
  test('round-trips a verse number', () => {
    expect(parseVerseFromItemValue(verseItemValue('JHN', 3, 16))).toBe(16);
  });

  test('builds on the chapter value', () => {
    expect(verseItemValue('JHN', 3, 16)).toBe('JHN John 3:16');
  });
});

describe('parsing guards', () => {
  test('a verse value does not parse as a chapter', () => {
    // The trailing digits of "JHN John 3:16" are the verse. Reading them as a chapter is the
    // bug that made the top-match row preview a verse number as though it were a chapter.
    expect(parseChapterFromItemValue(verseItemValue('JHN', 3, 16))).toBeUndefined();
  });

  test('a chapter value does not parse as a verse', () => {
    expect(parseVerseFromItemValue(chapterItemValue('JHN', 3))).toBeUndefined();
  });

  test('a book value parses as neither', () => {
    expect(parseChapterFromItemValue('JHN John')).toBeUndefined();
    expect(parseVerseFromItemValue('JHN John')).toBeUndefined();
  });

  test('the top-match sentinel parses as neither', () => {
    expect(parseChapterFromItemValue(TOP_MATCH_ITEM_VALUE)).toBeUndefined();
    expect(parseVerseFromItemValue(TOP_MATCH_ITEM_VALUE)).toBeUndefined();
  });

  test.each([
    ['PS2', 'Psalm 151'],
    ['PS3', 'Psalms 152-155'],
  ])(
    'a book row for %s, whose English name (%s) ends in digits, parses as neither',
    (bookId, englishName) => {
      // Guards the parse against the two canon books that would otherwise read as a chapter cell of
      // themselves — "PS2 Psalm 151" would report chapter 151, and the top-match row would submit a
      // reference the user never typed.
      expect(chapterItemValue(bookId, 1)).toBe(`${bookId} ${englishName} 1`);
      expect(parseChapterFromItemValue(generateCommandValue(bookId))).toBeUndefined();
      expect(parseVerseFromItemValue(generateCommandValue(bookId))).toBeUndefined();
    },
  );

  test.each(['PS2', 'PS3'])('a real chapter cell of %s still round-trips', (bookId) => {
    expect(parseChapterFromItemValue(chapterItemValue(bookId, 1))).toBe(1);
    expect(parseVerseFromItemValue(verseItemValue(bookId, 1, 7))).toBe(7);
  });
});
