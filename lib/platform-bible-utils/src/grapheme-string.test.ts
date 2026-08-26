import { describe, it, expect } from 'vitest';
import { GraphemeString, testingGraphemeStringUtils } from './grapheme-string';

// #region Native-parity harness

/**
 * ASCII fixtures. For ASCII, one grapheme cluster is exactly one code point and exactly one UTF-16
 * code unit, so `String.prototype` is a correct oracle for every method below: any difference
 * between `GraphemeString` and native on these inputs is a bug in `GraphemeString`, never a
 * consequence of grapheme awareness. Grapheme-specific behavior is covered separately further
 * down.
 */
const ASCII = ['', 'a', 'abc', 'abcab', 'abab', 'aaa'];

/** Index arguments straddling every boundary: past both ends, both edges, and non-integers. */
const INDEXES = [-Infinity, -6, -4, -3, -1, -0.5, 0, 0.5, 1, 2, 2.5, 3, 4, 6, Infinity, NaN];

/**
 * Smaller index set for methods taking two indexes, to keep the cross product quick. `-0.5` earns
 * its place: it is the only value here that truncates to `-0` rather than to a negative integer, so
 * it is what distinguishes returning `-0` from native's `+0`.
 */
const RANGE_INDEXES = [-Infinity, -4, -1.5, -1, -0.5, 0, 1, 1.5, 3, 4, Infinity, NaN];

const NEEDLES = ['', 'a', 'b', 'ab', 'abc', 'z', 'bc'];

/** Render an argument list as a stable, readable key so a parity failure names the exact call. */
function describeArgs(args: readonly unknown[]): string {
  return args
    .map((arg) => (typeof arg === 'string' ? JSON.stringify(arg) : String(arg)))
    .join(', ');
}

/** Reduce a result to comparable plain data: GraphemeString becomes its text, arrays map through. */
function unwrap(value: unknown): unknown {
  if (value instanceof GraphemeString) return value.toString();
  if (Array.isArray(value)) return value.map(unwrap);
  return value;
}

/** Every ordered pair drawn from two lists. */
function pairs<T, U>(firsts: readonly T[], seconds: readonly U[]): [T, U][] {
  return firsts.flatMap((first) => seconds.map((second): [T, U] => [first, second]));
}

/**
 * Run a `GraphemeString` method and its native `String` counterpart over every (string, arguments)
 * combination, returning both result sets keyed by the exact call that produced them. A single
 * `expect` on the pair then reports every divergence at once — naming the input and arguments for
 * each — instead of stopping at the first.
 */
function nativeParity<TArgs extends unknown[]>(
  strings: readonly string[],
  argSets: readonly TArgs[],
  graphemeOperation: (graphemeString: GraphemeString, ...args: TArgs) => unknown,
  nativeOperation: (string: string, ...args: TArgs) => unknown,
): { grapheme: Record<string, unknown>; native: Record<string, unknown> } {
  const grapheme: Record<string, unknown> = {};
  const native: Record<string, unknown> = {};
  strings.forEach((string) => {
    argSets.forEach((args) => {
      const key = `${JSON.stringify(string)} (${describeArgs(args)})`;
      grapheme[key] = unwrap(graphemeOperation(new GraphemeString(string), ...args));
      native[key] = nativeOperation(string, ...args);
    });
  });
  return { grapheme, native };
}

const singles = <T>(values: readonly T[]): [T][] => values.map((value): [T] => [value]);

// #endregion

describe('native parity: point accessors', () => {
  it('at', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      singles(INDEXES),
      (graphemeString, index) => graphemeString.at(index),
      (str, index) => str.at(index),
    );
    expect(grapheme).toEqual(native);
  });

  it('charAt', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      singles(INDEXES),
      (graphemeString, index) => graphemeString.charAt(index),
      (str, index) => str.charAt(index),
    );
    expect(grapheme).toEqual(native);
  });

  it('codePointAt', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      singles(INDEXES),
      (graphemeString, index) => graphemeString.codePointAt(index),
      (str, index) => str.codePointAt(index),
    );
    expect(grapheme).toEqual(native);
  });

  it('length', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      [[]],
      (graphemeString) => graphemeString.length,
      (str) => str.length,
    );
    expect(grapheme).toEqual(native);
  });
});

