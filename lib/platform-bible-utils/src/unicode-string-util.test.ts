import { UnicodeString } from './unicode-string-util';

const SHORT_SURROGATE_PAIRS_STRING = 'Look𐐷At👨‍👩‍👧‍👦👮🏽‍♀️';
const SHORT_SURROGATE_PAIRS_ARRAY = ['L', 'o', 'o', 'k', '𐐷', 'A', 't', '👨‍👩‍👧‍👦', '👮🏽‍♀️'];

const MEDIUM_SURROGATE_PAIRS_STRING = 'Look𐐷At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome';
const MEDIUM_SURROGATE_PAIRS_ARRAY = [
  'L',
  'o',
  'o',
  'k',
  '𐐷',
  'A',
  't',
  '🦄',
  'T',
  'h',
  'i',
  's',
  '𐐷',
  'T',
  'h',
  'i',
  'n',
  'g',
  '👮🏽‍♀️',
  'I',
  't',
  's',
  '𐐷',
  'A',
  'w',
  'e',
  's',
  'o',
  'm',
  'e',
];
const MEDIUM_SURROGATE_PAIRS_SPLIT_ARRAY = ['Look', 'At🦄This', 'Thing👮🏽‍♀️Its', 'Awesome'];

const LONG_SURROGATE_PAIRS_STRING =
  'Look𐐷At🦄All😎These😁Awesome🍕Symbols💩That🚀Are📷Represented👮🏽‍♀️By🍕Surrogate🔥Pairs💋!🌟';

const POS_FIRST_PIZZA = 25;
const POS_SECOND_PIZZA = 57;
const TEN_SPACES = '          ';
const SEVEN_XS = 'XXXXXXX';

const NORMALIZE_STRING = '\u0041\u006d\u00e9\u006c\u0069\u0065';
const NORMALIZE_SURROGATE_PAIRS = '\u0041\u006d\u0065\u0301\u006c\u0069\u0065';

describe('string', () => {
  const shortString: UnicodeString = new UnicodeString(SHORT_SURROGATE_PAIRS_STRING);
  const mediumString: UnicodeString = new UnicodeString(MEDIUM_SURROGATE_PAIRS_STRING);
  const longString: UnicodeString = new UnicodeString(LONG_SURROGATE_PAIRS_STRING);
  const emptyString: UnicodeString = new UnicodeString('');

  it('string equals short string', () => {
    const result = shortString.string;
    expect(result).toEqual(SHORT_SURROGATE_PAIRS_STRING);
  });

  it('string equals medium string', () => {
    const result = mediumString.string;
    expect(result).toEqual(MEDIUM_SURROGATE_PAIRS_STRING);
  });

  it('string equals long string', () => {
    const result = longString.string;
    expect(result).toEqual(LONG_SURROGATE_PAIRS_STRING);
  });

  it('string equals empty string', () => {
    const result = emptyString.string;
    expect(result).toEqual('');
  });
});

describe('length', () => {
  const shortString: UnicodeString = new UnicodeString(SHORT_SURROGATE_PAIRS_STRING);
  const mediumString: UnicodeString = new UnicodeString(MEDIUM_SURROGATE_PAIRS_STRING);
  const longString: UnicodeString = new UnicodeString(LONG_SURROGATE_PAIRS_STRING);
  const emptyString: UnicodeString = new UnicodeString('');

  it('length equals short string length', () => {
    const result = shortString.length;
    expect(result).toEqual(9);
  });

  it('length equals medium string length', () => {
    const result = mediumString.length;
    expect(result).toEqual(30);
  });

  it('length equals long string length', () => {
    const result = longString.length;
    expect(result).toEqual(76);
  });

  it('length equals empty string length', () => {
    const result = emptyString.length;
    expect(result).toEqual(0);
  });
});

describe('toArray', () => {
  const shortString: UnicodeString = new UnicodeString(SHORT_SURROGATE_PAIRS_STRING);
  const mediumString: UnicodeString = new UnicodeString(MEDIUM_SURROGATE_PAIRS_STRING);
  // TODO(mattg): make a long string surrogate pair array
  // const longString: UnicodeString = new UnicodeString(
  //   LONG_SURROGATE_PAIRS_STRING,
  // );
  const emptyString: UnicodeString = new UnicodeString('');

  it('equals short string array', () => {
    const result = shortString.toArray();
    expect(result).toEqual(SHORT_SURROGATE_PAIRS_ARRAY);
  });

  it('equals medium string array', () => {
    const result = mediumString.toArray();
    expect(result).toEqual(MEDIUM_SURROGATE_PAIRS_ARRAY);
  });

  // it('equals long string array', () => {
  //   const result = longString.toArray();
  //   expect(result).toEqual();
  // });

  it('equals empty string array', () => {
    const result = emptyString.toArray();
    expect(result).toEqual([]);
  });
});

