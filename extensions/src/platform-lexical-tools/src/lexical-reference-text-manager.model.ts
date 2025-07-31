import papi from '@papi/backend';
import { Canon } from '@sillsdev/scripture';
import {
  compareScrRefs,
  Dispose,
  newGuid,
  PlatformEvent,
  PlatformEventEmitter,
} from 'platform-bible-utils';
import type {
  Entry,
  // Used in TSDoc
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ILexicalReferenceService,
  LexicalEntriesById,
  LexicalEntriesByOccurrence,
  LexicalReferenceSelector,
  LexicalReferenceText,
  LexicalSensesById,
  LexicalSensesByOccurrence,
  Occurrence,
  Sense,
} from 'platform-lexical-tools';
import { LexicalReferenceTextRegistrar } from './lexical-reference-text-registrar.model';

/**
 * Fake occurrence used to put items that don't have occurrences somewhere in the
 * `LexicalEntries/SensesByOccurrence` types
 */
const FAKE_OCCURRENCE: Occurrence = {
  verseRef: { book: '***', chapterNum: 0, verseNum: 0 },
  wordNum: 0,
};

/** Map of lexical reference texts keyed by their id */
export type LexicalReferenceTextsById = {
  [lexicalReferenceTextId: string]: LexicalReferenceText | undefined;
};

/** Indicates an entry or sense that has occurrence data */
type WithOccurrence = {
  // Entry with occurrence
  SourceTextId: string;
  BookNum: number;
  ChapterNum: number;
  VerseNum: number;
  WordNum: number;
};

/**
 * Indicates an entry or sense that doesn't have any occurrences - all occurrence-related fields are
 * undefined
 */
type WithoutOccurrence = {
  SourceTextId: undefined;
  BookNum: undefined;
  ChapterNum: undefined;
  VerseNum: undefined;
  WordNum: undefined;
};

/** Manages lexical reference texts and facilitates retrieving information about them and their data */
export class LexicalReferenceTextManager implements LexicalReferenceTextRegistrar, Dispose {
  readonly onDidChangeLexicalReferenceTexts: PlatformEvent<void>;

  private lexicalReferenceTextsByIdCached: LexicalReferenceTextsById | undefined;

  private databaseInfoByTextGuid: Map<string, { fileUri: string; databaseNonce: string }> =
    new Map();

  #onDidChangeLexicalReferenceTextsEmitter: PlatformEventEmitter<void>;

  constructor() {
    this.#onDidChangeLexicalReferenceTextsEmitter = new PlatformEventEmitter();
    this.onDidChangeLexicalReferenceTexts = this.#onDidChangeLexicalReferenceTextsEmitter.event;

    this.onDidChangeLexicalReferenceTexts(() => {
      // Bust the cache when we get new data
      this.lexicalReferenceTextsByIdCached = undefined;
    });
  }

  // ENHANCE: Instead of making a new database connection for each database, you could attach
  // up to 10 together. Might save some memory that way
  async registerLexicalReferenceText(fileUri: string): Promise<string> {
    if (
      this.databaseInfoByTextGuid
        .values()
        .some(({ fileUri: existingFileUri }) => fileUri === existingFileUri)
    )
      throw new Error(`Lexical Reference Text at ${fileUri} is already registered`);

    const lexicalReferenceTextGuid = newGuid();
    const databaseNonce = await papi.database.openDatabase(fileUri, { readOnly: true });
    this.databaseInfoByTextGuid.set(lexicalReferenceTextGuid, { fileUri, databaseNonce });
    this.#onDidChangeLexicalReferenceTextsEmitter.emit(undefined);
    return lexicalReferenceTextGuid;
  }

  async unregisterLexicalReferenceText(lexicalReferenceTextGuid: string): Promise<void> {
    const databaseInfo = this.databaseInfoByTextGuid.get(lexicalReferenceTextGuid);
    if (!databaseInfo)
      throw new Error(
        `No lexical reference text registered with guid: ${lexicalReferenceTextGuid}`,
      );
    await papi.database.closeDatabase(databaseInfo.databaseNonce);
    this.databaseInfoByTextGuid.delete(lexicalReferenceTextGuid);
    this.#onDidChangeLexicalReferenceTextsEmitter.emit(undefined);
  }

