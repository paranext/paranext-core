import { FootnoteCaretPosition } from './footnotes.types';

/** The no-break space `FootnoteItem` renders after an opening marker, inside its `.marker` span. */
const MARKER_SEPARATOR = '\u00a0';

/**
 * What a text node inside the row's `.textual-note-body` is, as the caret offset origin
 * ({@link FootnoteCaretPosition}) counts it:
 *
 * - `content`: the note's text, in runs and written directly in the note alike.
 * - `glyph`: a run's opening or closing marker, a nested span's, or an unmatched marker - a `.marker`
 *   span's text, whose opening form carries its display separator (see {@link glyphLength}).
 * - `category`: anything in the `\cat …\cat*` run, which is a field on the note rather than part of
 *   its `content` and is addressed through its own `field` (see `categoryPosition`).
 * - `display`: text no file byte backs the way the editor renders it - the note's own closing marker
 *   (`.note-closer`, the end of the note's shell), and the U+FEFF `FootnoteItem` renders for a note
 *   with no content at all (`.note-placeholder`), so the row keeps its height and stays clickable.
 *
 * The editor classifies its own rendering of the note the same way
 * (`EditorRef.selectNoteTextOffset` counts content text and run glyphs, and skips the shell, the
 * category run and every NBSP it adds). Both sides must, or a position captured over the row
 * resolves off by everything the two renderings disagree about before the click.
 */
type RowTextKind = 'content' | 'glyph' | 'category' | 'display';

function classify(node: Node, body: HTMLElement): RowTextKind {
  let kind: RowTextKind = 'content';
  let ancestor = node.parentElement;
  while (ancestor && ancestor !== body) {
    const { classList } = ancestor;
    if (classList.contains('note-category')) return 'category';
    if (classList.contains('note-closer') || classList.contains('note-placeholder'))
      return 'display';
    if (classList.contains('marker')) kind = 'glyph';
    ancestor = ancestor.parentElement;
  }
  return kind;
}

/** The walker's next text node, or `undefined` past the last one. */
function nextText(walker: TreeWalker): Text | undefined {
  // A walker created with SHOW_TEXT only yields Text nodes
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (walker.nextNode() as Text | null) ?? undefined;
}

/** A marker glyph's own text length: its display separator, if it has one, excluded. */
function glyphLength(node: Text): number {
  return node.data.endsWith(MARKER_SEPARATOR)
    ? node.data.length - MARKER_SEPARATOR.length
    : node.data.length;
}

/**
 * The position of a click on the `\cat …\cat*` run: in the value, or in one of the run's two
 * glyphs, which sit at the value's start (`\cat`) and end (`\cat*`). The markers-hidden separator
 * space after the value has no editor counterpart and falls to the start of the content after it.
 */
function categoryPosition(category: Element, node: Text, offset: number): FootnoteCaretPosition {
  const value = category.querySelector('.note-category-value');
  if (value?.contains(node)) return { utf16Offset: offset, field: 'category' };
  const glyph = node.parentElement?.closest('.marker');
  if (!value || !glyph || !category.contains(glyph)) return { utf16Offset: 0 };
  const isOpener = glyph === category.querySelector('.marker');
  const valueLength = value.textContent?.length ?? 0;
  const at = isOpener ? 0 : valueLength;
  // On the opener's separator: the start of the value it introduces.
  if (offset > glyphLength(node)) return { utf16Offset: at, field: 'category' };
  // An empty value leaves both glyphs at offset 0, the closer second.
  const index = !isOpener && valueLength === 0 ? 1 : 0;
  return { utf16Offset: at, field: 'category', glyph: { index, offset } };
}

/**
 * The position `offset` characters into `target`, counted over `body` (see {@link RowTextKind}).
 * Glyphs are addressed by the content offset they sit at and their order there, so the content
 * offsets are the same whether or not the row shows markers.
 */
function positionAt(body: HTMLElement, target: Text, offset: number): FootnoteCaretPosition {
  const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
  let contentOffset = 0;
  let glyphIndex = 0;
  for (let node = nextText(walker); node; node = nextText(walker)) {
    const kind = classify(node, body);
    if (kind === 'category') {
      if (node === target) {
        const category = node.parentElement?.closest('.note-category');
        return category ? categoryPosition(category, node, offset) : { utf16Offset: 0 };
      }
    } else if (kind === 'display') {
      // Display text resolves to the start of the content that follows it.
      if (node === target) return { utf16Offset: contentOffset };
    } else if (kind === 'glyph') {
      if (node === target)
        // On an opening glyph's separator: the start of the content it introduces.
        return offset > glyphLength(node)
          ? { utf16Offset: contentOffset }
          : { utf16Offset: contentOffset, glyph: { index: glyphIndex, offset } };
      glyphIndex += 1;
    } else {
      if (node === target) return { utf16Offset: contentOffset + offset };
      contentOffset += node.data.length;
      if (node.data.length > 0) glyphIndex = 0;
    }
  }
  return 'end';
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
 * A click on a marker lands inside that marker, which the note editor renders as editable text; a
 * click on the note's own marker or caller (the row's header cell) lands right after the caller,
 * the first place in the note the user can type.
 *
 * @param clientX Viewport X of the click (from the mouse event).
 * @param clientY Viewport Y of the click.
 * @param rowElement The row's root element; the position is computed over the text of its
 *   `.textual-note-body` descendant (see `RowTextKind` in this module for what each piece of that
 *   text counts as).
 * @returns The position (see {@link FootnoteCaretPosition}), or `'end'` when the click cannot be
 *   mapped (no browser support, click outside the row's text).
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
  if (!offsetNode) return 'end';
  if (rowElement.querySelector('.textual-note-header')?.contains(offsetNode)) {
    const first = firstTextNodeWithin(body);
    return first ? positionAt(body, first, 0) : 'end';
  }
  if (!body.contains(offsetNode)) return 'end';
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
  // nodeType narrows this to a Text node
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return positionAt(body, offsetNode as Text, offset);
}
