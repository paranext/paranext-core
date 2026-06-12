import { logger } from '@shared/services/logger.service';
import { networkObjectService } from '@shared/services/network-object.service';
import {
  createBufferedNetworkEventEmitter,
  getNetworkEvent,
} from '@shared/services/network.service';
import {
  EVENT_NAME_ON_DID_UPDATE_SCR_REF,
  IScrollGroupRemoteService,
  NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE,
  ScrollGroupUpdateInfo,
} from '@shared/services/scroll-group.service-model';
import { settingsService } from '@shared/services/settings.service';
import { Canon, SerializedVerseRef } from '@sillsdev/scripture';
import {
  compareScrRefs,
  deepClone,
  deserialize,
  isPlatformError,
  type PlatformEvent,
  ScrollGroupId,
  serialize,
} from 'platform-bible-utils';

/**
 * Buffered emitter for changing the Scripture reference on a scroll group. Buffered (and created at
 * module load, before the scrRefs migration below which can call `setScrRefSync`) so a verse-ref
 * change from a UI handler that fires before central registration completes is kept — the latest
 * per scroll group — and flushed once registration finishes, rather than throwing after the local
 * state was already mutated and persisted.
 */
const onDidUpdateScrRefBufferedEmitter = createBufferedNetworkEventEmitter(
  EVENT_NAME_ON_DID_UPDATE_SCR_REF,
  {
    notification: {
      summary: 'Emitted when the Scripture reference for a scroll group changes.',
      params: [
        {
          name: 'update',
          required: true,
          summary: 'The scroll group and its new Scripture reference.',
          schema: { type: 'object' },
        },
      ],
    },
  },
  { bufferStrategy: { latestByKey: (update) => String(update.scrollGroupId) } },
);

const DEFAULT_SCR_REF: SerializedVerseRef = Object.freeze({
  book: 'GEN',
  chapterNum: 1,
  verseNum: 1,
});

const SCR_REFS_STORAGE_KEY = 'scroll-group.service-host.scrRefs';

/** FOR LOADING ONLY! DO NOT USE */
const scrRefsSerialized = localStorage.getItem(SCR_REFS_STORAGE_KEY);
/** Object that maps scroll group ids to the scripture reference at each of those scroll group ids */
const scrRefs: { [scrollGroupId: ScrollGroupId]: SerializedVerseRef | undefined } =
  scrRefsSerialized ? (deserialize(scrRefsSerialized) ?? {}) : {};

// The scrRefs object might contain old values that are of older types that are no longer supported.
// We need to check if this is the case, and convert them to `SerializedVerseRef`.
Object.entries(scrRefs).forEach(([key, value]) => {
  if (!value) return;
  if (value.book) return;
  // We are likely dealing with a scripture reference type that has a bookNum instead of a book id
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const valuePossibleScrRef = value as unknown as {
    bookNum?: number;
    chapterNum: number;
    verseNum: number;
  };
  if (valuePossibleScrRef.bookNum) {
    value.book = Canon.bookNumberToId(valuePossibleScrRef.bookNum);
    delete valuePossibleScrRef.bookNum;
    setScrRefSync(parseInt(key, 10), value);
  }
});

function saveScrRefs() {
  localStorage.setItem(SCR_REFS_STORAGE_KEY, serialize(scrRefs));
}

/**
 * All Scroll Group IDs that are intended to be shown in scroll group selectors. This is a
 * placeholder and will be refactored significantly in
 * https://github.com/paranext/paranext-core/issues/788
 */
export const availableScrollGroupIds = [undefined, ...Array(5).keys()];

/** Event that emits with information about a changed Scripture Reference for a scroll group */
export const onDidUpdateScrRef: PlatformEvent<ScrollGroupUpdateInfo> = getNetworkEvent(
  EVENT_NAME_ON_DID_UPDATE_SCR_REF,
);

/** See {@link IScrollGroupRemoteService.getScrRef} */
export function getScrRefSync(scrollGroupId: ScrollGroupId = 0): SerializedVerseRef {
  return scrRefs[scrollGroupId] ?? DEFAULT_SCR_REF;
}

async function getScrRef(scrollGroupScrRef: ScrollGroupId = 0): Promise<SerializedVerseRef> {
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
  scrollGroupId: ScrollGroupId | undefined,
  scrRef: SerializedVerseRef,
  shouldSetVerseRefSetting = true,
): boolean {
  if (
    !scrRef ||
    !(typeof scrRef.book === 'string') ||
    !(typeof scrRef.chapterNum === 'number') ||
    !(typeof scrRef.verseNum === 'number')
  )
    throw new Error('Must provide scrRef in proper format!');

  const scrollGroupIdDefaulted = scrollGroupId ?? 0;
  const scrRefClone = deepClone(scrRef);

  // Don't update if the scr refs are the same
  if (compareScrRefs(scrRefs[scrollGroupIdDefaulted] ?? DEFAULT_SCR_REF, scrRefClone) === 0)
    return false;

  // Update the scr ref and send out an event. The buffered emitter is usable immediately; if it
  // hasn't finished registering yet, the latest update per scroll group is buffered and flushed.
  scrRefs[scrollGroupIdDefaulted] = scrRefClone;
  saveScrRefs();
  onDidUpdateScrRefBufferedEmitter.emit({
    scrollGroupId: scrollGroupIdDefaulted,
    scrRef: scrRefClone,
  });

  if (shouldSetVerseRefSetting && scrollGroupIdDefaulted === 0)
    (async () => {
      try {
        settingsService.set('platform.verseRef', scrRefClone);
      } catch (e) {
        logger.warn(
          `Failed to update platform.verseRef to ${serialize(scrRefClone)} to keep in sync with scroll group 0! ${e}`,
        );
      }
    })();

  return true;
}

async function setScrRef(
  scrollGroupId: ScrollGroupId | undefined,
  scrRef: SerializedVerseRef,
): Promise<boolean> {
  return setScrRefSync(scrollGroupId, scrRef);
}

const scrollGroupService: IScrollGroupRemoteService = {
  getScrRef,
  setScrRef,
};

/** Register the network object that backs the scroll group service */
export async function startScrollGroupService(): Promise<void> {
  // The `onDidUpdateScrRef` emitter is created at module load (buffered), so there's nothing to set
  // up for it here.
  await networkObjectService.set(NETWORK_OBJECT_NAME_SCROLL_GROUP_SERVICE, scrollGroupService);

  // Keep scroll group 0 in sync with the verse ref setting for backwards compatibility
  await settingsService.subscribe('platform.verseRef', (newScrRef) => {
    if (isPlatformError(newScrRef)) {
      logger.warn(
        `Scroll group service failed to get platform.verseRef setting to keep in sync! ${newScrRef}`,
      );
      return;
    }
    setScrRefSync(0, newScrRef, false);
  });
}
