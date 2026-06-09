import { ReactNode } from 'react';
import { LocalizeKey } from 'platform-bible-utils';

/** Base item interface for items displayed in the SourceLanguageIndexedList */
export type IndexedListItem = {
  /** Unique identifier for the item */
  id: string;
  /** Primary display text (term in the resource) */
  primaryText: string;
  /** Secondary display text (term in source language) */
  sourceLanguageText?: string;
  /** Transliteration of the source language text */
  transliteration?: string;
  /** Optional thumbnail URL for the 'thumbnail' variant */
  thumbnailUrl?: string;
  /** Optional alt text for the thumbnail */
  thumbnailAlt?: string;
};

/** Props for the SourceLanguageIndexedList component */
export type SourceLanguageIndexedListProps<T extends IndexedListItem> = {
  /** Array of items to display in the list */
  items: T[];
  /** Custom render function for each list item row. If not provided, the default layout is used */
  renderItem?: (item: T) => ReactNode;
  /**
   * Render function for the detail content shown in a right-side drawer when an item is selected.
   * If not provided, no drawer is shown and `onItemClick` fires directly.
   */
  renderDetailContent?: (item: T, onClose: () => void) => ReactNode;
  /** Callback when an item is clicked (fires in addition to opening the drawer if both exist) */
  onItemClick?: (item: T) => void;
  /** ID of the currently selected item */
  selectedItemId?: string;
  /** Message to display when items array is empty */
  emptyStateMessage?: string;
  /**
   * Accessible label for the detail panel region (announced to screen readers). Pass a localized
   * string. Defaults to the English "Selected item details".
   */
  detailRegionLabel?: string;
  /** Whether items are currently being loaded */
  isLoading?: boolean;
  /** Display variant: 'text' for default text list, 'thumbnail' for media/maps with image preview */
  variant?: 'text' | 'thumbnail';
  /** Whether to show the source language column */
  showSourceLanguage?: boolean;
  /** Whether to show transliteration in brackets after source language text */
  showTransliteration?: boolean;
  /** Callback fired when user presses a character key (for type-ahead search) */
  onCharacterPress?: (char: string) => void;
  /** Additional CSS class names */
  className?: string;
};

/** A semantic domain in a hierarchical tree (up to 5 levels) */
export type SemanticDomain = {
  /** Unique identifier for the domain */
  id: string;
  /** Display label for the domain */
  label: string;
  /** Child domains */
  children?: SemanticDomain[];
};

/** Localization string keys used by the indexed list components */
export const SOURCE_LANGUAGE_INDEXED_LIST_STRING_KEYS: LocalizeKey[] = [
  '%sourceLanguageIndexedList_emptyState%',
  '%sourceLanguageIndexedList_loading%',
  '%sourceLanguageIndexedList_occurrenceCount%',
  '%sourceLanguageIndexedList_strongsCode%',
  '%sourceLanguageIndexedList_filterByDomain%',
  '%sourceLanguageIndexedList_navigationModeTree%',
  '%sourceLanguageIndexedList_navigationModeDropdown%',
  '%sourceLanguageIndexedList_backToList%',
];

/** Localized strings type for the indexed list components */
export type SourceLanguageIndexedListLocalizedStrings = {
  [localizedKey in (typeof SOURCE_LANGUAGE_INDEXED_LIST_STRING_KEYS)[number]]?: string;
};
