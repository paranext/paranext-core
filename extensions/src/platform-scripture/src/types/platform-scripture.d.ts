declare module 'platform-scripture' {
  import { SerializedVerseRef } from '@sillsdev/scripture';
  import type {
    DataProviderDataType,
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
    IDataProvider,
    // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  } from '@papi/core';
  import type { IProjectDataProvider } from 'papi-shared-types';
  import {
    Dispose,
    LocalizeKey,
    PlatformError,
    UnsubscriberAsync,
    UsfmVerseLocation,
    UsfmVerseRefVerseLocation,
    UsjChapterLocation,
    UsjMarkerLocation,
    UsjTextContentLocation,
  } from 'platform-bible-utils';
  import type { Usj } from '@eten-tech-foundation/scripture-utilities';

  // #region USFM locations and ranges

  /** A pair of Scripture positions that are in USJ Chapter or USFM Verse format */
  export type ScriptureRangeUsjChapterOrUsfmVerseLocation = {
    /** Starting point of the Scripture range in the document */
    start: UsjChapterLocation | UsfmVerseLocation;
    /** Ending point of the Scripture range in the document */
    end: UsjChapterLocation | UsfmVerseLocation;
  };

  // #endregion USFM locations and ranges

  // #region Scripture Project Data Provider Types

  /** Provides Scripture data in USFM format by book */
  export type USFMBookProjectInterfaceDataTypes = {
    /** Gets/sets the "raw" USFM data for the specified book */
    BookUSFM: DataProviderDataType<SerializedVerseRef, string | undefined, string>;
  };

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
  export type USFMChapterProjectInterfaceDataTypes = {
    /** Gets/sets the "raw" USFM data for the specified chapter */
    ChapterUSFM: DataProviderDataType<SerializedVerseRef, string | undefined, string>;
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
  export type USFMVerseProjectInterfaceDataTypes = {
    /** Gets the "raw" USFM data for the specified verse */
    VerseUSFM: DataProviderDataType<SerializedVerseRef, string | undefined, string>;
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
  export type USXBookProjectInterfaceDataTypes = {
    /** Gets/sets the data in USX form for the specified book */
    BookUSX: DataProviderDataType<SerializedVerseRef, string | undefined, string>;
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
  export type USXChapterProjectInterfaceDataTypes = {
    /** Gets/sets the data in USX form for the specified chapter */
    ChapterUSX: DataProviderDataType<SerializedVerseRef, string | undefined, string>;
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
  export type USXVerseProjectInterfaceDataTypes = {
    /** Gets the "raw" data in USX form for the specified verse */
    VerseUSX: DataProviderDataType<SerializedVerseRef, string | undefined, string>;
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
  export type USJBookProjectInterfaceDataTypes = {
    /**
     * Gets/sets the data in USJ form for the specified book
     *
     * WARNING: USJ is in very early stages of proposal, so it will likely change over time.
     */
    BookUSJ: DataProviderDataType<SerializedVerseRef, Usj | undefined, Usj>;
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
  export type USJChapterProjectInterfaceDataTypes = {
    /**
     * Gets/sets the data in USJ form for the specified chapter
     *
     * WARNING: USJ is in very early stages of proposal, so it will likely change over time.
     */
    ChapterUSJ: DataProviderDataType<SerializedVerseRef, Usj | undefined, Usj>;
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
  export type USJVerseProjectInterfaceDataTypes = {
    /**
     * Gets the data in USJ form for the specified verse
     *
     * WARNING: USJ is in very early stages of proposal, so it will likely change over time.
     */
    VerseUSJ: DataProviderDataType<SerializedVerseRef, Usj | undefined, Usj>;
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
  export type PlainTextVerseProjectInterfaceDataTypes = {
    /**
     * Gets the data in plain text form for the specified verse. Plain text does not include notes,
     * figures, and other things that are not considered "verse text".
     */
    VersePlainText: DataProviderDataType<SerializedVerseRef, string | undefined, string>;
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

  // #endregion Scripture Project Data Provider Types

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
    /**
     * Beginning location in USFM of the search result. The text is inclusive of this location,
     * meaning this is the location of the first character of the found text
     */
    start: UsfmVerseRefVerseLocation;
    /**
     * Ending location in USFM of the search result. The text is exclusive of this location, meaning
     * this is the location right after the last character of the found text
     */
    end: UsfmVerseRefVerseLocation;
    /**
     * The matching Scripture text (not USFM string) that was found between the start and end
     * locations
     */
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

  /** Provides information about running "Find" on scripture projects (intentionally empty) */
  export type FindInScriptureProjectInterfaceDataTypes = {};

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
       * **Important:** All jobs should have {@link abandonFindJob} called after you no longer need
       * them to free resources and remove them from tracking. Not doing so will lead to memory
       * leaks as jobs are not automatically cleaned up when they finish.
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
       * **Important:** All jobs should have {@link abandonFindJob} called after you no longer need
       * them to free resources and remove them from tracking. Not doing so will lead to memory
       * leaks as jobs are not automatically cleaned up when they finish.
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
       *     abandonFindJob(jobId);
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

  // #endregion Find Types

  // #region Replace Types

  /** Provides information about replacing text in scripture projects (intentionally empty) */
  export type ReplaceWithUsfmProjectInterfaceDataTypes = {};

  /** Provides methods for replacing scripture content with USFM text */
  export type IReplaceWithUsfmProjectDataProvider =
    IProjectDataProvider<ReplaceWithUsfmProjectInterfaceDataTypes> & {
      /**
       * Replaces text at specified Scripture ranges with new USFM content.
       *
       * This method allows replacing multiple ranges of scripture text with USFM strings. Each
       * range specifies a start and end location that can be either a USJ chapter-based location or
       * a USFM verse-based location. The replacement operations are performed atomically.
       *
       * **Important Notes:**
       *
       * - All ranges must be within the same book. Cross-book replacements are not supported.
       * - Ranges must not overlap. Overlapping ranges will cause an error.
       * - If `usfmToInsert` is an array, its length must match `rangesToReplace` length exactly.
       * - If `usfmToInsert` is a single string, it will be used for all replacements.
       * - Ranges are processed in reverse index order to preserve indices during replacement.
       *
       * @example
       *
       * ```typescript
       * // Replace a single range
       * await pdp.replace(
       *   [
       *     {
       *       start: { verseRef: { book: 'MAT', chapterNum: 5, verseNum: 3 }, offset: 0 },
       *       end: { verseRef: { book: 'MAT', chapterNum: 5, verseNum: 3 }, offset: 10 },
       *     },
       *   ],
       *   'Blessed are the poor in spirit',
       * );
       *
       * // Replace multiple ranges with different content
       * await pdp.replace(
       *   [range1, range2, range3],
       *   ['replacement1', 'replacement2', 'replacement3'],
       * );
       * ```
       *
       * @param rangesToReplace - Array of non-overlapping scripture ranges to replace. Each range
       *   has a start and end location that can be {@link UsjChapterLocation} or
       *   {@link UsfmVerseLocation}. Overlapping ranges will cause an error.
       * @param usfmToInsert - The USFM content to insert at each range. Can be a single string
       *   (used for all ranges) or an array of strings (one per range).
       * @throws Error if `usfmToInsert` array length doesn't match `rangesToReplace` length
       * @throws Error if any range spans multiple books
       * @throws Error if any ranges overlap
       */
      replace(
        rangesToReplace: ScriptureRangeUsjChapterOrUsfmVerseLocation[],
        usfmToInsert: string | string[],
      ): Promise<void>;
    };

  // #endregion Replace Types

  // #region Marker Types

  /** Provides information about markers */
  export type MarkerNamesProjectInterfaceDataTypes = {
    /** Gets an array of string that contain information about markers */
    MarkerNames: DataProviderDataType<number, string[], string[]>;
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
      subscribeMarkerNames(
        bookNum: number,
        callback: (markerNames: string[] | undefined | PlatformError) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
    };

  // #endregion Marker Types

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

  /**
   * Represents a selection of scripture text
   *
   * @example To represent a single verse, Matthew 1:1
   *
   * ```json
   * {
   *   "start": { "bookId": "MAT", "chapterNum": 1, "verseNum": 1 }
   * }
   * ```
   *
   * @example To represent Matthew 1:1-5
   *
   * ```json
   * {
   *   "start": { "bookId": "MAT", "chapterNum": 1, "verseNum": 1 },
   *   "end": { "bookId": "MAT", "chapterNum": 1, "verseNum": 5 }
   * }
   * ```
   *
   * @example To represent all of Matthew chapter 3
   *
   * ```json
   * {
   *   "start": { "bookId": "MAT", "chapterNum": 3, "verseNum": 0 },
   *   "end": { "bookId": "MAT", "chapterNum": 3, "verseNum": 999 }
   * }
   * ```
   *
   * @example To represent all of Matthew
   *
   * ```json
   * {
   *   "start": { "bookId": "MAT", "chapterNum": 1, "verseNum": 0 },
   *   "end": { "bookId": "MAT", "chapterNum": 999, "verseNum": 999 }
   * }
   * ```
   */
  export type ScriptureRange = {
    /**
     * Location within a project that is the start of the range.
     *
     * You can use verse 0 to indicate that you want to include all parts of the chapter, including
     * any content that might exist after the chapter marker and prior to the first verse. If you
     * indicate chapter 1 verse 0, that includes all front matter for the book (i.e., all content
     * that occurs prior to the first chapter marker).
     */
    start: SerializedVerseRef;
    /**
     * Location within a project that is the end of the range. If not provided, then only the verse
     * indicated by `start` is included.
     *
     * If the end of a chapter is desired and you don't know how many verses are in the chapter, you
     * can use 999 as the verse number. This is the maximum value that fits in BBBCCCVVV format.
     *
     * If the end of a book is desired and you don't know how many chapters are in the book, you can
     * use 999 as the chapter number. This is the maximum value that fits in BBBCCCVVV format.
     */
    end?: SerializedVerseRef;
  };

  /**
   * Represents a selection of scripture text to feed into a check
   *
   * See {@link ScriptureRange} for details on how to represent ranges.
   */
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
   *
   * Note: the `JSONPath` location type is expected to be a JSONPath relative to the chapter
   * specified by {@link CheckRunResult.verseRef}. For example, if the verseRef is "MAT 5:3", then
   * the JSONPath should be relative to the USJ document that starts at Matthew chapter 5.
   *
   * @deprecated 13 November 2025. Cannot tell where in Scripture a location is by just JSONPath and
   *   offset; must also have book and possibly chapter. Changing this to require specifying book
   *   and chapter.
   */
  export type CheckLocation =
    | (UsjMarkerLocation & { offset?: undefined })
    | UsjTextContentLocation
    | UsfmVerseRefVerseLocation;

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
    verseText: string;
    /**
     * The specific item (i.e. marker, word, punctuation character et cetera) that the result
     * applies to. Is also used present in `messageFormatString` to form a localizable message.
     */
    itemText: string;
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
    /**
     * Starting point where the check result applies in the document
     *
     * Note: some forms of this type are deprecated and will be removed eventually; see
     * {@link CheckLocation} for details.
     */
    start: UsjChapterLocation | UsfmVerseLocation | CheckLocation;
    /**
     * Ending point where the check result applies in the document
     *
     * Note: some forms of this type are deprecated and will be removed eventually; see
     * {@link CheckLocation} for details.
     */
    end: UsjChapterLocation | UsfmVerseLocation | CheckLocation;
  };

  // #endregion Check Types

  // #region Check Runner Types

  /** Details about a check provided by a {@link ICheckRunner} */
  export type CheckRunnerCheckDetails = CheckDetailsWithCheckId;

  /** Data types provided by a service that runs checks */
  export type CheckRunnerDataTypes = {
    AvailableChecks: DataProviderDataType<undefined, CheckRunnerCheckDetails[], never>;
  };

  /**
   * Defines which checks should run on which parts of which projects in a check job. The check job
   * will run on the Cartesian product of all checks and all input ranges.
   */
  export type CheckJobScope = {
    /** IDs of the check to run */
    checkIds: string[];
    /** Ranges of project text to evaluate using the checks */
    inputRanges: CheckInputRange[];
  };

  /**
   * The status of a check job.
   *
   * - `queued`: The job is waiting to run
   * - `running`: The job is currently running
   * - `stopped`: The job was stopped by the user
   * - `errored`: The job encountered an error and is no longer running
   * - `completed`: The job completed successfully
   */
  export type CheckJobStatus = 'queued' | 'running' | 'stopped' | 'errored' | 'completed';

  /**
   * Represents the current status of a potentially running check job, including the results found
   * so far and any errors that occurred. Until a job has reached a terminal state (stopped,
   * errored, or completed), the status of the job may change. It can be polled repeatedly to get
   * updates and retrieve results incrementally.
   */
  export type CheckJobStatusReport = {
    /** Unique ID of the check job */
    jobId: string;
    /** Current status of the check job */
    status: CheckJobStatus;
    /** Percentage of the job that is complete (0-100) */
    percentComplete: number;
    /** Total number of results found so far */
    totalResultsCount: number;
    /** The next set of results found so far, if any. */
    nextResults?: CheckRunResult[];
    /** If the job encountered an error, this will contain the error message */
    error?: string;
    /**
     * Total time in milliseconds that the check operation has taken to run. This is the total time
     * from when the job started until now if the job is still running. If the job is no longer
     * running, then this is the total time it took to run the job until it finished.
     */
    totalExecutionTimeMs: number;
  };

  /** Functions to manage the lifecycle of check jobs */
  export type CheckJobRunner = {
    /**
     * Begin a new check job that will run asynchronously
     *
     * Creates and starts a new check job that will evaluate the specified checks across the
     * provided input ranges. The operation runs asynchronously and can be monitored, stopped, or
     * have results retrieved using the returned job ID.
     *
     * **Important:** All jobs should have {@link abandonCheckJob} called after you no longer need
     * them to free resources and remove them from tracking. Not doing so will lead to memory leaks
     * as jobs are not automatically cleaned up when they finish.
     *
     * @param jobScope - Configuration for the check job, see {@link CheckJobScope}
     * @returns Promise that resolves to a unique job ID that can be used to interact with the check
     *   operation (retrieve results, check status, stop, etc.)
     */
    beginCheckJob: (jobScope: CheckJobScope) => Promise<string>;
    /**
     * Attempt to gracefully stop a running check job
     *
     * Requests the specified check job to stop processing and waits for it to finish gracefully
     * within the specified timeout period. If the job doesn't stop within the timeout, it will
     * continue running but this method will return false.
     *
     * **Important:** All jobs should have {@link abandonCheckJob} called after you no longer need
     * them to free resources and remove them from tracking. Not doing so will lead to memory leaks
     * as jobs are not automatically cleaned up when they finish.
     *
     * @param jobId ID of the job to stop
     * @param timeoutMs Maximum time in milliseconds to wait for the job to stop gracefully.
     *   Defaults to 2000ms (2 seconds).
     * @returns True if the job stopped gracefully within the timeout period, false if the job is
     *   still running after the timeout.
     */
    stopCheckJob: (jobId: string, timeoutMs?: number) => Promise<boolean>;
    /**
     * Clean up a check job that may or may not be running to free resources
     *
     * This prevents any further calls to retrieve results or interact with the job in any way. It
     * is useful for jobs that are no longer needed and should not be tracked. Abandoned jobs will
     * be cleaned up automatically once it is possible.
     *
     * @param jobId ID of the job to abandon
     */
    abandonCheckJob: (jobId: string) => Promise<void>;
    /**
     * Retrieve the current status and results (if desired) of a check job.
     *
     * Once a set of results have been retrieved for a job, they cannot be retrieved again for this
     * job. The results will need to be stored by the caller if they are to be retained. Subsequent
     * calls to retrieve results will return the next set of results found so far.
     *
     * Note that results may become invalid if the underlying project data or settings change. It is
     * the responsibility of the caller to ensure that results are still valid when they are used.
     * To listen for notifications of invalidated check results, subscribe to the
     * `checkResultsInvalidated` network event using `papi.network.getNetworkEvent()`. See
     * {@link CheckResultsInvalidated} for details about that event.
     *
     * @param jobId ID of the job to check
     * @param maxResultsToInclude Maximum number of results to include in the response. Use 0 to get
     *   status without results, or a reasonable number to paginate through large result sets.
     * @returns Status report for the job, including any new results found since the last call
     */
    retrieveCheckJobUpdate: (
      jobId: string,
      maxResultsToInclude: number,
    ) => Promise<CheckJobStatusReport>;
  };

  /** Functions to classify individual check results as "allowed" or "denied" */
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
      itemText: string,
      checkResultUniqueId?: string,
    ) => Promise<boolean>;
    /** Reverse the denial of one particular check result */
    allowCheckResult: (
      checkId: string,
      checkResultType: string,
      projectId: string,
      verseRef: SerializedVerseRef,
      itemText: string,
      checkResultUniqueId?: string,
    ) => Promise<boolean>;
  };

  /** Functions that provide configuration data for a specific check */
  export type CheckConfigurationProvider = {
    /** Returns if setup/configuration for the check has been completed */
    isCheckSetupForProject: (checkId: string, projectId: string) => Promise<boolean>;
  };

  /**
   * All processes that can run checks are expected to implement this type in a data provider
   * registered with object type 'checkRunner'
   */
  export type ICheckRunner = IDataProvider<CheckRunnerDataTypes> &
    CheckJobRunner &
    CheckResultClassifier &
    CheckConfigurationProvider;

  /**
   * When something happens that would invalidate previously calculated check results, an event with
   * an object of this type is emitted. To listen for notifications of invalidated check results,
   * subscribe to the `checkResultsInvalidated` network event using
   * `papi.network.getNetworkEvent()`.
   */
  export type CheckResultsInvalidated = {
    /** IDs of the checks whose results are now invalid */
    checkIds: string[];
    /** ID of the project whose results are now invalid */
    projectId: string;
    /** Scope of the invalidation */
    scope: 'all' | 'book';
    /** If scope is 'book', then this is the ID of the book whose results are now invalid */
    bookId?: string;
  };

  /**
   * Service that aggregates all available {@link ICheckRunner} data providers and provides a single
   * point of interaction for managing checks across all processes. This service itself is also an
   * {@link ICheckRunner} so that consumers only need to interact with one data provider to manage
   * checks everywhere.
   *
   * Use the "platformScripture.checkAggregator" data provider name to access the service.
   */
  export type ICheckAggregatorService = ICheckRunner;

  // #endregion Check Runner Types

  // #region Inventory Data Provider Types

  /** Details about an option available for an inventory */
  export type InventoryOption = {
    /** Name of the option */
    optionName: string;
    /** Localization key for the option name */
    localizeKeyName: LocalizeKey;
    /** Type of the option value: "boolean" or "string" */
    valueType: 'boolean' | 'string';
  };

  /** Details about an available inventory */
  export type AvailableInventory = {
    /** Unique identifier for the inventory (same as the check ID for inventory-based checks) */
    inventoryId: string;
    /** Localization key for the inventory name */
    localizeKeyName: LocalizeKey;
    /** List of options available for this inventory */
    options: InventoryOption[];
  };

  /** Status of an individual inventory item */
  export type InventoryItemStatus = {
    /** The text of the inventory item itself (e.g., single character in character inventory) */
    key: string;
    /** True if the item is valid, false if it is invalid */
    status: boolean;
  };

  /** An inventory option with its value */
  export type InventoryOptionValue = {
    /** Name of the option */
    optionName: string;
    /** Value of the option */
    optionValue: boolean | string;
  };

  /** Selector for inventory option values */
  export type InventoryOptionValuesSelector = {
    /** ID of the project */
    projectId: string;
    /** ID of the inventory */
    inventoryId: string;
    /** Name of the inventory option */
    optionName?: string;
  };

  /**
   * Type of text an inventory can apply to
   *
   * - AllText: All text
   * - VerseText: Verse text only
   * - NonVerseText: Non-verse text only (e.g., headings, footnotes, side bars, etc.)
   * - RegularContent: All verse and non-verse text, excluding Study Bible content
   * - StudyBibleContent: Study Bible content only
   */
  export type InventoryTextType =
    | 'allText'
    | 'verseText'
    | 'nonVerseText'
    | 'regularContent'
    | 'studyBibleContent';

  /** Selector for inventory item status */
  export type InventoryItemStatusSelector = {
    /** ID of the project */
    projectId: string;
    /** ID of the inventory */
    inventoryId: string;
    /** Type of text to get inventory item status for */
    textType?: InventoryTextType;
    /** Specific key of the inventory item of interest */
    key?: string;
  };

  /**
   * Range of project text to evaluate for inventory data
   *
   * See {@link ScriptureRange} for details on how to represent ranges.
   */
  export type InventoryInputRange = CheckInputRange;

  /** One distinct inventory item with its count in the project */
  export type SummarizedInventoryItem = {
    /** The text of the inventory item itself (e.g., single character in character inventory) */
    key: string;
    /** Count of how many times this item appears in the project */
    count: number;
  };

  /** List of summarized inventory items for a specific text type */
  export type SummarizedInventoryItemList = {
    /** Type of text the inventory applies to */
    textType: InventoryTextType;
    /** List of summarized inventory items */
    items: SummarizedInventoryItem[];
  };

  /** Summary of inventory items for a project */
  export type SummarizedInventory = {
    /** ID of the inventory summary */
    summarizedInventoryId: string;
    /** ID of the inventory */
    inventoryId: string;
    /** ID of the project */
    projectId: string;
    /** List of summarized inventory items by text type */
    inventoryCountLists: SummarizedInventoryItemList[];
  };

  /** One instance of an inventory item with its location in the project */
  export type ItemizedInventoryItem = {
    /** Verse reference and offset where this item appears */
    location: UsfmVerseRefVerseLocation;
    /**
     * The text of the inventory item itself (e.g., single character in character inventory).
     *
     * This is generally the same as the key used to identify the inventory item. However, it does
     * not have to be the same. For example, if an inventory tracks the use of distinct words
     * without tracking their exact form, the inventoryText might have different capitalization or
     * diacritics than the key used to identify the inventory item.
     */
    inventoryText: string;
    /** The source text surrounding the inventory item for context */
    sourceText: string;
  };

  /**
   * Scope for an itemized inventory job. A summarized inventory must be built before starting the
   * job since itemized inventory jobs build on top of summarized inventory data.
   */
  export type ItemizedInventoryJobScope = {
    /** ID of the inventory summary */
    summarizedInventoryId: string;
    /** Key of the inventory item to build the itemized inventory for */
    key: string;
  };

  /** Status of an itemized inventory job */
  export type ItemizedInventoryJobStatus = 'running' | 'stopped' | 'errored' | 'completed';

  /**
   * Represents the current status of an itemized inventory job, including the results found so far
   * and any errors that occurred.
   */
  export type ItemizedInventoryJobStatusReport = {
    /** Unique ID of the itemized inventory job */
    jobId: string;
    /** ID of the inventory */
    inventoryId: string;
    /** ID of the project */
    projectId: string;
    /** Key of the inventory item the job is for */
    key: string;
    /** Current status of the itemized inventory job */
    status: ItemizedInventoryJobStatus;
    /** Percentage of the job that is complete (0-100) */
    percentComplete: number;
    /** Total number of locations found so far */
    totalResultsCount: number;
    /** The next set of locations found so far, if any. */
    nextResults?: ItemizedInventoryItem[];
    /** If the job encountered an error, this will contain the error message */
    error?: string;
    /**
     * Total time in milliseconds that the itemized inventory operation has taken to run. This is
     * the total time from when the job started until now if the job is still running. If the job is
     * no longer running, then this is the total time it took to run the job until it finished.
     */
    totalExecutionTimeMs: number;
  };

  /** Data types provided by the inventory data provider */
  export type InventoryDataTypes = {
    /** Get list of available inventories (get only, no set) */
    AvailableInventories: DataProviderDataType<undefined, AvailableInventory[], never>;
    /**
     * Get or set inventory options
     *
     * When getting inventory options, if the `optionName` property is provided in the selector,
     * then only that option's value is returned in the array. If not provided, then all option
     * values for the inventory are returned in the array.
     *
     * When setting inventory options, if the `optionName` property is provided in the selector,
     * then only that option's value is set to a boolean or string value. Passing a value of
     * `undefined` will reset that option to its default value. If `optionName` is not provided,
     * then all option values for the inventory are set based on the array of `InventoryOptionValue`
     * objects passed.
     */
    InventoryOptionValues: DataProviderDataType<
      InventoryOptionValuesSelector,
      InventoryOptionValue[],
      InventoryOptionValue[] | boolean | string | undefined
    >;
    /**
     * Get or set inventory item status
     *
     * When getting inventory item status, if the `key` property is provided in the selector, then
     * only that item's status is returned in the array. If not provided, then all item statuses for
     * the inventory are returned in the array.
     *
     * When setting inventory item status, if the `key` property is provided in the selector, then
     * only that item's status is set to true (valid), false (invalid), or undefined (unknown). If
     * `key` is not provided, then all item statuses for the inventory are set based on the array of
     * `InventoryItemStatus` objects passed.
     *
     * When both getting and setting, the `textType` property can be used to filter which text types
     * to consider when retrieving or updating item statuses. If not provided, all text types are
     * considered.
     */
    InventoryItemStatus: DataProviderDataType<
      InventoryItemStatusSelector,
      InventoryItemStatus[],
      InventoryItemStatus[] | boolean | undefined
    >;
  };

  /**
   * Data provider that provides information about inventories and allows managing inventory options
   * and item statuses
   */
  export type IInventoryDataProvider = IDataProvider<InventoryDataTypes> & {
    /**
     * Build a summarized inventory for a project
     *
     * Creates a summarized inventory for the specified inventory within the provided input ranges.
     * The operation runs asynchronously and returns summarized inventory data, including a unique
     * ID that can be used to retrieve itemized inventory data later.
     *
     * **Important:** All summarized inventories should have {@link discardSummarizedInventory}
     * called when no longer needed to free resources. Not doing so will lead to memory leaks.
     *
     * @param inventoryId ID of the inventory to build the summary for
     * @param inputRanges Ranges of project text to evaluate for inventory data
     * @returns Promise that resolves to a {@link SummarizedInventory} object
     */
    buildInventorySummary: (
      inventoryId: string,
      inputRanges: InventoryInputRange[],
    ) => Promise<SummarizedInventory>;
    /**
     * Discard a previously built summarized inventory to free resources
     *
     * Note that once discarded, the summarized inventory ID can no longer be used to start itemized
     * inventory jobs.
     *
     * @param summarizedInventoryId ID of the summarized inventory to discard
     */
    discardInventorySummary: (summarizedInventoryId: string) => Promise<void>;
    /**
     * Begin a new itemized inventory job that will run asynchronously
     *
     * Creates and starts a new itemized inventory job that will evaluate the specified inventory
     * item within the provided summarized inventory. The operation runs asynchronously and can be
     * monitored using the returned job ID.
     *
     * **Important:** All jobs should have {@link abandonItemizedInventoryJob} called after you no
     * longer need them to free resources and remove them from tracking. Not doing so will lead to
     * memory leaks as jobs are not automatically cleaned up when they finish.
     *
     * @param jobScope - Configuration for the itemized inventory job, see
     *   {@link ItemizedInventoryJobScope}
     * @returns Promise that resolves to a unique job ID that can be used to interact with the
     *   operation (retrieve results, check status, etc.)
     */
    beginItemizedInventoryJob: (jobScope: ItemizedInventoryJobScope) => Promise<string>;
    /**
     * Attempt to gracefully stop a running itemized inventory job
     *
     * Requests the specified itemized inventory job to stop processing and waits for it to finish
     * gracefully within the specified timeout period. If the job doesn't stop within the timeout,
     * it will continue running but this method will return false.
     *
     * **Important:** All jobs should have {@link abandonItemizedInventoryJob} called after you no
     * longer need them to free resources and remove them from tracking. Not doing so will lead to
     * memory leaks as jobs are not automatically cleaned up when they finish.
     *
     * @param jobId ID of the job to stop
     * @param timeoutMs Maximum time in milliseconds to wait for the job to stop gracefully.
     *   Defaults to 2000ms (2 seconds).
     * @returns True if the job stopped gracefully within the timeout period, false if the job is
     *   still running after the timeout.
     */
    stopItemizedInventoryJob: (jobId: string, timeoutMs?: number) => Promise<boolean>;
    /**
     * Clean up an itemized inventory job that may or may not be running to free resources
     *
     * This prevents any further calls to retrieve results or interact with the job in any way. It
     * is useful for jobs that are no longer needed and should not be tracked. Abandoned jobs will
     * be cleaned up automatically once it is possible.
     *
     * @param jobId ID of the job to abandon
     */
    abandonItemizedInventoryJob: (jobId: string) => Promise<void>;
    /**
     * Retrieve the current status and results (if desired) of an itemized inventory job.
     *
     * Once a set of results have been retrieved for a job, they cannot be retrieved again for this
     * job. The results will need to be stored by the caller if they are to be retained. Subsequent
     * calls to retrieve results will return the next set of results found so far.
     *
     * @param jobId ID of the job to check
     * @param maxResultsToInclude Maximum number of results to include in the response. Use 0 to get
     *   status without results, or a reasonable number to paginate through large result sets.
     * @returns Status report for the job, including any new results found since the last call
     */
    retrieveItemizedInventoryJobUpdate: (
      jobId: string,
      maxResultsToInclude: number,
    ) => Promise<ItemizedInventoryJobStatusReport>;
  };

  // #endregion Inventory Data Provider Types

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

  // #endregion Check Hosting (in the Extension Host) Types

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

  // #endregion Send/Receive Types

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

  // #endregion ChecksSetup Types
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
    IReplaceWithUsfmProjectDataProvider,
    ICheckAggregatorService,
    ICheckRunner,
    IInventoryDataProvider,
    CheckDetails,
    CheckCreatorFunction,
    CheckResultsInvalidated,
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
    'platformScripture.replaceWithUsfm': IReplaceWithUsfmProjectDataProvider;
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
    /** Data provider for managing inventories and their options */
    'platformScripture.inventoryDataProvider': IInventoryDataProvider;
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

    'platformScripture.invalidateCheckResults': (details: CheckResultsInvalidated) => Promise<void>;

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

    'platformScripture.openFind': (projectId?: string | undefined) => Promise<string | undefined>;
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
