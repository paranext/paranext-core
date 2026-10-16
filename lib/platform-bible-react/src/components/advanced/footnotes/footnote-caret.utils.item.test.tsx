// @vitest-environment jsdom
// `footnote-caret.utils.test.ts` builds every row by hand (`makeRow`/`markedRun`), so a change to
// `FootnoteItem`'s actual DOM shape (a renamed class, a moved marker span) could break
// click-to-caret in the running app without failing that file. This sibling renders the REAL
// `FootnoteItem` and resolves a click against its real output, so the two stay honest about each
// other. A `.tsx` file is needed to render JSX, hence the separate file rather than adding cases to
// the `.ts` one.
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { MarkerObject } from '@eten-tech-foundation/scripture-utilities';
import { getCaretPositionFromClick } from '@/components/advanced/footnotes/footnote-caret.utils';
import { FootnoteItem } from '@/components/advanced/footnotes/footnote-item.component';

type CaretApiDocument = {
  caretPositionFromPoint?: unknown;
};

/** Jsdom implements neither caret API; each test installs the standard one by assignment. */
function caretApiDocument(): CaretApiDocument {
  // Reaching past the DOM lib's typing to install an API jsdom does not implement
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return document as unknown as CaretApiDocument;
}

/**
 * Renders a real `FootnoteItem` and returns its container - the same element
 * `getCaretPositionFromClick` expects as `rowElement` (it looks for a `.textual-note-body`
 * descendant, which `FootnoteItem`'s fragment renders as a direct child of the render container).
 */
function renderItem(footnote: MarkerObject): HTMLElement {
  const { container } = render(<FootnoteItem footnote={footnote} />);
  return container;
}

afterEach(() => {
  vi.restoreAllMocks();
  delete caretApiDocument().caretPositionFromPoint;
});

