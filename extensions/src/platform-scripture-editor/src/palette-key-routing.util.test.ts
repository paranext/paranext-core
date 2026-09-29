import { describe, expect, it } from 'vitest';
import { shouldRoutePaletteKey } from './palette-key-routing.util';

const base = {
  viewType: 'standard',
  isReadOnly: false,
  hasOpenSession: false,
  isEditorFocused: true,
  key: 'a',
  isTargetOtherElement: false,
};

describe('shouldRoutePaletteKey', () => {
  it('routes keys while a session is open even though the locked editor has lost focus', () => {
    // PT-4611 regression guard. While a palette is open the editor is made non-editable so that
    // non-basic-Latin cannot land (the only mechanism that works — `beforeinput` for
    // `insertCompositionText` is not cancelable, and `compositionstart` accepts preventDefault and
    // composes anyway). Making it non-editable blurs it, so a focus-only gate silently stopped
    // routing: filtering died, Enter did nothing, and Escape could not even close the palette,
    // leaving the editor locked. The table's own tests could not catch that — they call the table
    // directly, so they stayed green while nothing reached it.
    expect(shouldRoutePaletteKey({ ...base, hasOpenSession: true, isEditorFocused: false })).toBe(
      true,
    );
  });

  it('routes keys when the editor is focused and no session is open, so a palette can be opened', () => {
    expect(shouldRoutePaletteKey({ ...base })).toBe(true);
  });

  it('does not route when neither a session is open nor the editor is focused', () => {
    expect(shouldRoutePaletteKey({ ...base, isEditorFocused: false })).toBe(false);
  });

  it('never routes outside Standard view, even with a session somehow open', () => {
    expect(shouldRoutePaletteKey({ ...base, viewType: 'formatted', hasOpenSession: true })).toBe(
      false,
    );
  });

  it('routes only Escape for an OPEN session once the editor turns read-only mid-session', () => {
    // `isReadOnlyEffective` folds in `isSyncBlocked`, which a scheduled Send/Receive can flip with
    // no user gesture. Escape must still close the palette; every other key could reach an editor
    // commit method, and those throw in read-only mode.
    const readOnlySession = { ...base, isReadOnly: true, hasOpenSession: true };
    expect(shouldRoutePaletteKey({ ...readOnlySession, key: 'Escape' })).toBe(true);
    [' ', '*', '\\', 'Enter', 'Tab', 'a'].forEach((key) =>
      expect(shouldRoutePaletteKey({ ...readOnlySession, key })).toBe(false),
    );
  });

  it('does not route an OPEN session key typed into another element in the web view', () => {
    // A comment box, say: its keys must reach it, not filter the palette or commit a marker.
    const otherElement = { ...base, hasOpenSession: true, isTargetOtherElement: true };
    ['a', 'Enter', 'Tab', 'Escape'].forEach((key) =>
      expect(shouldRoutePaletteKey({ ...otherElement, key })).toBe(false),
    );
  });

  it('does not route in a read-only editor when no session is open, so none can be opened', () => {
    expect(shouldRoutePaletteKey({ ...base, isReadOnly: true })).toBe(false);
  });
});
