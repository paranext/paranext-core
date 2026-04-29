import { describe, it, expect } from 'vitest';
import { computeRangeFromScope } from './compute-range-from-scope';
import type { SerializedVerseRef } from '@sillsdev/scripture';

const REF_GEN_5_7: SerializedVerseRef = { book: 'GEN', chapterNum: 5, verseNum: 7 };
const REF_GEN_1_1: SerializedVerseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };
const REF_MAT_28_20: SerializedVerseRef = { book: 'MAT', chapterNum: 28, verseNum: 20 };

describe('computeRangeFromScope', () => {
  it('verse: returns single-verse range', () => {
    const result = computeRangeFromScope({
      scope: 'verse',
      ref: REF_GEN_5_7,
      rangeStart: REF_GEN_1_1,
      rangeEnd: REF_GEN_1_1,
      getEndVerse: () => 31,
    });
    expect(result).toEqual({ start: REF_GEN_5_7, end: REF_GEN_5_7 });
  });

  it('chapter (chapterNum > 1): start verseNum = 1, end verseNum = getEndVerse', () => {
    const result = computeRangeFromScope({
      scope: 'chapter',
      ref: REF_GEN_5_7,
      rangeStart: REF_GEN_1_1,
      rangeEnd: REF_GEN_1_1,
      getEndVerse: () => 32,
    });
    expect(result).toEqual({
      start: { book: 'GEN', chapterNum: 5, verseNum: 1 },
      end: { book: 'GEN', chapterNum: 5, verseNum: 32 },
    });
  });

  it('chapter (chapterNum === 1): start verseNum = 0 per VAL-003', () => {
    const result = computeRangeFromScope({
      scope: 'chapter',
      ref: REF_GEN_1_1,
      rangeStart: REF_GEN_1_1,
      rangeEnd: REF_GEN_1_1,
      getEndVerse: () => 31,
    });
    expect(result).toEqual({
      start: { book: 'GEN', chapterNum: 1, verseNum: 0 },
      end: { book: 'GEN', chapterNum: 1, verseNum: 31 },
    });
  });

  it('chapter: getEndVerse returns 0 → fallback to a safe upper bound (200)', () => {
    const result = computeRangeFromScope({
      scope: 'chapter',
      ref: REF_GEN_5_7,
      rangeStart: REF_GEN_1_1,
      rangeEnd: REF_GEN_1_1,
      getEndVerse: () => 0,
    });
    expect(result.end.verseNum).toBe(200);
  });

  it('book: start = ch1:0, end = lastChapter:lastVerse via getEndVerse', () => {
    const result = computeRangeFromScope({
      scope: 'book',
      ref: REF_GEN_5_7,
      rangeStart: REF_GEN_1_1,
      rangeEnd: REF_GEN_1_1,
      getEndVerse: (_book, chapter) => (chapter === 50 ? 26 : 0),
      getLastChapter: () => 50,
    });
    expect(result).toEqual({
      start: { book: 'GEN', chapterNum: 1, verseNum: 0 },
      end: { book: 'GEN', chapterNum: 50, verseNum: 26 },
    });
  });

  it('book: getLastChapter returns 0 → fallback to chapter 150 (max for any biblical book)', () => {
    const result = computeRangeFromScope({
      scope: 'book',
      ref: REF_GEN_5_7,
      rangeStart: REF_GEN_1_1,
      rangeEnd: REF_GEN_1_1,
      getEndVerse: () => 0,
      getLastChapter: () => 0,
    });
    expect(result.end.chapterNum).toBe(150);
  });

  it('range: echoes rangeStart and rangeEnd verbatim', () => {
    const result = computeRangeFromScope({
      scope: 'range',
      ref: REF_GEN_5_7,
      rangeStart: REF_GEN_1_1,
      rangeEnd: REF_MAT_28_20,
      getEndVerse: () => 31,
    });
    expect(result).toEqual({ start: REF_GEN_1_1, end: REF_MAT_28_20 });
  });

  it('range: with rangeStart > rangeEnd, returns echo (caller responsibility)', () => {
    const result = computeRangeFromScope({
      scope: 'range',
      ref: REF_GEN_5_7,
      rangeStart: REF_MAT_28_20,
      rangeEnd: REF_GEN_1_1,
      getEndVerse: () => 31,
    });
    expect(result.start).toEqual(REF_MAT_28_20);
    expect(result.end).toEqual(REF_GEN_1_1);
  });

  it('selectedText / selectedBooks (unsupported): returns undefined', () => {
    expect(
      computeRangeFromScope({
        scope: 'selectedText',
        ref: REF_GEN_5_7,
        rangeStart: REF_GEN_1_1,
        rangeEnd: REF_GEN_1_1,
        getEndVerse: () => 31,
      }),
    ).toBeUndefined();
    expect(
      computeRangeFromScope({
        scope: 'selectedBooks',
        ref: REF_GEN_5_7,
        rangeStart: REF_GEN_1_1,
        rangeEnd: REF_GEN_1_1,
        getEndVerse: () => 31,
      }),
    ).toBeUndefined();
  });
});
