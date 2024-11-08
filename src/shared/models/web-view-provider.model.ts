import {
  GetWebViewOptions,
  WebViewDefinition,
  SavedWebViewDefinition,
} from '@shared/models/web-view.model';
import {
  DisposableNetworkObject,
  NetworkObject,
  NetworkableObject,
} from '@shared/models/network-object.model';
// Used in JSDocs
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { WebViewFactory } from '@shared/models/web-view-factory.model';
// Used in JSDocs
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { WebViewControllers } from 'papi-shared-types';

/**
 * An object associated with a specific `webViewType` that provides a {@link WebViewDefinition} when
 * the PAPI wants to open a web view with that `webViewType`. An extension registers a web view
 * provider with `papi.webViewProviders.register`.
 *
 * Web View Providers provide the contents of all web views in Platform.Bible.
 *
 * If you want to provide {@link WebViewControllers} to facilitate interaction between your web views
 * and extensions, you can extend the abstract class {@link WebViewFactory} to make the process
 * easier. Alternatively, if you want to manage web view controllers manually, you can register them
 * in {@link IWebViewProvider.getWebView}.
 */
export interface IWebViewProvider extends NetworkableObject {
  /**
   * Receives a {@link SavedWebViewDefinition} and fills it out into a full {@link WebViewDefinition},
   * providing the contents of the web view and other properties that are important for displaying
   * the web view.
   *
   * The PAPI calls this method as part of opening a new web view or (re)loading an existing web
   * view. If you want to create {@link WebViewControllers} for the web views the PAPI creates from
   * this method, you should register it using `papi.webViewProviders.registerWebViewController`
   * before returning from this method (resolving the returned promise). The {@link WebViewFactory}
   * abstract class handles this for you, so please consider extending it.
   *
   * @param savedWebViewDefinition The saved web view information from which to build a complete web
   *   view definition. Filled out with all {@link SavedWebViewDefinition} properties of the existing
   *   web view if an existing webview is being called for (matched by ID). Just provides the
   *   minimal properties required on {@link SavedWebViewDefinition} if this is a new request or if
   *   the web view with the existing ID was not found.
   * @param getWebViewOptions Various options that affect what calling `papi.webViews.openWebView`
   *   should do. When options are passed to `papi.webViews.openWebView`, some defaults are set up
   *   on the options, then those options are passed directly through to this method. That way, if
   *   you want to adjust what this method does based on the contents of the options passed to
   *   `papi.WebViews.openWebView`, you can. You can even read other properties on these options if
   *   someone passes options with other properties to `papi.webViews.openWebView`.
   */
  getWebView(
    savedWebViewDefinition: SavedWebViewDefinition,
    getWebViewOptions: GetWebViewOptions,
  ): Promise<WebViewDefinition | undefined>;
}

/**
 * A web view provider that has been registered with the PAPI.
 *
 * This is what the papi gives on `webViewProviderService.get` (not exposed on the PAPI). Basically
 * a layer over NetworkObject
 *
 * This type is internal to core and is not used by extensions
 */
export interface IRegisteredWebViewProvider extends NetworkObject<IWebViewProvider> {}

/**
 * A web view provider that has been registered with the PAPI and returned to the extension that
 * registered it. It is able to be disposed with `dispose`.
 *
 * The PAPI returns this type from `papi.webViewProviders.register`.
 */
export interface IDisposableWebViewProvider extends DisposableNetworkObject<IWebViewProvider> {}
