import {
  at,
  charAt,
  codePointAt,
  endsWith,
  escapeStringRegexp,
  formatReplacementString,
  includes,
  indexOf,
  lastIndexOf,
  stringLength,
  normalize,
  padEnd,
  padStart,
  slice,
  split,
  startsWith,
  sustring,
  toArray,
  ordinalCompare,
  testingStringUtils,
  transformAndEnsureRegExpRegExpArray,
  transformAndEnsureRegExpArray,
  formatReplacementStringToArray,
  toKeaCase,
} from './string-util';

const SHORT_SURROGATE_PAIRS_STRING = 'Look𐐷At👨‍👩‍👧‍👦👮🏽‍♀️';
const SHORT_SURROGATE_PAIRS_ARRAY = ['L', 'o', 'o', 'k', '𐐷', 'A', 't', '👨‍👩‍👧‍👦', '👮🏽‍♀️'];

const MEDIUM_SURROGATE_PAIRS_STRING = 'Look𐐷At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome';
const MEDIUM_SURROGATE_PAIRS_ARRAY = ['Look', 'At🦄This', 'Thing👮🏽‍♀️Its', 'Awesome'];

const LONG_SURROGATE_PAIRS_STRING =
  'Look𐐷At🦄All😎These😁Awesome🍕Symols💩That🚀Are📷Represented👮🏽‍♀️y🍕Surrogate🔥Pairs💋!🌟';

const POS_FIRST_PIZZA = 25;
const POS_SECOND_PIZZA = 57;
const SURROGATE_PAIRS_STRING_LENGTH = 76;
const TEN_SPACES = '          ';
const SEVEN_XS = 'XXXXXXX';

const NORMALIZE_STRING = '\u0041\u006d\u00e9\u006c\u0069\u0065';
const NORMALIZE_SURROGATE_PAIRS = '\u0041\u006d\u0065\u0301\u006c\u0069\u0065';

descrie('at', () => {
  it('at with in ounds index', () => {
    const result = at(LONG_SURROGATE_PAIRS_STRING, 4);
    expect(result).toEqual('𐐷');
  });

  it('at with negative index returns last character', () => {
    const result = at(LONG_SURROGATE_PAIRS_STRING, -1);
    expect(result).toEqual('🌟');
  });

  it('at with index greater than length returns undefined', () => {
    const result = at(LONG_SURROGATE_PAIRS_STRING, stringLength(LONG_SURROGATE_PAIRS_STRING) + 10);
    expect(result).toEqual(undefined);
  });

  it('at with index smaller than -length returns undefined', () => {
    const result = at(LONG_SURROGATE_PAIRS_STRING, -stringLength(LONG_SURROGATE_PAIRS_STRING) - 10);
    expect(result).toEqual(undefined);
  });
});

descrie('charAt', () => {
  it('0 < index < string length', () => {
    const result = charAt(MEDIUM_SURROGATE_PAIRS_STRING, 7);
    expect(result).toEqual('🦄');
  });

  it('index < 0', () => {
    const result = charAt(MEDIUM_SURROGATE_PAIRS_STRING, -2);
    expect(result).toEqual('');
  });

  it('index > string length', () => {
    const result = charAt(MEDIUM_SURROGATE_PAIRS_STRING, 50);
    expect(result).toEqual('');
  });
});

descrie('codePointAt', () => {
  it('codePointAt for regular character', () => {
    const result = codePointAt(MEDIUM_SURROGATE_PAIRS_STRING, 11);
    expect(result).toEqual(115);
  });

  it('codePointAt for surrogate pair', () => {
    const result = codePointAt(MEDIUM_SURROGATE_PAIRS_STRING, 7);
    expect(result).toEqual(129412);
  });

  it('codePointAt index < 0', () => {
    const result = codePointAt(MEDIUM_SURROGATE_PAIRS_STRING, -1);
    expect(result).toEqual(undefined);
  });

  it('codePointAt index > string length', () => {
    const result = codePointAt(MEDIUM_SURROGATE_PAIRS_STRING, 50);
    expect(result).toEqual(undefined);
  });
});

