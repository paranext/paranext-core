// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { act, cleanup, render, screen } from '@testing-library/react';
import { CSSProperties } from 'react';
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { BASELINE_PROBE_ATTRIBUTE } from '../editor-dom.util';

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

/**
 * Puts the caret in `para`, defaulting to the first paragraph in the document — which is the only
 * paragraph in most of the fixtures here. A test with more than one paragraph passes the one it
 * means.
 */
const putCaretInParagraph = async (
  para: Element | undefined = document.querySelector('.para') ?? undefined,
) => {
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

/**
 * A bar with an icon, unlike the shared `overlayTree()` — the alignment needs something to measure.
 * Kept separate on purpose: giving the shared tree an icon would make the shared `stubRects` report
 * an incoherent baseline and break the tests above.
 */
const alignedOverlayTree = () => (
  <CharacterMarkerBarOverlay
    bar={
      <button type="button" aria-label="Character marker">
        <svg aria-hidden="true" />
      </button>
    }
  >
    <div className="editor-input usfm">
      <p className="para usfm_p">The LORD is my shepherd</p>
    </div>
  </CharacterMarkerBarOverlay>
);

/**
 * Coherent geometry for the alignment path: the probe (appended to the hidden off-editor measuring
 * element, never to the `.para` itself) sits `probeOffset` (default 14) px below the line's top
 * edge, and the trigger's 16px icon is centred 16px below the bar container's top edge. With the
 * default offset, the bar's baseline term is 14 - 16 = -2, so the bar sits 2px above the line's
 * top.
 *
 * `probeOffset` is a parameter (not hardcoded) so a test can vary the BASELINE the stub reports
 * while leaving `fontSize`/`lineHeight` (read via `getComputedStyle`, which this stub does not
 * touch) identical — the only way to prove the cache, rather than a coincidentally-stable stub
 * value, is what keeps the offset from being re-derived on every caret move.
 */
const stubAlignmentRects = (caretTop: number, probeOffset = 14) => {
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function stub(
    this: Element,
  ) {
    // The probe is checked FIRST: it is appended inside the hidden measuring element, so the `.para`
    // check below would not distinguish it.
    if (this.hasAttribute(BASELINE_PROBE_ATTRIBUTE))
      return new DOMRect(0, caretTop + probeOffset, 0, 0);
    if (this instanceof SVGElement) return new DOMRect(0, 8, 16, 16);
    const isPara = this instanceof HTMLElement && this.classList.contains('para');
    // The measuring element itself (the probe's container) also needs a coherent rect: its top is
    // the same line-top the paragraph reports, since it is styled with the paragraph's own metrics.
    const isMeasuringElement =
      this.getAttribute('aria-hidden') === 'true' && this.tagName === 'SPAN';
    return new DOMRect(0, isPara || isMeasuringElement ? caretTop : 0, 200, 20);
  });
};

/** The viewport top BOTH paragraphs in {@link twoParagraphOverlayTree} report. */
const TWO_PARAGRAPH_LINE_TOP = 200;

/**
 * Two paragraphs whose text metrics differ, so a test can move the caret between them and assert on
 * WHICH one the baseline was measured against. Modelled on a chapter opening: an `\mt1` major title
 * (`.formatted-font .usfm_mt1` is `font-size: 166%` in `_usj-nodes.scss`) above body text. The
 * metrics are inline styles so jsdom's `getComputedStyle` actually reports them.
 */
const twoParagraphOverlayTree = (firstStyle: CSSProperties, secondStyle: CSSProperties) => (
  <CharacterMarkerBarOverlay
    bar={
      <button type="button" aria-label="Character marker">
        <svg aria-hidden="true" />
      </button>
    }
  >
    <div className="editor-input usfm">
      <p className="para usfm_mt1" style={firstStyle}>
        Psalm 23
      </p>
      <p className="para usfm_p" style={secondStyle}>
        The LORD is my shepherd
      </p>
    </div>
  </CharacterMarkerBarOverlay>
);

/**
 * The baseline the stub below reports for a measuring element carrying these metrics.
 *
 * Depends on a SIZE metric and a non-size one on purpose: a cache keyed only on the obvious
 * `fontFamily`/`fontSize`/`lineHeight` trio would reuse an offset measured at a different
 * `font-weight`, so the weight term is what makes that failure observable.
 */
const stubbedBaselineFor = (style: CSSStyleDeclaration) =>
  Number.parseFloat(style.fontSize || '0') + (style.fontWeight === '700' ? 4 : 0);

/**
 * Geometry whose measured baseline DEPENDS ON WHICH PARAGRAPH'S METRICS were copied onto the hidden
 * measuring element (see {@link stubbedBaselineFor}). That is what lets a test tell "measured the
 * caret's paragraph" from "measured the first paragraph", which is invisible to
 * `stubAlignmentRects` — it reports one fixed baseline for every element.
 *
 * Both paragraphs report the SAME line top, so the caret's target position is identical in both;
 * the only thing that can move the bar is the metrics the baseline was measured under.
 *
 * @param iconHeight The trigger icon's height. Defaults to a normal 16px icon centred at 16; pass 0
 *   for the "container is laid out but the icon is not" case.
 */
