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

/** A domain associated with a dictionary entry, displayed as a clickable link */
export type EntryDomain = {
  /** Unique identifier for the domain */
  id: string;
  /** Display label for the domain */
  label: string;
  /** The taxonomy this domain belongs to (e.g., 'SDBH-Lexical', 'SDBG-Contextual') */
  taxonomy?: string;
  /** Domain code (e.g., '1.2.3') */
  code?: string;
  /** Parent domain for 2-level hierarchy (undefined if this is a top-level domain) */
  parentId?: string;
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

/** Props for the ER Dictionary list component */
export type ErDictionaryListProps<T extends IndexedListItem> = SourceLanguageIndexedListProps<T> & {
  /** Additional description text per item (e.g., glosses) */
  getDescription?: (item: T) => string;
  /** Additional badge texts per item (e.g., Strong's codes) */
  getBadges?: (item: T) => string[];
  /** Occurrence count per item */
  getOccurrenceCount?: (item: T) => number;
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

/** Props for the ER Dictionary Filtered by Type component */
export type ErDictionaryFilteredListProps<T extends IndexedListItem> = {
  /** Items filtered to the currently selected domain */
  items: T[];
  /** Custom render function for each list item row */
  renderItem?: (item: T) => ReactNode;
  /** Render function for the detail content shown in a drawer when an entry is clicked */
  renderDetailContent?: (item: T, onClose: () => void) => ReactNode;
  /** Callback when an item is clicked */
  onItemClick?: (item: T) => void;
  /** ID of the currently selected item */
  selectedItemId?: string;
  /** Message to display when items array is empty */
  emptyStateMessage?: string;
  /** Whether items are currently being loaded */
  isLoading?: boolean;
  /** Breadcrumb path: array of domains from root to the currently selected domain */
  domainPath: SemanticDomain[];
  /** All top-level domains (root of the tree, for navigation) */
  allDomains: SemanticDomain[];
  /** Callback when a different domain is selected. Receives the new full path. */
  onDomainChange: (newPath: SemanticDomain[]) => void;
  /** Callback for the back arrow button. When provided, renders a back button. */
  onBack?: () => void;
  /** Additional CSS class names */
  className?: string;
};

/** An encyclopedia article teaser */
export type EncyclopediaTeaser = IndexedListItem & {
  /** Short teaser/summary text for the article */
  teaserText?: string;
};

/** Props for the ER Encyclopedia list component */
export type ErEncyclopediaListProps<T extends EncyclopediaTeaser> =
  SourceLanguageIndexedListProps<T>;

/** A media item (image or map) */
export type MediaItem = IndexedListItem & {
  /** Type of media */
  mediaType: 'image' | 'map';
  /** Caption or description for the media */
  caption?: string;
};

/** Props for the ER Media list component */
export type ErMediaListProps<T extends MediaItem> = Omit<
  SourceLanguageIndexedListProps<T>,
  'variant'
>;

/** A lexical dictionary entry for use in the shared LexicalDictionaryList */
export type LexicalDictionaryEntry = IndexedListItem & {
  /** Strong's codes for this entry */
  strongsCodes: string[];
  /** Formatted glosses string */
  glosses: string;
  /** Number of occurrences */
  occurrenceCount: number;
};

/** Props for the Lexical Dictionary list component */
export type LexicalDictionaryListProps<T extends LexicalDictionaryEntry> = {
  /** Array of dictionary entries */
  items: T[];
  /** Callback when an item is clicked */
  onItemClick?: (item: T) => void;
  /** ID of the currently selected item */
  selectedItemId?: string;
  /** Message to display when items array is empty */
  emptyStateMessage?: string;
  /** Whether items are currently being loaded */
  isLoading?: boolean;
  /** Callback fired when user presses a character key */
  onCharacterPress?: (char: string) => void;
  /** Additional CSS class names */
  className?: string;
  /** Localized string for occurrence count tooltip */
  occurrenceCountLabel?: string;
  /** Localized string for Strong's code tooltip */
  strongsCodeLabel?: string;
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
