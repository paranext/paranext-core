import { getErrorMessage, isLocalizeKey, LocalizeKey } from 'platform-bible-utils';
import { localizationService } from '@shared/services/localization.service';
import { logger } from '@shared/services/logger.service';

/** What a window is called when it holds no docked tab carrying a title */
export const EMPTY_WINDOW_LABEL_KEY: LocalizeKey = '%window_label_empty%';

/**
 * The parts of a dock panel this reads. Kept structural rather than typed as rc-dock's `PanelData`
 * so a saved layout, a live layout, or a test fixture all satisfy it.
 */
type PanelLike = {
  tabs?: { id?: string }[];
  activeId?: string;
};

/**
 * The parts of a dock layout this reads, in the order they are read.
 *
 * `maxbox` comes first because a maximized panel is moved out of `dockbox` and replaced there by an
 * empty placeholder, so a window whose only panel is maximized would otherwise look empty while
 * showing content.
 *
 * `floatbox` is deliberately absent. In-app float panels are transient and often modal, so letting
 * one name the window would retitle it to "About" for as long as the About dialog is open and
 * rename it back on dismissal.
 */
type LayoutLike = {
  maxbox?: { children?: unknown[] };
  dockbox?: { children?: unknown[] };
};

/** Whether a layout node is something with properties to read, as opposed to a leaf or absent */
function isRecord(node: unknown): node is Record<string, unknown> {
  return typeof node === 'object' && !!node;
}

/** Whether a layout node is a panel holding tabs, as opposed to a box holding more nodes */
function isPanel(node: unknown): node is PanelLike {
  return isRecord(node) && Array.isArray(node.tabs);
}

/** Every docked panel, depth first, in the order the layout declares them */
function collectPanels(node: unknown): PanelLike[] {
  if (!isRecord(node)) return [];
  // Not an either/or: a well-formed node holds tabs or children, but a corrupted or hand-edited
  // saved layout can carry both, and returning at the panel branch would drop everything nested
  // under such a node. `visitPanels` in simple-layout.builder.ts guards the mirror image of this
  // for the same reason, and a persisted layout reaches here through `loadLayout` unexamined.
  const panels = isPanel(node) ? [node] : [];
  const { children } = node;
  if (!Array.isArray(children)) return panels;
  return [...panels, ...children.flatMap(collectPanels)];
}

/** A panel's tab ids with its active tab first, since that is the one the user is looking at */
function orderTabIds(panel: PanelLike): string[] {
  const tabIds = (panel.tabs ?? []).map((tab) => tab.id).filter((id): id is string => !!id);
  if (!panel.activeId || !tabIds.includes(panel.activeId)) return tabIds;
  return [panel.activeId, ...tabIds.filter((id) => id !== panel.activeId)];
}

/**
 * What to call a window: the first docked panel's active tab title, then the next tab carrying a
 * title, then one string for a window showing nothing titled.
 *
 * Collisions are tolerated on purpose. Two windows showing the same tab produce the same name, and
 * the cost of picking the wrong one is a tab in the wrong window and one more move to put it back.
 * The alternatives are worse: an ordinal means nothing to the user and renumbers when a window
 * closes, and a monitor name is blank on most Linux and Windows displays and changes when the user
 * drags the window.
 *
 * @param layout The window's dock layout
 * @param findTab Looks a tab up by id, as the live dock layout does
 * @returns The window's name, which may be a {@link LocalizeKey} needing localization
 */
export function getWindowLabel(
  layout: LayoutLike,
  findTab: (tabId: string) => { tabTitle?: string | LocalizeKey } | undefined,
): string | LocalizeKey {
  const panels = [...collectPanels(layout.maxbox), ...collectPanels(layout.dockbox)];
  for (let panelIndex = 0; panelIndex < panels.length; panelIndex++) {
    const tabIds = orderTabIds(panels[panelIndex]);
    for (let tabIndex = 0; tabIndex < tabIds.length; tabIndex++) {
      const tabTitle = findTab(tabIds[tabIndex])?.tabTitle;
      if (tabTitle) return tabTitle;
    }
  }
  return EMPTY_WINDOW_LABEL_KEY;
}

/**
 * The label this window most recently asked to show. Localizing is asynchronous, so a burst of
 * layout changes can resolve out of order; only the newest request may win.
 */
let latestRequestedLabel: string | LocalizeKey | undefined;

/**
 * Publish what this window is called as its page title.
 *
 * The page title is the whole mechanism: Electron's `page-title-updated` carries it to the native
 * window title, which is what the OS switcher shows and what other windows read when they offer
 * this one as a target. A title set from the main process does not stick — at construction it lasts
 * only until the renderer publishes its first page title, and at runtime it lasts only until the
 * renderer's next page-title change — so the main process cannot hold a name against the renderer's
 * own naming.
 *
 * @param layout The window's dock layout
 * @param findTab Looks a tab up by id, as the live dock layout does
 */
export async function updateWindowTitle(
  layout: LayoutLike,
  findTab: (tabId: string) => { tabTitle?: string | LocalizeKey } | undefined,
): Promise<void> {
  const label = getWindowLabel(layout, findTab);
  latestRequestedLabel = label;

  if (!isLocalizeKey(label)) {
    document.title = label;
    return;
  }

  try {
    const localizedLabel = await localizationService.getLocalizedString({ localizeKey: label });
    if (latestRequestedLabel === label) document.title = localizedLabel;
  } catch (error) {
    // Keep whatever title the window already shows; a stale name is better than an empty one
    logger.warn(`Could not localize this window's title from ${label}: ${getErrorMessage(error)}`);
  }
}
