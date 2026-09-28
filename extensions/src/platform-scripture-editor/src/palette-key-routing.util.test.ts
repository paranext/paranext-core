import { describe, expect, it } from 'vitest';
import { shouldRoutePaletteKey } from './palette-key-routing.util';

const base = {
  viewType: 'standard',
  isReadOnly: false,
  hasOpenSession: false,
  isEditorFocused: true,
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

  it('still routes an OPEN session when the editor turns read-only mid-session, so Escape works', () => {
    // `isReadOnlyEffective` folds in `isSyncBlocked`, which a scheduled Send/Receive can flip with
    // no user gesture. Short-circuiting on it stranded a live palette over an editor that was
    // locked and blurred by the palette itself, with no key — not even Escape — able to close it.
    expect(shouldRoutePaletteKey({ ...base, isReadOnly: true, hasOpenSession: true })).toBe(true);
  });

  it('does not route in a read-only editor when no session is open, so none can be opened', () => {
    expect(shouldRoutePaletteKey({ ...base, isReadOnly: true })).toBe(false);
  });
});
