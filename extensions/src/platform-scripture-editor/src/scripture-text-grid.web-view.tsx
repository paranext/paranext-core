import type { WebViewProps } from '@papi/core';
import papi, { logger } from '@papi/frontend';
import { useDataProvider, useDialogCallback, useLocalizedStrings } from '@papi/frontend/react';
import {
  Button,
  EmptyState,
  pickTabIconUrl,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  RetryableErrorView,
  useRetryablePromise,
  useViewVisibility,
  type TabIconUrls,
} from 'platform-bible-react';
import { CloudOff, Settings2 } from 'lucide-react';
import {
  DblResourceData,
  formatReplacementString,
  getErrorMessage,
  isPlatformError,
  LocalizeKey,
  resolveLocalizedString,
} from 'platform-bible-utils';
import type {
  DblResourceReference,
  ITextConnectionSettingsProjectDataProvider,
  ProjectReference,
} from 'platform-scripture';
import { type ComponentProps, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useInstallDblResource } from './use-install-dbl-resource.hook';
import { getViewOptionsTexts } from './scripture-text-grid-contents.utils';
import {
  getOrderedScriptureTextGridContents,
  reorderShownIds,
  reconcileCellOrder,
} from './scripture-text-grid-order.utils';
import { resolveDblLongName } from './scripture-text-grid/view-options-long-name.utils';
import {
  DOWNLOADED_NO_PROJECT_KEY,
  resolvePickerNotice,
  VIEW_OPTIONS_NOTICE_STRING_KEYS,
} from './scripture-text-grid/view-options-notice.utils';
import { planResourcePick } from './scripture-text-grid/resource-pick.utils';
import {
  persistCellOrder,
  persistUserAddition,
  persistUserDisplay,
  persistUserRemoval,
} from './scripture-text-grid-persistence.utils';
import { useTextCollectionSources } from './use-text-collection-sources.hook';
import { useFocusedResourceProjectId } from './use-focused-resource-project-id.hook';
import { useOpenFindShortcut } from './use-open-find-shortcut.hook';
import { usePublishNavigableProjectIds } from './use-publish-navigable-project-ids.hook';
import { useTextCollectionProjectId } from './use-text-collection-project-id.hook';
import { getViewOptionsAvailability } from './scripture-text-grid-availability.utils';
import {
  ResourceCollectionOptions,
  RESOURCE_COLLECTION_OPTIONS_STRING_KEYS,
  isResourceCollectionViewMode,
  type ResourceCollectionViewMode,
} from './resource-collection-options/resource-collection-options.component';
import {
  ChapterContextResource,
  ScriptureTextGrid,
} from './scripture-text-grid/scripture-text-grid.component';
import { toGridResources, type GridResource } from './scripture-text-grid/grid-resources.utils';
import {
  CATALOG_ERROR_KEY,
  CATALOG_RETRY_KEY,
} from './scripture-text-grid/catalog-retry-banner.const';
import { useCatalogRetryState } from './scripture-text-grid/use-catalog-retry-state.hook';
import {
  getGridBodyState,
  shouldShowCatalogRetryBanner,
} from './scripture-text-grid/grid-body-state.utils';
import { useDblInstallLookup } from './scripture-text-grid/use-dbl-install-lookup.hook';
import { CatalogRetryBanner } from './scripture-text-grid/catalog-retry-banner.component';
import { isNonDblResource } from './resource-reference.utils';
import { buildChapterContextOpenedMessage } from './scripture-text-grid/announcements.utils';
import { isEscapeForChapterContext } from './scripture-text-grid/chapter-context-escape.utils';
import {
  useResourceContentZoom,
  type ResourceZoomController,
} from './scripture-text-grid/use-resource-content-zoom.hook';
import {
  ZOOM_IN_KEY,
  ZOOM_OUT_KEY,
  RESET_ZOOM_KEY,
  ZOOM_OPTIONS_KEY,
  type ZoomMenuLabels,
} from './scripture-text-grid/resource-cell-view.component';

// The tab's visible title, hover tooltip, and accessible name. The title/tooltip themselves are
// resolved and set by scriptureTextGridWebViewProvider in main.ts (not by this web view); this key
// is still needed here for the accessible name below.
const TITLE_KEY = '%webView_scriptureTextGrid_title_multiple%';
const VIEW_OPTIONS_BUTTON_KEY = '%webView_scriptureTextGrid_viewOptions_openPanel%';
// Notification keys are localized by the notification service, so they are NOT fetched via
// `useLocalizedStrings`; only keys rendered directly in JSX go in `ALL_STRING_KEYS` below.
const INSTALL_FAILED_KEY = '%webView_selectDblResource_installFailed%';
const PERSIST_FAILED_KEY = '%webView_scriptureTextGrid_viewOptions_persistFailed%';
const NO_PROJECT_KEY = '%webView_resourcePanel_noProject%';
const LOADING_KEY = '%general_loading%';
const NOT_SUPPORTED_KEY = '%webView_scriptureTextGrid_viewOptions_notSupported%';
const SETTINGS_UNAVAILABLE_KEY = '%webView_scriptureTextGrid_viewOptions_settingsUnavailable%';
const CHAPTER_CONTEXT_CLOSE_KEY = '%webView_scriptureTextGrid_chapterContext_close%';
const EMPTY_STATE_KEY = '%webView_scriptureTextGrid_emptyState_prompt%';
const CELL_ACCESSIBLE_NAME_KEY = '%webView_scriptureTextGrid_cell_accessibleName%';
// Screen-reader announcements for the chapter-context split opening/closing.
const ARIA_OPENED_KEY = '%webView_scriptureTextGrid_aria_chapterContextOpened%';
const ARIA_CLOSED_KEY = '%webView_scriptureTextGrid_aria_chapterContextClosed%';
const REORDER_ANNOUNCEMENT_KEY = '%webView_scriptureTextGrid_cell_reorderAnnouncement%';
const REORDER_HANDLE_KEY = '%webView_scriptureTextGrid_cell_reorderHandle%';
const REORDER_HINT_KEY = '%webView_scriptureTextGrid_cell_reorderHint%';

