import { describe, it, expect } from 'vitest';
import { deriveCellState } from './resource-cell.utils';

const platformError = { platformErrorVersion: 1, message: 'boom' };
const bookNotFoundError = {
  platformErrorVersion: 1,
  message: 'Error in ChapterUSJ: Book number 1 not found in project abc123',
};

describe('deriveCellState', () => {
  it('is failed for a PlatformError', () => {
    expect(deriveCellState({ usjPossiblyError: platformError, isLoading: false })).toBe('failed');
  });
  it('is bookNotFound when the resource simply lacks the requested book', () => {
    expect(deriveCellState({ usjPossiblyError: bookNotFoundError, isLoading: false })).toBe(
      'bookNotFound',
    );
  });
  it('keeps an unrelated PlatformError as failed (book-not-found is checked first)', () => {
    expect(
      deriveCellState({
        usjPossiblyError: { platformErrorVersion: 1, message: 'Network request failed' },
        isLoading: false,
      }),
    ).toBe('failed');
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
