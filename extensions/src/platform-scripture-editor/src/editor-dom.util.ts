import { logger } from '@papi/frontend';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { Unsubscriber } from 'platform-bible-utils';
import { leftEdgeRect, LivePopoverAnchorSource, measureRange } from 'platform-bible-react';

/** The offset in pixels from the top of the window to scroll to show the verse number */
const VERSE_NUMBER_SCROLL_OFFSET = 80;

/**
 * How far below the scroll viewport's top edge a scrolled-to range's first line lands, before
 * {@link computeRangeScrollTop}'s quarter-viewport cap. The same breathing room `scrollToVerse`
 * leaves above a verse number, so on an ordinary pane — where the cap never engages — jumping to a
 * match and jumping to a verse look alike. On a pane shorter than 4× this offset they diverge:
 * `scrollToVerse` applies no cap.
 */
export const RANGE_SCROLL_TOP_OFFSET = VERSE_NUMBER_SCROLL_OFFSET;

/**
 * How far apart two scroll-geometry readings may be and still count as the same reading.
 *
 * Every number a scroll decision reads — a range's top, a container's `scrollTop`, its
 * `scrollHeight` — is a CSS pixel that the browser derives from device pixels, so on a display with
 * a fractional `devicePixelRatio` a value that has genuinely stopped changing can keep arriving
 * with a different fraction. Exact equality on those readings would report "still moving" for a
 * layout that has come to rest (burning a settle wait's whole bound), and "not quite in view" for a
 * range sitting flush against the viewport edge (scrolling a fraction of a pixel for nothing).
 * Sub-pixel, so it can never mask a real move: nothing a reader could see is smaller than a pixel.
 */
export const SCROLL_GEOMETRY_EPSILON_PX = 0.5;

/**
 * Whether two scroll-geometry readings are the same within {@link SCROLL_GEOMETRY_EPSILON_PX}.
 *
 * @param a One reading
 * @param b The other reading
 * @returns `true` when the two are indistinguishable at sub-pixel resolution
 */
export function isSameScrollGeometry(a: number, b: number): boolean {
  return Math.abs(a - b) <= SCROLL_GEOMETRY_EPSILON_PX;
}

/**
 * Interval time in ms to wait between polling the document to see if the editor has finished
 * loading. Hope to be obsoleted by a way to listen for the editor to finish loading
 */
const EDITOR_FIRST_LOAD_POLL_TIME = 100;

/** Number of times to poll before giving up on the editor loading */
const EDITOR_MAX_POLL_INTERVALS = 100; // Hopefully the editor will load in 10 seconds

/**
 * The USFM paragraph elements the editor renders.
 *
 * Shared rather than restated: both gutter overlays decide what counts as a paragraph, and they
 * have to agree — `ParagraphMarkerTooltipOverlay` picks the paragraph to describe, and
 * `CharacterMarkerBarOverlay` picks the one to anchor and measure against. Two copies of the
 * selector could drift, and a mismatch would leave the bar tracking a different element than the
 * tooltip names.
 */
export const EDITOR_PARA_SELECTOR = '.para[class*="usfm_"]';

/**
 * Finds the USFM paragraph element genuinely rendered at the given viewport coordinates, via the
 * browser's own hit-test (`elementFromPoint`) rather than a specific mouse event's `target` /
 * `relatedTarget`.
 *
 * The editor's own DOM churn (e.g. an active-paragraph decoration swap) can make the browser report
 * a `mouseout`/`mouseover` boundary crossing whose `target`/`relatedTarget` disagree with what is
 * actually under the cursor — the event fired because something in the DOM changed, not because the
 * cursor moved. Consumers that based a hover boundary on the event's target inherited that
 * disagreement and could show or hide a tooltip out of step with where the cursor really is.
 * Re-deriving the hovered paragraph from the live cursor position sidesteps the question of whether
 * a given event is "real" or churn-driven: whatever the cause, this always reports what is actually
 * there right now, so a spurious event can no longer disagree with reality.
 *
 * @param x Viewport x-coordinate (e.g. a mouse event's `clientX`)
 * @param y Viewport y-coordinate (e.g. a mouse event's `clientY`)
 * @returns The paragraph element at that point, or `undefined` if none
 */
export function paraAtPoint(x: number, y: number): HTMLElement | undefined {
  return document.elementFromPoint(x, y)?.closest<HTMLElement>(EDITOR_PARA_SELECTOR) ?? undefined;
}

/**
 * Run something on the editor's first load. This is a workaround until we can listen for the editor
 * to finish loading.
 *
 * Note: this is specifically designated for first load because it polls the document for the
 * placeholder text. The placeholder text doesn't show up between editor loads
 *
 * @param callback Callback to run when the editor has loaded
 * @returns Unsubscriber function to cancel running the callback on load
 */
