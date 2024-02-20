import {
  at,
  charAt,
  codePointAt,
  endsWith,
  includes,
  indexOf,
  lastIndexOf,
  length,
  normalize,
  padEnd,
  padStart,
  slice,
  split,
  startsWith,
  substring,
  toArray,
} from './string-util';

const SHORT_SURROGATE_PAIRS_STRING = 'Look𐐷At🦄';
const SHORT_SURROGATE_PAIRS_ARRAY = ['L', 'o', 'o', 'k', '𐐷', 'A', 't', '🦄'];

const MEDIUM_SURROGATE_PAIRS_STRING = 'Look𐐷At🦄This𐐷Thing😉Its𐐷Awesome';
const MEDIUM_SURROGATE_PAIRS_ARRAY = ['Look', 'At🦄This', 'Thing😉Its', 'Awesome'];

const LONG_SURROGATE_PAIRS_STRING =
  'Look𐐷At🦄All😎These😁Awesome🍕Symbols💩That🚀Are📷Represented😉By🍕Surrogate🔥Pairs💋!🌟';

const POS_FIRST_PIZZA = 25;
const POS_SECOND_PIZZA = 57;
const SURROGATE_PAIRS_STRING_LENGTH = 76;
const TEN_SPACES = '          ';
const SEVEN_XS = 'XXXXXXX';

const NORMALIZE_STRING = '\u0041\u006d\u00e9\u006c\u0069\u0065';
const NORMALIZE_SURROGATE_PAIRS = '\u0041\u006d\u0065\u0301\u006c\u0069\u0065';

describe('at', () => {
  test('at with in bounds index', () => {
    const result = at(LONG_SURROGATE_PAIRS_STRING, 4);
    expect(result).toEqual('𐐷');
  });

  test('at with negative index returns last character', () => {
    const result = at(LONG_SURROGATE_PAIRS_STRING, -1);
    expect(result).toEqual('🌟');
  });

  test('at with index greater than length returns undefined', () => {
    const result = at(LONG_SURROGATE_PAIRS_STRING, length(LONG_SURROGATE_PAIRS_STRING) + 10);
    expect(result).toEqual(undefined);
  });

  test('at with index smaller than -length returns undefined', () => {
    const result = at(LONG_SURROGATE_PAIRS_STRING, -length(LONG_SURROGATE_PAIRS_STRING) - 10);
    expect(result).toEqual(undefined);
  });
});

describe('charAt', () => {
  test('0 < index < string length', () => {
    const result = charAt(MEDIUM_SURROGATE_PAIRS_STRING, 7);
    expect(result).toEqual('🦄');
  });

  test('index < 0', () => {
    const result = charAt(MEDIUM_SURROGATE_PAIRS_STRING, -2);
    expect(result).toEqual('');
  });

  test('index > string length', () => {
    const result = charAt(MEDIUM_SURROGATE_PAIRS_STRING, 50);
    expect(result).toEqual('');
  });
});

describe('codePointAt', () => {
  test('codePointAt for regular character', () => {
    const result = codePointAt(MEDIUM_SURROGATE_PAIRS_STRING, 11);
    expect(result).toEqual(115);
  });

  test('codePointAt for surrogate pair', () => {
    const result = codePointAt(MEDIUM_SURROGATE_PAIRS_STRING, 7);
    expect(result).toEqual(129412);
  });

  test('codePointAt index < 0', () => {
    const result = codePointAt(MEDIUM_SURROGATE_PAIRS_STRING, -1);
    expect(result).toEqual(undefined);
  });

  test('codePointAt index > string length', () => {
    const result = codePointAt(MEDIUM_SURROGATE_PAIRS_STRING, 50);
    expect(result).toEqual(undefined);
  });
});

