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

export type ScriptureNode = ScriptureReference & {
  jsonPath: string;
};

export type ScriptureTextAnchor = ScriptureNode & {
  offset: number;
};

export type ScriptureSelection = {
  start: ScriptureNode | ScriptureTextAnchor;
  end?: ScriptureNode | ScriptureTextAnchor;
};

export type ScriptureCheckDefinition = {
  id: string;
  displayName: string;
};
