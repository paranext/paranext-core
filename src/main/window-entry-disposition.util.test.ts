import { describe, expect, test } from 'vitest';
import {
  keepsItsEntryOnClose,
  type WindowEntryDispositionInput,
} from '@main/window-entry-disposition.util';

/** An ordinary window the user is closing while the application stays up */
const ORDINARY_CLOSE: WindowEntryDispositionInput = {
  isAppGoingDown: false,
  isAbandoned: false,
  isClosingForModeSwitch: false,
  isPendingContent: false,
};

describe('keepsItsEntryOnClose', () => {
  test('an ordinary close takes the entry with it', () => {
    // The window is leaving the structure: the user closed it and does not expect it back
    expect(keepsItsEntryOnClose(ORDINARY_CLOSE)).toBe(false);
  });

  test('a window going down with the application keeps its entry', () => {
    // It has to be there next session holding whatever it held
    expect(keepsItsEntryOnClose({ ...ORDINARY_CLOSE, isAppGoingDown: true })).toBe(true);
  });

  test('a window closing for a mode switch keeps its entry', () => {
    // It is meant to come back when the user switches to power again
    expect(keepsItsEntryOnClose({ ...ORDINARY_CLOSE, isClosingForModeSwitch: true })).toBe(true);
  });

  test('a window still waiting for its content does not keep an entry on a mode switch', () => {
    // Its entry holds nothing, so keeping it would resurrect a blank window on every later switch
    expect(
      keepsItsEntryOnClose({
        ...ORDINARY_CLOSE,
        isClosingForModeSwitch: true,
        isPendingContent: true,
      }),
    ).toBe(false);
  });

  test('an abandoned window keeps its entry, so closing it does not cost the layout', () => {
    // The renderer crash-looped and the window was given up on. Closing it is the user's way to be
    // rid of a dead window, and it must not also be the way they lose that window's tabs — the
    // entry is what brings them back next launch. This is what makes the offer to close it safe.
    expect(keepsItsEntryOnClose({ ...ORDINARY_CLOSE, isAbandoned: true })).toBe(true);
  });

  test('an abandoned window still waiting for its content does not keep an entry either', () => {
    // Same reason as the mode-switch case: there is nothing in the entry to bring back, so keeping
    // it would resurrect a blank window instead of restoring anything
    expect(
      keepsItsEntryOnClose({ ...ORDINARY_CLOSE, isAbandoned: true, isPendingContent: true }),
    ).toBe(false);
  });

  test('a quit keeps the entry even for a window still waiting for its content', () => {
    // Deliberately unchanged: the multi-window quit flush writes every window's entry, and narrowing
    // it here would change what a quit persists rather than what an abandoned close does
    expect(
      keepsItsEntryOnClose({ ...ORDINARY_CLOSE, isAppGoingDown: true, isPendingContent: true }),
    ).toBe(true);
  });
});
