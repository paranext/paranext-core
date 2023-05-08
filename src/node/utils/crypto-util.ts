import crypto, { randomUUID } from 'crypto';

export function createUuid(): string {
  return randomUUID();
}

/**
 * Create a cryptographically secure nonce that is at least 128 bits long
 * See nonce spec at https://w3c.github.io/webappsec-csp/#security-nonces
 *
 * @param encoding: "base64url" (HTML safe, shorter string) or "hex" (longer string)
 * From https://base64.guru/standards/base64url, the purpose of this encoding is
 * "the ability to use the encoding result as filename or URL address"
 * @param numberOfBytes: number of bytes the resulting nonce should contain
 * @returns cryptographically secure, pseudo-randomly generated value encoded as a string
 */
export function createNonce(encoding: 'base64url' | 'hex', numberOfBytes: number = 16): string {
  if (numberOfBytes < 16) throw new Error('Nonces should be at least 128 bit values');
  const randomBytes = crypto.randomBytes(numberOfBytes);
  return randomBytes.toString(encoding);
}
