// @vitest-environment jsdom

/**
 * Tests for the scroll utilities in editor-dom.util.ts.
 *
 * Regression context (2026-07-09): `.editor-container` styles suggest it scrolls (`overflow-y:
 * auto`), but unconstrained wrapper divs let it grow to its content height, so the web view's outer
 * wrapper is what actually scrolls. Scroll code must discover the real scroll container instead of
 * assuming `.editor-container`.
 *
 * Jsdom has no layout engine, so geometry (scrollHeight/clientHeight/scrollTop/rects) is stubbed
 * per element. `overflow-y` is set via inline styles, which jsdom's getComputedStyle reflects.
 */

import { afterEach, beforeAll, describe, expect, it, vi, Mock } from 'vitest';
import {
  BASELINE_PROBE_ATTRIBUTE,
  clampTopToVisibleArea,
  createPendingCommentAnchorSource,
  findScrollContainer,
  hasNewScrollTarget,
  isEchoOfPublishedScrRef,
  leftEdgeRect,
  measureAnnotation,
  measureBaselineOffset,
  measureRange,
  paraAtPoint,
  scrollToAnnotation,
  scrollToVerse,
} from './editor-dom.util';

vi.mock('@papi/frontend', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

// jsdom doesn't provide CSS.escape; polyfill for tests (same approach as
// src/renderer/services/overlays/overlay-coordinates.test.ts). scrollToAnnotation escapes the
// annotation class token before querySelector, so the tests need CSS.escape to exist.
// eslint-disable-next-line no-type-assertion/no-type-assertion
const cssPolyfill = {
  escape: (value: string) => value.replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, '\\$&'),
} as typeof CSS;

beforeAll(() => {
  if (typeof CSS === 'undefined' || !CSS.escape) {
    globalThis.CSS = cssPolyfill;
  }
  // jsdom has no layout engine and doesn't implement elementFromPoint at all; stub it so paraAtPoint
  // tests below have a real function to vi.spyOn (spyOn requires the property to already exist).
  if (!document.elementFromPoint) {
    // Matches the real API's nullable return type.
    // eslint-disable-next-line no-null/no-null
    document.elementFromPoint = () => null;
  }
});

interface GeometryOptions {
  scrollHeight: number;
  clientHeight: number;
  scrollTop?: number;
}

/** Stub the scroll geometry jsdom cannot compute. Returns the element's scrollTo spy. */
function stubGeometry(
  element: HTMLElement,
  { scrollHeight, clientHeight, scrollTop = 0 }: GeometryOptions,
): Mock {
  Object.defineProperty(element, 'scrollHeight', { value: scrollHeight, configurable: true });
  Object.defineProperty(element, 'clientHeight', { value: clientHeight, configurable: true });
  let currentScrollTop = scrollTop;
  Object.defineProperty(element, 'scrollTop', {
    get: () => currentScrollTop,
    set: (value: number) => {
      currentScrollTop = value;
    },
    configurable: true,
  });
  const scrollToSpy = vi.fn();
  Object.defineProperty(element, 'scrollTo', { value: scrollToSpy, configurable: true });
  return scrollToSpy;
}

/** Stub an element's viewport-relative rect (only `top` and `height` matter to the utils). */
function stubRect(element: HTMLElement, top: number, height: number): void {
  Object.defineProperty(element, 'getBoundingClientRect', {
    value: () => new DOMRect(0, top, 100, height),
    configurable: true,
  });
}

interface EditorDomOptions {
  /** Whether `.editor-container` actually overflows (the intended, pre-regression layout) */
  editorContainerScrolls?: boolean;
  /** Whether the outer wrapper actually overflows (today's real layout) */
  wrapperScrolls?: boolean;
  /** Verse numbers to render as `span[data-marker="v"]` markers */
  verseNumbers?: number[];
  /** Viewport-relative top of each verse span, keyed by verse number (default 1500) */
  verseTops?: Record<number, number>;
}

interface EditorDom {
  wrapper: HTMLElement;
  editorContainer: HTMLElement;
  wrapperScrollTo: Mock;
  editorContainerScrollTo: Mock;
}

