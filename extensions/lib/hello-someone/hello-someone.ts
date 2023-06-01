import papi from 'papi';
import type { WebViewContentType } from 'shared/data/web-view.model';
import { UnsubscriberAsync } from 'shared/utils/papi-util';
import type {
  AllGreetingsData,
  GreetingsDataMethods,
  GreetingsDataTypes,
  Person,
} from '@extensions/hello-someone/hello-someone';
import type { DataProviderUpdateInstructions } from 'shared/models/data-provider.model';
import type IDataProviderEngine from 'shared/models/data-provider-engine.model';
import type { HasNotifyUpdate } from 'shared/models/data-provider-engine.model';
// @ts-expect-error ts(1192) this file has no default export; the text is exported by rollup
import helloSomeoneHtmlWebView from './hello-someone.web-view.ejs';

const { logger } = papi;
logger.info('Hello Someone is importing!');

const unsubscribers: UnsubscriberAsync[] = [];

/**
 * Example data provider engine (defined by an object instead of a class to test the limits of registerEngine)
 * that provides information about people. `quick-verse.ts`'s data provider is defined by a class,
 * which is a better example to look at. But it is possible to use an object directly as well.
 * It has three data types:
 *  - Greeting: a person's greeting
 *  - Age: a person's age
 *  - All: information about all the people associated with this engine
 * For each data type, an engine needs a `get<data_type>` and a `set<data_type>`.
 *
 * papi will create a data provider that internally uses this engine. The data provider layers over
 * this engine and adds functionality like `subscribe<data_type>` functions with automatic updates.
 */
