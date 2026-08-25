/**
 * Renderer-side palette filtering for the overlay service — the IMPLEMENTATION half that
 * `overlay.service-model.ts` must not carry: the service model is a cross-process CONTRACT, and a
 * runtime value import from `platform-bible-react` there pulled the component library into every
 * consumer of the contract's types.
 */

import { filterAndRankPaletteItems, type PaletteFilterMode } from 'platform-bible-react';
import type { CommandPaletteItem } from '@renderer/services/overlays/overlay.service-model';

/**
 * Filters command palette items by matching `filterText` against each item's `label`, with
 * per-{@link PaletteFilterMode} semantics (passive prefix-matches with a leading `+` stripped from
 * the filter first, active containment-matches), and ranks the matches EXACT-FIRST: exact label
 * match, then prefix matches, then containment matches, ties keeping their original context order.
 * Matching is case-insensitive (custom USFM markers may be capitalized, and search-box input should
 * never be case-picky). Returns `items` unchanged when `filterText` is empty or undefined.
 *
 * Delegates to `filterAndRankPaletteItems` (platform-bible-react), which wraps the editor package's
 * own `filterAndRankItems` — the exact ranking behind the in-editor `\` palette — so the host
 * palette and the editor palette can never disagree about ordering, and the marker-palette keydown
 * table's zero-match detection counts with the same semantics.
 *
 * This is the single filtering implementation shared by the host-side
 * `commitCommandPaletteSelection` (to resolve the highlighted item) and the command palette
 * component (to render the filtered list) — using one function for both keeps host-side selection
 * and on-screen rendering from disagreeing about which items are visible.
 *
 * @remarks
 * Matching operates directly on the strings in `items` with no localization of its own. Both
 * callers pass items whose `LocalizeKey` text was already resolved to localized strings when the
 * palette was shown (see `IOverlayService.showCommandPalette`), so host-side filtering, commit
 * resolution, and the rendered list all match against the same display text.
 * @param items The full, unfiltered list of command palette items
 * @param filterText The current filter text, or undefined/empty for no filtering
 * @param mode Which palette flavor's matching semantics to apply
 * @returns The items matching the filter text under the given mode, ranked exact-first
 */
export function filterPaletteItems(
  items: CommandPaletteItem[],
  filterText: string | undefined,
  mode: PaletteFilterMode,
): CommandPaletteItem[] {
  return filterAndRankPaletteItems(items, filterText, mode);
}
