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

  test('Generates command value for book with chapter', () => {
    const result = generateCommandValue('GEN', undefined, 1);
    expect(result).toBe('GEN Genesis 1');
  });

  test('Generates command value for book with chapter 0', () => {
    const result = generateCommandValue('MAT', undefined, 0);
    expect(result).toBe('MAT Matthew');
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

  test('Generates command value with localizedBookNames for book with chapter', () => {
    const result = generateCommandValue('MAT', localizedBookNames, 5);
    expect(result).toBe('MAT Matthew 太 马太福音 5');
  });

  test('Generates command value with localizedBookNames for book with chapter 0', () => {
    const result = generateCommandValue('REV', localizedBookNames, 0);
    expect(result).toBe('REV Revelation 启 启示录');
  });

  test('Falls back to English name and uppercase ID if book not in localizedBookNames', () => {
    const result = generateCommandValue('EXO', localizedBookNames, 2);
    expect(result).toBe('EXO Exodus EXO Exodus 2');
  });

  test('Generates command value for New Testament book', () => {
    const result = generateCommandValue('REV', undefined, 22);
    expect(result).toBe('REV Revelation 22');
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
});
