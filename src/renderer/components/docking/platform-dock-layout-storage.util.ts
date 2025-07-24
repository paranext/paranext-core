// #region utility functions that deal with loading, saving, and adding web views. This code should
// really be in `web-view.service.ts`, but that file cannot currently import renderer code as it is
// a shared file.
// TODO: please move these utility functions with #203

import DockLayout, { BoxData, FloatPosition, PanelData, TabData } from 'rc-dock';

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

/** Regex on the tab id for tab header elements made by rc-dock */
const TAB_HEADER_ID_REGEX = /rc-tabs-\d+-tab-(.+)/;

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
 * @param shouldFlash If true, the tab info will be adjusted to start flashing when next rendered.
 *   Defaults to `false`
 * @returns Live dock layout tab ready to used
 */
export function loadTab(savedTabInfo: SavedTabInfo, shouldFlash = false): RCDockTabInfo {
  if (!savedTabInfo.id) throw new LogError('loadTab: "id" is missing.');

  // Load the tab from the saved tab info
  const tabInfo = loadSavedTabInfo(savedTabInfo);

  return createRCDockTabFromTabInfo(tabInfo, shouldFlash);
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

/**
 * Gets info for the tab with the specified ID
 *
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param tabId The ID of the tab whose info to get
 * @param methodName Name of the method that is calling this - prints in thrown exceptions
 * @returns Info for the tab in question or `undefined` if tab is not found
 * @throws If the item found in the dock layout with the specified ID is not a tab
 */
function getTabInfoById(
  dockLayout: DockLayout,
  tabId: string,
  methodName: string,
): RCDockTabInfo | undefined {
  const targetTab = dockLayout.find(tabId);

  // If we didn't find the web view, return undefined
  if (!targetTab) return undefined;

  if (!isTab(targetTab))
    throw new Error(
      `platform-dock-layout.component ${methodName} error: target tab with id '${targetTab.id}' is not a tab`,
    );

  // We know the tab in the dock layout is RCDockTabInfo because we set it to be that
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return targetTab as RCDockTabInfo;
}

/**
 * Gets info for the tab that contains the specified DOM element
 *
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param tabElement The DOM element in the tab whose info to get
 * @returns Info for the tab in question or `undefined` if tab is not found
 * @throws If found a tab id in the DOM but there was no corresponding tab info in the dock layout
 *   or the item with the id found was not a tab
 */
export function getTabInfoByElement(
  dockLayout: DockLayout,
  tabElement: Element,
): RCDockTabInfo | undefined {
  // Need to use `null` because it is returned from `element.parentElement`
  let currentElement: Element | null = tabElement;
  // Look for Tab ID in parents of currently focused element
  // Unfortunately, this is heavily dependent on internal details of rc-dock
  // `dock-layout` class is on the highest div in the rc-dock dock layout component
  while (currentElement && !currentElement.classList.contains('dock-layout')) {
    let tabId: string | undefined;

    // If we clicked on the PlatformPanel (directly inside the tab contents)
    if (currentElement instanceof HTMLElement && currentElement.dataset.tabId)
      tabId = currentElement.dataset.tabId;

    // If clicked on tab header
    // rc-tabs-#-tab-${id} is the id for tab headers in rc-dock
    if (!tabId && TAB_HEADER_ID_REGEX.test(currentElement.id))
      [, tabId] = TAB_HEADER_ID_REGEX.exec(currentElement.id) ?? [];

    // If clicked in various misc places in the tab group area that don't get into a specific tab
    // (like clicking empty space that doesn't capture focus, which goes up to the rc-dock dock-bar),
    // see which tab is focused in the clicked tab group
    // `dock-panel` class and data-dockid attribute are on the tab group (rc-dock calls it panel)
    if (
      !tabId &&
      currentElement instanceof HTMLElement &&
      currentElement.classList.contains('dock-panel') &&
      currentElement.dataset.dockid
    ) {
      const panelData = dockLayout.find(currentElement.dataset.dockid);
      if (isPanel(panelData)) tabId = panelData.activeId;
    }

    if (tabId) {
      const tabInfo = getTabInfoById(dockLayout, tabId, 'getTabInfoByElement');
      if (tabInfo) return tabInfo;
      throw new Error(
        `getTabInfoByElement: Found tab ID ${tabId} in DOM, but there was no tab info`,
      );
    }

    // It's not this one. Go up
    currentElement = currentElement.parentElement;
  }

  // Didn't find a tab
  return undefined;
}

// #endregion

// #region web view storage
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
 * @throws If the tab found with the specified webViewId is not a tab or is not a web view
 */
function getWebViewTabInfoById(
  webViewId: string,
  dockLayout: DockLayout,
  methodName: string,
): [RCDockTabInfo | undefined, WebViewDefinition | undefined] {
  const targetTabInfo = getTabInfoById(dockLayout, webViewId, methodName);

  // If we didn't find the web view, return nothing
  if (!targetTabInfo) return [undefined, undefined];

  if (targetTabInfo.tabType !== TAB_TYPE_WEBVIEW)
    throw new Error(
      `platform-dock-layout.component ${methodName} error: target tab with id '${targetTabInfo.id}' is not a WebView tab`,
    );

  // Type assert the web view data in the web view tab
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
    updateWebViewTab(targetTabInfo, updatedWebViewData ?? targetTabWebViewData),
    shouldBringToFront,
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
 * @param tabIdToReplace If specified, the tab with this ID will be replaced with the new tab
 */
function updateTab(
  tabInfo: RCDockTabInfo,
  shouldBringToFront: boolean,
  dockLayout: DockLayout,
  tabIdToReplace?: string,
): boolean {
  const tabId = tabIdToReplace ?? tabInfo.id;

  // Make sure the tab is unobscured
  if (shouldBringToFront) {
    unmaximizeAnyMaximizedTabGroup(dockLayout, tabId);
    bringFloatingTabGroupToFront(dockLayout, tabId);
  }

  return dockLayout.updateTab(tabId, tabInfo, shouldBringToFront);
}

/**
 * Recursively finds a panel with the specified ID in the given panel hierarchy
 *
 * @param tabGroups Array of panels to search through
 * @param targetId The ID of the tab group to search for
 * @returns The panel with the matching ID, or undefined if not found
 */
function findTabGroupById(
  tabGroups: (PanelData | BoxData)[],
  targetId: string,
): PanelData | undefined {
  return tabGroups.reduce<PanelData | undefined>((foundTabGroup, tabGroup) => {
    if (foundTabGroup) return foundTabGroup;

    if (tabGroup.id === targetId && 'tabs' in tabGroup) {
      return tabGroup;
    }

    // If this tab group has children, search recursively
    if ('children' in tabGroup) {
      return findTabGroupById(tabGroup.children, targetId);
    }

    return undefined;
  }, undefined);
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
      const dockLayoutDockBoxChildren = dockLayout.getLayout().dockbox.children;
      const dockLayoutFloatBoxChildren = dockLayout.getLayout().floatbox?.children;

      if (updatedLayout.parentTabGroupId) {
        const targetTabGroup = findTabGroupById(
          dockLayoutDockBoxChildren.concat(dockLayoutFloatBoxChildren ?? []),
          updatedLayout.parentTabGroupId,
        );
        if (targetTabGroup) {
          dockLayout.dockMove(tab, targetTabGroup, 'middle');

          previousTabId = tab.id;
          break;
        }
      }

      const isDockBoxEmpty =
        dockLayoutDockBoxChildren.length === 1 &&
        'tabs' in dockLayoutDockBoxChildren[0] &&
        dockLayoutDockBoxChildren[0].tabs.length === 0;

      targetTab = isDockBoxEmpty ? undefined : findPreviousTab(dockLayout);

      if (targetTab) {
        if (previousTabId === undefined && targetTab.parent)
          // The target tab is the first found tab, so just add this as a new panel on top.
          dockLayout.dockMove(tab, targetTab.parent, 'top');
        // The target tab is a previously added tab, so add this as a tab next to it
        else dockLayout.dockMove(tab, targetTab, 'after-tab');
      }
      // Didn't find any tabs. Add as a new tab
      else {
        const target = dockLayout.find(() => true);
        if (!target) throw new LogError('No target found to add the tab to');

        dockLayout.dockMove(tab, target, 'middle');
      }
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

    case 'replace-tab':
      if (!updatedLayout.targetTabId) {
        throw new LogError(`When replacing a tab, targetTabId must be specified`);
      }
      if (!updateTab(tab, shouldBringToFront, dockLayout, updatedLayout.targetTabId)) {
        throw new LogError(
          `Replacing tab failed: target tab with id ${updatedLayout.targetTabId} not found when attempting to replace it with tab ${tab.id}`,
        );
      }
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
 * Add or update a web view in the layout
 *
 * @param webView Web view to add or update
 * @param layout Information about where to put a new web view
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
 * Unmaximizes any maximized tab group in the layout unless it contains the given WebView. If no tab
 * groups are maximized, this does nothing.
 *
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param webViewId The ID of the WebView to search for as a child of the maximized panel.
 */
function unmaximizeAnyMaximizedTabGroup(dockLayout: DockLayout, webViewId?: string): void {
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

/**
 * Brings the floating tab group with the specified WebView ID to the front of the layout. If there
 * is no floating tab group with the specified ID, this does nothing.
 *
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param webViewId The ID of the WebView whose floating tab group to bring to the front
 */
function bringFloatingTabGroupToFront(dockLayout: DockLayout, webViewId: string): void {
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
