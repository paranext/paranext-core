declare module 'usfm-data-provider' {
  import { VerseRef } from '@sillsdev/scripture';
  import type {
    DataProviderDataType,
    DataProviderSubscriberOptions,
    DataProviderUpdateInstructions,
    ExtensionDataScope,
    IDataProvider,
    MandatoryProjectDataType,
    Unsubscriber,
  } from '@papi/core';

  export type UsfmProviderDataTypes = {
    BookNames: DataProviderDataType<boolean, string[], never>;
    Chapter: DataProviderDataType<VerseRef, string | undefined, never>;
    ChapterUsx: DataProviderDataType<VerseRef, string | undefined, string>;
    BookUsx: DataProviderDataType<VerseRef, string | undefined, never>;
    Verse: DataProviderDataType<VerseRef, string | undefined, never>;
  };

  export type UsfmDataProvider = IDataProvider<UsfmProviderDataTypes>;

  /**
   * Provides project data for Paratext Scripture projects.
   *
   * This is not yet a complete list of the data types available from Paratext projects.
   */
  export type ParatextStandardProjectDataTypes = MandatoryProjectDataType & {
    /** Gets/sets the "raw" USFM data for the specified book */
    BookUSFM: DataProviderDataType<VerseRef, string | undefined, string>;
    /** Gets/sets the "raw" USFM data for the specified chapter */
    ChapterUSFM: DataProviderDataType<VerseRef, string | undefined, string>;
    /** Gets/sets the "raw" USFM data for the specified verse */
    VerseUSFM: DataProviderDataType<VerseRef, string | undefined, string>;
    /** Gets/sets the data in USX form for the specified chapter */
    ChapterUSX: DataProviderDataType<VerseRef, string | undefined, string>;
    /**
     * Gets the tokenized USJ data for the specified book
     *
     * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
     * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
     * change over time.
     */
    BookUSJ: DataProviderDataType<VerseRef, USJDocument | undefined, USJDocument>;
    /**
     * Gets the tokenized USJ data for the specified chapter
     *
     * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
     * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
     * change over time.
     */
    ChapterUSJ: DataProviderDataType<VerseRef, USJDocument | undefined, USJDocument>;
    /**
     * Gets the tokenized USJ data for the specified verse
     *
     * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
     * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
     * change over time.
     */
    VerseUSJ: DataProviderDataType<VerseRef, USJDocument | undefined, USJDocument>;
  };

  /**
   * Scripture data represented in JSON format. Transformation from USX
   *
   * [See more information
   * here](https://github.com/paranext/paranext-core/issues/480#issuecomment-1751094148)
   */
  type USJDocument = {
    /** The Scripture data serialization format used for this document */
    type: 'USJ';
    /** The USJ spec version */
    version: '0.0.1-alpha.2';
    /** Scripture contents laid out in a linear fashion */
    content: MarkerContent[];
  };

  /** One piece of Scripture content. Can be a simple string or a marker and its contents */
  type MarkerContent = string | MarkerObject;

  /** A Scripture Marker and its contents */
  type MarkerObject = {
    /**
     * The kind of node or element this is, corresponding to each marker in USFM or each node in USX
     *
     * Its format is `type:style`
     *
     * @example `para:p`, `verse:v`, `char:nd`
     */
    type: `${string}:${string}`;
    /** This marker's contents laid out in a linear fashion */
    content?: MarkerContent[];
    /** Indicates the Book-chapter-verse value in the paragraph based structure */
    sid?: string;
    /** Chapter number or verse number */
    number?: string;
    /** The 3-letter book code in the id element */
    code?: BookCode;
    /** Alternate chapter number or verse number */
    altnumber?: string;
    /** Published character of chapter or verse */
    pubnumber?: string;
    /** Caller character for footnotes and cross-refs */
    caller?: string;
    /** Alignment of table cells */
    align?: string;
    /** Category of extended study bible sections */
    category?: string;
  };

  /** Three-letter Scripture book code */
  // prettier-ignore
  type BookCode = "GEN" | "EXO" | "LEV" | "NUM" | "DEU" | "JOS" | "JDG" | "RUT" | "1SA" | "2SA" | "1KI" | "2KI" | "1CH" | "2CH" | "EZR" | "NEH" | "EST" | "JOB" | "PSA" | "PRO" | "ECC" | "SNG" | "ISA" | "JER" | "LAM" | "EZK" | "DAN" | "HOS" | "JOL" | "AMO" | "OBA" | "JON" | "MIC" | "NAM" | "HAB" | "ZEP" | "HAG" | "ZEC" | "MAL" | "MAT" | "MRK" | "LUK" | "JHN" | "ACT" | "ROM" | "1CO" | "2CO" | "GAL" | "EPH" | "PHP" | "COL" | "1TH" | "2TH" | "1TI" | "2TI" | "TIT" | "PHM" | "HEB" | "JAS" | "1PE" | "2PE" | "1JN" | "2JN" | "3JN" | "JUD" | "REV" | "TOB" | "JDT" | "ESG" | "WIS" | "SIR" | "BAR" | "LJE" | "S3Y" | "SUS" | "BEL" | "1MA" | "2MA" | "3MA" | "4MA" | "1ES" | "2ES" | "MAN" | "PS2" | "ODA" | "PSS" | "EZA" | "5EZ" | "6EZ" | "DAG" | "PS3" | "2BA" | "LBA" | "JUB" | "ENO" | "1MQ" | "2MQ" | "3MQ" | "REP" | "4BA" | "LAO" | "FRT" | "BAK" | "OTH" | "INT" | "CNC" | "GLO" | "TDX" | "NDX" | "XXA" | "XXB" | "XXC" | "XXD" | "XXE" | "XXF" | "XXG";

  /**
   * Provides project data for Paratext Scripture projects. One is created for each project that is
   * used
   *
   * This is a hand-written baked-out version of `ParatextStandardProjectDataProvider` for ease of
   * reading
   */
  type ParatextStandardProjectDataProviderExpanded = {
    /** Gets the "raw" USFM data for the specified book */
    getBookUSFM(verseRef: VerseRef): Promise<string | undefined>;
    /** Sets the "raw" USFM data for the specified book */
    setBookUSFM(
      verseRef: VerseRef,
      usfm: string,
    ): Promise<DataProviderUpdateInstructions<ParatextStandardProjectDataTypes>>;
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
    ): Unsubscriber;

    /** Gets the "raw" USFM data for the specified chapter */
    getChapterUSFM(verseRef: VerseRef): Promise<string | undefined>;
    /** Sets the "raw" USFM data for the specified chapter */
    setChapterUSFM(
      verseRef: VerseRef,
      usfm: string,
    ): Promise<DataProviderUpdateInstructions<ParatextStandardProjectDataTypes>>;
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
    ): Unsubscriber;

    /** Gets the "raw" USFM data for the specified verse */
    getVerseUSFM(verseRef: VerseRef): Promise<string | undefined>;
    /** Sets the "raw" USFM data for the specified verse */
    setVerseUSFM(
      verseRef: VerseRef,
      usfm: string,
    ): Promise<DataProviderUpdateInstructions<ParatextStandardProjectDataTypes>>;
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
    ): Unsubscriber;

    /** Gets the Scripture text in USX format for the specified chapter */
    getChapterUSX(verseRef: VerseRef): Promise<string | undefined>;
    /** Sets the Scripture text in USX format for the specified chapter */
    setChapterUSX(
      verseRef: VerseRef,
      usx: string,
    ): Promise<DataProviderUpdateInstructions<ParatextStandardProjectDataTypes>>;
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
    ): Unsubscriber;

    /**
     * Gets the tokenized USJ data for the specified book
     *
     * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
     * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
     * change over time.
     */
    getBookUSJ(verseRef: VerseRef): Promise<USJDocument | undefined>;
    /**
     * Sets the tokenized USJ data for the specified book
     *
     * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
     * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
     * change over time.
     */
    setBookUSJ(
      verseRef: VerseRef,
      usj: USJDocument,
    ): Promise<DataProviderUpdateInstructions<ParatextStandardProjectDataTypes>>;
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
      callback: (usj: USJDocument | undefined) => void,
      options?: DataProviderSubscriberOptions,
    ): Unsubscriber;

    /**
     * Gets the tokenized USJ data for the specified chapter
     *
     * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
     * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
     * change over time.
     */
    getChapterUSJ(verseRef: VerseRef): Promise<USJDocument | undefined>;
    /**
     * Sets the tokenized USJ data for the specified chapter
     *
     * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
     * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
     * change over time.
     */
    setChapterUSJ(
      verseRef: VerseRef,
      usj: USJDocument,
    ): Promise<DataProviderUpdateInstructions<ParatextStandardProjectDataTypes>>;
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
    subscribeChapterUSJ(
      verseRef: VerseRef,
      callback: (usj: USJDocument | undefined) => void,
      options?: DataProviderSubscriberOptions,
    ): Unsubscriber;

    /**
     * Gets the tokenized USJ data for the specified verse
     *
     * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
     * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
     * change over time.
     */
    getVerseUSJ(verseRef: VerseRef): Promise<USJDocument | undefined>;
    /**
     * Sets the tokenized USJ data for the specified verse
     *
     * WARNING: USJ is one of many possible tokenized formats that we may use, so this may change
     * over time. Additionally, USJ is in very early stages of proposal, so it will likely also
     * change over time.
     */
    setVerseUSJ(
      verseRef: VerseRef,
      usj: USJDocument,
    ): Promise<DataProviderUpdateInstructions<ParatextStandardProjectDataTypes>>;
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
      callback: (usj: USJDocument | undefined) => void,
      options?: DataProviderSubscriberOptions,
    ): Unsubscriber;

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
    ): Promise<DataProviderUpdateInstructions<ParatextStandardProjectDataTypes>>;
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
    ): Unsubscriber;
  };
}

declare module 'papi-shared-types' {
  import type { ParatextStandardProjectDataTypes, UsfmDataProvider } from 'usfm-data-provider';

  export interface ProjectDataTypes {
    ParatextStandard: ParatextStandardProjectDataTypes;
  }

  export interface DataProviders {
    usfm: UsfmDataProvider;
  }
}
