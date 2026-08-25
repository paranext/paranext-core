import type { OverlayContextMenuItem } from '@renderer/components/overlays/overlay-context-menu.component';
import type { WindowSummary } from '@shared/services/window.service-model';

/** Contributed id of the submenu whose targets are only known when the menu opens */
export const MOVE_TO_WINDOW_ITEM_ID = 'platform.moveTabToWindow';

/** Contributed command that floats the tab within its own window */
export const FLOAT_TAB_COMMAND = 'platform.floatTab';

/** Contributed command that moves the tab into a window created for it */
export const MOVE_TO_NEW_WINDOW_COMMAND = 'platform.moveWebViewToNewWindow';

/**
 * Marks a generated target in the move-to-window submenu. What follows is the target window's id,
 * which is how the selection handler learns where the user asked the tab to go.
 */
export const MOVE_TO_WINDOW_TARGET_ID_PREFIX = 'platform.moveTabToWindow:';

/** What the tab a menu was opened on can currently do */
export type TabMenuContext = {
  /** Web view this tab hosts, or `undefined` when it hosts none — a dialog or an error tab */
  webViewId: string | undefined;
  /** Every window except the one this tab is in, in the order to offer them */
  otherWindows: WindowSummary[];
  /**
   * Whether this tab is the only one in a window that does not hold the primary role. Moving it to
   * a new window would then build an identical window and empty the one it is in.
   */
  isOnlyTabInSecondaryWindow: boolean;
};

/** Reads the target window id back out of a generated submenu entry, if that is what was selected */
export function getMoveTargetWindowId(itemId: string): number | undefined {
  if (!itemId.startsWith(MOVE_TO_WINDOW_TARGET_ID_PREFIX)) return undefined;
  const windowId = Number(itemId.slice(MOVE_TO_WINDOW_TARGET_ID_PREFIX.length));
  return Number.isNaN(windowId) ? undefined : windowId;
}

/** Whether a contributed item is one this tab cannot currently act on */
function isUnavailable(item: OverlayContextMenuItem, context: TabMenuContext): boolean {
  const { webViewId, otherWindows, isOnlyTabInSecondaryWindow } = context;
  if (item.type === 'item' && item.id === MOVE_TO_NEW_WINDOW_COMMAND)
    return !webViewId || isOnlyTabInSecondaryWindow;
  if (item.type === 'submenu' && item.id === MOVE_TO_WINDOW_ITEM_ID)
    return !webViewId || otherWindows.length === 0;
  return false;
}

/** Drop separators that no longer divide anything once items around them have gone */
function pruneSeparators(items: OverlayContextMenuItem[]): OverlayContextMenuItem[] {
  return items.filter((item, index) => {
    if (item.type !== 'separator') return true;
    const dividesSomethingBefore = items
      .slice(0, index)
      .some((other) => other.type !== 'separator');
    const dividesSomethingAfter = items
      .slice(index + 1)
      .some((other) => other.type !== 'separator');
    const isRepeat = index > 0 && items[index - 1].type === 'separator';
    return dividesSomethingBefore && dividesSomethingAfter && !isRepeat;
  });
}

/**
 * Turn the contributed tab menu into the items to show on one particular tab.
 *
 * Two things no contribution can express are settled here: whether an action applies to this tab at
 * all, and what the open windows are. Both are facts about the moment the menu opens.
 *
 * @param contributedItems The tab menu as contributed, already converted and ordered
 * @param context What the tab can currently do
 * @param emptyWindowLabel What to call a window showing nothing titled
 * @returns The items to render, with unavailable actions removed and window targets filled in
 */
export function buildTabMenuItems(
  contributedItems: OverlayContextMenuItem[],
  context: TabMenuContext,
  emptyWindowLabel: string,
): OverlayContextMenuItem[] {
  const available = contributedItems.filter((item) => !isUnavailable(item, context));

  const withTargets = available.map((item) => {
    if (item.type !== 'submenu' || item.id !== MOVE_TO_WINDOW_ITEM_ID) return item;
    return {
      ...item,
      items: context.otherWindows.map((window) => ({
        type: 'item' as const,
        id: `${MOVE_TO_WINDOW_TARGET_ID_PREFIX}${window.windowId}`,
        // Two windows showing the same thing carry the same name, and nothing disambiguates them
        label: window.label || emptyWindowLabel,
      })),
    };
  });

  return pruneSeparators(withTargets);
}
