export interface ScriptureReference {
  book: number;
  chapter: number;
  verse: number;
}

export interface BookInfo {
  shortName: string;
  fullNames: string[];
  chapters: number;
}