  /** Gets information about all lexical reference texts available in this manager */
  async getLexicalReferenceTextsById(): Promise<LexicalReferenceTextsById> {
    // ENHANCE: Make it so multiple calls to this at the same time won't all call to the db but will
    // wait on one and return the same thing every time
    if (this.lexicalReferenceTextsByIdCached) return this.lexicalReferenceTextsByIdCached;

    const lexicalReferenceTextRowsFromEachDatabasePromises = Array.from(
      this.databaseInfoByTextGuid.values(),
    ).map(async ({ databaseNonce }) => {
      // Build lexical reference text information from this database

      // Gather lexical reference text info
      // We know the database schema, so we know this is the right type
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      const lexicalReferenceTextRows = (await papi.database.select(
        databaseNonce,
        `SELECT DISTINCT
            LexiconId,
            LexiconVersion,
            BCP47Code
          FROM
	          SenseOccurrenceView;`,
      )) as {
        LexiconId: string;
        LexiconVersion: string;
        BCP47Code: string;
      }[];

      return lexicalReferenceTextRows;
    });

    const lexicalReferenceTextRowsFromEachDatabase = await Promise.all(
      lexicalReferenceTextRowsFromEachDatabasePromises,
    );

    // Aggregate lexical reference text information from all database queries
    const lexicalReferenceTextsById: LexicalReferenceTextsById = {};
    lexicalReferenceTextRowsFromEachDatabase.flat().forEach((row) => {
      const existingLexicalReferenceText = lexicalReferenceTextsById[row.LexiconId];
      const lexicalReferenceText: LexicalReferenceText = existingLexicalReferenceText ?? {
        id: row.LexiconId,
        versions: [],
        localizedInfoByBCP47Code: {},
      };
      if (!existingLexicalReferenceText)
        lexicalReferenceTextsById[row.LexiconId] = lexicalReferenceText;

      if (!lexicalReferenceText.versions.includes(row.LexiconVersion))
        lexicalReferenceText.versions.push(row.LexiconVersion);
      if (!Object.keys(lexicalReferenceText.localizedInfoByBCP47Code).includes(row.BCP47Code))
        // ENHANCE: add titles into the database and provide titles here
        lexicalReferenceText.localizedInfoByBCP47Code[row.BCP47Code] = {};
    });

    // Cache the result so we don't have to run this somewhat slow call so much
    this.lexicalReferenceTextsByIdCached = lexicalReferenceTextsById;

    return lexicalReferenceTextsById;
  }

