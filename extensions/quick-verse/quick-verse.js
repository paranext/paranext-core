'use strict';

// eslint-disable-next-line import/no-unresolved
const papi = require('papi');

const { logger } = papi;

logger.log('Quick Verse is importing!');

const unsubscribers = [];

class QuickVerseDataProviderEngine {
  /**
   * Verses stored by the Data Provider.
   * Keys are Scripture References.
   * Values are { text: '<verse_text>', changed?: boolean }
   */
  verses = {};

  /** Latest updated verse reference */
  latestVerseRef = 'john 11:35';

  getSelector(selector) {
    const selectorL = selector.toLowerCase();
    return selectorL === 'latest' ? this.latestVerseRef : selectorL;
  }

  /**
   * @param {string} selector string Scripture reference
   * @param {string} data { text: '<verse_text>', heresy: true } Must inform us that you are a heretic
   */
  async set(selector, data) {
    // Just get notifications of updates with the 'notify' selector. Nothing to change
    if (selector === 'notify') return false;

    // You can't change scripture from just a string. You have to tell us you're a heretic
    if (typeof data === 'string' || data instanceof String) return false;

    // Only heretics change Scripture, so you have to tell us you're a heretic
    if (!data.heresy) return false;

    if (
      !this.verses[this.getSelector(selector)] ||
      data.text !== this.verses[this.getSelector(selector)].text
    ) {
      this.verses[this.getSelector(selector)] = {
        text: data.text,
        changed: true,
      };
      if (selector !== 'latest')
        this.latestVerseRef = this.getSelector(selector);
      return true;
    }

    return false;
  }

  /**
   * @param {string} selector
   */
  async get(selector) {
    // Just get notifications of updates with the 'notify' selector
    if (selector === 'notify') return undefined;

    let responseVerse = this.verses[this.getSelector(selector)];

    // If we don't already have the verse cached, cache it
    if (!responseVerse) {
      // Fetch the verse, cache it, and return it
      try {
        const verseResponse = await papi.fetch(
          `https://bible-api.com/${encodeURIComponent(
            this.getSelector(selector),
          )}`,
        );
        const verseData = await verseResponse.json();
        const text = verseData.text.replace(/\n/g, '');
        responseVerse = { text };
        this.verses[this.getSelector(selector)] = responseVerse;
      } catch (e) {
        responseVerse = {
          text: `Failed to fetch ${selector} from bible-api! Reason: ${e}`,
        };
      }
    }

    return responseVerse.text;
  }
}

exports.activate = async () => {
  logger.log('Quick Verse is activating!');

  const quickVerseDataProviderInfo = papi.dataProvider.registerEngine(
    'quick-verse.quick-verse',
    new QuickVerseDataProviderEngine(),
  );

  const unsubPromises = [];

  return Promise.all(
    unsubPromises.map((unsubPromise) => unsubPromise.promise),
  ).then(() => {
    logger.log('Quick Verse is finished activating!');
    return papi.util.aggregateUnsubscriberAsyncs(
      unsubPromises
        .map((unsubPromise) => unsubPromise.unsubscriber)
        .concat([quickVerseDataProviderInfo.dispose]),
    );
  });
};

exports.deactivate = async () => {
  return Promise.all(unsubscribers.map((unsubscriber) => unsubscriber()));
};