describe('at', () => {
  const longString: UnicodeString = new UnicodeString(LONG_SURROGATE_PAIRS_STRING);
  it('at with in bounds index', () => {
    const result = longString.at(4);
    expect(result).toEqual('𐐷');
  });

  it('at with negative index returns last character', () => {
    const result = longString.at(-1);
    expect(result).toEqual('🌟');
  });

  it("at with police officer doesn't break the grapheme", () => {
    const result = longString.at(54);
    expect(result).toEqual('👮🏽‍♀️');
  });

  it('at with the length of the string returns undefined', () => {
    const result = longString.at(longString.length);
    expect(result).toEqual(undefined);
  });

  it('at with the negative length of the string returns first character', () => {
    const result = longString.at(-longString.length);
    expect(result).toEqual('L');
  });

  it('at with the negative length+1 of the string returns first character', () => {
    const result = longString.at(-(longString.length + 1));
    expect(result).toEqual(undefined);
  });

  it('at with index greater than length returns undefined', () => {
    const result = longString.at(longString.length + 10);
    expect(result).toEqual(undefined);
  });

  it('at with index smaller than -length returns undefined', () => {
    const result = longString.at(-(longString.length + 10));
    expect(result).toEqual(undefined);
  });
});

describe('charAt', () => {
  const medString: UnicodeString = new UnicodeString(MEDIUM_SURROGATE_PAIRS_STRING);
  it('0 < index < string length', () => {
    const result = medString.charAt(7);
    expect(result).toEqual('🦄');
  });

  it('index < 0', () => {
    const result = medString.charAt(-2);
    expect(result).toEqual('');
  });

  it('index > string length', () => {
    const result = medString.charAt(50);
    expect(result).toEqual('');
  });

  it('charAt grapheme', () => {
    const result = medString.charAt(18);
    expect(result).toEqual('👮🏽‍♀️');
  });

  it('index == string length', () => {
    const result = medString.charAt(medString.length);
    expect(result).toEqual('');
  });

  it('index == string length-1', () => {
    const result = medString.charAt(medString.length - 1);
    expect(result).toEqual('e');
  });
});

describe('codePointAt', () => {
  const medString: UnicodeString = new UnicodeString(MEDIUM_SURROGATE_PAIRS_STRING);
  it('codePointAt for regular character', () => {
    const result = medString.codePointAt(11);
    expect(result).toEqual(115);
  });

  it('codePointAt for surrogate pair', () => {
    const result = medString.codePointAt(7);
    expect(result).toEqual(129412);
  });

  it('codePointAt index < 0', () => {
    const result = medString.codePointAt(-1);
    expect(result).toEqual(undefined);
  });

  it('codePointAt index > string length', () => {
    const result = medString.codePointAt(50);
    expect(result).toEqual(undefined);
  });

  it('codePointAt grapheme', () => {
    const result = medString.codePointAt(18);
    // NOTE(mattg): This is the code point for a general police officer, so it breaks up the
    // grapheme, but it kind of has to.
    // This is the hex value of a generic police officer emoji.
    expect(result).toEqual(0x1f46e);
  });

  it('codePointAt index == string length', () => {
    const result = medString.codePointAt(medString.length);
    expect(result).toEqual(undefined);
  });

  it('codePointAt index == string length-1', () => {
    const result = medString.codePointAt(medString.length - 1);
    expect(result).toEqual(101);
  });
});

describe('substring', () => {
  const str: UnicodeString = new UnicodeString(LONG_SURROGATE_PAIRS_STRING);
  it('substring with begin', () => {
    const result = str.substring(POS_FIRST_PIZZA);
    expect(result).toEqual('🍕Symbols💩That🚀Are📷Represented👮🏽‍♀️By🍕Surrogate🔥Pairs💋!🌟');
  });

  it('substring with end', () => {
    const result = str.substring(0, POS_FIRST_PIZZA);
    expect(result).toEqual('Look𐐷At🦄All😎These😁Awesome');
  });

  it('substring with begin and end', () => {
    const result = str.substring(POS_FIRST_PIZZA, POS_SECOND_PIZZA);
    expect(result).toEqual('🍕Symbols💩That🚀Are📷Represented👮🏽‍♀️By');
  });

  it('substring with end less than begin', () => {
    const result = str.substring(POS_SECOND_PIZZA, POS_FIRST_PIZZA);
    expect(result).toEqual('');
  });
});

