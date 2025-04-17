import logo from '@assets/icon.png';
import { useData, useLocalizedStrings, useScrollGroupScrRef } from '@renderer/hooks/papi-hooks';
import { availableScrollGroupIds } from '@renderer/services/scroll-group.service-host';
import { sendCommand } from '@shared/services/command.service';
import { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { HomeIcon, User } from 'lucide-react';
import {
  Badge,
  BookChapterControl,
  Button,
  cn,
  getToolbarOSReservedSpaceClassName,
  ScrollGroupSelector,
  Toolbar,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  usePromise,
} from 'platform-bible-react';
import {
  getErrorMessage,
  getLocalizeKeysForScrollGroupIds,
  isPlatformError,
  LocalizeKey,
  ScrollGroupId,
} from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { handleMenuCommand } from '@shared/data/platform-bible-menu.commands';
import { app } from '@renderer/services/papi-frontend.service';
import { ThemeData, themeServiceDataProviderName } from '@shared/services/theme.service-model';
import { logger } from '@shared/services/logger.service';
import { provideMenuData } from '@renderer/components/platform-bible-menu.data';

const TOOLTIP_DELAY = 300;

/** Placeholder theme to detect when we are loading */
const DEFAULT_THEME_VALUE: ThemeData = {
  id: 'light',
  label: '%unused%',
  type: 'light',
  cssVariables: {},
};

const DEFAULT_SHOULD_MATCH_SYSTEM = false;

const scrollGroupIdLocalStorageKey = 'platform-bible-toolbar.scrollGroupId';

// Exclude no scroll group in the top selector because it would be pointless
const availableScrollGroupIdsTop = availableScrollGroupIds.filter(
  (scrollGroupId) => scrollGroupId !== undefined,
);

const scrollGroupLocalizedStringKeys = getLocalizeKeysForScrollGroupIds(availableScrollGroupIdsTop);

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%mainMenu_openParatextRegistration%',
  '%mainMenu_openHome%',
  '%toolbar_theme_change_to_light%',
  '%toolbar_theme_change_to_dark%',
  '%toolbar_theme_loading%',
  '%toolbar_theme_loading_error%',
];

