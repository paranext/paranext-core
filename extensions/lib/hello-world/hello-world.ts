import papi from 'papi-backend';
import { UnsubscriberAsync } from 'shared/utils/papi-util';
import type {
  WebViewContentType,
  WebViewDefinition,
  SavedWebViewDefinition,
} from 'shared/data/web-view.model';
import type { PeopleDataProvider } from 'hello-someone';
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

/**
 * Simple web view provider that provides sample html web views when papi requests them
 */
const htmlWebViewProvider: IWebViewProvider = {
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== htmlWebViewType)
      throw new Error(
        `${htmlWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );
    return {
      ...savedWebView,
      title: 'Hello World HTML',
      contentType: 'html' as WebViewContentType.HTML,
      content: helloWorldHtmlWebView,
    };
  },
};

const reactWebViewType = 'hello-world.react';

/**
 * Simple web view provider that provides React web views when papi requests them
 */
const reactWebViewProvider: IWebViewProvider = {
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== reactWebViewType)
      throw new Error(
        `${reactWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );
    return {
      ...savedWebView,
      title: 'Hello World React',
      content: helloWorldReactWebView,
      styles: helloWorldReactWebViewStyles,
    };
  },
};

/** Simple function to return hello world. Registered as a command handler */
function helloWorld() {
  return 'Hello world!';
}

/** Simple function to throw a customized exception. Registered as a command handler */
function helloException(message: string) {
  throw new Error(`Hello World Exception! ${message}`);
}

export async function activate(): Promise<UnsubscriberAsync> {
  logger.info('Hello world is activating!');

  const htmlWebViewProviderPromise = papi.webViews.registerWebViewProvider(
    htmlWebViewType,
    htmlWebViewProvider,
  );

  const reactWebViewProviderPromise = papi.webViews.registerWebViewProvider(
    reactWebViewType,
    reactWebViewProvider,
  );

  const unsubPromises: Promise<UnsubscriberAsync>[] = [
    papi.commands.registerCommand('helloWorld.helloWorld', helloWorld),
    papi.commands.registerCommand('helloWorld.helloException', helloException),
  ];

  papi
    .fetch('https://www.example.com')
    .catch((e) => logger.error(`Could not get data from example.com! Reason: ${e}`));

  // Create webviews or get an existing webview if one already exists for this type
  // Note: here, we are using `existingId: '?'` to indicate we do not want to create a new webview
  // if one already exists. The webview that already exists could have been created by anyone
  // anywhere; it just has to match `webViewType`. See `hello-someone.ts` for an example of keeping
  // an existing webview that was specifically created by `hello-someone`.
  papi.webViews.getWebView(htmlWebViewType, undefined, { existingId: '?' });
  papi.webViews.getWebView(reactWebViewType, undefined, { existingId: '?' });

  const peopleDataProvider = await papi.dataProvider.get<PeopleDataProvider>(
    'hello-someone.people',
  );

  if (peopleDataProvider) {
    // Test subscribing to a data provider
    const unsubGreetings = await peopleDataProvider.subscribeGreeting(
      'Bill',
      (billGreeting: string | undefined) => logger.info(`Bill's greeting: ${billGreeting}`),
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
