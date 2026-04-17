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
  /** Custom render function for each item. If not provided, the default two-column layout is used */
  renderItem?: (item: T) => ReactNode;
  /** Callback when an item is clicked */
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

/** A single semantic domain in the hierarchy */
export type SemanticDomain = {
  /** Unique identifier for the domain */
  id: string;
  /** Display label for the domain */
  label: string;
  /** Child domains */
  children?: SemanticDomain[];
};

/** Props for the ER Dictionary Filtered by Type component */
export type ErDictionaryFilteredListProps<T extends IndexedListItem> =
  SourceLanguageIndexedListProps<T> & {
    /** Domain breadcrumb path from root to the current domain */
    domainPath: SemanticDomain[];
    /** Callback when a breadcrumb item is clicked */
    onBreadcrumbClick?: (domain: SemanticDomain) => void;
    /** Navigation mode: 'tree' shows full hierarchy, 'dropdown' shows siblings at each level */
    navigationMode: 'tree' | 'dropdown';
    /** Callback to change the navigation mode */
    onNavigationModeChange?: (mode: 'tree' | 'dropdown') => void;
    /** Children of the currently selected domain (used in tree/dropdown views) */
    domainChildren?: SemanticDomain[];
    /** Callback when a domain in the tree/dropdown is selected */
    onDomainSelect?: (domain: SemanticDomain) => void;
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
];

/** Localized strings type for the indexed list components */
export type SourceLanguageIndexedListLocalizedStrings = {
  [localizedKey in (typeof SOURCE_LANGUAGE_INDEXED_LIST_STRING_KEYS)[number]]?: string;
};
