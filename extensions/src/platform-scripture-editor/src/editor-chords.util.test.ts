import {
  matchEditorChord,
  runEditorChord,
  shouldRunEditorChord,
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
    ...modifiers,
  };
}

describe('matchEditorChord', () => {
  it('maps F7 with no modifiers to showFootnotes', () => {
    expect(matchEditorChord(keyEvent('F7'))).toBe('showFootnotes');
  });

  it('does not map F7 with a modifier', () => {
    expect(matchEditorChord(keyEvent('F7', { ctrlKey: true }))).toBeUndefined();
    expect(matchEditorChord(keyEvent('F7', { shiftKey: true }))).toBeUndefined();
  });

  it('maps Control+Shift+R to basicChecks, which is also the macOS chord', () => {
    expect(matchEditorChord(keyEvent('R', { ctrlKey: true, shiftKey: true }))).toBe('basicChecks');
    expect(matchEditorChord(keyEvent('r', { ctrlKey: true, shiftKey: true }))).toBe('basicChecks');
  });

  it('leaves Command+Shift+R to the macOS menu bar (force reload)', () => {
    expect(matchEditorChord(keyEvent('R', { metaKey: true, shiftKey: true }))).toBeUndefined();
  });

  it('does not map Ctrl+R or Ctrl+Alt+Shift+R to basicChecks', () => {
    expect(matchEditorChord(keyEvent('r', { ctrlKey: true }))).toBeUndefined();
    expect(
      matchEditorChord(keyEvent('R', { ctrlKey: true, shiftKey: true, altKey: true })),
    ).toBeUndefined();
  });

  it('maps Ctrl+T to insertFootnote', () => {
    expect(matchEditorChord(keyEvent('t', { ctrlKey: true }))).toBe('insertFootnote');
  });

  it('maps Ctrl+Shift+T to insertCrossReference', () => {
    expect(matchEditorChord(keyEvent('T', { ctrlKey: true, shiftKey: true }))).toBe(
      'insertCrossReference',
    );
  });

  it('does not map Ctrl+Alt+T, which AltGr types on some European layouts', () => {
    expect(matchEditorChord(keyEvent('t', { ctrlKey: true, altKey: true }))).toBeUndefined();
  });

  it('does not map Meta+T', () => {
    expect(matchEditorChord(keyEvent('t', { metaKey: true }))).toBeUndefined();
    expect(matchEditorChord(keyEvent('t', { ctrlKey: true, metaKey: true }))).toBeUndefined();
  });

  it.each([
    keyEvent('F7', { repeat: true }),
    keyEvent('R', { ctrlKey: true, shiftKey: true, repeat: true }),
    keyEvent('t', { ctrlKey: true, repeat: true }),
    keyEvent('T', { ctrlKey: true, shiftKey: true, repeat: true }),
  ])('ignores auto-repeat of a held $key chord', (event) => {
    expect(matchEditorChord(event)).toBeUndefined();
  });

  it('does not map a plain t', () => {
    expect(matchEditorChord(keyEvent('t'))).toBeUndefined();
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

  it('basicChecks runs in Power only, since Simple has no such menu item', () => {
    expect(shouldRunEditorChord('basicChecks', live)).toBe(true);
    expect(shouldRunEditorChord('basicChecks', { ...live, isPowerMode: false })).toBe(false);
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

/** The web view's keydown path: match, guard, run. */
function pressKey(
  event: ChordEvent,
  state: { isReadOnly: boolean; isPowerMode: boolean; isEditorFocused?: boolean },
  effects: EditorChordEffects,
): void {
  const chord = matchEditorChord(event);
  if (!chord) return;
  if (!shouldRunEditorChord(chord, { isEditorFocused: true, ...state })) return;
  runEditorChord(chord, effects);
}

describe('Ctrl+T through match, guard and run', () => {
  const ctrlT = keyEvent('t', { ctrlKey: true });

  // The view type does not reach the chord path, so these name the states each view produces: the
  // formatted view is editable, and the markers view is editable only when its read-only gate is off.
  it('inserts a footnote in the formatted view', () => {
    const effects = makeEffects();
    pressKey(ctrlT, { isReadOnly: false, isPowerMode: false }, effects);
    expect(effects.insertNote).toHaveBeenCalledExactlyOnceWith('insertFootnoteAtSelection');
  });

  it('inserts a footnote in the markers view when it is editable', () => {
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

  it('does nothing for a held key', () => {
    const effects = makeEffects();
    pressKey({ ...ctrlT, repeat: true }, { isReadOnly: false, isPowerMode: true }, effects);
    expect(effects.insertNote).not.toHaveBeenCalled();
  });
});

function makeEffects(): EditorChordEffects {
  return { webViewId: 'editor-web-view-1', sendCommand: vi.fn(), insertNote: vi.fn() };
}
