import {
  AddWebViewOptions,
  WebViewDefinition,
  WebViewDefinitionSerialized,
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
   * @param serializedWebView filled out if an existing webview is being called for (matched by id).
   * Just id if this is a new request or if the web view with the existing id was not found
   * @param addWebViewOptions
   */
  getWebView(
    serializedWebView: WebViewDefinitionSerialized,
    addWebViewOptions: AddWebViewOptions,
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
