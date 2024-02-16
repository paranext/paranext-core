import {
  at,
  charAt,
  codePointAt,
  endsWith,
  includes,
  indexOf,
  lastIndexOf,
  length,
  // limit,
  normalize,
  padEnd,
  padStart,
  // slice,
  split,
  startsWith,
  substr,
  substring,
  toArray,
} from './string-util';

const SURROGATE_PAIRS_STRING =
  'Look𐐷At🦄All😎These😁Awesome🍕Symbols💩That🚀Are📷Represented😉By🍕Surrogate🔥Pairs💋!🌟';

const SHORT_SURROGATE_PAIRS_STRING = 'Look𐐷At🦄';
const SHORT_SURROGATE_PAIRS_ARRAY = ['L', 'o', 'o', 'k', '𐐷', 'A', 't', '🦄'];

const SHORTER_SURROGATE_PAIRS_STRING = 'Look𐐷At🦄This𐐷Thing😉Its𐐷Awesome';
const SHORTER_SURROGATE_PAIRS_ARRAY = ['Look', 'At🦄This', 'Thing😉Its', 'Awesome'];

const POS_FIRST_PIZZA = 25;
const POS_SECOND_PIZZA = 57;
const SURROGATE_PAIRS_STRING_LENGTH = 76;
const TEN_SPACES = '          ';

const NORMALIZE_STRING = '\u0041\u006d\u00e9\u006c\u0069\u0065';
const NORMALIZE_SURROGATE_PAIRS = '\u0041\u006d\u0065\u0301\u006c\u0069\u0065';

describe('at', () => {
  test('at with in bounds index', () => {
    const result = at(SURROGATE_PAIRS_STRING, 4);
    expect(result).toEqual('𐐷');
  });

  test('at with negative index returns last character', () => {
    const result = at(SURROGATE_PAIRS_STRING, -1);
    expect(result).toEqual('🌟');
  });

  test('at with index greater than length returns empty string', () => {
    const result = at(SURROGATE_PAIRS_STRING, length(SURROGATE_PAIRS_STRING) + 10);
    expect(result).toEqual('');
  });
});

describe('charAt', () => {
  test('charAt', () => {
    const result = charAt(SURROGATE_PAIRS_STRING, 7);
    expect(result).toEqual('🦄');
  });
});

describe('codePointAt', () => {
  test('codePointAt', () => {
    const result = codePointAt(SURROGATE_PAIRS_STRING, 11);
    expect(result).toEqual(128526);
  });
});

describe('endsWith', () => {
  test('endsWith without position', () => {
    const result = endsWith(SURROGATE_PAIRS_STRING, '💋!🌟');
    expect(result).toEqual(true);
  });

  test('endsWith with position', () => {
    const result = endsWith(SURROGATE_PAIRS_STRING, 'At🦄', 8);
    expect(result).toEqual(true);
  });
});

describe('includes', () => {
  test('includes without position', () => {
    const result = includes(SURROGATE_PAIRS_STRING, '🍕Symbols💩');
    expect(result).toEqual(true);
  });

  test('includes with position', () => {
    const result = includes(SURROGATE_PAIRS_STRING, '🦄All😎', 7);
    expect(result).toEqual(true);
  });

  test('includes with position that is to high, so no matches are found', () => {
    const result = includes(SURROGATE_PAIRS_STRING, '🦄All😎', 10);
    expect(result).toEqual(false);
  });
});

describe('indexOf', () => {
  test('indexOf without position', () => {
    const result = indexOf(SURROGATE_PAIRS_STRING, '🍕');
    expect(result).toEqual(POS_FIRST_PIZZA);
  });

  test('indexOf with position', () => {
    const result = indexOf(SURROGATE_PAIRS_STRING, '🍕', 40);
    expect(result).toEqual(POS_SECOND_PIZZA);
  });
});

describe('lastIndexOf', () => {
  test('lastIndexOf without position', () => {
    const result = lastIndexOf(SURROGATE_PAIRS_STRING, '🍕');
    expect(result).toEqual(POS_SECOND_PIZZA);
  });

  test('lastIndexOf with position', () => {
    const result = lastIndexOf(SURROGATE_PAIRS_STRING, '🍕', 5);
    expect(result).toEqual(-1);
  });
});

describe('length', () => {
  test('length is correct', () => {
    const result = length(SURROGATE_PAIRS_STRING);
    expect(result).toEqual(SURROGATE_PAIRS_STRING_LENGTH);
  });
});

// TODO: limit test, waiting

