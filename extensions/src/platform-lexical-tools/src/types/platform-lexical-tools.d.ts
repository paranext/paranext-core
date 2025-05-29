declare module 'platform-lexical-tools' {
  import type { DataProviderDataType, IDataProvider } from '@papi/core';
  import type { IProjectDataProvider } from 'papi-shared-types';

  // #region Lexical Reference Text types loosely following the LexicalReferenceText Relax NG Compact schema converted to lowerCamelCase https://github.com/paranext/marble-tools/blob/85a376dc024cf1d2c9eff9a5166825edbf9a03f1/xml/output.rnc

  /** Localized information about a lexical reference text */
  export interface LexicalReferenceTextLocalizedInfo {
    // ENHANCE: add titles into the database and provide titles here
    /* title: string; */
  }

  /** Information about a lexical reference text */
  export interface LexicalReferenceText {
    id: string;
    /**
     * Localized information about the lexical reference text in each language the lexical reference
     * text is supplied in. Each key is a BCP-47 language code for which the lexical reference text
     * has some information, and each value is the localized information about that lexical
     * reference text.
     *
     * Note: the localized information may be full of empty strings, which means the lexical
     * reference text supplies some data in that language but does not provide localized info about
     * itself in that language
     */
    localizedInfoByBCP47Code: {
      [bcp47Code: string]: LexicalReferenceTextLocalizedInfo | undefined;
    };
    /** The versions of the data content in the lexical reference text that are currently available */
    versions: string[];
  }

  // Currently unused, but we will probably need this when we want to show Taxonomies
  export interface Taxonomy {
    id: string;
    title: string;
    subDomains: SubDomain[];
  }

  // Currently unused, but we will probably need this when we want to show Taxonomies
  export interface SubDomain {
    code: string;
    name?: string;
    subDomains?: SubDomain[];
  }

  /**
   * Senses mapped by IDs. There may only be one sense per ID with this data structure because this
   * is scoped to a specific lexical reference text
   */
  export type SensesByIdForSpecificText = {
    [senseId: string]: Sense | undefined;
  };

  export interface Entry {
    id: string;
    lexicalReferenceTextId: string;
    lemma: string;
    senses: SensesByIdForSpecificText;
    strongsCodes: string[];
    occurrences: OccurrencesBySourceTextId;
    domains: Domain[];
  }

  export interface Sense {
    id: string;
    /** ID of the entry that contains this sense */
    entryId: string;
    lexicalReferenceTextId: string;
    bcp47Code: string;
    definition?: string;
    glosses: string[];
    strongsCodes: string[];
    occurrences: OccurrencesBySourceTextId;
    domains: Domain[];
  }

  export interface OccurrencesBySourceTextId {
    [sourceTextId: string]: Occurrence[] | undefined;
  }

  export interface Occurrence {
    type: string;
    location: string;
  }

  export interface Domain {
    taxonomy: string;
    code: string;
    label?: string;
  }

  // #endregion

  // #region Lexical Reference Project Data Provider Types

  // TODO: Expand this with TSDocs
  export type ILexicalReferenceProjectDataProvider = IProjectDataProvider<{}>;

  // #endregion

  // #region Lexical Reference Data Provider Types

  /**
   * Selector to specify which lexical data to retrieve. This essentially acts as a filter; every
   * property supplied is ANDed together to filter all entries/senses and return only those matching
   * all conditions. It will return partial data if only part of an entry/sense matches.
   *
   * @example If you specify `entryId` as an entry's id and `book` as `GEN`, and there is an entry
   * with two senses but only one of those senses occurs in Genesis, only the sense that occurs in
   * Genesis will be returned. If you instead specify only `itemId` as that entry's id, it will
   * return the whole entry with all its contents.
   */
  export type LexicalReferenceSelector = {
    /**
     * ID of the Scripture text for which to match occurrences. This does nothing if you do not
     * specify an occurrence-related property like `book` or `wordNum`
     */
    sourceTextId?: string;
    book?: string;
    chapterNum?: number;
    verseNum?: number;
    /** U23003-defined word number */
    wordNum?: string;
    lexicalReferenceTextId?: string;
    /**
     * BCP-47 language code to get language-specific info for e.g. definition. Will use `en` if not
     * specified
     */
    bcp47Code?: string;
    lemma?: string;
    /** Entry or sense id */
    itemId?: string;
  };

  /**
   * Entries mapped by IDs. There may be multiple entries for one ID if there are multiple lexical
   * reference texts that provide an entry with the same ID.
   */
  export type LexicalEntriesById = {
    [entryId: string]: Entry[] | undefined;
  };

  /**
   * Entries mapped by their location in Scripture. There may be multiple entries for one location
   * from the same lexical reference text.
   */
  export type LexicalEntriesByOccurrence = {
    [book: string]:
      | {
          [chapterNum: number]:
            | {
                [verseNum: number]:
                  | {
                      /** U23003-defined word number */
                      [wordNum: string]: Entry[] | undefined;
                    }
                  | undefined;
              }
            | undefined;
        }
      | undefined;
  };

  /**
   * Senses mapped by IDs. There may be multiple senses for one ID if there are multiple lexical
   * reference texts that provide a sense with the same ID.
   */
  export type LexicalSensesById = {
    [senseId: string]: Sense[] | undefined;
  };

  /**
   * Senses mapped by their location in Scripture. There may be multiple senses for one location
   * from the same lexical reference text.
   */
  export type LexicalSensesByOccurrence = {
    [book: string]:
      | {
          [chapterNum: number]:
            | {
                [verseNum: number]:
                  | {
                      /** U23003-defined word number */
                      [wordNum: string]: Sense[] | undefined;
                    }
                  | undefined;
              }
            | undefined;
        }
      | undefined;
  };

  /** Provides lexical reference text data across all included lexical reference projects */
  export type LexicalReferenceDataTypes = {
    /**
     * Gets/sets lexical reference text entries mapped by their IDs. This is close to how the data
     * is organized in the lexical reference text data format
     */
    EntriesById: DataProviderDataType<
      LexicalReferenceSelector,
      LexicalEntriesById,
      LexicalEntriesById
    >;
    /**
     * Gets/sets lexical reference text entries mapped by their location in Scripture. The entries
     * are divided into the occurrences by the entry occurrences, not the sense occurrences. If
     * there are any entries that match the selector but do not have any occurrences that match the
     * selector, they will be put in book `***` chapter 0 verse 0 word 0. This could happen, for
     * example, if an entry has senses that match the selector but the entry itself doesn't have
     * occurrences.
     */
    EntriesByOccurrence: DataProviderDataType<
      LexicalReferenceSelector,
      LexicalEntriesByOccurrence,
      LexicalEntriesByOccurrence
    >;
    /** Gets/sets lexical reference text senses mapped by their IDs */
    SensesById: DataProviderDataType<
      LexicalReferenceSelector,
      LexicalSensesById,
      LexicalSensesById
    >;
    /**
     * Gets/sets lexical reference text senses mapped by their location in Scripture. The senses are
     * divided into the occurrences by the sense occurrences, not their parent entry occurrences. If
     * there are any senses that match the selector but do not have any occurrences that match the
     * selector, they will be put in book `***` chapter 0 verse 0 word 0. This could happen, for
     * example, if an sense has senses that match the selector but the sense itself doesn't have
     * occurrences.
     */
    SensesByOccurrence: DataProviderDataType<
      LexicalReferenceSelector,
      LexicalSensesByOccurrence,
      LexicalSensesByOccurrence
    >;
  };

  export type LexicalReferenceTextRegistrar = {
    /**
     * Registers a lexical reference text to be used with lexical tools.
     *
     * Note: you do not have to run `unregisterLexicalReferenceText` unless you want to remove the
     * data from the lexical service. The lexical service will automatically unregister everything
     * on shutdown.
     *
     * Note: the guid returned is not cryptographically secure. It may be changed to be secure in
     * the future.
     *
     * @param extensionFileUri - The file URL of the SQLite database. This can only be an extension
     *   asset URI like `papi-extension://<extension-name>/assets/<path-to-asset>`. The SQLite
     *   database must follow [the Lexical Reference Text SQL
     *   schema](https://github.com/paranext/marble-tools/blob/main/sql/schema.sql)
     * @returns A guid that can be used to unregister this lexical reference text
     */
    registerLexicalReferenceText(extensionFileUri: string): Promise<string>;
    /**
     * Unregisters a lexical reference text that was previously registered with
     * `registerLexicalReferenceText`, removing its data from the lexical service.
     *
     * @param guid - The guid of the lexical reference text to close. Returned from
     *   `registerLexicalReferenceText`
     */
    unregisterLexicalReferenceText(guid: string): Promise<void>;
  };

  // TODO: expand this with TSDocs
  export type ILexicalReferenceService = IDataProvider<LexicalReferenceDataTypes> &
    LexicalReferenceTextRegistrar;

  // #endregion
}

declare module 'papi-shared-types' {
  import type {
    ILexicalReferenceProjectDataProvider,
    ILexicalReferenceService,
  } from 'platform-lexical-tools';

  export interface ProjectDataProviderInterfaces {
    'platformLexicalTools.lexicalReference': ILexicalReferenceProjectDataProvider;
  }

  export interface DataProviders {
    'platformLexicalTools.lexicalReferenceService': ILexicalReferenceService;
  }
}
