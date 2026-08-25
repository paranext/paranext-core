/**
 * THE single filter-and-rank implementation for marker command palettes — shared by the renderer's
 * overlay service (list rendering AND commit resolution) and the marker-palette keydown forwarding
 * table (zero-match detection), so what is on screen, what a commit resolves, and what the session
 * table counts can never disagree.
 *
 * Ranking is deliberately NOT reimplemented here: it delegates to the editor package's
 * `filterAndRankItems`, the exact function behind the in-editor `\` palette (`NodeSelectionMenu`
 * filters on the marker name), so the host palette ranks identically — exact match first, then
 * prefix matches, then containment matches (nearest occurrence first), with ties keeping their
 * original context order (stable sort). Matching is label-only in both modes (the label IS the
 * marker for marker palettes); descriptions and badges never match, so a description hit can never
 * outrank — or bury — the exact label match.
 */

import { filterAndRankItems, type Item } from '@eten-tech-foundation/platform-editor';

/**
 * How {@link filterAndRankPaletteItems} matches filter text against item labels — one mode per
 * palette flavor:
 *
 * - `'passive'` — case-insensitive PREFIX match, mirroring PT9's marker dropdown
 *   (`MarkerDropdownControl.UpdateMarkerList`): a leading `+` in the filter text is stripped before
 *   matching, so `"+w"` matches the same items as `"w"`.
 * - `'active'` — case-insensitive CONTAINMENT match (still label-only).
 *
 * Both modes rank exact-first via the editor's `filterAndRankItems`.
 */
export type PaletteFilterMode = 'active' | 'passive';

/** The editor ranker's item constraint plus the one key marker palettes rank on. */
type RankableItem = Item & { label: string };

/**
 * Strips the USFM nesting prefix (`+`) from typed filter text before matching: `\+nd` names the
 * same marker as `\nd` (PT9's dropdown strips it too), and item labels never carry it. THE one
 * strip for every matching site — both modes below and the legacy inline `MarkerMenu` — so the rule
 * cannot drift between them: it used to exist in `'passive'` only, so the same keystrokes that
 * filtered at a caret produced zero matches and a silent refusal over a selection.
 */
export function stripMarkerNestingPrefix(filterText: string): string {
  return filterText.replace(/^\+/, '');
}

/**
 * Filters `items` by matching `filterText` against each item's `label` and ranks the matches
 * exact-first (exact > prefix > containment, ties keeping their original order — the editor
 * palette's ordering). Returns `items` in their original order when `filterText` is empty or
 * undefined: the unfiltered offer keeps the library's PT9-derived basic-first order, which ranking
 * must not alphabetize away.
 *
 * @param items The full, unfiltered list of palette items (label = the bare marker code for marker
 *   palettes)
 * @param filterText The current filter text, or undefined/empty for no filtering
 * @param mode Which palette flavor's matching semantics to apply
 * @returns The matching items, ranked exact-first
 */
export function filterAndRankPaletteItems<T extends { label: string }>(
  items: readonly T[],
  filterText: string | undefined,
  mode: PaletteFilterMode,
): T[] {
  if (!filterText) return [...items];

  // The editor ranker constrains its generic to a string-indexable record; a concrete item type
  // (CommandPaletteItem etc.) has no index signature, so it cannot satisfy that constraint at the
  // type level even though any object is string-indexable at runtime. The assertions bridge
  // exactly that gap — the ranker only reads the 'label' key, which T is required to carry.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const rankableItems = [...items] as unknown as (T & RankableItem)[];

  if (mode === 'passive') {
    return filterAndRankItems({
      query: stripMarkerNestingPrefix(filterText),
      items: rankableItems,
      filter: (item, itemQuery) => item.label.toLowerCase().startsWith(itemQuery.toLowerCase()),
      sortBy: 'label',
    });
  }

  return filterAndRankItems({
    query: stripMarkerNestingPrefix(filterText),
    items: rankableItems,
    filterBy: 'label',
  });
}
