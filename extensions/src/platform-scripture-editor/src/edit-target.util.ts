/**
 * Which editor the tab's top-menu Copy acts on: the main Scripture text, or the footnotes pane's
 * rows.
 */
export type EditTarget = 'main' | 'footnotes';

/** The two regions a selection can be classified into. */
export type EditTargetRoots = {
  /** The main editor's own element, or `null`/`undefined` while it is not mounted */
  mainEditorRoot: Element | null | undefined;
  /**
   * The footnotes pane's list of rows (the row editor and the read-only rows), without the pane's
   * header, close button or other chrome; `null`/`undefined` while the pane is not rendered
   */
  footnotesRows: Element | null | undefined;
};

/**
 * Says which editor a selection anchor sits in.
 *
 * @param anchor The browser selection's anchor node, `null` or `undefined` for no selection
 * @param roots The regions to test the anchor against
 * @returns The target the anchor is in, or `undefined` when it is in neither (the toolbar, a pane
 *   header, a blur, no selection): the caller keeps its current target then
 */
export function classifySelectionAnchor(
  anchor: Node | null | undefined,
  { mainEditorRoot, footnotesRows }: EditTargetRoots,
): EditTarget | undefined {
  if (!anchor) return undefined;
  if (mainEditorRoot?.contains(anchor)) return 'main';
  if (footnotesRows?.contains(anchor)) return 'footnotes';
  return undefined;
}

/**
 * Whether the browser selection is a range inside the footnotes pane's rows (a read-only row or the
 * row editor).
 *
 * @param selection The document's selection, `null` or `undefined` for none
 * @param footnotesRows The pane's rows, `null` or `undefined` while the pane is not rendered
 */
export function hasFootnotesRowsSelection(
  selection: Pick<Selection, 'anchorNode' | 'isCollapsed'> | null | undefined,
  footnotesRows: Element | null | undefined,
): boolean {
  const anchor = selection?.anchorNode;
  return !!selection && !!anchor && !!footnotesRows?.contains(anchor) && !selection.isCollapsed;
}
