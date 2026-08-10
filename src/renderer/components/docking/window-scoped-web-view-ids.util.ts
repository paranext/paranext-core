import { SavedTabInfo, TAB_TYPE_WEBVIEW } from '@shared/models/docking-framework.model';
import type { LayoutInfo } from '@shared/models/docking-framework.model';

/**
 * An rc-dock box or panel: a box holds further boxes and panels, a panel holds tabs and remembers
 * which one of them is active
 */
type LayoutBox = { children?: unknown[]; tabs?: SavedTabInfo[]; activeId?: string };

/** The boxes an rc-dock layout can hold tabs in */
type LayoutBoxes = {
  dockbox?: LayoutBox;
  floatbox?: LayoutBox;
  windowbox?: LayoutBox;
  maxbox?: LayoutBox;
};

/** Matches the window suffix this module appends, so re-scoping replaces rather than stacks */
const WINDOW_SUFFIX_PATTERN = /-w\d+$/;

/**
 * Remove the window suffix {@link withWindowScopedWebViewIds} appends, giving back the id the web
 * view was minted with.
 *
 * Web view state is stored under this unscoped id. `localWindowStorage` already keeps each window's
 * storage under its own key prefix, so the suffix would buy nothing there — and since ids are
 * minted unscoped and only pick up a suffix when a layout is loaded, storing state under the scoped
 * id would file a web view's state under one key while it was open and look for it under another
 * after a restart.
 *
 * @param webViewId Web view id, window-scoped or not
 * @returns `webViewId` without a window suffix
 */
export function stripWindowScopeFromWebViewId(webViewId: string): string {
  return webViewId.replace(WINDOW_SUFFIX_PATTERN, '');
}

/**
 * Give one tab a web view id unique to this window — the per-tab half of
 * {@link withWindowScopedWebViewIds}, and what to call directly for a tab that is merged into a
 * layout separately from the layout itself: the default layout supplement's tabs come from a
 * build-baked file with fixed ids and so would otherwise be identical in every window.
 *
 * Scope such a tab BEFORE merging it into an already-scoped layout, not after: the merge dedups by
 * exact tab id, so an unscoped tab id never matches the scoped copy already in the layout and the
 * tab gets appended a second time on every load.
 *
 * The suffix is replaced rather than stacked when the tab is already scoped, non-web-view tabs keep
 * their ids, and the tab is copied rather than mutated (supplement tabs come from an imported
 * module that every load reads).
 *
 * @param tab Tab whose web view id should be scoped to this window
 * @returns A copy of `tab` with its web view id suffixed with this window's id
 */
export function withWindowScopedWebViewIdInTab(tab: SavedTabInfo): SavedTabInfo {
  if (tab.tabType !== TAB_TYPE_WEBVIEW || !tab.id) return { ...tab };
  const scopedId = `${stripWindowScopeFromWebViewId(tab.id)}-w${globalThis.windowId}`;
  // The web view's own id is repeated inside the tab's saved data; both must agree
  const data =
    tab.data && typeof tab.data === 'object' && 'id' in tab.data
      ? { ...tab.data, id: scopedId }
      : tab.data;
  return { ...tab, id: scopedId, data };
}

/**
 * Copy one box (or panel), scoping the web view ids of the tabs it holds and recursing into the
 * boxes and panels below it.
 *
 * @param box Box or panel to scope the web view ids in
 * @returns A copy of `box` holding scoped copies of everything below it
 */
function withWindowScopedWebViewIdsInBox(box: LayoutBox): LayoutBox {
  const scopedBox: LayoutBox = { ...box };

  if (box.tabs) {
    // A panel remembers its active tab by id, so track what each id became: rc-dock silently falls
    // back to the leftmost tab when `activeId` matches none of the panel's tabs, which would land
    // the user on a different tab than the one they left open
    const scopedIdsByOriginalId = new Map<string, string>();
    scopedBox.tabs = box.tabs.map((tab) => {
      const scopedTab = withWindowScopedWebViewIdInTab(tab);
      if (tab.id && scopedTab.id !== tab.id) scopedIdsByOriginalId.set(tab.id, scopedTab.id);
      return scopedTab;
    });
    if (box.activeId) scopedBox.activeId = scopedIdsByOriginalId.get(box.activeId) ?? box.activeId;
  }

  // rc-dock boxes nest arbitrarily deep, so recurse rather than assuming a shape
  if (box.children)
    scopedBox.children = box.children.map((child) => {
      if (!child || typeof child !== 'object') return child;
      // rc-dock types `children` as a union of box and panel shapes that does not narrow usefully
      // here; the guard above is the real check, and `LayoutBox` only reads the properties every one
      // of those shapes may carry
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return withWindowScopedWebViewIdsInBox(child as LayoutBox);
    });

  return scopedBox;
}

/**
 * Give every web view in a layout an id unique to this window.
 *
 * A web view id has to identify exactly one web view — it is what `postMessageToWebView` addresses
 * — so two windows holding web views with the same id means the second window's
 * `webViewMessage:{id}` registration collides with the first window's and its messages become
 * unroutable.
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
 * Builds a new layout rather than mutating, since callers may hand us a module constant every
 * window reads. Every box, panel, and tab in the result is a fresh object; the values nested inside
 * a tab's saved data (a web view's `state`, for instance) are shared with the input rather than
 * copied, which everything downstream of a load treats as read-only.
 *
 * @param layout Layout whose web view ids should be scoped to this window
 * @returns A copy of `layout` with every web view id suffixed with this window's id
 */
export default function withWindowScopedWebViewIds(layout: LayoutInfo): LayoutInfo {
  // LayoutInfo is intentionally opaque in the shared model; cross to the concrete rc-dock shape to
  // walk it, mirroring the boundary crossing in platform-dock-layout.component.tsx
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const layoutBoxes = layout as unknown as LayoutBoxes;
  const scopedLayout: LayoutBoxes = { ...layoutBoxes };

  if (layoutBoxes.dockbox)
    scopedLayout.dockbox = withWindowScopedWebViewIdsInBox(layoutBoxes.dockbox);
  if (layoutBoxes.floatbox)
    scopedLayout.floatbox = withWindowScopedWebViewIdsInBox(layoutBoxes.floatbox);
  if (layoutBoxes.windowbox)
    scopedLayout.windowbox = withWindowScopedWebViewIdsInBox(layoutBoxes.windowbox);
  if (layoutBoxes.maxbox) scopedLayout.maxbox = withWindowScopedWebViewIdsInBox(layoutBoxes.maxbox);

  // Cross back to the opaque LayoutInfo the dock layout API expects, the same boundary the walk
  // above crossed in the other direction
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return scopedLayout as unknown as LayoutInfo;
}