const CONTENT_HEIGHT = 3000;
const VIEWPORT_HEIGHT = 900;

/**
 * Build the essential DOM shape of the editor web view:
 *
 *     wrapper (tw:overflow-auto)            <- scrolls in today's layout
 *       passthrough (plain div)             <- the unconstrained wrapper that broke the chain
 *         .editor-container (overflow-y)    <- styled to scroll, but grown to content height
 *           <p> <span data-marker="v"/> ... </p>
 */
function buildEditorDom({
  editorContainerScrolls = false,
  wrapperScrolls = true,
  verseNumbers = [15],
  verseTops = {},
}: EditorDomOptions = {}): EditorDom {
  const wrapper = document.createElement('div');
  wrapper.style.overflowY = 'auto';
  const wrapperScrollTo = stubGeometry(wrapper, {
    scrollHeight: CONTENT_HEIGHT,
    clientHeight: wrapperScrolls ? VIEWPORT_HEIGHT : CONTENT_HEIGHT,
  });
  stubRect(wrapper, 0, wrapperScrolls ? VIEWPORT_HEIGHT : CONTENT_HEIGHT);

  const passthrough = document.createElement('div');

  const editorContainer = document.createElement('div');
  editorContainer.className = 'editor-container';
  editorContainer.style.overflowY = 'auto';
  const editorContainerScrollTo = stubGeometry(editorContainer, {
    scrollHeight: CONTENT_HEIGHT,
    clientHeight: editorContainerScrolls ? VIEWPORT_HEIGHT : CONTENT_HEIGHT,
  });
  stubRect(editorContainer, 0, editorContainerScrolls ? VIEWPORT_HEIGHT : CONTENT_HEIGHT);

  const paragraph = document.createElement('p');
  verseNumbers.forEach((verseNumber) => {
    const verse = document.createElement('span');
    verse.setAttribute('data-marker', 'v');
    verse.setAttribute('data-number', `${verseNumber}`);
    stubRect(verse, verseTops[verseNumber] ?? 1500, 20);
    paragraph.append(verse);
  });

  editorContainer.append(paragraph);
  passthrough.append(editorContainer);
  wrapper.append(passthrough);
  document.body.append(wrapper);

  return { wrapper, editorContainer, wrapperScrollTo, editorContainerScrollTo };
}

function buildAnnotationDom(options: EditorDomOptions = {}): EditorDom & {
  annotation: HTMLElement;
} {
  const dom = buildEditorDom({ ...options, verseNumbers: [] });
  const annotation = document.createElement('span');
  annotation.className = 'annotationId-thread1';
  stubRect(annotation, 1500, 20);
  dom.editorContainer.append(annotation);
  return { ...dom, annotation };
}

afterEach(() => {
  document.body.innerHTML = '';
  vi.clearAllMocks();
});

describe('findScrollContainer', () => {
  it('returns the nearest ancestor that is styled scrollable AND actually overflows', () => {
    const { wrapper, editorContainer } = buildEditorDom();
    const verse = editorContainer.querySelector<HTMLElement>('span[data-marker="v"]');
    if (!verse) throw new Error('test setup failed: no verse span');

    // .editor-container is styled overflow-y: auto but does not overflow -> skipped
    expect(findScrollContainer(verse)).toBe(wrapper);
  });

  it('prefers .editor-container when it genuinely overflows (restored-layout world)', () => {
    const { editorContainer } = buildEditorDom({ editorContainerScrolls: true });
    const verse = editorContainer.querySelector<HTMLElement>('span[data-marker="v"]');
    if (!verse) throw new Error('test setup failed: no verse span');

    expect(findScrollContainer(verse)).toBe(editorContainer);
  });

  it('returns undefined when nothing scrollable exists', () => {
    const { editorContainer } = buildEditorDom({ wrapperScrolls: false });
    const verse = editorContainer.querySelector<HTMLElement>('span[data-marker="v"]');
    if (!verse) throw new Error('test setup failed: no verse span');

    expect(findScrollContainer(verse)).toBeUndefined();
  });

  it('finds an overflowing ancestor styled overflow-y: scroll (not just auto)', () => {
    const { wrapper, editorContainer } = buildEditorDom();
    wrapper.style.overflowY = 'scroll';
    const verse = editorContainer.querySelector<HTMLElement>('span[data-marker="v"]');
    if (!verse) throw new Error('test setup failed: no verse span');

    expect(findScrollContainer(verse)).toBe(wrapper);
  });

  it('returns the starting element itself when it already qualifies', () => {
    const { wrapper } = buildEditorDom();

    expect(findScrollContainer(wrapper)).toBe(wrapper);
  });

  it('matches a styled-scrollable ancestor that does not overflow when requireOverflow is false', () => {
    const { editorContainer } = buildEditorDom();
    const verse = editorContainer.querySelector<HTMLElement>('span[data-marker="v"]');
    if (!verse) throw new Error('test setup failed: no verse span');

    // .editor-container is styled overflow-y: auto but does not overflow -> still matches
    expect(findScrollContainer(verse, { requireOverflow: false })).toBe(editorContainer);
  });

  it('returns undefined when nothing is even styled scrollable and requireOverflow is false', () => {
    const orphan = document.createElement('div');
    const child = document.createElement('span');
    orphan.append(child);
    document.body.append(orphan);

    expect(findScrollContainer(child, { requireOverflow: false })).toBeUndefined();
  });
});

