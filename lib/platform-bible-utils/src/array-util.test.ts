import ensureArray from './array-util';

describe('ensureArray', () => {
  test('should return an empty array when input is undefined', () => {
    expect(ensureArray(undefined)).toEqual([]);
  });

  test('should return the input array as-is when the input is already an array', () => {
    const input = [1, 2, 3];
    expect(ensureArray(input)).toBe(input);
  });

  test('should wrap a single item in an array', () => {
    const input = 5;
    expect(ensureArray(input)).toEqual([input]);
  });

  test('should handle an array of objects', () => {
    const input = [{ id: 1 }, { id: 2 }];
    expect(ensureArray(input)).toBe(input);
  });

  test('should wrap a single object in an array', () => {
    const input = { id: 1 };
    expect(ensureArray(input)).toEqual([input]);
  });

  test('should wrap a single string in an array', () => {
    const input = 'a';
    expect(ensureArray(input)).toEqual([input]);
  });
});