describe('slice', () => {
  const medium: UnicodeString = new UnicodeString(MEDIUM_SURROGATE_PAIRS_STRING);
  it('start (-inf)-(-L)', () => {
    const result = medium.slice(-100);
    expect(result).toEqual(MEDIUM_SURROGATE_PAIRS_STRING);
  });
  it('start (-L)-0', () => {
    const result = medium.slice(-3);
    expect(result).toEqual('ome');
  });
  it('start 0-L', () => {
    const result = medium.slice(3);
    expect(result).toEqual('k𐐷At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome');
  });
  it('start L-inf', () => {
    const result = medium.slice(50);
    expect(result).toEqual('');
  });
  it('start (-inf)-(-L) end (-inf)-(-L)', () => {
    const result = medium.slice(-200, -100);
    expect(result).toEqual('');
  });
  it('start (-inf)-(-L) end (-L)-0', () => {
    const result = medium.slice(-100, -10);
    expect(result).toEqual('Look𐐷At🦄This𐐷Thing👮🏽‍♀️I');
  });
  it('start (-inf)-(-L) end 0-L', () => {
    const result = medium.slice(-100, 8);
    expect(result).toEqual('Look𐐷At🦄');
  });
  it('start (-inf)-(-L) end L-inf', () => {
    const result = medium.slice(-100, 100);
    expect(result).toEqual(MEDIUM_SURROGATE_PAIRS_STRING);
  });
  it('start (-L)-0 end (-inf)-(-L)', () => {
    const result = medium.slice(-5, -100);
    expect(result).toEqual('');
  });
  it('start (-L)-0 end (-L)-0', () => {
    const result = medium.slice(-5, -10);
    expect(result).toEqual('');
  });

  it('start (-L)-0 end (-L)-0 and start < end', () => {
    const result = medium.slice(-10, -5);
    expect(result).toEqual('ts𐐷Aw');
  });
  it('start (-L)-0 end 0-L', () => {
    const result = medium.slice(-5, 8);
    expect(result).toEqual('');
  });
  it('start (-L)-0 end L-inf', () => {
    const result = medium.slice(-5, 100);
    expect(result).toEqual('esome');
  });
  it('start 0-L end (-inf)-(-L)', () => {
    const result = medium.slice(5, -100);
    expect(result).toEqual('');
  });
  it('start 0-L end (-L)-0', () => {
    const result = medium.slice(5, -10);
    expect(result).toEqual('At🦄This𐐷Thing👮🏽‍♀️I');
  });
  it('start 0-L end 0-L', () => {
    const result = medium.slice(5, 8);
    expect(result).toEqual('At🦄');
  });
  it('start 0-L end 0-L, and start > end', () => {
    const result = medium.slice(8, 5);
    expect(result).toEqual('');
  });
  it('start 0-L end L-inf', () => {
    const result = medium.slice(5, 100);
    expect(result).toEqual('At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome');
  });
  it('start L-inf end (-inf)-(-L)', () => {
    const result = medium.slice(50, -100);
    expect(result).toEqual('');
  });
  it('start L-inf end (-L)-0', () => {
    const result = medium.slice(50, -10);
    expect(result).toEqual('');
  });
  it('start L-inf end 0-L', () => {
    const result = medium.slice(50, 8);
    expect(result).toEqual('');
  });
  it('start L-inf end L-inf', () => {
    const result = medium.slice(50, 100);
    expect(result).toEqual('');
  });
  it('starting index is 0', () => {
    const str: UnicodeString = new UnicodeString('hello-someone.d.ts');
    expect(str.slice(0)).toBe('hello-someone.d.ts');
    expect(str.slice(0, 2)).toBe('he');
    expect(str.slice(0, -new UnicodeString('.d.ts').length)).toBe('hello-someone');
  });
});

describe('split', () => {
  const short: UnicodeString = new UnicodeString(SHORT_SURROGATE_PAIRS_STRING);
  const medium: UnicodeString = new UnicodeString(MEDIUM_SURROGATE_PAIRS_STRING);
  it('split without splitLimit', () => {
    const result = medium.split('𐐷');
    expect(result).toEqual(MEDIUM_SURROGATE_PAIRS_SPLIT_ARRAY);
  });

  it('split with splitLimit', () => {
    const result = medium.split('𐐷', 2);
    expect(result).toEqual(['Look', 'At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome']);
  });

  it('split by empty string', () => {
    const result = short.split('');
    expect(result).toEqual(SHORT_SURROGATE_PAIRS_ARRAY);
  });

  it('split by empty string with splitLimit', () => {
    const result = short.split('', 3);
    expect(result).toEqual(['L', 'o', 'o']);
  });

  it('split with RegExp separator', () => {
    const result = medium.split(/[A-Z]/);
    expect(result).toEqual(['', 'ook𐐷', 't🦄', 'his𐐷', 'hing👮🏽‍♀️', 'ts𐐷', 'wesome']);
  });

  it('split with RegExp separator that contains surrogate pairs', () => {
    const result = medium.split(/🦄/);
    expect(result).toEqual(['Look𐐷At', 'This𐐷Thing👮🏽‍♀️Its𐐷Awesome']);
  });

  it('split with RegExp separator that matches nothing in the string', () => {
    const result = medium.split(/\d/);
    expect(result).toEqual([MEDIUM_SURROGATE_PAIRS_STRING]);
  });
});