describe('endsWith', () => {
  test('endsWith without position', () => {
    const result = endsWith(LONG_SURROGATE_PAIRS_STRING, '💋!🌟');
    expect(result).toEqual(true);
  });

  test('endsWith with position', () => {
    const result = endsWith(LONG_SURROGATE_PAIRS_STRING, 'At🦄', 8);
    expect(result).toEqual(true);
  });
});

describe('includes', () => {
  test('includes without position', () => {
    const result = includes(LONG_SURROGATE_PAIRS_STRING, '🍕Symbols💩');
    expect(result).toEqual(true);
  });

  test('includes with position', () => {
    const result = includes(LONG_SURROGATE_PAIRS_STRING, '🦄All😎', 7);
    expect(result).toEqual(true);
  });

  test('includes with position that is to high, so no matches are found', () => {
    const result = includes(LONG_SURROGATE_PAIRS_STRING, '🦄All😎', 10);
    expect(result).toEqual(false);
  });
});

describe('indexOf', () => {
  test('indexOf without position', () => {
    const result = indexOf(LONG_SURROGATE_PAIRS_STRING, '🍕');
    expect(result).toEqual(POS_FIRST_PIZZA);
  });

  test('indexOf with position', () => {
    const result = indexOf(LONG_SURROGATE_PAIRS_STRING, '🍕', 40);
    expect(result).toEqual(POS_SECOND_PIZZA);
  });
});

describe('lastIndexOf', () => {
  test('lastIndexOf without position', () => {
    const result = lastIndexOf(LONG_SURROGATE_PAIRS_STRING, '🍕');
    expect(result).toEqual(POS_SECOND_PIZZA);
  });

  test('lastIndexOf with position', () => {
    const result = lastIndexOf(LONG_SURROGATE_PAIRS_STRING, '🍕', 5);
    expect(result).toEqual(-1);
  });
});

describe('length', () => {
  test('length is correct', () => {
    const result = length(LONG_SURROGATE_PAIRS_STRING);
    expect(result).toEqual(SURROGATE_PAIRS_STRING_LENGTH);
  });
});

describe('normalize', () => {
  test('normalize with no forms, compare strings', () => {
    const regularStringResult = normalize(NORMALIZE_STRING, 'none');
    const surrogatePairStringResult = normalize(NORMALIZE_SURROGATE_PAIRS, 'none');
    expect(regularStringResult === surrogatePairStringResult).toEqual(false);
  });

  test('normalize with different forms, compare strings', () => {
    const NFCResult = normalize(NORMALIZE_STRING, 'NFC');
    const NFDResult = normalize(NORMALIZE_SURROGATE_PAIRS, 'NFD');
    expect(NFCResult === NFDResult).toEqual(false);
  });

  test('normalize with same form, compare strings', () => {
    const regularStringResult = normalize(NORMALIZE_STRING, 'NFC');
    const surrogatePairStringResult = normalize(NORMALIZE_SURROGATE_PAIRS, 'NFC');
    expect(regularStringResult === surrogatePairStringResult).toEqual(true);
  });

  test('normalize surrogate pairs string', () => {
    const result = normalize(NORMALIZE_SURROGATE_PAIRS, 'NFC');
    expect(result).toEqual(NORMALIZE_STRING);
  });

  test('normalize surrogate pairs string as its own form', () => {
    const result = normalize(NORMALIZE_SURROGATE_PAIRS, 'NFD');
    expect(result).toEqual(NORMALIZE_SURROGATE_PAIRS);
  });
});

describe('padEnd', () => {
  test('padEnd without padString', () => {
    const result = padEnd(
      LONG_SURROGATE_PAIRS_STRING,
      SURROGATE_PAIRS_STRING_LENGTH + 10,
      undefined,
    );
    expect(result).toEqual(LONG_SURROGATE_PAIRS_STRING + TEN_SPACES);
  });

  test('padEnd with padString', () => {
    const result = padEnd(LONG_SURROGATE_PAIRS_STRING, SURROGATE_PAIRS_STRING_LENGTH + 7, 'X');
    expect(result).toEqual(LONG_SURROGATE_PAIRS_STRING + SEVEN_XS);
  });

  // Note: Limit with padString only works when length(padString) = 1, will be fixed with https://github.com/sallar/stringz/pull/59
  // It expects 10 'ha' but it should only give 5 'ha' because that would be length 10
  // limit only works when length(padString) = 1
  // ('padEnd with padString', () => {
  //   const result = padEnd(TEXT_STRING, TEST_STRING_LENGTH + 10, 'ha');
  //   expect(result).toEqual(`${TEXT_STRING}hahahahaha`);
  // });
});

