// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { getCaretPositionFromClick } from '@/components/advanced/footnotes/footnote-caret.utils';

/** The no-break space `FootnoteItem` renders inside each `.marker` span, after the marker. */
const NBSP = '\u00a0';

function makeRow(bodyHtml: string): HTMLElement {
  const row = document.createElement('li');
  row.innerHTML =
    `<div class="textual-note-header">\\f a${NBSP}</div>` +
    `<div class="textual-note-body">${bodyHtml}</div>`;
  document.body.appendChild(row);
  return row;
}

/**
 * A character run as `FootnoteItem` renders it with markers shown: a `.marker` span carrying the
 * marker and its trailing separator, then the run's text.
 */
function markedRun(marker: string, text: string): string {
  return `<span><span class="marker">\\${marker}${NBSP}</span><span class="usfm_${marker}">${text}</span></span>`;
}

type CaretApiDocument = {
  caretPositionFromPoint?: unknown;
  caretRangeFromPoint?: unknown;
};

/** Jsdom implements neither caret API, so each test installs the one it needs by assignment. */
function caretApiDocument(): CaretApiDocument {
  // Reaching past the DOM lib's typing to install APIs jsdom does not implement
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return document as unknown as CaretApiDocument;
}

afterEach(() => {
  vi.restoreAllMocks();
  // `restoreAllMocks` only unwinds `vi.spyOn`; a directly assigned property outlives it, and one
  // left on `document` would make the "no caret API" case below unreachable for the rest of the
  // file - and silently reroute the WebKit fallback back to the standard API.
  delete caretApiDocument().caretPositionFromPoint;
  delete caretApiDocument().caretRangeFromPoint;
  document.body.innerHTML = '';
});

