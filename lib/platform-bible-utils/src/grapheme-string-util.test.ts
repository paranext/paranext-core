import { describe, it, expect } from 'vitest';
import { GraphemeString } from './grapheme-string-util';

const SHORT = 'Look𐐷At👨‍👩‍👧‍👦👮🏽‍♀️';
const SHORT_ARRAY = ['L', 'o', 'o', 'k', '𐐷', 'A', 't', '👨‍👩‍👧‍👦', '👮🏽‍♀️'];

describe('GraphemeString basics', () => {
  it('exposes the original string', () => {
    expect(new GraphemeString(SHORT).string).toEqual(SHORT);
  });

  it('length counts graphemes, not UTF-16 units', () => {
    expect(new GraphemeString(SHORT).length).toEqual(9);
    expect(new GraphemeString('').length).toEqual(0);
  });

  it('toArray returns the grapheme clusters', () => {
    expect(new GraphemeString(SHORT).toArray()).toEqual(SHORT_ARRAY);
    expect(new GraphemeString('').toArray()).toEqual([]);
  });

  it('accepts a precomputed grapheme array without re-segmenting', () => {
    const gs = new GraphemeString('ab', ['a', 'b']);
    expect(gs.length).toEqual(2);
    expect(gs.toArray()).toEqual(['a', 'b']);
  });
});