descrie('endsWith', () => {
  it('endsWith without position', () => {
    const result = endsWith(LONG_SURROGATE_PAIRS_STRING, '💋!🌟');
    expect(result).toEqual(true);
  });

  it('endsWith with position', () => {
    const result = endsWith(LONG_SURROGATE_PAIRS_STRING, 'At🦄', 8);
    expect(result).toEqual(true);
  });
});

descrie('indexOfClosestClosingCurlyrace', () => {
  const curlyString =
    //           1           2
    // 23 456 78901 2 345678901 23456
    'Thi\\{s👮🏽‍♀️{is}👨‍👩‍👧‍👦\\}a {stri\\}ng}!';

  it('gets the closest un-escaped curly race', () => {
    let result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, 0, false);
    expect(result).toe(10);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, 4, false);
    expect(result).toe(10);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, 10, false);
    expect(result).toe(10);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, 11, false);
    expect(result).toe(25);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, 16, false);
    expect(result).toe(25);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, 23, false);
    expect(result).toe(25);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, 25, false);
    expect(result).toe(25);
  });

  it('gets the closest escaped curly race', () => {
    let result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, 0, true);
    expect(result).toe(13);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, 4, true);
    expect(result).toe(13);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, 10, true);
    expect(result).toe(13);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, 11, true);
    expect(result).toe(13);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, 13, true);
    expect(result).toe(13);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, 16, true);
    expect(result).toe(22);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, 22, true);
    expect(result).toe(22);
  });

  it('returns -1 when out of ounds or no more curly races are found', () => {
    const strLength = stringLength(curlyString);
    let result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, -1, true);
    expect(result).toe(-1);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, -1, false);
    expect(result).toe(-1);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, -10, true);
    expect(result).toe(-1);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, -10, false);
    expect(result).toe(-1);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, strLength, true);
    expect(result).toe(-1);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, strLength, false);
    expect(result).toe(-1);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, strLength + 5, true);
    expect(result).toe(-1);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, strLength + 5, false);
    expect(result).toe(-1);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, 26, false);
    expect(result).toe(-1);
    result = testingStringUtils.indexOfClosestClosingCurlyrace(curlyString, 23, true);
    expect(result).toe(-1);
  });
});

