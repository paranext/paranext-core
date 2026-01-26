import { describe, it, expect } from 'vitest';
import { isWithinRange } from './check-aggregator.utils';

describe('isWithinRange', () => {
  it('should return true for verse within range', () => {
    const range = {
      start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      end: { book: 'GEN', chapterNum: 3, verseNum: 1 },
    };
    const verseRef = { book: 'GEN', chapterNum: 2, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(true);
  });

  it('should return false for verse outside range', () => {
    const range = {
      start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      end: { book: 'GEN', chapterNum: 3, verseNum: 1 },
    };
    const verseRef = { book: 'GEN', chapterNum: 4, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(false);
  });

  it('should return true for verse at the start of range', () => {
    const range = {
      start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      end: { book: 'GEN', chapterNum: 3, verseNum: 1 },
    };
    const verseRef = { book: 'GEN', chapterNum: 1, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(true);
  });

  it('should return true for verse at the end of range', () => {
    const range = {
      start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      end: { book: 'GEN', chapterNum: 3, verseNum: 1 },
    };
    const verseRef = { book: 'GEN', chapterNum: 3, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(true);
  });

  it('should return true for verse within range without end', () => {
    const range = { start: { book: 'GEN', chapterNum: 1, verseNum: 1 } };
    const verseRef = { book: 'GEN', chapterNum: 2, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(true);
  });

  it('should return false for verse outside range without end', () => {
    const range = { start: { book: 'GEN', chapterNum: 1, verseNum: 1 } };
    const verseRef = { book: 'EXO', chapterNum: 1, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(false);
  });

  it('should return true for verse within range with different chapters', () => {
    const range = {
      start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      end: { book: 'GEN', chapterNum: 2, verseNum: 1 },
    };
    const verseRef = { book: 'GEN', chapterNum: 2, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(true);
  });

  it('should return false for verse outside range with different chapters', () => {
    const range = {
      start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      end: { book: 'GEN', chapterNum: 2, verseNum: 1 },
    };
    const verseRef = { book: 'GEN', chapterNum: 3, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(false);
  });

  it('should return true for verse within range with different books', () => {
    const range = {
      start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      end: { book: 'EXO', chapterNum: 1, verseNum: 1 },
    };

    const verseRef = { book: 'EXO', chapterNum: 1, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(true);
  });

  it('should return false for verse outside range with different books', () => {
    const range = {
      start: { book: 'GEN', chapterNum: 1, verseNum: 1 },
      end: { book: 'EXO', chapterNum: 1, verseNum: 1 },
    };
    const verseRef = { book: 'LEV', chapterNum: 1, verseNum: 1 };
    expect(isWithinRange(range, verseRef)).toBe(false);
  });
});
