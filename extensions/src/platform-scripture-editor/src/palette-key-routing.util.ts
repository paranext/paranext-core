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
}): boolean {
  const { viewType, isReadOnly, hasOpenSession, isEditorFocused } = options;
  if (viewType !== 'standard') return false;
  // An OPEN session outranks read-only. `isReadOnlyEffective` folds in `isSyncBlocked`, which the
  // auto-sync edit-block driver can flip with no user gesture — mid-session. Short-circuiting on it
  // stranded a live palette over a locked, blurred editor that not even Escape could close: the
  // same wedge the focus gate had, through a different door. Opening one still requires a writable,
  // focused editor.
  if (hasOpenSession) return true;
  if (isReadOnly) return false;
  // Opening a palette requires focus; the trigger paths are only reachable with no session open.
  return isEditorFocused;
}
