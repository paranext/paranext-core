import type { SerializedVerseRef } from '@sillsdev/scripture';
import type { MediaTabType } from '../presenters/media-presenter';

/**
 * Shape of the chapter input for the `loadMarbleChapterXml` PAPI command, mirroring
 * `LoadMarbleChapterXmlInput` in C#.
 */
export type LoadMarbleChapterXmlInput = {
  resourceId: string;
  bookNum: number;
  chapterNumber: number;
};

/**
 * VerseRef wire shape consumed by the C# Enhanced Resources network object methods. Mirrors
 * `SIL.Scripture.VerseRef` JSON serialization (the .NET data provider uses `BookNum`, `ChapterNum`,
 * `VerseNum` PascalCase keys).
 */
export type VerseRefDto = {
  bookNum: number;
  chapterNum: number;
  verseNum: number;
};

/** Mirror of the C# `WordFilterInput` record (data-contracts.md §2.7), camelCase on the wire. */
export type WordFilterInputDto = {
  tokenId: string;
  lemma: string;
  source: string;
  translit: string;
  senses: string;
  targetLinks: string;
  clickOrigin: 'ScripturePane' | 'DictionaryTab' | 'OtherTab';
};

/** Input for the `loadDictionary` PAPI command (mirrors C# `DictionaryLoadInput`). */
export type DictionaryLoadInputDto = {
  currentReference: VerseRefDto;
  scope: 'CurrentVerse' | 'CurrentSection' | 'CurrentChapter';
  filter: WordFilterInputDto | undefined;
  showTranslations: boolean;
  glossLanguage: string;
  resourceId: string;
};

/** Output of `loadDictionary` (mirrors C# `DictionaryDisplayItem`). */
export type DictionaryDisplayItemDto = {
  tokenId: string;
  entryId: string;
  term: string;
  sourceText: string;
  translit: string;
  glosses: string[];
  partOfSpeech: string;
  occurrenceCount: number;
  /** Indices into the resolved entry's senses that apply to this token at this verse. */
  relevantSenseIndices: number[];
  /** Preview text of the first relevant sense (Definition or fallback localized gloss). */
  firstRelevantSensePreview: string;
};

export type DictionaryLoadResultDto = {
  items: DictionaryDisplayItemDto[];
  activeDictionary: string;
  emptyStateMessage: string | null | undefined;
};

/** Mirror of C# `DictionaryEntryInput`. */
export type DictionaryEntryInputDto = {
  entryId: string;
  glossLanguage: string;
  subItemId?: string;
};

/** Mirror of C# `DictionaryEntryData` (no FN-019 forward fields yet — presenter handles absence). */
export type DictionaryEntryDataDto = {
  entryId: string;
  lemma: string;
  senses: {
    senseId: string;
    glosses: { language: string; text: string }[];
    definition: string;
  }[];
  semanticDomains: string[];
  relatedLexemes: { lemma: string; entryId: string; relationship: string; gloss: string }[];
  morphology: string;
};

/**
 * Input for the `loadEncyclopedia` PAPI command (mirrors C# `EncyclopediaLoadInput`).
 *
 * Note: the C# record uses `CurrentReference` (full word), not `currentRef` like some other inputs.
 * Wire-side keys are camelCase per the data-provider's JSON serializer.
 */
export type EncyclopediaLoadInputDto = {
  currentReference: VerseRefDto;
  scope: 'CurrentVerse' | 'CurrentSection' | 'CurrentChapter';
  filter: WordFilterInputDto | undefined;
  userLanguage: string;
  resourceId: string;
};

/** Mirror of C# `EncyclopediaEntryRef` (data-contracts.md §3.8). */
export type EncyclopediaEntryRefDto = {
  articleId: string;
  key: string;
  title: string;
  teaserText: string;
  formatVersion: 1 | 2;
  inlineImageIds?: string[] | null;
};

/** Mirror of C# `EncyclopediaDisplayItem`. */
export type EncyclopediaDisplayItemDto = {
  tokenId: string;
  lemma: string;
  sourceText: string;
  translit: string;
  glosses: string[];
  entries: EncyclopediaEntryRefDto[];
  imageIds: string[];
  collection: string;
};

/** Mirror of C# `EncyclopediaLoadResult`. */
export type EncyclopediaLoadResultDto = {
  items: EncyclopediaDisplayItemDto[];
  emptyStateMessage: string | null | undefined;
};

/** Mirror of C# `ArticleInput`. */
export type ArticleInputDto = {
  articleId: string;
  resourceId: string;
  userLanguage: string;
};

/** Mirror of C# `ArticleVerseLink` — verse refs use `book` / `chapter` / `verse` int trio. */
export type ArticleVerseLinkDto = {
  reference: { book: number; chapter: number; verse: number };
  displayText: string;
  rawReference: string;
};

/** Mirror of C# `ArticleAbbreviation`. */
export type ArticleAbbreviationDto = {
  abbrev: string;
  fullText: string;
};

/** Mirror of C# `ArticleParagraph`. */
export type ArticleParagraphDto = {
  text: string;
  verseLinks: ArticleVerseLinkDto[];
  abbreviations: ArticleAbbreviationDto[];
  inlineImageIds: string[];
};

/** Mirror of C# `ArticleCrossRef`. */
export type ArticleCrossRefDto = {
  targetArticleId: string;
  displayText: string;
  type: 'seealso' | 'launchViewer' | string;
};

/** Mirror of C# `ArticleData`. */
export type ArticleDataDto = {
  articleId: string;
  title: string;
  paragraphs: ArticleParagraphDto[];
  crossReferences: ArticleCrossRefDto[];
  imageIds: string[];
};

/**
 * Mirror of C# `MediaLoadInput` (data-contracts.md §2.9). The C# enum `MediaTabType` serializes as
 * the literal strings `"Images"` and `"Maps"` via the System.Text.Json default converter.
 */
export type MediaLoadInputDto = {
  currentReference: VerseRefDto;
  scope: 'CurrentVerse' | 'CurrentSection' | 'CurrentChapter';
  filter: WordFilterInputDto | undefined;
  tabType: MediaTabType;
  userLanguage: string;
  resourceId: string;
};

/**
 * Mirror of C# `MediaDisplayItem` (data-contracts.md §3.9). `startRef` / `endRef` carry the full
 * SIL `VerseRef` shape (incl. `book` id, `chapterNum`, `verseNum`); the wiring layer narrows them
 * to the presenter's `MediaVerseRefInput` shape before passing them in. `path` and `fileName` are
 * back-end internals used by `fetchImageBytes` and are ignored here.
 */
export type MediaDisplayItemDto = {
  imageId: string;
  imageSource: string;
  title: string;
  thumbnailSource: string;
  startRef: SerializedVerseRef;
  endRef: SerializedVerseRef;
  collection: string;
  languageCode: string;
  displayIndex: number;
  path?: string;
  fileName?: string;
};

/** Mirror of C# `MediaLoadResult` (data-contracts.md §3.9). */
export type MediaLoadResultDto = {
  items: MediaDisplayItemDto[];
  countLabel: string;
  emptyStateMessage: string | null | undefined;
};