export function runOnFirstLoad(callback: () => void): Unsubscriber {
  let intervalCount = 0;
  // Poll the document to see if the editor has loaded by looking for the placeholder element
  // This is a workaround until we can listen for the editor to finish loading
  const intervalId = setInterval(() => {
    const placeholderElement = document.querySelector('.editor-placeholder');
    if (placeholderElement) {
      intervalCount += 1;
      if (intervalCount > EDITOR_MAX_POLL_INTERVALS) {
        logger.warn(
          `Editor did not load after ${EDITOR_MAX_POLL_INTERVALS * EDITOR_FIRST_LOAD_POLL_TIME} ms. Giving up on runOnLoad`,
        );
        clearInterval(intervalId);
      }
      return;
    }

    // If we found the placeholder, run the callback and clear the interval
    try {
      callback();
    } finally {
      clearInterval(intervalId);
    }
  }, EDITOR_FIRST_LOAD_POLL_TIME);

  return () => {
    // Clear the interval when the unsubscriber is called
    clearInterval(intervalId);

    return true;
  };
}

/**
 * Finds the element that actually scrolls the given element's content: the nearest ancestor
 * (starting with the element itself) that is styled scrollable (`overflow-y: auto | scroll`) and —
 * unless `requireOverflow` is `false` — actually overflows (`scrollHeight > clientHeight`).
 *
 * The scroll container is discovered, not assumed: wrapper elements between the web view's sized
 * flex column and `.editor-container` leave `.editor-container` auto-height, so it grows to its
 * content height and scrolling it is a silent no-op — the web view's outer `tw:overflow-auto`
 * wrapper is what actually scrolls (regression diagnosed 2026-07-09). If a future layout change
 * re-constrains `.editor-container`, discovery resolves there instead — correct either way.
 *
 * @param fromElement Element whose scroll container to find
 * @param options `requireOverflow` (default `true`) also requires the candidate to actually
 *   overflow right now. Pass `false` when the lookup runs before content has loaded (e.g. once on
 *   mount, as in `ParagraphMarkerTooltipOverlay`), where "actually overflowing right now" would be
 *   the wrong criterion
 * @returns The scroll container, or undefined if no qualifying ancestor exists
 */
export function findScrollContainer(
  fromElement: HTMLElement,
  options?: { requireOverflow?: boolean },
): HTMLElement | undefined {
  const requireOverflow = options?.requireOverflow ?? true;
  let candidate: HTMLElement | undefined = fromElement;
  while (candidate) {
    const { overflowY } = window.getComputedStyle(candidate);
    if (
      (overflowY === 'auto' || overflowY === 'scroll') &&
      (!requireOverflow || candidate.scrollHeight > candidate.clientHeight)
    )
      return candidate;
    candidate = candidate.parentElement ?? undefined;
  }
  return undefined;
}

/**
 * Clamps a target's top edge into the scroll container's visible area, in `positionAnchor` content
 * coordinates — the shared vertical math behind every gutter-anchored overlay in this extension.
 *
 * `scrollContainer` must be an ANCESTOR of `positionAnchor`. Because they move together in the
 * viewport as the user scrolls, the viewport-relative delta is already the content-relative
 * position and no `scrollTop` addition is needed; the container's own viewport top is used only to
 * locate where the visible area begins. `positionAnchor.scrollTop` staying 0 while text visibly
 * scrolls is the symptom of having passed the wrong element.
 *
 * Two clamps, in order: pin to the top of the visible area when the target has scrolled above it,
 * then never exceed the target's own bottom edge, so an almost-fully-scrolled-past target does not
 * drag the anchor below itself.
 *
 * @param targetRect Viewport rect of the thing being tracked — a paragraph element or a caret range
 * @param anchorRect Viewport rect of the positioned element that owns the coordinate space
 * @param scrollContainerRect Viewport rect of the scrolling ancestor
 * @returns The clamped top, in `positionAnchor` content coordinates
 */
export function clampTopToVisibleArea(
  targetRect: { top: number; bottom: number },
  anchorRect: { top: number },
  scrollContainerRect: { top: number },
): number {
  const topInContent = targetRect.top - anchorRect.top;
  const bottomInContent = targetRect.bottom - anchorRect.top;
  const visibleAreaTop = scrollContainerRect.top - anchorRect.top;

  const ANCHOR_HEIGHT = 1;
  const clampedTop = Math.max(topInContent, visibleAreaTop);
  return Math.min(clampedTop, bottomInContent - ANCHOR_HEIGHT);
}

/**
 * Marks the throwaway span {@link measureBaselineOffset} appends. Exported so a test can tell the
 * probe's stubbed rect from its container's.
 */
