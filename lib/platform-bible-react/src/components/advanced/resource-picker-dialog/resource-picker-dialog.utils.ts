import { useEffect, useRef, useState } from 'react';

export function useProgressiveList<T>(items: T[], pageSize = 50) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
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
    // el is always set in production (React commits refs before effects), but may be null
    // in renderHook tests where no real DOM is mounted.
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [visibleCount, items.length, pageSize]);

  return {
    visibleItems: items.slice(0, visibleCount),
    sentinelRef,
    hasMore: visibleCount < items.length,
  };
}
