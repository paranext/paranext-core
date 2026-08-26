import { SerializedVerseRef } from '@sillsdev/scripture';
import { useRunWhenVisible } from 'platform-bible-react';
import { useEffect, useRef, useState } from 'react';

/**
 * Holds back a scroll-group reference while this web view's tab is inactive, and applies the latest
 * one when the tab is shown.
 *
 * Scrolling to a verse is layout-dependent work, and an inactive rc-dock pane has no layout: the
 * iframe keeps running and keeps receiving reference changes, but the editor cannot scroll to any
 * of them. Applying them while hidden is worse than useless — it consumes the change, so on reveal
 * the editor sees no new reference and never scrolls, leaving the panel parked wherever it was.
 * Holding the last-shown reference instead makes the reveal a genuine prop change, which drives the
 * scroll through exactly the same path a visible panel already uses.
 *
 * This defers **only the scroll target**. Chapter content is pushed to the editor imperatively
 * (`setUsj`) and is deliberately left live, so the text for the new reference is already loaded by
 * the time the tab is shown; the reveal then has nothing to do but scroll. Deferring the content
 * fetch as well would put a chapter load between the reveal and the scroll, and the scroll would
 * race it.
 *
 * @param scrRef The live scroll-group reference.
 * @param isViewVisible Whether this web view is currently rendered — pass `useViewVisibility()`.
 * @returns The reference to hand the editor: `scrRef` while visible, otherwise the last one applied
 *   while visible.
 */
export function useScrRefWhenVisible(
  scrRef: SerializedVerseRef,
  isViewVisible: boolean,
): SerializedVerseRef {
  const [appliedScrRef, setAppliedScrRef] = useState(scrRef);

  // Read through a ref so the catch-up applies whatever is current when the tab is shown, not the
  // reference that happened to be live when it was hidden.
  const latestScrRefRef = useRef(scrRef);
  latestScrRefRef.current = scrRef;

  const applyScrRefWhenVisible = useRunWhenVisible(isViewVisible, () =>
    setAppliedScrRef(latestScrRefRef.current),
  );

  useEffect(() => {
    applyScrRefWhenVisible();
  }, [scrRef, applyScrRefWhenVisible]);

  return appliedScrRef;
}
