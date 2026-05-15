import { DblResourceData } from 'platform-bible-utils';

/**
 * Status of an item relative to the current project.
 *
 * The "currently displayed" concept lives on the host (it's a single or multi selection on the
 * calling surface). The picker takes `displayedIds` as a prop and emphasizes those rows; clicks
 * on an included row emit `toggleDisplay` for the host to interpret per its own mode.
 */
export type ItemStatus =
  /** Included in project. `lockedIncluded` items cannot be removed. */
  | { kind: 'included'; lockedIncluded?: boolean; downloading?: boolean }
  /** On disk, not yet included. */
  | { kind: 'installed' }
  /** Not on disk; clicking starts background download and moves the item to `included`. */
  | { kind: 'available' };

export interface ScriptureTextItem {
  data: DblResourceData;
  status: ItemStatus;
}

/**
 * Actions the picker emits. The host owns state for items + which are displayed and decides what
 * to do for each action. The host is also responsible for closing the picker — the picker never
 * closes itself.
 */
export type PickerAction =
  /** Click on an included row — host toggles this item's "displayed" state (single or multi). */
  | { type: 'toggleDisplay'; item: ScriptureTextItem }
  /** Click on an installed or available row — host adds the item to the project. */
  | { type: 'include'; item: ScriptureTextItem }
  /** Remove icon — host removes the (non-locked) item from the project. */
  | { type: 'remove'; item: ScriptureTextItem };
