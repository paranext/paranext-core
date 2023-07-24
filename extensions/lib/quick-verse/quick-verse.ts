import { VerseRef } from '@sillsdev/scripture';
import papi from 'papi-backend';
import type { ExecutionToken } from 'node/models/execution-token.model';
import type IDataProviderEngine from 'shared/models/data-provider-engine.model';
import { UnsubscriberAsync } from 'shared/utils/papi-util';
import type { ExecutionActivationContext } from 'extension-host/extension-types/extension-activation-context.model';
import type { QuickVerseDataTypes, QuickVerseSetData } from 'quick-verse';
import type { DataProviderUpdateInstructions } from 'shared/models/data-provider.model';
import type { UsfmDataProvider } from 'usfm-data-provider';

const {
  logger,
  dataProvider: { DataProviderEngine },
} = papi;

logger.info('Quick Verse is importing!');

const unsubscribers: UnsubscriberAsync[] = [];

/**
 * Example data provider engine that provides easy access to Scripture from an internet API.
 *
 * It has three data types:
 *  - Verse: get a portion of Scripture by its reference. You can also change the Scripture at a
 *    reference, but you have to clarify that you are heretical because you really shouldn't change
 *    published Scriptures like this ;)
 *  - Heresy: get or set Scripture freely. It automatically marks the verse as heretical if changed
 *  - Chapter: get a whole chapter of Scripture by book name and chapter number. Read-only
 *    - This data type is provided to demonstrate a more complex selector - an array of typed
 *      values. This is one way to make a `get<data_type>` function that feels more like a normal
 *      function that has "multiple" parameters in its selector.
 *
 * For each data type, an engine needs a `get<data_type>` and a `set<data_type>`.
 *
 * papi will create a data provider that internally uses this engine. The data provider layers over
 * this engine and adds functionality like `subscribe<data_type>` functions with automatic updates.
 *
 * This data provider engine is defined by a class, which we recommend trying once you get
 * comfortable with the data provider api because of the following pros and cons:
 *  - Pros
 *    - Can freely add properties and methods without specifying them in an extra type
 *    - Can use private methods (prefix with `#`) that are automatically ignored by papi
 *    - Can use @papi.dataProvider.decorators.ignore to tell papi to ignore methods
 *    - Can extend `DataProviderEngine` so TypeScript will understand you can call
 * `this.notifyUpdate` without specifying a `notifyUpdate` function
 *    - Can easily create multiple data providers from the same engine if you have two independent
 *      sets of data or something
 *  - Cons
 *    - Intellisense does not tell you all the `set<data_type>` and `get<data_type>` methods you
 *      need to provide, so it is slightly more challenging to use. However, TypeScript still shows
 *      an error unless you have the right methods.
 *    - You must specify parameter and return types. They are not inferred
 *
 * If you would like better Intellisense support to get familiar with the api, you can alternatively
 * define a data provider engine with an object. An example of this is found in `hello-someone.ts`.
 */
