import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import {
  cn,
  Tooltip,
  TOOLTIP_DELAY_MS,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { EDITOR_PARA_SELECTOR, findScrollContainer } from '../editor-dom.util';
import { blockMarkerToBlockNames } from '../platform-scripture-editor.utils';
import { computePosition, extractMarker, TooltipPosition } from './paragraph-marker-tooltip.utils';

type HoveredData = TooltipPosition & { marker: string };

type Props = {
  children: React.ReactNode;
  /**
   * When false, the overlay renders its wrapper `<div>` (so downstream layout is unchanged) but
   * skips the tooltip UI, event handlers, and scroll/keydown listeners. Keeping the wrapper always
   * mounted prevents the editor subtree from remounting when this prop flips.
   */
  enabled?: boolean;
};

export function ParagraphMarkerTooltipOverlay({ children, enabled = true }: Props) {
  const [hoveredData, setHoveredData] = useState<HoveredData | undefined>(undefined);

  // positionAnchorRef: the position:relative element; coordinate origin for getBoundingClientRect math.
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const positionAnchorRef = useRef<HTMLDivElement>(null);
  // scrollContainerRef: the ancestor element whose scroll causes content to move.
  // Assigned in useEffect via findScrollContainer (style-only mode).
  const scrollContainerRef = useRef<HTMLElement | undefined>(undefined);
  const currentParaRef = useRef<HTMLElement | undefined>(undefined);
  const rafIdRef = useRef<number>(0);
  // Pending reveal timer: armed on hover-enter while nothing is showing yet, fired to actually set
  // hoveredData once TOOLTIP_DELAY_MS elapses. Cleared on every leave path so a fast pass never shows
  // anything. Hidden-view case (see .claude/rules/cross-view-sync-hidden-views.md): not handled
  // separately — a display:none pane can't receive real mouseover events, so no new timer can ever
  // start while hidden.
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  // Set to true by keydown so the tooltip stays hidden until the mouse actually moves.
  const suppressUntilMoveRef = useRef(false);
  // Keeps the trigger at the last known paragraph position while the tooltip closes, so the
  // close animation doesn't jump to top:0 and appear above the editor.
  const lastPositionRef = useRef<TooltipPosition>({ top: 0, left: 0 });
  // Mirrors `hoveredData` synchronously. State commits are async, so a handler reading `hoveredData`
  // from its render closure can observe a value that's already stale by the time it runs.
  // `updateHoveredData`/`revealHoveredData` below are the only places allowed to write either this
  // ref or the state — every event handler reads THIS, never the `hoveredData` state variable.
  const hoveredDataRef = useRef<HoveredData | undefined>(undefined);
  // Timestamp of the last time a tooltip actually revealed (armed-timer fire OR instant
  // adjacent-marker switch). Bounds the "already showing → instant" grace period below to
  // TOOLTIP_DELAY_MS of continuous engagement, instead of an unbounded "is anything showing right
  // now" check — which would let a sweep across the editor's flush (zero-margin) paragraphs stay
  // instant forever after the first reveal, recreating the exact flash-on-quick-pass bug this
  // component exists to fix, just for paragraphs 2..N of the sweep instead of paragraph 1.
  const lastRevealAtRef = useRef<number | undefined>(undefined);

  const blockMarkerKeys = useMemo<LocalizeKey[]>(() => Object.values(blockMarkerToBlockNames), []);
  const [localizedStrings] = useLocalizedStrings(blockMarkerKeys);

  const descriptionKey = hoveredData?.marker
    ? blockMarkerToBlockNames[hoveredData.marker]
    : undefined;
  const localizedDescription = descriptionKey ? localizedStrings[descriptionKey] : undefined;
  // For markers not yet in blockMarkerToBlockNames, fall back to the raw USFM marker (e.g. \sp).
  // The \\ is intentional: it produces a single backslash so the tooltip reads as a USFM marker.
  const tooltipText =
    localizedDescription ?? (hoveredData?.marker ? `\\${hoveredData.marker}` : '');

  const clearHoverTimer = useCallback(() => {
    if (hoverTimerRef.current !== undefined) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = undefined;
    }
  }, []);

  // The only path that writes `hoveredData`/`hoveredDataRef`. Writes the ref synchronously so any
  // handler reading `hoveredDataRef.current` afterwards — even before React re-renders — sees this
  // value, never a stale one.
  const updateHoveredData = useCallback((data: HoveredData | undefined) => {
    hoveredDataRef.current = data;
    setHoveredData(data);
  }, []);

  // Use for an actual reveal (new content becoming visible) — not for repositioning something
  // already showing (see handleScroll) and not for hiding (use updateHoveredData(undefined) for
  // that). Stamps lastRevealAtRef so the grace period in handleMouseOver measures time since the
  // most recent reveal, not time since the tooltip first appeared.
  const revealHoveredData = useCallback(
    (data: HoveredData) => {
      lastRevealAtRef.current = Date.now();
      updateHoveredData(data);
    },
    [updateHoveredData],
  );

  const handleMouseOver = useCallback(
    (e: React.MouseEvent) => {
      // e.target is EventTarget; cast to Element for DOM traversal via .closest()
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const para = (e.target as Element).closest<HTMLElement>(EDITOR_PARA_SELECTOR);
      if (para === currentParaRef.current) return; // same para, skip re-render
      currentParaRef.current = para ?? undefined;
      // The hovered target changed — whatever reveal was pending for the previous one no longer
      // applies.
      clearHoverTimer();
      const anchor = positionAnchorRef.current;
      const scroller = scrollContainerRef.current;
      if (para && anchor && scroller) {
        const marker = extractMarker(para.className);
        if (marker) {
          const withinGracePeriod =
            lastRevealAtRef.current !== undefined &&
            Date.now() - lastRevealAtRef.current <= TOOLTIP_DELAY_MS;
          if (hoveredDataRef.current && withinGracePeriod) {
            // A tooltip revealed recently enough that this counts as the same continuous
            // engagement — hand-rolled "tooltip group" grace period. (Radix's own timer never gets
            // a chance to run here: the TooltipTrigger below is pointer-events-none, so it can
            // never receive the pointer events Radix's delay machinery arms itself from; the forced
            // `open` + no-op `onOpenChange` on the `Tooltip` below is a second, independent reason
            // it would be bypassed even if pointer events somehow reached the trigger.) Move
            // directly to the new marker with no further delay.
            const pos = computePosition(para, anchor, scroller);
            lastPositionRef.current = pos;
            revealHoveredData({ ...pos, marker });
          } else {
            if (hoveredDataRef.current) {
              // Grace period expired but something is still showing for a DIFFERENT paragraph than
              // the one now hovered — hide it immediately rather than leaving mismatched content
              // lingering for the ~300ms it takes the fresh delay below to elapse. An expired grace
              // period is treated as an implicit close.
              updateHoveredData(undefined);
            }
            // Arm a delayed reveal. Position — and paragraph validity — are (re)computed at fire
            // time from the live refs, not now: computing eagerly here and closing over the result
            // would reveal at a stale position if the user scrolls during the pending window, and
            // would reveal stale/detached content if a chapter change or remote edit swaps the DOM
            // out from under this hover with no mouseout or keydown to cancel it.
            hoverTimerRef.current = setTimeout(() => {
              hoverTimerRef.current = undefined;
              const pendingPara = currentParaRef.current;
              const pendingAnchor = positionAnchorRef.current;
              const pendingScroller = scrollContainerRef.current;
              if (!pendingPara?.isConnected || !pendingAnchor || !pendingScroller) return;
              const pendingMarker = extractMarker(pendingPara.className);
              if (!pendingMarker) return;
              const pos = computePosition(pendingPara, pendingAnchor, pendingScroller);
              lastPositionRef.current = pos;
              revealHoveredData({ ...pos, marker: pendingMarker });
            }, TOOLTIP_DELAY_MS);
          }
          return;
        }
      }
      updateHoveredData(undefined);
    },
    [clearHoverTimer, revealHoveredData, updateHoveredData],
  );

  const handleMouseOut = useCallback(
    (e: React.MouseEvent) => {
      // Fires when the cursor leaves any element. Use relatedTarget to detect when the cursor
      // truly exits into non-paragraph territory (editor whitespace, chrome, etc.), catching
      // the stale-tooltip case that onMouseOver alone misses when the cursor stops moving.
      // e.target / e.relatedTarget are EventTarget; cast to Element for DOM traversal via .closest()
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const leavingPara = (e.target as Element).closest<HTMLElement>(EDITOR_PARA_SELECTOR);
      // e.relatedTarget is EventTarget; cast to Element for DOM traversal via .closest()
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const enteringPara = (e.relatedTarget as Element | null)?.closest<HTMLElement>(
        EDITOR_PARA_SELECTOR,
      );
      if (leavingPara && !enteringPara) {
        currentParaRef.current = undefined;
        clearHoverTimer();
        updateHoveredData(undefined);
      }
    },
    [clearHoverTimer, updateHoveredData],
  );

  const handleMouseMove = useCallback(() => {
    if (!suppressUntilMoveRef.current) return;
    suppressUntilMoveRef.current = false;
    // Reset currentParaRef so the next mouseover (on any element boundary) re-shows the tooltip.
    currentParaRef.current = undefined;
  }, []);

  const handleMouseLeave = useCallback(() => {
    suppressUntilMoveRef.current = false;
    currentParaRef.current = undefined;
    clearHoverTimer();
    updateHoveredData(undefined);
  }, [clearHoverTimer, updateHoveredData]);

  // Accessibility companion for onMouseOver: hide tooltip when focus moves outside the editor
  const handleFocus = useCallback(() => {
    // Focus events do not carry position context; defer to handleMouseOver for tooltip placement.
    // This handler exists solely to satisfy jsx-a11y/mouse-events-have-key-events.
  }, []);

  // Accessibility companion for onMouseOut: hide tooltip when focus moves outside the editor
  const handleBlur = useCallback(
    (e: React.FocusEvent) => {
      // Only clear when focus leaves the wrapper entirely, not when moving between internal children.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
        suppressUntilMoveRef.current = false;
        currentParaRef.current = undefined;
        clearHoverTimer();
        updateHoveredData(undefined);
      }
    },
    [clearHoverTimer, updateHoveredData],
  );

  useEffect(() => {
    if (!enabled) return undefined;
    const positionAnchor = positionAnchorRef.current;
    if (!positionAnchor) return undefined;

    // The editor's scroll container is an ancestor of positionAnchor — walking DOWN into children
    // never reaches it. Style-only matching (requireOverflow: false): this lookup runs once on
    // mount, possibly before content has loaded and made anything overflow, so "actually
    // overflowing right now" would be the wrong criterion here.
    // Falls back to positionAnchor if no scrolling ancestor is found.
    const scrollContainer =
      findScrollContainer(positionAnchor, { requireOverflow: false }) ?? positionAnchor;
    scrollContainerRef.current = scrollContainer;

    const handleKeyDown = () => {
      // Capture phase required: Lexical calls stopPropagation() on keydown before React sees it.
      // Don't clear currentParaRef here — keeping it set prevents the tooltip from blinking back
      // on the next span-boundary mouseover while the user is still typing. suppressUntilMoveRef
      // stays true until the mouse actually moves, at which point currentParaRef is reset and
      // the next mouseover re-evaluates normally.
      suppressUntilMoveRef.current = true;
      clearHoverTimer();
      updateHoveredData(undefined);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        const para = currentParaRef.current;
        const anchor = positionAnchorRef.current;
        const scroller = scrollContainerRef.current;
        const prev = hoveredDataRef.current;
        if (para && anchor && scroller && prev) {
          const newPos = computePosition(para, anchor, scroller);
          lastPositionRef.current = newPos;
          // Repositioning something already showing, not a new reveal — use updateHoveredData, not
          // revealHoveredData, so an idle-but-scrolling tab doesn't extend the grace period.
          updateHoveredData({ ...newPos, marker: prev.marker });
        }
      });
    };

    positionAnchor.addEventListener('keydown', handleKeyDown, true);
    // Attach directly to the scroll container — no capture needed, no obscure behavior.
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      positionAnchor.removeEventListener('keydown', handleKeyDown, true);
      scrollContainer.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafIdRef.current);
      // Runs on unmount AND whenever `enabled` flips to false mid-hover — either way, a reveal
      // pending from before must not fire once nothing can render it.
      clearHoverTimer();
      // Also drop anything already showing and forget which paragraph was current. Without this,
      // flipping `enabled` false→true while a tooltip was open would remount the Tooltip subtree
      // (fully unmounted meanwhile — see the `{enabled && (...)}` below) already-open at a stale
      // position, AND the very next hover after re-enabling would incorrectly qualify for the
      // instant-switch grace period above instead of earning its own delay.
      currentParaRef.current = undefined;
      updateHoveredData(undefined);
    };
    // Attaches/detaches the keydown (dismiss-on-typing) and scroll (reposition) listeners. Refs are
    // stable, so this only needs to re-run when `enabled` or the (stable) callbacks it closes over
    // change identity.
  }, [enabled, clearHoverTimer, updateHoveredData]);

  return (
    <div
      ref={positionAnchorRef}
      className="tw:relative"
      onMouseOver={enabled ? handleMouseOver : undefined}
      onMouseMove={enabled ? handleMouseMove : undefined}
      onFocus={enabled ? handleFocus : undefined}
      onMouseOut={enabled ? handleMouseOut : undefined}
      onBlur={enabled ? handleBlur : undefined}
      onMouseLeave={enabled ? handleMouseLeave : undefined}
    >
      {children}
      {enabled && (
        <TooltipProvider>
          {/* onOpenChange no-op satisfies Radix controlled-component contract and silences dev
              warning. `open` is force-controlled here — rather than left to Radix's own hover
              machinery — because TooltipTrigger below is pointer-events-none and so can never
              receive the pointer events Radix would otherwise arm its delay/reveal logic from. */}
          <Tooltip open={!!hoveredData} onOpenChange={() => {}}>
            <TooltipTrigger
              aria-hidden="true"
              tabIndex={-1}
              className={cn(
                'tw:absolute tw:w-px tw:h-px tw:opacity-0 tw:pointer-events-none',
                'tw:p-0 tw:border-0 tw:bg-transparent tw:cursor-default tw:min-w-0 tw:min-h-0',
              )}
              style={{
                top: hoveredData?.top ?? lastPositionRef.current.top,
                left: hoveredData?.left ?? lastPositionRef.current.left,
              }}
            />
            <TooltipContent side="top" align="start" showArrow={false}>
              {tooltipText}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}
