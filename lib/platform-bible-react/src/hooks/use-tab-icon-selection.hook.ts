import { useViewVisibility } from './use-view-visibility.hook';

/** The four tab-icon variants, as static asset URLs (e.g. `papi-extension://` URLs). */
export type TabIconUrls = {
  /** Dark theme (any selection). */
  dark: string;
  /**
   * Light theme, tab selected (white). Unused by `pickTabIconUrl` today: every current host keeps
   * the active tab's header on a plain light background (never a dark/tinted one), so a white icon
   * would be invisible there. Kept in the type for a future host that does give the selected tab a
   * dark background and needs a contrasting icon.
   */
  lightSelected: string;
  /** Light theme, tab not selected (near-black). Also used for the selected state — see above. */
  lightUnselected: string;
  /** Light theme, selection unknown (mid-slate fallback). */
  lightDefault: string;
};

/**
 * Picks the tab icon URL. In dark theme the icon is always the dark variant. In light theme it's
 * the near-black variant regardless of selection — every current host keeps the active tab's header
 * on a plain light background rather than a dark/tinted one (see
 * `dock-layout-wrapper.simple-mode.scss`'s "SIMPLE-MODE TAB SELECTION LOOK" region), so a selected
 * tab needs the same contrast as an unselected one — a mid-slate fallback is used when the selected
 * state is unknown (`undefined`).
 */
export function pickTabIconUrl(
  isDarkTheme: boolean,
  isTabSelected: boolean | undefined,
  urls: TabIconUrls,
): string {
  if (isDarkTheme) return urls.dark;
  if (isTabSelected === undefined) return urls.lightDefault;
  return urls.lightUnselected;
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
