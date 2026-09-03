import { DockContext, DragState, PanelData, TabData } from 'rc-dock';

/**
 * Identifies the tab or floating tab group a drag currently carries (per rc-dock's module-level
 * {@link DragState.getData}) and decides whether rc-dock's own drop rules allow it to be appended to
 * `targetPanel`. Returns the source to pass to `context.dockMove(source, targetPanel, 'middle')`,
 * or `undefined` when the drop should be rejected.
 *
 * Mirrors two existing rc-dock call sites rather than inventing new rules:
 *
 * - `TabCache.onDragOver` (`node_modules/rc-dock/src/DockTabs.tsx`) for a single-tab drag: same
 *   `group` only. On top of that, a tab that already is the last tab of `targetPanel` is rejected:
 *   appending it would change nothing, so offering a drop target there would only mislead.
 * - `DockPanel.render`'s gate on its own tabs-square (`node_modules/rc-dock/src/DockPanel.tsx`) for a
 *   whole-panel drag (including a re-docked float — a single-tab float panel drags as a `panel`,
 *   not a `tab`; see `TabCache.onDragStart`'s single-tab-float branch): reject `panelLock`ed
 *   panels, reject a different group, and reject the panel dropping onto itself (rc-dock issue
 *   ticlo/rc-dock#226 — accepting that duplicates the panel).
 *
 * A locked group's tab (`TabGroup.tabLocked`) is rejected here the same way `DockPanel` gates its
 * own tabs-square for a locked source group, even though the tab remains movable through the
 * ordinary tab-to-tab drop (`TabCache.onDragOver`, which never checks `tabLocked`) — this only
 * narrows the coarse "append to the end" gesture this zone offers, not tab movement in general.
 */
/** Whether `tab` already sits at the end of `panel`, so appending it there would change nothing. */
function isLastTabOfPanel(tab: TabData, panel: PanelData): boolean {
  if (tab.parent?.id !== panel.id) return false;
  const lastTab = panel.tabs[panel.tabs.length - 1];
  return lastTab?.id === tab.id;
}

export function resolveTabBarDropZoneSource(
  context: DockContext,
  targetPanel: PanelData,
): TabData | PanelData | undefined {
  const dockId = context.getDockId();

  const tab: TabData | null = DragState.getData('tab', dockId);
  if (tab) {
    if (!tab.group || tab.group !== targetPanel.group) return undefined;
    if (context.getGroup(tab.group).tabLocked) return undefined;
    if (isLastTabOfPanel(tab, targetPanel)) return undefined;
    return tab;
  }

  const panel: PanelData | null = DragState.getData('panel', dockId);
  if (panel) {
    if (panel.panelLock) return undefined;
    if (!panel.group || panel.group !== targetPanel.group) return undefined;
    if (panel === targetPanel) return undefined;
    return panel;
  }

  return undefined;
}