const stubMetricsDependentRects = (iconHeight = 16) => {
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function stub(
    this: Element,
  ) {
    if (this.hasAttribute(BASELINE_PROBE_ATTRIBUTE)) {
      const container = this.parentElement;
      const baseline = container instanceof HTMLElement ? stubbedBaselineFor(container.style) : 0;
      return new DOMRect(0, TWO_PARAGRAPH_LINE_TOP + baseline, 0, 0);
    }
    if (this instanceof SVGElement) return new DOMRect(0, 8, 16, iconHeight);
    const isPara = this instanceof HTMLElement && this.classList.contains('para');
    const isMeasuringElement =
      this.getAttribute('aria-hidden') === 'true' && this.tagName === 'SPAN';
    return new DOMRect(0, isPara || isMeasuringElement ? TWO_PARAGRAPH_LINE_TOP : 0, 200, 20);
  });
};

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
    // Discoverability is the point of the feature: a bar that appears only after you click into the
    // text is not discoverable. stubRects reports 120 for any .para, so the first paragraph reads
    // as 120.
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

  it('offsets the bar so the trigger icon lines up with the line, not the line box top', () => {
    stubAlignmentRects(120);
    render(alignedOverlayTree());

    // 120 + (14 - 16) = 118. Without the alignment term this is a bare 120.
    expect(barContainer().style.top).toBe('118px');
  });

  it("measures the baseline against the caret's own paragraph, not the editor's first one", async () => {
    stubMetricsDependentRects();
    render(twoParagraphOverlayTree({ fontSize: '26px' }, { fontSize: '16px' }));
    const [heading, body] = Array.from(document.querySelectorAll('.para'));

    await putCaretInParagraph(heading);
    // 26px heading: the baseline sits 26px below the line top, the icon's centre 16px below the bar
    // container's top, so the alignment term is +10.
    expect(barContainer().style.top).toBe(`${TWO_PARAGRAPH_LINE_TOP + 10}px`);

    await putCaretInParagraph(body);
    // 16px body text: baseline 16 - icon centre 16 = 0. Measuring the editor's FIRST paragraph
    // (`\mt1`, 166% font-size on a real chapter opening) would keep the heading's +10 on every body
    // line — over half a line low, the same misalignment this alignment exists to fix.
    expect(barContainer().style.top).toBe(`${TWO_PARAGRAPH_LINE_TOP}px`);
  });

  it('re-measures when a metric outside the font-family/size/line-height trio changes', async () => {
    // Same font size in both paragraphs, differing only in weight — so the ONLY thing that can
    // invalidate the cached offset is `font-weight` being part of the cache key. It is copied onto
    // the measuring element, so leaving it out of the key reuses a baseline measured under a
    // different face.
    stubMetricsDependentRects();
    render(twoParagraphOverlayTree({ fontSize: '16px' }, { fontSize: '16px', fontWeight: '700' }));
    const [normal, bold] = Array.from(document.querySelectorAll('.para'));

    await putCaretInParagraph(normal);
    expect(barContainer().style.top).toBe(`${TWO_PARAGRAPH_LINE_TOP}px`);

    await putCaretInParagraph(bold);
    // Bold adds 4 to the stubbed baseline: 20 - 16 = +4.
    expect(barContainer().style.top).toBe(`${TWO_PARAGRAPH_LINE_TOP + 4}px`);
  });

  it('stores no alignment at all when the icon has no height, even inside a laid-out container', async () => {
    // A zero-height icon in a laid-out container is NOT a partial measurement to salvage: its
    // "centre" is just its top edge, and that garbage would be cached as the alignment term for the
    // life of the web view. Leaving the offset unset (bar top-aligned, retried next recompute) is
    // the correct outcome.
    stubMetricsDependentRects(0);
    render(twoParagraphOverlayTree({ fontSize: '16px' }, { fontSize: '16px' }));

    await putCaretInParagraph();

    expect(barContainer().style.top).toBe(`${TWO_PARAGRAPH_LINE_TOP}px`);
  });

  it('measures the alignment once and reuses it as the caret moves', async () => {
    stubAlignmentRects(120);
    render(alignedOverlayTree());
    expect(barContainer().style.top).toBe('118px');

    // A different line, AND a probe offset (20 instead of 14) that would yield a different baseline
    // term (20 - 16 = +4 instead of -2) if re-measured — while `fontSize`/`lineHeight` (read via
    // `getComputedStyle`, untouched by this stub) stay identical. This is what makes the test
    // falsifying: re-deriving the offset per move would land on 250 + 4 = 254px, not 248px. A stub
    // that reported the SAME baseline term at both caret positions would pass whether or not the
    // cache existed, since 248px would result either way.
    stubAlignmentRects(250, 20);
    await putCaretInParagraph();

    // Still -2 (118 - 120), not the +4 the new stub would produce if re-measured: proves the cached
    // offset was reused rather than re-derived. Re-probing on every keystroke would also mutate the
    // editor's DOM at typing rate, which is the cost the cache exists to avoid.
    expect(barContainer().style.top).toBe('248px');
  });

  it('leaves no baseline probe attached to the editor', () => {
    stubAlignmentRects(120);
    render(alignedOverlayTree());

    // A leaked probe is a zero-width invisible span that would accumulate one per measurement.
    expect(document.querySelector(`[${BASELINE_PROBE_ATTRIBUTE}]`)).toBeNull();
  });

  it("never mutates the editor's contenteditable while measuring the baseline", async () => {
    // Watched from `document.body`, not `.editor-input` directly: the editor element does not exist
    // until `render()` runs below, but the FIRST measurement happens synchronously inside that same
    // render (the mount effect calls `recompute()` before `render()` returns) — so attaching to
    // `.editor-input` only after render would already be too late to catch a regression in that
    // first measurement. RTL mounts its tree under `document.body`, so observing there from before
    // render captures every mutation for the whole test, and the assertion below narrows to
    // mutations inside the editor specifically.
    const records: MutationRecord[] = [];
    const observer = new MutationObserver((mutationList) => records.push(...mutationList));
    observer.observe(document.body, { childList: true, subtree: true });

    stubAlignmentRects(120);
    render(alignedOverlayTree());
    await putCaretInParagraph();

    // MutationObserver delivers its records as a microtask, not synchronously — flush one turn
    // before asserting.
    await act(async () => {
      await Promise.resolve();
    });
    observer.disconnect();

    const editorRoot = document.querySelector('.editor-input');
    const mutationsInsideEditor = records.filter(
      (record) => editorRoot === record.target || editorRoot?.contains(record.target),
    );

    // This is what pins the off-editor fix: appending (and removing) a probe span inside
    // `.editor-input` — i.e. a revert back to `measureBaselineOffset(para)` — would add two records
    // here (one for the append, one for the removal). Without this test, `stubAlignmentRects` gives
    // the measuring element the SAME rect the `.para` reports, so such a revert would leave every
    // other alignment test green.
    expect(mutationsInsideEditor).toHaveLength(0);
  });

  it('re-measures the alignment once a webfont finishes loading', async () => {
    // document.fonts is unimplemented in jsdom, so it must be stubbed with a minimal FontFaceSet-like
    // object for the overlay's `loadingdone` effect to subscribe to at all. Captures the listener the
    // same way `resizeCallbacks` captures the ResizeObserver callback above.
    const loadingDoneListeners: Array<() => void> = [];
    const stubFontFaceSet = {
      addEventListener: (eventName: string, listener: () => void) => {
        if (eventName === 'loadingdone') loadingDoneListeners.push(listener);
      },
      removeEventListener: (eventName: string, listener: () => void) => {
        if (eventName !== 'loadingdone') return;
        const index = loadingDoneListeners.indexOf(listener);
        if (index !== -1) loadingDoneListeners.splice(index, 1);
      },
    };
    Object.defineProperty(document, 'fonts', { value: stubFontFaceSet, configurable: true });

    try {
      stubAlignmentRects(120);
      render(alignedOverlayTree());
      await putCaretInParagraph();
      expect(barContainer().style.top).toBe('118px');

      // A different probe offset (30 instead of 14) at the SAME caret position: `caretTop` stays
      // 120, so the caret's own target position (resolved from the `.para` fallback, since jsdom's
      // Range never reports real client rects) does not move — only a genuine re-measurement of the
      // baseline would change the result.
      stubAlignmentRects(120, 30);
      act(() => {
        loadingDoneListeners.forEach((listener) => listener());
      });

      // 30 - 16 = 14, so 120 + 14 = 134. Staying at 118px would mean the webfont-load signal never
      // invalidated the cache.
      expect(barContainer().style.top).toBe('134px');
    } finally {
      // Deletes the stub rather than leaving it in place for later tests in this file, since
      // `document` is shared across tests and `afterEach`'s `vi.restoreAllMocks()` does not undo a
      // plain property assignment. `Reflect.deleteProperty` avoids a type assertion just to satisfy
      // `delete`'s "must be optional" requirement on a property (`fonts`) that `lib.dom.d.ts` types
      // as required.
      Reflect.deleteProperty(document, 'fonts');
    }
  });

  it('applies the alignment on the way back from hidden, having cached nothing while hidden', async () => {
    // Mounting hidden never reaches the measurement at all: `recompute`'s visibility guard returns
    // before any rect is read (see the sibling `rectReadCount === 0` assertion in the hidden-view
    // tests above), so nothing is cached while hidden and the measurement happens for the
    // first time on the visibility flip instead — if it had cached a stale 0 here, the bar would stay
    // top-aligned for the life of the web view. (`measureBaselineOffset`'s own `undefined`-not-`0`
    // contract for the no-layout case is covered by its unit tests in `editor-dom.util.test.ts`, not
    // here.)
    mockVisibility.isVisible = false;
    stubAlignmentRects(120);
    const { rerender } = render(alignedOverlayTree());

    mockVisibility.isVisible = true;
    await act(async () => {
      rerender(alignedOverlayTree());
    });

    expect(barContainer().style.top).toBe('118px');
  });
});
