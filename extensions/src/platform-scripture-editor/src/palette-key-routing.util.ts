/**
 * Decides whether a Standard-view keydown should be routed into the marker-palette session's key
 * table (`handleMarkerPaletteSessionKeyDown`) rather than left to the editor.
 *
 * Extracted from the web view's capture-phase listener so the rule is testable. It is small, but it
 * is the seam the whole palette depends on: if a key never reaches the table, every per-key
 * semantic the table implements — filtering, Enter/Tab commit, Escape, and the rule that only
 * selecting a marker may change the scripture text — silently stops applying, while the table's own
 * unit tests stay green because they call it directly.
 *
 * This covers ONE of the two ways a key reaches the table. Once the palette has focus it forwards
 * every key back itself, and those never pass through here. This path is the window before that:
 * the session is created synchronously in the trigger's keydown, while the editor still holds
 * focus, so keys typed in those few frames would otherwise land in the verse.
 */
export function shouldRoutePaletteKey(options: {
  /** The editor's current view; only Standard view has marker palettes. */
  viewType: string;
  /** Whether the project or view is effectively read-only. */
  isReadOnly: boolean;
  /** Whether the MAIN editor instance holds DOM focus. */
  isEditorFocused: boolean;
}): boolean {
  const { viewType, isReadOnly, isEditorFocused } = options;
  if (viewType !== 'standard') return false;
  // A palette can neither open nor commit here: the editor's commit methods throw in read-only
  // mode. A session already open when this flips is ended by the web view's own read-only effect,
  // so no key is needed to get out of it.
  if (isReadOnly) return false;
  // Focus is the whole rule. Keys belong to whatever holds focus: the main editor's own keys route
  // here, the palette's come back through key forwarding, and anything else in this web view — the
  // footnote popover's editor, a comment box — keeps its own. `isFocused()` is scoped to the MAIN
  // editor instance, so the popover's `.editor-input` is never mistaken for it.
  return isEditorFocused;
}

/** The key that opens the inline marker menu in a non-Standard editor. */
export const INLINE_MARKERS_MENU_TRIGGER = '\\';

/**
 * Decides whether a keydown should open the inline marker menu. The twin of
 * `shouldRoutePaletteKey`: Standard view has the marker palette, every other view has this menu.
 *
 * The menu's items insert markers, which a read-only editor refuses, so it never opens there. It
 * opens only for a keystroke aimed at the main editor (focused), and not again while it is already
 * showing.
 */
export function shouldOpenInlineMarkersMenu(options: {
  /** The key that was pressed. */
  key: string;
  /** Whether the inline marker menu is already showing. */
  isMenuShown: boolean;
  /** Whether the MAIN editor instance holds DOM focus. */
  isEditorFocused: boolean;
  /** Whether the project or view is effectively read-only. */
  isReadOnly: boolean;
  /** The editor's current view; Standard view uses the palette instead of this menu. */
  viewType: string;
}): boolean {
  const { key, isMenuShown, isEditorFocused, isReadOnly, viewType } = options;
  return (
    !isMenuShown &&
    isEditorFocused &&
    !isReadOnly &&
    viewType !== 'standard' &&
    key === INLINE_MARKERS_MENU_TRIGGER
  );
}
