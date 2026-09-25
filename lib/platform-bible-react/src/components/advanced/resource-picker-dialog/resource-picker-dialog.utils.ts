import { useEffect, useRef, useState } from 'react';

/**
 * Tracks how many items from a large list should be visible, expanding the count as the user
 * scrolls a sentinel element into view.
 *
 * Attach `sentinelRef` to a `<div>` placed **inside a scrollable container**, directly after the
 * last rendered item. Each time the sentinel enters the viewport, the next page is appended. When
 * `items` changes (e.g. a filter is applied), the visible count resets to the first page.
 *
 * @param items The full array to paginate. Pass a memoized reference so resets only fire on real
 *   changes.
 * @param pageSize Number of items to show per page (default 50).
 * @returns `visibleItems` — the current slice; `sentinelRef` — attach to the scroll sentinel;
 *   `hasMore` — whether more items remain to load.
 */
export function useProgressiveList<T>(items: T[], pageSize = 50) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  // Need to bed initialized as `null` to be compatible for Divider `ref` property
  // eslint-disable-next-line no-null/no-null
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Reset to first page when the source list changes (search / filter).
  // Relies on the caller passing a memoized array so this only fires on real changes.
  useEffect(() => {
    setVisibleCount(pageSize);
  }, [items, pageSize]);

  useEffect(() => {
    if (visibleCount >= items.length) return;
    const el = sentinelRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisibleCount((c) => Math.min(c + pageSize, items.length));
      },
      { threshold: 0 },
    );
    // The current element (`el`) is always set in production (React commits refs before effects),
    // but may be null in renderHook tests where no real DOM is mounted.
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [visibleCount, items.length, pageSize]);

  return {
    visibleItems: items.slice(0, visibleCount),
    sentinelRef,
    hasMore: visibleCount < items.length,
  };
}

/**
 * Puts opening focus where a `ResourcePickerDialog` host wants it, from the host's
 * `DialogContent`'s `onOpenAutoFocus`.
 *
 * A dialog focuses its first tabbable element on open, which for an embedded picker is whatever the
 * host renders first — typically a close button, so a keyboard user starts on "leave" rather than
 * on the search they came to do. Ordering the JSX is not enough on its own: the picker disables its
 * search box whenever there is nothing to filter, and focus then falls through to Retry or to the
 * close button anyway.
 *
 * This lives beside the picker rather than at each host because the disabled condition is the
 * picker's own state. A host that re-derived it would go stale the moment that condition changed.
 * The picker re-claims focus itself once the box becomes enabled, so a host that opens the picker
 * mid-fetch does not strand the user on the shell.
 *
 * @param event The `onOpenAutoFocus` event. Prevented whenever this function places focus itself.
 * @param searchInput The picker's search box, from the ref passed as `searchInputRef`.
 * @param content The host's own dialog content, used when there is nothing to type into. Escape and
 *   the screen-reader announcement both still work from there.
 */
export function focusResourcePickerOnOpen(
  event: Event,
  searchInput: HTMLInputElement | null | undefined,
  content: HTMLElement | null | undefined,
) {
  if (searchInput && !searchInput.disabled) {
    event.preventDefault();
    searchInput.focus();
    return;
  }
  if (content) {
    event.preventDefault();
    content.focus();
  }
}
