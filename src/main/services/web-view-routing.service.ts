/**
 * Proxy service that registers under the generic "WebViewService" network object name and routes
 * calls to the focused window's scoped WebViewService (e.g. "WebViewService-1"). This enables
 * multi-window support by ensuring that operations like openWebView execute in the correct window.
 */

import { BrowserWindow } from 'electron';
import { getTargetWindowId } from '@main/services/window-state.service';
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
  const targetId = getTargetWindowId();
  if (targetId === undefined) throw new Error('No windows available to route WebViewService call');
  const svc = await getScopedWebViewService(targetId);
  if (!svc)
    throw new Error(
      `WebViewService for window ${targetId} is not available. The renderer may not have started yet.`,
    );
  return svc;
}

/** Get all window IDs that currently have open BrowserWindows. */
function getAllWindowIds(): number[] {
  return BrowserWindow.getAllWindows().map((w) => w.id);
}

// Proxy methods that route to the focused window's scoped WebViewService

async function openWebView(
  webViewType: WebViewType,
  layout?: Layout,
  options?: OpenWebViewOptions,
): Promise<WebViewId | undefined> {
  const svc = await getTargetWebViewService();
  return svc.openWebView(webViewType, layout, options);
}

async function reloadWebView(
  webViewType: WebViewType,
  webViewId: WebViewId,
  options?: ReloadWebViewOptions,
): Promise<WebViewId | undefined> {
  const svc = await getTargetWebViewService();
  return svc.reloadWebView(webViewType, webViewId, options);
}

async function getOpenWebViewDefinition(
  webViewId: string,
): Promise<SavedWebViewDefinition | undefined> {
  // Query all windows in parallel to find which one owns this webview
  const windowIds = getAllWindowIds();
  const results = await Promise.all(
    windowIds.map(async (winId) => {
      const svc = await getScopedWebViewService(winId);
      if (!svc) return undefined;
      return svc.getOpenWebViewDefinition(webViewId);
    }),
  );
  return results.find((def) => def !== undefined);
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
