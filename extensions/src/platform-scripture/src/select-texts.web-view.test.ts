/**
 * Unit tests for the Select Texts dialog logic.
 *
 * These tests validate the core business logic patterns used in the select-texts.web-view.tsx
 * component: sorting, filtering, transfer operations, reordering, and required item constraints.
 */
import { describe, it, expect } from 'vitest';

// #region Types (mirrored from the component for testing)

interface ScrTextInfo {
  name: string;
  id: string;
  fullName: string;
  language: string;
  projectType: string;
  isSecondaryText: boolean;
}

type SortKey = 'projectType' | 'name' | 'fullName' | 'language';
type SortDirection = 'ascending' | 'descending';

interface SortConfig {
  key: SortKey;
  direction: SortDirection;
}

// #endregion

// #region Test Data

const SAMPLE_TEXTS: ScrTextInfo[] = [
  {
    name: 'zzz3',
    id: 'proj-001',
    fullName: 'Test Project 3',
    language: 'English',
    projectType: 'Project',
    isSecondaryText: false,
  },
  {
    name: 'NIV84',
    id: 'res-001',
    fullName: 'NIV 1984',
    language: 'English',
    projectType: 'Resource',
    isSecondaryText: false,
  },
  {
    name: 'CEVUK',
    id: 'res-002',
    fullName: 'CEV UK Edition',
    language: 'English',
    projectType: 'Resource',
    isSecondaryText: false,
  },
  {
    name: 'FRA',
    id: 'proj-002',
    fullName: 'Francais Standard',
    language: 'French',
    projectType: 'Project',
    isSecondaryText: false,
  },
  {
    name: 'HBOGNT',
    id: 'res-004',
    fullName: 'Hebrew/Greek Original',
    language: 'Hebrew',
    projectType: 'Resource',
    isSecondaryText: true,
  },
];

// #endregion

// #region Pure logic functions extracted for testing

/** Filter out secondary texts (isSecondaryText exclusion rule) */
function filterAvailableTexts(texts: ScrTextInfo[]): ScrTextInfo[] {
  return texts.filter((t) => !t.isSecondaryText);
}

/** Sort texts by a given key and direction */
function sortTexts(texts: ScrTextInfo[], sortConfig: SortConfig): ScrTextInfo[] {
  return [...texts].sort((a, b) => {
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    const comparison = aVal.localeCompare(bVal);
    return sortConfig.direction === 'ascending' ? comparison : -comparison;
  });
}

/** Transfer items from left to right (add operation) */
function transferToRight(
  leftItems: ScrTextInfo[],
  rightItems: ScrTextInfo[],
  selectedIds: Set<string>,
): { newLeft: ScrTextInfo[]; newRight: ScrTextInfo[] } {
  const itemsToMove = leftItems.filter((item) => selectedIds.has(item.id));
  const newLeft = leftItems.filter((item) => !selectedIds.has(item.id));
  const newRight = [...rightItems, ...itemsToMove];
  return { newLeft, newRight };
}

/** Transfer item from right to left (remove operation) */
function transferToLeft(
  leftItems: ScrTextInfo[],
  rightItems: ScrTextInfo[],
  selectedId: string,
  requiredIds: Set<string>,
): { newLeft: ScrTextInfo[]; newRight: ScrTextInfo[] } | null {
  if (requiredIds.has(selectedId)) return null;
  const itemToMove = rightItems.find((item) => item.id === selectedId);
  if (!itemToMove) return null;
  const newLeft = [...leftItems, itemToMove];
  const newRight = rightItems.filter((item) => item.id !== selectedId);
  return { newLeft, newRight };
}

