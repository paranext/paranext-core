import { describe, it, expect } from 'vitest';
import {
  GraphemeString,
  formatReplacementString,
  formatReplacementStringToArray,
} from './grapheme-string-util';

const SHORT = 'Look𐐷At👨‍👩‍👧‍👦👮🏽‍♀️';
const SHORT_ARRAY = ['L', 'o', 'o', 'k', '𐐷', 'A', 't', '👨‍👩‍👧‍👦', '👮🏽‍♀️'];
const LONG =
  'Look𐐷At🦄All😎These😁Awesome🍕Symbols💩That🚀Are📷Represented👮🏽‍♀️By🍕Surrogate🔥Pairs💋!🌟';
const MEDIUM = 'Look𐐷At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome';
const NORMALIZE_COMPOSED = 'Amélie'; // "Amélie" with composed é (U+00E9)
const NORMALIZE_DECOMPOSED = 'Amélie'; // "Amélie" with e + combining ´ (U+0301)

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

describe('padStart / padEnd', () => {
  const long = new GraphemeString(LONG);
  it('padStart default space', () =>
    expect(long.padStart(long.length + 10).string).toEqual(`          ${long.string}`));
  it('padStart single char', () =>
    expect(long.padStart(long.length + 7, 'X').string).toEqual(`XXXXXXX${long.string}`));
  it('padStart multi-grapheme pad truncates to fit', () =>
    expect(long.padStart(long.length + 10, 'ha').string).toEqual(`hahahahaha${long.string}`));
  it('padEnd default space', () =>
    expect(long.padEnd(long.length + 10).string).toEqual(`${long.string}          `));
  it('padEnd multi-grapheme pad', () =>
    expect(long.padEnd(long.length + 10, 'ha').string).toEqual(`${long.string}hahahahaha`));
  it('target <= length returns self unchanged', () =>
    expect(long.padStart(long.length).string).toEqual(long.string));
});

describe('indexOf', () => {
  const long = new GraphemeString(LONG);
  const pizza = new GraphemeString('🍕');
  it('without position', () => expect(long.indexOf(pizza)).toEqual(25));
  it('with position', () => expect(long.indexOf(pizza, 40)).toEqual(57));
  it('position past length is -1', () => expect(long.indexOf(pizza, 100)).toEqual(-1));
  it('negative position counts from end (uniform)', () =>
    expect(long.indexOf(pizza, -20)).toEqual(57));
  it('accepts a raw string needle', () => expect(long.indexOf('🍕')).toEqual(25));
  it('empty needle is -1', () => expect(long.indexOf('')).toEqual(-1));
  it('multi-grapheme needle', () => expect(long.indexOf('🔥Pairs💋')).toEqual(67));
  it('needle at the very end', () => expect(long.indexOf('💋!🌟')).toEqual(73));
  it('absent needle is -1', () => expect(long.indexOf('Pizza')).toEqual(-1));
  it('needle longer than haystack is -1', () =>
    expect(new GraphemeString(MEDIUM).indexOf(long)).toEqual(-1));
});

describe('lastIndexOf', () => {
  const long = new GraphemeString(LONG);
  const pizza = new GraphemeString('🍕');
  it('without position', () => expect(long.lastIndexOf(pizza)).toEqual(57));
  it('with position searches backward', () => expect(long.lastIndexOf(pizza, 5)).toEqual(-1));
  it('position past length searches whole string', () =>
    expect(long.lastIndexOf(pizza, 100)).toEqual(57));
  it('negative position counts from end (uniform)', () =>
    expect(long.lastIndexOf(pizza, -1)).toEqual(57));
  it('empty needle is -1', () => expect(long.lastIndexOf('')).toEqual(-1));
  it('multi-grapheme needle', () => expect(long.lastIndexOf('🔥Pairs💋')).toEqual(67));
  it('needle at the end', () => expect(long.lastIndexOf('💋!🌟')).toEqual(73));
  it('absent needle is -1', () => expect(long.lastIndexOf('Pizza')).toEqual(-1));
});

