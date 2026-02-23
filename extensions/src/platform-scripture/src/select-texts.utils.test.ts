/**
 * === NEW IN PT10 === Reason: Unit tests for Select Texts dialog utility functions. Maps to:
 * UI-PKG-001
 */
import { describe, expect, it } from 'vitest';
import {
  canMoveDown,
  canMoveUp,
  isRequiredItem,
  isSavedScrTextList,
  isScrTextInfo,
  parseSavedScrTextListArray,
  parseScrTextInfoArray,
  ScrTextInfo,
} from './select-texts.utils';

// #region Test data factories

function makeScrTextInfo(overrides: Partial<ScrTextInfo> = {}): ScrTextInfo {
  return {
    name: 'TestProject',
    id: 'proj-001',
    fullName: 'Test Project Full Name',
    language: 'English',
    projectType: 'Standard',
    isSecondaryText: false,
    ...overrides,
  };
}

// #endregion

// #region isScrTextInfo

describe('isScrTextInfo', () => {
  it('should return true for a valid ScrTextInfo object', () => {
    const item = makeScrTextInfo();
    expect(isScrTextInfo(item)).toBe(true);
  });

  it('should return true for an object with at least name and id as strings', () => {
    expect(isScrTextInfo({ name: 'A', id: 'B' })).toBe(true);
  });

  it('should return false for undefined', () => {
    expect(isScrTextInfo(undefined)).toBe(false);
  });

  it('should return false for a number', () => {
    expect(isScrTextInfo(42)).toBe(false);
  });

  it('should return false for a string', () => {
    expect(isScrTextInfo('not an object')).toBe(false);
  });

  it('should return false for an object missing name', () => {
    expect(isScrTextInfo({ id: 'proj-001' })).toBe(false);
  });

  it('should return false for an object missing id', () => {
    expect(isScrTextInfo({ name: 'TestProject' })).toBe(false);
  });

  it('should return false for an object where name is not a string', () => {
    expect(isScrTextInfo({ name: 123, id: 'proj-001' })).toBe(false);
  });

  it('should return false for an object where id is not a string', () => {
    expect(isScrTextInfo({ name: 'TestProject', id: 123 })).toBe(false);
  });

  it('should return false for an empty object', () => {
    expect(isScrTextInfo({})).toBe(false);
  });

  it('should return false for an array', () => {
    expect(isScrTextInfo([1, 2, 3])).toBe(false);
  });
});

// #endregion

// #region isSavedScrTextList

describe('isSavedScrTextList', () => {
  it('should return true for a valid SavedScrTextList object', () => {
    expect(
      isSavedScrTextList({
        name: 'Collection1',
        scrTextNames: ['ProjA', 'ProjB'],
        scrProjectIndex: 0,
        hebGrkIndex: 1,
      }),
    ).toBe(true);
  });

  it('should return true for minimal valid object (name + scrTextNames array)', () => {
    expect(isSavedScrTextList({ name: 'Col', scrTextNames: [] })).toBe(true);
  });

  it('should return false for undefined', () => {
    expect(isSavedScrTextList(undefined)).toBe(false);
  });

  it('should return false for an object missing name', () => {
    expect(isSavedScrTextList({ scrTextNames: ['A'] })).toBe(false);
  });

  it('should return false for an object missing scrTextNames', () => {
    expect(isSavedScrTextList({ name: 'Col' })).toBe(false);
  });

  it('should return false when scrTextNames is not an array', () => {
    expect(isSavedScrTextList({ name: 'Col', scrTextNames: 'not-array' })).toBe(false);
  });

  it('should return false for an empty object', () => {
    expect(isSavedScrTextList({})).toBe(false);
  });
});

// #endregion

// #region parseScrTextInfoArray

describe('parseScrTextInfoArray', () => {
  it('should return an empty array for non-array input', () => {
    expect(parseScrTextInfoArray('not-an-array')).toEqual([]);
    expect(parseScrTextInfoArray(42)).toEqual([]);
    expect(parseScrTextInfoArray(undefined)).toEqual([]);
  });

  it('should filter valid ScrTextInfo items from a mixed array', () => {
    const validItem = makeScrTextInfo({ name: 'ValidProject', id: 'valid-001' });
    const input = [validItem, { notValid: true }, 'string-item', 42];
    const result = parseScrTextInfoArray(input);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('ValidProject');
  });

  it('should return all items when all are valid', () => {
    const items = [makeScrTextInfo({ id: 'a' }), makeScrTextInfo({ id: 'b' })];
    expect(parseScrTextInfoArray(items)).toHaveLength(2);
  });

  it('should return empty array for an empty array', () => {
    expect(parseScrTextInfoArray([])).toEqual([]);
  });
});

