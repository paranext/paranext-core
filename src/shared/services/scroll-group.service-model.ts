import { serializeRequestType } from '@shared/utils/util';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { PlatformEvent, ScrollGroupId } from 'platform-bible-utils';

export const NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE = 'ScrollGroupService';

/** Prefix on requests that indicates that the request is related to scroll group operations */
const CATEGORY_SCROLL_GROUP = 'scrollGroup';

/** Name to use when creating a network event that is fired when webViews are updated */
export const EVENT_NAME_ON_DID_UPDATE_SCR_REF = serializeRequestType(
  CATEGORY_SCROLL_GROUP,
  'onDidUpdateScrRef',
);

/**
 * Combination of a {@link ScrollGroupId} and a SerializedVerseRef. If this value is a number, that
 * means this should be synced with the scroll group sharing that number. If this value is an
 * object, that means it is an independent Scripture reference and should not be synced with any
 * scroll group.
 */
export type ScrollGroupScrRef = ScrollGroupId | SerializedVerseRef;

/**
 * Information about an update to a scroll group. Informs about the new SerializedVerseRef at a
 * {@link ScrollGroupId}
 */
export type ScrollGroupUpdateInfo = {
  scrRef: SerializedVerseRef;
  scrollGroupId: ScrollGroupId;
};

/** Parts of the Scroll Group Service that are exposed through the network object */
export interface IScrollGroupRemoteService {
  /**
   * Get the SerializedVerseRef associated with the provided scroll group
   *
   * @param scrollGroupId Scroll group whose Scripture reference to get. Defaults to 0
   * @returns Scripture reference associated with the provided scroll group
   */
  getScrRef(scrollGroupId?: ScrollGroupId): Promise<SerializedVerseRef>;
  /**
   * Sets the SerializedVerseRef associated with the provided scroll group
   *
   * @param scrollGroupId Scroll group whose Scripture reference to get. If `undefined`, defaults to
   *   0
   * @param scrRef Scripture reference to which to set the scroll group
   * @returns `true` if the Scripture reference changed. `false` otherwise
   */
  setScrRef(scrollGroupId: ScrollGroupId | undefined, scrRef: SerializedVerseRef): Promise<boolean>;
}

// Parts of the Scroll Group Service that are added in the service client on top of what is provided by the network object
/** JSDOC DESTINATION scrollGroupService */
export interface IScrollGroupService extends IScrollGroupRemoteService {
  /** Event that emits with information about a changed Scripture Reference for a scroll group */
  onDidUpdateScrRef: PlatformEvent<ScrollGroupUpdateInfo>;
}
