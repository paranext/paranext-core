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
 *   Resource Viewer's project. When `isReadOnly` is true, only the scripture editor tab gets
 *   `projectId` - the related panels (model text, bible texts, commentaries, comments) are left
 *   without one, matching `main.ts`'s own gate ("opening a read-only published resource in the
 *   editor column must not switch [the related panels] over to the resource"). This never leaves a
 *   panel showing a _previous_ project's stale content: `loadLayout` rebuilds every tab from
 *   scratch via each provider's `getWebView` on every call, even for a tab id that was already
 *   mounted (rc-dock's `loadLayout` has no per-tab-id diff/short-circuit). Model text/Bible
 *   texts/commentaries each render an explicit "no project" placeholder when `projectId` is absent;
 *   the comment list panel (`legacyCommentManager.commentListPanel`) has no such placeholder today
 *   and shows a perpetual loading state instead - a known gap in that extension's panel, not
 *   something this function can fix.
 */
export function buildSimpleLayoutForProject(projectId: string, isReadOnly: boolean): LayoutBase {
  const cloned = cloneDeep(simpleLayout);
  visitTabs(cloned, (tab) => {
    if (!isObjectRecord(tab.data)) return;
    const isScriptureEditorTab = tab.data.webViewType === SCRIPTURE_EDITOR_WEB_VIEW_TYPE;
    if (isScriptureEditorTab || !isReadOnly) tab.data.projectId = projectId;
    // The scripture editor's factory reads `state.isReadOnly` when restoring from saved state. Set
    // it explicitly so the restore matches what the editable open-flow would produce.
    if (isScriptureEditorTab) {
      const previousState = isObjectRecord(tab.data.state) ? tab.data.state : {};
      tab.data.state = { ...previousState, isReadOnly };
    }
  });
  return cloned;
}
