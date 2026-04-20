import { deserialize, getErrorMessage } from 'platform-bible-utils';
import { LayoutBase, BoxBase, PanelBase, TabBase } from 'rc-dock';
import { logger } from '@shared/services/logger.service';
import { viewZoomService } from './view-zoom.service';

/**
 * LocalStorage key where the dock layout is persisted. Must match the value in
 * `web-view.service-host.ts` (`DOCK_LAYOUT_KEY`).
 */
const DOCK_LAYOUT_KEY = 'dock-saved-layout';

function isPanelBase(node: BoxBase | PanelBase): node is PanelBase {
  // `PanelBase` has a `tabs: TabBase[]` field; `BoxBase` does not. Read via `Reflect.get` to
  // inspect the unknown property without a type assertion.
  return Array.isArray(Reflect.get(node, 'tabs'));
}

function collectTabIdsFromBox(box: BoxBase | undefined, out: Set<string>): void {
  if (!box || !Array.isArray(box.children)) return;
  box.children.forEach((child) => {
    if (isPanelBase(child)) {
      child.tabs.forEach((tab: TabBase) => {
        if (typeof tab.id === 'string' && tab.id.length > 0) out.add(tab.id);
      });
    } else {
      collectTabIdsFromBox(child, out);
    }
  });
}

/**
 * Extract the set of tab ids from a persisted rc-dock `LayoutBase`. Walks all boxes (dockbox,
 * floatbox, windowbox, maxbox).
 */
export function collectTabIdsFromLayout(layout: LayoutBase | object | undefined): Set<string> {
  const ids = new Set<string>();
  if (!layout) return ids;
  // Read each box defensively — input may be an arbitrary parsed object, not guaranteed to
  // conform to `LayoutBase`.
  const l: { dockbox?: BoxBase; floatbox?: BoxBase; windowbox?: BoxBase; maxbox?: BoxBase } =
    layout;
  collectTabIdsFromBox(l.dockbox, ids);
  collectTabIdsFromBox(l.floatbox, ids);
  collectTabIdsFromBox(l.windowbox, ids);
  collectTabIdsFromBox(l.maxbox, ids);
  return ids;
}

/**
 * Read the persisted dock layout from localStorage and return the set of saved tab ids, or
 * `undefined` if no layout is persisted or it can't be parsed. Returning `undefined` signals the
 * caller that it should NOT prune (avoid wiping entries on first-run before a layout has been
 * saved).
 */
export function getSavedTabIdsFromStorage(): Set<string> | undefined {
  try {
    const saved = localStorage.getItem(DOCK_LAYOUT_KEY);
    if (!saved) return undefined;
    const parsed: unknown = deserialize(saved);
    if (!parsed || typeof parsed !== 'object') return undefined;
    // `deserialize` returns `unknown`; narrow to the `LayoutBase` fields we access. The helper
    // reads each box defensively, so an unexpected shape yields an empty id set rather than a
    // crash.
    return collectTabIdsFromLayout(parsed);
  } catch (e) {
    logger.warn(`view-zoom.bootstrap: failed to read persisted dock layout: ${getErrorMessage(e)}`);
    return undefined;
  }
}

/**
 * Prune per-instance zoom entries whose tab id is not present in the persisted dock layout.
 *
 * Per-type entries and `type:__default` entries are never pruned (handled by
 * `viewZoomService.prune`). If no persisted layout is available, pruning is skipped.
 */
export async function pruneStaleZoomEntries(): Promise<void> {
  try {
    await viewZoomService.ready;
    const liveIds = getSavedTabIdsFromStorage();
    if (!liveIds) return;
    viewZoomService.prune(liveIds);
  } catch (e) {
    // non-fatal
    logger.warn(`view-zoom.bootstrap: prune failed: ${getErrorMessage(e)}`);
  }
}
