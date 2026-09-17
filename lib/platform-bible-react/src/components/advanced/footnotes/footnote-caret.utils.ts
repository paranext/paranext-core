import { FootnoteCaretPosition } from './footnotes.types';

/** Row classes whose text is display rather than note content (see {@link isDisplayText}). */
const DISPLAY_ONLY_CLASSES = ['marker', 'note-category', 'note-placeholder'];

/**
 * Whether a text node inside the note body is rendered display rather than note text.
 *
 * Three kinds of display ride inside `.textual-note-body`:
 *
 * - `.marker` spans: `FootnoteItem` renders USFM markers as visible text, but a marker is display,
 *   not content.
 * - `.note-category`: the whole `\cat …\cat*` run, glyphs AND value. The category is a FIELD on the
 *   note rather than part of its `content`, so it is outside the offset origin even though the
 *   value is the note's own data; the row also supplies a separating space of its own there when
 *   markers are hidden, which no file byte backs.
 * - `.note-placeholder`: the U+FEFF `FootnoteItem` renders for a note with no content at all, so the
 *   row keeps its height and stays clickable. No file byte backs it either, so counting it would
 *   resolve a click on an EMPTY note to offset 1.
 *
 * All three are outside the offset origin {@link FootnoteCaretPosition} defines, and the editor
 * excludes its own rendering of each from that same origin (`EditorRef.selectNoteTextOffset` skips
 * marker nodes and `attribute`-typed text, which is what the category's display run is built as,
 * and an empty note has nothing to walk). Both sides must, or an offset captured over the row
 * resolves off by the length of everything the two renderings disagree about before the click.
 */
function isDisplayText(node: Node, body: HTMLElement): boolean {
  let ancestor = node.parentElement;
  while (ancestor && ancestor !== body) {
    const { classList } = ancestor;
    if (DISPLAY_ONLY_CLASSES.some((className) => classList.contains(className))) return true;
    ancestor = ancestor.parentElement;
  }
  return false;
}

/** The first text node at or inside `node`, or `undefined` when it holds no text. */
function firstTextNodeWithin(node: Node): Text | undefined {
  // TreeWalker only descends; a text node passed in is never visited, so handle it directly.
  if (node.nodeType === Node.TEXT_NODE) {
    // nodeType narrows this to a Text node
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return node as Text;
  }
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  // TreeWalker with SHOW_TEXT only yields Text nodes
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (walker.nextNode() as Text | null) ?? undefined;
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
 *   the row's header cell), the rendered USFM markers, the `\cat` category run and the empty-note
 *   placeholder (see `isDisplayText`).
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
  if (!offsetNode || !body.contains(offsetNode)) return 'end';
  // A click that is inside the body's box but over none of its text - the gaps a multi-paragraph
  // note's flex column leaves between its lines, or the space below the last one - reports the
  // CONTAINER and an index into its children rather than a text node. Resolve that to the start of
  // the child it points at, so clicking between two paragraphs lands at the start of the second
  // instead of collapsing to the end of the whole note. An index past the last child has no content
  // below it to land at, and falls through to `'end'`.
  if (offsetNode.nodeType === Node.ELEMENT_NODE) {
    const child: Node | undefined = offsetNode.childNodes[offset];
    const firstText = child ? firstTextNodeWithin(child) : undefined;
    if (!firstText) return 'end';
    offsetNode = firstText;
    offset = 0;
  }
  if (offsetNode.nodeType !== Node.TEXT_NODE) return 'end';

  // Flat offset = lengths of all body text nodes before the clicked one, plus the in-node offset.
  // Display text is skipped so this origin matches the editor's (see `isDisplayText`).
  const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
  let accumulated = 0;
  let node = walker.nextNode();
  while (node) {
    // A click on display text itself resolves to the start of the content that follows it
    if (isDisplayText(node, body)) {
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
