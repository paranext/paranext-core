import { type MarkerContent, type MarkerObject } from '@biblionexus-foundation/scripture-utilities';
import { VerseRef } from '@sillsdev/scripture';

/** USJ content node type for a chapter */
export const CHAPTER_TYPE = 'chapter';

/** USJ content node type for a verse */
export const VERSE_TYPE = 'verse';

/** Represents a book, chapter, verse, and offset */
export type VerseRefOffset = {
  verseRef: VerseRef;
  offset: number;
};

/** This could actually have more content clauses at the end, but TS types are limited */
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
   * @param text Text to find
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
   * Convert a JSONPath query into a VerseRef and offset
   *
   * @param jsonPathQuery JSONPath search expression that indicates a node within this USJ data. If
   *   the expression matches more than one node, then only the first node found is considered.
   * @param bookId 3 letter ID of the book being searched (must be defined in this USJ data if not
   *   provided here)
   * @returns VerseRef and offset that represents the location within this USJ data indicated by
   *   `jsonPathQuery`
   */
  jsonPathToVerseRefAndOffset(jsonPathQuery: string, bookId?: string): VerseRefOffset;
  /** Build a JSONPath query that uniquely identifies the given node with this USJ data. */
  nodeToJsonPath(node: MarkerObject): ContentJsonPath;
  /**
   * Determine the VerseRef and offset that correspond to the location of a node somewhere within
   * this USJ data
   *
   * @param bookId ID of the book represented by this USJ data
   * @param node JSON object representing the location of the VerseRef and offset
   * @param nodeParent JSON object that owns the `content` array that includes `node`. If
   *   'undefined' is provided then the `UsjReaderWriter` will attempt to lookup the parent of
   *   `node`. The lookup will always fail and throw an error if `node` is a string.
   * @returns VerseRef and offset representing the location of `node`, if one could be found
   */
  nodeToVerseRefAndOffset(
    bookId: string,
    node: MarkerContent,
    nodeParent: MarkerObject | MarkerContent[] | undefined,
  ): { verseRef: VerseRef; offset: number } | undefined;
  /**
   * Remove all nodes from this USJ data that match a given search function.
   *
   * @param searchFunction Function that returns `true` if the given node should be removed
   * @returns Number of nodes removed
   */
  removeContentNodes(searchFunction: (potentiallyMatchingNode: MarkerContent) => boolean): number;
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
  verseRefToUsjContentLocation(verseRef: VerseRef, verseRefOffset: number): UsjContentLocation;
}
