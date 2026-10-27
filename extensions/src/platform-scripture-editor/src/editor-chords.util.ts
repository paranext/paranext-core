/** What an editor keyboard chord asks for, independent of which view the editor is showing. */
export type EditorChord =
  | 'showFootnotes'
  | 'basicChecks'
  | 'insertFootnote'
  | 'insertCrossReference'
  | 'toggleView';

/** A keydown that spells an editor chord. */
export type EditorChordMatch = {
  chord: EditorChord;
  /** Whether the key is held down and auto-repeating. A repeat is swallowed but does not run. */
  isRepeat: boolean;
};

/**
 * Maps a keydown to the editor chord it spells, or `undefined` for any other key.
 *
 * - F7 shows the footnotes pane.
 * - Ctrl+Shift+R opens Basic checks while they are shown (see {@link IS_BASIC_CHECKS_SHOWN}). macOS
 *   uses Control rather than Command because Command+Shift+R is the macOS menu bar's force reload.
 * - Ctrl+T inserts a footnote and Ctrl+Shift+T a cross-reference. Ctrl rather than Command on macOS,
 *   like Find's Ctrl+F.
 * - Ctrl+E toggles Standard view and Preview in Power; Control on macOS too.
 *
 * Alt is never part of a chord: AltGr reports as Ctrl+Alt on Windows/Linux and types `t` and `r`
 * characters on several European layouts. Meta never is either, since a Meta chord is the OS's or
 * the macOS menu bar's. A held key (auto-repeat) still matches but is reported as a repeat, so the
 * caller can keep the key's default action (macOS Ctrl+T transposes characters) from firing while
 * holding a chord acts once.
 *
 * A key an input method (IME) is still composing with is never a chord: Japanese IMEs convert to
 * katakana with F7, and the key reports `isComposing` (keyCode 229 in some browsers) while they
 * do.
 */
export function matchEditorChord(
  event: Pick<
    KeyboardEvent,
    'key' | 'ctrlKey' | 'metaKey' | 'altKey' | 'shiftKey' | 'repeat' | 'isComposing' | 'keyCode'
  >,
): EditorChordMatch | undefined {
  if (event.isComposing || event.keyCode === 229) return undefined;
  if (event.altKey || event.metaKey) return undefined;
  const chord = findChord(event);
  return chord ? { chord, isRepeat: event.repeat } : undefined;
}

function findChord(
  event: Pick<KeyboardEvent, 'key' | 'ctrlKey' | 'shiftKey'>,
): EditorChord | undefined {
  if (event.key === 'F7') {
    return event.ctrlKey || event.shiftKey ? undefined : 'showFootnotes';
  }

  if (!event.ctrlKey) return undefined;
  const key = event.key.toLowerCase();
  if (key === 'r') return event.shiftKey ? 'basicChecks' : undefined;
  if (key === 't') return event.shiftKey ? 'insertCrossReference' : 'insertFootnote';
  if (key === 'e') return event.shiftKey ? undefined : 'toggleView';
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
  /** Whether a comment draft popover is open, focused or not */
  isCommentEditorOpen: boolean;
};

/**
 * Whether Basic checks' Ctrl+Shift+R chord runs. Off because Basic checks' item in the editor's
 * Tools menu is hidden in both modes, and a Checks tab the user closes must not be reopenable from
 * the keyboard either. Set it back to `true` when "power" comes off that item's
 * `hiddenInterfaceModes` in `contributions/menus.json`.
 */
const IS_BASIC_CHECKS_SHOWN: boolean = false;

/**
 * Whether a matched chord should run now. Inserting needs an editable, focused main editor so a
 * keystroke in a read-only text or in the footnote or comment editor does nothing. Basic checks
 * runs only in Power, and only if its menu item exists (that is, while {@link IS_BASIC_CHECKS_SHOWN}
 * is true). Showing footnotes works in every state. Toggling the view runs only in Power, where the
 * view menu item exists, and waits while a comment draft is open, since the switch reloads the
 * document under the draft.
 */
export function shouldRunEditorChord(
  chord: EditorChord,
  { isReadOnly, isEditorFocused, isPowerMode, isCommentEditorOpen }: EditorChordContext,
): boolean {
  switch (chord) {
    case 'showFootnotes':
      return true;
    case 'basicChecks':
      return IS_BASIC_CHECKS_SHOWN && isPowerMode;
    case 'toggleView':
      return isPowerMode && !isCommentEditorOpen;
    case 'insertFootnote':
    case 'insertCrossReference':
      return !isReadOnly && isEditorFocused;
    default: {
      const unhandled: never = chord;
      throw new Error(`Unhandled editor chord: ${String(unhandled)}`);
    }
  }
}

/** The note a chord inserts, named by the editor message method that inserts it. */
export type EditorChordNoteMethod = 'insertFootnoteAtSelection' | 'insertCrossReferenceAtSelection';

/** What running a chord does, supplied by the caller so the dispatch stays free of PAPI and React. */
export type EditorChordEffects = {
  /** The editor's own web view id, which the commands take to find this editor */
  webViewId: string;
  /** Sends a PAPI command with the editor's web view id */
  sendCommand: (
    command:
      | 'platformScriptureEditor.toggleFootnotes'
      | 'platformScriptureEditor.changeView'
      | 'platformScripture.openChecksSidePanel',
    webViewId: string,
  ) => void;
  /** Inserts a footnote or cross-reference at the selection */
  insertNote: (method: EditorChordNoteMethod) => void;
};

/**
 * Runs a matched chord that {@link shouldRunEditorChord} accepted. F7, Ctrl+E and Basic checks send
 * the same commands the editor's top menu runs, so a chord and its menu item cannot drift apart.
 */
export function runEditorChord(
  chord: EditorChord,
  { webViewId, sendCommand, insertNote }: EditorChordEffects,
): void {
  switch (chord) {
    case 'showFootnotes':
      sendCommand('platformScriptureEditor.toggleFootnotes', webViewId);
      return;
    case 'basicChecks':
      sendCommand('platformScripture.openChecksSidePanel', webViewId);
      return;
    case 'toggleView':
      sendCommand('platformScriptureEditor.changeView', webViewId);
      return;
    case 'insertFootnote':
      insertNote('insertFootnoteAtSelection');
      return;
    case 'insertCrossReference':
      insertNote('insertCrossReferenceAtSelection');
      return;
    default: {
      const unhandled: never = chord;
      throw new Error(`Unhandled editor chord: ${String(unhandled)}`);
    }
  }
}
