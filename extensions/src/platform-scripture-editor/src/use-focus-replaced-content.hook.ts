import { useEffect, useRef } from 'react';

/**
 * Moves focus into a message region that has just REPLACED focused content — a zero-state swapped
 * in where an editor used to be. The editor's focused element is destroyed along with it, so
 * without this the caret lands on `body` and a keyboard or screen-reader user is left with no
 * position at all.
 *
 * Focus is repaired only when BOTH conditions hold:
 *
 * 1. `document.hasFocus()` — focus is somewhere in THIS document. When the user navigates here from
 *    the app's title-bar reference control, that control lives in a different document, so focus is
 *    not ours to touch.
 * 2. Focus has actually fallen to the document body. `hasFocus()` alone is not enough: a panel that
 *    keeps a header mounted alongside the swapped content (the Bible texts and Commentaries panel
 *    keeps its resource selector) has focusable siblings in the SAME document. Picking a text that
 *    lacks the current book leaves focus on the selector trigger, `hasFocus()` returns `true`, and
 *    focusing the message would yank focus out of the control the user is still operating — which
 *    is also the one control that can remedy the situation.
 *
 * Only content genuinely orphaned by the swap resolves to `body`, so the pair of checks admits
 * exactly the case this exists for.
 *
 * @returns A ref to attach to the message region. The region must be focusable — give it
 *   `tabIndex={-1}`.
 */
export function useFocusReplacedContent<T extends HTMLElement>() {
  // Using null for React ref compatibility
  // eslint-disable-next-line no-null/no-null
  const regionRef = useRef<T>(null);

  useEffect(() => {
    if (!document.hasFocus()) return;
    // `activeElement` is `body` when the focused element was removed from the DOM, and is nullish
    // only in edge cases where the document has no body yet. Anything else means a real element
    // still holds focus, and it is not this region's business to take it.
    const { activeElement } = document;
    if (activeElement && activeElement !== document.body) return;
    regionRef.current?.focus();
  }, []);

  return regionRef;
}