export const BASELINE_PROBE_ATTRIBUTE = 'data-psc-baseline-probe';

/**
 * Measures where a container's first-line text baseline sits, in pixels below the container's own
 * top edge.
 *
 * The mechanism is a zero-height, zero-width `inline-block` span with `vertical-align: baseline`:
 * such a box has no content to sit above or below the baseline, so its top edge lands exactly ON
 * the baseline. The difference between its rect top and the container's rect top is therefore the
 * baseline offset.
 *
 * Uses rect math, NOT `offsetTop`: `offsetTop` is measured against the nearest positioned ancestor,
 * and callers here run inside a `position: relative` wrapper — so `offsetTop` would silently be
 * relative to the wrong element.
 *
 * Returns `undefined`, not `0`, when there is nothing to measure. Inside a `display: none` iframe
 * every rect degenerates to zeros (see the hidden-view rule in
 * `.claude/rules/cross-view-sync-hidden-views.md`), and a `0` there is indistinguishable from a
 * genuine zero offset — so a caller that cached it would misalign forever. `undefined` tells the
 * caller not to cache and to measure again once layout exists.
 *
 * @param container The element whose text baseline to measure. Must have inline content flow — a
 *   flex container is not a valid target, because flex items ignore `vertical-align`
 * @returns Pixels from the container's top edge to its first-line baseline, or `undefined` when
 *   there is no layout
 */
export function measureBaselineOffset(container: HTMLElement): number | undefined {
  const probe = container.ownerDocument.createElement('span');
  probe.setAttribute(BASELINE_PROBE_ATTRIBUTE, '');
  probe.style.cssText =
    'display:inline-block;width:0;height:0;vertical-align:baseline;pointer-events:none';
  container.appendChild(probe);

  try {
    const probeTop = probe.getBoundingClientRect().top;
    const containerRect = container.getBoundingClientRect();

    if (probeTop === 0 && containerRect.top === 0 && containerRect.height === 0) return undefined;

    return probeTop - containerRect.top;
  } finally {
    // `finally` so the probe never survives a throw. A leaked zero-width span would be invisible
    // and would accumulate one per measurement.
    probe.remove();
  }
}

/**
 * Computes the top edge of the element with the given bounding rect in the scroll container's
 * scroll coordinate space, i.e. the `scrollTop` value at which that top edge sits at the
 * container's content top edge.
 *
 * Rect math instead of an offsetParent walk: the scroll container is not necessarily positioned, so
 * it may not appear in the offsetParent chain at all. Takes the element's already-measured rect so
 * a caller that also needs the element's height reads `getBoundingClientRect()` only once.
 * Subtracting the container's `clientTop` (its top border width) targets the content edge rather
 * than the border edge, so the math stays correct if the container ever gains a top border.
 */
function getTopWithinScrollContainer(elementRect: DOMRect, scrollContainer: HTMLElement): number {
  return (
    scrollContainer.scrollTop +
    elementRect.top -
    scrollContainer.getBoundingClientRect().top -
    scrollContainer.clientTop
  );
}

/**
 * The verse marker element for a verse number in the editor content. Matches on the number alone —
 * there is no book or chapter in the selector, so whatever chapter is on screen answers.
 *
 * @param verseNum The verse number; below 1 there is no marker
 * @returns The verse marker element if found; otherwise undefined
 */
export function getVerseElement(verseNum: number): HTMLElement | undefined {
  if (verseNum < 1) return undefined;
  return (
    document.querySelector<HTMLElement>(
      `.editor-container span[data-marker="v"][data-number="${verseNum}"]`,
    ) ?? undefined
  );
}

/**
 * Downgrades a requested `'smooth'` scroll to `'instant'` when the user has asked their system to
 * reduce motion. `Element.scrollTo({ behavior: 'smooth' })` is a script-driven animation, not a CSS
 * transition, so it is invisible to this extension's `@media (prefers-reduced-motion: reduce)`
 * blocks and has to be downgraded explicitly here instead.
 *
 * Applied inside every scroll this module performs — `scrollToVerse`, `scrollToRange`,
 * `scrollToAnnotation` — rather than by their callers, so a reduced-motion user gets the same
 * treatment from every kind of jump. A caller passes the behavior it WANTS and never has to know
 * this exists.
 *
 * @param behavior The behavior the caller would otherwise use
 * @returns `'instant'` when `behavior` is `'smooth'` and the user prefers reduced motion; otherwise
 *   `behavior` unchanged (including when `matchMedia` is unavailable)
 */
export function resolveScrollBehavior(behavior: ScrollBehavior): ScrollBehavior {
  if (behavior === 'instant') return behavior;
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return behavior;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : behavior;
}

