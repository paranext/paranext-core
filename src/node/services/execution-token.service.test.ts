import { createUuid } from '@node/utils/crypto-util';
import { executionTokenService } from './execution-token.service';

test('Token returned from registering an extension has expected data', () => {
  const name = createUuid();
  const token = executionTokenService.registerExtension(name);
  expect(token.name).toEqual(name);
  expect(token.type).toEqual('extension');
});

test('TokenIsValid() works', () => {
  const name = createUuid();
  const token = executionTokenService.registerExtension(name);
  expect(executionTokenService.tokenIsValid(token)).toBe(true);
});

test('Same extension cannot be registered twice', () => {
  const name = createUuid();
  executionTokenService.registerExtension(name);
  expect(() => executionTokenService.registerExtension(name)).toThrow();
});

// The name becomes part of the token map key, so a non-string one that got through would build a
// key that silently never matches a real token. `length` is `undefined` on all of these and
// `undefined < 1` is false, so a length check alone lets every one of them through.
test.each([
  ['a number', 42],
  ['a boolean', true],
  ['an object', {}],
  ['an array', ['foo']],
])('An extension cannot be registered with a name that is %s', (_name, name) => {
  // The assertion is that a caller lying about the type is rejected, so the lie has to be written
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  expect(() => executionTokenService.registerExtension(name as string)).toThrow(
    /name must be (defined|a string)/,
  );
});

test('Extensions that are registered, unregistered, and re-registered get new nonces', () => {
  const name = createUuid();
  const token1 = executionTokenService.registerExtension(name);
  executionTokenService.unregisterExtension(name, token1.getHash());
  const token2 = executionTokenService.registerExtension(name);
  expect(token1.nonce).not.toEqual(token2.nonce);
});
