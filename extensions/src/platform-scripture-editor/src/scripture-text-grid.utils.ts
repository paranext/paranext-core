/** Number of displayed cells at or above which the tab title becomes "Text Collection". */
export const TEXT_COLLECTION_THRESHOLD = 2;

/**
 * Selects the Scripture Text Grid tab title based on how many resource cells are displayed.
 *
 * The title is count-driven: the single-cell form ("Scripture text") for 0-1 displayed cells, and
 * the "Text Collection" form once {@link TEXT_COLLECTION_THRESHOLD} or more cells are displayed.
 *
 * @param displayedCellCount Number of resource cells currently displayed in the grid.
 * @param titles Localized single- and multiple-cell tab titles.
 * @returns The localized title to show on the tab.
 */
export function selectScriptureTextGridTitle(
  displayedCellCount: number,
  titles: { single: string; multiple: string },
): string {
  return displayedCellCount >= TEXT_COLLECTION_THRESHOLD ? titles.multiple : titles.single;
}
