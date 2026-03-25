import { SerializedVerseRef } from '@sillsdev/scripture';
import { LanguageStrings } from 'platform-bible-utils';

export type CommandNavigatorProps = {
  /** The current scripture reference */
  scrRef: SerializedVerseRef;
  /** Callback to handle the submission of a selected reference */
  handleSubmit: (scrRef: SerializedVerseRef) => void;
  /** Optional additional class name for the trigger button */
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
  /** Optional ID for accessibility */
  id?: string;
};