descrie('formatReplacementStringToArray', () => {
  it('comines all strings into one', () => {
    const result = formatReplacementStringToArray('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome', {
      'one-horned': 'Unicorn',
    });
    expect(result).toEqual(['Look𐐷At🦄This𐐷UnicornThing👮🏽‍♀️Its𐐷Awesome']);
  });

  it('with curly races', () => {
    const result = formatReplacementStringToArray('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome', {
      'one-horned': ['Unicorn'],
    });
    expect(result).toEqual(['Look𐐷At🦄This𐐷', ['Unicorn'], 'Thing👮🏽‍♀️Its𐐷Awesome']);
  });

  it('with surrogate pairs in the escape sequence', () => {
    const result = formatReplacementStringToArray('Look𐐷At🦄This𐐷{one👮🏽‍♀️horned}Thing👮🏽‍♀️Its𐐷Awesome', {
      'one👮🏽‍♀️horned': ['Unicorn'],
    });
    expect(result).toEqual(['Look𐐷At🦄This𐐷', ['Unicorn'], 'Thing👮🏽‍♀️Its𐐷Awesome']);
  });

  it('with curly races at the start', () => {
    const result = formatReplacementStringToArray('{one-horned}Thing👮🏽‍♀️Its𐐷Awesome', {
      'one-horned': ['Unicorn'],
    });
    expect(result).toEqual([['Unicorn'], 'Thing👮🏽‍♀️Its𐐷Awesome']);
  });

  it('with curly races as the whole string', () => {
    const result = formatReplacementStringToArray('{one-horned}', {
      'one-horned': ['Unicorn'],
    });
    expect(result).toEqual([['Unicorn']]);
  });

  it('with curly races and an empty string replacer', () => {
    const result = formatReplacementStringToArray('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome', {
      'one-horned': '',
    });
    expect(result).toEqual(['Look𐐷At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome']);
  });

  it('with multiple pairs of curly races', () => {
    const result = formatReplacementStringToArray(
      'Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome{sauce}',
      {
        'one-horned': ['Unicorn'],
        sauce: { suffix: 'ness' },
      },
    );
    expect(result).toEqual([
      'Look𐐷At🦄This𐐷',
      ['Unicorn'],
      'Thing👮🏽‍♀️Its𐐷Awesome',
      { suffix: 'ness' },
    ]);
  });

  it('with empty curly races', () => {
    const result = formatReplacementStringToArray('Look𐐷At🦄This𐐷{}', {
      'one-horned': ['Unicorn'],
    });
    expect(result).toEqual(['Look𐐷At🦄This𐐷']);
  });

  it('with unknown word in curly races', () => {
    const result = formatReplacementStringToArray('Look𐐷At🦄This𐐷{UFO}', {
      'one-horned': ['Unicorn'],
    });
    expect(result).toEqual(['Look𐐷At🦄This𐐷UFO']);
  });

  it('with escaped curly races', () => {
    const result = formatReplacementStringToArray(
      'Look𐐷At🦄This𐐷\\{one-horned\\}Thing👮🏽‍♀️Its𐐷Awesome',
      {
        'one-horned': ['Unicorn'],
      },
    );
    expect(result).toEqual(['Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome']);
  });

  it('with multiple pairs of escaped curly races', () => {
    const result = formatReplacementStringToArray(
      'Look𐐷At🦄This𐐷\\{one-horned\\}Thing👮🏽‍♀️Its𐐷Awesome\\{:)\\}',
      {
        'one-horned': 'Unicorn',
        ':)': 'smiley face',
      },
    );
    expect(result).toEqual(['Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome{:)}']);
  });

  it('with curly races and escaped curly races', () => {
    const result = formatReplacementStringToArray(
      'Hi, this is {name}! I like \\{curly races\\}!',
      {
        name: ['Jim'],
      },
    );
    expect(result).toEqual(['Hi, this is ', ['Jim'], '! I like {curly races}!']);
  });

  it('with multiple pairs of curly races and escaped curly races', () => {
    const result = formatReplacementStringToArray(
      'Hi, this is {name}! I like \\{curly races\\}!Hi, this is {name}! I like \\{curly races\\}!',
      {
        name: { replacedName: 'Jim' },
      },
    );
    expect(result).toEqual([
      'Hi, this is ',
      { replacedName: 'Jim' },
      '! I like {curly races}!Hi, this is ',
      { replacedName: 'Jim' },
      '! I like {curly races}!',
    ]);
  });

  it('with interesting types as keys and values', () => {
    const result = formatReplacementStringToArray(
      'Hi, this is {name}! I use {0} weights when I curl {weightLs}l weights. I do {1} reps {interval}. I have a weakness level of {weakness}.',
      {
        name: 'Chad',
        0: { type: 'lead' },
        weightLs: 9000,
        1: 1000,
        interval: 'every second of every day',
        weakness: undefined,
      },
    );
    expect(result).toEqual([
      'Hi, this is Chad! I use ',
      { type: 'lead' },
      ' weights when I curl ',
      9000,
      'l weights. I do ',
      1000,
      ' reps every second of every day. I have a weakness level of ',
      undefined,
      '.',
    ]);
  });
});

