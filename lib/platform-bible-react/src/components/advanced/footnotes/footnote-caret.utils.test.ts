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

afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = '';
});

describe('getCaretPositionFromClick', () => {
  it('maps a click inside the note body to a flat utf16 offset', () => {
    const row = makeRow('<p><span>abc</span><span>def</span></p>');
    const textNode = row.querySelectorAll('span')[1].firstChild; // 'def'
    // jsdom has no layout: stub the browser caret API to a known position
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    (document as unknown as { caretPositionFromPoint: unknown }).caretPositionFromPoint = vi
      .fn()
      .mockReturnValue({ offsetNode: textNode, offset: 1 });

    const position = getCaretPositionFromClick(10, 10, row);
    expect(position).toEqual({ utf16Offset: 4 }); // 'abc' (3) + 1 into 'def'
  });

  it("returns 'end' when the caret API reports a node outside the note body", () => {
    const row = makeRow('<p><span>abc</span></p>');
    const headerText = row.querySelector('.textual-note-header')?.firstChild;
    // jsdom has no layout: stub the browser caret API to report a node outside the note body
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    (document as unknown as { caretPositionFromPoint: unknown }).caretPositionFromPoint = vi
      .fn()
      .mockReturnValue({ offsetNode: headerText, offset: 0 });

    expect(getCaretPositionFromClick(10, 10, row)).toBe('end');
  });

  // The editor renders USFM markers as Lexical decorators inside `contenteditable="false"`
  // wrappers, which `createNoteBodyTextNodeFilter` excludes from the caret origin. The read-only
  // row must exclude its own `.marker` spans to match, or every offset captured with markers shown
  // lands early in the editor by the length of the marker text preceding the click.
  it('excludes marker text from the offset so it matches the editor origin', () => {
    const row = makeRow(
      `<p class="notetext">${markedRun('fr', '1.11')}${markedRun('ft', 'abc')}</p>`,
    );
    const textNode = row.querySelector('.usfm_ft')?.firstChild; // 'abc'
    // jsdom has no layout: stub the browser caret API to a known position
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    (document as unknown as { caretPositionFromPoint: unknown }).caretPositionFromPoint = vi
      .fn()
      .mockReturnValue({ offsetNode: textNode, offset: 1 });

    // '1.11' (4) + 1 into 'abc'. The '\fr ' and '\ft ' marker spans must not count.
    expect(getCaretPositionFromClick(10, 10, row)).toEqual({ utf16Offset: 5 });
  });

  it("returns 'end' when no caret API is available", () => {
    const row = makeRow('<p><span>abc</span></p>');
    // jsdom: document.caretPositionFromPoint is undefined by default
    expect(getCaretPositionFromClick(10, 10, row)).toBe('end');
  });
});