describe('indexOf', () => {
  const long: UnicodeString = new UnicodeString(LONG_SURROGATE_PAIRS_STRING);
  const pizza: UnicodeString = new UnicodeString('🍕');
  it('indexOf without position', () => {
    const result = long.indexOf(pizza);
    expect(result).toEqual(POS_FIRST_PIZZA);
  });

  it('indexOf with position', () => {
    const result = long.indexOf(pizza, 40);
    expect(result).toEqual(POS_SECOND_PIZZA);
  });

  it('indexOf with position greater than string length', () => {
    const result = long.indexOf(pizza, 100);
    expect(result).toEqual(-1);
  });

  it('indexOf with negative position', () => {
    const result = long.indexOf(pizza, -20);
    expect(result).toEqual(POS_FIRST_PIZZA);
  });

  it('indexOf with empty search string', () => {
    const result = long.indexOf(new UnicodeString(''));
    expect(result).toEqual(-1);
  });

  it('indexOf with a search length longer than 1', () => {
    const result = long.indexOf(new UnicodeString('🔥Pairs💋'));
    expect(result).toEqual(67);
  });

  it('indexOf at the end of the string', () => {
    const result = long.indexOf(new UnicodeString('💋!🌟'));
    expect(result).toEqual(73);
  });

  it("indexOf with a seach for something that's not in the string", () => {
    const result = long.indexOf(new UnicodeString('Pizza'));
    expect(result).toEqual(-1);
  });

  it("indexOf with a searchString that's longer than the string", () => {
    const medium: UnicodeString = new UnicodeString(MEDIUM_SURROGATE_PAIRS_STRING);
    const result = medium.indexOf(long);
    expect(result).toEqual(-1);
  });
});

describe('lastIndexOf', () => {
  const long: UnicodeString = new UnicodeString(LONG_SURROGATE_PAIRS_STRING);
  const pizza: UnicodeString = new UnicodeString('🍕');
  it('lastIndexOf without position', () => {
    const result = long.lastIndexOf(pizza);
    expect(result).toEqual(POS_SECOND_PIZZA);
  });

  it('lastIndexOf with position', () => {
    const result = long.lastIndexOf(pizza, 5);
    expect(result).toEqual(-1);
  });

  it('lastIndexOf with position greater than string length', () => {
    const result = long.lastIndexOf(pizza, 100);
    // TODO(mattg): Figure out why this isn't -1 like it is for indexOf
    expect(result).toEqual(POS_SECOND_PIZZA);
  });

  it('lastIndexOf with negative position', () => {
    const result = long.lastIndexOf(pizza, -1);
    // TODO(mattg): Figure out why this isn't POS_SECOND_PIZZA like it is for indexOf
    expect(result).toEqual(-1);
  });

  it('lastIndexOf with empty search string', () => {
    const result = long.lastIndexOf(new UnicodeString(''));
    expect(result).toEqual(-1);
  });

  it('lastIndexOf with a search length longer than 1', () => {
    const result = long.lastIndexOf(new UnicodeString('🔥Pairs💋'));
    expect(result).toEqual(67);
  });

  it('lastIndexOf at the end of the string', () => {
    const result = long.lastIndexOf(new UnicodeString('💋!🌟'));
    expect(result).toEqual(73);
  });

  it("lastIndexOf with a seach for something that's not in the string", () => {
    const result = long.lastIndexOf(new UnicodeString('Pizza'));
    expect(result).toEqual(-1);
  });

  it("lastIndexOf with a searchString that's longer than the string", () => {
    const medium: UnicodeString = new UnicodeString(MEDIUM_SURROGATE_PAIRS_STRING);
    const result = medium.lastIndexOf(long);
    expect(result).toEqual(-1);
  });
});

describe('includes', () => {
  const long: UnicodeString = new UnicodeString(LONG_SURROGATE_PAIRS_STRING);
  const unicornAllCoolGuy: UnicodeString = new UnicodeString('🦄All😎');
  it('includes without position', () => {
    const result = long.includes(new UnicodeString('🍕Symbols💩'));
    expect(result).toEqual(true);
  });

  it('includes with position', () => {
    const result = long.includes(unicornAllCoolGuy, 7);
    expect(result).toEqual(true);
  });

  it('includes with position that is to high, so no matches are found', () => {
    const result = long.includes(unicornAllCoolGuy, 10);
    expect(result).toEqual(false);
  });

  it('includes with position that is higher than the length', () => {
    const result = long.includes(unicornAllCoolGuy, 100);
    expect(result).toEqual(false);
  });

  it('includes with grapheme emoji that exists', () => {
    const result = long.includes(new UnicodeString('👮🏽‍♀️'));
    expect(result).toEqual(true);
  });

  it('includes with emoji that does not exist', () => {
    const result = long.includes(new UnicodeString('🧑‍🚀'));
    expect(result).toEqual(false);
  });
});

describe('normalize', () => {
  const normString: UnicodeString = new UnicodeString(NORMALIZE_STRING);
  const normSurrogate: UnicodeString = new UnicodeString(NORMALIZE_SURROGATE_PAIRS);
  it('normalize with no forms, compare strings', () => {
    const regularStringResult = normString.normalize('none');
    const surrogatePairStringResult = normSurrogate.normalize('none');
    expect(regularStringResult === surrogatePairStringResult).toEqual(false);
  });

  it('normalize with different forms, compare strings', () => {
    const NFCResult = normString.normalize('NFC');
    const NFDResult = normSurrogate.normalize('NFD');
    expect(NFCResult === NFDResult).toEqual(false);
  });

  it('normalize with same form, compare strings', () => {
    const regularStringResult = normString.normalize('NFC');
    const surrogatePairStringResult = normSurrogate.normalize('NFC');
    expect(regularStringResult === surrogatePairStringResult).toEqual(true);
  });

  it('normalize surrogate pairs string', () => {
    const result = normSurrogate.normalize('NFC');
    expect(result).toEqual(NORMALIZE_STRING);
  });

  it('normalize surrogate pairs string as its own form', () => {
    const result = normSurrogate.normalize('NFD');
    expect(result).toEqual(NORMALIZE_SURROGATE_PAIRS);
  });
});

