import { describe, expect, it } from 'vitest';
import { getLocalizeKeyForPhysicalKey, NameablePhysicalKey } from './keyboard-util';

describe('getLocalizeKeyForPhysicalKey', () => {
  it('maps Backspace to its localization key', () => {
    expect(getLocalizeKeyForPhysicalKey('Backspace')).toBe('%physicalKey_backspace%');
  });

  it('maps Delete to its localization key', () => {
    expect(getLocalizeKeyForPhysicalKey('Delete')).toBe('%physicalKey_delete%');
  });

  it('lowercases only the first letter, so a compound key name stays camelCase instead of mashing together', () => {
    // 'ArrowLeft' isn't a real NameablePhysicalKey (no localization asset backs it) — this cast
    // exercises the camelCase-preserving transform against a hypothetical future compound key
    // without adding an unsupported/untranslated member to the real union.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const compoundKey = 'ArrowLeft' as NameablePhysicalKey;
    expect(getLocalizeKeyForPhysicalKey(compoundKey)).toBe('%physicalKey_arrowLeft%');
  });
});
