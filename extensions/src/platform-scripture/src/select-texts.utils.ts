/**
 * === NEW IN PT10 === Reason: Utility functions for Select Texts dialog data parsing and
 * validation. Maps to: UI-PKG-001
 */

// #region Types

export interface ScrTextInfo {
  name: string;
  id: string;
  fullName: string;
  language: string;
  projectType: string;
  isSecondaryText: boolean;
}

export interface SavedScrTextList {
  name: string;
  scrTextNames: string[];
  scrProjectIndex: number;
  hebGrkIndex: number;
}

export type SortKey = 'projectType' | 'name' | 'fullName' | 'language';
export type SortDirection = 'ascending' | 'descending';

// #endregion

// #region Type guards

export function isScrTextInfo(item: unknown): item is ScrTextInfo {
  if (typeof item !== 'object' || !item) return false;
  if (!('name' in item) || !('id' in item)) return false;
  const { name, id } = item;
  return typeof name === 'string' && typeof id === 'string';
}

export function isSavedScrTextList(item: unknown): item is SavedScrTextList {
  if (typeof item !== 'object' || !item) return false;
  if (!('name' in item) || !('scrTextNames' in item)) return false;
  const { name, scrTextNames } = item;
  return typeof name === 'string' && Array.isArray(scrTextNames);
}

export function parseScrTextInfoArray(data: unknown): ScrTextInfo[] {
  if (!Array.isArray(data)) return [];
  return data.filter(isScrTextInfo);
}

export function parseSavedScrTextListArray(data: unknown): SavedScrTextList[] {
  if (!Array.isArray(data)) return [];
  return data.filter(isSavedScrTextList);
}

// #endregion

// #region Helper functions

export function isRequiredItem(item: ScrTextInfo, requiredItems: ScrTextInfo[]): boolean {
  return requiredItems.some((req) => req.id === item.id);
}

export function canMoveUp(
  index: number,
  rightItems: ScrTextInfo[],
  requiredItems: ScrTextInfo[],
): boolean {
  if (index <= 0) return false;
  if (isRequiredItem(rightItems[index], requiredItems)) return false;
  if (isRequiredItem(rightItems[index - 1], requiredItems)) return false;
  return true;
}

export function canMoveDown(
  index: number,
  rightItems: ScrTextInfo[],
  requiredItems: ScrTextInfo[],
): boolean {
  if (index >= rightItems.length - 1) return false;
  if (isRequiredItem(rightItems[index], requiredItems)) return false;
  if (isRequiredItem(rightItems[index + 1], requiredItems)) return false;
  return true;
}

// #endregion