  /** See {@link ILexicalReferenceService.getEntriesById} for information */
  async getEntriesById(selector: LexicalReferenceSelector): Promise<LexicalEntriesById> {
    // Using || instead of ?? so falsy values like empty string are replaced with `en`
    const bcp47Code = selector.bcp47Code || 'en';

    // Get matching entries from each database
    const entriesFromEachDatabasePromises = Array.from(this.databaseInfoByTextGuid.values()).map(
      async ({ databaseNonce }) => {
        // Build matching entry/sense information from this database

        // ENHANCEMENT: Parallelize these db calls

        // Gather matching senses and their occurrences
        // We know the database schema, so we know this is the right type
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const senseOccurrenceRows = (await papi.database.select(
          databaseNonce,
          `SELECT
                SenseKey,
                SenseId,
                LexiconId,
                LexiconVersion,
                Lemma,
                EntryId,
                EntryKey,
                Definition,
                BCP47Code,
                SourceTextId,
                BookNum,
                ChapterNum,
                VerseNum,
                WordNum
              FROM SenseOccurrenceView
              WHERE
                ($lexicalReferenceTextId IS NULL OR LexiconId = $lexicalReferenceTextId) AND
                ($lexicalReferenceTextVersion IS NULL OR LexiconVersion = $lexicalReferenceTextVersion) AND
                BCP47Code = $bcp47Code AND
                ($sourceTextId IS NULL OR SourceTextId = $sourceTextId) AND
                ($bookNum IS NULL OR BookNum = $bookNum) AND
                ($chapterNum IS NULL OR ChapterNum = $chapterNum) AND
                ($verseNum IS NULL OR VerseNum = $verseNum) AND
                ($lemma IS NULL OR Lemma = $lemma) AND
                ($itemId IS NULL OR EntryId = $itemId OR SenseId = $itemId) AND
                ($wordNum IS NULL OR WordNum = $wordNum);`,
          {
            // Using || instead of ?? so falsy values like empty string are not used
            $lexicalReferenceTextId: selector.lexicalReferenceTextId || undefined,
            $lexicalReferenceTextVersion: selector.lexicalReferenceTextVersion || undefined,
            $bcp47Code: bcp47Code,
            $sourceTextId: selector.sourceTextId || undefined,
            $bookNum: selector.book ? Canon.bookIdToNumber(selector.book) : undefined,
            $chapterNum: selector.chapterNum || undefined,
            $verseNum: selector.verseNum || undefined,
            $lemma: selector.lemma || undefined,
            $itemId: selector.itemId || undefined,
            $wordNum: selector.wordNum || undefined,
          },
        )) as ({
          SenseKey: number;
          SenseId: string;
          LexiconId: string;
          LexiconVersion: string;
          Lemma: string;
          EntryId: string;
          EntryKey: number;
          Definition?: string;
          BCP47Code: string;
        } & (WithOccurrence | WithoutOccurrence))[];

        // Gather all sense keys for getting additional information about them
        const senseKeys = [...new Set(senseOccurrenceRows.map((row) => row.SenseKey))];
        const senseKeysSqlArray = `(${senseKeys.join(',')})`;

        // Gather glosses
        // We know the database schema, so we know this is the right type
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const glossRows = (await papi.database.select(
          databaseNonce,
          `SELECT SenseKey, Gloss FROM Glosses WHERE SenseKey IN ${senseKeysSqlArray};`,
        )) as Array<{ SenseKey: number; Gloss: string }>;

        // Gather sense domains
        // We know the database schema, so we know this is the right type
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const senseDomainRows = (await papi.database.select(
          databaseNonce,
          `SELECT DISTINCT
              SenseKey,
              TaxonomyId,
              DomainCode,
              Label
            FROM
              SenseDomainView
            WHERE
              SenseKey IN ${senseKeysSqlArray} AND
              BCP47Code = $bcp47Code;`,
          {
            $bcp47Code: bcp47Code,
          },
        )) as Array<{
          SenseKey: number;
          TaxonomyId: string;
          DomainCode: string;
          Label: string | undefined;
        }>;

        // Gather sense strongs codes
        // We know the database schema, so we know this is the right type
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const senseStrongsCodeRows = (await papi.database.select(
          databaseNonce,
          `SELECT SenseKey, StrongsCode FROM SenseStrongsCodes WHERE SenseKey IN ${senseKeysSqlArray};`,
        )) as Array<{ SenseKey: number; StrongsCode: string }>;

        // Transform all this matching sense data into full senses and associated entries
        const sensesByKey = new Map<number, Sense>();
        const entriesByKey = new Map<number, Entry>();
        // Set up the senses and add occurrences
        senseOccurrenceRows.forEach((row) => {
          // Get or create the sense for this sense/occurrence row
          const senseFromMap = sensesByKey.get(row.SenseKey);
          const sense: Sense = senseFromMap ?? {
            id: row.SenseId,
            entryId: row.EntryId,
            lexicalReferenceTextId: row.LexiconId,
            lexicalReferenceTextVersion: row.LexiconVersion,
            bcp47Code: row.BCP47Code,
            definition: row.Definition,
            glosses: [],
            strongsCodes: [],
            occurrences: {},
            domains: [],
          };
          if (!senseFromMap) sensesByKey.set(row.SenseKey, sense);

          // Get or create the entry for this sense/occurrence row
          const entryFromMap = entriesByKey.get(row.EntryKey);
          const entry: Entry = entryFromMap ?? createEmptyEntry(row);
          if (!entryFromMap) entriesByKey.set(row.EntryKey, entry);

          // Add this sense to the entry if it's not already there
          if (!entry.senses[row.SenseId]) entry.senses[row.SenseId] = sense;

          // If this sense/occurrence row has an occurrence, add it
          addOccurrence(sense, row);
        });

        // Add glosses to the senses
        glossRows.forEach(({ SenseKey, Gloss }) => {
          const sense = sensesByKey.get(SenseKey);
          if (!sense)
            throw new Error(
              `Somehow retrieved gloss ${Gloss} for sense key ${SenseKey} but the sense was not retrieved! This should not happen`,
            );

          sense.glosses.push(Gloss);
        });

        // Add domains to the senses
        senseDomainRows.forEach(({ SenseKey, TaxonomyId, DomainCode, Label }) => {
          const sense = sensesByKey.get(SenseKey);
          if (!sense)
            throw new Error(
              `Somehow retrieved domain code ${DomainCode} for sense key ${SenseKey} but the sense was not retrieved! This should not happen`,
            );

          sense.domains.push({ taxonomy: TaxonomyId, code: DomainCode, label: Label });
        });

        // Add Strongs Codes to the senses
        senseStrongsCodeRows.forEach(({ SenseKey, StrongsCode }) => {
          const sense = sensesByKey.get(SenseKey);
          if (!sense)
            throw new Error(
              `Somehow retrieved Strongs Code ${StrongsCode} for sense key ${SenseKey} but the sense was not retrieved! This should not happen`,
            );

          sense.strongsCodes.push(StrongsCode);
        });

        // Gather matching entries and their occurrences
        // We know the database schema, so we know this is the right type
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const entryOccurrenceRows = (await papi.database.select(
          databaseNonce,
          `SELECT
                EntryKey,
                EntryId,
                LexiconId,
                LexiconVersion,
                Lemma,
                SourceTextId,
                BookNum,
                ChapterNum,
                VerseNum,
                WordNum
              FROM EntryOccurrenceView
              WHERE
                ($lexicalReferenceTextId IS NULL OR LexiconId = $lexicalReferenceTextId) AND
                ($lexicalReferenceTextVersion IS NULL OR LexiconVersion = $lexicalReferenceTextVersion) AND
                ($sourceTextId IS NULL OR SourceTextId = $sourceTextId) AND
                ($bookNum IS NULL OR BookNum = $bookNum) AND
                ($chapterNum IS NULL OR ChapterNum = $chapterNum) AND
                ($verseNum IS NULL OR VerseNum = $verseNum) AND
                ($lemma IS NULL OR Lemma = $lemma) AND
                ($itemId IS NULL OR EntryId = $itemId) AND
                ($wordNum IS NULL OR WordNum = $wordNum);`,
          {
            // Using || instead of ?? so falsy values like empty string are not used
            $lexicalReferenceTextId: selector.lexicalReferenceTextId || undefined,
            $lexicalReferenceTextVersion: selector.lexicalReferenceTextVersion || undefined,
            $sourceTextId: selector.sourceTextId || undefined,
            $bookNum: selector.book ? Canon.bookIdToNumber(selector.book) : undefined,
            $chapterNum: selector.chapterNum || undefined,
            $verseNum: selector.verseNum || undefined,
            $lemma: selector.lemma || undefined,
            $itemId: selector.itemId || undefined,
            $wordNum: selector.wordNum || undefined,
          },
        )) as ({
          EntryKey: number;
          EntryId: string;
          LexiconId: string;
          LexiconVersion: string;
          Lemma: string;
        } & (WithOccurrence | WithoutOccurrence))[];

        // Gather all entry keys for getting additional information about them
        const entryKeys = [
          ...new Set(
            entryOccurrenceRows
              .map((row) => row.EntryKey)
              // Get entry information for the entries containing senses that match
              .concat(senseOccurrenceRows.map((row) => row.EntryKey)),
          ),
        ];
        const entryKeysSqlArray = `(${entryKeys.join(',')})`;

        // Gather entry domains
        // We know the database schema, so we know this is the right type
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const entryDomainRows = (await papi.database.select(
          databaseNonce,
          `SELECT DISTINCT
              EntryKey,
              TaxonomyId,
              DomainCode,
              Label
            FROM
              EntryDomainView
            WHERE
              EntryKey IN ${entryKeysSqlArray} AND
              BCP47Code = $bcp47Code;`,
          {
            $bcp47Code: bcp47Code,
          },
        )) as Array<{
          EntryKey: number;
          TaxonomyId: string;
          DomainCode: string;
          Label: string | undefined;
        }>;

        // Gather entry strongs codes
        // We know the database schema, so we know this is the right type
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const entryStrongsCodeRows = (await papi.database.select(
          databaseNonce,
          `SELECT EntryKey, StrongsCode FROM EntryStrongsCodes WHERE EntryKey IN ${entryKeysSqlArray};`,
        )) as Array<{ EntryKey: number; StrongsCode: string }>;

        // Transform all this matching entry data into full entries
        // Set up the entries and add occurrences
        entryOccurrenceRows.forEach((row) => {
          // Get or create the entry for this sense/occurrence row
          const entryFromMap = entriesByKey.get(row.EntryKey);
          const entry: Entry = entryFromMap ?? createEmptyEntry(row);
          if (!entryFromMap) entriesByKey.set(row.EntryKey, entry);

          // If this entry/occurrence row has an occurrence, add it
          addOccurrence(entry, row);
        });

        // Add domains to the entries
        entryDomainRows.forEach(({ EntryKey, TaxonomyId, DomainCode, Label }) => {
          const entry = entriesByKey.get(EntryKey);
          if (!entry)
            throw new Error(
              `Somehow retrieved domain code ${DomainCode} for entry key ${EntryKey} but the entry was not retrieved! This should not happen`,
            );

          entry.domains.push({ taxonomy: TaxonomyId, code: DomainCode, label: Label });
        });

        // Add Strongs Codes to the entries
        entryStrongsCodeRows.forEach(({ EntryKey, StrongsCode }) => {
          const entry = entriesByKey.get(EntryKey);
          if (!entry)
            throw new Error(
              `Somehow retrieved Strongs Code ${StrongsCode} for entry key ${EntryKey} but the entry was not retrieved! This should not happen`,
            );

          entry.strongsCodes.push(StrongsCode);
        });

        return Array.from(entriesByKey.values());
      },
    );

    const entriesFromEachDatabase = await Promise.all(entriesFromEachDatabasePromises);

    // Aggregate entry and sense information from all database queries
    const entriesByIdAggregated: LexicalEntriesById = {};
    entriesFromEachDatabase.flat().forEach((entry) => {
      const entriesFromAggregate = entriesByIdAggregated[entry.id];
      const entries = entriesFromAggregate ?? [];
      if (!entriesFromAggregate) entriesByIdAggregated[entry.id] = entries;

      // Look for existing entry with same ID and from same Lexical Reference Text to merge with
      const existingEntry = entries.find(
        (existingEntryPossibleMatch) =>
          existingEntryPossibleMatch.lexicalReferenceTextId === entry.lexicalReferenceTextId &&
          existingEntryPossibleMatch.lexicalReferenceTextVersion ===
            entry.lexicalReferenceTextVersion,
      );
      if (!existingEntry) {
        // Add this entry to the list since there isn't an existing one to merge with
        entries.push(entry);
        return;
      }

      // Merge this entry into the existing entry that is already in the list
      // Meeting the preconditions of `mergeEntries`:
      // - Already checked that they have the same lexical reference text id
      // - Limited our queries to only the same `bcp47Code`.
      mergeEntries(existingEntry, entry);
    });

    return entriesByIdAggregated;
  }

