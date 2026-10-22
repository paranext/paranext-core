import { describe, expect, test } from 'vitest';
import { ARROW_KEYS, getKeyCharacterType, isArrowKey } from './keyboard.util';

describe('isArrowKey', () => {
  test('accepts each of the four arrow keys', () => {
    ARROW_KEYS.forEach((key) => expect(isArrowKey(key)).toBe(true));
  });

  test('rejects non-arrow keys', () => {
    ['Enter', ' ', 'a', 'Backspace', 'ArrowUpLeft', ''].forEach((key) =>
      expect(isArrowKey(key)).toBe(false),
    );
  });
});

describe('getKeyCharacterType', () => {
  test('classifies Latin letters as letters', () => {
    expect(getKeyCharacterType('a')).toEqual({ isLetter: true, isDigit: false });
    expect(getKeyCharacterType('Z')).toEqual({ isLetter: true, isDigit: false });
  });

  test('classifies letters outside the Latin script as letters', () => {
    // Type-ahead has to work for a translator typing in their own script, not just Latin.
    expect(getKeyCharacterType('д').isLetter).toBe(true); // Cyrillic
    expect(getKeyCharacterType('λ').isLetter).toBe(true); // Greek
    expect(getKeyCharacterType('א').isLetter).toBe(true); // Hebrew
    expect(getKeyCharacterType('क').isLetter).toBe(true); // Devanagari
  });

  test('classifies ASCII digits as digits', () => {
    expect(getKeyCharacterType('0')).toEqual({ isLetter: false, isDigit: true });
    expect(getKeyCharacterType('9')).toEqual({ isLetter: false, isDigit: true });
  });

  test('does not classify non-ASCII digits as digits', () => {
    // The reference parser only understands ASCII digits, so routing these into the search
    // input would produce a query it cannot parse.
    expect(getKeyCharacterType('٣').isDigit).toBe(false); // Arabic-Indic three
  });

  test('classifies named and multi-character keys as neither', () => {
    ['Enter', 'ArrowUp', 'Backspace', 'Shift', ' ', ''].forEach((key) =>
      expect(getKeyCharacterType(key)).toEqual({ isLetter: false, isDigit: false }),
    );
  });
});