describe('padStart', () => {
  test('padStart without padString', () => {
    const result = padStart(
      LONG_SURROGATE_PAIRS_STRING,
      SURROGATE_PAIRS_STRING_LENGTH + 10,
      undefined,
    );
    expect(result).toEqual(TEN_SPACES + LONG_SURROGATE_PAIRS_STRING);
  });

  test('padStart with padString', () => {
    const result = padStart(LONG_SURROGATE_PAIRS_STRING, SURROGATE_PAIRS_STRING_LENGTH + 7, 'X');
    expect(result).toEqual(SEVEN_XS + LONG_SURROGATE_PAIRS_STRING);
  });

  // Note: Limit with padString only works when length(padString) = 1, will be fixed with https://github.com/sallar/stringz/pull/59
  // It expects 10 'ha' but it should only give 5 'ha' because that would be length 10
  // limit only works when length(padString) = 1
  // ('padStart with padString', () => {
  //   const result = padStart(TEST_STRING, TEST_STRING_LENGTH + 10, 'ha');
  //   expect(result).toEqual(`hahahahaha${TEST_STRING}`);
  // });
});

describe('slice', () => {
  test('start (-inf)-(-L)', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -100);
    expect(result).toEqual(MEDIUM_SURROGATE_PAIRS_STRING);
  });
  test('start (-L)-0', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -3);
    expect(result).toEqual('ome');
  });
  test('start 0-L', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 3);
    expect(result).toEqual('k𐐷At🦄This𐐷Thing😉Its𐐷Awesome');
  });
  test('start L-inf', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 50);
    expect(result).toEqual('');
  });
  test('start (-inf)-(-L) end (-inf)-(-L)', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -200, -100);
    expect(result).toEqual('');
  });
  test('start (-inf)-(-L) end (-L)-0', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -100, -10);
    expect(result).toEqual('Look𐐷At🦄This𐐷Thing😉I');
  });
  test('start (-inf)-(-L) end 0-L', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -100, 8);
    expect(result).toEqual('Look𐐷At🦄');
  });
  test('start (-inf)-(-L) end L-inf', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -100, 100);
    expect(result).toEqual(MEDIUM_SURROGATE_PAIRS_STRING);
  });
  test('start (-L)-0 end (-inf)-(-L)', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -5, -100);
    expect(result).toEqual('');
  });
  test('start (-L)-0 end (-L)-0', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -5, -10);
    expect(result).toEqual('');
  });

  test('start (-L)-0 end (-L)-0 and start < end', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -10, -5);
    expect(result).toEqual('ts𐐷Aw');
  });
  test('start (-L)-0 end 0-L', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -5, 8);
    expect(result).toEqual('');
  });
  test('start (-L)-0 end L-inf', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -5, 100);
    expect(result).toEqual('');
  });
  test('start 0-L end (-inf)-(-L)', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 5, -100);
    expect(result).toEqual('');
  });
  test('start 0-L end (-L)-0', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 5, -10);
    expect(result).toEqual('At🦄This𐐷Thing😉I');
  });
  test('start 0-L end 0-L', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 5, 8);
    expect(result).toEqual('At🦄');
  });
  test('start 0-L end 0-L, and start > end', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 8, 5);
    expect(result).toEqual('');
  });
  test('start 0-L end L-inf', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 5, 100);
    expect(result).toEqual('At🦄This𐐷Thing😉Its𐐷Awesome');
  });
  test('start L-inf end (-inf)-(-L)', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 50, -100);
    expect(result).toEqual('');
  });
  test('start L-inf end (-L)-0', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 50, -10);
    expect(result).toEqual('');
  });
  test('start L-inf end 0-L', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 50, 8);
    expect(result).toEqual('');
  });
  test('start L-inf end L-inf', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 50, 100);
    expect(result).toEqual('');
  });
});