  /** See {@link ILexicalReferenceService.getEntriesByOccurrence} for information */
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

        addItemToItemsByOccurrence(entry, entriesByOccurrence);
      });

    return entriesByOccurrence;
  }

  /** See {@link ILexicalReferenceService.getSensesById} for information */
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

  /** See {@link ILexicalReferenceService.geSensesByOccurrence} for information */
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

          addItemToItemsByOccurrence(sense, sensesByOccurrence);
        });
      });

    return sensesByOccurrence;
  }

  async dispose() {
    const closePromises = this.databaseInfoByTextGuid
      .values()
      .map(({ databaseNonce }) => papi.database.closeDatabase(databaseNonce));

    await Promise.all(closePromises);

    this.databaseInfoByTextGuid.clear();

    return true;
  }
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
) {
  const occurrences = Object.values(item.occurrences)
    .flat()
    .filter((occurrenceList) => !!occurrenceList);

  if (occurrences.length === 0) occurrences.push(FAKE_OCCURRENCE);

  occurrences.forEach((occurrence) => {
    // Put the item in the appropriate place by occurrence
    const {
      verseRef: { book, chapterNum, verseNum },
      wordNum,
    } = occurrence;

    if (!itemsByOccurrence[book]) itemsByOccurrence[book] = {};

    if (!itemsByOccurrence[book][chapterNum]) itemsByOccurrence[book][chapterNum] = {};

    if (!itemsByOccurrence[book][chapterNum][verseNum])
      itemsByOccurrence[book][chapterNum][verseNum] = {};

    if (!itemsByOccurrence[book][chapterNum][verseNum][wordNum])
      itemsByOccurrence[book][chapterNum][verseNum][wordNum] = [];

    // Potential future optimization: Should we narrow the occurrences to those that match this specific location?

    // TypeScript seems to be unable to distinguish between types Sense and Entry (maybe because
    // they don't have any mutually exclusive features), so it just combines them for some reason.
    // So I did the best I could, and this is the part that has to suffer from TypeScript's choices.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    itemsByOccurrence[book][chapterNum][verseNum][wordNum].push(item as Entry & Sense);
  });
}

