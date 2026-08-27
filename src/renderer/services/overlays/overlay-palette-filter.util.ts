/**
 * Renderer-side palette filtering for the overlay service — the IMPLEMENTATION half that
 * `overlay.service-model.ts` must not carry: the service model is a cross-process CONTRACT, and a
 * runtime value import from `platform-bible-react` there pulled the component library into every
 * consumer of the contract's types.
 */

import {
  filterAndRankPaletteItems,
  stripMarkerNestingPrefix,
  type PaletteFilterMode,
} from 'platform-bible-react';
import type {
  CommandPaletteItem,
  PaletteSearchField,
} from '@renderer/services/overlays/overlay.service-model';

/**
 * The fields searched when a request declares no `searchFields` of its own: every text field a
 * palette item displays. This is the historical behavior general command palettes rely on (a
 * command is often found by a word from its description); palettes whose label is the whole
 * identity (marker palettes) opt into `['label']` per request instead.
 */
export const DEFAULT_PALETTE_SEARCH_FIELDS: readonly PaletteSearchField[] = [
  'label',
  'description',
  'badge',
];

/**
 * Filters command palette items by matching `filterText` against each item's text, with
 * per-{@link PaletteFilterMode} semantics and the request's `searchFields` deciding which fields
 * participate. Every leg — including the label leg — runs only when the effective search fields
 * include its field, so a request declaring e.g. `searchFields: ['description']` gets no label
 * matches.
 *
 * - `'passive'` prefix-matches the `label` and never searches the other fields — PT9 marker-dropdown
 *   semantics for in-document marker typing.
 * - `'active'` containment-matches over `searchFields` (default
 *   {@link DEFAULT_PALETTE_SEARCH_FIELDS}): label matches come FIRST, ranked exact-first (exact
 *   label match, then prefix matches, then containment matches, ties keeping their original context
 *   order); items matching only on the other searched fields follow in their original order, so an
 *   exact label match can never be buried under description/badge hits.
 *
 * Matching is case-insensitive (custom USFM markers may be capitalized, and search-box input should
 * never be case-picky), and every leg strips the `+` marker-nesting prefix from the filter before
 * comparing (the label leg strips it from labels too — see `stripMarkerNestingPrefix`), so the legs
 * all match the same typed text. Returns `items` unchanged when `filterText` is empty or
 * undefined.
 *
 * Label matching delegates to `filterAndRankPaletteItems` (platform-bible-react), which wraps the
 * editor package's own `filterAndRankItems` — the exact ranking behind the in-editor `\` palette —
 * so the host palette and the editor palette can never disagree about label ordering, and the
 * marker-palette keydown table's zero-match detection counts with the same semantics.
 *
 * This is the single filtering implementation shared by the host-side
 * `commitCommandPaletteSelection` (to resolve the highlighted item) and the command palette
 * component (to render the filtered list) — using one function for both keeps host-side selection
 * and on-screen rendering from disagreeing about which items are visible. Callers thread the
 * request's `searchFields` through so those sites also agree on WHICH fields match.
 *
 * @remarks
 * Matching operates directly on the strings in `items` with no localization of its own. Both
 * callers pass items whose `LocalizeKey` text was already resolved to localized strings when the
 * palette was shown (see `IOverlayService.showCommandPalette`), so host-side filtering, commit
 * resolution, and the rendered list all match against the same display text.
 * @param items The full, unfiltered list of command palette items
 * @param filterText The current filter text, or undefined/empty for no filtering
 * @param mode Which palette flavor's matching semantics to apply
 * @param searchFields Which item text fields to match against; defaults to
 *   {@link DEFAULT_PALETTE_SEARCH_FIELDS}
 * @returns The items matching the filter text under the given mode, label matches ranked
 *   exact-first ahead of other-field matches
 */
export function filterPaletteItems(
  items: CommandPaletteItem[],
  filterText: string | undefined,
  mode: PaletteFilterMode,
  searchFields: readonly PaletteSearchField[] = DEFAULT_PALETTE_SEARCH_FIELDS,
): CommandPaletteItem[] {
  if (!filterText) return [...items];

  const labelMatches = searchFields.includes('label')
    ? filterAndRankPaletteItems(items, filterText, mode)
    : [];
  if (mode === 'passive') return labelMatches;

  const extraFields = searchFields.filter((field) => field !== 'label');
  if (extraFields.length === 0) return labelMatches;

  // Containment over the non-label fields, with the same query normalization as the label leg
  // (`+` nesting prefix stripped, case-folded) so the two legs match the same typed text. The
  // field text itself is not marker-decorated, so it has nothing to strip.
  const normalizedFilter = stripMarkerNestingPrefix(filterText).toLowerCase();
  const labelMatchSet = new Set(labelMatches);
  const extraMatches = items.filter(
    (item) =>
      !labelMatchSet.has(item) &&
      extraFields.some((field) => item[field]?.toLowerCase().includes(normalizedFilter)),
  );
  return [...labelMatches, ...extraMatches];
}
