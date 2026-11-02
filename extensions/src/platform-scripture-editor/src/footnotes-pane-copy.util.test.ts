// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { logger } from '@papi/frontend';
import { getEditorViewOptions } from './editor-view-options.util';
import { getFootnotesPaneCopyText } from './footnotes-pane-copy.util';

vi.mock('@papi/frontend', () => ({
  logger: { warn: vi.fn(), debug: vi.fn(), info: vi.fn(), error: vi.fn() },
}));

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

/**
 * Has `selection` serialize as `text`. jsdom's selection text is its range's text; a browser's adds
 * a line break between blocks, which these tests write into `text` by hand.
 */
function serializeAs(selection: Selection | undefined, text: string) {
  if (!selection) throw new Error('no selection');
  vi.spyOn(selection, 'toString').mockReturnValue(text);
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.mocked(logger.debug).mockClear();
  window.getSelection()?.removeAllRanges();
  document.body.innerHTML = '';
});

// A stored no-break space is written as the project spells it, as Paratext 9 copies one: `~` with
// the setting off, U+00A0 with it on. A marker's separator in a read-only row stays a U+00A0.
describe.each([
  { setting: 'off', viewOptions: notAllowing, isAllowing: false, shown: '~', copied: '~' },
  { setting: 'on', viewOptions: allowing, isAllowing: true, shown: STAND_IN, copied: NBSP },
])(
  'getFootnotesPaneCopyText with allowInvisibleCharacters $setting',
  ({ viewOptions, isAllowing, shown, copied }) => {
    const editorUsfm = `\\f + \\ft see${copied}x \\+nd L\\+nd*${copied}z  w\\f*`;

    it("writes the row editor's display spacing as spaces and the rows' stored no-break spaces as the project spells them", () => {
      const { rowEditorRoot, firstRow, lastRow } = renderPane(shown);
      const selection = selectFrom(firstRow, 0, lastRow, lastRow.childNodes.length);

      expect(getFootnotesPaneCopyText(selection, rowEditorRoot, viewOptions, isAllowing)).toBe(
        `\\ft${NBSP}one${copied}two${editorUsfm}\\ft${NBSP}three${copied}four`,
      );
    });

    it('converts only the part of the selection inside the row editor when it starts in a row', () => {
      const { rowEditorRoot, firstRow } = renderPane(shown);
      const editorText = rowEditorRoot?.firstChild;
      if (!editorText) throw new Error('row editor text missing');
      // Up to the end of `\+nd L`.
      const end = editorText.textContent?.indexOf('L') ?? -1;
      const selection = selectFrom(firstRow, 0, editorText, end + 1);

      expect(getFootnotesPaneCopyText(selection, rowEditorRoot, viewOptions, isAllowing)).toBe(
        `\\ft${NBSP}one${copied}two\\f + \\ft see${copied}x \\+nd L`,
      );
    });

    it('converts only the part of the selection inside the row editor when it ends in a row', () => {
      const { rowEditorRoot, lastRow } = renderPane(shown);
      const editorText = rowEditorRoot?.firstChild;
      if (!editorText) throw new Error('row editor text missing');
      const start = editorText.textContent?.indexOf('L') ?? -1;
      const selection = selectFrom(editorText, start, lastRow, lastRow.childNodes.length);

      expect(getFootnotesPaneCopyText(selection, rowEditorRoot, viewOptions, isAllowing)).toBe(
        `L\\+nd*${copied}z  w\\f*\\ft${NBSP}three${copied}four`,
      );
    });

    it('writes a selection inside the row editor as the USFM the editor holds', () => {
      const { rowEditorRoot } = renderPane(shown);
      const editorText = rowEditorRoot?.firstChild;
      if (!editorText?.textContent) throw new Error('row editor text missing');
      const selection = selectFrom(editorText, 0, editorText, editorText.textContent.length);

      expect(getFootnotesPaneCopyText(selection, rowEditorRoot, viewOptions, isAllowing)).toBe(
        editorUsfm,
      );
    });

    it('keeps the line breaks the browser puts between the rows', () => {
      const { rowEditorRoot, firstRow, lastRow } = renderPane(shown);
      const selection = selectFrom(firstRow, 0, lastRow, lastRow.childNodes.length);
      const editorDisplay = rowEditorRoot?.textContent ?? '';
      serializeAs(
        selection,
        `\\ft${NBSP}one${NBSP}two\n${editorDisplay}\n\\ft${NBSP}three${NBSP}four`,
      );

      expect(getFootnotesPaneCopyText(selection, rowEditorRoot, viewOptions, isAllowing)).toBe(
        `\\ft${NBSP}one${copied}two\n${editorUsfm}\n\\ft${NBSP}three${copied}four`,
      );
      expect(logger.debug).not.toHaveBeenCalled();
    });

    it('converts a selection that starts and ends inside the row editor', () => {
      const { rowEditorRoot } = renderPane(shown);
      const editorText = rowEditorRoot?.firstChild;
      if (!editorText?.textContent) throw new Error('row editor text missing');
      // From `\ft` to just before `w`.
      const selection = selectFrom(
        editorText,
        editorText.textContent.indexOf('\\ft'),
        editorText,
        editorText.textContent.indexOf('w'),
      );

      expect(getFootnotesPaneCopyText(selection, rowEditorRoot, viewOptions, isAllowing)).toBe(
        `\\ft see${copied}x \\+nd L\\+nd*${copied}z  `,
      );
    });

    it('writes a selection of read-only rows with their stored no-break spaces as the project spells them', () => {
      const { rowEditorRoot, firstRow } = renderPane(shown);
      const selection = selectFrom(firstRow, 0, firstRow, firstRow.childNodes.length);

      expect(getFootnotesPaneCopyText(selection, rowEditorRoot, viewOptions, isAllowing)).toBe(
        `\\ft${NBSP}one${copied}two`,
      );
    });

    it('writes the read-only rows the same way when the pane has no row editor', () => {
      const { firstRow, lastRow } = renderPane(shown);
      document.querySelector('.editor-input')?.closest('li')?.remove();
      const selection = selectFrom(firstRow, 0, lastRow, lastRow.childNodes.length);

      expect(getFootnotesPaneCopyText(selection, undefined, viewOptions, isAllowing)).toBe(
        `\\ft${NBSP}one${copied}two\\ft${NBSP}three${copied}four`,
      );
    });
  },
);

