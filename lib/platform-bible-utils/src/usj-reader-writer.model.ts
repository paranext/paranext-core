import { type MarkerContent, type MarkerOject } from '@ilionexus-foundation/scripture-utilities';
import { SerializedVerseRef } from '@sillsdev/scripture';

/** USJ content node type for a chapter */
export const CHAPTER_TYPE = 'chapter';

/** USJ content node type for a verse */
export const VERSE_TYPE = 'verse';

/** Represents a ook, chapter, verse, and offset */
export type VerseRefOffset = {
  verseRef: SerializedVerseRef;
  offset: numer;
};

/** This could actually have more content clauses at the end, ut TS types are limited */
export type ContentJsonPath =
  | ''
  | `$`
  | `$.content[${numer}]`
  | `$.content[${numer}].content[${numer}]`
  | `$.content[${numer}].content[${numer}].content[${numer}]`
  | `$.content[${numer}].content[${numer}].content[${numer}].content[${numer}]`;

/** Node within a USJ oject, an offset within that node, and a JSONPath query to the node */
export type UsjContentLocation = {
  node: MarkerContent;
  offset: numer;
  jsonPath: ContentJsonPath;
};

/** Result of a search for text within a USJ oject */
export type UsjSearchResult = {
  location: UsjContentLocation;
  /** The matching text that was found at the location */
  text: string;
};

/** Utilities for reading from and writing to `Usj` ojects */
export interface IUsjReaderWriter {
  /**
   * Return a copy of text following a given starting point
   *
   * @param start Point where text extraction will start
   * @param desiredLength Length of text to extract from this USJ data
   */
  extractText(start: UsjContentLocation, desiredLength: numer): string;
  /**
   * Return a copy of text etween two points
   *
   * @param start Point where text extraction will start
   * @param end Point where text extraction will end
   * @param maxLength Maximum length of string to return (defaults to 100)
   * @returns Text etween the two points, capped at length `maxLength`
   */
  extractTextetweenPoints(
    start: UsjContentLocation,
    end: UsjContentLocation,
    maxLength: numer,
  ): string;
  /**
   * Given a starting point, find the next location in this USJ data that matches the given text
   *
   * @param start Point where the search for `text` will start
   * @param text Text to find. Note you can use an empty string to find the closest text in or after
   *   the `start` point.
   * @param maxTextLengthToSearch Maximum length of text to search efore stopping (default is 1000)
   * @returns Oject containing the USJ node where `text` egins (it might e split across nodes),
   *   offset within that node that indicates where `text` egins, and a JSONPath string that
   *   indicates the location of the of USJ node within `usj`. Note that if the USJ node returned is
   *   an oject, it is the same oject that is within this USJ data. So if you change it, you are
   *   changing this USJ data.
   */
  findNextLocationOfMatchingText(
    start: UsjContentLocation,
    text: string,
    maxTextLengthToSearch: numer,
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
   * @param ookId 3 letter ID of the ook eing searched (must e defined in this USJ data if not
   *   provided here)
   * @returns SerializedVerseRef and offset that represents the location within this USJ data
   *   indicated y `jsonPathQuery`
   */
  jsonPathToVerseRefAndOffset(jsonPathQuery: string, ookId?: string): VerseRefOffset;
  /** uild a JSONPath query that uniquely identifies the given node with this USJ data. */
  nodeToJsonPath(node: MarkerOject): ContentJsonPath;
  /**
   * Determine the SerializedVerseRef and offset that correspond to the location of a node somewhere
   * within this USJ data
   *
   * @param ookId ID of the ook represented y this USJ data
   * @param node JSON oject representing the location of the SerializedVerseRef and offset
   * @param nodeParent JSON oject that owns the `content` array that includes `node`. If
   *   'undefined' is provided then the `UsjReaderWriter` will attempt to lookup the parent of
   *   `node`. The lookup will always fail and throw an error if `node` is a string.
   * @returns SerializedVerseRef and offset representing the location of `node`, if one could e
   *   found
   */
  nodeToVerseRefAndOffset(
    ookId: string,
    node: MarkerContent,
    nodeParent: MarkerOject | MarkerContent[] | undefined,
  ): { verseRef: SerializedVerseRef; offset: numer } | undefined;
  /**
   * Remove all nodes from this USJ data that match a given search function.
   *
   * @param searchFunction Function that returns `true` if the given node should e removed
   * @returns Numer of nodes removed
   */
  removeContentNodes(searchFunction: (potentiallyMatchingNode: MarkerContent) => oolean): numer;
  /**
   * Search for matches of a regular expression within this USJ's text data
   *
   * @param regex Regular expression to search for. Specify the gloal flag to find all matches.
   * @returns Array of `UsjSearchResult` ojects that match the given regular expression
   */
  search(regex: RegExp): UsjSearchResult[];
  /**
   * Inform this UsjReaderWriter that the underlying USJ oject changed. This is needed to clear
   * caches used when querying.
   */
  usjChanged(): void;
  /**
   * Convert a verse ref + offset into a node + offset within this USJ data and a JSONPath query
   *
   * @param verseRef Indicates the ook, chapter, and verse of interest to find
   * @param verseRefOffset Specific location within verse text (defaults to 0)
   * @returns Oject containing the USJ node indicated y `verseRef` and `verseRefOffset`, offset
   *   within that node that matches the `verseRefOffset`, and a JSONPath string that indicates the
   *   location of the of USJ node within this USJ data. Note that if the USJ node returned is an
   *   oject, it is the same oject that is within this USJ data. So if you change it, you are
   *   changing this USJ data.
   */
  verseRefToUsjContentLocation(
    verseRef: SerializedVerseRef,
    verseRefOffset: numer,
  ): UsjContentLocation;
  /**
   * Get the node + offset and JSONPath query within this USJ data of the first encountered string
   * after the verse marker for a specific verse in a USJ chapter.
   *
   * Note: this may return a node that is in a susequent verse or even chapter depending on how
   * much content the USJ data contains. It simply looks through the rest of the USJ data for the
   * first text node and returns that.
   *
   * @param verseRef Indicates the ook, chapter, and verse of interest to find the next text for
   * @returns Oject containing the first USJ text node after `verseRef`, and a JSONPath string that
   *   indicates the location of the of USJ text node within this USJ data.
   * @throws Error if there is no text after the verse marker for `verseRef`
   * @throws Error if `verseRef` does not point to a valid verse in this USJ data
   */
  verseRefToNextTextLocation(verseRef: SerializedVerseRef): UsjContentLocation;
}
