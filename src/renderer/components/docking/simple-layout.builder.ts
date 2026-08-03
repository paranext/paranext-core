import cloneDeep from 'lodash/cloneDeep';
import { BoxBase, LayoutBase, PanelBase } from 'rc-dock';
import { SavedTabInfo } from '@shared/models/docking-framework.model';
import { simpleLayout } from './simple-layout.data';

const SCRIPTURE_EDITOR_WEB_VIEW_TYPE = 'platformScriptureEditor.react';

/**
 * Depth-first walk of every panel in a LayoutBase's dockbox. The one recursive box/panel traversal
 * both {@link visitTabs} (production) and the test file's `panelTabCounts` build on, so the
 * recursion exists in exactly one place. Exported for the test file's reuse — see
 * `simple-layout.builder.test.ts`.
 */
export function visitPanels(layout: LayoutBase, visit: (panel: PanelBase) => void): void {
  const isBoxBase = (node: BoxBase | PanelBase): node is BoxBase => 'children' in node;
  const isPanelBase = (node: BoxBase | PanelBase): node is PanelBase => 'tabs' in node;
  const visitNode = (node: BoxBase | PanelBase) => {
    if (isBoxBase(node)) node.children.forEach(visitNode);
    else if (isPanelBase(node)) visit(node);
  };
  if (layout.dockbox) visitNode(layout.dockbox);
}

/**
 * Walk every tab in a LayoutBase. The tabs in {@link simpleLayout} are created as `SavedTabInfo`
 * shapes and then narrowed to rc-dock's `TabBase` at the layout boundary; we recover the original
 * shape here so callers can read/write the `data` payload (`projectId`, `state`, `webViewType`).
 */
export function visitTabs(layout: LayoutBase, visit: (tab: SavedTabInfo) => void): void {
  visitPanels(layout, (panel) => {
    panel.tabs.forEach((tab) => {
      // rc-dock's `TabBase` doesn't expose `data`, but every tab in `simpleLayout` is built as a
      // SavedTabInfo. Round-trip the cast in one place rather than at every read site.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      visit(tab as unknown as SavedTabInfo);
    });
  });
}

/**
 * The stable UUIDs used for the simple-mode tabs. Derived from {@link simpleLayout} so this list
 * cannot drift from the static layout. Exposed so callers driving the power → simple transition can
 * wait until each tab's webview has resolved (replacing the unknown-title placeholder) before
 * hiding the workspace-updating overlay.
 */
export const SIMPLE_LAYOUT_TAB_IDS: readonly string[] = (() => {
  const ids: string[] = [];
  visitTabs(simpleLayout, (tab) => {
    if (tab.id) ids.push(tab.id);
  });
  return ids;
})();

/** Narrows a tab's `data`/`state` payload (typed `unknown` on `TabBase`) to a writable record. */
function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object';
}

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
 *
 * @param isReadOnly Whether the scripture editor tab should restore read-only. This should reflect
 *   the target project's real-time `platform.isEditable` setting (as the normal open-flow does in
 *   `platform-scripture-editor`'s `main.ts`), because the resolved `projectId`
 *   (most-recently-active project, or a cached one) is not guaranteed to be editable: it can be a
 *   Resource Viewer's project, or a project whose editability changed since it was cached (e.g. a
 *   Send/Receive that revoked edit permission).
 */
export function buildSimpleLayoutForProject(projectId: string, isReadOnly: boolean): LayoutBase {
  const cloned = cloneDeep(simpleLayout);
  visitTabs(cloned, (tab) => {
    if (!isObjectRecord(tab.data)) return;
    tab.data.projectId = projectId;
    // The scripture editor's factory reads `state.isReadOnly` when restoring from saved state. Set
    // it explicitly so the restore matches what the editable open-flow would produce.
    if (tab.data.webViewType === SCRIPTURE_EDITOR_WEB_VIEW_TYPE) {
      const previousState = isObjectRecord(tab.data.state) ? tab.data.state : {};
      tab.data.state = { ...previousState, isReadOnly };
    }
  });
  return cloned;
}