describe("getFootnotesPaneCopyText placing the row editor's part", () => {
  /**
   * A pane whose rows hold more stored no-break spaces than the row editor shows display spacing,
   * and whose row editor has two paragraphs of several text nodes each.
   */
  function renderUnevenPane() {
    document.body.innerHTML =
      `<ul>${readOnlyRow(`a${NBSP}b${NBSP}c`)}` +
      `<li><div class="editor-input" contenteditable="true">` +
      `<p><span>\\f +${NBSP}</span><span>\\ft${NBSP}</span>see</p>` +
      `<p><span>\\fp${NBSP}</span>more\\f*</p>` +
      `</div></li>${readOnlyRow(`d${NBSP}e`)}</ul>`;
    const rowEditorRoot = document.querySelector('.editor-input') ?? undefined;
    const [firstRow, , lastRow] = document.querySelectorAll('li');
    const [firstParagraph, secondParagraph] = document.querySelectorAll('p');
    return { rowEditorRoot, firstRow, lastRow, firstParagraph, secondParagraph };
  }

  it("converts the no-break spaces in the row editor's place among the selection's, not the first ones", () => {
    const { rowEditorRoot, firstRow, lastRow } = renderUnevenPane();
    const selection = selectFrom(firstRow, 0, lastRow, lastRow.childNodes.length);
    serializeAs(
      selection,
      `\\ft${NBSP}a${NBSP}b${NBSP}c\n\\f +${NBSP}\\ft${NBSP}see\n\\fp${NBSP}more\\f*\n\\ft${NBSP}d${NBSP}e`,
    );

    expect(getFootnotesPaneCopyText(selection, rowEditorRoot, notAllowing, false)).toBe(
      `\\ft${NBSP}a~b~c\n\\f + \\ft see\n\\fp more\\f*\n\\ft${NBSP}d~e`,
    );
  });

  it('converts a part of the row editor that starts and ends mid-paragraph after part of a row', () => {
    const { rowEditorRoot, firstRow, secondParagraph } = renderUnevenPane();
    // From `b` in the first row to the end of the second paragraph's `\fp ` span.
    const rowText = firstRow.lastChild;
    if (!rowText?.textContent) throw new Error('row text missing');
    const selection = selectFrom(rowText, rowText.textContent.indexOf('b'), secondParagraph, 1);
    serializeAs(selection, `b${NBSP}c\n\\f +${NBSP}\\ft${NBSP}see\n\\fp${NBSP}`);

    expect(getFootnotesPaneCopyText(selection, rowEditorRoot, notAllowing, false)).toBe(
      `b~c\n\\f + \\ft see\n\\fp `,
    );
  });

  it('writes only the rows of a selection that ends where the row editor starts', () => {
    const { rowEditorRoot, firstRow, firstParagraph } = renderUnevenPane();
    const selection = selectFrom(firstRow, 0, firstParagraph, 0);

    expect(getFootnotesPaneCopyText(selection, rowEditorRoot, notAllowing, false)).toBe(
      `\\ft${NBSP}a~b~c`,
    );
  });
});