describe('scrollToVerse', () => {
  it('REGRESSION: scrolls the element that actually scrolls, not .editor-container', () => {
    // Mirrors the shipped bug: .editor-container styled scrollable but grown to content height.
    const { wrapperScrollTo, editorContainerScrollTo } = buildEditorDom();

    const verseElement = scrollToVerse({ book: 'OBA', chapterNum: 1, verseNum: 15 });

    expect(verseElement).toBeDefined();
    expect(editorContainerScrollTo).not.toHaveBeenCalled();
    expect(wrapperScrollTo).toHaveBeenCalledWith({
      behavior: 'smooth',
      // scrollTop (0) + verseRect.top (1500) - containerRect.top (0) - offset (80)
      top: 1420,
    });
  });

  it('accounts for the container already being scrolled', () => {
    const { wrapper, wrapperScrollTo } = buildEditorDom({ verseTops: { 15: 300 } });
    wrapper.scrollTop = 1200;

    scrollToVerse({ book: 'OBA', chapterNum: 1, verseNum: 15 });

    // scrollTop (1200) + verseRect.top (300) - containerRect.top (0) - offset (80)
    expect(wrapperScrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 1420 });
  });

  it('subtracts the scroll container top offset when the container is not at the viewport top', () => {
    const { wrapper, wrapperScrollTo } = buildEditorDom();
    // The scroll container sits 100px below the viewport top (e.g. below the app toolbar/tab bar),
    // so the container-top term in getTopWithinScrollContainer is load-bearing here (unlike the
    // other cases where the container rect top is 0).
    stubRect(wrapper, 100, VIEWPORT_HEIGHT);

    scrollToVerse({ book: 'OBA', chapterNum: 1, verseNum: 15 });

    // scrollTop (0) + verseRect.top (1500) - containerRect.top (100) - offset (80) = 1320
    expect(wrapperScrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 1320 });
  });

  it('scrolls .editor-container when it is the real scroll container', () => {
    const { wrapperScrollTo, editorContainerScrollTo } = buildEditorDom({
      editorContainerScrolls: true,
    });

    scrollToVerse({ book: 'OBA', chapterNum: 1, verseNum: 15 });

    expect(wrapperScrollTo).not.toHaveBeenCalled();
    expect(editorContainerScrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 1420 });
  });

  it('scrolls to the top for a chapter-start reference with no verse marker', () => {
    const { wrapperScrollTo } = buildEditorDom({ verseNumbers: [] });

    const verseElement = scrollToVerse({ book: 'OBA', chapterNum: 1, verseNum: 0 });

    expect(verseElement).toBeUndefined();
    expect(wrapperScrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 0 });
  });

  it('does not scroll and returns undefined when the verse marker is missing (verseNum > 1)', () => {
    const { wrapperScrollTo, editorContainerScrollTo } = buildEditorDom({ verseNumbers: [3] });

    const verseElement = scrollToVerse({ book: 'OBA', chapterNum: 1, verseNum: 15 });

    expect(verseElement).toBeUndefined();
    expect(wrapperScrollTo).not.toHaveBeenCalled();
    expect(editorContainerScrollTo).not.toHaveBeenCalled();
  });

  it('does nothing (without throwing) when no scrollable ancestor exists', () => {
    const { wrapperScrollTo, editorContainerScrollTo } = buildEditorDom({ wrapperScrolls: false });

    const verseElement = scrollToVerse({ book: 'OBA', chapterNum: 1, verseNum: 15 });

    expect(verseElement).toBeDefined();
    expect(wrapperScrollTo).not.toHaveBeenCalled();
    expect(editorContainerScrollTo).not.toHaveBeenCalled();
  });
});

