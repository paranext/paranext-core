import { SortedNumberMap } from './sorted-number-map';

describe('SortedNumberMap', () => {
  let map: SortedNumberMap<string>;

  beforeEach(() => {
    map = new SortedNumberMap<string>();
  });

  describe('set', () => {
    it('should add a single key-value pair', () => {
      map.set(10, 'ten');
      const result = map.findClosestLessThanOrEqual(15);
      expect(result).toEqual({ key: 10, value: 'ten' });
    });

    it('should maintain sorted order when adding multiple keys', () => {
      map.set(30, 'thirty');
      map.set(10, 'ten');
      map.set(20, 'twenty');

      expect(map.findClosestLessThanOrEqual(15)).toEqual({ key: 10, value: 'ten' });
      expect(map.findClosestLessThanOrEqual(25)).toEqual({ key: 20, value: 'twenty' });
      expect(map.findClosestLessThanOrEqual(35)).toEqual({ key: 30, value: 'thirty' });
    });

    it('should update existing key without duplicating it', () => {
      map.set(10, 'ten');
      map.set(10, 'updated ten');

      const result = map.findClosestLessThanOrEqual(15);
      expect(result).toEqual({ key: 10, value: 'updated ten' });
    });

    it('should handle negative numbers', () => {
      map.set(-10, 'negative ten');
      map.set(5, 'five');
      map.set(-5, 'negative five');

      expect(map.findClosestLessThanOrEqual(0)).toEqual({ key: -5, value: 'negative five' });
      expect(map.findClosestLessThanOrEqual(-3)).toEqual({ key: -5, value: 'negative five' });
      expect(map.findClosestLessThanOrEqual(10)).toEqual({ key: 5, value: 'five' });
    });

    it('should handle decimal numbers', () => {
      map.set(1.5, 'one and half');
      map.set(2.7, 'two point seven');
      map.set(1.2, 'one point two');

      expect(map.findClosestLessThanOrEqual(2)).toEqual({ key: 1.5, value: 'one and half' });
      expect(map.findClosestLessThanOrEqual(3)).toEqual({ key: 2.7, value: 'two point seven' });
    });

    it('should handle zero', () => {
      map.set(0, 'zero');
      map.set(-1, 'negative one');
      map.set(1, 'one');

      expect(map.findClosestLessThanOrEqual(0.5)).toEqual({ key: 0, value: 'zero' });
      expect(map.findClosestLessThanOrEqual(0)).toEqual({ key: 0, value: 'zero' });
    });
  });

  describe('findClosestLessThanOrEqual', () => {
    beforeEach(() => {
      map.set(10, 'ten');
      map.set(20, 'twenty');
      map.set(30, 'thirty');
      map.set(40, 'forty');
    });

    it('should find the closest smaller or equal key', () => {
      expect(map.findClosestLessThanOrEqual(25)).toEqual({ key: 20, value: 'twenty' });
      expect(map.findClosestLessThanOrEqual(35)).toEqual({ key: 30, value: 'thirty' });
      expect(map.findClosestLessThanOrEqual(15)).toEqual({ key: 10, value: 'ten' });
    });

    it('should return undefined when target is smaller than all keys', () => {
      expect(map.findClosestLessThanOrEqual(5)).toBeUndefined();
    });

    it('should return undefined for empty map', () => {
      const emptyMap = new SortedNumberMap<string>();
      expect(emptyMap.findClosestLessThanOrEqual(10)).toBeUndefined();
    });

    it('should handle exact matches correctly (should not return exact match)', () => {
      expect(map.findClosestLessThanOrEqual(20)).toEqual({ key: 20, value: 'twenty' });
      expect(map.findClosestLessThanOrEqual(30)).toEqual({ key: 30, value: 'thirty' });
      expect(map.findClosestLessThanOrEqual(40)).toEqual({ key: 40, value: 'forty' });
    });

    it('should find closest when target is larger than all keys', () => {
      expect(map.findClosestLessThanOrEqual(50)).toEqual({ key: 40, value: 'forty' });
      expect(map.findClosestLessThanOrEqual(100)).toEqual({ key: 40, value: 'forty' });
    });

    it('should work with single element', () => {
      const singleMap = new SortedNumberMap<string>();
      singleMap.set(15, 'fifteen');

      expect(singleMap.findClosestLessThanOrEqual(20)).toEqual({ key: 15, value: 'fifteen' });
      expect(singleMap.findClosestLessThanOrEqual(15)).toEqual({ key: 15, value: 'fifteen' });
      expect(singleMap.findClosestLessThanOrEqual(10)).toBeUndefined();
    });

    it('should handle very close numbers', () => {
      const preciseMap = new SortedNumberMap<string>();
      preciseMap.set(1.0000001, 'tiny bit more than one');
      preciseMap.set(1.0000002, 'tiny bit more still');

      expect(preciseMap.findClosestLessThanOrEqual(1.00000015)).toEqual({
        key: 1.0000001,
        value: 'tiny bit more than one',
      });
      expect(preciseMap.findClosestLessThanOrEqual(1.0000003)).toEqual({
        key: 1.0000002,
        value: 'tiny bit more still',
      });
    });
  });

  describe('complex data types', () => {
    interface TestObject {
      name: string;
      value: number;
    }

    let objectMap: SortedNumberMap<TestObject>;

    beforeEach(() => {
      objectMap = new SortedNumberMap<TestObject>();
    });

    it('should work with object values', () => {
      const obj1 = { name: 'first', value: 100 };
      const obj2 = { name: 'second', value: 200 };

      objectMap.set(10, obj1);
      objectMap.set(20, obj2);

      const result = objectMap.findClosestLessThanOrEqual(15);
      expect(result).toEqual({ key: 10, value: obj1 });
      expect(result?.value.name).toBe('first');
    });

    it('should work with array values', () => {
      const arrayMap = new SortedNumberMap<number[]>();
      arrayMap.set(5, [1, 2, 3]);
      arrayMap.set(15, [4, 5, 6]);

      const result = arrayMap.findClosestLessThanOrEqual(10);
      expect(result).toEqual({ key: 5, value: [1, 2, 3] });
    });

    it('should work with function values', () => {
      const funcMap = new SortedNumberMap<() => string>();
      const func1 = () => 'hello';
      const func2 = () => 'world';

      funcMap.set(1, func1);
      funcMap.set(2, func2);

      const result = funcMap.findClosestLessThanOrEqual(1.5);
      expect(result?.value()).toBe('hello');
    });
  });

  describe('performance and edge cases', () => {
    it('should handle large datasets efficiently', () => {
      const largeMap = new SortedNumberMap<number>();

      // Add 1000 entries
      for (let i = 0; i < 1000; i++) {
        largeMap.set(i * 2, i * 10); // Even numbers as keys
      }

      // Should find closest efficiently
      expect(largeMap.findClosestLessThanOrEqual(999)).toEqual({ key: 998, value: 4990 });
      expect(largeMap.findClosestLessThanOrEqual(501)).toEqual({ key: 500, value: 2500 });
      expect(largeMap.findClosestLessThanOrEqual(1)).toEqual({ key: 0, value: 0 });
    });

    it('should handle duplicate inserts without breaking order', () => {
      for (let i = 0; i < 5; i++) {
        map.set(10, `ten-${i}`);
        map.set(20, `twenty-${i}`);
      }

      expect(map.findClosestLessThanOrEqual(15)).toEqual({ key: 10, value: 'ten-4' });
      expect(map.findClosestLessThanOrEqual(25)).toEqual({ key: 20, value: 'twenty-4' });
    });

    it('should handle very large numbers', () => {
      const bigMap = new SortedNumberMap<string>();
      bigMap.set(Number.MAX_SAFE_INTEGER - 1, 'almost max');
      bigMap.set(Number.MAX_SAFE_INTEGER, 'max');

      expect(bigMap.findClosestLessThanOrEqual(Number.MAX_SAFE_INTEGER)).toEqual({
        key: Number.MAX_SAFE_INTEGER,
        value: 'max',
      });
    });

    it('should handle very small numbers', () => {
      const smallMap = new SortedNumberMap<string>();
      smallMap.set(Number.MIN_SAFE_INTEGER, 'min');
      smallMap.set(Number.MIN_SAFE_INTEGER + 1, 'almost min');

      expect(smallMap.findClosestLessThanOrEqual(Number.MIN_SAFE_INTEGER + 2)).toEqual({
        key: Number.MIN_SAFE_INTEGER + 1,
        value: 'almost min',
      });
    });

    it('should maintain correct order with mixed insertions', () => {
      const values = [50, 10, 30, 70, 20, 60, 40];

      values.forEach((val) => {
        map.set(val, `value-${val}`);
      });

      // Verify order by checking each closest lookup
      expect(map.findClosestLessThanOrEqual(15)).toEqual({ key: 10, value: 'value-10' });
      expect(map.findClosestLessThanOrEqual(25)).toEqual({ key: 20, value: 'value-20' });
      expect(map.findClosestLessThanOrEqual(35)).toEqual({ key: 30, value: 'value-30' });
      expect(map.findClosestLessThanOrEqual(45)).toEqual({ key: 40, value: 'value-40' });
      expect(map.findClosestLessThanOrEqual(55)).toEqual({ key: 50, value: 'value-50' });
      expect(map.findClosestLessThanOrEqual(65)).toEqual({ key: 60, value: 'value-60' });
      expect(map.findClosestLessThanOrEqual(75)).toEqual({ key: 70, value: 'value-70' });
    });
  });
});
