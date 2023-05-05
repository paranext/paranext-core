import papi from 'papi';
import type { WebViewContentType } from 'shared/data/web-view.model';
import { UnsubscriberAsync } from 'shared/utils/papi-util';
import type IDataProvider from 'shared/models/data-provider.interface';
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

export async function activate() {
  logger.info('Hello Someone is activating!');

  const greetingsDataProviderPromise = papi.dataProvider.registerEngine(
    'hello-someone.greetings',
    greetingsDataProviderEngine,
  );

  await papi.webViews.addWebView(
    {
      id: 'Hello Someone',
      title: 'Hello Someone HTML',
      contentType: 'html' as WebViewContentType.HTML,
      content: helloSomeoneHtmlWebView,
    },
    { type: 'float', floatSize: { width: 320, height: 230 } },
  );

  const unsubPromises = [
    papi.commands.registerCommand('hello-someone.hello-someone', (someone) => {
      return `Hello ${someone}!`;
    }),
    papi.commands.registerCommand('hello-someone.echo-someone-renderer', async (message) => {
      return `echo-someone-renderer: ${await papi.commands.sendCommand(
        'addThree',
        2,
        4,
        6,
      )}! ${message}`;
    }),
  ];

  // For now, let's just make things easy and await the data provider promise at the end so we don't hold everything else up
  const greetingsDataProvider = await greetingsDataProviderPromise;

  return Promise.all(unsubPromises.map((unsubPromise) => unsubPromise.promise)).then(() => {
    logger.info('Hello Someone is finished activating!');
    return papi.util.aggregateUnsubscriberAsyncs(
      unsubPromises
        .map((unsubPromise) => unsubPromise.unsubscriber)
        .concat([greetingsDataProvider.dispose]),
    );
  });
}

export async function deactivate() {
  return Promise.all(unsubscribers.map((unsubscriber) => unsubscriber()));
}
