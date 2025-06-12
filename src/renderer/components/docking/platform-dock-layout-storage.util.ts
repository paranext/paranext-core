// #region utility functions that deal with loading, saving, and adding webviews. This code should
// really be in `web-view.service.ts`, but that file cannot currently import renderer code as it is
// a shared file.
// TODO: please move these utility functions with #203

import DockLayout, { FloatPosition, PanelData, TabData } from 'rc-dock';

import { LogError } from '@shared/log-error.model';
import {
  Layout,
  SavedTabInfo,
  TabInfo,
  TabLoader,
  TabSaver,
  WebViewTabProps,
} from '@shared/models/docking-framework.model';
import { WebViewDefinition, WebViewDefinitionUpdateInfo } from '@shared/models/web-view.model';
import { getErrorMessage } from 'platform-bible-utils';

import { DIALOGS } from '@renderer/components/dialogs';
import {
  TAB_TYPE_SETTINGS_TAB,
  loadSettingsTab,
} from '@renderer/components/settings-tabs/settings-tab.component';
import {
  TAB_TYPE_WEBVIEW,
  loadWebViewTab,
  saveWebViewTab,
  updateWebViewTab,
} from '@renderer/components/web-view.component';
import {
  mergeUpdatablePropertiesIntoWebViewDefinitionIfChangesArePresent,
  saveTabInfoBase,
} from '@renderer/services/web-view.service-host';

import { TAB_TYPE_BUTTONS, loadButtonsTab } from '@renderer/testing/test-buttons-panel.component';
import { TAB_TYPE_TEST, loadTestTab } from '@renderer/testing/test-panel.component';
import {
  TAB_TYPE_QUICK_VERSE_HERESY,
  loadQuickVerseHeresyTab,
} from '@renderer/testing/test-quick-verse-heresy-panel.component';

import { RCDockTabInfo, TabType, isPanel, isTab } from './docking-framework-internal.model';
import { ErrorTabData, TAB_TYPE_ERROR, createErrorTab, saveErrorTab } from './error-tab.component';
import { getFloatPosition, layoutDefaults } from './platform-dock-layout-positioning.util';
import { createRCDockTabFromTabInfo } from './platform-dock-tab.component';

/** Tab loader functions for each Platform tab type */
let tabLoaderMap: Map<TabType, TabLoader>;
if (globalThis.isNoisyDevModeEnabled) {
  tabLoaderMap = new Map<TabType, TabLoader>([
    [TAB_TYPE_BUTTONS, loadButtonsTab],
    [TAB_TYPE_QUICK_VERSE_HERESY, loadQuickVerseHeresyTab],
    [TAB_TYPE_TEST, loadTestTab],
    [TAB_TYPE_WEBVIEW, loadWebViewTab],
    [TAB_TYPE_SETTINGS_TAB, loadSettingsTab],
    ...Object.entries(DIALOGS).map(
      ([dialogTabType, dialogDefinition]) =>
        // The default implementation of `loadDialog` uses `this`, so bind it to the definition
        [dialogTabType, dialogDefinition.loadDialog.bind(dialogDefinition)] as const,
    ),
  ]);
} else {
  tabLoaderMap = new Map<TabType, TabLoader>([
    [TAB_TYPE_BUTTONS, loadButtonsTab],
    [TAB_TYPE_WEBVIEW, loadWebViewTab],
    [TAB_TYPE_SETTINGS_TAB, loadSettingsTab],
    ...Object.entries(DIALOGS).map(
      ([dialogTabType, dialogDefinition]) =>
        // The default implementation of `loadDialog` uses `this`, so bind it to the definition
        [dialogTabType, dialogDefinition.loadDialog.bind(dialogDefinition)] as const,
    ),
  ]);
}

/** Tab saver functions for each Platform tab type that wants to override the default */
const tabSaverMap = new Map<TabType, TabSaver>([
  [TAB_TYPE_WEBVIEW, saveWebViewTab],
  [TAB_TYPE_ERROR, saveErrorTab],
  ...Object.entries(DIALOGS).map(
    ([dialogTabType, dialogDefinition]) =>
      // The default implementation of `saveDialog` uses `this`, so bind it to the definition
      [dialogTabType, dialogDefinition.saveDialog.bind(dialogDefinition)] as const,
  ),
]);

