import logo from '@assets/icon.png';
import { ReferenceHistoryButtons } from '@renderer/components/reference-history-buttons.component';
import { UserProfilePopover } from '@renderer/components/user-profile-popover/user-profile-popover.component';
import {
  useData,
  useDialogCallback,
  useLocalizedStrings,
  useScrollGroupScrRef,
  useRecentScriptureRefs,
  useProjectSetting,
} from '@renderer/hooks/papi-hooks';
import { useIsPowerMode } from '@renderer/hooks/use-is-power-mode.hook';
import { useSendReceiveAvailability } from '@renderer/hooks/use-send-receive-availability.hook';
import { useProjectPickerData } from '@renderer/hooks/use-project-picker-data.hook';
import { useNavigationTargetWebView } from '@renderer/hooks/use-navigation-target-web-view.hook';
import { useWindowControlsOverlay } from '@renderer/hooks/use-window-controls-overlay.hook';
import { PROJECT_PICKER_DIALOG_TYPE } from '@renderer/components/dialogs/dialog-definition.model';
import { app, dataProviders } from '@renderer/services/papi-frontend.service';
import { availableScrollGroupIds } from '@renderer/services/scroll-group.service-host';
import { updateWebViewDefinitionSync } from '@renderer/services/web-view.service-host';
import {
  registerBookChapterControlHandle,
  TOP_TOOLBAR_BOOK_CHAPTER_CONTROL_OWNER_ID,
} from '@renderer/services/book-chapter-control.registry';
import {
  BOOKS_PRESENT_DEFAULT,
  getBookIdsFromBooksPresent,
} from 'platform-bible-utils/experimental';
import { handleMenuCommand } from '@shared/data/platform-bible-menu.commands';
import { sendCommand } from '@shared/services/command.service';
import { getNetworkEvent } from '@shared/services/network.service';
import { logger } from '@shared/services/logger.service';
import { menuDataService } from '@shared/services/menu-data.service';
import { notificationService } from '@shared/services/notification.service';
import { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { CircleCheck, HomeIcon, RefreshCw } from 'lucide-react';
import {
  Badge,
  BookChapterControl,
  BookChapterControlHandle,
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
  isPlatformError,
  LocalizeKey,
} from 'platform-bible-utils';
import { CSSProperties, useCallback, useMemo, useState } from 'react';

const TOOLTIP_DELAY = 300;

/** Shared by every "sync isn't available" toast so repeat clicks replace it rather than stack. */
const SYNC_UNAVAILABLE_NOTIFICATION_ID = 'toolbar-sync-unavailable';

const MAIN_MENU_DEFAULT = { columns: {}, groups: {}, items: [] };

// Visual breathing room between content and the native buttons on top of the live-measured overlay
// width. Tuned by eye — smaller than the static reserved-space guess's 1rem (see
// getToolbarOSReservedSpaceClassName) because the live measurement is exact, unlike that guess.
const RESERVED_SPACE_BREATHING_ROOM_PX = 4;

// #region Narrow-title-bar degradation ladder (PT-4218)
//
// Simple mode packs a project selector, the reference-history buttons and the BCV control into the
// title bar. Together they need more room than the app's 800px minimum window width leaves once the
// OS caption buttons are reserved, so at that width the trailing controls used to be clipped
// outright by the Toolbar's `overflow-hidden`.
//
// These are container queries against `@container/toolbar`, declared by the Toolbar component on
// the element whose CONTENT box is the usable bar width (window width minus the OS caption-button
// reservation minus the bar's own padding) — so they respond to the space actually available rather
// than to the raw viewport, and they stay correct across macOS/Windows/Linux and in RTL.
//
// A container query cannot oscillate here: the container's width comes from its `w-full` ancestors,
// never from the content these rules hide, so hiding something can't widen the container and
// re-show it.
//
// The thresholds stage the degradation cheapest-loss-first. Every one is applied only when
// `!isPowerMode`, so Power mode's title bar is untouched.

/** Tier 1 — drop the marketing version badge. It is decoration, and costs up to 150px. */
const HIDE_VERSION_BADGE_BELOW_52REM = 'tw:@max-[52rem]/toolbar:hidden';

/**
 * Tier 2 — collapse the sync button to icon-only; its tooltip still names the action. `idle` is the
 * one sync state with no icon of its own, so the collapsed button would render empty; the paired
 * class reveals a stand-in icon exactly when the label goes away. Both are needed: revealing the
 * icon unconditionally would add an icon to the wide layout, which is not this ticket's business.
 */
const HIDE_SYNC_LABEL_BELOW_46REM = 'tw:@max-[46rem]/toolbar:hidden';
const SHOW_IDLE_SYNC_ICON_BELOW_46REM = 'tw:hidden tw:@max-[46rem]/toolbar:block';

/**
 * Tier 3 — show the project's short name alone instead of `Full Name (SHORT)`. The short name is
 * the identifying part, so swapping to it degrades better than ellipsizing the full string down to
 * a meaningless prefix.
 */
const HIDE_LONG_PROJECT_NAME_BELOW_40REM = 'tw:@max-[40rem]/toolbar:hidden';
/** `inline`, not `block` — these two swap inside a `truncate` span, which is an inline context. */
const SHOW_SHORT_PROJECT_NAME_BELOW_40REM = 'tw:hidden tw:@max-[40rem]/toolbar:inline';
// #endregion

const scrollGroupLocalizedStringKeys = getLocalizeKeysForScrollGroupIds(availableScrollGroupIds);

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
  const { currentProject, recentProjects, allProjects, currentProjectError } =
    useProjectPickerData();

  const isPowerMode = useIsPowerMode();

  // The resolved navigation target: the tracked (last-selected) web view's saved definition or,
  // failing that, the main project editor's — same rule `useProjectPickerData` uses to find the
  // current project. The window service resolves it and keeps it current from web view lifecycle
  // events, so the toolbar and the navigation commands can never disagree on the target.
  const resolvedWebView = useNavigationTargetWebView();

  // No resolved target (no eligible tracked tab and no main-project editor open): nothing to
  // navigate — controls are disabled
  const isBookChapterControlDisabled = !resolvedWebView;

  const scrollGroupScrRefTarget: ScrollGroupScrRef =
    resolvedWebView?.definition.scrollGroupScrRef ?? 0;

  const setScrollGroupScrRefTarget = useCallback(
    (newScrollGroupScrRef: ScrollGroupScrRef) => {
      if (!resolvedWebView) return false;
      try {
        return updateWebViewDefinitionSync(resolvedWebView.id, {
          scrollGroupScrRef: newScrollGroupScrRef,
        });
      } catch (e) {
        logger.warn(
          `Toolbar could not update scroll group for web view ${resolvedWebView.id}: ${getErrorMessage(e)}`,
        );
        return false;
      }
    },
    [resolvedWebView],
  );

  const [scrRef, setScrRef, scrollGroupId, setScrollGroupId] = useScrollGroupScrRef(
    scrollGroupScrRefTarget,
    setScrollGroupScrRefTarget,
    resolvedWebView?.definition.projectId,
  );

  const [booksPresentPossiblyError] = useProjectSetting(
    resolvedWebView?.definition.projectId,
    'platformScripture.booksPresent',
    BOOKS_PRESENT_DEFAULT,
  );
  const booksPresent = useMemo(() => {
    if (isPlatformError(booksPresentPossiblyError)) {
      logger.warn(
        `Toolbar failed to get books present: ${getErrorMessage(booksPresentPossiblyError)}`,
      );
      return BOOKS_PRESENT_DEFAULT;
    }
    return booksPresentPossiblyError;
  }, [booksPresentPossiblyError]);
  // Stable identity per booksPresent value — BookChapterControl memoizes its book list (and the
  // filtering/matching derived from it) on this function's identity, so a fresh closure every
  // render would recompute all of that on every toolbar render
  const fetchActiveBookIds = useCallback(
    () => getBookIdsFromBooksPresent(booksPresent),
    [booksPresent],
  );
  const getActiveBookIds = booksPresent ? fetchActiveBookIds : undefined;

  // Register the top BookChapterControl's imperative handle only while it is enabled — a React 19
  // cleanup callback ref so registration tracks both mount/unmount and the enabled state. When
  // isBookChapterControlDisabled flips, this callback's identity changes, so React runs the old
  // cleanup (unregistering) and invokes the new callback (registering only if now enabled).
  const registerTopBookChapterControl = useCallback(
    (handle: BookChapterControlHandle | null) => {
      if (!handle || isBookChapterControlDisabled) return undefined;
      const unsubscribe = registerBookChapterControlHandle(
        TOP_TOOLBAR_BOOK_CHAPTER_CONTROL_OWNER_ID,
        handle,
      );
      return () => {
        unsubscribe();
      };
    },
    [isBookChapterControlDisabled],
  );

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

  // Overrides the static Windows/Linux padding guess (applied to Toolbar's own className below)
  // with a wrapper div carrying the live-measured caption-button width (see
  // useWindowControlsOverlay), so it isn't reserved twice. macOS's fixed-width traffic lights
  // still use the static class as-is.
  const windowControlsOverlayRect = useWindowControlsOverlay();
  const toolbarReservedSpaceStyle: CSSProperties | undefined =
    osPlatformToReserveSpaceFor !== undefined &&
    osPlatformToReserveSpaceFor !== 'darwin' &&
    windowControlsOverlayRect
      ? {
          // Physical paddingLeft/paddingRight, chosen from the live-measured rect: Windows moves
          // the caption buttons to the physical left in RTL locales. Deriving the side from
          // windowControlsOverlayRect itself is correct in both directions since it reflects the
          // buttons' actual measured position.
          // +RESERVED_SPACE_BREATHING_ROOM_PX — without it, content sits pixel-flush against the
          // native buttons, which reads as cramped even though nothing actually overlaps.
          ...(windowControlsOverlayRect.left > 0
            ? { paddingLeft: windowControlsOverlayRect.left + RESERVED_SPACE_BREATHING_ROOM_PX }
            : undefined),
          ...(window.innerWidth - windowControlsOverlayRect.right > 0
            ? {
                paddingRight:
                  window.innerWidth -
                  windowControlsOverlayRect.right +
                  RESERVED_SPACE_BREATHING_ROOM_PX,
              }
            : undefined),
          // @ts-ignore Electron-only property, not in React's CSSProperties type. Toolbar's own
          // drag area (shouldUseAsAppDragArea) doesn't extend into this wrapper, so this strip
          // needs its own drag region or the window can no longer be dragged from here.
          WebkitAppRegion: 'drag',
          // An inset box-shadow, not a border: this div has no explicit height, so a real border
          // would add to its layout height, throwing off WorkspaceUpdatingOverlay's hardcoded `top`
          // whenever this branch is active. A box-shadow paints in the same place without occupying
          // any layout space. var(--border) matches the color Toolbar's own tw:border resolves to.
          boxShadow: 'inset 0 0 0 1px var(--border)',
        }
      : undefined;

  // Live-subscribed (not a one-shot fetch): the extension host calls notifyUpdate('*') on this
  // data provider both when platform.interfaceMode changes (menu-data.service-host.ts) and when
  // contributions resync (which also covers localized-string loading completing), so this always
  // reflects the current mode and current localization without needing to reopen the menu —
  // matching the pattern web-view.component.tsx already uses for WebViewMenu.
  const [menuDataPossiblyError] = useData(menuDataService.dataProviderName).MainMenu(
    undefined,
    MAIN_MENU_DEFAULT,
  );
  const menuData = useMemo(() => {
    if (isPlatformError(menuDataPossiblyError)) {
      logger.warn(
        `Toolbar failed to get main menu data: ${getErrorMessage(menuDataPossiblyError)}`,
      );
      return MAIN_MENU_DEFAULT;
    }
    return menuDataPossiblyError;
  }, [menuDataPossiblyError]);

  const [marketingVersion] = usePromise(
    useCallback(async () => {
      const marketingInfo = await app.getMarketingInfo();
      return marketingInfo.marketingVersion.concat(
        marketingInfo.marketingVersionMoniker ? ` ${marketingInfo.marketingVersionMoniker}` : '',
      );
    }, []),
    'Marketing Version',
  );

  // `undefined` while unknown — the render gate below treats that as available (fail open). Only
  // checked in simple mode, since that gate is the only thing the answer feeds.
  const isSendReceiveAvailable = useSendReceiveAvailability({ enabled: !isPowerMode });

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

  const openHome = useCallback(async () => {
    try {
      await sendCommand('platformGetResources.openHome');
    } catch (e) {
      logger.warn(`Toolbar caught an error while trying to open Home: ${getErrorMessage(e)}`);
    }
  }, []);

  const openSyncStatus = useCallback(async () => {
    try {
      await sendCommand('paratextBibleSendReceive.openSyncStatus');
    } catch (e) {
      // The button is shown whenever send/receive is part of the build, which is true before its
      // commands finish registering — so a click can land while nothing is listening. Tell the user
      // instead of leaving them with a button that appears to do nothing.
      logger.warn(
        `Toolbar caught an error while trying to open sync status: ${getErrorMessage(e)}`,
      );
      try {
        await notificationService.send({
          message: '%toolbar_sync_unavailable%',
          severity: 'warning',
          // Reuse one id so clicking Sync repeatedly replaces the toast instead of stacking copies.
          notificationId: SYNC_UNAVAILABLE_NOTIFICATION_ID,
        });
      } catch (notificationError) {
        logger.warn(
          `Toolbar could not notify the user that sync is unavailable: ${getErrorMessage(notificationError)}`,
        );
      }
    }
  }, []);

  return (
    <div data-testid="toolbar-reserved-space-wrapper" style={toolbarReservedSpaceStyle}>
      <Toolbar
        menuData={menuData}
        onSelectMenuItem={handleMenuCommand}
        className={cn(
          // If the toolbar height changes, the top inset for the workspace updating overlay and
          // getDockLayoutOuterInset (platform-dock-layout-positioning.util.ts) will need updating too.
          isPowerMode ? 'tw:h-12' : 'tw:h-14',
          'tw:bg-transparent',
          // Only reserve the static guess when there's no live measurement to reserve it above instead.
          !toolbarReservedSpaceStyle &&
            getToolbarOSReservedSpaceClassName(osPlatformToReserveSpaceFor),
          // Toolbar's own outer container has an unconditional border and inline padding on both sides.
          // When the wrapper above reserves the trailing space instead, drop Toolbar's own border entirely
          // (the wrapper carries an equivalent box-shadow — see its style above) and Toolbar's own end-side
          // padding, which would otherwise stack with the wrapper's live measurement and over-reserve space.
          toolbarReservedSpaceStyle && 'tw:border-0 tw:pe-0',
        )}
        menubarVariant="muted"
        shouldUseAsAppDragArea
        appMenuAreaChildren={<img width={24} height={24} src={`${logo}`} alt="Application Logo" />}
        configAreaChildren={
          <>
            {!isPowerMode && isSendReceiveAvailable !== false && (
              // Simple mode only — power users send/receive per project from the Home
              // view. Fail open on availability: `undefined` means not known yet (the extension
              // host is busy, or send/receive is still activating), and the button must not hinge
              // on that resolving. Only a settled `false` hides it.
              <TooltipProvider delayDuration={TOOLTIP_DELAY}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      data-testid="toolbar-sync-button"
                      variant="ghost"
                      size="sm"
                      className="pr-twp tw:h-8 tw:shrink-0"
                      onClick={openSyncStatus}
                    >
                      {syncState === 'syncing' && <Spinner className="tw:h-4 tw:w-4" />}
                      {syncState === 'synced' && (
                        <CircleCheck className="tw:h-4 tw:w-4 tw:text-success-foreground" />
                      )}
                      {syncState === 'idle' && !isPowerMode && (
                        <RefreshCw
                          className={cn('tw:h-4 tw:w-4', SHOW_IDLE_SYNC_ICON_BELOW_46REM)}
                        />
                      )}
                      <span className={cn(!isPowerMode && HIDE_SYNC_LABEL_BELOW_46REM)}>
                        {
                          {
                            idle: localizedStrings['%toolbar_sync%'],
                            syncing: localizedStrings['%toolbar_sync_status_syncing%'],
                            synced: localizedStrings['%toolbar_sync_status_synced%'],
                          }[syncState]
                        }
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="tw:font-light">
                      {localizedStrings['%toolbar_sync_open_status%']}
                    </p>
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
                      className={cn(
                        'tw:block tw:max-w-[150px] tw:shrink tw:overflow-hidden tw:font-normal tw:text-ellipsis tw:whitespace-nowrap',
                        !isPowerMode && HIDE_VERSION_BADGE_BELOW_52REM,
                      )}
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
        {isPowerMode && (
          <TooltipProvider delayDuration={TOOLTIP_DELAY}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  data-testid="toolbar-home-button"
                  variant="ghost"
                  size="icon"
                  className="tw:h-8"
                  onClick={openHome}
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
        )}
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
            {/* Replaces a `min-w-48` (192px) floor that alone was a quarter of the usable bar at
                the app's minimum window width and could not be shrunk past (PT-4218). Not dropped
                to `min-w-0`: with everything else in the row shrinkable too, the trigger could
                collapse to just its chevron and swallow the short name that tier 3 above swaps in.
                `min-w-20` (80px) keeps a short name legible and still fits the budget. The
                `max-w-64` cap continues to govern the roomy case. */}
            <SelectTrigger className="tw:max-w-64 tw:min-w-20 tw:border-0 tw:bg-transparent">
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
                    {currentProjectError ?? (
                      <>
                        <span className={HIDE_LONG_PROJECT_NAME_BELOW_40REM}>
                          {currentProject.fullName} ({currentProject.shortName})
                        </span>
                        {/* The short name alone once the full string no longer fits. Not a
                            `truncate` of the full string: `World English Bible (WEB)` clipped to
                            `World Eng…` loses the very part that identifies the project. */}
                        <span className={SHOW_SHORT_PROJECT_NAME_BELOW_40REM}>
                          {currentProject.shortName}
                        </span>
                      </>
                    )}
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
        {typeof scrollGroupId === 'number' && (
          // Key on the scroll group so switching groups remounts and re-seeds the history state.
          <ReferenceHistoryButtons key={scrollGroupId} scrollGroupId={scrollGroupId} />
        )}
        <BookChapterControl
          ref={registerTopBookChapterControl}
          scrRef={scrRef}
          handleSubmit={setScrRef}
          className={isPowerMode ? 'tw:w-96' : 'tw:w-fit'}
          triggerVariant={isPowerMode ? undefined : 'ghost'}
          showTriggerChevron={!isPowerMode}
          disabled={isBookChapterControlDisabled}
          getActiveBookIds={getActiveBookIds}
          recentSearches={recentScriptureRefs}
          onAddRecentSearch={addRecentScriptureRef}
        />
        {isPowerMode && (
          <ScrollGroupSelector
            availableScrollGroupIds={availableScrollGroupIds}
            scrollGroupId={scrollGroupId}
            onChangeScrollGroupId={setScrollGroupId}
            localizedStrings={scrollGroupLocalizedStrings}
            className="tw:h-8"
            disabled={isBookChapterControlDisabled}
          />
        )}
      </Toolbar>
    </div>
  );
}

export default PlatformBibleToolbar;
