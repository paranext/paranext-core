import type { OpenWebViewOptions, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';
import type { ProjectResourceFilterValue } from './project-resource-filter.component';

/** Options `platformGetResources.openHome` hands the Home web view provider. */
export interface HomeWebViewOptions extends OpenWebViewOptions {
  /**
   * Which items Home's type filter starts on. The user can change it from there. The title bar's
   * project picker footer asks for `paratextProject`, since it is asking "get me to one of my
   * projects". Optional, like every property here, because `OpenWebViewOptions` forbids an options
   * interface from adding mandatory properties — the reload and layout-restore paths routinely pass
   * none of them.
   */
  initialProjectResourceFilter?: ProjectResourceFilterValue;
}

/**
 * Build the Home web view's persisted `state` from its saved definition and the options its opener
 * supplies. Kept apart from the provider in `main.ts` so the option→state rules can be tested on
 * their own; `main.test.ts` covers the provider's use of it.
 *
 * `projectResourceFilter` holds the filter Home is showing; the web view writes the user's changes
 * back to it. Only an opener's preset replaces it. The provider also runs on paths that are not
 * opens at all — moving Home to a new window, an extension reload, a layout restore — and those
 * pass no preset, so without one the user's filter is kept. The filter is on screen and one click
 * to change, so a kept filter is never a hidden one.
 *
 * `shouldShowProjectsOnly` is a projects-only flag that older saved layouts carry. Nothing reads
 * it, so it is dropped rather than re-saved with every layout.
 */
export function buildHomeWebViewState(
  savedWebView: SavedWebViewDefinition,
  options: HomeWebViewOptions,
): WebViewDefinition['state'] {
  // Destructured only to leave the dead key out of the rest; `_` is the discard name for it.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { shouldShowProjectsOnly: _, ...savedState } = savedWebView.state ?? {};
  return options.initialProjectResourceFilter
    ? { ...savedState, projectResourceFilter: options.initialProjectResourceFilter }
    : savedState;
}

/**
 * Whether an already-open Home has to be reloaded to show the filter its opener asked for.
 *
 * Reusing an existing web view brings its tab to the front and returns without consulting the
 * provider, so fresh options never reach it; a reload rebuilds the iframe and is the only way in.
 * That rebuild is the expensive path — it also drops the user's search — so it is limited to an
 * opener that asks for a specific filter ("More projects…" asking for projects) when the filter
 * Home is showing, which the user may have changed since it opened, is a different one. An opener
 * with no preset is just asking for Home, so the tab is raised showing whatever filter it last
 * had.
 */
export function shouldReloadHomeForFilterPreset(
  existingWebView: SavedWebViewDefinition,
  initialProjectResourceFilter: ProjectResourceFilterValue | undefined,
): boolean {
  if (initialProjectResourceFilter === undefined) return false;
  return (existingWebView.state?.projectResourceFilter ?? 'all') !== initialProjectResourceFilter;
}