// #region tab storage
/**
 * Loads tab data from the specified saved tab information by running the tab loader provided by the
 * component file that registered this tab type
 *
 * @param savedTabInfo Data that is to be used to create the new tab (comes from rc-dock)
 * @returns Tab that holds all info needed to make an actual tab in the dock layout
 */
function loadSavedTabInfo(savedTabInfo: SavedTabInfo): TabInfo {
  const tabLoader = tabLoaderMap.get(savedTabInfo.tabType);
  if (!tabLoader) return createErrorTab(`No tab loader for tabType '${savedTabInfo.tabType}'`);

  // Call the creation method to let the extension method create the tab
  try {
    return tabLoader(savedTabInfo);
  } catch (e) {
    // If the tab couldn't be created, replace it with an error tab
    return createErrorTab(getErrorMessage(e));
  }
}

/**
 * Loads tab data from the specified saved tab information into an actual dock layout tab
 *
 * @param savedTabInfo Data that is to be used to create the new tab (comes from rc-dock)
 * @param shouldBringToFront If true, the tab will be brought to the front and unobscured by other
 *   tabs. Defaults to `false`
 * @returns Live dock layout tab ready to used
 */
export function loadTab(savedTabInfo: SavedTabInfo, shouldBringToFront = false): RCDockTabInfo {
  if (!savedTabInfo.id) throw new LogError('loadTab: "id" is missing.');

  // Load the tab from the saved tab info
  const tabInfo = updateFlashTriggerTime(loadSavedTabInfo(savedTabInfo), shouldBringToFront);

  return createRCDockTabFromTabInfo(tabInfo);
}

/**
 * Converts the tab data into saved tab information by running the tab saver provided by the
 * component file that registered this tab type
 *
 * @param dockTabInfo The tab data to save
 * @returns Saved tab info ready to be saved into the layout
 */
export function saveTab(dockTabInfo: RCDockTabInfo): SavedTabInfo | undefined {
  // Remove the rc-dock properties that are not also in SavedTabInfo
  // We don't need to use the other properties, but we need to remove them
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { parent, group, closable, title, ...strippedTabInfo } = dockTabInfo;
  const tabInfo: TabInfo = strippedTabInfo;

  const tabSaver = tabSaverMap.get(tabInfo.tabType);

  return tabSaver ? tabSaver(tabInfo) : saveTabInfoBase(tabInfo);
}
// #endregion

// #region webview storage
/**
 * Gets the web view definition (data on the TabInfo) for the web view with the specified id
 *
 * @param webViewId The id of the WebView whose web view definition to get
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param methodName Name of the method that is calling this - prints in thrown exceptions
 * @returns `[targetTabInfo, targetTabWebViewData]`
 *
 *   - `targetTabInfo` - tab info for the tab containing the web view specified or `undefined` if not
 *       found
 *   - `targetTabWebViewData` - web view definition for the specified web view or `undefined` if not
 *       found
 *
 * @throws If the tab found with the specified webViewId is not a tab or is not a webview
 */
function getWebViewTabInfoById(
  webViewId: string,
  dockLayout: DockLayout,
  methodName: string,
): [RCDockTabInfo | undefined, WebViewDefinition | undefined] {
  const targetTab = dockLayout.find(webViewId);

  // If we didn't find the webview, return false
  if (!targetTab) return [undefined, undefined];

  if (!isTab(targetTab))
    throw new Error(
      `platform-dock-layout.component ${methodName} error: target tab with id '${targetTab.id}' is not a tab`,
    );

  // We know the tab in the dock layout is RCDockTabInfo because we set it to be that
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const targetTabInfo = targetTab as RCDockTabInfo;

  if (targetTabInfo.tabType !== TAB_TYPE_WEBVIEW)
    throw new Error(
      `platform-dock-layout.component ${methodName} error: target tab with id '${targetTab.id}' is not a WebView tab`,
    );

  // Type assert the webview data in the web view tab
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const targetTabWebViewData = targetTabInfo.data as WebViewDefinition;

  return [targetTabInfo, targetTabWebViewData];
}

