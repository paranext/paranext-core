import { describe, it, expect } from 'vitest';
import { GraphemeString } from './grapheme-string-util';

const SHORT = 'Look𐐷At👨‍👩‍👧‍👦👮🏽‍♀️';
const SHORT_ARRAY = ['L', 'o', 'o', 'k', '𐐷', 'A', 't', '👨‍👩‍👧‍👦', '👮🏽‍♀️'];
const LONG =
  'Look𐐷At🦄All😎These😁Awesome🍕Symbols💩That🚀Are📷Represented👮🏽‍♀️By🍕Surrogate🔥Pairs💋!🌟';
const MEDIUM = 'Look𐐷At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome';

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

describe('at', () => {
  const long = new GraphemeString(LONG);
  it('in-bounds positive', () => expect(long.at(4)).toEqual('𐐷'));
  it('does not break a grapheme', () => expect(long.at(54)).toEqual('👮🏽‍♀️'));
  it('negative counts from the end', () => expect(long.at(-1)).toEqual('🌟'));
  it('-length is the first grapheme', () => expect(long.at(-long.length)).toEqual('L'));
  it('at length is undefined', () => expect(long.at(long.length)).toBeUndefined());
  it('past -length is undefined', () => expect(long.at(-(long.length + 1))).toBeUndefined());
  it('far past end is undefined', () => expect(long.at(long.length + 10)).toBeUndefined());
});

describe('charAt', () => {
  const med = new GraphemeString(MEDIUM);
  it('in-bounds', () => expect(med.charAt(7)).toEqual('🦄'));
  it('grapheme', () => expect(med.charAt(18)).toEqual('👮🏽‍♀️'));
  it('negative counts from the end (uniform semantics)', () => expect(med.charAt(-2)).toEqual('m'));
  it('past end is empty string', () => expect(med.charAt(50)).toEqual(''));
  it('at length is empty string', () => expect(med.charAt(med.length)).toEqual(''));
  it('length-1 is last', () => expect(med.charAt(med.length - 1)).toEqual('e'));
});

describe('codePointAt', () => {
  const med = new GraphemeString(MEDIUM);
  it('regular char', () => expect(med.codePointAt(11)).toEqual(115));
  it('surrogate pair', () => expect(med.codePointAt(7)).toEqual(129412));
  it('grapheme takes the first code point', () => expect(med.codePointAt(18)).toEqual(0x1f46e));
  it('past end is undefined', () => expect(med.codePointAt(50)).toBeUndefined());
  it('at length is undefined', () => expect(med.codePointAt(med.length)).toBeUndefined());
});
