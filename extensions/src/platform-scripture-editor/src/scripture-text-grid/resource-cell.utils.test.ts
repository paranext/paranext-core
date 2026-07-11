import { describe, it, expect } from 'vitest';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { buildCellAccessibleName, deriveCellState } from './resource-cell.utils';

const platformError = { platformErrorVersion: 1, message: 'boom' };

describe('buildCellAccessibleName', () => {
  const scrRef: SerializedVerseRef = {
    book: 'MAT',
    chapterNum: 5,
    verseNum: 3,
    versificationStr: 'English',
  };

  it('combines the resource label and the formatted reference', () => {
    expect(buildCellAccessibleName('ESV', scrRef)).toBe('ESV, MAT 5:3');
  });

  it('still returns the reference when the label is empty', () => {
    expect(buildCellAccessibleName('', scrRef)).toBe(', MAT 5:3');
  });
});

describe('deriveCellState', () => {
  it('is failed for a PlatformError', () => {
    expect(deriveCellState({ usjPossiblyError: platformError, isLoading: false })).toBe('failed');
  });
  it('is downloading while loading with no value', () => {
    expect(deriveCellState({ usjPossiblyError: undefined, isLoading: true })).toBe('downloading');
  });
  it('is downloading when settled but value still undefined', () => {
    expect(deriveCellState({ usjPossiblyError: undefined, isLoading: false })).toBe('downloading');
  });
  it('is downloading when loading even if a valid value is already present (refetch race)', () => {
    expect(
      deriveCellState({
        usjPossiblyError: { type: 'USJ', version: '3.1', content: [] },
        isLoading: true,
      }),
    ).toBe('downloading');
  });
  it('is ready for a non-error USJ value', () => {
    expect(
      deriveCellState({
        usjPossiblyError: { type: 'USJ', version: '3.1', content: [] },
        isLoading: false,
      }),
    ).toBe('ready');
  });
});
