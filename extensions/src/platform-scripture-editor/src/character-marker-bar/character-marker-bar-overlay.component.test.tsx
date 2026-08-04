// @vitest-environment jsdom

import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
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
    // A plain object literal satisfies every field DOMRect callers read; casting avoids
    // implementing the full DOMRect prototype for a test stub.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return {
      top,
      bottom: top + 20,
      left: 0,
      right: 200,
      width: 200,
      height: 20,
      x: 0,
      y: top,
      toJSON: () => ({}),
    } as DOMRect;
  });
};

const renderOverlay = () =>
  render(
    <CharacterMarkerBarOverlay bar={<button type="button">bd</button>}>
      <div className="editor-input usfm">
        <p className="para usfm_p">The LORD is my shepherd</p>
      </div>
    </CharacterMarkerBarOverlay>,
  );

const putCaretInParagraph = () => {
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
};

const barContainer = () => screen.getByTestId('character-marker-bar-container');

beforeEach(() => {
  mockVisibility.isVisible = true;
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

  it('repositions the bar to the active line on a selection change', () => {
    renderOverlay();
    putCaretInParagraph();
    expect(barContainer().style.top).toBe('120px');
  });

  it('holds the last position when the selection moves outside the editor', () => {
    renderOverlay();
    putCaretInParagraph();
    expect(barContainer().style.top).toBe('120px');

    // Opening the popover moves focus into Radix content, which reports a selection outside the
    // editor. The bar must not jump back to the top of the editor.
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

    expect(barContainer().style.top).toBe('120px');
  });

  it('reads no geometry while hidden, and catches up on becoming visible', () => {
    mockVisibility.isVisible = false;
    const { rerender } = renderOverlay();

    stubRects(300);
    putCaretInParagraph();
    // The rule: a display:none iframe has no layout, so measuring it would store a garbage top.
    expect(rectReadCount).toBe(0);

    mockVisibility.isVisible = true;
    rerender(
      <CharacterMarkerBarOverlay bar={<button type="button">bd</button>}>
        <div className="editor-input usfm">
          <p className="para usfm_p">The LORD is my shepherd</p>
        </div>
      </CharacterMarkerBarOverlay>,
    );

    // The deferred change is consumed exactly once, at the position current on activation — no
    // stale flash.
    expect(rectReadCount).toBeGreaterThan(0);
    expect(barContainer().style.top).toBe('300px');
  });

  it('anchors to the first paragraph before the user has placed a caret', () => {
    // Discoverability is the point of the feature ("Need floating context menu UI to pick
    // character styles"); a bar that appears only after you click into the text is not
    // discoverable. stubRects reports 120 for any .para, so the first paragraph reads as 120.
    renderOverlay();
    expect(barContainer().style.top).toBe('120px');
  });

  it('repositions when the editor resizes', () => {
    renderOverlay();
    putCaretInParagraph();

    stubRects(220);
    act(() => {
      // The mock's callback body ignores its arguments entirely, so an empty object stands in
      // for the observer instance without implementing the full ResizeObserver interface.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      resizeCallbacks.forEach((callback) => callback([], {} as ResizeObserver));
    });

    expect(barContainer().style.top).toBe('220px');
  });
});