const ALL_STRING_KEYS: LocalizeKey[] = [
  TITLE_KEY,
  VIEW_OPTIONS_BUTTON_KEY,
  NO_PROJECT_KEY,
  ...VIEW_OPTIONS_NOTICE_STRING_KEYS,
  LOADING_KEY,
  NOT_SUPPORTED_KEY,
  SETTINGS_UNAVAILABLE_KEY,
  CHAPTER_CONTEXT_CLOSE_KEY,
  EMPTY_STATE_KEY,
  CATALOG_ERROR_KEY,
  CATALOG_RETRY_KEY,
  CELL_ACCESSIBLE_NAME_KEY,
  ARIA_OPENED_KEY,
  ARIA_CLOSED_KEY,
  ZOOM_IN_KEY,
  ZOOM_OUT_KEY,
  RESET_ZOOM_KEY,
  ZOOM_OPTIONS_KEY,
  REORDER_ANNOUNCEMENT_KEY,
  REORDER_HANDLE_KEY,
  REORDER_HINT_KEY,
  ...RESOURCE_COLLECTION_OPTIONS_STRING_KEYS,
];

// Theme-adaptive tab icon: the platform paints the tab icon as a static CSS background-image, so a
// `currentColor` SVG can't follow the theme. We swap the `iconUrl` based on both the current theme
// and the tab's selected state (light theme: white when selected, near-black when unselected,
// mid-slate fallback when selection state is unknown; dark theme: always light).
const TAB_ICON_URLS: TabIconUrls = {
  lightDefault: 'papi-extension://platformScriptureEditor/assets/library.svg',
  dark: 'papi-extension://platformScriptureEditor/assets/library-dark.svg',
  lightSelected: 'papi-extension://platformScriptureEditor/assets/library-selected.svg',
  lightUnselected: 'papi-extension://platformScriptureEditor/assets/library-unselected.svg',
};

/** Props {@link ScriptureTextGridProjectView} takes from the web view that hosts it. */
type ScriptureTextGridProjectViewProps = {
  webViewId: string;
  /** The project whose text collection this view shows. Fixed for the life of a mount. */
  projectId: string | undefined;
  useWebViewState: WebViewProps['useWebViewState'];
  localizedStrings: { [key: LocalizeKey]: string };
  isLoadingLocalizedStrings: boolean;
  zoom: ResourceZoomController;
  zoomMenuLabels: ZoomMenuLabels;
  scrRef: ComponentProps<typeof ScriptureTextGrid>['scrRef'];
  setScrRef: ComponentProps<typeof ScriptureTextGrid>['setScrRef'];
  isViewVisible: boolean;
  viewMode: ResourceCollectionViewMode;
  setViewMode: (viewMode: ResourceCollectionViewMode) => void;
  /** The cached DBL resource catalog, or `undefined` until it has been delivered. */
  cachedResources: DblResourceData[] | undefined;
  isLoadingCachedResources: boolean;
  /** Whether the catalog fetch has answered since it last started, successfully or not. */
  hasCatalogSettled: boolean;
  hasCatalogError: boolean;
  refetchCatalog: () => void;
  /** Bumped by each install from this web view, which changes what is on disk. */
  refreshCounter: number;
  installingResourceNames: string[];
  /** Installs a picked resource; resolves whether the install succeeded. */
  installPickedResource: (resource: DblResourceData) => Promise<boolean>;
  /** Seeds the first-open overlay through `pdp`, unless this web view has already done so. */
  initializeOverlayOnce: (
    pdp: ITextConnectionSettingsProjectDataProvider,
    projectId: string | undefined,
  ) => void;
  /** Sets the message the web view's polite live region announces. */
  onAnnounce: (message: string) => void;
};

/**
 * Everything the Scripture Text Grid shows for one project: the View Options panel and the resource
 * body. Mounted with `key={projectId}` by {@link ScriptureTextGridWebView}, so a project change
 * remounts it and no hook below can carry state from one project into another — in particular
 * `useBufferedLayoutSetting`, whose held admin list would otherwise outlive the switch and be used
 * to prune and persist the incoming project's cell order.
 */
