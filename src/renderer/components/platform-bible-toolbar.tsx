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
import { useInterfaceMode } from '@renderer/hooks/use-interface-mode.hook';
import { useOpenProjectBookIds } from '@renderer/hooks/use-open-project-book-ids.hook';
import { useSendReceiveAvailability } from '@renderer/hooks/use-send-receive-availability.hook';
import { useProjectPickerData } from '@renderer/hooks/use-project-picker-data.hook';
import { useNavigationTargetWebView } from '@renderer/hooks/use-navigation-target-web-view.hook';
import { useWindowControlsOverlay } from '@renderer/hooks/use-window-controls-overlay.hook';
import { PROJECT_PICKER_DIALOG_TYPE } from '@renderer/components/dialogs/dialog-definition.model';
import { type ProjectItem } from '@renderer/components/projects/project-picker.component';
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
import { HomeIcon, LockIcon } from 'lucide-react';
import {
  Badge,
  BOOK_CHAPTER_CONTROL_STRING_KEYS,
  BookChapterControl,
  BookChapterControlHandle,
  Button,
  cn,
  getToolbarOSReservedSpaceClassName,
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
  useTruncationTooltip,
} from 'platform-bible-react';
import {
  ProjectSelector,
  type ProjectSelectorProject,
  type ProjectSelectorSection,
} from 'platform-bible-react/experimental';
import {
  getErrorMessage,
  getLocalizeKeysForScrollGroupIds,
  isPlatformError,
  type LanguageStrings,
  LocalizeKey,
  normalizeProjectId,
} from 'platform-bible-utils';
import { CSSProperties, useCallback, useMemo } from 'react';

const TOOLTIP_DELAY = 300;

const MAIN_MENU_DEFAULT = { columns: {}, groups: {}, items: [] };

// Stable identity for the "nothing extra to offer" case, so the memo below does not hand
// BookChapterControl a fresh empty array on every render.
const EMPTY_BOOK_IDS: string[] = [];

// Stable identities so the selector does not re-partition or re-render on every toolbar render.
const EMPTY_OPEN_TABS: never[] = [];
const CUSTOM_ONLY_GROUPINGS = ['custom'] as const;

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
  '%projectPicker_toolbar_aria_label%',
  '%projectPicker_section_recent%',
  '%projectPicker_section_projects_localOnly%',
  '%projectPicker_search_placeholder%',
  '%projectPicker_no_results%',
  '%projectPicker_readOnly_label%',
];

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
  const {
    ref: errorRef,
    open: isErrorClipHovered,
    onPointerEnter: onErrorPointerEnter,
    onPointerLeave: onErrorPointerLeave,
  } = useTruncationTooltip<HTMLSpanElement>();

  // An error replaces the label rather than sharing it. Putting it in the compound label's
  // secondary slot would clip it mid-sentence and then drop it entirely at the narrowest step,
  // leaving red text as the only signal that anything is wrong.
  //
  // The whole message is offered through the app's own truncation tooltip, the mechanism
  // {@link ToolbarCompoundLabel} uses: `ProjectSelector` keeps a native `title` off its trigger on
  // purpose, so the browser default would never open here.
  if (errorMessage) {
    return (
      <TooltipProvider>
        <Tooltip open={isErrorClipHovered}>
          <TooltipTrigger asChild>
            <span
              ref={errorRef}
              className="tw:min-w-0 tw:flex-1 tw:truncate tw:text-destructive"
              onPointerEnter={onErrorPointerEnter}
              onPointerLeave={onErrorPointerLeave}
            >
              {errorMessage}
            </span>
          </TooltipTrigger>
          <TooltipContent>{errorMessage}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
    />
  );
}

/**
 * The Simple-mode project selector, sized and labelled for the space the toolbar currently has.
 *
 * A separate component rather than inline JSX for the same reason {@link ProjectSelectorLabel} is:
 * the shrink step comes from `ShrinkStepContext`, which `Toolbar` publishes, so it can only be read
 * from a component rendered as `Toolbar`'s descendant.
 */
