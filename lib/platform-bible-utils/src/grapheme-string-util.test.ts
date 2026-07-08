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

describe('substring', () => {
  const long = new GraphemeString(LONG);
  const FIRST_PIZZA = 25;
  const SECOND_PIZZA = 57;
  it('with begin only', () =>
    expect(long.substring(FIRST_PIZZA).string).toEqual(
      '🍕Symbols💩That🚀Are📷Represented👮🏽‍♀️By🍕Surrogate🔥Pairs💋!🌟',
    ));
  it('with begin and end', () =>
    expect(long.substring(0, FIRST_PIZZA).string).toEqual('Look𐐷At🦄All😎These😁Awesome'));
  it('returns a GraphemeString instance', () =>
    expect(long.substring(0, 4)).toBeInstanceOf(GraphemeString));
  it('end < begin is empty', () =>
    expect(long.substring(SECOND_PIZZA, FIRST_PIZZA).string).toEqual(''));
});

describe('slice', () => {
  const m = new GraphemeString(MEDIUM);
  it('past -length clamps to start', () => expect(m.slice(-100).string).toEqual(MEDIUM));
  it('small negative counts from end', () => expect(m.slice(-3).string).toEqual('ome'));
  it('positive begin', () => expect(m.slice(3).string).toEqual('k𐐷At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome'));
  it('begin past end is empty', () => expect(m.slice(50).string).toEqual(''));
  it('negative begin and end, begin<end', () => expect(m.slice(-10, -5).string).toEqual('ts𐐷Aw'));
  it('negative begin and end, begin>end is empty', () =>
    expect(m.slice(-5, -10).string).toEqual(''));
  it('positive begin, negative end', () =>
    expect(m.slice(5, -10).string).toEqual('At🦄This𐐷Thing👮🏽‍♀️I'));
  it('begin>end is empty', () => expect(m.slice(8, 5).string).toEqual(''));
  it('end past length clamps to end', () =>
    expect(m.slice(5, 100).string).toEqual('At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome'));
  it('starting index 0 variants', () => {
    const s = new GraphemeString('hello-someone.d.ts');
    expect(s.slice(0).string).toBe('hello-someone.d.ts');
    expect(s.slice(0, 2).string).toBe('he');
    expect(s.slice(0, -new GraphemeString('.d.ts').length).string).toBe('hello-someone');
  });
  it('explicit end at length exercises the offsets end-guard', () =>
    expect(m.slice(5, m.length).string).toEqual('At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome'));
  it('begin === end is empty', () => expect(m.slice(3, 3).string).toEqual(''));
  it('empty source string', () => {
    const empty = new GraphemeString('');
    expect(empty.slice(0).string).toEqual('');
    expect(empty.slice(0, 5).string).toEqual('');
  });
});
