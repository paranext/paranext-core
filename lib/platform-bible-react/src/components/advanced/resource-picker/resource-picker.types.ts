import { DblResourceData, ResourceType } from 'platform-bible-utils';

export type { ResourceType };

/**
 * Status of an item relative to the current project.
 *
 * "Currently displayed" lives on the host (it's calling-surface state, not picker state). The
 * picker takes `displayedIds` as a prop and emphasizes those rows; clicks on an included row emit
 * `toggleDisplay` for the host to interpret per its own single- or multi-select policy.
 */
export type ItemStatus =
  /** Included in project. `lockedIncluded` items cannot be removed. */
  | { kind: 'included'; lockedIncluded?: boolean; downloading?: boolean }
  /** On disk, not yet included. */
  | { kind: 'installed' }
  /** Not on disk; clicking starts a background download and moves the item to `included`. */
  | { kind: 'available' };

export interface ResourceItem {
  data: DblResourceData;
  status: ItemStatus;
}

/**
 * Actions the picker emits. The host owns state for items + which are displayed and decides what to
 * do for each action. The host is also responsible for closing the picker — neither variant (full
 * or compact) closes itself in response to actions.
 */
export type PickerAction =
  /** Click on an included row — host toggles this item's "displayed" state. */
  | { type: 'toggleDisplay'; item: ResourceItem }
  /** Click on an installed or available row — host adds the item to the project. */
  | { type: 'include'; item: ResourceItem }
  /** Remove icon or Delete key — host removes the (non-locked) item from the project. */
  | { type: 'remove'; item: ResourceItem };

/**
 * The subset of actions that {@link ResourcePickerCompact} can emit. The compact variant only shows
 * already-included items, so `include` is impossible.
 */
export type CompactPickerAction = Extract<PickerAction, { type: 'toggleDisplay' | 'remove' }>;
