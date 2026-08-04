// @vitest-environment jsdom

import { describe, expect, it } from 'vitest';
import { computeBarTop, resolveActiveLineRect } from './character-marker-bar.utils';

// Mock rect/element factories — mirrors paragraph-marker-tooltip.utils.test.ts. Only
// getBoundingClientRect is implemented; the pure functions under test need nothing else.
/* eslint-disable no-type-assertion/no-type-assertion */
const makeRect = (top: number, bottom: number, left = 0): DOMRect =>
  ({
    top,
    bottom,
    left,
    right: left + 200,
    width: 200,
    height: bottom - top,
    x: left,
    y: top,
    toJSON: () => ({}),
  }) as DOMRect;

const makeEl = (top: number, bottom: number): HTMLElement =>
  ({ getBoundingClientRect: () => makeRect(top, bottom) }) as unknown as HTMLElement;
/* eslint-enable no-type-assertion/no-type-assertion */

describe('computeBarTop', () => {
  it('returns the caret top in content coordinates when fully visible', () => {
    // No scroll: anchor at viewport 0, caret line at viewport 100.
    expect(computeBarTop(makeRect(100, 120), makeEl(0, 800), makeEl(0, 800))).toBe(100);
  });

  it('reflects content position when the anchor has scrolled up with the caret', () => {
    // Scrolled 200px: anchor at viewport -200, caret at viewport 100 → content 300.
    expect(computeBarTop(makeRect(100, 120), makeEl(-200, 400), makeEl(0, 600))).toBe(300);
  });

  it('clamps to the visible-area top when the caret line has scrolled above the viewport', () => {
    // Anchor at -200 → visibleAreaTop 200; caret content top 50 → clamped up to 200.
    expect(computeBarTop(makeRect(-150, 150), makeEl(-200, 400), makeEl(0, 600))).toBe(200);
  });

  it('never exceeds the target bottom minus one when the caret line is nearly scrolled past', () => {
    // Anchor at -100 → visibleAreaTop 100; caret content 50..60 → min(100, 60-1) = 59.
    expect(computeBarTop(makeRect(-50, -40), makeEl(-100, 500), makeEl(0, 600))).toBe(59);
  });
});

describe('resolveActiveLineRect', () => {
  // jsdom (26.x) does not implement Range.prototype.getBoundingClientRect at all — it's
  // undefined, not a zero-filled DOMRect. Per the CSSOM View spec, a real browser returns an
  // all-zero DOMRect for a Range with no client rects (exactly the degenerate case this module
  // falls back for), so this polyfills only that spec-compliant zero shape — not a faked non-zero
  // rect — to let jsdom exercise the same path a real browser would.
  /* eslint-disable no-type-assertion/no-type-assertion */
  if (!Range.prototype.getBoundingClientRect) {
    Range.prototype.getBoundingClientRect = () =>
      ({
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
        toJSON: () => ({}),
      }) as DOMRect;
  }
  /* eslint-enable no-type-assertion/no-type-assertion */

  const buildEditor = () => {
    const editorRoot = document.createElement('div');
    editorRoot.className = 'editor-input usfm';
    const para = document.createElement('p');
    para.className = 'para usfm_p';
    para.textContent = 'The LORD is my shepherd';
    editorRoot.appendChild(para);
    document.body.appendChild(editorRoot);
    return { editorRoot, para };
  };

  const selectionAt = (node: Node, offset: number): Selection => {
    const selection = window.getSelection();
    if (!selection) throw new Error('jsdom provided no Selection');
    const range = document.createRange();
    range.setStart(node, offset);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    return selection;
  };

  it('returns undefined when there is no selection', () => {
    const { editorRoot } = buildEditor();
    expect(resolveActiveLineRect(undefined, editorRoot)).toBeUndefined();
  });

  it('returns undefined when the selection is outside the editor', () => {
    const { editorRoot } = buildEditor();
    const outside = document.createElement('p');
    outside.textContent = 'in a sibling panel';
    document.body.appendChild(outside);
    // DOM's firstChild is typed as ChildNode | null, not undefined.
    // eslint-disable-next-line no-null/no-null
    const textNode = outside.firstChild ?? null;
    if (!textNode) throw new Error('expected a text node');
    expect(resolveActiveLineRect(selectionAt(textNode, 3), editorRoot)).toBeUndefined();
  });

  it('falls back to the containing paragraph rect when the caret rect is degenerate', () => {
    // jsdom reports all-zero rects for ranges, which is exactly the degenerate case the fallback
    // exists for — so this asserts the fallback fires and returns the paragraph's own rect object.
    const { editorRoot, para } = buildEditor();
    const paraRect = makeRect(42, 60);
    para.getBoundingClientRect = () => paraRect;
    // DOM's firstChild is typed as ChildNode | null, not undefined.
    // eslint-disable-next-line no-null/no-null
    const textNode = para.firstChild ?? null;
    if (!textNode) throw new Error('expected a text node');
    expect(resolveActiveLineRect(selectionAt(textNode, 4), editorRoot)).toBe(paraRect);
  });

  it('returns undefined when the caret is inside the editor but in no paragraph', () => {
    const { editorRoot } = buildEditor();
    const bare = document.createElement('div');
    bare.textContent = 'chrome inside the editor root';
    editorRoot.appendChild(bare);
    // DOM's firstChild is typed as ChildNode | null, not undefined.
    // eslint-disable-next-line no-null/no-null
    const textNode = bare.firstChild ?? null;
    if (!textNode) throw new Error('expected a text node');
    expect(resolveActiveLineRect(selectionAt(textNode, 2), editorRoot)).toBeUndefined();
  });
});
