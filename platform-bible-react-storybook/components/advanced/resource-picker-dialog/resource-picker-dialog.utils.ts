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
