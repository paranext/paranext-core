/**
 * Cleans phantom content out of saved dock layouts before they are persisted or restored.
 *
 * Implemented as a structural walk over the plain saved-layout data (`dockbox` / `floatbox` /
 * `maxbox` / `windowbox`, each holding `children` boxes and `tabs` panels) rather than through
 * rc-dock's types, so the main process can use it on persisted layouts without importing rc-dock.
 */

import type { LayoutInfo } from '@shared/models/docking-framework.model';

/** The rc-dock root boxes a saved layout may carry; only content inside these can ever render */
const ROOT_BOX_KEYS = ['dockbox', 'floatbox', 'maxbox', 'windowbox'] as const;

/** Loose shape of one saved-layout node: a panel (`tabs`), a box (`children`), or both */
type LayoutNode = { tabs?: unknown[]; children?: unknown[] } & Record<string, unknown>;

/** View a value as a {@link LayoutNode} if it is object-shaped at all */
function asLayoutNode(value: unknown): LayoutNode | undefined {
  if (!value || typeof value !== 'object') return undefined;
  // Saved layouts are plain JSON data; crossing from `object` to the indexable node shape only
  // adds optional property reads that are re-checked below (`Array.isArray`)
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return value as LayoutNode;
}

/** A tab's id when the tab could actually render (an object carrying a non-empty string id) */
function getTabId(value: unknown): string | undefined {
  const node = asLayoutNode(value);
  if (!node || typeof node.id !== 'string' || node.id.length === 0) return undefined;
  return node.id;
}

/**
 * Reconcile one node of a saved layout: keep only tabs with usable, not-yet-seen ids, recurse into
 * child boxes, and report an emptied (or never-valid) node as `undefined` so the parent drops it.
 */
function reconcileNode(value: unknown, seenTabIds: Set<string>): LayoutNode | undefined {
  const node = asLayoutNode(value);
  if (!node) return undefined;
  const tabs = Array.isArray(node.tabs) ? node.tabs : undefined;
  const children = Array.isArray(node.children) ? node.children : undefined;
  // Neither a panel nor a box — e.g. a tab that ended up directly in a box's children
  if (!tabs && !children) return undefined;

  const result: LayoutNode = { ...node };
  let keptCount = 0;
  if (tabs) {
    const keptTabs = tabs.filter((tab) => {
      const tabId = getTabId(tab);
      if (!tabId || seenTabIds.has(tabId)) return false;
      seenTabIds.add(tabId);
      return true;
    });
    keptCount += keptTabs.length;
    result.tabs = keptTabs;
  }
  if (children) {
    const keptChildren = children
      .map((child) => reconcileNode(child, seenTabIds))
      .filter((child): child is LayoutNode => child !== undefined);
    keptCount += keptChildren.length;
    result.children = keptChildren;
  }
  return keptCount > 0 ? result : undefined;
}

/** Rebuild a root box that lost all content, preserving its own properties (e.g. `mode`) */
function emptiedBox(value: unknown): LayoutNode {
  const result: LayoutNode = { ...(asLayoutNode(value) ?? {}) };
  delete result.tabs;
  result.children = [];
  return result;
}

/**
 * Returns a copy of a saved layout with phantom content removed: duplicate tab ids (the first
 * occurrence wins, walking `dockbox` before the floating/maximized/windowed boxes so a duplicate
 * resolves in favor of the docked copy), tabs with no usable id, tabs not reachable through a
 * panel, and panels or boxes left empty by those removals. An emptied `dockbox` is kept (a layout
 * must have one); the other root boxes are removed entirely when emptied.
 *
 * A layout with none of those problems round-trips unchanged. The input is never mutated.
 */
export function reconcileSavedLayout(layout: LayoutInfo): LayoutInfo {
  const result: LayoutInfo = { ...layout };
  const seenTabIds = new Set<string>();
  ROOT_BOX_KEYS.forEach((key) => {
    if (!(key in result)) return;
    const reconciled = reconcileNode(result[key], seenTabIds);
    if (reconciled) result[key] = reconciled;
    else if (key === 'dockbox') result[key] = emptiedBox(result[key]);
    else delete result[key];
  });
  return result;
}

/**
 * Whether a saved layout holds, anywhere in its root boxes, at least one tab that `isCountedTab`
 * accepts. The one walker behind both exported has-tabs checks, which differ only in which tabs
 * count.
 */
function layoutHasTabs(layout: LayoutInfo, isCountedTab: (tab: unknown) => boolean): boolean {
  const nodeHasTabs = (value: unknown): boolean => {
    const node = asLayoutNode(value);
    if (!node) return false;
    if (Array.isArray(node.tabs) && node.tabs.some(isCountedTab)) return true;
    if (Array.isArray(node.children)) return node.children.some(nodeHasTabs);
    return false;
  };
  return ROOT_BOX_KEYS.some((key) => nodeHasTabs(layout[key]));
}

/**
 * Whether a saved layout holds at least one tab that could actually render — one with a usable id,
 * reachable through a panel in one of the root boxes. A layout without any is not worth restoring a
 * window for.
 */
export function savedLayoutHasViewableTabs(layout: LayoutInfo): boolean {
  return layoutHasTabs(layout, (tab) => getTabId(tab) !== undefined);
}

/**
 * Whether a saved layout structurally holds any tab at all — viewable or not — in its root boxes.
 *
 * Together with {@link savedLayoutHasViewableTabs} this distinguishes a layout that was saved
 * legitimately empty (no tabs anywhere: a live window that simply had nothing open, and should be
 * restored) from one whose tabs all turn out to be phantoms (tabs present but none viewable: junk
 * that must not resurrect a window).
 */
export function savedLayoutHasAnyTabs(layout: LayoutInfo): boolean {
  return layoutHasTabs(layout, () => true);
}
