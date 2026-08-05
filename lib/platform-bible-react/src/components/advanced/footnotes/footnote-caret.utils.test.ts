// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from 'vitest';
import { getCaretPositionFromClick } from '@/components/advanced/footnotes/footnote-caret.utils';

function makeRow(bodyHtml: string): HTMLElement {
  const row = document.createElement('li');
  row.innerHTML =
    `<div class="textual-note-header">a </div>` +
    `<div class="textual-note-header">1.1 </div>` +
    `<div class="textual-note-body">${bodyHtml}</div>`;
  document.body.appendChild(row);
  return row;
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

  it("returns 'end' when no caret API is available", () => {
    const row = makeRow('<p><span>abc</span></p>');
    // jsdom: document.caretPositionFromPoint is undefined by default
    expect(getCaretPositionFromClick(10, 10, row)).toBe('end');
  });
});
