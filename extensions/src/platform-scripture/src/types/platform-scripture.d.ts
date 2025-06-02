declare module 'platform-scripture' {
  import { SerializedVerseRef } from '@sillsdev/scripture';
  import type {
    DataProviderDataType,
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
    ExtensionDataScope,
    IDataProvider,
    // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  } from '@papi/core';
  import type { IProjectDataProvider } from 'papi-shared-types';
  import { Dispose, LocalizeKey, PlatformError, UnsubscriberAsync } from 'platform-bible-utils';
  import type { Usj } from '@biblionexus-foundation/scripture-utilities';
  import { InventoryItem } from 'platform-bible-react';

  // #region Project Interface Data Types

  /** Provides Scripture data in USFM format by book */
  export type USFMBookProjectInterfaceDataTypes = {
    /** Gets/sets the "raw" USFM data for the specified book */
    BookUSFM: DataProviderDataType<SerializedVerseRef, string | undefined, string>;
  };

  /** Provides Scripture data in USFM format by chapter */
  export type USFMChapterProjectInterfaceDataTypes = {
    /** Gets/sets the "raw" USFM data for the specified chapter */
    ChapterUSFM: DataProviderDataType<SerializedVerseRef, string | undefined, string>;
  };

  /** Provides Scripture data in USFM format by verse */
  export type USFMVerseProjectInterfaceDataTypes = {
    /** Gets the "raw" USFM data for the specified verse */
    VerseUSFM: DataProviderDataType<SerializedVerseRef, string | undefined, string>;
  };

  /** Provides Scripture data in USX format by book */
  export type USXBookProjectInterfaceDataTypes = {
    /** Gets/sets the data in USX form for the specified book */
    BookUSX: DataProviderDataType<SerializedVerseRef, string | undefined, string>;
  };

  /** Provides Scripture data in USX format by chapter */
  export type USXChapterProjectInterfaceDataTypes = {
    /** Gets/sets the data in USX form for the specified chapter */
    ChapterUSX: DataProviderDataType<SerializedVerseRef, string | undefined, string>;
  };

  /** Provides Scripture data in USX format by verse */
  export type USXVerseProjectInterfaceDataTypes = {
    /** Gets the "raw" data in USX form for the specified verse */
    VerseUSX: DataProviderDataType<SerializedVerseRef, string | undefined, string>;
  };

  /** Provides Scripture data in USJ format by book */
  export type USJBookProjectInterfaceDataTypes = {
    /**
     * Gets/sets the data in USJ form for the specified book
     *
     * WARNING: USJ is in very early stages of proposal, so it will likely change over time.
     */
    BookUSJ: DataProviderDataType<SerializedVerseRef, Usj | undefined, Usj>;
  };

  /** Provides Scripture data in USJ format by chapter */
  export type USJChapterProjectInterfaceDataTypes = {
    /**
     * Gets/sets the data in USJ form for the specified chapter
     *
     * WARNING: USJ is in very early stages of proposal, so it will likely change over time.
     */
    ChapterUSJ: DataProviderDataType<SerializedVerseRef, Usj | undefined, Usj>;
  };

  /** Provides Scripture data in USJ format by verse */
  export type USJVerseProjectInterfaceDataTypes = {
    /**
     * Gets the data in USJ form for the specified verse
     *
     * WARNING: USJ is in very early stages of proposal, so it will likely change over time.
     */
    VerseUSJ: DataProviderDataType<SerializedVerseRef, Usj | undefined, Usj>;
  };

  /**
   * Provides Scripture data in plain text format by verse. Plain text does not include notes,
   * figures, and other things that are not considered "verse text"
   */
  export type PlainTextVerseProjectInterfaceDataTypes = {
    /**
     * Gets the data in plain text form for the specified verse. Plain text does not include notes,
     * figures, and other things that are not considered "verse text".
     */
    VersePlainText: DataProviderDataType<SerializedVerseRef, string | undefined, string>;
  };

  /** Provides information about markers */
  export type MarkerNamesProjectInterfaceDataTypes = {
    /** Gets an array of string that contain information about markers */
    MarkerNames: DataProviderDataType<number, string[], string[]>;
  };

  /** Provides information about running "Find" on scripture projects (intentionally empty) */
  export type FindInScriptureProjectInterfaceDataTypes = {};

  /**
   * Provides project data for Scripture projects.
   *
   * WARNING: there are many possible Scripture-related data types. We have only implemented some of
   * them. Following are a number of others that may be implemented at some point. This is not yet a
   * complete list of the data types available from Scripture projects.
   */
  type UnfinishedScriptureProjectDataTypes = {};

  /**
   * Provides project data for Scripture projects.
   *
   * WARNING: there are many possible Scripture-related data types. We have only implemented some of
   * them. Following are a number of others that may be implemented at some point. This is not yet a
   * complete list of the data types available from Scripture projects.
   */
  type UnfinishedProjectDataProviderExpanded = {
    /**
     * Gets an extension's serialized project data (so the extension can provide and manipulate its
     * project data)
     *
     * @example `{ extensionName: 'biblicalTerms', dataQualifier: 'renderings' }`
     *
     * @param dataScope Contains the name of the extension requesting the data and which data it is
     *   requesting
     * @returns Promise that resolves to the requested extension project data
     */
    getExtensionData(dataScope: ExtensionDataScope): Promise<string | undefined>;
    /**
     * Sets an extension's serialized project data (so the extension can provide and manipulate its
     * project data)
     *
     * @example `{ extensionName: 'biblicalTerms', dataQualifier: 'renderings' }`
     *
     * @param dataScope Contains the name of the extension requesting the data and which data it is
     *   requesting
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
     * @param dataScope Contains the name of the extension requesting the data and which data it is
     *   requesting
     * @param callback Function to run with the updated extension data for this selector. If there
     *   is an error while retrieving the updated data, the function will run with a
     *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this value
     *   to check if it is an error.
     * @param options Various options to adjust how the subscriber emits updates
     * @returns Unsubscriber function (run to unsubscribe from listening for updates)
     */
    subscribeExtensionData(
      dataScope: ExtensionDataScope,
      callback: (extensionData: string | undefined | PlatformError) => void,
      options?: DataProviderSubscriberOptions,
    ): Promise<UnsubscriberAsync>;
  };

  // #endregion

  // #region Project Data Provider Types

  /** Provides Scripture data in USFM format by book */
  export type IUSFMBookProjectDataProvider =
    IProjectDataProvider<USFMBookProjectInterfaceDataTypes> & {
      /** Gets the "raw" USFM data for the specified book */
      getBookUSFM(verseRef: SerializedVerseRef): Promise<string | undefined>;
      /** Sets the "raw" USFM data for the specified book */
      setBookUSFM(
        verseRef: SerializedVerseRef,
        usfm: string,
      ): Promise<DataProviderUpdateInstructions<USFMBookProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the "raw" USFM data is changed
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USFM for this selector. If there is an
       *   error while retrieving the updated data, the function will run with a
       *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this
       *   value to check if it is an error.
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeBookUSFM(
        verseRef: SerializedVerseRef,
        callback: (usfm: string | undefined | PlatformError) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
    };

  /** Provides Scripture data in USFM format by chapter */
  export type IUSFMChapterProjectDataProvider =
    IProjectDataProvider<USFMChapterProjectInterfaceDataTypes> & {
      /** Gets the "raw" USFM data for the specified chapter */
      getChapterUSFM(verseRef: SerializedVerseRef): Promise<string | undefined>;
      /** Sets the "raw" USFM data for the specified chapter */
      setChapterUSFM(
        verseRef: SerializedVerseRef,
        usfm: string,
      ): Promise<DataProviderUpdateInstructions<USFMChapterProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the "raw" USFM data is changed
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USFM for this selector. If there is an
       *   error while retrieving the updated data, the function will run with a
       *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this
       *   value to check if it is an error.
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeChapterUSFM(
        verseRef: SerializedVerseRef,
        callback: (usfm: string | undefined | PlatformError) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
    };

  /** Provides Scripture data in USFM format by verse */
  export type IUSFMVerseProjectDataProvider =
    IProjectDataProvider<USFMVerseProjectInterfaceDataTypes> & {
      /** Gets the "raw" USFM data for the specified verse */
      getVerseUSFM(verseRef: SerializedVerseRef): Promise<string | undefined>;
      /** Sets the "raw" USFM data for the specified verse */
      setVerseUSFM(
        verseRef: SerializedVerseRef,
        usfm: string,
      ): Promise<DataProviderUpdateInstructions<USFMVerseProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the "raw" USFM data is changed
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USFM for this selector. If there is an
       *   error while retrieving the updated data, the function will run with a
       *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this
       *   value to check if it is an error.
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeVerseUSFM(
        verseRef: SerializedVerseRef,
        callback: (usfm: string | undefined | PlatformError) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
    };

  /** Provides Scripture data in USX format by book */
  export type IUSXBookProjectDataProvider =
    IProjectDataProvider<USXBookProjectInterfaceDataTypes> & {
      /** Gets the "raw" USX data for the specified book */
      getBookUSX(verseRef: SerializedVerseRef): Promise<string | undefined>;
      /** Sets the "raw" USX data for the specified book */
      setBookUSX(
        verseRef: SerializedVerseRef,
        usx: string,
      ): Promise<DataProviderUpdateInstructions<USXBookProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the "raw" USX data is changed
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USX for this selector. If there is an
       *   error while retrieving the updated data, the function will run with a
       *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this
       *   value to check if it is an error.
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeBookUSX(
        verseRef: SerializedVerseRef,
        callback: (usx: string | undefined | PlatformError) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
    };

  /** Provides Scripture data in USX format by chapter */
  export type IUSXChapterProjectDataProvider =
    IProjectDataProvider<USXChapterProjectInterfaceDataTypes> & {
      /** Gets the Scripture text in USX format for the specified chapter */
      getChapterUSX(verseRef: SerializedVerseRef): Promise<string | undefined>;
      /** Sets the Scripture text in USX format for the specified chapter */
      setChapterUSX(
        verseRef: SerializedVerseRef,
        usx: string,
      ): Promise<DataProviderUpdateInstructions<USXChapterProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the USX data is changed
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USX for this selector. If there is an
       *   error while retrieving the updated data, the function will run with a
       *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this
       *   value to check if it is an error.
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeChapterUSX(
        verseRef: SerializedVerseRef,
        callback: (usx: string | undefined | PlatformError) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
    };

  /** Provides Scripture data in USX format by verse */
  export type IUSXVerseProjectDataProvider =
    IProjectDataProvider<USXVerseProjectInterfaceDataTypes> & {
      /** Gets the "raw" USX data for the specified verse */
      getVerseUSX(verseRef: SerializedVerseRef): Promise<string | undefined>;
      /** Sets the "raw" USX data for the specified verse */
      setVerseUSX(
        verseRef: SerializedVerseRef,
        usx: string,
      ): Promise<DataProviderUpdateInstructions<USXVerseProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the "raw" USX data is changed
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USX for this selector. If there is an
       *   error while retrieving the updated data, the function will run with a
       *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this
       *   value to check if it is an error.
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeVerseUSX(
        verseRef: SerializedVerseRef,
        callback: (usx: string | undefined | PlatformError) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
    };

  /** Provides Scripture data in USJ format by book */
  export type IUSJBookProjectDataProvider =
    IProjectDataProvider<USJBookProjectInterfaceDataTypes> & {
      /**
       * Gets the tokenized USJ data for the specified book
       *
       * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
       * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
       * change over time.
       */
      getBookUSJ(verseRef: SerializedVerseRef): Promise<Usj | undefined>;
      /**
       * Sets the tokenized USJ data for the specified book
       *
       * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
       * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
       * change over time.
       */
      setBookUSJ(
        verseRef: SerializedVerseRef,
        usj: Usj,
      ): Promise<DataProviderUpdateInstructions<USJBookProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the tokenized USJ data is changed
       *
       * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
       * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
       * change over time.
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USJ for this selector. If there is an
       *   error while retrieving the updated data, the function will run with a
       *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this
       *   value to check if it is an error.
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeBookUSJ(
        verseRef: SerializedVerseRef,
        callback: (usj: Usj | undefined | PlatformError) => void,
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
      getChapterUSJ(verseRef: SerializedVerseRef): Promise<Usj | undefined>;
      /**
       * Sets the tokenized USJ data for the specified chapter
       *
       * WARNING: USJ is in very early stages of proposal, so it will likely change over time.
       */
      setChapterUSJ(
        verseRef: SerializedVerseRef,
        usj: Usj,
      ): Promise<DataProviderUpdateInstructions<USJChapterProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the tokenized USJ data is changed
       *
       * WARNING: USJ is in very early stages of proposal, so it will likely change over time.
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USJ for this selector. If there is an
       *   error while retrieving the updated data, the function will run with a
       *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this
       *   value to check if it is an error.
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeChapterUSJ(
        verseRef: SerializedVerseRef,
        callback: (usj: Usj | undefined | PlatformError) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
    };

  /** Provides Scripture data in USJ format by verse */
  export type IUSJVerseProjectDataProvider =
    IProjectDataProvider<USJVerseProjectInterfaceDataTypes> & {
      /**
       * Gets the tokenized USJ data for the specified verse
       *
       * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
       * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
       * change over time.
       */
      getVerseUSJ(verseRef: SerializedVerseRef): Promise<Usj | undefined>;
      /**
       * Sets the tokenized USJ data for the specified verse
       *
       * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
       * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
       * change over time.
       */
      setVerseUSJ(
        verseRef: SerializedVerseRef,
        usj: Usj,
      ): Promise<DataProviderUpdateInstructions<USJVerseProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the tokenized USJ data is changed
       *
       * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
       * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
       * change over time.
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USJ for this selector. If there is an
       *   error while retrieving the updated data, the function will run with a
       *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this
       *   value to check if it is an error.
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeVerseUSJ(
        verseRef: SerializedVerseRef,
        callback: (usj: Usj | undefined | PlatformError) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
    };

  /**
   * Provides Scripture data in plain text format by verse. Plain text does not include notes,
   * figures, and other things that are not considered "verse text"
   */
  export type IPlainTextVerseProjectDataProvider =
    IProjectDataProvider<PlainTextVerseProjectInterfaceDataTypes> & {
      /**
       * Gets the data in plain text form for the specified verse. Plain text does not include
       * notes, figures, and other things that are not considered "verse text"
       */
      getVersePlainText(verseRef: SerializedVerseRef): Promise<Usj | undefined>;
      /**
       * Sets the data in plain text form for the specified verse. Plain text does not include
       * notes, figures, and other things that are not considered "verse text"
       */
      setVersePlainText(
        verseRef: SerializedVerseRef,
        data: string,
      ): Promise<DataProviderUpdateInstructions<PlainTextVerseProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the plain text data is changed. Plain text does
       * not include notes, figures, and other things that are not considered "verse text"
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USJ for this selector. If there is an
       *   error while retrieving the updated data, the function will run with a
       *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this
       *   value to check if it is an error.
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeVersePlainText(
        verseRef: SerializedVerseRef,
        callback: (usj: Usj | undefined | PlatformError) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
    };

  /** Provides a string array that contains information about the markers used in this project */
  export type IMarkerNamesProjectDataProvider =
    IProjectDataProvider<MarkerNamesProjectInterfaceDataTypes> & {
      /**
       * Gets marker info for the default stylesheet
       *
       * @todo Add support for getting marker info from custom stylesheets
       */
      getMarkerNames(bookNum: number): Promise<string[] | undefined>;
      /** Setting is not supported for now */
      setMarkerNames(
        markerNames: string[],
      ): Promise<DataProviderUpdateInstructions<MarkerNamesProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when marker info changed
       *
       * @param bookNum Tells the provider what changes to listen for
       * @param callback Function to run with the updated marker info for this selector. If there is
       *   an error while retrieving the updated data, the function will run with a
       *   {@link PlatformError} instead of the data. You can call {@link isPlatformError} on this
       *   value to check if it is an error.
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscriberMarkerNames(
        bookNum: number,
        callback: (markerNames: string[] | undefined | PlatformError) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
    };

  /** Provides methods for running "Find" jobs on scripture projects */
  export type IFindInScriptureProjectDataProvider =
    IProjectDataProvider<FindInScriptureProjectInterfaceDataTypes> & {
      /**
       * Begins an asynchronous find operation across the specified scripture scopes.
       *
       * Creates and starts a new find job that will search for the specified text or pattern across
       * the provided scripture scopes. The operation runs asynchronously and can be monitored,
       * stopped, or have results retrieved using the returned job ID.
       *
       * **Important:** All jobs should have {@link cleanUpFindJob} called after they finish to free
       * resources and remove them from tracking. Not doing so will lead to memory leaks as jobs are
       * not automatically cleaned up when they finish.
       *
       * @example
       *
       * ```typescript
       * const jobId = await engine.beginFindJob({
       *   searchString: 'Blessed',
       *   scope: [{ bookId: 'MAT', chapter: 5 }],
       *   useRegex: false,
       *   caseInsensitive: true,
       * });
       * ```
       *
       * @param findOptions - Configuration for the find operation, see {@link FindOptions}
       * @returns Promise that resolves to a unique job ID that can be used to interact with the
       *   find operation (retrieve results, check status, stop, etc.)
       */
      beginFindJob(options: FindOptions): Promise<string>;
      /**
       * Attempts to gracefully stop an ongoing find operation.
       *
       * Requests the specified find job to stop processing and waits for it to finish gracefully
       * within the specified timeout period. If the job doesn't stop within the timeout, it will
       * continue running but this method will return false.
       *
       * **Important:** All jobs, even stopped jobs, should have {@link cleanUpFindJob} called after
       * they finish to free resources and remove them from tracking. Not doing so will lead to
       * memory leaks as jobs are not automatically cleaned up when they finish.
       *
       * @example
       *
       * ```typescript
       * try {
       *   const stopped = await engine.stopFindJob(jobId, 2000);
       *   if (stopped) {
       *     console.log('Job stopped successfully');
       *     // Do something with the job, like call retrieveFindJobUpdate to get results
       *     ...
       *     // Clean up the job after we have all the results we need
       *     cleanUpFindJob(jobId);
       *   } else {
       *     console.log("Job didn't stop in time");
       *     // Decide what to do if the job didn't stop gracefully within the timeout period
       *   }
       * }
       * ```
       *
       * @param jobId - The unique identifier of the find job to stop
       * @param timeoutMs - The maximum time in milliseconds to wait for the job to stop gracefully.
       *   Defaults to 1000ms (1 second).
       * @returns Promise that resolves to `true` if the job stopped gracefully within the timeout
       *   period, `false` if the job didn't stop in time
       * @throws Error if the job ID doesn't exist
       */
      stopFindJob(jobId: string, timeoutMs?: number): Promise<boolean>;
      /**
       * Removes a find job from tracking and frees its resources.
       *
       * This method should be called after a find job has finished for any reason to clean up
       * memory and remove the job from the internal tracking system.
       *
       * @example
       *
       * ```typescript
       * const status = await engine.retrieveFindJobUpdate(jobId, 0);
       * if (status.status !== 'running') {
       *   await engine.cleanUpFindJob(jobId);
       * }
       * ```
       *
       * @param jobId - The unique identifier of the find job to clean up
       * @throws Error if the job ID doesn't exist or if the job is still running. Running jobs must
       *   finish before they can be cleaned up.
       */
      cleanUpFindJob(jobId: string): Promise<void>;
      /**
       * Abandons a find job, preventing any further interaction with it.
       *
       * This method prevents any further calls to retrieve results or interact with the job in any
       * way. It is useful for jobs that are no longer needed and should not be tracked. Abandoned
       * jobs will be cleaned up automatically once it is possible.
       *
       * @example
       *
       * ```typescript
       * await engine.abandonFindJob(jobId);
       * console.log('Job abandoned, no further interaction allowed');
       * ```
       *
       * @param jobId - The unique identifier of the find job to abandon
       * @throws Error if the job ID doesn't exist
       */
      abandonFindJob(jobId: string): Promise<void>;
      /**
       * Retrieves the current status and results of a find job.
       *
       * Returns comprehensive information about the job's progress. This method can be called
       * repeatedly to poll for updates and retrieve results incrementally. Once a set results have
       * been retrieved, they cannot be retrieved again for this job ID. Subsequent calls to this
       * method will return the next set of results found so far.
       *
       * @example
       *
       * ```typescript
       * // Poll for updates and up to the next 10 results
       * const update = await engine.retrieveFindJobUpdate(jobId, 10);
       * console.log(`Status: ${update.status}, Progress: ${update.percentComplete}%`);
       * console.log(`Found ${update.totalResultsCount} total results`);
       * update.nextResults.forEach((result) => {
       *   console.log(`${result.verseRef}: ${result.text}`);
       * });
       * ```
       *
       * @param jobId - The unique identifier of the find job to check
       * @param maxResultsToInclude - The maximum number of results to include in the response. Use
       *   0 to get status without results, or a reasonable number to paginate through large result
       *   sets.
       * @returns Promise that resolves to a {@link FindJobStatusReport}. It will contain at most
       *   `maxResultsToInclude` results, or fewer if there are not enough results yet.
       * @throws Error if the job ID doesn't exist
       */
      retrieveFindJobUpdate(
        jobId: string,
        maxResultsToInclude: number,
      ): Promise<FindJobStatusReport>;
    };

  // #endregion

  // #region Find Types

  /**
   * Defines the scope of a find operation. A scope is a book and optionally a chapter within that
   * book. If no chapter is provided, then the find operation should search across all chapters.
   */
  export type FindScope = {
    bookId: string;
    chapter?: number;
  };

  /** Options to use when performing a find operation. */
  export type FindOptions = {
    /** The text or regex pattern to search for */
    searchString: string;
    /**
     * Array of {@link FindScope} values defining which books and chapters to search and in what
     * order
     */
    scope: FindScope[];
    /**
     * If true, then the search string is treated as a regular expression. If false or undefined,
     * then it is treated as a plain text search.
     */
    useRegex?: boolean;
    /**
     * If true, then the search is case insensitive. If false or undefined, then it is case
     * sensitive.
     */
    caseInsensitive?: boolean;
  };

  /** Represents a single result from a find operation. */
  export type FindResult = {
    /** The verse reference where the text was found */
    verseRef: SerializedVerseRef;
    /** The text that matched the find operation */
    text: string;
  };

  /**
   * The status of a find job.
   *
   * - `running`: The job is currently running
   * - `stopped`: The job was stopped by the user
   * - `errored`: The job encountered an error and is no longer running
   * - `exceeded`: The job was stopped because it generated too many results
   * - `completed`: The job completed successfully
   */
  export type FindJobStatus = 'running' | 'stopped' | 'errored' | 'exceeded' | 'completed';

  /**
   * Represents the status of a find job, including the results found so far and any errors that
   * occurred.
   */
  export type FindJobStatusReport = {
    /** Unique ID of the find job */
    jobId: string;
    /** Current status of the find job */
    status: FindJobStatus;
    /** Percentage of the job that is complete (0-100) */
    percentComplete: number;
    /** Total number of results found so far */
    totalResultsCount: number;
    /** The next set of results found so far, if any. */
    nextResults?: FindResult[];
    /** If the job encountered an error, this will contain the error message */
    error?: string;
    /**
     * Total time in milliseconds that the find operation has taken to run. This is the total time
     * from when the job started until now if the job is still running. If the job is no longer
     * running, then this is the total time it took to run the job until it finished.
     */
    totalExecutionTimeMs: number;
  };

  // #endregion

  // #region Check Types

  /** Details about a check provided by the check itself */
  export type CheckDetails = {
    /** Name or {@link LocalizeKey} of the name of the check to display in UI */
    checkName: string | LocalizeKey;
    /** Description or {@link LocalizeKey} of the description of the check to display in UI */
    checkDescription: string | LocalizeKey;
  };

  /** Details about a check that include an ID assigned to the check */
  export type CheckDetailsWithCheckId = CheckDetails & {
    /** Unique ID of the check within the set of all possible checks */
    checkId: string;
  };

  /** Defines the functions that all checks registered within the extension host must implement. */
  export type Check = Dispose & {
    /**
     * Prepare a check to generate results
     *
     * @param projectId ID of the project that the check will target
     * @returns Warnings generated by the check while initializing
     */
    initialize: (projectId: string) => Promise<(LocalizeKey | string)[]>;
    /** Returns detailed information about this check */
    getCheckDetails: () => CheckDetails;
    /**
     * Run a check on project data and return any results generated.
     *
     * @param range Section of the project text to evaluate using the check
     * @returns All results, if any, that the check found within the indicated range of the project
     */
    getCheckResults: (range: ScriptureRange) => Promise<CheckRunResult[]>;
  };

  /** Function that creates and returns a new instance of a check */
  export type CheckCreatorFunction = () => Promise<Check>;

  /** Represents a selection of scripture text */
  export type ScriptureRange = {
    /** Location within a project that is the start of the range */
    start: SerializedVerseRef;
    /**
     * Location within a project that is the end of the range. If not provided, then the end of the
     * book mentioned in `start` should be assumed.
     */
    end?: SerializedVerseRef;
  };

  /** Represents a selection of scripture text to feed into a check */
  export type CheckInputRange = ScriptureRange & {
    /** ID of the project to evaluate using checks */
    projectId: string;
  };

  /**
   * Represents a location within a project document. The `JSONPath` location type is preferred
   * since the data visualization code works with USJ. If the `VerseRef` location type is provided,
   * then the platform will convert it into a `JSONPath` location type which takes extra
   * processing.
   *
   * Practically speaking, this means if a check consumes USJ scripture data, then it should produce
   * `JSONPath`-style locations since it already has the data in USJ form. If a check is processing
   * USFM or USX data (or some other data type), then it probably doesn't have access to the USJ and
   * can just return a `VerseRef`-style location.
   */
  export type CheckLocation =
    | {
        /** JSONPath expression pointing to a location within USJ data */
        jsonPath: string;
        /**
         * Offset to apply to the content inside of the property indicated by `jsonPath` to
         * determine the start of the range.
         *
         * @example Given the following USJ, if the offset is 1, then this is pointing to the "a" in
         * Matthew. If no offset is provided, then the entire object with type "para" is being
         * pointed to.
         *
         * { "type": "para", "marker": "h", "content": [ "Matthew" ] }
         */
        offset?: number;
      }
    | {
        /** Verse reference to a location with the document */
        verseRef: SerializedVerseRef;
        /** Offset to apply to start of the verse indicated by `verseRef` */
        offset?: number;
      };

  /** One distinct result reported by a check */
  export type CheckRunResult = {
    /** ID of the check that produced this result */
    checkId?: string;
    /** Identifies a distinct class of check results that a check produced */
    checkResultType: string;
    /** Distinct ID for this check result if it might occur more than once in a single verse */
    checkResultUniqueId?: string;
    /** ID of the project evaluated by the check */
    projectId: string;
    /** Project text that was selected in the check result */
    selectedText: string;
    /**
     * Format string or {@link LocalizeKey} of the format string to display regarding the range of
     * text referenced in this result. A format string should be of the form "... {arg1} ... {arg2}
     * ...", where `arg1` and `arg2` are provided in the `formatStringArguments` parameter.
     *
     * @example Not a known name "{name}"
     *
     * @example %extensionName.unknownName%
     */
    messageFormatString: LocalizeKey | string;
    /**
     * Arguments to use with the format string to determine the final string to display in the UI.
     * All properties of the provided object should be represented by text of the form
     * `{propertyName}` within the `messageFormatString` parameter
     *
     * @example {name: Layla}
     */
    formatStringArguments?: { [key: string]: string };
    /** Indicates if a user decided this check result should be considered incorrect going forward */
    isDenied: boolean;
    /** VerseRef that most closely identifies a single place where the check applies */
    verseRef: SerializedVerseRef;
    /** Starting point where the check result applies in the document */
    start: CheckLocation;
    /** Ending point where the check result applies in the document */
    end: CheckLocation;
  };

  // #endregion

  // #region Check Runner Types

  /** Details about a check provided by a {@link ICheckRunner} */
  export type CheckRunnerCheckDetails = CheckDetailsWithCheckId & {
    /** List of project IDs that one particular check is enabled to evaluate */
    enabledProjectIds: string[];
  };

  /**
   * Details about a check (as identified by its checkId) that can be set on a subscription by the
   * subscription owner
   */
  export type SettableCheckDetails = Omit<
    CheckRunnerCheckDetails,
    'checkName' | 'checkDescription'
  >;

  /** Data types provided by a service that runs checks */
  export type CheckRunnerDataTypes = {
    AvailableChecks: DataProviderDataType<undefined, CheckRunnerCheckDetails[], never>;
    ActiveRanges: DataProviderDataType<undefined, CheckInputRange[], CheckInputRange[]>;
    CheckResults: DataProviderDataType<undefined, CheckRunResult[], never>;
  };

  export type CheckEnablerDisabler = {
    /** Enable the check with the given checkId to run on the given project */
    enableCheck: (checkId: string, projectId: string) => Promise<void>;

    /** Disable the check with the given checkId from producing results for the given project */
    disableCheck: (checkId: string, projectId?: string) => Promise<void>;
  };

  export type CheckResultClassifier = {
    /**
     * Mark one particular check result as "denied", meaning the user has marked it as incorrect for
     * the given text
     */
    denyCheckResult: (
      checkId: string,
      checkResultType: string,
      projectId: string,
      verseRef: SerializedVerseRef,
      selectedText: string,
      checkResultUniqueId?: string,
    ) => Promise<boolean>;
    /** Reverse the denial of one particular check result */
    allowCheckResult: (
      checkId: string,
      checkResultType: string,
      projectId: string,
      verseRef: SerializedVerseRef,
      selectedText: string,
      checkResultUniqueId?: string,
    ) => Promise<boolean>;
  };

  export type InventoryDataRetriever = {
    retrieveInventoryData: (
      checkId: string,
      projectId: string,
      checkInputRange: CheckInputRange,
    ) => Promise<InventoryItem[]>;
  };

  /**
   * All processes that can run checks are expected to implement this type in a data provider
   * registered with object type 'checkRunner'
   */
  export type ICheckRunner = IDataProvider<CheckRunnerDataTypes> &
    CheckEnablerDisabler &
    CheckResultClassifier &
    InventoryDataRetriever;

  // #endregion

  // #region Check Hosting (in the Extension Host) Types

  /**
   * Service for hosting TS/JS checks inside the extension host that are registered using the
   * command "platformScripture.registerCheck". It eliminates the need for writing an entire
   * {@link ICheckRunner} data provider for a check written in TS/JS, instead providing the ability
   * to create an object of type {@link Check} which is almost entirely just code that implements the
   * logic of taking project data and finding the intended problems. The "hosting service" is itself
   * an {@link ICheckRunner} data provider.
   *
   * Note that checks written in any other language cannot use this service and instead must
   * implement {@link ICheckRunner}s to do what they need.
   */
  export type ICheckHostingService = {
    /** Prepare the service to run checks */
    initialize: () => Promise<void>;
    /** Dispose of the service */
    dispose: () => Promise<boolean>;
    /** Get the actual check runner which can be used to enable/disable checks */
    getCheckRunner: () => Promise<ICheckRunner>;
  };

  // #endregion

  // #region Check Aggregator Types

  /** Uniquely identifies one subscriber to the check service */
  export type CheckSubscriptionId = string;

  export type CheckSubscriptionManager = {
    /** Create a new subscription keyed by the returned subscription ID */
    createSubscription: () => Promise<CheckSubscriptionId>;

    /**
     * Deactivate and throw away the subscription with the given ID
     *
     * @returns `true` if the subscription could be deleted, `false` otherwise
     */
    deleteSubscription: (subscriptionId: CheckSubscriptionId) => Promise<boolean>;
    /**
     * Validates the subscription with the given ID.
     *
     * @param subscriptionId - The ID of the subscription to validate.
     * @returns `true` if the subscription is valid, `false` otherwise.
     */
    validateSubscription: (subscriptionId: CheckSubscriptionId) => Promise<boolean>;
  };

  /**
   * Data types provided by a service that aggregates check results for multiple callers across
   * multiple ICheckRunner instances
   */
  export type CheckAggregatorDataTypes = {
    AvailableChecks: DataProviderDataType<
      CheckSubscriptionId,
      CheckRunnerCheckDetails[],
      SettableCheckDetails[]
    >;
    ActiveRanges: DataProviderDataType<CheckSubscriptionId, CheckInputRange[], CheckInputRange[]>;
    IncludeDeniedResults: DataProviderDataType<CheckSubscriptionId, boolean, boolean>;
    CheckResults: DataProviderDataType<CheckSubscriptionId, CheckRunResult[], never>;
  };

  /**
   * Service that multiplexes/demultiplexes calls across all {@link ICheckRunner} data providers so
   * things like UI only have to talk to a single service to communicate with all
   * {@link ICheckRunner}s.
   *
   * Use the "platformScripture.checkAggregator" data provider name to access the service.
   */
  export type ICheckAggregatorService = IDataProvider<CheckAggregatorDataTypes> &
    CheckResultClassifier &
    CheckSubscriptionManager &
    InventoryDataRetriever & {
      dataProviderName: string;
    };

  // #endregion
  // #region Send/Receive Types

  /**
   * In what state the project to S/R is
   *
   * - `undefined` or `''` = project has not been edited
   * - `edited` = project has been edited
   * - `new` = project not present on the system and available for download
   */
  export type EditedStatus = undefined | '' | 'edited' | 'new' | 'unregistered';

  /** Information about a S/R-able project needed to display it in the S/R dialog */
  export type SharedProjectInfo = {
    id: string;
    name: string;
    fullName: string;
    language: string;
    editedStatus: EditedStatus;
    lastSendReceiveDate: string;
    /** Names of admins on this project. Only filled if project is new */
    adminNames?: string[];
    warnings?: string[];
  };

  /**
   * Map of projects that can be S/Red to display in the S/R dialog.
   *
   * Maps project id to {@link SharedProjectInfo} for that project id
   */
  export type SharedProjectsInfo = { [projectId: string]: SharedProjectInfo };

  // #endregion
  // #region ChecksSetup Types
  export type ChecksSetUpProps = {
    /** Optional string representing the id attribute of the Checks dropdown */
    id?: string;
    /** List of checks that can be selected and, if needed, configured */
    availableChecks: CheckRunnerCheckDetails[];
    /**
     * Function that is called when a checkbox for a check is selected or deselected
     *
     * @param checkLabel Name of the check
     * @param selected True if selected, false if not selected
     */
    handleSelectCheckType: (checkLabel: string, selected: boolean) => void;
    /** List of checks that have been selected */
    selectedChecks: string[];
  };
  // #endregion
}

declare module 'papi-shared-types' {
  import { UnsubscriberAsync } from 'platform-bible-utils';

  import type {
    IUSFMBookProjectDataProvider,
    IUSFMChapterProjectDataProvider,
    IUSFMVerseProjectDataProvider,
    IUSXBookProjectDataProvider,
    IUSXChapterProjectDataProvider,
    IUSXVerseProjectDataProvider,
    IUSJBookProjectDataProvider,
    IUSJChapterProjectDataProvider,
    IUSJVerseProjectDataProvider,
    IPlainTextVerseProjectDataProvider,
    IMarkerNamesProjectDataProvider,
    IFindInScriptureProjectDataProvider,
    ICheckAggregatorService,
    ICheckRunner,
    CheckDetails,
    CheckCreatorFunction,
  } from 'platform-scripture';

  export interface ProjectDataProviderInterfaces {
    'platformScripture.USFM_Book': IUSFMBookProjectDataProvider;
    'platformScripture.USFM_Chapter': IUSFMChapterProjectDataProvider;
    'platformScripture.USFM_Verse': IUSFMVerseProjectDataProvider;
    'platformScripture.USX_Book': IUSXBookProjectDataProvider;
    'platformScripture.USX_Chapter': IUSXChapterProjectDataProvider;
    'platformScripture.USX_Verse': IUSXVerseProjectDataProvider;
    'platformScripture.USJ_Book': IUSJBookProjectDataProvider;
    'platformScripture.USJ_Chapter': IUSJChapterProjectDataProvider;
    'platformScripture.USJ_Verse': IUSJVerseProjectDataProvider;
    'platformScripture.PlainText_Verse': IPlainTextVerseProjectDataProvider;
    'platformScripture.MarkerNames': IMarkerNamesProjectDataProvider;
    'platformScripture.findInScripture': IFindInScriptureProjectDataProvider;
  }

  export interface DataProviders {
    /** Use this to work with checks that are running in any process */
    'platformScripture.checkAggregator': ICheckAggregatorService;
    /**
     * You should probably use 'platformScripture.checkAggregator' instead. This data provider only
     * includes checks registered with this one particular {@link ICheckRunner}. The aggregator
     * includes all checks registered with all {@link ICheckRunner} instances.
     */
    'platformScripture.extensionHostCheckRunner': ICheckRunner;
  }

  export interface CommandHandlers {
    /**
     * Register a new check so it is runnable. It will not produce any check results until
     * {@link ICheckRunner.enableCheck} is run by something else.
     *
     * Note this only works for checks that run inside the extension host. Checks that run in other
     * processes should implement a {@link ICheckRunner} data provider to be discovered.
     *
     * @param checkDetails Details that will apply to all checks created by `createCheck`
     * @param createCheck Function for creating a new check object
     * @returns Function to run to remove the check registration
     */
    'platformScripture.registerCheck': (
      checkDetails: CheckDetails,
      createCheck: CheckCreatorFunction,
    ) => Promise<UnsubscriberAsync>;

    'platformScripture.openCharactersInventory': (
      projectId?: string | undefined,
    ) => Promise<string | undefined>;

    'platformScripture.openRepeatedWordsInventory': (
      projectId?: string | undefined,
    ) => Promise<string | undefined>;

    'platformScripture.openMarkersInventory': (
      projectId?: string | undefined,
    ) => Promise<string | undefined>;

    'platformScripture.openPunctuationInventory': (
      projectId?: string | undefined,
    ) => Promise<string | undefined>;

    'platformScripture.openChecksSidePanel': (
      projectId?: string | undefined,
    ) => Promise<string | undefined>;
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

    'platformScripture.validCharacters': string;

    'platformScripture.invalidCharacters': string;

    'platformScripture.repeatableWords': string;

    'platformScripture.nonRepeatableWords': string;

    'platformScripture.validMarkers': string;

    'platformScripture.invalidMarkers': string;

    'platformScripture.validPunctuation': string;

    'platformScripture.invalidPunctuation': string;
  }
}