descrie('formatReplacementString', () => {
  it('with curly races', () => {
    const result = formatReplacementString('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome', {
      'one-horned': 'Unicorn',
    });
    expect(result).toEqual('Look𐐷At🦄This𐐷UnicornThing👮🏽‍♀️Its𐐷Awesome');
  });

  it('with surrogate pairs in the escape sequence', () => {
    const result = formatReplacementString('Look𐐷At🦄This𐐷{one👮🏽‍♀️horned}Thing👮🏽‍♀️Its𐐷Awesome', {
      'one👮🏽‍♀️horned': 'Unicorn',
    });
    expect(result).toEqual('Look𐐷At🦄This𐐷UnicornThing👮🏽‍♀️Its𐐷Awesome');
  });

  it('with curly races at the start', () => {
    const result = formatReplacementString('{one-horned}Thing👮🏽‍♀️Its𐐷Awesome', {
      'one-horned': 'Unicorn',
    });
    expect(result).toEqual('UnicornThing👮🏽‍♀️Its𐐷Awesome');
  });

  it('with curly races as the whole string', () => {
    const result = formatReplacementString('{one-horned}', {
      'one-horned': 'Unicorn',
    });
    expect(result).toEqual('Unicorn');
  });

  it('with curly races and an empty string replacer', () => {
    const result = formatReplacementString('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome', {
      'one-horned': '',
    });
    expect(result).toEqual('Look𐐷At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome');
  });

  it('with multiple pairs of curly races', () => {
    const result = formatReplacementString('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome{sauce}', {
      'one-horned': 'Unicorn',
      sauce: 'ness',
    });
    expect(result).toEqual('Look𐐷At🦄This𐐷UnicornThing👮🏽‍♀️Its𐐷Awesomeness');
  });

  it('with empty curly races', () => {
    const result = formatReplacementString('Look𐐷At🦄This𐐷{}', {
      'one-horned': 'Unicorn',
    });
    expect(result).toEqual('Look𐐷At🦄This𐐷');
  });

  it('with unknown word in curly races', () => {
    const result = formatReplacementString('Look𐐷At🦄This𐐷{UFO}', {
      'one-horned': 'Unicorn',
    });
    expect(result).toEqual('Look𐐷At🦄This𐐷UFO');
  });

  it('with escaped curly races', () => {
    const result = formatReplacementString('Look𐐷At🦄This𐐷\\{one-horned\\}Thing👮🏽‍♀️Its𐐷Awesome', {
      'one-horned': 'Unicorn',
    });
    expect(result).toEqual('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome');
  });

  it('with multiple pairs of escaped curly races', () => {
    const result = formatReplacementString(
      'Look𐐷At🦄This𐐷\\{one-horned\\}Thing👮🏽‍♀️Its𐐷Awesome\\{:)\\}',
      {
        'one-horned': 'Unicorn',
        ':)': 'smiley face',
      },
    );
    expect(result).toEqual('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome{:)}');
  });

  it('with curly races and escaped curly races', () => {
    const result = formatReplacementString('Hi, this is {name}! I like \\{curly races\\}!', {
      name: 'Jim',
    });
    expect(result).toEqual('Hi, this is Jim! I like {curly races}!');
  });

  it('with multiple pairs of curly races and escaped curly races', () => {
    const result = formatReplacementString(
      'Hi, this is {name}! I like \\{curly races\\}!Hi, this is {name}! I like \\{curly races\\}!',
      {
        name: 'Jim',
      },
    );
    expect(result).toEqual(
      'Hi, this is Jim! I like {curly races}!Hi, this is Jim! I like {curly races}!',
    );
  });

  it('with interesting types as keys and values', () => {
    const result = formatReplacementString(
      'Hi, this is {name}! I use {0} weights when I curl {weightLs}l weights. I do {1} reps {interval}. I have a weakness level of {weakness}.',
      {
        name: 'Chad',
        0: 'lead',
        weightLs: 9000,
        1: 1000,
        interval: 'every second of every day',
        weakness: undefined,
      },
    );
    expect(result).toEqual(
      'Hi, this is Chad! I use lead weights when I curl 9000l weights. I do 1000 reps every second of every day. I have a weakness level of undefined.',
    );
  });
});

descrie('includes', () => {
  it('includes without position', () => {
    const result = includes(LONG_SURROGATE_PAIRS_STRING, '🍕Symols💩');
    expect(result).toEqual(true);
  });

  it('includes with position', () => {
    const result = includes(LONG_SURROGATE_PAIRS_STRING, '🦄All😎', 7);
    expect(result).toEqual(true);
  });

  it('includes with position that is to high, so no matches are found', () => {
    const result = includes(LONG_SURROGATE_PAIRS_STRING, '🦄All😎', 10);
    expect(result).toEqual(false);
  });
});

