import { logger } from '@papi/frontend';
import { toUsfmNbspSpelling, ViewOptions } from '@eten-tech-foundation/platform-editor';

const NBSP = '\u00A0';

/** What a no-break space a copy takes from the pane is: see {@link getFootnotesPaneCopyText}. */
type NbspKind = 'row-editor-display' | 'marker-separator' | 'stored';

/**
 * The kind of each no-break space the text nodes `range` covers hold, in document order: the order
 * the browser's text of the range writes them in.
 */
function nbspKindsIn(range: Range, rowEditorRoot: Element | undefined): NbspKind[] {
  const kinds: NbspKind[] = [];
  const root = range.commonAncestorContainer;
  const ownerDocument = root instanceof Document ? root : root.ownerDocument;
  if (!ownerDocument) return kinds;
  const walker = ownerDocument.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  // The walker starts at `root`, which is itself the one text node when the range is inside one.
  const textNodes: Node[] = [];
  for (let node: Node | undefined = walker.currentNode; node; node = walker.nextNode() ?? undefined)
    if (node.nodeType === Node.TEXT_NODE && range.intersectsNode(node)) textNodes.push(node);
  textNodes.forEach((node) => {
    const text = node.textContent ?? '';
    const from = node === range.startContainer ? range.startOffset : 0;
    const to = node === range.endContainer ? range.endOffset : text.length;
    const nbsps = text.slice(from, to).split(NBSP).length - 1;
    let kind: NbspKind = 'stored';
    if (rowEditorRoot?.contains(node)) kind = 'row-editor-display';
    else if (node.parentElement?.closest('.marker')) kind = 'marker-separator';
    for (let i = 0; i < nbsps; i++) kinds.push(kind);
  });
  return kinds;
}

/**
 * The text a copy of `selection` from the footnotes pane puts on the clipboard, before the copy
 * limit is applied.
 *
 * The pane holds two kinds of text, and a no-break space means something different in each:
 *
 * - A read-only row renders its note's text straight from USJ, so a U+00A0 there is either the
 *   separator it shows after a marker (inside the marker's `.marker` span), which stays as it is (a
 *   paste reads it as the marker's separator), or a no-break space the text stores, which is
 *   written as the project spells it, as Paratext 9 copies one: `~`, or U+00A0 itself when the
 *   project allows invisible characters (`ViewOptions.allowInvisibleCharacters`).
 * - The row editor is a Standard-view editor, which shows a stored no-break space as `~` or as an
 *   internal stand-in, and shows a U+00A0 only as display spacing: each space of a run of spaces,
 *   the separator after a marker, a note's layout spacers. Each U+00A0 the selection takes from it
 *   is a space, as the editor's own copy writes it. Its stand-in becomes the project's spelling
 *   (`toUsfmNbspSpelling`), which the stand-in can only come from.
 *
 * The selection's own text (`Selection.toString()`) is the base, so the rows keep the line breaks
 * the browser puts between them; a `Range`'s text has none, so the parts' texts cannot simply be
 * joined. Each U+00A0 of it is matched to the text node it came from by order: the browser's text
 * of a selection adds line breaks and collapses ASCII whitespace but never adds, moves or reorders
 * a U+00A0. So when the selection's text holds as many U+00A0s as the text nodes it covers do, its
 * n-th U+00A0 is theirs. When it holds fewer — the browser left out some content, such as content
 * that is not rendered — which is which cannot be told, and every U+00A0 is left as it is.
 *
 * @param selection The page selection being copied
 * @param rowEditorRoot The row editor's content-editable root, if the pane has a row editor
 * @param rowEditorViewOptions The view options the row editor renders with, which carry the
 *   project's `allowInvisibleCharacters`
 * @returns The text to copy
 */
export function getFootnotesPaneCopyText(
  selection: Selection | undefined,
  rowEditorRoot: Element | undefined,
  rowEditorViewOptions: ViewOptions | undefined,
): string {
  const selectedText = selection?.toString() ?? '';
  const range = selection?.rangeCount === 1 ? selection.getRangeAt(0) : undefined;
  if (!range) return toUsfmNbspSpelling(selectedText, rowEditorViewOptions);

  const kinds = nbspKindsIn(range, rowEditorRoot);
  const nbspsInSelectedText = selectedText.split(NBSP).length - 1;
  if (kinds.length !== nbspsInSelectedText) {
    logger.debug(
      `Footnotes pane copy left every no-break space as it is: the selection's text holds ` +
        `${nbspsInSelectedText} no-break spaces, the text it covers ${kinds.length}`,
    );
    return toUsfmNbspSpelling(selectedText, rowEditorViewOptions);
  }

  const storedSpelling = rowEditorViewOptions?.allowInvisibleCharacters ? NBSP : '~';
  // Code units, not graphemes: a display no-break space is one code unit wherever it sits, even in
  // front of a combining mark, and the editor's own copy writes a space for it the same way.
  let nbspIndex = 0;
  const respelled = selectedText.replace(/\u00A0/g, (nbsp) => {
    const kind = kinds[nbspIndex];
    nbspIndex += 1;
    if (kind === 'row-editor-display') return ' ';
    if (kind === 'stored') return storedSpelling;
    return nbsp;
  });
  return toUsfmNbspSpelling(respelled, rowEditorViewOptions);
}
