import { logger } from '@papi/frontend';
import { toUsfmNbspSpelling, ViewOptions } from '@eten-tech-foundation/platform-editor';

const NBSP = '\u00A0';

function countNbsps(text: string): number {
  return text.split(NBSP).length - 1;
}

/**
 * The text a copy of `selection` from the footnotes pane puts on the clipboard, before the copy
 * limit is applied.
 *
 * The pane holds two kinds of text, and a no-break space means something different in each:
 *
 * - A read-only row renders its note's text straight from USJ, so a U+00A0 there is a no-break space
 *   the text stores, or the one PT9 puts after a marker it shows (which a paste reads as the
 *   marker's separator). Its text is left as the selection's own text has it.
 * - The row editor is a Standard-view editor, which shows a stored no-break space as `~` or as an
 *   internal stand-in, and shows a U+00A0 only as display spacing: each space of a run of spaces,
 *   the separator after a marker, a note's layout spacers. Each U+00A0 the selection takes from it
 *   is a space, as the editor's own copy writes it. Its stand-in becomes the project's spelling
 *   (`toUsfmNbspSpelling`), which the stand-in can only come from.
 *
 * The selection's own text (`Selection.toString()`) is the base, so the rows keep the line breaks
 * the browser puts between them; a `Range`'s text has none, so the parts' texts cannot simply be
 * joined. The row editor's part of the selection's text is found by the order of its no-break
 * spaces: the selection is split at the row editor's boundaries, and the browser's text of a
 * selection adds line breaks and collapses ASCII whitespace but never adds, moves or reorders a
 * U+00A0. So when the selection's text holds as many U+00A0s as its parts do, its n-th U+00A0 is
 * the parts' n-th, and those that come from the row editor's part become spaces. When it holds
 * fewer — the browser left out some content, such as content that is not rendered — which part each
 * belongs to cannot be told, and every U+00A0 is left as it is.
 *
 * @param selection The page selection being copied
 * @param rowEditorRoot The row editor's content-editable root, if the pane has a row editor
 * @param rowEditorViewOptions The view options the row editor renders with
 * @returns The text to copy
 */
export function getFootnotesPaneCopyText(
  selection: Selection | undefined,
  rowEditorRoot: Element | undefined,
  rowEditorViewOptions: ViewOptions | undefined,
): string {
  const selectedText = selection?.toString() ?? '';
  const range = selection?.rangeCount === 1 ? selection.getRangeAt(0) : undefined;
  if (!range || !rowEditorRoot || !range.intersectsNode(rowEditorRoot))
    return toUsfmNbspSpelling(selectedText, rowEditorViewOptions);

  const rowEditorRange = rowEditorRoot.ownerDocument.createRange();
  rowEditorRange.selectNodeContents(rowEditorRoot);
  const before = range.cloneRange();
  const inRowEditor = range.cloneRange();
  const after = range.cloneRange();
  if (range.compareBoundaryPoints(Range.START_TO_START, rowEditorRange) < 0) {
    before.setEnd(rowEditorRange.startContainer, rowEditorRange.startOffset);
    inRowEditor.setStart(rowEditorRange.startContainer, rowEditorRange.startOffset);
  } else before.collapse(true);
  if (range.compareBoundaryPoints(Range.END_TO_END, rowEditorRange) > 0) {
    inRowEditor.setEnd(rowEditorRange.endContainer, rowEditorRange.endOffset);
    after.setStart(rowEditorRange.endContainer, rowEditorRange.endOffset);
  } else after.collapse(false);

  const nbspsBefore = countNbsps(before.toString());
  const nbspsInRowEditor = countNbsps(inRowEditor.toString());
  const nbspsInParts = nbspsBefore + nbspsInRowEditor + countNbsps(after.toString());
  const nbspsInSelectedText = countNbsps(selectedText);
  if (nbspsInParts !== nbspsInSelectedText) {
    logger.debug(
      `Footnotes pane copy left the row editor's display spacing as no-break spaces: the ` +
        `selection's text holds ${nbspsInSelectedText} no-break spaces, its parts ${nbspsInParts}`,
    );
    return toUsfmNbspSpelling(selectedText, rowEditorViewOptions);
  }

  // Code units, not graphemes: a display no-break space is one code unit wherever it sits, even in
  // front of a combining mark, and the editor's own copy writes a space for it the same way.
  let nbspIndex = 0;
  const withSpaces = selectedText.replace(/\u00A0/g, (nbsp) => {
    const isInRowEditor = nbspIndex >= nbspsBefore && nbspIndex < nbspsBefore + nbspsInRowEditor;
    nbspIndex += 1;
    return isInRowEditor ? ' ' : nbsp;
  });
  return toUsfmNbspSpelling(withSpaces, rowEditorViewOptions);
}
