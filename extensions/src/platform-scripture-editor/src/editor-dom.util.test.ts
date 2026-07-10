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

import { afterEach, describe, expect, it, vi, Mock } from 'vitest';
import { findScrollContainer, scrollToAnnotation, scrollToVerse } from './editor-dom.util';

vi.mock('@papi/frontend', () => ({
  logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));

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

  it('returns undefined and does not scroll when the annotation does not exist', () => {
    const { wrapperScrollTo } = buildAnnotationDom();

    const annotationElement = scrollToAnnotation('no-such-thread');

    expect(annotationElement).toBeUndefined();
    expect(wrapperScrollTo).not.toHaveBeenCalled();
  });
});
