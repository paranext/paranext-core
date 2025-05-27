import papi, { DataProviderEngine } from '@papi/backend';
import { DataProviderUpdateInstructions, IDataProviderEngine } from '@papi/core';
import { Canon } from '@sillsdev/scripture';
import { newGuid } from 'platform-bible-utils';
import type {
  LexicalEntriesById,
  LexicalEntriesByOccurrence,
  LexicalReferenceSelector,
  Entry,
  LexicalReferenceTextRegistrar,
  LexicalReferenceDataTypes,
  Sense,
} from 'platform-lexical-tools';

/** Indicates an entry or sense that has occurrence data */
type WithOccurrence = {
  // Entry with occurrence
  SourceTextId: string;
  BookNum: number;
  ChapterNum: number;
  VerseNum: number;
  WordNum: string;
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

export class LexicalReferenceService
  extends DataProviderEngine<LexicalReferenceDataTypes>
  implements IDataProviderEngine<LexicalReferenceDataTypes>, LexicalReferenceTextRegistrar
{
  private databaseNoncesByTextGuid: Map<string, string> = new Map();

  // TODO: prevent the same file from being registered multiple times
  // ENHANCE: Instead of making a new database connection for each database, you could attach
  // up to 10 together. Might get some memory reduction that way
  async registerLexicalReferenceText(fileUri: string): Promise<string> {
    const lexicalReferenceTextGuid = newGuid();
    const databaseNonce = await papi.database.openDatabase(fileUri, { readOnly: true });
    this.databaseNoncesByTextGuid.set(lexicalReferenceTextGuid, databaseNonce);
    return lexicalReferenceTextGuid;
  }

  async unregisterLexicalReferenceText(lexicalReferenceTextGuid: string): Promise<void> {
    const databaseNonce = this.databaseNoncesByTextGuid.get(lexicalReferenceTextGuid);
    if (!databaseNonce)
      throw new Error(
        `No lexical reference text registered with guid: ${lexicalReferenceTextGuid}`,
      );
    await papi.database.closeDatabase(databaseNonce);
    this.databaseNoncesByTextGuid.delete(lexicalReferenceTextGuid);
  }

  async getEntriesById(selector: LexicalReferenceSelector): Promise<LexicalEntriesById> {
    // Using || instead of ?? so falsy values like empty string are replaced with `en`
    const bcp47Code = selector.bcp47Code || 'en';

    // Arguments to pass into the database queries to filter down to the data the selector indicates
    const queryArguments = {
      // Using || instead of ?? so falsy values like empty string are not used
      $lexicalReferenceTextId: selector.lexicalReferenceTextId || undefined,
      $bcp47Code: bcp47Code,
      $sourceTextId: selector.sourceTextId || undefined,
      $bookNum: selector.book ? Canon.bookIdToNumber(selector.book) : undefined,
      $chapterNum: selector.chapterNum || undefined,
      $verseNum: selector.verseNum || undefined,
      $lemma: selector.lemma || undefined,
      $itemId: selector.itemId || undefined,
      $wordNum: selector.wordNum || undefined,
    };

    // Get matching entries from each database
    const entriesFromEachDatabasePromises = Array.from(this.databaseNoncesByTextGuid.values()).map(
      async (databaseNonce) => {
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
                BCP47Code = $bcp47Code AND
                ($sourceTextId IS NULL OR SourceTextId = $sourceTextId) AND
                ($bookNum IS NULL OR BookNum = $bookNum) AND
                ($chapterNum IS NULL OR ChapterNum = $chapterNum) AND
                ($verseNum IS NULL OR VerseNum = $verseNum) AND
                ($lemma IS NULL OR Lemma = $lemma) AND
                ($itemId IS NULL OR EntryId = $itemId OR SenseId = $itemId) AND
                ($wordNum IS NULL OR WordNum = $wordNum);`,
          queryArguments,
        )) as ({
          SenseKey: number;
          SenseId: string;
          LexiconId: string;
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
          queryArguments,
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
          const sense = senseFromMap ?? {
            id: row.SenseId,
            entryId: row.EntryId,
            lexicalReferenceTextId: row.LexiconId,
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
          const entry = entryFromMap ?? createEmptyEntry(row);
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
                Lemma,
                SourceTextId,
                BookNum,
                ChapterNum,
                VerseNum,
                WordNum
              FROM EntryOccurrenceView
              WHERE
                ($lexicalReferenceTextId IS NULL OR LexiconId = $lexicalReferenceTextId) AND
                ($sourceTextId IS NULL OR SourceTextId = $sourceTextId) AND
                ($bookNum IS NULL OR BookNum = $bookNum) AND
                ($chapterNum IS NULL OR ChapterNum = $chapterNum) AND
                ($verseNum IS NULL OR VerseNum = $verseNum) AND
                ($lemma IS NULL OR Lemma = $lemma) AND
                ($itemId IS NULL OR EntryId = $itemId) AND
                ($wordNum IS NULL OR WordNum = $wordNum);`,
          queryArguments,
        )) as ({
          EntryKey: number;
          EntryId: string;
          LexiconId: string;
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
          queryArguments,
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
          const entry = entryFromMap ?? createEmptyEntry(row);
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
          existingEntryPossibleMatch.lexicalReferenceTextId === entry.lexicalReferenceTextId,
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

  // TODO: what to do with this
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getEntriesByOccurrence(/* selector: LexicalReferenceSelector, */): Promise<LexicalEntriesByOccurrence> {
    throw new Error('I dunno if we want this');
    /* const promises = Array.from(this.databaseNoncesByTextGuid.values()).map(
      async (databaseNonce) => {
        // We know the database schema, so we know this is the right type
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        const rows = (await papi.database.select(
          databaseNonce,
          `SELECT * FROM EntryOccurrences WHERE ($book IS NULL OR BookNum = $book) AND ($chapterNum IS NULL OR ChapterNum = $chapterNum)
           AND ($verseNum IS NULL OR VerseNum = $verseNum) AND ($lemma IS NULL OR Lemma = $lemma);`,
          {
            // Using || instead of ?? so falsy values like empty string are not used
            $book: selector.book || undefined,
            $chapterNum: selector.chapterNum || undefined,
            $verseNum: selector.verseNum || undefined,
            $lemma: selector.lemma || undefined,
          },
        )) as EntryFromDb[];
        return rows;
      },
    );

    const resultsArray = await Promise.all(promises);
    const results: LexicalEntriesByOccurrence = {};

    resultsArray.flat().forEach((row) => {
      const { BookNum, ChapterNum, VerseNum, WordNum } = row;
      if (!results[BookNum]) {
        results[BookNum] = {};
      }
      if (!results[BookNum][ChapterNum]) {
        results[BookNum][ChapterNum] = {};
      }
      if (!results[BookNum][ChapterNum][VerseNum]) {
        results[BookNum][ChapterNum][VerseNum] = {};
      }
      if (!results[BookNum][ChapterNum][VerseNum][WordNum]) {
        results[BookNum][ChapterNum][VerseNum][WordNum] = [];
      }
      results[BookNum][ChapterNum][VerseNum][WordNum].push(row);
    });

    return results; */
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

  async dispose() {
    const closePromises = this.databaseNoncesByTextGuid
      .values()
      .map((databaseNonce) => papi.database.closeDatabase(databaseNonce));

    await Promise.all(closePromises);

    this.databaseNoncesByTextGuid.clear();

    return true;
  }
}

/**
 * Merges two entries by merging `b` into `a`.
 *
 * WARNING: Modifies `a`.
 *
 * Preconditions:
 *
 * - `lexicalReferenceTextId` is the same for both entries and all senses within those entries
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
            existingOccurrence.type === occurrence.type &&
            existingOccurrence.location === occurrence.location,
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
function createEmptyEntry(row: { EntryId: string; LexiconId: string; Lemma: string }): Entry {
  return {
    id: row.EntryId,
    lexicalReferenceTextId: row.LexiconId,
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
  const occurrencesFromSense = item.occurrences[row.SourceTextId];
  const occurrences = occurrencesFromSense ?? [];
  if (!occurrencesFromSense) item.occurrences[row.SourceTextId] = occurrences;

  // Create a U23003 verse location and add it to the list of occurrences
  occurrences.push({
    type: 'U23003',
    location: `${Canon.bookNumberToId(row.BookNum)} ${row.ChapterNum}:${row.VerseNum}!${row.WordNum}`,
  });
}