describe('scrollToAnnotation', () => {
  it('does not scroll when the annotation is already fully visible', () => {
    const { annotation, wrapperScrollTo } = buildAnnotationDom();
    stubRect(annotation, 400, 20); // within [0, 900) viewport band, scrollTop 0

    const annotationElement = scrollToAnnotation('thread1');

    expect(annotationElement).toBe(annotation);
    expect(wrapperScrollTo).not.toHaveBeenCalled();
  });

  it('aligns to the bottom edge when the annotation is below the viewport (closer edge)', () => {
    const { wrapperScrollTo } = buildAnnotationDom(); // annotation rect top 1500, height 20

    scrollToAnnotation('thread1');

    // annotationTop = 0 + 1500 - 0 = 1500; bottom = 1520
    // distanceToTop = 1500, distanceToBottom = |0 + 900 - 1520| = 620 -> bottom edge
    // targetTop = 1520 - 900 + 80 = 700
    expect(wrapperScrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 700 });
  });

  it('aligns to the top edge when the annotation is above the viewport (closer edge)', () => {
    const { wrapper, annotation, wrapperScrollTo } = buildAnnotationDom();
    wrapper.scrollTop = 2000;
    stubRect(annotation, -1500, 20);

    scrollToAnnotation('thread1');

    // annotationTop = 2000 + (-1500) - 0 = 500 -> above viewport [2000, 2900)
    // distanceToTop = 1500, distanceToBottom = 2380 -> top edge; targetTop = 500 - 80 = 420
    expect(wrapperScrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 420 });
  });

  it('clamps the target to the valid scroll range', () => {
    const { annotation, wrapperScrollTo } = buildAnnotationDom();
    stubRect(annotation, 2990, 20); // annotationTop 2990, bottom 3010 (content is 3000 tall)

    scrollToAnnotation('thread1');

    // bottom-edge target = 3010 - 900 + 80 = 2190 > maxScrollTop (3000 - 900 = 2100) -> clamp
    expect(wrapperScrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 2100 });
  });

  it('clamps a negative top-aligned target up to 0', () => {
    const { wrapper, annotation, wrapperScrollTo } = buildAnnotationDom();
    wrapper.scrollTop = 100;
    stubRect(annotation, -70, 20);

    scrollToAnnotation('thread1');

    // annotationTop = 100 + (-70) - 0 = 30, above viewport [100, 1000) -> top edge
    // top-aligned target = 30 - 80 = -50 -> clamped up to 0
    expect(wrapperScrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 0 });
  });

  it('escapes CSS-special characters in the annotation id (a raw id would throw a SyntaxError)', () => {
    const dom = buildEditorDom({ verseNumbers: [] });
    const annotation = document.createElement('span');
    // Real annotation/comment ids can contain ':'; the applied class is `annotationId-<id>`.
    annotation.className = 'annotationId-thread:1';
    stubRect(annotation, 400, 20); // fully visible -> resolves the element, no scroll
    dom.editorContainer.append(annotation);

    // Without CSS.escape, `.annotationId-thread:1` is an invalid selector and querySelector throws.
    const annotationElement = scrollToAnnotation('thread:1');

    expect(annotationElement).toBe(annotation);
    expect(dom.wrapperScrollTo).not.toHaveBeenCalled();
  });

  it('returns undefined and does not scroll when the annotation does not exist', () => {
    const { wrapperScrollTo } = buildAnnotationDom();

    const annotationElement = scrollToAnnotation('no-such-thread');

    expect(annotationElement).toBeUndefined();
    expect(wrapperScrollTo).not.toHaveBeenCalled();
  });
});

