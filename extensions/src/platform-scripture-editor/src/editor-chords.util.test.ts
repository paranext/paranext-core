import { matchEditorChord, shouldRunEditorChord } from './editor-chords.util';

type ChordEvent = Parameters<typeof matchEditorChord>[0];

function keyEvent(key: string, modifiers: Partial<Omit<ChordEvent, 'key'>> = {}): ChordEvent {
  return { key, ctrlKey: false, metaKey: false, altKey: false, shiftKey: false, ...modifiers };
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
