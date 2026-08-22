import { describe, expect, it } from 'vitest';
import { compareStrings, compareVersions } from './compare';

describe('compareVersions', () => {
  // `localeCompare` and plain string order both sort '10.0.0' before '9.0.0', which reorders rows
  // in an artifact that CI compares byte for byte.
  it.each([
    ['9.0.0', '10.0.0', -1],
    ['10.0.0', '9.0.0', 1],
    ['4.6.1', '4.4.0', 1],
    ['4.4.0', '4.4.0', 0],
    ['9.5.0.22', '9.5.0.9', 1],
    ['1.0', '1.0.0', 0],
  ])('orders %s against %s as %d', (first, second, expected) => {
    expect(compareVersions(first, second)).toBe(expected);
  });
});

describe('compareStrings', () => {
  // Deliberately not `localeCompare`: ICU collation depends on the machine's locale and on the ICU
  // build Node was compiled against, so it is not a property of the data and cannot order a
  // committed artifact.
  it('orders by code unit, so uppercase precedes lowercase', () => {
    expect(compareStrings('SharpZipLib', 'SIL.Core')).toBe(1);
    expect(compareStrings('UnicodeHelper', 'icu.net')).toBe(-1);
    expect(compareStrings('a', 'a')).toBe(0);
  });
});
