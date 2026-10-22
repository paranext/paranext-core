import {
  matchEditorChord,
  runEditorChord,
  shouldRunEditorChord,
  type EditorChord,
  type EditorChordEffects,
} from './editor-chords.util';

type ChordEvent = Parameters<typeof matchEditorChord>[0];

function keyEvent(key: string, modifiers: Partial<Omit<ChordEvent, 'key'>> = {}): ChordEvent {
  return {
    key,
    ctrlKey: false,
    metaKey: false,
    altKey: false,
    shiftKey: false,
    repeat: false,
    isComposing: false,
    keyCode: 0,
    ...modifiers,
  };
}

/** The chord a keydown spells, ignoring whether it is a repeat. */
function chordOf(event: ChordEvent): EditorChord | undefined {
  return matchEditorChord(event)?.chord;
}

describe('matchEditorChord', () => {
  it('maps F7 with no modifiers to showFootnotes', () => {
    expect(chordOf(keyEvent('F7'))).toBe('showFootnotes');
  });

  it('does not map F7 with a modifier', () => {
    expect(chordOf(keyEvent('F7', { ctrlKey: true }))).toBeUndefined();
    expect(chordOf(keyEvent('F7', { shiftKey: true }))).toBeUndefined();
  });

  it('maps Control+Shift+R to basicChecks, which is also the macOS chord', () => {
    expect(chordOf(keyEvent('R', { ctrlKey: true, shiftKey: true }))).toBe('basicChecks');
    expect(chordOf(keyEvent('r', { ctrlKey: true, shiftKey: true }))).toBe('basicChecks');
  });

  it('leaves Command+Shift+R to the macOS menu bar (force reload)', () => {
    expect(chordOf(keyEvent('R', { metaKey: true, shiftKey: true }))).toBeUndefined();
  });

  it('does not map Ctrl+R or Ctrl+Alt+Shift+R to basicChecks', () => {
    expect(chordOf(keyEvent('r', { ctrlKey: true }))).toBeUndefined();
    expect(chordOf(keyEvent('R', { ctrlKey: true, shiftKey: true, altKey: true }))).toBeUndefined();
  });

  it('maps Ctrl+T to insertFootnote', () => {
    expect(chordOf(keyEvent('t', { ctrlKey: true }))).toBe('insertFootnote');
  });

  it('maps Ctrl+Shift+T to insertCrossReference', () => {
    expect(chordOf(keyEvent('T', { ctrlKey: true, shiftKey: true }))).toBe('insertCrossReference');
  });

  it('does not map Ctrl+Alt+T, which AltGr types on some European layouts', () => {
    expect(chordOf(keyEvent('t', { ctrlKey: true, altKey: true }))).toBeUndefined();
  });

  it('does not map Meta+T', () => {
    expect(chordOf(keyEvent('t', { metaKey: true }))).toBeUndefined();
    expect(chordOf(keyEvent('t', { ctrlKey: true, metaKey: true }))).toBeUndefined();
  });

  it.each([
    keyEvent('F7', { repeat: true }),
    keyEvent('R', { ctrlKey: true, shiftKey: true, repeat: true }),
    keyEvent('t', { ctrlKey: true, repeat: true }),
    keyEvent('T', { ctrlKey: true, shiftKey: true, repeat: true }),
  ])('reports auto-repeat of a held $key chord as a repeat', (event) => {
    expect(matchEditorChord(event)).toEqual({
      chord: chordOf({ ...event, repeat: false }),
      isRepeat: true,
    });
  });

  it('reports a first press as not a repeat', () => {
    expect(matchEditorChord(keyEvent('t', { ctrlKey: true }))).toEqual({
      chord: 'insertFootnote',
      isRepeat: false,
    });
  });

  it('leaves a repeat of an unclaimed key unmatched', () => {
    expect(matchEditorChord(keyEvent('t', { repeat: true }))).toBeUndefined();
    expect(matchEditorChord(keyEvent('r', { ctrlKey: true, repeat: true }))).toBeUndefined();
    expect(
      matchEditorChord(keyEvent('t', { ctrlKey: true, altKey: true, repeat: true })),
    ).toBeUndefined();
    expect(matchEditorChord(keyEvent('t', { metaKey: true, repeat: true }))).toBeUndefined();
  });

  it('does not map a plain t', () => {
    expect(chordOf(keyEvent('t'))).toBeUndefined();
  });

  // An input method (IME) that is still composing owns the key: Japanese IMEs convert to katakana
  // with F7, so claiming it would toggle the footnotes pane and lose the conversion.
  it.each([
    ['F7 while composing', keyEvent('F7', { isComposing: true })],
    ['F7 reported as the IME key (229)', keyEvent('F7', { keyCode: 229 })],
    ['Ctrl+T while composing', keyEvent('t', { ctrlKey: true, isComposing: true })],
  ])('leaves %s to the input method', (_, event) => {
    expect(matchEditorChord(event)).toBeUndefined();
  });
});