describe('getCaretPositionFromClick', () => {
  it('maps a click inside the note body to a flat utf16 offset', () => {
    const row = makeRow('<p><span>abc</span><span>def</span></p>');
    const textNode = row.querySelectorAll('span')[1].firstChild; // 'def'
    // jsdom has no layout: stub the browser caret API to a known position
    caretApiDocument().caretPositionFromPoint = vi
      .fn()
      .mockReturnValue({ offsetNode: textNode, offset: 1 });

    const position = getCaretPositionFromClick(10, 10, row);
    expect(position).toEqual({ utf16Offset: 4 }); // 'abc' (3) + 1 into 'def'
  });

  it("returns 'end' when the caret API reports a node outside the row", () => {
    const row = makeRow('<p><span>abc</span></p>');
    const elsewhere = document.createElement('div');
    elsewhere.textContent = 'not in the row';
    document.body.appendChild(elsewhere);
    // jsdom has no layout: stub the browser caret API to report a node outside the row
    caretApiDocument().caretPositionFromPoint = vi
      .fn()
      .mockReturnValue({ offsetNode: elsewhere.firstChild, offset: 0 });

    expect(getCaretPositionFromClick(10, 10, row)).toBe('end');
  });

  // The header holds the note's own marker and caller, which the note editor governs through its
  // own controls; the first place the user can type is right after the caller - the start of
  // whatever the body begins with.
  it.each([
    [
      'a run',
      `<p class="notetext">${markedRun('fr', '1.11')}</p>`,
      { utf16Offset: 0, glyph: { index: 0, offset: 0 } },
    ],
    [
      'a category',
      `<p class="notetext"><span class="note-category"><span class="marker">\\cat${NBSP}</span>` +
        `<span class="note-category-value">People</span></span></p>`,
      { utf16Offset: 0, field: 'category', glyph: { index: 0, offset: 0 } },
    ],
    ['text with markers hidden', '<p class="notetext"><span>abc</span></p>', { utf16Offset: 0 }],
  ])('maps a click on the header to just after the caller, before %s', (_label, html, expected) => {
    const row = makeRow(html);
    const headerText = row.querySelector('.textual-note-header')?.firstChild;
    caretApiDocument().caretPositionFromPoint = vi
      .fn()
      .mockReturnValue({ offsetNode: headerText, offset: 1 });

    expect(getCaretPositionFromClick(10, 10, row)).toEqual(expected);
  });

  it("maps a click in the gap between a note's paragraphs to the start of the one below", () => {
    // `.textual-note-body` lays a multi-paragraph note (`\fp`) out as a flex column with a gap
    // between the lines, so a click in that gap is over no text at all: the caret API reports the
    // CONTAINER and an index into its children.
    const row = makeRow('<p><span>first para</span></p><p><span>second para</span></p>');
    const body = row.querySelector('.textual-note-body');
    caretApiDocument().caretPositionFromPoint = vi
      .fn()
      .mockReturnValue({ offsetNode: body, offset: 1 });

    expect(getCaretPositionFromClick(10, 10, row)).toEqual({ utf16Offset: 'first para'.length });
  });

  it("returns 'end' for a click below the note's last line", () => {
    // Same container report, but the index is past the last child - there is no content below to
    // land at, so the end of the note is the honest answer.
    const row = makeRow('<p><span>only para</span></p>');
    const body = row.querySelector('.textual-note-body');
    caretApiDocument().caretPositionFromPoint = vi
      .fn()
      .mockReturnValue({ offsetNode: body, offset: 1 });

    expect(getCaretPositionFromClick(10, 10, row)).toBe('end');
  });

  // A marker is not content, so it is outside the offset origin FootnoteCaretPosition defines —
  // and the editor excludes its own marker rendering from that same origin
  // (`EditorRef.selectNoteTextOffset`). The read-only row must not count its `.marker` spans to
  // match, or every offset captured with markers shown resolves off by the length of the marker
  // text preceding the click.
  it('excludes marker text from the offset so it matches the editor origin', () => {
    const row = makeRow(
      `<p class="notetext">${markedRun('fr', '1.11')}${markedRun('ft', 'abc')}</p>`,
    );
    const textNode = row.querySelector('.usfm_ft')?.firstChild; // 'abc'
    // jsdom has no layout: stub the browser caret API to a known position
    caretApiDocument().caretPositionFromPoint = vi
      .fn()
      .mockReturnValue({ offsetNode: textNode, offset: 1 });

    // '1.11' (4) + 1 into 'abc'. The '\fr ' and '\ft ' marker spans must not count.
    expect(getCaretPositionFromClick(10, 10, row)).toEqual({ utf16Offset: 5 });
  });

  // The note's `\cat` category is a FIELD on the note rather than part of its `content`, and the
  // editor builds its own category display as `attribute`-typed text, which
  // `EditorRef.selectNoteTextOffset` skips. The row renders the category inside the note body, so
  // it has to skip the whole run - value included, plus the separating space the row supplies
  // itself when markers are hidden - or a click in a categorized note resolves past where the user
  // clicked by the category's length.
  it.each([
    {
      name: 'with markers shown',
      category:
        `<span class="note-category"><span class="marker">\\cat${NBSP}</span>` +
        `<span class="note-category-value">People</span><span class="marker">\\cat*</span></span>`,
    },
    {
      name: 'with markers hidden',
      category:
        '<span class="note-category"><span class="note-category-value">People</span> </span>',
    },
  ])('excludes the note category from the offset $name', ({ category }) => {
    const row = makeRow(`<p class="notetext">${category}<span class="usfm_ft">abc</span></p>`);
    const textNode = row.querySelector('.usfm_ft')?.firstChild; // 'abc'
    // jsdom has no layout: stub the browser caret API to a known position
    caretApiDocument().caretPositionFromPoint = vi
      .fn()
      .mockReturnValue({ offsetNode: textNode, offset: 1 });

    // 1 into 'abc'. Neither 'People', nor its `\cat` glyphs, nor the markers-hidden separator
    // space may count.
    expect(getCaretPositionFromClick(10, 10, row)).toEqual({ utf16Offset: 1 });
  });

  describe('a click on the \\cat category', () => {
    const categoryRow = () =>
      makeRow(
        `<p class="notetext"><span class="note-category"><span class="marker">\\cat${NBSP}</span>` +
          `<span class="note-category-value">People</span><span class="marker">\\cat*</span>` +
          `</span><span class="usfm_ft">abc</span></p>`,
      );

    function clickOn(node: Node | null | undefined, offset: number) {
      // jsdom has no layout: stub the browser caret API to a known position
      caretApiDocument().caretPositionFromPoint = vi
        .fn()
        .mockReturnValue({ offsetNode: node, offset });
    }

    it('maps a click in the value to that offset in the category', () => {
      const row = categoryRow();
      clickOn(row.querySelector('.note-category-value')?.firstChild, 3);
      expect(getCaretPositionFromClick(10, 10, row)).toEqual({
        utf16Offset: 3,
        field: 'category',
      });
    });

    it('maps a click in the \\cat opener to that character of it', () => {
      const row = categoryRow();
      clickOn(row.querySelector('.note-category .marker')?.firstChild, 2);
      expect(getCaretPositionFromClick(10, 10, row)).toEqual({
        utf16Offset: 0,
        field: 'category',
        glyph: { index: 0, offset: 2 },
      });
    });

    it("maps a click on the \\cat opener's separator to the start of the value", () => {
      const row = categoryRow();
      clickOn(row.querySelector('.note-category .marker')?.firstChild, `\\cat${NBSP}`.length);
      expect(getCaretPositionFromClick(10, 10, row)).toEqual({
        utf16Offset: 0,
        field: 'category',
      });
    });

    it("maps a click in the \\cat* closer, at the value's end, to that character of it", () => {
      const row = categoryRow();
      const closer = row.querySelectorAll('.note-category .marker')[1];
      clickOn(closer?.firstChild, 5);
      expect(getCaretPositionFromClick(10, 10, row)).toEqual({
        utf16Offset: 'People'.length,
        field: 'category',
        glyph: { index: 0, offset: 5 },
      });
    });
  });

  describe('a click on a marker', () => {
    /** `\\fr 1.11\\fr*\\ft a <nested nd>x</nested> b\\ft*\\f*`, rendered as `FootnoteItem` does. */
    const markerRow = () =>
      makeRow(
        `<p class="notetext"><span><span class="marker">\\fr${NBSP}</span>` +
          `<span class="usfm_fr">1.11</span><span class="marker">\\fr*</span></span>` +
          `<span><span class="marker">\\ft${NBSP}</span><span class="usfm_ft">a </span>` +
          `<span><span class="marker">\\+nd${NBSP}</span><span class="usfm_nd">x</span>` +
          `<span class="marker">\\+nd*</span></span><span class="usfm_ft"> b</span>` +
          `<span class="marker">\\ft*</span></span><span class="marker note-closer">\\f*</span></p>`,
      );

    const markers = (row: HTMLElement) => row.querySelectorAll('.marker');

    function clickOn(node: Node | null | undefined, offset: number) {
      // jsdom has no layout: stub the browser caret API to a known position
      caretApiDocument().caretPositionFromPoint = vi
        .fn()
        .mockReturnValue({ offsetNode: node, offset });
    }

    it('maps a click in an opening marker to that character of it', () => {
      const row = markerRow();
      clickOn(markers(row)[0].firstChild, 2);
      expect(getCaretPositionFromClick(10, 10, row)).toEqual({
        utf16Offset: 0,
        glyph: { index: 0, offset: 2 },
      });
    });

    it("maps a click on an opening marker's separator to the start of its text", () => {
      const row = markerRow();
      clickOn(markers(row)[0].firstChild, `\\fr${NBSP}`.length);
      expect(getCaretPositionFromClick(10, 10, row)).toEqual({ utf16Offset: 0 });
    });

    it('tells apart two markers that sit between the same two characters', () => {
      const row = markerRow();
      // `\\fr*` then `\\ft`, both after `1.11`.
      clickOn(markers(row)[1].firstChild, 4);
      expect(getCaretPositionFromClick(10, 10, row)).toEqual({
        utf16Offset: 4,
        glyph: { index: 0, offset: 4 },
      });
      clickOn(markers(row)[2].firstChild, 1);
      expect(getCaretPositionFromClick(10, 10, row)).toEqual({
        utf16Offset: 4,
        glyph: { index: 1, offset: 1 },
      });
    });

    it("counts a nested marker's `+`", () => {
      const row = markerRow();
      // `1.11` + `a ` = 6.
      clickOn(markers(row)[3].firstChild, 2);
      expect(getCaretPositionFromClick(10, 10, row)).toEqual({
        utf16Offset: 6,
        glyph: { index: 0, offset: 2 },
      });
    });

    it("keeps content offsets the same as the row's text with markers hidden", () => {
      const row = markerRow();
      clickOn(row.querySelectorAll('.usfm_ft')[1].firstChild, 1);
      // `1.11` + `a ` + `x` + 1 into ` b`.
      expect(getCaretPositionFromClick(10, 10, row)).toEqual({ utf16Offset: 8 });
    });

    it("maps a click on the note's own closing marker to the end of the note's text", () => {
      const row = markerRow();
      clickOn(row.querySelector('.note-closer')?.firstChild, 1);
      expect(getCaretPositionFromClick(10, 10, row)).toEqual({ utf16Offset: 9 });
    });
  });

  // Safari and older WebKit ship `caretRangeFromPoint` instead of the standard API, so the row's
  // caret-where-you-clicked behavior depends on this branch on those browsers alone.
  it('reads the caret from the WebKit legacy API when the standard one is missing', () => {
    const row = makeRow(
      `<p class="notetext">${markedRun('fr', '1.11')}${markedRun('ft', 'abc')}</p>`,
    );
    const textNode = row.querySelector('.usfm_ft')?.firstChild; // 'abc'
    caretApiDocument().caretRangeFromPoint = vi
      .fn()
      .mockReturnValue({ startContainer: textNode, startOffset: 2 });

    expect(getCaretPositionFromClick(10, 10, row)).toEqual({ utf16Offset: 6 }); // '1.11' + 2
  });

  // `FootnoteItem` renders a U+FEFF placeholder as the body of a note with no content at all, so
  // the row keeps its height and stays clickable. It is display, not content: an empty note's text
  // is empty, so counting the placeholder would resolve a click anywhere on that row to offset 1 -
  // past the end of a note with nothing in it.
  it('excludes the empty-note placeholder from the offset', () => {
    const row = makeRow('<p class="notetext"><span class="note-placeholder">\ufeff</span></p>');
    const textNode = row.querySelector('.note-placeholder')?.firstChild;
    // jsdom has no layout: stub the browser caret API to a known position
    caretApiDocument().caretPositionFromPoint = vi
      .fn()
      .mockReturnValue({ offsetNode: textNode, offset: 1 });

    expect(getCaretPositionFromClick(10, 10, row)).toEqual({ utf16Offset: 0 });
  });

  it("returns 'end' when no caret API is available", () => {
    const row = makeRow('<p><span>abc</span></p>');
    // jsdom: document.caretPositionFromPoint is undefined by default
    expect(getCaretPositionFromClick(10, 10, row)).toBe('end');
  });
});