/**
 * Scrolls to the verse marker at the specified verse ref within the editor content.
 *
 * @param verseRef The verse ref whose matching verse marker to scroll to
 * @param behavior `'smooth'` for a move the user watches; `'instant'` to catch up a view that was
 *   hidden when the move was asked for. Downgraded to `'instant'` automatically for a user who
 *   prefers reduced motion — see {@link resolveScrollBehavior}
 * @returns The verse marker's DOM element if found; otherwise undefined
 */
export function scrollToVerse(
  verseRef: SerializedVerseRef,
  behavior: ScrollBehavior = 'smooth',
): HTMLElement | undefined {
  const verseElement = getVerseElement(verseRef.verseNum);

  // Scroll if we find the verse or we're at the start of the chapter. Discovering the scroll
  // container (a getComputedStyle + reflow ancestor walk) is deferred until inside this guard so the
  // rAF retry loop in model-text-panel does no layout work on frames where the verse marker has not
  // painted yet (verseNum > 1, no marker).
  if (verseElement || verseRef.verseNum <= 1) {
    // Fall back to the editor container for the chapter-start case where no verse marker exists
    const scrollStartElement =
      verseElement ?? document.querySelector<HTMLElement>('.editor-container') ?? undefined;
    const scrollContainerElement = scrollStartElement
      ? findScrollContainer(scrollStartElement)
      : undefined;

    if (scrollContainerElement) {
      // Scroll a bit above the verse so you can see a bit of context; the chapter-start case (no
      // verse marker) scrolls to the top.
      const verseOffsetTop = verseElement
        ? getTopWithinScrollContainer(
            verseElement.getBoundingClientRect(),
            scrollContainerElement,
          ) - VERSE_NUMBER_SCROLL_OFFSET
        : 0;

      scrollContainerElement.scrollTo({
        behavior: resolveScrollBehavior(behavior),
        top: verseOffsetTop,
      });
    }
  }

  return verseElement;
}

/**
 * Decides where to scroll so a range — a find match, a check result — is in view, or that it
 * already is. All values are in the scroll container's content coordinates (the space `scrollTop`
 * lives in).
 *
 * The end state is spelled out because "scroll until visible" is the rule that parks a range's
 * leading edge against the bottom of the viewport, with the text itself still out of sight:
 *
 * - A range already FULLY inside the viewport stays put, so stepping between results on one screen
 *   does not make the text jump.
 * - Otherwise the range's first line lands {@link RANGE_SCROLL_TOP_OFFSET} below the top edge, capped
 *   to a quarter of the viewport's own height. A short pane (Power mode gives an editor little
 *   room) would otherwise land the match past the midpoint, with barely any of the surrounding text
 *   visible below it; the cap keeps the landing spot proportional instead. On an ordinary pane the
 *   quarter-height is well above the fixed offset, so the cap never engages and the offset is
 *   exactly {@link RANGE_SCROLL_TOP_OFFSET}.
 * - A range taller than the viewport follows the same rule: its start is what a reader looks for, so
 *   the start is in view and the rest runs off the bottom.
 * - The target is clamped to the container's scroll range, so a range at the very start or end of a
 *   chapter lands wherever the chapter's own edge allows — still fully in view.
 *
 * @returns The `scrollTop` to scroll to, or `undefined` when the range is already fully in view
 */
export function computeRangeScrollTop({
  rangeTop,
  rangeBottom,
  scrollTop,
  clientHeight,
  scrollHeight,
}: {
  rangeTop: number;
  rangeBottom: number;
  scrollTop: number;
  clientHeight: number;
  scrollHeight: number;
}): number | undefined {
  if (
    rangeTop >= scrollTop - SCROLL_GEOMETRY_EPSILON_PX &&
    rangeBottom <= scrollTop + clientHeight + SCROLL_GEOMETRY_EPSILON_PX
  )
    return undefined;
  const effectiveOffset = Math.min(RANGE_SCROLL_TOP_OFFSET, clientHeight / 4);
  return clampToScrollRange(rangeTop - effectiveOffset, { clientHeight, scrollHeight });
}

/**
 * Clamps a would-be `scrollTop` into the range the container can actually scroll to, so a target
 * near the start or end of the content lands wherever the content's own edge allows.
 *
 * @param top The `scrollTop` a scroll decision arrived at
 * @param viewport The container's current `clientHeight` and `scrollHeight`
 * @returns `top`, clamped to `[0, scrollHeight - clientHeight]`
 */
export function clampToScrollRange(
  top: number,
  { clientHeight, scrollHeight }: { clientHeight: number; scrollHeight: number },
): number {
  return Math.min(Math.max(top, 0), Math.max(0, scrollHeight - clientHeight));
}

