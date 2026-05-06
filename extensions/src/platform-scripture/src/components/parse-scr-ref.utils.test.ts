import { describe, it, expect } from 'vitest';
import { parseScrRef } from './parse-scr-ref.utils';

describe('parseScrRef', () => {
  it('parses "GEN 1:1"', () => {
    expect(parseScrRef('GEN 1:1')).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 1 });
  });

  it('parses three-letter books like "1JN 4:7"', () => {
    expect(parseScrRef('1JN 4:7')).toEqual({ book: '1JN', chapterNum: 4, verseNum: 7 });
  });

  it('parses "MAT 28:20"', () => {
    expect(parseScrRef('MAT 28:20')).toEqual({ book: 'MAT', chapterNum: 28, verseNum: 20 });
  });

  it('tolerates extra whitespace', () => {
    expect(parseScrRef('  GEN  1:1  ')).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 1 });
  });

  it('returns undefined for malformed input (no chapter:verse)', () => {
    expect(parseScrRef('GEN 1')).toBeUndefined();
  });

  it('returns undefined for empty string', () => {
    expect(parseScrRef('')).toBeUndefined();
  });

  it('returns undefined for non-numeric chapter/verse', () => {
    expect(parseScrRef('GEN A:1')).toBeUndefined();
    expect(parseScrRef('GEN 1:B')).toBeUndefined();
  });

  it('lowercases book id input → uppercase output', () => {
    expect(parseScrRef('gen 1:1')).toEqual({ book: 'GEN', chapterNum: 1, verseNum: 1 });
  });
});
