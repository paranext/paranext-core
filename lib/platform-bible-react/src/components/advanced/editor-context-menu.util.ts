/**
 * Whether ONE editor's own right-click context menu (`ContextMenuPlugin`) is open, scoped to that
 * editor rather than to the document as a whole.
 *
 * The menu itself renders through a `ReactDOM.createPortal` to `document.body`, and every
 * `ContextMenuPlugin` instance on the page — the main Standard-view editor and the footnote-editor
 * popover each mount their own — shares the same portal classes
 * (`.typeahead-popover.auto-embed-menu`), so a bare `document.querySelector` for that class cannot
 * tell whose menu is open. The editor package instead marks the FOCUSED editor's own root with
 * `aria-controls="editor-context-menu"` for exactly as long as its menu stays open (removed again
 * on close), which is the one signal that is genuinely per-editor.
 */

/**
 * The element id `ContextMenuPlugin` sets as its focused editor root's `aria-controls` while its
 * own right-click menu is open (mirrors the editor package's own `CONTEXT_MENU_LIST_ID`).
 */
const OPEN_CONTEXT_MENU_ATTRIBUTE_SELECTOR = '[aria-controls="editor-context-menu"]';

/**
 * @param editorRoot The editor's own DOM root (the `.editor-input` element the menu marks), or a
 *   container that contains it. `undefined`/`null` (editor not yet mounted) answers `false`.
 * @returns Whether THIS editor's right-click context menu is open.
 */
export function isEditorContextMenuOpenFor(editorRoot: Element | null | undefined): boolean {
  if (!editorRoot) return false;
  if (editorRoot.matches(OPEN_CONTEXT_MENU_ATTRIBUTE_SELECTOR)) return true;
  return !!editorRoot.querySelector(OPEN_CONTEXT_MENU_ATTRIBUTE_SELECTOR);
}