describe('measureBaselineOffset', () => {
  /**
   * Stubs `getBoundingClientRect` for the probe and for everything else separately. jsdom has no
   * layout engine, so every real rect is all-zeros and the success path is otherwise unreachable.
   */
  function stubRects(values: { probeTop: number; containerTop: number; containerHeight: number }) {
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function getRectStub(
      this: Element,
    ): DOMRect {
      const isProbe = this.hasAttribute(BASELINE_PROBE_ATTRIBUTE);
      const top = isProbe ? values.probeTop : values.containerTop;
      const height = isProbe ? 0 : values.containerHeight;
      return {
        top,
        bottom: top + height,
        height,
        left: 0,
        right: 0,
        width: 0,
        x: 0,
        y: top,
        toJSON: () => ({}),
      };
    });
  }

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the probe-to-container top delta', () => {
    stubRects({ probeTop: 113, containerTop: 100, containerHeight: 18 });
    const container = document.createElement('p');
    document.body.appendChild(container);

    expect(measureBaselineOffset(container)).toBe(13);
  });

  it('removes the probe on the success path', () => {
    stubRects({ probeTop: 113, containerTop: 100, containerHeight: 18 });
    const container = document.createElement('p');
    document.body.appendChild(container);

    measureBaselineOffset(container);

    expect(container.querySelector(`[${BASELINE_PROBE_ATTRIBUTE}]`)).toBeNull();
    expect(container.childNodes).toHaveLength(0);
  });

  it('returns undefined rather than 0 when there is no layout to measure', () => {
    // Every rect degenerates to zeros inside a `display: none` iframe. Returning 0 there would be
    // indistinguishable from a real zero offset, and a caller that cached it would top-align the
    // bar for the life of the web view.
    stubRects({ probeTop: 0, containerTop: 0, containerHeight: 0 });
    const container = document.createElement('p');
    document.body.appendChild(container);

    expect(measureBaselineOffset(container)).toBeUndefined();
  });

  it('removes the probe on the no-layout path too', () => {
    stubRects({ probeTop: 0, containerTop: 0, containerHeight: 0 });
    const container = document.createElement('p');
    document.body.appendChild(container);

    measureBaselineOffset(container);

    expect(container.childNodes).toHaveLength(0);
  });
});

/**
 * Pure arithmetic over three rects, so these are plain value tests with no DOM.
 *
 * It has two consumers — `computePosition` (paragraph-marker tooltip) and `computeBarTop`
 * (character-marker bar) — whose own suites exercise it end to end. Covered directly here as well
 * because those suites assert through their callers' additional offsets, so neither pins the two
 * clamps on their own: a change to the clamp order, or to the 1px anchor height, could be absorbed
 * by a compensating change in either caller.
 */
describe('clampTopToVisibleArea', () => {
  it('returns the target position relative to the anchor when fully visible', () => {
    // Nothing to clamp: the target sits below the visible area's top and well above its own bottom.
    expect(clampTopToVisibleArea({ top: 150, bottom: 170 }, { top: 100 }, { top: 100 })).toBe(50);
  });

  it('subtracts the anchor top, not the scroll container top, for the returned coordinate', () => {
    // The two are deliberately different here. The result is in the ANCHOR's content coordinates;
    // the scroll container only says where the visible area begins. Passing the wrong element is
    // the documented failure mode, and only an asymmetric fixture can catch it.
    expect(clampTopToVisibleArea({ top: 150, bottom: 170 }, { top: 100 }, { top: 120 })).toBe(50);
  });

  it('pins to the top of the visible area when the target has scrolled above it', () => {
    // Target top is 20px above where the container's visible area starts, so the first clamp wins
    // and the result is the visible area's own top in anchor coordinates.
    expect(clampTopToVisibleArea({ top: 100, bottom: 200 }, { top: 80 }, { top: 120 })).toBe(40);
  });

  it("never exceeds the target's own bottom edge, less the 1px anchor height", () => {
    // An almost-fully-scrolled-past target: the visible-area clamp alone would place the anchor at
    // 40, below the target's own bottom (30). The second clamp keeps it inside the target, so the
    // overlay does not detach and trail beneath the thing it is tracking.
    expect(clampTopToVisibleArea({ top: 90, bottom: 110 }, { top: 80 }, { top: 120 })).toBe(29);
  });

  it('applies the two clamps in order, so the bottom clamp wins when they disagree', () => {
    // Both clamps are active and pull opposite ways. Order is the behavior being pinned: max-then-min
    // yields the bottom bound, whereas min-then-max would return the visible-area top instead.
    expect(clampTopToVisibleArea({ top: 0, bottom: 50 }, { top: 0 }, { top: 100 })).toBe(49);
  });
});

