import {
  Usj,
  type MarkerContent,
  type MarkerObject,
} from '@eten-tech-foundation/scripture-utilities';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { MarkersMap } from './markers-maps/markers-map-3.0.model';

/** USJ content node type for a book */
export const BOOK_TYPE = 'book';

/** USJ content node type for a chapter */
export const CHAPTER_TYPE = 'chapter';

/** USJ content node type for a verse */
export const VERSE_TYPE = 'verse';

/** 3-character code that indicates there is no known book */
export const NO_BOOK_ID = '***';

/**
 * Represents a book, chapter, verse, and offset
 *
 * @deprecated 23 October 2025. Use {@link UsfmVerseLocation} or {@link UsfmLocation} instead.
 */
export type VerseRefOffset = {
  verseRef: SerializedVerseRef;
  offset: number;
};

// #region Serializable USFM and USJ locations

/**
 * JSON path to a {@link MarkerObject}, {@link Usj}, or text content string in the current USJ
 * document.
 *
 * This could actually have more content clauses at the end, but TS types are limited
 */
export type ContentJsonPath =
  | ''
  | `$`
  | `$.content[${number}]`
  | `$.content[${number}].content[${number}]`
  | `$.content[${number}].content[${number}].content[${number}]`
  | `$.content[${number}].content[${number}].content[${number}].content[${number}]`;

/**
 * JSON path to the `marker` or an attribute on a {@link MarkerObject} or {@link Usj} in the current
 * USJ document. Note that it seems you must use `['bracket notation']` rather than `.dot` notation
 * if there are symbols other than underscore in the property name
 *
 * This could actually have more content clauses at the end, but TS types are limited
 */
export type PropertyJsonPath =
  | ''
  | `$.${string}`
  | `$['${string}']`
  | `$.content[${number}].${string}`
  | `$.content[${number}]['${string}']`
  | `$.content[${number}].content[${number}].${string}`
  | `$.content[${number}].content[${number}]['${string}']`
  | `$.content[${number}].content[${number}].content[${number}].${string}`
  | `$.content[${number}].content[${number}].content[${number}]['${string}']`
  | `$.content[${number}].content[${number}].content[${number}].content[${number}].${string}`
  | `$.content[${number}].content[${number}].content[${number}].content[${number}]['${string}']`;

/**
 * A verse ref and an offset in USFM space that point to a specific location in USFM.
 *
 * The USJ representation of the positions represented by this type are {@link UsjDocumentLocation}.
 * Note, however, that those locations are relative to a specific USJ document rather than being
 * absolute verse reference locations like this type.
 *
 * To see many examples of the same point represented by both USFM and USJ locations, go to
 * https://github.com/paranext/paranext-core/tree/main/lib/platform-bible-utils/src/scripture/usj-reader-writer-test-data/testUSFM-2SA-1-locations.ts
 *
 * Note: This type may be expanded in the future to allow for specifying offsets based on other
 * locations than a specific verse like from the start of a chapter or book. If you do not want to
 * offer such features, use {@link UsfmVerseLocation}, whose offset is based on a specific verse.
 */
export type UsfmLocation = UsfmVerseLocation;

/**
 * A verse ref and an offset within that verse in USFM space that point to a specific location in
 * USFM
 */
export type UsfmVerseLocation = {
  /** Verse reference indicating which verse the location is in */
  verseRef: SerializedVerseRef;
  /**
   * Offset to apply to start of the verse indicated by `verseRef`.
   *
   * If the verse is 0, offset 0 is the start of the chapter. If the verse is greater than 0, offset
   * 0 is the backslash on the verse marker.
   *
   * If not provided, defaults to 0.
   */
  offset?: number;
};

/**
 * A JSONPath query to a {@link MarkerContent}, {@link Usj}, or property within a USJ document and
 * additional information that point to a specific location in USJ.
 *
 * This type does not include a verse reference because the JSONPath is relative to a specific USJ
 * document; that USJ document may have a book, a chapter, or something else in it.
 *
 * This type intends to represent USFM positions ({@link UsfmLocation}) in USJ space. However, there
 * are some USFM positions that are not currently representable with these types:
 *
 * - The second slash in `optbreak`'s USFM representation `//` (literally not representable)
 * - Nested marker prefix on opening markers like `+` for character markers (literally not
 *   representable)
 * - The bar `|` that indicates the start of closing marker attributes (no official representation)
 * - The equals sign for closing marker attributes (no official representation)
 * - The quotes around closing marker attribute values (no official representation)
 * - The space between closing marker attributes (no official representation)
 *
 * To see many examples of the same point represented by both USFM and USJ locations, go to
 * https://github.com/paranext/paranext-core/tree/main/lib/platform-bible-utils/src/scripture/usj-reader-writer-test-data/testUSFM-2SA-1-locations.ts
 */
