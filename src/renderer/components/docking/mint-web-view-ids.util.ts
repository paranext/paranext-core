import { newGuid } from 'platform-bible-utils';
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

/**
 * Maps a baked layout's tab id — the slot identity `simple-layout.data.ts`, the test layout, and
 * `default-layout-supplement.json` declare in the data file — to the fresh id minted for it the one
 * time that slot was materialized into an actual window layout. A slot minted more than once (e.g.
 * `simpleLayout` reloaded on every Simple-mode start) gets a different runtime id each time; this
 * map only ever describes the single materialization that produced it.
 */
export type MintedWebViewIdMap = ReadonlyMap<string, string>;

/**
 * Give one tab a freshly minted web view id, replacing whatever id it carried (a baked constant's
 * fixed id, most commonly). Non-web-view tabs are copied through untouched — only a web view's id
 * has to be unique across the whole application; a settings or other built-in tab's id just has to
 * be unique within its own layout, which the data file already guarantees.
 *
 * @param tab Tab to mint a fresh web view id for
 * @returns A copy of `tab` with a freshly minted id, or an unchanged copy for a non-web-view tab
 */
export function mintFreshWebViewIdInTab(tab: SavedTabInfo): SavedTabInfo {
  if (tab.tabType !== TAB_TYPE_WEBVIEW || !tab.id) return { ...tab };
  const mintedId = newGuid();
  // The web view's own id is repeated inside the tab's saved data; both must agree
  const data =
    tab.data && typeof tab.data === 'object' && 'id' in tab.data
      ? { ...tab.data, id: mintedId }
      : tab.data;
  return { ...tab, id: mintedId, data };
}

/**
 * Copy one box (or panel), minting fresh web view ids for the tabs it holds and recursing into the
 * boxes and panels below it.
 *
 * @param box Box or panel to mint fresh ids in
 * @param mintedIds Map to record each tab's original id against its freshly minted one
 * @returns A copy of `box` holding minted copies of everything below it
 */
function mintFreshWebViewIdsInBox(box: LayoutBox, mintedIds: Map<string, string>): LayoutBox {
  const mintedBox: LayoutBox = { ...box };

  if (box.tabs) {
    // A panel remembers its active tab by id, so track what each id became: rc-dock silently falls
    // back to the leftmost tab when `activeId` matches none of the panel's tabs, which would land
    // the user on a different tab than the one they left open
    const mintedIdsByOriginalId = new Map<string, string>();
    mintedBox.tabs = box.tabs.map((tab) => {
      const mintedTab = mintFreshWebViewIdInTab(tab);
      if (tab.id && mintedTab.id !== tab.id) {
        mintedIdsByOriginalId.set(tab.id, mintedTab.id);
        mintedIds.set(tab.id, mintedTab.id);
      }
      return mintedTab;
    });
    if (box.activeId) mintedBox.activeId = mintedIdsByOriginalId.get(box.activeId) ?? box.activeId;
  }

  // rc-dock boxes nest arbitrarily deep, so recurse rather than assuming a shape
  if (box.children)
    mintedBox.children = box.children.map((child) => {
      if (!child || typeof child !== 'object') return child;
      // rc-dock types `children` as a union of box and panel shapes that does not narrow usefully
      // here; the guard above is the real check, and `LayoutBox` only reads the properties every one
      // of those shapes may carry
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return mintFreshWebViewIdsInBox(child as LayoutBox, mintedIds);
    });

  return mintedBox;
}

/**
 * Mint a fresh id for every web view in a layout materialized from a baked constant, so it starts
 * its life with an id no other web view — in this window or any other — has ever carried. The baked
 * value in the data file stays what it always was: the slot's identity in the data file, not a
 * runtime id. Only call this on a layout being materialized for the first time; a layout already
 * restored from persistence carries the id it was minted with and must not be re-minted (see
 * `loadLayout`'s `isBakedDefault` branch).
 *
 * Builds a new layout rather than mutating, since callers may hand this a module constant every
 * window reads (`simpleLayout`, `testLayout`). Every box, panel, and tab in the result is a fresh
 * object; the values nested inside a tab's saved data (a web view's `state`, for instance) are
 * shared with the input rather than copied, which everything downstream of a load treats as
 * read-only.
 *
 * @param layout Layout whose web view ids should be freshly minted
 * @returns A copy of `layout` with every web view id freshly minted, and the map from each tab's
 *   original id to its minted one
 */
export default function mintFreshWebViewIds(layout: LayoutInfo): {
  layout: LayoutInfo;
  mintedIds: MintedWebViewIdMap;
} {
  // LayoutInfo is intentionally opaque in the shared model; cross to the concrete rc-dock shape to
  // walk it, mirroring the boundary crossing in platform-dock-layout.component.tsx
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const layoutBoxes = layout as unknown as LayoutBoxes;
  const mintedIds = new Map<string, string>();
  const mintedLayout: LayoutBoxes = { ...layoutBoxes };

  if (layoutBoxes.dockbox)
    mintedLayout.dockbox = mintFreshWebViewIdsInBox(layoutBoxes.dockbox, mintedIds);
  if (layoutBoxes.floatbox)
    mintedLayout.floatbox = mintFreshWebViewIdsInBox(layoutBoxes.floatbox, mintedIds);
  if (layoutBoxes.windowbox)
    mintedLayout.windowbox = mintFreshWebViewIdsInBox(layoutBoxes.windowbox, mintedIds);
  if (layoutBoxes.maxbox)
    mintedLayout.maxbox = mintFreshWebViewIdsInBox(layoutBoxes.maxbox, mintedIds);

  // Cross back to the opaque LayoutInfo the dock layout API expects, the same boundary the walk
  // above crossed in the other direction
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return { layout: mintedLayout as unknown as LayoutInfo, mintedIds };
}
