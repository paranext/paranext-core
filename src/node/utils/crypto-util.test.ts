import { createUuid, createNonce, generateHashFromBuffer } from './crypto-util';

test('createUuid returns a property formatted UUID', () => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[8-9a-b][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const uuid = createUuid();
  expect(uuidRegex.test(uuid)).toBe(true);
});

test('two UUIDs created right after each other are not the same', () => {
  const uuid1 = createUuid();
  const uuid2 = createUuid();
  expect(uuid1).not.toEqual(uuid2);
});

test('createNonce(hex) produces a value with the correct number of bytes', () => {
  // Hex encodes 4 bits per character, so it's always 2 chars per byte.
  const nonce = createNonce('hex', 20);
  expect(nonce.length).toEqual(40);
});

test('createNonce(base64url) produces a value with the correct number of bytes', () => {
  // Base64 encodes 6 bits per character. (20 * 8) / 6 = 26.666 which rounds up to 27
  const nonce = createNonce('base64url', 20);
  expect(nonce.length).toEqual(27);
});

test('two nonces created right after each other are not the same', () => {
  const nonce1 = createNonce('hex');
  const nonce2 = createNonce('hex');
  expect(nonce1).not.toEqual(nonce2);
});

test('nonces have sufficient entropy', () => {
  const data = hexStringToUint8Array(createNonce('hex', 256));
  const entropy = calculateEntropy(data);
  // This can be thought of as "how many bits of randomness are in each byte?"
  // Bad random number generators will produce low entropy values
  // Longer nonces should produce higher entropies, so this value is tied to the data length
  expect(entropy).toBeGreaterThan(4);
});

function hexStringToUint8Array(hexString: string): Uint8Array {
  const byteString = hexString.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) ?? [];
  return new Uint8Array(byteString);
}

// https://machinelearningmastery.com/what-is-information-entropy/
function calculateEntropy(data: Uint8Array): number {
  const frequencies = new Map<number, number>();
  const total = data.length;

  for (let i = 0; i < total; i++) {
    const byte = data[i];
    const count = frequencies.get(byte) || 0;
    frequencies.set(byte, count + 1);
  }

  let entropy = 0;
  // eslint-disable-next-line no-restricted-syntax, @typescript-eslint/no-unused-vars
  for (const [_ignore, frequency] of frequencies) {
    const probability = frequency / total;
    entropy -= probability * Math.log2(probability);
  }

  return entropy;
}

test('hash algorithm works as expected', () => {
  const buffer = Buffer.from('Hello, World!', 'utf-8');
  const hashValue256 = generateHashFromBuffer('sha256', 'base64', buffer);
  expect(hashValue256).toBe('3/1gIbsr1bCvZ2KQgJ7DpTGR3YHH9wpLKGiKNiGCmG8=');
  const hashValue512 = generateHashFromBuffer('SHA-512', 'base64', buffer);
  expect(hashValue512).toBe(
    'N015SpXNz9izWZMYX++bo2jxYNja9DLQi6nx7R5avmzGkpHg+i/gAGpSVw7xjBne9OYXwzzlLvCm5fvjGMsDhw==',
  );
});
