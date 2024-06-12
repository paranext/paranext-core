declare module 'platform-scripture' {
  import { VerseRef } from '@sillsdev/scripture';
  import type {
    DataProviderDataType,
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
    ExtensionDataScope,
  } from '@papi/core';
  import type { IProjectDataProvider } from 'papi-shared-types';
  import { UnsubscriberAsync } from 'platform-bible-utils';
  import type { Usj } from '@biblionexus-foundation/scripture-utilities';

  /** Provides Scripture data in USFM format by book, chapter, or verse */
  export type USFMBookChapterVerseProjectInterfaceDataTypes = {
    /** Gets/sets the "raw" USFM data for the specified book */
    BookUSFM: DataProviderDataType<VerseRef, string | undefined, string>;
    /** Gets/sets the "raw" USFM data for the specified chapter */
    ChapterUSFM: DataProviderDataType<VerseRef, string | undefined, string>;
    /** Gets/sets the "raw" USFM data for the specified verse */
    VerseUSFM: DataProviderDataType<VerseRef, string | undefined, string>;
  };

  /** Provides Scripture data in USX format by chapter */
  export type USXChapterProjectInterfaceDataTypes = {
    /** Gets/sets the data in USX form for the specified chapter */
    ChapterUSX: DataProviderDataType<VerseRef, string | undefined, string>;
  };

  /** Provides Scripture data in USJ format by chapter */
  export type USJChapterProjectInterfaceDataTypes = {
    /**
     * Gets the tokenized USJ data for the specified chapter
     *
     * WARNING: USJ is in very early stages of proposal, so it will likely change over time.
     */
    ChapterUSJ: DataProviderDataType<VerseRef, Usj | undefined, Usj>;
  };

  /**
   * Provides project data for Scripture projects.
   *
   * WARNING: there are many possible Scripture-related data types. We have only implemented some of
   * them. Following are a number of others that may be implemented at some point. This is not yet a
   * complete list of the data types available from Scripture projects.
   */
  type UnfinishedScriptureProjectDataTypes = {
    /**
     * Gets the tokenized USJ data for the specified book
     *
     * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
     * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
     * change over time.
     */
    BookUSJ: DataProviderDataType<VerseRef, Usj | undefined, Usj>;
    /**
     * Gets the tokenized USJ data for the specified verse
     *
     * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
     * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
     * change over time.
     */
    VerseUSJ: DataProviderDataType<VerseRef, Usj | undefined, Usj>;
  };

  /**
   * Provides project data for Scripture projects.
   *
   * WARNING: there are many possible Scripture-related data types. We have only implemented some of
   * them. Following are a number of others that may be implemented at some point. This is not yet a
   * complete list of the data types available from Scripture projects.
   */
  type UnfinishedProjectDataProviderExpanded =
    IProjectDataProvider<UnfinishedScriptureProjectDataTypes> & {
      /**
       * Gets the tokenized USJ data for the specified book
       *
       * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
       * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
       * change over time.
       */
      getBookUSJ(verseRef: VerseRef): Promise<Usj | undefined>;
      /**
       * Sets the tokenized USJ data for the specified book
       *
       * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
       * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
       * change over time.
       */
      setBookUSJ(
        verseRef: VerseRef,
        usj: Usj,
      ): Promise<DataProviderUpdateInstructions<UnfinishedScriptureProjectDataTypes>>;
      /**
       * Subscribe to run a callback function when the tokenized USJ data is changed
       *
       * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
       * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
       * change over time.
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USJ for this selector
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeBookUSJ(
        verseRef: VerseRef,
        callback: (usj: Usj | undefined) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;

      /**
       * Gets the tokenized USJ data for the specified verse
       *
       * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
       * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
       * change over time.
       */
      getVerseUSJ(verseRef: VerseRef): Promise<Usj | undefined>;
      /**
       * Sets the tokenized USJ data for the specified verse
       *
       * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
       * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
       * change over time.
       */
      setVerseUSJ(
        verseRef: VerseRef,
        usj: Usj,
      ): Promise<DataProviderUpdateInstructions<UnfinishedScriptureProjectDataTypes>>;
      /**
       * Subscribe to run a callback function when the tokenized USJ data is changed
       *
       * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
       * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
       * change over time.
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USJ for this selector
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeVerseUSJ(
        verseRef: VerseRef,
        callback: (usj: Usj | undefined) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;

      /**
       * Gets an extension's serialized project data (so the extension can provide and manipulate
       * its project data)
       *
       * @example `{ extensionName: 'biblicalTerms', dataQualifier: 'renderings' }`
       *
       * @param dataScope Contains the name of the extension requesting the data and which data it
       *   is requesting
       * @returns Promise that resolves to the requested extension project data
       */
      getExtensionData(dataScope: ExtensionDataScope): Promise<string | undefined>;
      /**
       * Sets an extension's serialized project data (so the extension can provide and manipulate
       * its project data)
       *
       * @example `{ extensionName: 'biblicalTerms', dataQualifier: 'renderings' }`
       *
       * @param dataScope Contains the name of the extension requesting the data and which data it
       *   is requesting
       * @param extensionData The new project data for this extension
       * @returns Promise that resolves indicating which data types received updates
       */
      setExtensionData(
        dataScope: ExtensionDataScope,
        extensionData: string | undefined,
      ): Promise<DataProviderUpdateInstructions<UnfinishedScriptureProjectDataTypes>>;
      /**
       * Subscribe to run a callback function when an extension's serialized project data is changed
       *
       * @example `{ extensionName: 'biblicalTerms', dataQualifier: 'renderings' }`
       *
       * @param dataScope Contains the name of the extension requesting the data and which data it
       *   is requesting
       * @param callback Function to run with the updated extension data for this selector
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeExtensionData(
        dataScope: ExtensionDataScope,
        callback: (extensionData: string | undefined) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
    };

  /** Provides Scripture data in USFM format by book, chapter, or verse */
  export type IUSFMBookChapterVerseProjectDataProvider =
    IProjectDataProvider<USFMBookChapterVerseProjectInterfaceDataTypes> & {
      /** Gets the "raw" USFM data for the specified book */
      getBookUSFM(verseRef: VerseRef): Promise<string | undefined>;
      /** Sets the "raw" USFM data for the specified book */
      setBookUSFM(
        verseRef: VerseRef,
        usfm: string,
      ): Promise<DataProviderUpdateInstructions<USFMBookChapterVerseProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the "raw" USFM data is changed
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USFM for this selector
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeBookUSFM(
        verseRef: VerseRef,
        callback: (usfm: string | undefined) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;

      /** Gets the "raw" USFM data for the specified chapter */
      getChapterUSFM(verseRef: VerseRef): Promise<string | undefined>;
      /** Sets the "raw" USFM data for the specified chapter */
      setChapterUSFM(
        verseRef: VerseRef,
        usfm: string,
      ): Promise<DataProviderUpdateInstructions<USFMBookChapterVerseProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the "raw" USFM data is changed
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USFM for this selector
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeChapterUSFM(
        verseRef: VerseRef,
        callback: (usfm: string | undefined) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;

      /** Gets the "raw" USFM data for the specified verse */
      getVerseUSFM(verseRef: VerseRef): Promise<string | undefined>;
      /** Sets the "raw" USFM data for the specified verse */
      setVerseUSFM(
        verseRef: VerseRef,
        usfm: string,
      ): Promise<DataProviderUpdateInstructions<USFMBookChapterVerseProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the "raw" USFM data is changed
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USFM for this selector
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeVerseUSFM(
        verseRef: VerseRef,
        callback: (usfm: string | undefined) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
    };

  /** Provides Scripture data in USX format by chapter */
  export type IUSXChapterProjectDataProvider =
    IProjectDataProvider<USXChapterProjectInterfaceDataTypes> & {
      /** Gets the Scripture text in USX format for the specified chapter */
      getChapterUSX(verseRef: VerseRef): Promise<string | undefined>;
      /** Sets the Scripture text in USX format for the specified chapter */
      setChapterUSX(
        verseRef: VerseRef,
        usx: string,
      ): Promise<DataProviderUpdateInstructions<USXChapterProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the USX data is changed
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USX for this selector
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeChapterUSX(
        verseRef: VerseRef,
        callback: (usx: string | undefined) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
    };

  /** Provides Scripture data in USJ format by chapter */
  export type IUSJChapterProjectDataProvider =
    IProjectDataProvider<USJChapterProjectInterfaceDataTypes> & {
      /**
       * Gets the tokenized USJ data for the specified chapter
       *
       * WARNING: USJ is in very early stages of proposal, so it will likely change over time.
       */
      getChapterUSJ(verseRef: VerseRef): Promise<Usj | undefined>;
      /**
       * Sets the tokenized USJ data for the specified chapter
       *
       * WARNING: USJ is in very early stages of proposal, so it will likely change over time.
       */
      setChapterUSJ(
        verseRef: VerseRef,
        usj: Usj,
      ): Promise<DataProviderUpdateInstructions<USJChapterProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the tokenized USJ data is changed
       *
       * WARNING: USJ is in very early stages of proposal, so it will likely change over time.
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USJ for this selector
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeChapterUSJ(
        verseRef: VerseRef,
        callback: (usj: Usj | undefined) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
    };

  // #region USJ types
}

declare module 'papi-shared-types' {
  import type {
    IUSFMBookChapterVerseProjectDataProvider,
    IUSXChapterProjectDataProvider,
    IUSJChapterProjectDataProvider,
  } from 'platform-scripture';

  export interface ProjectDataProviderInterfaces {
    'platformScripture.USFM_BookChapterVerse': IUSFMBookChapterVerseProjectDataProvider;
    'platformScripture.USX_Chapter': IUSXChapterProjectDataProvider;
    'platformScripture.USJ_Chapter': IUSJChapterProjectDataProvider;
  }

  export interface CommandHandlers {
    /**
     * Toggle the `platformScripture.includeMyParatext9Projects` setting on or off
     *
     * @param shouldIncludeMyParatext9Projects Provide this parameter to set it to `true` or `false`
     *   instead of toggling
     * @returns New value of the setting
     */
    'platformScripture.toggleIncludeMyParatext9Projects': (
      shouldIncludeMyParatext9Projects?: boolean,
    ) => Promise<boolean>;
  }

  export interface SettingTypes {
    /**
     * Whether to look in the Paratext 9 project storage folder for Paratext projects to load
     * (Windows only).
     *
     * Located at "C:\My Paratext 9 Projects"
     */
    'platformScripture.includeMyParatext9Projects': boolean;
  }
  export interface ProjectSettingTypes {
    /**
     * Which versification scheme this Scripture project uses
     *
     * WARNING: This setting is an example and needs to be updated to support proper versification
     * specification! For the moment, it simply corresponds to
     * [`ScrVersType`](https://github.com/sillsdev/libpalaso/blob/master/SIL.Scripture/Versification.cs#L1340),
     * but this is not correct and full design.
     */
    'platformScripture.versification': number;
    /**
     * Which books are present in this Scripture project. Represented as a string with 0 or 1 for
     * each possible book by [standardized book
     * code](https://github.com/sillsdev/libpalaso/blob/master/SIL.Scripture/Canon.cs#L226) (123
     * characters long)
     *
     * @example
     * '100111000000000000110000001000000000010111111111111111111111111111000000000000000000000000000000000000000000100000000000000'
     */
    'platformScripture.booksPresent': string;
  }
}
