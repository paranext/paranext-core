import isSubset from './subset-checking';

test('Subset checking works on simple types', () => {
  expect(isSubset('a', 'a')).toBeTruthy();
  expect(isSubset('a', 'b')).toBeFalsy();
  expect(isSubset(1, 1)).toBeTruthy();
  expect(isSubset(1, 2)).toBeFalsy();
  expect(isSubset(true, true)).toBeTruthy();
  expect(isSubset(true, false)).toBeFalsy();
  // eslint-disable-next-line no-null/no-null
  expect(isSubset(null, null)).toBeTruthy();
  expect(isSubset(undefined, undefined)).toBeTruthy();
  expect(isSubset('', '')).toBeTruthy();
  expect(isSubset(false, false)).toBeTruthy();
  expect(isSubset(0, 0)).toBeTruthy();
  expect(isSubset(undefined, false)).toBeFalsy();
  expect(isSubset(undefined, '')).toBeFalsy();
  expect(isSubset(undefined, 0)).toBeFalsy();
});

test('Subset checking works on arrays of simple types', () => {
  expect(isSubset([1, 2, 3], [1, 2, 3])).toBeTruthy();
  expect(isSubset([1, 2, 3], [1, 2])).toBeTruthy();
  expect(isSubset([1, 2, 3], [1])).toBeTruthy();
  expect(isSubset([1, 2, 3], [])).toBeTruthy();
  // You could argue this should be false, but we're only looking at existence of items, not counts
  // Maybe it should consider counts, but it doesn't matter for the purpose that `isSubset` was made
  expect(isSubset([1, 2, 3], [1, 1, 1])).toBeTruthy();

  expect(isSubset(['a', 'b', 'c'], ['c', 'a', 'b'])).toBeTruthy();
  expect(isSubset([true, false], [false])).toBeTruthy();
});

test('Subset checking works on objects with properties', () => {
  const objA = { name: 'Alice', age: 30, address: { city: 'Seattle' } };
  const objB = { name: 'Alice', address: { city: 'Seattle' } };
  const objC = {};
  expect(isSubset(objA, objB)).toBeTruthy();
  expect(isSubset(objB, objA)).toBeFalsy();
  expect(isSubset(objA, objC)).toBeTruthy();
  expect(isSubset(objC, objA)).toBeFalsy();
  expect(isSubset(objB, objC)).toBeTruthy();
  expect(isSubset(objC, objB)).toBeFalsy();
});