/**
 * The DOM range of the current selection, when that selection is inside the editor content.
 *
 * Lexical writes the DOM selection when the engine applies a selection whether or not the editor
 * has focus, so this reads where `EditorRef.setSelection` actually put the selection, in the
 * coordinates of the text on screen. Scoped to `.editor-container` because the footnote and comment
 * editors render their own content outside it, and a selection there is not in the chapter text.
 *
 * @returns The selection's range, or `undefined` when nothing is selected in the editor content
 */
export function getEditorSelectionRange(): Range | undefined {
  const selection = document.getSelection();
  if (!selection || selection.rangeCount === 0) return undefined;
  const range = selection.getRangeAt(0);
  const { commonAncestorContainer } = range;
  const element =
    commonAncestorContainer instanceof Element
      ? commonAncestorContainer
      : commonAncestorContainer.parentElement;
  return element?.closest('.editor-container') ? range : undefined;
}

/**
 * Everything a scroll-to-range decision needs to read from the DOM: the range's own top and height
 * within its scroll container, and that container's current scroll position and size — the inputs
 * {@link computeRangeScrollTop} takes.
 */
export interface RangeScrollGeometry {
  /** The container that actually scrolls the range into view */
  scrollContainer: HTMLElement;
  /** The range's top edge, in the container's scroll coordinate space */
  rangeTop: number;
  /** The range's height */
  rangeHeight: number;
  /** The container's current `scrollTop` */
  scrollTop: number;
  /** The container's current `clientHeight` */
  clientHeight: number;
  /** The container's current `scrollHeight` */
  scrollHeight: number;
}

/**
 * The result of {@link measureRangeScrollGeometry}: either the measured geometry, or which of the
 * two reasons kept it from being measured. A discriminated result rather than a plain
 * `RangeScrollGeometry | undefined` because its two callers have to treat the reasons differently —
 * `scrollToRange` falls back to the verse on `'no-layout'` but reports "already in view" on
 * `'no-scroll-container'` — and folding both into one `undefined` would erase exactly the
 * distinction a caller needs.
 */
export type RangeScrollMeasurement =
  | { status: 'no-layout' }
  | { status: 'no-scroll-container' }
  | ({ status: 'measured' } & RangeScrollGeometry);

/**
 * Measures everything a scroll-to-range decision needs, from the real scroll container, in one pass
 * — the single measurement path both `scrollToRange` and the settle loop in `useScrollToRange`
 * read, so the two can never sample different elements and disagree about whether the layout has
 * finished growing.
 *
 * @param range The DOM range to measure; must be inside the editor content
 * @param knownScrollContainer A container a previous call already discovered for this same range,
 *   to skip re-walking the ancestors. Only honoured while it is still in the document, so a
 *   container torn out by a chapter load falls back to a fresh walk rather than being measured
 *   after the fact
 * @returns `'no-layout'` when there is no layout to measure (inside a `display: none` iframe every
 *   rect is zeros); `'no-scroll-container'` when there is layout but no scrollable ancestor;
 *   otherwise the measured geometry
 */
export function measureRangeScrollGeometry(
  range: Range,
  knownScrollContainer?: HTMLElement,
): RangeScrollMeasurement {
  const rect = range.getBoundingClientRect();
  if (rect.top === 0 && rect.left === 0 && rect.width === 0 && rect.height === 0)
    return { status: 'no-layout' };

  const startElement =
    range.startContainer instanceof HTMLElement
      ? range.startContainer
      : range.startContainer.parentElement;
  const scrollContainer =
    knownScrollContainer?.isConnected && startElement?.isConnected
      ? knownScrollContainer
      : ((startElement ? findScrollContainer(startElement) : undefined) ?? undefined);
  if (!scrollContainer) return { status: 'no-scroll-container' };

  return {
    status: 'measured',
    scrollContainer,
    rangeTop: getTopWithinScrollContainer(rect, scrollContainer),
    rangeHeight: rect.height,
    scrollTop: scrollContainer.scrollTop,
    clientHeight: scrollContainer.clientHeight,
    scrollHeight: scrollContainer.scrollHeight,
  };
}

/**
 * Scrolls the editor so a DOM range is in view, landing where {@link computeRangeScrollTop} says.
 *
 * Measures the range itself rather than its verse: a verse's start can be on screen while the text
 * in it is still below the fold.
 *
 * @param range The DOM range to bring into view; must be inside the editor content
 * @param behavior `'smooth'` for a jump the user watches; `'instant'` to catch up a view that was
 *   hidden when the jump was asked for. Downgraded to `'instant'` automatically for a user who
 *   prefers reduced motion — see {@link resolveScrollBehavior}
 * @returns `true` when the range was measured, whether or not it needed a scroll; `false` when it
 *   has no layout to measure (inside a `display: none` iframe every rect is zeros), so the caller
 *   can fall back
 */
