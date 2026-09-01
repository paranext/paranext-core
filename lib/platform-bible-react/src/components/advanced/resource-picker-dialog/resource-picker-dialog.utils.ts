import { useEffect, useRef, useState } from 'react';
import { DblResourceData, ResourceType } from 'platform-bible-utils';
import { MultiSelectComboBoxEntry } from '@/components/advanced/multi-select-combo-box.component';

/**
 * Whether a resource belongs to the section of the catalogue currently on display. An undefined
 * `resourceType` means "no type filter", so everything matches; an array matches any of its types.
 *
 * Shared by the resource rows and the language filter so the two can never disagree about which
 * resources are in play — a language offered by the filter always has rows behind it.
 */
export function matchesResourceType(
  resource: DblResourceData,
  resourceType?: ResourceType | ResourceType[],
): boolean {
  if (!resourceType) return true;
  return Array.isArray(resourceType)
    ? resourceType.includes(resource.type)
    : resource.type === resourceType;
}

/**
 * Builds the language filter's options from a resource catalogue.
 *
 * Languages are returned alphabetically, never in catalogue order — a DBL catalogue arrives in an
 * arbitrary order that has nothing to do with what the user is likely to want. Languages that
 * already have an installed resource are `starred`, which `MultiSelectComboBox` promotes to the top
 * of the list when its `sortSelected` prop is set. Each entry carries its resource count as
 * `secondaryLabel`.
 *
 * Only languages with at least one resource of `resourceType` are offered, so selecting a language
 * can never produce an empty result list.
 *
 * Note that a consumer passing `sortSelected` re-sorts these entries itself, so the rendered order
 * is that component's (starred first, then selected, then alphabetical) rather than the plain
 * alphabetical order returned here.
 *
 * @param resources The full catalogue.
 * @param resourceType If provided, restricts both the offered languages and their counts to this
 *   type, or to any of these types.
 * @returns Alphabetically ordered entries, ready for `MultiSelectComboBox`.
 */
export function buildLanguageFilterOptions(
  resources: DblResourceData[],
  resourceType?: ResourceType | ResourceType[],
): MultiSelectComboBoxEntry[] {
  const countByLanguage = new Map<string, number>();
  const installedLanguages = new Set<string>();

  resources.forEach((resource) => {
    if (!matchesResourceType(resource, resourceType)) return;
    const language = resource.bestLanguageName;
    countByLanguage.set(language, (countByLanguage.get(language) ?? 0) + 1);
    if (resource.installed) installedLanguages.add(language);
  });

  return Array.from(countByLanguage.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([language, count]) => ({
      label: language,
      value: language,
      starred: installedLanguages.has(language),
      secondaryLabel: count.toLocaleString(),
    }));
}

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
