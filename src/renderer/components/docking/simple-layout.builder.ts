import { deepClone } from 'platform-bible-utils';
import { BoxBase, LayoutBase, PanelBase } from 'rc-dock';
import { SavedTabInfo } from '@shared/models/docking-framework.model';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from '@shared/models/web-view.model';
import { simpleLayout } from './simple-layout.data';

/**
 * Depth-first walk of every panel in a LayoutBase — its `dockbox`, and its `floatbox`/`windowbox`/
 * `maxbox` when present (rc-dock keeps floated/windowed/maximized tabs in these sibling boxes, not
 * `dockbox`). The one recursive box/panel traversal both {@link visitTabs} (production) and the test
 * file's `panelTabCounts` build on, so the recursion exists in exactly one place. Exported for the
 * test file's reuse — see `simple-layout.builder.test.ts`.
 */
export function visitPanels(layout: LayoutBase, visit: (panel: PanelBase) => void): void {
  const isBoxBase = (node: BoxBase | PanelBase): node is BoxBase => 'children' in node;
  const isPanelBase = (node: BoxBase | PanelBase): node is PanelBase => 'tabs' in node;
  const visitNode = (node: BoxBase | PanelBase) => {
    // Not `else if`: a well-formed node is one or the other, but a corrupted/hand-edited saved
    // layout could carry both `children` and `tabs` on one node, and silently picking only the box
    // branch would drop that node's tabs from the walk entirely.
    if (isBoxBase(node)) node.children.forEach(visitNode);
    if (isPanelBase(node)) visit(node);
  };
  [layout.dockbox, layout.floatbox, layout.windowbox, layout.maxbox].forEach((box) => {
    if (box) visitNode(box);
  });
}

/**
 * Walk every tab in a LayoutBase. The tabs in {@link simpleLayout} are created as `SavedTabInfo`
 * shapes and then narrowed to rc-dock's `TabBase` at the layout boundary; we recover the original
 * shape here so callers can read/write the `data` payload (`projectId`, `state`, `webViewType`).
 *
 * Exported for the test file's reuse — see `simple-layout.builder.test.ts`.
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

/**
 * One tab id per panel — Column 1 (Model Text) and Column 2 (Scripture Editor) each hold exactly
 * one tab, but Column 3 ("Resources & Tools") stacks additional tabs behind the active one, so this
 * takes only that panel's first tab. A smaller, more targeted set than {@link SIMPLE_LAYOUT_TAB_IDS}
 * for callers that only care about tabs the user can actually see: Column 3's other tabs are hidden
 * behind the active one (rc-dock keeps them mounted but `display: none`), so waiting on them before
 * doing something user-visible (like hiding a loading overlay) stalls unnecessarily on hidden
 * WebViews.
 *
 * "First tab" is Column 3's default when no `activeId` is set (matching {@link simpleLayout}'s
 * static definition, which doesn't set one) — but it is not necessarily the tab a project
 * administrator's `platformScripture.sharedLayoutDefaultTab` setting ultimately wants active. That
 * setting is only applied via `focusSharedLayoutDefaultTab`/`SharedLayoutReceiver.applyForProject`
 * in the normal `openScriptureEditor` flow, deliberately as a non-blocking correction _after_ a
 * fast Power → Simple switch's layout has already loaded (see `web-view.service-host.ts`) — reading
 * it synchronously here, before the switch's overlay releases, would introduce a slow network round
 * trip that we want to avoid. A project whose admin-configured default differs from "first tab" may
 * see a brief tab-front change shortly after the switch completes; that's an accepted tradeoff, not
 * a bug in this constant.
 */
export const VISIBLE_SIMPLE_LAYOUT_TAB_IDS: readonly string[] = (() => {
  const ids: string[] = [];
  visitPanels(simpleLayout, (panel) => {
    const firstTabId = panel.tabs[0]?.id;
    if (firstTabId) ids.push(firstTabId);
  });
  return ids;
})();

/**
 * The Scripture Editor tab's own fixed id within {@link simpleLayout} — the one
 * {@link SIMPLE_LAYOUT_TAB_IDS} entry relevant to `web-view.service-host.ts`'s
 * `simpleEditorTabIds`/`cacheLastOpenedSimpleProject` tracking (Column 1's Model Text and Column
 * 3's tabs aren't candidates for "the current Simple-mode project"). Derived from
 * {@link simpleLayout} the same way as {@link SIMPLE_LAYOUT_TAB_IDS} so it cannot drift.
 */
export const SIMPLE_LAYOUT_EDITOR_TAB_ID: string = (() => {
  let editorTabId: string | undefined;
  visitTabs(simpleLayout, (tab) => {
    if (
      tab.data &&
      isObjectRecord(tab.data) &&
      tab.data.webViewType === SCRIPTURE_EDITOR_WEBVIEW_TYPE
    )
      editorTabId = tab.id;
  });
  if (!editorTabId) throw new Error('simpleLayout has no Scripture Editor tab');
  return editorTabId;
})();

/** Narrows a tab's `data`/`state` payload (typed `unknown` on `TabBase`) to a writable record. */
function isObjectRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Builds a clone of the static {@link simpleLayout} with `projectId` baked into each tab's saved
 * web-view definition. When the dock layout restores from this, each web-view provider's
 * `getWebView` receives the `projectId` via `savedWebView.projectId` and renders the real project
 * content immediately — no empty-placeholder mount followed by a `reloadWebView` round-trip. This
 * is the simple-mode equivalent of how power mode restores its persisted layout: state baked in, no
 * follow-up commands required.
 *
 * If the caller can't resolve a project (cold start, no recents), load the bare `simpleLayout`
 * instead — the default-project picker in `platform-scripture-editor` will still fill the empty
 * Scripture Editor placeholder after the layout swap (the slower path, but a valid fallback).
 */
export function buildSimpleLayoutForProject(projectId: string): LayoutBase {
  const cloned = deepClone(simpleLayout);
  visitTabs(cloned, (tab) => {
    if (!isObjectRecord(tab.data)) return;
    tab.data.projectId = projectId;
  });
  return cloned;
}