export function scrollToRange(range: Range, behavior: ScrollBehavior): boolean {
  const measurement = measureRangeScrollGeometry(range);
  if (measurement.status === 'no-layout') return false;
  // No scroll container: nothing overflows, so everything is already in view.
  if (measurement.status === 'no-scroll-container') return true;

  const targetTop = computeRangeScrollTop({
    rangeTop: measurement.rangeTop,
    rangeBottom: measurement.rangeTop + measurement.rangeHeight,
    scrollTop: measurement.scrollTop,
    clientHeight: measurement.clientHeight,
    scrollHeight: measurement.scrollHeight,
  });
  if (targetTop !== undefined)
    measurement.scrollContainer.scrollTo({
      behavior: resolveScrollBehavior(behavior),
      top: targetTop,
    });
  return true;
}

/**
 * The selector for every element of the annotation with the given ID within the editor content.
 * Annotation/comment ids can contain CSS metacharacters (":", ".", etc.); escaping the whole class
 * token via CSS.escape keeps the selector valid (same approach as selectorForAnnotationIds in
 * platform-enhanced-resources' scripture-pane.component.tsx).
 */
function annotationSelector(id: string): string {
  return `.editor-container .${CSS.escape(`annotationId-${id}`)}`;
}

/**
 * Finds the (first) element of the annotation with the given ID within the editor content.
 *
 * @param id The ID of the annotation to find
 * @returns The DOM element of the annotation if found; otherwise undefined
 */
function getAnnotationElement(id: string): HTMLElement | undefined {
  return document.querySelector<HTMLElement>(annotationSelector(id)) ?? undefined;
}

/**
 * The viewport rect around every rendered fragment of the annotation with the given ID. An
 * annotation over wrapped or partly formatted text renders as several elements, each with one or
 * more line boxes.
 *
 * @param id The ID of the annotation to measure
 * @returns The union of the fragments' client rects, or undefined when nothing is rendered
 */
export function measureAnnotation(id: string): DOMRect | undefined {
  const rects = Array.from(document.querySelectorAll(annotationSelector(id))).flatMap((element) =>
    Array.from(element.getClientRects()),
  );
  const [first, ...rest] = rects;
  if (!first) return undefined;
  const bounds = rest.reduce(
    (accumulator, rect) => ({
      left: Math.min(accumulator.left, rect.left),
      top: Math.min(accumulator.top, rect.top),
      right: Math.max(accumulator.right, rect.right),
      bottom: Math.max(accumulator.bottom, rect.bottom),
    }),
    { left: first.left, top: first.top, right: first.right, bottom: first.bottom },
  );
  return new DOMRect(
    bounds.left,
    bounds.top,
    bounds.right - bounds.left,
    bounds.bottom - bounds.top,
  );
}

/**
 * Builds the anchor source for the pending-comment popover, in the shape `useLivePopoverAnchor`'s
 * `setSource` takes. The editor re-renders the selected text to mark it as the pending comment,
 * which moves `range` to the start of its text node (or detaches it), so this follows two phases:
 * until the mark exists, it follows `range` itself, bailing out once the range no longer matches
 * what it was when the popover opened; once the mark exists, it follows the union of the mark's
 * rendered fragments, at the horizontal fraction along the mark's width where the caret sat when
 * the popover opened. Anchoring on a fraction of the mark's width, rather than a fixed pixel
 * offset, keeps the anchor at the caret's original position through a zoom change.
 *
 * @param range The DOM range the selection had when the popover opened. The caller clones it from
 *   the live selection first, since a live selection range keeps moving as the user reads or
 *   edits.
 * @param annotationId The id of the annotation the editor renders for the pending comment.
 * @param contextElement Element to report as `contextElement`; passed straight through.
 * @returns The anchor source for `useLivePopoverAnchor().setSource`.
 */
export function createPendingCommentAnchorSource(
  range: Range,
  annotationId: string,
  contextElement: Element,
): LivePopoverAnchorSource {
  const rangeRectAtOpen = measureRange(range);
  const { startContainer, startOffset, endContainer, endOffset } = range;
  const isRangeIntact = () =>
    startContainer.isConnected &&
    range.startContainer === startContainer &&
    range.startOffset === startOffset &&
    range.endContainer === endContainer &&
    range.endOffset === endOffset;

  let fractionInAnnotation: number | undefined;
  return {
    measure: () => {
      const annotationRect = measureAnnotation(annotationId);
      if (!annotationRect) {
        // Between the re-render and the mark appearing, a moved range would place the popover at
        // the start of the text node; keep the last good rect instead.
        if (!isRangeIntact()) return undefined;
        const rangeRect = measureRange(range);
        return rangeRect && leftEdgeRect(rangeRect);
      }
      if (fractionInAnnotation === undefined)
        fractionInAnnotation =
          rangeRectAtOpen && annotationRect.width > 0
            ? Math.min(
                Math.max((rangeRectAtOpen.left - annotationRect.left) / annotationRect.width, 0),
                1,
              )
            : 0;
      return new DOMRect(
        annotationRect.left + fractionInAnnotation * annotationRect.width,
        annotationRect.top,
        0,
        annotationRect.height,
      );
    },
    contextElement,
  };
}

