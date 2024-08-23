export interface ScriptureReference {
  bookNum: number;
  chapterNum: number;
  verseNum: number;
}

export interface BookInfo {
  shortName: string;
  fullNames: string[];
  chapters: number;
}

/**
 * Represents a "node" in the JSON used to present Scripture in the editor, with a path that is
 * relative to the start of a verse.
 */
export type ScriptureNode = ScriptureReference & {
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
