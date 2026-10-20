import { describe, expect, it } from 'vitest';
import { shouldRoutePaletteKey } from './palette-key-routing.util';

const base = {
  viewType: 'standard',
  isReadOnly: false,
  isEditorFocused: true,
};

describe('shouldRoutePaletteKey', () => {
  it('routes keys typed in a focused Standard-view editor', () => {
    // Both jobs run through this one gate: opening a palette from `\`/Enter, and driving a session
    // that is already open during the few frames before the palette takes focus.
    expect(shouldRoutePaletteKey({ ...base })).toBe(true);
  });

  it('does not route when the editor does not hold focus', () => {
    // Focus is the whole rule. Once the palette has focus its keys come back through key
    // forwarding, not through here; anything else focused in the web view — the footnote
    // popover's editor, a comment box — keeps its own keys. Claiming those would feed the
    // palette's filter, or commit a marker, while the user types somewhere else entirely.
    expect(shouldRoutePaletteKey({ ...base, isEditorFocused: false })).toBe(false);
  });

  it('never routes outside Standard view', () => {
    // Only Standard view has marker palettes. This is the gate that made the whole feature inert
    // in a formatted-view editor, which is easy to mistake for a broken palette.
    expect(shouldRoutePaletteKey({ ...base, viewType: 'formatted' })).toBe(false);
    expect(shouldRoutePaletteKey({ ...base, viewType: 'markers' })).toBe(false);
  });

  it('does not route in a read-only editor (the CAPTURE path only — see note)', () => {
    // A palette can neither open nor commit here: the editor's commit methods throw in read-only
    // mode. `isReadOnlyEffective` folds in `isSyncBlocked`, which a scheduled Send/Receive can
    // flip with no user gesture — a session already open when that happens is ended by the web
    // view's own read-only effect, so no key is needed to get out of it.
    expect(shouldRoutePaletteKey({ ...base, isReadOnly: true })).toBe(false);
  });

  it('is only HALF the read-only story, which is why the session runner checks it too', () => {
    // This predicate guards the capture path — keys typed in the editor before the palette takes
    // focus. Once it has focus the keys arrive by forwarding instead and never pass through here,
    // so a read-only flip mid-session (an automatic Send/Receive sets `isSyncBlocked` with no user
    // gesture) would otherwise reach the commit drivers, which throw in read-only mode. The web
    // view's `runPaletteSessionKey` repeats the check and ends the session; this test exists so
    // that the duplication reads as deliberate rather than as something to tidy away.
    expect(shouldRoutePaletteKey({ ...base, isReadOnly: true, isEditorFocused: true })).toBe(false);
  });
});
