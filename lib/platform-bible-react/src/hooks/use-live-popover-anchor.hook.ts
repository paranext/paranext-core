import { RefObject, useCallback, useMemo, useRef } from 'react';

/**
 * What a popover is placed against, re-measured every time the popover is positioned.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export type LivePopoverAnchorSource = {
  /**
   * Reads the anchor's current viewport rect. Called every time the popover is positioned, which
   * can be more than once per frame.
   *
   * @returns The anchor's rect in viewport coordinates, or `undefined` when the source can no
   *   longer be measured; the anchor then keeps its last rect.
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  measure: () => DOMRect | undefined;
  /**
   * An element of the content the anchor belongs to that stays in the document while the popover is
   * open (the editor's root, not a text span the editor may re-render). The popover's positioning
   * watches this element's scroll ancestors, its size and its movement while the popover is open.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  contextElement: Element;
};

/** A virtual element in the shape Radix's `PopoverAnchor` `virtualRef` and floating-ui accept. */
type VirtualAnchorElement = {
  getBoundingClientRect: () => DOMRect;
  readonly contextElement: Element | undefined;
};

/**
 * The anchor {@link useLivePopoverAnchor} returns.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export type LivePopoverAnchor = {
  /**
   * Pass as `PopoverAnchor`'s `virtualRef`.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  virtualRef: RefObject<VirtualAnchorElement>;
  /**
   * Points the anchor at a new source and measures it at once, so the popover opens against it
   * rather than against the previous source. Call it before opening the popover.
   *
   * @param source What the anchor follows from now on.
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  setSource: (source: LivePopoverAnchorSource) => void;
};

/**
 * A popover anchor that follows its text instead of keeping the rect it had when the popover
 * opened. The popover's own positioning (floating-ui's auto-update, run by Radix while the popover
 * is open) re-reads the rect on scroll of the text's scroll container, on resize, and when the text
 * reflows under a zoom change, so the popover stays beside its caller or selection.
 *
 * Hidden case: handled by holding the last usable rect. A popover can be open while its pane is
 * hidden — the Scripture editor's footnote popover survives Escape and an outside click — and a
 * hidden pane has no layout, so a source measures nothing there. The anchor keeps the last rect it
 * had rather than collapsing to the pane's corner, and the next frame after the tab is shown
 * measures again and catches up. Sources report "no measurement" by returning `undefined`; see
 * {@link measureBox}.
 *
 * @example
 *
 * ```tsx
 * const anchor = useLivePopoverAnchor();
 * const [isOpen, setIsOpen] = useState(false);
 *
 * const openAtSelection = () => {
 *   const selection = window.getSelection();
 *   if (!selection || selection.rangeCount === 0 || !editorRef.current) return;
 *   // Clone the range: the live selection keeps moving while the popover is open.
 *   const range = selection.getRangeAt(0).cloneRange();
 *   // Point the anchor at its source BEFORE opening, so the popover never opens at a stale rect.
 *   anchor.setSource({
 *     measure: () => {
 *       const rect = measureBox(range);
 *       return rect && leftEdgeRect(rect);
 *     },
 *     contextElement: editorRef.current,
 *   });
 *   setIsOpen(true);
 * };
 *
 * return (
 *   <Popover open={isOpen} onOpenChange={setIsOpen}>
 *     <PopoverAnchor virtualRef={anchor.virtualRef} />
 *     <PopoverContent>…</PopoverContent>
 *   </Popover>
 * );
 * ```
 *
 * @returns A stable anchor (the same object on every render): its `virtualRef` goes to
 *   `PopoverAnchor`, and its `setSource` points it at what to follow.
 * @experimental This export is unstable and may change shape or disappear without notice
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
 * The current viewport rect of a text range or an element, for a {@link LivePopoverAnchorSource}'s
 * `measure`.
 *
 * A target counts as unmeasurable only when it paints no box at all (`getClientRects()` is empty),
 * never merely because its box is small: a zero-width or zero-height box — a collapsed caret, an
 * empty element — is still a real, positioned point.
 *
 * @param target The range or element to measure.
 * @returns The target's bounding rect in viewport coordinates, or `undefined` when it paints
 *   nothing: a range whose text the editor replaced (it collapsed to an element boundary that has
 *   no box), or an element with no layout because it or an ancestor is `display: none`, as inside
 *   an inactive rc-dock tab pane.
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function measureBox(target: Range | Element): DOMRect | undefined {
  if (target.getClientRects().length === 0) return undefined;
  return target.getBoundingClientRect();
}

/**
 * The zero-width rect along the left edge of `rect`, spanning its full height. A pop-up placed
 * against it sits below (or above) all of `rect`, horizontally centered on its left edge.
 *
 * @param rect The rect to take the left edge of, such as a selection's box from {@link measureBox}.
 * @returns A new rect at `rect`'s left and top, with zero width and `rect`'s height.
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function leftEdgeRect(rect: DOMRect): DOMRect {
  return new DOMRect(rect.left, rect.top, 0, rect.height);
}
