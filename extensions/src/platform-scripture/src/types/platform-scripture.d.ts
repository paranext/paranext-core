declare module 'platform-scripture' {
  import { SerializedVerseRef, VerseRef } from '@sillsdev/scripture';
  import type {
    DataProviderDataType,
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
    ExtensionDataScope,
    IDataProvider,
    // @ts-ignore: TS2307 - Cannot find module '@papi/core' or its corresponding type declarations
  } from '@papi/core';
  import type { IProjectDataProvider } from 'papi-shared-types';
  import { Dispose, LocalizeKey, UnsubscriberAsync } from 'platform-bible-utils';
  import type { Usj } from '@biblionexus-foundation/scripture-utilities';

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

  // #endregion

  // #region Project Data Provider Types

  /** Provides Scripture data in USFM format by book */
  export type IUSFMBookProjectDataProvider =
    IProjectDataProvider<USFMBookProjectInterfaceDataTypes> & {
      /** Gets the "raw" USFM data for the specified book */
      getBookUSFM(verseRef: VerseRef): Promise<string | undefined>;
      /** Sets the "raw" USFM data for the specified book */
      setBookUSFM(
        verseRef: VerseRef,
        usfm: string,
      ): Promise<DataProviderUpdateInstructions<USFMBookProjectInterfaceDataTypes>>;
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
    };

  /** Provides Scripture data in USFM format by chapter */
  export type IUSFMChapterProjectDataProvider =
    IProjectDataProvider<USFMChapterProjectInterfaceDataTypes> & {
      /** Gets the "raw" USFM data for the specified chapter */
      getChapterUSFM(verseRef: VerseRef): Promise<string | undefined>;
      /** Sets the "raw" USFM data for the specified chapter */
      setChapterUSFM(
        verseRef: VerseRef,
        usfm: string,
      ): Promise<DataProviderUpdateInstructions<USFMChapterProjectInterfaceDataTypes>>;
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
    };

  /** Provides Scripture data in USFM format by verse */
  export type IUSFMVerseProjectDataProvider =
    IProjectDataProvider<USFMVerseProjectInterfaceDataTypes> & {
      /** Gets the "raw" USFM data for the specified verse */
      getVerseUSFM(verseRef: VerseRef): Promise<string | undefined>;
      /** Sets the "raw" USFM data for the specified verse */
      setVerseUSFM(
        verseRef: VerseRef,
        usfm: string,
      ): Promise<DataProviderUpdateInstructions<USFMVerseProjectInterfaceDataTypes>>;
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

  /** Provides Scripture data in USX format by book */
  export type IUSXBookProjectDataProvider =
    IProjectDataProvider<USXBookProjectInterfaceDataTypes> & {
      /** Gets the "raw" USX data for the specified book */
      getBookUSX(verseRef: VerseRef): Promise<string | undefined>;
      /** Sets the "raw" USX data for the specified book */
      setBookUSX(
        verseRef: VerseRef,
        usx: string,
      ): Promise<DataProviderUpdateInstructions<USXBookProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the "raw" USX data is changed
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USX for this selector
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeBookUSX(
        verseRef: VerseRef,
        callback: (usx: string | undefined) => void,
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

  /** Provides Scripture data in USX format by verse */
  export type IUSXVerseProjectDataProvider =
    IProjectDataProvider<USXVerseProjectInterfaceDataTypes> & {
      /** Gets the "raw" USX data for the specified verse */
      getVerseUSX(verseRef: VerseRef): Promise<string | undefined>;
      /** Sets the "raw" USX data for the specified verse */
      setVerseUSX(
        verseRef: VerseRef,
        usx: string,
      ): Promise<DataProviderUpdateInstructions<USXVerseProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the "raw" USX data is changed
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USX for this selector
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeVerseUSX(
        verseRef: VerseRef,
        callback: (usx: string | undefined) => void,
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
      ): Promise<DataProviderUpdateInstructions<USJBookProjectInterfaceDataTypes>>;
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
      ): Promise<DataProviderUpdateInstructions<USJVerseProjectInterfaceDataTypes>>;
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
      getVersePlainText(verseRef: VerseRef): Promise<Usj | undefined>;
      /**
       * Sets the data in plain text form for the specified verse. Plain text does not include
       * notes, figures, and other things that are not considered "verse text"
       */
      setVersePlainText(
        verseRef: VerseRef,
        data: string,
      ): Promise<DataProviderUpdateInstructions<PlainTextVerseProjectInterfaceDataTypes>>;
      /**
       * Subscribe to run a callback function when the plain text data is changed. Plain text does
       * not include notes, figures, and other things that are not considered "verse text"
       *
       * @param verseRef Tells the provider what changes to listen for
       * @param callback Function to run with the updated USJ for this selector
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscribeVersePlainText(
        verseRef: VerseRef,
        callback: (usj: Usj | undefined) => void,
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
       * @param callback Function to run with the updated marker info for this selector
       * @param options Various options to adjust how the subscriber emits updates
       * @returns Unsubscriber function (run to unsubscribe from listening for updates)
       */
      subscriberMarkerNames(
        bookNum: number,
        callback: (markerNames: string[] | undefined) => void,
        options?: DataProviderSubscriberOptions,
      ): Promise<UnsubscriberAsync>;
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

  /**
   * All processes that can run checks are expected to implement this type in a data provider
   * registered with object type 'checkRunner'
   */
  export type ICheckRunner = IDataProvider<CheckRunnerDataTypes> &
    CheckEnablerDisabler &
    CheckResultClassifier;

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
    CheckSubscriptionManager & {
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
