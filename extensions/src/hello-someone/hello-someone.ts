import papi from 'papi-backend';
import type { ExecutionActivationContext } from 'extension-host/extension-types/extension-activation-context.model';
import type {
  WebViewContentType,
  WebViewDefinition,
  SavedWebViewDefinition,
} from 'shared/data/web-view.model';
import type { PeopleData, PeopleDataMethods, PeopleDataTypes, Person } from 'hello-someone';
import type { DataProviderUpdateInstructions } from 'shared/models/data-provider.model';
import type IDataProviderEngine from 'shared/models/data-provider-engine.model';
import type { WithNotifyUpdate } from 'shared/models/data-provider-engine.model';
import type { IWebViewProvider } from 'shared/models/web-view-provider.model';
import helloSomeoneHtmlWebView from './hello-someone.web-view.html?inline';

const { logger } = papi;
logger.info('Hello Someone is importing!');

/**
 * Example data provider engine that provides information about people.
 *
 * It has three data types:
 *  - Greeting: a person's greeting
 *  - Age: a person's age
 *  - People: information about all the people associated with this engine
 *
 * For each data type, an engine needs a `get<data_type>` and a `set<data_type>`.
 *
 * papi will create a data provider that internally uses this engine. The data provider layers over
 * this engine and adds functionality like `subscribe<data_type>` functions with automatic updates.
 *
 * This data provider engine is defined by an object, which we recommend starting with to get
 * comfortable with the data provider api because of the following pros and cons:
 *  - Pros
 *    - Intellisense works better (Ctrl+Space lists methods you need to implement)
 *    - Function parameter and return types are inferred - no need to specify types
 *  - Cons
 *    - Must specify all properties and methods in the object type
 *    - papi.dataProvider.decorators.ignore is difficult to apply to tell papi to ignore methods
 *    - When using `this.notifyUpdate`, you must include the `WithNotifyUpdate` type and provide a
 *      placeholder `notifyUpdate` method
 *
 * If you would like more advanced functionality, you can alternatively define a data provider
 * engine with a class. An example of this is found in `quick-verse.ts`.
 */
const peopleDataProviderEngine: IDataProviderEngine<PeopleDataTypes> &
  WithNotifyUpdate<PeopleDataTypes> &
  PeopleDataMethods & {
    people: PeopleData;
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
   * @param createIfDoesNotExist whether to create the person if they don't exist. Defaults to true
   * @returns person according to the provided name or undefined if they don't exist and
   * were not set to be created in this method.
   *
   * Note: this method is named `getPerson`, which would normally mean papi would consider it to be
   * a data type method and would fail to use this engine because it would expect a `setPerson` as
   * well. However, we added the `ignore` decorator (the line immediately after defining this
   * peopleDataProviderEngine object), so papi will not pick it up. Alternatively, you can name
   * it anything that doesn't start with `get` like `_getPerson` or `internalGetPerson`.
   */
  getPerson<T extends boolean = true>(
    name: string,
    // TODO: I don't actually know why this of type T rather than just a boolean?
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    createIfDoesNotExist: T = true as T,
  ): T extends true ? Person : Person | undefined {
    const nameLower = name.toLowerCase();
    if (createIfDoesNotExist && !this.people[nameLower]) this.people[nameLower] = {};
    // Type assert because we know this person exists
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    return this.people[nameLower] as T extends true ? Person : Person | undefined;
  },

  /**
   * Sets a person's greeting, creating the person if they do not exist.
   * @param name name of person
   * @param greeting person's new greeting
   * @returns update instructions for updating the Greeting and People data types because we want
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
  ): Promise<DataProviderUpdateInstructions<PeopleDataTypes>> {
    const person = this.getPerson(name);
    // If there is no change in the greeting, don't update
    if (greeting === person.greeting) return false;

    // Update the greeting and send an update
    person.greeting = greeting;
    // Update greetings and People because People needs to know about all changes to people
    return ['Greeting', 'People'];
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
   * @returns update instructions for updating the Age and People data types because we want
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
  ): Promise<DataProviderUpdateInstructions<PeopleDataTypes>> {
    const person = this.getPerson(name);
    // If there is no change in the age, don't update
    if (age === person.age) return false;

    // Update the age and send an update
    person.age = age;
    // Update age and People because People needs to know about all changes to people
    return ['Age', 'People'];
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
    logger.info(`people data provider engine ran notifyUpdate! ${updateInstructions}`);
  },

  /**
   * Does nothing (meaning the People data type is read-only). This method is provided to match with
   * `getPeople`.
   * @returns false meaning do not update anything
   */
  async setPeople() {
    // Don't change everyone's greeting, you heathen!
    return false;
  },

  /**
   * Gets information about all people in this data provider.
   * @returns information about all people in this data provider
   */
  async getPeople() {
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
      logger.info(`RIP ${name}, who died tragically young at age ${person.age}. ;(`);
      delete this.people[name.toLowerCase()];
      this.notifyUpdate();
      return true;
    }
    return false;
  },

  /** Test method to make sure people can use data provider engines' custom methods */
  testRandomMethod: async (things: string) => {
    const result = `People data provider got testRandomMethod! ${things}`;
    logger.info(result);
    return result;
  },
};
papi.dataProvider.decorators.ignore(peopleDataProviderEngine.getPerson);

