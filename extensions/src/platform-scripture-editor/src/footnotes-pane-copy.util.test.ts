// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getEditorViewOptions } from './editor-view-options.util';
import { getFootnotesPaneCopyText } from './footnotes-pane-copy.util';

const NBSP = '\u00A0';
// Standard view with "Allow invisible characters" on holds a stored no-break space as U+001A.
const STAND_IN = '\u001A';
const allowing = getEditorViewOptions('standard', false, true);
const notAllowing = getEditorViewOptions('standard', false, false);

/** A read-only row as the pane renders one: a marker glyph with its separator, then stored text. */
function readOnlyRow(text: string): string {
  return `<li><span class="marker">\\ft${NBSP}</span>${text}</li>`;
}

/**
 * The pane: a read-only row whose text stores a no-break space, the row editor showing a note in
 * Standard view (`stored` is how it shows its stored no-break space), and a second read-only row.
 */
function renderPane(stored: string) {
  document.body.innerHTML =
    `<ul>${readOnlyRow(`one${NBSP}two`)}` +
    `<li><div class="editor-input" contenteditable="true">` +
    `\\f +${NBSP}\\ft${NBSP}see${stored}x \\+nd${NBSP}L\\+nd*${stored}z${NBSP}${NBSP}w\\f*` +
    `</div></li>${readOnlyRow(`three${NBSP}four`)}</ul>`;
  const rowEditorRoot = document.querySelector('.editor-input') ?? undefined;
  const [firstRow, , lastRow] = document.querySelectorAll('li');
  return { rowEditorRoot, firstRow, lastRow };
}

function selectFrom(startNode: Node, startOffset: number, endNode: Node, endOffset: number) {
  const range = document.createRange();
  range.setStart(startNode, startOffset);
  range.setEnd(endNode, endOffset);
  const selection = window.getSelection() ?? undefined;
  selection?.removeAllRanges();
  selection?.addRange(range);
  return selection;
}

afterEach(() => {
  window.getSelection()?.removeAllRanges();
  document.body.innerHTML = '';
});

describe.each([
  { setting: 'off', viewOptions: notAllowing, shown: '~', copied: '~' },
  { setting: 'on', viewOptions: allowing, shown: STAND_IN, copied: NBSP },
])(
  'getFootnotesPaneCopyText with allowInvisibleCharacters $setting',
  ({ viewOptions, shown, copied }) => {
    const editorUsfm = `\\f + \\ft see${copied}x \\+nd L\\+nd*${copied}z  w\\f*`;

    it("writes the row editor's display spacing as spaces and leaves the read-only rows as they are", () => {
      const { rowEditorRoot, firstRow, lastRow } = renderPane(shown);
      const selection = selectFrom(firstRow, 0, lastRow, lastRow.childNodes.length);

      expect(getFootnotesPaneCopyText(selection, rowEditorRoot, viewOptions)).toBe(
        `\\ft${NBSP}one${NBSP}two${editorUsfm}\\ft${NBSP}three${NBSP}four`,
      );
    });

    it('converts only the part of the selection inside the row editor when it starts in a row', () => {
      const { rowEditorRoot, firstRow } = renderPane(shown);
      const editorText = rowEditorRoot?.firstChild;
      if (!editorText) throw new Error('row editor text missing');
      // Up to the end of `\+nd L`.
      const end = editorText.textContent?.indexOf('L') ?? -1;
      const selection = selectFrom(firstRow, 0, editorText, end + 1);

      expect(getFootnotesPaneCopyText(selection, rowEditorRoot, viewOptions)).toBe(
        `\\ft${NBSP}one${NBSP}two\\f + \\ft see${copied}x \\+nd L`,
      );
    });

    it('converts only the part of the selection inside the row editor when it ends in a row', () => {
      const { rowEditorRoot, lastRow } = renderPane(shown);
      const editorText = rowEditorRoot?.firstChild;
      if (!editorText) throw new Error('row editor text missing');
      const start = editorText.textContent?.indexOf('L') ?? -1;
      const selection = selectFrom(editorText, start, lastRow, lastRow.childNodes.length);

      expect(getFootnotesPaneCopyText(selection, rowEditorRoot, viewOptions)).toBe(
        `L\\+nd*${copied}z  w\\f*\\ft${NBSP}three${NBSP}four`,
      );
    });

    it('writes a selection inside the row editor as the USFM the editor holds', () => {
      const { rowEditorRoot } = renderPane(shown);
      const editorText = rowEditorRoot?.firstChild;
      if (!editorText?.textContent) throw new Error('row editor text missing');
      const selection = selectFrom(editorText, 0, editorText, editorText.textContent.length);

      expect(getFootnotesPaneCopyText(selection, rowEditorRoot, viewOptions)).toBe(editorUsfm);
    });

    it('leaves a selection of read-only rows alone', () => {
      const { rowEditorRoot, firstRow } = renderPane(shown);
      const selection = selectFrom(firstRow, 0, firstRow, firstRow.childNodes.length);

      expect(getFootnotesPaneCopyText(selection, rowEditorRoot, viewOptions)).toBe(
        `\\ft${NBSP}one${NBSP}two`,
      );
    });
  },
);

describe('getFootnotesPaneCopyText without a row editor to place', () => {
  it('respells only the stand-in when the pane has no row editor', () => {
    const { firstRow, lastRow } = renderPane(STAND_IN);
    const selection = selectFrom(firstRow, 0, lastRow, lastRow.childNodes.length);
    const selectedText = selection?.toString() ?? '';

    expect(getFootnotesPaneCopyText(selection, undefined, allowing)).toBe(
      selectedText.replaceAll(STAND_IN, NBSP),
    );
  });

  it("leaves every no-break space as it is when the selection's text does not hold its parts' no-break spaces", () => {
    const { rowEditorRoot, firstRow, lastRow } = renderPane('~');
    const selection = selectFrom(firstRow, 0, lastRow, lastRow.childNodes.length);
    if (!selection) throw new Error('no selection');
    // A browser that serializes one no-break space out of the selection's text.
    const serialized = selection.toString().replace(NBSP, '');
    const toString = vi.spyOn(selection, 'toString').mockReturnValue(serialized);
    try {
      expect(getFootnotesPaneCopyText(selection, rowEditorRoot, notAllowing)).toBe(serialized);
    } finally {
      toString.mockRestore();
    }
  });

  it('copies nothing from an empty selection', () => {
    expect(getFootnotesPaneCopyText(undefined, undefined, allowing)).toBe('');
  });
});
