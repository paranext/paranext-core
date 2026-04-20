import { ComponentType } from 'react';

/**
 * Webview types whose instances should each have an independent zoom level. Callers may mutate this
 * set at startup to register additional editor-like views from extensions.
 */
export const PER_INSTANCE_VIEW_TYPES = new Set<string>([
  // Scripture editor: each open editor tab holds a distinct book/chapter and is used for reading
  // and editing document content, so each instance should keep its own zoom level.
  // Defined in extensions/src/platform-scripture-editor/src/platform-scripture-editor.utils.ts
  // as SCRIPTURE_EDITOR_WEBVIEW_TYPE.
  'platformScriptureEditor.react',
  // Other built-in webview types (inventories, find, checks side panel, home, new tab, dictionary,
  // comment list, registration, internet settings) are panels/tools rather than document-like
  // content, so they keep per-type zoom. Add more here if extensions register additional
  // editor-like views.
]);

const DEFAULT_SUFFIX = '__default';

type TabInfoLike = {
  id: string;
  tabType: string;
  data?: { webViewType?: string };
};

/** Returns the storage key under which this tab's zoom is persisted. */
export function getZoomKeyForTab(tab: TabInfoLike): string {
  if (tab.tabType === 'webView') {
    const webViewType = tab.data?.webViewType ?? 'webView';
    if (PER_INSTANCE_VIEW_TYPES.has(webViewType)) return `${webViewType}:${tab.id}`;
    return webViewType;
  }
  return tab.tabType;
}

/** Returns the storage key for a dialog, based on its React component name. */
export function getZoomKeyForDialog(Component: ComponentType<unknown>): string {
  const name = Component.displayName || Component.name || 'anonymous';
  return `dialog:${name}`;
}

/** Key under which a per-instance view type stores its "last used" default for new instances. */
export function getDefaultKeyForInstance(webViewType: string): string {
  return `${webViewType}:${DEFAULT_SUFFIX}`;
}

/** True if a key uses the per-instance `type:id` (or `type:__default`) shape. */
export function isPerInstanceKey(key: string): boolean {
  const idx = key.lastIndexOf(':');
  if (idx <= 0) return false;
  const prefix = key.slice(0, idx);
  return PER_INSTANCE_VIEW_TYPES.has(prefix);
}
