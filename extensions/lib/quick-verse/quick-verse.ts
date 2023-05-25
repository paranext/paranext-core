import papi from 'papi';
import type { ExecutionToken } from 'node/models/execution-token.model';
import type IDataProviderEngine from 'shared/models/data-provider-engine.model';
import { UnsubscriberAsync } from 'shared/utils/papi-util';
import type { ExecutionActivationContext } from 'extension-host/extension-types/extension-activation-context.model';
import { QuickVerseDataTypes } from '@extensions/quick-verse/quick-verse';
import type { DataProviderUpdateInstructions } from 'shared/models/data-provider.model';

const { logger } = papi;

logger.info('Quick Verse is importing!');

const unsubscribers: UnsubscriberAsync[] = [];

type QuickVerseSetData = string | { text: string; isHeresy: boolean };

class QuickVerseDataProviderEngine implements IDataProviderEngine<QuickVerseDataTypes> {
  /**
   * Verses stored by the Data Provider.
   * Keys are Scripture References.
   * Values are { text: '<verse_text>', isChanged?: boolean }
   */
  verses: { [scrRef: string]: { text: string; isChanged?: boolean } } = {};

  /** Latest updated verse reference */
  latestVerseRef = 'john 11:35';

  /** Number of times any verse has been modified by a user this session */
  heresyCount = 0;

  /** @param heresyWarning string to prefix heretical data */
  constructor(public heresyWarning: string) {
    this.heresyWarning = this.heresyWarning ?? 'heresyCount =';
  }

  // Note: this method does not have to be provided here for it to work properly because it is layered over on the papi.
  // But because we provide it here, we must return some update instructions to notify like in the set method.
  // The contents of this method run before the update is emitted.
  // Here, we make this update everything by default if no parameter is provided
  // TODO: What will actually happen if we run this in `get`? Stack overflow?
  notifyUpdateVerse(updateInstructions?: DataProviderUpdateInstructions<QuickVerseDataTypes>) {
    logger.info(`Quick verse notifyUpdateVerse! latestVerseRef = ${this.latestVerseRef}`);
    // If they don't pass anything in, update everything by default
    return updateInstructions === undefined ? '*' : updateInstructions;
  }

  /**
   * Internal set method that doesn't send updates so we can update how we want from setVerse and
   * setHeresy
   * @param selector string Scripture reference
   * @param data Must inform us that you are a heretic
   * Note: this method is intentionally not named `setInternal` (if it started with `set`, the papi
   * would consider it a data type method and would fail to use this engine because it would expect
   * a `getInternal` as well). You can name it anything that doesn't start with `set` like
   * `_setInternal`.
   */
  async internalSet(selector: string, data: QuickVerseSetData) {
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
   * @param verseRef
   * @param data
   * @returns
   * Note: this method gets layered over so that you can run `this.setVerse` in this data provider
   * engine, and it will notify update afterward.
   */
  async setVerse(verseRef: string, data: QuickVerseSetData) {
    return this.internalSet(verseRef, data);
  }

  /**
   * Set a verse's text. Using this function implies that you identify as heresy, so you do not have
   * to identify as heresy in any special way
   * @param verseRef verse reference to change
   * @param verseText text to update the verse to, you heretic
   */
  async setHeresy(verseRef: string, verseText: string) {
    return this.internalSet(verseRef, { text: verseText, isHeresy: true });
  }

  getVerse = async (verseRef: string) => {
    // Just get notifications of updates with the 'notify' selector
    if (verseRef === 'notify') return undefined;

    let responseVerse = this.verses[this.#getSelector(verseRef)];

    // If we don't already have the verse cached, cache it
    if (!responseVerse) {
      // Fetch the verse, cache it, and return it
      try {
        const verseResponse = await papi.fetch(
          `https://bible-api.com/${encodeURIComponent(this.#getSelector(verseRef))}`,
        );
        const verseData = await verseResponse.json();
        const text = verseData.text.replaceAll('\n', '');
        responseVerse = { text };
        this.verses[this.#getSelector(verseRef)] = responseVerse;
        // Cache the verse text, track the latest cached verse, and send an update
        if (verseRef !== 'latest') this.latestVerseRef = this.#getSelector(verseRef);
        // Inform everyone that we updated
        this.notifyUpdateVerse('*');
      } catch (e) {
        responseVerse = {
          text: `Failed to fetch ${verseRef} from bible-api! Reason: ${e}`,
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
   * Need to provide a get for every set, so we specify getHeresy here which does the same thing as
   * getVerse
   * @param selector
   * @returns
   */
  async getHeresy(selector: string) {
    return this.getVerse(selector);
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
    const selectorL = selector.toLowerCase();
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
    'quick-verse.quick-verse',
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
