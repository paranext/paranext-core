import { describe, expect, it } from 'vitest';
import { compareStrings, compareVersions, isNumericVersion } from './compare';

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

describe('isNumericVersion', () => {
  // `compareVersions` must return an ordering for every input, so it coerces a component it cannot
  // read to 0 - which makes `4.4.x` compare EQUAL to `4.4.0`. A caller turning the comparison into
  // a decision needs to know the difference; `isFrameworkPackage`'s `<= 0` test is the one that
  // would otherwise drop a package before the copyleft gate on a version it could not parse.
  it.each([
    ['4.4.0', true],
    ['9.5.0.22', true],
    ['1.0.0-beta.1', true],
    ['4.4.1+abc', true],
    ['4.4.x', false],
    ['1.0.0final', false],
    ['\u2014', false],
    ['', false],
  ])('reads %s as numeric: %s', (version, expected) => {
    expect(isNumericVersion(version)).toBe(expected);
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