describe('getCaretPositionFromClick against a real FootnoteItem', () => {
  it('resolves a click inside a plain character run', () => {
    const footnote: MarkerObject = {
      type: 'note',
      marker: 'f',
      caller: '+',
      content: [{ type: 'char', marker: 'ft', content: ['hello world'] }],
    };
    const row = renderItem(footnote);
    const textNode = row.querySelector('.usfm_ft')?.firstChild; // 'hello world'
    // jsdom has no layout: stub the browser caret API to a known position
    caretApiDocument().caretPositionFromPoint = vi
      .fn()
      .mockReturnValue({ offsetNode: textNode, offset: 6 }); // into 'world'

    // The run's own marker glyph and separator are excluded; 'hello world' is the whole origin.
    expect(getCaretPositionFromClick(10, 10, row)).toEqual({ utf16Offset: 6 });
  });

  it('resolves a click in the \\ft run of a note with a leading \\fr reference run', () => {
    const footnote: MarkerObject = {
      type: 'note',
      marker: 'f',
      caller: '+',
      content: [
        { type: 'char', marker: 'fr', content: ['1.1 '] },
        { type: 'char', marker: 'ft', content: ['some text'] },
      ],
    };
    const row = renderItem(footnote);
    const textNode = row.querySelector('.usfm_ft')?.firstChild; // 'some text'
    caretApiDocument().caretPositionFromPoint = vi
      .fn()
      .mockReturnValue({ offsetNode: textNode, offset: 2 }); // into 'some'

    // '1.1 ' (4, the \fr run's own text) + 2 into 'some text'. Both runs' marker glyphs are
    // excluded, but the \fr run's TEXT counts toward the origin same as any other note content.
    expect(getCaretPositionFromClick(10, 10, row)).toEqual({ utf16Offset: 6 });
  });

  it('counts a plain string that sits directly in the note content, outside any char run', () => {
    const footnote: MarkerObject = {
      type: 'note',
      marker: 'f',
      caller: '+',
      content: ['direct ', { type: 'char', marker: 'ft', content: ['alpha'] }],
    };
    const row = renderItem(footnote);
    // The bare string is rendered as its own text span (no marker of its own to exclude), keyed
    // off the note's own marker rather than a child run's.
    const directTextNode = row.querySelector('.usfm_f')?.firstChild; // 'direct '
    caretApiDocument().caretPositionFromPoint = vi
      .fn()
      .mockReturnValue({ offsetNode: directTextNode, offset: 3 }); // into 'dir'

    expect(getCaretPositionFromClick(10, 10, row)).toEqual({ utf16Offset: 3 });
  });

  it("counts the direct string's full length toward a click past it, in the \\ft run that follows", () => {
    const footnote: MarkerObject = {
      type: 'note',
      marker: 'f',
      caller: '+',
      content: ['direct ', { type: 'char', marker: 'ft', content: ['alpha'] }],
    };
    const row = renderItem(footnote);
    const textNode = row.querySelector('.usfm_ft')?.firstChild; // 'alpha'
    caretApiDocument().caretPositionFromPoint = vi
      .fn()
      .mockReturnValue({ offsetNode: textNode, offset: 2 }); // into 'al'

    // 'direct '.length (7) + 2 into 'alpha'.
    expect(getCaretPositionFromClick(10, 10, row)).toEqual({ utf16Offset: 9 });
  });

  it('counts a plain string that sits directly in the note content AFTER a char run (e.g. the period after \\xt ...\\xt*)', () => {
    const footnote: MarkerObject = {
      type: 'note',
      marker: 'f',
      caller: '+',
      content: [{ type: 'char', marker: 'xt', content: ['See'] }, '.'],
    };
    const row = renderItem(footnote);
    // The bare string is rendered as its own text span, keyed off the note's own marker - same as a
    // direct string that comes before a run counts toward the origin.
    const directTextNode = row.querySelector('.usfm_f')?.firstChild; // '.'
    caretApiDocument().caretPositionFromPoint = vi
      .fn()
      .mockReturnValue({ offsetNode: directTextNode, offset: 1 }); // past the period

    // 'See'.length (3) + 1 into '.'.
    expect(getCaretPositionFromClick(10, 10, row)).toEqual({ utf16Offset: 4 });
  });

  describe("clicks on a real row's markers and header", () => {
    /** `\\f + \\cat People\\cat*\\fr 1:1\\fr*\\ft a\\ft*\\f*` */
    const markedNote: MarkerObject = {
      type: 'note',
      marker: 'f',
      caller: '+',
      category: 'People',
      content: [
        { type: 'char', marker: 'fr', content: ['1:1'] },
        { type: 'char', marker: 'ft', content: ['a'] },
      ],
    };

    function clickOn(node: Node | null | undefined, offset: number) {
      // jsdom has no layout: stub the browser caret API to a known position
      caretApiDocument().caretPositionFromPoint = vi
        .fn()
        .mockReturnValue({ offsetNode: node, offset });
    }

    const markerTexts = (row: HTMLElement) =>
      Array.from(row.querySelectorAll('.textual-note-body .marker'));

    it('lands in the marker clicked, not at the text after it', () => {
      const row = renderItem(markedNote);
      const ftCloser = markerTexts(row).find((marker) => marker.textContent === '\\ft*');
      clickOn(ftCloser?.firstChild, 2);
      // `1:1` + `a` = 4, and `\\ft*` is the only marker there.
      expect(getCaretPositionFromClick(10, 10, row)).toEqual({
        utf16Offset: 4,
        glyph: { index: 0, offset: 2 },
      });
    });

    it('lands right after the \\cat* closer, not past the \\fr that follows it', () => {
      const row = renderItem(markedNote);
      const catCloser = markerTexts(row).find((marker) => marker.textContent === '\\cat*');
      clickOn(catCloser?.firstChild, '\\cat*'.length);
      expect(getCaretPositionFromClick(10, 10, row)).toEqual({
        utf16Offset: 'People'.length,
        field: 'category',
        glyph: { index: 0, offset: '\\cat*'.length },
      });
    });

    it("treats the note's own closing marker as the end of its text", () => {
      const row = renderItem(markedNote);
      const noteCloser = markerTexts(row).find((marker) => marker.textContent === '\\f*');
      clickOn(noteCloser?.firstChild, 1);
      expect(getCaretPositionFromClick(10, 10, row)).toEqual({ utf16Offset: 4 });
    });

    it('lands a click on the header just after the caller, at the start of the category', () => {
      const row = renderItem(markedNote);
      clickOn(row.querySelector('.textual-note-header .note-caller')?.firstChild, 0);
      expect(getCaretPositionFromClick(10, 10, row)).toEqual({
        utf16Offset: 0,
        field: 'category',
        glyph: { index: 0, offset: 0 },
      });
    });
  });
});
