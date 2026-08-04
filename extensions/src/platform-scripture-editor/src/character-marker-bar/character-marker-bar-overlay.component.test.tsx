// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { act, cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

// jsdom ships no ResizeObserver; the overlay observes the editor so a panel resize repositions it.
const resizeCallbacks: ResizeObserverCallback[] = [];
class MockResizeObserver implements ResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    resizeCallbacks.push(callback);
  }

  // The ResizeObserver interface requires this method; this mock is a no-op stub that needs no
  // instance state to fulfill it.
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  observe() {}

  // The ResizeObserver interface requires this method; this mock is a no-op stub that needs no
  // instance state to fulfill it.
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  unobserve() {}

  // The ResizeObserver interface requires this method; this mock is a no-op stub that needs no
  // instance state to fulfill it.
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  disconnect() {}
}

beforeAll(() => {
  globalThis.ResizeObserver = MockResizeObserver;
});

// jsdom (26.x) does not implement Range.prototype.getBoundingClientRect at all — it's undefined,
// not a zero-filled DOMRect. Per the CSSOM View spec, a real browser returns an all-zero DOMRect
// for a Range with no client rects (exactly the degenerate case resolveActiveLineRect falls back
// for), so this polyfills only that spec-compliant zero shape — not a faked non-zero rect — to let
// jsdom exercise the same path a real browser would. Mirrors character-marker-bar.utils.test.ts.
// A real `DOMRect` (constructible in this repo's jsdom) satisfies the type exactly, so no cast is
// needed.
if (!Range.prototype.getBoundingClientRect) {
  Range.prototype.getBoundingClientRect = () => new DOMRect(0, 0, 0, 0);
}

// Mutable so one test can mount hidden and then flip to visible, which is the whole point.
const mockVisibility = { isVisible: true };
vi.mock('platform-bible-react', () => ({
  useViewVisibility: () => mockVisibility.isVisible,
  Z_INDEX_OVERLAY: 400,
}));

// Imported after the mock so the component picks up the mocked hook.
// eslint-disable-next-line import/first
import { CharacterMarkerBarOverlay } from './character-marker-bar-overlay.component';

/**
 * Stubs the geometry the overlay reads, counting reads so a test can assert that NOTHING is
 * measured while the view is hidden.
 */
let rectReadCount = 0;
const stubRects = (caretTop: number) => {
  rectReadCount = 0;
  // vi.spyOn rather than direct assignment so afterEach's vi.restoreAllMocks() actually restores
  // jsdom's own implementation — a bare assignment would leak the stub for the rest of the file.
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function stub(
    this: Element,
  ) {
    rectReadCount += 1;
    const isPara = this instanceof HTMLElement && this.classList.contains('para');
    const top = isPara ? caretTop : 0;
    // A real DOMRect (left, top, width, height) satisfies every field callers read with no cast.
    return new DOMRect(0, top, 200, 20);
  });
};

// A factory, not a shared element: React bails out of re-rendering a subtree when the new element
// is referentially identical to the previous one, so a `rerender` with the same element would skip
// the render entirely — and with it the visibility flip the hidden-view tests depend on.
const overlayTree = () => (
  <CharacterMarkerBarOverlay bar={<button type="button">bd</button>}>
    <div className="editor-input usfm">
      <p className="para usfm_p">The LORD is my shepherd</p>
    </div>
  </CharacterMarkerBarOverlay>
);

const renderOverlay = () => render(overlayTree());

/**
 * Waits out one animation frame, since the overlay coalesces selection changes (which a drag fires
 * at mousemove rate) into at most one measurement per frame.
 */
const flushAnimationFrame = async () => {
  await act(async () => {
    await new Promise((resolve) => {
      requestAnimationFrame(() => resolve(undefined));
    });
  });
};

const putCaretInParagraph = async () => {
  const para = document.querySelector('.para');
  if (!para?.firstChild) throw new Error('expected a paragraph text node');
  const selection = window.getSelection();
  if (!selection) throw new Error('jsdom provided no Selection');
  const range = document.createRange();
  range.setStart(para.firstChild, 4);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  act(() => {
    document.dispatchEvent(new Event('selectionchange'));
  });
  await flushAnimationFrame();
};

const barContainer = () => screen.getByTestId('character-marker-bar-container');

// The overlay's resize callback ignores both ResizeObserverCallback arguments (it only calls
// recompute()), so a minimal object satisfying the ResizeObserver interface stands in for the
// real observer without a cast or a second MockResizeObserver instance (which would register an
// unwanted extra entry in resizeCallbacks).
const stubResizeObserverInstance: ResizeObserver = {
  observe: () => {},
  unobserve: () => {},
  disconnect: () => {},
};

