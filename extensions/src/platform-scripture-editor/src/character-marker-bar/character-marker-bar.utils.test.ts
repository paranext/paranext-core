// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from 'vitest';
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

  it('shifts the top down by the baseline offset', () => {
    // Line box at 100, 18px tall; anchor and scroll container both at viewport 0. A +13px baseline
    // offset lands the bar at 113.
    expect(computeBarTop(makeRect(100, 118), makeEl(0, 800), makeEl(0, 800), 13)).toBe(113);
  });

  it('treats a missing baseline offset as zero', () => {
    // The offset is unmeasurable until the view has layout, so the bar must anchor to the line box's
    // top edge in the meantime rather than to an unknown baseline.
    expect(computeBarTop(makeRect(100, 118), makeEl(0, 800), makeEl(0, 800))).toBe(100);
  });

  it('clamps a baseline offset larger than the line box to just above the line bottom', () => {
    // A pathological offset must not push the bar below its own line. `clampTopToVisibleArea`'s
    // existing lower bound (`bottom - 1` = 117) already does this, so the offset inherits that guard
    // for free — this test pins that it stays true rather than adding a second clamp.
    expect(computeBarTop(makeRect(100, 118), makeEl(0, 800), makeEl(0, 800), 999)).toBe(117);
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

  /** The element's first child — the text node every fixture here puts the caret in. */
  const firstChildOf = (element: Element): Node => {
    const { firstChild } = element;
    if (!firstChild) throw new Error('expected a text node');
    return firstChild;
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
    const textNode = firstChildOf(outside);
    expect(resolveActiveLineRect(selectionAt(textNode, 3), editorRoot)).toBeUndefined();
  });

  // Restores the caret-rect spy the line-level test installs, so the degenerate-fallback tests keep
  // seeing the spec-compliant all-zero rect above.
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the caret line rect, NOT the paragraph rect, when the caret has layout', () => {
    // The reason this component exists: within a paragraph that wraps over many lines, the bar must
    // track the caret's LINE. jsdom never produces a non-degenerate Range rect on its own, so every
    // other test in this file exercises only the fallback — without this one, returning
    // `para.getBoundingClientRect()` unconditionally would pass the whole suite.
    const { editorRoot, para } = buildEditor();
    const caretRect = makeRect(90, 108, 30);
    const paraRect = makeRect(42, 200);
    para.getBoundingClientRect = () => paraRect;
    vi.spyOn(Range.prototype, 'getBoundingClientRect').mockReturnValue(caretRect);
    const textNode = firstChildOf(para);

    // Identity, not field equality: `toBe` cannot pass by coincidence of matching numbers.
    expect(resolveActiveLineRect(selectionAt(textNode, 4), editorRoot)?.rect).toBe(caretRect);
  });

  it('returns the paragraph the caret is in, not the first paragraph in the editor', () => {
    // The caller measures font metrics against this element. A chapter opens with an `\mt1` heading
    // at 166% font-size, so handing back the editor's FIRST paragraph would make the caller measure a
    // heading's baseline and mis-align the bar on every body line.
    const { editorRoot, para: heading } = buildEditor();
    heading.className = 'para usfm_mt1';
    const body = document.createElement('p');
    body.className = 'para usfm_p';
    body.textContent = 'I shall not want';
    editorRoot.appendChild(body);
    const textNode = firstChildOf(body);

    // Identity: it must be the very element the caret is in, not merely one that looks like it.
    expect(resolveActiveLineRect(selectionAt(textNode, 2), editorRoot)?.para).toBe(body);
  });

  it('falls back to the containing paragraph rect when the caret rect is degenerate', () => {
    // jsdom reports all-zero rects for ranges, which is exactly the degenerate case the fallback
    // exists for — so this asserts the fallback fires and returns the paragraph's own rect object.
    const { editorRoot, para } = buildEditor();
    const paraRect = makeRect(42, 60);
    para.getBoundingClientRect = () => paraRect;
    const textNode = firstChildOf(para);
    expect(resolveActiveLineRect(selectionAt(textNode, 4), editorRoot)?.rect).toBe(paraRect);
  });

  it('returns undefined when the caret is on the editor root between blocks', () => {
    const { editorRoot } = buildEditor();
    expect(resolveActiveLineRect(selectionAt(editorRoot, 0), editorRoot)).toBeUndefined();
  });

  it('resolves an implied paragraph — a classless top-level block — as the active line', () => {
    // Verses outside any paragraph marker render as a bare `<p>` with no USFM class.
    const { editorRoot } = buildEditor();
    const impliedPara = document.createElement('p');
    impliedPara.textContent = 'this has text';
    editorRoot.appendChild(impliedPara);
    const textNode = firstChildOf(impliedPara);

    expect(resolveActiveLineRect(selectionAt(textNode, 2), editorRoot)?.para).toBe(impliedPara);
  });

  it('resolves the \\id line as the active line', () => {
    const { editorRoot } = buildEditor();
    const bookLine = document.createElement('p');
    bookLine.className = 'book usfm_id';
    bookLine.textContent = 'JDT';
    editorRoot.prepend(bookLine);
    const textNode = firstChildOf(bookLine);

    expect(resolveActiveLineRect(selectionAt(textNode, 2), editorRoot)?.para).toBe(bookLine);
  });

  it('resolves the top-level block, not an inner element, for a caret inside a character marker', () => {
    const { editorRoot, para } = buildEditor();
    para.textContent = 'a ';
    const characterMarker = document.createElement('span');
    characterMarker.className = 'char usfm_nd';
    characterMarker.textContent = 'Lord';
    para.appendChild(characterMarker);
    const textNode = firstChildOf(characterMarker);

    expect(resolveActiveLineRect(selectionAt(textNode, 2), editorRoot)?.para).toBe(para);
  });
});