// TODO: add tests once we add override?
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
    const result = padEnd(SURROGATE_PAIRS_STRING, SURROGATE_PAIRS_STRING_LENGTH + 10, undefined);
    expect(result).toEqual(SURROGATE_PAIRS_STRING + TEN_SPACES);
  });

  // TODO: Finish test, once implementation is fixed
  // It expects 10 'ha' but it should only give 5 'ha' because that would be length 10
  // limit only works when length(padString) = 1
  // ('padEnd with padString', () => {
  //   const result = padEnd(TEXT_STRING, TEST_STRING_LENGTH + 10, 'ha');
  //   expect(result).toEqual(`${TEXT_STRING}hahahahaha`);
  // });
});

describe('padStart', () => {
  test('padStart without padString', () => {
    const result = padStart(SURROGATE_PAIRS_STRING, SURROGATE_PAIRS_STRING_LENGTH + 10, undefined);
    expect(result).toEqual(TEN_SPACES + SURROGATE_PAIRS_STRING);
  });

  // TODO: Finish test, once implementation is fixed
  // It expects 10 'ha' but it should only give 5 'ha' because that would be length 10
  // limit only works when length(padString) = 1
  // ('padStart with padString', () => {
  //   const result = padStart(TEST_STRING, TEST_STRING_LENGTH + 10, 'ha');
  //   expect(result).toEqual(`hahahahaha${TEST_STRING}`);
  // });
});

// TODO: slice test, waiting
// ('slice', () => {
//   ('slice', () => {
//     const result = slice(SURROGATE_PAIRS_STRING, )
//   })
// })

describe('split', () => {
  test('split without splitLimit', () => {
    const result = split(SHORTER_SURROGATE_PAIRS_STRING, '𐐷');
    expect(result).toEqual(SHORTER_SURROGATE_PAIRS_ARRAY);
  });

  test('split with splitLimit', () => {
    const result = split(SHORTER_SURROGATE_PAIRS_STRING, '𐐷', 2);
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
    const result = split(SHORTER_SURROGATE_PAIRS_STRING, /[A-Z]/);
    expect(result).toEqual(['', 'ook𐐷', 't🦄', 'his𐐷', 'hing😉', 'ts𐐷', 'wesome']);
  });

  test('split with RegExp separator that contains surrogate pairs', () => {
    const result = split(SHORTER_SURROGATE_PAIRS_STRING, /🦄/);
    expect(result).toEqual(['Look𐐷At', 'This𐐷Thing😉Its𐐷Awesome']);
  });
});

describe('startsWith', () => {
  test('startsWith without position', () => {
    const result = startsWith(SURROGATE_PAIRS_STRING, 'Look𐐷');
    expect(result).toEqual(true);
  });

  test('startsWith with position, searchString is not the start', () => {
    const result = startsWith(SURROGATE_PAIRS_STRING, 'Look𐐷', 5);
    expect(result).toEqual(false);
  });

  test('startsWith with position, searchString is the start', () => {
    const result = startsWith(SURROGATE_PAIRS_STRING, 'At🦄', 5);
    expect(result).toEqual(true);
  });
});

describe('substr', () => {
  test('substr without begin or end', () => {
    const result = substr(SURROGATE_PAIRS_STRING);
    expect(result).toEqual(SURROGATE_PAIRS_STRING);
  });

  test('substr with begin', () => {
    const result = substr(SURROGATE_PAIRS_STRING, 5);
    expect(result).toEqual(
      'At🦄All😎These😁Awesome🍕Symbols💩That🚀Are📷Represented😉By🍕Surrogate🔥Pairs💋!🌟',
    );
  });

  test('substr with end', () => {
    const result = substr(SURROGATE_PAIRS_STRING, undefined, 25);
    expect(result).toEqual('Look𐐷At🦄All😎These😁Awesome');
  });

  test('substr with begin and end', () => {
    const result = substr(SURROGATE_PAIRS_STRING, 5, 25);
    expect(result).toEqual('At🦄All😎These😁Awesome🍕Symb');
  });
});

describe('substring', () => {
  test('substring with begin', () => {
    const result = substring(SURROGATE_PAIRS_STRING, POS_FIRST_PIZZA);
    expect(result).toEqual('🍕Symbols💩That🚀Are📷Represented😉By🍕Surrogate🔥Pairs💋!🌟');
  });

  test('substring with end', () => {
    const result = substring(SURROGATE_PAIRS_STRING, undefined, POS_FIRST_PIZZA);
    expect(result).toEqual('Look𐐷At🦄All😎These😁Awesome');
  });

  test('substring with begin and end', () => {
    const result = substring(SURROGATE_PAIRS_STRING, POS_FIRST_PIZZA, POS_SECOND_PIZZA);
    expect(result).toEqual('🍕Symbols💩That🚀Are📷Represented😉By');
  });
});

describe('toArray', () => {
  test('toArray returns correct array', () => {
    const result = toArray(SHORT_SURROGATE_PAIRS_STRING);
    expect(result).toEqual(SHORT_SURROGATE_PAIRS_ARRAY);
  });
});
