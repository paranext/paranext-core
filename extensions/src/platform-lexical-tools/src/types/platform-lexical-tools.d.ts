declare module 'platform-lexical-tools' {
  import { PlatformError, UnsubscriberAsync } from 'platform-bible-utils';
  import type {
    DataProviderDataType,
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
    IDataProvider,
  } from '@papi/core';
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

  // #region Types relating to the lexical reference service and PDPs

  /**
   * Entries mapped by IDs. There may be multiple entries for one ID if there are multiple lexical
   * reference texts or versions of a lexical reference text that provide an entry with the same
   * ID.
   */
  export type LexicalEntriesById = {
    [entryId: string]: Entry[] | undefined;
  };

  /**
   * Entries mapped by their location in Scripture. There may be multiple entries for one location
   * even from the same version of a lexical reference text.
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
   * reference texts or versions of a lexical reference text that provide a sense with the same ID.
   */
  export type LexicalSensesById = {
    [senseId: string]: Sense[] | undefined;
  };

  /**
   * Senses mapped by their location in Scripture. There may be multiple senses for one location
   * even from the same version of a lexical reference text.
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

  // #endregion

  // #region Lexical Reference Project Data Provider Types

  /**
   * Selector to specify which lexical data to retrieve within a specific lexical reference text.
   * This essentially acts as a filter; every property supplied is ANDed together to filter all
   * entries/senses and return only those matching all conditions. It will return partial data if
   * only part of an entry/sense matches.
   *
   * For example, if you specify `entryId` as an entry's id and `book` as `GEN`, and there is an
   * entry with two senses but only one of those senses occurs in Genesis, only the sense that
   * occurs in Genesis will be returned. If you instead specify only `itemId` as that entry's id, it
   * will return the whole entry with all its contents.
   */
  export type LexicalReferenceProjectSelector = {
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
    /**
     * BCP-47 language code to get language-specific info for e.g. definition. Will use `en` if not
     * specified
     */
    bcp47Code?: string;
    lemma?: string;
    /** Entry or sense id */
    itemId?: string;
  };

  /** Provides lexical reference text data for a lexical reference project */
  export type LexicalReferenceProjectDataTypes = {
    /**
     * Gets/sets lexical reference text entries mapped by their IDs. This is close to how the data
     * is organized in the lexical reference text data format
     */
    EntriesById: DataProviderDataType<
      LexicalReferenceProjectSelector,
      LexicalEntriesById,
      LexicalEntriesById
    >;
    /**
     * Gets/sets lexical reference text entries mapped by their location in Scripture. The entries
     * are divided into the occurrences by the entry occurrences, not the sense occurrences.
     *
     * If there are any entries that match the selector but do not have any occurrences that match
     * the selector, they will be put in book `***` chapter 0 verse 0 word 0. This could happen, for
     * example, if an entry has senses that match the selector but the entry itself doesn't have
     * occurrences.
     */
    EntriesByOccurrence: DataProviderDataType<
      LexicalReferenceProjectSelector,
      LexicalEntriesByOccurrence,
      LexicalEntriesByOccurrence
    >;
    /** Gets/sets lexical reference text senses mapped by their IDs */
    SensesById: DataProviderDataType<
      LexicalReferenceProjectSelector,
      LexicalSensesById,
      LexicalSensesById
    >;
    /**
     * Gets/sets lexical reference text senses mapped by their location in Scripture. The senses are
     * divided into the occurrences by the sense occurrences, not their parent entry occurrences.
     *
     * If there are any senses that match the selector but do not have any occurrences that match
     * the selector, they will be put in book `***` chapter 0 verse 0 word 0. This could happen, for
     * example, if an sense has senses that match the selector but the sense itself doesn't have
     * occurrences.
     */
    SensesByOccurrence: DataProviderDataType<
      LexicalReferenceProjectSelector,
      LexicalSensesByOccurrence,
      LexicalSensesByOccurrence
    >;
  };

  /**
   * Project data provider that provides lexical reference text data like dictionary, concordance,
   * and lexicon information from a specific lexical reference text.
   */
  export type ILexicalReferenceProjectDataProvider =
    IProjectDataProvider<LexicalReferenceProjectDataTypes> & {
      /**
       * Gets lexical reference text entries mapped by their IDs. This is close to how the data is
       * organized in the lexical reference text data format
       */
      getEntriesById(
        selector: LexicalReferenceProjectSelector,
      ): Promise<LexicalEntriesById | undefined>;
      /**
       * Sets lexical reference text entries mapped by their IDs. This is close to how the data is
       * organized in the lexical reference text data format
       *
       * Note: many (possibly all) lexical reference texts are read-only, in which case this will
       * throw
       */
      setEntriesById(
        selector: LexicalReferenceProjectSelector,
        entriesById: LexicalEntriesById,
      ): Promise<DataProviderUpdateInstructions<LexicalReferenceDataTypes>>;
      /**
       * Subscribe to run a callback function when lexical reference text entries are changed. The
       * lexical reference text entries will be mapped by their IDs
       *
       * @param selector Tells the provider what changes to listen for
       * @param callback Function to run with the updated lexical reference text entries for this
       *   selector. If there is an error while retrieving the updated data, the function will run
       *   with a {@link PlatformError} instead of the data. You can call {@link isPlatformError} on
       *   this value to check if it is an error.
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeEntriesById(
        selector: LexicalReferenceProjectSelector,
        callback: (entriesById: LexicalEntriesById | undefined | PlatformError) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;

      /**
       * Gets lexical reference text entries mapped by their location in Scripture. The entries are
       * divided into the occurrences by the entry occurrences, not the sense occurrences.
       *
       * If there are any entries that match the selector but do not have any occurrences that match
       * the selector, they will be put in book `***` chapter 0 verse 0 word 0. This could happen,
       * for example, if an entry has senses that match the selector but the entry itself doesn't
       * have occurrences.
       */
      getEntriesByOccurrence(
        selector: LexicalReferenceProjectSelector,
      ): Promise<LexicalEntriesByOccurrence | undefined>;
      /**
       * Sets lexical reference text entries mapped by their location in Scripture. The entries are
       * divided into the occurrences by the entry occurrences, not the sense occurrences.
       *
       * If there are any entries that match the selector but do not have any occurrences that match
       * the selector, they will be put in book `***` chapter 0 verse 0 word 0. This could happen,
       * for example, if an entry has senses that match the selector but the entry itself doesn't
       * have occurrences.
       *
       * Note: many (possibly all) lexical reference texts are read-only, in which case this will
       * throw
       */
      setEntriesByOccurrence(
        selector: LexicalReferenceProjectSelector,
        entriesByOccurrence: LexicalEntriesByOccurrence,
      ): Promise<DataProviderUpdateInstructions<LexicalReferenceDataTypes>>;
      /**
       * Subscribe to run a callback function when lexical reference text entries are changed. The
       * lexical reference text entries will be mapped by their location in Scripture. The entries
       * are divided into the occurrences by the entry occurrences, not the sense occurrences.
       *
       * If there are any entries that match the selector but do not have any occurrences that match
       * the selector, they will be put in book `***` chapter 0 verse 0 word 0. This could happen,
       * for example, if an entry has senses that match the selector but the entry itself doesn't
       * have occurrences.
       *
       * @param selector Tells the provider what changes to listen for
       * @param callback Function to run with the updated lexical reference text entries for this
       *   selector. If there is an error while retrieving the updated data, the function will run
       *   with a {@link PlatformError} instead of the data. You can call {@link isPlatformError} on
       *   this value to check if it is an error.
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeEntriesByOccurrence(
        selector: LexicalReferenceProjectSelector,
        callback: (
          entriesByOccurrence: LexicalEntriesByOccurrence | undefined | PlatformError,
        ) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;

      /**
       * Gets lexical reference text senses mapped by their IDs. This is close to how the data is
       * organized in the lexical reference text data format
       */
      getSensesById(
        selector: LexicalReferenceProjectSelector,
      ): Promise<LexicalSensesById | undefined>;
      /**
       * Sets lexical reference text senses mapped by their IDs. This is close to how the data is
       * organized in the lexical reference text data format
       *
       * Note: many (possibly all) lexical reference texts are read-only, in which case this will
       * throw
       */
      setSensesById(
        selector: LexicalReferenceProjectSelector,
        sensesById: LexicalSensesById,
      ): Promise<DataProviderUpdateInstructions<LexicalReferenceDataTypes>>;
      /**
       * Subscribe to run a callback function when lexical reference text senses are changed. The
       * lexical reference text senses will be mapped by their IDs
       *
       * @param selector Tells the provider what changes to listen for
       * @param callback Function to run with the updated lexical reference text senses for this
       *   selector. If there is an error while retrieving the updated data, the function will run
       *   with a {@link PlatformError} instead of the data. You can call {@link isPlatformError} on
       *   this value to check if it is an error.
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeSensesById(
        selector: LexicalReferenceProjectSelector,
        callback: (sensesById: LexicalSensesById | undefined | PlatformError) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;

      /**
       * Gets lexical reference text senses mapped by their location in Scripture. The senses are
       * divided into the occurrences by the sense occurrences, not their parent entry occurrences.
       *
       * If there are any senses that match the selector but do not have any occurrences that match
       * the selector, they will be put in book `***` chapter 0 verse 0 word 0. This could happen,
       * for example, if a sense matches the selector but doesn't have any occurrences.
       */
      getSensesByOccurrence(
        selector: LexicalReferenceProjectSelector,
      ): Promise<LexicalSensesByOccurrence | undefined>;
      /**
       * Sets lexical reference text senses mapped by their location in Scripture. The senses are
       * divided into the occurrences by the sense occurrences, not their parent entry occurrences.
       *
       * If there are any senses that match the selector but do not have any occurrences that match
       * the selector, they will be put in book `***` chapter 0 verse 0 word 0. This could happen,
       * for example, if a sense matches the selector but doesn't have any occurrences.
       *
       * Note: many (possibly all) lexical reference texts are read-only, in which case this will
       * throw
       */
      setSensesByOccurrence(
        selector: LexicalReferenceProjectSelector,
        sensesByOccurrence: LexicalSensesByOccurrence,
      ): Promise<DataProviderUpdateInstructions<LexicalReferenceDataTypes>>;
      /**
       * Subscribe to run a callback function when lexical reference text senses are changed. The
       * lexical reference text senses will be mapped by their location in Scripture. The senses are
       * divided into the occurrences by the sense occurrences, not their parent entry occurrences.
       *
       * If there are any senses that match the selector but do not have any occurrences that match
       * the selector, they will be put in book `***` chapter 0 verse 0 word 0. This could happen,
       * for example, if a sense matches the selector but doesn't have any occurrences.
       *
       * @param selector Tells the provider what changes to listen for
       * @param callback Function to run with the updated lexical reference text senses for this
       *   selector. If there is an error while retrieving the updated data, the function will run
       *   with a {@link PlatformError} instead of the data. You can call {@link isPlatformError} on
       *   this value to check if it is an error.
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeSensesByOccurrence(
        selector: LexicalReferenceProjectSelector,
        callback: (
          sensesByOccurrence: LexicalSensesByOccurrence | undefined | PlatformError,
        ) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
    };

  // #endregion

  // #region Lexical Reference Data Provider Types

  /**
   * Selector to specify which lexical data to retrieve. This essentially acts as a filter; every
   * property supplied is ANDed together to filter all entries/senses and return only those matching
   * all conditions. It will return partial data if only part of an entry/sense matches.
   *
   * For example, if you specify `entryId` as an entry's id and `book` as `GEN`, and there is an
   * entry with two senses but only one of those senses occurs in Genesis, only the sense that
   * occurs in Genesis will be returned. If you instead specify only `itemId` as that entry's id, it
   * will return the whole entry with all its contents.
   */
  export type LexicalReferenceSelector = LexicalReferenceProjectSelector & {
    /** Which lexical reference text to filter by */
    lexicalReferenceTextId?: string;
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
     * are divided into the occurrences by the entry occurrences, not the sense occurrences.
     *
     * If there are any entries that match the selector but do not have any occurrences that match
     * the selector, they will be put in book `***` chapter 0 verse 0 word 0. This could happen, for
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
     * divided into the occurrences by the sense occurrences, not their parent entry occurrences.
     *
     * If there are any senses that match the selector but do not have any occurrences that match
     * the selector, they will be put in book `***` chapter 0 verse 0 word 0. This could happen, for
     * example, if an sense has senses that match the selector but the sense itself doesn't have
     * occurrences.
     */
    SensesByOccurrence: DataProviderDataType<
      LexicalReferenceSelector,
      LexicalSensesByOccurrence,
      LexicalSensesByOccurrence
    >;
  };

  /** Object that receives and handles lexical reference texts */
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

  /**
   * Service that manages lexical reference text data like dictionaries, concordances, lexicons,
   * etc.
   *
   * Accepts extension file URIs to lexical reference texts, and serves their data as well as
   * creating {@link ILexicalReferenceProjectDataProvider}s for each text.
   *
   * Note: this service's data retrieval methods currently only retrieve information from lexical
   * reference texts registered with it. It does not retrieve data from
   * {@link ILexicalReferenceProjectDataProvider}s created by others.
   */
  export type ILexicalReferenceService = IDataProvider<LexicalReferenceDataTypes> & {
    /**
     * See {@link ILexicalReferenceProjectDataProvider.getEntriesById} - This method is the same but
     * spans across all lexical reference texts registered with this service. You can filter by a
     * particular lexical reference text in the `selector` parameter if desired.
     */
    getEntriesById(selector: LexicalReferenceSelector): Promise<LexicalEntriesById | undefined>;
    /**
     * See {@link ILexicalReferenceProjectDataProvider.setEntriesById} - This method is the same but
     * spans across all lexical reference texts registered with this service. You can filter by a
     * particular lexical reference text in the `selector` parameter if desired.
     */
    setEntriesById(
      selector: LexicalReferenceSelector,
      entriesById: LexicalEntriesById,
    ): Promise<DataProviderUpdateInstructions<LexicalReferenceDataTypes>>;
    /**
     * See {@link ILexicalReferenceProjectDataProvider.setEntriesById} - This method is the same but
     * spans across all lexical reference texts registered with this service. You can filter by a
     * particular lexical reference text in the `selector` parameter if desired.
     */
    subscribeEntriesById(
      selector: LexicalReferenceSelector,
      callback: (entriesById: LexicalEntriesById | undefined | PlatformError) => void,
      options?: DataProviderSubscriberOptions,
    ): Promise<UnsubscriberAsync>;

    /**
     * See {@link ILexicalReferenceProjectDataProvider.setEntriesById} - This method is the same but
     * spans across all lexical reference texts registered with this service. You can filter by a
     * particular lexical reference text in the `selector` parameter if desired.
     */
    getEntriesByOccurrence(
      selector: LexicalReferenceSelector,
    ): Promise<LexicalEntriesByOccurrence | undefined>;
    /**
     * See {@link ILexicalReferenceProjectDataProvider.setEntriesById} - This method is the same but
     * spans across all lexical reference texts registered with this service. You can filter by a
     * particular lexical reference text in the `selector` parameter if desired.
     */
    setEntriesByOccurrence(
      selector: LexicalReferenceSelector,
      entriesByOccurrence: LexicalEntriesByOccurrence,
    ): Promise<DataProviderUpdateInstructions<LexicalReferenceDataTypes>>;
    /**
     * See {@link ILexicalReferenceProjectDataProvider.setEntriesById} - This method is the same but
     * spans across all lexical reference texts registered with this service. You can filter by a
     * particular lexical reference text in the `selector` parameter if desired.
     */
    subscribeEntriesByOccurrence(
      selector: LexicalReferenceSelector,
      callback: (
        entriesByOccurrence: LexicalEntriesByOccurrence | undefined | PlatformError,
      ) => void,
      options?: DataProviderSubscriberOptions,
    ): Promise<UnsubscriberAsync>;

    /**
     * See {@link ILexicalReferenceProjectDataProvider.setEntriesById} - This method is the same but
     * spans across all lexical reference texts registered with this service. You can filter by a
     * particular lexical reference text in the `selector` parameter if desired.
     */
    getSensesById(selector: LexicalReferenceSelector): Promise<LexicalSensesById | undefined>;
    /**
     * See {@link ILexicalReferenceProjectDataProvider.setEntriesById} - This method is the same but
     * spans across all lexical reference texts registered with this service. You can filter by a
     * particular lexical reference text in the `selector` parameter if desired.
     */
    setSensesById(
      selector: LexicalReferenceSelector,
      sensesById: LexicalSensesById,
    ): Promise<DataProviderUpdateInstructions<LexicalReferenceDataTypes>>;
    /**
     * See {@link ILexicalReferenceProjectDataProvider.setEntriesById} - This method is the same but
     * spans across all lexical reference texts registered with this service. You can filter by a
     * particular lexical reference text in the `selector` parameter if desired.
     */
    subscribeSensesById(
      selector: LexicalReferenceSelector,
      callback: (sensesById: LexicalSensesById | undefined | PlatformError) => void,
      options?: DataProviderSubscriberOptions,
    ): Promise<UnsubscriberAsync>;

    /**
     * See {@link ILexicalReferenceProjectDataProvider.setEntriesById} - This method is the same but
     * spans across all lexical reference texts registered with this service. You can filter by a
     * particular lexical reference text in the `selector` parameter if desired.
     */
    getSensesByOccurrence(
      selector: LexicalReferenceSelector,
    ): Promise<LexicalSensesByOccurrence | undefined>;
    /**
     * See {@link ILexicalReferenceProjectDataProvider.setEntriesById} - This method is the same but
     * spans across all lexical reference texts registered with this service. You can filter by a
     * particular lexical reference text in the `selector` parameter if desired.
     */
    setSensesByOccurrence(
      selector: LexicalReferenceSelector,
      sensesByOccurrence: LexicalSensesByOccurrence,
    ): Promise<DataProviderUpdateInstructions<LexicalReferenceDataTypes>>;
    /**
     * See {@link ILexicalReferenceProjectDataProvider.setEntriesById} - This method is the same but
     * spans across all lexical reference texts registered with this service. You can filter by a
     * particular lexical reference text in the `selector` parameter if desired.
     */
    subscribeSensesByOccurrence(
      selector: LexicalReferenceSelector,
      callback: (sensesByOccurrence: LexicalSensesByOccurrence | undefined | PlatformError) => void,
      options?: DataProviderSubscriberOptions,
    ): Promise<UnsubscriberAsync>;
  } & LexicalReferenceTextRegistrar;

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
