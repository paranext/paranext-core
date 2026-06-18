import cloneDeep from 'lodash/cloneDeep';
import { BoxBase, LayoutBase, PanelBase } from 'rc-dock';
import { SavedTabInfo } from '@shared/models/docking-framework.model';
import { simpleLayout } from './simple-layout.data';

const SCRIPTURE_EDITOR_WEB_VIEW_TYPE = 'platformScriptureEditor.react';

/**
 * Walk every tab in a LayoutBase. The tabs in {@link simpleLayout} are created as `SavedTabInfo`
 * shapes and then narrowed to rc-dock's `TabBase` at the layout boundary; we recover the original
 * shape here so callers can read/write the `data` payload (`projectId`, `state`, `webViewType`).
 */
function visitTabs(layout: LayoutBase, visit: (tab: SavedTabInfo) => void): void {
  const isBoxBase = (node: BoxBase | PanelBase): node is BoxBase => 'children' in node;
  const isPanelBase = (node: BoxBase | PanelBase): node is PanelBase => 'tabs' in node;
  const visitNode = (node: BoxBase | PanelBase) => {
    if (isBoxBase(node)) node.children.forEach(visitNode);
    else if (isPanelBase(node))
      node.tabs.forEach((tab) => {
        // rc-dock's `TabBase` doesn't expose `data`, but every tab in `simpleLayout` is built as a
        // SavedTabInfo. Round-trip the cast in one place rather than at every read site.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        visit(tab as unknown as SavedTabInfo);
      });
  };
  if (layout.dockbox) visitNode(layout.dockbox);
}

/**
 * The four stable UUIDs used for the simple-mode tabs. Derived from {@link simpleLayout} so this
 * list cannot drift from the static layout. Exposed so callers driving the power → simple
 * transition can wait until each tab's webview has resolved (replacing the unknown-title
 * placeholder) before hiding the workspace-updating overlay.
 */
export const SIMPLE_LAYOUT_TAB_IDS: readonly string[] = (() => {
  const ids: string[] = [];
  visitTabs(simpleLayout, (tab) => {
    if (tab.id) ids.push(tab.id);
  });
  return ids;
})();

/**
 * Builds a clone of the static {@link simpleLayout} with `projectId` baked into each tab's saved
 * web-view definition. When the dock layout restores from this, each web-view provider's
 * `getWebView` receives the `projectId` via `savedWebView.projectId` (or `state.isReadOnly` for the
 * scripture editor) and renders the real project content immediately — no empty-placeholder mount
 * followed by a `reloadWebView` round-trip. This is the simple-mode equivalent of how power mode
 * restores its persisted layout: state baked in, no follow-up commands required.
 *
 * If the caller can't resolve a project (cold start, no recents), load the bare `simpleLayout`
 * instead — the default-project picker in `platform-scripture-editor` will still fill the empty
 * Scripture Editor placeholder after the layout swap (the slower path, but a valid fallback).
 */
function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object';
}

export function buildSimpleLayoutForProject(projectId: string): LayoutBase {
  const cloned = cloneDeep(simpleLayout);
  visitTabs(cloned, (tab) => {
    if (!isObjectRecord(tab.data)) return;
    tab.data.projectId = projectId;
    // The scripture editor's factory reads `state.isReadOnly` when restoring from saved state. Set
    // it explicitly so the restore matches what the editable open-flow would produce.
    if (tab.data.webViewType === SCRIPTURE_EDITOR_WEB_VIEW_TYPE) {
      const previousState = isObjectRecord(tab.data.state) ? tab.data.state : {};
      tab.data.state = { ...previousState, isReadOnly: false };
    }
  });
  return cloned;
}