/**
 * Merges two entries by merging `b` into `a`.
 *
 * WARNING: Modifies `a`.
 *
 * Preconditions:
 *
 * - `lexicalReferenceTextId` is the same for both entries and all senses within those entries
 * - `lexicalReferenceTextVersion` is the same for both entries and all senses within those entries
 * - `bcp47Code` is the same for all senses within these entries
 */
function mergeEntries(a: Entry, b: Entry): void {
  // Merge common properties
  mergeEntrySenseProperties(a, b);

  // Merge senses
  Object.entries(b.senses).forEach(([senseId, sense]) => {
    if (!sense) return;

    const existingSense = a.senses[senseId];
    if (!existingSense) {
      // Add this sense since there isn't an existing sense to merge with
      a.senses[senseId] = sense;
      return;
    }

    // Merge this sense into the existing sense that is already in the list
    mergeSenses(existingSense, sense);
  });
}

/**
 * Merges two senses by merging `b` into `a`.
 *
 * WARNING: Modifies `a`.
 *
 * Preconditions:
 *
 * - `lexicalReferenceTextId` is the same for both senses
 * - `lexicalReferenceTextVersion` is the same for both senses
 * - `bcp47Code` is the same for both senses
 */
function mergeSenses(a: Sense, b: Sense): void {
  // Merge common properties
  mergeEntrySenseProperties(a, b);

  // Merge glosses
  b.glosses.forEach((gloss) => {
    if (!a.glosses.includes(gloss)) a.glosses.push(gloss);
  });
}