// #endregion

// #region parseSavedScrTextListArray

describe('parseSavedScrTextListArray', () => {
  it('should return an empty array for non-array input', () => {
    expect(parseSavedScrTextListArray('not-array')).toEqual([]);
    expect(parseSavedScrTextListArray(undefined)).toEqual([]);
  });

  it('should filter valid SavedScrTextList items', () => {
    const valid = { name: 'Col', scrTextNames: ['A'], scrProjectIndex: 0, hebGrkIndex: 0 };
    const invalid = { name: 'Col' }; // missing scrTextNames
    const result = parseSavedScrTextListArray([valid, invalid]);
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Col');
  });

  it('should return empty array for an empty array', () => {
    expect(parseSavedScrTextListArray([])).toEqual([]);
  });
});

// #endregion

// #region isRequiredItem

describe('isRequiredItem', () => {
  const requiredItems = [makeScrTextInfo({ id: 'req-001' }), makeScrTextInfo({ id: 'req-002' })];

  it('should return true when item id matches a required item', () => {
    const item = makeScrTextInfo({ id: 'req-001' });
    expect(isRequiredItem(item, requiredItems)).toBe(true);
  });

  it('should return false when item id does not match any required item', () => {
    const item = makeScrTextInfo({ id: 'not-required' });
    expect(isRequiredItem(item, requiredItems)).toBe(false);
  });

  it('should return false when requiredItems is empty', () => {
    const item = makeScrTextInfo({ id: 'any' });
    expect(isRequiredItem(item, [])).toBe(false);
  });
});

// #endregion

// #region canMoveUp

describe('canMoveUp', () => {
  const required = [makeScrTextInfo({ id: 'req-001' })];
  const items = [
    makeScrTextInfo({ id: 'req-001', name: 'Required' }),
    makeScrTextInfo({ id: 'proj-002', name: 'Second' }),
    makeScrTextInfo({ id: 'proj-003', name: 'Third' }),
  ];

  it('should return false for index 0 (already at top)', () => {
    expect(canMoveUp(0, items, [])).toBe(false);
  });

  it('should return false for negative index', () => {
    expect(canMoveUp(-1, items, [])).toBe(false);
  });

  it('should return true for non-required item not at top with non-required item above', () => {
    expect(canMoveUp(2, items, required)).toBe(true);
  });

  it('should return false when item is required', () => {
    expect(canMoveUp(0, items, required)).toBe(false);
  });

  it('should return false when item above is required', () => {
    // items[0] is required, items[1] is not
    expect(canMoveUp(1, items, required)).toBe(false);
  });

  it('should return true with no required items', () => {
    expect(canMoveUp(1, items, [])).toBe(true);
  });
});

// #endregion

// #region canMoveDown

describe('canMoveDown', () => {
  const required = [makeScrTextInfo({ id: 'req-003' })];
  const items = [
    makeScrTextInfo({ id: 'proj-001', name: 'First' }),
    makeScrTextInfo({ id: 'proj-002', name: 'Second' }),
    makeScrTextInfo({ id: 'req-003', name: 'Required' }),
  ];

  it('should return false for last index (already at bottom)', () => {
    expect(canMoveDown(2, items, [])).toBe(false);
  });

  it('should return false for index beyond array length', () => {
    expect(canMoveDown(5, items, [])).toBe(false);
  });

  it('should return true for non-required item not at bottom with non-required item below', () => {
    expect(canMoveDown(0, items, required)).toBe(true);
  });

  it('should return false when item is required', () => {
    expect(canMoveDown(2, items, required)).toBe(false);
  });

  it('should return false when item below is required', () => {
    // items[1] is not required, items[2] is required
    expect(canMoveDown(1, items, required)).toBe(false);
  });

  it('should return true with no required items', () => {
    expect(canMoveDown(0, items, [])).toBe(true);
  });
});

// #endregion
