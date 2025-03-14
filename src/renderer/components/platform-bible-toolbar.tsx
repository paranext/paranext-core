import logo from '@assets/icon.png';
import { useLocalizedStrings, useScrollGroupScrRef } from '@renderer/hooks/papi-hooks';
import { availableScrollGroupIds } from '@renderer/services/scroll-group.service-host';
import { sendCommand } from '@shared/services/command.service';
import logger from '@shared/services/logger.service';
import { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { HomeIcon, User } from 'lucide-react';
import {
  BookChapterControl,
  cn,
  getToolbarOSReservedSpaceClassName,
  ScrollGroupSelector,
  Toolbar,
  usePromise,
} from 'platform-bible-react';
import {
  getLocalizeKeysForScrollGroupIds,
  Localized,
  MultiColumnMenu,
  ScrollGroupId,
} from 'platform-bible-utils';
import { useCallback, useState } from 'react';
import { handleMenuCommand } from './platform-bible-menu.commands';
import provideMenuData from './platform-bible-menu.data';
import './platform-bible-toolbar.scss';

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

  const [osPlatformToReserveSpaceFor] = usePromise(
    useCallback(async () => {
      const osPlatform: string | undefined = await sendCommand('platform.getOSPlatform');
      const isFullScreen: boolean = await sendCommand('platform.isFullScreen');

      // no need to reserve space for macos "traffic lights" when in full screen
      if (osPlatform === 'darwin' && isFullScreen) return undefined;
      // TODO: Re-check linux support with Electron 34, see https://discord.com/channels/1064938364597436416/1344329166786527232
      if (osPlatform === 'linux') return undefined;
      return osPlatform;
    }, []),

    undefined,
  );

  return (
    <Toolbar
      menuProvider={getMenuData}
      commandHandler={handleMenuCommand}
      className={cn(
        'tw-h-12 tw-bg-transparent',
        getToolbarOSReservedSpaceClassName(osPlatformToReserveSpaceFor),
      )}
      menubarVariant="muted"
      shouldUseAsAppDragArea
      appMenuAreaChildren={<img width={32} height={32} src={`${logo}`} alt="Application Logo" />}
      configAreaChildren={
        // This is a placeholder for the actual user menu
        <div className="tw-h-8 tw-w-8 tw-flex tw-items-center tw-justify-center tw-rounded-full tw-border-input tw-border tw-border-solid tw-cursor-not-allowed">
          <User className="tw-h-4" />
        </div>
      }
    >
      <HomeIcon
        className="home-button"
        onClick={() => sendCommand('platformGetResources.openHome')}
      />
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
