import type { SavedWebViewDefinition, ScrollGroupScrRef, WebViewDefinition } from '@papi/core';
import type { FindWebViewOptions } from '../find.web-view-provider';
import { buildFindWebViewState, resolveFindScrollGroupScrRef } from './find-web-view-state.utils';

/** Localize key for the Find tab's title, used as both the tab title and the source of its tooltip. */
export const FIND_TITLE_KEY = '%webView_find_title%';

/** Lucide "Search" glyph for the tab icon, shown when Simple mode collapses tabs to icons only. */
export const FIND_ICON_URL = 'papi-extension://platformScripture/assets/icons/search.svg';

/** The fields the Find web view provider computes, minus the bundled `content` and `styles`. */
export type FindWebViewFields = {
  title: string;
  tooltip: string | undefined;
  projectId: string | undefined;
  isClosable: boolean;
  iconUrl: string | undefined;
  scrollGroupScrRef: ScrollGroupScrRef | undefined;
  state: WebViewDefinition['state'];
};

/**
 * Computes everything the Find web view provider returns except its bundled `content` and `styles`.
 *
 * Split out from the provider purely so it can be tested: the provider module imports the built web
 * view bundle through webpack's `?inline` loader, which no test runner in this repo can resolve, so
 * every rule encoded here — the interface-mode gates, the scroll-group fallback — was unreachable
 * from a test while it lived inline. The scroll-group and `state` rules live in
 * `find-web-view-state.utils.ts` and are composed in here, so there is one home for each rule.
 *
 * @param savedWebView The saved definition being rehydrated or updated.
 * @param options The caller's open/reload options.
 * @param interfaceMode The current `platform.interfaceMode`.
 * @param localizedTitle The resolved Find title, used for the tooltip (which is never
 *   auto-localized, unlike the title).
 */
export function buildFindWebViewFields(
  savedWebView: SavedWebViewDefinition,
  options: FindWebViewOptions,
  interfaceMode: string,
  localizedTitle: string,
): FindWebViewFields {
  const isSimpleMode = interfaceMode === 'simple';
  return {
    // The raw key, not the resolved string: `PlatformTabTitle` resolves a LocalizeKey title itself
    // and re-resolves it when the UI language changes, so the label follows a language switch
    // without waiting for the next `getWebView`. That matters more here than for a transient panel —
    // this tab is open for the whole session, so a resolved string would sit in the old language
    // indefinitely. Matches the Text Collection and resource panel providers.
    title: FIND_TITLE_KEY,
    // Resolved text, unlike `title`: tooltips are never auto-resolved, so this one has to arrive
    // already localized (same split as the Text Collection provider). Mirrors the title so the tab's
    // name is discoverable on hover once simple mode shrinks it to icon-only.
    //
    // Set unconditionally rather than gated on simple mode. `PlatformTabTitle` already suppresses a
    // tooltip that merely repeats the visible title unless the tab is collapsed to icon-only, and
    // its comment names this exact caller pattern — so a mode gate here would only re-implement that
    // suppression one layer further out. A power-mode arm would have nothing to put there anyway:
    // the provider spreads `savedWebView` first and is the only writer of this field, so falling back
    // to `savedWebView.tooltip` is a self-assignment.
    tooltip: localizedTitle,
    projectId: options.projectId || savedWebView.projectId || undefined,
    // This is the fixed Column 3 Find tab and must always remain open in simple mode, so it's
    // non-closable there — closing it would leave Find with no tab to bring to the front. Power mode
    // allows closing/rearranging freely. This also picks the tab's rc-dock group: `getTabGroup`
    // routes `isClosable === false` to `TAB_GROUP_RESOURCES`, which is only registered in simple
    // mode.
    isClosable: !isSimpleMode,
    // Icon-only tab in Simple mode only — Power mode keeps this tab text-labeled and un-iconed,
    // matching the resource panels. Without an icon here, Simple mode's icon-only collapse (which
    // hides the label) falls back to the generic app logo hard-coded in
    // platform-tab-title.component.scss, so the tab would lose every trace of its identity.
    iconUrl: isSimpleMode ? FIND_ICON_URL : savedWebView.iconUrl,
    scrollGroupScrRef: resolveFindScrollGroupScrRef(interfaceMode, savedWebView, options),
    state: buildFindWebViewState(savedWebView, options),
  };
}

export default buildFindWebViewFields;