class QuickVerseDataProviderEngine
  extends DataProviderEngine<QuickVerseDataTypes>
  implements IDataProviderEngine<QuickVerseDataTypes>
{
  /**
   * Verses stored by the Data Provider.
   * Keys are Scripture References.
   * Values are { text: '<verse_text>', isChanged?: boolean }
   */
  verses: { [scrRef: string]: { text: string; isChanged?: boolean } } = {};

  /** Latest updated verse reference */
  latestVerseRef = 'JHN 11:35';

  usfmDataProviderPromise = papi.dataProvider.get<UsfmDataProvider>('usfm');

  /** Number of times any verse has been modified by a user this session */
  heresyCount = 0;

  /** @param heresyWarning string to prefix heretical data */
  constructor(public heresyWarning: string) {
    // `DataProviderEngine`'s constructor currently does nothing, but TypeScript requires that we
    // call it.
    super();

    this.heresyWarning = this.heresyWarning ?? 'heresyCount =';
  }

  /**
   * Internal set method that doesn't send updates so we can update how we want from setVerse and
   * setHeresy
   * @param selector string Scripture reference
   * @param data Verse string, and you must inform us that you are a heretic
   * @returns '*' - update instructions for updating all data types because we want
   * subscribers to Verse and Heresy data types to update based on this change.
   *
   * Note: this method is named `setInternal`, which would normally mean papi would consider it to
   * be a data type method and would fail to use this engine because it would expect a `getInternal`
   * as well. However, we added the `ignore` decorator, so papi will not pick it up. Alternatively,
   * you can name it anything that doesn't start with `set` like `_setInternal` or `internalSet`.
   */
  @papi.dataProvider.decorators.ignore
  async setInternal(
    selector: string,
    data: QuickVerseSetData,
  ): Promise<DataProviderUpdateInstructions<QuickVerseDataTypes>> {
    // Just get notifications of updates with the 'notify' selector. Nothing to change
    if (selector === 'notify') return false;

    // You can't change scripture from just a string. You have to tell us you're a heretic
    if (typeof data === 'string' || data instanceof String) return false;

    // Only heretics change Scripture, so you have to tell us you're a heretic
    if (!data.isHeresy) return false;

    // If there is no change in the verse text, don't update
    if (data.text === this.verses[this.#getSelector(selector)].text) return false;

    // Update the verse text, track the latest change, and send an update
    this.verses[this.#getSelector(selector)] = {
      text: data.text,
      isChanged: true,
    };
    if (selector !== 'latest') this.latestVerseRef = this.#getSelector(selector);
    this.heresyCount += 1;
    // Update all data types, so Verse and Heresy in this case
    return '*';
  }

  /**
   * Set a verse's text. You must manually specify that the verse contains heresy, or you cannot set.
   * @param verseRef verse reference to change
   * @param data Verse string, and you must inform us that you are a heretic
   * @returns '*' - update instructions for updating all data types because we want
   * subscribers to Verse and Heresy data types to update based on this change.
   *
   * Note: this method gets layered over so that you can run `this.setVerse` inside this data
   * provider engine, and it will send updates after returning.
   *
   * Note: this method is used when someone uses the `useData.Verse` hook on the data
   * provider papi creates for this engine.
   */
  async setVerse(verseRef: string, data: QuickVerseSetData) {
    return this.setInternal(verseRef, data);
  }

  /**
   * Set a verse's text. Using this function implies that you identify as heresy, so you do not have
   * to identify as heresy in any special way
   * @param verseRef verse reference to change
   * @param verseText text to update the verse to, you heretic
   * @returns '*' - update instructions for updating all data types because we want
   * subscribers to Verse and Heresy data types to update based on this change.
   *
   * Note: this method gets layered over so that you can run `this.setHeresy` inside this data
   * provider engine, and it will send updates after returning.
   *
   * Note: this method is used when someone uses the `useData.Heresy` hook on the data
   * provider papi creates for this engine.
   */
  async setHeresy(verseRef: string, verseText: string) {
    return this.setInternal(verseRef, { text: verseText, isHeresy: true });
  }

  /**
   * Get a verse by its reference
   * @param verseRef verse reference to get
   * @returns verse contents at this reference
   *
   * Note: this method is used when someone uses the `useData.Verse` hook or the
   * `subscribeVerse` method on the data provider papi creates for this engine.
   */
  getVerse = async (verseRef: string) => {
    // Just get notifications of updates with the 'notify' selector
    if (verseRef === 'notify') return undefined;
    const selector = this.#getSelector(verseRef);

    // Lookup the cached data first
    let responseVerse = this.verses[selector];

    // If we don't already have the verse cached, cache it
    if (!responseVerse) {
      // Fetch the verse, cache it, and return it
      try {
        const usfmDataProvider = await this.usfmDataProviderPromise;
        if (!usfmDataProvider) throw Error('Unable to get USFM data provider');
        const verseData = usfmDataProvider.getVerse(new VerseRef(selector));
        responseVerse = { text: (await verseData) ?? `${selector} not found` };
        // Cache the verse text, track the latest cached verse, and send an update
        this.verses[selector] = responseVerse;
        this.latestVerseRef = selector;
        this.notifyUpdate();
      } catch (e) {
        responseVerse = {
          text: `Failed to fetch ${selector} from USFM data provider! Reason: ${e}`,
        };
      }
    }

    if (responseVerse.isChanged) {
      // Remove any previous heresy warning from the beginning of the text so they don't stack
      responseVerse.text = responseVerse.text.replace(/^\[.* \d*\] /, '');
      return `[${this.heresyWarning} ${this.heresyCount}] ${responseVerse.text}`;
    }
    return responseVerse.text;
  };

  /**
   * Get a verse by its reference. Need to provide a get for every set, so we specify getHeresy here which does the same thing as
   * getVerse.
   * @param verseRef verse reference to get
   * @returns verse contents at this reference
   *
   * Note: this method is used when someone uses the `useData.Heresy` hook or the
   * `subscribeHeresy` method on the data provider papi creates for this engine.
   */
  async getHeresy(verseRef: string) {
    return this.getVerse(verseRef);
  }

  /**
   * Does nothing (meaning the Chapter data type is read-only). This method is provided to match
   * with `getChapter`.
   * @returns false meaning do not update anything
   */
  // Does nothing, so we don't need to use `this`
  // eslint-disable-next-line class-methods-use-this
  async setChapter() {
    // We are not supporting setting chapters now, so don't update anything
    return false;
  }

  /**
   * Get a chapter by its book name and chapter number.
   *
   * @param chapterInfo parameters for getting the chapter
   *   - `book` - the name of the book like 'John'
   *   - `chapter` - the chapter number
   *
   * @returns full contents of the chapter
   *
   * This function demonstrates one way to make a `get<data_type>` function that feels more like a
   * normal function in that it has "multiple" parameters in its selector, which is an array of
   * parameters. To use it, you have to wrap the parameters in an array.
   *
   * @example To get the contents of John 3, you can use `getChapter(['John', 3])`.
   *
   * Note: this method is used when someone uses the `useData.Chapter` hook or the
   * `subscribeChapter` method on the data provider papi creates for this engine.
   */
  async getChapter(chapterInfo: [book: string, chapter: number]) {
    const [book, chapter] = chapterInfo;
    return this.getVerse(`${book} ${chapter}`);
  }

  /**
   * Private method that cannot be called on the network.
   * Valid selectors:
   * - `'notify'` - informs the listener of any changes in quick verse text but does not carry data
   * - `'latest'` - the latest-updated quick verse text including pulling a verse from the server and a heretic changing the verse
   * - Scripture Reference strings. Ex: `'Romans 1:16'`
   * @param selector selector provided by user
   * @returns selector for use internally
   */
  #getSelector(selector: string) {
    const selectorL = selector.toLowerCase().trim();
    return selectorL === 'latest' ? this.latestVerseRef : selectorL;
  }
}

export async function activate(context: ExecutionActivationContext): Promise<UnsubscriberAsync> {
  logger.info('Quick Verse is activating!');

  const unsubPromises: Promise<UnsubscriberAsync>[] = [];

  const token: ExecutionToken = context.executionToken;
  const warning = await papi.storage.readTextFileFromInstallDirectory(
    token,
    'assets/heresy-warning.txt',
  );
  const engine = new QuickVerseDataProviderEngine(warning.trim());

  let storedHeresyCount: number = 0;
  try {
    // If a user has never been a heretic, there is nothing to read
    const loadedData = await papi.storage.readUserData(token, 'heresy-count');
    if (loadedData) storedHeresyCount = Number(loadedData);
  } catch (error) {
    logger.debug(error);
  }
  engine.heresyCount = storedHeresyCount;

  const quickVerseDataProvider = await papi.dataProvider.registerEngine<QuickVerseDataTypes>(
    'quickVerse.quickVerse',
    engine,
  );

  quickVerseDataProvider.subscribeVerse('latest', () => {
    if (storedHeresyCount === engine.heresyCount) return;
    storedHeresyCount = engine.heresyCount;
    papi.storage.writeUserData(token, 'heresy-count', String(storedHeresyCount));
  });

  const combinedUnsubscriber: UnsubscriberAsync = papi.util.aggregateUnsubscriberAsyncs(
    (await Promise.all(unsubPromises)).concat([quickVerseDataProvider.dispose]),
  );
  logger.info('Quick Verse is finished activating!');
  return combinedUnsubscriber;
}

export async function deactivate() {
  return Promise.all(unsubscribers.map((unsubscriber) => unsubscriber()));
}
