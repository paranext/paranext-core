import { useEffect, useRef } from 'react';

/**
 * Moves focus into a message region that has just REPLACED focused content — a zero-state swapped
 * in where an editor used to be. The editor's focused element is destroyed along with it, so
 * without this the caret lands on `body` and a keyboard or screen-reader user is left with no
 * position at all.
 *
 * Focus is repaired only when BOTH conditions hold:
 *
 * 1. `document.hasFocus()` — this document is the focused one. It is `false` while the user is in
 *    another window, another application, or a different iframe, and pulling focus into a region
 *    the user is not looking at would both steal it from wherever they are working and scroll this
 *    view.
 * 2. Focus has actually fallen to the document body. `hasFocus()` alone is not enough, and this is the
 *    condition that carries the real work: a view that keeps controls mounted alongside the swapped
 *    content has focusable siblings in the SAME document — the Bible texts and Commentaries panel
 *    keeps its resource selector, and the main editor keeps its reference control in its own
 *    toolbar. Arriving at a missing book by using either of those leaves focus on that control with
 *    `hasFocus()` true, and focusing the message would yank focus out of the control the user is
 *    operating.
 *
 * The trade this makes deliberately: a user who reaches a missing book through a control that keeps
 * focus gets no focus move, so the `role="status"` live region is the only announcement. Taking
 * focus from a control mid-use is the worse of the two failures.
 *
 * Only content genuinely orphaned by the swap resolves to `body`, so the pair of checks admits
 * exactly the case this exists for.
 *
 * @param resetKey Change this to repair focus again for a NEW message. The repair runs once per
 *   distinct value, which is what lets a view whose message stays mounted but now describes a
 *   different book or text re-announce instead of sitting silent.
 * @returns A ref to attach to the message region. The region must be focusable — give it
 *   `tabIndex={-1}`.
 */
export function useFocusReplacedContent<T extends HTMLElement>(resetKey?: unknown) {
  // Using null for React ref compatibility
  // eslint-disable-next-line no-null/no-null
  const regionRef = useRef<T>(null);

  useEffect(() => {
    if (isFocusDroppedInThisDocument()) regionRef.current?.focus();
  }, [resetKey]);

  return regionRef;
}

/**
 * Whether focus here was orphaned: this document has focus, but no element in it does, because the
 * focused one was removed. The two conditions {@link useFocusReplacedContent} repairs focus under;
 * use it wherever else this document moves focus after replacing what had it.
 */
export function isFocusDroppedInThisDocument(): boolean {
  if (!document.hasFocus()) return false;
  // `activeElement` is `body` when the focused element was removed from the DOM, and is nullish
  // only in edge cases where the document has no body yet. Anything else means a real element
  // still holds focus, and it is not ours to take.
  const { activeElement } = document;
  return !activeElement || activeElement === document.body;
}
