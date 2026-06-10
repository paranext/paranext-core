import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocalizedStrings } from '@papi/frontend/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'platform-bible-react';
import { LocalizeKey } from 'platform-bible-utils';
import { blockMarkerToBlockNames } from './platform-scripture-editor.utils';
import { computePosition, extractMarker, TooltipPosition } from './paragraph-marker-tooltip.utils';

type HoveredData = TooltipPosition & { marker: string };

type Props = { children: React.ReactNode };

export function ParagraphMarkerTooltipOverlay({ children }: Props) {
  const [hoveredData, setHoveredData] = useState<HoveredData | undefined>(undefined);

  // positionAnchorRef: the position:relative element; coordinate origin for getBoundingClientRect math.
  // The ref needs to start out with null for it to work as an element ref
  // eslint-disable-next-line no-null/no-null
  const positionAnchorRef = useRef<HTMLDivElement>(null);
  // scrollContainerRef: the element whose scrollTop changes when content scrolls (.editor-container).
  // Assigned in useEffect by walking firstElementChild until overflow-y: auto/scroll is found.
  const scrollContainerRef = useRef<HTMLElement | undefined>(undefined);
  const currentParaRef = useRef<HTMLElement | undefined>(undefined);
  const rafIdRef = useRef<number>(0);

  const blockMarkerKeys = useMemo<LocalizeKey[]>(() => Object.values(blockMarkerToBlockNames), []);
  const [localizedStrings] = useLocalizedStrings(blockMarkerKeys);

  const descriptionKey = hoveredData?.marker
    ? blockMarkerToBlockNames[hoveredData.marker]
    : undefined;
  const localizedDescription = descriptionKey ? localizedStrings[descriptionKey] : undefined;
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
    setHoveredData(
      para && anchor && scroller
        ? {
            ...computePosition(para, anchor, scroller),
            marker: extractMarker(para.className) ?? '',
          }
        : undefined,
    );
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
    const enteringPara = (e.relatedTarget as Element | undefined)?.closest<HTMLElement>(
      '.para[class*="usfm_"]',
    );
    if (leavingPara && !enteringPara) {
      currentParaRef.current = undefined;
      setHoveredData(undefined);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
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
      currentParaRef.current = undefined;
      setHoveredData(undefined);
    }
  }, []);

  useEffect(() => {
    const positionAnchor = positionAnchorRef.current;
    if (!positionAnchor) return;

    // Find the scroll container by walking first-child from positionAnchor until we reach
    // an element with overflow-y: auto or scroll. In the platform-editor DOM this is
    // .editor-container, which is a near-top descendant of our wrapper.
    // Falls back to positionAnchor if no scrolling ancestor is found within the subtree.
    let scrollContainer: HTMLElement = positionAnchor;
    // firstElementChild is typed as Element; cast to HTMLElement to traverse the subtree
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    let candidate: HTMLElement | undefined = positionAnchor.firstElementChild as
      | HTMLElement
      | undefined;
    while (candidate) {
      const { overflowY } = window.getComputedStyle(candidate);
      if (overflowY === 'auto' || overflowY === 'scroll') {
        scrollContainer = candidate;
        break;
      }
      // firstElementChild is typed as Element; cast to HTMLElement to continue traversal
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      candidate = candidate.firstElementChild as HTMLElement | undefined;
    }
    scrollContainerRef.current = scrollContainer;

    const handleKeyDown = () => {
      // Capture phase required: Lexical calls stopPropagation() on keydown before React sees it.
      currentParaRef.current = undefined;
      setHoveredData(undefined);
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = requestAnimationFrame(() => {
        const para = currentParaRef.current;
        if (para && positionAnchorRef.current && scrollContainerRef.current) {
          setHoveredData((prev) =>
            prev
              ? {
                  ...computePosition(
                    para,
                    // positionAnchorRef.current is confirmed non-undefined by the if-guard above
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    positionAnchorRef.current!,
                    // scrollContainerRef.current is confirmed non-undefined by the if-guard above
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    scrollContainerRef.current!,
                  ),
                  marker: prev.marker,
                }
              : undefined,
          );
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
      style={{ position: 'relative' }}
      onMouseOver={handleMouseOver}
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
            style={{
              position: 'absolute',
              top: hoveredData?.top ?? 0,
              left: hoveredData?.left ?? 0,
              width: 1,
              height: 1,
              opacity: 0,
              pointerEvents: 'none',
              padding: 0,
              border: 'none',
              background: 'transparent',
              cursor: 'default',
              minWidth: 0,
              minHeight: 0,
            }}
          />
          <TooltipContent side="top" align="start">
            {tooltipText}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