describe('split', () => {
  test('split without splitLimit', () => {
    const result = split(MEDIUM_SURROGATE_PAIRS_STRING, '𐐷');
    expect(result).toEqual(MEDIUM_SURROGATE_PAIRS_ARRAY);
  });

  test('split with splitLimit', () => {
    const result = split(MEDIUM_SURROGATE_PAIRS_STRING, '𐐷', 2);
    expect(result).toEqual(['Look', 'At🦄This𐐷Thing😉Its𐐷Awesome']);
  });

  test('split by empty string', () => {
    const result = split(SHORT_SURROGATE_PAIRS_STRING, '');
    expect(result).toEqual(SHORT_SURROGATE_PAIRS_ARRAY);
  });

  test('split by empty string with splitLimit', () => {
    const result = split(SHORT_SURROGATE_PAIRS_STRING, '', 3);
    expect(result).toEqual(['L', 'o', 'o']);
  });

  test('split with RegExp separator', () => {
    const result = split(MEDIUM_SURROGATE_PAIRS_STRING, /[A-Z]/);
    expect(result).toEqual(['', 'ook𐐷', 't🦄', 'his𐐷', 'hing😉', 'ts𐐷', 'wesome']);
  });

  test('split with RegExp separator that contains surrogate pairs', () => {
    const result = split(MEDIUM_SURROGATE_PAIRS_STRING, /🦄/);
    expect(result).toEqual(['Look𐐷At', 'This𐐷Thing😉Its𐐷Awesome']);
  });

  test('split with RegExp separator that matches nothing in the string', () => {
    const result = split(MEDIUM_SURROGATE_PAIRS_STRING, /\d/);
    expect(result).toEqual([MEDIUM_SURROGATE_PAIRS_STRING]);
  });
});

describe('startsWith', () => {
  test('startsWith without position', () => {
    const result = startsWith(LONG_SURROGATE_PAIRS_STRING, 'Look𐐷');
    expect(result).toEqual(true);
  });

  test('startsWith with position, searchString is not the start', () => {
    const result = startsWith(LONG_SURROGATE_PAIRS_STRING, 'Look𐐷', 5);
    expect(result).toEqual(false);
  });

  test('startsWith with position, searchString is the start', () => {
    const result = startsWith(LONG_SURROGATE_PAIRS_STRING, 'At🦄', 5);
    expect(result).toEqual(true);
  });
});

describe('substring', () => {
  test('substring with begin', () => {
    const result = substring(LONG_SURROGATE_PAIRS_STRING, POS_FIRST_PIZZA);
    expect(result).toEqual('🍕Symbols💩That🚀Are📷Represented😉By🍕Surrogate🔥Pairs💋!🌟');
  });

  test('substring with end', () => {
    const result = substring(LONG_SURROGATE_PAIRS_STRING, 0, POS_FIRST_PIZZA);
    expect(result).toEqual('Look𐐷At🦄All😎These😁Awesome');
  });

  test('substring with begin and end', () => {
    const result = substring(LONG_SURROGATE_PAIRS_STRING, POS_FIRST_PIZZA, POS_SECOND_PIZZA);
    expect(result).toEqual('🍕Symbols💩That🚀Are📷Represented😉By');
  });
});

describe('toArray', () => {
  test('toArray returns correct array', () => {
    const result = toArray(SHORT_SURROGATE_PAIRS_STRING);
    expect(result).toEqual(SHORT_SURROGATE_PAIRS_ARRAY);
  });
});