/**
 * Scrolls to the annotation with the given ID within the editor content.
 *
 * @param id The ID of the annotation to scroll to
 * @returns The DOM element of the annotation if found; otherwise undefined
 */
export function scrollToAnnotation(id: string): HTMLElement | undefined {
  const annotationElement = getAnnotationElement(id);

  const scrollContainerElement = annotationElement
    ? findScrollContainer(annotationElement)
    : undefined;

  // Scroll if we find the annotation
  if (scrollContainerElement && annotationElement) {
    const viewport = {
      scrollTop: scrollContainerElement.scrollTop,
      clientHeight: scrollContainerElement.clientHeight,
      scrollHeight: scrollContainerElement.scrollHeight,
    };

    // Read the annotation's rect once; both its top-within-container and its height derive from it.
    const annotationRect = annotationElement.getBoundingClientRect();
    const annotationTop = getTopWithinScrollContainer(annotationRect, scrollContainerElement);
    const annotationBottom = annotationTop + annotationRect.height;

    // The top-aligned landing spot, and — by answering `undefined` — whether the annotation is
    // already fully visible and needs no scroll at all. Shared with `scrollToRange` so the two
    // cannot drift on where a target lands or on what counts as "already in view". An annotation is
    // the only target that may instead be aligned to the BOTTOM edge, which is the one part of the
    // decision below that is this function's own.
    const topAlignedScrollTop = computeRangeScrollTop({
      rangeTop: annotationTop,
      rangeBottom: annotationBottom,
      ...viewport,
    });
    if (topAlignedScrollTop === undefined) return annotationElement;

    // Align to whichever edge the annotation is already closer to, so it travels the shorter
    // distance.
    const distanceToTop = Math.abs(annotationTop - viewport.scrollTop);
    const distanceToBottom = Math.abs(
      viewport.scrollTop + viewport.clientHeight - annotationBottom,
    );
    const targetTop =
      distanceToTop <= distanceToBottom
        ? topAlignedScrollTop
        : clampToScrollRange(
            annotationBottom - viewport.clientHeight + VERSE_NUMBER_SCROLL_OFFSET,
            viewport,
          );

    scrollContainerElement.scrollTo({
      behavior: resolveScrollBehavior('smooth'),
      top: targetTop,
    });
  }

  return annotationElement;
}

/**
 * Whether an incoming reference is this view's own echo — the reference it just published coming
 * back through its scroll group.
 *
 * A read-only reference panel sits on scroll group 0, so a verse click inside it publishes to the
 * group and returns immediately as a prop update. Scrolling for that echo would drag the user's own
 * click target to the top of the viewport right after they clicked it.
 *
 * @param lastPublishedScrRef The reference this view last published, or `undefined` if none is
 *   outstanding.
 * @param scrRef The incoming reference.
 * @returns `true` when the incoming reference is the outstanding echo and no scroll should happen.
 */
export function isEchoOfPublishedScrRef(
  lastPublishedScrRef: SerializedVerseRef | undefined,
  scrRef: SerializedVerseRef,
): boolean {
  return isSameVerseRef(lastPublishedScrRef, scrRef);
}

/**
 * Whether two references name the same verse, to the precision this extension's scroll decisions
 * care about: book, chapter and verse, ignoring everything else a `SerializedVerseRef` can carry
 * (versification, a verse string's range or segment suffix).
 *
 * @param a One reference, or `undefined`
 * @param b The other reference
 * @returns `true` when `a` is present and names the same verse as `b`
 */
export function isSameVerseRef(a: SerializedVerseRef | undefined, b: SerializedVerseRef): boolean {
  return !!a && a.book === b.book && a.chapterNum === b.chapterNum && a.verseNum === b.verseNum;
}

/**
 * Whether there is anything new to scroll to since the last scroll this view performed.
 *
 * Guards the bare reveal: a panel that shares a tab stack with other views is re-shown constantly,
 * and re-scrolling every time would discard a scroll position the user set by hand before switching
 * tabs. The chapter content is part of the identity because a reveal can beat the chapter load —
 * when content arrives for the same reference, that IS new and does need a scroll.
 *
 * @param lastScrolledFor What the last performed scroll was for, or `undefined` if none yet.
 * @param scrRef The reference to scroll to.
 * @param usj The chapter content currently loaded, compared by identity.
 * @returns `true` when the reference or the content differs from the last scroll.
 */