describe('shouldRunEditorChord', () => {
  const live = { isReadOnly: false, isEditorFocused: true, isPowerMode: true };

  it.each(['insertFootnote', 'insertCrossReference'] as const)(
    '%s runs in an editable, focused editor in any view',
    (chord) => {
      expect(shouldRunEditorChord(chord, live)).toBe(true);
      expect(shouldRunEditorChord(chord, { ...live, isPowerMode: false })).toBe(true);
    },
  );

  it.each(['insertFootnote', 'insertCrossReference'] as const)(
    '%s does nothing when the text is read-only',
    (chord) => {
      expect(shouldRunEditorChord(chord, { ...live, isReadOnly: true })).toBe(false);
    },
  );

  it.each(['insertFootnote', 'insertCrossReference'] as const)(
    '%s does nothing when the editor is not focused',
    (chord) => {
      expect(shouldRunEditorChord(chord, { ...live, isEditorFocused: false })).toBe(false);
    },
  );

  it('showFootnotes runs in both modes, even read-only or unfocused', () => {
    expect(
      shouldRunEditorChord('showFootnotes', {
        isReadOnly: true,
        isEditorFocused: false,
        isPowerMode: false,
      }),
    ).toBe(true);
  });

  it('basicChecks runs in neither mode, since its menu item is hidden in both', () => {
    expect(shouldRunEditorChord('basicChecks', live)).toBe(false);
    expect(shouldRunEditorChord('basicChecks', { ...live, isPowerMode: false })).toBe(false);
  });
});

describe('Ctrl+E (toggleView)', () => {
  it('maps Ctrl+E to toggleView, which is also the macOS chord', () => {
    expect(matchEditorChord(keyEvent('e', { ctrlKey: true }))).toEqual({
      chord: 'toggleView',
      isRepeat: false,
    });
    expect(matchEditorChord(keyEvent('E', { ctrlKey: true }))?.chord).toBe('toggleView');
  });

  it.each([
    ['Ctrl+Shift+E', keyEvent('E', { ctrlKey: true, shiftKey: true })],
    ['Ctrl+Alt+E (AltGr types a euro sign)', keyEvent('e', { ctrlKey: true, altKey: true })],
    ['Meta+E', keyEvent('e', { metaKey: true })],
    ['a plain e', keyEvent('e', {})],
    ['Ctrl+E while composing', keyEvent('e', { ctrlKey: true, isComposing: true })],
    ['keyCode 229', keyEvent('e', { ctrlKey: true, keyCode: 229 })],
  ])('does not map %s', (_name, event) => {
    expect(matchEditorChord(event)).toBeUndefined();
  });

  it('runs only in Power, read-only or not, focused or not', () => {
    [true, false].forEach((isReadOnly) =>
      [true, false].forEach((isEditorFocused) => {
        expect(
          shouldRunEditorChord('toggleView', { isReadOnly, isEditorFocused, isPowerMode: true }),
        ).toBe(true);
        expect(
          shouldRunEditorChord('toggleView', { isReadOnly, isEditorFocused, isPowerMode: false }),
        ).toBe(false);
      }),
    );
  });

  it('sends the view toggle for this editor', () => {
    const effects = makeEffects();
    runEditorChord('toggleView', effects);
    expect(effects.sendCommand).toHaveBeenCalledExactlyOnceWith(
      'platformScriptureEditor.changeView',
      'editor-web-view-1',
    );
    expect(effects.insertNote).not.toHaveBeenCalled();
  });

  it('acts once when held', () => {
    const effects = makeEffects();
    const ctrlE = keyEvent('e', { ctrlKey: true });
    const state = { isReadOnly: false, isPowerMode: true };
    const first = pressKey(ctrlE, state, effects);
    const held = pressKey({ ...ctrlE, repeat: true }, state, effects);
    expect(first.preventedDefault).toBe(true);
    expect(held.preventedDefault).toBe(true);
    expect(effects.sendCommand).toHaveBeenCalledTimes(1);
  });

  it('is left alone in Simple', () => {
    const effects = makeEffects();
    const result = pressKey(
      keyEvent('e', { ctrlKey: true }),
      { isReadOnly: false, isPowerMode: false },
      effects,
    );
    expect(result.preventedDefault).toBe(false);
    expect(effects.sendCommand).not.toHaveBeenCalled();
  });
});

