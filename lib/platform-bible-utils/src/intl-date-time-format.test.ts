import DateTimeFormat from './intl-date-time-format';

const testDateTimeFormatter: DateTimeFormat = new DateTimeFormat('en');
const START_DATE = new Date(2024, 3, 25, 12, 30, 0);
const START_DATE_FORMATTED = '4/25/2024';
const END_DATE = new Date(2024, 3, 30, 12, 30, 0);
const RANGE_FORMATTED = '4/25/2024 – 4/30/2024'; // Intl returns these space and dash characters instead of normal ones

describe('DateTimeFormatter', () => {
  describe('format', () => {
    it('should return string with formatted date', () => {
      const result = testDateTimeFormatter.format(START_DATE);
      expect(result).toEqual(START_DATE_FORMATTED);
    });
  });

  describe('formatRange', () => {
    it('should return string with formatted date range', () => {
      const result = testDateTimeFormatter.formatRange(START_DATE, END_DATE);
      expect(result).toEqual(RANGE_FORMATTED);
    });
  });

  describe('formatRangeToParts', () => {
    it('should return an array of date-time format parts', () => {
      const result = testDateTimeFormatter.formatRangeToParts(START_DATE, END_DATE);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('formatToParts', () => {
    it('should return an array of date-time format parts', () => {
      const result = testDateTimeFormatter.formatToParts(START_DATE);

      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
