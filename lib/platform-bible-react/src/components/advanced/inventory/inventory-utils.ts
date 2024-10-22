/* #region Types */

import { Canon } from '@sillsdev/scripture';
import { ScriptureReference } from 'platform-bible-utils';

export type InventoryItemOccurrence = {
  reference: ScriptureReference;
  text: string;
};

export type InventoryTableData = {
  items: string[];
  count: number;
  status: Status;
  occurrences: InventoryItemOccurrence[];
};

export type Scope = 'book' | 'chapter' | 'verse';

export type Status = 'approved' | 'unapproved' | 'unknown';

export type StatusFilter = Status | 'all';

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
 * Extracts chapter or verse number from USFM strings that start with a chapter or verse marker
 *
 * @param text USFM string
 * @returns Chapter or verse number if one is found. Else returns 0.
 */
export const getNumberFromUSFM = (text: string): number | undefined => {
  // Captures all digits that follow \v or \c markers followed by whitespace located at the start of a string
  const match = text.match(/^\\[vc]\s+(\d+)/);
  if (match) {
    return +match[1];
  }
  return undefined;
};

export const getBookNumFromId = (text: string): number | undefined => {
  // Captures all digits that follow \v or \c markers followed by whitespace located at the start of a string
  const match = text.match(/\\id\s+([A-Z]+)/);
  if (match) {
    return Canon.bookIdToNumber(match[1]);
  }
  return undefined;
};

export const getStatusForItem = (
  item: string,
  approvedItems: string[],
  unapprovedItems: string[],
): Status => {
  if (approvedItems.includes(item)) return 'approved';
  if (unapprovedItems.includes(item)) return 'unapproved';
  return 'unknown';
};

/* #endregion */