describe('native parity: ranges', () => {
  it('slice with one argument', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      singles(RANGE_INDEXES),
      (graphemeString, start) => graphemeString.slice(start),
      (str, start) => str.slice(start),
    );
    expect(grapheme).toEqual(native);
  });

  it('slice with two arguments', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      pairs(RANGE_INDEXES, RANGE_INDEXES),
      (graphemeString, start, end) => graphemeString.slice(start, end),
      (str, start, end) => str.slice(start, end),
    );
    expect(grapheme).toEqual(native);
  });

  it('substring with one argument', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      singles(RANGE_INDEXES),
      (graphemeString, start) => graphemeString.substring(start),
      (str, start) => str.substring(start),
    );
    expect(grapheme).toEqual(native);
  });

  it('substring with two arguments, including reversed ranges', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      pairs(RANGE_INDEXES, RANGE_INDEXES),
      (graphemeString, start, end) => graphemeString.substring(start, end),
      (str, start, end) => str.substring(start, end),
    );
    expect(grapheme).toEqual(native);
  });
});

describe('native parity: search', () => {
  it('indexOf with a position', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      pairs(NEEDLES, RANGE_INDEXES),
      (graphemeString, needle, position) => graphemeString.indexOf(needle, position),
      (str, needle, position) => str.indexOf(needle, position),
    );
    expect(grapheme).toEqual(native);
  });

  it('indexOf with no position', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      singles(NEEDLES),
      (graphemeString, needle) => graphemeString.indexOf(needle),
      (str, needle) => str.indexOf(needle),
    );
    expect(grapheme).toEqual(native);
  });

  it('lastIndexOf with a position', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      pairs(NEEDLES, RANGE_INDEXES),
      (graphemeString, needle, position) => graphemeString.lastIndexOf(needle, position),
      (str, needle, position) => str.lastIndexOf(needle, position),
    );
    expect(grapheme).toEqual(native);
  });

  it('lastIndexOf with no position', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      singles(NEEDLES),
      (graphemeString, needle) => graphemeString.lastIndexOf(needle),
      (str, needle) => str.lastIndexOf(needle),
    );
    expect(grapheme).toEqual(native);
  });

  it('lastIndexOf with an explicitly undefined position', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      singles(NEEDLES),
      (graphemeString, needle) => graphemeString.lastIndexOf(needle, undefined),
      (str, needle) => str.lastIndexOf(needle, undefined),
    );
    expect(grapheme).toEqual(native);
  });

  it('includes', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      pairs(NEEDLES, RANGE_INDEXES),
      (graphemeString, needle, position) => graphemeString.includes(needle, position),
      (str, needle, position) => str.includes(needle, position),
    );
    expect(grapheme).toEqual(native);
  });

  it('startsWith', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      pairs(NEEDLES, RANGE_INDEXES),
      (graphemeString, needle, position) => graphemeString.startsWith(needle, position),
      (str, needle, position) => str.startsWith(needle, position),
    );
    expect(grapheme).toEqual(native);
  });

  it('endsWith', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      pairs(NEEDLES, RANGE_INDEXES),
      (graphemeString, needle, endPosition) => graphemeString.endsWith(needle, endPosition),
      (str, needle, endPosition) => str.endsWith(needle, endPosition),
    );
    expect(grapheme).toEqual(native);
  });

  it('endsWith with no end position', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      singles(NEEDLES),
      (graphemeString, needle) => graphemeString.endsWith(needle),
      (str, needle) => str.endsWith(needle),
    );
    expect(grapheme).toEqual(native);
  });
});

