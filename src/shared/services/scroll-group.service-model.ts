import { serializeRequestType } from '@shared/utils/util';
import { SerializedVerseRef } from '@sillsdev/scripture';
import { PlatformEvent, ScrollGroupId } from 'platform-bible-utils';

export const NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE = 'ScrollGroupService';

/** Prefix on requests that indicates that the request is related to scroll group operations */
const CATEGORY_SCROLL_GROUP = 'scrollGroup';

/** Name to use when creating a network event that is fired when webViews are updated */
// serializeRequestType returns SerializedRequestType (an opaque branded string), but we know the
// actual value matches this NetworkEvents key. Cast to the literal so consumers can use this
// constant directly without re-casting at every usage site.
// eslint-disable-next-line no-type-assertion/no-type-assertion
export const EVENT_NAME_ON_DID_UPDATE_SCR_REF = serializeRequestType(
  CATEGORY_SCROLL_GROUP,
  'onDidUpdateScrRef',
) as 'scrollGroup:onDidUpdateScrRef';

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
  /**
   * Project whose versification the `scrRef` is expressed in. `undefined` = unknown / canonical
   * English.
   */
  sourceProjectId?: string;
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
   * @param sourceProjectId Project whose versification `scrRef` is expressed in. `undefined` =
   *   unknown / canonical English.
   * @returns `true` if the scroll group's reference or its versification source changed. `false`
   *   otherwise
   */
  setScrRef(
    scrollGroupId: ScrollGroupId | undefined,
    scrRef: SerializedVerseRef,
    sourceProjectId?: string,
  ): Promise<boolean>;
  /**
   * Get the SerializedVerseRef associated with the provided scroll group, converted into the
   * versification of `projectId`. The scroll group stores its reference in the versification of
   * whichever project last set it; this converts it into `projectId`'s versification so any
   * consumer gets a reference it can use directly. Returns the raw reference when no conversion is
   * needed.
   *
   * @param scrollGroupId Scroll group whose Scripture reference to get. If `undefined`, defaults to
   *   0
   * @param projectId Project into whose versification to convert the reference
   * @returns Scripture reference in `projectId`'s versification
   */
  getScrRefForProject(
    scrollGroupId: ScrollGroupId | undefined,
    projectId: string,
  ): Promise<SerializedVerseRef>;
}

// Parts of the Scroll Group Service that are added in the service client on top of what is provided by the network object
/** JSDOC DESTINATION scrollGroupService */
export interface IScrollGroupService extends IScrollGroupRemoteService {
  /** Event that emits with information about a changed Scripture Reference for a scroll group */
  onDidUpdateScrRef: PlatformEvent<ScrollGroupUpdateInfo>;
}
