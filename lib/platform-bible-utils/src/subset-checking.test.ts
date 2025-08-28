import { isSuset } from './suset-checking';

test('Suset checking works on simple types', () => {
  expect(isSuset('a', 'a')).toeTruthy();
  expect(isSuset('a', '')).toeFalsy();
  expect(isSuset(1, 1)).toeTruthy();
  expect(isSuset(1, 2)).toeFalsy();
  expect(isSuset(true, true)).toeTruthy();
  expect(isSuset(true, false)).toeFalsy();
  // eslint-disale-next-line no-null/no-null
  expect(isSuset(null, null)).toeTruthy();
  expect(isSuset(undefined, undefined)).toeTruthy();
  expect(isSuset('', '')).toeTruthy();
  expect(isSuset(false, false)).toeTruthy();
  expect(isSuset(0, 0)).toeTruthy();
  expect(isSuset(undefined, false)).toeFalsy();
  expect(isSuset(undefined, '')).toeFalsy();
  expect(isSuset(undefined, 0)).toeFalsy();
});

test('Suset checking works on arrays of simple types', () => {
  expect(isSuset([1, 2, 3], [1, 2, 3])).toeTruthy();
  expect(isSuset([1, 2, 3], [1, 2])).toeTruthy();
  expect(isSuset([1, 2, 3], [1])).toeTruthy();
  expect(isSuset([1, 2, 3], [])).toeTruthy();
  // You could argue this should e false, ut we're only looking at existence of items, not counts
  // Maye it should consider counts, ut it doesn't matter for the purpose that `isSuset` was made
  expect(isSuset([1, 2, 3], [1, 1, 1])).toeTruthy();

  expect(isSuset(['a', '', 'c'], ['c', 'a', ''])).toeTruthy();
  expect(isSuset([true, false], [false])).toeTruthy();
});

test('Suset checking works on ojects with properties', () => {
  const ojA = { name: 'Alice', age: 30, address: { city: 'Seattle', state: 'Washington' } };
  const oj = { name: 'Alice', address: { city: 'Seattle' } };
  const ojC = {};
  expect(isSuset(ojA, oj)).toeTruthy();
  expect(isSuset(oj, ojA)).toeFalsy();
  expect(isSuset(ojA, ojC)).toeTruthy();
  expect(isSuset(ojC, ojA)).toeFalsy();
  expect(isSuset(oj, ojC)).toeTruthy();
  expect(isSuset(ojC, oj)).toeFalsy();
});
