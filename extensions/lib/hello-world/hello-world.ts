import papi from 'papi';
import { UnsubscriberAsync } from 'shared/utils/papi-util';
import type { WebViewContentType } from 'shared/data/web-view.model';
import { GreetingsDataProvider } from '@extensions/hello-someone/hello-someone';
// @ts-expect-error ts(1192) this file has no default export; the text is exported by rollup
import helloWorldReactWebView from './hello-world.web-view';
import helloWorldReactWebViewStyles from './hello-world.web-view.scss?inline';
// @ts-expect-error ts(1192) this file has no default export; the text is exported by rollup
import helloWorldHtmlWebView from './hello-world.web-view.ejs';

const { logger } = papi;

logger.info('Hello world is importing!');

const unsubscribers: UnsubscriberAsync[] = [];

export async function activate() {
  logger.info('Hello world is activating!');

  const unsubPromises = [
    papi.commands.registerCommand('hello-world.hello-world', () => {
      return 'Hello world!';
    }),
    papi.commands.registerCommand('hello-world.hello-exception', (message) => {
      throw new Error(`Hello World Exception! ${message}`);
    }),
  ];

  papi
    .fetch('https://bible-api.com/matthew+24:14')
    .then((res) => res.json())
    .then((scr) => logger.info(scr.text.replace(/\n/g, '')))
    .catch((e) => logger.error(`Could not get Scripture from bible-api! Reason: ${e}`));

  papi.webViews.addWebView({
    id: 'Hello World HTML',
    title: 'Hello World HTML',
    contentType: 'html' as WebViewContentType.HTML,
    content: helloWorldHtmlWebView,
  });

  await papi.webViews.addWebView({
    id: 'Hello World React',
    title: 'Hello World React',
    content: helloWorldReactWebView,
    styles: helloWorldReactWebViewStyles,
  });

  const greetingsDataProvider = await papi.dataProvider.get<GreetingsDataProvider>(
    'hello-someone.greetings',
  );

  if (greetingsDataProvider) {
    // Test subscribing to a data provider
    const unsubGreetings = await greetingsDataProvider.subscribeGreeting('Bill', (billGreeting) =>
      logger.info(`Bill's greeting: ${billGreeting}`),
    );
    const unsubAll = await greetingsDataProvider.subscribeAll(undefined, (billGreeting) =>
      logger.info(`Bill's greeting: ${billGreeting}`),
    );

    unsubscribers.push(unsubGreetings);
  }

  return Promise.all(unsubPromises.map((unsubPromise) => unsubPromise.promise)).then(() => {
    logger.info('Hello World is finished activating!');
    return papi.util.aggregateUnsubscriberAsyncs(
      unsubPromises.map((unsubPromise) => unsubPromise.unsubscriber),
    );
  });
}

export async function deactivate() {
  return Promise.all(unsubscribers.map((unsubscriber) => unsubscriber()));
}