export function hasNewScrollTarget(
  lastScrolledFor: { scrRef: SerializedVerseRef; usj: unknown } | undefined,
  scrRef: SerializedVerseRef,
  usj: unknown,
): boolean {
  if (!lastScrolledFor) return true;
  return (
    lastScrolledFor.usj !== usj ||
    lastScrolledFor.scrRef.book !== scrRef.book ||
    lastScrolledFor.scrRef.chapterNum !== scrRef.chapterNum ||
    lastScrolledFor.scrRef.verseNum !== scrRef.verseNum
  );
}

/**
 * Max ms to wait for a verse scroll to become possible before giving up — the rAF retry in the
 * model text panel, the settle loop in the resource text panel, and the settle loop in
 * `useScrollToRange` (this extension's range-jump hook) all bound themselves with it. The usual
 * reason for reaching it is a verse marker genuinely absent from the USJ (a `\v 16-17` range
 * publishes no marker for 17).
 */
export const SCROLL_MAX_WAIT_MS = 2000;

/** What a {@link waitForLayoutToSettle} settle callback decides once two consecutive samples agree. */
export type SettleOutcome = 'settled' | 'keep-waiting';

export interface WaitForLayoutToSettleOptions<TSample> {
  /**
   * Takes one reading of whatever geometry decides settling. Called once synchronously and then
   * again once per animation frame. The very first call has nothing to compare against, so it can
   * never settle on its own — settling always needs at least two agreeing samples.
   */
  sample: () => TSample;
  /**
   * Whether two consecutive samples count as unchanged, i.e. the layout they describe has stopped
   * moving.
   */
  samplesMatch: (previous: TSample, current: TSample) => boolean;
  /**
   * Runs once two consecutive samples agree.
   *
   * `isTimedOut` is `true` when {@link SCROLL_MAX_WAIT_MS} has already elapsed by this same reading.
   * An agreement that arrives exactly as time runs out still goes to `onSettled`, never to
   * `onTimedOut` — `onTimedOut` only ever runs when no agreement was reached to hand it — so a
   * caller that would otherwise ask to wait again (re-applying something lost, or waiting for a
   * measurement to produce something it has not yet produced) has to check this flag and finalize
   * instead, the same way it would from `onTimedOut`.
   *
   * Returning `'keep-waiting'` discards the agreement: the next two samples have to agree again
   * before this runs a second time, exactly as if sampling had just started. Doing that while
   * `isTimedOut` is `true` is safe — the bound still governs, via `onTimedOut` — but it reads, from
   * a log or a test, as though the layout never settled at all, so a caller with something useful
   * to say on timeout should say it here instead.
   */
  onSettled: (sample: TSample, isTimedOut: boolean) => SettleOutcome;
  /**
   * Runs once, only along the path where the bound elapses on a reading that never agreed with its
   * predecessor, or agreed but was rejected by `onSettled` while already out of time. Never runs
   * once `onSettled` has returned `'settled'`.
   */
  onTimedOut: () => void;
}

/**
 * Repeatedly samples layout, once per animation frame, until two consecutive samples agree — the
 * shape behind this extension's "wait for the editor to finish laying out, then act once" loops (a
 * range jump's selection geometry, a revealed pane's content height). Bounded by
 * {@link SCROLL_MAX_WAIT_MS} throughout, measured from the call and never reset, so any number of
 * `'keep-waiting'` results cannot push the deadline out.
 *
 * @returns A cancel function. Once called, no callback runs again; an effect's cleanup should call
 *   it unconditionally.
 */
export function waitForLayoutToSettle<TSample>({
  sample,
  samplesMatch,
  onSettled,
  onTimedOut,
}: WaitForLayoutToSettleOptions<TSample>): () => void {
  let isCancelled = false;
  let previous: { sample: TSample } | undefined;
  const start = Date.now();

  const tick = () => {
    if (isCancelled) return;
    const isTimedOut = Date.now() - start > SCROLL_MAX_WAIT_MS;
    const current = sample();
    // `previous` starts `undefined` so the very first sample — whatever it reads — can never
    // trivially settle against nothing.
    const isSettled = previous !== undefined && samplesMatch(previous.sample, current);
    previous = { sample: current };

    if (isSettled) {
      const outcome = onSettled(current, isTimedOut);
      if (outcome === 'settled') return;
      // The agreement doesn't count: the next two samples have to agree again, exactly as if
      // sampling had just started.
      previous = undefined;
    }

    if (isTimedOut) {
      onTimedOut();
      return;
    }
    requestAnimationFrame(tick);
  };
  tick();

  return () => {
    isCancelled = true;
  };
}