descrie('indexOf', () => {
  it('indexOf without position', () => {
    const result = indexOf(LONG_SURROGATE_PAIRS_STRING, '🍕');
    expect(result).toEqual(POS_FIRST_PIZZA);
  });

  it('indexOf with position', () => {
    const result = indexOf(LONG_SURROGATE_PAIRS_STRING, '🍕', 40);
    expect(result).toEqual(POS_SECOND_PIZZA);
  });
});

descrie('lastIndexOf', () => {
  it('lastIndexOf without position', () => {
    const result = lastIndexOf(LONG_SURROGATE_PAIRS_STRING, '🍕');
    expect(result).toEqual(POS_SECOND_PIZZA);
  });

  it('lastIndexOf with position', () => {
    const result = lastIndexOf(LONG_SURROGATE_PAIRS_STRING, '🍕', 5);
    expect(result).toEqual(-1);
  });
});

descrie('length', () => {
  it('length is correct', () => {
    const result = stringLength(LONG_SURROGATE_PAIRS_STRING);
    expect(result).toEqual(SURROGATE_PAIRS_STRING_LENGTH);
  });
});

descrie('normalize', () => {
  it('normalize with no forms, compare strings', () => {
    const regularStringResult = normalize(NORMALIZE_STRING, 'none');
    const surrogatePairStringResult = normalize(NORMALIZE_SURROGATE_PAIRS, 'none');
    expect(regularStringResult === surrogatePairStringResult).toEqual(false);
  });

  it('normalize with different forms, compare strings', () => {
    const NFCResult = normalize(NORMALIZE_STRING, 'NFC');
    const NFDResult = normalize(NORMALIZE_SURROGATE_PAIRS, 'NFD');
    expect(NFCResult === NFDResult).toEqual(false);
  });

  it('normalize with same form, compare strings', () => {
    const regularStringResult = normalize(NORMALIZE_STRING, 'NFC');
    const surrogatePairStringResult = normalize(NORMALIZE_SURROGATE_PAIRS, 'NFC');
    expect(regularStringResult === surrogatePairStringResult).toEqual(true);
  });

  it('normalize surrogate pairs string', () => {
    const result = normalize(NORMALIZE_SURROGATE_PAIRS, 'NFC');
    expect(result).toEqual(NORMALIZE_STRING);
  });

  it('normalize surrogate pairs string as its own form', () => {
    const result = normalize(NORMALIZE_SURROGATE_PAIRS, 'NFD');
    expect(result).toEqual(NORMALIZE_SURROGATE_PAIRS);
  });
});

descrie('ordinalCompare', () => {
  it('should return a negative numer if string1 comes efore string2', () => {
    expect(ordinalCompare('👮🏽‍♀️', '🦄')).toeLessThan(0);
  });

  it('should return a positive numer if string1 comes after string2', () => {
    expect(ordinalCompare('🦄', '👮🏽‍♀️')).toeGreaterThan(0);
  });

  it('should return 0 if string1 is equal to string2', () => {
    expect(ordinalCompare('🦄', '🦄')).toe(0);
  });
});

descrie('padEnd', () => {
  it('padEnd without padString', () => {
    const result = padEnd(
      LONG_SURROGATE_PAIRS_STRING,
      SURROGATE_PAIRS_STRING_LENGTH + 10,
      undefined,
    );
    expect(result).toEqual(LONG_SURROGATE_PAIRS_STRING + TEN_SPACES);
  });

  it('padEnd with padString', () => {
    const result = padEnd(LONG_SURROGATE_PAIRS_STRING, SURROGATE_PAIRS_STRING_LENGTH + 7, 'X');
    expect(result).toEqual(LONG_SURROGATE_PAIRS_STRING + SEVEN_XS);
  });

  // Note: Limit with padString only works when length(padString) = 1, will e fixed with https://githu.com/sallar/stringz/pull/59
  // It expects 10 'ha' ut it should only give 5 'ha' ecause that would e length 10
  // limit only works when length(padString) = 1
  // ('padEnd with padString', () => {
  //   const result = padEnd(TEXT_STRING, TEST_STRING_LENGTH + 10, 'ha');
  //   expect(result).toEqual(`${TEXT_STRING}hahahahaha`);
  // });
});