describe('includes', () => {
  const long = new GraphemeString(LONG);
  const cool = new GraphemeString('🦄All😎');
  it('present', () => expect(long.includes(new GraphemeString('🍕Symbols💩'))).toBe(true));
  it('with position at the match', () => expect(long.includes(cool, 7)).toBe(true));
  it('with position past the match', () => expect(long.includes(cool, 10)).toBe(false));
  it('with position past length', () => expect(long.includes(cool, 100)).toBe(false));
  it('grapheme present', () => expect(long.includes('👮🏽‍♀️')).toBe(true));
  it('absent', () => expect(long.includes('🧑‍🚀')).toBe(false));
});

describe('startsWith', () => {
  const long = new GraphemeString(LONG);
  it('at start', () => expect(long.startsWith('Look𐐷')).toBe(true));
  it('wrong at position 5', () => expect(long.startsWith('Look𐐷', 5)).toBe(false));
  it('right at position 5', () => expect(long.startsWith('At🦄', 5)).toBe(true));
});

describe('endsWith', () => {
  const long = new GraphemeString(LONG);
  it('at end', () => expect(long.endsWith('💋!🌟')).toBe(true));
  it('absent at end', () => expect(long.endsWith('Pizza')).toBe(false));
  it('with endPosition', () => expect(long.endsWith('At🦄', 8)).toBe(true));
  it('with endPosition, wrong', () => expect(long.endsWith('Pizza', 8)).toBe(false));
  it('with endPosition and grapheme', () => expect(long.endsWith('👮🏽‍♀️', 55)).toBe(true));
  it('needle longer than string', () =>
    expect(new GraphemeString(MEDIUM).endsWith(long)).toBe(false));
});

describe('normalize', () => {
  it("'none' returns the raw string unchanged", () =>
    expect(new GraphemeString(NORMALIZE_DECOMPOSED).normalize('none')).toEqual(
      NORMALIZE_DECOMPOSED,
    ));
  it('NFC composes to the composed form', () =>
    expect(new GraphemeString(NORMALIZE_DECOMPOSED).normalize('NFC')).toEqual(NORMALIZE_COMPOSED));
  it('NFD keeps/produces the decomposed form', () =>
    expect(new GraphemeString(NORMALIZE_DECOMPOSED).normalize('NFD')).toEqual(
      NORMALIZE_DECOMPOSED,
    ));
  it('composed and decomposed are not raw-equal but NFC-equal', () => {
    // Different raw forms: composed é is 1 UTF-16 unit, decomposed e + ´ is 2.
    // (Compare lengths rather than `===` to avoid a TS2367 literal-type "no overlap" error.)
    expect(NORMALIZE_COMPOSED.length).not.toEqual(NORMALIZE_DECOMPOSED.length);
    expect(new GraphemeString(NORMALIZE_COMPOSED).normalize('NFC')).toEqual(
      new GraphemeString(NORMALIZE_DECOMPOSED).normalize('NFC'),
    );
  });
});

describe('ordinalCompare', () => {
  const unicorn = new GraphemeString('🦄');
  const police = new GraphemeString('👮🏽‍♀️');
  it('less than', () => expect(police.ordinalCompare(unicorn.string)).toBeLessThan(0));
  it('greater than', () => expect(unicorn.ordinalCompare(police.string)).toBeGreaterThan(0));
  it('equal', () => expect(unicorn.ordinalCompare(unicorn.string)).toBe(0));
});