function ToolbarProjectSelector({
  projects,
  recentIds,
  currentProject,
  currentProjectError,
  isLoading,
  localizedStrings,
  onSelectProject,
  onShowMoreProjects,
}: {
  projects: ProjectItem[];
  recentIds: readonly string[];
  currentProject: ProjectItem | undefined;
  currentProjectError: string | undefined;
  isLoading: boolean;
  localizedStrings: LanguageStrings;
  onSelectProject: (projectId: string) => void;
  onShowMoreProjects: () => void;
}) {
  const shrinkStep = useShrinkStepValue();

  // `ProjectItem` and `ProjectSelectorProject` invert the meaning of `language`: the item's is a
  // BCP-47 tag and its `languageDisplayName` is the readable name, while the selector's `language`
  // is the readable name and `languageCode` is the tag. Mapping them straight across type-checks
  // and is wrong.
  const selectorProjects = useMemo<ProjectSelectorProject[]>(
    () =>
      projects.map((project) => ({
        id: project.id,
        shortName: project.shortName,
        fullName: project.fullName,
        language: project.languageDisplayName,
        languageCode: project.language,
      })),
    [projects],
  );

  const recentIndex = useMemo(() => {
    const index = new Map<string, number>();
    recentIds.forEach((id, position) => index.set(normalizeProjectId(id), position));
    return index;
  }, [recentIds]);

  // Absent metadata means editable — the registered default for `platform.isEditable` is true — so
  // this tests for an explicit `false` rather than for falsiness.
  const readOnlyIds = useMemo(
    () =>
      new Set(
        projects
          .filter((project) => project.isEditable === false)
          .map((project) => normalizeProjectId(project.id)),
      ),
    [projects],
  );

  // Memoized because `ProjectSelector` re-partitions the whole list whenever this array's identity
  // changes — an inline literal would re-partition on every search keystroke.
  const customSections = useMemo<ProjectSelectorSection[]>(
    () => [
      {
        id: 'recent',
        label: localizedStrings['%projectPicker_section_recent%'],
        match: (project) => recentIndex.has(normalizeProjectId(project.id)),
        // Recency, not alphabetical — alphabetical order defeats the section's purpose.
        compare: (a, b) =>
          (recentIndex.get(normalizeProjectId(a.id)) ?? Number.MAX_SAFE_INTEGER) -
          (recentIndex.get(normalizeProjectId(b.id)) ?? Number.MAX_SAFE_INTEGER),
      },
      {
        // Names its own boundary: this list is what is on this machine, so a project the user can
        // reach on the server but has not downloaded is accounted for rather than silently absent.
        id: 'yours',
        label: localizedStrings['%projectPicker_section_projects_localOnly%'],
        match: () => true,
      },
    ],
    [localizedStrings, recentIndex],
  );

  const renderProjectIndicator = useCallback(
    (project: ProjectSelectorProject) =>
      readOnlyIds.has(normalizeProjectId(project.id)) ? (
        <LockIcon
          className="tw:h-3 tw:w-3 tw:shrink-0"
          aria-label={localizedStrings['%projectPicker_readOnly_label%']}
        />
      ) : undefined,
    [readOnlyIds, localizedStrings],
  );

  const placeholder =
    selectorProjects.length > 0
      ? localizedStrings['%projectPicker_toolbar_select_project%']
      : localizedStrings['%projectPicker_toolbar_no_projects%'];

  // Supplying `renderTriggerLabel` hands this function the whole trigger label, `buttonPlaceholder`
  // included, so the nothing-selected case has to be answered here or the trigger renders empty.
  //
  // `selected` is whichever list entry carries the selected id, and the open project is not always
  // one: `useProjectPickerData` resolves the active editor's project by a direct metadata lookup
  // when the shared snapshot lacks it, so it can be current without appearing in either list. Name
  // it from what the toolbar already knows in that case — the placeholder is for genuinely nothing
  // open.
  const renderTriggerLabel = useCallback(
    (selected: ProjectSelectorProject | undefined) => {
      if (currentProjectError)
        return <ProjectSelectorLabel fullName="" shortName="" errorMessage={currentProjectError} />;
      const named = selected ?? currentProject;
      if (!named) return placeholder;
      return <ProjectSelectorLabel fullName={named.fullName} shortName={named.shortName} />;
    },
    [currentProject, currentProjectError, placeholder],
  );

  const selectorLocalizedStrings = useMemo(
    () => ({ searchPlaceholder: localizedStrings['%projectPicker_search_placeholder%'] }),
    [localizedStrings],
  );

  const footerAction = useMemo(
    () => ({
      label: localizedStrings['%projectPicker_toolbar_more_projects%'],
      onSelect: onShowMoreProjects,
    }),
    [localizedStrings, onShowMoreProjects],
  );

  const handleChangeSelection = useCallback(
    ({ projectId }: { projectId: string }) => {
      if (projectId) onSelectProject(projectId);
    },
    [onSelectProject],
  );

  return (
    <ProjectSelector
      mode="project"
      projects={selectorProjects}
      // Empty on purpose: `openTabs` drives the scroll-group chips and the "Opened tabs" section,
      // and Simple mode exposes neither.
      openTabs={EMPTY_OPEN_TABS}
      selection={{ projectId: currentProject?.id }}
      onChangeSelection={handleChangeSelection}
      customSections={customSections}
      availableGroupings={CUSTOM_ONLY_GROUPINGS}
      defaultGrouping="custom"
      hideFilterMenu
      renderProjectIndicator={renderProjectIndicator}
      renderTriggerLabel={renderTriggerLabel}
      footerAction={footerAction}
      isLoading={isLoading}
      localizedStrings={selectorLocalizedStrings}
      ariaLabel={localizedStrings['%projectPicker_toolbar_aria_label%']}
      buttonPlaceholder={placeholder}
      commandEmptyMessage={localizedStrings['%projectPicker_no_results%']}
      buttonVariant="ghost"
      buttonClassName={cn(
        'tw:w-auto tw:max-w-64 tw:border-0 tw:bg-transparent',
        // Still a floor at the narrowest step, just a smaller one: `min-w-24` (96px) is the
        // measured width a short project name needs, so the name stays readable while the trigger
        // remains a comfortable click target. Not `min-w-0`: with everything else in the row
        // shrinkable too, the trigger would collapse to just its chevron.
        shrinkStep >= SHRINK_STEP.MINIMUM ? 'tw:min-w-24' : 'tw:min-w-48',
      )}
    />
  );
}

