import { describe, it, expect } from 'vitest';
import { deriveCellState } from './resource-cell.utils';

const platformError = { platformErrorVersion: 1, message: 'boom' };

/** A cell showing LEV (book 3) in resource `abc123`, which is what the identity comparison sees. */
const onScreen = { currentBookNum: 3, projectId: 'abc123' };

const missingBookError = (bookNum: number, projectId: string) => ({
  platformErrorVersion: 1,
  message: `Book number ${bookNum} not found in project ${projectId}.`,
});

describe('deriveCellState', () => {
  it('is failed for a PlatformError', () => {
    expect(
      deriveCellState({ usjPossiblyError: platformError, isLoading: false, ...onScreen }),
    ).toBe('failed');
  });
  it('is downloading while loading with no value', () => {
    expect(deriveCellState({ usjPossiblyError: undefined, isLoading: true, ...onScreen })).toBe(
      'downloading',
    );
  });
  it('is downloading when settled but value still undefined', () => {
    expect(deriveCellState({ usjPossiblyError: undefined, isLoading: false, ...onScreen })).toBe(
      'downloading',
    );
  });
  it('is downloading when loading even if a valid value is already present (refetch race)', () => {
    expect(
      deriveCellState({
        usjPossiblyError: { type: 'USJ', version: '3.1', content: [] },
        isLoading: true,
        ...onScreen,
      }),
    ).toBe('downloading');
  });
  it('is bookNotAvailable when the failure is a book the resource does not contain', () => {
    // "Download failed" tells the user to retry a download that already succeeded. The book is
    // simply not in this text, which is not a fault and has a different remedy.
    expect(
      deriveCellState({
        usjPossiblyError: missingBookError(3, 'abc123'),
        isLoading: false,
        ...onScreen,
      }),
    ).toBe('bookNotAvailable');
  });

  it('compares the resource id case-insensitively', () => {
    // C# canonicalizes project ids to uppercase in the exception; the cell's own id arrives verbatim
    // off the resource reference, and the PDP lookup folds case — so the mismatch shows up only here.
    expect(
      deriveCellState({
        usjPossiblyError: missingBookError(3, 'ABC123'),
        isLoading: false,
        ...onScreen,
      }),
    ).toBe('bookNotAvailable');
  });

  it('does not claim bookNotAvailable for a failure about the book the user just left', () => {
    // Navigating out of a missing book: the hook still serves the previous selector's error while
    // the new subscription's first update is in flight. Claiming "not in this text" here would be a
    // claim about a book the resource does have, for the whole round trip.
    expect(
      deriveCellState({
        usjPossiblyError: missingBookError(40, 'abc123'),
        isLoading: false,
        ...onScreen,
      }),
    ).toBe('downloading');
  });

  it('does not claim bookNotAvailable for a failure about a resource the cell is not showing', () => {
    expect(
      deriveCellState({
        usjPossiblyError: missingBookError(3, 'someOtherResource'),
        isLoading: false,
        ...onScreen,
      }),
    ).toBe('downloading');
  });

  it('makes no claim about a book when the cell has no book it can name', () => {
    expect(
      deriveCellState({
        usjPossiblyError: missingBookError(3, 'abc123'),
        isLoading: false,
        currentBookNum: 0,
        projectId: 'abc123',
      }),
    ).toBe('downloading');
  });

  it('is ready for a non-error USJ value', () => {
    expect(
      deriveCellState({
        usjPossiblyError: { type: 'USJ', version: '3.1', content: [] },
        isLoading: false,
        ...onScreen,
      }),
    ).toBe('ready');
  });
});
