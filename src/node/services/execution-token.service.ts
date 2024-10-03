import { ExecutionToken, ExecutionTokenType } from '@node/models/execution-token.model';
import { stringLength } from 'platform-bible-utils';

const tokenMap = new Map<string, ExecutionToken>();

function getMapKey(name: string, tokenType: ExecutionTokenType = 'extension'): string {
  if (!name || stringLength(name) < 1) throw new Error('name must be defined');
  if (!tokenType || stringLength(tokenType) < 1) throw new Error('type must be defined');

  return `${tokenType}:${name}`;
}

/**
 * This should be called when extensions are being loaded
 *
 * @param extensionName Name of the extension to register
 * @returns Token that can be passed to `tokenIsValid` to authenticate or authorize API callers. It
 *   is important that the token is not shared to avoid impersonation of API callers.
 */
function registerExtension(extensionName: string): ExecutionToken {
  const mapKey: string = getMapKey(extensionName);
  if (tokenMap.get(mapKey))
    throw new Error(`${extensionName} is already registered with the execution token service!`);

  const newToken = new ExecutionToken('extension', extensionName);
  tokenMap.set(mapKey, newToken);
  return newToken;
}

/**
 * Remove a registered token. Note that a hash of a token is what is needed to unregister, not the
 * full token itself (notably not the nonce), so something can be delegated the ability to
 * unregister a token without having been given the full token itself.
 *
 * @param extensionName Name of the extension that was originally registered
 * @param tokenHash Value of `getHash()` of the token that was originally registered.
 * @returns `true` if the token was successfully unregistered, `false` otherwise
 */
function unregisterExtension(extensionName: string, tokenHash: string): boolean {
  const mapKey: string = getMapKey(extensionName);
  const token = tokenMap.get(mapKey);
  if (!token || token.getHash() !== tokenHash) return false;
  return tokenMap.delete(mapKey);
}

/**
 * This should only be needed by services that need to contextualize the response for the caller
 *
 * @param executionToken Token that was previously registered.
 * @returns `true` if the token matches a token that was previous registered, `false` otherwise.
 */
function tokenIsValid(executionToken: ExecutionToken): boolean {
  if (!executionToken) throw new Error('Token must be defined');
  if (!Object.isFrozen(executionToken)) throw new Error('Token was not created by this service');

  const storedToken = tokenMap.get(getMapKey(executionToken.name, executionToken.type));
  return (
    storedToken !== undefined &&
    storedToken.type === executionToken.type &&
    storedToken.name === executionToken.name &&
    storedToken.nonce === executionToken.nonce
  );
}

const executionTokenService = {
  registerExtension,
  unregisterExtension,
  tokenIsValid,
};

export default executionTokenService;
