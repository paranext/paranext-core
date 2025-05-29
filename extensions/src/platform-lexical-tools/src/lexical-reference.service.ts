import { DataProviderEngine } from '@papi/backend';
import { DataProviderUpdateInstructions, IDataProviderEngine } from '@papi/core';
import type {
  LexicalEntriesById,
  LexicalEntriesByOccurrence,
  LexicalReferenceSelector,
  Entry,
  LexicalReferenceTextRegistrar,
  LexicalReferenceDataTypes,
  Sense,
  LexicalSensesByOccurrence,
  LexicalSensesById,
  Occurrence,
} from 'platform-lexical-tools';
import { Unsubscriber } from 'platform-bible-utils';
import {
  LexicalReferenceTextManager,
  LOCATION_TYPE_U23003,
} from './lexical-reference-text-manager.model';

/**
 * Fake location used to put items that don't have occurrences somewhere in the
 * `LexicalEntries/SensesByOccurrence` types
 */
const FAKE_LOCATION_U23003 = '*** 0:0!0';

/**
 * Fake occurrence used to put items that don't have occurrences somewhere in the
 * `LexicalEntries/SensesByOccurrence` types
 */
const FAKE_OCCURRENCE: Occurrence = { type: LOCATION_TYPE_U23003, location: FAKE_LOCATION_U23003 };

const U23003_REGEX = /^(?<book>\w\w\w|\*\*\*) (?<chapterNum>\d+):(?<verseNum>\d+)!(?<wordNum>\d+)$/;