describe('native parity: padding', () => {
  // Infinity is excluded: native attempts to build an infinitely long string and throws.
  const PAD_LENGTHS = [-1, 0, 1, 3, 4, 6, 3.5, NaN];
  const PAD_STRINGS = ['', ' ', 'x', 'ha', 'xyz'];

  it('padStart', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      pairs(PAD_LENGTHS, PAD_STRINGS),
      (graphemeString, targetLength, pad) => graphemeString.padStart(targetLength, pad),
      (str, targetLength, pad) => str.padStart(targetLength, pad),
    );
    expect(grapheme).toEqual(native);
  });

  it('padEnd', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      pairs(PAD_LENGTHS, PAD_STRINGS),
      (graphemeString, targetLength, pad) => graphemeString.padEnd(targetLength, pad),
      (str, targetLength, pad) => str.padEnd(targetLength, pad),
    );
    expect(grapheme).toEqual(native);
  });

  it('padStart with the default pad string', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      singles(PAD_LENGTHS),
      (graphemeString, targetLength) => graphemeString.padStart(targetLength),
      (str, targetLength) => str.padStart(targetLength),
    );
    expect(grapheme).toEqual(native);
  });

  it('padEnd with the default pad string', () => {
    const { grapheme, native } = nativeParity(
      ASCII,
      singles(PAD_LENGTHS),
      (graphemeString, targetLength) => graphemeString.padEnd(targetLength),
      (str, targetLength) => str.padEnd(targetLength),
    );
    expect(grapheme).toEqual(native);
  });
});

describe('native parity: split', () => {
  const SPLIT_STRINGS = ['', 'a', 'abc', 'a,b,c', 'a1b2c', 'ab', ',a,', 'aaa'];
  // `/(a)|(1)/` is the only separator whose capture groups can go unused in a match, which is
  // what makes `undefined` entries reachable at all.
  const SEPARATORS = [
    '',
    ',',
    'a',
    'b',
    'z',
    ',b',
    /,/,
    /[abc]/,
    /(\d)/,
    /(a)|(1)/,
    /b*/,
    /(?:)/,
    /,/g,
  ];
  const LIMITS = [undefined, 0, 1, 2, 3, 10, -1, NaN, 1.5];

  it('with a limit', () => {
    const { grapheme, native } = nativeParity(
      SPLIT_STRINGS,
      pairs(SEPARATORS, LIMITS),
      // `split` is overloaded so a literal separator never yields `undefined` entries; a caller
      // holding a `string | RegExp` union has to pick the overload explicitly.
      (graphemeString, separator, limit) =>
        separator instanceof RegExp
          ? graphemeString.split(separator, limit)
          : graphemeString.split(separator, limit),
      (str, separator, limit) => str.split(separator, limit),
    );
    expect(grapheme).toEqual(native);
  });

  it('with no limit', () => {
    const { grapheme, native } = nativeParity(
      SPLIT_STRINGS,
      singles(SEPARATORS),
      (graphemeString, separator) =>
        separator instanceof RegExp
          ? graphemeString.split(separator)
          : graphemeString.split(separator),
      (str, separator) => str.split(separator),
    );
    expect(grapheme).toEqual(native);
  });

  // Not run through the parity harness because `String.prototype.split` is typed as requiring a
  // separator, so the native half of the comparison will not compile.
  it('with no separator returns the whole string, like native', () => {
    SPLIT_STRINGS.forEach((string) => {
      expect(new GraphemeString(string).split().map((part) => part?.toString())).toEqual([string]);
    });
  });
});

// #region Grapheme awareness — where the unit deliberately differs from native

const FAMILY = 'a👨‍👩‍👧‍👦b';
const OFFICER = '👮🏽‍♀️';
const MIXED = 'Look𐐷At👨‍👩‍👧‍👦👮🏽‍♀️';
const MIXED_GRAPHEMES = ['L', 'o', 'o', 'k', '𐐷', 'A', 't', '👨‍👩‍👧‍👦', '👮🏽‍♀️'];

