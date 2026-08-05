// @vitest-environment jsdom
import { describe, it, expect } from 'vitest';
import { placeCaretAtPosition } from '@/components/advanced/footnote-editor/footnote-editor.utils';

function makeContainer(html: string): HTMLElement {
  const div = document.createElement('div');
  div.innerHTML = html;
  document.body.appendChild(div);
  return div;
}

describe('placeCaretAtPosition', () => {
  it("places the caret at 'end' of the last text node", () => {
    const container = makeContainer('<span>abc</span><span>def</span>');
    const ok = placeCaretAtPosition(container, 'end');
    expect(ok).toBe(true);
    const sel = window.getSelection();
    expect(sel?.anchorNode?.textContent).toBe('def');
    expect(sel?.anchorOffset).toBe(3);
  });

  it('places the caret at a flat utf16 offset spanning nodes', () => {
    const container = makeContainer('<span>abc</span><span>def</span>');
    const ok = placeCaretAtPosition(container, { utf16Offset: 4 }); // between 'd' and 'e'
    expect(ok).toBe(true);
    const sel = window.getSelection();
    expect(sel?.anchorNode?.textContent).toBe('def');
    expect(sel?.anchorOffset).toBe(1);
  });

  it('keeps UTF-16 code-unit semantics for non-BMP text', () => {
    // '𝕊' is one codepoint, TWO UTF-16 code units. Offset 2 = after the surrogate pair.
    const container = makeContainer('<span>𝕊ab</span>');
    const ok = placeCaretAtPosition(container, { utf16Offset: 2 });
    expect(ok).toBe(true);
    const sel = window.getSelection();
    expect(sel?.anchorOffset).toBe(2); // caret after 𝕊, before 'a'
  });

  it("clamps an offset past the end to 'end'", () => {
    const container = makeContainer('<span>abc</span>');
    const ok = placeCaretAtPosition(container, { utf16Offset: 999 });
    expect(ok).toBe(true);
    const sel = window.getSelection();
    expect(sel?.anchorOffset).toBe(3);
  });

  it('returns false when the container has no text', () => {
    const container = makeContainer('');
    expect(placeCaretAtPosition(container, 'end')).toBe(false);
  });
});