const JHN_3_16 = { book: 'JHN', chapterNum: 3, verseNum: 16 };
const JHN_3_17 = { book: 'JHN', chapterNum: 3, verseNum: 17 };
const ROM_3_16 = { book: 'ROM', chapterNum: 3, verseNum: 16 };
const USJ_A = { type: 'USJ', content: ['a'] };
const USJ_B = { type: 'USJ', content: ['b'] };

describe('isEchoOfPublishedScrRef', () => {
  it('recognizes the reference this view just published', () => {
    expect(isEchoOfPublishedScrRef(JHN_3_16, JHN_3_16)).toBe(true);
  });

  it('does not treat a different verse as an echo', () => {
    // A real navigation to a neighbouring verse must still scroll.
    expect(isEchoOfPublishedScrRef(JHN_3_16, JHN_3_17)).toBe(false);
  });

  it('compares the book too, not just the numbers', () => {
    expect(isEchoOfPublishedScrRef(JHN_3_16, ROM_3_16)).toBe(false);
  });

  it('is not an echo when nothing is outstanding', () => {
    expect(isEchoOfPublishedScrRef(undefined, JHN_3_16)).toBe(false);
  });
});

describe('hasNewScrollTarget', () => {
  it('scrolls when nothing has been scrolled to yet', () => {
    expect(hasNewScrollTarget(undefined, JHN_3_16, USJ_A)).toBe(true);
  });

  it('skips a bare reveal, so a manual scroll survives a tab switch', () => {
    expect(hasNewScrollTarget({ scrRef: JHN_3_16, usj: USJ_A }, JHN_3_16, USJ_A)).toBe(false);
  });

  it('scrolls when the reference moved while hidden', () => {
    expect(hasNewScrollTarget({ scrRef: JHN_3_16, usj: USJ_A }, JHN_3_17, USJ_A)).toBe(true);
  });

  it('scrolls when the chapter content arrives for the same reference', () => {
    // A reveal can beat the chapter load; the content landing is the cue to scroll, and the
    // reference alone would not distinguish it.
    expect(hasNewScrollTarget({ scrRef: JHN_3_16, usj: USJ_A }, JHN_3_16, USJ_B)).toBe(true);
  });

  it('compares content by identity, not value', () => {
    // The panel pushes whatever object the PDP hands it; an equal-but-new object is a real update.
    expect(hasNewScrollTarget({ scrRef: JHN_3_16, usj: USJ_A }, JHN_3_16, { ...USJ_A })).toBe(true);
  });
});

