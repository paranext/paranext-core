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
 * supplies. Extracted from the provider so this option→state mapping is unit-testable: the provider
 * lives in `main.ts`, which imports its web views through webpack's `?inline` loader and so cannot
 * be loaded by the test runner.
 *
 * `projectResourceFilter` holds the filter Home is showing; the web view writes the user's changes
 * back to it. Every open resets it to the opener's preset rather than keeping the saved value: the
 * filter answers the question the opener asked, so a saved choice would leave Home filtered for
 * every later open, including the ones restored from a saved layout in a new session.
 *
 * `shouldShowProjectsOnly` is a projects-only flag that older saved layouts carry. Nothing reads
 * it, so it is dropped rather than re-saved with every layout.
 */
export function buildHomeWebViewState(
  savedWebView: SavedWebViewDefinition,
  options: HomeWebViewOptions,
): WebViewDefinition['state'] {
  // Destructured only to leave the dead key out of the rest; `_` is the discard name for it.
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars
  const { shouldShowProjectsOnly: _, ...savedState } = savedWebView.state ?? {};
  return {
    ...savedState,
    projectResourceFilter: options.initialProjectResourceFilter ?? 'all',
  };
}

/**
 * Whether an already-open Home has to be reloaded to show the filter its opener asked for.
 *
 * Reusing an existing web view brings its tab to the front and returns without consulting the
 * provider, so fresh options never reach it; a reload rebuilds the iframe and is the only way in.
 * That rebuild is the expensive path — it also drops the user's search — so it is limited to an
 * opener that asks for a specific filter ("More projects…" asking for projects) when the filter
 * Home is showing, which the user may have changed since it opened, is a different one. An opener
 * with no preset is just asking for Home, so the tab is raised as the user left it.
 */
export function shouldReloadHomeForFilterPreset(
  existingWebView: SavedWebViewDefinition,
  initialProjectResourceFilter: ProjectResourceFilterValue,
): boolean {
  if (initialProjectResourceFilter === 'all') return false;
  return (existingWebView.state?.projectResourceFilter ?? 'all') !== initialProjectResourceFilter;
}
