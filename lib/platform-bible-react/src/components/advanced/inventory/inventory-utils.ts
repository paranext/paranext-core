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

/**
 * A snapshot of the inventory's history-tracked filters at a single point in time. Only the status
 * filter and the scope are recorded; the free-text filter is deliberately excluded from history so
 * that typing in the text box does not pollute the back/forward stacks.
 */
export type FilterHistoryEntry = {
  /** The selected status filter (e.g. `'all'`, `'approved'`, `'unapproved'`, `'unknown'`). */
  statusFilter: string;
  /** The selected scope (e.g. `'book'`, `'chapter'`, `'verse'`). */
  scope: string;
};

/**
 * The complete back/forward filter-history state. `backStack` holds previously-applied filter
 * snapshots (most recent last); `forwardStack` holds snapshots that were undone via "back" and can
 * be re-applied via "forward" (next to re-apply last). The currently-applied filter is held in the
 * component's own state, not in either stack.
 */
export type FilterHistoryState = {
  /** Snapshots that "back" can return to, oldest first, most recent last. */
  backStack: FilterHistoryEntry[];
  /** Snapshots that "forward" can re-apply, oldest first, most recent last. */
  forwardStack: FilterHistoryEntry[];
};

/** The result of a back/forward traversal: the new history state plus the snapshot to apply. */
export type FilterHistoryTraversal = {
  /** The history state after the traversal. */
  state: FilterHistoryState;
  /**
   * The filter snapshot the caller should apply to the live filters as a result of the traversal,
   * or `undefined` if the relevant stack was empty and nothing changed.
   */
  applied?: FilterHistoryEntry;
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

/**
 * Records a user-initiated filter change in the back/forward history.
 *
 * The snapshot of the filters that were active _before_ the change (`previous`) is pushed onto the
 * back stack, and the forward stack is cleared (because making a fresh choice after going back
 * abandons the redo branch). Call this only for user-initiated status/scope changes — never from a
 * back/forward traversal, otherwise history would grow without bound.
 *
 * @example
 *
 * ```ts
 * // The user changes the status filter from 'all' to 'approved' while scope is 'book'.
 * const next = pushFilterHistory(
 *   { backStack: [], forwardStack: [] },
 *   { statusFilter: 'all', scope: 'book' },
 * );
 * // next === { backStack: [{ statusFilter: 'all', scope: 'book' }], forwardStack: [] }
 * ```
 *
 * @param history The current history state.
 * @param previous The filter snapshot that was active before the user's change.
 * @returns The new history state with `previous` pushed onto `backStack` and an empty
 *   `forwardStack`.
 */
export const pushFilterHistory = (
  history: FilterHistoryState,
  previous: FilterHistoryEntry,
): FilterHistoryState => {
  return {
    backStack: [...history.backStack, previous],
    forwardStack: [],
  };
};

/**
 * Steps backward through filter history.
 *
 * Pops the most recent snapshot off the back stack, pushes the currently-applied filter (`current`)
 * onto the forward stack so it can be redone, and returns that popped snapshot as the one to apply.
 * If the back stack is empty, the state is returned unchanged with no snapshot to apply.
 *
 * This is a traversal and MUST NOT be recorded via {@link pushFilterHistory}, or history would grow
 * on every back/forward press.
 *
 * @param history The current history state.
 * @param current The filter snapshot currently applied (will be moved to the forward stack).
 * @returns The new history state and the snapshot to apply (or `undefined` if `backStack` is
 *   empty).
 */
export const goBackFilterHistory = (
  history: FilterHistoryState,
  current: FilterHistoryEntry,
): FilterHistoryTraversal => {
  if (history.backStack.length === 0) return { state: history };

  const applied = history.backStack[history.backStack.length - 1];
  return {
    state: {
      backStack: history.backStack.slice(0, -1),
      forwardStack: [...history.forwardStack, current],
    },
    applied,
  };
};

/**
 * Steps forward through filter history.
 *
 * Pops the most recent snapshot off the forward stack, pushes the currently-applied filter
 * (`current`) onto the back stack, and returns that popped snapshot as the one to apply. If the
 * forward stack is empty, the state is returned unchanged with no snapshot to apply.
 *
 * This is a traversal and MUST NOT be recorded via {@link pushFilterHistory}, or history would grow
 * on every back/forward press.
 *
 * @param history The current history state.
 * @param current The filter snapshot currently applied (will be moved to the back stack).
 * @returns The new history state and the snapshot to apply (or `undefined` if `forwardStack` is
 *   empty).
 */
export const goForwardFilterHistory = (
  history: FilterHistoryState,
  current: FilterHistoryEntry,
): FilterHistoryTraversal => {
  if (history.forwardStack.length === 0) return { state: history };

  const applied = history.forwardStack[history.forwardStack.length - 1];
  return {
    state: {
      backStack: [...history.backStack, current],
      forwardStack: history.forwardStack.slice(0, -1),
    },
    applied,
  };
};

/* #endregion */