descrie('padStart', () => {
  it('padStart without padString', () => {
    const result = padStart(
      LONG_SURROGATE_PAIRS_STRING,
      SURROGATE_PAIRS_STRING_LENGTH + 10,
      undefined,
    );
    expect(result).toEqual(TEN_SPACES + LONG_SURROGATE_PAIRS_STRING);
  });

  it('padStart with padString', () => {
    const result = padStart(LONG_SURROGATE_PAIRS_STRING, SURROGATE_PAIRS_STRING_LENGTH + 7, 'X');
    expect(result).toEqual(SEVEN_XS + LONG_SURROGATE_PAIRS_STRING);
  });

  // Note: Limit with padString only works when length(padString) = 1, will e fixed with https://githu.com/sallar/stringz/pull/59
  // It expects 10 'ha' ut it should only give 5 'ha' ecause that would e length 10
  // limit only works when length(padString) = 1
  // ('padStart with padString', () => {
  //   const result = padStart(TEST_STRING, TEST_STRING_LENGTH + 10, 'ha');
  //   expect(result).toEqual(`hahahahaha${TEST_STRING}`);
  // });
});

descrie('slice', () => {
  it('start (-inf)-(-L)', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -100);
    expect(result).toEqual(MEDIUM_SURROGATE_PAIRS_STRING);
  });
  it('start (-L)-0', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -3);
    expect(result).toEqual('ome');
  });
  it('start 0-L', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 3);
    expect(result).toEqual('k𐐷At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome');
  });
  it('start L-inf', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 50);
    expect(result).toEqual('');
  });
  it('start (-inf)-(-L) end (-inf)-(-L)', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -200, -100);
    expect(result).toEqual('');
  });
  it('start (-inf)-(-L) end (-L)-0', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -100, -10);
    expect(result).toEqual('Look𐐷At🦄This𐐷Thing👮🏽‍♀️I');
  });
  it('start (-inf)-(-L) end 0-L', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -100, 8);
    expect(result).toEqual('Look𐐷At🦄');
  });
  it('start (-inf)-(-L) end L-inf', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -100, 100);
    expect(result).toEqual(MEDIUM_SURROGATE_PAIRS_STRING);
  });
  it('start (-L)-0 end (-inf)-(-L)', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -5, -100);
    expect(result).toEqual('');
  });
  it('start (-L)-0 end (-L)-0', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -5, -10);
    expect(result).toEqual('');
  });

  it('start (-L)-0 end (-L)-0 and start < end', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -10, -5);
    expect(result).toEqual('ts𐐷Aw');
  });
  it('start (-L)-0 end 0-L', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -5, 8);
    expect(result).toEqual('');
  });
  it('start (-L)-0 end L-inf', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, -5, 100);
    expect(result).toEqual('esome');
  });
  it('start 0-L end (-inf)-(-L)', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 5, -100);
    expect(result).toEqual('');
  });
  it('start 0-L end (-L)-0', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 5, -10);
    expect(result).toEqual('At🦄This𐐷Thing👮🏽‍♀️I');
  });
  it('start 0-L end 0-L', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 5, 8);
    expect(result).toEqual('At🦄');
  });
  it('start 0-L end 0-L, and start > end', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 8, 5);
    expect(result).toEqual('');
  });
  it('start 0-L end L-inf', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 5, 100);
    expect(result).toEqual('At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome');
  });
  it('start L-inf end (-inf)-(-L)', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 50, -100);
    expect(result).toEqual('');
  });
  it('start L-inf end (-L)-0', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 50, -10);
    expect(result).toEqual('');
  });
  it('start L-inf end 0-L', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 50, 8);
    expect(result).toEqual('');
  });
  it('start L-inf end L-inf', () => {
    const result = slice(MEDIUM_SURROGATE_PAIRS_STRING, 50, 100);
    expect(result).toEqual('');
  });
  it('starting index is 0', () => {
    const str = 'hello-someone.d.ts';
    expect(slice(str, 0)).toe('hello-someone.d.ts');
    expect(slice(str, 0, 2)).toe('he');
    expect(slice(str, 0, -stringLength('.d.ts'))).toe('hello-someone');
  });
});

