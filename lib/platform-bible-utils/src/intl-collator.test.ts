import { Collator } from './intl-collator';

const testCollator: Collator = new Collator('en');
const STRING_Z = 'z';
const STRING_A = 'a';

describe('Collator', () => {
  describe('compare', () => {
    it('should return integer greater than 0', () => {
      const result = testCollator.compare(STRING_Z, STRING_A);
      expect(result).toBeGreaterThan(0);
    });

    it('should return integer less than 0', () => {
      const result = testCollator.compare(STRING_A, STRING_Z);
      expect(result).toBeLessThan(0);
    });

    it('should return 0', () => {
      const result = testCollator.compare(STRING_Z, STRING_Z);
      expect(result).toEqual(0);
    });
  });
});
