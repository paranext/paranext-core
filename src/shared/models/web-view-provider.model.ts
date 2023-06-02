import { WebViewContents, WebViewContentsSerialized } from '@shared/data/web-view.model';
import {
  DisposableNetworkObject,
  NetworkObject,
  NetworkableObject,
} from '@shared/models/network-object.model';
import { CanHaveOnDidDispose } from '@shared/models/disposal.model';

// What the developer registers
export interface IWebViewProvider extends NetworkableObject {
  deserialize(serializedWebView: WebViewContentsSerialized): Promise<WebViewContents>;
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
