import { SerializedVerseRef } from '@sillsdev/scripture';

/* #region Types */

/**
 * Status of items that appear in inventories. 'approved' and 'unapproved' items are defined in the
 * project's `Settings.xml`. All other items are defined as 'unknown'
 */
export type Status = 'approved' | 'unapproved' | 'unknown';

/** Occurrence of item in inventory. Primarily used by table that shows occurrences */
export type InventoryItemOccurrence = {
  /** Reference to scripture where the item appears */
  reference: SerializedVerseRef;
  /** Snippet of scripture that contains the occurrence */
  text: string;
};

/** Data structure that contains all information on an item that is shown in an inventory */
export type InventoryTableData = {
  /**
   * The item (e.g. a character in the characters inventory, a marker in the marker inventory) In
   * most cases the array will only have one element. In case of additional items (e.g. the
   * preceding marker in the markers check), the primary item should be stored in the first index.
   * To show additional items in the inventory, make sure to configure the `additionalItemsLabels`
   * prop for the Inventory component
   */
  items: string[];
  /** The number of times this item occurs in the selected scope */
  count: number;
  /** The status of this item (see documentation for `Status` type for more information) */
  status: Status;
  /** Occurrences of this item in the scripture text for the selected scope */
  occurrences: InventoryItemOccurrence[];
};

/* #endregion */

/* #region Functions */

/**
 * Splits USFM string into shorter line-like segments
 *
 * @param text A single (likely very large) USFM string
 * @returns An array containing the input text, split into shorter segments
 */
export const getLinesFromUSFM = (text: string) => {
  // Splits on (CR)LF, CR, \v, \c and \id
  return text.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g);
};

/**
 * Extracts chapter or verse number from USFM strings that start with a \c or \v marker
 *
 * @param text USFM string that is expected to start with \c or \v marker
 * @returns Chapter or verse number if one is found. Else returns 0.
 */
export const getNumberFromUSFM = (text: string): number | undefined => {
  // Captures all digits that follow \v or \c markers followed by whitespace located at the start of a string
  const regex = /^\\[vc]\s+(\d+)/;
  const match = text.match(regex);

  if (match) {
    return +match[1];
  }
  return undefined;
};

/**
 * Gets book ID from USFM string that starts with the \id marker, and returns book number for it
 *
 * @param text USFM string that is expected to start with \id marker
 * @returns Book number corresponding to the \id marker in the input text. Returns 0 if no marker is
 *   found or the marker is not valid
 */
export const getBookIdFromUSFM = (text: string): string => {
  // Captures all digits that follow an \id marker followed by whitespace located at the start of a string
  const match = text.match(/^\\id\s+([A-Za-z]+)/);
  if (match) {
    return match[1];
  }
  return '';
};

/**
 * Gets the status for an item, typically used in the Inventory component
 *
 * @param item The item for which the status is being requested
 * @param approvedItems Array of approved items, typically as defined in `Settings.xml`
 * @param unapprovedItems Array of unapproved items, typically as defined in `Settings.xml`
 * @returns The status for the specified item
 */
export const getStatusForItem = (
  item: string,
  approvedItems: string[],
  unapprovedItems: string[],
): Status => {
  if (unapprovedItems.includes(item)) return 'unapproved';
  if (approvedItems.includes(item)) return 'approved';
  return 'unknown';
};

/* #endregion */
