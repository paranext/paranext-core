// Common utilities for populating `ProjectSelectorProject.customData` in the shape the built-in
// groupings expect. Kept in `platform-bible-utils` so every ProjectSelector consumer references
// the same well-known keys.
//
// This module is PURE — it does not fetch anything from PAPI. Consumers are responsible for
// fetching the underlying data (project settings, the recently-opened-projects list, etc.) and
// passing it into these helpers.

/**
 * Well-known keys the ProjectSelector's built-in groupings (`language`, `type`, `lastUsed`) read
 * from `ProjectSelectorProject.customData`. Reference these constants rather than typing the key
 * strings inline so a rename here surfaces at every callsite.
 */
export const PROJECT_SELECTOR_CUSTOM_DATA_KEYS = Object.freeze({
  language: 'language',
  type: 'type',
  typeName: 'typeName',
  lastUsedAt: 'lastUsedAt',
} as const);

/**
 * The typed shape of the well-known {@link PROJECT_SELECTOR_CUSTOM_DATA_KEYS} entries. Every field
 * is optional — a grouping whose key is missing routes that project into its "unknown" bucket (or
 * is elided per the grouping's `unknownSectionHeading` config).
 */
export type ProjectSelectorCustomDataShape = {
  /**
   * Language name — bucketed by exact equality by the built-in `language` grouping and used as the
   * section heading verbatim. Consumer supplies a localized human-readable name.
   */
  language?: string;
  /**
   * Locale-stable type key — bucketed by exact equality by the built-in `type` grouping. Free form;
   * consumers pair it with `typeName` for display.
   */
  type?: string;
  /**
   * Human-readable label for {@link type}. The built-in `type` grouping uses the first non-empty
   * `typeName` observed in a bucket as the section heading (falls back to the raw `type` key when
   * no row in the bucket carries one).
   */
  typeName?: string;
  /**
   * Millisecond-epoch timestamp of the last time the caller-relevant "use" of this project
   * happened. The built-in `lastUsed` grouping partitions rows into a "Recently used" bucket (any
   * project with a timestamp) and an "Other" bucket (no timestamp), sorted newest-first within
   * Recently used.
   *
   * If your data source is an ordered recency list rather than per-project timestamps (as
   * `platformScripture.recentlyOpenedProjects.RecentProjects` returns), synthesize timestamps via
   * {@link recencyMapFromOrderedIds} — that preserves the source's ordering under the built-in
   * grouping's newest-first sort.
   */
  lastUsedAt?: number;
};

/**
 * Pack a subset of {@link ProjectSelectorCustomDataShape} into a plain record ready to assign to
 * `ProjectSelectorProject.customData`. Keys with a wrong-typed value (or `undefined`) are omitted
 * so groupings see them as "missing" rather than as a bogus empty string / NaN.
 *
 * Consumers with additional custom groupings can spread the returned record with their own keys:
 *
 * ```ts
 * const customData = {
 *   ...makeProjectSelectorCustomData({ language, type, typeName, lastUsedAt }),
 *   versificationId, // consumer-defined key for a custom `versification` grouping
 * };
 * ```
 */
export function makeProjectSelectorCustomData(
  input: ProjectSelectorCustomDataShape,
): Readonly<Record<string, unknown>> {
  const out: Record<string, unknown> = {};
  if (typeof input.language === 'string' && input.language.length > 0) {
    out[PROJECT_SELECTOR_CUSTOM_DATA_KEYS.language] = input.language;
  }
  if (typeof input.type === 'string' && input.type.length > 0) {
    out[PROJECT_SELECTOR_CUSTOM_DATA_KEYS.type] = input.type;
  }
  if (typeof input.typeName === 'string' && input.typeName.length > 0) {
    out[PROJECT_SELECTOR_CUSTOM_DATA_KEYS.typeName] = input.typeName;
  }
  if (typeof input.lastUsedAt === 'number' && Number.isFinite(input.lastUsedAt)) {
    out[PROJECT_SELECTOR_CUSTOM_DATA_KEYS.lastUsedAt] = input.lastUsedAt;
  }
  return out;
}

/**
 * Convert a recency-ordered list of project ids (most-recent FIRST, as returned by
 * `platformScripture.recentlyOpenedProjects.RecentProjects`) into a map of projectId → synthetic
 * `lastUsedAt` value suitable for feeding into `ProjectSelectorProject.customData`.
 *
 * The recently-opened-projects service exposes order without timestamps; this helper synthesizes a
 * monotonic descending value (higher = more recent) so the built-in `lastUsed` grouping's
 * newest-first sort inside "Recently used" preserves the source's ordering. Projects NOT in the
 * list get no entry, so they fall into the grouping's "Other" bucket per the built-in behavior.
 *
 * The synthesized values are DETERMINISTIC (do not call `Date.now()`), so calling this at render
 * time is safe — the returned map has stable content and consumers can memoize on the input list
 * identity.
 */
export function recencyMapFromOrderedIds(
  orderedProjectIds: readonly string[],
): ReadonlyMap<string, number> {
  const map = new Map<string, number>();
  const total = orderedProjectIds.length;
  orderedProjectIds.forEach((id, index) => {
    // Index 0 gets the highest score (total), index 1 gets total-1, etc. Strictly positive so
    // the number always passes the `typeof x === 'number'` presence check in the built-in
    // `lastUsed` grouping.
    map.set(id, total - index);
  });
  return map;
}
