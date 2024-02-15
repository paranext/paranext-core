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
  // split,
  startsWith,
  // substr,
  substring,
  toArray,
} from './string-util';

const SURROGATE_PAIRS_STRING =
'Look𐐷At🦄All😎These😁Awesome🍕Symbols💩That🚀Are📷Represented😉By👌Surrogate🔥Pairs💋!🌟';
const TEXT_STRING = 'This is a really really cool string';
const POS_FIRST_REALLY = 10;
const POS_SECOND_REALLY = 17;
const TEST_STRING_LENGTH = 35;
const TEN_SPACES = '          ';

const TO_ARRAY_TEST_STRING = 'Hello';
const TO_ARRAY_TEST_ARRAY = ['H', 'e', 'l', 'l', 'o'];
const TO_ARRAY_TEST_STRING_LENGTH = 5;

describe('at', () => {
  test('at', () => {
    const result = at(SURROGATE_PAIRS_STRING, 4);
    expect(result).toEqual('𐐷');
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
    const result = includes(TEXT_STRING, 'really');
    expect(result).toEqual(true);
  });

  test('includes with position', () => {
    const result = includes(TEXT_STRING, 'really', 22);
    expect(result).toEqual(false);
  });
});

describe('indexOf', () => {
  test('indexOf without position', () => {
    const result = indexOf(TEXT_STRING, 'really');
    expect(result).toEqual(POS_FIRST_REALLY);
  });

  test('indexOf with position', () => {
    const result = indexOf(TEXT_STRING, 'really', 12);
    expect(result).toEqual(POS_SECOND_REALLY);
  });
});

describe('lastIndexOf', () => {
  test('lastIndexOf without position', () => {
    const result = lastIndexOf(TEXT_STRING, 'really');
    expect(result).toEqual(POS_SECOND_REALLY);
  });

  // Expecting -1 but returning 17
  // position should set the "start" of the string to 20, there is no 'really' from 20 to the end of the test string
  // ('lastIndexOf with position', () => {
  //   const result = lastIndexOf(TEST_STRING, 'really', 20);
  //   expect(result).toEqual(-1);
  // });
});

describe('length', () => {
  test('length is correct', () => {
    const result = length(TEXT_STRING);
    expect(result).toEqual(TEST_STRING_LENGTH);
  });
});

// TODO: limit test

describe('normalize', () => {
  test('normalize without form', () => {
    const result = normalize(TEXT_STRING);
    expect(result).toEqual(TEXT_STRING);
  });

  test('normalize with form', () => {
    const result = normalize(TEXT_STRING, 'NFC');
    expect(result).toEqual(TEXT_STRING);
  });
});

describe('padEnd', () => {
  test('padEnd without padString', () => {
    const result = padEnd(TEXT_STRING, TEST_STRING_LENGTH + 10, undefined);
    expect(result).toEqual(TEXT_STRING + TEN_SPACES);
  });

  // It expects 10 'ha' but it should only give 5 'ha' because that would be length 10
  // ('padEnd with padString', () => {
  //   const result = padEnd(TEST_STRING, TEST_STRING_LENGTH + 10, 'ha');
  //   expect(result).toEqual(`${TEST_STRING}hahahahaha`);
  // });
});

describe('padStart', () => {
  test('padStart without padString', () => {
    const result = padStart(TO_ARRAY_TEST_STRING, TO_ARRAY_TEST_STRING_LENGTH + 10, undefined);
    expect(result).toEqual(TEN_SPACES + TO_ARRAY_TEST_STRING);
  });

  // It expects 10 'ha' but it should only give 5 'ha' because that would be length 10
  // ('padStart with padString', () => {
  //   const result = padStart(TEST_STRING, TEST_STRING_LENGTH + 10, 'ha');
  //   expect(result).toEqual(`hahahahaha${TEST_STRING}`);
  // });
});

// TODO: slice test
// TODO: split test

describe('startsWith', () => {
  test('startsWith without position', () => {
    const result = startsWith(TEXT_STRING, 'This');
    expect(result).toEqual(true);
  });

  // Should test what the end is, not what it isn't
  test('startsWith with position', () => {
    const result = startsWith(TEXT_STRING, 'This', 5);
    expect(result).toEqual(false);
  });
});

// TODO: substr test

describe('substring', () => {
  test('substring with begin', () => {
    const result = substring(TEXT_STRING, POS_FIRST_REALLY);
    expect(result).toEqual('really really cool string');
  });

  test('substring with end', () => {
    const result = substring(TEXT_STRING, undefined, POS_FIRST_REALLY);
    expect(result).toEqual('This is a ');
  });

  test('substring with begin and end', () => {
    const result = substring(TEXT_STRING, POS_FIRST_REALLY, POS_SECOND_REALLY);
    expect(result).toEqual('really ');
  });
});

describe('toArray', () => {
  test('toArray returns correct array', () => {
    const result = toArray(TO_ARRAY_TEST_STRING);
    expect(result).toEqual(TO_ARRAY_TEST_ARRAY);
  });
});