describe('graphemes are the unit, not UTF-16 code units', () => {
  const family = new GraphemeString(FAMILY);

  it('length counts what a reader sees', () => {
    expect(family.length).toEqual(3);
    expect(FAMILY.length).toEqual(13);
    expect(new GraphemeString(MIXED).length).toEqual(9);
    expect(new GraphemeString('').length).toEqual(0);
  });

  it('toArray returns whole grapheme clusters', () => {
    expect(new GraphemeString(MIXED).toArray()).toEqual(MIXED_GRAPHEMES);
    expect(new GraphemeString('').toArray()).toEqual([]);
  });

  it('padding past the practical limit throws RangeError instead of exhausting memory', () => {
    const graphemeString = new GraphemeString('abc');
    [2 ** 20 + 1, 2 ** 24, 2 ** 29, Infinity, Number.MAX_SAFE_INTEGER].forEach((targetLength) => {
      expect(() => graphemeString.padStart(targetLength, 'x')).toThrow(RangeError);
      expect(() => graphemeString.padEnd(targetLength, 'x')).toThrow(RangeError);
    });
  });

  it('pads right up to the limit without throwing', () => {
    const graphemeString = new GraphemeString('abc');
    expect(graphemeString.padStart(2 ** 20, 'x').length).toEqual(2 ** 20);
    expect(graphemeString.padEnd(2 ** 20, 'x').length).toEqual(2 ** 20);
  });

  it('toArray returns a copy, so mutating it cannot corrupt the instance', () => {
    const graphemeString = new GraphemeString('abc');
    const graphemes = graphemeString.toArray();
    graphemes.push('XX');
    expect(graphemeString.length).toEqual(3);
    expect(graphemeString.toString()).toEqual('abc');
    expect(graphemeString.toArray()).toEqual(['a', 'b', 'c']);
    expect(graphemeString.slice(0, 2).toString()).toEqual('ab');
  });

  it('at returns a whole grapheme where native returns half a surrogate pair', () => {
    expect(family.at(1)).toEqual('👨‍👩‍👧‍👦');
    expect(family.at(-1)).toEqual('b');
    expect(family.at(3)).toBeUndefined();
  });

  it('slice and substring never cut a grapheme in half', () => {
    expect(family.slice(1, 2).toString()).toEqual('👨‍👩‍👧‍👦');
    expect(family.substring(0, 2).toString()).toEqual('a👨‍👩‍👧‍👦');
    expect(family.slice(-1).toString()).toEqual('b');
  });

  it('codePointAt reports the first code point of the grapheme', () => {
    expect(family.codePointAt(1)).toEqual(0x1f468);
    expect(new GraphemeString(MIXED).codePointAt(4)).toEqual(0x10437);
  });

  it('search refuses a match that starts or ends mid-grapheme', () => {
    // Native finds the father inside the family; no user would accept that as a match.
    expect(FAMILY.indexOf('👨')).toEqual(1);
    expect(family.indexOf('👨')).toEqual(-1);
    expect(family.includes('👨')).toEqual(false);
    expect(family.lastIndexOf('👦')).toEqual(-1);
    expect(family.startsWith('a👨')).toEqual(false);
    expect(family.endsWith('👦b')).toEqual(false);
  });

  it('search still finds matches aligned to grapheme boundaries', () => {
    expect(family.indexOf('👨‍👩‍👧‍👦')).toEqual(1);
    expect(family.indexOf('b')).toEqual(2);
    expect(family.lastIndexOf('👨‍👩‍👧‍👦')).toEqual(1);
    expect(family.startsWith('a👨‍👩‍👧‍👦')).toEqual(true);
    expect(family.endsWith('👨‍👩‍👧‍👦b')).toEqual(true);
    expect(family.includes('👨‍👩‍👧‍👦')).toEqual(true);
  });

  it('padding adds whole graphemes rather than filling UTF-16 slots', () => {
    // Native emits a stripped-down officer: wrong skin tone, wrong gender.
    expect('abc'.padEnd(5, OFFICER)).toEqual('abc👮');
    expect(new GraphemeString('abc').padEnd(5, OFFICER).toString()).toEqual(
      `abc${OFFICER}${OFFICER}`,
    );
    expect(new GraphemeString('abc').padStart(5, OFFICER).toString()).toEqual(
      `${OFFICER}${OFFICER}abc`,
    );
  });

  it('splitting on the empty string yields graphemes', () => {
    expect(new GraphemeString(MIXED).split('').map((part) => part?.toString())).toEqual(
      MIXED_GRAPHEMES,
    );
  });

  it('splitting keeps graphemes intact around separators', () => {
    expect(
      new GraphemeString('Look𐐷At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome')
        .split('𐐷')
        .map((part) => part?.toString()),
    ).toEqual(['Look', 'At🦄This', 'Thing👮🏽‍♀️Its', 'Awesome']);
  });

  it('a regex separator matching inside a cluster does not split it', () => {
    // U+1F468 MAN is the first code point of the family cluster, so native cuts the cluster open.
    // A match that does not begin and end on grapheme boundaries is skipped instead.
    expect(family.split(/\u{1F468}/u).map((part) => part?.toString())).toEqual([FAMILY]);
    expect(FAMILY.split(/\u{1F468}/u)).toEqual(['a', '\u200d👩‍👧‍👦b']);
  });
});

