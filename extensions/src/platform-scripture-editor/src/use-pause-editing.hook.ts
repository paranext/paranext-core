import { useEffect } from 'react';

/** The editing events held off while editing is paused, besides the keys themselves. */
const PAUSED_EDIT_EVENTS = ['beforeinput', 'paste', 'cut', 'drop'] as const;

/** Keys that move the caret, with or without a modifier. */
const CARET_KEYS = new Set([
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
  'PageUp',
  'PageDown',
]);

/**
 * Whether a key press is held off while editing is paused: one that edits the document (a key that
 * types a character, Enter, Backspace, Delete, Tab, and the undo, redo and word-delete chords) or
 * moves the caret (the arrow and page keys, Home, End, and select-all). The caret counts because
 * the editor still shows the chapter being left: moving it there reports that chapter's verse as
 * the current reference, which pulls the reference back to the chapter the user just left. Every
 * other chord is let through so the application's shortcuts keep working, and paste and cut are
 * held off as the events they raise rather than by their keys.
 */
function isHeldOffKey(event: KeyboardEvent): boolean {
  if (event.isComposing || CARET_KEYS.has(event.key)) return true;
  if (event.ctrlKey || event.metaKey) {
    const key = event.key.toLowerCase();
    return key === 'z' || key === 'y' || key === 'a' || key === 'backspace' || key === 'delete';
  }
  if (event.altKey) return false;
  return (
    event.key.length === 1 ||
    event.key === 'Enter' ||
    event.key === 'Backspace' ||
    event.key === 'Delete' ||
    event.key === 'Tab'
  );
}

/**
 * Holds off every edit to the editor while `isPaused`, without making it read-only.
 *
 * After the user moves to another chapter the editor goes on showing the one being left, still
 * editable, until the new chapter's content arrives; anything typed there in the meantime cannot be
 * saved to either chapter, and is replaced a moment later when the new one loads. Making the editor
 * read-only instead would take the DOM focus from it (a non-editable element cannot hold it), so
 * the user moving between chapters from the keyboard would have to click back in. So the editor
 * stays editable and focused, and the edits themselves are stopped: caught on the way down to the
 * editor root, above the listeners the editor registers there, and cancelled so the browser does
 * not make them either. Copying and the application's shortcuts go on working.
 *
 * @param getEditorRoot Returns the editor's root element, or `undefined` while there is none.
 * @param isPaused Whether edits are held off now.
 */
export function usePauseEditing(
  getEditorRoot: () => HTMLElement | undefined,
  isPaused: boolean,
): void {
  useEffect(() => {
    if (!isPaused) return undefined;
    const root = getEditorRoot();
    // Listened for on the root's parent, in the capture phase, so they run before any listener on
    // the root itself whatever the order listeners at an event's own target run in.
    const container = root?.parentElement;
    if (!root || !container) return undefined;

    const holdOff = (event: Event) => {
      if (!(event.target instanceof Node) || !root.contains(event.target)) return;
      event.preventDefault();
      event.stopPropagation();
    };
    const holdOffEditingKey = (event: KeyboardEvent) => {
      if (isHeldOffKey(event)) holdOff(event);
    };

    container.addEventListener('keydown', holdOffEditingKey, true);
    PAUSED_EDIT_EVENTS.forEach((type) => container.addEventListener(type, holdOff, true));
    return () => {
      container.removeEventListener('keydown', holdOffEditingKey, true);
      PAUSED_EDIT_EVENTS.forEach((type) => container.removeEventListener(type, holdOff, true));
    };
  }, [getEditorRoot, isPaused]);
}
