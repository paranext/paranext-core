// #region utility functions that deal with loading, saving, and adding webviews. This code should
// really be in `web-view.service.ts`, but that file cannot currently import renderer code as it is
// a shared file.
// TODO: please move these utility functions with #203

import DockLayout, { BoxData, FloatPosition, PanelData, TabData } from 'rc-dock';

import { LogError } from '@shared/log-error.model';
import {
  DirectionFromTab,
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
import { logger } from '@shared/services/logger.service';
import { Filter } from 'rc-dock/lib/Algorithm';

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

// #endregion

// #region tab info retrieval

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
export function getTabInfoById(
  dockLayout: DockLayout,
  tabId: string,
  methodName: string,
): RCDockTabInfo | undefined {
  const targetTab = dockLayout.find(tabId);

  // If we didn't find the webview, return undefined
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
  // Look for Tab ID in parents of the element
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

    // If the element is in various misc places in the tab group area that don't get into a specific tab
    // (like if the user clicks empty space that doesn't capture focus, which goes up to the rc-dock dock-bar),
    // see which tab is focused in the tab group this element is in
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

// #region getTabInfoByDirectionFromTab and its sub-functions

/**
 * Gets info for the tab in the specified tab group that is adjacent to the source tab in the
 * specified direction.
 *
 * @param sourceTabGroup Tab group in which to get to the adjacent tab
 * @param sourceTabId ID of the tab in the source tab group to go from to get to the adjacent tab
 * @param direction Direction to go from the source tab to get to the adjacent tab
 * @returns Info for adjacent tab in the correct direction or `undefined` if there is not an
 *   adjacent tab in this tab group that meets the specified criteria
 */
function getAdjacentTabInfoInDirectionWithinTabGroup(
  sourceTabGroup: PanelData,
  sourceTabId: string,
  direction:
    | 'nextTab'
    | 'previousTab'
    | 'nextTabOrGroup'
    | 'previousTabOrGroup'
    | 'nearTabOrNextGroup',
): RCDockTabInfo | undefined {
  // Get the index of the current tab
  const sourceTabIndex = sourceTabGroup.tabs.findIndex((tab) => tab.id === sourceTabId);

  // Sanity check: the tab is not in the tab group we just got for the tab somehow. Please
  // investigate if actually ends up happening
  if (sourceTabIndex === -1)
    throw new Error(
      `getTabInfoByDirectionFromTab: Tab with ID '${sourceTabId}' is not in the identified parent tab group with id ${sourceTabGroup.id}. This should not happen.`,
    );

  // Figure out the index of the tab we want to go to
  let destinationIndex = -1;
  if (direction === 'nearTabOrNextGroup') {
    // One tab over forward or backward in the current tab group or forward a tab group depending on what is available
    if (sourceTabIndex < sourceTabGroup.tabs.length - 1)
      // There is a next tab in the current tab group, so go to it
      destinationIndex = sourceTabIndex + 1;
    else if (sourceTabIndex > 0)
      // There is a previous tab in the current tab group, so go to it
      destinationIndex = sourceTabIndex - 1;
  } else {
    // One tab over forward or backward in the current tab group
    const isForward = direction === 'nextTab' || direction === 'nextTabOrGroup';

    // Simply move forward or backward in the current group if there is a tab there
    if (
      (!isForward && sourceTabIndex > 0) ||
      (isForward && sourceTabIndex < sourceTabGroup.tabs.length - 1)
    ) {
      // Get the next or previous tab based on the direction
      destinationIndex = isForward ? sourceTabIndex + 1 : sourceTabIndex - 1;
    }
  }

  if (destinationIndex < 0) return undefined;

  // We know the tab in the dock layout is RCDockTabInfo because we set it to be that
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return sourceTabGroup.tabs[destinationIndex] as RCDockTabInfo | undefined;
}

/**
 * Gets the starting (leftmost in LTR or rightmost in RTL) tab info in the next tab group from the
 * source tab.
 *
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param sourceTabId ID of tab to go from to get to destination tab
 * @returns Starting (leftmost in LTR or rightmost in RTL) tab info in the next tab group or
 *   `undefined` if not found
 */
function getStartTabInfoInNextTabGroup(
  dockLayout: DockLayout,
  sourceTabId: string,
): RCDockTabInfo | undefined {
  // Iterate through all the tabs to find the next tab
  // Next tab might be the very first tab if source tab is last
  let firstTab: TabData | undefined;
  let hasPassedSourceTab = false;
  // We're filtering for only tabs, but the rc-dock types aren't sophisticated enough to understand
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const nextTab = dockLayout.find(
    (tab) => {
      // Still have to check isTab because of a bug https://github.com/ticlo/rc-dock/pull/253
      if (!isTab(tab)) return false;

      // Record first tab in the layout
      if (!firstTab) firstTab = tab;

      // Return the next tab after the source tab
      if (hasPassedSourceTab) return true;

      if (tab.id === sourceTabId) hasPassedSourceTab = true;
      // Keep looking through the tabs
      return false;
    },
    // Iterate over every tab anywhere in the dock layout
    Filter.AnyTab,
  ) as TabData | undefined;

  // Return the tab we found or, if there was no next tab, the source tab is the last tab,
  // so return the first one
  // We know the tab in the dock layout is RCDockTabInfo because we set it to be that
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (nextTab ?? firstTab) as RCDockTabInfo;
}

/**
 * Gets the ending (rightmost in LTR or leftmost in RTL) tab info in the previous tab group from the
 * source tab.
 *
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param sourceTabId ID of tab to go from to get to destination tab
 * @returns Ending (rightmost in LTR or leftmost in RTL) tab info in the previous tab group or
 *   `undefined` if not found
 */
function getEndTabInfoInPreviousTabGroup(
  dockLayout: DockLayout,
  sourceTabId: string,
): RCDockTabInfo | undefined {
  // Iterate through enough tabs to find the previous one
  // Keep track of last tab before the one we're iterating through. This will end up being the
  // final tab if the source tab is the first tab
  let previousTab: TabData | undefined;
  // Previous tab is the very last tab if source is first
  let isSourceTabFirst: boolean | undefined;
  dockLayout.find((tab) => {
    // Still have to check isTab because of a bug https://github.com/ticlo/rc-dock/pull/253
    if (!isTab(tab)) return false;

    if (isSourceTabFirst === undefined) isSourceTabFirst = tab.id === sourceTabId;

    // If we aren't trying to get the last tab and we hit our tab, previousTab should be set
    // properly, so return
    if (!isSourceTabFirst && tab.id === sourceTabId) return true;

    // Set this tab as the 'previous' one and keep going
    previousTab = tab;
    return false;
  }, Filter.AnyTab);

  // We know the tab in the dock layout is RCDockTabInfo because we set it to be that
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return previousTab as RCDockTabInfo;
}

/**
 * Gets info for the active tab in the tab group to the left (in LTR) of the source tab group
 *
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param sourceTabGroup Tab group to go from to get to the destination tab group
 * @returns Tab info for active tab in the previous tab group or `undefined` if not found
 */
function getActiveTabInfoInPreviousTabGroup(
  dockLayout: DockLayout,
  sourceTabGroup: PanelData,
): RCDockTabInfo | undefined {
  // Iterate through enough tab groups to find the previous one
  // Keep track of last tab group before the one we're iterating through. This will end up being the
  // final tab group if the source tab is in the first tab group
  let previousTabGroup: PanelData | undefined;
  // Previous tab group is the very last tab group if source is in the first tab group
  let isSourceTabGroupFirst: boolean | undefined;
  dockLayout.find((tabGroup) => {
    // Still have to check isPanel because of a bug https://github.com/ticlo/rc-dock/pull/253
    if (!isPanel(tabGroup)) return false;

    if (isSourceTabGroupFirst === undefined)
      isSourceTabGroupFirst = tabGroup.id === sourceTabGroup.id;

    // If we aren't trying to get the last tab group and we hit our tab group, previousTabGroup
    // should be set properly, so return
    if (!isSourceTabGroupFirst && tabGroup.id === sourceTabGroup.id) return true;

    // Set this tab as the 'previous' one and keep going
    previousTabGroup = tabGroup;
    return false;
  }, Filter.AnyPanel);

  // We know the tab in the dock layout is RCDockTabInfo because we set it to be that
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return previousTabGroup?.tabs.find(
    (tab) => tab.id === previousTabGroup?.activeId,
  ) as RCDockTabInfo;
}

/**
 * Gets info for the active tab in the tab group to the right (in LTR) of the source tab group
 *
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param sourceTabGroup Tab group to go from to get to the destination tab group
 * @returns Tab info for active tab in the next tab group or `undefined` if not found
 */
function getActiveTabInfoInNextTabGroup(
  dockLayout: DockLayout,
  sourceTabGroup: PanelData,
): RCDockTabInfo | undefined {
  // Iterate through all the tab groups to find the next tab group
  // Next tab group might be the very first tab group if source tab is in last tab group
  let firstTabGroup: PanelData | undefined;
  let hasPassedSourceTabGroup = false;
  // We're filtering for only tab groups (panels), but the rc-dock types aren't sophisticated enough to understand
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const nextTabGroup = dockLayout.find(
    (tabGroup) => {
      // Still have to check isPanel because of a bug https://github.com/ticlo/rc-dock/pull/253
      if (!isPanel(tabGroup)) return false;

      // Record first tab group in the layout
      if (!firstTabGroup) firstTabGroup = tabGroup;

      // Return the next tab group after the source tab group
      if (hasPassedSourceTabGroup) return true;

      if (tabGroup.id === sourceTabGroup.id) hasPassedSourceTabGroup = true;
      // Keep looking through the tab groups
      return false;
    },
    // Iterate over every tab group anywhere in the dock layout
    Filter.AnyPanel,
  ) as PanelData | undefined;

  // Return the active tab in the tab group we found or, if there was no next tab group, the
  // source tab is in the last tab group, so return the active tab of the first tab group
  const destinationTabGroup = nextTabGroup ?? firstTabGroup;
  // We know the tab in the dock layout is RCDockTabInfo because we set it to be that
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return destinationTabGroup?.tabs.find(
    (tab) => tab.id === destinationTabGroup.activeId,
  ) as RCDockTabInfo;
}

/**
 * Gets info for a tab in a direction from the source tab.
 *
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param sourceTabId ID of tab to go from to get to destination tab
 * @param direction Direction to go from the source tab to get to the destination tab
 * @returns Info for the destination tab or `undefined` if source tab or destination tab is not
 *   found
 * @throws If the item found in the dock layout with the source tab ID is not a tab
 * @throws If the item found in the dock layout with the destination tab ID is not a tab
 */
export function getTabInfoByDirectionFromTab(
  dockLayout: DockLayout,
  sourceTabId: string,
  direction: DirectionFromTab,
): RCDockTabInfo | undefined {
  const sourceTabGroup = getTabGroupForTab(dockLayout, sourceTabId);

  if (!sourceTabGroup) return undefined;

  // Go forward or backward a tab
  if (
    direction === 'nextTab' ||
    direction === 'previousTab' ||
    direction === 'nextTabOrGroup' ||
    direction === 'previousTabOrGroup' ||
    direction === 'nearTabOrNextGroup'
  ) {
    // If there is another tab in this tab group in the right direction, go to it
    if (sourceTabGroup.tabs.length > 1) {
      const adjacentTab = getAdjacentTabInfoInDirectionWithinTabGroup(
        sourceTabGroup,
        sourceTabId,
        direction,
      );
      if (adjacentTab) return adjacentTab;
    }

    // Need to jump tab groups
    // Jump to left-most tab in next tab group
    if (direction === 'nextTab') {
      return getStartTabInfoInNextTabGroup(dockLayout, sourceTabId);
    }
    // Jump to right-most tab in last tab group
    if (direction === 'previousTab') {
      return getEndTabInfoInPreviousTabGroup(dockLayout, sourceTabId);
    }
    // Jump to active tab in next tab group
    if (direction === 'nextTabOrGroup' || direction === 'nearTabOrNextGroup') {
      return getActiveTabInfoInNextTabGroup(dockLayout, sourceTabGroup);
    }
    // Jump to active tab in previous tab group
    // Don't need to check if (direction === 'previousTabOrGroup') because that's the only option left
    return getActiveTabInfoInPreviousTabGroup(dockLayout, sourceTabGroup);
  }

  // One tab group over in either direction
  // Jump to active tab in next tab group
  if (direction === 'nextTabGroup') {
    return getActiveTabInfoInNextTabGroup(dockLayout, sourceTabGroup);
  }
  // Jump to active tab in previous tab group
  // Don't need to check if (direction === 'previousTabGroup') because that's the only option left
  return getActiveTabInfoInPreviousTabGroup(dockLayout, sourceTabGroup);
}

// #endregion

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
  const targetTabInfo = getTabInfoById(dockLayout, webViewId, methodName);

  // If we didn't find the webview, return nothing
  if (!targetTabInfo) return [undefined, undefined];

  if (targetTabInfo.tabType !== TAB_TYPE_WEBVIEW)
    throw new Error(
      `platform-dock-layout.component ${methodName} error: target tab with id '${targetTabInfo.id}' is not a WebView tab`,
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
 * Updates the tab with the specified id with the specified properties. No need to have all the tab
 * info; just specify the properties you want to update.
 *
 * WARNING: This does not work well with `tab.data` `WebViewDefinition` information. Use
 * `updateWebViewDefinition` for that instead
 *
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param tabId ID of the tab to update
 * @param partialTabInfo Partial tab info to update. Any unspecified properties will stay the same
 * @param shouldBringToFront If true, the tab will flash, will be brought to the front, and will be
 *   unobscured by other tabs. Defaults to `false`
 * @returns Updated tab info or `undefined` if the tab was not found
 * @throws If the item found in the dock layout with the specified ID is not a tab
 */
export function updateTabPartial(
  dockLayout: DockLayout,
  tabId: string,
  partialTabInfo: Partial<TabInfo>,
  shouldBringToFront = false,
) {
  const targetTabInfo = getTabInfoById(dockLayout, tabId, 'updateTabPartial');

  // If we didn't find the webview, return nothing
  if (!targetTabInfo) return undefined;

  const updatedTabInfo = loadTab({ ...targetTabInfo, ...partialTabInfo }, shouldBringToFront);

  updateTab(dockLayout, updatedTabInfo, shouldBringToFront, updatedTabInfo.id);

  return updatedTabInfo;
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
  updateTab(dockLayout, updatedTabData, shouldBringToFront);

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
 * Sets an existing tab as the active tab in its tab group, makes sure it is unobscured by other
 * tabs, and sets the document focus in that tab
 *
 * If the tab is already the active tab in its tab group, it is more efficient to use
 * {@link revealTabGroupAndSetDocumentFocusToTab} instead
 *
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param tabId ID of the tab to set active and focused
 * @returns `true` if successfully found tab to update, `false` otherwise
 */
export function focusTab(dockLayout: DockLayout, tabId: string): boolean {
  // Bring the tab to front of its tab group
  // `rc-dock` requires null here to mean "don't change the tab data"
  // eslint-disable-next-line no-null/no-null
  const didFindTab = dockLayout.updateTab(tabId, null, true);

  revealTabGroupAndSetDocumentFocusToTab(dockLayout, tabId);

  return didFindTab;
}

/**
 * Updates an existing tab, making sure it gets to the front and is unobscured by other tabs if
 * indicated
 *
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param tabInfo Info for tab to update
 * @param shouldBringToFront If true, the tab will be brought to the front and unobscured by other
 *   tabs. Note: you must update the `tabInfo.flashTriggerTime` property before calling this in
 *   order to make the tab flash.
 * @param tabIdToReplace If specified, the tab with this ID will be replaced with the new tab
 * @returns `true` if successfully found tab to update, `false` otherwise
 */
function updateTab(
  dockLayout: DockLayout,
  tabInfo: RCDockTabInfo,
  shouldBringToFront: boolean,
  tabIdToReplace?: string,
): boolean {
  const tabId = tabIdToReplace ?? tabInfo.id;

  const didFindTab = dockLayout.updateTab(tabId, tabInfo, shouldBringToFront);

  // Make sure the tab is unobscured and focus the tab
  if (shouldBringToFront) revealTabGroupAndSetDocumentFocusToTab(dockLayout, tabId);

  return didFindTab;
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

    updateTab(dockLayout, tab, shouldBringToFront);
    previousTabId = tab.id;

    // We did not add a tab, so return undefined to indicate that
    return undefined;
  }

  // Figure out layout defaults for this tab
  const updatedLayout = layoutDefaults(layout, savedTabInfo);
  // Keep track of whether we already focused the tab
  let didFocusTab = false;

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
      if (updateTab(dockLayout, tab, shouldBringToFront, updatedLayout.targetTabId))
        didFocusTab = true;
      else
        throw new LogError(
          `Replacing tab failed: target tab with id ${updatedLayout.targetTabId} not found when attempting to replace it with tab ${tab.id}`,
        );

      break;

    default:
      // Type assert here because TypeScript thinks this layout is `never` because the switch has
      // covered all its options (if JS were statically typed, this `default` would never hit)
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      throw new LogError(`Unknown layoutType: '${(updatedLayout as Layout).type}'`);
  }

  if (shouldBringToFront && !didFocusTab)
    revealTabGroupAndSetDocumentFocusToTab(dockLayout, tab.id);

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
 * Brings a tab group to front, makes sure it is unobscured by other tabs, and sets the document
 * focus to the specified tab in that tab group.
 *
 * WARNING: Does NOT set the tab as active in its tab group. The tab should already be the active
 * tab in its tab group before running this. Call {@link focusTab} instead if you want to set the tab
 * as the active tab in its tab group and do all this as well.
 *
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param tabId ID of tab in the tab group to reveal
 */
function revealTabGroupAndSetDocumentFocusToTab(dockLayout: DockLayout, tabId: string): void {
  unmaximizeAnyMaximizedTabGroup(dockLayout, tabId);
  bringFloatingTabGroupToFront(dockLayout, tabId);
  setDocumentFocusToTab(dockLayout, tabId);
}

/**
 * Unmaximizes any maximized tab group in the layout unless it contains the given tab. If no tab
 * groups are maximized, this does nothing.
 *
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param tabId The ID of the tab to search for as a child of the maximized panel.
 */
function unmaximizeAnyMaximizedTabGroup(dockLayout: DockLayout, tabId?: string): void {
  // According to the docs, if there is a child of maxbox, then the type is always PanelData
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const maximizedTabGroup = dockLayout.getLayout().maxbox?.children?.[0] as PanelData | undefined;
  if (!maximizedTabGroup) return;

  // Look for the given tab in the maximized tab group
  if (tabId) {
    let tabData = dockLayout.find(tabId);
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
 * Get the tab group (panel) that contains the tab with the specified ID.
 *
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param tabId ID of the tab whose parent tab group to get
 * @returns Tab group for tab with the specified ID or `undefined` if not found
 * @throws If the item found in the dock layout with the specified ID is not a tab
 */
function getTabGroupForTab(dockLayout: DockLayout, tabId: string): PanelData | undefined {
  let tabData = getTabInfoById(dockLayout, tabId, 'getTabGroupForTab');
  let tabGroupData: PanelData | undefined;
  while (!tabGroupData && tabData) {
    // If the tab's parent is a panel, we found the tab group
    if (tabData.parent && isPanel(tabData.parent)) tabGroupData = tabData.parent;
    // Otherwise, keep looking up the parent chain
    else tabData = tabData.parent;
  }
  return tabGroupData;
}

/**
 * Brings the floating tab group containing the tab with the specified tab ID to the front of the
 * layout. If there is no floating tab group with the specified ID, this does nothing.
 *
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param tabId The ID of the WebView whose floating tab group to bring to the front
 */
function bringFloatingTabGroupToFront(dockLayout: DockLayout, tabId: string): void {
  const tabGroupData = getTabGroupForTab(dockLayout, tabId);

  // Bring the floating tab group to the front
  // Null is required by the API
  // eslint-disable-next-line no-null/no-null
  if (!!tabGroupData && tabGroupData.z) dockLayout.dockMove(tabGroupData, null, 'front');
}

/**
 * Sets the focus of this window's `document` to the contents of the specified tab
 *
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @param tabId ID of the tab to focus
 */
function setDocumentFocusToTab(dockLayout: DockLayout, tabId: string) {
  // ENHANCEMENT: Track the last selected element in various tabs and restore focus to it. Currently
  // only WebViews support this
  const tabInfo = getTabInfoById(dockLayout, tabId, 'setDocumentFocusToTab');
  if (!tabInfo) return;

  let didFocusWebView = false;

  // Select the WebView iframe if one exists. Must do this then select the last focused element
  // inside it if available
  const webViewIframe = document.querySelector(`[data-web-view-id='${tabId}']`);
  if (webViewIframe instanceof HTMLIFrameElement) {
    if (!webViewIframe.contentWindow) {
      webViewIframe.focus();
      // Not sure in what contexts it wouldn't have a contentWindow, so just warn for now
      logger.warn(
        `setDocumentFocusToTab: WebView with id '${tabId}' does not have a contentWindow for some reason. Focusing the iframe instead. Please investigate`,
      );
    } else webViewIframe.contentWindow.focus();
    didFocusWebView = true;
  }

  // Try to select the last focused element in the tab
  if (tabInfo.lastFocusedElement) {
    // If the last focused element is a valid HTMLElement, focus it
    // Checking with 'focus' in because this may be across realms in the iframe
    if ('focus' in tabInfo.lastFocusedElement) {
      const elementToFocus = tabInfo.lastFocusedElement;
      // If we're refocusing an element in a WebView, we must wait until the WebView is visible before
      // focusing the element. Otherwise, the focus will just be on the body
      // TODO: Make this work for normal tabs if it doesn't already work
      if (webViewIframe && !webViewIframe.checkVisibility()) {
        const webViewVisibilityObserver = new IntersectionObserver(
          () => {
            elementToFocus.focus();
            webViewVisibilityObserver.disconnect();
          },
          {
            root: document.documentElement,
          },
        );
        webViewVisibilityObserver.observe(webViewIframe);

        return;
      }

      // If the tab is already visible, focus the element
      elementToFocus.focus();

      return;
    }
    // If it is not an HTMLElement, just log it
    logger.warn(
      `setDocumentFocusToTab: lastFocusedElement for tab '${tabId}' exists but does not have 'focus' for some reason. Cannot focus it. Please investigate`,
    );
  }

  // Already dealt with the WebView. Don't want to focus the tab
  if (didFocusWebView) return;

  // It isn't a WebView and doesn't have a lastFocusedElement, so select the first child of the
  // platform panel instead
  const tabPlatformPanel = document.querySelector(`[data-tab-id='${tabId}']`);
  if (!tabPlatformPanel) return;

  const tabPlatformPanelFirstChild = tabPlatformPanel.children.item(0);

  let elementToFocus: HTMLElement;

  // Get the first child or just the platform panel if we can't find an eligible child
  if (tabPlatformPanelFirstChild instanceof HTMLElement) {
    elementToFocus = tabPlatformPanelFirstChild;
  } else if (tabPlatformPanel instanceof HTMLElement) {
    elementToFocus = tabPlatformPanel;
  } else return;

  // If the element is not focusable, set it to be focusable temporarily so the focusin event will fire
  const elementToFocusTabIndexOriginal = elementToFocus.tabIndex;
  if (elementToFocusTabIndexOriginal === -1) elementToFocus.tabIndex = 0;
  elementToFocus.focus();
  if (elementToFocusTabIndexOriginal === -1)
    elementToFocus.tabIndex = elementToFocusTabIndexOriginal;
}

// #endregion
