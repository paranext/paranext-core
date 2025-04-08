import { createUseNetworkObjectHook } from '@renderer/hooks/hook-generators/create-use-network-object-hook.util';
import { NetworkObject } from '@shared/models/network-object.model';
import { WebViewId } from '@shared/models/web-view.model';
import { webViewService } from '@shared/services/web-view.service';
import { WebViewControllerTypes, WebViewControllers } from 'papi-shared-types';

/**
 * Takes the parameters passed into the hook and returns the `webViewId` associated with those
 * parameters.
 *
 * @param webViewType `webViewType` that the web view controller must support. The TypeScript type
 *   for the returned web view controller will have the web view controller interface type
 *   associated with this `webViewType`. If the web view controller does not implement this
 *   `webViewType` (according to its metadata), an error will be thrown.
 * @param webViewId Id of the web view for which to get the web view controller OR
 *   `webViewController` (result of `useWebViewController`, if you want this hook to just return the
 *   controller again)
 * @returns `webViewId` for getting the web view controller
 */
function mapParametersToWebViewId<WebViewType extends WebViewControllerTypes>(
  _webViewType: WebViewType,
  webViewId: WebViewId | NetworkObject<WebViewControllers[WebViewType]> | undefined,
) {
  return webViewId;
}

/**
 * Gets a Web View Controller with specified provider name
 *
 * @param webViewType `webViewType` that the web view controller must support. The TypeScript type
 *   for the returned web view controller will have the web view controller interface type
 *   associated with this `webViewType`. If the web view controller does not implement this
 *   `webViewType` (according to its metadata), an error will be thrown.
 * @param webViewId Id of the web view for which to get the web view controller OR
 *   `webViewController` (result of `useWebViewController`, if you want this hook to just return the
 *   controller again)
 * @param pdpFactoryId Optional ID of the PDP factory from which to get the Web View Controller if
 *   the PDP factory supports this project id and project interface. If not provided, then look in
 *   all available PDP factories for the given project ID.
 * @returns `undefined` if the Web View Controller has not been retrieved, the requested Web View
 *   Controller if it has been retrieved and is not disposed, and undefined again if the Web View
 *   Controller is disposed
 */

// Assert to specific data type for this hook.
// eslint-disable-next-line no-type-assertion/no-type-assertion
export const useWebViewController = createUseNetworkObjectHook(
  webViewService.getWebViewController,
  mapParametersToWebViewId,
) as <WebViewType extends WebViewControllerTypes>(
  webViewType: WebViewType,
  webViewId: WebViewId | NetworkObject<WebViewControllers[WebViewType]> | undefined,
) => NetworkObject<WebViewControllers[WebViewType]> | undefined;

export default useWebViewController;
