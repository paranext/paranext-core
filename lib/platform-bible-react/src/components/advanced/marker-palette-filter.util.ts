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

import {
  filterAndRankItems,
  type Item,
  type StyleInfo,
} from '@eten-tech-foundation/platform-editor';

/**
 * How {@link filterAndRankPaletteItems} matches filter text against item labels — one mode per
 * palette flavor:
 *
 * - `'passive'` — case-insensitive PREFIX match, mirroring PT9's marker dropdown
 *   (`MarkerDropdownControl.UpdateMarkerList`).
 * - `'active'` — case-insensitive CONTAINMENT match (still label-only).
 *
 * Both modes strip the `+` nesting prefix from the filter text AND the item label before comparing
 * ({@link stripMarkerNestingPrefix}), so `"+w"` matches the same items as `"w"` and a nested
 * close-tag label like `"+wj*"` matches a `"w"` query. Both modes rank exact-first via the editor's
 * `filterAndRankItems`.
 */
export type PaletteFilterMode = 'active' | 'passive';

/** The editor ranker's item constraint plus the one key marker palettes rank on. */
type RankableItem = Item & { label: string };

/**
 * Strips the USFM nesting prefix (`+`) from marker text before matching: `\+nd` names the same
 * marker as `\nd` (PT9's dropdown strips it too). Applied to BOTH sides of every comparison — the
 * typed filter AND the item's marker text — because nested close-tag items DO carry the prefix in
 * their labels (the editor package emits `+wj*` for every open char span except the outermost). THE
 * one strip for every matching site — both modes below, the keydown table's commit-key lookups, and
 * the legacy inline `MarkerMenu` — so the rule cannot drift between them.
 *
 * Matching only: commits preserve an item's own bytes (a nested closer keeps its leading `+`), and
 * `commitTyped` passes the typed text verbatim.
 */
export function stripMarkerNestingPrefix(markerText: string): string {
  return markerText.replace(/^\+/, '');
}

/**
 * Whether `marker` names a NOTE style in the project's stylesheet.
 *
 * What every marker palette hands the forwarding table as
 * {@link MarkerPaletteSessionState.isNoteMarker}, so its Space branch can apply PT9's note rule. The
 * table cannot answer this from its own `items`: a note marker a palette does not offer is missing
 * from that list precisely in the cases the rule exists for — the Enter palette, whose source is
 * paragraph markers; a `\` palette at a caret where notes are not valid; and the footnote popover,
 * which offers note-INTERNAL markers. The stylesheet knows `f` is a note either way.
 *
 * Normalization matches the visible list's: case-folded, with the `+` nesting prefix stripped from
 * both sides, so `\F` and `\+f` resolve to the same `f` entry the palette shows them matching.
 */
export function isNoteMarker(styleInfo: StyleInfo | undefined, marker: string): boolean {
  if (!styleInfo || marker === '') return false;
  const typed = stripMarkerNestingPrefix(marker).toLowerCase();
  return Object.values(styleInfo.markers).some(
    (style) =>
      style.styleType === 'note' && stripMarkerNestingPrefix(style.marker).toLowerCase() === typed,
  );
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

  // Both the query and each label are normalized with stripMarkerNestingPrefix (see its doc): the
  // `+` is nesting decoration, so `+w` filters like `w` and a nested closer's `+wj*` label matches
  // a `w` query. Ranking still sorts by the RAW label (exact > prefix > containment on the
  // stripped query), which naturally orders plain markers ahead of `+`-prefixed closers.
  const query = stripMarkerNestingPrefix(filterText).toLowerCase();

  if (mode === 'passive') {
    return filterAndRankItems({
      query,
      items: rankableItems,
      filter: (item) => stripMarkerNestingPrefix(item.label).toLowerCase().startsWith(query),
      sortBy: 'label',
    });
  }

  return filterAndRankItems({
    query,
    items: rankableItems,
    filter: (item) => stripMarkerNestingPrefix(item.label).toLowerCase().includes(query),
    sortBy: 'label',
  });
}