export type UsjDocumentLocation =
  | UsjMarkerLocation
  | UsjClosingMarkerLocation
  | UsjTextContentLocation
  | UsjPropertyValueLocation
  | UsjAttributeKeyLocation
  | UsjAttributeMarkerLocation
  | UsjClosingAttributeMarkerLocation;

/**
 * A JSONPath query to a {@link MarkerObject} or {@link Usj} node. Indicates the very beginning of
 * that marker (at the backslash in USFM).
 */
export type UsjMarkerLocation = {
  /** JSON path to the marker object the location is pointing to. */
  jsonPath: ContentJsonPath;
};

/**
 * A JSONPath query to a specific point in the closing marker representation of a
 * {@link MarkerObject} or {@link Usj} node.
 */
export type UsjClosingMarkerLocation = {
  /**
   * JSON path to the marker object whose closing marker the location is pointing to. The offset
   * applies to the closing marker representation of that marker (for example, `\nd*` in USFM).
   */
  jsonPath: ContentJsonPath;
  /**
   * The character index in the closing marker representation where this location is pointing. The
   * location is at this offset within the closing marker representation.
   */
  closingMarkerOffset: number;
};

/**
 * A JSONPath query to a specific point in a text content string in a {@link MarkerObject.content}
 * array.
 */
export type UsjTextContentLocation = {
  /**
   * JSON path to the text content string the location is pointing to. The offset applies to this
   * text string.
   */
  jsonPath: ContentJsonPath;
  /**
   * The character index in the text content string where this location is pointing. The location is
   * at this offset within the text content string.
   */
  offset: number;
};

/**
 * A JSONPath query to a specific point in a property (`marker` or an attribute) value string in a
 * {@link MarkerObject} or {@link Usj}. The property cannot be `type` because `type`'s value has no
 * representation in USFM.
 *
 * To represent a location in an attribute's key, use {@link UsjAttributeKeyLocation}.
 */
export type UsjPropertyValueLocation = {
  /**
   * JSON path to the property the location is pointing to. The offset applies to this property's
   * value string.
   */
  jsonPath: PropertyJsonPath;
  /**
   * The character index in the property's value string where this location is pointing. The
   * location is at this offset within the property's value string.
   */
  propertyOffset: number;
};

/**
 * A JSONPath query to a specific point in an attribute key string in a {@link MarkerObject} or
 * {@link Usj}. The property cannot be `type` or `marker` because these properties' keys have no
 * representation in USFM. The property also cannot be any special attribute whose key doesn't have
 * a text representation in USFM like default attribute, leading attribute, text content attribute
 *
 * To represent a location in an attribute's value, use {@link UsjPropertyValueLocation}.
 */
export type UsjAttributeKeyLocation = {
  /**
   * JSON path to the marker whose attribute key the location is pointing to. The offset applies to
   * this attribute's key string unless the attribute is an attribute marker in USFM.
   */
  jsonPath: ContentJsonPath;
  /** Attribute name on the marker object whose key this location is pointing to. */
  keyName: string;
  /**
   * The character index in the attribute's key string where this location is pointing.
   *
   * If the attribute is an attribute marker in USFM, the location is at this offset within the
   * marker name for this attribute marker (for example, `c`'s `altnumber` attribute has attribute
   * marker `ca`, so its `keyOffset` applies to `ca`).
   *
   * If the attribute is not an attribute marker in USFM, the location is at this offset within the
   * attribute's key string.
   */
  keyOffset: number;
};

/**
 * A JSONPath query to an attribute marker derived from an attribute on a {@link MarkerObject} or
 * {@link Usj}. Indicates the very beginning of that marker (at the backslash in USFM).
 */
export type UsjAttributeMarkerLocation = {
  /** JSON path to the marker whose attribute marker the location is pointing to. */
  jsonPath: ContentJsonPath;
  /**
   * Attribute name on the marker object whose key this location is pointing to. This attribute is
   * an attribute marker in USFM.
   */
  keyName: string;
};

/**
 * A JSONPath query to a specific point in the closing marker representation of an attribute marker
 * derived from an attribute on a {@link MarkerObject} or {@link Usj}.
 */
export type UsjClosingAttributeMarkerLocation = {
  /**
   * JSON path to the marker whose attribute marker's closing marker the location is pointing to.
   * The offset applies to the closing marker representation of that attribute marker (for example,
   * `\ca*` in USFM).
   */
  jsonPath: ContentJsonPath;
  /**
   * Attribute name on the marker object whose key this location is pointing to. This attribute is
   * an attribute marker in USFM.
   */
  keyName: string;
  /**
   * The character index in the closing marker representation where this location is pointing. The
   * location is at this offset within the closing marker representation of the attribute marker.
   */
  keyClosingMarkerOffset: number;
};