describe('ordinalCompare', () => {
  const unicorn: UnicodeString = new UnicodeString('🦄');
  const police: UnicodeString = new UnicodeString('👮🏽‍♀️');

  it('should return a negative number if string1 comes before string2', () => {
    expect(police.ordinalCompare(unicorn.string)).toBeLessThan(0);
  });

  it('should return a positive number if string1 comes after string2', () => {
    expect(unicorn.ordinalCompare(police.string)).toBeGreaterThan(0);
  });

  it('should return 0 if string1 is equal to string2', () => {
    expect(unicorn.ordinalCompare(unicorn.string)).toBe(0);
  });
});

describe('startsWith', () => {
  const long: UnicodeString = new UnicodeString(LONG_SURROGATE_PAIRS_STRING);
  const look: UnicodeString = new UnicodeString('Look𐐷');
  const at: UnicodeString = new UnicodeString('At🦄');
  it('startsWith without position', () => {
    const result = long.startsWith(look);
    expect(result).toEqual(true);
  });

  it('startsWith with position, searchString is not the start', () => {
    const result = long.startsWith(look, 5);
    expect(result).toEqual(false);
  });

  it('startsWith with position, searchString is the start', () => {
    const result = long.startsWith(at, 5);
    expect(result).toEqual(true);
  });
});

describe('endsWith', () => {
  const long: UnicodeString = new UnicodeString(LONG_SURROGATE_PAIRS_STRING);
  it('endsWith without position', () => {
    const result = long.endsWith(new UnicodeString('💋!🌟'));
    expect(result).toEqual(true);
  });

  it('endsWith without position and false data', () => {
    const result = long.endsWith(new UnicodeString('Pizza'));
    expect(result).toEqual(false);
  });

  it('endsWith with position', () => {
    const result = long.endsWith(new UnicodeString('At🦄'), 8);
    expect(result).toEqual(true);
  });

  it('endsWith with position and false data', () => {
    const result = long.endsWith(new UnicodeString('Pizza'), 8);
    expect(result).toEqual(false);
  });

  it('endsWith with position and grapheme', () => {
    const result = long.endsWith(new UnicodeString('👮🏽‍♀️'), 55);
    expect(result).toEqual(true);
  });

  it('endsWith searchString is longer than string itself', () => {
    const result = new UnicodeString(MEDIUM_SURROGATE_PAIRS_STRING).endsWith(long);
    expect(result).toEqual(false);
  });
});

describe('padStart', () => {
  const long: UnicodeString = new UnicodeString(LONG_SURROGATE_PAIRS_STRING);
  it('padStart without padString', () => {
    const result = long.padStart(long.length + 10);
    expect(result).toEqual(TEN_SPACES + long.string);
  });

  it('padStart with padString', () => {
    const result = long.padStart(long.length + 7, 'X');
    expect(result).toEqual(SEVEN_XS + long.string);
  });

  it('padStart with padString length 2', () => {
    const result = long.padStart(long.length + 10, 'ha');
    expect(result).toEqual(`hahahahaha${long.string}`);
  });
});

describe('padEnd', () => {
  const long: UnicodeString = new UnicodeString(LONG_SURROGATE_PAIRS_STRING);
  it('padEnd without padString', () => {
    const result = long.padEnd(long.length + 10);
    expect(result).toEqual(long.string + TEN_SPACES);
  });

  it('padEnd with padString', () => {
    const result = long.padEnd(long.length + 7, 'X');
    expect(result).toEqual(long.string + SEVEN_XS);
  });

  it('padEnd with padString length 2', () => {
    const result = long.padEnd(long.length + 10, 'ha');
    expect(result).toEqual(`${long.string}hahahahaha`);
  });
});

