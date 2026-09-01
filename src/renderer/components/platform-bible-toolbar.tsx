import logo from '@assets/icon.png';
import { ReferenceHistoryButtons } from '@renderer/components/reference-history-buttons.component';
import { SyncStatusButton } from '@renderer/components/sync-status-button.component';
import { useBackendSyncActivity } from '@renderer/hooks/use-backend-sync-activity.hook';
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
import { useOpenProjectBookIds } from '@renderer/hooks/use-open-project-book-ids.hook';
import { useSendReceiveAvailability } from '@renderer/hooks/use-send-receive-availability.hook';
import { useProjectPickerData } from '@renderer/hooks/use-project-picker-data.hook';
import { useNavigationTargetWebView } from '@renderer/hooks/use-navigation-target-web-view.hook';
import { useWindowControlsOverlay } from '@renderer/hooks/use-window-controls-overlay.hook';
import { PROJECT_PICKER_DIALOG_TYPE } from '@renderer/components/dialogs/dialog-definition.model';
import { app, dataProviders } from '@renderer/services/papi-frontend.service';
import { availableScrollGroupIds } from '@renderer/services/scroll-group.service';
import { updateWebViewDefinitionSync } from '@renderer/services/web-view.service-shard';
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
import { logger } from '@shared/services/logger.service';
import { menuDataService } from '@shared/services/menu-data.service';
import { ScrollGroupScrRef } from '@shared/services/scroll-group.service-model';
import { HomeIcon } from 'lucide-react';
import {
  Badge,
  BOOK_CHAPTER_CONTROL_STRING_KEYS,
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
  SHRINK_STEP,
  Toolbar,
  ToolbarCompoundLabel,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  usePromise,
  useShrinkStepValue,
} from 'platform-bible-react';
import {
  getErrorMessage,
  getLocalizeKeysForScrollGroupIds,
  isPlatformError,
  LocalizeKey,
} from 'platform-bible-utils';
import { CSSProperties, ReactNode, useCallback, useMemo } from 'react';

const TOOLTIP_DELAY = 300;

const MAIN_MENU_DEFAULT = { columns: {}, groups: {}, items: [] };

// Stable identity for the "nothing extra to offer" case, so the memo below does not hand
// BookChapterControl a fresh empty array on every render.
const EMPTY_BOOK_IDS: string[] = [];

// Visual breathing room between content and the native buttons on top of the live-measured overlay
// width. Tuned by eye — smaller than the static reserved-space guess's 1rem (see
// getToolbarOSReservedSpaceClassName) because the live measurement is exact, unlike that guess.
const RESERVED_SPACE_BREATHING_ROOM_PX = 4;

// Simple mode packs a project selector, the reference-history buttons and the BCV control into the
// title bar. Together they want more room than the app's minimum window width leaves once the OS
// caption buttons are reserved, so two mechanisms share the job of fitting them — and neither one
// hides a control, because the Toolbar's `overflow-hidden` would clip it silently rather than
// signal it.
//
// The bar's contents SHRINK: `min-w-0` on the Toolbar's content area (see toolbar.component.tsx)
// defeats the `min-width: auto` floor a flex item gets by default, so the row can absorb the
// squeeze instead of pushing its trailing controls under that clip.
//
// Individual controls then COLLAPSE by width: `useShrinkStep` publishes a discrete step from a
// measured width and the labels below pick a shorter form at each one.
// `adr-toolbar-shrink-measurement` records why that measurement is done in JS rather than
// with CSS container queries — their failure mode here is silent.

const scrollGroupLocalizedStringKeys = getLocalizeKeysForScrollGroupIds(availableScrollGroupIds);

const bookChapterControlLocalizedStringKeys: LocalizeKey[] = [...BOOK_CHAPTER_CONTROL_STRING_KEYS];

const LOCALIZED_STRING_KEYS: LocalizeKey[] = [
  '%mainMenu_openHome%',
  '%projectPicker_toolbar_select_project%',
  '%projectPicker_toolbar_no_projects%',
  '%projectPicker_toolbar_more_projects%',
];

/**
 * Radix's `SelectValue` hard-codes `style={{ pointerEvents: 'none' }}` on its span and discards any
 * `className` or `style` passed to it, so anything rendered inside it is invisible to the pointer:
 * no `:hover`, no pointer events, and a native `title` that can never open. `pointer-events` is
 * inherited, so re-declaring `auto` on the descendant that needs it restores hit-testing for that
 * subtree only. Presses still reach the trigger, which is an ancestor and gets the bubbled event.
 */