// #endregion Serializable USFM and USJ locations

/**
 * Node in a USJ object (including the top-level Usj object) and its location in the document. You
 * must make sure you only add `node`s that correspond to the appropriate type of
 * `UsjDocumentLocation` (e.g. if `documentLocation` is a {@link UsjTextContentLocation}, `node` must
 * be a text content string)
 *
 * You can specify a particular kind of `UsjDocumentLocation` in the generic type
 * `TDocumentLocation`, and that will narrow `documentLocation` to that specific kind of location.
 */
export type UsjNodeAndDocumentLocation<
  TDocumentLocation extends UsjDocumentLocation = UsjDocumentLocation,
> = {
  node: TDocumentLocation extends UsjTextContentLocation ? string : MarkerObject | Usj;
  documentLocation: TDocumentLocation;
};

/** Result of a search for text within a USJ object */
export type UsjSearchResult = {
  location: UsjNodeAndDocumentLocation<UsjTextContentLocation>;
  /** The matching text that was found at the location */
  text: string;
};

/**
 * Set of options to provide to `UsjReaderWriter`'s constructor to customize how the reading and
 * writing works
 */
export type UsjReaderWriterOptions = {
  /**
   * A map of all USFM/USX/USJ markers and some information about them. Used for translating between
   * the formats
   *
   * Defaults to trying to use a built-in markers map that matches the version of the USJ passed in.
   *
   * Currently supported built-in USFM versions:
   *
   * - 3.0/3.0.x
   */
  markersMap?: MarkersMap;
  /**
   * Whether the transformations should preserve invisible characters as in Paratext 9
   * (`ScrText.Settings.AllowInvisibleChars`).
   *
   * Defaults to `false`
   */
  shouldAllowInvisibleCharacters?: boolean;
};

