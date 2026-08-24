import { describe, it, expect } from 'vitest';
import { deriveCellState } from './resource-cell.utils';

const platformError = { platformErrorVersion: 1, message: 'boom' };

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
  it('is bookNotAvailable when the failure is a book the resource does not contain', () => {
    // "Download failed" tells the user to retry a download that already succeeded. The book is
    // simply not in this text, which is not a fault and has a different remedy.
    expect(
      deriveCellState({
        usjPossiblyError: {
          platformErrorVersion: 1,
          message: 'Book number 3 not found in project abc123.',
        },
        isLoading: false,
      }),
    ).toBe('bookNotAvailable');
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