const POINTER_EVENTS_INSIDE_SELECT_VALUE = 'tw:pointer-events-auto';

/**
 * The project selector's trigger label.
 *
 * A separate component rather than inline JSX because it reads `ShrinkStepContext`, which `Toolbar`
 * publishes. `PlatformBibleToolbar` _renders_ `Toolbar`, so a hook call there would sit above the
 * provider and read the widest step forever. This renders as `Toolbar`'s descendant, so it sees the
 * real value.
 */
function ProjectSelectorLabel({
  fullName,
  shortName,
  errorMessage,
}: {
  fullName: string;
  shortName: string;
  errorMessage?: string;
}) {
  const shrinkStep = useShrinkStepValue();
  const isAtMinimum = shrinkStep >= SHRINK_STEP.MINIMUM;

  // An error replaces the label rather than sharing it. Putting it in the compound label's
  // secondary slot would clip it mid-sentence and then drop it entirely at the narrowest step,
  // leaving red text as the only signal that anything is wrong.
  if (errorMessage) {
    return (
      <span
        className={cn(
          'tw:min-w-0 tw:flex-1 tw:truncate tw:text-destructive',
          POINTER_EVENTS_INSIDE_SELECT_VALUE,
        )}
        title={errorMessage}
      >
        {errorMessage}
      </span>
    );
  }

  return (
    <ToolbarCompoundLabel
      // The short name is the identifying part, so it is the field that must survive — but it reads
      // second, hence `secondaryFirst`.
      primary={isAtMinimum ? shortName : `(${shortName})`}
      secondary={fullName}
      secondaryFirst
      showSecondary={!isAtMinimum}
      fullText={`${fullName} (${shortName})`}
      className={POINTER_EVENTS_INSIDE_SELECT_VALUE}
    />
  );
}

/**
 * The project selector's trigger, sized to the space the toolbar currently has.
 *
 * The width floor lives here rather than inline at the call site for the same reason
 * {@link ProjectSelectorLabel} is its own component: the step comes from `ShrinkStepContext`, which
 * `Toolbar` publishes, so it can only be read from a component rendered as `Toolbar`'s descendant.
 *
 * The floor has to move with the step or dropping the full name buys nothing — the label would just
 * get shorter inside a box still reserving 192px, and the space it was supposed to free would come
 * out of `BookChapterControl` instead.
 */
function ProjectSelectorTrigger({
  placeholder,
  children,
}: {
  placeholder: string | undefined;
  children?: ReactNode;
}) {
  const shrinkStep = useShrinkStepValue();

  return (
    <SelectTrigger
      data-testid="toolbar-project-selector"
      className={cn(
        'tw:max-w-64 tw:border-0 tw:bg-transparent',
        // Still a floor at the narrowest step, just a smaller one: `min-w-24` (96px) is the
        // measured width a short project name needs (~97px for `ESVUS16`, including the trigger's
        // padding and chevron), so the name stays readable while the trigger remains a comfortable
        // click target. Not `min-w-0`: with everything else in the row shrinkable too, the trigger
        // would collapse to just its chevron.
        shrinkStep >= SHRINK_STEP.MINIMUM ? 'tw:min-w-24' : 'tw:min-w-48',
      )}
    >
      <SelectValue placeholder={placeholder}>{children}</SelectValue>
    </SelectTrigger>
  );
}

