import { describe, expect, it } from 'vitest';
import { getLocalizeKeyForPhysicalKey } from './keyboard-util';

describe('getLocalizeKeyForPhysicalKey', () => {
  it('maps Backspace to its localization key', () => {
    expect(getLocalizeKeyForPhysicalKey('Backspace')).toBe('%physicalKey_backspace%');
  });

  it('maps Delete to its localization key', () => {
    expect(getLocalizeKeyForPhysicalKey('Delete')).toBe('%physicalKey_delete%');
  });
});