export function PlatformBibleToolbar() {
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

  const [localizedStrings] = useLocalizedStrings(LOCALIZED_STRING_KEYS);

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

  const [updateMenuData, setUpdateMenuData] = useState<boolean>(false);

  const [menuData] = usePromise(
    useCallback(async () => {
      setUpdateMenuData(false);
      const newMenuData = await provideMenuData(false);

      if (
        Object.values(newMenuData.columns).some(
          (column) =>
            typeof column === 'object' && 'label' in column && column.label.startsWith('%'),
        )
      ) {
        setTimeout(() => setUpdateMenuData(true), 1000);
      }

      return newMenuData;
      // updateMenuData needs to be included for the menu contents to reevaluate when menu is (re)opened
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateMenuData]),
    { columns: {}, groups: {}, items: [] },
  );

  const [marketingVersion] = usePromise(
    useCallback(async () => {
      const marketingInfo = await app.getMarketingInfo();
      return marketingInfo.marketingVersion.concat(
        marketingInfo.marketingVersionMoniker ? ` ${marketingInfo.marketingVersionMoniker}` : '',
      );
    }, []),
    'Marketing Version',
  );

  const [shouldMatchSystemPossiblyError, setShouldMatchSystem] = useData(
    themeServiceDataProviderName,
  ).ShouldMatchSystem(undefined, DEFAULT_SHOULD_MATCH_SYSTEM);

  const shouldMatchSystem = useMemo(() => {
    if (isPlatformError(shouldMatchSystemPossiblyError)) {
      logger.warn(
        `Error getting shouldMatchSystem for toolbar button. ${getErrorMessage(shouldMatchSystemPossiblyError)}`,
      );
      return DEFAULT_SHOULD_MATCH_SYSTEM;
    }
    return shouldMatchSystemPossiblyError;
  }, [shouldMatchSystemPossiblyError]);

  const [theme, setThemeInternal] = useData(themeServiceDataProviderName).CurrentTheme(
    undefined,
    DEFAULT_THEME_VALUE,
  );

  const setTheme = useCallback(
    async (newThemeId: string) => {
      try {
        // If we are changing the theme by hand with this button, assume the user doesn't want to match
        // system theme
        if (shouldMatchSystem) setShouldMatchSystem?.(false);
        setThemeInternal?.(newThemeId);
      } catch (e) {
        logger.warn(
          `Failed to set theme to ${newThemeId} with toolbar button. ${getErrorMessage(e)}`,
        );
      }
    },
    [setShouldMatchSystem, setThemeInternal, shouldMatchSystem],
  );

  // Warn if the theme came back as a PlatformError. Will handle the PlatformError in the jsx too
  useEffect(() => {
    if (isPlatformError(theme))
      logger.warn(`Error getting theme for toolbar button. ${getErrorMessage(theme)}`);
  }, [theme]);

  const isThemeLoadedNotError = theme !== DEFAULT_THEME_VALUE && !isPlatformError(theme);

  let themeButtonTooltip = localizedStrings['%toolbar_theme_loading%'];
  if (!isThemeLoadedNotError)
    themeButtonTooltip = localizedStrings['%tooltip_theme_loading_error%'];
  else if (theme.type === 'dark') {
    themeButtonTooltip = localizedStrings['%toolbar_theme_change_to_light%'];
  } else {
    themeButtonTooltip = localizedStrings['%toolbar_theme_change_to_dark%'];
  }

  return (
    <Toolbar
      menuData={menuData}
      onOpenChange={(isOpen: boolean) => {
        setUpdateMenuData(isOpen);
      }}
      commandHandler={handleMenuCommand}
      className={cn(
        'tw-h-12 tw-bg-transparent',
        getToolbarOSReservedSpaceClassName(osPlatformToReserveSpaceFor),
      )}
      menubarVariant="muted"
      shouldUseAsAppDragArea
      appMenuAreaChildren={<img width={24} height={24} src={`${logo}`} alt="Application Logo" />}
      configAreaChildren={
        <>
          {marketingVersion !== '' && (
            <TooltipProvider delayDuration={TOOLTIP_DELAY}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="ghost"
                    className="tw-block tw-max-w-[150px] tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-font-normal tw-shrink"
                  >
                    {marketingVersion}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="tw-font-light">{marketingVersion}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <TooltipProvider delayDuration={TOOLTIP_DELAY}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="pr-twp tw-h-8 tw-flex-shrink-0"
                  onClick={() =>
                    isThemeLoadedNotError && setTheme(theme.type === 'dark' ? 'light' : 'dark')
                  }
                  disabled={!isThemeLoadedNotError}
                >
                  {isThemeLoadedNotError && theme.id === 'dark' ? '🌙' : '☀️'}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="tw-font-light">{themeButtonTooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {/* This is a placeholder for the actual user menu */}
          <TooltipProvider delayDuration={TOOLTIP_DELAY}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="pr-twp tw-h-8 tw-flex-shrink-0"
                  onClick={() => sendCommand('paratextRegistration.showParatextRegistration')}
                >
                  <User />
                </Button>
              </TooltipTrigger>
              {localizedStrings['%mainMenu_openParatextRegistration%'] && (
                <TooltipContent>
                  <p className="tw-font-light">
                    {localizedStrings['%mainMenu_openParatextRegistration%']}
                  </p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </>
      }
    >
      <TooltipProvider delayDuration={TOOLTIP_DELAY}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="tw-h-8"
              onClick={() => sendCommand('platformGetResources.openHome')}
            >
              <HomeIcon />
            </Button>
          </TooltipTrigger>
          {localizedStrings['%mainMenu_openHome%'] && (
            <TooltipContent>
              <p className="tw-font-light">{localizedStrings['%mainMenu_openHome%']}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
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

export default PlatformBibleToolbar;
