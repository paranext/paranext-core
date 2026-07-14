/** The four tab-icon variants, as papi-extension asset URLs. */
export type TabIconUrls = {
  /** Dark theme (any selection). */ dark: string;
  /** Light theme, tab selected (white). */ lightSelected: string;
  /** Light theme, tab not selected (near-black). */ lightUnselected: string;
  /** Light theme, selection unknown (mid-slate fallback). */ lightDefault: string;
};

/**
 * Picks the tab icon URL. In dark theme the icon is always the light variant. In light theme it
 * matches the tab text: near-black when unselected, white when selected, and a mid-slate fallback
 * when the selected state is unknown (`undefined`).
 */
export function pickTabIconUrl(
  isDarkTheme: boolean,
  isTabSelected: boolean | undefined,
  urls: TabIconUrls,
): string {
  if (isDarkTheme) return urls.dark;
  if (isTabSelected === true) return urls.lightSelected;
  if (isTabSelected === false) return urls.lightUnselected;
  return urls.lightDefault;
}
