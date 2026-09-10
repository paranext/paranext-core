import { useViewVisibility, Z_INDEX_OVERLAY } from 'platform-bible-react';
import { ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  EDITOR_PARA_SELECTOR,
  findScrollContainer,
  measureBaselineOffset,
} from '../editor-dom.util';
import { computeBarTop, resolveActiveLineRect } from './character-marker-bar.utils';
import { useEditorSelectionVersion } from './use-editor-selection-version.hook';

/** The editor element the caret must be inside for the bar to track it. */
const EDITOR_ROOT_SELECTOR = '.editor-input';

/**
 * The vertical center of the trigger's icon, in pixels below the bar container's top edge.
 *
 * This is the trigger side of the alignment, and it is deliberately NOT a text baseline. The
 * trigger is icon-only (there is no label to probe) and `Button` is `inline-flex` (flex items
 * ignore `vertical-align`, so a baseline probe would be meaningless inside it). The icon's optical
 * center is the analogue that matters: it is the mark the eye lines up with the scripture text.
 *
 * @param barContainer The absolutely-positioned container whose `top` is being computed
 * @returns Pixels from the container's top to the icon's vertical center, or `undefined` when there
 *   is no layout or no icon yet
 */
function measureTriggerIconCenter(barContainer: HTMLElement): number | undefined {
  const icon = barContainer.querySelector('svg');
  if (!icon) return undefined;

  const iconRect = icon.getBoundingClientRect();
  const containerRect = barContainer.getBoundingClientRect();
  // `||`, not `&&`: EITHER zero height means there is nothing meaningful to centre on. A zero-height
  // icon inside a laid-out container is not "partially measurable" — it yields a centre equal to the
  // icon's top edge, which is garbage that would then be CACHED as the alignment term.
  if (iconRect.height === 0 || containerRect.height === 0) return undefined;

  return iconRect.top + iconRect.height / 2 - containerRect.top;
}

export type CharacterMarkerBarOverlayProps = {
  /** The editor this overlay positions a bar beside. */
  children: ReactNode;
  /**
   * The bar to pin to the inline-end edge, tracking the active line. Deliberately a slot: this
   * component knows nothing about character markers, so the same shell could anchor anything.
   *
   * Optional so a caller that has no bar to show — Power mode — can keep mounting this component
   * rather than swapping it out for a different element. React reconciles by element type, so
   * choosing between two different wrappers at the same tree position would unmount and remount the
   * editor subtree on every interface-mode change, losing Lexical's undo history and the scroll
   * position. Leaving the slot empty changes only what is rendered beside the editor.
   */
  bar?: ReactNode;
};

/**
 * Positions a bar in the gutter on the inline-end edge of the editor's text column, tracking the
 * line the caret is on.
 *
 * Only the vertical axis is computed. Horizontal placement is `inset-inline-end: 0`, which pins the
 * bar to the text column's trailing edge and mirrors for RTL with no math — and makes the bar
 * immune to paragraph indentation (`\q`, `\q2`) by construction. The space it occupies is reserved
 * with a Simple-scoped `padding-inline-end` in `_simple-mode.scss`, and this component sizes the
 * bar to that same reserved width, so the bar can never overlap project text — see the `style` note
 * below.
 */