describe('paraAtPoint', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns the paragraph element actually hit-tested at the given point', () => {
    const para = document.createElement('p');
    para.className = 'para usfm_q1';
    const span = document.createElement('span');
    para.appendChild(span);
    document.body.appendChild(para);

    vi.spyOn(document, 'elementFromPoint').mockReturnValue(span);

    expect(paraAtPoint(10, 20)).toBe(para);
  });

  it('returns undefined when the point is outside any paragraph', () => {
    const nonPara = document.createElement('div');
    document.body.appendChild(nonPara);

    vi.spyOn(document, 'elementFromPoint').mockReturnValue(nonPara);

    expect(paraAtPoint(10, 20)).toBeUndefined();
  });

  it('returns undefined when the point hits nothing', () => {
    // elementFromPoint's real return type is nullable.
    // eslint-disable-next-line no-null/no-null
    vi.spyOn(document, 'elementFromPoint').mockReturnValue(null);

    expect(paraAtPoint(10, 20)).toBeUndefined();
  });

  it("disagrees with a stale event target when the DOM has moved on since the event's target was captured", () => {
    // Regression guard: a mouse event's target/relatedTarget can name an element that is no longer
    // what is really at the cursor's position by the time it's read (e.g. after editor-internal DOM
    // churn). paraAtPoint must reflect the live hit-test, not whatever an event target claims.
    const staleTarget = document.createElement('p');
    staleTarget.className = 'para usfm_p';
    const liveHit = document.createElement('div');
    document.body.append(staleTarget, liveHit);

    vi.spyOn(document, 'elementFromPoint').mockReturnValue(liveHit);

    expect(paraAtPoint(10, 20)).not.toBe(staleTarget);
    expect(paraAtPoint(10, 20)).toBeUndefined();
  });
});

/**
 * Gives `target` the client rects jsdom cannot lay out. The measurement helpers read
 * `getClientRects()` (and, for a range, `getBoundingClientRect()`), so a test supplies them per
 * element or range.
 */
function stubClientRects(target: Element | Range, rects: DOMRect[]) {
  Object.defineProperty(target, 'getClientRects', { value: () => rects, configurable: true });
  Object.defineProperty(target, 'getBoundingClientRect', {
    configurable: true,
    value: () => {
      const left = Math.min(...rects.map((rect) => rect.left));
      const top = Math.min(...rects.map((rect) => rect.top));
      const right = Math.max(...rects.map((rect) => rect.right));
      const bottom = Math.max(...rects.map((rect) => rect.bottom));
      return new DOMRect(left, top, right - left, bottom - top);
    },
  });
}

/**
 * A rect's numbers, for comparison. `DOMRect` keeps its values on the prototype, so `toEqual` on
 * two rects compares nothing and passes for any pair.
 */
function rectNumbers(rect: DOMRect | undefined) {
  if (!rect) return undefined;
  return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
}

/** An annotation fragment inside the editor container, carrying the rects it paints. */
function addAnnotationFragment(container: Element, id: string, rects: DOMRect[]) {
  const fragment = document.createElement('span');
  fragment.className = `annotationId-${id}`;
  stubClientRects(fragment, rects);
  container.appendChild(fragment);
  return fragment;
}

/** An editor container for the annotation selector to scope to. */
function addEditorContainer() {
  const container = document.createElement('div');
  container.className = 'editor-container';
  document.body.appendChild(container);
  return container;
}

describe('measureAnnotation', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('has no rect when the annotation is not in the document', () => {
    addEditorContainer();
    expect(measureAnnotation('missing')).toBeUndefined();
  });

  it('has no rect when the annotation renders no line box', () => {
    // An annotation in a collapsed or unrendered subtree has an element but paints nothing;
    // anchoring a pop-up on a zero rect would put it in the frame's corner.
    addAnnotationFragment(addEditorContainer(), 'abc', []);
    expect(measureAnnotation('abc')).toBeUndefined();
  });

  it('spans every line box of a wrapped annotation', () => {
    // A selection that wraps renders as several line boxes; the anchor must cover all of them
    // rather than its first line.
    const container = addEditorContainer();
    addAnnotationFragment(container, 'abc', [
      new DOMRect(200, 100, 100, 20),
      new DOMRect(40, 120, 260, 20),
    ]);

    expect(rectNumbers(measureAnnotation('abc'))).toEqual({
      x: 40,
      y: 100,
      width: 260,
      height: 40,
    });
  });

  it('spans every fragment when formatting splits the annotation', () => {
    // Partly formatted text renders one annotation as several elements.
    const container = addEditorContainer();
    addAnnotationFragment(container, 'abc', [new DOMRect(50, 100, 60, 20)]);
    addAnnotationFragment(container, 'abc', [new DOMRect(110, 100, 90, 20)]);

    expect(rectNumbers(measureAnnotation('abc'))).toEqual({
      x: 50,
      y: 100,
      width: 150,
      height: 20,
    });
  });

  it('ignores an annotation outside the editor container', () => {
    // The selector is scoped to the editor, so a copy elsewhere in the document cannot pull the
    // anchor away.
    addEditorContainer();
    const elsewhere = document.createElement('div');
    document.body.appendChild(elsewhere);
    addAnnotationFragment(elsewhere, 'abc', [new DOMRect(10, 10, 10, 10)]);

    expect(measureAnnotation('abc')).toBeUndefined();
  });
});

