import type { SavedWebViewDefinition, ScrollGroupScrRef } from '@papi/core';

/** Localize key for the Find tab's title, used as both the tab title and the source of its tooltip. */
export const FIND_TITLE_KEY = '%webView_find_title%';

/** Lucide "Search" glyph for the tab icon, shown when Simple mode collapses tabs to icons only. */
export const FIND_ICON_URL = 'papi-extension://platformScripture/assets/icons/search.svg';

/** The subset of `FindWebViewOptions` that shapes the returned definition. */
export type FindDefinitionOptions = {
  projectId?: string;
  editorScrollGroupId?: ScrollGroupScrRef;
  editorWebViewId?: string;
  initialSearchText?: string;
  isReadOnly?: boolean;
};

/** The fields the Find web view provider computes, minus the bundled `content` and `styles`. */
export type FindWebViewFields = {
  title: string;
  tooltip: string | undefined;
  projectId: string | undefined;
  isClosable: boolean;
  iconUrl: string | undefined;
  scrollGroupScrRef: ScrollGroupScrRef | undefined;
  state: Record<string, unknown>;
};

/**
 * Computes everything the Find web view provider returns except its bundled `content` and `styles`.
 *
 * Split out from the provider purely so it can be tested: the provider module imports the built web
 * view bundle through webpack's `?inline` loader, which no test runner in this repo can resolve, so
 * every rule encoded here — the interface-mode gates, the scroll-group fallback, the read-only
 * scrub — was unreachable from a test while it lived inline.
 *
 * @param savedWebView The saved definition being rehydrated or updated.
 * @param options The caller's open/reload options.
 * @param interfaceMode The current `platform.interfaceMode`.
 * @param localizedTitle The resolved Find title, used for the tooltip (which is never
 *   auto-localized, unlike the title).
 */
export function buildFindWebViewFields(
  savedWebView: SavedWebViewDefinition,
  options: FindDefinitionOptions,
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
    // Falls back rather than overwriting: every hydration of a saved layout reloads with no options
    // at all, so assigning `editorScrollGroupId` unconditionally would destroy the saved value on
    // each restart — in power mode that silently snapped a user-chosen scroll group back to the
    // first one. Simple mode forces group 0 so Find stays verse-synced with the editor, matching the
    // other fixed Column 3 panels rather than relying on `useScrollGroupScrRef`'s `?? 0` default to
    // land there by accident.
    scrollGroupScrRef:
      options.editorScrollGroupId ?? (isSimpleMode ? 0 : savedWebView.scrollGroupScrRef),
    state: {
      ...savedWebView.state,
      editorWebViewId: options.editorWebViewId ?? savedWebView.state?.editorWebViewId,
      // Recomputed whenever the caller re-points the project, and carried over otherwise — the same
      // asymmetry `projectId` above has, and for the same reason. A caller that names a project is
      // stating what Find is now bound to, so an omitted `isReadOnly` there means writable, and a
      // stale `true` from a session spent on a resource cannot outlive the switch back to a
      // translation project and leave Replace mysteriously disabled. A caller that names no project
      // is not re-pointing anything: layout hydration reloads with `{ bringToFront: false }` alone,
      // keeping the saved `projectId`, so defaulting to writable there would restore a Find bound to
      // a published resource with Replace enabled on text the project rejects.
      isReadOnly:
        options.isReadOnly ?? (options.projectId ? false : !!savedWebView.state?.isReadOnly),
      ...(options.initialSearchText ? { findSearchTerm: options.initialSearchText } : {}),
    },
  };
}

export default buildFindWebViewFields;
