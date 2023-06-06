import papi from 'papi';
import type {
  WebViewContentType,
  WebViewDefinition,
  WebViewDefinitionSerialized,
} from 'shared/data/web-view.model';
import { UnsubscriberAsync } from 'shared/utils/papi-util';
import type IDataProvider from 'shared/models/data-provider.interface';
import type { IWebViewProvider } from 'shared/models/web-view-provider.model';
import type { ExecutionActivationContext } from 'extension-host/extension-types/extension-activation-context.model';
// @ts-expect-error ts(1192) this file has no default export; the text is exported by rollup
import helloSomeoneHtmlWebView from './hello-someone.web-view.ejs';

const { logger } = papi;
logger.info('Hello Someone is importing!');

const unsubscribers: UnsubscriberAsync[] = [];

export interface GreetingsDataProvider extends IDataProvider<string, string, string> {
  testRandomMethod(things: string): Promise<string>;
}

const greetingsDataProviderEngine = {
  people: {
    bill: 'Hi, my name is Bill!',
    kathy: 'Hello. My name is Kathy.',
  } as { [name: string]: string },

  set: async (selector: string, data: string) => {
    // Don't change everyone's greeting, you heathen!
    if (selector === '*') return false;

    // If there is no change in the greeting, don't update
    if (data === greetingsDataProviderEngine.people[selector.toLowerCase()]) return false;

    // Update the greeting and send an update
    greetingsDataProviderEngine.people[selector.toLowerCase()] = data;
    return true;
  },

  async get(selector: string) {
    if (selector === '*') return this.people;
    return this.people[selector.toLowerCase()];
  },

  /** Test method to make sure people can use data providers' custom methods */
  testRandomMethod: async (things: string) => {
    const result = `Greetings data provider got testRandomMethod! ${things}`;
    logger.info(result);
    return result;
  },
};

const peopleWebViewType = 'hello-someone.people-viewer';
const peopleWebViewIdKey = 'people-web-view-id';

const peopleWebViewProvider: IWebViewProvider = {
  async getWebView(
    serializedWebView: WebViewDefinitionSerialized,
  ): Promise<WebViewDefinition | undefined> {
    if (serializedWebView.webViewType !== peopleWebViewType)
      throw new Error(
        `${peopleWebViewType} provider received request to provide a ${serializedWebView.webViewType} web view`,
      );
    return {
      ...serializedWebView,
      title: 'Hello Someone HTML',
      contentType: 'html' as WebViewContentType.HTML,
      content: helloSomeoneHtmlWebView,
    };
  },
};

export async function activate(context: ExecutionActivationContext) {
  logger.info('Hello Someone is activating!');

  const greetingsDataProviderPromise = papi.dataProvider.registerEngine(
    'hello-someone.greetings',
    greetingsDataProviderEngine,
  );

  const peopleWebViewProviderPromise = papi.webViews.registerWebViewProvider(
    peopleWebViewType,
    peopleWebViewProvider,
  );

  const unsubPromises: Promise<UnsubscriberAsync>[] = [
    papi.commands.registerCommand('hello-someone.hello-someone', (someone: string) => {
      return `Hello ${someone}!`;
    }),
    papi.commands.registerCommand(
      'hello-someone.echo-someone-renderer',
      async (message: string) => {
        return `echo-someone-renderer: ${await papi.commands.sendCommand(
          'addThree',
          2,
          4,
          6,
        )}! ${message}`;
      },
    ),
  ];

  // Get existing webview id if we previously created a webview for this type
  let existingPeopleWebViewId: string | undefined;
  try {
    existingPeopleWebViewId = await papi.storage.readUserData(
      context.executionToken,
      peopleWebViewIdKey,
    );
  } catch (e) {
    existingPeopleWebViewId = undefined;
  }

  const peopleWebViewId = await papi.webViews.addWebView(
    peopleWebViewType,
    { type: 'panel', direction: 'top' },
    { existingId: existingPeopleWebViewId },
  );

  // Save newly acquired webview id
  await papi.storage.writeUserData(
    context.executionToken,
    peopleWebViewIdKey,
    peopleWebViewId || '',
  );

  // For now, let's just make things easy and await the registration promises at the end so we don't hold everything else up
  const greetingsDataProvider = await greetingsDataProviderPromise;
  const peopleWebViewProviderResolved = await peopleWebViewProviderPromise;

  const combinedUnsubscriber: UnsubscriberAsync = papi.util.aggregateUnsubscriberAsyncs(
    (await Promise.all(unsubPromises)).concat([
      greetingsDataProvider.dispose,
      peopleWebViewProviderResolved.dispose,
    ]),
  );
  logger.info('Hello Someone is finished activating!');
  return combinedUnsubscriber;
}

export async function deactivate() {
  return Promise.all(unsubscribers.map((unsubscriber) => unsubscriber()));
}
