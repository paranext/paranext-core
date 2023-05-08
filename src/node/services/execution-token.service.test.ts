import { createUuid } from '@node/utils/crypto-util';
import executionTokenService from './execution-token.service';

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

test('Extensions that are registered, unregistered, and re-registered get new nonces', () => {
  const name = createUuid();
  const token1 = executionTokenService.registerExtension(name);
  executionTokenService.unregisterExtension(name, token1.getHash());
  const token2 = executionTokenService.registerExtension(name);
  expect(token1.nonce).not.toEqual(token2.nonce);
});
