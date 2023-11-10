import papi, { logger } from 'papi-backend';
import type { ExecutionActivationContext } from 'extension-host/extension-types/extension-activation-context.model';
import type {
  WebViewContentType,
  WebViewDefinition,
  SavedWebViewDefinition,
} from 'shared/data/web-view.model';
import type { IWebViewProvider } from 'shared/models/web-view-provider.model';
import type PapiEventEmitter from 'shared/models/papi-event-emitter.model';
import type { HelloWorldEvent } from 'hello-world';
import helloWorldReactWebView from './web-views/hello-world.web-view?inline';
import helloWorldReactWebViewStyles from './web-views/hello-world.web-view.scss?inline';
import helloWorldReactWebView2 from './web-views/hello-world-2.web-view?inline';
import helloWorldReactWebView2Styles from './web-views/hello-world-2.web-view.scss?inline';
import helloWorldHtmlWebView from './web-views/hello-world.web-view.html?inline';

type IWebViewProviderWithType = IWebViewProvider & { webViewType: string };

logger.info('Hello world is importing!');

/** Simple web view provider that provides sample html web views when papi requests them */
const htmlWebViewProvider: IWebViewProviderWithType = {
  webViewType: 'helloWorld.html',
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== this.webViewType)
      throw new Error(
        `${this.webViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );
    return {
      ...savedWebView,
      title: 'Hello World HTML',
      // Can't use the enum value from a definition file so assert the type from the string literal.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      contentType: 'html' as WebViewContentType.HTML,
      content: helloWorldHtmlWebView,
    };
  },
};

/** Simple web view provider that provides React web views when papi requests them */
const reactWebViewProvider: IWebViewProviderWithType = {
  webViewType: 'helloWorld.react',
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== this.webViewType)
      throw new Error(
        `${this.webViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );
    return {
      iconUrl: 'papi-extension://hello-world/assets/offline.svg',
      title: 'Hello World React',
      ...savedWebView,
      content: helloWorldReactWebView,
      styles: helloWorldReactWebViewStyles,
      state: {
        ...savedWebView.state,
        clicks: Math.floor(Math.random() * 100),
      },
    };
  },
};

/** Simple web view provider that provides other React web views when papi requests them */
const reactWebView2Provider: IWebViewProviderWithType = {
  webViewType: 'helloWorld.react2',
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== this.webViewType)
      throw new Error(
        `${this.webViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );
    return {
      ...savedWebView,
      title: 'Hello World React 2',
      content: helloWorldReactWebView2,
      styles: helloWorldReactWebView2Styles,
    };
  },
};

/** Number of times the `helloWorld` function has been called */
let helloWorldCount = 0;
/** Emitter to inform subscribers when `helloWorld` is called */
let onHelloWorldEmitter: PapiEventEmitter<HelloWorldEvent>;
const onHelloWorldEventType = 'helloWorld.onHelloWorld';

/**
 * Simple function to return hello world. Registered as a command handler.
 *
 * Also counts up how many times anyone has called this function and sends events notifying
 * subscribers when someone has called this function.
 */
function helloWorld() {
  helloWorldCount += 1;
  onHelloWorldEmitter?.emit({ times: helloWorldCount });
  return 'Hello world!';
}

/** Simple function to throw a customized exception. Registered as a command handler */
function helloException(message: string) {
  throw new Error(`Hello World Exception! ${message}`);
}

export async function activate(context: ExecutionActivationContext): Promise<void> {
  logger.info('Hello world is activating!');

  const htmlWebViewProviderPromise = papi.webViewProviders.register(
    htmlWebViewProvider.webViewType,
    htmlWebViewProvider,
  );

  const reactWebViewProviderPromise = papi.webViewProviders.register(
    reactWebViewProvider.webViewType,
    reactWebViewProvider,
  );

  const reactWebView2ProviderPromise = papi.webViewProviders.register(
    reactWebView2Provider.webViewType,
    reactWebView2Provider,
  );

  onHelloWorldEmitter =
    papi.network.createNetworkEventEmitter<HelloWorldEvent>(onHelloWorldEventType);

  const helloWorldPromise = papi.commands.registerCommand('helloWorld.helloWorld', helloWorld);

  const helloExceptionPromise = papi.commands.registerCommand(
    'helloWorld.helloException',
    helloException,
  );

  papi
    .fetch('https://www.example.com')
    .catch((e) => logger.error(`Could not get data from example.com! Reason: ${e}`));

  // Create webviews or get an existing webview if one already exists for this type
  // Note: here, we are using `existingId: '?'` to indicate we do not want to create a new webview
  // if one already exists. The webview that already exists could have been created by anyone
  // anywhere; it just has to match `webViewType`. See `hello-someone.ts` for an example of keeping
  // an existing webview that was specifically created by `hello-someone`.
  papi.webViews.getWebView(htmlWebViewProvider.webViewType, undefined, { existingId: '?' });
  papi.webViews.getWebView(reactWebViewProvider.webViewType, undefined, { existingId: '?' });
  papi.webViews.getWebView(reactWebView2Provider.webViewType, undefined, { existingId: '?' });

  const peopleDataProvider = await papi.dataProvider.get('helloSomeone.people');

  if (peopleDataProvider) {
    // Test subscribing to a data provider
    const unsubGreetings = await peopleDataProvider.subscribeGreeting(
      'Bill',
      (billGreeting: string | undefined) => logger.info(`Bill's greeting: ${billGreeting}`),
    );

    context.registrations.add(unsubGreetings);
  }

  // Await the registration promises at the end so we don't hold everything else up
  context.registrations.add(
    await htmlWebViewProviderPromise,
    await reactWebViewProviderPromise,
    await reactWebView2ProviderPromise,
    onHelloWorldEmitter,
    await helloWorldPromise,
    await helloExceptionPromise,
  );

  logger.info('Hello World is finished activating!');
}