/*
describe('indexOfClosestClosingCurlyBrace', () => {
  const curlyString =
    //           1           2
    // 23 456 78901 2 345678901 23456
    'Thi\\{s👮🏽‍♀️{is}👨‍👩‍👧‍👦\\}a {stri\\}ng}!';

  it('gets the closest un-escaped curly brace', () => {
    let result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, 0, false);
    expect(result).toBe(10);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, 4, false);
    expect(result).toBe(10);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, 10, false);
    expect(result).toBe(10);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, 11, false);
    expect(result).toBe(25);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, 16, false);
    expect(result).toBe(25);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, 23, false);
    expect(result).toBe(25);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, 25, false);
    expect(result).toBe(25);
  });

  it('gets the closest escaped curly brace', () => {
    let result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, 0, true);
    expect(result).toBe(13);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, 4, true);
    expect(result).toBe(13);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, 10, true);
    expect(result).toBe(13);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, 11, true);
    expect(result).toBe(13);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, 13, true);
    expect(result).toBe(13);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, 16, true);
    expect(result).toBe(22);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, 22, true);
    expect(result).toBe(22);
  });

  it('returns -1 when out of bounds or no more curly braces are found', () => {
    const strLength = stringLength(curlyString);
    let result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, -1, true);
    expect(result).toBe(-1);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, -1, false);
    expect(result).toBe(-1);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, -10, true);
    expect(result).toBe(-1);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, -10, false);
    expect(result).toBe(-1);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, strLength, true);
    expect(result).toBe(-1);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, strLength, false);
    expect(result).toBe(-1);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, strLength + 5, true);
    expect(result).toBe(-1);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, strLength + 5, false);
    expect(result).toBe(-1);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, 26, false);
    expect(result).toBe(-1);
    result = testingStringUtils.indexOfClosestClosingCurlyBrace(curlyString, 23, true);
    expect(result).toBe(-1);
  });
});

describe('formatReplacementStringToArray', () => {
  it('combines all strings into one', () => {
    const result = formatReplacementStringToArray('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome', {
      'one-horned': 'Unicorn',
    });
    expect(result).toEqual(['Look𐐷At🦄This𐐷UnicornThing👮🏽‍♀️Its𐐷Awesome']);
  });

  it('with curly braces', () => {
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

  it('with curly braces at the start', () => {
    const result = formatReplacementStringToArray('{one-horned}Thing👮🏽‍♀️Its𐐷Awesome', {
      'one-horned': ['Unicorn'],
    });
    expect(result).toEqual([['Unicorn'], 'Thing👮🏽‍♀️Its𐐷Awesome']);
  });

  it('with curly braces as the whole string', () => {
    const result = formatReplacementStringToArray('{one-horned}', {
      'one-horned': ['Unicorn'],
    });
    expect(result).toEqual([['Unicorn']]);
  });

  it('with curly braces and an empty string replacer', () => {
    const result = formatReplacementStringToArray('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome', {
      'one-horned': '',
    });
    expect(result).toEqual(['Look𐐷At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome']);
  });

  it('with multiple pairs of curly braces', () => {
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

  it('with empty curly braces', () => {
    const result = formatReplacementStringToArray('Look𐐷At🦄This𐐷{}', {
      'one-horned': ['Unicorn'],
    });
    expect(result).toEqual(['Look𐐷At🦄This𐐷']);
  });

  it('with unknown word in curly braces', () => {
    const result = formatReplacementStringToArray('Look𐐷At🦄This𐐷{UFO}', {
      'one-horned': ['Unicorn'],
    });
    expect(result).toEqual(['Look𐐷At🦄This𐐷UFO']);
  });

  it('with escaped curly braces', () => {
    const result = formatReplacementStringToArray(
      'Look𐐷At🦄This𐐷\\{one-horned\\}Thing👮🏽‍♀️Its𐐷Awesome',
      {
        'one-horned': ['Unicorn'],
      },
    );
    expect(result).toEqual(['Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome']);
  });

  it('with multiple pairs of escaped curly braces', () => {
    const result = formatReplacementStringToArray(
      'Look𐐷At🦄This𐐷\\{one-horned\\}Thing👮🏽‍♀️Its𐐷Awesome\\{:)\\}',
      {
        'one-horned': 'Unicorn',
        ':)': 'smiley face',
      },
    );
    expect(result).toEqual(['Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome{:)}']);
  });

  it('with curly braces and escaped curly braces', () => {
    const result = formatReplacementStringToArray(
      'Hi, this is {name}! I like \\{curly braces\\}!',
      {
        name: ['Jim'],
      },
    );
    expect(result).toEqual(['Hi, this is ', ['Jim'], '! I like {curly braces}!']);
  });

  it('with multiple pairs of curly braces and escaped curly braces', () => {
    const result = formatReplacementStringToArray(
      'Hi, this is {name}! I like \\{curly braces\\}!Hi, this is {name}! I like \\{curly braces\\}!',
      {
        name: { replacedName: 'Jim' },
      },
    );
    expect(result).toEqual([
      'Hi, this is ',
      { replacedName: 'Jim' },
      '! I like {curly braces}!Hi, this is ',
      { replacedName: 'Jim' },
      '! I like {curly braces}!',
    ]);
  });

  it('with interesting types as keys and values', () => {
    const result = formatReplacementStringToArray(
      'Hi, this is {name}! I use {0} weights when I curl {weightLbs}lb weights. I do {1} reps {interval}. I have a weakness level of {weakness}.',
      {
        name: 'Chad',
        0: { type: 'lead' },
        weightLbs: 9000,
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
      'lb weights. I do ',
      1000,
      ' reps every second of every day. I have a weakness level of ',
      undefined,
      '.',
    ]);
  });
});

describe('formatReplacementString', () => {
  it('with curly braces', () => {
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

  it('with curly braces at the start', () => {
    const result = formatReplacementString('{one-horned}Thing👮🏽‍♀️Its𐐷Awesome', {
      'one-horned': 'Unicorn',
    });
    expect(result).toEqual('UnicornThing👮🏽‍♀️Its𐐷Awesome');
  });

  it('with curly braces as the whole string', () => {
    const result = formatReplacementString('{one-horned}', {
      'one-horned': 'Unicorn',
    });
    expect(result).toEqual('Unicorn');
  });

  it('with curly braces and an empty string replacer', () => {
    const result = formatReplacementString('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome', {
      'one-horned': '',
    });
    expect(result).toEqual('Look𐐷At🦄This𐐷Thing👮🏽‍♀️Its𐐷Awesome');
  });

  it('with multiple pairs of curly braces', () => {
    const result = formatReplacementString('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome{sauce}', {
      'one-horned': 'Unicorn',
      sauce: 'ness',
    });
    expect(result).toEqual('Look𐐷At🦄This𐐷UnicornThing👮🏽‍♀️Its𐐷Awesomeness');
  });

  it('with empty curly braces', () => {
    const result = formatReplacementString('Look𐐷At🦄This𐐷{}', {
      'one-horned': 'Unicorn',
    });
    expect(result).toEqual('Look𐐷At🦄This𐐷');
  });

  it('with unknown word in curly braces', () => {
    const result = formatReplacementString('Look𐐷At🦄This𐐷{UFO}', {
      'one-horned': 'Unicorn',
    });
    expect(result).toEqual('Look𐐷At🦄This𐐷UFO');
  });

  it('with escaped curly braces', () => {
    const result = formatReplacementString('Look𐐷At🦄This𐐷\\{one-horned\\}Thing👮🏽‍♀️Its𐐷Awesome', {
      'one-horned': 'Unicorn',
    });
    expect(result).toEqual('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome');
  });

  it('with multiple pairs of escaped curly braces', () => {
    const result = formatReplacementString(
      'Look𐐷At🦄This𐐷\\{one-horned\\}Thing👮🏽‍♀️Its𐐷Awesome\\{:)\\}',
      {
        'one-horned': 'Unicorn',
        ':)': 'smiley face',
      },
    );
    expect(result).toEqual('Look𐐷At🦄This𐐷{one-horned}Thing👮🏽‍♀️Its𐐷Awesome{:)}');
  });

  it('with curly braces and escaped curly braces', () => {
    const result = formatReplacementString('Hi, this is {name}! I like \\{curly braces\\}!', {
      name: 'Jim',
    });
    expect(result).toEqual('Hi, this is Jim! I like {curly braces}!');
  });

  it('with multiple pairs of curly braces and escaped curly braces', () => {
    const result = formatReplacementString(
      'Hi, this is {name}! I like \\{curly braces\\}!Hi, this is {name}! I like \\{curly braces\\}!',
      {
        name: 'Jim',
      },
    );
    expect(result).toEqual(
      'Hi, this is Jim! I like {curly braces}!Hi, this is Jim! I like {curly braces}!',
    );
  });

  it('with interesting types as keys and values', () => {
    const result = formatReplacementString(
      'Hi, this is {name}! I use {0} weights when I curl {weightLbs}lb weights. I do {1} reps {interval}. I have a weakness level of {weakness}.',
      {
        name: 'Chad',
        0: 'lead',
        weightLbs: 9000,
        1: 1000,
        interval: 'every second of every day',
        weakness: undefined,
      },
    );
    expect(result).toEqual(
      'Hi, this is Chad! I use lead weights when I curl 9000lb weights. I do 1000 reps every second of every day. I have a weakness level of undefined.',
    );
  });
});

describe('length', () => {
  it('length is correct', () => {
    const result = stringLength(LONG_SURROGATE_PAIRS_STRING);
    expect(result).toEqual(SURROGATE_PAIRS_STRING_LENGTH);
  });
});

describe('substr', () => {
  it('substr with nothing', () => {
    const result = testingStringUtils.substr(LONG_SURROGATE_PAIRS_STRING);
    expect(result).toEqual(LONG_SURROGATE_PAIRS_STRING);
  });

  it('substr with begin', () => {
    const result = testingStringUtils.substr(LONG_SURROGATE_PAIRS_STRING, POS_FIRST_PIZZA);
    expect(result).toEqual('🍕Symbols💩That🚀Are📷Represented👮🏽‍♀️By🍕Surrogate🔥Pairs💋!🌟');
  });

  it('substr with negative begin', () => {
    const result = testingStringUtils.substr(LONG_SURROGATE_PAIRS_STRING, -19);
    // TODO(mattg): determine if this is what we want
    expect(result).toEqual('🍕Surrogate🔥Pairs💋!🌟');
  });

  it('substr with ultra negative begin', () => {
    const result = testingStringUtils.substr(LONG_SURROGATE_PAIRS_STRING, -1000);
    // TODO(mattg): determine if this is what we want
    expect(result).toEqual(LONG_SURROGATE_PAIRS_STRING);
  });

  it('substr with begin and len', () => {
    const result = testingStringUtils.substr(LONG_SURROGATE_PAIRS_STRING, POS_FIRST_PIZZA, 9);
    expect(result).toEqual('🍕Symbols💩');
  });

  it('substr with begin and len of 0', () => {
    const result = testingStringUtils.substr(LONG_SURROGATE_PAIRS_STRING, POS_FIRST_PIZZA, 0);
    expect(result).toEqual('');
  });

  it('substr with begin and negative len', () => {
    const result = testingStringUtils.substr(LONG_SURROGATE_PAIRS_STRING, POS_FIRST_PIZZA, -9);
    // NOTE(mattg): there would never be a negative length, so this doesn't make sense in this case.
    expect(result).toEqual('');
  });

  it('substr with a len out of bounds', () => {
    const result = testingStringUtils.substr(LONG_SURROGATE_PAIRS_STRING, POS_FIRST_PIZZA, 1000);
    // TODO(mattg): determine if this is what we want
    expect(result).toEqual('🍕Symbols💩That🚀Are📷Represented👮🏽‍♀️By🍕Surrogate🔥Pairs💋!🌟');
  });
});

describe('substring', () => {
  it('substring with begin', () => {
    const result = substring(LONG_SURROGATE_PAIRS_STRING, POS_FIRST_PIZZA);
    expect(result).toEqual('🍕Symbols💩That🚀Are📷Represented👮🏽‍♀️By🍕Surrogate🔥Pairs💋!🌟');
  });

  it('substring with end', () => {
    const result = substring(LONG_SURROGATE_PAIRS_STRING, 0, POS_FIRST_PIZZA);
    expect(result).toEqual('Look𐐷At🦄All😎These😁Awesome');
  });

  it('substring with begin and end', () => {
    const result = substring(LONG_SURROGATE_PAIRS_STRING, POS_FIRST_PIZZA, POS_SECOND_PIZZA);
    expect(result).toEqual('🍕Symbols💩That🚀Are📷Represented👮🏽‍♀️By');
  });

  it('substring with end less than begin', () => {
    const result = substring(LONG_SURROGATE_PAIRS_STRING, POS_SECOND_PIZZA, POS_FIRST_PIZZA);
    expect(result).toEqual('');
  });
});

describe('toArray', () => {
  it('toArray returns correct array', () => {
    const result = toArray(SHORT_SURROGATE_PAIRS_STRING);
    expect(result).toEqual(SHORT_SURROGATE_PAIRS_ARRAY);
  });
});

describe('escapeStringRegexp', () => {
  it('properly escapes stuff', () => {
    const result = escapeStringRegexp('How much $ for a 🦄?');
    expect(result).toEqual('How much \\$ for a 🦄\\?');
  });
});

describe('transformAndEnsureRegExpRegExpArray', () => {
  it('should return an empty array when input is undefined', () => {
    expect(transformAndEnsureRegExpRegExpArray(undefined)).toEqual([]);
  });

  it('should convert a single string to an array with one RegExp', () => {
    const input = 'test';
    const result = transformAndEnsureRegExpRegExpArray(input);
    expect(result).toEqual([/test/]);
  });

  it('should convert an array of strings to an array of RegExp objects', () => {
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
    const input = ['a', ['b', 'c'], 'd'];
    const result = transformAndEnsureRegExpRegExpArray(input);
    expect(result).toEqual([/a/, [/b/, /c/], /d/]);
  });
});

describe('transformAndEnsureRegExpArray', () => {
  it('should return an empty array when input is undefined', () => {
    expect(transformAndEnsureRegExpArray(undefined)).toEqual([]);
  });

  it('should convert a single string to an array with one RegExp', () => {
    const input = 'test';
    const result = transformAndEnsureRegExpArray(input);
    expect(result).toEqual([/test/]);
  });

  it('should convert an array of strings to an array of RegExp objects', () => {
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

describe('toKebabCase', () => {
  it('should transform PascalCase and camelCase', () => {
    expect(toKebabCase('PascalCase')).toEqual('pascal-case');
    expect(toKebabCase('camelCase')).toEqual('camel-case');
  });

  it('should transform various tricky strings', () => {
    expect(toKebabCase(SHORT_SURROGATE_PAIRS_STRING)).toEqual('look𐐷-at👨‍👩‍👧‍👦👮🏽‍♀️');
    expect(toKebabCase(MEDIUM_SURROGATE_PAIRS_STRING)).toEqual(
      'look𐐷-at🦄-this𐐷-thing👮🏽‍♀️-its𐐷-awesome',
    );
    expect(toKebabCase('already-kebab-case-string234.2')).toEqual('already-kebab-case-string234.2');
    // These examples come from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleUpperCase
    expect(toKebabCase('Gesäß')).toEqual('gesäß');
    expect(toKebabCase('İSTANBUL')).toEqual('i̇stanbul');
    // These examples come from https://stackoverflow.com/questions/63116039/camelcase-to-kebab-case
    expect(toKebabCase('StackOverflow')).toEqual('stack-overflow');
    expect(toKebabCase('alllowercase')).toEqual('alllowercase');
    expect(toKebabCase('ALLCAPITALLETTERS')).toEqual('allcapitalletters');
    expect(toKebabCase('CustomXMLParser')).toEqual('custom-xml-parser');
    expect(toKebabCase('APIFinder')).toEqual('api-finder');
    expect(toKebabCase('JSONResponseData')).toEqual('json-response-data');
    expect(toKebabCase('Person20Address')).toEqual('person20-address');
    expect(toKebabCase('UserAPI2.0Endpoint')).toEqual('user-api2.0-endpoint');
    expect(toKebabCase('CdÁb')).toEqual('cd-áb');
  });
});
*/
