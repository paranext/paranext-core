/**
 * Proxy service that registers under the generic "WebViewService" network object name and routes
 * calls to the focused window's scoped WebViewService (e.g. "WebViewService-1"). This enables
 * multi-window support by ensuring that operations like openWebView execute in the correct window.
 */

import {
  getReadyWindowIds,
  getTargetWindowId,
  isWindowReady,
} from '@main/services/window-state.service';
import {
  GetWebViewOptions,
  OpenWebViewOptions,
  ReloadWebViewOptions,
  SavedWebViewDefinition,
  WebViewId,
  WebViewType,
} from '@shared/models/web-view.model';
import { Layout } from '@shared/models/docking-framework.model';
import { logger } from '@shared/services/logger.service';
import { getErrorMessage } from 'platform-bible-utils';
import { networkObjectService } from '@shared/services/network-object.service';
import { getNetworkEvent } from '@shared/services/network.service';
import {
  CloseWebViewEvent,
  EVENT_NAME_ON_DID_CLOSE_WEB_VIEW,
  EVENT_NAME_ON_DID_OPEN_WEB_VIEW,
  EVENT_NAME_ON_DID_UPDATE_WEB_VIEW,
  getWebViewController,
  NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
  OpenWebViewEvent,
  UpdateWebViewEvent,
  WebViewServiceType,
} from '@shared/services/web-view.service-model';

/**
 * Get the scoped WebViewService for a specific window. Returns undefined if not yet registered.
 *
 * @param windowId The Electron BrowserWindow ID
 */
async function getScopedWebViewService(windowId: number): Promise<WebViewServiceType | undefined> {
  return networkObjectService.get<WebViewServiceType>(
    `${NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE}-${windowId}`,
  );
}

/** Get the scoped WebViewService for the currently focused window, throwing if none is available. */
async function getTargetWebViewService(): Promise<WebViewServiceType> {
  const targetWindowId = getTargetWindowId();
  if (targetWindowId === undefined)
    throw new Error('No windows available to route WebViewService call');
  const webViewService = await getScopedWebViewService(targetWindowId);
  if (!webViewService)
    throw new Error(
      `WebViewService for window ${targetWindowId} is not available. The renderer may not have started yet.`,
    );
  return webViewService;
}

/** The window that owns a web view, and the definition the ownership search already fetched */
type WebViewOwner = { service: WebViewServiceType; definition: SavedWebViewDefinition };

/**
 * Search the windows that can answer for the one that owns a given web view, returning its scoped
 * WebViewService along with the definition the search fetched — callers that want the definition
 * already have it here, and a second fetch would be another cross-process round trip that can come
 * back with something different.
 *
 * Only ready windows are asked: a window that has not registered its services cannot own a web
 * view, and asking it stalls the search for the network service's whole registration retry.
 *
 * Returns undefined when every window answered and none owns it.
 *
 * @throws If no window claimed the web view and some window could not be asked, since the owner may
 *   be the window that did not answer
 */
async function findOwner(
  webViewId: WebViewId,
  operation: string,
): Promise<WebViewOwner | undefined> {
  let hadServiceErrors = false;
  const owners = await Promise.all(
    getReadyWindowIds().map(async (windowId) => {
      try {
        const webViewService = await getScopedWebViewService(windowId);
        // A ready window is one whose renderer registered its WINDOW service; the others register
        // moments apart, so its WebView service can still be missing. That is a window that could
        // not be asked, not one that answered no — see the reachability note below.
        if (!webViewService) {
          logger.warn(
            `WebView service for window ${windowId} is not registered, so it could not be asked about webview ${webViewId} for ${operation}`,
          );
          hadServiceErrors = true;
          return undefined;
        }
        const definition = await webViewService.getOpenWebViewDefinition(webViewId);
        if (definition) return { service: webViewService, definition };
        return undefined;
      } catch (e) {
        logger.warn(
          `Failed to query webview ${webViewId} in window ${windowId} for ${operation}: ${getErrorMessage(e)}`,
        );
        hadServiceErrors = true;
        return undefined;
      }
    }),
  );
  const owner = owners.find((candidate) => candidate !== undefined);
  if (owner) return owner;

  // "Could not ask" is not "answered no": the window that failed may be the one holding this web
  // view, and treating it as an unowned id sends the operation to the focused window instead
  if (hadServiceErrors)
    throw new Error(`Could not ${operation} webview ${webViewId}: some windows were unreachable.`);

  return undefined;
}