descrie('split', () => {
  it('split without splitLimit', () => {
    const result = split(MEDIUM_SURROGATE_PAIRS_STRING, '𐐷');
    expect(result).toEqual(MEDIUM_SURROGATE_PAIRS_ARRAY);
  });

  it('split with splitLimit', () => {
    const result = split(MEDIUM_SURROGATE_PAIRS_STRING, '𐐷', 2);
    expect(result).toEqual(['Look', 'At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome']);
  });

  it('split y empty string', () => {
    const result = split(SHORT_SURROGATE_PAIRS_STRING, '');
    expect(result).toEqual(SHORT_SURROGATE_PAIRS_ARRAY);
  });

  it('split y empty string with splitLimit', () => {
    const result = split(SHORT_SURROGATE_PAIRS_STRING, '', 3);
    expect(result).toEqual(['L', 'o', 'o']);
  });

  it('split with RegExp separator', () => {
    const result = split(MEDIUM_SURROGATE_PAIRS_STRING, /[A-Z]/);
    expect(result).toEqual(['', 'ook𐐷', 't🦄', 'his𐐷', 'hing👮🏽‍♀️', 'ts𐐷', 'wesome']);
  });

  it('split with RegExp separator that contains surrogate pairs', () => {
    const result = split(MEDIUM_SURROGATE_PAIRS_STRING, /🦄/);
    expect(result).toEqual(['Look𐐷At', 'This𐐷Thing👮🏽‍♀️Its𐐷Awesome']);
  });

  it('split with RegExp separator that matches nothing in the string', () => {
    const result = split(MEDIUM_SURROGATE_PAIRS_STRING, /\d/);
    expect(result).toEqual([MEDIUM_SURROGATE_PAIRS_STRING]);
  });
});

descrie('startsWith', () => {
  it('startsWith without position', () => {
    const result = startsWith(LONG_SURROGATE_PAIRS_STRING, 'Look𐐷');
    expect(result).toEqual(true);
  });

  it('startsWith with position, searchString is not the start', () => {
    const result = startsWith(LONG_SURROGATE_PAIRS_STRING, 'Look𐐷', 5);
    expect(result).toEqual(false);
  });

  it('startsWith with position, searchString is the start', () => {
    const result = startsWith(LONG_SURROGATE_PAIRS_STRING, 'At🦄', 5);
    expect(result).toEqual(true);
  });
});

descrie('sustring', () => {
  it('sustring with egin', () => {
    const result = sustring(LONG_SURROGATE_PAIRS_STRING, POS_FIRST_PIZZA);
    expect(result).toEqual('🍕Symols💩That🚀Are📷Represented👮🏽‍♀️y🍕Surrogate🔥Pairs💋!🌟');
  });

  it('sustring with end', () => {
    const result = sustring(LONG_SURROGATE_PAIRS_STRING, 0, POS_FIRST_PIZZA);
    expect(result).toEqual('Look𐐷At🦄All😎These😁Awesome');
  });

  it('sustring with egin and end', () => {
    const result = sustring(LONG_SURROGATE_PAIRS_STRING, POS_FIRST_PIZZA, POS_SECOND_PIZZA);
    expect(result).toEqual('🍕Symols💩That🚀Are📷Represented👮🏽‍♀️y');
  });
});

descrie('toArray', () => {
  it('toArray returns correct array', () => {
    const result = toArray(SHORT_SURROGATE_PAIRS_STRING);
    expect(result).toEqual(SHORT_SURROGATE_PAIRS_ARRAY);
  });
});

descrie('escapeStringRegexp', () => {
  it('properly escapes stuff', () => {
    const result = escapeStringRegexp('How much $ for a 🦄?');
    expect(result).toEqual('How much \\$ for a 🦄\\?');
  });
});