/**
 * Gets the WebView definition for the web view with the specified id
 *
 * @param webViewId The id of the WebView whose web view definition to get
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @returns WebView definition with the specified id or undefined if not found
 */
export function getWebViewDefinition(
  webViewId: string,
  dockLayout: DockLayout,
): WebViewDefinition | undefined {
  const [, targetTabWebViewData] = getWebViewTabInfoById(
    webViewId,
    dockLayout,
    'getWebViewDefinition',
  );

  return targetTabWebViewData;
}

/**
 * Updates the WebView with the specified id with the specified properties
 *
 * @param webViewId The id of the WebView to update
 * @param updateInfo Properties to update on the WebView. Any unspecified properties will stay the
 *   same
 * @param shouldBringToFront If true, the tab will be brought to the front and unobscured by other
 *   tabs
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @returns True if successfully found the WebView to update and actually updated any properties;
 *   false otherwise
 */
export function updateWebViewDefinition(
  webViewId: string,
  updateInfo: WebViewDefinitionUpdateInfo,
  shouldBringToFront: boolean,
  dockLayout: DockLayout,
): boolean {
  const [targetTabInfo, targetTabWebViewData] = getWebViewTabInfoById(
    webViewId,
    dockLayout,
    'updateWebViewDefinition',
  );

  if (!targetTabInfo || !targetTabWebViewData) return false;

  // If there are no properties to update, don't update

  // Try to add the updatable properties according to `WebViewDefinitionUpdateInfo` to the tab's data
  const updatedWebViewData = mergeUpdatablePropertiesIntoWebViewDefinitionIfChangesArePresent(
    targetTabWebViewData,
    updateInfo,
  );

  // If there were no property updates, return false
  if (!updatedWebViewData && !shouldBringToFront) return false;

  const updatedTabData = createRCDockTabFromTabInfo(
    updateFlashTriggerTime(
      updateWebViewTab(targetTabInfo, updatedWebViewData ?? targetTabWebViewData),
      shouldBringToFront,
    ),
  );
  // Update existing tab
  updateTab(updatedTabData, shouldBringToFront, dockLayout);

  // Only consider the WebView to have updated if its properties actually changed, not just if it was brought to front
  return !!updatedWebViewData;
}
// #endregion

// #region update layout
let previousTabId: string | undefined;
let previousFloatPosition: FloatPosition = { left: 0, top: 0, width: 0, height: 0 };

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
 * Updates an existing tab, making sure it gets to the front and is unobscured by other tabs if
 * indicated
 *
 * @param tabInfo Info for tab to update
 * @param shouldBringToFront If true, the tab will be brought to the front and unobscured by other
 *   tabs. Note: you must update the `tabInfo.flashTriggerTime` property before calling this in
 *   order to make the tab flash.
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 */
function updateTab(
  tabInfo: RCDockTabInfo,
  shouldBringToFront: boolean,
  dockLayout: DockLayout,
): void {
  // Make sure the tab is unobscured
  if (shouldBringToFront) {
    unmaximizeAnyMaximizedTabGroup(dockLayout, tabInfo.id);
    bringFloatingTabGroupToFront(dockLayout, tabInfo.id);
  }

  dockLayout.updateTab(tabInfo.id, tabInfo, shouldBringToFront);
}

function updateFlashTriggerTime(tabInfo: TabInfo, shouldBringToFront: boolean): TabInfo {
  if (shouldBringToFront) {
    // Update the flash trigger time if we are supposed to bring the tab to the front.
    return { ...tabInfo, flashTriggerTime: Date.now() };
  }
  // Otherwise, just return the saved tab info as is
  return tabInfo;
}

/**
 * Add or update a tab in the layout
 *
 * @param savedTabInfo Info for tab to add or update
 * @param layout Information about where to put a new tab
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param shouldBringToFront If true, the tab will be brought to the front and unobscured by other
 *   tabs
 * @returns If tab added, final layout used to display the new tab. If existing tab updated,
 *   `undefined`
 */
