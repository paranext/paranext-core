import { useEffect, useState } from 'react';

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
 * SVG can't follow the theme or selection state — callers must swap the actual icon URL. This hook
 * detects selection by polling whether this web view's iframe has an `offsetParent` (rc-dock hides
 * an inactive tab's pane with `display: none`, which clears `offsetParent`); rc-dock fires no event
 * reachable from inside the iframe on tab switches, so polling is the only option.
 *
 * Callers own the theme subscription themselves (e.g. `papi.themes.subscribeCurrentTheme`) and pass
 * the resulting `isDarkTheme` in — this hook has no PAPI dependency.
 *
 * @param isDarkTheme Whether the current theme is dark.
 * @param tabIconUrls The four icon variant URLs for this tab.
 * @returns The icon URL to pass to `updateWebViewDefinition({ iconUrl })`.
 */
export function useTabIconSelection(isDarkTheme: boolean, tabIconUrls: TabIconUrls): string {
  const [isTabSelected, setIsTabSelected] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const read = (): boolean | undefined => {
      try {
        const { frameElement } = window;
        if (!(frameElement instanceof HTMLElement)) return undefined;
        return !!frameElement.offsetParent;
      } catch {
        return undefined;
      }
    };
    const update = () =>
      setIsTabSelected((prev) => {
        const next = read();
        return prev === next ? prev : next;
      });
    update();
    // rc-dock fires no event we can hook from inside the iframe on tab switches, so poll cheaply.
    const id = window.setInterval(update, 500);
    return () => window.clearInterval(id);
  }, []);

  return pickTabIconUrl(isDarkTheme, isTabSelected, tabIconUrls);
}

export default useTabIconSelection;
