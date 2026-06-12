import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { cn, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { blockMarkerToBlockNames } from '../platform-scripture-editor.utils';
import { computePosition, extractMarker, TooltipPosition } from './paragraph-marker-tooltip.utils';

type HoveredData = TooltipPosition & { marker: string };

type Props = { children: React.ReactNode };

export function ParagraphMarkerTooltipOverlay({ children }: Props) {
  const [hoveredData, setHoveredData] = useState<HoveredData | undefined>(undefined);

  // positionAnchorRef: the position:relative element; coordinate origin for getBoundingClientRect math.
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const positionAnchorRef = useRef<HTMLDivElement>(null);
  // scrollContainerRef: the ancestor element whose scroll causes content to move.
  // Assigned in useEffect by walking parentElement ancestors until overflow-y: auto/scroll is found.
  const scrollContainerRef = useRef<HTMLElement | undefined>(undefined);
  const currentParaRef = useRef<HTMLElement | undefined>(undefined);
  const rafIdRef = useRef<number>(0);
  // Set to true by keydown so the tooltip stays hidden until the mouse actually moves.
  const suppressUntilMoveRef = useRef(false);
  // Keeps the trigger at the last known paragraph position while the tooltip closes, so the
  // close animation doesn't jump to top:0 and appear above the editor.
  const lastPositionRef = useRef<TooltipPosition>({ top: 0, left: 0 });

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

  const handleMouseOver = useCallback((e: React.MouseEvent) => {
    // e.target is EventTarget; cast to Element for DOM traversal via .closest()
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const para = (e.target as Element).closest<HTMLElement>('.para[class*="usfm_"]');
    if (para === currentParaRef.current) return; // same para, skip re-render
    currentParaRef.current = para ?? undefined;
    const anchor = positionAnchorRef.current;
    const scroller = scrollContainerRef.current;
    if (para && anchor && scroller) {
      const marker = extractMarker(para.className);
      if (marker) {
        const pos = computePosition(para, anchor, scroller);
        lastPositionRef.current = pos;
        setHoveredData({ ...pos, marker });
        return;
      }
    }
    setHoveredData(undefined);
  }, []);

  const handleMouseOut = useCallback((e: React.MouseEvent) => {
    // Fires when the cursor leaves any element. Use relatedTarget to detect when the cursor
    // truly exits into non-paragraph territory (editor whitespace, chrome, etc.), catching
    // the stale-tooltip case that onMouseOver alone misses when the cursor stops moving.
    // e.target / e.relatedTarget are EventTarget; cast to Element for DOM traversal via .closest()
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const leavingPara = (e.target as Element).closest<HTMLElement>('.para[class*="usfm_"]');
    // e.relatedTarget is EventTarget; cast to Element for DOM traversal via .closest()
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    const enteringPara = (e.relatedTarget as Element | null)?.closest<HTMLElement>(
      '.para[class*="usfm_"]',
    );
    if (leavingPara && !enteringPara) {
      currentParaRef.current = undefined;
      setHoveredData(undefined);
    }
  }, []);

  const handleMouseMove = useCallback(() => {
    if (!suppressUntilMoveRef.current) return;
    suppressUntilMoveRef.current = false;
    // Reset currentParaRef so the next mouseover (on any element boundary) re-shows the tooltip.
    currentParaRef.current = undefined;
  }, []);

  const handleMouseLeave = useCallback(() => {
    suppressUntilMoveRef.current = false;
    currentParaRef.current = undefined;
    setHoveredData(undefined);
  }, []);

  // Accessibility companion for onMouseOver: hide tooltip when focus moves outside the editor
  const handleFocus = useCallback(() => {
    // Focus events do not carry position context; defer to handleMouseOver for tooltip placement.
    // This handler exists solely to satisfy jsx-a11y/mouse-events-have-key-events.
  }, []);

  // Accessibility companion for onMouseOut: hide tooltip when focus moves outside the editor
  const handleBlur = useCallback((e: React.FocusEvent) => {
    // Only clear when focus leaves the wrapper entirely, not when moving between internal children.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
      suppressUntilMoveRef.current = false;
      currentParaRef.current = undefined;
      setHoveredData(undefined);
    }
  }, []);

  useEffect(() => {
    const positionAnchor = positionAnchorRef.current;
    if (!positionAnchor) return;

    // Find the scroll container by walking UP through parentElement ancestors until we reach
    // an element with overflow-y: auto or scroll. The editor's scroll container is an ancestor
    // of positionAnchor — walking DOWN into children never reaches it.
    // Falls back to positionAnchor if no scrolling ancestor is found.
    let scrollContainer: HTMLElement = positionAnchor;
    // parentElement is typed as HTMLElement | null; null terminates the walk
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    let candidate: HTMLElement | null = positionAnchor.parentElement;
    while (candidate) {
      const { overflowY } = window.getComputedStyle(candidate);
      if (overflowY === 'auto' || overflowY === 'scroll') {
        scrollContainer = candidate;
        break;
      }
      candidate = candidate.parentElement;
    }
    scrollContainerRef.current = scrollContainer;

    const handleKeyDown = () => {
      // Capture phase required: Lexical calls stopPropagation() on keydown before React sees it.
      // Don't clear currentParaRef here — keeping it set prevents the tooltip from blinking back
      // on the next span-boundary mouseover while the user is still typing. suppressUntilMoveRef
      // stays true until the mouse actually moves, at which point currentParaRef is reset and
      // the next mouseover re-evaluates normally.
      suppressUntilMoveRef.current = true;
      setHoveredData(undefined);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        const para = currentParaRef.current;
        const anchor = positionAnchorRef.current;
        const scroller = scrollContainerRef.current;
        if (para && anchor && scroller) {
          setHoveredData((prev) => {
            if (!prev) return undefined;
            const newPos = computePosition(para, anchor, scroller);
            lastPositionRef.current = newPos;
            return { ...newPos, marker: prev.marker };
          });
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
    };
  }, []); // both refs are stable ref objects; empty deps is correct

  return (
    <div
      ref={positionAnchorRef}
      className="tw:relative"
      onMouseOver={handleMouseOver}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onMouseOut={handleMouseOut}
      onBlur={handleBlur}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <TooltipProvider>
        <Tooltip open={!!hoveredData}>
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
    </div>
  );
}
