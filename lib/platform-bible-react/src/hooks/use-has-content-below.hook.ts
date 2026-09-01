import { RefObject, useEffect, useState } from 'react';

/**
 * Tracks whether the scrollable element matching `selector` inside `containerRef` still has content
 * below the fold.
 *
 * A long option list clipped flush at a row boundary looks complete, and the scrollbar alone is a
 * weak signal — with a few hundred options the thumb is only a few pixels tall, and on platforms
 * with overlay scrollbars it reserves no width at all. Callers use this to draw an explicit cue.
 *
 * Resolves the scroller by query rather than by holding a ref to it directly, so it works against a
 * vendored component whose ref forwarding is not ours to rely on.
 *
 * @param containerRef Ref to an element containing the scroller.
 * @param selector CSS selector matching the scroller within that container.
 * @returns Whether the scroller currently has content below its visible area.
 */
export default function useHasContentBelow(
  containerRef: RefObject<HTMLElement | null>,
  selector: string,
) {
  const [hasContentBelow, setHasContentBelow] = useState(false);

  useEffect(() => {
    const element = containerRef.current?.querySelector<HTMLElement>(selector);
    if (!element) {
      setHasContentBelow(false);
      return undefined;
    }
    const update = () => {
      // Sub-pixel layout can leave a fractional remainder at the very bottom; 1px of slack keeps
      // the cue from lingering once the user has actually reached the end.
      setHasContentBelow(element.scrollTop + element.clientHeight < element.scrollHeight - 1);
    };
    update();
    element.addEventListener('scroll', update);
    // The scroller's own box never changes (its height is capped), so a resize observer on it only
    // catches viewport-driven changes. Filtering the list changes the CONTENT height instead, which
    // is why the mutation observer below is needed as well.
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(element);
    const mutationObserver = new MutationObserver(update);
    mutationObserver.observe(element, { childList: true, subtree: true });
    return () => {
      element.removeEventListener('scroll', update);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [containerRef, selector]);

  return hasContentBelow;
}
