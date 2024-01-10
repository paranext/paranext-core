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