const peopleWebViewType = 'helloSomeone.peopleViewer';
const peopleWebViewIdKey = 'peopleWebViewId';

/**
 * Simple web view provider that provides People web views when papi requests them
 */
const peopleWebViewProvider: IWebViewProvider = {
  async getWebView(savedWebView: SavedWebViewDefinition): Promise<WebViewDefinition | undefined> {
    if (savedWebView.webViewType !== peopleWebViewType)
      throw new Error(
        `${peopleWebViewType} provider received request to provide a ${savedWebView.webViewType} web view`,
      );
    return {
      ...savedWebView,
      title: 'People',
      // Can't use the enum value from a definition file so assert the type from the string literal.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      contentType: 'html' as WebViewContentType.HTML,
      content: helloSomeoneHtmlWebView,
    };
  },
};

export async function activate(context: ExecutionActivationContext): Promise<void> {
  logger.info('Hello Someone is activating!');

  const peopleDataProviderPromise = papi.dataProvider.registerEngine<PeopleDataTypes>(
    'helloSomeone.people',
    peopleDataProviderEngine,
  );

  const peopleWebViewProviderPromise = papi.webViewProviders.register(
    peopleWebViewType,
    peopleWebViewProvider,
  );

  const helloSomeoneCommandPromise = papi.commands.registerCommand(
    'helloSomeone.helloSomeone',
    (name: string) => {
      return `Hello ${name}!`;
    },
  );

  const echoSomeoneRendererPromise = papi.commands.registerCommand(
    'helloSomeone.echoSomeoneRenderer',
    async (message: string) => {
      return `echoSomeoneRenderer: ${await papi.commands.sendCommand(
        'test.addThree',
        2,
        4,
        6,
      )}! ${message}`;
    },
  );

  // Create a webview or get the existing webview if ours already exists
  // Note: here, we are storing a created webview's id when we create it, and using that id on
  // `existingId` to look specifically for the webview that we previously created if we have ever
  // created one in a previous session. This means that, if someone else creates a people web view,
  // it will be distinct from this one. We are creating our own web view here. See `hello-world.ts`
  // for an example of getting any webview with the specified `webViewType`

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

  // Get the existing web view if one exists or create a new one
  const peopleWebViewId = await papi.webViews.getWebView(
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

  // Await the registration promises at the end so we don't hold everything else up
  context.registrations.add(
    await peopleDataProviderPromise,
    await peopleWebViewProviderPromise,
    await helloSomeoneCommandPromise,
    await echoSomeoneRendererPromise,
    papi.webViews.onDidAddWebView((addWebViewEvent) => {
      if (addWebViewEvent.webView.webViewType === peopleWebViewType)
        logger.info(
          `We noticed a ${peopleWebViewType} webView was added with id ${addWebViewEvent.webView.id}`,
        );
    }),
  );

  logger.info('Hello Someone is finished activating!');
}