function ScriptureTextGridProjectView({
  webViewId,
  projectId,
  useWebViewState,
  localizedStrings,
  isLoadingLocalizedStrings,
  zoom,
  zoomMenuLabels,
  scrRef,
  setScrRef,
  isViewVisible,
  viewMode,
  setViewMode,
  cachedResources,
  isLoadingCachedResources,
  hasCatalogSettled,
  hasCatalogError,
  refetchCatalog,
  refreshCounter,
  installingResourceNames,
  installPickedResource,
  initializeOverlayOnce,
  onAnnounce,
}: ScriptureTextGridProjectViewProps) {
  const { sources, textConnectionPdp, textConnectionState, isOrderPending, hasSettingsError } =
    useTextCollectionSources(projectId);

  // Latest sources for the async callbacks below — reading the render-closure `sources` would let a
  // rapid second toggle (or a toggle mid-install) compute its next-state from a pre-write snapshot
  // and clobber the first write. A ref always hands the callbacks the freshest snapshot.
  const sourcesRef = useRef(sources);
  sourcesRef.current = sources;

  // Chapter-context overlay opened from a verse cell; Escape closes it. Intentionally NOT cleared on
  // a view-mode switch: the other views ignore it, and keeping it restores the open split when the
  // user returns to verse mode. The Escape handler below is gated on the verse view for that reason
  // — it is a capture-phase listener, so leaving it live would swallow Escape in the other views for
  // a split the reader cannot see.
  const [chapterContext, setChapterContext] = useState<ChapterContextResource | undefined>(
    undefined,
  );
  const handleChapterContextChange = useCallback(
    (context: ChapterContextResource) => {
      setChapterContext(context);
      onAnnounce(
        buildChapterContextOpenedMessage(
          resolveLocalizedString(
            localizedStrings[ARIA_OPENED_KEY],
            'Chapter view opened for {resourceReference}',
          ),
          context.label,
        ),
      );
    },
    [localizedStrings, onAnnounce],
  );
  const handleCloseChapterContext = useCallback(() => {
    setChapterContext(undefined);
    onAnnounce(resolveLocalizedString(localizedStrings[ARIA_CLOSED_KEY], 'Chapter view closed'));
  }, [localizedStrings, onAnnounce]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (chapterContext === undefined || viewMode !== 'verse' || !isEscapeForChapterContext(event))
        return;
      // An open pop-up that holds no focus — a tooltip, or a popover whose trigger keeps focus — is
      // still the innermost layer, so Escape is its to dismiss; this capture-phase listener would
      // otherwise take the key before Radix sees it. Every Radix pop-up renders inside this wrapper
      // while open.
      if (document.querySelector('[data-radix-popper-content-wrapper]')) return;
      event.preventDefault();
      event.stopPropagation();
      handleCloseChapterContext();
    };
    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [chapterContext, handleCloseChapterContext, viewMode]);

  // A project change unmounts this view, which drops an open split without going through
  // `handleCloseChapterContext`. Announce that close too, or a screen reader is left holding the
  // stale "opened" message. Read through refs because the cleanup must see the split as it was at
  // unmount, not as it was when this effect ran.
  const unmountAnnouncementRef = useRef<string | undefined>(undefined);
  unmountAnnouncementRef.current = chapterContext
    ? resolveLocalizedString(localizedStrings[ARIA_CLOSED_KEY], 'Chapter view closed')
    : undefined;
  const onAnnounceRef = useRef(onAnnounce);
  onAnnounceRef.current = onAnnounce;
  useEffect(() => {
    const announcementRef = unmountAnnouncementRef;
    const announceRef = onAnnounceRef;
    return () => {
      if (announcementRef.current !== undefined) announceRef.current(announcementRef.current);
    };
  }, []);

  // Keeps the retry banner (and the focused button) mounted through a retry it started: the
  // refetch clears the error at once, which would otherwise remove the banner mid-click.
  const { isRetrying: isRetryingCatalog, retry: retryCatalogFromBanner } = useCatalogRetryState(
    hasCatalogSettled,
    refetchCatalog,
  );

  const { top, bottom } = useMemo(
    () =>
      sources
        ? getViewOptionsTexts(sources, (reference) =>
            resolveDblLongName(reference, cachedResources ?? []),
          )
        : { top: [], bottom: [] },
    [sources, cachedResources],
  );

  const orderedReferences = useMemo(
    () => (sources ? getOrderedScriptureTextGridContents(sources) : []),
    [sources],
  );

  const installLookup = useDblInstallLookup({
    references: orderedReferences,
    cachedResources,
    isCatalogLoading: isLoadingCachedResources,
    hasCatalogSettled,
    refreshCounter,
  });

  // The grid body's cells: the `getOrderedScriptureTextGridContents` selector over the Text
  // Collection sources, resolved to the row's `{ resourceId, projectId, label }` shape. The selector returns
  // already-filtered, ordered Bible-text refs.
  const resources = useMemo<GridResource[]>(
    () =>
      toGridResources(orderedReferences, cachedResources ?? [], { installLookup, hasCatalogError }),
    [orderedReferences, cachedResources, installLookup, hasCatalogError],
  );

  // Ctrl+F opens Find for the resource the caret is in. Unlike the single-resource reference panels,
  // this view shows several texts at once, so there is no "displayed resource" to fall back to —
  // before the user has put the caret in a cell, Ctrl+F is a logged no-op.
  const displayedProjectIds = useMemo(
    () =>
      resources
        .map((resource) => resource.projectId)
        .filter((id): id is string => id !== undefined),
    [resources],
  );
  const caretResourceProjectId = useFocusedResourceProjectId(displayedProjectIds);
  useOpenFindShortcut(webViewId, caretResourceProjectId);

  const gridBodyState = getGridBodyState({
    hasRows: resources.length > 0,
    hasSources: sources !== undefined,
    hasCatalogError,
    isLoading: isLoadingCachedResources || isLoadingLocalizedStrings,
  });

  // The grid is one web view hosting many projects, so its members are invisible to global
  // navigation UI unless declared here. `resources` — and so `displayedProjectIds` — is incomplete
  // until the sources, the cached DBL list and the disk lookup have all answered, which is
  // indistinguishable from "those projects were removed".
  usePublishNavigableProjectIds(
    useWebViewState,
    displayedProjectIds,
    sources !== undefined && !isLoadingCachedResources && installLookup.status !== 'pending',
    // A project switch re-points this panel by reloading it, which reuses the web view id, so the
    // published list would otherwise outlive the project it was built for.
    projectId,
  );

  // One value drives both whether the View Options controls are operable and the reason shown when
  // they are not, so the two cannot disagree.
  const viewOptionsAvailability = useMemo(
    () => getViewOptionsAvailability({ textConnectionState, sources, hasSettingsError }),
    [textConnectionState, sources, hasSettingsError],
  );
  const disabledMessage = useMemo(() => {
    // A disabled control with no explanation reads as broken, so each reason keeps its English
    // wording when the lookup has not resolved rather than going silent.
    if (viewOptionsAvailability === 'noProject')
      return resolveLocalizedString(localizedStrings[NO_PROJECT_KEY], 'No project selected.');
    if (viewOptionsAvailability === 'unavailable')
      return resolveLocalizedString(
        localizedStrings[NOT_SUPPORTED_KEY],
        'Text Collection settings could not be loaded for this project.',
      );
    if (viewOptionsAvailability === 'settingsError')
      return resolveLocalizedString(
        localizedStrings[SETTINGS_UNAVAILABLE_KEY],
        "Couldn't load your texts.",
      );
    return resolveLocalizedString(localizedStrings[LOADING_KEY], 'Loading');
  }, [viewOptionsAvailability, localizedStrings]);

  useEffect(() => {
    if (textConnectionPdp) initializeOverlayOnce(textConnectionPdp, projectId);
  }, [initializeOverlayOnce, projectId, textConnectionPdp]);

  const handleCheckedChange = useCallback(
    (resourceId: string, checked: boolean) => {
      const { current } = sourcesRef;
      if (!current || !textConnectionPdp) return;
      const writes = persistUserDisplay(textConnectionPdp, resourceId, checked, current);
      // `Promise.all` rejects on the first failed write, so a failed toggle notifies once (not once
      // per underlying list/overlay write).
      Promise.all(writes).catch((e) => {
        papi.notifications.send({ message: PERSIST_FAILED_KEY, severity: 'error' });
        logger.warn(`Failed to persist view-options change: ${getErrorMessage(e)}`);
      });
    },
    [textConnectionPdp],
  );

  const handleRemoveFromList = useCallback(
    (resourceId: string) => {
      const { current } = sourcesRef;
      if (!current || !textConnectionPdp) return;
      persistUserRemoval(textConnectionPdp, resourceId, current.userReferenced)?.catch((e) => {
        papi.notifications.send({ message: PERSIST_FAILED_KEY, severity: 'error' });
        logger.warn(`Failed to persist removal: ${getErrorMessage(e)}`);
      });
    },
    [textConnectionPdp],
  );

  const handleReorder = useCallback(
    (newShownIdSequence: string[]) => {
      const { current } = sourcesRef;
      if (!current || !textConnectionPdp) return;
      const nextOrder = reorderShownIds(current.order, newShownIdSequence);
      persistCellOrder(textConnectionPdp, nextOrder).catch((e) => {
        papi.notifications.send({ message: PERSIST_FAILED_KEY, severity: 'error' });
        logger.warn(`Failed to persist cell order: ${getErrorMessage(e)}`);
      });
    },
    [textConnectionPdp],
  );

  const getReorderHandleLabel = useCallback(
    (resourceName: string) =>
      formatReplacementString(
        resolveLocalizedString(localizedStrings[REORDER_HANDLE_KEY], 'Reorder {resourceName}'),
        { resourceName },
      ),
    [localizedStrings],
  );
  const getReorderAnnouncement = useCallback(
    (resourceName: string, position: number, total: number) =>
      formatReplacementString(
        resolveLocalizedString(
          localizedStrings[REORDER_ANNOUNCEMENT_KEY],
          'Moved {resourceName} to position {position} of {total}',
        ),
        {
          resourceName,
          position,
          total,
        },
      ),
    [localizedStrings],
  );

  const handleResourceSelect = useCallback(
    async (resource: DblResourceData) => {
      const plan = planResourcePick(!!resource.installed, !!textConnectionPdp);
      if (plan.shouldInstall && !(await installPickedResource(resource))) return;

      if (!textConnectionPdp) {
        // Nothing in the panel behind the picker reflects a download that could not be added, so
        // confirm it here — otherwise the "Installing…" row is the only sign it happened, and it
        // disappears.
        if (plan.shouldConfirmDownloadOnly)
          papi.notifications.send({ message: DOWNLOADED_NO_PROJECT_KEY, severity: 'info' });
        return;
      }

      // Re-read after the await: the subscription may have advanced during the install.
      const { current } = sourcesRef;
      if (!current) return;
      const isLocalOnly = isNonDblResource(resource);
      const reference: DblResourceReference | ProjectReference = isLocalOnly
        ? { type: 'project', name: resource.displayName, id: resource.projectId }
        : { type: 'dblResource', name: resource.displayName, id: resource.dblEntryUid };
      persistUserAddition(textConnectionPdp, reference, current.userReferenced)?.catch((e) => {
        papi.notifications.send({ message: PERSIST_FAILED_KEY, severity: 'error' });
        logger.warn(`Failed to persist added resource: ${getErrorMessage(e)}`);
      });
    },
    [installPickedResource, textConnectionPdp],
  );

  const selectedResourceIds = useMemo(
    () => [...top, ...bottom].map((entry) => entry.reference.id),
    [top, bottom],
  );

  // Reconcile the saved order: drop ids that have left the user's world (X-removed, or an admin
  // entry no longer shared). `selectedResourceIds` is every resource the user still has (shown AND
  // hidden), so hidden-but-known ids keep their saved slots. Reads sourcesRef.current for freshness;
  // `sources` is in the deps only to re-run on subscription updates. reconcileCellOrder persists
  // only on a real change, so the subscribe→persist→subscribe cycle converges. (A reorder persisted
  // in the same tick that a resource is removed is a narrow last-writer-wins window; acceptable —
  // the next delivery reconciles.)
  useEffect(() => {
    const { current } = sourcesRef;
    if (!current || !textConnectionPdp || isOrderPending) return;
    const next = reconcileCellOrder(current.order, selectedResourceIds);
    if (!next) return;
    persistCellOrder(textConnectionPdp, next).catch((e) =>
      logger.warn(`Failed to reconcile cell order: ${getErrorMessage(e)}`),
    );
  }, [sources, textConnectionPdp, selectedResourceIds, isOrderPending]);

  const showResourcePicker = useDialogCallback(
    'platform.resourcePicker',
    useMemo(
      () => ({
        resourceType: ['ScriptureResource', 'CommentaryResource'] as const,
        selectedResourceIds,
        isModal: true,
        notice: resolvePickerNotice(localizedStrings, !!textConnectionPdp),
        // With no text collection to add to, installing is all a pick can accomplish — so an
        // already-installed resource would take the click and do nothing.
        allowSelectingInstalled: !!textConnectionPdp,
      }),
      [selectedResourceIds, textConnectionPdp, localizedStrings],
    ),
    useCallback(
      (resource: DblResourceData | undefined) => {
        if (!resource) return;
        handleResourceSelect(resource).catch((e) =>
          logger.error(`Resource selection failed: ${getErrorMessage(e)}`),
        );
      },
      [handleResourceSelect],
    ),
  );

  return (
    <>
      <div className="tw:flex tw:items-center tw:justify-end tw:border-b tw:p-1">
        <Popover>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={resolveLocalizedString(
                      localizedStrings[VIEW_OPTIONS_BUTTON_KEY],
                      'View Options',
                    )}
                    // Explicit themed colors so the icon is visible in both light and dark themes; a
                    // plain ghost button inherits the (un-themed) default color and vanishes on dark
                    // tabs.
                    className="tw:text-muted-foreground tw:hover:text-foreground"
                  >
                    <Settings2 className="tw:h-4 tw:w-4" />
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>
                {resolveLocalizedString(localizedStrings[VIEW_OPTIONS_BUTTON_KEY], 'View Options')}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <PopoverContent className="tw:max-h-[70vh] tw:overflow-y-auto">
            <ResourceCollectionOptions
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              isChapterEnabled
              top={top}
              bottom={bottom}
              installingResourceNames={installingResourceNames}
              onCheckedChange={handleCheckedChange}
              onRemoveFromList={handleRemoveFromList}
              onGetResources={showResourcePicker}
              // Disabled whenever `getViewOptionsAvailability` is not `ready` — no project, settings
              // still arriving, no settings provider, or settings that could not be read — since
              // every action would otherwise silently no-op.
              disabled={viewOptionsAvailability !== 'ready'}
              // Always supply a reason. Left undefined while a project is bound, the panel renders
              // the TEXTS header over nothing with the controls greyed and no explanation.
              disabledMessage={disabledMessage}
              localizedStrings={localizedStrings}
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* A persistent live region, so the banner is announced when it appears inside it. */}
      <div role="status">
        {gridBodyState === 'grid' &&
          (isRetryingCatalog || shouldShowCatalogRetryBanner({ hasCatalogError, resources })) && (
            <CatalogRetryBanner
              message={resolveLocalizedString(
                localizedStrings[CATALOG_ERROR_KEY],
                "Couldn't load the list of available resources.",
              )}
              retryLabel={resolveLocalizedString(localizedStrings[CATALOG_RETRY_KEY], 'Try again')}
              onRetry={retryCatalogFromBanner}
              isRetrying={isRetryingCatalog}
            />
          )}
      </div>
      {/* Grid body: a message when nothing is renderable, otherwise the verse-cell rows.
          Gate the message on loading being finished so it can't flash before data arrives —
          `sources` undefined and `cachedResources` still loading each make `resources` transiently
          empty. The grid branch renders while strings are still loading, so every string it passes
          down resolves to English rather than relying on that guard.

          The body itself is not a zoom area: each cell marks only its resource's text, with that
          resource's own area (`resource-<id>`, see `resource-zoom-area.utils.ts`), so the cells'
          name labels, reorder grips and zoom options buttons, the chapter-context chrome and the
          empty and error states keep interface scale. Naming each resource's area keeps its
          remembered level apart from the other resources' and from this project's other resource
          panes, which resolve to the same kind/identity pair. */}
      <div className="tw:flex-1 tw:overflow-hidden">
        {gridBodyState === 'catalogError' && (
          <div className="tw:flex tw:h-full tw:items-center tw:justify-center tw:p-4">
            <RetryableErrorView
              icon={<CloudOff />}
              message={resolveLocalizedString(
                localizedStrings[CATALOG_ERROR_KEY],
                "Couldn't load the list of available resources.",
              )}
              retryLabel={resolveLocalizedString(localizedStrings[CATALOG_RETRY_KEY], 'Try again')}
              onRetry={refetchCatalog}
            />
          </div>
        )}
        {gridBodyState === 'empty' && (
          // Centered in the grid body; the message names the View Options button by interpolating
          // its own localized label so a rename can't desync the copy.
          <div className="tw:flex tw:h-full tw:items-center tw:justify-center tw:p-4">
            <EmptyState
              id="scripture-text-grid-empty-state"
              className="tw:text-center"
              message={formatReplacementString(
                resolveLocalizedString(
                  localizedStrings[EMPTY_STATE_KEY],
                  'No texts to display. Open {viewOptionsLabel} to choose which texts to show.',
                ),
                {
                  viewOptionsLabel: resolveLocalizedString(
                    localizedStrings[VIEW_OPTIONS_BUTTON_KEY],
                    'View Options',
                  ),
                },
              )}
            />
          </div>
        )}
        {gridBodyState === 'grid' && (
          <ScriptureTextGrid
            ariaLabel={resolveLocalizedString(localizedStrings[TITLE_KEY], 'Text Collection')}
            resources={resources}
            scrRef={scrRef}
            setScrRef={setScrRef}
            isViewVisible={isViewVisible}
            viewMode={viewMode}
            zoom={zoom}
            zoomMenuLabels={zoomMenuLabels}
            chapterContext={chapterContext}
            onChapterContextChange={handleChapterContextChange}
            onChapterContextClose={handleCloseChapterContext}
            closeChapterContextLabel={resolveLocalizedString(
              localizedStrings[CHAPTER_CONTEXT_CLOSE_KEY],
              'Close chapter view',
            )}
            cellAccessibleNameTemplate={resolveLocalizedString(
              localizedStrings[CELL_ACCESSIBLE_NAME_KEY],
              '{resourceName}, {reference}',
            )}
            // Withheld until the saved order is in hand: reordering against the empty stand-in
            // would persist only the resources on screen and drop every hidden resource's saved
            // slot. `ScriptureTextGrid` keys the grip, the `draggable` attribute, and both gesture
            // handlers off this prop, so an unusable reorder is never offered in the first place.
            onReorder={isOrderPending ? undefined : handleReorder}
            getReorderHandleLabel={getReorderHandleLabel}
            reorderHint={resolveLocalizedString(
              localizedStrings[REORDER_HINT_KEY],
              'Drag or press arrow keys to reorder',
            )}
            getReorderAnnouncement={getReorderAnnouncement}
          />
        )}
      </div>
    </>
  );
}