// Proxy methods that route to the focused window's scoped WebViewService

async function openWebView(
  webViewType: WebViewType,
  layout?: Layout,
  options?: OpenWebViewOptions,
): Promise<WebViewId | undefined> {
  // If an existingId is provided, search all windows for the webview's owner
  if (options?.existingId) {
    const owner = await findOwner(options.existingId, 'openWebView');
    if (owner) return owner.service.openWebView(webViewType, layout, options);
  }
  // No existingId or not found in any window — route to focused window
  const webViewService = await getTargetWebViewService();
  return webViewService.openWebView(webViewType, layout, options);
}

async function reloadWebView(
  webViewType: WebViewType,
  webViewId: WebViewId,
  options?: ReloadWebViewOptions,
): Promise<WebViewId | undefined> {
  const owner = await findOwner(webViewId, 'reload');
  if (owner) return owner.service.reloadWebView(webViewType, webViewId, options);

  // Webview not found in any window — fall back to focused window (may be a new webview)
  const webViewService = await getTargetWebViewService();
  return webViewService.reloadWebView(webViewType, webViewId, options);
}

async function getOpenWebViewDefinition(
  webViewId: string,
): Promise<SavedWebViewDefinition | undefined> {
  return (await findOwner(webViewId, 'getOpenWebViewDefinition'))?.definition;
}

/** Everything the windows that answered have open, and the ready windows that did not answer */
export type OpenWebViewDefinitionsByReachability = {
  /** Open web view definitions merged from every window that answered */
  definitions: SavedWebViewDefinition[];
  /** Ready windows that failed to answer, so their web views are missing from `definitions` */
  unreachableWindowIds: number[];
};

/**
 * Gather what every window has open, keeping track of the ones that could not be asked.
 *
 * Unlike the other proxy methods, this fans out rather than routing: callers use it to seed their
 * picture of the whole WebView landscape, so restricting it to the focused window would make every
 * other window's tabs invisible.
 *
 * Exported for the callers that can do something sensible with an incomplete answer — the shutdown
 * sync has one shot at this and no event stream to correct it later, so it syncs what it can find
 * and says plainly that the coverage is partial. Everyone else should use the proxy's
 * {@link getAllOpenWebViewDefinitions}, which refuses to answer at all rather than pass a partial
 * list off as the whole picture.
 */
export async function getAllOpenWebViewDefinitionsWithReachability(): Promise<OpenWebViewDefinitionsByReachability> {
  const unreachableWindowIds: number[] = [];
  const definitionsPerWindow = await Promise.all(
    getReadyWindowIds().map(async (windowId) => {
      try {
        const webViewService = await getScopedWebViewService(windowId);
        // A ready window whose WebView service has not registered yet is a window that could not be
        // asked. Answering `[]` for it would put it in the result as a window with nothing open,
        // which is the one thing this function exists to keep apart from the truth.
        if (!webViewService) {
          logger.warn(
            `WebView service for window ${windowId} is not registered, so its open webviews could not be read`,
          );
          unreachableWindowIds.push(windowId);
          return [];
        }
        return await webViewService.getAllOpenWebViewDefinitions();
      } catch (e) {
        logger.warn(
          `Failed to get open webview definitions from window ${windowId}: ${getErrorMessage(e)}`,
        );
        unreachableWindowIds.push(windowId);
        return [];
      }
    }),
  );
  return { definitions: definitionsPerWindow.flat(), unreachableWindowIds };
}

