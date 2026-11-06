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
 * Reconcile one node of a saved layout: keep only tabs with usable, not-yet-seen ids, re-point an
 * `activeId` left naming a dropped tab, recurse into child boxes, and report an emptied (or
 * never-valid) node as `undefined` so the parent drops it.
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
  const keptTabs = tabs
    ? tabs.filter((tab) => {
        const tabId = getTabId(tab);
        if (!tabId || seenTabIds.has(tabId)) return false;
        seenTabIds.add(tabId);
        return true;
      })
    : [];
  if (tabs) {
    keptCount += keptTabs.length;
    result.tabs = keptTabs;
  }
  // A panel remembers its active tab by id, so dropping that tab leaves the id pointing at nothing.
  // rc-dock silently falls back to the leftmost tab when `activeId` matches none of a panel's tabs,
  // so name that tab outright rather than persisting a dangling reference. Checked on every node,
  // not just panels: no producer writes an `activeId` onto a tab-less box, but the input here is
  // arbitrary JSON off disk, and a reference to a tab the node does not have is what this pass
  // exists to remove.
  const { activeId } = node;
  if (typeof activeId === 'string' && !keptTabs.some((tab) => getTabId(tab) === activeId)) {
    const firstKeptTabId = keptTabs.length > 0 ? getTabId(keptTabs[0]) : undefined;
    if (firstKeptTabId !== undefined) result.activeId = firstKeptTabId;
    else delete result.activeId;
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
 * The root boxes that never show a box among their children as the tabs it holds: `FloatBox` and
 * `WindowBox` draw only the children that are tab groups, and `MaxBox` draws only its first child,
 * and draws it as a tab group. A box among their children (and every tab inside it) is therefore
 * never shown
 */
const TAB_GROUP_ONLY_ROOT_BOX_KEYS = ['floatbox', 'windowbox', 'maxbox'] as const;

/** Position fields a tab group uses only while it floats or sits in its own window */
const FLOATING_POSITION_KEYS = ['x', 'y', 'z', 'w', 'h'] as const;

/**
 * The weights rc-dock gives a dock box laid out other than left to right, and the tab group it
 * docks at that box's left or right edge, when it puts the two side by side in a new horizontal
 * dock box (`dockPanelToBox`): 70% and 30%
 */
const EDGE_SPLIT_DOCK_BOX_SIZE = 280;
const EDGE_SPLIT_MOVED_SIZE = 120;

/**
 * The size rc-dock gives a box or tab group whose saved `size` is not a number of at least 0
 * (`fixPanelOrBox`). This mirrors rc-dock's default, so a sibling with no usable size counts for
 * what rc-dock will lay it out at.
 */
const RC_DOCK_DEFAULT_SIZE = 200;

/** The size rc-dock lays a saved box or tab group out at: its own if it is usable, else the default */
function getEffectiveSize(value: unknown): number {
  const size = asLayoutNode(value)?.size;
  return typeof size === 'number' && size >= 0 ? size : RC_DOCK_DEFAULT_SIZE;
}

/**
 * An id no box or tab group in `layout` has, which rc-dock will not give to another node either.
 * rc-dock gives ids `+1`, `+2`, … from a counter that it raises past every `+<number>` id it loads,
 * but it hands them out while it walks the layout, so a box loaded without an id can be given a
 * number a node further on already has. One past the highest such id in the layout avoids both.
 *
 * @param layout The saved layout the new box goes into
 * @returns The id for the new box
 */
function getUnusedRcDockId(layout: LayoutInfo): string {
  let highestIdNumber = 0;
  const visit = (value: unknown): void => {
    const node = asLayoutNode(value);
    if (!node) return;
    if (typeof node.id === 'string' && node.id.startsWith('+')) {
      const idNumber = Number(node.id);
      if (Number.isFinite(idNumber) && idNumber > highestIdNumber) highestIdNumber = idNumber;
    }
    if (Array.isArray(node.children)) node.children.forEach(visit);
  };
  ROOT_BOX_KEYS.forEach((key) => visit(layout[key]));
  return `+${highestIdNumber + 1}`;
}

/** Whether a node is a box (it has `children`) rather than a tab group (it has `tabs`) */
function isBoxNode(value: unknown): boolean {
  const node = asLayoutNode(value);
  return !!node && !Array.isArray(node.tabs) && Array.isArray(node.children);
}

/**
 * Every tab group inside a node, at any depth and in layout order, each copied without the position
 * fields it would use only while floating
 */
function collectTabGroups(value: unknown): LayoutNode[] {
  const node = asLayoutNode(value);
  if (!node) return [];
  if (Array.isArray(node.tabs)) {
    const tabGroup: LayoutNode = { ...node };
    FLOATING_POSITION_KEYS.forEach((key) => delete tabGroup[key]);
    return [tabGroup];
  }
  return Array.isArray(node.children)
    ? node.children.flatMap((child) => collectTabGroups(child))
    : [];
}

/**
 * Returns a shallow copy of a saved layout in which every tab group rc-dock would never draw (any
 * inside a box among the children of `floatbox`, `windowbox` or `maxbox`) has been moved into
 * `dockbox` as a tab group of its own at its end (right) edge, so the tabs in it can be reached
 * again. The emptied boxes are removed from those root boxes. A `dockbox` laid out other than
 * `horizontal` is placed beside the moved tab groups in a new horizontal `dockbox`, at 70% to their
 * 30% as rc-dock itself sizes a tab group docked at the edge of a vertical dock box; the new
 * `dockbox` gets an id no other node in the layout has (see {@link getUnusedRcDockId}). In a
 * `horizontal` `dockbox`, the moved tab groups each get the average size of the nodes already
 * there, so every group ends up with an equal share. The input is never mutated.
 */
function moveHiddenTabGroupsIntoDockbox(layout: LayoutInfo): LayoutInfo {
  const result: LayoutInfo = { ...layout };
  const movedTabGroups: LayoutNode[] = [];
  TAB_GROUP_ONLY_ROOT_BOX_KEYS.forEach((key) => {
    const rootBox = asLayoutNode(result[key]);
    if (!rootBox || !Array.isArray(rootBox.children) || !rootBox.children.some(isBoxNode)) return;
    const keptChildren: unknown[] = [];
    rootBox.children.forEach((child) => {
      if (isBoxNode(child)) movedTabGroups.push(...collectTabGroups(child));
      else keptChildren.push(child);
    });
    result[key] = { ...rootBox, children: keptChildren };
  });
  if (movedTabGroups.length === 0) return result;

  const dockbox = asLayoutNode(result.dockbox);
  if (dockbox?.mode === 'horizontal' && Array.isArray(dockbox.children)) {
    const existingSizes = dockbox.children.map(getEffectiveSize);
    const averageSize =
      existingSizes.length > 0
        ? existingSizes.reduce((sum, size) => sum + size, 0) / existingSizes.length
        : undefined;
    result.dockbox = {
      ...dockbox,
      children: [
        ...dockbox.children,
        ...movedTabGroups.map((tabGroup) =>
          averageSize === undefined ? tabGroup : { ...tabGroup, size: averageSize },
        ),
      ],
    };
  } else {
    result.dockbox = {
      id: getUnusedRcDockId(layout),
      mode: 'horizontal',
      children: dockbox
        ? [
            { ...dockbox, size: EDGE_SPLIT_DOCK_BOX_SIZE },
            ...movedTabGroups.map((tabGroup) => ({
              ...tabGroup,
              size: EDGE_SPLIT_MOVED_SIZE / movedTabGroups.length,
            })),
          ]
        : movedTabGroups,
    };
  }
  return result;
}

/**
 * Returns a copy of a saved layout with phantom content removed, and with content rc-dock would
 * never draw moved to where it is drawn.
 *
 * First, every tab group inside a box nested in `floatbox`, `windowbox` or `maxbox` (`floatbox` and
 * `windowbox` draw only the children that are tab groups; `maxbox` draws only its first child, as a
 * tab group) is moved into `dockbox` as a tab group of its own at its right edge, without its
 * floating position. Then duplicate tab ids are removed (the first occurrence wins, walking
 * `dockbox` before the floating/maximized/windowed boxes so a duplicate resolves in favor of the
 * docked copy), along with tabs with no usable id, tabs not reachable through a panel, and panels
 * or boxes left empty by those removals. An emptied `dockbox` is kept (a layout must have one); the
 * other root boxes are removed entirely when emptied. A panel whose `activeId` named one of the
 * removed tabs is re-pointed at its first surviving tab, so no saved layout carries an active-tab
 * reference to a tab that is no longer in it.
 *
 * A layout with none of those problems round-trips unchanged. The input is never mutated.
 */
export function reconcileSavedLayout(layout: LayoutInfo): LayoutInfo {
  const result = moveHiddenTabGroupsIntoDockbox(layout);
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
