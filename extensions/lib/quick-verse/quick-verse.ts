import papi from 'papi';
import type { ExecutionToken } from 'node/models/execution-token.model';
import type IDataProviderEngine from 'shared/models/data-provider-engine.model';
import { UnsubPromiseAsync, UnsubscriberAsync } from 'shared/utils/papi-util';
import type { ExecutionActivationContext } from 'extension-host/extension-types/extension-activation-context.model';

const { logger } = papi;

logger.info('Quick Verse is importing!');

const unsubscribers: UnsubscriberAsync[] = [];

type QuickVerseSetData = string | { text: string; isHeresy: boolean };

class QuickVerseDataProviderEngine
  implements IDataProviderEngine<string, string | undefined, QuickVerseSetData>
{
  /**
   * Verses stored by the Data Provider.
   * Keys are Scripture References.
   * Values are { text: '<verse_text>', isChanged?: boolean }
   */
  verses: { [scrRef: string]: { text: string; isChanged?: boolean } } = {};

  /** Latest updated verse reference */
  latestVerseRef = 'john 11:35';

  /** String to prefix heretical data */
  heresyWarning = '';
  heresyCount = 0;

  // Note: this method does not have to be provided here for it to work properly because it is layered over on the papi.
  // But because we provide it here, we must return `true` to notify like in the set method.
  // The contents of this method run before the update is emitted.
  // TODO: What will actually happen if we run this in `get`? Stack overflow?
  notifyUpdate() {
    logger.info(`Quick verse notifyUpdate! latestVerseRef = ${this.latestVerseRef}`);
    return true;
  }

  /**
   * @param selector string Scripture reference
   * @param data Must inform us that you are a heretic
   */
  // Note: this method gets layered over so that you can run `this.set` in the data provider engine, and it will notify update afterward.
  async set(selector: string, data: QuickVerseSetData) {
    // Just get notifications of updates with the 'notify' selector. Nothing to change
    if (selector === 'notify') return false;

    // You can't change scripture from just a string. You have to tell us you're a heretic
    if (typeof data === 'string' || data instanceof String) return false;

    // Only heretics change Scripture, so you have to tell us you're a heretic
    if (!data.isHeresy) return false;
    this.heresyCount += 1;

    // If there is no change in the verse text, don't update
    if (data.text === this.verses[this.#getSelector(selector)].text) return false;

    // Make sure it is reported as heresy
    if (!data.text.startsWith(`[${this.heresyWarning}`))
      data.text = `[${this.heresyWarning} ${this.heresyCount}] ${data.text}`;

    // Update the verse text, track the latest change, and send an update
    this.verses[this.#getSelector(selector)] = {
      text: data.text,
      isChanged: true,
    };
    if (selector !== 'latest') this.latestVerseRef = this.#getSelector(selector);
    return true;
  }

  /**
   * Example of layering over set inside a data provider. This updates the verse text and sends an update event
   * @param verseRef verse reference to change
   * @param verseText text to update the verse to, you heretic
   */
  async setHeresy(verseRef: string, verseText: string) {
    return this.set(verseRef, { text: verseText, isHeresy: true });
  }

  /**
   * @param selector
   */
  get = async (selector: string) => {
    // Just get notifications of updates with the 'notify' selector
    if (selector === 'notify') return undefined;

    let responseVerse = this.verses[this.#getSelector(selector)];

    // If we don't already have the verse cached, cache it
    if (!responseVerse) {
      // Fetch the verse, cache it, and return it
      try {
        const verseResponse = await papi.fetch(
          `https://bible-api.com/${encodeURIComponent(this.#getSelector(selector))}`,
        );
        const verseData = await verseResponse.json();
        const text = verseData.text.replaceAll('\n', '');
        responseVerse = { text };
        this.verses[this.#getSelector(selector)] = responseVerse;
        // Cache the verse text, track the latest cached verse, and send an update
        if (selector !== 'latest') this.latestVerseRef = this.#getSelector(selector);
        this.notifyUpdate();
      } catch (e) {
        responseVerse = {
          text: `Failed to fetch ${selector} from bible-api! Reason: ${e}`,
        };
      }
    }

    return responseVerse.text;
  };

  /**
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

export async function activate(context: ExecutionActivationContext) {
  const token: ExecutionToken = context.executionToken;

  // eslint-disable-next-line no-var
  var storedHeresyCount: number = 0;

  logger.info('Quick Verse is activating!');

  const engine = new QuickVerseDataProviderEngine();

  const warning = await papi.fileSystem.readFileFromInstallDirectory(token, 'heresy-warning.txt');
  [engine.heresyWarning] = warning.split(/\r?\n/);

  // If a user has never been a heretic, this file won't exist
  try {
    const loadedData = await papi.fileSystem.readUserFile(token, 'heresyCount.txt');
    if (loadedData) storedHeresyCount = Number(loadedData);
  } catch (error) {
    logger.debug(error);
  }
  engine.heresyCount = storedHeresyCount;

  const quickVerseDataProvider = await papi.dataProvider.registerEngine(
    'quick-verse.quick-verse',
    engine,
  );

  quickVerseDataProvider.subscribe('latest', () => {
    if (storedHeresyCount === engine.heresyCount) return;
    storedHeresyCount = engine.heresyCount;
    papi.fileSystem.writeUserFile(token, 'heresyCount.txt', String(storedHeresyCount));
  });

  const unsubPromises: UnsubPromiseAsync[] = [];

  return Promise.all(unsubPromises.map((unsubPromise) => unsubPromise.promise)).then(() => {
    logger.info('Quick Verse is finished activating!');
    return papi.util.aggregateUnsubscriberAsyncs(
      unsubPromises
        .map((unsubPromise) => unsubPromise.unsubscriber)
        .concat([quickVerseDataProvider.dispose]),
    );
  });
}

export async function deactivate() {
  return Promise.all(unsubscribers.map((unsubscriber) => unsubscriber()));
}