describe('toString', () => {
  it('returns the original string', () => {
    expect(new GraphemeString(MIXED).toString()).toEqual(MIXED);
    expect(new GraphemeString('').toString()).toEqual('');
  });

  it('drops into a template literal without an accessor', () => {
    const graphemeString = new GraphemeString(FAMILY);
    expect(`${graphemeString}`).toEqual(FAMILY);
    expect(`<${graphemeString.slice(1, 2)}>`).toEqual('<👨‍👩‍👧‍👦>');
  });

  it('works with String() and string concatenation', () => {
    const graphemeString = new GraphemeString('abc');
    expect(String(graphemeString)).toEqual('abc');
    expect(`${graphemeString}d`).toEqual('abcd');
  });

  it('a derived instance stringifies to its own text, not the whole parent', () => {
    expect(`${new GraphemeString(MIXED).slice(0, 4)}`).toEqual('Look');
  });
});

describe('derived values keep the parent segmentation', () => {
  it('range and pad methods return GraphemeString', () => {
    const graphemeString = new GraphemeString(MIXED);
    expect(graphemeString.slice(1)).toBeInstanceOf(GraphemeString);
    expect(graphemeString.substring(1)).toBeInstanceOf(GraphemeString);
    expect(graphemeString.padStart(20)).toBeInstanceOf(GraphemeString);
    expect(graphemeString.padEnd(20)).toBeInstanceOf(GraphemeString);
    expect(graphemeString.split('o')[0]).toBeInstanceOf(GraphemeString);
  });

  it('a derived instance indexes correctly without re-segmenting', () => {
    const tail = new GraphemeString(MIXED).slice(4);
    expect(tail.toString()).toEqual('𐐷At👨‍👩‍👧‍👦👮🏽‍♀️');
    expect(tail.length).toEqual(5);
    expect(tail.at(0)).toEqual('𐐷');
    expect(tail.at(-1)).toEqual('👮🏽‍♀️');
    expect(tail.indexOf('👨‍👩‍👧‍👦')).toEqual(3);
  });

  it('reuses the parent segmentation on every derived-instance route', () => {
    const mixed = new GraphemeString(MIXED);
    // slice/substring derive a child from a grapheme range
    expect(mixed.slice(4, 6).toArray()).toEqual(MIXED_GRAPHEMES.slice(4, 6));
    // splitting on '' derives one child per grapheme
    expect(mixed.split('').map((part) => part?.toString())).toEqual(MIXED_GRAPHEMES);
    // padding concatenates the pad graphemes onto the parent's
    expect(new GraphemeString('ab').padStart(4, 'xy').toArray()).toEqual(['x', 'y', 'a', 'b']);
    expect(new GraphemeString('ab').padEnd(4, 'xy').toArray()).toEqual(['a', 'b', 'x', 'y']);
  });

  it('accepts a GraphemeString as a search needle', () => {
    const graphemeString = new GraphemeString(MIXED);
    expect(graphemeString.indexOf(new GraphemeString('At'))).toEqual(5);
    expect(graphemeString.includes(new GraphemeString('At'))).toEqual(true);
    expect(graphemeString.startsWith(new GraphemeString('Look'))).toEqual(true);
    expect(graphemeString.endsWith(new GraphemeString(OFFICER))).toEqual(true);
    expect(graphemeString.lastIndexOf(new GraphemeString('o'))).toEqual(2);
  });
});