/** Move item up in the right list */
function moveUp(
  rightItems: ScrTextInfo[],
  selectedId: string,
  requiredIds: Set<string>,
): ScrTextInfo[] | null {
  const index = rightItems.findIndex((item) => item.id === selectedId);
  if (index <= 0) return null;
  if (requiredIds.has(rightItems[index - 1].id)) return null;
  const newItems = [...rightItems];
  [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
  return newItems;
}

/** Move item down in the right list */
function moveDown(
  rightItems: ScrTextInfo[],
  selectedId: string,
  requiredIds: Set<string>,
): ScrTextInfo[] | null {
  const index = rightItems.findIndex((item) => item.id === selectedId);
  if (index < 0 || index >= rightItems.length - 1) return null;
  if (requiredIds.has(rightItems[index + 1].id)) return null;
  const newItems = [...rightItems];
  [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
  return newItems;
}

/** Check if add button should be enabled */
function isAddEnabled(leftSelection: Set<string>): boolean {
  return leftSelection.size > 0;
}

/** Check if remove button should be enabled */
function isRemoveEnabled(rightSelection: string | undefined, requiredIds: Set<string>): boolean {
  return rightSelection !== undefined && !requiredIds.has(rightSelection);
}

/** Check if move up button should be enabled */
function isMoveUpEnabled(
  rightItems: ScrTextInfo[],
  rightSelection: string | undefined,
  requiredIds: Set<string>,
): boolean {
  if (!rightSelection) return false;
  const index = rightItems.findIndex((item) => item.id === rightSelection);
  if (index <= 0) return false;
  return !requiredIds.has(rightItems[index - 1]?.id ?? '');
}

/** Check if move down button should be enabled */
function isMoveDownEnabled(
  rightItems: ScrTextInfo[],
  rightSelection: string | undefined,
  requiredIds: Set<string>,
): boolean {
  if (!rightSelection) return false;
  const index = rightItems.findIndex((item) => item.id === rightSelection);
  if (index < 0 || index >= rightItems.length - 1) return false;
  return !requiredIds.has(rightItems[index + 1]?.id ?? '');
}

// #endregion

// #region Tests

describe('SelectTextsDialog - isSecondaryText filtering', () => {
  it('should exclude items with isSecondaryText=true from available texts', () => {
    const filtered = filterAvailableTexts(SAMPLE_TEXTS);
    expect(filtered).toHaveLength(4);
    expect(filtered.find((t) => t.id === 'res-004')).toBeUndefined();
  });

  it('should include all items with isSecondaryText=false', () => {
    const filtered = filterAvailableTexts(SAMPLE_TEXTS);
    expect(filtered.map((t) => t.id)).toEqual(['proj-001', 'res-001', 'res-002', 'proj-002']);
  });
});

describe('SelectTextsDialog - sorting', () => {
  const texts = filterAvailableTexts(SAMPLE_TEXTS);

  it('should sort by name ascending', () => {
    const sorted = sortTexts(texts, { key: 'name', direction: 'ascending' });
    expect(sorted.map((t) => t.name)).toEqual(['CEVUK', 'FRA', 'NIV84', 'zzz3']);
  });

  it('should sort by name descending', () => {
    const sorted = sortTexts(texts, { key: 'name', direction: 'descending' });
    expect(sorted.map((t) => t.name)).toEqual(['zzz3', 'NIV84', 'FRA', 'CEVUK']);
  });

  it('should sort by language ascending', () => {
    const sorted = sortTexts(texts, {
      key: 'language',
      direction: 'ascending',
    });
    // English items come before French
    expect(sorted[0].language).toBe('English');
    expect(sorted[sorted.length - 1].language).toBe('French');
  });

  it('should sort by projectType ascending', () => {
    const sorted = sortTexts(texts, {
      key: 'projectType',
      direction: 'ascending',
    });
    // Project items come before Resource items
    expect(sorted[0].projectType).toBe('Project');
    expect(sorted[sorted.length - 1].projectType).toBe('Resource');
  });
});

describe('SelectTextsDialog - transfer operations', () => {
  const leftTexts = filterAvailableTexts(SAMPLE_TEXTS);

  it('should move selected items from left to right', () => {
    const selected = new Set(['res-001', 'res-002']);
    const { newLeft, newRight } = transferToRight(leftTexts, [], selected);
    expect(newLeft).toHaveLength(2);
    expect(newRight).toHaveLength(2);
    expect(newRight.map((t) => t.id)).toEqual(['res-001', 'res-002']);
  });

  it('should move single item from right to left', () => {
    const rightItems = [leftTexts[0], leftTexts[1]];
    const result = transferToLeft(leftTexts.slice(2), rightItems, 'proj-001', new Set());
    expect(result).not.toBeNull();
    expect(result!.newRight).toHaveLength(1);
    expect(result!.newLeft).toHaveLength(3);
  });

  it('should not remove required items from right list', () => {
    const rightItems = [leftTexts[0], leftTexts[1]];
    const requiredIds = new Set(['proj-001']);
    const result = transferToLeft(leftTexts.slice(2), rightItems, 'proj-001', requiredIds);
    expect(result).toBeNull();
  });

  it('should append transferred items to end of right list', () => {
    const existingRight = [leftTexts[0]];
    const selected = new Set(['res-001']);
    const { newRight } = transferToRight(leftTexts.slice(1), existingRight, selected);
    expect(newRight).toHaveLength(2);
    expect(newRight[0].id).toBe('proj-001');
    expect(newRight[1].id).toBe('res-001');
  });
});

describe('SelectTextsDialog - reorder operations', () => {
  const items: ScrTextInfo[] = [
    SAMPLE_TEXTS[0], // zzz3 (proj-001)
    SAMPLE_TEXTS[1], // NIV84 (res-001)
    SAMPLE_TEXTS[2], // CEVUK (res-002)
  ];

  it('should move item up in the list', () => {
    const result = moveUp(items, 'res-001', new Set());
    expect(result).not.toBeNull();
    expect(result!.map((t) => t.id)).toEqual(['res-001', 'proj-001', 'res-002']);
  });

  it('should move item down in the list', () => {
    const result = moveDown(items, 'res-001', new Set());
    expect(result).not.toBeNull();
    expect(result!.map((t) => t.id)).toEqual(['proj-001', 'res-002', 'res-001']);
  });

  it('should not move first item up', () => {
    const result = moveUp(items, 'proj-001', new Set());
    expect(result).toBeNull();
  });

  it('should not move last item down', () => {
    const result = moveDown(items, 'res-002', new Set());
    expect(result).toBeNull();
  });

  it('should not move past required item above', () => {
    const requiredIds = new Set(['proj-001']);
    const result = moveUp(items, 'res-001', requiredIds);
    expect(result).toBeNull();
  });

  it('should not move past required item below', () => {
    const requiredIds = new Set(['res-002']);
    const result = moveDown(items, 'res-001', requiredIds);
    expect(result).toBeNull();
  });
});

describe('SelectTextsDialog - button enable states', () => {
  const items: ScrTextInfo[] = [SAMPLE_TEXTS[0], SAMPLE_TEXTS[1], SAMPLE_TEXTS[2]];
  const requiredIds = new Set(['proj-001']);

  it('should enable add button when left selection is non-empty', () => {
    expect(isAddEnabled(new Set(['res-001']))).toBe(true);
  });

  it('should disable add button when left selection is empty', () => {
    expect(isAddEnabled(new Set())).toBe(false);
  });

  it('should enable remove button when right selection is not required', () => {
    expect(isRemoveEnabled('res-001', requiredIds)).toBe(true);
  });

  it('should disable remove button when right selection is required', () => {
    expect(isRemoveEnabled('proj-001', requiredIds)).toBe(false);
  });

  it('should disable remove button when no right selection', () => {
    expect(isRemoveEnabled(undefined, requiredIds)).toBe(false);
  });

  it('should enable move up when not first and not blocked by required', () => {
    expect(isMoveUpEnabled(items, 'res-002', new Set())).toBe(true);
  });

  it('should disable move up when first item', () => {
    expect(isMoveUpEnabled(items, 'proj-001', new Set())).toBe(false);
  });

  it('should disable move up when blocked by required item above', () => {
    expect(isMoveUpEnabled(items, 'res-001', requiredIds)).toBe(false);
  });

  it('should enable move down when not last and not blocked', () => {
    expect(isMoveDownEnabled(items, 'res-001', new Set())).toBe(true);
  });

  it('should disable move down when last item', () => {
    expect(isMoveDownEnabled(items, 'res-002', new Set())).toBe(false);
  });

  it('should disable move down when blocked by required item below', () => {
    const reqBelow = new Set(['res-002']);
    expect(isMoveDownEnabled(items, 'res-001', reqBelow)).toBe(false);
  });
});

// #endregion
