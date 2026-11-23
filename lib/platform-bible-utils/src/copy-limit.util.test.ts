import { vi } from 'vitest';
import { truncateToCopyLimit } from './copy-limit.util';

describe('truncateToCopyLimit', () => {
  it('returns text within the limit unchanged', () => {
    expect(truncateToCopyLimit('abc', 3)).toBe('abc');
    expect(truncateToCopyLimit('', 0)).toBe('');
  });

  it('returns text unchanged when there is no limit', () => {
    expect(truncateToCopyLimit('abcdef', undefined)).toBe('abcdef');
  });

  it('cuts text over the limit to the limit', () => {
    expect(truncateToCopyLimit('abcdef', 4)).toBe('abcd');
    expect(truncateToCopyLimit('abcdef', 0)).toBe('');
  });

  it.each([
    ['a character outside the Basic Multilingual Plane', 'a\u{1E900}b', 2, 'a'],
    ['a base letter and its combining mark', 'aéb', 2, 'a'],
    ['a cluster that ends exactly at the limit', 'éab', 2, 'é'],
    // A Khmer consonant, coeng and subscript consonant form one cluster.
    ['a Khmer conjunct', 'ក្កx', 2, ''],
  ])('does not split %s', (_name, text, copyLimit, expected) => {
    expect(truncateToCopyLimit(text, copyLimit)).toBe(expected);
  });

  it("finds cluster boundaries without the runtime's own segmenter", () => {
    // The runtime's segmenter can disagree with the rest of this package on some scripts, so it
    // must not decide where a cut falls.
    const segmenterSpy = vi.spyOn(Intl, 'Segmenter').mockImplementation(function throwOnUse() {
      throw new Error('Intl.Segmenter must not be used');
    });
    try {
      expect(truncateToCopyLimit('ក្កx', 3)).toBe('ក្ក');
    } finally {
      segmenterSpy.mockRestore();
    }
  });
});