describe('getFootnotesPaneCopyText without a row editor to place', () => {
  it('respells only the stand-in when the pane has no row editor', () => {
    const { firstRow, lastRow } = renderPane(STAND_IN);
    const selection = selectFrom(firstRow, 0, lastRow, lastRow.childNodes.length);
    const selectedText = selection?.toString() ?? '';

    expect(getFootnotesPaneCopyText(selection, undefined, allowing, true)).toBe(
      selectedText.replaceAll(STAND_IN, NBSP),
    );
  });

  it("leaves every no-break space as it is when the selection's text does not hold its parts' no-break spaces", () => {
    const { rowEditorRoot, firstRow, lastRow } = renderPane('~');
    const selection = selectFrom(firstRow, 0, lastRow, lastRow.childNodes.length);
    if (!selection) throw new Error('no selection');
    // A browser that serializes one no-break space out of the selection's text.
    const serialized = selection.toString().replace(NBSP, '');
    serializeAs(selection, serialized);

    expect(getFootnotesPaneCopyText(selection, rowEditorRoot, notAllowing, false)).toBe(serialized);
    expect(logger.debug).toHaveBeenCalledTimes(1);
  });

  it('writes a stored no-break space as itself while the setting is not known', () => {
    // `~` would paste back as a literal tilde in a project that allows invisible characters; a
    // U+00A0 pastes back as a no-break space under either setting.
    document.body.innerHTML = `<ul>${readOnlyRow(`one${NBSP}two`)}</ul>`;
    const row = document.querySelector('li');
    if (!row) throw new Error('no row');
    const selection = selectFrom(row, 0, row, row.childNodes.length);
    const selectedText = selection?.toString() ?? '';
    // A positive control: the row stores a no-break space.
    expect(selectedText).toContain(`one${NBSP}two`);

    expect(getFootnotesPaneCopyText(selection, undefined, undefined, undefined)).toBe(selectedText);
    expect(getFootnotesPaneCopyText(selection, undefined, undefined, false)).toBe(
      selectedText.replace(`one${NBSP}two`, 'one~two'),
    );
  });

  it('copies nothing from an empty selection', () => {
    expect(getFootnotesPaneCopyText(undefined, undefined, allowing, true)).toBe('');
  });
});
