import {
  Usj,
  type MarkerContent,
  type MarkerObject,
} from '@eten-tech-foundation/scripture-utilities';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { MarkersMap } from './markers-map-3.1.model';

/** USJ content node type for a book */
export const BOOK_TYPE = 'book';

/** USJ content node type for a chapter */
export const CHAPTER_TYPE = 'chapter';

/** USJ content node type for a verse */
export const VERSE_TYPE = 'verse';

/** 3-character code that indicates there is no known book */
export const NO_BOOK_ID = '***';

/** Represents a book, chapter, verse, and offset */
export type VerseRefOffset = {
  verseRef: SerializedVerseRef;
  offset: number;
};

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

/** Node within a USJ object, an offset within that node, and a JSONPath query to the node */
export type UsjContentLocation = {
  node: MarkerContent;
  offset: number;
  jsonPath: ContentJsonPath;
};

/** Result of a search for text within a USJ object */
export type UsjSearchResult = {
  location: UsjContentLocation;
  /** The matching text that was found at the location */
  text: string;
};

/** Token indicating a marker closed */
export type ClosingMarker = { isClosingMarker: true; forMarker: MarkerObject | Usj };

/**
 * A string found in the USJ document, a marker (including top-level USJ marker), or a closing
 * marker indicator
 */
export type MarkerToken = MarkerContent | ClosingMarker | Usj;

/**
 * Set of options to provide to `UsjReaderWriter`'s constructor to customize how the reading and
 * writing works
 */
export type UsjReaderWriterOptions = {
  /**
   * A map of all USFM/USX/USJ markers and some information about them. Used for translating between
   * the formats
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
  extractText(start: UsjContentLocation, desiredLength: number): string;
  /**
   * Return a copy of text between two points
   *
   * @param start Point where text extraction will start
   * @param end Point where text extraction will end
   * @param maxLength Maximum length of string to return (defaults to 100)
   * @returns Text between the two points, capped at length `maxLength`
   */
  extractTextBetweenPoints(
    start: UsjContentLocation,
    end: UsjContentLocation,
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
    start: UsjContentLocation,
    text: string,
    maxTextLengthToSearch: number,
  ): UsjContentLocation | undefined;
  /** Find the first value matching the given JSONPath query within this USJ data */
  findSingleValue<T>(jsonPathQuery: string): T | undefined;
  /** Find the parent of the first value matching the given JSONPath query within this USJ data */
  findParent<T>(jsonPathQuery: string): T | undefined;
  /**
   * Convert a JSONPath query into a SerializedVerseRef and offset
   *
   * @param jsonPathQuery JSONPath search expression that indicates a node within this USJ data. If
   *   the expression matches more than one node, then only the first node found is considered.
   * @param bookId 3 letter ID of the book being searched (must be defined in this USJ data if not
   *   provided here)
   * @returns SerializedVerseRef and offset that represents the location within this USJ data
   *   indicated by `jsonPathQuery`
   */
  jsonPathToVerseRefAndOffset(jsonPathQuery: string, bookId?: string): VerseRefOffset;
  /** Build a JSONPath query that uniquely identifies the given node with this USJ data. */
  nodeToJsonPath(node: MarkerObject): ContentJsonPath;
  /**
   * Determine the SerializedVerseRef and offset that correspond to the location of a node somewhere
   * within this USJ data
   *
   * @param bookId ID of the book represented by this USJ data
   * @param node JSON object representing the location of the SerializedVerseRef and offset
   * @param nodeParent JSON object that owns the `content` array that includes `node`. If
   *   'undefined' is provided then the `UsjReaderWriter` will attempt to lookup the parent of
   *   `node`. The lookup will always fail and throw an error if `node` is a string.
   * @returns SerializedVerseRef and offset representing the location of `node`, if one could be
   *   found
   */
  nodeToVerseRefAndOffset(
    bookId: string,
    node: MarkerContent,
    nodeParent: MarkerObject | MarkerContent[] | undefined,
  ): { verseRef: SerializedVerseRef; offset: number } | undefined;
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
  /**
   * Inform this UsjReaderWriter that the underlying USJ object changed. This is needed to clear
   * caches used when querying.
   */
  usjChanged(): void;
  /**
   * Convert a verse ref + offset into a node + offset within this USJ data and a JSONPath query
   *
   * @param verseRef Indicates the book, chapter, and verse of interest to find
   * @param verseRefOffset Specific location within verse text (defaults to 0)
   * @returns Object containing the USJ node indicated by `verseRef` and `verseRefOffset`, offset
   *   within that node that matches the `verseRefOffset`, and a JSONPath string that indicates the
   *   location of the of USJ node within this USJ data. Note that if the USJ node returned is an
   *   object, it is the same object that is within this USJ data. So if you change it, you are
   *   changing this USJ data.
   */
  verseRefToUsjContentLocation(
    verseRef: SerializedVerseRef,
    verseRefOffset: number,
  ): UsjContentLocation;
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
  verseRefToNextTextLocation(verseRef: SerializedVerseRef): UsjContentLocation;
  /** Transforms the USJ document into USFM */
  toUsfm(): string;
}
