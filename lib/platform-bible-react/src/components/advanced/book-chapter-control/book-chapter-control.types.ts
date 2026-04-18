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
  '%history_recent%',
  '%history_recentSearches_ariaLabel%',
  '%webView_bookChapterControl_selectChapter%',
  '%webView_bookChapterControl_selectVerse%',
] as const);

/** Type definition for the localized strings used in the BookChapterControl component */
export type BookChapterControlLocalizedStrings = {
  [localizedKey in (typeof BOOK_CHAPTER_CONTROL_STRING_KEYS)[number]]?: string;
};

export type BookWithOptionalChapterAndVerse = Omit<SerializedVerseRef, 'chapterNum' | 'verseNum'> &
  Partial<Pick<SerializedVerseRef, 'chapterNum' | 'verseNum'>>;

export type ViewMode = 'books' | 'chapters' | 'verses';

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
   * Optional callback returning the number of verses for a given book and chapter. When provided,
   * the control enables verse selection: clicking a chapter transitions to a verse selection
   * sub-screen, and typing a reference with a chapter:verse separator shows a verse grid. When
   * omitted, the control selects `verseNum: 1` after a chapter is chosen (current behavior).
   */
  getEndVerse?: (bookId: string, chapterNum: number) => number;
  /**
   * Optional lower bound. When provided, any reference that comes strictly before this one in canon
   * order is disabled in the UI (books, chapters, and verses). Used to prevent selecting an "end"
   * reference that precedes a "start" reference (e.g., in a range picker).
   */
  disableReferencesUpTo?: SerializedVerseRef;
};
