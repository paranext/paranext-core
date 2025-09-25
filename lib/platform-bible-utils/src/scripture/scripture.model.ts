import { SerializedVerseRef } from '@sillsdev/scripture';

/**
 * Represents a book, with its short name (e.g. "Gen") and full names (e.g. "Genesis"), and number
 * of chapters.
 */
export interface BookInfo {
  shortName: string;
  fullNames: string[];
  chapters: number;
}

/**
 * Represents a "node" in the JSON used to present Scripture in the editor, with a path that is
 * relative to the start of a verse.
 */
export type ScriptureNode = SerializedVerseRef & {
  jsonPath: string;
};

/** Represents a specific character offset in the text of a textual Scripture node (in the editor.) */
export type ScriptureTextAnchor = ScriptureNode & {
  offset: number;
};

/**
 * Represents a range of text in the Scripture editor. The start and end node are expected to be in
 * the same book.
 */
export type ScriptureSelection = {
  start: ScriptureNode | ScriptureTextAnchor;
  end?: ScriptureNode | ScriptureTextAnchor;
};

/**
 * An identifier corresponding to a Scripture reference shared by a group of Scripture reference
 * consumers.
 *
 * For example, a few web views that share a Scroll Group Id would all change Scripture Reference
 * together.
 *
 * These are generally expected to be non-negative numbers (starting at 0).
 */
export type ScrollGroupId = number;
