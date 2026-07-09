import { describe, it, expect } from 'vitest';
import { parseVerseRange, verseRangeIncludes } from './verse-display.utils';

describe('parseVerseRange', () => {
  it('parses a single verse number', () => {
    expect(parseVerseRange('5')).toEqual({ start: 5, end: 5 });
  });
  it('parses a combined range', () => {
    expect(parseVerseRange('14-15')).toEqual({ start: 14, end: 15 });
  });
  it('strips partial-verse letters at the range end', () => {
    expect(parseVerseRange('1-3a')).toEqual({ start: 1, end: 3 });
  });
  it('strips a partial-verse letter on a single verse', () => {
    expect(parseVerseRange('3a')).toEqual({ start: 3, end: 3 });
  });
});

describe('verseRangeIncludes', () => {
  it('includes the exact verse', () => {
    expect(verseRangeIncludes('5', 5)).toBe(true);
  });
  it('includes a verse inside a combined range', () => {
    expect(verseRangeIncludes('14-15', 15)).toBe(true);
  });
  it('excludes a verse outside the range', () => {
    expect(verseRangeIncludes('14-15', 16)).toBe(false);
  });
  it('is false for a non-numeric marker', () => {
    expect(verseRangeIncludes('abc', 1)).toBe(false);
  });
});
