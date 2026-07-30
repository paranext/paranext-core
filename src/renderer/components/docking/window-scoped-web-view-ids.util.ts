import { SavedTabInfo, TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';
import type { LayoutInfo } from '@shared/models/docking-framework.model';
import cloneDeep from 'lodash/cloneDeep';
import { LayoutBase } from 'rc-dock';

/** An rc-dock box: holds tabs, further boxes, or both */
type LayoutBox = { children?: unknown[]; tabs?: SavedTabInfo[] };

/** Matches the window suffix this module appends, so re-scoping replaces rather than stacks */
const WINDOW_SUFFIX_PATTERN = /-w\d+$/;

/**
 * Rewrite one tab's web view id — and the copy of that id inside its saved data — to be unique to
 * this window. Mutates the tab it is given, so callers own the cloning.
 */
function scopeWebViewIdInTab(tab: SavedTabInfo): void {
  if (tab.tabType !== TAB_TYPE_WEBVIEW || !tab.id) return;
  const scopedId = `${tab.id.replace(WINDOW_SUFFIX_PATTERN, '')}-w${globalThis.windowId}`;
  tab.id = scopedId;
  // The web view's own id is repeated inside the tab's saved data; both must agree
  if (tab.data && typeof tab.data === 'object' && 'id' in tab.data) tab.data.id = scopedId;
}

/**
 * Give every web view in a layout an id unique to this window.
 *
 * A web view id has to identify exactly one web view — it is what `postMessageToWebView` addresses
 * and what web view state is keyed on — so two windows holding web views with the same id means the
 * second window's `webViewMessage:{id}` registration collides with the first window's and its
 * messages become unroutable.
 *
 * Two ways windows end up sharing ids, so apply this to every layout being loaded rather than only
 * the obvious one:
 *
 * - `simpleLayout` and `testLayout` are module constants with ids baked in, so every window loading
 *   one starts from the same ids
 * - A layout saved before multi-window support lives under an unprefixed storage key that
 *   `localWindowStorage` migrates per window WITHOUT deleting (window ids are not stable across
 *   restarts), so two windows can each migrate the same legacy blob and get the same ids
 *
 * Re-scoping an already-scoped id replaces the suffix instead of stacking another one, which is
 * what makes it safe to run on every load — including a layout this window saved earlier.
 *
 * Deep-clones rather than mutating, since callers may hand us a module constant every window reads.
 *
 * @param layout Layout whose web view ids should be scoped to this window
 * @returns A copy of `layout` with every web view id suffixed with this window's id
 */
export default function withWindowScopedWebViewIds(layout: LayoutInfo): LayoutInfo {
  // LayoutInfo is intentionally opaque in the shared model; cross to the concrete rc-dock shape to
  // walk it, mirroring the boundary crossing in platform-dock-layout.component.tsx
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const layoutBase = cloneDeep(layout) as unknown as LayoutBase;

  const scopeTabsIn = (box: LayoutBox): void => {
    box.tabs?.forEach(scopeWebViewIdInTab);
    // rc-dock boxes nest arbitrarily deep, so recurse rather than assuming a shape
    box.children?.forEach((child) => {
      // rc-dock types `children` as a union of box and panel shapes that does not narrow usefully
      // here; the guard above is the real check, and `LayoutBox` only reads the two optional
      // properties every one of those shapes may carry
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      if (child && typeof child === 'object') scopeTabsIn(child as LayoutBox);
    });
  };

  if (layoutBase.dockbox) scopeTabsIn(layoutBase.dockbox);
  if (layoutBase.floatbox) scopeTabsIn(layoutBase.floatbox);
  if (layoutBase.windowbox) scopeTabsIn(layoutBase.windowbox);
  if (layoutBase.maxbox) scopeTabsIn(layoutBase.maxbox);

  // Cross back to the opaque LayoutInfo the dock layout API expects, the same boundary the clone
  // above crossed in the other direction
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return layoutBase as unknown as LayoutInfo;
}

/**
 * Give one loose tab a web view id unique to this window, for tabs that are merged into a layout
 * separately from the layout itself — the default layout supplement's tabs, which come from a
 * build-baked file with fixed ids and so would otherwise be identical in every window.
 *
 * Scope such a tab BEFORE merging it into an already-scoped layout, not after: the merge dedups by
 * exact tab id, so an unscoped tab id never matches the scoped copy already in the layout and the
 * tab gets appended a second time on every load.
 *
 * Follows {@link withWindowScopedWebViewIds} in every other respect: the suffix is replaced rather
 * than stacked when the tab is already scoped, non-web-view tabs are left alone, and the input is
 * cloned rather than mutated (supplement tabs come from an imported module that every load reads).
 *
 * @param tab Tab whose web view id should be scoped to this window
 * @returns A copy of `tab` with its web view id suffixed with this window's id
 */
export function withWindowScopedWebViewIdInTab(tab: SavedTabInfo): SavedTabInfo {
  const scopedTab = cloneDeep(tab);
  scopeWebViewIdInTab(scopedTab);
  return scopedTab;
}
