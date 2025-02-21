import logger from '@shared/services/logger.service';
import { Toolbar, BookChapterControl, ScrollGroupSelector } from 'platform-bible-react';
import {
  getLocalizeKeysForScrollGroupIds,
  Localized,
  MultiColumnMenu,
  ScrollGroupId,
} from 'platform-bible-utils';
import { availableScrollGroupIds } from '@renderer/services/scroll-group.service-host';
import { useLocalizedStrings, useScrollGroupScrRef } from '@renderer/hooks/papi-hooks';
import { useCallback, useState } from 'react';
import { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { handleMenuCommand } from './platform-bible-menu.commands';
import provideMenuData from './platform-bible-menu.data';

const scrollGroupIdLocalStorageKey = 'platform-bible-toolbar.scrollGroupId';

/**
 * Providing empty menu data if the software fails to load fully so we can shift click the menu and
 * click Reload Extensions if it fails the first time
 *
 * @param isSupportAndDevelopment
 * @returns
 */
async function getMenuData(isSupportAndDevelopment: boolean): Promise<Localized<MultiColumnMenu>> {
  try {
    return await provideMenuData(isSupportAndDevelopment);
  } catch (e) {
    logger.error(`Could not get platform-bible-toolbar menu data! ${e}`);
    return { columns: {}, groups: {}, items: [] };
  }
}

// Exclude no scroll group in the top selector because it would be pointless otherwise
const availableScrollGroupIdsTop = availableScrollGroupIds.filter(
  (scrollGroupId) => scrollGroupId !== undefined,
);

const scrollGroupLocalizedStringKeys = getLocalizeKeysForScrollGroupIds(availableScrollGroupIdsTop);

export default function PlatformBibleToolbar() {
  // Internal state tracker for scroll group in local storage
  const [scrollGroupIdInternal, setScrollGroupIdInternal] = useState<ScrollGroupId>(() =>
    JSON.parse(localStorage.getItem(scrollGroupIdLocalStorageKey) ?? '0'),
  );
  const updateScrollGroupIdInternal = useCallback((newScrollGroupId: ScrollGroupScrRef) => {
    if (typeof newScrollGroupId !== 'number')
      throw new Error(
        `Top Scroll Group ID cannot be anything but a number! Trying to set to ${newScrollGroupId}`,
      );
    setScrollGroupIdInternal(newScrollGroupId);
    localStorage.setItem(scrollGroupIdLocalStorageKey, JSON.stringify(newScrollGroupId));

    return true;
  }, []);

  const [scrRef, setScrRef, scrollGroupId, setScrollGroupId] = useScrollGroupScrRef(
    scrollGroupIdInternal,
    updateScrollGroupIdInternal,
  );

  const [scrollGroupLocalizedStrings] = useLocalizedStrings(scrollGroupLocalizedStringKeys);

  return (
    <Toolbar
      menuProvider={getMenuData}
      commandHandler={handleMenuCommand}
      className="tw-h-12 tw-bg-transparent"
      useAsAppDragArea
    >
      <BookChapterControl scrRef={scrRef} handleSubmit={setScrRef} className="tw-h-8" />
      <ScrollGroupSelector
        availableScrollGroupIds={availableScrollGroupIdsTop}
        scrollGroupId={scrollGroupId}
        onChangeScrollGroupId={setScrollGroupId}
        localizedStrings={scrollGroupLocalizedStrings}
        className="tw-h-8"
      />
    </Toolbar>
  );
}
