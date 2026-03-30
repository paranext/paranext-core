import logo from '@assets/icon.png';
import { provideMenuData } from '@renderer/components/platform-bible-menu.data';
import ProfileDropdown from '@renderer/components/profile-dropdown.component';
import { useSimpleModeContext } from '@renderer/components/simple-mode/simple-mode-context';
import {
  useLocalizedStrings,
  useScrollGroupScrRef,
  useRecentScriptureRefs,
} from '@renderer/hooks/papi-hooks';
import { app } from '@renderer/services/papi-frontend.service';
import { availableScrollGroupIds } from '@renderer/services/scroll-group.service-host';
import { handleMenuCommand } from '@shared/data/platform-bible-menu.commands';
import { sendCommand } from '@shared/services/command.service';
import { PROJECT_INTERFACE_PLATFORM_BASE } from '@shared/models/project-data-provider.model';
import { papiFrontendProjectDataProviderService } from '@shared/services/project-data-provider.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { ChevronDown, HomeIcon, Plus, Settings2 } from 'lucide-react';
import {
  Badge,
  BookChapterControl,
  Button,
  cn,
  ComboBox,
  type ComboBoxLabelOption,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  getToolbarOSReservedSpaceClassName,
  ScrollGroupSelector,
  Toolbar,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  usePromise,
} from 'platform-bible-react';
import { getLocalizeKeysForScrollGroupIds, LocalizeKey, ScrollGroupId } from 'platform-bible-utils';
import { useCallback, useMemo, useState } from 'react';

const TOOLTIP_DELAY = 300;

const scrollGroupIdLocalStorageKey = 'platform-bible-toolbar.scrollGroupId';

// Exclude no scroll group in the top selector because it would be pointless
const availableScrollGroupIdsTop = availableScrollGroupIds.filter(
  (scrollGroupId) => scrollGroupId !== undefined,
);

const scrollGroupLocalizedStringKeys = getLocalizeKeysForScrollGroupIds(availableScrollGroupIdsTop);

const LOCALIZED_STRING_KEYS: LocalizeKey[] = ['%mainMenu_openHome%'];

export type InterfaceMode = 'simple' | 'power';

// #region Simple mode project selector

type ProjectOption = ComboBoxLabelOption & { id: string };

function useProjectOptions(): [ProjectOption[], boolean] {
  const [projects, isLoading] = usePromise(
    useCallback(async () => {
      const allMetadata = await projectLookupService.getMetadataForAllProjects({
        includeProjectInterfaces: ['platformScripture.USJ_Chapter'],
      });

      const options: ProjectOption[] = await Promise.all(
        allMetadata.map(async (metadata) => {
          const pdp = await papiFrontendProjectDataProviderService.get(
            PROJECT_INTERFACE_PLATFORM_BASE,
            metadata.id,
          );
          const name = await pdp.getSetting('platform.name');
          return { id: metadata.id, label: name };
        }),
      );

      return options.sort((a, b) => a.label.localeCompare(b.label));
    }, []),
    useMemo(() => [], []),
  );

  return [projects ?? [], isLoading];
}

// #endregion

