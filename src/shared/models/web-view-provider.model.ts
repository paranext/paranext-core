import {
  GetWebViewOptions,
  WebViewDefinition,
  SavedWebViewDefinition,
} from '@shared/data/web-view.model';
import {
  DisposableNetworkObject,
  NetworkObject,
  NetworkableObject,
} from '@shared/models/network-object.model';
import { CanHaveOnDidDispose } from '@shared/models/disposal.model';

// What the developer registers
export interface IWebViewProvider extends NetworkableObject {
  /**
   * @param savedWebView Filled out if an existing webview is being called for (matched by ID). Just
   *   ID if this is a new request or if the web view with the existing ID was not found
   * @param getWebViewOptions
   */
  getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: GetWebViewOptions,
  ): Promise<WebViewDefinition | undefined>;
}

// What the papi gives on get. Basically a layer over NetworkObject
export interface WebViewProvider
  extends NetworkObject<NetworkableObject>,
    CanHaveOnDidDispose<IWebViewProvider> {}

// What the papi returns on register. Basically a layer over DisposableNetworkObject
export interface DisposableWebViewProvider
  extends DisposableNetworkObject<NetworkableObject>,
    // Need to omit dispose here because it is optional on WebViewProvider but is required on DisposableNetworkObject
    Omit<WebViewProvider, 'dispose'> {}
