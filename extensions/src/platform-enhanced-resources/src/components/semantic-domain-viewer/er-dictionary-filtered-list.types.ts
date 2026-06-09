import type { ReactNode } from 'react';
import type { IndexedListItem, SemanticDomain } from 'platform-bible-react';

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
  /** Callback for the close (X) button. When provided, renders a close button on the right. */
  onClose?: () => void;
  /** Additional CSS class names */
  className?: string;
};