export function PlatformBibleToolbar() {
  const {
    currentSimpleProject,
    recentProjects,
    allProjects,
    currentSimpleProjectError,
    isLoading: isProjectPickerLoading,
  } = useProjectPickerData();

  // One subscription for both answers, since the toolbar gates controls on each. `isSimpleMode` is
  // deliberately not `!isPowerMode`: the simple-only controls below must never appear in power
  // mode, so they wait for the mode to be known rather than rendering on the 'simple' placeholder
  // that stands in for an unresolved read. Power-only controls can use `isPowerMode` as-is — that
  // test already fails closed while the mode is unknown.
  const [interfaceMode, , isInterfaceModeKnown] = useInterfaceMode();
  const isPowerMode = interfaceMode === 'power';
  const isSimpleMode = isInterfaceModeKnown && interfaceMode === 'simple';

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
  // that team to decide on; the component API stays open to them either way. Gated on
  // `!isPowerMode` rather than the stricter `isSimpleMode` for the same reason as the availability
  // probe below: this is a prefetch, so starting it while the mode is still unknown means the
  // widened list is ready the moment we learn the mode is simple. The cost is that a power user
  // whose mode has not resolved yet briefly opens the project's data provider and one booksPresent
  // subscription for a result nothing there reads.
  const openProjectBookIds = useOpenProjectBookIds(
    resolvedWebView?.definition.projectId,
    !isPowerMode,
  );
  const additionalBookIds = useMemo(() => {
    // `isSimpleMode`, not `!isPowerMode`: unlike the prefetch above, this feeds rendered content —
    // the widened book list and the "show more books" affordance that comes with it — so an
    // unresolved read must not put simple mode's list in front of a power user.
    if (!isSimpleMode) return EMPTY_BOOK_IDS;
    // BookChapterControl renders exactly the book list it is given, so the current book has to come
    // from here or a reference on a book the active project lacks would be missing from its own
    // picker.
    if (projectBookIds.includes(scrRef.book) || openProjectBookIds.includes(scrRef.book))
      return openProjectBookIds;
    return [...openProjectBookIds, scrRef.book];
  }, [isSimpleMode, projectBookIds, openProjectBookIds, scrRef.book]);
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

  // The union of both sections. The hook returns them disjoint (`allProjects` already excludes
  // recents), so concatenating cannot duplicate a project.
  const pickerProjects = useMemo(
    () => [...recentProjects, ...allProjects],
    [recentProjects, allProjects],
  );
  const recentIds = useMemo(() => recentProjects.map((project) => project.id), [recentProjects]);
  const handleSelectProject = useCallback(
    (projectId: string) => {
      openProject(projectId).catch((e: unknown) => {
        logger.warn(
          `Toolbar caught an error while trying to open project ${projectId}: ${getErrorMessage(e)}`,
        );
      });
    },
    [openProject],
  );

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

  // Live-subscribed (not a one-shot fetch) in the main window: the extension host calls
  // notifyUpdate('*') on this data provider both when platform.interfaceMode changes
  // (menu-data.service-host.ts) and when contributions resync (which also covers localized-string
  // loading completing), so the main window's menu always reflects the current mode and current
  // localization without needing to reopen it — matching the pattern web-view.component.tsx already
  // uses for WebViewMenu. A secondary window never subscribes at all (see below), so it gets no live
  // updates because it draws no menu to update.
  // Only the main window draws the menu, so only the main window subscribes: passing `undefined` as
  // the data provider source skips the subscription entirely rather than paying for a merged,
  // localized menu in every window and discarding it. Same idiom as web-view.component.tsx's
  // `webViewType && shouldShowToolbar ? menuDataService.dataProviderName : undefined`.
  const [menuDataPossiblyError] = useData(
    globalThis.isMainWindow ? menuDataService.dataProviderName : undefined,
  ).MainMenu(undefined, MAIN_MENU_DEFAULT);
  const menuData = useMemo(() => {
    // Secondary windows get identical chrome minus the top-level menu. `Toolbar` renders its
    // menubar only when `menuData` is truthy, so withholding it here removes the menu.
    //
    // It does not remove ONLY the menu: the shared `PlatformMenubar` registers the Alt, Alt+P,
    // Alt+L, Alt+N and Alt+H shortcuts, and it is mounted only when `menuData` is truthy — so those
    // five die with it in secondary windows. That is intended (they open menus that are not there)
    // and the shortcut catalog records it, but it is a real behavioural difference, not a no-op.
    if (!globalThis.isMainWindow) return undefined;
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

  // `undefined` while unknown — the render gate below treats that as available (fail open). Skipped
  // in power mode, where nothing consumes the answer. Gated on `!isPowerMode` rather than the
  // stricter `isSimpleMode` on purpose: this probe is a prefetch, so starting it while the mode is
  // still unknown means the answer is ready the moment we learn the mode is simple, instead of
  // making simple-mode users wait for two round trips in sequence. The cost is one wasted probe for
  // a power user whose mode has not resolved yet.
  const isSendReceiveAvailable = useSendReceiveAvailability({ enabled: !isPowerMode });
  // Fail open a second way: even a settled `false` must not hide the indicator once the backend has
  // reported a sync. `useSendReceiveAvailability` asks whether the send/receive EXTENSION is
  // present, but syncs also start from paths that never touch it — `startup-tasks.ts` calls the
  // dotnet `syncProjects` command directly — so an extension that is missing or failed to activate
  // would otherwise leave a multi-minute sync with no surface at all in Simple mode, where the
  // persistent toast is suppressed in favour of this indicator.
  //
  // Sticky, not live: a gate on "is syncing right now" unmounts the control in the same commit the
  // sync finishes, so the outcome the user was waiting for is never painted and never announced, and
  // the status hook's seed loop is torn down mid-flight. Once a sync has been seen this stays true
  // for the session. Reads a store the renderer seeds once at startup, so it costs no subscription
  // and no request here. See `useBackendSyncActivity`.
  const hasBackendSynced = useBackendSyncActivity();

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
            {/* toolbar-sync-area: always in the DOM so onboarding-tour step 4
                (onboarding-tour.component.tsx) can target [data-testid="toolbar-sync-area"]
                regardless of whether the sync button itself renders — that button stays
                conditional so the toolbar remains compact when sync is unavailable.
                This wrapper displaces SyncStatusButton as the flex item in the config area's
                shrinking row, so it has to be transparent to that shrinking: `shrink` and
                `min-w-0` pass the row's pressure through to the button, which truncates its own
                label (see its className). `shrink-0` here would pin the wrapper's width and
                silently undo that. `display: contents` would be tidier still, but it gives the
                wrapper no box, and Tour measures this element to place the spotlight.
                empty:hidden keeps the wrapper out of the flex flow when the button is absent, so
                it contributes no gap-2 spacing while staying in the DOM at zero size — which is
                how Tour skips the step.
                In plain Platform.Bible the wrapper is always empty and the tour runs with four
                stops rather than five: Send/Receive ships only in Paratext 10 Studio, so
                `platformGetResources.isSendReceiveAvailable` settles to `false`, and no dotnet
                sync can raise `hasBackendSynced` either (`GetSyncActivity` is hardcoded idle in
                `ParatextProjectSendReceiveService`). A four-stop tour in this build is correct,
                not a regression. */}
            <div data-testid="toolbar-sync-area" className="tw:min-w-0 tw:shrink tw:empty:hidden">
              {isSimpleMode && (isSendReceiveAvailable !== false || hasBackendSynced) && (
                // Simple mode only, by UX decision: power mode deliberately has no toolbar Sync
                // because syncing already surfaces itself there — a notification while it runs,
                // progress inside the Sync dialog, and progress in an open editor window — and power
                // users start a sync per project from the Home view.
                //
                // Fail open on availability: `undefined` means not known yet (the extension host is
                // busy, or the send/receive extension is still activating), and the button must not
                // hinge on that resolving. A settled `false` hides it — unless the backend has
                // reported a sync, which is a surface the user needs regardless of what the extension
                // probe says (see `hasBackendSynced` above).
                //
                // The cost of failing open is one seed-retry loop for the extension's CLAIM in builds
                // with no send/receive at all, restarted on each Simple/Power toggle since that unmounts
                // and remounts this. An unregistered command is not cheap to fail: `sendCommand` routes
                // through `requestWithRetry`, so one read rejects only after `MAX_REQUEST_ATTEMPTS`
                // attempts at `REQUEST_ATTEMPT_WAIT_TIME_MS` apart (~10s, `rpc.model.ts`). Availability
                // settles to `false` within `SEND_RECEIVE_UNKNOWN_GRACE_MS` (5s) there, so this unmounts
                // while that loop's FIRST read is still retrying. The backend activity signal costs
                // nothing here either way: it is seeded once at startup by `initSyncActivityService`
                // and read from a store, not re-seeded per mount.
                // TODO(PT-4233): A one-shot capability probe would fit a permanently-absent claim
                // command better than a retry loop does.
                <SyncStatusButton />
              )}
            </div>
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
        {isSimpleMode && (
          <ToolbarProjectSelector
            projects={pickerProjects}
            recentIds={recentIds}
            currentProject={currentSimpleProject}
            currentProjectError={currentSimpleProjectError}
            isLoading={isProjectPickerLoading}
            localizedStrings={localizedStrings}
            onSelectProject={handleSelectProject}
            onShowMoreProjects={showProjectPicker}
          />
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
