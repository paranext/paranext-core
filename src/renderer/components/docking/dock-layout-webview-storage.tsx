import { mergeUpdatablePropertiesIntoWebViewDefinition } from '@renderer/services/web-view.service-host';
import { RCDockTabInfo, isTab } from '@shared/models/docking-framework.model';
import { WebViewDefinition, WebViewDefinitionUpdateInfo } from '@shared/models/web-view.model';
import DockLayout from 'rc-dock';
import { TAB_TYPE_WEBVIEW, updateWebViewTab } from '../web-view.component';
import { createRCDockTabFromTabInfo } from './dock-layout-create-tab';

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
    'getWebViewDefinitionUpdatableProperties',
  );

  return targetTabWebViewData;
}

/**
 * Updates the WebView with the specified id with the specified properties
 *
 * @param webViewId The id of the WebView to update
 * @param updateInfo Properties to update on the WebView. Any unspecified properties will stay the
 *   same
 * @param dockLayout The rc-dock dock layout React component ref. Used to perform operations on the
 *   layout
 * @returns True if successfully found the WebView to update; false otherwise
 */
export function updateWebViewDefinition(
  webViewId: string,
  updateInfo: WebViewDefinitionUpdateInfo,
  dockLayout: DockLayout,
): boolean {
  const [targetTabInfo, targetTabWebViewData] = getWebViewTabInfoById(
    webViewId,
    dockLayout,
    'updateWebViewDefinition',
  );

  if (!targetTabInfo || !targetTabWebViewData) return false;

  // Add the updatable properties according to `WebViewDefinitionUpdateInfo` to the tab's data
  const updatedWebViewData = mergeUpdatablePropertiesIntoWebViewDefinition(
    targetTabWebViewData,
    updateInfo,
  );
  const updatedTabData = createRCDockTabFromTabInfo(
    updateWebViewTab(targetTabInfo, updatedWebViewData),
  );
  // Update existing tab
  dockLayout.updateTab(webViewId, updatedTabData, false);
  return true;
}