/** Utilities for reading from and writing to `Usj` objects */
export interface IUsjReaderWriter {
  /**
   * Return a copy of text following a given starting point
   *
   * @param start Point where text extraction will start
   * @param desiredLength Length of text to extract from this USJ data
   */
  extractText(start: UsjNodeAndDocumentLocation, desiredLength: number): string;
  /**
   * Return a copy of text between two points
   *
   * @param start Point where text extraction will start
   * @param end Point where text extraction will end
   * @param maxLength Maximum length of string to return (defaults to 100)
   * @returns Text between the two points, capped at length `maxLength`
   */
  extractTextBetweenPoints(
    start: UsjNodeAndDocumentLocation,
    end: UsjNodeAndDocumentLocation,
    maxLength: number,
  ): string;
  /**
   * Given a starting point, find the next location in this USJ data that matches the given text
   *
   * @param start Point where the search for `text` will start
   * @param text Text to find. Note you can use an empty string to find the closest text in or after
   *   the `start` point.
   * @param maxTextLengthToSearch Maximum length of text to search before stopping (default is 1000)
   * @returns Object containing the USJ node where `text` begins (it might be split across nodes),
   *   offset within that node that indicates where `text` begins, and a JSONPath string that
   *   indicates the location of the of USJ node within `usj`. Note that if the USJ node returned is
   *   an object, it is the same object that is within this USJ data. So if you change it, you are
   *   changing this USJ data.
   */
  findNextLocationOfMatchingText(
    start: UsjNodeAndDocumentLocation,
    text: string,
    maxTextLengthToSearch: number,
  ): UsjNodeAndDocumentLocation<UsjTextContentLocation> | undefined;
  /** Find the first value matching the given JSONPath query within this USJ data */
  findSingleValue<T>(jsonPathQuery: string): T | undefined;
  /** Find the parent of the first value matching the given JSONPath query within this USJ data */
  findParent<T>(jsonPathQuery: string): T | undefined;
  /**
   * Convert a JSONPath query into a SerializedVerseRef and offset
   *
   * @param jsonPathQuery JSONPath search expression that indicates a node within this USJ data. If
   *   the expression matches more than one node, then only the first node found is considered.
   * @param bookIdIfNotFound 3-letter ID of the book this USJ document is in (only used if a book ID
   *   is not found in the USJ document)
   * @returns SerializedVerseRef and offset that represents the location within this USJ data
   *   indicated by `jsonPathQuery`
   */
  jsonPathToUsfmVerseLocation(jsonPathQuery: string, bookIdIfNotFound?: string): UsfmVerseLocation;
  /** Build a JSONPath query that uniquely identifies the given node with this USJ data. */
  nodeToJsonPath(node: MarkerObject): ContentJsonPath;
  /**
   * Determine the location in the USFM representation of this data that corresponds to the location
   * of a node somewhere within this USJ data
   *
   * @param node JSON object or string in the USJ data to get the USFM location for
   * @param nodeParent JSON object that owns the `content` array that includes `node`. Required if
   *   `node` is a string; optional and unused if `node` is a {@link MarkerObject} or {@link Usj}
   * @param bookIdIfNotFound 3-letter ID of the book this USJ document is in (only used if a book ID
   *   is not found in the USJ document)
   * @returns SerializedVerseRef and offset representing the location of `node`, if one could be
   *   found
   * @throws If `node` is a string and no `nodeParent` is provided
   * @throws If not able to establish relationship between string `node` and `nodeParent`
   * @throws If not able to find the node in the USJ document
   * @throws If not able to find a book ID in the USJ document and `bookIdIfNotFound` is not
   *   provided
   */
  nodeToUsfmVerseLocation(
    node: MarkerContent | Usj,
    nodeParent?: MarkerObject | MarkerContent[] | Usj,
    bookIdIfNotFound?: string,
  ): UsfmVerseLocation;
  /**
   * Remove all nodes from this USJ data that match a given search function.
   *
   * @param searchFunction Function that returns `true` if the given node should be removed
   * @returns Number of nodes removed
   */
  removeContentNodes(searchFunction: (potentiallyMatchingNode: MarkerContent) => boolean): number;
  /**
   * Search for matches of a regular expression within this USJ's text data
   *
   * @param regex Regular expression to search for. Specify the global flag to find all matches.
   * @returns Array of `UsjSearchResult` objects that match the given regular expression
   */
  search(regex: RegExp): UsjSearchResult[];
  /** Transforms the USJ document into USFM */
  toUsfm(): string;
  /**
   * Inform this UsjReaderWriter that the underlying USJ object changed. This is needed to clear
   * caches used when querying.
   */
  usjChanged(): void;
  /**
   * Convert a location in USFM space into a location in USJ space within this USJ data.
   *
   * If the USJ document has no book markers in it to determine which book the USJ is in, the
   * `verseRef.book` will be ignored, and only the chapter and verse numbers will be used to
   * determine the location.
   *
   * @param usfmLocation Location in USFM space - a book, chapter, verse, and character offset
   *   within the verse's USFM
   * @returns Object containing the USJ location within the USJ document indicated by
   *   `usfmLocation`. Note that if the USJ node returned is an object, it is the same object that
   *   is within this USJ data. So if you change it, you are changing this USJ data.
   */
  usfmLocationToUsjDocumentLocation(
    usfmLocation: UsfmLocation | SerializedVerseRef,
  ): UsjDocumentLocation;
  /**
   * Convert a location in USFM space into a node and location in USJ space within this USJ data.
   *
   * If the USJ document has no book markers in it to determine which book the USJ is in, the
   * `verseRef.book` will be ignored, and only the chapter and verse numbers will be used to
   * determine the location.
   *
   * @param usfmLocation Location in USFM space - a book, chapter, verse, and character offset
   *   within the verse's USFM
   * @returns Object containing the USJ node and location within the USJ document indicated by
   *   `usfmLocation`. Note that if the USJ node returned is an object, it is the same object that
   *   is within this USJ data. So if you change it, you are changing this USJ data.
   */
  usfmLocationToUsjNodeAndDocumentLocation(
    usfmLocation: UsfmLocation | SerializedVerseRef,
  ): UsjNodeAndDocumentLocation;
  /**
   * Convert a location in USJ space within this USJ data into a location in USFM space.
   *
   * @param usjLocation Location in USJ space - a jsonPath and other information about where the
   *   location is
   * @param bookIdIfNotFound 3-letter ID of the book this USJ document is in (only used if a book ID
   *   is not found in the USJ document)
   * @returns Location in USFM space that is equivalent to the USJ location specified
   * @throws If not able to find the location in the USJ document
   * @throws If not able to find a book ID in the USJ document and `bookIdIfNotFound` is not
   *   provided
   */
  usjDocumentLocationToUsfmVerseLocation(
    usjLocation: UsjDocumentLocation,
    bookIdIfNotFound?: string,
  ): UsfmVerseLocation;
  /**
   * Get the node + offset and JSONPath query within this USJ data of the first encountered string
   * after the verse marker for a specific verse in a USJ chapter.
   *
   * Note: this may return a node that is in a subsequent verse or even chapter depending on how
   * much content the USJ data contains. It simply looks through the rest of the USJ data for the
   * first text node and returns that.
   *
   * @param verseRef Indicates the book, chapter, and verse of interest to find the next text for
   * @returns Object containing the first USJ text node after `verseRef`, and a JSONPath string that
   *   indicates the location of the of USJ text node within this USJ data.
   * @throws Error if there is no text after the verse marker for `verseRef`
   * @throws Error if `verseRef` does not point to a valid verse in this USJ data
   */
  verseRefToNextTextLocation(
    verseRef: SerializedVerseRef,
  ): UsjNodeAndDocumentLocation<UsjTextContentLocation>;
}