/**
 * Merges common entry/sense properties of two entries or senses by merging `b` into `a`.
 *
 * WARNING: Modifies `a`.
 *
 * Preconditions:
 *
 * - `lexicalReferenceTextId` is the same for both entries/senses
 * - `lexicalReferenceTextVersion` is the same for both entries/senses
 * - `bcp47Code` is the same for both senses if they are senses
 */
function mergeEntrySenseProperties<T extends Entry | Sense>(a: T, b: T): void {
  // Merge strongs codes
  b.strongsCodes.forEach((code) => {
    if (!a.strongsCodes.includes(code)) a.strongsCodes.push(code);
  });

  // Merge domains
  b.domains.forEach((domain) => {
    if (
      !a.domains.some(
        (existingDomain) =>
          existingDomain.taxonomy === domain.taxonomy && existingDomain.code === domain.code,
      )
    )
      a.domains.push(domain);
  });

  // Merge occurrences
  Object.entries(b.occurrences).forEach(([sourceTextId, occurrences]) => {
    if (!occurrences) return;

    const existingOccurrences = a.occurrences[sourceTextId];
    if (!existingOccurrences) {
      // Add this set of occurrences since there aren't existing occurrences to merge with
      a.occurrences[sourceTextId] = [...occurrences];
      return;
    }

    // Merge these occurrences into the existing occurrences
    occurrences.forEach((occurrence) => {
      if (
        !existingOccurrences.some(
          (existingOccurrence) =>
            compareScrRefs(existingOccurrence.verseRef, occurrence.verseRef) &&
            existingOccurrence.wordNum === occurrence.wordNum,
        )
      )
        existingOccurrences.push(occurrence);
    });
  });
}

/**
 * Create an empty entry with the simple properties but with nothing in any of its array/object
 * properties
 */
function createEmptyEntry(row: {
  EntryId: string;
  LexiconId: string;
  LexiconVersion: string;
  Lemma: string;
}): Entry {
  return {
    id: row.EntryId,
    lexicalReferenceTextId: row.LexiconId,
    lexicalReferenceTextVersion: row.LexiconVersion,
    lemma: row.Lemma,
    senses: {},
    strongsCodes: [],
    occurrences: {},
    domains: [],
  };
}

/** Add an occurrence to an Entry/Sense from its occurrence row */
function addOccurrence(item: Entry | Sense, row: WithOccurrence | WithoutOccurrence) {
  // If this sense/entry occurrence row doesn't have an occurrence, skip it
  if (!row.SourceTextId) return;

  // Get or set the occurrences for this source text
  const occurrencesFromItem = item.occurrences[row.SourceTextId];
  const occurrences = occurrencesFromItem ?? [];
  if (!occurrencesFromItem) item.occurrences[row.SourceTextId] = occurrences;

  // Create a U23003 verse location and add it to the list of occurrences
  occurrences.push({
    verseRef: {
      book: Canon.bookNumberToId(row.BookNum),
      chapterNum: row.ChapterNum,
      verseNum: row.VerseNum,
    },
    wordNum: row.WordNum,
  });
}
