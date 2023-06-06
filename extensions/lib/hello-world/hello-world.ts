import papi from 'papi';
import { UnsubscriberAsync } from 'shared/utils/papi-util';
import type {
  WebViewContentType,
  WebViewDefinition,
  WebViewDefinitionSerialized,
} from 'shared/data/web-view.model';
import { GreetingsDataProvider } from '@extensions/hello-someone/hello-someone';
import type { IWebViewProvider } from 'shared/models/web-view-provider.model';
// @ts-expect-error ts(1192) this file has no default export; the text is exported by rollup
import helloWorldReactWebView from './hello-world.web-view';
import helloWorldReactWebViewStyles from './hello-world.web-view.scss?inline';
// @ts-expect-error ts(1192) this file has no default export; the text is exported by rollup
import helloWorldHtmlWebView from './hello-world.web-view.ejs';

const { logger } = papi;

logger.info('Hello world is importing!');

const unsubscribers: UnsubscriberAsync[] = [];

const htmlWebViewType = 'hello-world.html';

const htmlWebViewProvider: IWebViewProvider = {
  async getWebView(
    serializedWebView: WebViewDefinitionSerialized,
  ): Promise<WebViewDefinition | undefined> {
    if (serializedWebView.webViewType !== htmlWebViewType)
      throw new Error(
        `${htmlWebViewType} provider received request to provide a ${serializedWebView.webViewType} web view`,
      );
    return {
      ...serializedWebView,
      title: 'Hello World HTML',
      contentType: 'html' as WebViewContentType.HTML,
      content: helloWorldHtmlWebView,
    };
  },
};

const reactWebViewType = 'hello-world.react';

const reactWebViewProvider: IWebViewProvider = {
  async getWebView(
    serializedWebView: WebViewDefinitionSerialized,
  ): Promise<WebViewDefinition | undefined> {
    if (serializedWebView.webViewType !== reactWebViewType)
      throw new Error(
        `${reactWebViewType} provider received request to provide a ${serializedWebView.webViewType} web view`,
      );
    return {
      ...serializedWebView,
      title: 'Hello World React',
      content: helloWorldReactWebView,
      styles: helloWorldReactWebViewStyles,
    };
  },
};

export async function activate(): Promise<UnsubscriberAsync> {
  logger.info('Hello world is activating!');

  const htmlWebViewProviderPromise = papi.webViewProviders.register(
    htmlWebViewType,
    htmlWebViewProvider,
  );

  const reactWebViewProviderPromise = papi.webViewProviders.register(
    reactWebViewType,
    reactWebViewProvider,
  );

  const unsubPromises: Promise<UnsubscriberAsync>[] = [
    papi.commands.registerCommand('hello-world.hello-world', () => {
      return 'Hello world!';
    }),
    papi.commands.registerCommand('hello-world.hello-exception', (message: string) => {
      throw new Error(`Hello World Exception! ${message}`);
    }),
  ];

  papi
    .fetch('https://bible-api.com/matthew+24:14')
    .then((res) => res.json())
    .then((scr) => logger.info(scr.text.replace(/\n/g, '')))
    .catch((e) => logger.error(`Could not get Scripture from bible-api! Reason: ${e}`));

  papi.webViews.addWebView(htmlWebViewType);

  papi.webViews.addWebView(reactWebViewType);

  const greetingsDataProvider = await papi.dataProvider.get<GreetingsDataProvider>(
    'hello-someone.greetings',
  );

  if (greetingsDataProvider) {
    // Test subscribing to a data provider
    const unsubGreetings = await greetingsDataProvider.subscribe('Bill', (billGreeting: string) =>
      logger.info(`Bill's greeting: ${billGreeting}`),
    );

    unsubscribers.push(unsubGreetings);
  }

  // For now, let's just make things easy and await the registration promises at the end so we don't hold everything else up
  const htmlWebViewProviderResolved = await htmlWebViewProviderPromise;
  const reactWebViewProviderResolved = await reactWebViewProviderPromise;

  const combinedUnsubscriber: UnsubscriberAsync = papi.util.aggregateUnsubscriberAsyncs(
    (await Promise.all(unsubPromises)).concat([
      htmlWebViewProviderResolved.dispose,
      reactWebViewProviderResolved.dispose,
    ]),
  );
  logger.info('Hello World is finished activating!');
  return combinedUnsubscriber;
}

export async function deactivate() {
  return Promise.all(unsubscribers.map((unsubscriber) => unsubscriber()));
}