export function PlatformBibleToolbar() {
  const { currentSimpleProject, recentProjects, allProjects, currentSimpleProjectError } =
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

  // The baseline is the navigation target's own project — its definition `projectId`. For a view
  // that displays something other than its own project (a resource panel, whose `projectId` is the
  // container whose reference list is shown; the Scripture Text Grid, which hosts many), that means
  // the books of the resource on screen are offered as additional and labelled as outside the
  // project. That is deliberate: the baseline tracks the project the user is working in, not
  // whatever a panel happens to be rendering, so the unqualified list stays stable as panels change.
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
  const projectBookIds = useMemo(() => getBookIdsFromBooksPresent(booksPresent), [booksPresent]);
  // Stable identity per booksPresent value — BookChapterControl memoizes its book list (and the
  // filtering/matching derived from it) on this function's identity, so a fresh closure every
  // render would recompute all of that on every toolbar render
  const fetchActiveBookIds = useCallback(() => projectBookIds, [projectBookIds]);
  const getActiveBookIds = booksPresent ? fetchActiveBookIds : undefined;

  // Simple mode is the only mode this ships in: it has a single, global book/chapter/verse control,
  // so widening its book list is unambiguous. Power mode's own controls are left as they are for
  // that team to decide on; the component API stays open to them either way. Disabled outright in
  // Power mode so it opens no data providers and no booksPresent subscriptions for a result nothing
  // there reads.
  const openProjectBookIds = useOpenProjectBookIds(
    resolvedWebView?.definition.projectId,
    !isPowerMode,
  );
  const additionalBookIds = useMemo(() => {
    if (isPowerMode) return EMPTY_BOOK_IDS;
    // BookChapterControl renders exactly the book list it is given, so the current book has to come
    // from here or a reference on a book the active project lacks would be missing from its own
    // picker.
    if (projectBookIds.includes(scrRef.book) || openProjectBookIds.includes(scrRef.book))
      return openProjectBookIds;
    return [...openProjectBookIds, scrRef.book];
  }, [isPowerMode, projectBookIds, openProjectBookIds, scrRef.book]);
  // Stable identity per value, for the same reason fetchActiveBookIds is memoized above:
  // BookChapterControl memoizes its book list on this function's identity.
  const fetchAdditionalBookIds = useCallback(() => additionalBookIds, [additionalBookIds]);
  // Undefined rather than a function returning an empty list: the control offers no "show more
  // books" toggle when there is nothing extra to offer.
  const getAdditionalBookIds = additionalBookIds.length > 0 ? fetchAdditionalBookIds : undefined;

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

  const [bookChapterControlLocalizedStrings] = useLocalizedStrings(
    bookChapterControlLocalizedStringKeys,
  );

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
  // Fail open a second way: even a settled `false` must not hide the indicator while the backend
  // says a sync is genuinely running. `useSendReceiveAvailability` asks whether the send/receive
  // EXTENSION is present, but syncs also start from paths that never touch it — `startup-tasks.ts`
  // calls the dotnet `syncProjects` command directly — so an extension that is missing or failed to
  // activate would otherwise leave a multi-minute sync with no surface at all in Simple mode, where
  // the persistent toast is suppressed in favour of this indicator. Subscription-only, so it costs
  // nothing in builds that never sync. See `useBackendSyncActivity`.
  const isBackendSyncing = useBackendSyncActivity();

  const openHome = useCallback(async () => {
    try {
      await sendCommand('platformGetResources.openHome');
    } catch (e) {
      logger.warn(`Toolbar caught an error while trying to open Home: ${getErrorMessage(e)}`);
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
            {!isPowerMode && (isSendReceiveAvailable !== false || isBackendSyncing) && (
              // Simple mode only — power users send/receive per project from the Home
              // view. Fail open on availability: `undefined` means not known yet (the extension
              // host is busy, or send/receive is still activating), and the button must not hinge
              // on that resolving. A settled `false` hides it — unless the backend is reporting a
              // live sync, which is a surface the user needs regardless of what the extension
              // probe says (see `isBackendSyncing` above).
              //
              // The cost of failing open is that mounting starts two seed-retry loops in builds with
              // no send/receive at all, and each toggle between Simple and Power mode unmounts and
              // remounts this, discarding seeded state and restarting them. An unregistered command
              // is not cheap to fail: `sendCommand` routes through `requestWithRetry`, so one read
              // rejects only after `MAX_REQUEST_ATTEMPTS` attempts at `REQUEST_ATTEMPT_WAIT_TIME_MS`
              // apart (~10s, `rpc.model.ts`). Availability settles to `false` within
              // `SEND_RECEIVE_UNKNOWN_GRACE_MS` (5s) there, so this unmounts while each loop's FIRST
              // read is still retrying — well short of the full retry window, but two reads' worth of
              // round trips per mount rather than a handful. A one-shot capability probe would fit a
              // permanently-absent command better than a retry loop does.
              // TODO(PT-4233): Revisit once the companion Send/Receive PR lands and this command is
              // implemented somewhere, which is what makes the retry loop worth its cost.
              <SyncStatusButton />
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
            value={currentSimpleProject?.id ?? ''}
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
            <ProjectSelectorTrigger
              placeholder={
                hasProjectPickerItems
                  ? localizedStrings['%projectPicker_toolbar_select_project%']
                  : localizedStrings['%projectPicker_toolbar_no_projects%']
              }
            >
              {currentSimpleProject && (
                <ProjectSelectorLabel
                  fullName={currentSimpleProject.fullName}
                  shortName={currentSimpleProject.shortName}
                  errorMessage={currentSimpleProjectError}
                />
              )}
            </ProjectSelectorTrigger>
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
          getAdditionalBookIds={getAdditionalBookIds}
          localizedStrings={bookChapterControlLocalizedStrings}
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