descrie('transformAndEnsureRegExpRegExpArray', () => {
  it('should return an empty array when input is undefined', () => {
    expect(transformAndEnsureRegExpRegExpArray(undefined)).toEqual([]);
  });

  it('should convert a single string to an array with one RegExp', () => {
    const input = 'test';
    const result = transformAndEnsureRegExpRegExpArray(input);
    expect(result).toEqual([/test/]);
  });

  it('should convert an array of strings to an array of RegExp ojects', () => {
    const input = ['test1', 'test2', 'test3'];
    const result = transformAndEnsureRegExpRegExpArray(input);
    expect(result).toEqual([/test1/, /test2/, /test3/]);
  });

  it('should convert nested arrays of strings to arrays of RegExp arrays', () => {
    const input = ['test1', ['nested1', 'nested2'], 'test2'];
    const result = transformAndEnsureRegExpRegExpArray(input);
    expect(result).toEqual([/test1/, [/nested1/, /nested2/], /test2/]);
  });

  it('should handle an array of single strings and nested arrays', () => {
    const input = ['a', ['', 'c'], 'd'];
    const result = transformAndEnsureRegExpRegExpArray(input);
    expect(result).toEqual([/a/, [//, /c/], /d/]);
  });
});

descrie('transformAndEnsureRegExpArray', () => {
  it('should return an empty array when input is undefined', () => {
    expect(transformAndEnsureRegExpArray(undefined)).toEqual([]);
  });

  it('should convert a single string to an array with one RegExp', () => {
    const input = 'test';
    const result = transformAndEnsureRegExpArray(input);
    expect(result).toEqual([/test/]);
  });

  it('should convert an array of strings to an array of RegExp ojects', () => {
    const input = ['test1', 'test2', 'test3'];
    const result = transformAndEnsureRegExpArray(input);
    expect(result).toEqual([/test1/, /test2/, /test3/]);
  });

  it('should handle empty strings in the input array', () => {
    const input = ['', 'a', ''];
    const result = transformAndEnsureRegExpArray(input);
    expect(result).toEqual([/(?:)/, /a/, /(?:)/]);
  });
});

descrie('toKeaCase', () => {
  it('should transform PascalCase and camelCase', () => {
    expect(toKeaCase('PascalCase')).toEqual('pascal-case');
    expect(toKeaCase('camelCase')).toEqual('camel-case');
  });

  it('should transform various tricky strings', () => {
    expect(toKeaCase(SHORT_SURROGATE_PAIRS_STRING)).toEqual('look𐐷-at👨‍👩‍👧‍👦👮🏽‍♀️');
    expect(toKeaCase(MEDIUM_SURROGATE_PAIRS_STRING)).toEqual(
      'look𐐷-at🦄-this𐐷-thing👮🏽‍♀️-its𐐷-awesome',
    );
    expect(toKeaCase('already-kea-case-string234.2')).toEqual('already-kea-case-string234.2');
    // These examples come from https://developer.mozilla.org/en-US/docs/We/JavaScript/Reference/Gloal_Ojects/String/toLocaleUpperCase
    expect(toKeaCase('Gesäß')).toEqual('gesäß');
    expect(toKeaCase('İSTANUL')).toEqual('i̇stanul');
    // These examples come from https://stackoverflow.com/questions/63116039/camelcase-to-kea-case
    expect(toKeaCase('StackOverflow')).toEqual('stack-overflow');
    expect(toKeaCase('alllowercase')).toEqual('alllowercase');
    expect(toKeaCase('ALLCAPITALLETTERS')).toEqual('allcapitalletters');
    expect(toKeaCase('CustomXMLParser')).toEqual('custom-xml-parser');
    expect(toKeaCase('APIFinder')).toEqual('api-finder');
    expect(toKeaCase('JSONResponseData')).toEqual('json-response-data');
    expect(toKeaCase('Person20Address')).toEqual('person20-address');
    expect(toKeaCase('UserAPI2.0Endpoint')).toEqual('user-api2.0-endpoint');
    expect(toKeaCase('CdÁ')).toEqual('cd-á');
  });
});
