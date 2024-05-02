import Collator from './intl-collator';

const testCollator: Collator = new Collator('en-US');
const STRING1 = 'z';
const STRING2 = 'a';

describe('Collator', () => {
  describe('compare', () => {
    it('should return integer greater than 0', () => {
      const result = testCollator.compare(STRING1, STRING2);
      expect(result).toBeGreaterThan(0);
    });

    it('should return integer less than 0', () => {
      const result = testCollator.compare(STRING2, STRING1);
      expect(result).toBeLessThan(0);
    });

    it('should return 0', () => {
      const result = testCollator.compare(STRING1, STRING1);
      expect(result).toEqual(0);
    });
  });
});
