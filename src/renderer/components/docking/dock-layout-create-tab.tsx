import LogError from '@shared/log-error.model';
import {
  TabInfo,
  isTab,
  SavedTabInfo,
  Layout,
  WebViewTabProps,
} from '@shared/models/docking-framework.model';
import DockLayout, { FloatPosition, TabData, PanelData } from 'rc-dock';
import { TAB_TYPE_WEBVIEW } from '../web-view.component';
import { TAB_GROUP, layoutDefaults, getFloatPosition } from './dock-layout-layout';
import { loadTab } from './dock-layout-tab-storage';
import { TAB_TYPE_ERROR, ErrorTabData } from './error-tab.component';
import PlatformPanel from './platform-panel.component';
import PlatformTabTitle from './platform-tab-title.component';

let previousTabId: string | undefined;
let previousFloatPosition: FloatPosition = { left: 0, top: 0, width: 0, height: 0 };

/**
 * Creates a tab ready to go into rc-dock from platform tab info
 *
 * @param tabInfo Data used to create the rc-dock tab
 * @returns Rc-dock tab created from `tabInfo`
 */
export function createRCDockTabFromTabInfo(tabInfo: TabInfo) {
  // Translate the data from the loaded tab to be in the form needed by rc-dock
  return {
    ...tabInfo,
    title: (
      <PlatformTabTitle
        iconUrl={tabInfo.tabIconUrl}
        text={tabInfo.tabTitle}
        tooltip={tabInfo.tabTooltip}
      />
    ),
    content: <PlatformPanel>{tabInfo.content}</PlatformPanel>,
    group: TAB_GROUP,
    closable: true,
  };
}

/** Find the previous tab if one was previously added or find the first tab otherwise */
export function findPreviousTab(dockLayout: DockLayout) {
  // If we have a previous tab, try to find it
  if (previousTabId !== undefined) {
    const previousTab = dockLayout.find(previousTabId);
    // If we found the previous tab, go with that
    if (previousTab) return previousTab;
  }
  // We don't have a previous tab or we didn't find the one we thought we had. Just find the first
  // available tab. Assert the more specific type.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return dockLayout.find((tabData) => isTab(tabData)) as TabData;
}

/**
 * Add or update a tab in the layout
 *
 * @param savedTabInfo Info for tab to add or update
 * @param layout Information about where to put a new tab
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @returns If tab added, final layout used to display the new tab. If existing tab updated,
 *   `undefined`
 */
export function addTabToDock(
  savedTabInfo: SavedTabInfo,
  layout: Layout,
  dockLayout: DockLayout,
): Layout | undefined {
  const tab = loadTab(savedTabInfo);
  let targetTab = dockLayout.find(tab.id);

  // Update existing tab
  if (targetTab) {
    dockLayout.updateTab(tab.id, tab, false);
    if (isTab(targetTab)) previousTabId = tab.id;

    // We did not add a tab, so return undefined to indicate that
    return undefined;
  }

  // Figure out layout defaults for this tab
  const updatedLayout = layoutDefaults(layout, savedTabInfo);

  // Add new tab
  switch (updatedLayout.type) {
    case 'tab':
      targetTab = findPreviousTab(dockLayout);
      if (targetTab) {
        if (previousTabId === undefined)
          // The target tab is the first found tab, so just add this as a new panel on top.
          // Assert the more specific type.
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          dockLayout.dockMove(tab, targetTab.parent as PanelData, 'top');
        // The target tab is a previously added tab, so add this as a tab next to it
        else dockLayout.dockMove(tab, targetTab, 'after-tab');
      }
      // Didn't find any tabs. Add as a new tab
      else
        dockLayout.dockMove(
          tab,
          // Find the first thing (the dock box) and add the tab to it
          // Null required by the external API
          // eslint-disable-next-line no-null/no-null
          dockLayout.find(() => true) ?? null,
          'middle',
        );
      previousTabId = tab.id;
      break;

    case 'float': {
      const floatPosition = getFloatPosition(
        updatedLayout,
        previousFloatPosition,
        dockLayout.getLayoutSize(),
      );

      if (!updatedLayout.position || updatedLayout.position === 'cascade')
        // Update the previous float position so the next cascading float layout will appear after it
        previousFloatPosition = floatPosition;

      // Null required by the external API
      // eslint-disable-next-line no-null/no-null
      dockLayout.dockMove(tab, null, 'float', floatPosition);
      break;
    }
    case 'panel':
      if (updatedLayout.targetTabId !== undefined) {
        // Look for a specific tab
        targetTab = dockLayout.find(updatedLayout.targetTabId);
        if (!isTab(targetTab))
          throw new LogError(
            `When adding a panel, unknown target tab: '${updatedLayout.targetTabId}'`,
          );
      }
      // Didn't ask for a specific tab, so just get the previous tab and go from there
      else targetTab = findPreviousTab(dockLayout);

      dockLayout.dockMove(
        tab,
        // Add to the parent of the found tab if we found a tab. Assert the more specific type.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        (targetTab?.parent as PanelData) ??
          // Otherwise find the first thing (the dock box) and add the tab to it
          dockLayout.find(() => true) ??
          // Null required by the external API
          // eslint-disable-next-line no-null/no-null
          null,
        // Defaults are added in `layoutDefaults`.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        updatedLayout.direction!,
      );
      break;

    default:
      // Type assert here because TypeScript thinks this layout is `never` because the switch has
      // covered all its options (if JS were statically typed, this `default` would never hit)
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      throw new LogError(`Unknown layoutType: '${(updatedLayout as Layout).type}'`);
  }

  // If there was an error loading the tab, we create an error tab. But we also want to throw here
  // so people know there was a problem.
  // TODO: Do we really want to create an error tab in the first place? Or maybe that should only
  // happen on startup
  if (tab.tabType === TAB_TYPE_ERROR)
    throw new LogError(
      // Assert the more specific type.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      `Dock Layout created an error tab: ${(tab.data as ErrorTabData)?.errorMessage}`,
    );

  return updatedLayout;
}

/**
 * Add or update a webview in the layout
 *
 * @param webView Web view to add or update
 * @param layout Information about where to put a new webview
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @returns If WebView added, final layout used to display the new webView. If existing webView
 *   updated, `undefined`
 */
export function addWebViewToDock(
  webView: WebViewTabProps,
  layout: Layout,
  dockLayout: DockLayout,
): Layout | undefined {
  const tabId = webView.id;
  if (!tabId)
    throw new Error(
      `platform-dock-layout error: WebView of type ${webView.webViewType} has no id!`,
    );
  return addTabToDock({ id: tabId, tabType: TAB_TYPE_WEBVIEW, data: webView }, layout, dockLayout);
}
