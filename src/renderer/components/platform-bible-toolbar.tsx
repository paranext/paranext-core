import logo from '@assets/icon.png';
import { provideMenuData } from '@renderer/components/platform-bible-menu.data';
import { UserProfilePopover } from '@renderer/components/user-profile-popover/user-profile-popover.component';
import {
  useDialogCallback,
  useLocalizedStrings,
  useScrollGroupScrRef,
  useRecentScriptureRefs,
} from '@renderer/hooks/papi-hooks';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { useProjectPickerData } from '@renderer/hooks/use-project-picker-data.hook';
import { PROJECT_PICKER_DIALOG_TYPE } from '@renderer/components/dialogs/dialog-definition.model';
import { app, dataProviders } from '@renderer/services/papi-frontend.service';
import { availableScrollGroupIds } from '@renderer/services/scroll-group.service-host';
import { handleMenuCommand } from '@shared/data/platform-bible-menu.commands';
import { sendCommand } from '@shared/services/command.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { logger } from '@shared/services/logger.service';
import { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { CircleCheck, HomeIcon } from 'lucide-react';
import {
  Badge,
  BookChapterControl,
  Button,
  cn,
  getToolbarOSReservedSpaceClassName,
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  ScrollGroupSelector,
  Spinner,
  Toolbar,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useEvent,
  usePromise,
} from 'platform-bible-react';
import {
  getErrorMessage,
  getLocalizeKeysForScrollGroupIds,
  LocalizeKey,
  ScrollGroupId,
} from 'platform-bible-utils';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const TOOLTIP_DELAY = 300;

// Heuristic delay before retrying the send/receive availability check on startup. The extension
// host may not be ready when the toolbar first mounts. onDidReloadExtensions handles recovery
// after that initial window, so a single retry here is sufficient.
const SEND_RECEIVE_AVAILABILITY_STARTUP_RETRY_MS = 2000;

const scrollGroupIdLocalStorageKey = 'platform-bible-toolbar.scrollGroupId';

// Exclude no scroll group in the top selector because it would be pointless
const availableScrollGroupIdsTop = availableScrollGroupIds.filter(
  (scrollGroupId) => scrollGroupId !== undefined,
);

const scrollGroupLocalizedStringKeys = getLocalizeKeysForScrollGroupIds(availableScrollGroupIdsTop);

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%mainMenu_openHome%',
  '%toolbar_sync%',
  '%toolbar_sync_open_status%',
  '%toolbar_sync_status_synced%',
  '%toolbar_sync_status_syncing%',
  '%projectPicker_toolbar_select_project%',
  '%projectPicker_toolbar_no_projects%',
  '%projectPicker_toolbar_more_projects%',
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

  const isPowerMode = useIsPowerMode();

  const { currentProject, recentProjects, allProjects, currentProjectError } =
    useProjectPickerData();

  const openProject = useCallback(async (projectId: string) => {
    // This command comes from an extension and is not typed in CommandHandlers.
    // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
    await (sendCommand as any)('platformScriptureEditor.openScriptureEditor', projectId);
    const svc = await dataProviders.get('platformScripture.recentlyOpenedProjects');
    await svc?.recordProjectOpened(projectId);
  }, []);

  const showProjectPicker = useDialogCallback(
    PROJECT_PICKER_DIALOG_TYPE,
    { isModal: true },
    async (projectId) => {
      if (!projectId) return;
      try {
        await openProject(projectId);
      } catch (e) {
        logger.warn(`ProjectPicker: error opening project ${projectId}: ${getErrorMessage(e)}`);
      }
    },
  );

  const projectPickerItems = recentProjects.length > 0 ? recentProjects : allProjects;
  const hasProjectPickerItems = projectPickerItems.length > 0;

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

  // Default is `undefined` (not yet resolved); the command itself always returns `boolean`.
  const [isSendReceiveAvailable, setIsSendReceiveAvailable] = useState<boolean | undefined>(
    undefined,
  );

  const [syncState, setSyncState] = useState<'idle' | 'syncing' | 'synced'>('idle');

  const handleSyncStateChanged = useCallback(
    ({ isSyncing }: { isSyncing: boolean }) => setSyncState(isSyncing ? 'syncing' : 'synced'),
    [],
  );

  const onSyncStateChanged = useMemo(
    () => getNetworkEvent<{ isSyncing: boolean }>('paratextBibleSendReceive.onSyncStateChanged'),
    [],
  );
  useEvent(onSyncStateChanged, handleSyncStateChanged);

  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const checkIfSendReceiveAvailable = useCallback(async () => {
    try {
      // This command comes from an extension and is not typed in CommandHandlers.
      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
      const isAvailable = await (sendCommand as any)('platformGetResources.isSendReceiveAvailable');
      setIsSendReceiveAvailable(isAvailable);
    } catch (e) {
      // Don't set false — a throw means the extension host wasn't ready yet (startup race), not
      // that the extension is absent. Schedule a retry so the button isn't permanently hidden.
      logger.warn(`Toolbar could not determine send/receive availability: ${getErrorMessage(e)}`);
      retryTimeoutRef.current = setTimeout(
        checkIfSendReceiveAvailable,
        SEND_RECEIVE_AVAILABILITY_STARTUP_RETRY_MS,
      );
    }
  }, []);

  useEffect(() => {
    checkIfSendReceiveAvailable();
    return () => clearTimeout(retryTimeoutRef.current);
  }, [checkIfSendReceiveAvailable]);

  const onDidReloadExtensions = useMemo(
    () => getNetworkEvent('platform.onDidReloadExtensions'),
    [],
  );
  useEvent(onDidReloadExtensions, checkIfSendReceiveAvailable);

  return (
    <Toolbar
      menuData={menuData}
      onOpenChange={(isOpen: boolean) => {
        setUpdateMenuData(isOpen);
      }}
      onSelectMenuItem={handleMenuCommand}
      className={cn(
        // If the toolbar height changes, the top inset for the workspace updating overlay will need to be updated too.
        'tw:h-12 tw:bg-transparent',
        getToolbarOSReservedSpaceClassName(osPlatformToReserveSpaceFor),
      )}
      menubarVariant="muted"
      shouldUseAsAppDragArea
      appMenuAreaChildren={<img width={24} height={24} src={`${logo}`} alt="Application Logo" />}
      configAreaChildren={
        <>
          {isSendReceiveAvailable !== false && (
            // While loading (undefined), the button stays in the DOM so layout doesn't shift, but
            // is hidden via tw:invisible (visual), aria-hidden (accessibility tree), and tabIndex=-1
            // (keyboard navigation). All three are required: tw:invisible alone is still reachable
            // by AT and keyboard; aria-hidden alone is still tab-focusable.
            <TooltipProvider delayDuration={TOOLTIP_DELAY}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    data-testid="toolbar-sync-button"
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'pr-twp tw:h-8 tw:shrink-0',
                      isSendReceiveAvailable === undefined && 'tw:invisible',
                    )}
                    // || undefined removes the attribute entirely when visible; aria-hidden="false" has different semantics than omitting it
                    aria-hidden={isSendReceiveAvailable === undefined || undefined}
                    tabIndex={isSendReceiveAvailable === undefined ? -1 : undefined}
                    onClick={() => {
                      // This command comes from an extension and is not typed in CommandHandlers.
                      // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
                      (sendCommand as any)('paratextBibleSendReceive.openSyncStatus').catch(
                        (e: unknown) =>
                          logger.warn(
                            `Toolbar caught an error while trying to open sync status: ${getErrorMessage(e)}`,
                          ),
                      );
                    }}
                  >
                    {syncState === 'syncing' && <Spinner className="tw:h-4 tw:w-4" />}
                    {syncState === 'synced' && (
                      <CircleCheck className="tw:h-4 tw:w-4 tw:text-success-foreground" />
                    )}
                    {
                      {
                        idle: localizedStrings['%toolbar_sync%'],
                        syncing: localizedStrings['%toolbar_sync_status_syncing%'],
                        synced: localizedStrings['%toolbar_sync_status_synced%'],
                      }[syncState]
                    }
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="tw:font-light">{localizedStrings['%toolbar_sync_open_status%']}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {marketingVersion !== '' && (
            <TooltipProvider delayDuration={TOOLTIP_DELAY}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="ghost"
                    className="tw:block tw:max-w-[150px] tw:shrink tw:overflow-hidden tw:font-normal tw:text-ellipsis tw:whitespace-nowrap"
                  >
                    {marketingVersion}
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="tw:font-light">{marketingVersion}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <UserProfilePopover />
        </>
      }
    >
      <TooltipProvider delayDuration={TOOLTIP_DELAY}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="tw:h-8"
              onClick={() => {
                // This command comes from an extension and is not typed in CommandHandlers.
                // eslint-disable-next-line no-type-assertion/no-type-assertion, @typescript-eslint/no-explicit-any
                (sendCommand as any)('platformGetResources.openHome');
              }}
            >
              <HomeIcon />
            </Button>
          </TooltipTrigger>
          {localizedStrings['%mainMenu_openHome%'] && (
            <TooltipContent>
              <p className="tw:font-light">{localizedStrings['%mainMenu_openHome%']}</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
      {!isPowerMode && (
        <Select
          value={currentProject?.id ?? ''}
          onValueChange={async (projectId: string) => {
            try {
              await openProject(projectId);
            } catch (e: unknown) {
              logger.warn(
                `Toolbar caught an error while trying to open project ${projectId}: ${getErrorMessage(e)}`,
              );
            }
          }}
          disabled={!hasProjectPickerItems}
        >
          <SelectTrigger className="tw:max-w-64 tw:min-w-48">
            <SelectValue
              placeholder={
                hasProjectPickerItems
                  ? localizedStrings['%projectPicker_toolbar_select_project%']
                  : localizedStrings['%projectPicker_toolbar_no_projects%']
              }
            >
              {currentProject && (
                <span
                  className={cn(
                    'tw:min-w-0 tw:flex-1 tw:truncate',
                    currentProjectError && 'tw:text-destructive',
                  )}
                >
                  {currentProjectError ??
                    `${currentProject.fullName} (${currentProject.shortName})`}
                </span>
              )}
            </SelectValue>
          </SelectTrigger>
          {hasProjectPickerItems && (
            <SelectContent>
              {projectPickerItems.map((p) => (
                <SelectItem key={p.id} value={p.id} className="tw:whitespace-normal">
                  {p.fullName} ({p.shortName})
                </SelectItem>
              ))}
              <SelectSeparator />
              <button
                type="button"
                className="tw:w-full tw:cursor-pointer tw:px-2 tw:py-1.5 tw:text-start tw:text-sm"
                onClick={() => showProjectPicker()}
              >
                {localizedStrings['%projectPicker_toolbar_more_projects%']}
              </button>
            </SelectContent>
          )}
        </Select>
      )}
      <BookChapterControl
        scrRef={scrRef}
        handleSubmit={setScrRef}
        className="tw:w-96"
        recentSearches={recentScriptureRefs}
        onAddRecentSearch={addRecentScriptureRef}
      />
      {isPowerMode && (
        <ScrollGroupSelector
          availableScrollGroupIds={availableScrollGroupIdsTop}
          scrollGroupId={scrollGroupId}
          onChangeScrollGroupId={setScrollGroupId}
          localizedStrings={scrollGroupLocalizedStrings}
          className="tw:h-8"
        />
      )}
    </Toolbar>
  );
}

export default PlatformBibleToolbar;
