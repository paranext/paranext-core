import papi from 'papi';
import { UnsubscriberAsync } from 'shared/utils/papi-util';
import type { WebViewContentType } from 'shared/data/web-view.model';
import { PeopleDataProvider } from '@extensions/hello-someone/hello-someone';
// @ts-expect-error ts(1192) this file has no default export; the text is exported by rollup
import helloWorldReactWebView from './hello-world.web-view';
import helloWorldReactWebViewStyles from './hello-world.web-view.scss?inline';
// @ts-expect-error ts(1192) this file has no default export; the text is exported by rollup
import helloWorldHtmlWebView from './hello-world.web-view.ejs';

const { logger } = papi;

logger.info('Hello world is importing!');

const unsubscribers: UnsubscriberAsync[] = [];

export async function activate(): Promise<UnsubscriberAsync> {
  logger.info('Hello world is activating!');

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

  const combinedUnsubscriber: UnsubscriberAsync = papi.util.aggregateUnsubscriberAsyncs(
    await Promise.all(unsubPromises),
  );
  logger.info('Hello World is finished activating!');
  return combinedUnsubscriber;
}

export async function deactivate() {
  return Promise.all(unsubscribers.map((unsubscriber) => unsubscriber()));
}
