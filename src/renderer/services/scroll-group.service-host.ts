import logger from '@shared/services/logger.service';
import networkObjectService from '@shared/services/network-object.service';
import { createNetworkEventEmitter } from '@shared/services/network.service';
import {
  ScrollGroupUpdateInfo,
  EVENT_NAME_ON_DID_UPDATE_SCR_REF,
  IScrollGroupRemoteService,
  NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE,
  ScrollGroup,
} from '@shared/services/scroll-group.service-model';
import settingsService from '@shared/services/settings.service';
import {
  ScriptureReference,
  deepClone,
  compareScrRefs,
  deserialize,
  serialize,
} from 'platform-bible-utils';

const DEFAULT_SCR_REF: ScriptureReference = Object.freeze({
  bookNum: 1,
  chapterNum: 1,
  verseNum: 1,
});

const SCR_REFS_STORAGE_KEY = 'scroll-group.service-host.scrRefs';

/** FOR LOADING ONLY! DO NOT USE */
const scrRefsSerialized = localStorage.getItem(SCR_REFS_STORAGE_KEY);
/** Object that maps scroll group ids to the scripture reference at each of those scroll group ids */
const scrRefs: { [scrollGroup: ScrollGroup]: ScriptureReference | undefined } = scrRefsSerialized
  ? deserialize(scrRefsSerialized) ?? {}
  : {};

function saveScrRefs() {
  localStorage.setItem(SCR_REFS_STORAGE_KEY, serialize(scrRefs));
}

/** Emitter for changing Scripture reference on a scroll group */
const onDidUpdateScrRefEmitter = createNetworkEventEmitter<ScrollGroupUpdateInfo>(
  EVENT_NAME_ON_DID_UPDATE_SCR_REF,
);

/** Event that emits with information about a changed Scripture Reference for a scroll group */
export const onDidUpdateScrRef = onDidUpdateScrRefEmitter.event;

/** See {@link IScrollGroupRemoteService.getScrRef} */
export function getScrRefSync(scrollGroup: ScrollGroup = 0): ScriptureReference {
  return scrRefs[scrollGroup] ?? DEFAULT_SCR_REF;
}

async function getScrRef(scrollGroupScrRef: ScrollGroup = 0): Promise<ScriptureReference> {
  return getScrRefSync(scrollGroupScrRef);
}

/**
 * See {@link IScrollGroupRemoteService.setScrRef}
 *
 * @param shouldSetVerseRefSetting If `true`: if scroll group 0's reference changes, update the
 *   `platform.verseRef` setting to keep it in sync for backwards compatibility. Defaults to `true`.
 *   Only set to `false` when running this from subscription to updates to the setting
 */
export function setScrRefSync(
  newScrollGroup: ScrollGroup | undefined,
  newScrRef: ScriptureReference,
  shouldSetVerseRefSetting = true,
): boolean {
  if (!newScrRef || !newScrRef.bookNum || !newScrRef.chapterNum || !newScrRef.verseNum)
    throw new Error('Must provide scrRef in proper format!');

  const scrollGroup = newScrollGroup ?? 0;
  const scrRef = deepClone(newScrRef);

  // Don't update if the scr refs are the same
  if (compareScrRefs(scrRefs[scrollGroup] ?? DEFAULT_SCR_REF, scrRef) === 0) return false;

  // Update the scr ref and send out an event
  scrRefs[scrollGroup] = scrRef;
  saveScrRefs();
  onDidUpdateScrRefEmitter.emit({ scrollGroup, scrRef });

  if (shouldSetVerseRefSetting && scrollGroup === 0)
    (async () => {
      try {
        settingsService.set('platform.verseRef', scrRef);
      } catch (e) {
        logger.warn(
          `Failed to update platform.verseRef to ${serialize(scrRef)} to keep in sync with scroll group 0! ${e}`,
        );
      }
    })();

  return true;
}

async function setScrRef(
  scrollGroup: ScrollGroup | undefined,
  scrRef: ScriptureReference,
): Promise<boolean> {
  return setScrRefSync(scrollGroup, scrRef);
}

const scrollGroupService: IScrollGroupRemoteService = {
  getScrRef,
  setScrRef,
};

/** Register the network object that backs the scroll group service */
export async function startScrollGroupService(): Promise<void> {
  await networkObjectService.set(NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE, scrollGroupService);

  // Keep scroll group 0 in sync with the verse ref setting for backwards compatibility
  await settingsService.subscribe('platform.verseRef', (newScrRef) => {
    setScrRefSync(0, newScrRef, false);
  });
}