// #endregion

describe('indexOfClosestClosingCurlyBrace', () => {
  const { indexOfClosestClosingCurlyBrace } = testingGraphemeStringUtils;
  it('finds an unescaped closing brace', () =>
    expect(indexOfClosestClosingCurlyBrace(new GraphemeString('a{b}c'), 0, false)).toEqual(3));
  it('skips an escaped brace when searching for an unescaped one', () =>
    expect(indexOfClosestClosingCurlyBrace(new GraphemeString('a\\}b}c'), 0, false)).toEqual(4));
  it('returns -1 when no unescaped brace exists', () =>
    expect(indexOfClosestClosingCurlyBrace(new GraphemeString('abc'), 0, false)).toEqual(-1));
  it('returns -1 for a negative index', () =>
    expect(indexOfClosestClosingCurlyBrace(new GraphemeString('a{b}c'), -1, false)).toEqual(-1));
  it('finds an escaped brace and returns the brace index (not the backslash)', () =>
    expect(indexOfClosestClosingCurlyBrace(new GraphemeString('a\\}c'), 0, true)).toEqual(2));
  it('returns the escaped brace when starting exactly on it', () =>
    expect(indexOfClosestClosingCurlyBrace(new GraphemeString('a\\}c'), 2, true)).toEqual(2));

  describe('over a string mixing escapes and graphemes', () => {
    const curlyString =
      //           1           2
      // 23 456 78901 2 345678901 23456
      'Thi\\{s👮🏽‍♀️{is}👨‍👩‍👧‍👦\\}a {stri\\}ng}!';
    const curly = new GraphemeString(curlyString);

    it('gets the closest un-escaped curly brace', () => {
      let result = indexOfClosestClosingCurlyBrace(curly, 0, false);
      expect(result).toBe(10);
      result = indexOfClosestClosingCurlyBrace(curly, 4, false);
      expect(result).toBe(10);
      result = indexOfClosestClosingCurlyBrace(curly, 10, false);
      expect(result).toBe(10);
      result = indexOfClosestClosingCurlyBrace(curly, 11, false);
      expect(result).toBe(25);
      result = indexOfClosestClosingCurlyBrace(curly, 16, false);
      expect(result).toBe(25);
      result = indexOfClosestClosingCurlyBrace(curly, 23, false);
      expect(result).toBe(25);
      result = indexOfClosestClosingCurlyBrace(curly, 25, false);
      expect(result).toBe(25);
    });

    it('gets the closest escaped curly brace', () => {
      let result = indexOfClosestClosingCurlyBrace(curly, 0, true);
      expect(result).toBe(13);
      result = indexOfClosestClosingCurlyBrace(curly, 4, true);
      expect(result).toBe(13);
      result = indexOfClosestClosingCurlyBrace(curly, 10, true);
      expect(result).toBe(13);
      result = indexOfClosestClosingCurlyBrace(curly, 11, true);
      expect(result).toBe(13);
      result = indexOfClosestClosingCurlyBrace(curly, 13, true);
      expect(result).toBe(13);
      result = indexOfClosestClosingCurlyBrace(curly, 16, true);
      expect(result).toBe(22);
      result = indexOfClosestClosingCurlyBrace(curly, 22, true);
      expect(result).toBe(22);
    });

    it('returns -1 when out of bounds or no more curly braces are found', () => {
      const strLength = curly.length;
      let result = indexOfClosestClosingCurlyBrace(curly, -1, true);
      expect(result).toBe(-1);
      result = indexOfClosestClosingCurlyBrace(curly, -1, false);
      expect(result).toBe(-1);
      result = indexOfClosestClosingCurlyBrace(curly, -10, true);
      expect(result).toBe(-1);
      result = indexOfClosestClosingCurlyBrace(curly, -10, false);
      expect(result).toBe(-1);
      result = indexOfClosestClosingCurlyBrace(curly, strLength, true);
      expect(result).toBe(-1);
      result = indexOfClosestClosingCurlyBrace(curly, strLength, false);
      expect(result).toBe(-1);
      result = indexOfClosestClosingCurlyBrace(curly, strLength + 5, true);
      expect(result).toBe(-1);
      result = indexOfClosestClosingCurlyBrace(curly, strLength + 5, false);
      expect(result).toBe(-1);
      result = indexOfClosestClosingCurlyBrace(curly, 26, false);
      expect(result).toBe(-1);
      result = indexOfClosestClosingCurlyBrace(curly, 23, true);
      expect(result).toBe(-1);
    });
  });
});

