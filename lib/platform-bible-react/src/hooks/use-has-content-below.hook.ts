import { RefObject, useEffect, useState } from 'react';

/**
 * Tracks whether `scrollerRef`'s element still has content below the fold.
 *
 * A long option list clipped flush at a row boundary looks complete, and the scrollbar alone is a
 * weak signal — with a few hundred options the thumb is only a few pixels tall, and on platforms
 * with overlay scrollbars it reserves no width at all. Callers use this to draw an explicit cue.
 *
 * @param scrollerRef Ref to the scrolling element.
 * @param isEnabled Whether to observe at all. When false the hook reports `false` and attaches
 *   nothing. Defaults to `true`.
 * @returns Whether the scroller currently has content below its visible area.
 */
export function useHasContentBelow(
  scrollerRef: RefObject<HTMLElement | null>,
  isEnabled: boolean = true,
) {
  const [hasContentBelow, setHasContentBelow] = useState(false);

  useEffect(() => {
    const element = scrollerRef.current;
    if (!isEnabled || !element) {
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
    // jsdom implements MutationObserver but not ResizeObserver, and this hook runs in every
    // dropdown that opts in, so an unguarded constructor would break tests that merely open one.
    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : undefined;
    resizeObserver?.observe(element);
    // The scroller's own box never changes (its height is capped), so a resize observer on it only
    // catches viewport-driven changes. Filtering the list changes the CONTENT height instead, which
    // is why the mutation observer is needed as well.
    const mutationObserver = new MutationObserver(update);
    mutationObserver.observe(element, { childList: true, subtree: true });

    return () => {
      element.removeEventListener('scroll', update);
      resizeObserver?.disconnect();
      mutationObserver.disconnect();
    };
  }, [scrollerRef, isEnabled]);

  return hasContentBelow;
}

export default useHasContentBelow;
