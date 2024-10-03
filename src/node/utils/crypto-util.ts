import crypto, { randomUUID } from 'crypto';

export function createUuid(): string {
  return randomUUID();
}

/**
 * Create a cryptographically secure nonce that is at least 128 bits long. See nonce spec at
 * https://w3c.github.io/webappsec-csp/#security-nonces
 *
 * @param encoding: "base64url" (HTML safe, shorter string) or "hex" (longer string) From
 *   https://base64.guru/standards/base64url, the purpose of this encoding is "the ability to use
 *   the encoding result as filename or URL address"
 * @param numberOfBytes: Number of bytes the resulting nonce should contain
 * @returns Cryptographically secure, pseudo-randomly generated value encoded as a string
 */
export function createNonce(encoding: 'base64url' | 'hex', numberOfBytes: number = 16): string {
  if (numberOfBytes < 16) throw new Error('Nonces should be at least 128 bit values');
  const randomBytes = crypto.randomBytes(numberOfBytes);
  return randomBytes.toString(encoding);
}

/**
 * Calculates the hash of a given data buffer
 *
 * @param hashAlgorithm Name of the hash algorithm to use, such as "sha512"
 * @param encodingType String encoding to use for returning the binary hash value that is calculated
 * @param buffer Raw data to be fed into the hash algorithm
 * @returns String encoded value of the digest (https://csrc.nist.gov/glossary/term/hash_digest)
 */
export function generateHashFromBuffer(
  hashAlgorithm: string,
  encodingType: 'base64' | 'base64url' | 'hex' | 'binary',
  buffer: Buffer,
): string {
  // Names of hash algorithms can vary based on the library used
  // The 'crypto' module wants lowercase with no dashes according to the docs
  const algorithm = crypto.getHashes().find((algo) => algo === hashAlgorithm)
    ? hashAlgorithm
    : hashAlgorithm.toLowerCase().replaceAll('-', '');
  const hashAlgo = crypto.createHash(algorithm);
  hashAlgo.update(buffer);
  return hashAlgo.digest(encodingType);
}