describe('formatReplacementToArray', () => {
  it('combines all strings into one when replacer is a string', () => {
    expect(
      new GraphemeString('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome').formatReplacementToArray({
        'one-horned': 'Unicorn',
      }),
    ).toEqual(['Look𐐷At🦄This𐐷UnicornThing👮🏽‍♀️Its𐐷Awesome']);
  });
  it('keeps non-string replacers as separate entries', () => {
    expect(
      new GraphemeString('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome').formatReplacementToArray({
        'one-horned': ['Unicorn'],
      }),
    ).toEqual(['Look𐐷At🦄This𐐷', ['Unicorn'], 'Thing👮🏽‍♀️Its𐐷Awesome']);
  });
  it('handles surrogate pairs inside the replacer key', () => {
    expect(
      new GraphemeString('Look𐐷At🦄This𐐷{one👮🏽‍♀️horned}Thing👮🏽‍♀️Its𐐷Awesome').formatReplacementToArray({
        'one👮🏽‍♀️horned': ['Unicorn'],
      }),
    ).toEqual(['Look𐐷At🦄This𐐷', ['Unicorn'], 'Thing👮🏽‍♀️Its𐐷Awesome']);
  });
  it('unescapes escaped curly braces', () => {
    expect(
      new GraphemeString('Hi, this is {name}! I like \\{curly braces\\}!').formatReplacementToArray(
        {
          name: ['Jim'],
        },
      ),
    ).toEqual(['Hi, this is ', ['Jim'], '! I like {curly braces}!']);
  });
  it('empty curly braces are removed', () => {
    expect(
      new GraphemeString('Look𐐷At🦄This𐐷{}').formatReplacementToArray({
        'one-horned': ['Unicorn'],
      }),
    ).toEqual(['Look𐐷At🦄This𐐷']);
  });
  it('unknown key returns the key without braces', () => {
    expect(
      new GraphemeString('Look𐐷At🦄This𐐷{UFO}').formatReplacementToArray({
        'one-horned': ['Unicorn'],
      }),
    ).toEqual(['Look𐐷At🦄This𐐷UFO']);
  });
  it('curly braces at the start', () => {
    expect(
      new GraphemeString('{one-horned}Thing👮🏽‍♀️Its𐐷Awesome').formatReplacementToArray({
        'one-horned': ['Unicorn'],
      }),
    ).toEqual([['Unicorn'], 'Thing👮🏽‍♀️Its𐐷Awesome']);
  });
});

describe('formatReplacement', () => {
  it('substitutes string replacers', () => {
    expect(
      new GraphemeString('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome').formatReplacement({
        'one-horned': 'Unicorn',
      }),
    ).toEqual('Look𐐷At🦄This𐐷UnicornThing👮🏽‍♀️Its𐐷Awesome');
  });
  it('handles escaped braces', () => {
    expect(
      new GraphemeString('Hi, this is {name}! I like \\{curly braces\\}!').formatReplacement({
        name: 'Jim',
      }),
    ).toEqual('Hi, this is Jim! I like {curly braces}!');
  });
  it('coerces non-string replacers and joins', () => {
    expect(new GraphemeString('a{n}b').formatReplacement({ n: 9000 })).toEqual('a9000b');
  });
});