/**
 * Scripture Text Grid web view: the tab shell, per-user first-open overlay initialization, the View
 * Options panel, and the resource body (verse mode / chapter mode).
 *
 * The header hosts the View Options icon button + popover wrapping the reusable
 * `ResourceCollectionOptions` component, wired to the View Options data-layer helpers and persisted
 * through the per-user text-connection PDP setters. Below the header, the body renders one
 * `ResourceCell` per shown resource — the resources come from the
 * `getOrderedScriptureTextGridContents` selector over the Text Collection sources assembled by
 * `useTextCollectionSources`. The `viewMode` toggle selects the layout: a vertical list of stacked
 * verse rows (verse mode), or a horizontal row of side-by-side full-chapter columns (chapter mode).
 * In chapter mode the columns are reorderable (drag or keyboard); the persisted order is wired via
 * `handleReorder`.
 *
 * Everything that describes one project lives in {@link ScriptureTextGridProjectView}, remounted per
 * project. This component keeps only what must outlive a project change: the project choice itself,
 * in-flight installs and the catalog refresh they trigger, the live region, and the record of which
 * providers have had their overlay seeded.
 */
globalThis.webViewComponent = function ScriptureTextGridWebView({
  id: webViewId,
  projectId,
  updateWebViewDefinition,
  useWebViewScrollGroupScrRef,
  useWebViewState,
}: WebViewProps) {
  const [localizedStrings, isLoadingLocalizedStrings] = useLocalizedStrings(ALL_STRING_KEYS);

  // Each resource is its own content zoom area; the menus read the platform's levels for this tab
  // and send the platform's zoom commands with this tab's id and the resource's area.
  const zoom = useResourceContentZoom(webViewId, useWebViewState);
  const zoomMenuLabels = useMemo<ZoomMenuLabels>(
    () => ({
      zoomIn: resolveLocalizedString(localizedStrings[ZOOM_IN_KEY], 'Zoom in'),
      zoomOut: resolveLocalizedString(localizedStrings[ZOOM_OUT_KEY], 'Zoom out'),
      reset: resolveLocalizedString(localizedStrings[RESET_ZOOM_KEY], 'Reset zoom'),
      options: resolveLocalizedString(
        localizedStrings[ZOOM_OPTIONS_KEY],
        'Zoom options for {resourceName}',
      ),
    }),
    [localizedStrings],
  );

  // The shared scroll-group scrRef is owned here (WebViewProps) and passed down to the grid.
  // TODO(PT-4897): this converts into the container project's versification, so a resource row
  // whose versification differs shows the wrong verse; each row needs its own conversion frame.
  const [scrRef, setScrRef] = useWebViewScrollGroupScrRef();

  // Owned here for the same reason `scrRef` is: it is one fact about this web view, and the grid
  // renders a cell per resource. Subscribing per cell would build an `IntersectionObserver` each,
  // all watching the same document for the same answer. The tab icon reads this answer too (via
  // `pickTabIconUrl` rather than `useTabIconSelection`), so the web view holds exactly one.
  const isViewVisible = useViewVisibility();

  // The project whose text collection the grid shows. Opened from the default layout the tab carries
  // no projectId, so this takes the first project the active editor reports and keeps it; only an
  // explicit `projectId` moves it. See useTextCollectionProjectId.
  //
  // Hidden case: nothing to defer. The seed is data-only — it sets an id that the subscriptions below
  // re-read — so it resolves correctly in a `display: none` tab and needs no catch-up on activation.
  // Geometry is never consulted, which is the only thing a hidden pane cannot do.
  const effectiveProjectId = useTextCollectionProjectId(projectId);

  // View Options `viewMode` toggle; drives the grid body's layout. Persisted per web view via
  // useWebViewState so the choice survives an app restart (mirrors resource-text-panel). A saved
  // layout outlives the build that wrote it, so a mode this build cannot render — written by a
  // newer one, or since renamed — falls back to the default rather than reaching the grid.
  const [persistedViewMode, setViewMode] = useWebViewState<ResourceCollectionViewMode>(
    'viewMode',
    'verse',
  );
  const viewMode = isResourceCollectionViewMode(persistedViewMode) ? persistedViewMode : 'verse';
  // Resources whose install is in flight after a Get Resources pick (keyed by id so duplicate
  // display names can't drop each other's row); their names drive the "Installing {name}…" rows.
  // Held here rather than per project: a download outlives a project change, and its row goes only
  // when its own `finally` removes it.
  const [installing, setInstalling] = useState<Array<{ id: string; name: string }>>([]);
  // Increment to re-fetch cachedResources. The initial fetch runs once at mount; after any resource
  // installation (including one done in the picker dialog before it returned), the `installed` flag
  // in the cached list is stale, so `toGridResources` can't resolve the new resource to a projectId.
  // Bumping this counter triggers a fresh getCachedResources call which re-validates installed flags.
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Live-region message announced when the chapter-context split opens or closes (rendered into the
  // `role="status"` region below). Held here so the close a project change causes is still
  // announced after the per-project view that held the split has unmounted.
  const [announcement, setAnnouncement] = useState('');

  // The cached DBL resource list resolves DBL references (whose `id` is a DBL entry UID) to the
  // installed project id the cell fetches chapter text with; project references need no lookup. It
  // also supplies the DBL `fullName` shown as the long name in the View Options list.
  // Re-fetched on `refreshCounter` bumps, which the install path fires only after waiting for the
  // catalog's flags to be brought up to date — this read itself does not wait for them.
  const {
    data: catalog,
    isLoading: isCatalogFetchInFlight,
    hasError: hasCatalogFetchError,
    hasSettled: hasCatalogSettled,
    refetch: refetchCatalog,
  } = useRetryablePromise(
    useCallback(
      async () => {
        // This grid acts on `installed` (it decides whether a pick needs a download), so it needs
        // the reconciled flags rather than the snapshot `getCachedResources` answers with, which is
        // one refresh behind. A failed refresh still leaves a usable catalog to read.
        try {
          await papi.commands.sendCommand('platformGetResources.refreshResourceFlags', false);
        } catch (error) {
          logger.warn(`Could not refresh DBL resource flags: ${getErrorMessage(error)}`);
        }
        return papi.commands.sendCommand('platformGetResources.getCachedResources');
      },
      // refreshCounter is a refresh-trigger counter: the factory doesn't use its value, but each
      // bump creates a new function reference so the fetch re-runs and re-validates installed
      // flags — necessary after any installation completes.
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [refreshCounter],
    ),
  );

  // `!hasCatalogSettled` counts as loading, not just `isLoading`, so the render between a retry
  // click and the effect that restarts the fetch cannot paint a settled-looking empty grid.
  const isLoadingCachedResources = isCatalogFetchInFlight || !hasCatalogSettled;

  // An installation with no DBL credentials is a catalog with nothing in it — an answer this grid
  // can render, because it only reads the catalog to resolve long names and installed project ids.
  // A rejected fetch and a provider that has not registered yet are NOT that answer: the catalog is
  // still coming, and folding either into an empty one turns every configured DBL reference into an
  // unavailable cell under a truthful-looking "add some texts" prompt.
  const hasCatalogError =
    hasCatalogFetchError || (catalog?.status === 'unavailable' && catalog.reason === 'notReady');

  useEffect(() => {
    if (hasCatalogError)
      logger.warn(
        'Scripture Text Grid: the DBL resource catalog is unavailable; resolving DBL references from disk',
      );
  }, [hasCatalogError]);

  const cachedResources = useMemo(
    () => (catalog?.status === 'available' ? catalog.resources : undefined),
    [catalog],
  );

  const dblResourcesProvider = useDataProvider('platformGetResources.dblResourcesProvider');

  // Bumping the cache key is what makes the grid re-resolve, so it is this panel's "re-resolve the
  // resource list" step and belongs in the hook's `onInstalled`.
  const handleResourceInstalled = useCallback(() => setRefreshCounter((k) => k + 1), []);
  const installResource = useInstallDblResource(
    dblResourcesProvider,
    'scripture text grid',
    handleResourceInstalled,
  );

  const installPickedResource = useCallback(
    async (resource: DblResourceData) => {
      if (!dblResourcesProvider) return false;
      const pending = { id: resource.dblEntryUid, name: resource.displayName };
      setInstalling((prev) => [...prev, pending]);
      try {
        // Installs, waits for the catalog's flags to catch up, then bumps the cache key. The wait
        // is the point: `getCachedResources` answers from a cache it corrects in the background, so
        // re-reading without it returns the flags from before this install.
        await installResource(resource.dblEntryUid);
        return true;
      } catch {
        // `installResource` already logged the cause; this panel's channel for it is the toast.
        papi.notifications.send({ message: INSTALL_FAILED_KEY, severity: 'error' });
        return false;
      } finally {
        setInstalling((prev) => prev.filter((info) => info.id !== resource.dblEntryUid));
      }
    },
    [dblResourcesProvider, installResource],
  );

  // Fire first-open overlay init once per resolved provider. The server-side marker makes repeated
  // calls safe; this guard just avoids redundant round-trips within a single web-view lifetime —
  // which is why it lives here, above the per-project remount. Keyed by the provider the call is
  // made on, so the record and the call always describe the same project.
  const initializedProviders = useRef(new WeakSet<object>());
  const initializeOverlayOnce = useCallback(
    (pdp: ITextConnectionSettingsProjectDataProvider, pdpProjectId: string | undefined) => {
      if (initializedProviders.current.has(pdp)) return;
      initializedProviders.current.add(pdp);
      pdp.initializeTextCollectionOverlay().catch((error) => {
        initializedProviders.current.delete(pdp);
        logger.error(`Failed to initialize text-collection overlay for ${pdpProjectId}: ${error}`);
      });
    },
    [],
  );

  // "Text Collection" (icon+title when the column is roomy, hidden in favor of the icon alone once
  // it narrows — same responsive behavior as the other Column 3 tabs) is resolved and set directly
  // by scriptureTextGridWebViewProvider in main.ts, not here: this web view's own render/effects
  // don't reliably run promptly while its tab is backgrounded, which previously left the header
  // blank until the tab was activated once, even though updateWebViewDefinition had already pushed
  // the correct value. Setting it in the provider means the tab shows the right title/tooltip from
  // its very first render, independent of this web view's own mount timing.

  // Pick the tab icon variant to match the current theme and selected state. The tab icon is
  // painted by the platform as a static background-image, so a `currentColor` SVG can't follow the
  // theme — subscribe to the theme here (PAPI-specific) and let the shared hook handle selection
  // detection and variant picking.
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  useEffect(() => {
    let disposed = false;
    let unsubscribe: (() => void) | undefined;
    papi.themes
      .subscribeCurrentTheme(undefined, (theme) => {
        if (!isPlatformError(theme)) setIsDarkTheme(theme.type === 'dark');
      })
      .then((unsub) => {
        if (disposed) unsub();
        else unsubscribe = unsub;
        return undefined;
      })
      .catch((e) => logger.warn(`Failed to subscribe to the current theme: ${getErrorMessage(e)}`));
    return () => {
      disposed = true;
      unsubscribe?.();
    };
  }, []);

  const gridIconUrl = pickTabIconUrl(isDarkTheme, isViewVisible, TAB_ICON_URLS);
  useEffect(() => {
    updateWebViewDefinition({ iconUrl: gridIconUrl });
  }, [gridIconUrl, updateWebViewDefinition]);

  const installingResourceNames = useMemo(() => installing.map((info) => info.name), [installing]);

  return (
    <div
      data-testid="scripture-text-grid"
      className="tw:flex tw:h-screen tw:flex-col tw:bg-background tw:text-foreground"
    >
      {/* Polite live region announcing chapter-context open/close. Placed at the top of the render
          tree so it exists in the DOM before any announcement fires (a screen reader ignores text
          present at initial render). */}
      <div role="status" aria-live="polite" aria-atomic="true" className="tw:sr-only">
        {announcement}
      </div>
      <ScriptureTextGridProjectView
        key={effectiveProjectId}
        webViewId={webViewId}
        projectId={effectiveProjectId}
        useWebViewState={useWebViewState}
        localizedStrings={localizedStrings}
        isLoadingLocalizedStrings={isLoadingLocalizedStrings}
        zoom={zoom}
        zoomMenuLabels={zoomMenuLabels}
        scrRef={scrRef}
        setScrRef={setScrRef}
        isViewVisible={isViewVisible}
        viewMode={viewMode}
        setViewMode={setViewMode}
        cachedResources={cachedResources}
        isLoadingCachedResources={isLoadingCachedResources}
        hasCatalogSettled={hasCatalogSettled}
        hasCatalogError={hasCatalogError}
        refetchCatalog={refetchCatalog}
        refreshCounter={refreshCounter}
        installingResourceNames={installingResourceNames}
        installPickedResource={installPickedResource}
        initializeOverlayOnce={initializeOverlayOnce}
        onAnnounce={setAnnouncement}
      />
    </div>
  );
};
