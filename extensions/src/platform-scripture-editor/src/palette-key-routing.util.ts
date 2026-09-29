/**
 * Decides whether a Standard-view keydown should be routed into the marker-palette session's key
 * table (`handleMarkerPaletteSessionKeyDown`) rather than left to the editor.
 *
 * Extracted from the web view's capture-phase listener so the rule is testable. It is small, but it
 * is the seam the whole palette depends on: if a key never reaches the table, every per-key
 * semantic the table implements — filtering, Enter/Tab commit, Escape, and the PT-4611 rule that
 * only selecting a marker may change the scripture text — silently stops applying, while the
 * table's own unit tests stay green because they call it directly.
 */
export function shouldRoutePaletteKey(options: {
  /** The editor's current view; only Standard view has marker palettes. */
  viewType: string;
  /** Whether the project or view is effectively read-only. */
  isReadOnly: boolean;
  /** Whether a marker-palette session is currently open. */
  hasOpenSession: boolean;
  /** Whether the MAIN editor instance holds DOM focus. */
  isEditorFocused: boolean;
  /** The pressed key (`KeyboardEvent.key`). */
  key: string;
  /**
   * Whether the key was typed into some OTHER focusable element in the web view — neither the main
   * editor nor the page itself (where keys land while the palette's input lock has blurred the
   * editor). A comment box or the footnote popover, for example.
   */
  isTargetOtherElement: boolean;
}): boolean {
  const { viewType, isReadOnly, hasOpenSession, isEditorFocused, key, isTargetOtherElement } =
    options;
  if (viewType !== 'standard') return false;
  if (hasOpenSession) {
    // The session drives the palette only from the editor it was opened in. Keys typed into another
    // input belong to that input, and claiming them would feed the palette's filter or commit a
    // marker while the user types somewhere else.
    if (isTargetOtherElement) return false;
    // An open session outranks read-only for Escape alone. `isReadOnlyEffective` folds in
    // `isSyncBlocked`, which the auto-sync edit-block driver can flip with no user gesture —
    // mid-session — and the web view ends the session when it does. Until it has, every key that
    // could commit is refused: the editor's commit methods throw in read-only mode.
    if (isReadOnly) return key === 'Escape';
    return true;
  }
  if (isReadOnly) return false;
  // Opening a palette requires focus; the trigger paths are only reachable with no session open.
  return isEditorFocused;
}
