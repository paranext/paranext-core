import { ExecutionToken } from './execution-token.model';

test('tokens are always frozen', () => {
  const token = new ExecutionToken('extension', 'foo');
  expect(Object.isFrozen(token)).toBe(true);
});

test('a token cannot be constructed with an empty name', () => {
  expect(() => new ExecutionToken('extension', '')).toThrow(/name must be a string/);
});

// A token's name becomes a directory name, so a non-string one has to be rejected here rather than
// surfacing later inside `sanitizeDirectoryName`'s `replace`. `length` is `undefined` on all of
// these and `undefined < 1` is false, so a length check alone lets every one of them through.
test.each([
  ['a number', 42],
  ['a boolean', true],
  ['an object', {}],
  ['an array', ['foo']],
])('a token cannot be constructed with a name that is %s', (_name, name) => {
  // The assertion is that a caller lying about the type is rejected, so the lie has to be written
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  expect(() => new ExecutionToken('extension', name as string)).toThrow(/name must be a string/);
});