describe('runEditorChord', () => {
  it('F7 toggles the footnotes pane of this editor', () => {
    const effects = makeEffects();
    runEditorChord('showFootnotes', effects);
    expect(effects.sendCommand).toHaveBeenCalledExactlyOnceWith(
      'platformScriptureEditor.toggleFootnotes',
      'editor-web-view-1',
    );
    expect(effects.insertNote).not.toHaveBeenCalled();
  });

  it('Ctrl+Shift+R opens Basic checks for this editor', () => {
    const effects = makeEffects();
    runEditorChord('basicChecks', effects);
    expect(effects.sendCommand).toHaveBeenCalledExactlyOnceWith(
      'platformScripture.openChecksSidePanel',
      'editor-web-view-1',
    );
    expect(effects.insertNote).not.toHaveBeenCalled();
  });

  it('Ctrl+T inserts a footnote and Ctrl+Shift+T a cross-reference', () => {
    const footnote = makeEffects();
    runEditorChord('insertFootnote', footnote);
    expect(footnote.insertNote).toHaveBeenCalledExactlyOnceWith('insertFootnoteAtSelection');
    expect(footnote.sendCommand).not.toHaveBeenCalled();

    const crossReference = makeEffects();
    runEditorChord('insertCrossReference', crossReference);
    expect(crossReference.insertNote).toHaveBeenCalledExactlyOnceWith(
      'insertCrossReferenceAtSelection',
    );
    expect(crossReference.sendCommand).not.toHaveBeenCalled();
  });
});

/** The web view's keydown path: match, guard, swallow, run. Returns whether the key is swallowed. */
function pressKey(
  event: ChordEvent,
  state: { isReadOnly: boolean; isPowerMode: boolean; isEditorFocused?: boolean },
  effects: EditorChordEffects,
): { preventedDefault: boolean } {
  const match = matchEditorChord(event);
  if (!match) return { preventedDefault: false };
  if (!shouldRunEditorChord(match.chord, { isEditorFocused: true, ...state })) {
    return { preventedDefault: false };
  }
  if (!match.isRepeat) runEditorChord(match.chord, effects);
  return { preventedDefault: true };
}

describe('Ctrl+T through match, guard and run', () => {
  const ctrlT = keyEvent('t', { ctrlKey: true });

  // The view type does not reach the chord path, so these name the states each mode produces: Simple
  // is editable, and Power is editable only when its read-only gate is off.
  it('inserts a footnote in the formatted view', () => {
    const effects = makeEffects();
    pressKey(ctrlT, { isReadOnly: false, isPowerMode: false }, effects);
    expect(effects.insertNote).toHaveBeenCalledExactlyOnceWith('insertFootnoteAtSelection');
  });

  it('inserts a footnote in Power when the text is editable', () => {
    const effects = makeEffects();
    pressKey(ctrlT, { isReadOnly: false, isPowerMode: true }, effects);
    expect(effects.insertNote).toHaveBeenCalledExactlyOnceWith('insertFootnoteAtSelection');
  });

  it('does nothing when the text is read-only', () => {
    const effects = makeEffects();
    pressKey(ctrlT, { isReadOnly: true, isPowerMode: true }, effects);
    expect(effects.insertNote).not.toHaveBeenCalled();
    expect(effects.sendCommand).not.toHaveBeenCalled();
  });

  it('swallows a held key without running it again', () => {
    const effects = makeEffects();
    const first = pressKey(ctrlT, { isReadOnly: false, isPowerMode: true }, effects);
    const held = pressKey(
      { ...ctrlT, repeat: true },
      { isReadOnly: false, isPowerMode: true },
      effects,
    );
    expect(first.preventedDefault).toBe(true);
    expect(held.preventedDefault).toBe(true);
    expect(effects.insertNote).toHaveBeenCalledTimes(1);
  });

  it('leaves a held unclaimed key alone', () => {
    const effects = makeEffects();
    const held = pressKey(
      keyEvent('t', { repeat: true }),
      { isReadOnly: false, isPowerMode: true },
      effects,
    );
    expect(held.preventedDefault).toBe(false);
    expect(effects.insertNote).not.toHaveBeenCalled();
  });
});

function makeEffects(): EditorChordEffects {
  return { webViewId: 'editor-web-view-1', sendCommand: vi.fn(), insertNote: vi.fn() };
}
