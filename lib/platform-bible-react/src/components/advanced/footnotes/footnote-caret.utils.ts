import { FootnoteCaretPosition } from './footnotes.types';

/**
 * Whether a text node is rendered marker chrome (a `.marker` span) rather than note text.
 *
 * `FootnoteItem` renders USFM markers as visible text; the editor renders them as Lexical
 * decorators inside `contenteditable="false"` wrappers, which `createNoteBodyTextNodeFilter`
 * excludes from its caret origin. Both sides must exclude them or an offset captured with markers
 * shown lands early in the editor by the length of the marker text before the click.
 */
function isMarkerText(node: Node, body: HTMLElement): boolean {
  let ancestor = node.parentElement;
  while (ancestor && ancestor !== body) {
    if (ancestor.classList.contains('marker')) return true;
    ancestor = ancestor.parentElement;
  }
  return false;
}

/**
 * Map a mouse click on a read-only footnote row to a caret position in the footnote's text, so an
 * editor swapped into the row can place its caret where the user clicked (PT9-parity
 * caret-where-you-clicked). Uses the browser caret APIs; positions land only at valid caret
 * boundaries, so graphemes are never split.
 *
 * @param clientX Viewport X of the click (from the mouse event).
 * @param clientY Viewport Y of the click.
 * @param rowElement The row's root element; the offset is computed over the text of its
 *   `.textual-note-body` descendant - the note's character runs, excluding the caller (rendered in
 *   the row's header cell) and the rendered USFM markers (see `isMarkerText`).
 * @returns A flat UTF-16 offset into the note body text, or `'end'` when the click cannot be mapped
 *   (no browser support, click outside the body text, empty note).
 */
export function getCaretPositionFromClick(
  clientX: number,
  clientY: number,
  rowElement: HTMLElement,
): FootnoteCaretPosition {
  const body = rowElement.querySelector<HTMLElement>('.textual-note-body');
  if (!body) return 'end';

  // caretPositionFromPoint is the standard API; caretRangeFromPoint is the WebKit legacy one.
  let offsetNode: Node | undefined;
  let offset = 0;
  if (typeof document.caretPositionFromPoint === 'function') {
    const caret = document.caretPositionFromPoint(clientX, clientY);
    if (caret) {
      offsetNode = caret.offsetNode;
      offset = caret.offset;
    }
  } else if (typeof document.caretRangeFromPoint === 'function') {
    const range = document.caretRangeFromPoint(clientX, clientY);
    if (range) {
      offsetNode = range.startContainer;
      offset = range.startOffset;
    }
  }
  if (!offsetNode || !body.contains(offsetNode) || offsetNode.nodeType !== Node.TEXT_NODE) {
    return 'end';
  }

  // Flat offset = lengths of all body text nodes before the clicked one, plus the in-node offset.
  // Marker chrome is skipped so this origin matches the editor's (see `isMarkerText`).
  const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
  let accumulated = 0;
  let node = walker.nextNode();
  while (node) {
    // A click on a marker itself resolves to the start of the text that marker introduces
    if (isMarkerText(node, body)) {
      if (node === offsetNode) return { utf16Offset: accumulated };
    } else {
      if (node === offsetNode) return { utf16Offset: accumulated + offset };
      // TreeWalker with SHOW_TEXT only yields Text nodes
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      accumulated += (node as Text).data.length;
    }
    node = walker.nextNode();
  }
  return 'end';
}
