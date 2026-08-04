import { useViewVisibility, Z_INDEX_OVERLAY } from 'platform-bible-react';
import { ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { findScrollContainer } from '../editor-dom.util';
import {
  computeBarTop,
  EDITOR_PARA_SELECTOR,
  resolveActiveLineRect,
} from './character-marker-bar.utils';
import { useEditorSelectionVersion } from './use-editor-selection-version.hook';

/** The editor element the caret must be inside for the bar to track it. */
const EDITOR_ROOT_SELECTOR = '.editor-input';

export type CharacterMarkerBarOverlayProps = {
  /** The editor this overlay positions a bar beside. */
  children: ReactNode;
  /**
   * The bar to pin to the inline-end edge, tracking the active line. Deliberately a slot: this
   * component knows nothing about character markers, so the same shell could anchor anything.
   */
  bar: ReactNode;
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
  // The scrolling ancestor, resolved once on mount (see the requireOverflow note below).
  const scrollContainerRef = useRef<HTMLElement | undefined>(undefined);
  const rafIdRef = useRef<number>(0);
  // Collapses any number of changes arriving while hidden into a single catch-up.
  const pendingCatchUpRef = useRef(false);
  // Distinguishes "no caret yet, show me at the first paragraph" from "the caret left the editor,
  // hold the last position" — both reach the same branch but want opposite behavior.
  const hasPositionedRef = useRef(false);

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

    const editorRoot = positionAnchor.querySelector<HTMLElement>(EDITOR_ROOT_SELECTOR);
    if (!editorRoot) return;

    let targetRect = resolveActiveLineRect(window.getSelection() ?? undefined, editorRoot);

    if (!targetRect) {
      // Before the first caret, anchor to the first paragraph so the bar is visible on load —
      // discoverability is the point of the feature. After that, no caret in an editor paragraph
      // means the popover took focus, so HOLD the last position rather than jumping back to the
      // top of the editor as the popover opens and closes.
      if (hasPositionedRef.current) return;
      const firstPara = editorRoot.querySelector<HTMLElement>(EDITOR_PARA_SELECTOR);
      if (!firstPara) return;
      targetRect = firstPara.getBoundingClientRect();
    }

    hasPositionedRef.current = true;
    setTop(computeBarTop(targetRect, positionAnchor, scrollContainer));
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
    const resizeObserver = new ResizeObserver(() => recompute());
    resizeObserver.observe(positionAnchor);

    return () => {
      scrollContainer.removeEventListener('scroll', scheduleRecompute);
      resizeObserver.disconnect();
      cancelAnimationFrame(rafIdRef.current);
    };
  }, [recompute, scheduleRecompute]);

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
      {/* pointer-events-none on the container so the reserved gutter column stays click-through to
          the editor; the bar itself re-enables them. */}
      <div
        data-testid="character-marker-bar-container"
        className="tw:absolute tw:pointer-events-none"
        // insetInlineEnd is a string ('0px'), not the number 0: React only appends a `px` unit to
        // numeric style values when they are non-zero (see setValueForStyles in react-dom), so a
        // bare `0` renders as the unitless string "0" instead of "0px".
        //
        // width is CONSTRAINED to the reserved gutter, rather than left to shrink-wrap the bar.
        // Shrink-wrapping grows inline-START — over project text — the moment the bar's content is
        // wider than expected, which a longer localized `(mixed)`/`(none)` label makes likely. With
        // a fixed width the bar clips inside the gutter instead, so "never overlaps text" stays a
        // property of the construction rather than arithmetic on English strings.
        //
        // The value comes from the single `--psc-character-marker-bar-width` declaration in
        // `_simple-mode.scss` (on `.editor-container-simple`, an ancestor of both this container and
        // the `.usfm` element that reserves the space), so the reservation and the bar can never
        // drift apart. No fallback value is given on purpose: a literal here would be that second
        // source of truth.
        style={{
          top,
          insetInlineEnd: '0px',
          width: 'var(--psc-character-marker-bar-width)',
          zIndex: Z_INDEX_OVERLAY,
        }}
      >
        <div className="tw:pointer-events-auto">{bar}</div>
      </div>
    </div>
  );
}

export default CharacterMarkerBarOverlay;