const greetingsDataProviderEngine: IDataProviderEngine<GreetingsDataTypes> &
  HasNotifyUpdate<GreetingsDataTypes> &
  GreetingsDataMethods & {
    people: AllGreetingsData;
    getPerson<T extends boolean = true>(
      name: string,
      createIfDoesNotExist?: T,
    ): T extends true ? Person : Person | undefined;
  } = {
  /** People that are the data this engine serves */
  people: {
    bill: { greeting: 'Hi, my name is Bill!', age: 43 },
    kathy: { greeting: 'Hello. My name is Kathy.', age: 35 },
  },

  /**
   * Get a person by name. By default, creates that person if they don't exist yet
   * @param name name of person
   * @param createIfDoesNotExist whether to create the person if they doesn't exist. Defaults to true
   * @returns person according to the provided name or undefined if they don't exist and
   * were not set to be created in this method.
   *
   * Note: this method is intentionally not named something that starts with `get` so it does not
   * get picked up by papi and considered to be a new data type. If this method were named
   * `getPerson`, papi would consider this a data type method and would fail to register this engine
   * because it would also require a `setPerson` to go along with `getPerson`. You can name it
   * anything you want that doesn't start with `get`.
   */
  getPerson<T extends boolean = true>(
    name: string,
    createIfDoesNotExist: T = true as T,
  ): T extends true ? Person : Person | undefined {
    const nameLower = name.toLowerCase();
    if (createIfDoesNotExist && !this.people[nameLower]) this.people[nameLower] = {};
    // Type assert because we know this person exists
    return this.people[nameLower] as T extends true ? Person : Person | undefined;
  },

  /**
   * Sets a person's greeting, creating the person if they do not exist.
   * @param name name of person
   * @param greeting person's new greeting
   * @returns update instructions for updating the Greeting and All data types because we want
   * subscribers to either of these data types to update based on this change.
   *
   * Note: this method gets layered over so that you can run `this.setGreeting` inside this data
   * provider engine, and it will send updates after returning.
   *
   * Note: this method is used when someone uses the `useData.Greeting` hook on the data
   * provider papi creates for this engine.
   */
  async setGreeting(
    name: string,
    greeting: string,
  ): Promise<DataProviderUpdateInstructions<GreetingsDataTypes>> {
    const person = this.getPerson(name);
    // If there is no change in the greeting, don't update
    if (greeting === person.greeting) return false;

    // Update the greeting and send an update
    person.greeting = greeting;
    // Update greetings and all because all needs to know about all changes to people
    return ['Greeting', 'All'];
  },

  /**
   * Get a person's greeting
   * @param name name of person
   * @returns person's greeting or undefined
   *
   * Note: this method is used when someone uses the `useData.Greeting` hook or the
   * `subscribeGreeting` method on the data provider papi creates for this engine.
   */
  async getGreeting(name: string) {
    return this.getPerson(name, false)?.greeting;
  },

  /**
   * Set's a person's age, creating the person if they do not exist.
   * @param name name of person
   * @param age person's new age
   * @returns update instructions for updating the Age and All data types because we want
   * subscribers to either of these data types to update based on this change.
   *
   * Note: this method gets layered over so that you can run `this.setAge` inside this data
   * provider engine, and it will send updates after returning.
   *
   * Note: this method is used when someone uses the `useData.Age` hook on the data
   * provider papi creates for this engine.
   */
  async setAge(
    name: string,
    age: number,
  ): Promise<DataProviderUpdateInstructions<GreetingsDataTypes>> {
    const person = this.getPerson(name);
    // If there is no change in the age, don't update
    if (age === person.age) return false;

    // Update the age and send an update
    person.age = age;
    // Update age and all because all needs to know about all changes to people
    return ['Age', 'All'];
  },

  /**
   * Get a person's age
   * @param name name of person
   * @returns person's age or undefined
   *
   * Note: this method is used when someone uses the `useData.Age` hook or the
   * `subscribeAge` method on the data provider papi creates for this engine.
   */
  async getAge(name: string) {
    return this.getPerson(name, false)?.age;
  },

  /**
   * Function used to notify subscribers that data updated. papi layers over this method so that you
   * can run `this.notifyUpdate` inside this data provider engine, and it will send updates after
   * running.
   *
   * @param updateInstructions information that papi uses to interpret whether to send out updates.
   * papi passes the interpreted update value into this function. For example, running
   * `this.notifyUpdate()` will call this `notifyUpdate` with `updateInstructions` of `'*'`.
   *
   * Note: this method does not have to be provided here for it to work properly because it is
   * layered over on the papi. The only thing you can do here that will affect the update is to
   * throw an error.
   */
  notifyUpdate(updateInstructions) {
    logger.info(`greetings data provider engine ran notifyUpdate! ${updateInstructions}`);
  },

  /**
   * Does nothing (meaning the All data type is read-only). This method is provided to match with
   * `getAll`.
   * @returns false meaning do not update anything
   */
  async setAll() {
    // Don't change everyone's greeting, you heathen!
    return false;
  },

  /**
   * Gets information about all people in this data provider.
   * @returns information about all people in this data provider
   */
  async getAll() {
    // WARNING: returning the object reference itself allows in-process consumers to edit this
    // object directly. Please do not do this in a real extension (deep clone it or something)
    return this.people;
  },

  /**
   * Deletes a person from this data provider.
   * @param name name of person
   * @returns true if deleted, false if did not exist
   *
   * Note: this is an example of a data provider engine custom method. It uses `notifyUpdateAll` to
   * inform subscribers that the data has changed because it is not in a `set<data_type>` function.
   */
  async deletePerson(name: string) {
    const person = this.getPerson(name, false);
    if (person) {
      logger.log(`RIP ${name}, who died tragically young at age ${person.age}. ;(`);
      delete this.people[name.toLowerCase()];
      this.notifyUpdate();
      return true;
    }
    return false;
  },

  /** Test method to make sure people can use data provider engines' custom methods */
  testRandomMethod: async (things: string) => {
    const result = `Greetings data provider got testRandomMethod! ${things}`;
    logger.info(result);
    return result;
  },
};
papi.dataProvider.decorators.ignore(greetingsDataProviderEngine.getPerson);

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
