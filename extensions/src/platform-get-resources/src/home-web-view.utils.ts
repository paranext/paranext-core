import type { OpenWebViewOptions, SavedWebViewDefinition, WebViewDefinition } from '@papi/core';

/** Options `platformGetResources.openHome` hands the Home web view provider. */
export interface HomeWebViewOptions extends OpenWebViewOptions {
  /**
   * Open Home scoped to editable projects, leaving out the published resources that otherwise share
   * its list. Set by the title bar's project picker footer, which is asking "get me to one of my
   * projects". Optional, like every property here, because `OpenWebViewOptions` forbids an options
   * interface from adding mandatory properties — the reload and layout-restore paths routinely pass
   * none of them.
   */
  shouldShowProjectsOnly?: boolean;
}

/**
 * Build the Home web view's persisted `state` from its saved definition and the options its opener
 * supplies. Extracted from the provider so this option→state mapping is unit-testable: the provider
 * lives in `main.ts`, which imports its web views through webpack's `?inline` loader and so cannot
 * be loaded by the test runner.
 *
 * `shouldShowProjectsOnly` is assigned unconditionally rather than falling back to the saved value.
 * It is a property of the launch, not of the tab, and it rides along in the persisted `state` — so
 * carrying a saved `true` over would leave Home hiding resources for every later open, including
 * the ones restored from a saved layout in a new session.
 */
export function buildHomeWebViewState(
  savedWebView: SavedWebViewDefinition,
  options: HomeWebViewOptions,
): WebViewDefinition['state'] {
  return {
    ...savedWebView.state,
    shouldShowProjectsOnly: options.shouldShowProjectsOnly ?? false,
  };
}

/**
 * Whether an already-open Home has to be reloaded to honor the scoping its opener asked for.
 *
 * Reusing an existing web view brings its tab to the front and returns without consulting the
 * provider, so fresh options never reach it; a reload rebuilds the iframe and is the only way in.
 * That rebuild is the expensive path, so it is limited to the case where the scoping actually
 * differs — clicking "More projects…" twice, or opening Home from the menu twice, reloads nothing.
 */
export function shouldReloadHomeForProjectsOnly(
  existingWebView: SavedWebViewDefinition,
  shouldShowProjectsOnly: boolean,
): boolean {
  return !!existingWebView.state?.shouldShowProjectsOnly !== shouldShowProjectsOnly;
}
