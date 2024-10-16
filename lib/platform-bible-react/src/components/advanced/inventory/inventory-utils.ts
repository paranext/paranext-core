/* #region Types */

import { ScriptureReference } from 'platform-bible-utils';

export type InventoryItem = {
  item: string;
  relatedItem?: string;
};

type InventoryItemOccurrence = {
  reference: ScriptureReference;
  text: string;
};

export type InventoryTableData = {
  // I'd like to use just one variable of type InventoryItem here, but the hierarchy has to be flat for the table to map each variable to a column
  item: string;
  relatedItem?: string;
  count: number;
  status: Status;
  occurrences: InventoryItemOccurrence[];
};

export type Scope = 'book' | 'chapter' | 'verse';

export type Status = 'approved' | 'unapproved' | 'unknown';

export type StatusFilter = Status | 'all';

/* #endregion */

/* #region Fucntions */

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
export const extractNumberFromUSFM = (text: string): number | undefined => {
  // Captures all digits that follow \v or \c markers followed by whitespace located at the start of a string
  const regex = /^\\[vc]\s+(\d+)/;
  const match = text.match(regex);
  if (match) {
    return +match[1];
  }
  return undefined;
};

const getStatusForItem = (
  item: string,
  approvedItems: string[],
  unapprovedItems: string[],
): Status => {
  if (approvedItems.includes(item)) return 'approved';
  if (unapprovedItems.includes(item)) return 'unapproved';
  return 'unknown';
};

/**
 * Turns array of strings into array of inventory items, along with their count and status
 *
 * @param inventoryItems String array that contains inventory items
 * @param getStatusForItem Function that gets status for inventory item from related project
 *   settings
 * @returns Array of inventory items, along with their count and status
 */
export const createTableData = (
  text: string | undefined,
  scriptureRef: ScriptureReference,
  approvedItems: string[],
  unapprovedItems: string[],
  extractItems: (text: string) => InventoryItem[],
  showRelatedItems: boolean,
): InventoryTableData[] => {
  if (!text || text === '') return [];

  const tableData: InventoryTableData[] = [];
  const lines = getLinesFromUSFM(text);

  let currentChapter: number | undefined = scriptureRef.chapterNum;
  let currentVerse: number | undefined = scriptureRef.verseNum;

  lines.forEach((line) => {
    if (line.startsWith('\\id')) {
      currentChapter = 0;
      currentVerse = 0;
    }
    if (line.startsWith('\\c')) {
      currentChapter = extractNumberFromUSFM(line);
      currentVerse = 0;
    }
    if (line.startsWith('\\v')) {
      currentVerse = extractNumberFromUSFM(line);
      if (currentChapter === 0) {
        currentChapter = scriptureRef.chapterNum;
      }
    }

    // https://chatgpt.com/c/67101cbc-00b4-800f-b11d-f7cc392e1d5d
    const inventoryItems: InventoryItem[] = extractItems(line);

    for (let itemIndex = 0; itemIndex < inventoryItems.length; itemIndex++) {
      const inventoryItem = inventoryItems[itemIndex];
      const existingItem = tableData.find((tableEntry) => {
        return showRelatedItems
          ? tableEntry.item === inventoryItem.item &&
              tableEntry.relatedItem === inventoryItem.relatedItem
          : tableEntry.item === inventoryItem.item;
      });
      const newReference: InventoryItemOccurrence = {
        reference: {
          ...scriptureRef,
          chapterNum: currentChapter !== undefined ? +currentChapter : -1,
          verseNum: currentVerse !== undefined ? +currentVerse : -1,
        },
        text: line,
      };
      if (existingItem) {
        existingItem.count += 1;
        existingItem.occurrences.push(newReference);
      } else {
        const newItem: InventoryTableData = {
          item: inventoryItem.item,
          relatedItem: inventoryItem.relatedItem,
          count: 1,
          status: getStatusForItem(inventoryItem.item, approvedItems, unapprovedItems),
          occurrences: [newReference],
        };
        tableData.push(newItem);
      }
    }
  });

  return tableData;
};

/* #endregion */