beforeEach(() => {
  mockVisibility.isVisible = true;
  // Each overlay's MockResizeObserver pushes a callback here and nothing removes it on unmount, so
  // without this the resize test would also invoke callbacks closed over by EARLIER tests' unmounted
  // overlays.
  resizeCallbacks.length = 0;
  stubRects(120);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('CharacterMarkerBarOverlay', () => {
  it('renders both the editor children and the bar slot', () => {
    renderOverlay();
    expect(screen.getByText('The LORD is my shepherd')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'bd' })).toBeInTheDocument();
  });

  it('pins the bar to the inline-end edge rather than computing a horizontal offset', () => {
    renderOverlay();
    // Horizontal placement is CSS logical, so RTL mirrors with no math. Asserting the inline
    // property (not `right`) is what pins that decision down.
    expect(barContainer().style.insetInlineEnd).toBe('0px');
  });

  it('constrains the bar container to the reserved gutter width instead of shrink-wrapping', () => {
    renderOverlay();
    // A shrink-wrapped container grows inline-START, i.e. over project text, as soon as a localized
    // `(mixed)`/`(none)` is wider than English. Taking the width from the same custom property that
    // reserves the space is what makes "never overlaps text" structural.
    expect(barContainer().style.width).toBe('var(--psc-character-marker-bar-width)');
  });

  it('repositions the bar to the active line on a selection change', async () => {
    renderOverlay();
    // Re-stub to a DIFFERENT value than the mount-time anchor position (120) before the caret moves.
    // Keeping 120 here would let this test pass with the selection wiring deleted, since the
    // anchor-to-first-paragraph pass on mount already reports 120.
    stubRects(250);
    await putCaretInParagraph();
    expect(barContainer().style.top).toBe('250px');
  });

  it('holds the last position when the selection moves outside the editor', async () => {
    renderOverlay();
    await putCaretInParagraph();
    expect(barContainer().style.top).toBe('120px');

    // Opening the popover moves focus into Radix content, which reports a selection outside the
    // editor. The bar must not jump back to the top of the editor.
    //
    // Change the stubbed geometry here so "hold last position" and "anchor to first paragraph"
    // produce different results: the single .para in the fixture would report this new value too,
    // so an assertion that kept the caret-in-paragraph stub value (120) would pass even if the
    // component fell through to the anchor-first branch instead of holding.
    stubRects(999);
    const outside = document.createElement('p');
    outside.textContent = 'popover content';
    document.body.appendChild(outside);
    if (!outside.firstChild) throw new Error('expected a text node');
    const selection = window.getSelection();
    if (!selection) throw new Error('jsdom provided no Selection');
    const range = document.createRange();
    range.setStart(outside.firstChild, 2);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
    act(() => {
      document.dispatchEvent(new Event('selectionchange'));
    });
    await flushAnimationFrame();

    // Still 120, not 999: proves the bar HELD its last position rather than falling through to
    // the anchor-first-paragraph branch and re-reading the (now different) paragraph rect.
    expect(barContainer().style.top).toBe('120px');
  });

  it('reads no geometry while hidden, and catches up on becoming visible', async () => {
    mockVisibility.isVisible = false;
    const { rerender } = renderOverlay();

    stubRects(300);
    await putCaretInParagraph();
    // The rule: a display:none iframe has no layout, so measuring it would store a garbage top.
    expect(rectReadCount).toBe(0);

    mockVisibility.isVisible = true;
    rerender(overlayTree());

    // The deferred change is consumed at the position current on activation — no stale flash. With
    // `recompute` identity-stable, the layout-effect catch-up is the ONLY thing that can produce
    // this, so the assertion genuinely covers it.
    expect(rectReadCount).toBeGreaterThan(0);
    expect(barContainer().style.top).toBe('300px');
  });

  it('collapses many changes while hidden into exactly one catch-up recompute', async () => {
    // Baseline: what one recompute costs in rect reads, measured while visible — so the assertion
    // below reads "exactly one recompute" rather than hardcoding a read count that an unrelated
    // refactor of the measurement would silently invalidate.
    renderOverlay();
    stubRects(120);
    await putCaretInParagraph();
    const readsPerRecompute = rectReadCount;
    expect(readsPerRecompute).toBeGreaterThan(0);
    cleanup();
    resizeCallbacks.length = 0;

    mockVisibility.isVisible = false;
    const { rerender } = renderOverlay();

    stubRects(300);
    // Three separate caret moves, each given its own frame, so each one reaches `recompute` and is
    // deferred individually — the collapse must come from the single pending flag, not from the rAF
    // throttle.
    await putCaretInParagraph();
    await putCaretInParagraph();
    await putCaretInParagraph();
    expect(rectReadCount).toBe(0);

    mockVisibility.isVisible = true;
    rerender(overlayTree());

    // One catch-up, not three: only the latest position matters, and re-measuring per deferred
    // change would multiply layout work at the moment the tab is activated.
    expect(rectReadCount).toBe(readsPerRecompute);
    expect(barContainer().style.top).toBe('300px');
  });

  it('anchors to the first paragraph before the user has placed a caret', () => {
    // Discoverability is the point of the feature ("Need floating context menu UI to pick
    // character styles"); a bar that appears only after you click into the text is not
    // discoverable. stubRects reports 120 for any .para, so the first paragraph reads as 120.
    renderOverlay();
    expect(barContainer().style.top).toBe('120px');
  });

  it('repositions when the editor resizes', async () => {
    renderOverlay();
    await putCaretInParagraph();

    stubRects(220);
    act(() => {
      resizeCallbacks.forEach((callback) => callback([], stubResizeObserverInstance));
    });

    expect(barContainer().style.top).toBe('220px');
  });
});
