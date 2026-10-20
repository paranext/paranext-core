/** What an editor keyboard chord asks for, independent of which view the editor is showing. */
export type EditorChord =
  | 'showFootnotes'
  | 'basicChecks'
  | 'insertFootnote'
  | 'insertCrossReference';

/**
 * Maps a keydown to the editor chord it spells, or `undefined` for any other key.
 *
 * - F7 shows the footnotes pane.
 * - Ctrl+Shift+R opens Basic checks. macOS uses Control rather than Command because Command+Shift+R
 *   is the macOS menu bar's force reload.
 * - Ctrl+T inserts a footnote and Ctrl+Shift+T a cross-reference. Ctrl rather than Command on macOS,
 *   like Find's Ctrl+F.
 *
 * Alt is never part of a chord: AltGr reports as Ctrl+Alt on Windows/Linux and types `t` and `r`
 * characters on several European layouts. Meta never is either, since a Meta chord is the OS's or
 * the macOS menu bar's.
 */
export function matchEditorChord(
  event: Pick<KeyboardEvent, 'key' | 'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey'>,
): EditorChord | undefined {
  if (event.altKey || event.metaKey) return undefined;

  if (event.key === 'F7') {
    return event.ctrlKey || event.shiftKey ? undefined : 'showFootnotes';
  }

  if (!event.ctrlKey) return undefined;
  const key = event.key.toLowerCase();
  if (key === 'r') return event.shiftKey ? 'basicChecks' : undefined;
  if (key === 't') return event.shiftKey ? 'insertCrossReference' : 'insertFootnote';
  return undefined;
}

/** The editor state a chord's guard reads. */
export type EditorChordContext = {
  /** Whether the text is read-only for any reason */
  isReadOnly: boolean;
  /** Whether the main editor (not a popover or pane editor) has focus */
  isEditorFocused: boolean;
  /** Whether the interface is in Power mode */
  isPowerMode: boolean;
};

/**
 * Whether a matched chord should run now. Inserting needs an editable, focused main editor so a
 * keystroke in a read-only text or in the footnote or comment editor does nothing. Basic checks
 * runs only in Power, where its menu item exists. Showing footnotes works in every state.
 */
export function shouldRunEditorChord(
  chord: EditorChord,
  { isReadOnly, isEditorFocused, isPowerMode }: EditorChordContext,
): boolean {
  switch (chord) {
    case 'showFootnotes':
      return true;
    case 'basicChecks':
      return isPowerMode;
    case 'insertFootnote':
    case 'insertCrossReference':
      return !isReadOnly && isEditorFocused;
    default: {
      const unhandled: never = chord;
      throw new Error(`Unhandled editor chord: ${String(unhandled)}`);
    }
  }
}
