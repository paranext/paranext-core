import papi from 'papi';
import type { WebViewContentType } from 'shared/data/web-view.model';
import { UnsubscriberAsync } from 'shared/utils/papi-util';
import { AllGreetingsData, GreetingsDataTypes } from '@extensions/hello-someone/hello-someone';
import type { DataProviderUpdateInstructions } from 'shared/models/data-provider.model';
// @ts-expect-error ts(1192) this file has no default export; the text is exported by rollup
import helloSomeoneHtmlWebView from './hello-someone.web-view.ejs';

const { logger } = papi;
logger.info('Hello Someone is importing!');

const unsubscribers: UnsubscriberAsync[] = [];

// ensurePersonExists doesn't make TypeScript understand, so just assert where appropriate
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const greetingsDataProviderEngine = {
  people: {
    bill: { greeting: 'Hi, my name is Bill!', age: 43 },
    kathy: { greeting: 'Hello. My name is Kathy.', age: 35 },
  } as AllGreetingsData,

  ensurePersonExists(name: string) {
    if (!this.people[name.toLowerCase()]) this.people[name.toLowerCase()] = {};
  },

  async setGreeting(
    name: string,
    greeting: string,
  ): Promise<DataProviderUpdateInstructions<GreetingsDataTypes>> {
    this.ensurePersonExists(name);
    // If there is no change in the greeting, don't update
    if (greeting === this.people[name.toLowerCase()]!.greeting) return false;

    // Update the greeting and send an update
    this.people[name.toLowerCase()]!.greeting = greeting;
    // Update greetings and all because all needs to know about all changes to people
    return ['Greeting', 'All'];
  },

  async getGreeting(name: string) {
    return this.people[name.toLowerCase()]?.greeting;
  },

  async setAge(
    name: string,
    age: number,
  ): Promise<DataProviderUpdateInstructions<GreetingsDataTypes>> {
    this.ensurePersonExists(name);
    // If there is no change in the age, don't update
    if (age === this.people[name.toLowerCase()]!.age) return false;

    // Update the age and send an update
    this.people[name.toLowerCase()]!.age = age;
    // Update age and all because all needs to know about all changes to people
    return ['Age', 'All'];
  },

  async getAge(name: string) {
    return this.people[name.toLowerCase()]?.age;
  },

  async setAll() {
    // Don't change everyone's greeting, you heathen!
    return false;
  },

  async getAll() {
    // WARNING: returning the object reference itself allows in-process consumers to edit this
    // object directly. Please do not do this in a real extension (deep clone it or something)
    return this.people;
  },

  /** Test method to make sure people can use data providers' custom methods */
  testRandomMethod: async (things: string) => {
    const result = `Greetings data provider got testRandomMethod! ${things}`;
    logger.info(result);
    return result;
  },
};
/* eslint-enable */

export async function activate() {
  logger.info('Hello Someone is activating!');

  const greetingsDataProviderPromise = papi.dataProvider.registerEngine<GreetingsDataTypes>(
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
    { type: 'panel', direction: 'top' },
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

  // For now, let's just make things easy and await the data provider promise at the end so we don't hold everything else up
  const greetingsDataProvider = await greetingsDataProviderPromise;

  const combinedUnsubscriber: UnsubscriberAsync = papi.util.aggregateUnsubscriberAsyncs(
    (await Promise.all(unsubPromises)).concat([greetingsDataProvider.dispose]),
  );
  logger.info('Hello Someone is finished activating!');
  return combinedUnsubscriber;
}

export async function deactivate() {
  return Promise.all(unsubscribers.map((unsubscriber) => unsubscriber()));
}