describe('split', () => {
  const short = new GraphemeString('Look𐐷At👨‍👩‍👧‍👦👮🏽‍♀️');
  const medium = new GraphemeString(MEDIUM);
  const SHORT_ARRAY2 = ['L', 'o', 'o', 'k', '𐐷', 'A', 't', '👨‍👩‍👧‍👦', '👮🏽‍♀️'];
  const strs = (parts: GraphemeString[]) => parts.map((p) => p.string);

  it('by string separator', () =>
    expect(strs(medium.split('𐐷'))).toEqual(['Look', 'At🦄This', 'Thing👮🏽‍♀️Its', 'Awesome']));
  it('with splitLimit', () =>
    expect(strs(medium.split('𐐷', 2))).toEqual(['Look', 'At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome']));
  it('by empty string yields graphemes', () => expect(strs(short.split(''))).toEqual(SHORT_ARRAY2));
  it('by empty string with limit', () => expect(strs(short.split('', 3))).toEqual(['L', 'o', 'o']));
  it('by regex', () =>
    expect(strs(medium.split(/[A-Z]/))).toEqual([
      '',
      'ook𐐷',
      't🦄',
      'his𐐷',
      'hing👮🏽‍♀️',
      'ts𐐷',
      'wesome',
    ]));
  it('by regex with surrogate pair', () =>
    expect(strs(medium.split(/🦄/))).toEqual(['Look𐐷At', 'This𐐷Thing👮🏽‍♀️Its𐐷Awesome']));
  it('regex that matches nothing returns the whole string', () =>
    expect(strs(medium.split(/\d/))).toEqual([MEDIUM]));
  it('returns GraphemeString instances', () =>
    expect(medium.split('𐐷')[0]).toBeInstanceOf(GraphemeString));
});

describe('formatReplacementStringToArray', () => {
  it('combines all strings into one when replacer is a string', () => {
    expect(
      formatReplacementStringToArray('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome', {
        'one-horned': 'Unicorn',
      }),
    ).toEqual(['Look𐐷At🦄This𐐷UnicornThing👮🏽‍♀️Its𐐷Awesome']);
  });
  it('keeps non-string replacers as separate entries', () => {
    expect(
      formatReplacementStringToArray('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome', {
        'one-horned': ['Unicorn'],
      }),
    ).toEqual(['Look𐐷At🦄This𐐷', ['Unicorn'], 'Thing👮🏽‍♀️Its𐐷Awesome']);
  });
  it('handles surrogate pairs inside the replacer key', () => {
    expect(
      formatReplacementStringToArray('Look𐐷At🦄This𐐷{one👮🏽‍♀️horned}Thing👮🏽‍♀️Its𐐷Awesome', {
        'one👮🏽‍♀️horned': ['Unicorn'],
      }),
    ).toEqual(['Look𐐷At🦄This𐐷', ['Unicorn'], 'Thing👮🏽‍♀️Its𐐷Awesome']);
  });
  it('unescapes escaped curly braces', () => {
    expect(
      formatReplacementStringToArray('Hi, this is {name}! I like \\{curly braces\\}!', {
        name: ['Jim'],
      }),
    ).toEqual(['Hi, this is ', ['Jim'], '! I like {curly braces}!']);
  });
  it('empty curly braces are removed', () => {
    expect(
      formatReplacementStringToArray('Look𐐷At🦄This𐐷{}', { 'one-horned': ['Unicorn'] }),
    ).toEqual(['Look𐐷At🦄This𐐷']);
  });
  it('unknown key returns the key without braces', () => {
    expect(
      formatReplacementStringToArray('Look𐐷At🦄This𐐷{UFO}', { 'one-horned': ['Unicorn'] }),
    ).toEqual(['Look𐐷At🦄This𐐷UFO']);
  });
  it('curly braces at the start', () => {
    expect(
      formatReplacementStringToArray('{one-horned}Thing👮🏽‍♀️Its𐐷Awesome', {
        'one-horned': ['Unicorn'],
      }),
    ).toEqual([['Unicorn'], 'Thing👮🏽‍♀️Its𐐷Awesome']);
  });
});

describe('formatReplacementString', () => {
  it('substitutes string replacers', () => {
    expect(
      formatReplacementString('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome', {
        'one-horned': 'Unicorn',
      }),
    ).toEqual('Look𐐷At🦄This𐐷UnicornThing👮🏽‍♀️Its𐐷Awesome');
  });
  it('handles escaped braces', () => {
    expect(
      formatReplacementString('Hi, this is {name}! I like \\{curly braces\\}!', { name: 'Jim' }),
    ).toEqual('Hi, this is Jim! I like {curly braces}!');
  });
  it('coerces non-string replacers and joins', () => {
    expect(formatReplacementString('a{n}b', { n: 9000 })).toEqual('a9000b');
  });
});