describe('measureRange', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  function addParagraphRange() {
    const paragraph = document.createElement('p');
    paragraph.textContent = 'In the beginning';
    document.body.appendChild(paragraph);
    const range = document.createRange();
    range.selectNodeContents(paragraph);
    return range;
  }

  it('has no rect once the range no longer lies in rendered text', () => {
    // The editor replaces text nodes as it re-renders; the range then collapses to an element
    // boundary, which paints nothing.
    const range = addParagraphRange();
    stubClientRects(range, []);

    expect(measureRange(range)).toBeUndefined();
  });

  it('is the range box while the text is rendered', () => {
    const range = addParagraphRange();
    stubClientRects(range, [new DOMRect(30, 60, 120, 18)]);

    expect(rectNumbers(measureRange(range))).toEqual({
      x: 30,
      y: 60,
      width: 120,
      height: 18,
    });
  });
});

describe('leftEdgeRect', () => {
  it('collapses to the left edge and keeps the full height', () => {
    // A pop-up anchored on this sits below all of the original rect and centered on its left edge,
    // instead of centered under a wide caller.
    expect(rectNumbers(leftEdgeRect(new DOMRect(40, 100, 260, 40)))).toEqual({
      x: 40,
      y: 100,
      width: 0,
      height: 40,
    });
  });
});

describe('createPendingCommentAnchorSource', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  function addParagraph(text: string) {
    const container = addEditorContainer();
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    container.appendChild(paragraph);
    const range = document.createRange();
    range.selectNodeContents(paragraph);
    return { container, paragraph, range };
  }

  it('mark absent and the range still intact: follows the range', () => {
    const { container, range } = addParagraph('In the beginning');
    stubClientRects(range, [new DOMRect(30, 60, 120, 18)]);

    const source = createPendingCommentAnchorSource(range, 'pending-comment', container);

    expect(rectNumbers(source.measure())).toEqual({ x: 30, y: 60, width: 0, height: 18 });
    expect(source.contextElement).toBe(container);
  });

  it('mark absent and the range moved: measure reports no rect', () => {
    const { container, paragraph, range } = addParagraph('In the beginning');
    const movedTo = document.createElement('p');
    movedTo.textContent = 'elsewhere';
    container.appendChild(movedTo);
    // A stale stub: still returns this rect after the move below, so the test only passes because
    // isRangeIntact() is checked BEFORE this stub is ever consulted — not because the stub happens
    // to reflect the move.
    stubClientRects(range, [new DOMRect(30, 60, 120, 18)]);

    const source = createPendingCommentAnchorSource(range, 'pending-comment', container);

    // The editor re-rendered and moved the range to a different node before the mark appeared.
    range.selectNodeContents(movedTo);
    expect(range.startContainer).not.toBe(paragraph);

    expect(source.measure()).toBeUndefined();
  });

  it('mark present: follows the union of its fragments at the fraction from where the caret was', () => {
    const { container, range } = addParagraph('In the beginning');
    // The caret sat at x=90 when the popover opened, before the mark existed.
    stubClientRects(range, [new DOMRect(90, 105, 30, 20)]);

    const source = createPendingCommentAnchorSource(range, 'abc', container);

    // The editor re-rendered the selection into the pending-comment mark, splitting it into two
    // fragments whose union is left=40, top=100, width=200, height=40.
    addAnnotationFragment(container, 'abc', [new DOMRect(40, 100, 80, 20)]);
    addAnnotationFragment(container, 'abc', [new DOMRect(120, 120, 120, 20)]);

    // fraction = (90 - 40) / 200 = 0.25; x = 40 + 0.25 * 200 = 90 (the caret's original x).
    expect(rectNumbers(source.measure())).toEqual({ x: 90, y: 100, width: 0, height: 40 });
  });
});