export class LexicalReferenceService
  extends DataProviderEngine<LexicalReferenceDataTypes>
  implements IDataProviderEngine<LexicalReferenceDataTypes>, LexicalReferenceTextRegistrar
{
  #changeLexicalReferenceTextsUnsubscriber: Unsubscriber;

  constructor(private lexicalReferenceTextManager: LexicalReferenceTextManager) {
    super();

    this.#changeLexicalReferenceTextsUnsubscriber =
      this.lexicalReferenceTextManager.onDidChangeLexicalReferenceTexts(() =>
        this.notifyUpdate('*'),
      );
  }

  async registerLexicalReferenceText(fileUri: string): Promise<string> {
    return this.lexicalReferenceTextManager.registerLexicalReferenceText(fileUri);
  }

  async unregisterLexicalReferenceText(lexicalReferenceTextGuid: string): Promise<void> {
    return this.lexicalReferenceTextManager.unregisterLexicalReferenceText(
      lexicalReferenceTextGuid,
    );
  }

  async getEntriesById(selector: LexicalReferenceSelector): Promise<LexicalEntriesById> {
    return this.lexicalReferenceTextManager.getEntriesById(selector);
  }

  async getEntriesByOccurrence(
    selector: LexicalReferenceSelector,
  ): Promise<LexicalEntriesByOccurrence> {
    const entriesById = await this.getEntriesById(selector);

    const entriesByOccurrence: LexicalEntriesByOccurrence = {};

    Object.values(entriesById)
      .flat()
      .forEach((entry) => {
        // If there aren't entries for some id, it will come up here as `undefined`. Skip.
        if (!entry) return;

        addItemToItemsByOccurrence(entry, entriesByOccurrence, 'entry');
      });

    return entriesByOccurrence;
  }

  async getSensesById(selector: LexicalReferenceSelector): Promise<LexicalSensesById> {
    const entriesById = await this.getEntriesById(selector);

    const sensesById: LexicalSensesById = {};

    Object.values(entriesById)
      .flat()
      .forEach((entry) => {
        // If there aren't entries for some id, it will come up here as `undefined`. Skip.
        if (!entry) return;

        const senses = Object.values(entry.senses);

        senses.forEach((sense) => {
          // If there isn't a sense for some id, it will come up here as `undefined`. Skip.
          if (!sense) return;

          // Put the sense in the appropriate place by id
          const { id } = sense;

          if (!sensesById[id]) sensesById[id] = [];

          sensesById[id].push(sense);
        });
      });

    return sensesById;
  }

  async getSensesByOccurrence(
    selector: LexicalReferenceSelector,
  ): Promise<LexicalSensesByOccurrence> {
    const entriesById = await this.getEntriesById(selector);

    const sensesByOccurrence: LexicalSensesByOccurrence = {};

    Object.values(entriesById)
      .flat()
      .forEach((entry) => {
        // If there aren't entries for some id, it will come up here as `undefined`. Skip.
        if (!entry) return;

        const senses = Object.values(entry.senses);

        senses.forEach((sense) => {
          // If there isn't a sense for some id, it will come up here as `undefined`. Skip.
          if (!sense) return;

          addItemToItemsByOccurrence(sense, sensesByOccurrence, 'sense');
        });
      });

    return sensesByOccurrence;
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  setEntriesById(): Promise<DataProviderUpdateInstructions<LexicalReferenceDataTypes>> {
    throw new Error('Databases are readonly. Cannot set entries by ID.');
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  setEntriesByOccurrence(): Promise<DataProviderUpdateInstructions<LexicalReferenceDataTypes>> {
    throw new Error('Databases are readonly. Cannot set entries by occurrence.');
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  setSensesById(): Promise<DataProviderUpdateInstructions<LexicalReferenceDataTypes>> {
    throw new Error('Databases are readonly. Cannot set senses by ID.');
  }

  // Because this is a data provider, we have to provide this method even though it always throws
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  setSensesByOccurrence(): Promise<DataProviderUpdateInstructions<LexicalReferenceDataTypes>> {
    throw new Error('Databases are readonly. Cannot set senses by occurrence.');
  }

  async dispose() {
    return this.#changeLexicalReferenceTextsUnsubscriber();
  }
}

/**
 * Parse verse location information from a U23003 verse location
 *
 * @param locationU23003 Verse location in U23003
 */
function parseU23003ToVerseRef(locationU23003: string): {
  book: string;
  chapterNum: number;
  verseNum: number;
  wordNum: number;
} {
  const {
    book,
    chapterNum: chapterNumStr,
    verseNum: verseNumStr,
    wordNum: wordNumStr,
  } = U23003_REGEX.exec(locationU23003)?.groups ?? {};

  if (!book || !chapterNumStr || !verseNumStr || !wordNumStr)
    throw new Error(`Failed to parse U23003 location ${locationU23003}`);

  return {
    book,
    chapterNum: parseInt(chapterNumStr, 10),
    verseNum: parseInt(verseNumStr, 10),
    wordNum: parseInt(wordNumStr, 10),
  };
}

/**
 * Adds the given item to the given ItemsByOccurrence object in the appropriate spots based on the
 * item's occurrences
 *
 * @param item The entry or sense to add
 * @param itemsByOccurrence The object containing entries or senses addressed by Scripture location
 * @param itemType String `entry` or `sense` used to log errors precisely
 */
function addItemToItemsByOccurrence<TItem extends Entry | Sense>(
  item: TItem,
  itemsByOccurrence: TItem extends Entry ? LexicalEntriesByOccurrence : LexicalSensesByOccurrence,
  itemType: TItem extends Entry ? 'entry' : 'sense',
) {
  const occurrences = Object.values(item.occurrences)
    .flat()
    .filter((occurrenceList) => !!occurrenceList);

  if (occurrences.length === 0) occurrences.push(FAKE_OCCURRENCE);

  occurrences.forEach((occurrence) => {
    // Put the item in the appropriate place by occurrence
    const { location, type } = occurrence;

    if (type !== LOCATION_TYPE_U23003)
      throw new Error(
        `Location ${location} for occurrence in ${itemType} ${item.id} was not of type ${LOCATION_TYPE_U23003}. Not currently supported`,
      );

    const { book, chapterNum, verseNum, wordNum } = parseU23003ToVerseRef(location);

    if (!itemsByOccurrence[book]) itemsByOccurrence[book] = {};

    if (!itemsByOccurrence[book][chapterNum]) itemsByOccurrence[book][chapterNum] = {};

    if (!itemsByOccurrence[book][chapterNum][verseNum])
      itemsByOccurrence[book][chapterNum][verseNum] = {};

    if (!itemsByOccurrence[book][chapterNum][verseNum][wordNum])
      itemsByOccurrence[book][chapterNum][verseNum][wordNum] = [];

    // TODO: Should we narrow the occurrences to those that match this specific location?

    // TypeScript seems to be unable to distinguish between types Sense and Entry (maybe because
    // they don't have any mutually exclusive features), so it just combines them for some reason.
    // So I did the best I could, and this is the part that has to suffer from TypeScript's choices.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    itemsByOccurrence[book][chapterNum][verseNum][wordNum].push(item as Entry & Sense);
  });
}