export function addTabToDock(
  savedTabInfo: SavedTabInfo,
  layout: Layout,
  shouldBringToFront: boolean,
  dockLayout: DockLayout,
): Layout | undefined {
  const tab = loadTab(savedTabInfo, shouldBringToFront);
  let targetTab = dockLayout.find(tab.id);

  // Update existing tab
  if (targetTab) {
    if (!isTab(targetTab))
      throw new LogError(
        `addTabToDock: target tab with id '${targetTab.id}' is not a tab. This should not happen.`,
      );

    updateTab(tab, shouldBringToFront, dockLayout);
    previousTabId = tab.id;

    // We did not add a tab, so return undefined to indicate that
    return undefined;
  }

  // Figure out layout defaults for this tab
  const updatedLayout = layoutDefaults(layout, savedTabInfo);

  // Add new tab
  switch (updatedLayout.type) {
    case 'tab': {
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const dockLayoutDockBoxChildren = dockLayout.getLayout().dockbox.children as PanelData[];
      const isDockBoxEmpty =
        dockLayoutDockBoxChildren.length === 1 && dockLayoutDockBoxChildren[0].tabs.length === 0;
      targetTab = isDockBoxEmpty ? undefined : findPreviousTab(dockLayout);
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
    }
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

  if (shouldBringToFront) {
    unmaximizeAnyMaximizedTabGroup(dockLayout, tab.id);
    bringFloatingTabGroupToFront(dockLayout, tab.id);
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
 * @param shouldBringToFront If true, the tab will be brought to the front and unobscured by other
 *   tabs
 * @returns If WebView added, final layout used to display the new webView. If existing webView
 *   updated, `undefined`
 */
export function addWebViewToDock(
  webView: WebViewTabProps,
  layout: Layout,
  shouldBringToFront: boolean,
  dockLayout: DockLayout,
): Layout | undefined {
  const tabId = webView.id;
  if (!tabId)
    throw new Error(
      `platform-dock-layout error: WebView of type ${webView.webViewType} has no id!`,
    );
  return addTabToDock(
    { id: tabId, tabType: TAB_TYPE_WEBVIEW, data: webView },
    layout,
    shouldBringToFront,
    dockLayout,
  );
}

/**
 * If any tab group is maximized, this unmaximizes it unless it contains the specified WebView.
 *
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param webViewId The ID of the WebView to search for as a child of the maximized panel.
 */
export function unmaximizeAnyMaximizedTabGroup(dockLayout: DockLayout, webViewId?: string): void {
  // According to the docs, if there is a child of maxbox, then the type is always PanelData
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const maximizedTabGroup = dockLayout.getLayout().maxbox?.children?.[0] as PanelData | undefined;
  if (!maximizedTabGroup) return;

  // Look for the given WebView in the maximized tab group
  if (webViewId) {
    let tabData = dockLayout.find(webViewId);
    while (tabData && tabData.parent !== maximizedTabGroup) {
      tabData = tabData.parent;
    }
    if (tabData?.parent === maximizedTabGroup) return;
  }

  // Setting "maximize" as the "direction" of a maximized tab group causes it to unmaximize
  // Null is required by the API
  // eslint-disable-next-line no-null/no-null
  dockLayout.dockMove(maximizedTabGroup, null, 'maximize');
}

export function bringFloatingTabGroupToFront(dockLayout: DockLayout, webViewId: string): void {
  let tabData = dockLayout.find(webViewId);
  let tabGroupData: PanelData | undefined;
  while (!tabGroupData && tabData) {
    // If the tab is a floating tab, we want to bring its group to the front
    if (tabData.parent && isPanel(tabData.parent)) tabGroupData = tabData.parent;
    // Otherwise, keep looking up the parent chain
    else tabData = tabData.parent;
  }

  // Bring the floating tab group to the front
  // Null is required by the API
  // eslint-disable-next-line no-null/no-null
  if (!!tabGroupData && tabGroupData.z) dockLayout.dockMove(tabGroupData, null, 'front');
}
// #endregion
