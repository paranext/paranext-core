import { GetWebViewOptions, WebViewId, WebViewType } from '@shared/models/web-view.model';
import { AddWebViewEvent, Layout } from '@shared/models/docking-framework.model';
import { PapiEvent } from '@shared/models/papi-event.model';
import { serializeRequestType } from '@shared/utils/papi-util';

/**
 * JSDOC SOURCE papiWebViewService
 *
 * Service exposing various functions related to using webViews
 *
 * WebViews are iframes in the Platform.Bible UI into which extensions load frontend code, either
 * HTML or React components.
 */
export interface WebViewServiceType {
  /** Event that emits with webView info when a webView is added */
  onDidAddWebView: PapiEvent<AddWebViewEvent>;

  /**
   * Creates a new web view or gets an existing one depending on if you request an existing one and
   * if the web view provider decides to give that existing one to you (it is up to the provider).
   *
   * @param webViewType Type of WebView to create
   * @param layout Information about where you want the web view to go. Defaults to adding as a tab
   * @param options Options that affect what this function does. For example, you can provide an
   *   existing web view ID to request an existing web view with that ID.
   * @returns Promise that resolves to the ID of the webview we got or undefined if the provider did
   *   not create a WebView for this request.
   * @throws If something went wrong like the provider for the webViewType was not found
   */
  getWebView: (
    webViewType: WebViewType,
    layout?: Layout,
    options?: GetWebViewOptions,
  ) => Promise<WebViewId | undefined>;
}

/** Prefix on requests that indicates that the request is related to webView operations */
const CATEGORY_WEB_VIEW = 'webView';

/** Name to use when creating a network event that is fired when webViews are created */
export const EVENT_NAME_ON_DID_ADD_WEB_VIEW = serializeRequestType(
  CATEGORY_WEB_VIEW,
  'onDidAddWebView',
);

export const NETWORK_OBJECT_NAME_WEB_VIEW_SERVICE = 'WebViewService';
