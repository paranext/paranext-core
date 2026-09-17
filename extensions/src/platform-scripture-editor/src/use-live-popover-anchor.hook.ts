import { RefObject, useCallback, useMemo, useRef } from 'react';

/** What a popover is placed against, re-measured every time the popover is positioned. */
export type LivePopoverAnchorSource = {
  /**
   * Reads the anchor's current viewport rect. Returns `undefined` when the source can no longer be
   * measured; the anchor then keeps its last rect.
   */
  measure: () => DOMRect | undefined;
  /**
   * An element of the content the anchor belongs to that stays in the document while the popover is
   * open (the editor's root, not a text span the editor may re-render). The popover's positioning
   * watches this element's scroll ancestors, its size and its movement while the popover is open.
   */
  contextElement: Element;
};

/** A virtual element in the shape Radix's `PopoverAnchor` `virtualRef` and floating-ui accept. */
type VirtualAnchorElement = {
  getBoundingClientRect: () => DOMRect;
  readonly contextElement: Element | undefined;
};

export type LivePopoverAnchor = {
  /** Pass as `PopoverAnchor`'s `virtualRef`. */
  virtualRef: RefObject<VirtualAnchorElement>;
  /** Points the anchor at a new source. Call it before opening the popover. */
  setSource: (source: LivePopoverAnchorSource) => void;
};

/**
 * A popover anchor that follows its text instead of keeping the rect it had when the popover
 * opened. The popover's own positioning (floating-ui's auto-update, run by Radix while the popover
 * is open) re-reads the rect on scroll of the text's scroll container, on resize, and when the text
 * reflows under a zoom change, so the popover stays beside its caller or selection.
 *
 * Hidden-tab case: needs no catch-up. A popover is only open while its pane is visible, and every
 * listener belongs to the open popover.
 */
export function useLivePopoverAnchor(): LivePopoverAnchor {
  const sourceRef = useRef<LivePopoverAnchorSource | undefined>(undefined);
  const lastRectRef = useRef<DOMRect>(new DOMRect());
  const virtualRef = useRef<VirtualAnchorElement>({
    getBoundingClientRect: () => {
      const rect = sourceRef.current?.measure();
      if (rect) lastRectRef.current = rect;
      return lastRectRef.current;
    },
    get contextElement() {
      return sourceRef.current?.contextElement;
    },
  });

  const setSource = useCallback((source: LivePopoverAnchorSource) => {
    sourceRef.current = source;
    lastRectRef.current = source.measure() ?? new DOMRect();
  }, []);

  return useMemo(() => ({ virtualRef, setSource }), [setSource]);
}

/**
 * The current rect of a text range, or `undefined` when the range no longer lies in rendered text
 * (its nodes were replaced, so it collapsed to an element boundary that has no box).
 */
export function measureRange(range: Range): DOMRect | undefined {
  if (range.getClientRects().length === 0) return undefined;
  return range.getBoundingClientRect();
}

/**
 * The zero-width rect at the left edge of `rect`, spanning `top` to `top + height`. Popovers sit
 * below (or above) it, horizontally centered on the left edge of what they belong to.
 */
export function leftEdgeRect(rect: DOMRect, top: number, height: number): DOMRect {
  return new DOMRect(rect.left, top, 0, height);
}
