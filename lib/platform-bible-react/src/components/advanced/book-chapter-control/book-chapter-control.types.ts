import { SerializedVerseRef } from '@sillsdev/scripture';
import { LanguageStrings } from 'platform-bible-utils';

/**
 * Object containing all keys used for localization in the BookChapterControl component. If you're
 * using this component in an extension, you can pass it into the useLocalizedStrings hook to easily
 * obtain the localized strings and pass them into the localizedStrings prop of this component
 */
export const BOOK_CHAPTER_CONTROL_STRING_KEYS = Object.freeze([
  '%scripture_section_ot_long%',
  '%scripture_section_nt_long%',
  '%scripture_section_dc_long%',
  '%scripture_section_extra_long%',
  // Locale-specific scripture-reference separators. Defaults (used when the
  // active locale does not define a value) are " " between book and chapter
  // and ":" between chapter and verse. Locales such as French set the
  // chapter/verse separator to ".".
  '%scripture_book_chapter_separator%',
  '%scripture_chapter_verse_separator%',
  '%history_recent%',
  '%history_recentSearches_ariaLabel%',
] as const);

/** Type definition for the localized strings used in the BookChapterControl component */
export type BookChapterControlLocalizedStrings = {
  [localizedKey in (typeof BOOK_CHAPTER_CONTROL_STRING_KEYS)[number]]?: string;
};

export type BookWithOptionalChapterAndVerse = Omit<SerializedVerseRef, 'chapterNum' | 'verseNum'> &
  Partial<Pick<SerializedVerseRef, 'chapterNum' | 'verseNum'>>;

export type ViewMode = 'books' | 'chapters';

export type BookChapterControlProps = {
  /** The current scripture reference */
  scrRef: SerializedVerseRef;
  /** Callback to handle the submission of a selected reference */
  handleSubmit: (scrRef: SerializedVerseRef) => void;
  /** Optional additional class name for styling */
  className?: string;
  /** Callback to retrieve book IDs that are available in the current context */
  getActiveBookIds?: () => string[];
  /**
   * Optional map of localized book IDs/short names and full names. The key is the standard book ID
   * (e.g., "2CH"), the value contains a localized version of the ID and related book name (e.g. {
   * localizedId: '2CR', localizedName: '2 Crónicas' })
   */
  localizedBookNames?: Map<string, { localizedId: string; localizedName: string }>;
  /** Optional localized strings for the component */
  localizedStrings?: LanguageStrings;
  /** Array of recent scripture references for quick access */
  recentSearches?: SerializedVerseRef[];
  /** Callback to add a new recent scripture reference */
  onAddRecentSearch?: (scrRef: SerializedVerseRef) => void;
  /** Optional ID for the popover content for accessibility */
  id?: string;
  /**
   * If true, the trigger button's label will display the book and chapter only (e.g. "1 John 3"),
   * omitting the verse part (":1"). The popover-driven selection still operates on
   * `SerializedVerseRef` values internally; only the displayed label is affected.
   *
   * Useful for chapter-level workflows (e.g. exports or scopes that operate on whole chapters)
   * where surfacing a verse number is misleading.
   *
   * @default false
   */
  hideVerse?: boolean;
};
