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

import { afterEach, beforeAll, beforeEach, describe, expect, it, vi, Mock } from 'vitest';
import {
  BASELINE_PROBE_ATTRIBUTE,
  clampToScrollRange,
  clampTopToVisibleArea,
  computeRangeScrollTop,
  createNoteAnchorSource,
  createPendingCommentAnchorSource,
  createPendingCommentCenterAnchorSource,
  findScrollContainer,
  getEditorSelectionRange,
  getVerseElement,
  hasNewScrollTarget,
  isEchoOfPublishedScrRef,
  isSameScrollGeometry,
  isSameVerseRef,
  measureAnnotation,
  measureBaselineOffset,
  measureRangeScrollGeometry,
  paraAtPoint,
  RANGE_SCROLL_TOP_OFFSET,
  resolveScrollBehavior,
  SCROLL_MAX_WAIT_MS,
  scrollToAnnotation,
  scrollToRange,
  scrollToVerse,
  waitForLayoutToSettle,
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

describe('getVerseElement', () => {
  it('finds the marker for the given verse number', () => {
    const { editorContainer } = buildEditorDom({ verseNumbers: [15] });

    const element = getVerseElement(15);

    expect(element).toBe(editorContainer.querySelector('span[data-marker="v"]'));
  });

  it('returns undefined when no marker exists for the verse number', () => {
    buildEditorDom({ verseNumbers: [15] });

    expect(getVerseElement(3)).toBeUndefined();
  });

  it('returns undefined for verseNum < 1 without matching any marker', () => {
    // Verse 0 is not a real verse marker; a chapter-start marker (if one ever existed) must not
    // match it.
    buildEditorDom({ verseNumbers: [0] });

    expect(getVerseElement(0)).toBeUndefined();
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

  it('scrolls with the requested behavior', () => {
    const { wrapperScrollTo } = buildEditorDom();

    scrollToVerse({ book: 'OBA', chapterNum: 1, verseNum: 15 }, 'instant');

    expect(wrapperScrollTo).toHaveBeenCalledWith({ behavior: 'instant', top: 1420 });
  });

  it('does not scroll to a verse that only exists inside a bridge', () => {
    // `\v 18-19` publishes one marker numbered "18-19", so neither 18 nor 19 matches. This pins the
    // limit of the fallback a range jump uses when it cannot measure the selection.
    const { editorContainer, wrapperScrollTo } = buildEditorDom({ verseNumbers: [] });
    const bridgedVerse = document.createElement('span');
    bridgedVerse.setAttribute('data-marker', 'v');
    bridgedVerse.setAttribute('data-number', '18-19');
    editorContainer.append(bridgedVerse);

    expect(scrollToVerse({ book: 'GEN', chapterNum: 10, verseNum: 19 })).toBeUndefined();
    expect(wrapperScrollTo).not.toHaveBeenCalled();
  });
});

describe('resolveScrollBehavior', () => {
  function stubReducedMotionPreference(matches: boolean): void {
    vi.stubGlobal('matchMedia', vi.fn().mockReturnValue({ matches }));
  }

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("downgrades 'smooth' to 'instant' when the user prefers reduced motion", () => {
    stubReducedMotionPreference(true);
    expect(resolveScrollBehavior('smooth')).toBe('instant');
  });

  it("leaves 'smooth' alone when the user has not asked to reduce motion", () => {
    stubReducedMotionPreference(false);
    expect(resolveScrollBehavior('smooth')).toBe('smooth');
  });

  it("leaves 'instant' alone regardless of the preference", () => {
    stubReducedMotionPreference(true);
    expect(resolveScrollBehavior('instant')).toBe('instant');
  });

  it('leaves the requested behavior alone when matchMedia is unavailable', () => {
    vi.stubGlobal('matchMedia', undefined);
    expect(resolveScrollBehavior('smooth')).toBe('smooth');
  });

  describe('is applied by every scroll this module performs, not by its callers', () => {
    // Otherwise a reduced-motion user gets an instant jump to a find match and a sweeping animation
    // from navigating by reference in the same editor, which is worse than either done uniformly.
    beforeEach(() => {
      stubReducedMotionPreference(true);
    });

    it('scrollToVerse', () => {
      const { wrapperScrollTo } = buildEditorDom();

      scrollToVerse({ book: 'OBA', chapterNum: 1, verseNum: 15 }, 'smooth');

      expect(wrapperScrollTo).toHaveBeenCalledWith({ behavior: 'instant', top: 1420 });
    });

    it('scrollToRange', () => {
      const { editorContainer, wrapperScrollTo } = buildEditorDom({ verseNumbers: [] });

      scrollToRange(rangeInEditor(editorContainer, 1500, 20), 'smooth');

      expect(wrapperScrollTo).toHaveBeenCalledWith({ behavior: 'instant', top: 1420 });
    });

    it('scrollToAnnotation', () => {
      const { annotation, wrapperScrollTo } = buildAnnotationDom();
      stubRect(annotation, 1500, 20);

      scrollToAnnotation('thread1');

      // Bottom-aligned: annotationBottom (1520) - clientHeight (900) + offset (80). An annotation
      // below the viewport is closer to the bottom edge, so it travels the shorter distance.
      expect(wrapperScrollTo).toHaveBeenCalledWith({ behavior: 'instant', top: 700 });
    });
  });
});

describe('isSameScrollGeometry', () => {
  it('treats readings a sub-pixel apart as the same', () => {
    // A fractional devicePixelRatio can keep re-reporting a value that has stopped changing with a
    // different fraction; exact equality would read that as "still moving".
    expect(isSameScrollGeometry(1420, 1420.4)).toBe(true);
  });

  it('treats readings a whole pixel apart as different', () => {
    expect(isSameScrollGeometry(1420, 1421)).toBe(false);
  });
});

describe('isSameVerseRef', () => {
  it('compares book, chapter and verse only', () => {
    expect(
      isSameVerseRef(
        { book: 'GEN', chapterNum: 10, verseNum: 19, versificationName: 'English' },
        { book: 'GEN', chapterNum: 10, verseNum: 19 },
      ),
    ).toBe(true);
  });

  it('rejects a different verse and a missing reference', () => {
    const genesis1019 = { book: 'GEN', chapterNum: 10, verseNum: 19 };
    expect(isSameVerseRef({ book: 'GEN', chapterNum: 10, verseNum: 18 }, genesis1019)).toBe(false);
    expect(isSameVerseRef(undefined, genesis1019)).toBe(false);
  });
});

describe('clampToScrollRange', () => {
  it('clamps a target above the content to the top', () => {
    expect(clampToScrollRange(-50, { clientHeight: 900, scrollHeight: 5000 })).toBe(0);
  });

  it('clamps a target past the end of the content to the last scrollable position', () => {
    expect(clampToScrollRange(9000, { clientHeight: 900, scrollHeight: 5000 })).toBe(4100);
  });

  it('answers 0 when the content does not overflow at all', () => {
    expect(clampToScrollRange(300, { clientHeight: 900, scrollHeight: 400 })).toBe(0);
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

describe('computeRangeScrollTop', () => {
  // Content 5000 tall, a 900 px viewport currently scrolled to 1000: visible band [1000, 1900].
  const viewport = { scrollTop: 1000, clientHeight: 900, scrollHeight: 5000 };

  it('lands a range 80 px below the top edge', () => {
    // Every expectation below is a literal derived from this offset rather than an expression over
    // the constant, so that changing the offset (or dropping it) fails them instead of moving them
    // along with the code. This is where the 80 itself is pinned, so a deliberate change to it has
    // exactly one place to start from.
    expect(RANGE_SCROLL_TOP_OFFSET).toBe(80);
  });

  it('leaves a range that is already fully in view where it is', () => {
    expect(
      computeRangeScrollTop({ ...viewport, rangeTop: 1200, rangeBottom: 1220 }),
    ).toBeUndefined();
  });

  it('counts a range a sub-pixel outside the viewport as in view', () => {
    // A fractional devicePixelRatio puts fractions on every one of these numbers, and scrolling by
    // a fraction of a pixel for a range already flush against an edge is a move for nothing.
    expect(
      computeRangeScrollTop({ ...viewport, rangeTop: 999.7, rangeBottom: 1900.3 }),
    ).toBeUndefined();
  });

  it('counts a range exactly filling the viewport as in view', () => {
    expect(
      computeRangeScrollTop({ ...viewport, rangeTop: 1000, rangeBottom: 1900 }),
    ).toBeUndefined();
  });

  it('puts a range below the viewport just under the top edge, not against the bottom edge', () => {
    expect(computeRangeScrollTop({ ...viewport, rangeTop: 3094, rangeBottom: 3114 })).toBe(3014);
  });

  it('scrolls a range the bottom edge cuts off instead of accepting its visible start', () => {
    expect(computeRangeScrollTop({ ...viewport, rangeTop: 1850, rangeBottom: 1920 })).toBe(1770);
  });

  it('puts a range above the viewport just under the top edge', () => {
    expect(computeRangeScrollTop({ ...viewport, rangeTop: 400, rangeBottom: 420 })).toBe(320);
  });

  it('keeps the start of a range taller than the viewport in view', () => {
    expect(computeRangeScrollTop({ ...viewport, rangeTop: 3000, rangeBottom: 4500 })).toBe(2920);
  });

  it('clamps to the top of the content for a range at the start of the chapter', () => {
    expect(computeRangeScrollTop({ ...viewport, rangeTop: 30, rangeBottom: 50 })).toBe(0);
  });

  it('clamps to the end of the content for a range at the end of the chapter', () => {
    // maxScrollTop = 5000 - 900 = 4100; the range at 4950 is then 850 px down a 900 px viewport.
    expect(computeRangeScrollTop({ ...viewport, rangeTop: 4950, rangeBottom: 4970 })).toBe(4100);
  });

  it('shrinks the offset on a short viewport, so the match does not land past the midpoint', () => {
    // A 150 px pane: a quarter of that (37.5) is well under the fixed 80 px offset, so the smaller
    // value wins.
    const shortViewport = { scrollTop: 0, clientHeight: 150, scrollHeight: 1000 };
    expect(computeRangeScrollTop({ ...shortViewport, rangeTop: 500, rangeBottom: 510 })).toBe(
      462.5,
    );
  });

  it('keeps the offset at exactly RANGE_SCROLL_TOP_OFFSET on an ordinary-height viewport', () => {
    // At clientHeight 320, a quarter (80) exactly equals the fixed offset — the boundary above
    // which the cap never engages.
    const ordinaryViewport = { scrollTop: 0, clientHeight: 320, scrollHeight: 5000 };
    expect(computeRangeScrollTop({ ...ordinaryViewport, rangeTop: 1000, rangeBottom: 1020 })).toBe(
      920,
    );
  });
});

describe('getEditorSelectionRange', () => {
  afterEach(() => {
    document.getSelection()?.removeAllRanges();
  });

  function selectText(parent: HTMLElement, content: string, start: number, end: number): void {
    const text = document.createTextNode(content);
    parent.append(text);
    const range = document.createRange();
    range.setStart(text, start);
    range.setEnd(text, end);
    document.getSelection()?.addRange(range);
  }

  it('returns the selection when it is inside the editor content', () => {
    const { editorContainer } = buildEditorDom({ verseNumbers: [] });
    selectText(editorContainer, 'to Lasha.', 3, 8);

    expect(getEditorSelectionRange()?.toString()).toBe('Lasha');
  });

  it('ignores a selection outside the editor content, such as a footnote popover', () => {
    buildEditorDom({ verseNumbers: [] });
    const popover = document.createElement('div');
    document.body.append(popover);
    selectText(popover, 'footnote text', 0, 8);

    expect(getEditorSelectionRange()).toBeUndefined();
  });

  it('returns undefined when nothing is selected', () => {
    buildEditorDom({ verseNumbers: [] });

    expect(getEditorSelectionRange()).toBeUndefined();
  });
});

/** A range over a span in the editor content whose viewport rect is stubbed (jsdom has no layout) */
function rangeInEditor(editorContainer: HTMLElement, top: number, height: number): Range {
  const span = document.createElement('span');
  span.textContent = 'Lasha';
  editorContainer.append(span);
  const range = document.createRange();
  range.selectNodeContents(span);
  Object.defineProperty(range, 'getBoundingClientRect', {
    value: () => new DOMRect(0, top, height === 0 ? 0 : 40, height),
    configurable: true,
  });
  return range;
}

describe('measureRangeScrollGeometry', () => {
  it('measures the range against the container that actually scrolls, not .editor-container', () => {
    const { editorContainer } = buildEditorDom({ verseNumbers: [] });

    const measurement = measureRangeScrollGeometry(rangeInEditor(editorContainer, 2094, 20));

    expect(measurement).toEqual({
      status: 'measured',
      scrollContainer: editorContainer.parentElement?.parentElement, // the wrapper
      rangeTop: 2094,
      rangeHeight: 20,
      scrollTop: 0,
      clientHeight: VIEWPORT_HEIGHT,
      scrollHeight: CONTENT_HEIGHT,
    });
  });

  it('reads the discovered container geometry, not .editor-container’s, when they differ', () => {
    // .editor-container is styled overflow-y: auto but grown to content height, so it does not
    // qualify; only the wrapper's clientHeight/scrollHeight should appear in the result.
    const { editorContainer, wrapper } = buildEditorDom({ verseNumbers: [] });
    wrapper.scrollTop = 500;

    const measurement = measureRangeScrollGeometry(rangeInEditor(editorContainer, 2094, 20));
    if (measurement.status !== 'measured') throw new Error('expected a measured geometry');

    expect(measurement.scrollContainer).toBe(wrapper);
    expect(measurement.scrollTop).toBe(500);
    expect(measurement.clientHeight).toBe(VIEWPORT_HEIGHT);
    expect(measurement.scrollHeight).toBe(CONTENT_HEIGHT);
  });

  it("reports 'no-layout' when the range has no layout (the all-zero-rect case)", () => {
    const { editorContainer } = buildEditorDom({ verseNumbers: [] });

    expect(measureRangeScrollGeometry(rangeInEditor(editorContainer, 0, 0))).toEqual({
      status: 'no-layout',
    });
  });

  it("reports 'no-scroll-container' when nothing scrollable exists", () => {
    const { editorContainer } = buildEditorDom({ verseNumbers: [], wrapperScrolls: false });

    expect(measureRangeScrollGeometry(rangeInEditor(editorContainer, 2094, 20))).toEqual({
      status: 'no-scroll-container',
    });
  });

  it('reuses a container it is handed instead of walking the ancestors again', () => {
    // The settle loop in `useScrollToRange` samples once per animation frame for up to 2 s, and the
    // walk costs a `getComputedStyle` per level; the container cannot change within one run.
    const { editorContainer, wrapper } = buildEditorDom({ verseNumbers: [] });
    const getComputedStyleSpy = vi.spyOn(window, 'getComputedStyle');

    const measurement = measureRangeScrollGeometry(
      rangeInEditor(editorContainer, 2094, 20),
      wrapper,
    );
    if (measurement.status !== 'measured') throw new Error('expected a measured geometry');

    expect(measurement.scrollContainer).toBe(wrapper);
    expect(getComputedStyleSpy).not.toHaveBeenCalled();
    getComputedStyleSpy.mockRestore();
  });

  it('walks again rather than measuring a container a chapter load has torn out of the document', () => {
    const { editorContainer, wrapper } = buildEditorDom({ verseNumbers: [] });
    const staleContainer = document.createElement('div');

    const measurement = measureRangeScrollGeometry(
      rangeInEditor(editorContainer, 2094, 20),
      staleContainer,
    );
    if (measurement.status !== 'measured') throw new Error('expected a measured geometry');

    expect(measurement.scrollContainer).toBe(wrapper);
  });
});

describe('scrollToRange', () => {
  it('scrolls the element that actually scrolls so the range lands just under the top', () => {
    const { editorContainer, wrapperScrollTo, editorContainerScrollTo } = buildEditorDom({
      verseNumbers: [],
    });

    const didMeasure = scrollToRange(rangeInEditor(editorContainer, 2094, 20), 'smooth');

    expect(didMeasure).toBe(true);
    expect(editorContainerScrollTo).not.toHaveBeenCalled();
    // scrollTop 0 + rect top 2094 - container top 0 - offset 80 = 2014 (max scroll is 3000 - 900 = 2100)
    expect(wrapperScrollTo).toHaveBeenCalledWith({ behavior: 'smooth', top: 2014 });
  });

  it('passes the requested behavior through, so a catch-up can jump instantly', () => {
    const { editorContainer, wrapperScrollTo } = buildEditorDom({ verseNumbers: [] });

    scrollToRange(rangeInEditor(editorContainer, 2094, 20), 'instant');

    expect(wrapperScrollTo).toHaveBeenCalledWith({ behavior: 'instant', top: 2014 });
  });

  it('reports a measurement but does not scroll when the range is already in view', () => {
    const { editorContainer, wrapperScrollTo } = buildEditorDom({ verseNumbers: [] });

    expect(scrollToRange(rangeInEditor(editorContainer, 400, 20), 'smooth')).toBe(true);
    expect(wrapperScrollTo).not.toHaveBeenCalled();
  });

  it('reports a measurement but does not scroll when the content does not overflow', () => {
    const { editorContainer, wrapperScrollTo } = buildEditorDom({
      verseNumbers: [],
      wrapperScrolls: false,
    });

    expect(scrollToRange(rangeInEditor(editorContainer, 2094, 20), 'smooth')).toBe(true);
    expect(wrapperScrollTo).not.toHaveBeenCalled();
  });

  it('reports no measurement, and does not scroll, when the range has no layout', () => {
    // Inside a display: none iframe every rect is all zeros.
    const { editorContainer, wrapperScrollTo } = buildEditorDom({ verseNumbers: [] });

    expect(scrollToRange(rangeInEditor(editorContainer, 0, 0), 'smooth')).toBe(false);
    expect(wrapperScrollTo).not.toHaveBeenCalled();
  });
});

describe('waitForLayoutToSettle', () => {
  beforeEach(() => {
    vi.useFakeTimers({
      toFake: [
        'setTimeout',
        'clearTimeout',
        'requestAnimationFrame',
        'cancelAnimationFrame',
        'Date',
      ],
    });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  /** Advances enough animation frames for the wait to react, without resolving the whole bound. */
  async function runFrames(ms = 100) {
    await vi.advanceTimersByTimeAsync(ms);
  }

  it('settles once two consecutive samples agree, and samples no further', async () => {
    const nextValues = [1, 2, 2, 2, 2];
    const sample = vi.fn(() => nextValues.shift() ?? 2);
    const onSettled = vi.fn(() => 'settled' as const);
    const onTimedOut = vi.fn();

    waitForLayoutToSettle({
      sample,
      samplesMatch: (previous, current) => previous === current,
      onSettled,
      onTimedOut,
    });
    await runFrames();

    // Sample 1: nothing to compare against yet (not settled). Sample 2: disagrees with sample 1
    // (1 vs 2, not settled). Sample 3: agrees with sample 2 (2 vs 2) -> settles here, and the queue
    // is left with two more agreeing values it should never need to consume.
    expect(sample).toHaveBeenCalledTimes(3);
    expect(onSettled).toHaveBeenCalledTimes(1);
    expect(onSettled).toHaveBeenCalledWith(2, false);
    expect(onTimedOut).not.toHaveBeenCalled();
  });

  it("a 'keep-waiting' result discards the agreement, requiring two fresh samples before settling again", async () => {
    const sample = vi.fn(() => 5); // constant, so every pair after the first agrees
    const onSettled = vi.fn().mockReturnValueOnce('keep-waiting').mockReturnValueOnce('settled');
    const onTimedOut = vi.fn();

    waitForLayoutToSettle({
      sample,
      samplesMatch: (previous, current) => previous === current,
      onSettled,
      onTimedOut,
    });
    await runFrames();

    // First agreement (samples 1-2) is rejected via 'keep-waiting', which must cost a full fresh
    // pair (samples 3-4) rather than accepting the very next sample against the rejected one.
    expect(sample).toHaveBeenCalledTimes(4);
    expect(onSettled).toHaveBeenCalledTimes(2);
    expect(onTimedOut).not.toHaveBeenCalled();
  });

  it('fires the timeout callback once, and only once, when samples never agree', async () => {
    let counter = 0;
    const sample = vi.fn(() => {
      counter += 1;
      return counter; // always different from the previous sample -> never settles
    });
    const onSettled = vi.fn(() => 'settled' as const);
    const onTimedOut = vi.fn();

    waitForLayoutToSettle({
      sample,
      samplesMatch: (previous, current) => previous === current,
      onSettled,
      onTimedOut,
    });

    await runFrames(SCROLL_MAX_WAIT_MS / 2);
    expect(onTimedOut).not.toHaveBeenCalled();

    // Advance well past the bound, giving many more frames a chance to fire the callback again.
    await runFrames(SCROLL_MAX_WAIT_MS * 3);
    expect(onTimedOut).toHaveBeenCalledTimes(1);
    expect(onSettled).not.toHaveBeenCalled();
  });

  it('stops every callback once cancelled', async () => {
    let counter = 0;
    const sample = vi.fn(() => {
      counter += 1;
      return counter; // never settles on its own
    });
    const onSettled = vi.fn(() => 'settled' as const);
    const onTimedOut = vi.fn();

    const cancel = waitForLayoutToSettle({
      sample,
      samplesMatch: (previous, current) => previous === current,
      onSettled,
      onTimedOut,
    });
    cancel();

    await runFrames(SCROLL_MAX_WAIT_MS * 3);

    expect(onSettled).not.toHaveBeenCalled();
    expect(onTimedOut).not.toHaveBeenCalled();
    // Only the one synchronous call made before cancellation took effect.
    expect(sample).toHaveBeenCalledTimes(1);
  });

  it('passes isTimedOut: true to onSettled when the agreement lands only once the bound has elapsed', async () => {
    const testStart = Date.now();
    const sample = vi.fn(() => 9);
    const onSettled = vi.fn(() => 'settled' as const);
    const onTimedOut = vi.fn();

    waitForLayoutToSettle({
      sample,
      // Every reading is identical, but this refuses to call it an agreement until the bound has
      // elapsed, so the accepted agreement always carries isTimedOut: true.
      samplesMatch: (previous, current) =>
        previous === current && Date.now() - testStart > SCROLL_MAX_WAIT_MS,
      onSettled,
      onTimedOut,
    });
    await runFrames(SCROLL_MAX_WAIT_MS * 2);

    expect(onSettled).toHaveBeenCalledWith(9, true);
    // Settling — even this late — still resolves through onSettled, never onTimedOut.
    expect(onTimedOut).not.toHaveBeenCalled();
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

  /**
   * Where a collapsed range's caret paints, per text node, in the fake layout below. jsdom has no
   * layout and no `Range.getClientRects` at all, so the tests install one on `Range.prototype` that
   * reads this map; a range with its own instance stub (via `stubClientRects`) ignores it.
   */
  const caretLayouts = new Map<Node, (offset: number) => DOMRect>();

  beforeEach(() => {
    const caretRects = (range: Range) => {
      const layout = range.collapsed ? caretLayouts.get(range.startContainer) : undefined;
      return layout ? [layout(range.startOffset)] : [];
    };
    Object.defineProperty(Range.prototype, 'getClientRects', {
      configurable: true,
      value(this: Range) {
        return caretRects(this);
      },
    });
    Object.defineProperty(Range.prototype, 'getBoundingClientRect', {
      configurable: true,
      value(this: Range) {
        return caretRects(this)[0] ?? new DOMRect();
      },
    });
  });

  afterEach(() => {
    caretLayouts.clear();
    // jsdom's Range has neither method, so removing the stubs restores it exactly.
    Reflect.deleteProperty(Range.prototype, 'getClientRects');
    Reflect.deleteProperty(Range.prototype, 'getBoundingClientRect');
  });

  /**
   * A fixed-width-character layout of a text node that starts at `left` on a line at `top` and
   * wraps after `firstLineChars` characters to `nextLineLeft` on the next line.
   */
  type TextLayout = {
    left: number;
    top: number;
    charWidth: number;
    lineHeight: number;
    firstLineChars: number;
    nextLineLeft: number;
  };

  /**
   * Lays out `textNode` as `layout` says: its caret positions for collapsed ranges, and — when it
   * sits in an annotation fragment — the fragment's line boxes.
   */
  function layOut(textNode: Text, layout: TextLayout) {
    const { left, top, charWidth, lineHeight, firstLineChars, nextLineLeft } = layout;
    const onFirstLine = Math.min(textNode.length, firstLineChars);
    caretLayouts.set(textNode, (offset) =>
      offset <= onFirstLine
        ? new DOMRect(left + offset * charWidth, top, 0, lineHeight)
        : new DOMRect(
            nextLineLeft + (offset - onFirstLine) * charWidth,
            top + lineHeight,
            0,
            lineHeight,
          ),
    );
    const lineBoxes = [new DOMRect(left, top, onFirstLine * charWidth, lineHeight)];
    if (textNode.length > onFirstLine)
      lineBoxes.push(
        new DOMRect(
          nextLineLeft,
          top + lineHeight,
          (textNode.length - onFirstLine) * charWidth,
          lineHeight,
        ),
      );
    const { parentElement } = textNode;
    if (parentElement?.matches('[class^="annotationId-"]'))
      stubClientRects(parentElement, lineBoxes);
  }

  /**
   * A paragraph of text with a collapsed caret `caretOffset` characters in, and the popover source
   * built for it — the state when the user asks to add a comment at a caret.
   */
  function openAtCaret(text: string, caretOffset: number, layout: TextLayout) {
    const { container, paragraph } = addParagraph(text);
    const textNode = paragraph.firstChild;
    if (!(textNode instanceof Text)) throw new Error('The paragraph should hold one text node');
    layOut(textNode, layout);
    const range = document.createRange();
    range.setStart(textNode, caretOffset);
    range.collapse(true);
    const source = createPendingCommentAnchorSource(range, 'abc', container);
    return { paragraph, source };
  }

  /**
   * The editor's re-render marking the pending comment: the paragraph's text is replaced by the
   * text before the mark, the mark over `[markStart, markEnd)`, and the text after it. The original
   * text node is detached, so a range in it collapses to the paragraph.
   */
  function renderMark(paragraph: HTMLElement, markStart: number, markEnd: number) {
    const text = paragraph.textContent ?? '';
    const mark = document.createElement('span');
    mark.className = 'annotationId-abc';
    mark.textContent = text.slice(markStart, markEnd);
    paragraph.replaceChildren(text.slice(0, markStart), mark, text.slice(markEnd));
    const markText = mark.firstChild;
    if (!(markText instanceof Text)) throw new Error('The mark should hold one text node');
    return markText;
  }

  // "In the beginning" is a spaced line; the long unspaced run the caret sits in below stands for
  // Thai or Chinese text, where the editor marks the whole run between spaces around the caret.
  const RUN_TEXT = 'xx abcdefghij yy';
  const RUN_START = 3;
  const RUN_END = 13;

  it('a selection: anchors on the left edge of the union of the mark fragments', () => {
    const { container, range } = addParagraph('In the beginning');
    stubClientRects(range, [new DOMRect(40, 100, 200, 40)]);

    const source = createPendingCommentAnchorSource(range, 'abc', container);

    // The editor re-rendered the selection into the pending-comment mark, split over two lines
    // whose union is left=40, top=100, width=200, height=40.
    addAnnotationFragment(container, 'abc', [new DOMRect(120, 100, 120, 20)]);
    addAnnotationFragment(container, 'abc', [new DOMRect(40, 120, 80, 20)]);

    expect(rectNumbers(source.measure())).toEqual({ x: 40, y: 100, width: 0, height: 40 });
  });

  it('a caret: anchors at the caret inside the mark once the mark renders', () => {
    // Caret 6 characters into the run "abcdefghij" (between "f" and "g").
    const { paragraph, source } = openAtCaret(RUN_TEXT, RUN_START + 6, {
      left: 0,
      top: 100,
      charWidth: 10,
      lineHeight: 20,
      firstLineChars: 100,
      nextLineLeft: 0,
    });

    const mark = renderMark(paragraph, RUN_START, RUN_END);
    layOut(mark, {
      left: 30,
      top: 100,
      charWidth: 10,
      lineHeight: 20,
      firstLineChars: 100,
      nextLineLeft: 0,
    });

    // x = 30 + 6 * 10.
    expect(rectNumbers(source.measure())).toEqual({ x: 90, y: 100, width: 0, height: 20 });
  });

  it('a caret in a mark that reflows onto one line (a pane widened): stays at the caret', () => {
    // A narrow pane wraps the run: "abcde" ends line 1 and "fghij" starts line 2, so the caret
    // 6 characters in sits on line 2.
    const narrow = { top: 100, charWidth: 10, lineHeight: 20, firstLineChars: 5, nextLineLeft: 0 };
    const { paragraph, source } = openAtCaret(RUN_TEXT, RUN_START + 6, {
      ...narrow,
      left: 0,
      firstLineChars: 8,
    });
    const mark = renderMark(paragraph, RUN_START, RUN_END);
    layOut(mark, { ...narrow, left: 30 });
    // Line 2: x = 0 + (6 - 5) * 10; the union spans both lines.
    expect(rectNumbers(source.measure())).toEqual({ x: 10, y: 100, width: 0, height: 40 });

    // The pane widens and the whole run fits on line 1.
    layOut(mark, { ...narrow, left: 30, firstLineChars: 100 });

    // x = 30 + 6 * 10, where the caret now paints.
    expect(rectNumbers(source.measure())).toEqual({ x: 90, y: 100, width: 0, height: 20 });
  });

  it('a caret in a mark that reflows across two lines (zoomed in): stays at the caret', () => {
    // Caret 8 characters into the run (between "h" and "i").
    const { paragraph, source } = openAtCaret(RUN_TEXT, RUN_START + 8, {
      left: 0,
      top: 100,
      charWidth: 10,
      lineHeight: 20,
      firstLineChars: 100,
      nextLineLeft: 0,
    });
    const mark = renderMark(paragraph, RUN_START, RUN_END);
    layOut(mark, {
      left: 30,
      top: 100,
      charWidth: 10,
      lineHeight: 20,
      firstLineChars: 100,
      nextLineLeft: 0,
    });
    // x = 30 + 8 * 10.
    expect(rectNumbers(source.measure())).toEqual({ x: 110, y: 100, width: 0, height: 20 });

    // Zoom 200 %: every length doubles and the run no longer fits on its line — "abcdefg" stays on
    // line 1, "hij" wraps to line 2, taking the caret with it.
    layOut(mark, {
      left: 60,
      top: 200,
      charWidth: 20,
      lineHeight: 40,
      firstLineChars: 7,
      nextLineLeft: 0,
    });

    // Line 2: x = 0 + (8 - 7) * 20; the union spans both lines, top=200, height=80.
    expect(rectNumbers(source.measure())).toEqual({ x: 20, y: 200, width: 0, height: 80 });
  });

  it('a caret measured twice in one frame still follows a later reflow', () => {
    // The popover's positioning can read the anchor twice in one frame, so two identical readings
    // in a row are no sign the layout has settled for good.
    const { paragraph, source } = openAtCaret(RUN_TEXT, RUN_START + 8, {
      left: 0,
      top: 100,
      charWidth: 10,
      lineHeight: 20,
      firstLineChars: 100,
      nextLineLeft: 0,
    });
    const mark = renderMark(paragraph, RUN_START, RUN_END);
    layOut(mark, {
      left: 30,
      top: 100,
      charWidth: 10,
      lineHeight: 20,
      firstLineChars: 100,
      nextLineLeft: 0,
    });
    expect(rectNumbers(source.measure())).toEqual({ x: 110, y: 100, width: 0, height: 20 });
    expect(rectNumbers(source.measure())).toEqual({ x: 110, y: 100, width: 0, height: 20 });

    // The next frame: the pane narrows and the run wraps after "abcde", taking the caret to line 2.
    layOut(mark, {
      left: 30,
      top: 100,
      charWidth: 10,
      lineHeight: 20,
      firstLineChars: 5,
      nextLineLeft: 0,
    });

    // Line 2: x = 0 + (8 - 5) * 10; the union spans both lines.
    expect(rectNumbers(source.measure())).toEqual({ x: 30, y: 100, width: 0, height: 40 });
  });

  it('a caret the rendered mark does not contain: anchors on the left edge of the mark', () => {
    // The mark has painted only its first part so far, which ends before the caret.
    const { paragraph, source } = openAtCaret(RUN_TEXT, RUN_START + 8, {
      left: 0,
      top: 100,
      charWidth: 10,
      lineHeight: 20,
      firstLineChars: 100,
      nextLineLeft: 0,
    });
    const mark = renderMark(paragraph, RUN_START, RUN_START + 4);
    layOut(mark, {
      left: 30,
      top: 100,
      charWidth: 10,
      lineHeight: 20,
      firstLineChars: 100,
      nextLineLeft: 0,
    });

    expect(rectNumbers(source.measure())).toEqual({ x: 30, y: 100, width: 0, height: 20 });
  });
});

describe('createNoteAnchorSource', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('measures the passed-in element directly when it is still connected', () => {
    const container = addEditorContainer();
    const caller = document.createElement('span');
    container.append(caller);
    stubClientRects(caller, [new DOMRect(30, 60, 12, 18)]);
    const getElementByKey = vi.fn();

    const source = createNoteAnchorSource(caller, 'note-1', getElementByKey);

    // leftEdgeRect: zero-width, full-height, pinned to the left edge.
    expect(rectNumbers(source.measure())).toEqual({ x: 30, y: 60, width: 0, height: 18 });
    expect(getElementByKey).not.toHaveBeenCalled();
  });

  it('returns undefined when the connected element has no layout', () => {
    const container = addEditorContainer();
    const caller = document.createElement('span');
    container.append(caller);
    stubClientRects(caller, []);

    const source = createNoteAnchorSource(caller, 'note-1', vi.fn());

    expect(source.measure()).toBeUndefined();
  });

  it('falls back to the key lookup once the passed-in element is detached', () => {
    const caller = document.createElement('span'); // never appended -> not connected
    const replacement = document.createElement('span');
    document.body.append(replacement);
    stubClientRects(replacement, [new DOMRect(15, 45, 10, 20)]);
    const getElementByKey = vi.fn().mockReturnValue(replacement);

    const source = createNoteAnchorSource(caller, 'note-1', getElementByKey);

    expect(rectNumbers(source.measure())).toEqual({ x: 15, y: 45, width: 0, height: 20 });
    expect(getElementByKey).toHaveBeenCalledWith('note-1');
  });

  it('returns undefined when detached and the key lookup finds nothing', () => {
    const caller = document.createElement('span'); // never appended -> not connected

    const source = createNoteAnchorSource(caller, 'note-1', vi.fn().mockReturnValue(undefined));

    expect(source.measure()).toBeUndefined();
  });

  it('returns undefined when detached and the looked-up element has no layout', () => {
    const caller = document.createElement('span'); // never appended -> not connected
    const replacement = document.createElement('span');
    document.body.append(replacement);
    stubClientRects(replacement, []);

    const source = createNoteAnchorSource(caller, 'note-1', vi.fn().mockReturnValue(replacement));

    expect(source.measure()).toBeUndefined();
  });

  it("reports the nearest '.editor-input' ancestor as the context element", () => {
    const editorInput = document.createElement('div');
    editorInput.className = 'editor-input';
    document.body.append(editorInput);
    const caller = document.createElement('span');
    editorInput.append(caller);

    const source = createNoteAnchorSource(caller, 'note-1', vi.fn());

    expect(source.contextElement).toBe(editorInput);
  });

  it('reports the element itself as the context element when no editor-input ancestor exists', () => {
    const caller = document.createElement('span');
    document.body.append(caller);

    const source = createNoteAnchorSource(caller, 'note-1', vi.fn());

    expect(source.contextElement).toBe(caller);
  });
});

describe('createPendingCommentCenterAnchorSource', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('returns undefined when the editor container has no layout', () => {
    const container = addEditorContainer();
    stubClientRects(container, []);

    const source = createPendingCommentCenterAnchorSource(container);

    expect(source.measure()).toBeUndefined();
  });

  it("returns a zero-size rect at the container's center when it has layout", () => {
    const container = addEditorContainer();
    stubClientRects(container, [new DOMRect(100, 200, 300, 400)]);

    const source = createPendingCommentCenterAnchorSource(container);

    // center x = 100 + 300/2 = 250; center y = 200 + 400/2 = 400; zero size.
    expect(rectNumbers(source.measure())).toEqual({ x: 250, y: 400, width: 0, height: 0 });
    expect(source.contextElement).toBe(container);
  });
});