export function CharacterMarkerBarOverlay({ children, bar }: CharacterMarkerBarOverlayProps) {
  const [top, setTop] = useState(0);

  // positionAnchorRef: the position:relative element; the coordinate origin for all rect math.
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const positionAnchorRef = useRef<HTMLDivElement>(null);
  // The bar container, so the trigger's icon can be measured in the same coordinate space its `top`
  // is expressed in.
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const barContainerRef = useRef<HTMLDivElement>(null);
  // The scrolling ancestor, resolved once on mount (see the requireOverflow note below).
  const scrollContainerRef = useRef<HTMLElement | undefined>(undefined);
  const rafIdRef = useRef<number>(0);
  // Collapses any number of changes arriving while hidden into a single catch-up.
  const pendingCatchUpRef = useRef(false);
  // Distinguishes "no caret yet, show me at the first paragraph" from "the caret left the editor,
  // hold the last position" — both reach the same branch but want opposite behavior.
  const hasPositionedRef = useRef(false);
  // The alignment term, measured once and reused (and re-measured on a font-metrics change — see
  // `fontMetricsRef` below). `undefined` means "not measured yet" — which is also what a measurement
  // taken while hidden yields, so a hidden mount leaves this unset and the next visible recompute
  // fills it in. See `measureBaselineOffset`'s note on why it never returns 0 for the no-layout case.
  const baselineOffsetRef = useRef<number | undefined>(undefined);
  // The paragraph's computed font metrics `baselineOffsetRef` was last measured against. Caching on
  // "is the offset set yet" alone would go stale on an explicit font-size/zoom change or a
  // `font-family` swap (e.g. a class or theme change) — both scenarios the ResizeObserver below
  // exists to catch — so the cache is keyed on the metrics themselves instead, and a mismatch
  // triggers a re-measurement.
  //
  // The key holds EVERY metric copied onto the measuring element, not just the obvious three: a
  // `font-weight`/`font-style`/`letter-spacing` change (a theme or class swap, or simply moving the
  // caret from body text into a bold heading) changes the measured baseline too, so keying on a
  // subset would silently reuse an offset measured under different metrics.
  //
  // This key does NOT catch a webfont finishing an asynchronous load: `getComputedStyle().fontFamily`
  // reports the SPECIFIED font-family stack (e.g. `'Gentium Plus', serif`), not which face in that
  // stack is actually being painted, so it stays identical before and after the swap — as do
  // `fontSize` and (for `line-height: normal`) `lineHeight`. That case is instead handled by the
  // `document.fonts` `loadingdone` listener below, which invalidates this cache directly rather than
  // trying to detect the swap through a computed-style diff.
  const fontMetricsRef = useRef<
    | {
        fontFamily: string;
        fontSize: string;
        fontWeight: string;
        fontStyle: string;
        lineHeight: string;
        letterSpacing: string;
      }
    | undefined
  >(undefined);
  // A hidden element OUTSIDE `.editor-input`, given the paragraph's computed text metrics so its line
  // box (the CSS "strut" a container gets from its own font/line-height, even with no text content)
  // can be probed for a baseline without ever touching Lexical's contenteditable — appending even a
  // synchronous probe span inside the editor would fire Lexical's MutationObserver as a microtask and
  // risk perturbing undo history, a known-fragile area (see the deferred USJ-round-trip undo bug).
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const measuringElementRef = useRef<HTMLSpanElement>(null);

  const isViewVisible = useViewVisibility();
  const selectionVersion = useEditorSelectionVersion();

  // Visibility is read through a ref, never a dependency, so `recompute` has a STABLE identity. If
  // it closed over `isViewVisible` instead, every tab activation would re-create it, re-run the
  // effects below (re-attaching the scroll listener and the ResizeObserver, and recomputing twice),
  // and — worse — that incidental re-run would mask the deliberate catch-up below, making it
  // untestable. The ref is written in the same layout effect that consumes the catch-up, so it is
  // always current before any deferred recompute reads it.
  const isVisibleRef = useRef(isViewVisible);

  const recompute = useCallback(() => {
    // No bar in the slot (Power mode): there is nothing to position. Checked before the hidden-view
    // deferral below so a hidden Power-mode view never accumulates a catch-up it has no use for.
    // Read off the DOM rather than the `bar` prop because this callback is deliberately
    // identity-stable (see `isVisibleRef`), and `bar` is a fresh JSX element on every render.
    if (!barContainerRef.current) return;

    // Hidden case: rc-dock hides an inactive tab's pane with `display: none`, which keeps this
    // iframe's JavaScript running but removes all layout — every rect read returns zero. Measuring
    // here would store a garbage top and flash it on tab activation, so defer instead and catch up
    // in the layout effect below, which is the ONLY path back to a correct position after a change
    // arrives while hidden. One flag, not a queue: any number of changes while hidden collapse into
    // a single catch-up, because only the latest position matters. In Simple mode (one visible tab
    // per stack) hidden is the COMMON case, not an edge case.
    if (!isVisibleRef.current) {
      pendingCatchUpRef.current = true;
      return;
    }

    const positionAnchor = positionAnchorRef.current;
    const scrollContainer = scrollContainerRef.current;
    if (!positionAnchor || !scrollContainer) return;

    // No editor yet. Unlike the hidden-view case above there is no deferral, because at the real
    // mount site the overlay is only rendered once the editor tree exists — the bar is not mounted
    // against an editor-less anchor. If that ever stops holding, this needs the same catch-up
    // treatment the hidden case gets.
    const editorRoot = positionAnchor.querySelector<HTMLElement>(EDITOR_ROOT_SELECTOR);
    if (!editorRoot) return;

    // Layout-less case, DISTINCT from the hidden-view case above. `useViewVisibility` reports on
    // this iframe's own visibility (whole-tab), so it is `true` while an ANCESTOR INSIDE the
    // document is `display: none` — which the empty-chapter view does, hiding the editor subtree
    // with `tw:hidden` rather than unmounting it. Every rect then reads zero. Positioning here
    // would not merely store a garbage top; it would latch `hasPositionedRef`, and the no-caret
    // branch below returns early once that is set — so the first-paragraph re-anchor would never
    // run and the bar would sit at the clamped top until the user's first click. Bail before
    // either happens. Nothing needs to schedule the repair: `display: none` collapses the
    // observed anchor to a 0x0 box, so regaining layout is itself a resize and the
    // ResizeObserver below re-runs this.
    const editorRootRect = editorRoot.getBoundingClientRect();
    if (editorRootRect.width === 0 && editorRootRect.height === 0) return;

    const activeLine = resolveActiveLineRect(window.getSelection() ?? undefined, editorRoot);
    let targetRect = activeLine?.rect;
    // The paragraph whose font metrics the baseline is measured against: the one the caret is
    // actually in, NOT the editor's first paragraph. On a chapter opening the first paragraph is
    // typically a `\mt1` at 166% font-size, so measuring it would put the trigger several pixels low
    // on every body line — the same magnitude of misalignment this alignment exists to fix.
    let measurementPara = activeLine?.para;

    if (!targetRect) {
      // Before the first caret, anchor to the first paragraph so the bar is visible on load —
      // discoverability is the point of the feature. After that, no caret in an editor paragraph
      // means the popover took focus, so HOLD the last position rather than jumping back to the
      // top of the editor as the popover opens and closes.
      if (hasPositionedRef.current) return;
      const firstPara = editorRoot.querySelector<HTMLElement>(EDITOR_PARA_SELECTOR);
      if (!firstPara) return;
      targetRect = firstPara.getBoundingClientRect();
      // Measure against the SAME paragraph the position is anchored to, so the two halves of the
      // alignment can never describe different paragraphs.
      measurementPara = firstPara;
    }

    hasPositionedRef.current = true;

    // Measured lazily and cached, keyed on the CARET'S paragraph's computed font metrics
    // (fontMetricsRef): metrics normally don't change as the caret moves within body text, so this
    // usually runs once per mount rather than once per caret move — but it MUST re-run on an explicit
    // font-size/zoom change, a `font-family` change, or a caret move between paragraphs with
    // different metrics (body text ↔ an `\mt1` heading at 166%), so "is the offset set yet" alone is
    // the wrong cache key (it would go stale in exactly the scenario the ResizeObserver below exists
    // to catch). The webfont-load case this key can't see is handled separately — see the
    // `document.fonts` effect below.
    //
    // Both halves — the icon centre and the baseline probe — must succeed: a partial measurement
    // would align the trigger against a baseline that was never read. Leaving the ref unset is the
    // correct outcome — `computeBarTop`'s default treats it as 0, i.e. the bar stays top-aligned,
    // and the next recompute tries again.
    const para = measurementPara;
    const measuringElement = measuringElementRef.current;
    const barContainer = barContainerRef.current;
    if (para && measuringElement && barContainer) {
      const paraStyle = window.getComputedStyle(para);
      const { fontFamily, fontSize, fontWeight, fontStyle, lineHeight, letterSpacing } = paraStyle;
      const cachedMetrics = fontMetricsRef.current;
      const metricsChanged =
        !cachedMetrics ||
        cachedMetrics.fontFamily !== fontFamily ||
        cachedMetrics.fontSize !== fontSize ||
        cachedMetrics.fontWeight !== fontWeight ||
        cachedMetrics.fontStyle !== fontStyle ||
        cachedMetrics.lineHeight !== lineHeight ||
        cachedMetrics.letterSpacing !== letterSpacing;

      if (metricsChanged) {
        // Measured HERE rather than above the cache check, even though it is the trigger's half of
        // the alignment rather than the paragraph's: `iconCenter` feeds nothing but the offset
        // below, and it costs two `getBoundingClientRect` reads. With a warm cache — the steady
        // state while scrolling — measuring it before the guard would throw both reads away on
        // every frame. Resolving it before the probe still means a bar with no icon never touches
        // the measuring element at all.
        const iconCenter = measureTriggerIconCenter(barContainer);
        if (iconCenter !== undefined) {
          // Copy the paragraph's computed text metrics onto the hidden off-editor element so its
          // line-box strut matches the real paragraph's — no filler text needed, the strut alone is
          // what gets measured.
          measuringElement.style.fontFamily = fontFamily;
          measuringElement.style.fontSize = fontSize;
          measuringElement.style.fontWeight = fontWeight;
          measuringElement.style.fontStyle = fontStyle;
          measuringElement.style.lineHeight = lineHeight;
          measuringElement.style.letterSpacing = letterSpacing;

          const editorBaseline = measureBaselineOffset(measuringElement);
          if (editorBaseline !== undefined) {
            baselineOffsetRef.current = editorBaseline - iconCenter;
            fontMetricsRef.current = {
              fontFamily,
              fontSize,
              fontWeight,
              fontStyle,
              lineHeight,
              letterSpacing,
            };
          }
        }
      }
    }

    setTop(computeBarTop(targetRect, positionAnchor, scrollContainer, baselineOffsetRef.current));
  }, []);

  // Coalesces bursts of high-frequency triggers (scrolling, and dragging a selection, which fires
  // `selectionchange` at mousemove rate) into at most one measurement per frame.
  const scheduleRecompute = useCallback(() => {
    cancelAnimationFrame(rafIdRef.current);
    rafIdRef.current = requestAnimationFrame(recompute);
  }, [recompute]);

  useEffect(() => {
    const positionAnchor = positionAnchorRef.current;
    if (!positionAnchor) return undefined;

    // Style-only matching (requireOverflow: false): this runs once on mount, possibly before
    // content has loaded and made anything overflow — and possibly while the view is hidden, where
    // scrollHeight and clientHeight are both 0 — so "actually overflowing right now" would be the
    // wrong criterion. getComputedStyle still works under display:none, so discovery stays valid.
    //
    // Resolved ONCE and never re-resolved, which assumes the editor's scrolling ancestor cannot
    // change. The footnotes reverse-portal does re-parent the editor subtree, so that assumption is
    // load-bearing rather than trivially true — it holds only because the footnotes
    // `ResizablePanel` is `overflow: hidden`, so discovery lands on the same outer container from
    // either parent. A scrollable panel there would need this re-resolved on re-parent.
    scrollContainerRef.current =
      findScrollContainer(positionAnchor, { requireOverflow: false }) ?? positionAnchor;

    const scrollContainer = scrollContainerRef.current;
    scrollContainer.addEventListener('scroll', scheduleRecompute, { passive: true });

    // Position once, synchronously, now that the scroll container is known — not through
    // `scheduleRecompute`, so the bar never paints a frame at top: 0 before its first measurement.
    recompute();

    // A persistent bar must survive a panel resize or font-size change; the paragraph-marker
    // tooltip needs no equivalent because it is transient. Without this, dragging the dock
    // splitter leaves the bar at a stale top.
    //
    // Routed through `scheduleRecompute`, not `recompute` directly, for the same reason scroll and
    // selection are: a splitter drag fires this at pointer rate, and the full recompute is several
    // layout reads. Deferring to the next frame also keeps `setTop` out of the observer callback
    // itself, which is what provokes the "ResizeObserver loop completed with undelivered
    // notifications" console error.
    const resizeObserver = new ResizeObserver(scheduleRecompute);
    resizeObserver.observe(positionAnchor);

    return () => {
      scrollContainer.removeEventListener('scroll', scheduleRecompute);
      resizeObserver.disconnect();
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [recompute, scheduleRecompute]);

  // Position the bar when the slot FILLS, which happens on a live Power -> Simple switch. No other
  // effect covers it: the mount effect's dependencies are deliberately identity-stable, and the
  // selection, visibility and font effects do not observe the slot. Nor is the ResizeObserver a
  // guarantee — the bar container is absolutely positioned, so adding it does not resize
  // `positionAnchor`; today the switch happens to reflow `.usfm` by adding
  // `editor-container-simple`, but relying on that would make first paint after a mode switch
  // incidental. `recompute` returns immediately when the slot is empty, so the emptying direction
  // costs nothing.
  //
  // Keyed on PRESENCE, not on `bar` itself: `bar` is a fresh element every render, so depending on
  // it directly would schedule a recompute on every caret move.
  const hasBar = bar !== undefined;
  useEffect(() => {
    if (hasBar) scheduleRecompute();
  }, [hasBar, scheduleRecompute]);

  // Invalidates the font-metrics cache (see `fontMetricsRef`) when a webfont finishes loading — the
  // one case that cache's computed-style key cannot detect on its own. `loadingdone` fires for every
  // completed load batch, whether it lands before or after this effect subscribes, so this alone
  // covers both "already loaded by mount" (harmless: the metrics recorded at mount are already
  // correct) and "loads later" (the case that actually needs the invalidation).
  //
  // `document.fonts` is unimplemented in jsdom, so this is feature-detected rather than assumed —
  // the effect is a no-op there.
  //
  // An event-listener subscription, not a `.ready` promise `.then()`: `removeEventListener` in the
  // cleanup below is enough to make this safe across unmount, matching the scroll/resize listeners
  // above — a promise callback would need an extra "am I still mounted" guard that this pattern
  // doesn't.
  useEffect(() => {
    const { fonts } = document;
    if (!fonts) return undefined;

    const handleFontsLoaded = () => {
      fontMetricsRef.current = undefined;
      recompute();
    };
    fonts.addEventListener('loadingdone', handleFontsLoaded);

    return () => {
      fonts.removeEventListener('loadingdone', handleFontsLoaded);
    };
  }, [recompute]);

  // Reposition on every caret move, coalesced per frame. Listeners stay attached while hidden —
  // flagging a pending catch-up is cheaper than tearing down and re-wiring, and these events are
  // rare in a hidden view.
  const hasHandledFirstSelectionEffectRef = useRef(false);
  useEffect(() => {
    // The mount effect above already positioned the bar synchronously, so the first run of this
    // effect (which is mount, before any caret has moved) has nothing to do.
    if (!hasHandledFirstSelectionEffectRef.current) {
      hasHandledFirstSelectionEffectRef.current = true;
      return;
    }
    scheduleRecompute();
  }, [selectionVersion, scheduleRecompute]);

  // Hidden case (see `recompute`): consume the deferred catch-up BEFORE paint, so activating the tab
  // never shows a stale frame. Instant, never animated. Because `recompute` is identity-stable, no
  // other effect re-runs on the visibility flip — this is the only thing that repairs the position,
  // which is exactly what makes it testable.
  useLayoutEffect(() => {
    isVisibleRef.current = isViewVisible;
    if (isViewVisible && pendingCatchUpRef.current) {
      pendingCatchUpRef.current = false;
      recompute();
    }
  }, [isViewVisible, recompute]);

  return (
    <div ref={positionAnchorRef} className="tw:relative">
      {children}
      {/* Rendered only when there is a bar to position. `children` stays the FIRST child either way,
          so React keeps the editor subtree mounted across an interface-mode change — see the `bar`
          prop. The scroll/resize listeners above stay attached regardless: `bar` is a new element
          every render, so making the effect depend on it would re-wire them constantly, and
          `recompute` already returns immediately when the slot is empty. */}
      {hasBar && (
        <>
          {/* Off-editor measuring element for the baseline probe (see `measuringElementRef`): a
              sibling of the editor, never a descendant, so the probe never touches Lexical's
              contenteditable. */}
          <span
            ref={measuringElementRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              visibility: 'hidden',
              pointerEvents: 'none',
              top: 0,
              left: 0,
            }}
          />
          {/* pointer-events-none on the container so the reserved gutter column stays click-through
              to the editor; the bar itself re-enables them. */}
          <div
            ref={barContainerRef}
            data-testid="character-marker-bar-container"
            className="tw:absolute tw:pointer-events-none"
            // insetInlineEnd is the string '0px', not 0: React renders a bare numeric 0 unitless.
            //
            // It resolves against `positionAnchor`, several wrappers above the `.usfm` element that
            // actually reserves the gutter with `padding-inline-end`. The two edges coincide only
            // because every wrapper in between is full-width with no inline padding and
            // `.editor-container` sets `max-width: none`. Giving the text column a reading width or
            // any max-width would leave the bar outside the reserved space, painting over text.
            //
            // width is CONSTRAINED to the reserved gutter, rather than left to shrink-wrap the bar.
            // Shrink-wrapping grows inline-START — over project text — the moment the bar's content
            // is wider than expected, which a longer localized `(mixed)`/`(none)` label makes likely.
            // With a fixed width the bar clips inside the gutter instead, so "never overlaps text"
            // stays a property of the construction rather than arithmetic on English strings.
            //
            // The value comes from the single `--psc-character-marker-bar-width` declaration in
            // `_simple-mode.scss` (on `.editor-container-simple`, an ancestor of both this container
            // and the `.usfm` element that reserves the space), so the reservation and the bar can
            // never drift apart. No fallback value is given on purpose: a literal here would be that
            // second source of truth.
            style={{
              top,
              insetInlineEnd: '0px',
              width: 'var(--psc-character-marker-bar-width)',
              zIndex: Z_INDEX_OVERLAY,
            }}
          >
            <div className="tw:pointer-events-auto">{bar}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default CharacterMarkerBarOverlay;
