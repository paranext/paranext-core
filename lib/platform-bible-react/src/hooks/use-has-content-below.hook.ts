import { RefObject, useEffect, useState } from 'react';

/**
 * Tracks whether the scrollable element matching `selector` inside `containerRef` still has content
 * below the fold.
 *
 * A long option list clipped flush at a row boundary looks complete, and the scrollbar alone is a
 * weak signal — with a few hundred options the thumb is only a few pixels tall, and on platforms
 * with overlay scrollbars it reserves no width at all. Callers use this to draw an explicit cue.
 *
 * Resolves the scroller by query rather than by taking a ref to it, because the caller wraps
 * arbitrary children and so does not render the scrolling element itself. The container is watched
 * for a scroller that mounts, unmounts or is replaced after this hook runs.
 *
 * @param containerRef Ref to an element containing the scroller.
 * @param selector CSS selector matching the scroller within that container.
 * @param isEnabled Whether to observe at all. When false the hook reports `false` and attaches
 *   nothing. Defaults to `true`.
 * @returns Whether the scroller currently has content below its visible area.
 */
export function useHasContentBelow(
  containerRef: RefObject<HTMLElement | null>,
  selector: string,
  isEnabled: boolean = true,
) {
  const [hasContentBelow, setHasContentBelow] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!isEnabled || !container) {
      setHasContentBelow(false);
      return undefined;
    }

    // jsdom implements MutationObserver but not ResizeObserver, and this hook now runs in every
    // dropdown, so an unguarded constructor would break unrelated tests that merely open one.
    const canObserveResize = typeof ResizeObserver !== 'undefined';

    let scroller: HTMLElement | undefined;
    let scrollerObservers: (() => void) | undefined;

    const update = () => {
      if (!scroller) {
        setHasContentBelow(false);
        return;
      }
      // Sub-pixel layout can leave a fractional remainder at the very bottom; 1px of slack keeps
      // the cue from lingering once the user has actually reached the end.
      setHasContentBelow(scroller.scrollTop + scroller.clientHeight < scroller.scrollHeight - 1);
    };

    const bindScroller = () => {
      const next = container.querySelector<HTMLElement>(selector) ?? undefined;
      if (next === scroller) return;
      scrollerObservers?.();
      scrollerObservers = undefined;
      scroller = next;
      if (scroller) {
        const element = scroller;
        element.addEventListener('scroll', update);
        // The scroller's own box never changes (its height is capped), so a resize observer on it
        // only catches viewport-driven changes. Filtering the list changes the CONTENT height
        // instead, which is why the mutation observer below is needed as well.
        const resizeObserver = canObserveResize ? new ResizeObserver(update) : undefined;
        resizeObserver?.observe(element);
        const mutationObserver = new MutationObserver(update);
        mutationObserver.observe(element, { childList: true, subtree: true });
        scrollerObservers = () => {
          element.removeEventListener('scroll', update);
          resizeObserver?.disconnect();
          mutationObserver.disconnect();
        };
      }
      update();
    };

    bindScroller();
    const containerObserver = new MutationObserver(bindScroller);
    containerObserver.observe(container, { childList: true, subtree: true });

    return () => {
      containerObserver.disconnect();
      scrollerObservers?.();
    };
  }, [containerRef, selector, isEnabled]);

  return hasContentBelow;
}

export default useHasContentBelow;