export function PlatformBibleToolbar({ mode = 'power' }: { mode?: InterfaceMode }) {
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

  const { recentScriptureRefs, addRecentScriptureRef } = useRecentScriptureRefs();

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

  if (mode === 'simple') {
    return (
      <SimpleToolbar
        scrRef={scrRef}
        setScrRef={setScrRef}
        recentScriptureRefs={recentScriptureRefs}
        addRecentScriptureRef={addRecentScriptureRef}
        osPlatformToReserveSpaceFor={osPlatformToReserveSpaceFor}
      />
    );
  }

  // Power mode toolbar
  return (
    <Toolbar
      menuData={menuData}
      onOpenChange={(isOpen: boolean) => {
        setUpdateMenuData(isOpen);
      }}
      onSelectMenuItem={handleMenuCommand}
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
          <ProfileDropdown />
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
      <BookChapterControl
        scrRef={scrRef}
        handleSubmit={setScrRef}
        className="tw-w-96"
        recentSearches={recentScriptureRefs}
        onAddRecentSearch={addRecentScriptureRef}
      />
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

// #region Simple mode toolbar

interface SimpleToolbarProps {
  scrRef: { bookNum: number; chapterNum: number; verseNum: number };
  setScrRef: (scrRef: { bookNum: number; chapterNum: number; verseNum: number }) => boolean;
  recentScriptureRefs: { bookNum: number; chapterNum: number; verseNum: number }[];
  addRecentScriptureRef: (scrRef: {
    bookNum: number;
    chapterNum: number;
    verseNum: number;
  }) => void;
  osPlatformToReserveSpaceFor: string | undefined;
}

function SimpleToolbar({
  scrRef,
  setScrRef,
  recentScriptureRefs,
  addRecentScriptureRef,
  osPlatformToReserveSpaceFor,
}: SimpleToolbarProps) {
  const { selectedProjectId, setSelectedProjectId } = useSimpleModeContext();
  const [projectOptions] = useProjectOptions();

  // 3 panel toggle buttons state
  const [panelToggles, setPanelToggles] = useState([true, true, true]);
  const togglePanel = (index: number) => {
    setPanelToggles((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const selectedProjectOption = projectOptions.find((p) => p.id === selectedProjectId);

  return (
    <Toolbar
      onSelectMenuItem={handleMenuCommand}
      className={cn(
        'tw-h-12 tw-bg-transparent',
        getToolbarOSReservedSpaceClassName(osPlatformToReserveSpaceFor),
      )}
      shouldUseAsAppDragArea
      appMenuAreaChildren={
        <div className="tw-flex tw-items-center tw-gap-2">
          <img width={24} height={24} src={`${logo}`} alt="Application Logo" />
          <span className="tw-text-sm tw-font-semibold tw-whitespace-nowrap">Platform.Bible</span>
        </div>
      }
      configAreaChildren={
        <div className="tw-flex tw-items-center tw-gap-1">
          {/* Plus button */}
          <Button variant="ghost" size="icon" className="tw-h-8 tw-w-8 tw-flex-shrink-0">
            <Plus className="tw-h-4 tw-w-4" />
          </Button>
          {/* 3 panel toggle buttons - taller than wide rectangles */}
          {panelToggles.map((isOn, i) => (
            <button
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              type="button"
              aria-label={`Toggle panel ${i + 1}`}
              aria-pressed={isOn}
              className={cn(
                'tw-h-7 tw-w-4 tw-rounded-sm tw-border tw-flex-shrink-0 tw-transition-colors',
                isOn
                  ? 'tw-bg-primary tw-border-primary'
                  : 'tw-bg-transparent tw-border-muted-foreground/40',
              )}
              onClick={() => togglePanel(i)}
            />
          ))}
          {/* View dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="tw-h-8 tw-gap-1 tw-px-2 tw-flex-shrink-0">
                <Settings2 className="tw-h-4 tw-w-4" />
                <span className="tw-text-xs">View</span>
                <ChevronDown className="tw-h-3 tw-w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Layout Options</DropdownMenuItem>
              <DropdownMenuItem>Reset Layout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      }
    >
      {/* Project selector */}
      <ComboBox
        options={projectOptions}
        value={selectedProjectOption}
        onChange={(newProject: ProjectOption) => setSelectedProjectId(newProject.id)}
        getButtonLabel={(project: ProjectOption) => project.label}
        buttonPlaceholder="Select Project"
        buttonVariant="outline"
        buttonClassName="tw-min-w-32 tw-max-w-48 tw-font-normal tw-h-8"
        popoverContentClassName="tw-w-[300px]"
      />
      {/* BCV control */}
      <BookChapterControl
        scrRef={scrRef}
        handleSubmit={setScrRef}
        className="tw-w-96"
        recentSearches={recentScriptureRefs}
        onAddRecentSearch={addRecentScriptureRef}
      />
    </Toolbar>
  );
}

// #endregion

export default PlatformBibleToolbar;