/**
 * What one specific window has open, rather than the merged picture the proxy serves.
 *
 * A window is the only thing that knows what it has open, so this is the only way to ask about a
 * window that is on its way out — the merged read asks the windows that can answer, and by the time
 * anything notices a window has gone it is no longer one of them.
 *
 * @param windowId Window to ask. It must still be alive; its scoped service goes with it.
 * @returns Everything that window has open, or an empty list if its renderer never got as far as
 *   registering its services — a window that was never ready never had anything open
 * @throws If the window was serving requests but could not be asked, since "could not ask" is not
 *   "answered none"
 */
export async function getOpenWebViewDefinitionsForWindow(
  windowId: number,
): Promise<SavedWebViewDefinition[]> {
  const webViewService = await getScopedWebViewService(windowId);
  if (webViewService) return webViewService.getAllOpenWebViewDefinitions();

  // Readiness is what tells the two empty answers apart. A window whose renderer never registered
  // genuinely had nothing open. One that was serving requests a moment ago may have had editors
  // with unsaved work in it, and its own service is the only thing that could have listed them, so
  // the caller has to hear that the question went unanswered rather than that the answer was none.
  if (isWindowReady(windowId))
    throw new Error(
      `WebView service for window ${windowId} is not available, so what it had open could not be read.`,
    );
  return [];
}

/**
 * Every open web view across all windows.
 *
 * A window that fails to answer makes this throw rather than silently shrink the list: callers read
 * it as the complete picture — deciding whether a tab already exists, which project is open — and a
 * window that could not be asked is indistinguishable in the result from one with nothing open. A
 * ready window failing is exceptional, so failing loudly is better than acting on tabs whose
 * existence was never established.
 */
async function getAllOpenWebViewDefinitions(): Promise<SavedWebViewDefinition[]> {
  const { definitions, unreachableWindowIds } =
    await getAllOpenWebViewDefinitionsWithReachability();
  if (unreachableWindowIds.length > 0)
    throw new Error(
      `Could not get open webview definitions: windows ${unreachableWindowIds.join(', ')} were unreachable.`,
    );
  return definitions;
}

/** @deprecated Alias for getOpenWebViewDefinition */
async function getSavedWebViewDefinition(
  webViewId: string,
): Promise<SavedWebViewDefinition | undefined> {
  return getOpenWebViewDefinition(webViewId);
}

/** @deprecated Alias for openWebView */
async function getWebView(
  webViewType: WebViewType,
  layout?: Layout,
  options?: GetWebViewOptions,
): Promise<WebViewId | undefined> {
  return openWebView(webViewType, layout, options);
}

// Network events - these are global (not per-window) because events propagate across all processes
const onDidOpenWebView = getNetworkEvent<OpenWebViewEvent>(EVENT_NAME_ON_DID_OPEN_WEB_VIEW);
const onDidUpdateWebView = getNetworkEvent<UpdateWebViewEvent>(EVENT_NAME_ON_DID_UPDATE_WEB_VIEW);
const onDidCloseWebView = getNetworkEvent<CloseWebViewEvent>(EVENT_NAME_ON_DID_CLOSE_WEB_VIEW);

/**
 * The proxy WebViewService object registered under the generic "WebViewService" name. All method
 * calls are forwarded to the focused window's scoped service.
 */
const webViewServiceProxy: WebViewServiceType = {
  onDidAddWebView: onDidOpenWebView,
  onDidOpenWebView,
  onDidUpdateWebView,
  onDidCloseWebView,
  getWebView,
  openWebView,
  reloadWebView,
  getSavedWebViewDefinition,
  getOpenWebViewDefinition,
  getAllOpenWebViewDefinitions,
  getWebViewController,
};

/**
 * Register the WebViewService proxy under the generic name so it claims the name before any
 * renderer starts. Must be called during main process startup, before createWindow().
 */
export async function startWebViewRoutingService(): Promise<void> {
  await networkObjectService.set<WebViewServiceType>(
    NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE,
    webViewServiceProxy,
  );
  logger.info('WebViewService routing proxy registered');
}
