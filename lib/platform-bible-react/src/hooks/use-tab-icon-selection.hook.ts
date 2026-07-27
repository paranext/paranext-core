import { useViewVisibility } from './use-view-visibility.hook';

/** The four tab-icon variants, as static asset URLs (e.g. `papi-extension://` URLs). */
export type TabIconUrls = {
  /** Dark theme (any selection). */
  dark: string;
  /** Light theme, tab selected (white). */
  lightSelected: string;
  /** Light theme, tab not selected (near-black). */
  lightUnselected: string;
  /** Light theme, selection unknown (mid-slate fallback). */
  lightDefault: string;
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

/**
 * Resolves which tab-icon variant a web view tab should show, given the current theme and this
 * tab's live selected state.
 *
 * The tab icon is painted by the platform as a static CSS `background-image`, so a `currentColor`
 * SVG can't follow the theme or selection state — callers must swap the actual icon URL. "Selected"
 * here means this tab is the active one in its group: rc-dock renders exactly one tab's pane at a
 * time, hiding the rest with `display: none`, so "my pane is currently visible" and "I'm the
 * selected tab" are the same condition — this reuses `useViewVisibility`'s event-driven
 * `IntersectionObserver` detection rather than polling `frameElement.offsetParent` on an interval.
 * `pickTabIconUrl`'s `undefined` ("selection unknown") case is effectively unreachable through this
 * call site, since `useViewVisibility` resolves synchronously on first render with no unknown
 * window, but `pickTabIconUrl` keeps accepting it as a standalone, independently-testable
 * function.
 *
 * Callers own the theme subscription themselves (e.g. `papi.themes.subscribeCurrentTheme`) and pass
 * the resulting `isDarkTheme` in — this hook has no PAPI dependency.
 *
 * @param isDarkTheme Whether the current theme is dark.
 * @param tabIconUrls The four icon variant URLs for this tab.
 * @returns The icon URL to pass to `updateWebViewDefinition({ iconUrl })`.
 */
export function useTabIconSelection(isDarkTheme: boolean, tabIconUrls: TabIconUrls): string {
  const isTabSelected = useViewVisibility();
  return pickTabIconUrl(isDarkTheme, isTabSelected, tabIconUrls);
}

export default useTabIconSelection;
