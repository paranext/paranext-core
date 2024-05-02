import NumberFormat from './intl-number-format';

const testNumberFormatter: NumberFormat = new NumberFormat('en-US');
const START_NUMBER = 654321.987;
const FORMATTED_NUMBER = '654,321.987';
const END_NUMBER = 754321.987;
const FORMATTED_RANGE = '654,321.987–754,321.987';

describe('NumberFormat', () => {
  describe('format', () => {
    it('should return a string of the formatted number', () => {
      const result = testNumberFormatter.format(START_NUMBER);
      expect(result).toEqual(FORMATTED_NUMBER);
    });
  });

  describe('formatRange', () => {
    it('should return a string of the formatted range', () => {
      const result = testNumberFormatter.formatRange(START_NUMBER, END_NUMBER);
      expect(result).toEqual(FORMATTED_RANGE);
    });
  });

  describe('formatRangeToParts', () => {
    it('should return an array of number range format parts', () => {
      const result = testNumberFormatter.formatRangeToParts(START_NUMBER, END_NUMBER);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('formatToParts', () => {
    it('should return an array of number format parts', () => {
      const result = testNumberFormatter.formatToParts(START_NUMBER);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
